import './BookForm.scss';
import { Link } from 'react-router-dom';
import { useBookForm } from '../../hooks/useBookForm';

export const BookForm = () => {
  const { data, errors, successMessage, contextError, isEdit, handleChange, handleSubmit } =
    useBookForm();

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
