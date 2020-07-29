import React, { useState, useEffect } from 'react';
import './App.css';
import './BookList.tsx';

type ControlsProps = {
    filters: Object,
    categories: Set<string>,
    handler: Function
}

function Controls({filters, categories, handler}: ControlsProps) {
    const [titleSearchTerm, setTitleSearchTerm] = useState("");
    const [authorSearchTerm, setAuthorSearchTerm] = useState("");
    const [ownedSearchTerm, setOwnedSearchTerm] = useState({physical:"false",digital:"false" });
    const [categorySearchTerm, setCategorySearchTerm] = useState("");

    useEffect(() => {

        handler({
            title:titleSearchTerm.toLowerCase(),
            author:authorSearchTerm.toLowerCase(),
            owned:ownedSearchTerm,
            category:categorySearchTerm
        });
    },[titleSearchTerm,authorSearchTerm,ownedSearchTerm,categorySearchTerm,handler]);

    return(
        <div className="controls">
            <TitleSearch title={titleSearchTerm} handler={setTitleSearchTerm}/>
            <AuthorSearch author={authorSearchTerm} handler={setAuthorSearchTerm}/>
            <OwnedSearch physical={ownedSearchTerm['physical']} digital={ownedSearchTerm['digital']} handler={setOwnedSearchTerm}/>
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
    physical: string,
    digital: string,
    handler: Function
}
function OwnedSearch({physical, digital, handler}:OwnedSearchProps) {
    const handlePhysicalChange = (e:any) => {
        const target = e.target;
        handler((prevState:Object) => ({...prevState,"physical":(target.checked?"true":"false")}))
    };
    const handleDigitalChange = (e:any) => {
        const target = e.target;
        handler((prevState:Object) => ({...prevState,"digital":(target.checked?"true":"false")}))
    };
    
    return(
        <div className="owned-filters">
            <div>Owned Physically:&nbsp;<input key="physical_checkbox" type="checkbox" checked={physical==="true"} onChange={handlePhysicalChange}/></div>
            <div>Owned Digitally:&nbsp;<input key="digital_checkbox" type="checkbox" checked={digital==="true"} onChange={handleDigitalChange}/></div>
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
                {Array.from(categories).map(c => <option value={c}>{c}</option>)}
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