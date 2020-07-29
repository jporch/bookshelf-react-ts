import React, { useState, useEffect } from 'react';
import './App.css';
import './BookList.tsx';
import {books as books_data} from './data/books.js';

type ControlsProps = {
    filters: Object,
    handler: Function
}

function Controls({filters, handler}: ControlsProps) {
    const [titleSearchTerm, setTitleSearchTerm] = useState("");
    const [authorSearchTerm, setAuthorSearchTerm] = useState("");

    useEffect(() => {

        handler({
            title:titleSearchTerm.toLowerCase(),
            author:authorSearchTerm.toLowerCase()
        });
    },[titleSearchTerm,authorSearchTerm,handler]);

    return(
        <div className="controls">
            <TitleSearch title={titleSearchTerm} handler={setTitleSearchTerm}/>
            <AuthorSearch author={authorSearchTerm} handler={setAuthorSearchTerm}/>
            <FilterDisplay filters={filters}/>
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
        <div>Author: <input type="text" value={author} onChange={handleChange} placeholder="Author"/></div>
    );
}

type FilterDisplayProps = {
    filters: Object
}
function FilterDisplay({filters}:FilterDisplayProps) {
    return(
        <div className="filter-list">
        {Object.entries(filters).map((filter) => filter[1] && <span key={filter[0]} className="filter-entry">{filter[0]}:{filter[1]}</span>)}
        </div>
    );
}

export { Controls };