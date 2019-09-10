import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import axios from 'axios';
import { API_KEY } from '../constants';
import Product from './Product';

function Main(props) {
  const [products, setProducts] = useState([]);

  function requestProducts() { // eslint-disable-next-line
    let $regex = props.checkbox ? "^[1-9]\d*" : "";
    axios.post(`http://localhost:8080/api/collections/get/products?token=${API_KEY}`, {
      filter: {
        name: { $regex: props.searchQuery },
        stock: { $regex }
      }
    })
      .then(res => {
        setProducts(res.data.entries);
      })
  }

  useEffect(() => {
    requestProducts(); // eslint-disable-next-line
  }, [props.searchQuery, props.checkbox])

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