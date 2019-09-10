import React, { useState } from 'react';
import styles from './Product.module.css';

function Product(props) {

  function detailsModal(product) {
    console.log(product)
  }

	return (
    <div className={styles.item} onClick={() => detailsModal(props.product)}>
      <img src={props.product.image.path} alt="product_img" className={styles.item__image}/>
      <span className={styles.item__name}>{props.product.name}</span>
      <span className={styles.item__desc}>{props.product.description}</span>
      <span className={styles.item__price}>{props.product.price}</span>
      {
        parseInt(props.product.stock) ? 
        <>
          <div>
            In stock:
            <span className={styles.item__stock}> {props.product.stock}</span>
          </div>
          <button className={styles.item__add}>Add to cart</button> 
        </>
        :
        <>
          <div>
            In stock:
            <span className={styles["item__stock-disabled"]}> {props.product.stock}</span>
          </div>
          <button className={styles.item__add} disabled>Add to cart</button>
        </>
      } 
    </div>
	);
}

export default Product;