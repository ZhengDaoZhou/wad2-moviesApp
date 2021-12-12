describe("Must Watch Page ", () => {
    beforeEach(() => {
      cy.visit("/movies/upcoming")
      cy.get("button[aria-label='add to watch']").eq(0).click();
      cy.get("button[aria-label='add to watch']").eq(2).click();
      cy.get("header").find(".MuiToolbar-root").find("button").eq(5).click();
    });
  
    describe("Base test", () => {
      it("displays page header", () => {
        cy.get("h3").contains("Must Watch Movies");
        cy.get("h1").contains("Filter the movies");
      });
    });
  
    describe("Remove Movie From Must Watch ", () => {
      it("should remove the movie from Must Watch after the remove button being clicked", () => {      
          cy.get(".MuiCardHeader-content").should(
              "have.length",
              2
          );
          cy.get("button[aria-label='remove from must watch']").eq(0).click();
          cy.get(".MuiCardHeader-content").should(
              "have.length",
              1
          );
      });
    });
  
  });