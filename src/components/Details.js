import React, { useState, useEffect, createRef } from 'react';
import { API_KEY, API_URL_POST, API_URL_GET } from '../constants';
import { cart$, updateCart } from '../Store';
import Reviews from './Reviews';
import Rating from 'react-rating';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import axios from 'axios';
import styles from './Details.module.css'


function Details(props) {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  let rating = createRef();

  function addToCart(e) {
    e.preventDefault();

    let cart = cart$.value ? JSON.parse(cart$.value) : {}

    if(parseInt(e.target[0].value)) {
      if(cart[product.name]) {
        cart[product.name] = {...cart[product.name], quantity: cart[product.name].quantity += parseInt(e.target[0].value), total: cart[product.name].total += parseInt(e.target[0].value) * cart[product.name].price}
      } else {
        cart[product.name] = {_id: product._id, quantity: parseInt(e.target[0].value), price: product.price, total: parseInt(e.target[0].value) * product.price}
      }
      updateCart(cart);
    } else {
      console.error("Quantity is not a valid input!");
    }
  }

  function postReview(e) {
    e.preventDefault();
    e.persist();

    if(!parseInt(rating.current.state.value)) {
      console.error("Rating is required!")
    } else {
      let obj = { 
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

      axios.post(`${API_URL_POST}/reviews?token=${API_KEY}`, {
        headers: { 'Content-Type': 'application/json' },
        data: obj
      })
        .then(res => {
          e.target.children[0].value = "";
          e.target.children[1].value = "";
          setReviews([...reviews, res.data]);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }

  useEffect(() => {
    axios.get(`${API_URL_GET}/products?token=${API_KEY}&filter[name]=${props.match.params.product}`)
      .then(res => {
        setProduct(res.data.entries[0]);
        axios.get(`${API_URL_GET}/reviews?token=${API_KEY}&filter[product_name]=${props.match.params.product}`)
          .then(res => {
            setReviews(res.data.entries);
          })
          .catch(err => {
            console.error(err);
          })
      }) // eslint-disable-next-line
  }, [])

	return (
    <>
      <div className={styles.details}>
        {
          product.gallery ?
            <>
                <div style={{width: "300px"}}>
                  <AliceCarousel
                    buttonsDisabled={true}
                    autoPlayInterval={3000}
                    autoPlayDirection="ltr"
                    autoPlay={true}
                    responsive={{0: {items: 3},1024: {items: 1}}}
                    >
                  {
                    product.gallery.map((image) => {
                      return (
                        <img key={image.path} alt="carousel-img" className={styles.details__image} src={`http://localhost:8080/${image.path}`} />
                      )
                    })
                  }
                </AliceCarousel>
              </div>
              <div className={styles.details__container}>
                <div className={styles.details__name}>{product.name}</div>
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
                  <input type="number" name="quantity" min="1" max="50" placeholder="#"></input>
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
      {
        reviews.length ? <Reviews reviews={reviews}/> : null
      }
    </>
	);
}

export default Details;