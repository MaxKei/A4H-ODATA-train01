sap.ui.define([
    "sap/ui/base/Object"
    ], 
    function (UI5Object) {
        "use strict";

        return UI5Object.extend("training.train01.model.Odata", {

            constructor: function(component){
                this._component = component;
            },

            getComponent: function(){
                return this._component;
            },

            approveOrder: function(orderid){
                return new Promise(function(resolve, reject){
                    var url = "/ApproveOrder";
                    this.getComponent().getModel().callFunction(url, {
                        method: "POST",
                        urlParameters: { OrderId: orderid },
                        success: function (result) {
                            resolve(result);
                        },
                        error: function (error) {
                            reject(error);
                        }                        
                    });
                }.bind(this));
            },

            rejectOrder: function(orderid){
                return new Promise(function(resolve, reject){
                    var url = "/RejectOrder";
                    this.getComponent().getModel().callFunction(url, {
                        method: "POST",
                        urlParameters: { OrderId: orderid },
                        success: function (result) {
                            resolve(result);
                        },
                        error: function (error) {
                            reject(error);
                        }                        
                    });
                }.bind(this));
            },

            updateOrder: function(orderid, delDate){
                return new Promise(function(resolve, reject){
                    var sPath = "/OrderSet('" + orderid + "')";
                    var oData = { DeliveryDate: delDate };
                    this.getComponent().getModel().update(sPath, oData, {
                        success: function (result) {
                            resolve(result);
                        },
                        error: function (error) {
                            reject(error);
                        }                        
                    });
                }.bind(this));
            }

            
        });
    }
);