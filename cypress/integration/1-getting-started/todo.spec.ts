
/// <reference types="cypress" />
// @ts-check
describe('React App Test', () => {
  beforeEach(() => {
    cy.visit('https://react-shooping-cart.netlify.app/');
    cy.contains('h1', 'Store');
    cy.contains('p', 'This is the Store Page.');
  })

  it('Add a product to Cart, check it and delete', () => {
    let itemToBuy = 'Buffalo - Striploin';
    cy.get('p').contains(itemToBuy);
    cy.get('[class="btn btn-primary btn-sm"]').eq(0).click();
    cy.get('[class="btn btn-outline-primary btn-sm"]').invoke('text').then(text => {
      expect(text).equal('Add more');
    });
    cy.get('a').eq(2).click();
    cy.get('p', { timeout: 5000 }).contains('This is the Cart Page.');
    expect(cy.get('h5').contains(itemToBuy));
    expect(cy.get('[class="mb-1"]').contains('Total Payment'));
    cy.get('[class="btn btn-danger btn-sm mb-1"]').should('exist');
    cy.get('[class="btn btn-outlineprimary btn-sm"]').click();
    cy.get('[class="mb-1"]').should('not.exist');

  })
  it('Add a product to Cart, check it and delete', () => {
    let ItemsToBuy: Array<String> = [];
    for (let i = 0; i < +2; i++) {
      cy.get('[class="card card-body"]').eq(i)
        .within(() => {
          cy.get('[class="btn btn-primary btn-sm"]').click();
          cy.get('p').then(function ($elem) {
            ItemsToBuy[i] = $elem.text();
            cy.log(ItemsToBuy[i].toString());
          });
        });
    }
    cy.get('a').eq(2).click();
    cy.get('p', { timeout: 5000 }).contains('This is the Cart Page.');
    cy.get('[class="row no-gutters py-2"]').eq(0)
    .within(() =>{
      expect(cy.get('h5').contains(ItemsToBuy[0].toString()));
      for (let itemNeeded = 0; itemNeeded<2;itemNeeded++){
        cy.get('[class="btn btn-primary btn-sm mr-2 mb-1"]').click();
      }
    });

    cy.get('[class="card card-body"]').eq(0)
    .within(() =>{
      expect(cy.get('h4').contains('4'));
      expect(cy.get('h3').contains('$375.25'));
    });
    cy.get('[class="btn btn-danger btn-sm mb-1"]').eq(0).should('exist');
    cy.get('[class="btn btn-danger btn-sm mb-1"]').eq(1).should('exist');
    cy.get('[class="row no-gutters py-2"]')
    .eq(0)
    .within(() =>{
      expect(cy.get('h5').contains(ItemsToBuy[0].toString()));
      for (let itemNeededAgain = 0; itemNeededAgain<2;itemNeededAgain++){
        cy.get('[class="btn btn-danger btn-sm mb-1"]').click();
      }
    });
    cy.get('[class="card card-body"]').eq(0)
    .within(() =>{
      expect(cy.get('h4').contains('2'));
      expect(cy.get('h3').contains('$297.03'));
    });
    cy.get('[class="btn btn-danger btn-sm mb-1"]').eq(1).click();
    cy.get('[class="row no-gutters py-2"]').eq(1).should('not.exist');
    cy.get('[class="btn btn-primary mb-2"]').click();
    cy.contains('Checkout successfull');
    cy.contains('Your cart is empty');
  })

})
