import React, { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import { API_KEY } from '../constants';
import styles from './Details.module.css'
import { cart$, updateCart } from '../Store';
import Rating from 'react-rating';

function Details(props) {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  let rating = createRef();

  function addToCart(e) {
    e.preventDefault();
    let cart = JSON.parse(cart$.value) || {};

    if(cart[product.name]) {
      cart[product.name] = {...cart[product.name], quantity: cart[product.name].quantity += parseInt(e.target[0].value), total: cart[product.name].total += parseInt(e.target[0].value) * cart[product.name].price}
    } else {
      cart[product.name] = {_id: product._id, quantity: parseInt(e.target[0].value), price: product.price, total: parseInt(e.target[0].value) * product.price}
    }
    updateCart(cart);
  }

  function postReview(e) {
    e.preventDefault();
    if(!parseInt(rating.current.state.value)) {
      console.error("Rating is required!")
    } else {
      axios.post(`http://localhost:8080/api/collections/save/reviews?token=${API_KEY}`, {
        headers: { 'Content-Type': 'application/json' },
        data: { 
          title: e.target.children[0].value, 
          body: e.target.children[1].value, 
          rating: parseInt(rating.current.state.value), 
          product_name: 
            {
              link: "products", 
              display: props.match.params.product, 
              _id: product._id
            }
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/collections/get/products?token=${API_KEY}&filter[name]=${props.match.params.product}`)
      .then(res => {
        setProduct(res.data.entries[0]);
        axios.get(`http://localhost:8080/api/collections/get/reviews?token=${API_KEY}&filter[product_name]=${props.match.params.product}`)
          .then(res => {
            setReviews(res.data.entries);
            console.log(reviews);
          })
          .catch(err => {
            console.error(err);
          })
      }) // eslint-disable-next-line
  }, [])

	return (
    <div className={styles.details}>
      {
        product.image_url ?
          <>
            <img alt="" src={product.image_url.path} className={styles.details__image}/>
            <div className={styles.details__container}>
              <div onClick={postReview} className={styles.details__name}>{product.name}</div>
              <div className={styles.details__desc}>{product.description}</div>
              {
                parseInt(product.stock) ? 
                <div className={styles.details__stock}>
                  Available:
                  <span className={styles["details__stock-available"]}> {product.stock}</span>
                </div>
                :
                <div className={styles.details__stock}>
                  Available:
                  <span className={styles["details__stock-unavailable"]}> {product.stock}</span>
                </div>
              }
              <div className={styles.details__price}>${product.price}</div>
              <form onSubmit={(e) => addToCart(e)} className={styles.details__add}>
                <input type="number" name="quantity" min="1" max="50"></input>
                <button type="submit" className={styles.details__btn}>Add to cart</button>
              </form>
              <form className={styles.form} onSubmit={(e) => postReview(e)}>
                <input className={styles.form__input} type="text" required></input>
                <textarea className={[styles.form__input, styles.form__textarea].join(' ')} required></textarea>
                <Rating
                  ref={rating}
                  style={{marginTop: "5px"}}
                  emptySymbol={<img alt="empty star" src="https://i.imgur.com/WGjj5N4.png" className="icon" />}
                  fullSymbol={<img alt="full star" src="https://i.imgur.com/THRrctC.png" className="icon" />}
                />
                <button style={{marginTop: "5px", paddingTop: "2px"}} className={styles.form__submit} type="submit">Add review</button>
              </form>
            </div>
          </>
          :
          null
      }
    </div>
	);
}

export default Details;