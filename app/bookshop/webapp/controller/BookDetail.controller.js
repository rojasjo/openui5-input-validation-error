sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("my.app.controller.BookDetail", {
    onInit: function () {
      this.getOwnerComponent().getRouter()
        .getRoute("BookDetail")
        .attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {
      const sID = oEvent.getParameter("arguments").ID;
      const sPath = `/Books(${sID})`;

      this.getView().bindElement({
        path: sPath,
      });
    },

    onSave: function () {
      const oModel = this.getView().getModel();
      oModel.submitBatch("updateGroup")
        .then(() => {
          MessageToast.show("Book updated successfully");
        })
        .catch((err) => {
          MessageToast.show("Error while saving: " + err.message);
        });
    }
  });
});
