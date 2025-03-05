import './BookForm.scss';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BooksContext } from '../../context/BooksContext';

export const BookForm = () => {
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

  return (
    <div className="wrapper">
      <h2>{isEdit ? 'Edit Book' : 'Add a Book'}</h2>
      <Link to="/" className="dashboard-link">
        ← Back to Dashboard
      </Link>

      {contextError && <p className="error-message">{contextError}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form className="book-form" onSubmit={handleSubmit}>
        <label className="book-form--label">
          Title:
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </label>

        <label className="book-form--label">
          Author:
          <input
            type="text"
            value={data.author}
            onChange={(e) => handleChange('author', e.target.value)}
          />
          {errors.author && <p className="error-message">{errors.author}</p>}
        </label>

        <label className="book-form--label">
          Category:
          <select value={data.category} onChange={(e) => handleChange('category', e.target.value)}>
            <option value="">Select a category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Science">Science</option>
            <option value="Fantasy">Fantasy</option>
          </select>
          {errors.category && <p className="error-message">{errors.category}</p>}
        </label>

        <label className="book-form--label">
          ISBN:
          <input
            type="text"
            value={data.isbn}
            onChange={(e) => handleChange('isbn', e.target.value)}
          />
          {errors.isbn && <p className="error-message">{errors.isbn}</p>}
        </label>

        <button type="submit">{isEdit ? 'Edit Book' : 'Add a Book'}</button>
      </form>
    </div>
  );
};
