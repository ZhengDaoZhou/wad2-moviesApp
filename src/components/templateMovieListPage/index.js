import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@material-ui/core/Typography";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function MovieListPageTemplate({ movies, title, action, page, paging, paging2 }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortType, setSortType] = useState("");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });
  
  if(sortType === "TopRated"){
    displayedMovies.sort((a,b)=>{
      return b.vote_average - a.vote_average;
    });
  }
  else if(sortType === "Lastest"){
    displayedMovies.sort((a,b)=>{
      let ayear=parseInt(a.release_date.substring(0,4));
      let byear=parseInt(b.release_date.substring(0,4));
      let amonth=parseInt(a.release_date.substring(5,7));
      let bmonth=parseInt(b.release_date.substring(5,7));
      let aday=parseInt(a.release_date.substring(8));
      let bday=parseInt(b.release_date.substring(8));
      let value = (byear-ayear)*1000 + (bmonth-amonth)*100 + (bday-aday);
      if (value === 0) value = b.vote_average - a.vote_average;
      return value
    });
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={3}>
        <Pagination count={10} shape="rounded" size="large" page={page} onChange={paging}/>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="h6">
          Go to page:
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Select
          value={page}
          onChange={paging2}
          variant="standard"
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={6}>Six</MenuItem>
          <MenuItem value={7}>Seven</MenuItem>
          <MenuItem value={8}>Eight</MenuItem>
          <MenuItem value={9}>Nine</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup variant="text">
          <Button onClick={() => {
              setSortType("TopRated");
          }}>Top Rated</Button>
          <Button onClick={() => {
              setSortType("Lastest");
          }}>Lastest</Button>
        </ButtonGroup>
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;