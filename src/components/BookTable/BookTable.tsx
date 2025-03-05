import './BookTable.scss';
import { useContext } from 'react';
import { BooksContext } from '../../context/BooksContext';
import { Ibook } from '../../types/Ibook';
import { formatDate } from '../../utils/utils';
import { BookCard } from '../BookCard/BookCard';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

interface Props {
  books: Ibook[];
}

export const BookTable: React.FC<Props> = ({ books }) => {
  const row = ['Title', 'Author', 'Category', 'ISBN', 'Created', 'Modified', 'Actions'];
  const booksContext = useContext(BooksContext);
  const isTablet = useMediaQuery({ query: '(min-width: 600px)' });

  const { toggleStatus, removeBook } = booksContext!;

  const navigate = useNavigate();

  return (
    <>
      {isTablet ? (
        <table className="book-table">
          <thead className="book-table__header">
            <tr>
              {row.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody className="book-table__body">
            {books.map((book: Ibook) => (
              <tr key={book.id} className="book-table__row">
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.isbn}</td>
                <td>{formatDate(book.created)}</td>
                <td>{book.modified ? formatDate(book.modified) : 'N/A'}</td>
                <td className="book-table__actions">
                  <button
                    className="book-table__button book-table__button--toggle"
                    onClick={() => toggleStatus(book.id, !book.isActive)}
                  >
                    {book.isActive ? 'Deactivate' : 'Re-Activate'}
                  </button>
                  <button
                    className="book-table__button book-table__button--edit"
                    onClick={() => {
                      navigate(`/book/edit/${book.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`book-table__button book-table__button--delete ${book.isActive ? 'disabled' : ''}`}
                    onClick={() => removeBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <BookCard books={books} />
      )}
    </>
  );
};
