import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routerInfo } from './router';
const router = createBrowserRouter(routerInfo)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

