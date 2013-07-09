/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.Slider");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Slider",{metadata:{publicMethods:["stepUp","stepDown"],library:"sap.m",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"name":{type:"string",group:"Misc",defaultValue:""},"min":{type:"float",group:"Data",defaultValue:0},"max":{type:"float",group:"Data",defaultValue:100},"step":{type:"float",group:"Data",defaultValue:1},"progress":{type:"boolean",group:"Misc",defaultValue:true},"value":{type:"float",group:"Data",defaultValue:0}},events:{"change":{},"liveChange":{}}}});sap.m.Slider.M_EVENTS={'change':'change','liveChange':'liveChange'};jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.m.Slider.prototype._aEvents=["ontouchstart","ontouchmove","ontouchend"];sap.m.Slider.prototype._aVEvents=["_ontouchstart","_ontouchmove","_ontouchend"];
sap.m.Slider.prototype.onBeforeRendering=function(){var m=this.getMin(),M=this.getMax(),s=this.getStep(),b=false,e=false;if(m>=M){b=true;e=true;jQuery.sap.log.warning("Warning: "+"Property wrong min: "+m+" >= max: "+M+" on ",this)}if(s<=0){jQuery.sap.log.warning("Warning: "+"The step could not be negative on ",this);s=1;this.setProperty("step",s,true)}if(s>(M-m)&&!b){e=true;jQuery.sap.log.warning("Warning: "+"Property wrong step: "+s+" > max: "+M+" - "+"min: "+m+" on ",this)}if(!e){this.setValue(this.getValue());this._fProgressValue=this._getPercentFromValue(this.getValue())}};
sap.m.Slider.prototype.onAfterRendering=function(){this.getEnabled()?this._bindEvents():this._unbindEvents();this._$SldCont=this.$();this._$Sld=this._$SldCont.children(".sapMSld");this._$Thumb=this._$Sld.children(".sapMSldThumb");this._$Input=this._$SldCont.children("input[type=range]");this._$SldCont.addClass("sapMSldVisible")};
sap.m.Slider.prototype._ontouchstart=function(e){var t=jQuery(e.target),m=this.getMin(),v;e.originalEvent._sapui_handledByControl=true;if(e.targetTouches.length>1){return}this._calcMeasures();this._fDiffX=this._fSldPaddingRight;this._fStartValue=this.getValue();this._$Sld.addClass("sapMSldPressed");if(t.is(this._$Thumb)||t.parent().is(this._$Thumb)){this._fDiffX=e.targetTouches[0].pageX-this._$Thumb.offset().left}else{v=(((e.targetTouches[0].pageX-this._fSldPaddingRight-this._fSldOffsetLeft)/this._fSldWidth)*(this.getMax()-m))+m;this.setValue(v)}};
sap.m.Slider.prototype._ontouchmove=function(e){var m=this.getMin(),v=this.getValue(),n=(((e.targetTouches[0].pageX-this._fDiffX-this._fSldOffsetLeft)/this._fSldWidth)*(this.getMax()-m))+m;this.setValue(n);n=this.getValue();if(v!==n){this.fireLiveChange({value:n})}};
sap.m.Slider.prototype._ontouchend=function(){this._$Sld.removeClass("sapMSldPressed");if(this._fStartValue!==this.getValue()){this.fireChange({value:this.getValue()})}delete this._fDiffX;delete this._fStartValue};
sap.m.Slider.prototype._sBackgroundSizeRemainder=(function(){switch(jQuery.os.os){case"ios":return"% 0.4375em, 100%";break;case"android":case"blackberry":return"% 0.1875em";break}})();
sap.m.Slider.prototype._calcMeasures=function(){this._fSldWidth=this._$SldCont.width();this._fSldPaddingRight=parseFloat(this._$SldCont.css("padding-right"));this._fSldOffsetLeft=this._$SldCont.offset().left;this._iThumbWidth=this._$Thumb.width()};
sap.m.Slider.prototype._bindEvents=function(){var i;for(i=0;i<this._aVEvents.length;i++){this[this._aEvents[i]]=this[this._aVEvents[i]]}return this};
sap.m.Slider.prototype._unbindEvents=function(){var i;for(i=0;i<this._aVEvents.length;i++){this[this._aEvents[i]]=null}return this};
sap.m.Slider.prototype._getPercentFromValue=function(v){var m=this.getMin();return((v-m)/(this.getMax()-m))*100};
sap.m.Slider.prototype._validateN=function(n){var t=typeof n;if(t==="undefined"){return 1}else if(t!=="number"){jQuery.sap.log.warning('Warning: n needs to be a number',this);return 0}else if(Math.floor(n)===n&&isFinite(n)){return n}else{jQuery.sap.log.warning('Warning: n needs to be a finite interger',this);return 0}};
sap.m.Slider.prototype._setValue=function(n){var m=this.getMin(),M=this.getMax(),s=this.getStep(),v=this.getValue(),f=Math.abs(n%s),p;if(typeof n!=="number"||!isFinite(n)){jQuery.sap.log.error("Error:",'"fNewValue" needs to be a finite number of',this);return this}n=f*2>=s?n+s-f:n-f;n=n>M?M:n<m?m:n;n=Number(n.toFixed(5));this.setProperty("value",n,true);if(v===this.getValue()){return this}if(this._$SldCont instanceof jQuery){this._$Input.attr("value",n);p=this._getPercentFromValue(n);if(this.getProgress()){this._$Sld.css("-webkit-background-size",p+this._sBackgroundSizeRemainder)}this._$Thumb.css("left",p+"%")}return this};
sap.m.Slider.prototype.stepUp=function(n){return this.setValue(this.getValue()+(this._validateN(n)*this.getStep()))};
sap.m.Slider.prototype.stepDown=function(n){return this.setValue(this.getValue()-(this._validateN(n)*this.getStep()))};
sap.m.Slider.prototype.setValue=function(n){this.setValue=this._setValue;return this.setProperty("value",n,true)};