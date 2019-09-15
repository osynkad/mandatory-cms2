import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../constants';
import styles from './Details.module.css'

function Details(props) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/api/collections/get/products?token=${API_KEY}&filter[name]=${props.match.params.product}`)
      .then(res => {
        setProduct(res.data.entries[0]);
      })
  }, [])

	return (
    <div className={styles.details}>
      {
        product.image_url ?
          <>
            <img alt="" src={product.image_url.path} className={styles.details__image}/>
            <div className={styles.details__container}>
              <div className={styles.details__name}>{product.name}</div>
              <div className={styles.details__desc}>{product.description}</div>
              <div className={styles.details__stock}>{product.stock}</div>
              <div className={styles.details__price}>{product.price}</div>
              <button className={styles.details__add}>Add to cart</button>
            </div>
          </>
          :
          null
      }
    </div>
	);
}

export default Details;