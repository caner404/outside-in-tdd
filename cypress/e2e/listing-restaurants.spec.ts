describe("Listing Restaurants", () => {
  it("shows restaurants from the server", () => {
    const pastaPlace = "Pasta Place";
    const saladPlace = "Salad Place";

    cy.visit("/");
    cy.contains(pastaPlace);
    cy.contains(saladPlace);
  });
});
