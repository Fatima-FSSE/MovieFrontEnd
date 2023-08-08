import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react';

function Reviews({getMovieData, movie, reviews, setReviews}) {
    let params = useParams();
    const revText = useRef();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
      e.preventDefault();

      const rev = revText.current;

      try {
        const response = await api.post("/api/v1/reviews", {
            reviewBody: rev.value,
            imdbId: movieId
        });

        const updatedReviews = reviews!=null?[...reviews, { body: rev.value }]:[{body:rev.value}];

        rev.value = "";

        setReviews(updatedReviews);
        } catch (error) {
          console.log(error);
        }

    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <img src={movie?.poster} alt="Movie Poster" />
          </Col>
          <Col>
              {
                <>
                    <Row>
                        <Col>
                             <ReviewForm addReview={addReview} revText={revText} labelText="Write a Review" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr /> 
                        </Col>
                    </Row>
                </>
              }
              {
                 reviews?.map((r) => {
                    return(
                        <>
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                                 <Col>
                                    <hr /> 
                                </Col>
                            </Row>
                        </>
                    )
                 })
              }
          </Col>
        </Row>
    </Container>
  )
}

export default Reviews;