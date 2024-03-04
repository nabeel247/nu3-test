const valid_email = "nameu0108@gmail.com";
const valid_password = "pass12345@";
const baseUrl = "https://www.nu3.de/account/login";

describe("Test nu3 login page", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get("#gdpr-confirm-all-button").click();
  });

  it("Successful login with valid credentials", () => {
    cy.get("#CustomerEmail").type(valid_email);
    cy.get("#CustomerPassword").type(valid_password);
    cy.get("#customer_login").submit();
    // assert user redirection to accounts page
    cy.url().should("include", "/account");
    // assert user post successful login status code is 200
    cy.request("https://www.nu3.de/account").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Login failure with invalid credentials", () => {
    cy.get("#CustomerEmail").type("invalid@email.com");
    cy.get("#CustomerPassword").type("invalidpassword");
    cy.get("#customer_login").submit();
    cy.url().then((newUrl) => {
      // Assert that user remains on the login page
      expect(newUrl).to.equal(baseUrl);
    });
    // error assertion
    cy.get(".errors").should("exist");
  });
});
