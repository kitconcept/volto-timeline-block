context('Timeline Test', () => {
  describe('Visit a page', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('PATCH', '/**/document').as('edit');
      cy.intercept('GET', '/**/Document').as('schema');
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.visit('/document');
      cy.wait('@content');
      cy.navigate('/document/edit');
      cy.wait('@schema');
    });

    it('As editor I can add edit a Page', function () {
      cy.getSlate().click();
      cy.addNewBlock('timeline');
      cy.get('.add-item-button-wrapper').click();
      cy.get('[id^=field-time-]').type('Title 1');
      cy.get('[id^=field-content-]').type('Description 1');
      cy.get('.add-item-button-wrapper').click();
      cy.get('[id^=field-time-]').eq(1).type('Title 2');
      cy.get('[id^=field-content-]').eq(1).type('Description 2');
      cy.get('.add-item-button-wrapper').click();
      cy.get('[id^=field-time-]').eq(2).type('Title 3');
      cy.get('[id^=field-content-]').eq(2).type('Description 3');
      cy.get('.add-item-button-wrapper').click();
      cy.get('[id^=field-time-]').eq(3).type('Title 4');
      cy.get('[id^=field-content-]').eq(3).type('Description 4');

      cy.get('#toolbar-save').click();
      cy.wait('@edit');
      cy.get('.timeline-block').should('be.visible');
    });
  });
});
