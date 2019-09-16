import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { cart$ } from '../Store';

function Header(props) {
	const [cartItems, setCartItems] = useState(0);

	useEffect(() => {
		cart$.subscribe(newCart => {
			if(newCart !== null) {
				setCartItems(Object.keys(JSON.parse(newCart)).length);
			}
    });
	})

	return (
		<header className={styles.header}>
			<span className={styles["header__logo-name"]}>Logo/name placeholder</span>
			<div className={styles.header__search}>
				<i style={{fontSize: "21px"}} className="material-icons">search</i>
				<input type="text" onChange={(e) => props.setSearchQuery(e.target.value)} className={styles.header__input} placeholder="Search products"></input>
				<input type="checkbox" onClick={(e) => props.setCheckbox(e.target.checked)}></input>Show in stock
			</div>
			<div className={styles.header__nav}>NAVIGATION</div>
			<div className={styles.header__cart}>
			<Link to="/cart" style={{textDecoration: "none"}, {color: "white"}}><i style={{fontSize: "36px", userSelect: "none"}} className="material-icons">shopping_cart</i></Link>
				{
					cartItems ?
					<div className={styles["header__cart-count"]}>{cartItems}</div> : null
				}
			</div>
		</header>
	);
}

export default Header;