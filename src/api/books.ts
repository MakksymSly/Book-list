import { Ibook } from '../types/Ibook';

const URL = import.meta.env.VITE_API_URL;

export const getBooks = async () => {
  const response = await fetch(URL);
  const books = await response.json();
  return books;
};

export const addBook = async (book: Omit<Ibook, 'id' | 'created' | 'modified' | 'isActive'>) => {
  const newBook = {
    ...book,
    isActive: true,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  };
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });
  return response.json();
};

export const updateBook = async (id: number, book: Partial<Ibook>) => {
  const updatedBook = {
    ...book,
    modified: new Date().toISOString(),
  };

  const response = await fetch(`${URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBook),
  });
  return response.json();
};

export const deleteBook = async (id: number) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const toggleActive = async (id: number, isActive: boolean) => {
  return updateBook(id, { isActive });
};
