import React from 'react';
import Rating from 'react-rating';
import styles from './Reviews.module.css'

function Reviews(props) {

	return (
    <div className={styles.review__container}>
      {
        props.reviews.map((review) => {
          return (
            <div className={styles.review} key={review._id}>
              <div className={styles.review__title}>{review.title}</div>
              <div className={styles.review__body}>{review.body}</div>
              <Rating
                  style={{marginTop: "5px"}}
                  emptySymbol={<img alt="empty star" src="https://i.imgur.com/WGjj5N4.png" className="icon" />}
                  fullSymbol={<img alt="full star" src="https://i.imgur.com/THRrctC.png" className="icon" />}
                  initialRating={review.rating}
                  readonly
                />
            </div>
          )
        })
      } 
    </div>
	);
}

export default Reviews;