import { useContext, useState } from 'react';
import { BooksContext } from '../context/BooksContext.tsx';
import { Ibook } from '../types/Ibook';
import { Filter } from '../components/Filter/Filter.tsx';
import { Ifilter } from '../types/Ifilter.ts';
import { BookTable } from '../components/BookTable/BookTable.tsx';
import { useNavigate } from 'react-router-dom';

export const DashBoard = () => {
  const booksContext = useContext(BooksContext);

  const { books, error } = booksContext!;

  const [filter, setFilter] = useState<Ifilter>(Ifilter.ACTIVE);

  const navigate = useNavigate();

  const filteredBooks = books.filter((book: Ibook) => {
    switch (filter) {
      case Ifilter.ACTIVE:
        return book.isActive;
      case Ifilter.DEACTIVATED:
        return !book.isActive;
      default:
        return true;
    }
  });

  const handleFilterChange = (selectedFilter: Ifilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <Filter handleFilterChange={handleFilterChange} />
      <button
        className="add--button"
        onClick={() => {
          navigate('/book/new');
        }}
      >
        Add Book
      </button>
      <BookTable books={filteredBooks} />
    </div>
  );
};
