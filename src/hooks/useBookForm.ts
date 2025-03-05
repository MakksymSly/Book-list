import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';

export const useBookForm = () => {
  const { books, uploadBook, patchBook, error: contextError } = useContext(BooksContext)!;
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;
  const currentBook = books.find((book) => Number(book.id) === Number(id));

  const [data, setData] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isEdit && currentBook) {
      setData({
        title: currentBook.title,
        author: currentBook.author,
        category: currentBook.category,
        isbn: currentBook.isbn,
      });
    }
  }, [isEdit, currentBook]);

  const validate = () => {
    const newErrors = { title: '', author: '', category: '', isbn: '' };
    let valid = true;

    if (!data.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    if (!data.author.trim()) {
      newErrors.author = 'Author is required';
      valid = false;
    }
    if (!data.category) {
      newErrors.category = 'Category is required';
      valid = false;
    }
    if (!data.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
      valid = false;
    } else if (
      !/^(?:\d{9}[\dXx]|\d{13}|\d{1,5}-\d{1,7}-\d{1,7}-[\dXx]|\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-[\dXx])$/.test(
        data.isbn,
      )
    ) {
      newErrors.isbn = 'Invalid ISBN format';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    if (isEdit && id) {
      patchBook(Number(id), data);
    } else {
      uploadBook(data);
    }

    setSuccessMessage(isEdit ? 'Book updated successfully!' : 'Book added successfully!');
    setTimeout(() => navigate('/'), 2000);
  };

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  return {
    data,
    errors,
    successMessage,
    contextError,
    isEdit,
    handleChange,
    handleSubmit,
  };
};
