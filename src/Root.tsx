import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { App } from './App';
import { DashBoard } from './pages/DashBoard';
import { BookFormPage } from './pages/BookFormPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<DashBoard />} />
        <Route path="book">
          <Route path="new" element={<BookFormPage />} />
          <Route path="edit/:id" element={<BookFormPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
