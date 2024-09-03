sap.ui.define([
    "./BaseController",
    "sap/ui/core/Fragment"
],
function (BaseController, Fragment) {
    "use strict";

    return BaseController.extend("training.train01.controller.Orders", {
        onInit: function () {
            this.setModel(this.getModelHandler().getOrdersModel(), "OrdersModel");
        },

        onOrderApprove: function(oEvent){
            var sOrderId = oEvent.getSource().getBindingContext().getObject().OrderId;
            this.getModelHandler().approveOrder(sOrderId);
            var oTable = this.getView().byId("idOrdersTable");
            oTable.getBinding("items").refresh();
        },

        onOrderReject: function(oEvent){
            var sOrderId = oEvent.getSource().getBindingContext().getObject().OrderId;
            this.getModelHandler().rejectOrder(sOrderId);
            var oTable = this.getView().byId("idOrdersTable");
            oTable.getBinding("items").refresh();
        },

        onOrderChange: function(oEvent){
            var oData = oEvent.getSource().getBindingContext().getObject();
            this.getModelHandler().setOrderChangeData(oData.OrderId, oData.DeliveryDate);
            this._openOrderChangeDialog();
        },

        isStatusInitial: function(statusId){
            return statusId === "INITIAL";
        },

        onSaveChangeOrder: function(oEvent){
            this.getModelHandler().updateOrderOnServer().then(result => {
                var oTable = this.getView().byId("idOrdersTable");
                oTable.getBinding("items").refresh();
            });
            this.onCloseDialog(oEvent);
        },

        onCloseDialog: function(oEvent){
            oEvent.getSource().getParent().close();
        },

        _openOrderChangeDialog: function(){
            if (!this._orderChangeDialog) {
                this._orderChangeDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "training.train01.view.fragments.OrderChangeDialog",
                    controller: this
                }).then(function(oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            this._orderChangeDialog.then(function(oDialog) {
                oDialog.open();
            });                
        }        


    });
});