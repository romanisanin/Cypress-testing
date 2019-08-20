/// <reference types="Cypress" />


describe('Tes1: Searching a product and filtering the results', function() {
    it('opens iherb.com', function() {
    cy.visit('https://iherb.com')

    cy.get('.iherb-header-search-input')
      .type('omega 3')
      .should('have.value', 'omega 3')
      cy.wait(1000)
      cy.get('.search-v2>li').eq(1).should('contain','in Supplements').click()
    })

    it('apllies a price filter', function(){
      cy.get('.range-min').type('10').should('have.value','10')
      cy.get('.range-max').type('20').should('have.value','20')
      cy.get('.range-filter').click()
    })
})

describe('Test 2: Choosing the product, its quantity and adding it to the Cart', function() {
  
  it('opens the Now Foods product', function() {
      cy.get('.product-link').each(($el, index, $list) => {
        if ($el.attr('title') === 'Now Foods, Ultra Omega-3, 500 EPA/250 DHA, 90 Softgels'){
          cy.wait(1000)
          cy.get($el).click()
        }
      })
    })
    
    it('checks the name of the product', function() {
      //do not forget to delete cy.visit
      //cy.visit('https://www.iherb.com/pr/Now-Foods-Ultra-Omega-3-500-EPA-250-DHA-90-Softgels/76073')
      cy.get('.column.hidden-xs > #product-summary-header > #name').should('contain.text', 'Now Foods, Ultra Omega-3, 500 EPA/250 DHA, 90 Softgels')
      cy.get('.attribute-group-package-quantity').find('.attribute-best-value').click()
      cy.wait(3000)
      cy.get('#volume-quantity').select('4')
      cy.get('.btn-add-to-cart').click()
      cy.get('.go-to-checkout').click()
    })
})


describe('Task3: Checkout', function(){
  it('proceed to checkout',function(){
    cy.get('#cart_line_items>.line-item').find('.prod-title', 'Now Foods, Ultra Omega-3, 500 EPA/250 DHA, 90 Softgels')
    cy.get('#cart_line_items>.line-item').find('.text', '4')
    
  })
  //cy.visit('https://checkout.iherb.com/auth/Account/Login')
  it('catches uncaught exception', function (done) {
    Cypress.on('uncaught:exception', (err, runnable) => {
      done()
      return false
    })
    cy.get('.summary-actions > .btn').click({force: true})
    //or the same - cypress recommends to  use this:
    //cy.get('[data-ga-event-label="Proceed to checkout-addToCart"]').click()


    //these 3 rows duplicates the function Enters credentials from below, 
    //because can't proceeed through uncaught exception. The test works infinitely -
    // there is an open bug ticket in github for cypress:
    //
    cy.get('#username_input').type('aliexpress1989.1@gmail.com').should('have.value', 'aliexpress1989.1@gmail.com')
    cy.get('#Password').type('Cypress2019').should('have.value', 'Cypress2019')
    cy.get('#sign_in_button').click()
  })

  it('enters credentials'), function() {
    
    cy.get('#username_input').type('aliexpress1989.1@gmail.com').should('have.value', 'aliexpress1989.1@gmail.com')
    cy.get('#Password').type('Cypress2019').should('have.value', 'Cypress2019')
    cy.get('#sign_in_button').click()
  }
})


