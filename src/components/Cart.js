import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { cart$, updateCart } from '../Store';
import axios from 'axios';
import { API_KEY } from '../constants';

function Cart(props) {
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  
  const cart = JSON.parse(cart$.value);

  useEffect(() => {
    let t = total, q = quantity;
    if(cart) { // eslint-disable-next-line
      Object.keys(cart).map((item) => {
        t += cart[item].total;
        q += cart[item].quantity;
      })
      setTotal(t.toFixed(2));
      setQuantity(q);
    }  // eslint-disable-next-line
  }, [])
  

  function formatCart() {
    let order = [];
    for(let item in cart) {
      order.push({value: {product: item, _id: cart[item]._id, quantity: cart[item].quantity, price: cart[item].price, total: cart[item].total}})
    }
    return order;
  }

  function placeOrder() { // eslint-disable-next-line
    axios.post(`http://localhost:8080/api/collections/save/orders?token=${API_KEY}`, {
      headers: { 'Content-Type': 'application/json' },
      data: { name: "emil", adress: "kallegatan", order: formatCart() }
    })
      .then(res => {
        console.log(res);
        updateCart();
      })
      .catch(err => {
        console.error(err);
      })
  }

	return (
    <div className={styles.cart}>
      {
        cart$.value ? 
        <table className={styles.cart__table}>
          <thead className={styles.cart__thead}>
            <tr className={styles["cart__thead-row"]}>
              <th className={styles["cart__thead-product"]}>Product</th>
              <th className={styles["cart__thead-quantity"]}>Quantity</th>
              <th className={styles["cart__thead-price"]}>Price</th>
            </tr>
          </thead>
          <tbody className={styles.cart__tbody}>
            {
              Object.keys(cart).map((item) => {
                return (
                  <tr key={cart[item]._id} className={styles["cart__tbody-row"]}>
                    <td><Link to={`/details/${item}`} className={styles.cart__link}>{item}</Link></td>
                    <td style={{textTransform: "lowercase"}}>x {cart[item].quantity}</td>
                    <td>${cart[item].price}</td>
                  </tr>
                )
              })
            }
            <tr id="separator" style={{height: "20px"}}></tr>
          </tbody>
          <tfoot>
            <tr className={styles["cart__tfoot-row"]}>
              <th>Total</th>
              <th style={{textTransform: "lowercase"}}>x {quantity}</th>
              <th onClick={placeOrder}>${total}</th>
            </tr>
          </tfoot>
        </table>
        : 
        <div>Your cart is empty.</div>
      }
    </div>
	);
}

export default Cart;