import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const AddToWatchIcon = ({ movie }) => {

  const context = useContext(MoviesContext);
  const {mustWatch} = useContext(MoviesContext);
  
  const handleAddToWatch = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
    //console.log(mustWatch);
  };

  return (
    <IconButton aria-label="add to watch" onClick={handleAddToWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchIcon;