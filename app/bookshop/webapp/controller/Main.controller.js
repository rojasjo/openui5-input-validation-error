sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
	"use strict";

	return Controller.extend("joserojas.bookshop.bookshop.controller.Main", {
		onInit() {},

		onSelectBook: function (oEvent) {
			const book = oEvent.getParameters().listItem.getBindingContext().getObject();

			//Deselect all rows so that when the users back to the dashboard
			//they can select the same row again to navigate to the detail page
			this.byId("booksTable").removeSelections();

			this.getOwnerComponent().getRouter().navTo("BookDetail", {
				ID: book.ID,
			});
		},
	});
});
