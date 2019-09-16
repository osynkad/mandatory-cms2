import React from 'react';
import styles from './Pagination.module.css';
import { Link } from 'react-router-dom';

function Pagination(props) {

	return (
    <div className={styles.pagination}>
      {
        props.page > 1 ? 
        <Link to={`/products/page-${parseInt(props.page) - 1}`} className={styles.pagination__move}>PREV</Link> 
        : 
        <span className={styles["pagination__move-disabled"]}>PREV</span>
      }
      {
        props.page < Math.ceil(props.total/props.productsPerPage) ? 
        <Link to={`/products/page-${parseInt(props.page) + 1}`} className={styles.pagination__move}>NEXT</Link> 
        : 
        <span className={styles["pagination__move-disabled"]}>NEXT</span>
      }
    </div>
	);
}

export default Pagination;