import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import axios from 'axios';
import { API_KEY } from '../constants';
import Product from './Product';
import { Redirect, Link } from 'react-router-dom';


function Main(props) {
  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductPerPage] = useState(5); //let user decide through dropdown? 5/10/20/all?
  const [redirect, setRedirect] = useState(false);
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
        console.log(res.data);
        setTotal(res.data.total);
        setProducts(res.data.entries);
      })
  }

  useEffect(() => {
    requestProducts(parseInt(props.match.params.page)); // eslint-disable-next-line
  }, [props.searchQuery, props.checkbox, props.match.params.page])

  function changePage() {
    return <Redirect to={`/products/${parseInt(props.match.params.page) + 1}`}/>
  }

	return (
    <>
      <div>
        {
          props.match.params.page > 1 ? <Link id="previous" to={`/products/page-${parseInt(props.match.params.page) - 1}`} style={{marginRight: "10px"}}>Previous page</Link> : null
        }
        {
          props.match.params.page < Math.ceil(total/productsPerPage) ? <Link id="next" to={`/products/page-${parseInt(props.match.params.page) + 1}`}>Next page</Link> : null
        }
      </div>
      <div className={styles.items}>
        {
          products.map(product => {
            return <Product key={product._id} product={product}/>
          })
        }
      </div>
    </>
	);
}

export default Main;