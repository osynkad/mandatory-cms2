import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL_GET } from '../constants';
import Product from './Product';
import Pagination from './Pagination';
import axios from 'axios';
import styles from './Items.module.css';


function Main(props) {
  const [products, setProducts] = useState([]);  // eslint-disable-next-line
  const [productsPerPage, setProductPerPage] = useState(8);
  const [total, setTotal] = useState(0);

  function requestProducts(page) { // eslint-disable-next-line
    let $regex = props.checkbox ? "^[1-9]\d*" : "";
    axios.post(`${API_URL_GET}/products?token=${API_KEY}&limit=${productsPerPage}&skip=${productsPerPage * (page - 1)}`, {
      filter: {
        name: { $regex: props.searchQuery },
        stock: { $regex }
      }
    })
      .then(res => {
        console.log(res);
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