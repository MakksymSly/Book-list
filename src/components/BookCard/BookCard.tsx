import { Ibook } from '../../types/Ibook';
import { BookCardItem } from '../BookCardItem/BookCardItem';
interface Props {
  books: Ibook[];
}
export const BookCard: React.FC<Props> = (props) => {
  const { books } = props;

  return (
    <div className="book-card">
      {books.map((book) => (
        <BookCardItem key={book.id} book={book} />
      ))}
    </div>
  );
};
