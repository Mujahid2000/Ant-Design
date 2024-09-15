import React from 'react'
import  ReactDOM  from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main';
import Error from './Layout/Error';
import Home from './Page/Home';
import ProductDetails from './Component/ProductDetails';
import AddProduct from './Component/AddProduct';
import { ProductProvider } from './Component/Context';
import ProductList from './Component/ProductList';
import Service from './Component/Service';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <Error/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        element:<ProductDetails/> ,
        path: '/productDetails/:id'
      },
      {
        path: '/addproduct',
        element: <AddProduct/>
      },
      {
        path: '/productList',
        element: <ProductList/>
      },
      {
        path: '/service',
        element: <Service/>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <ProductProvider>
   <RouterProvider router={router} />
   </ProductProvider>
  </React.StrictMode>
);
