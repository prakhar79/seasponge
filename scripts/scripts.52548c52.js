(function(){"use strict";angular.module("seaspongeApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ui.select","ngDragDrop"]).config(["$routeProvider",function(a){return a.when("/",{templateUrl:"views/main.html",controller:"MainController"}).when("/about",{templateUrl:"views/about.html",controller:"AboutController"}).when("/draw",{templateUrl:"views/draw.html",controller:"DrawController"}).when("/create",{templateUrl:"views/create.html",controller:"CreateController"}).when("/load",{templateUrl:"views/load.html",controller:"LoadController"}).otherwise({redirectTo:"/"})}])}).call(this),function(){"use strict";angular.module("seaspongeApp").controller("MainController",["$scope",function(a){return a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}])}.call(this),function(){"use strict";angular.module("seaspongeApp").controller("AboutController",["$scope",function(a){return a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}])}.call(this),function(){"use strict";angular.module("seaspongeApp").controller("DrawController",["$scope","$location","Stencils","model","config",function(a,b,c,d,e){var f,g,h,i;return $(document).unbind("keydown").bind("keydown",function(b){var c,d;d=!1,8===b.keyCode&&(c=b.srcElement||b.target,"INPUT"===c.tagName.toUpperCase()&&("TEXT"===c.type.toUpperCase()||"PASSWORD"===c.type.toUpperCase()||"FILE"===c.type.toUpperCase()||"EMAIL"===c.type.toUpperCase()||"SEARCH"===c.type.toUpperCase()||"DATE"===c.type.toUpperCase())||"TEXTAREA"===c.tagName.toUpperCase()?d=c.readOnly||c.disabled:(d=!0,a.selectedStencil&&a.$apply(function(){return a.deleteElement(a.selectedStencil)}))),d&&b.preventDefault()}),a.model=d,a.config=e,a.stencils=c,a.stencilQuery="",a.shareLink=null,a.filterFn=function(a,b){var c;return c=[],angular.forEach(b,function(b,c){(-1!==b.title.toLowerCase().indexOf(a.toLowerCase())||-1!==b.category.toLowerCase().indexOf(a.toLowerCase()))&&this.push(b)},c),c.length>0?c:b},a.semverRegex=new RegExp("\\bv?(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)(?:-[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?(?:\\+[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?\\b"),a.newThreat={name:"Untitled Threat",severity:"Medium",description:""},a.menu={modelOpen:!1,diagramOpen:!1,stencilsOpen:!0,newThreatOpen:!1,threatsOpen:!1,propertiesOpen:!1},a.fileName="ExampleFileName",a.selectedStencil=!1,a.selectedFlow=!1,a.selectedDiagram=null,a.dataClassificationOptions=d.dataClassificationOptions,a.securityControlOptions=d.securityControlOptions,a.container=$(".diagram-contents"),a.generateThreat=function(){var b;return b=$.extend(!0,{},a.newThreat),d.addThreat(b),a.menu.newThreatOpen=!1,a.menu.threatsOpen=!0},a.shareModel=function(){var b,c,e,f;return d=a.model,e=d.serialize(),f=JSON.stringify(e),b=encodeURIComponent(f),c=""+location.origin+location.pathname+"#/load?model="+b,a.shareLink=c},a.dropStencil=this.dropStencil=function(b,c){var d,e,f,g,h,i,j,k;return h=c.draggable,d=$(h),g=d.controller("ngModel"),g?(k=g.$modelValue,i=a.addStencil(k),f=a.container.offset(),j={left:b.pageX-f.left,top:b.pageY-f.top},e=i.$element,e.css(j),a.instance.repaintEverything()):void 0},h=function(a,b,c){var d,e,f,g;return window.URL=window.URL||window.webkitURL,c=c||"text/plain",a=a||"download",b=b||"",d=b instanceof Blob?b:new Blob([b],{type:c}),g=window.URL.createObjectURL(d),f=document.createElement("a"),f.download=a,f.href=g,e=document.createEvent("MouseEvents"),e.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),f.dispatchEvent(e)},a.saveModel=function(){var b,c,e;return b=prompt("Please enter file name",a.fileName),null!=b?(a.fileName=b,a.selectedDiagram.save(a.instance,a.container),e=d.serialize(),console.log("model serialized",d,e),c=JSON.stringify(e,void 0,4),"undefined"!=typeof Storage?localStorage[b]=c:alert("Sorry! No Web Storage support with this browser..."),confirm("Would you also like to download the "+b+".sponge file?")?h(""+b+".sponge",c,"application/json"):void 0):void 0},a.addStencil=function(b){var c;return null!=a.selectedDiagram?(c=a.selectedDiagram.addElement(b),c.render(a.instance,a.container),c):void 0},a.deleteElement=function(b){var c;return c=a.selectedDiagram,null!=b&&c?(c.deleteElement(b),a.selectedStencil=!1,c.constructor.clear(a.instance,a.container),c.render(a.instance,a.container)):void 0},a.deleteFlow=function(b){var c;return c=a.selectedDiagram,null!=b&&c?(c.deleteFlow(b),c.save(a.instance,a.container),a.selectedFlow=!1,c.constructor.clear(a.instance,a.container),c.render(a.instance,a.container)):void 0},a.zoomInDiagram=function(){var b;return b=a.selectedDiagram,b?(b.zoom+=.1,b.constructor.clear(a.instance,a.container),b.render(a.instance,a.container)):void 0},a.zoomOutDiagram=function(){var b;return b=a.selectedDiagram,b?(b.zoom-=.1,b.constructor.clear(a.instance,a.container),b.render(a.instance,a.container)):void 0},a.instance=i=jsPlumb.getInstance({DragOptions:{cursor:"pointer",zIndex:2e3},ConnectionOverlays:[["Arrow",{location:1}],["Label",{location:.1,id:"label",cssClass:"aLabel"}]]}),a.loadDiagram=function(b){var c;return null!=b?(null!=a.selectedDiagram&&(c=a.selectedDiagram,c.save(a.instance,a.container),c.constructor.clear(a.instance,a.container),c.selected=!1),b.render(a.instance,a.container),b.selected=!0,a.selectedDiagram=b,a.selectedStencil=!1,a.selectedFlow=!1,a.menu.diagramOpen=!0,a.menu.modelOpen=!1):void 0},a.openModelInfo=function(){return a.menu.modelOpen=!0,a.menu.diagramOpen=!1},a.exportDiagram=function(){var b;return b=$(".drawing-panel").get(0),html2canvas(b,{onrendered:function(c){var d,e,f;return f=c.getContext("2d"),e=$("> svg",b),e.each(function(){var a,b,c;return a=$(this),b=a.position(),c=a.prop("outerHTML"),f.drawSvg(c,b.left,b.top)}),d=$("._jsPlumb_endpoint > svg",b),d.each(function(){var a,b,c;return a=$(this),b=a.parent().position(),c=a.prop("outerHTML"),f.drawSvg(c,b.left,b.top)}),c.toBlob(function(b){return h(""+a.selectedDiagram.title+".jpg",b,"image/jpeg")})}})},f=function(){return $(".selected-stencil").removeClass("selected-stencil"),$("._jsPlumb_overlay.aLabel").removeClass("selected-flow")},a.container.on("stencil-instance-click",function(b,c,d){return a.$apply(function(){return f(),a.selectedFlow=!1,a.selectedStencil===c?(a.selectedStencil=!1,a.menu.propertiesOpen=!1,a.menu.stencilsOpen=!0):(c.$element.addClass("selected-stencil"),a.selectedStencil=c,a.menu.stencilsOpen=!1,a.menu.modelOpen=!1,a.menu.diagramOpen=!1,a.menu.propertiesOpen=!0)})}),a.container.on("flow-instance-click",function(b,c,d){return console.log("flow-instance-click",arguments),a.$apply(function(){return f(),a.selectedStencil=!1,a.selectedFlow===c?(a.selectedFlow=!1,a.menu.propertiesOpen=!1,a.menu.stencilsOpen=!0):(c.getOverlay("label").addClass("selected-flow"),a.selectedFlow=c,a.menu.stencilsOpen=!1,a.menu.modelOpen=!1,a.menu.diagramOpen=!1,a.menu.propertiesOpen=!0)})}),0===d.diagrams.length?(g=d.addDiagram(),console.log("Load new diagram",g),a.loadDiagram(g)):(g=d.diagrams[0],a.loadDiagram(g))}])}.call(this),function(){angular.module("seaspongeApp").factory("Stencils",["GenericTrustBoundaryStencil","AuthorizationStencil","BotStencil","HumanUserStencil","ServerStencil","ServiceStencil","WebBrowserStencil","DesktopStencil","LaptopStencil","MobileWebBrowserStencil","NativeApplicationStencil","ProcessStencil","ThreadStencil","WebApplicationStencil","CacheStencil","DataStoreStencil","DatabaseStencil",function(){return arguments}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};angular.module("seaspongeApp").factory("BaseStencil",[function(){var b;return b=function(){function b(){this.deserialize=a(this.deserialize,this),this.serialize=a(this.serialize,this),this.render=a(this.render,this);var b,c,d,e,f;this.uuid=jsPlumbUtil.uuid(),this.title=this.constructor.title,this.icon=this.constructor.icon,this.tags=[],this.dataClassifications=[],this.securityControls=[],this.location={left:0,top:0},this.authenticationScheme={uses:!1,description:null},this.authorizationScheme={uses:!1,description:null},this.communicationProtocol={uses:!1,description:null},this.$element=c=$("<div />",{id:this.uuid}),this.$elementTitle=$("<span/>",{"class":"element-title"}).text(""+this.title),b=$("<span/>",{"class":"element-category"}).text("<"+this.constructor.category+">"),console.log("i am here"),this.$img=$('<img style="height:85%; width:85%; opacity:0.3; position:absolute; left:5px;">'),this.$img.attr("src",this.icon),d=$("<p/>").append(this.$elementTitle).append("<br/>").append(b),c.append(this.$img),c.append(d),this.$element.data("stencil",this),e=this.constructor.classNames.join(" "),f=this.constructor.shape,c.addClass(e),c.addClass(f),this.refreshIcon()}return b.title="Base",b.category="Base",b.anchors=[],b.icon="http://png-5.findicons.com/files/icons/1070/software/128/mozilla_firefox.png",b.classNames=["stencil"],b.shape="rectange",b.prototype.uuid=null,b.prototype.title=null,b.prototype.icon=null,b.prototype.$element=null,b.prototype.$img=null,b.prototype.location=null,b.prototype.tags=null,b.prototype.codeType="Managed",b.prototype.runningAs="Kernel",b.prototype.acceptsInput="Kernel, System, or Local Admin",b.prototype.authenticationScheme=null,b.prototype.authorizationScheme=null,b.prototype.communicationProtocol=null,b.prototype.dataClassifications=null,b.prototype.securityControls=null,b.prototype.notes="There is no available notes.",b.prototype.render=function(a,b){return this.$element.data("stencil",this),0!==this.$element.parent().length&&this.$element.parent().is(b)||b.append(this.$element),this.$element.unbind("click"),this.$element.unbind("mouseup"),this.$element.mouseup(function(a){return function(b){return a.getPosition()}}(this)),this.$element.click(function(a){return function(c){return b.trigger("stencil-instance-click",[a,c])}}(this)),a.doWhileSuspended(function(b){return function(){var c;return b._addEndpoints(a,b.uuid,["TopCenter","BottomCenter"],["LeftMiddle","RightMiddle"]),c=jsPlumb.getSelector(".diagram-contents .stencil"),a.draggable(c,{grid:[20,20]}),a.repaint()}}(this))},b.prototype._addEndpoints=function(a,b,c,d){var e,f,g,h;for(console.log("_addEndpoints",a.getContainer()),e=0;e<c.length;)g=""+b+"-"+c[e],a.addEndpoint(""+b,this.sourceEndpoint,{anchor:c[e],uuid:g}),e++;for(f=0;f<d.length;)h=""+b+"-"+d[f],a.addEndpoint(""+b,this.targetEndpoint,{anchor:d[f],uuid:h}),f++},b.prototype.getPosition=function(){return this.$element.parent().length>0&&(this.location=this.$element.position()),this.location},b.prototype.setPosition=function(a){return this.$element.css(a),this.getPosition()},b.prototype.refreshTitle=function(){return this.$elementTitle.text(this.title),this},b.prototype.refreshIcon=function(){return this.$img.attr("src",this.icon),this},b.prototype.addDataClassification=function(){return this.dataClassifications.push({title:"Untitled Data Classification",type:"public"}),this},b.prototype.removeDataClassification=function(a){var b;return b=this.dataClassifications.indexOf(a),b>-1&&this.dataClassifications.splice(b,1),this.dataClassifications},b.prototype.addSecurityControl=function(){return this.securityControls.push({title:"Untitled Security Control",type:"confidentiality"}),this},b.prototype.removeSecurityControl=function(a){var b;return b=this.securityControls.indexOf(a),b>-1&&this.securityControls.splice(b,1),this.securityControls},b.prototype.serialize=function(){var a;return a={id:this.uuid,title:this.title,icon:this.icon,category:this.constructor.category,"class":this.constructor.name,location:this.getPosition(),tags:this.tags,scale:1,notes:this.notes,attributes:{shape:this.constructor.shape,codeType:this.codeType,runningAs:this.runningAs,acceptsInput:this.acceptsInput,authenticationScheme:this.authenticationScheme,authorizationScheme:this.authorizationScheme,communicationProtocol:this.communicationProtocol,dataClassifications:this.dataClassifications,securityControls:this.securityControls}}},b.prototype.deserialize=function(a){var b;return b=a.attributes,this.uuid=a.id,this.title=a.title,this.icon=a.icon,this.tags=a.tags,this.codeType=b.codeType,this.runningAs=b.runningAs,this.acceptsInput=b.acceptsInput,this.authenticationScheme=b.authenticationScheme,this.authorizationScheme=b.authorizationScheme,this.communicationProtocol=b.communicationProtocol,this.dataClassifications=b.dataClassifications,this.securityControls=b.securityControls,this.notes=a.notes,this.$element.attr("id",this.uuid),this.setPosition(a.location),this.refreshTitle(),this.refreshIcon(),this},b.prototype.sourceEndpoint={endpoint:"Dot",paintStyle:{strokeStyle:"#7AB02C",fillStyle:"transparent",radius:7,lineWidth:3},isSource:!0,connector:["Flowchart",{stub:[40,60],gap:10,cornerRadius:5,alwaysRespectStubs:!0}],connectorStyle:b.connectorPaintStyle,hoverPaintStyle:b.endpointHoverStyle,connectorHoverStyle:b.connectorHoverStyle,dragOptions:{},overlays:[["Label",{location:[.5,1.5],cssClass:"endpointSourceLabel"}]]},b.prototype.targetEndpoint={endpoint:"Dot",paintStyle:{fillStyle:"#7AB02C",radius:11},hoverPaintStyle:b.endpointHoverStyle,maxConnections:-1,dropOptions:{hoverClass:"hover",activeClass:"active"},isTarget:!0,overlays:[["Label",{location:[.5,-.5],cssClass:"endpointTargetLabel"}]]},b.prototype.connectorPaintStyle={lineWidth:4,strokeStyle:"#61B7CF",joinstyle:"round",outlineColor:"white",outlineWidth:2},b.prototype.connectorHoverStyle={lineWidth:4,strokeStyle:"#216477",outlineWidth:2,outlineColor:"white"},b.prototype.endpointHoverStyle={fillStyle:"#216477",strokeStyle:"#216477"},b}()}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("BaseBoundaryStencil",["BaseStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Base",c.category="Boundary",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("GenericTrustBoundaryStencil",["BaseBoundaryStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Generic Trust Boundary",c.icon="images/icons/connections1.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("BaseExternalStencil",["BaseStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Base",c.category="External",c.shape="circle",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("AuthorizationStencil",["BaseExternalStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Authorization",c.icon="images/icons/key20.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("BotStencil",["BaseExternalStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Bot",c.icon="images/icons/binary6.png",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("HumanUserStencil",["BaseExternalStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Human User",c.icon="images/icons/user91.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("ServerStencil",["BaseExternalStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Server",c.icon="images/icons/server11.png",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("ServiceStencil",["BaseExternalStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Service",c.icon="images/icons/sitemap1.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("BaseProcessStencil",["BaseStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Base",c.category="Process",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("WebBrowserStencil",["BaseProcessStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Web Browser",c.icon="images/icons/website17.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("DesktopStencil",["BaseProcessStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Desktop Computer",c.icon="images/icons/monitor97.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("LaptopStencil",["BaseProcessStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Laptop Computer",c.icon="images/icons/blogging.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("MobileWebBrowserStencil",["BaseProcessStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Mobile Web Browser",c.icon="images/icons/wifi7.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("NativeApplicationStencil",["BaseProcessStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Native Application",c.icon="images/icons/website22.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("ProcessStencil",["BaseProcessStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Process",c.icon="images/icons/category.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("ThreadStencil",["BaseProcessStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Thread",c.icon="images/icons/category.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("WebApplicationStencil",["BaseProcessStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Web Application",c.icon="images/icons/website22.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("BaseStoreStencil",["BaseStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Base",c.category="Store",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("CacheStencil",["BaseStoreStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Cache",c.icon="images/icons/storage20.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("DataStoreStencil",["BaseStoreStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Data Store",c.icon="images/icons/server11.svg",c}(a)}])}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};angular.module("seaspongeApp").factory("DatabaseStencil",["BaseStoreStencil",function(a){var c;return c=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}return b(c,a),c.title="Database",c.icon="images/icons/database11.svg",c}(a)}])}.call(this),function(){"use strict";angular.module("seaspongeApp").controller("CreateController",["$scope","$location","model","config",function(a,b,c,d){var e;return console.log("model",c),a.title="Example 1",a.authors="Glavin Wiechert",a.version="0.0.0",e=function(a){var b,c;try{return c=JSON.parse(a),d.setConfiguration(c)}catch(e){return b=e,console.warn(b)}},a.loadFile=function(b){return a.$apply(function(c){var d;return d=new FileReader,d.onload=function(){return a.$apply(function(a){var b;return b=d.result,e(b)})},d.readAsText(b.files[0])})},a.createModel=function(){return c.title=a.title,c.authors=a.authors,c.version=a.version,b.path("/draw")}}])}.call(this),function(){"use strict";angular.module("seaspongeApp").controller("LoadController",["$scope","$location","model",function(a,b,c){var d,e,f;return d=function(a){var d,e;try{return e=JSON.parse(a),c.deserialize(e),b.path("/draw")}catch(f){return d=f,console.warn(d)}},f=b.$$search,f.model&&(e=f.model,delete b.$$search.model,d(e)),a.loadFile=function(b){return a.$apply(function(c){var e;return e=new FileReader,e.onload=function(){return a.$apply(function(a){var b;return b=e.result,d(b)})},e.readAsText(b.files[0])})}}])}.call(this),function(){"use strict";angular.module("seaspongeApp").factory("config",[function(){var a;return a={setConfiguration:function(a){return this.dataClassificationOptions=a.dataClassificationOptions,this.securityControlOptions=a.securityControlOptions,this.severityOptions=a.severityOptions,this},codeTypeOptions:["Not selected","Managed","Unmanaged"],runningAsOptions:["Kernel","System","Network Service","Local Service","Administrator","Standard User with Elevation","Standard User without Elevation","Windows Store App"],acceptsInputOptions:["Not Selected","Any Remote User or Entity","Kernel, System, or Local Admin","Local or Network Service","Local Standard User With Elevation","Local Standard User Without Elevation","Windows Store Apps or App Container Processes","Nothing","Other"],dataClassificationOptions:["public","internal","restricted","secret"],securityControlOptions:["confidentiality","integrity","availability"],severityOptions:["Low","Medium","High"]}}])}.call(this),function(){"use strict";var a=function(a,b){return function(){return a.apply(b,arguments)}};angular.module("seaspongeApp").factory("model",["Diagram","config",function(b,c){var d;return new(d=function(){function d(){this.deserialize=a(this.deserialize,this),this.serialize=a(this.serialize,this),this.threats=[],this.diagrams=[],this.assumptions=[]}return d.prototype.title="Untitled Model",d.prototype.version="0.0.0",d.prototype.authors="",d.prototype.threats=null,d.prototype.notes="",d.prototype.diagrams=null,d.prototype.assumptions=null,d.prototype.addDiagram=function(){var a;return a=new b,this.diagrams.push(a),a},d.prototype.addThreat=function(a){return this.threats.push(a)},d.prototype.removeThreat=function(a){var b;b=this.threats.indexOf(a),b>-1&&this.threats.splice(b,1)},d.prototype.threatLength=function(){return this.threats.length>0?!0:!1},d.prototype.removeDiagram=function(a){var b;b=this.diagrams.indexOf(a),b>-1&&this.diagrams.splice(b,1)},d.prototype.addAssumption=function(){var a;return a={title:"",details:""},this.assumptions.push(a),a},d.prototype.removeAssumption=function(a){var b;b=this.assumptions.indexOf(a),b>-1&&this.assumptions.splice(b,1)},d.prototype.serialize=function(){var a,b;return b={title:this.title,version:this.version,date:new Date,authors:this.authors,configuration:{dataClassificationOptions:c.dataClassificationOptions,securityControlOptions:c.securityControlOptions,severityOptions:c.severityOptions},threats:this.threats,notes:this.notes,assumptions:this.assumptions,diagrams:function(){var b,c,d,e;for(d=this.diagrams,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.serialize());return e}.call(this)}},d.prototype.deserialize=function(a){var b;return this.title=a.title,this.version=a.version,this.authors=a.authors,this.threats=a.threats||[],c.dataClassificationOptions=a.configuration.dataClassificationOptions,c.securityControlOptions=a.configuration.securityControlOptions,c.severityOptions=a.configuration.severityOptions,this.notes=a.notes||[],this.assumptions=a.assumptions||[],this.diagrams=function(){var c,d,e,f;for(e=a.diagrams,f=[],c=0,d=e.length;d>c;c++)b=e[c],f.push(this.addDiagram().deserialize(b));return f}.call(this),this},d}())}])}.call(this),function(){"use strict";var a=function(a,b){return function(){return a.apply(b,arguments)}};angular.module("seaspongeApp").factory("Diagram",["Stencils","BaseStencil",function(b,c){var d;return d=function(){function d(){this.render=a(this.render,this),this.deserialize=a(this.deserialize,this),this.serialize=a(this.serialize,this),this.id=jsPlumbUtil.uuid(),this.elements=[],this.flows=[],this.boundaries=[],this.zoom=1}return d.prototype.id=null,d.prototype.title="Untitled Diagram",d.prototype.elements=null,d.prototype.flows=null,d.prototype.boundaries=null,d.prototype.zoom=null,d.clear=function(a,b){var c,d,e,f;for(d=a.getConnections(),e=0,f=d.length;f>e;e++)c=d[e],a.detach(c);return a.removeAllEndpoints(),a.reset(),$(b).empty()},d.prototype.serialize=function(){var a,b,c;return c={id:this.id,title:this.title,elements:function(){var a,c,d,e;for(d=this.elements,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b.serialize());return e}.call(this),flows:this.flows,boundaries:function(){var b,c,d,e;for(d=this.boundaries,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.serialize());return e}.call(this),zoom:this.zoom}},d.stencilClassForElement=function(a){var d,e;return e=function(){var c,e,f;for(f=[],c=0,e=b.length;e>c;c++)d=b[c],d.name===a&&f.push(d);return f}(),d=e[0],null==d&&(d=c),d},d.prototype.deserialize=function(a){var b;return this.id=a.id,this.title=a.title,this.elements=function(){var c,d,e,f;for(e=a.elements,f=[],c=0,d=e.length;d>c;c++)b=e[c],f.push(this.addElement(this.constructor.stencilClassForElement(b["class"])).deserialize(b));return f}.call(this),this.flows=a.flows,this.zoom=a.zoom,this},d.prototype.addElement=function(a){var b;return b=new a,this.elements.push(b),b},d.prototype.deleteElement=function(a){var b;return b=this.elements.indexOf(a),b>-1?this.elements.splice(b,1):void 0},d.prototype.deleteFlow=function(a){return jsPlumb.detach(a)},d.prototype.save=function(a,b){var c,d,e,f,g;return c=$(".stencil",b),f=function(){var a,b,d;for(d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push($(e).data("stencil"));return d}(),this.elements=f,d=a.getConnections(),this.flows=function(){var a,b,c,e,f;for(f=[],a=0,b=d.length;b>a;a++)g=d[a],f.push({sourceUuid:null!=(c=g.endpoints[0])?c.getUuid():void 0,targetUuid:null!=(e=g.endpoints[1])?e.getUuid():void 0,properties:g.properties});return f}(),console.log("flows",this.flows),this},d.prototype.render=function(a,b){return jsPlumb.ready(function(c){return function(){var d,e;return d=angular.element(b).scope(),e=function(e){e.properties=e.properties||{label:e.sourceId.substring(15)+"-"+e.targetId.substring(15),tags:[]},e.refreshLabel=function(){return e.getOverlay("label").setLabel(e.properties.label)},e.refreshLabel(),e.bind("editCompleted",function(e){d.$apply(function(){return c.save(a,b)})}),c.save(a,b)},a.doWhileSuspended(function(){var d,f,g,h,i,j,k,l,m,n,o;for(a.bind("connection",function(a,b){e(a.connection)}),a.bind("click",function(a,c){b.trigger("flow-instance-click",[a,c])}),a.bind("connectionDrag",function(a){console.log("connection "+a.id+" is being dragged. suspendedElement is ",a.suspendedElement," of type ",a.suspendedElementType)}),a.bind("connectionDragStop",function(a){console.log("connection "+a.id+" was dragged")}),a.bind("connectionMoved",function(a){console.log("connection "+a.connection.id+" was moved")}),a.bind("contextmenu",function(a,b){console.log("contextmenu: ",a,b)}),n=c.elements,j=0,l=n.length;l>j;j++)g=n[j],g.render(a,b);for(o=c.flows,k=0,m=o.length;m>k;k++)h=o[k],f=a.connect({uuids:[h.sourceUuid,h.targetUuid]}),f.properties=h.properties,f.refreshLabel();return a.draggable(jsPlumb.getSelector(".diagram-contents .stencil"),{grid:[20,20]}),d=$(".drawing-panel"),i="scale("+c.zoom+")",d.css({"-webkit-transform":i,"-moz-transform":i,"-ms-transform":i,"-o-transform":i,transform:i}),$(),a.setZoom(c.zoom),a.repaint(),a.repaintEverything()})}}(this))},d}()}])}.call(this);