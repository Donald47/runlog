// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('main path', function () {
  it('can access the application', function () {
    cy.visit('/')
  })
  it("can't just log in", function () {
    cy.get('.submitbutton').click()
    cy.contains('Invalid Details')
  })
  it("can't log in with just an email", function () {
    cy.fixture('athelete.json').then((athelete) => {
      cy.get('.emailfield').children('input').type(athelete.email)
      cy.get('.submitbutton').click()
      cy.contains('Invalid Details')
      cy.get('.emailfield').children('input').clear()
    })
  })
  it("can't log in with just a password", function () {
    cy.fixture('athelete.json').then((athelete) => {
      cy.get('.passwordfield').children('input').type(athelete.password)
      cy.get('.submitbutton').click()
      cy.contains('Invalid Details')
      cy.get('.passwordfield').children('input').clear()
    })
  })
  it("can log in with both", function () {
    cy.fixture('athelete.json').then((athelete) => {
      cy.get('.emailfield').children('input').type(athelete.email)
      cy.get('.passwordfield').children('input').type(athelete.password)
      cy.get('.submitbutton').click()
      cy.contains('Runs')
    })
  })
  it("can toggle the addrun fields", function () {
    cy.get('.addrun').click()
    cy.get('.cancelrun').click()
  })
  it("cannot add an empty run", function () {
    cy.get('.runrow').should('have.length', 1)
    cy.get('.addrun').click()
    cy.get('.addrun').click()
    cy.contains('Invalid Input')
    cy.get('.runrow').should('have.length', 1)
  })
  it("cannot add invalid runs", function () {
    cy.get('.runrow').should('have.length', 1)
    cy.get('.distancefield').children('input').type('not a number')
    cy.get('.timefield').children('input').type('not a number')
    cy.get('.addrun').click()
    cy.contains('Invalid Input')
    cy.get('.distancefield').contains('must be greater than 0')
    cy.get('.timefield').contains('must be greater than 0')
    cy.get('.runrow').should('have.length', 1)
  })

  it("can add valid runs", function () {
    cy.get('.runrow').should('have.length', 1)
    cy.get('.distancefield').children('input').type('100')
    cy.get('.timefield').children('input').type('15')
    cy.get('.addrun').click()
    cy.get('.runrow').should('have.length', 2)
  })
})
