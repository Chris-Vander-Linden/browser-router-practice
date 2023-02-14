import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import App from './App.js';
import About from './components/About.js';
import Books from './components/Books.js';
import MissingPage from './components/MissingPage.js';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={ <App /> } >
        <Route path="/" element={ <>HOME!!!</>} />
        <Route path="/books" element={ <Books /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/missing" element={ <MissingPage /> } />
      </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);
