import React from 'react';
import './App.css';
import { BookList, book } from './BookList';

type BannerProps = {
  name: string
}

function Banner({ name }: BannerProps) {
  return(
  <h1>{name}</h1>
  );
}

function App() {
  return (
    <div className="App">
      <Banner name="My Bookshelf"/>
      <BookList initialBooks={[] as book[]}/>
    </div>
  );
}

export default App;

