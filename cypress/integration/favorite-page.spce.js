describe("Favorite Page ", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get("button[aria-label='add to favorites']").eq(0).click();
    cy.get("button[aria-label='add to favorites']").eq(2).click();
    cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click();
  });

  describe("Base test", () => {
    it("displays page header", () => {
      cy.get("h3").contains("Favorite Movies");
      cy.get("h1").contains("Filter the movies");
    });
  });

  describe("Remove Movie From Favorite ", () => {
    it("should remove the movie from Favortie after the remove button being clicked", () => {      
        cy.get(".MuiCardHeader-content").should(
            "have.length",
            2
        );
        cy.get("button[aria-label='remove from favorites']").eq(0).click();
        cy.get(".MuiCardHeader-content").should(
            "have.length",
            1
        );
    });
  });

});