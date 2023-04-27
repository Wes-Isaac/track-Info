import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar';
import Login from './components/login';
import Home from './components/home';
import Footer from './components/footer';
import Add from './components/add';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add' element={<Add />} />
        <Route path='/edit/:id' element={<Add />} />
      </Routes>
      <Footer />

    </Fragment>
  );
}

export default App;
