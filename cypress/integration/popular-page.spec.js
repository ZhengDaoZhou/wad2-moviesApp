let movies;    // List of movies from TMDB
let movies_page;

// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

describe("Popular Page ", () => {
  before(() => {
    // Get movies from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      })
  })
  beforeEach(() => {
    cy.visit("/movies/popular")
  });

  describe("Base test", () => {
    it("displays page header", () => {
      cy.get("h3").contains("Popular Movies");
      cy.get("h1").contains("Filter the movies");
    });
  });

  describe("Filtering", () => {
    describe("By movie title", () => {
        it("should only display movies with m in the title", () => {
          let searchString = "m";
          let matchingMovies = filterByTitle(movies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
        })
        it("should only display movies with o in the title", () => {
          let searchString = "o";
          let matchingMovies = filterByTitle(movies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter o in text box
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
        });
        it("should display no movies when the search string is xyz", () => {
            // Do a second test for certainty!
            let searchString = "xyz";
            let matchingMovies = filterByTitle(movies, searchString);
            cy.get("#filled-search").clear().type(searchString); // Enter xyz in text box
            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });
    })

    describe("By movie genre", () => {
        it("should display movies with the specified genre only", () => {
           const selectedGenreId = 35;
           const selectedGenreText = "Comedy";
           const matchingMovies = filterByGenre(movies, selectedGenreId);
           cy.get("#genre-select").click();
           cy.get("li").contains(selectedGenreText).click();
           cy.get(".MuiCardHeader-content").should(
             "have.length",
             matchingMovies.length
           );
           cy.get(".MuiCardHeader-content").each(($card, index) => {
             cy.wrap($card).find("p").contains(matchingMovies[index].title);
           });
         });
    });

    describe("By movie genre and title", () => {
        it("should display movies with the specified genre and title substring only", () => {
          const selectedGenreId = 35;
          const selectedGenreText = "Comedy";
          const genreMatchingMovies = filterByGenre(movies, selectedGenreId);
          let searchString = "e";
          let matchingMovies = filterByTitle(genreMatchingMovies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box 
          cy.get("#genre-select").click();
          cy.get("li").contains(selectedGenreText).click();
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
        });
      });
  });

  describe("Selecting favourites", () => {
    it("should display an avatar for tagged movies and list them on the Favourites page", () => {
      cy.get(".MuiCardHeader-avatar").should(
        "have.length",
        0
      );        
      cy.get("button[aria-label='add to favorites']").eq(0).click();
      cy.get("button[aria-label='add to favorites']").eq(2).click();
      cy.get(".MuiCardHeader-avatar").should(
        "have.length",
        2
      );  
      // Are correct cards tagged?
      cy.get(".MuiCardHeader-root").eq(0).find(".MuiCardHeader-avatar")    
      cy.get(".MuiCardHeader-root").eq(2).find(".MuiCardHeader-avatar")    
      // Check the Favourites page.
      cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click();
      cy.get("header").find(".MuiToolbar-root").find("button").eq(4).find(".MuiButton-label").contains('Favorites');
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        2
      );
      cy.get(".MuiCardHeader-content").eq(0).find("p").contains(movies[0].title)
      cy.get(".MuiCardHeader-content").eq(1).find("p").contains(movies[2].title)
    });
  });
  
  describe("Pagination", () => {
    before(() => {
      // Get movies from TMDB and store in movies variable.
      cy.request(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=2`
      )
        .its("body")    // Take the body of HTTP response from TMDB
        .then((response) => {
          movies_page = response.results
        })
    })
    it("should display certain page of movies after clicking according page button", () => {
      cy.get(".MuiPagination-ul").find("li").eq(2).click();
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movies_page[index].title);
      });
    });
    it("should display certain page of movies after selecting according page", () => {
      cy.get(".MuiSelect-select").click();
      cy.get("li").contains("Two").click();
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movies_page[index].title);
      });
    });
  });

  describe("Sorting", () => {
    it("should display movies by the order of their rating after clicking Top Rated button", () => {
      let movie_tr = movies;
      movie_tr.sort((a,b)=>{
        return b.vote_average - a.vote_average;
      });
      cy.get(".MuiButtonGroup-root").contains("Top Rated").click();
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movie_tr[index].title);
      });
    });
    it("should display movies by the order of their release date after clicking Lastest button", () => {
      let movie_l = movies;
      movie_l.sort((a,b)=>{
        let ayear=parseInt(a.release_date.substring(0,4));
        let byear=parseInt(b.release_date.substring(0,4));
        let amonth=parseInt(a.release_date.substring(5,7));
        let bmonth=parseInt(b.release_date.substring(5,7));
        let aday=parseInt(a.release_date.substring(8));
        let bday=parseInt(b.release_date.substring(8));
        let value = (byear-ayear)*1000 + (bmonth-amonth)*100 + (bday-aday);
        if (value == 0) value = b.vote_average - a.vote_average;
        return value
      });
      cy.get(".MuiButtonGroup-root").contains("Lastest").click();
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movie_l[index].title);
      });
    });
  });

});