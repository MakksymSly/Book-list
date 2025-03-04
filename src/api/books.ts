import { Ibook } from '../types/Ibook';

const URL = import.meta.env.VITE_API_URL;

export const getBooks = async () => {
  const response = await fetch(URL);
  const books = await response.json();
  return books;
};

export const postBook = async (book: Ibook) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  return response.json();
};

export const updateBook = async (book: Ibook) => {
  const response = await fetch(`${URL}/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  return response.json();
};

export const deleteBook = async (id: number) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
