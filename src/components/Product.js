import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Product.module.css';

function Product(props) {
	return (
    <div className={styles.item}>
      <img src={`http://localhost:8080/${props.product.gallery[0].path}`} alt="product_img" className={styles.item__image}/>
      <Link to={`/details/${props.product.name}`} className={styles.item__name}>{props.product.name}</Link>
      <div className={styles.item__price}>${props.product.price}</div>
    </div>
	);
}

export default Product;