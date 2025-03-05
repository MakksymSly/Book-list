import { Ibook } from './Ibook';

export interface IbooksContext {
  books: Ibook[];
  fetchBooks: () => Promise<void>;
  uploadBook: (book: Omit<Ibook, 'id' | 'created' | 'modified' | 'isActive'>) => Promise<void>;
  patchBook: (id: number, book: Partial<Ibook>) => Promise<void>;
  toggleStatus: (id: number, isActive: boolean) => Promise<void>;
  removeBook: (id: number) => Promise<void>;
  error: string | null;
}
