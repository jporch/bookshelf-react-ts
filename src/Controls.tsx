import React from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import './App.css';
import './BookList.tsx';

type filters = {
    title: string,
    author: string,
    owned: string,
    category: string
}

export const emptyFilters = {
    title: "",
    author: "",
    owned: "",
    category: ""
}

type ControlsProps = {
    filters: filters,
    categories: Set<string>,
    filterHandler: Function
}

function Controls({filters, categories, filterHandler}: ControlsProps) {
    const submitFilters = (values: filters) => {filterHandler(values)};
    return(
        <div className="controls">
            <Formik initialValues={emptyFilters} onSubmit={submitFilters}>
                <Form>
                    <TitleSearch/>
                    <AuthorSearch/>
                    <OwnedSearch/>
                    <CategoriesSearch categories={categories}/>
                </Form>
            </Formik>
        </div>
    );
}

function TitleSearch() {
    const formik = useFormikContext();
    return(
        <div>Title: <Field id='title' name='title' type="text" onChange={(e:any) => {formik.handleChange(e); formik.submitForm()}} placeholder="Title"/></div>
    );
}

function AuthorSearch() {
    const formik = useFormikContext();
    return(
        <div>Author:&nbsp;<Field id='author' name='author' type="text" onChange={(e:any) => {formik.handleChange(e); formik.submitForm()}} placeholder="Author"/></div>
    );
}

function OwnedSearch() {
    const formik = useFormikContext();
    return(
        <div>Owned:&nbsp; 
            <select  id='owned' name='owned' onChange={(e:any) => {formik.handleChange(e); formik.submitForm()}}>
                <option value=""></option>
                <option value="physical">Physical</option>
                <option value="digital">Digital</option>
                <option value="any">Any</option>
                <option value="all">All</option>
            </select>
        </div>
    );
}

type CategorySearchProps = {
    categories: Set<string>,
}
function CategoriesSearch({categories}:CategorySearchProps) {
    const formik = useFormikContext();
    return(
        <div>Category:&nbsp; 
            <select  id='category' name='category' onChange={(e:any) => {formik.handleChange(e); formik.submitForm()}}>
                <option value=""></option>
                {Array.from(categories).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
    );
}

export { Controls };