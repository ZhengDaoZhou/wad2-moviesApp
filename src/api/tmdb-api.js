export const getMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};
  
export const getMovie = (args) => {
  // console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  
export const getGenres = async () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      process.env.REACT_APP_TMDB_KEY +
      "&language=en-US"
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};
  
export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
  .catch((error) => {
    throw error
  });
};

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getUpcomingMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getTopRatedMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getPopularMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const login = async (user) => {
  let res = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=53a32bd3a176316867dc567ed373c537`);
  let { request_token } = await res.json();
  res = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=53a32bd3a176316867dc567ed373c537', {
    method: "post",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      ...user,
      request_token
    })
  });
  res = await res.json();
  if (res.success) {
    res = await fetch("https://api.themoviedb.org/3/authentication/session/new?api_key=53a32bd3a176316867dc567ed373c537", {
      method: "post",
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        request_token: res.request_token
      })
    })
    return await res.json()
  }
  return false;
}

export const getAccount = async () => {
  const res = await fetch("https://api.themoviedb.org/3/account?api_key=53a32bd3a176316867dc567ed373c537&session_id=" + localStorage.getItem("session"))
  return await res.json();
}