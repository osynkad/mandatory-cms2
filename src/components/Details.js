import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../constants';
import styles from './Details.module.css'
import { cart$, updateCart } from '../Store';

function Details(props) {
  const [product, setProduct] = useState({});

  function addToCart(product, e) {
    e.preventDefault();
    let cart = JSON.parse(cart$.value) || {};

    cart[product.name] ? 
      cart[product.name] = {...cart[product.name], quantity: cart[product.name].quantity += parseInt(e.target[0].value), total: cart[product.name].total += parseInt(e.target[0].value) * cart[product.name].price} 
      : 
      cart[product.name] = {_id: product._id, quantity: parseInt(e.target[0].value), price: product.price, total: parseInt(e.target[0].value) * product.price}

    updateCart(cart);
  }

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
              {
                parseInt(product.stock) ? 
                <div className={styles.details__stock}>
                  Available:
                  <span className={styles["details__stock-available"]}> {product.stock}</span>
                </div>
                :
                <div className={styles.details__stock}>
                  Available:
                  <span className={styles["details__stock-unavailable"]}> {product.stock}</span>
                </div>
              }
              <div className={styles.details__price}>${product.price}</div>
              <form onSubmit={(e) => addToCart(product, e)} className={styles.details__add}>
                <input type="number" name="quantity" min="1" max="50"></input>
                <button type="submit" className={styles.details__btn}>Add to cart</button>
              </form>
            </div>
          </>
          :
          null
      }
    </div>
	);
}

export default Details;