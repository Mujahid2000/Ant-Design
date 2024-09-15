import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [detailsProduct, setDetailsProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(null);

// console.log(detailsProduct);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);  // Start loading before the request
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${params}`);
        setDetailsProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);  // Stop loading after request finishes (whether success or error)
      }
    };
  
    if (params) {  // Ensure params exist before making the request
      fetchProductDetails();
    }
  }, [params]);
  

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const receiveParams = (paramsData) =>{
    setParams(paramsData)
  }

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct, receiveParams, detailsProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
