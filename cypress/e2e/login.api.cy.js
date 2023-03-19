import { faker } from '@faker-js/faker';

describe("Network Requests for Login", () => {
    
  it('login with correct credentials', () => {
    cy.request({
        method: 'POST',
        url: "https://api.demoblaze.com/login",
        body: {
          username: 'paotesti',
          password: 'paotesti',
        },
    }).as('loginCorrect')
   
    //Validate the response 
    cy.get('@loginCorrect').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).contains("Auth_token") 
      cy.log(JSON.stringify(response.body))
    }) 
   
  })

  it('login with incorrect credentials', () => {
    cy.request({
        method: 'POST',
        url: "https://api.demoblaze.com/login",
        body: {
          username: 'paotesti',
          password: 'test33',
        },
    }).as('loginIncorrect')
   
    //Validate the response 
    cy.get('@loginIncorrect').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("errorMessage")
      expect(response.body.errorMessage).eq("Wrong password.")
      cy.log(JSON.stringify(response.body))
    }) 
  })

  it('login with a user that not exist', () => {
    cy.request({
        method: 'POST',
        url: "https://api.demoblaze.com/login",
        failOnStatusCode: false,
        body: {
          username: 'scb',
          password: 'test33',
        },
    }).as('loginIncorrect')
   
    //Validate the response 
    cy.get('@loginIncorrect').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("errorMessage")
      expect(response.body.errorMessage).eq("User does not exist.")
      cy.log(JSON.stringify(response.body))
    }) 
  })
  
})