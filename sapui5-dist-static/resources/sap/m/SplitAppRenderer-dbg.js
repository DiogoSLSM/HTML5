/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

jQuery.sap.declare("sap.m.SplitAppRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.SplitContainerRenderer");
/**
 * @class SplitApp renderer. 
 * @static
 */
sap.m.SplitAppRenderer = {
};

sap.m.SplitAppRenderer = sap.ui.core.Renderer.extend(sap.m.SplitContainerRenderer);

sap.m.SplitAppRenderer.renderAttributes = function(oRm, oControl){
	sap.m.BackgroundHelper.addBackgroundColorStyles(oRm, oControl.getBackgroundColor(),  oControl.getBackgroundImage());
};

sap.m.SplitAppRenderer.renderBeforeContent = function(oRm, oControl){
	sap.m.BackgroundHelper.renderBackgroundImageTag(oRm, oControl, "sapMSplitContainerBG",  oControl.getBackgroundImage(), oControl.getBackgroundRepeat(), oControl.getBackgroundOpacity());
};