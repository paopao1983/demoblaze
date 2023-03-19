import { faker } from '@faker-js/faker';

describe("Network Requests for Signing Up", () => {
    
  it('signup with an existent user', () => {
    cy.request({
        method: 'POST',
        url: "https://api.demoblaze.com/signup",
        body: {
          username: 'test',
          password: 'test',
        },
    }).as('signupExistentUser')
   
    //Validate the response 
    cy.get('@signupExistentUser').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("errorMessage")
      expect(response.body.errorMessage).eq("This user already exist.")
      cy.log(JSON.stringify(response.body))
    }) 
   
  })

  it('signup with a new user', () => {
    cy.request({
        method: 'POST',
        url: "https://api.demoblaze.com/signup",
        body: {
          username: faker.internet.userName(),
          password: faker.internet.password()
        },
    }).as('signupNewUser')
   
    //Validate the response 
    cy.get('@signupNewUser').then((response) => {
      expect(response.status).to.eq(200)
      cy.log(JSON.stringify(response.body))
    }) 
    //Loggin the data of the new user 
    cy.get('@signupNewUser').then((request)=>{
      cy.log(JSON.stringify(request.requestBody)) 
    })
  })
})