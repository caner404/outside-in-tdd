describe("Creating a Restaurant", () => {
  it("allows adding a restaurant", () => {
    const restaurantName = "Sushi Place";

    cy.intercept("GET", "https://api.outsidein.dev/KSSSt61lGV18iX6qlzzVgILVksMuenlT/restaurants", {
      statusCode: 200,
      body: [],
    }).as("getRestaurants");

    cy.intercept("POST", "https://api.outsidein.dev/KSSSt61lGV18iX6qlzzVgILVksMuenlT/restaurants", {
      statusCode: 201,
      body: {
        name: restaurantName,
      },
    }).as("addRestaurant");

    cy.visit("/");

    cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
    cy.contains("Add").click();

    cy.wait("@addRestaurant").its("request.body").should("deep.equal", {
      name: restaurantName,
    });

    cy.contains(restaurantName).should("exist");
    cy.contains(restaurantName);
  });
});
