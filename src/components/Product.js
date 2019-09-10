import React, { useState } from 'react';
import styles from './Product.module.css';

function Product(props) {

  function detailsModal(product) {
    console.log(product)
  }

	return (
    <div className={styles.item} onClick={() => detailsModal(props.product)}>
      <img src={props.product.image.path} alt="product_img" className={styles.item__image}/>
      <div className={styles.item__name}>{props.product.name}</div>
      <div className={styles.item__desc}>{props.product.description}</div>
      <div className={styles.item__price}>{props.product.price}</div>
      {
        parseInt(props.product.stock) ? 
        <div className={styles.item__stock}>
          Available:
          <span className={styles["item__stock-available"]}> {props.product.stock}</span>
        </div>
        :
        <div className={styles.item__stock}>
          Available:
          <span className={styles["item__stock-unavailable"]}> {props.product.stock}</span>
        </div>
      } 
    </div>
	);
}

export default Product;