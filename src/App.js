import { useState } from 'react';
import './App.css';
import FormCreate from './components/createForm';
import Invoice from './components/form';
import Loginpage from './components/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='login' element={<Loginpage />}/>
        <Route path='form' element={<Invoice/>}/>
        <Route path='create-form' element={<FormCreate/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
