import React, { useState, useEffect } from 'react';
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
    const [titleSearchTerm, setTitleSearchTerm] = useState("");
    const [authorSearchTerm, setAuthorSearchTerm] = useState("");
    const [ownedSearchTerm, setOwnedSearchTerm] = useState("");
    const [categorySearchTerm, setCategorySearchTerm] = useState("");

    useEffect(() => {

        filterHandler({
            title:titleSearchTerm.toLowerCase(),
            author:authorSearchTerm.toLowerCase(),
            owned:ownedSearchTerm,
            category:categorySearchTerm
        });
    },[titleSearchTerm,authorSearchTerm,ownedSearchTerm,categorySearchTerm,filterHandler]);

    return(
        <div className="controls">
            <TitleSearch title={titleSearchTerm} handler={setTitleSearchTerm}/>
            <AuthorSearch author={authorSearchTerm} handler={setAuthorSearchTerm}/>
            <OwnedSearch owned={ownedSearchTerm} handler={setOwnedSearchTerm}/>
            <CategoriesSearch categories={categories} category={categorySearchTerm} handler={setCategorySearchTerm}/>
        </div>
    );
}

type TitleSearchProps = {
    title: string,
    handler: Function
}
function TitleSearch({title, handler}:TitleSearchProps) {
    const handleChange = (e:any) => {handler(e.target.value);};
    return(
        <div>Title: <input type="text" value={title} onChange={handleChange} placeholder="Title"/></div>
    );
}

type AuthorSearchProps = {
    author: string,
    handler: Function
}
function AuthorSearch({author, handler}:AuthorSearchProps) {
    const handleChange = (e:any) => {handler(e.target.value);};
    return(
        <div>Author:&nbsp;<input type="text" value={author} onChange={handleChange} placeholder="Author"/></div>
    );
}

type OwnedSearchProps = {
    owned: string,
    handler: Function
}
function OwnedSearch({owned, handler}:OwnedSearchProps) {
    const handleChange = (e:any) => {handler(e.target.value);};
    
    return(
        <div>Owned:&nbsp; 
            <select value={owned} onChange={handleChange}>
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
    category: string,
    handler: Function
}
function CategoriesSearch({categories, category, handler}:CategorySearchProps) {
    const handleChange = (e:any) => {handler(e.target.value);};
    return(
        <div>Category:&nbsp; 
            <select value={category} onChange={handleChange}>
                <option value=""></option>
                {Array.from(categories).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
    );
}

type FilterDisplayProps = {
    filters: Object
}
function FilterDisplay({filters}:FilterDisplayProps) {
    return(
        <div className="filter-list">
        {Object.entries(filters).map((filter) => filter[1] && <span key={filter[0]} className="filter-entry">{filter[0]}:{filter[1].toString()}</span>)}
        </div>
    );
}

export { Controls };