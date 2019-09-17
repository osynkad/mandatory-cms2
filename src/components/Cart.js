import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL_POST } from '../constants';
import { Link } from 'react-router-dom';
import { cart$, updateCart } from '../Store';
import axios from 'axios';
import styles from './Cart.module.css';

function Cart(props) {
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0); 
  const [order, setOrder] = useState(null);
  
  const cart = cart$.value ? JSON.parse(cart$.value) : null

  useEffect(() => {
    let t = total, q = quantity;
    if(cart) { // eslint-disable-next-line
      Object.keys(cart).map((product) => {
        t += cart[product].total;
        q += cart[product].quantity;
      })
      setTotal(t.toFixed(2));
      setQuantity(q);
    }  // eslint-disable-next-line
  }, [])
  

  function formatCart() {
    let order = [];  // eslint-disable-next-line
    for(let product in cart) {
      order.push({value: {product, _id: cart[product]._id, quantity: cart[product].quantity, price: cart[product].price, total: cart[product].total}})
    }
    return order;
  }

  function placeOrder(e) { // eslint-disable-next-line
    e.preventDefault();
    axios.post(`${API_URL_POST}/orders?token=${API_KEY}`, {
      headers: { 'Content-Type': 'application/json' },
      data: { name: e.target[0].value, address: e.target[1].value, total_price: total, order: formatCart() }
    })
      .then(res => {
        console.log(res);
        setOrder(res.data);
        updateCart();
      })
      .catch(err => {
        console.error(err);
      })
  }

	return (
    <div className={styles.cart}>
      {
        order ? 
        <>
          <div>Thank you for your purchase!</div>
          <div>Order # - {order._id}</div>
        </>
        :
        cart ? 
        <>
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
                Object.keys(cart).map((product) => {
                  return (
                    <tr key={cart[product]._id} className={styles["cart__tbody-row"]}>
                      <td><Link to={`/details/${product}`} className={styles.cart__link}>{product}</Link></td>
                      <td style={{textTransform: "lowercase"}}>x {cart[product].quantity}</td>
                      <td>${cart[product].price}</td>
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
                <th>${total}</th>
              </tr>
            </tfoot>
          </table>
          <form className={styles.form} onSubmit={(e) => placeOrder(e)}>
            <input className={styles.form__input} type="text" placeholder="name" required></input>
            <input className={styles.form__input} type="text" placeholder="address" required></input>
            <button className={styles.form__submit} type="submit">Place order</button>
          </form>
        </>
        : 
        <div>Your cart is empty.</div>
      }
    </div>
	);
}

export default Cart;