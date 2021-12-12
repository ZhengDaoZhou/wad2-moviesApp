describe("Login Page ", () => {

    beforeEach(() => {
      cy.visit("/")
      cy.get("header").find(".MuiToolbar-root").find("button").eq(6).click();
    });
  
    describe("Base test", () => {
      it("displays login form", () => {
        cy.get(".adm-list-item-content").eq(0).contains("Username");
        cy.get(".adm-list-item-content").eq(1).contains("Password");
      });
    });

    describe("Login test", () => {
      it("should change the login button to logout button and show username in the welcome title if login successfully", () => {
          let username = "Milliliter";
          let password = "19981231";
          cy.get("#username").clear().type(username);
          cy.get("#password").clear().type(password);
          cy.get("button[type='submit']").eq(0).click();
          cy.wait(2000)
          cy.get("header").find(".MuiToolbar-root").find("button").eq(6).find(".MuiButton-label").contains('Logout');
        });
      it("should change nothing if login failed", () => {
        let username = "Milliliter";
        let password = "1998123";
        cy.get("#username").clear().type(username);
        cy.get("#password").clear().type(password);
        cy.get("button[type='submit']").eq(0).click();
        cy.wait(2000)
        cy.get("header").find(".MuiToolbar-root").find("button").eq(6).find(".MuiButton-label").contains('Login');
      });
    });
  
  });