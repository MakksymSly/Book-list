import { useEffect, useState, ReactNode } from 'react';
import { Ibook } from '../types/Ibook';
import { addBook, deleteBook, getBooks, toggleActive, updateBook } from '../api/books';
import { BooksContext } from './BooksContext';

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Ibook[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getBooks();
        setBooks(response);
      } catch {
        setError('Failed to fetch books');
      }
    })();
  }, []);

  const fetchBooks = async () => {
    try {
      const books = await getBooks();
      setBooks(books);
    } catch {
      setError('Failed to fetch books');
    }
  };

  const uploadBook = async (book: Omit<Ibook, 'id' | 'created' | 'modified'>) => {
    try {
      await addBook(book);
      fetchBooks();
    } catch {
      setError('Failed to upload book');
    }
  };

  const patchBook = async (id: number, book: Partial<Ibook>) => {
    try {
      await updateBook(id, book);
      fetchBooks();
    } catch {
      setError('Failed to update book');
    }
  };

  const toggleStatus = async (id: number, isActive: boolean) => {
    try {
      await toggleActive(id, isActive);
      fetchBooks();
    } catch {
      setError('Failed to toggle book status');
    }
  };

  const removeBook = async (id: number) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch {
      setError('Failed to remove book');
    }
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        uploadBook,
        patchBook,
        toggleStatus,
        removeBook,
        error,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
