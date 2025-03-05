import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';

export function App() {
  return (
    <>
      <div className=" page-wrapper">
        <div className="_container content-wrapper">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
