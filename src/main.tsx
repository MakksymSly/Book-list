import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { Root } from './Root.tsx';
import { BooksProvider } from './context/BooksProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BooksProvider>
      <Root />
    </BooksProvider>
  </StrictMode>,
);
