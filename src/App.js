import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {
  const [movies, setMovies] = useState([]); //destructured array for keeping state of movie object
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();
  const getMovies = async () => {
    //asyn method make sure that long run function like api calss don't block
    // the UI thread from rendering for better UX.
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data); //this line will wait untill the above line finished execution.
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieData = async (movieId) => {

    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviews);

    } catch (error) {
      
    }

  }

  useEffect(() => {
    // this method will be called when the first time App component is loaded or rendered.
    getMovies();
  }, []);

  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData = {getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/> } ></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
