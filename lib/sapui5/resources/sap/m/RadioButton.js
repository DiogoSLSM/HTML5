/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.RadioButton");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.RadioButton",{metadata:{publicMethods:["setActiveState"],library:"sap.m",properties:{"visible":{type:"boolean",group:"Appearance",defaultValue:true},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"selected":{type:"boolean",group:"Data",defaultValue:false},"groupName":{type:"string",group:"Behavior",defaultValue:'sapMRbDefaultGroup'},"text":{type:"string",group:"Appearance",defaultValue:null},"textDirection":{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},"activeHandling":{type:"boolean",group:"Appearance",defaultValue:true}},events:{"select":{}}}});sap.m.RadioButton.M_EVENTS={'select':'select'};
sap.m.RadioButton.prototype.ontap=function(e){if(this.getEnabled()){if(!this.getSelected()){this.setSelected(true);this.fireSelect({selected:true})}}else{}};
sap.m.RadioButton.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true;if(this.getEnabled()&&this.getActiveHandling()){this.$().toggleClass('sapMRbBTouched',true)}};
sap.m.RadioButton.prototype.ontouchend=function(e){this.$().toggleClass('sapMRbBTouched',false)};
sap.m.RadioButton.prototype.setSelected=function(s){var S=this.getSelected();this.setProperty("selected",s,true);if(s){if(this.getGroupName()&&(this.getGroupName()!=="")){var o=jQuery("input[name='"+this.getGroupName()+"']:radio");for(var i=0;i<o.length;i++){var a=o[i];if(a.id&&(a.id.length>3)&&(a.id.substr(a.id.length-3)==="-RB")){var c=sap.ui.getCore().getElementById(a.id.substr(0,a.id.length-3));if(c instanceof sap.m.RadioButton&&(c!==this)){if(c.getSelected()){c.fireSelect({selected:false})}c.setSelected(false)}}}}}if((S!==s)&&this.getDomRef()){jQuery.sap.byId(this.getId()).toggleClass('sapMRbSel',s).attr('aria-checked',s);if(s){jQuery.sap.domById(this.getId()+'-RB').checked=true;jQuery.sap.domById(this.getId()+'-RB').setAttribute('checked','checked')}else{jQuery.sap.domById(this.getId()+'-RB').checked=false;jQuery.sap.domById(this.getId()+'-RB').removeAttribute('checked')}}return this};
sap.m.RadioButton.prototype.setActiveState=function(a){this.$().toggleClass('sapMRbBTouched',a)};
sap.m.RadioButton.prototype.setText=function(t){this.setProperty("text",t,true);if(this._oLabel){this._oLabel.setText(this.getText())}else{this._createLabel("text",this.getText())}return this};
sap.m.RadioButton.prototype.setWidth=function(w){this.setProperty("width",w,true);if(this._oLabel){this._oLabel.setWidth(this.getWidth())}else{this._createLabel("width",this.getWidth())}return this};
sap.m.RadioButton.prototype.setTextDirection=function(d){this.setProperty("textDirection",d,true);if(this._oLabel){this._oLabel.setTextDirection(this.getTextDirection())}else{this._createLabel("textDirection",this.getTextDirection())}return this};
sap.m.RadioButton.prototype.exit=function(){if(this._oLabel){this._oLabel.destroy()}};
sap.m.RadioButton.prototype._createLabel=function(p,v){this._oLabel=new sap.m.Label(this.getId()+"-label",{}).addStyleClass("sapMRbBLabel").setParent(this,null,true);this._oLabel.setProperty(p,v,false)};