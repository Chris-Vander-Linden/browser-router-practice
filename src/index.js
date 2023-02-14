import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import App from './App.js';
import About from './components/About.js';
import Books from './components/Books.js';
import Error from './components/Error.js';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> } errorElement={ <Error /> }>
      <Route path="/" element={ <>HOME!!! Welcome.  It's a cool site for cool kids!</> } />
      <Route path="/books" element={ <Books /> } />
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
