import React, { useState, useEffect } from 'react';
import './App.css';
import './BookList.tsx';

type ControlsProps = {
    filters: Object,
    handler: Function
}

function Controls({filters, handler}: ControlsProps) {
    const [titleSearchTerm, setTitleSearchTerm] = useState("");
    const [authorSearchTerm, setAuthorSearchTerm] = useState("");
    const [ownedSearchTerm, setOwnedSearchTerm] = useState({physical:"false",digital:"false" });

    useEffect(() => {

        handler({
            title:titleSearchTerm.toLowerCase(),
            author:authorSearchTerm.toLowerCase(),
            owned:ownedSearchTerm
        });
    },[titleSearchTerm,authorSearchTerm,ownedSearchTerm,handler]);

    return(
        <div className="controls">
            <TitleSearch title={titleSearchTerm} handler={setTitleSearchTerm}/>
            <AuthorSearch author={authorSearchTerm} handler={setAuthorSearchTerm}/>
            <OwnedSearch physical={ownedSearchTerm['physical']} digital={ownedSearchTerm['digital']} handler={setOwnedSearchTerm}/>
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
            <span>Owned Physically: <input key="physical_checkbox" type="checkbox" checked={physical==="true"} onChange={handlePhysicalChange}/></span>
            <span>Owned Digitally: <input key="digital_checkbox" type="checkbox" checked={digital==="true"} onChange={handleDigitalChange}/></span>
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