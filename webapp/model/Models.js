sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "./Odata"
    ], 
    function (UI5Object, JSONModel, Device, Odata) {
        "use strict";

        return UI5Object.extend("training.train01.model.Models", {

            constructor: function(component){
                this._component = component;
                this._odata = new Odata(component);
                this._defineDeviceModel();
                this._defineOrdersModel();
            },

            getOdataHandler: function(){
                return this._odata;
            },

            // ****************
            // * Device Model *
            // ****************
            _defineDeviceModel: function(){
                this._deviceModel = new JSONModel(Device);
                this._deviceModel.setDefaultBindingMode("OneWay");
            },

            getDeviceModel: function () {
                return this._deviceModel;
            },

            // ****************
            // * Orders Model *
            // ****************
            _initializeOrdersData: function(){
                this._ordersModelData = {
                    OrderChangeData: {
                        OrderId: "",
                        DeliveryDate: null
                    }
                };
            },

            _defineOrdersModel: function(){
                this._initializeOrdersData();
                this._ordersModel = new JSONModel(this._ordersModelData);
                this._ordersModel.setDefaultBindingMode("TwoWay");
            },

            getOrdersModel: function(){
                return this._ordersModel;
            },

            setOrderChangeData: function(orderid, delDate){
                this.getOrdersModel().setProperty("/OrderChangeData/OrderId", orderid);
                this.getOrdersModel().setProperty("/OrderChangeData/DeliveryDate", delDate);
            },

            updateOrderOnServer: function(){
                var sOrderId = this.getOrdersModel().getProperty("/OrderChangeData/OrderId");
                var dDelDate = this.getOrdersModel().getProperty("/OrderChangeData/DeliveryDate");
                return new Promise(function(resolve, reject){
                    this.getOdataHandler().updateOrder(sOrderId, dDelDate).then(
                        result => { resolve(result); }, 
                        error => { reject(error) }
                    );
                }.bind(this));
            },

            // *****************
            // * OData proxies *
            // *****************
            approveOrder: function(orderid){
                return new Promise(function(resolve, reject){
                    this.getOdataHandler().approveOrder(orderid).then(
                        result => { resolve(result); }, 
                        error => { reject(error) }
                    );
                }.bind(this));
            },

            rejectOrder: function(orderid){
                return new Promise(function(resolve, reject){
                    this.getOdataHandler().rejectOrder(orderid).then(
                        result => { resolve(result); }, 
                        error => { reject(error) }
                    );
                }.bind(this));
            }
            
        });
    }
);