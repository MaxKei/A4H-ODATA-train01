/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "./model/Models"
],
function (UIComponent, Models) {
    "use strict";

    return UIComponent.extend("training.train01.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();

            //Set model handler
            this._modelHandler = new Models(this);

        },

        getModelHandler: function(){
            return this._modelHandler;
        }                     
    });
}
);