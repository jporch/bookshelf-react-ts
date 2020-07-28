import React, { useState, useEffect } from 'react';
import './App.css';
import './BookList.tsx';
import {books as books_data} from './data/books.js';
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
    const [books, setBooks] = useState(initialBooks);
  
    useEffect(() => {
        const fetchData = async () => {
            await sleep(1000);  //Simulates API lag
            setBooks(books_data);
        }
        fetchData();
    }, []);
    
    if (books.length === 0) {
        return(
            <div>Loading.....</div>
        );
    }
  
    return (
        <div className="bookList">{
            books.map(
            (book, index) => <Book key={"book_"+index} book={book}/>
        )}</div>
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