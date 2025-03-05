import { createContext } from 'react';
import { IbooksContext } from '../types/IbooksContext';

export const BooksContext = createContext<IbooksContext | null>(null);
