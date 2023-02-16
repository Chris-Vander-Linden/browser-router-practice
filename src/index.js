import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import App from './App.js';
import Home from './components/Home.js';
import About from './components/About.js';
import BestBooks from './components/BestBooks.js';
import Error from './components/Error.js';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> } errorElement={ <Error /> }>
      <Route path="/" element={ <Home /> } />
      <Route path="/books" element={ <BestBooks /> } />
      <Route path="/about" element={ <About /> } />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);
