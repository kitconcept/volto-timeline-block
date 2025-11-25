context('Example Acceptance Tests', () => {
  describe('Visit a page', () => {
    beforeEach(() => {
      // Given a logged in editor
      cy.viewport('macbook-16');
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.autologin();
      cy.intercept('GET', '/**/document*').as('content');
    });

    it('As editor I can add edit a Page and add a timeline block', function () {
      cy.visit('/document');
      cy.navigate('/document/edit');

      cy.addNewBlock('timeline');

      //Timeline 1
      cy.findByText('Add Timeline').click();
      cy.get('.olw-item-wrapper.active .olw-item-title').should(
        'have.text',
        'Timeline #1',
      );
      cy.get('.olw-item-content.active').within(() => {
        cy.get('[class*="field-wrapper-time"]').type('2024-01-01');
        cy.get('[class*="field-wrapper-content"]').type('Timeline content-1');
      });

      //Timeline 2
      cy.findByText('Add Timeline').click();

      cy.get('.olw-item-wrapper.active .olw-item-title').should(
        'have.text',
        'Timeline #2',
      );
      cy.get('.olw-item-content.active').within(() => {
        cy.get('[class*="field-wrapper-time"]').type('2025-01-02');
        cy.get('[class*="field-wrapper-content"]').type('Timeline content-2');
      });

      //Timeline 3
      cy.findByText('Add Timeline').click();
      cy.get('.olw-item-wrapper.active .olw-item-title').should(
        'have.text',
        'Timeline #3',
      );
      cy.get('.olw-item-content.active').within(() => {
        cy.get('[class*="field-wrapper-time"]').type('2026-01-03');
        cy.get('[class*="field-wrapper-content"]').type('Timeline content-3');
      });

      cy.wait('@content');
      cy.get('#toolbar-save').click();

      cy.get('.timeline-block ul li').should('have.length', 3);
    });
  });
});
