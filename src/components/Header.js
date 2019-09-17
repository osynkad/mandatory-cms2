import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cart$ } from '../Store';
import styles from './Header.module.css';

function Header(props) {
	const [cartItems, setCartItems] = useState(0);

	useEffect(() => {
		cart$.subscribe(newCart => {
			if(newCart) {
				setCartItems(Object.keys(JSON.parse(newCart)).length);
			} else {
				setCartItems(0);
			}
    });
	}, [])

	return (
		<header className={styles.header}>
			<Link to="/products/page-1" className={styles["header__logo-name"]}><span>PUNK API</span></Link>
			<div className={styles.header__search}>
				<i style={{fontSize: "21px"}} className="material-icons">search</i>
				<input type="text" onChange={(e) => props.setSearchQuery(e.target.value)} className={styles.header__input} placeholder="Search products"></input>
				<br />
				<input type="checkbox" onClick={(e) => props.setCheckbox(e.target.checked)}></input>Show in stock
			</div>
			<div className={styles.header__cart}>
			<Link to="/cart" style={{textDecoration: "none", color: "white"}}><i style={{fontSize: "36px", userSelect: "none"}} className="material-icons">shopping_cart</i></Link>
				{
					cartItems ?
					<div className={styles["header__cart-count"]}>{cartItems}</div> : null
				}
			</div>
		</header>
	);
}

export default Header;