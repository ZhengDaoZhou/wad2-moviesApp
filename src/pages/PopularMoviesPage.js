import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getPopularMovies } from "../api/tmdb-api";
import AddToWatchIcon from '../components/cardIcons/addToWatch'

const PopularMoviesPage = (props) => {
  const [page, setPage] = useState(1);
  const {  data, error, isLoading, isError }  = useQuery(["popular page", { page: page }], getPopularMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      action={(movie) => {
        return <AddToWatchIcon movie={movie} />
      }}
      page={page}
      paging={(event,value) =>{
        setPage(value);
      }}
    />
  );
};
export default PopularMoviesPage;