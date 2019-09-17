import React, { useState, useEffect } from 'react';
import styles from './Items.module.css';
import axios from 'axios';
import { API_KEY } from '../constants';
import Product from './Product';
import Pagination from './Pagination';


function Main(props) {
  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductPerPage] = useState(8);
  const [total, setTotal] = useState(0);

  function requestProducts(page) { // eslint-disable-next-line
    let $regex = props.checkbox ? "^[1-9]\d*" : "";
    axios.post(`http://localhost:8080/api/collections/get/products?token=${API_KEY}&limit=${productsPerPage}&skip=${productsPerPage * (page - 1)}`, {
      filter: {
        name: { $regex: props.searchQuery },
        stock: { $regex }
      }
    })
      .then(res => {
        setTotal(res.data.total);
        setProducts(res.data.entries);
      })
  }

  useEffect(() => {
    requestProducts(parseInt(props.match.params.page)); // eslint-disable-next-line
  }, [props.searchQuery, props.checkbox, props.match.params.page]);

	return (
    <>
      <div className={styles.items}>
        {
          products.map(product => {
            return <Product key={product._id} product={product}/>
          })
        }
      </div>
      <Pagination page={props.match.params.page} total={total} productsPerPage={productsPerPage}/>
    </>
	);
}

export default Main;