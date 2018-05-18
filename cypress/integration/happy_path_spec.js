// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('main path', function () {
  it('can access the application', function () {
    cy.visit('/')
  })
})
