import React from 'react';
import styles from './Product.module.css';
import { Link } from 'react-router-dom';

function Product(props) {

	return (
    <div className={styles.item}>
      <img src={props.product.image_url.path} alt="product_img" className={styles.item__image}/>
      <Link to={`/details/${props.product.name}`} className={styles.item__name}>{props.product.name}</Link>
      <div className={styles.item__price}>${props.product.price}</div>
    </div>
	);
}

export default Product;