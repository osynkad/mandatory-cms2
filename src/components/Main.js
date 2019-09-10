import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import axios from 'axios';
import { API_KEY } from '../constants';
import Product from './Product';

function Main(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/collections/get/products?token=${API_KEY}`)
      .then(res => {
        setProducts(res.data.entries);
      })
  }, []) 

  useEffect(() => {
    axios.post(`http://localhost:8080/api/collections/get/products?token=${API_KEY}`, {
      filter: {
        name: { $regex: props.searchQuery }
      }
    })
      .then(res => {
        setProducts(res.data.entries);
      })
  }, [props.searchQuery])

	return (
    <main className={styles.main}>
      {
        products.map(product => {
          return <Product key={product._id} product={product}/>
        })
      }
    </main>
	);
}

export default Main;