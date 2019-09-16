import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { cart$ } from '../Store';
import axios from 'axios';
import { API_KEY } from '../constants';

function Cart(props) {
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  
  const cart = JSON.parse(cart$.value);

  useEffect(() => {
    let t = total, q = quantity;
    Object.keys(cart).map((item) => {
      console.log(cart[item])
      t += cart[item].total;
      q += cart[item].quantity;
    })
    setTotal(t.toFixed(2));
    setQuantity(q);
  }, [])


  function cheat() {
    console.log(cart);
    axios.get(`http://localhost:8080/api/collections/get/orders?token=${API_KEY}`)
      .then(res => {
        console.log(res.data);
      })
  }

  function placeOrder() { // eslint-disable-next-line
    axios.post(`http://localhost:8080/api/collections/save/orders?token=${API_KEY}`, {
      headers: { 'Content-Type': 'application/json' },
      data: { name: "emil", adress: "kallegatan", order: [{value: {product: "kek", quantity: 2, price: 3}}, {value: {product: "kak", quantity: 20, price: 30}}] }
    })
      .then(res => {
        console.log(res);
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
                    <td>{item}</td>
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
              <th onClick={cheat}>Total</th>
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