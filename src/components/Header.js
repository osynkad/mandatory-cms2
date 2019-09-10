import React, { useState } from 'react';
import styles from './Header.module.css';

function Header(props) {
	const [cartCount, setCartCount] = useState(0);

	function test() {
		let temp = cartCount;
		temp++;
		setCartCount(temp);
		console.log("Bingo!");
	}

	return (
		<header className={styles.header}>
			<span className={styles["header__logo-name"]}>Logo/name placeholder</span>
			<div className={styles.header__search}>
				<i style={{fontSize: "21px"}} className="material-icons">search</i>
				<input type="text" onChange={(e) => props.setSearchQuery(e.target.value)} className={styles.header__input} placeholder="Search products"></input>
				<input type="checkbox" onClick={(e) => props.setCheckbox(e.target.checked)}></input>Show in stock
			</div>
			<div className={styles.header__nav}>NAVIGATION</div>
			<div onClick={test} className={styles.header__cart}>
				<i style={{fontSize: "36px", userSelect: "none"}} className="material-icons">shopping_cart</i>
				{
					cartCount > 0 ?
					<div className={styles["header__cart-count"]}>{cartCount}</div> : null
				}
			</div>
		</header>
	);
}

export default Header;