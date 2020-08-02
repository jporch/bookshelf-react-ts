import React, { useState, useEffect } from 'react';
import './App.css';
import { Controls, emptyFilters } from './Controls';
//import {books as books_data} from './data/books.js';
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export type book = {
    id: string,
    title: string,
    author: string,
    categories: string[],
    isbn: string,
    owned_physical: string,
    owned_digital: string,
    lastUpdate: string
}
  
type BookListProps = {
    initialBooks: book[]
}
  
function BookList({initialBooks}: BookListProps) {
    const [booksData, setBooksData] = useState(new Array<book>());
    const [books, setBooks] = useState(initialBooks);
    const [categories, setCategories] = useState(new Set<string>());
    const [filters, setFilters] = useState(emptyFilters);
  
    useEffect(() => {
        const fetchData = async () => {
            await sleep(500);
            await fetch('/books.json').then(response => response.json()).then(data => setBooksData(data));
        }
        fetchData();
    }, []);

    useEffect(() => {
        const cats = new Set(booksData.map(b => b.categories ).filter(b => b.length !== 0 ).flat(1));
        setCategories(cats);
    }, [booksData]);

    useEffect(() => {
        let b = booksData;
        b = b.filter((book)=>book.title.toLowerCase().includes(filters['title']));
        b = b.filter((book)=>book.author.toLowerCase().includes(filters['author']));

        if (filters['owned'] === 'physical') b = b.filter((book)=>book.owned_physical === "true");
        if (filters['owned'] === 'digital') b = b.filter((book)=>book.owned_digital === "true");
        if (filters['owned'] === 'any') b = b.filter((book)=>book.owned_physical === "true" || book.owned_digital === "true");
        if (filters['owned'] === 'all') b = b.filter((book)=>book.owned_physical === "true" && book.owned_digital === "true");
        
        if (filters["category"]) b = b.filter((book)=>book.categories.includes(filters["category"]));

        setBooks(b);
    }, [filters,booksData]);

  
    return (
        <div>
            <Controls filters={filters} categories={categories} filterHandler={setFilters}/>
            <List books={books}/>
        </div>
    );
}

type ListProps = {
    books: book[]
}
function List({ books }: ListProps) {
    if (books.length === 0) {
        return(
            <h2 className="book-list">No Results</h2>
        );
    }
  
    return (
        <div className="book-list">{
            books.map((book, index) => <Book key={"book_"+index} book={book}/>)
        }</div>
    );
}

type BookProps = {
    book: book
}
  
function Book({ book }: BookProps) {
    return (
        <div className="book">
            <Title name={book.title}/>
            <Author name={book.author}/>
            <ISBN isbn={book.isbn}/>
            <CategoryList bookID={book.id} categories={book.categories}/>
            <Owned physical={book.owned_physical} digital={book.owned_digital} />
        </div>
    );
}

type TitleProps = {
    name: string
}
  
function Title({ name }: TitleProps) {
    return(
        <h2>{name}</h2>
    );
}
  
type AuthorProps = {
    name: string
}
  
function Author({ name }: AuthorProps ) {
    return(
        <div>by<br/>{name}</div>
    );
}
  
type ISBNProps = {
    isbn: string
}
  
function ISBN({ isbn }: ISBNProps ) {
    return(
      isbn ? <div>ISBN: {isbn}</div> : null
    );
}
  
type CategoryListProps = {
    bookID: string,
    categories: string[]
}
  
function CategoryList({ bookID, categories }: CategoryListProps) {
    return(
        categories.length > 0 ? <div>Categories: {categories.map((cat, index) => <Category key={bookID+"_cat_"+index} category={cat}/>)}</div> : null
    );
}

type CategoryProps = {
    category: string
}
  
function Category({ category }: CategoryProps) {
    return(
        <span className="category-entry">{category}</span>
    );
}
  
type OwnedProps = {
    physical: string,
    digital: string
}
  
function Owned({ physical, digital }: OwnedProps) {
    if (physical || digital) {
        return(
            <div>Owned? 
                {physical ? <span className="owned-entry">Physical</span>:null}
                {digital ? <span className="owned-entry">Digital</span>:null}
            </div>
        );
    }
    return(null);
}

export { BookList };