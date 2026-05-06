let e,t,i,r,o,s,a,c,h,p,u,g,m,f,b;var v,_,w,x,$,C,S,E,A={379(e){function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,r="",o=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)i=e.charCodeAt(c);else if(47===i)break;else i=47;if(47===i){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){var h=r.lastIndexOf("/");if(h!==r.length-1){-1===h?(r="",o=0):o=(r=r.slice(0,h)).length-1-r.lastIndexOf("/"),s=c,a=0;continue}}else if(2===r.length||1===r.length){r="",o=0,s=c,a=0;continue}}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(s+1,c):r=e.slice(s+1,c),o=c-s-1;s=c,a=0}else 46===i&&-1!==a?++a:a=-1}return r}var r={resolve:function(){for(var e,r,o="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?r=arguments[a]:(void 0===e&&(e=process.cwd()),r=e),t(r),0!==r.length&&(o=r+"/"+o,s=47===r.charCodeAt(0));if(o=i(o,!s),s)if(o.length>0)return"/"+o;else return"/";return o.length>0?o:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return(0!==(e=i(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r)?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var o=arguments[i];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=r.resolve(e))===(i=r.resolve(i)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var s=e.length,a=s-o,c=1;c<i.length&&47===i.charCodeAt(c);++c);for(var h=i.length-c,p=a<h?a:h,u=-1,g=0;g<=p;++g){if(g===p){if(h>p){if(47===i.charCodeAt(c+g))return i.slice(c+g+1);else if(0===g)return i.slice(c+g)}else a>p&&(47===e.charCodeAt(o+g)?u=g:0===g&&(u=0));break}var m=e.charCodeAt(o+g);if(m!==i.charCodeAt(c+g))break;47===m&&(u=g)}var f="";for(g=o+u+1;g<=s;++g)(g===s||47===e.charCodeAt(g))&&(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(c+u):(c+=u,47===i.charCodeAt(c)&&++c,i.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),r=47===i,o=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(i=e.charCodeAt(a))){if(!s){o=a;break}}else s=!1;return -1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var r,o=0,s=-1,a=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var c=i.length-1,h=-1;for(r=e.length-1;r>=0;--r){var p=e.charCodeAt(r);if(47===p){if(!a){o=r+1;break}}else -1===h&&(a=!1,h=r+1),c>=0&&(p===i.charCodeAt(c)?-1==--c&&(s=r):(c=-1,s=h))}return o===s?s=h:-1===s&&(s=e.length),e.slice(o,s)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!a){o=r+1;break}}else -1===s&&(a=!1,s=r+1);return -1===s?"":e.slice(o,s)},extname:function(e){t(e);for(var i=-1,r=0,o=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47===h){if(!s){r=c+1;break}continue}-1===o&&(s=!1,o=c+1),46===h?-1===i?i=c:1!==a&&(a=1):-1!==i&&(a=-1)}return -1===i||-1===o||0===a||1===a&&i===o-1&&i===r+1?"":e.slice(i,o)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i,r={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return r;var o=e.charCodeAt(0),s=47===o;s?(r.root="/",i=1):i=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,g=0;u>=i;--u){if(47===(o=e.charCodeAt(u))){if(!p){c=u+1;break}continue}-1===h&&(p=!1,h=u+1),46===o?-1===a?a=u:1!==g&&(g=1):-1!==a&&(g=-1)}return -1===a||-1===h||0===g||1===g&&a===h-1&&a===c+1?-1!==h&&(0===c&&s?r.base=r.name=e.slice(1,h):r.base=r.name=e.slice(c,h)):(0===c&&s?(r.name=e.slice(1,a),r.base=e.slice(1,h)):(r.name=e.slice(c,a),r.base=e.slice(c,h)),r.ext=e.slice(a,h)),c>0?r.dir=e.slice(0,c-1):s&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r},90(e,t,i){i.d(t,{FlowLayout:()=>FlowLayout,flow:()=>o}),i.r(t);let SizeCache=class SizeCache{constructor(e){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,e?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(e,t){let i=this._map.get(e)||0;this._map.set(e,t),this.totalSize+=t-i}get averageSize(){if(this._map.size>0){let e=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(e):e}return 0}getSize(e){return this._map.get(e)}clear(){this._map.clear(),this.totalSize=0}};function r(e){return"horizontal"===e?"width":"height"}let BaseLayout=class BaseLayout{_getDefaultConfig(){return{direction:"vertical"}}constructor(e,t){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=e,Promise.resolve().then(()=>this.config=t||this._getDefaultConfig())}set config(e){Object.assign(this,Object.assign({},this._getDefaultConfig(),e))}get config(){return{direction:this.direction}}get items(){return this._items}set items(e){this._setItems(e)}_setItems(e){e!==this._items&&(this._items=e,this._scheduleReflow())}get direction(){return this._direction}set direction(e){(e="horizontal"===e?e:"vertical")!==this._direction&&(this._direction=e,this._sizeDim="horizontal"===e?"width":"height",this._secondarySizeDim="horizontal"===e?"height":"width",this._positionDim="horizontal"===e?"left":"top",this._secondaryPositionDim="horizontal"===e?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(e){let{_viewDim1:t,_viewDim2:i}=this;Object.assign(this._viewportSize,e),i!==this._viewDim2?this._scheduleLayoutUpdate():t!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(e){Object.assign(this._latestCoords,e);let t=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(t-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(e=!1){(e||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(e){this._pin=e,this._triggerReflow()}get pin(){if(null!==this._pin){let{index:e,block:t}=this._pin;return{index:Math.max(0,Math.min(e,this.items.length-1)),block:t}}return null}_clampScrollPosition(e){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(e,this.totalScrollSize[r(this.direction)]-this._viewDim1))}unpin(){null!==this._pin&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(null!==this.pin){let e=this._scrollPosition,{index:t,block:i}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:t,block:i||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=e-this._scrollPosition}}_calculateScrollIntoViewPosition(e){let{block:t}=e,i=Math.min(this.items.length,Math.max(0,e.index)),r=this._getItemPosition(i)[this._positionDim],o=r;if("start"!==t){let e=this._getItemSize(i)[this._sizeDim];if("center"===t)o=r-.5*this._viewDim1+.5*e;else{let i=r-this._viewDim1+e;if("end"===t)o=i;else{let e=this._scrollPosition;o=Math.abs(e-r)<Math.abs(e-i)?r:i}}}return o+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(o)}getScrollIntoViewCoordinates(e){return{[this._positionDim]:this._calculateScrollIntoViewPosition(e)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let e=new Map;if(-1!==this._first&&-1!==this._last)for(let t=this._first;t<=this._last;t++)e.set(t,this._getItemPosition(t));let t={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:e};this._scrollError&&(t.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(t)}get _num(){return -1===this._first||-1===this._last?0:this._last-this._first+1}_checkThresholds(){if(0===this._viewDim1&&this._num>0||null!==this._pin)this._scheduleReflow();else{let e=Math.max(0,this._scrollPosition-this._overhang),t=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>e||this._physicalMax<t?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(e){if(-1===this._first||-1===this._last)return;let t=this._first;for(;t<this._last&&Math.round(this._getItemPosition(t)[this._positionDim]+this._getItemSize(t)[this._sizeDim])<=Math.round(this._scrollPosition);)t++;let i=this._last;for(;i>this._first&&Math.round(this._getItemPosition(i)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)i--;(t!==this._firstVisible||i!==this._lastVisible)&&(this._firstVisible=t,this._lastVisible=i,e&&e.emit&&this._sendVisibilityChangedMessage())}};let o=e=>Object.assign({type:FlowLayout},e);function s(e){return"horizontal"===e?"marginLeft":"marginTop"}let MetricsCache=class MetricsCache{constructor(){this._childSizeCache=new SizeCache,this._marginSizeCache=new SizeCache,this._metricsCache=new Map}update(e,t){let i=new Set;for(let o of(Object.keys(e).forEach(o=>{let s=Number(o);this._metricsCache.set(s,e[s]),this._childSizeCache.set(s,e[s][r(t)]),i.add(s),i.add(s+1)}),i)){let e=this._metricsCache.get(o)?.[s(t)]||0,i=this._metricsCache.get(o-1)?.["horizontal"===t?"marginRight":"marginBottom"]||0;this._marginSizeCache.set(o,function(e,t){let i=[e,t].sort();return i[1]<=0?Math.min(...i):i[0]>=0?Math.max(...i):i[0]+i[1]}(e,i))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(e,t){return this._metricsCache.get(e)?.[s(t)]||0}getChildSize(e){return this._childSizeCache.getSize(e)}getMarginSize(e){return this._marginSizeCache.getSize(e)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}};let FlowLayout=class FlowLayout extends BaseLayout{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new MetricsCache,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(e){this._metricsCache.update(e,this.direction),this._scheduleReflow()}_getPhysicalItem(e){return this._newPhysicalItems.get(e)??this._physicalItems.get(e)}_getSize(e){return this._getPhysicalItem(e)&&this._metricsCache.getChildSize(e)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(e){let t=this._metricsCache;if(-1===this._first||-1===this._last)return t.averageMarginSize+e*(t.averageMarginSize+this._getAverageSize());if(e<this._first){let i=this._first-e;return this._getPhysicalItem(this._first).pos-(t.getMarginSize(this._first-1)||t.averageMarginSize)-(i*t.averageChildSize+(i-1)*t.averageMarginSize)}{let i=e-this._last;return this._getPhysicalItem(this._last).pos+(t.getChildSize(this._last)||t.averageChildSize)+(t.getMarginSize(this._last)||t.averageMarginSize)+i*(t.averageChildSize+t.averageMarginSize)}}_getPosition(e){let t=this._getPhysicalItem(e),{averageMarginSize:i}=this._metricsCache;return 0===e?this._metricsCache.getMarginSize(0)??i:t?t.pos:this._estimatePosition(e)}_calculateAnchor(e,t){return e<=0?0:t>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((e+t)/2/this._delta)))}_getAnchor(e,t){if(0===this._physicalItems.size||this._first<0||this._last<0)return this._calculateAnchor(e,t);let i=this._getPhysicalItem(this._first),r=this._getPhysicalItem(this._last),o=i.pos;if(r.pos+this._metricsCache.getChildSize(this._last)<e||o>t)return this._calculateAnchor(e,t);let s=this._firstVisible-1,a=-1/0;for(;a<e;)a=this._getPhysicalItem(++s).pos+this._metricsCache.getChildSize(s);return s}_getActiveItems(){0===this._viewDim1||0===this.items.length?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let e=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e,this._stable=!0}_getItems(){let e,t,i=this._newPhysicalItems;if(this._stable=!0,null!==this.pin){let{index:e}=this.pin;this._anchorIdx=e,this._anchorPos=this._getPosition(e)}if(e=this._scrollPosition-this._overhang,(t=this._scrollPosition+this._viewDim1+this._overhang)<0||e>this._scrollSize)return void this._clearItems();(null===this._anchorIdx||null===this._anchorPos)&&(this._anchorIdx=this._getAnchor(e,t),this._anchorPos=this._getPosition(this._anchorIdx));let r=this._getSize(this._anchorIdx);void 0===r&&(this._stable=!1,r=this._getAverageSize());let o=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,s=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;0===this._anchorIdx&&(this._anchorPos=o),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-s-r);let a=0;for(this._anchorPos+r+s<e&&(a=e-(this._anchorPos+r+s)),this._anchorPos-o>t&&(a=t-(this._anchorPos-o)),a&&(this._scrollPosition-=a,e-=a,t-=a,this._scrollError+=a),i.set(this._anchorIdx,{pos:this._anchorPos,size:r}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-o,this._physicalMax=this._anchorPos+r+s;this._physicalMin>e&&this._first>0;){let e=this._getSize(--this._first);void 0===e&&(this._stable=!1,e=this._getAverageSize());let t=this._metricsCache.getMarginSize(this._first);void 0===t&&(this._stable=!1,t=this._metricsCache.averageMarginSize),this._physicalMin-=e;let r=this._physicalMin;if(i.set(this._first,{pos:r,size:e}),this._physicalMin-=t,!1===this._stable&&!1===this._estimate)break}for(;this._physicalMax<t&&this._last<this.items.length-1;){let e=this._getSize(++this._last);void 0===e&&(this._stable=!1,e=this._getAverageSize());let t=this._metricsCache.getMarginSize(this._last);void 0===t&&(this._stable=!1,t=this._metricsCache.averageMarginSize);let r=this._physicalMax;if(i.set(this._last,{pos:r,size:e}),this._physicalMax+=e+t,!this._stable&&!this._estimate)break}let c=this._calculateError();c&&(this._physicalMin-=c,this._physicalMax-=c,this._anchorPos-=c,this._scrollPosition-=c,i.forEach(e=>e.pos-=c),this._scrollError+=c),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=i)}_calculateError(){return 0===this._first?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:e,_last:t}=this;super._reflow(),(-1===this._first&&-1==this._last||this._first===e&&this._last===t)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:e}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(e+this._getAverageSize())+e)}get _delta(){let{averageMarginSize:e}=this._metricsCache;return this._getAverageSize()+e}_getItemPosition(e){return{[this._positionDim]:this._getPosition(e),[this._secondaryPositionDim]:0,["horizontal"===this.direction?"xOffset":"yOffset"]:-(this._metricsCache.getLeadingMarginValue(e,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(e){return{[this._sizeDim]:this._getSize(e)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}}},P={};function T(e){var t=P[e];if(void 0!==t)return t.exports;var i=P[e]={exports:{}};return A[e](i,i.exports,T),i.exports}T.d=(e,t)=>{for(var i in t)T.o(t,i)&&!T.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},T.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),T.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},Object.defineProperty(T,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(e){}});let M=globalThis,j=M.ShadowRoot&&(void 0===M.ShadyCSS||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,O=Symbol(),D=new WeakMap;let n=class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==O)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(j&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=D.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&D.set(t,e))}return e}toString(){return this.cssText}};let B=e=>new n("string"==typeof e?e:e+"",void 0,O),F=(e,...t)=>new n(1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]),e,O),N=j?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return B(t)})(e):e,{is:q,defineProperty:U,getOwnPropertyDescriptor:W,getOwnPropertyNames:V,getOwnPropertySymbols:K,getPrototypeOf:G}=Object,Y=globalThis,X=Y.trustedTypes,J=X?X.emptyScript:"",Q=Y.reactiveElementPolyfillSupport,ee={toAttribute(e,t){switch(t){case Boolean:e=e?J:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},et=(e,t)=>!q(e,t),ei={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:et};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ei){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&U(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:o}=W(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let s=r?.call(this);o?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ei}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=G(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...V(e),...K(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let i of new Set(e.flat(1/0).reverse()))t.unshift(N(i));else void 0!==e&&t.push(N(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(j)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),r=M.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){let o=(void 0!==i.converter?.toAttribute?i.converter:ee).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){let e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:ee;this._$Em=r;let s=o.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){let s=this.constructor;if(!1===r&&(o=this[e]),!(((i??=s.getPropertyOptions(e)).hasChanged??et)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e){let{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,Q?.({ReactiveElement:y}),(Y.reactiveElementVersions??=[]).push("2.1.2");let er=globalThis,eo=e=>e,es=er.trustedTypes,en=es?es.createPolicy("lit-html",{createHTML:e=>e}):void 0,ea="$lit$",el=`lit$${Math.random().toFixed(9).slice(2)}$`,ec="?"+el,eh=`<${ec}>`,ed=document,ep=()=>ed.createComment(""),eu=e=>null===e||"object"!=typeof e&&"function"!=typeof e,eg=Array.isArray,em=e=>eg(e)||"function"==typeof e?.[Symbol.iterator],ef=`[ 	
\x0c\r]`,eb=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ev=/-->/g,e_=/>/g,ey=RegExp(`>|${ef}(?:([^\\s"'>=/]+)(${ef}*=${ef}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ew=/'/g,ek=/"/g,ex=/^(?:script|style|textarea|title)$/i,e$=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),eC=e$(1),eS=e$(2),eE=(e$(3),Symbol.for("lit-noChange")),eA=Symbol.for("lit-nothing"),eP=new WeakMap,ez=ed.createTreeWalker(ed,129);function eR(e,t){if(!eg(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==en?en.createHTML(t):t}let eI=(e,t)=>{let i=e.length-1,r=[],o,s=2===t?"<svg>":3===t?"<math>":"",a=eb;for(let t=0;t<i;t++){let i=e[t],c,h,p=-1,u=0;for(;u<i.length&&(a.lastIndex=u,null!==(h=a.exec(i)));)u=a.lastIndex,a===eb?"!--"===h[1]?a=ev:void 0!==h[1]?a=e_:void 0!==h[2]?(ex.test(h[2])&&(o=RegExp("</"+h[2],"g")),a=ey):void 0!==h[3]&&(a=ey):a===ey?">"===h[0]?(a=o??eb,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?ey:'"'===h[3]?ek:ew):a===ek||a===ew?a=ey:a===ev||a===e_?a=eb:(a=ey,o=void 0);let g=a===ey&&e[t+1].startsWith("/>")?" ":"";s+=a===eb?i+eh:p>=0?(r.push(c),i.slice(0,p)+ea+i.slice(p)+el+g):i+el+(-2===p?t:g)}return[eR(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};let lit_html_S=class lit_html_S{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,s=0,a=e.length-1,c=this.parts,[h,p]=eI(e,t);if(this.el=lit_html_S.createElement(h,i),ez.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=ez.nextNode())&&c.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(let e of r.getAttributeNames())if(e.endsWith(ea)){let t=p[s++],i=r.getAttribute(e).split(el),a=/([.?@])?(.*)/.exec(t);c.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),r.removeAttribute(e)}else e.startsWith(el)&&(c.push({type:6,index:o}),r.removeAttribute(e));if(ex.test(r.tagName)){let e=r.textContent.split(el),t=e.length-1;if(t>0){r.textContent=es?es.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],ep()),ez.nextNode(),c.push({type:2,index:++o});r.append(e[t],ep())}}}else if(8===r.nodeType)if(r.data===ec)c.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(el,e+1));)c.push({type:7,index:o}),e+=el.length-1}o++}}static createElement(e,t){let i=ed.createElement("template");return i.innerHTML=e,i}};function eT(e,t,i=e,r){if(t===eE)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl,s=eu(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(e))._$AT(e,i,r),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=eT(e,o._$AS(e,t.values),o,r)),t}let R=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??ed).importNode(t,!0);ez.currentNode=r;let o=ez.nextNode(),s=0,a=0,c=i[0];for(;void 0!==c;){if(s===c.index){let t;2===c.type?t=new k(o,o.nextSibling,this,e):1===c.type?t=new c.ctor(o,c.name,c.strings,this,e):6===c.type&&(t=new Z(o,this,e)),this._$AV.push(t),c=i[++a]}s!==c?.index&&(o=ez.nextNode(),s++)}return ez.currentNode=ed,r}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=eA,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){eu(e=eT(this,e,t))?e===eA||null==e||""===e?(this._$AH!==eA&&this._$AR(),this._$AH=eA):e!==this._$AH&&e!==eE&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):em(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==eA&&eu(this._$AH)?this._$AA.nextSibling.data=e:this.T(ed.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=lit_html_S.createElement(eR(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new R(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=eP.get(e.strings);return void 0===t&&eP.set(e.strings,t=new lit_html_S(e)),t}k(e){eg(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let o of e)r===t.length?t.push(i=new k(this.O(ep()),this.O(ep()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=eo(e).nextSibling;eo(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=eA,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=eA}_$AI(e,t=this,i,r){let o=this.strings,s=!1;if(void 0===o)(s=!eu(e=eT(this,e,t,0))||e!==this._$AH&&e!==eE)&&(this._$AH=e);else{let r,a,c=e;for(e=o[0],r=0;r<o.length-1;r++)(a=eT(this,c[i+r],t,r))===eE&&(a=this._$AH[r]),s||=!eu(a)||a!==this._$AH[r],a===eA?e=eA:e!==eA&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}s&&!r&&this.j(e)}j(e){e===eA?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===eA?void 0:e}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==eA)}};let z=class z extends H{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=eT(this,e,t,0)??eA)===eE)return;let i=this._$AH,r=e===eA&&i!==eA||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==eA&&(i===eA||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};let Z=class Z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){eT(this,e)}};let eM=er.litHtmlPolyfillSupport;eM?.(lit_html_S,k),(er.litHtmlVersions??=[]).push("3.3.2");let ej=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{let r=i?.renderBefore??t,o=r._$litPart$;if(void 0===o){let e=i?.renderBefore??null;r._$litPart$=o=new k(t.insertBefore(ep(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return eE}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,ej.litElementHydrateSupport?.({LitElement:lit_element_i});let eO=ej.litElementPolyfillSupport;eO?.({LitElement:lit_element_i}),(ej.litElementVersions??=[]).push("4.2.2");let eD=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},eL={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:et};function eB(e){return(t,i)=>{let r;return"object"==typeof i?((e=eL,t,i)=>{let{kind:r,metadata:o}=i,s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===r){let{name:r}=i;return{set(i){let o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){let{name:r}=i;return function(i){let o=this[r];t.call(this,i),this.requestUpdate(r,o,e,!0,i)}}throw Error("Unsupported decorator location: "+r)})(e,t,i):(r=t.hasOwnProperty(i),t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0)}}function eF(e){return eB({...e,state:!0,attribute:!1})}let eN=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);function eq(e,t){return(i,r,o)=>{let s=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:a}="object"==typeof r?i:o??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return eN(i,r,{get(){let e=t.call(this);return void 0===e&&(null!==(e=s(this))||this.hasUpdated)&&a.call(this,e),e}})}return eN(i,r,{get(){return s(this)}})}}function eU(e,t,i){return e?t(e):i?.(e)}let eW=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,eH=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,eV=[["year",629856e5,31536e6,"yr"],["month",2628e6,2628e6,"mo"],["week",6048e5,6048e5,"wk"],["day",864e5,864e5,"d"],["hour",36e5,36e5,"h"],["minute",6e4,6e4,"m"],["second",1e3,1e3,"s"]],eK=new Map,eG=new Map;function eZ(o,s){let a=("number"==typeof o?o:o.getTime())-Date.now();for(let[o,c,h,p]of eV){let u=Math.abs(a);if(u>=c||1e3===c){if(s){if(null==e&&(e=null!=r?r.resolvedOptions().locale:null!=i?i.resolvedOptions().locale:(r=new Intl.RelativeTimeFormat(t,{localeMatcher:"best fit",numeric:"always",style:"narrow"})).resolvedOptions().locale),"en"===e||e?.startsWith("en-")){let e=Math.floor(u/h);return`${e}${p}`}return(r??=new Intl.RelativeTimeFormat(t,{localeMatcher:"best fit",numeric:"always",style:"narrow"})).format(Math.trunc(a/h),o)}return(i??=new Intl.RelativeTimeFormat(t,{localeMatcher:"best fit",numeric:"auto",style:"long"})).format(Math.trunc(a/h),o)}}return""}function eY(e,i,r,o=!0){i=i??void 0;let s=`${r??""}:${i}`,a=eK.get(s);if(null==a){let e,c=function(e){if(null==e)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};let t=eH.exec(e);if(t?.groups!=null){let{dateStyle:e,timeStyle:i}=t.groups;return{localeMatcher:"best fit",dateStyle:e||"full",timeStyle:i||void 0}}let i={localeMatcher:"best fit"};for(let{groups:t}of e.matchAll(eW))if(null!=t){for(let[e,r]of Object.entries(t))if(null!=r)switch(e){case"year":i.year=4===r.length?"numeric":"2-digit";break;case"month":switch(r.length){case 4:i.month="long";break;case 3:i.month="short";break;case 2:i.month="2-digit";break;case 1:i.month="numeric"}break;case"day":"DD"===r?i.day="2-digit":i.day="numeric";break;case"weekday":switch(r.length){case 4:i.weekday="long";break;case 3:i.weekday="short";break;case 2:i.weekday="narrow"}break;case"hour":i.hour=2===r.length?"2-digit":"numeric",i.hour12="hh"===r||"h"===r;break;case"minute":i.minute=2===r.length?"2-digit":"numeric";break;case"second":i.second=2===r.length?"2-digit":"numeric";break;case"fractionalSecond":i.fractionalSecondDigits=3;break;case"dayPeriod":i.dayPeriod="narrow",i.hour12=!0,i.hourCycle="h12";break;case"timeZoneName":i.timeZoneName=2===r.length?"long":"short"}}return i}(i);e=null==r?t:"system"===r?void 0:[r],a=new Intl.DateTimeFormat(e,c),o&&eK.set(s,a)}if(null==i||eH.test(i))return a.format(e);let c=a.formatToParts(e);return i.replace(eW,(i,s,a,h,p,u,g,m,f,b,v,_,w,x,$)=>{if(null!=s)return s.substring(1,s.length-1);for(let[i,s]of Object.entries($)){if(null==s)continue;let a=c.find(e=>e.type===i);if("Do"===s&&a?.type==="day")return function(e){let t=e%100;return`${e}${eX[(t-20)%10]??eX[t]??eX[0]}`}(Number(a.value));if("a"===s&&a?.type==="dayPeriod"){let i=(function(e){let i=`${r??""}:time:${e}`,s=eK.get(i);if(null==s){let a;a=null==r?t:"system"===r?void 0:[r],s=new Intl.DateTimeFormat(a,{localeMatcher:"best fit",timeStyle:e}),o&&eK.set(i,s)}return s})("short").formatToParts(e).find(e=>"dayPeriod"===e.type);return` ${(i??a)?.value??""}`}return a?.value??""}return""})}let eX=["th","st","nd","rd"];function eJ(e,i){e??="decimal";let r=`${i??""}:${e}`,o=eG.get(r);if(null==o){let s,a={localeMatcher:"best fit",style:e};s=null==i?t:"system"===i?void 0:[i],o=new Intl.NumberFormat(s,a),eG.set(r,o)}return o.format}function eQ(e,t,i){let r;if(null==i)return s??=eJ(),`${s(t)} ${e}${1===t?"":"s"}`;let o=1===t?e:i.plural??`${e}s`;return i.only?o:(0===t?r=i.zero??t:!1===i.format?r=t:null!=i.format?r=i.format(t):(s??=eJ(),r=s(t)),`${r}${i.infix??" "}${o}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let context_request_event_s=class context_request_event_s extends Event{constructor(e,t,i,r){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=i,this.subscribe=r??!1}};let context_consumer_s=class context_consumer_s{constructor(e,t,i,r){(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,void 0!==t.context)?(this.context=t.context,this.callback=t.callback,this.subscribe=t.subscribe??!1):(this.context=t,this.callback=i,this.subscribe=r??!1),this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new context_request_event_s(this.context,this.host,this.t,this.subscribe))}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}};let context_provider_e=class context_provider_e extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(e,t,i){super(void 0!==t.context?t.initialValue:i),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:i}]of this.subscriptions)t.has(e)||(t.add(e),i.dispatchEvent(new context_request_event_s(this.context,i,e,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new context_provider_e(this.context,this.host))}};function e0({context:e}){return(t,i)=>{let r=new WeakMap;if("object"==typeof i)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new context_provider_i(this,{context:e,initialValue:t})),t}};{let o;t.constructor.addInitializer(t=>{r.set(t,new context_provider_i(t,{context:e}))});let s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){let e=new WeakMap;o={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=s.set;o={...s,set(t){r.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,i,o)}}}var e1=Object.defineProperty,e2=(e,t,i)=>{let r;return(r="symbol"!=typeof t?t+"":t)in e?e1(e,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[r]=i,i},e5=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},e3=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},e4=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot access private method");return i};function e6(e,t){return Object.is(e,t)}let e7=null,e8=!1,e9=1,te=Symbol("SIGNAL");function tt(e){let t=e7;return e7=e,t}let ti={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function tr(e){if(e8)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===e7)return;e7.consumerOnSignalRead(e);let t=e7.nextProducerIndex++;tn(e7),t<e7.producerNode.length&&e7.producerNode[t]!==e&&ts(e7)&&to(e7.producerNode[t],e7.producerIndexOfThis[t]),e7.producerNode[t]!==e&&(e7.producerNode[t]=e,e7.producerIndexOfThis[t]=ts(e7)?function e(t,i,r){var o;if(ta(t),tn(t),0===t.liveConsumerNode.length){null==(o=t.watched)||o.call(t.wrapper);for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=e(t.producerNode[i],t,i)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(i)-1}(e,e7,t):0),e7.producerLastReadVersion[t]=e.version}function to(e,t){var i;if(ta(e),tn(e),"u">typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(i=e.unwatched)||i.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)to(e.producerNode[t],e.producerIndexOfThis[t])}let r=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[r],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[r],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let i=e.liveConsumerIndexOfThis[t],r=e.liveConsumerNode[t];tn(r),r.producerIndexOfThis[i]=t}}function ts(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function tn(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function ta(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function tl(e){if(function e(t){if(t.dirty||t.lastCleanEpoch!==e9){if(!t.producerMustRecompute(t)&&!function(t){tn(t);for(let i=0;i<t.producerNode.length;i++){let r=t.producerNode[i],o=t.producerLastReadVersion[i];if(o!==r.version||(e(r),o!==r.version))return!0}return!1}(t)){t.dirty=!1,t.lastCleanEpoch=e9;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=e9}}(e),tr(e),e.value===td)throw e.error;return e.value}let tc=Symbol("UNSET"),th=Symbol("COMPUTING"),td=Symbol("ERRORED"),tp={...ti,value:tc,dirty:!0,error:null,equal:e6,producerMustRecompute:e=>e.value===tc||e.value===th,producerRecomputeValue(e){let t;if(e.value===th)throw Error("Detected cycle in computations.");let i=e.value;e.value=th;let r=(e&&(e.nextProducerIndex=0),tt(e)),o=!1;try{t=e.computation.call(e.wrapper),o=i!==tc&&i!==td&&e.equal.call(e.wrapper,i,t)}catch(i){t=td,e.error=i}finally{if(tt(r),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(ts(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)to(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}if(o){e.value=i;return}e.value=t,e.version++}},tu=function(){throw Error()};function tg(){return tr(this),this.value}let tm={...ti,equal:e6,value:void 0},tf=Symbol("node");(e=>{var t,i,r,o;let State=class State{constructor(r,o={}){let s,a;e3(this,i),e2(this,t);let c=((s=Object.create(tm)).value=r,(a=()=>(tr(s),s.value))[te]=s,a)[te];if(this[tf]=c,c.wrapper=this,o){let t=o.equals;t&&(c.equal=t),c.watched=o[e.subtle.watched],c.unwatched=o[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return tg.call(this[tf])}set(t){var i,r;if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(e8)throw Error("Writes to signals not permitted during Watcher callback");i=this[tf],(null==e7?void 0:e7.consumerAllowSignalWrites)===!1&&tu(),i.equal.call(i.wrapper,i.value,t)||(i.value=t,r=i,r.version++,e9++,function e(t){if(void 0===t.liveConsumerNode)return;let i=e8;e8=!0;try{for(let i of t.liveConsumerNode)i.dirty||function(t){var i;t.dirty=!0,e(t),null==(i=t.consumerMarkedDirty)||i.call(t.wrapper??t)}(i)}finally{e8=i}}(r))}};t=tf,i=new WeakSet,e.isState=e=>"object"==typeof e&&e5(i,e),e.State=State;let Computed=class Computed{constructor(t,i){let s,a;e3(this,o),e2(this,r);let c=((s=Object.create(tp)).computation=t,(a=()=>tl(s))[te]=s,a)[te];if(c.consumerAllowSignalWrites=!0,this[tf]=c,c.wrapper=this,i){let t=i.equals;t&&(c.equal=t),c.watched=i[e.subtle.watched],c.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return tl(this[tf])}};r=tf,o=new WeakSet,e.isComputed=e=>"object"==typeof e&&e5(o,e),e.Computed=Computed,(t=>{var i,r,o,s;t.untrack=function(e){let t,i=null;try{i=tt(null),t=e()}finally{tt(i)}return t},t.introspectSources=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(i=t[tf].producerNode)?void 0:i.map(e=>e.wrapper))??[]},t.introspectSinks=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called introspectSinks without a Signal argument");return(null==(i=t[tf].liveConsumerNode)?void 0:i.map(e=>e.wrapper))??[]},t.hasSinks=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called hasSinks without a Signal argument");let i=t[tf].liveConsumerNode;return!!i&&i.length>0},t.hasSources=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called hasSources without a Computed or Watcher argument");let i=t[tf].producerNode;return!!i&&i.length>0};let Watcher=class Watcher{constructor(e){e3(this,r),e3(this,o),e2(this,i);let t=Object.create(ti);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[tf]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");e4(this,o,s).call(this,t);let i=this[tf];i.dirty=!1;let r=tt(i);for(let e of t)tr(e[tf]);tt(r)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");e4(this,o,s).call(this,t);let i=this[tf];tn(i);for(let e=i.producerNode.length-1;e>=0;e--)if(t.includes(i.producerNode[e].wrapper)){to(i.producerNode[e],i.producerIndexOfThis[e]);let t=i.producerNode.length-1;if(i.producerNode[e]=i.producerNode[t],i.producerIndexOfThis[e]=i.producerIndexOfThis[t],i.producerNode.length--,i.producerIndexOfThis.length--,i.nextProducerIndex--,e<i.producerNode.length){let t=i.producerIndexOfThis[e],r=i.producerNode[e];ta(r),r.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[tf].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}};i=tf,r=new WeakSet,o=new WeakSet,s=function(t){for(let i of t)if(!(0,e.isComputed)(i)&&!(0,e.isState)(i))throw TypeError("Called watch/unwatch without a Computed or State argument")},e.isWatcher=e=>e5(r,e),t.Watcher=Watcher,t.currentComputed=function(){var e;return null==(e=e7)?void 0:e.wrapper},t.watched=Symbol("watched"),t.unwatched=Symbol("unwatched")})(e.subtle||(e.subtle={}))})($||($={}));let tb=!1,tv=new $.subtle.Watcher(()=>{tb||(tb=!0,queueMicrotask(()=>{for(let e of(tb=!1,tv.getPending()))e.get();tv.watch()}))}),t_=Symbol("SignalWatcherBrand"),ty=new FinalizationRegistry(e=>{e.unwatch(...$.subtle.introspectSources(e))}),tw=new WeakMap;function tk(e){return!0===e[t_]?e:class extends e{constructor(){super(...arguments),this._$St=new Map,this._$So=new $.State(0),this._$Si=!1}_$Sl(){var e,t;let i=[],r=[];this._$St.forEach((e,t)=>{((null==e?void 0:e.beforeUpdate)?i:r).push(t)});let o=null==(e=this.h)?void 0:e.getPending().filter(e=>e!==this._$Su&&!this._$St.has(e));i.forEach(e=>e.get()),null==(t=this._$Su)||t.get(),o.forEach(e=>e.get()),r.forEach(e=>e.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(void 0!==this.h)return;this._$Su=new $.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new $.subtle.Watcher(function(){let e=tw.get(this);void 0!==e&&(!1===e._$Si&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});tw.set(e,this),ty.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(void 0===this.h)return;let e=!1;this.h.unwatch(...$.subtle.introspectSources(this.h).filter(t=>{var i;let r=!0!==(null==(i=this._$St.get(t))?void 0:i.manualDispose);return r&&this._$St.delete(t),e||(e=!r),r})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,t){var i;this._$S_();let r=new $.Computed(()=>{e()});return this.h.watch(r),this._$St.set(r,t),null!=(i=null==t?void 0:t.beforeUpdate)&&i?$.subtle.untrack(()=>r.get()):this.updateComplete.then(()=>$.subtle.untrack(()=>r.get())),()=>{this._$St.delete(r),this.h.unwatch(r),!1===this.isConnected&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{!1===this.isConnected&&this._$Sp()})}}}let tx=e=>(...t)=>({_$litDirective$:e,values:t});let directive_i=class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let{I:t$}={M:ea,P:el,A:ec,C:1,L:eI,R,D:em,V:eT,I:k,H,N:L,U:z,B:I,F:Z},tC=e=>e,tS=(e,t,i)=>{let r=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i)i=new t$(r.insertBefore(document.createComment(""),o),r.insertBefore(document.createComment(""),o),e,e.options);else{let t=i._$AB.nextSibling,s=i._$AM,a=s!==e;if(a){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==o||a){let e=i._$AA;for(;e!==t;){let t=tC(e).nextSibling;tC(r).insertBefore(e,o),e=t}}}return i},tE=(e,t,i=e)=>(e._$AI(t,i),e),tA={},tP=(e,t=tA)=>e._$AH=t,tz=e=>{e._$AR(),e._$AA.remove()},tR=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),tR(e,t);return!0},tI=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},tT=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),tO(t)}};function tM(e){void 0!==this._$AN?(tI(this),this._$AM=e,tT(this)):this._$AM=e}function tj(e,t=!1,i=0){let r=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(r))for(let e=i;e<r.length;e++)tR(r[e],!1),tI(r[e]);else null!=r&&(tR(r,!1),tI(r));else tR(this,e)}let tO=e=>{2==e.type&&(e._$AP??=tj,e._$AQ??=tM)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),tT(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(tR(this,e),tI(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let tD=!1,tL=new $.subtle.Watcher(async()=>{tD||(tD=!0,queueMicrotask(()=>{for(let e of(tD=!1,tL.getPending()))e.get();tL.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var e,t;void 0===this._$Sm&&(this._$Sj=new $.Computed(()=>{var e;let t=null==(e=this._$SW)?void 0:e.get();return this.setValue(t),t}),this._$Sm=null!=(t=null==(e=this._$Sk)?void 0:e.h)?t:tL,this._$Sm.watch(this._$Sj),$.subtle.untrack(()=>{var e;return null==(e=this._$Sj)?void 0:e.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return $.subtle.untrack(()=>e.get())}update(e,[t]){var i;return null!=this._$Sk||(this._$Sk=null==(i=e.options)?void 0:i.host),t!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=t,this._$S_(),$.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tB=tx(watch_r),tF=e=>(t,...i)=>e(t,...i.map(e=>e instanceof $.State||e instanceof $.Computed?tB(e):e));tF(eC),tF(eS),$.State,$.Computed;let tN=(e,t)=>new $.State(e,t),tq=(e,t)=>new $.Computed(e,t),{fromCharCode:tU}=String;new TextEncoder;let tW=new TextDecoder;function tH(e){return JSON.stringify(e)}let IpcCall=class IpcCall{constructor(e,t,i=!1){this.scope=e,this.reset=i,this.method=`${e}/${t}`}is(e){return e.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(e,t,i){super(e,t,i),this.response=new IpcNotification(this.scope,`${t}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let tV=new IpcRequest("core","webview/ready"),tK=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tG=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tZ=new IpcCommand("core","telemetry/sendEvent"),tY=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let tX=new IpcCommand("core","webview/focus/didChange"),tJ=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let tQ=new WeakMap;function t0(e,t){return function(i,r,o){let s=tQ.get(i.constructor);null==s&&tQ.set(i.constructor,s=[]),s.push({method:o.value,keys:Array.isArray(e)?e:[e],afterFirstUpdate:t?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(e,t,i){let r=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:t});return this.dispatchEvent(r),r}update(e){let t=tQ.get(this.constructor);if(null!=t)for(let{keys:i,method:r,afterFirstUpdate:o}of t){if(o&&!this.hasUpdated)continue;let t=i.filter(t=>e.has(t));t.length&&r.call(this,t)}super.update(e)}};let t1=/T/,t2=/.*\s*?at\s(.+?)\s/,t5=/^_+/,t3=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(e,t=!1){this.#t={...e,sanitizeKeys:new Set([...t3,...e.sanitizeKeys??[]])},this.#i=t,this.#e=e.createChannel(e.name),this.#r=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(e=>{this.#r=e})}enabled(e){return!!this.isDebugging||0!==this.#r&&(null==e||this.#r<=function(e){switch(e){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(e))}#i=!1;get isDebugging(){return this.#i}#r=0;get logLevel(){var e=this.#r;switch(e){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(t1," ").slice(0,-1)}]`}trace(e,...t){let i;(0!==this.#r&&!(this.#r>1)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.trace(`  ${i??""}${this.#o(!0,t)}`))}debug(e,...t){let i;(0!==this.#r&&!(this.#r>2)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.debug(`  ${i??""}${this.#o(!1,t)}`))}info(e,...t){let i;(0!==this.#r&&!(this.#r>3)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.info(`   ${i??""}${this.#o(!1,t)}`))}warn(e,...t){let i;(0!==this.#r&&!(this.#r>4)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.warn(`${i??""}${this.#o(!1,t)}`))}error(e,t,...i){let r;if((0===this.#r||this.#r>5)&&!this.isDebugging)return;if(null==(r=null==t||"string"==typeof t?t:`${t.prefix} ${i.shift()??""}`)){let t=e instanceof Error?e.stack:void 0;if(t){let e=t2.exec(t);null!=e&&(r=e[1])}}this.isDebugging;let o=`  ${r??""}${this.#o(!1,i)}`;null!=e?this.#e?.error(String(e),o):this.#e?.error(o)}showOutputChannel(e){this.#e?.show?.(e)}toLoggable(e,t){if(null!=t){let i=this.sanitize(t,e);if(null!=i)return i}if("function"==typeof e)return"<function>";if(null==e||"object"!=typeof e||e instanceof Error)return String(e);if(Array.isArray(e)){let t=e.length>10?e.slice(0,10):e,i=e.length>10?`, \u2026+${e.length-10}`:"";return`[${t.map(e=>this.toLoggable(e)).join(", ")}${i}]`}let i=this.#t?.toLoggable,r=i?.(e);if(null!=r)return r;let o=this.#t?.sanitizeKeys;try{return JSON.stringify(e,(e,t)=>{if(95!==e.charCodeAt(0))return o?.has(e)?this.sanitize(e,t):""===e||"object"!=typeof t||null==t||Array.isArray(t)?t:t instanceof Error?String(t):i?.(t)??t})}catch{return"<error>"}}sanitize(e,t){if(null==t)return;let i=e.replace(t5,"")||e;if(this.#t?.sanitizeKeys?.has(i))return null!=this.#t.hash?`<${i}:${this.#t.hash("string"==typeof t?t:JSON.stringify(t))}>`:`<${i}>`}#o(e,t){if(0===t.length||e&&(0===this.#r||this.#r>2)&&!this.isDebugging)return"";let i=t.map(e=>this.toLoggable(e)).join(", ");return 0!==i.length?` \u2014 ${i}`:""}};let t4=new Logger,t6=new WeakMap,t7={enabled:e=>t4.enabled(e),log:(e,t,i,...r)=>{switch(e){case"error":t4.error(void 0,t,i,...r);break;case"warn":t?.warn(i,...r);break;case"info":t?.info(i,...r);break;case"debug":default:t?.debug(i,...r);break;case"trace":t?.trace(i,...r)}}},t8=new Map;function t9(e,t){let i=a;a=e.scopeId,t8.set(e.scopeId,e);try{return t()}finally{a=i,t8.delete(e.scopeId)}}function ie(){return null!=a?t8.get(a):void 0}let it=0x40000000-1;function ii(){let e=0;return{get current(){return e},next:function(){return e===it&&(e=0),++e},reset:function(){e=0}}}function ir(e){let t=.001*performance.now(),i=Math.floor(t),r=Math.floor(t%1*1e9);return void 0!==e&&(i-=e[0],(r-=e[1])<0&&(i--,r+=1e9)),[i,r]}function io(e){let[t,i]=ir(e);return 1e3*t+Math.floor(i/1e6)}let is=ii();function ia(e,t,i){var r;let o,s,a={scopeId:e,prevScopeId:t,prefix:i,enabled:e=>t4.enabled(e),addExitInfo:function(...e){(o??=[]).push(...e)},setFailed:function(e){s=e},getExitInfo:function(){return{details:o?.length?` \u2022 ${o.join(", ")}`:void 0,failed:s}}};return il(a,"trace",t4.trace),il(a,"debug",t4.debug),il(a,"info",t4.info),il(a,"warn",t4.warn),Object.defineProperty(r=a,"error",{configurable:!0,enumerable:!0,get:function(){let e=(e,t,...i)=>t4.error(e,r,t,...i);return Object.defineProperty(r,"error",{value:e,writable:!1,enumerable:!0}),e}}),a}function il(e,t,i){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){let r=i.bind(t4,e);return Object.defineProperty(e,t,{value:r,writable:!1,enumerable:!0}),r}})}function ic(e,t,i){if(null!=i){let r=null==t?e.toString(16):`${t.toString(16)} \u2192 ${e.toString(16)}`;return null==r?`[${i.padEnd(13)}]`:`[${i}${r.padStart(13-i.length)}]`}return null==t?`[${e.toString(16).padStart(13)}]`:`[${t.toString(16).padStart(5)} \u2192 ${e.toString(16).padStart(5)}]`}function ih(){let e=ie();if(null==e)return;let t=Object.create(e);return t[Symbol.dispose]=()=>{},t}function id(e,t,i){if(null!=t&&"boolean"!=typeof t)return ia(t.scopeId,t.prevScopeId,`${t.prefix}${e}`);let r=t?ie()?.scopeId:void 0,o=is.next();return ia(o,r,`${ic(o,r,i)} ${e}`)}function ip(e,t,i,...r){switch(t){case"trace":t4.trace(e,i,...r);break;case"info":t4.info(e,i,...r);break;default:t4.debug(e,i,...r)}}let LoggerContext=class LoggerContext{constructor(e){this.scope=id(e,void 0),t4.configure({name:e,createChannel:function(e){let t=t4.isDebugging?function(e){}:function(e){};return{name:e,logLevel:0,trace:t,debug:t,info:t,warn:t,error:t}}},!1)}trace(e,...t){"string"==typeof e?t4.trace(this.scope,e,...t):t4.trace(e,t.shift(),...t)}debug(e,...t){"string"==typeof e?t4.debug(this.scope,e,...t):t4.debug(e,t.shift(),...t)}info(e,...t){"string"==typeof e?t4.info(this.scope,e,...t):t4.info(e,t.shift(),...t)}};let iu=new IpcNotification("home","subscription/didChange"),ig="graph";new IpcCommand(ig,"chooseRepository"),new IpcCommand(ig,"dblclick"),new IpcCommand(ig,"avatars/get"),new IpcCommand(ig,"refs/metadata/get"),new IpcCommand(ig,"rows/get"),new IpcCommand(ig,"pullRequest/openDetails"),new IpcCommand(ig,"row/action"),new IpcCommand(ig,"search/openInView"),new IpcCommand(ig,"search/cancel"),new IpcCommand(ig,"columns/update"),new IpcCommand(ig,"refs/update/visibility"),new IpcCommand(ig,"filters/update/excludeTypes"),new IpcCommand(ig,"configuration/update"),new IpcCommand(ig,"search/update/mode"),new IpcCommand(ig,"filters/update/includedRefs"),new IpcCommand(ig,"filters/reset"),new IpcCommand(ig,"selection/update"),new IpcRequest(ig,"jumpToHead"),new IpcRequest(ig,"chooseRef"),new IpcRequest(ig,"chooseComparison"),new IpcRequest(ig,"chooseAuthor"),new IpcRequest(ig,"chooseFile"),new IpcRequest(ig,"scope/resolve"),new IpcRequest(ig,"rows/ensure"),new IpcRequest(ig,"search/history/get"),new IpcRequest(ig,"search/history/store"),new IpcRequest(ig,"search/history/delete"),new IpcRequest(ig,"counts"),new IpcRequest(ig,"overview/get"),new IpcRequest(ig,"overview/wip/get"),new IpcRequest(ig,"overview/enrichment/get"),new IpcRequest(ig,"agentSessions/get"),new IpcRequest(ig,"wip/stats/get"),new IpcCommand(ig,"wip/watches/sync"),new IpcNotification(ig,"wip/stale/didChange"),new IpcRequest(ig,"row/hover/get"),new IpcRequest(ig,"search"),new IpcNotification(ig,"overview/didChange"),new IpcNotification(ig,"overview/wip/didChange"),new IpcNotification(ig,"agentSessions/didChange"),new IpcNotification(ig,"repositories/integration/didChange"),new IpcNotification(ig,"didChange",!0),new IpcNotification(ig,"configuration/didChange");let im=new IpcNotification(ig,"subscription/didChange");new IpcNotification(ig,"org/settings/didChange"),new IpcNotification(ig,"avatars/didChange"),new IpcNotification(ig,"mcp/didChange"),new IpcNotification(ig,"agents/canInstallClaudeHook/didChange"),new IpcNotification(ig,"branchState/didChange"),new IpcNotification(ig,"refs/didChangeMetadata"),new IpcNotification(ig,"columns/didChange"),new IpcNotification(ig,"scrollMarkers/didChange"),new IpcNotification(ig,"refs/didChangeVisibility"),new IpcNotification(ig,"rows/didChange"),new IpcNotification(ig,"rows/stats/didChange"),new IpcNotification(ig,"selection/didChange"),new IpcNotification(ig,"compareMode/didRequestOpen"),new IpcNotification(ig,"workingTree/didChange"),new IpcNotification(ig,"didSearch"),new IpcNotification(ig,"didFetch"),new IpcNotification(ig,"featurePreview/didStart");let ib=new IpcNotification("timeline","didChange");let PromosContext=class PromosContext{constructor(e){this.disposables=[],this._promos=new Map,this.ipc=e,this.disposables.push(this.ipc.onReceiveMessage(e=>{(iu.is(e)||im.is(e)||ib.is(e))&&this._promos.clear()}))}async getApplicablePromo(e,t){let i=`${e}|${t}`,r=this._promos.get(i);return null==r&&(r=this.ipc.sendRequest(tG,{plan:e,location:t}).then(e=>e.promo,()=>void 0),this._promos.set(i,r)),await r}dispose(){this.disposables.forEach(e=>e.dispose())}};let TelemetryContext=class TelemetryContext{constructor(e){this.disposables=[],this.ipc=e}sendEvent(e){this.ipc.sendCommand(tZ,e)}dispose(){this.disposables.forEach(e=>e.dispose())}};function iv(e){return(e=e.toString().toLowerCase()).includes("ms")?parseFloat(e):e.includes("s")?1e3*parseFloat(e):parseFloat(e)}function i_(e,t){return new Promise(i=>{e.addEventListener(t,function r(o){o.target===e&&(e.removeEventListener(t,r),i())})})}function iy(e,t,i){let r,o,s,a,c,h,p,u,g,m,f=0;null!=i&&({edges:h,maxWait:p,cancellation:u,aggregator:g}=i);let b="leading"===(h??="trailing")||"both"===h,v="trailing"===h||"both"===h;function _(){if(null!=r){f=Date.now();let t=r,i=m;return m=void 0,r=void 0,s=e.apply(i,t)}}function w(){null!=a&&(clearTimeout(a),a=void 0)}function x(){null!=c&&(clearTimeout(c),c=void 0)}function $(){w(),x(),m=void 0,r=void 0,o=void 0,f=0}function C(...e){if(u?.aborted)return;let i=Date.now();null!=g&&null!=r?r=g(r,e):(m=this,r=e);let h=null==a&&null==c;o=i,w();let x=Date.now();if(o=x,a=setTimeout(()=>{a=void 0,function e(){let i,r,s=Date.now();if(i=s-(o??0),r=s-f,null==o||i>=t||i<0||null!=p&&r>=p){v&&_(),$();return}a=setTimeout(()=>{a=void 0,e()},t-(s-(o??0)))}()},t),null!=p&&!c){0===f&&(f=x);let e=p-(x-f);e>0?c=setTimeout(()=>{c=void 0,v&&null!=r&&_(),f=Date.now()},e):(v&&null!=r&&_(),$())}return b&&h?_():s}return C.cancel=$,C.flush=function(){return w(),x(),_()},C.pending=function(){return null!=a||null!=c},u?.addEventListener("abort",$,{once:!0}),C}(C||(C={})).on=function(e,t,i,r){let o=!1;if("string"==typeof e){let s=function(t){let r=t?.target?.closest(e);null!=r&&i(t,r)};return document.addEventListener(t,s,r??!0),{dispose:()=>{o||(o=!0,document.removeEventListener(t,s,r??!0))}}}let s=function(e){i(e,this)};return e.addEventListener(t,s,r??!1),{dispose:()=>{o||(o=!0,e.removeEventListener(t,s,r??!1))}}};var iw=Uint8Array,ik=Uint16Array,ix=Int32Array,i$=new iw([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),iC=new iw([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),iS=new iw([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),iE=function(e,t){for(var i=new ik(31),r=0;r<31;++r)i[r]=t+=1<<e[r-1];for(var o=new ix(i[30]),r=1;r<30;++r)for(var s=i[r];s<i[r+1];++s)o[s]=s-i[r]<<5|r;return{b:i,r:o}},iA=iE(i$,2),iP=iA.b,iz=iA.r;iP[28]=258,iz[258]=28;var iR=iE(iC,0),iI=iR.b;iR.r;for(var iT=new ik(32768),iM=0;iM<32768;++iM){var ij=(43690&iM)>>1|(21845&iM)<<1;ij=(61680&(ij=(52428&ij)>>2|(13107&ij)<<2))>>4|(3855&ij)<<4,iT[iM]=((65280&ij)>>8|(255&ij)<<8)>>1}for(var iO=function(e,t,i){for(var r,o=e.length,s=0,a=new ik(t);s<o;++s)e[s]&&++a[e[s]-1];var c=new ik(t);for(s=1;s<t;++s)c[s]=c[s-1]+a[s-1]<<1;if(i){r=new ik(1<<t);var h=15-t;for(s=0;s<o;++s)if(e[s])for(var p=s<<4|e[s],u=t-e[s],g=c[e[s]-1]++<<u,m=g|(1<<u)-1;g<=m;++g)r[iT[g]>>h]=p}else for(s=0,r=new ik(o);s<o;++s)e[s]&&(r[s]=iT[c[e[s]-1]++]>>15-e[s]);return r},iD=new iw(288),iM=0;iM<144;++iM)iD[iM]=8;for(var iM=144;iM<256;++iM)iD[iM]=9;for(var iM=256;iM<280;++iM)iD[iM]=7;for(var iM=280;iM<288;++iM)iD[iM]=8;for(var iL=new iw(32),iM=0;iM<32;++iM)iL[iM]=5;var iB=iO(iD,9,1),iF=iO(iL,5,1),iN=function(e){for(var t=e[0],i=1;i<e.length;++i)e[i]>t&&(t=e[i]);return t},iq=function(e,t,i){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&i},iU=function(e,t){var i=t/8|0;return(e[i]|e[i+1]<<8|e[i+2]<<16)>>(7&t)},iW=function(e,t,i){return(null==t||t<0)&&(t=0),(null==i||i>e.length)&&(i=e.length),new iw(e.subarray(t,i))},iH=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],iV=function(e,t,i){var r=Error(t||iH[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,iV),!i)throw r;return r},iK=function(e,t,i,r){var o=e.length,s=r?r.length:0;if(!o||t.f&&!t.l)return i||new iw(0);var a=!i,c=a||2!=t.i,h=t.i;a&&(i=new iw(3*o));var p=function(e){var t=i.length;if(e>t){var r=new iw(Math.max(2*t,e));r.set(i),i=r}},u=t.f||0,g=t.p||0,m=t.b||0,f=t.l,b=t.d,v=t.m,_=t.n,w=8*o;do{if(!f){u=iq(e,g,1);var x=iq(e,g+1,3);if(g+=3,x)if(1==x)f=iB,b=iF,v=9,_=5;else if(2==x){var $=iq(e,g,31)+257,C=iq(e,g+10,15)+4,S=$+iq(e,g+5,31)+1;g+=14;for(var E=new iw(S),A=new iw(19),P=0;P<C;++P)A[iS[P]]=iq(e,g+3*P,7);g+=3*C;for(var T=iN(A),M=(1<<T)-1,j=iO(A,T,1),P=0;P<S;){var O=j[iq(e,g,M)];g+=15&O;var D=O>>4;if(D<16)E[P++]=D;else{var B=0,F=0;for(16==D?(F=3+iq(e,g,3),g+=2,B=E[P-1]):17==D?(F=3+iq(e,g,7),g+=3):18==D&&(F=11+iq(e,g,127),g+=7);F--;)E[P++]=B}}var N=E.subarray(0,$),q=E.subarray($);v=iN(N),_=iN(q),f=iO(N,v,1),b=iO(q,_,1)}else iV(1);else{var D=((g+7)/8|0)+4,U=e[D-4]|e[D-3]<<8,W=D+U;if(W>o){h&&iV(0);break}c&&p(m+U),i.set(e.subarray(D,W),m),t.b=m+=U,t.p=g=8*W,t.f=u;continue}if(g>w){h&&iV(0);break}}c&&p(m+131072);for(var V=(1<<v)-1,K=(1<<_)-1,G=g;;G=g){var B=f[iU(e,g)&V],Y=B>>4;if((g+=15&B)>w){h&&iV(0);break}if(B||iV(2),Y<256)i[m++]=Y;else if(256==Y){G=g,f=null;break}else{var X=Y-254;if(Y>264){var P=Y-257,J=i$[P];X=iq(e,g,(1<<J)-1)+iP[P],g+=J}var Q=b[iU(e,g)&K],ee=Q>>4;Q||iV(3),g+=15&Q;var q=iI[ee];if(ee>3){var J=iC[ee];q+=iU(e,g)&(1<<J)-1,g+=J}if(g>w){h&&iV(0);break}c&&p(m+131072);var et=m+X;if(m<q){var ei=s-q,er=Math.min(q,et);for(ei+m<0&&iV(3);m<er;++m)i[m]=r[ei+m]}for(;m<et;++m)i[m]=i[m-q]}}t.l=f,t.p=G,t.b=m,t.f=u,f&&(u=1,t.m=v,t.d=b,t.n=_)}while(!u)return m!=i.length&&a?iW(i,0,m):i.subarray(0,m)},iG=new iw(0),iZ="u">typeof TextDecoder&&new TextDecoder;try{iZ.decode(iG,{stream:!0})}catch{}var iY=function(e){for(var t="",i=0;;){var r=e[i++],o=(r>127)+(r>223)+(r>239);if(i+o>e.length)return{s:t,r:iW(e,i-1)};o?3==o?t+=String.fromCharCode(55296|(r=((15&r)<<18|(63&e[i++])<<12|(63&e[i++])<<6|63&e[i++])-65536)>>10,56320|1023&r):1&o?t+=String.fromCharCode((31&r)<<6|63&e[i++]):t+=String.fromCharCode((15&r)<<12|(63&e[i++])<<6|63&e[i++]):t+=String.fromCharCode(r)}};function iX(e,t){if(t){for(var i="",r=0;r<e.length;r+=16384)i+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return i}if(iZ)return iZ.decode(e);var o=iY(e),s=o.s,i=o.r;return i.length&&iV(8),s}"function"==typeof queueMicrotask&&queueMicrotask;let iJ=/\(([\s\S]*)\)/,iQ=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,i0=/\s?=.*$/;function i1(e,t){return e?.status==="fulfilled"?e.value:t}function i2(e){var t,i;let r,o,s,a,c,h,p,u,g;return t="debug",c=!1,h=!0,null!=(i=e)&&({args:r,when:o,exit:s,prefix:a,onlyExit:c=!1,timing:h=!0}=i),p="object"==typeof h?h.warnAfter:1500,u=!1!==h||"object"==typeof c&&c.after>0,g="trace"===t?t4.trace:"debug"===t?t4.debug:t4.info,(e,i,h)=>{let m,f;if("function"==typeof h.value?(m=h.value,f="value"):"function"==typeof h.get&&(m=h.get,f="get"),null==m||null==f)throw Error("Not supported");let b=null==r?function(e){if("function"!=typeof e)throw Error("Not supported");if(0===e.length)return[];let t=Function.prototype.toString.call(e),i=(t=(t=t.replace(iQ,"")||t).slice(0,t.indexOf("{"))).indexOf("("),r=t.indexOf(")");i=i>=0?i+1:0,r=r>0?r:t.indexOf("="),t=t.slice(i,r),t=`(${t})`;let o=iJ.exec(t);return null!=o?o[1].split(",").map(e=>e.trim().replace(i0,"")):[]}(m):[];h[f]=function(...e){let h;if(!t4.enabled()||null!=o&&!o.apply(this,e))return m.apply(this,e);let f=t4.enabled(t),v=ih(),_=v?.scopeId,w=is.next(),x=this!=null?function(e){let t;if("function"==typeof e){if(null==(t=e.prototype?.constructor))return e.name}else t=e.constructor;let i=t?.name??"",r=i.indexOf("_");-1!==r&&(i=i.substring(r+1));let o=t;for(;null!=o;){let t=t6.get(o);if(null!=t)return t(e,i);o=Object.getPrototypeOf(o)}return i}(this):void 0,$=x?`${ic(w,_)} ${x}.${i}`:`${ic(w,_)} ${i}`;null!=a&&($=a({id:w,instance:this,instanceName:x??"",name:i,prefix:$},...e));let C=ia(w,_,$),S=!1,E=()=>(S||(S=!0,h=function(e,t,i){if(!1===e||!t.length)return;if("function"==typeof e){let i=e(...t);if(!1===i)return;let r="";for(let[e,t]of Object.entries(i))r.length&&(r+=", "),r+=`${e}=${t4.toLoggable(t,e)}`;return r||void 0}let r="",o=-1;for(let e of t){let t=i[++o];r.length&&(r+=", "),r+=t?`${t}=${t4.toLoggable(e,t)}`:t4.toLoggable(e)}return r||void 0}(r,e,b)),h);if(!c&&f){let e=E();g.call(t4,e?`${$}(${e})`:$)}if(c||u||null!=s){let t=u?ir():void 0,i=e=>{let i=void 0!==t?` [${io(t)}ms]`:"",r=C.getExitInfo();if(c){let t=E();t4.error(e,t?`${$}(${t})`:$,r?.details?`failed${r.details}${i}`:`failed${i}`)}else t4.error(e,$,r?.details?`failed${r.details}${i}`:`failed${i}`)},r=e=>{let i,r,o,a;null!=t?(i=io(t))>p?(r=t4.warn,o=` [*${i}ms] (slow)`):(r=g,o=` [${i}ms]`):(o="",r=g);let h=C.getExitInfo();if(null!=s)if("function"==typeof s)try{a=s(e)}catch(e){a=`@log.exit error: ${e}`}else!0===s&&(a=`returned ${t4.toLoggable(e)}`);else h?.failed?(a=h.failed,r=(e,...t)=>t4.error(null,e,...t)):a="completed";if(f||r!==g){let e=E();c?(!0===c||0===c.after||i>c.after)&&r.call(t4,e?`${$}(${e}) ${a}${h?.details||""}${o}`:`${$} ${a}${h?.details||""}${o}`):r.call(t4,e?`${$}(${e}) ${a}${h?.details||""}${o}`:`${$} ${a}${h?.details||""}${o}`)}};return t9(C,()=>{var t;let o;try{o=m.apply(this,e)}catch(e){throw i(e),e}return null!=o&&null!=(t=o)&&(t instanceof Promise||"function"==typeof t?.then)?o.then(r,i).catch(()=>{}):r(o),o})}return t9(C,()=>m.apply(this,e))}}}globalThis.scheduler?.yield?.bind(globalThis.scheduler),Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(e,t,...i){let r;this._stopped=!1,this.logScope=null!=e&&"string"!=typeof e?e:id(e??"",!1,t?.scopeLabel);let o=t?.log;if(r=null==o||!0===o?{}:!1===o||o.onlyExit?void 0:o,this.logLevel=("object"==typeof o?o.level:void 0)??"debug",this.logProvider=t?.provider??t7,this._time=ir(),null!=r){if(!this.logProvider.enabled(this.logLevel))return;i.length?this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`,...i):this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return io(this._time)}log(e){this.logCore(e,!1)}restart(e){this.logCore(e,!0),this._time=ir(),this._stopped=!1}stop(e){this._stopped||(this.restart(e),this._stopped=!0)}logCore(e,t){if(!this.logProvider.enabled(this.logLevel))return;if(!t)return void this.logProvider.log(this.logLevel,this.logScope,`${e?.message??""}${e?.suffix??""}`);let i=io(this._time),r=e?.message??"";this.logProvider.log(i>250?"warn":this.logLevel,this.logScope,`${r?`${r} `:""}[${i}ms]${e?.suffix??""}`)}};(()=>{let e;var t,i,r={975:e=>{function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,r="",o=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)i=e.charCodeAt(c);else{if(47===i)break;i=47}if(47===i){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){var h=r.lastIndexOf("/");if(h!==r.length-1){-1===h?(r="",o=0):o=(r=r.slice(0,h)).length-1-r.lastIndexOf("/"),s=c,a=0;continue}}else if(2===r.length||1===r.length){r="",o=0,s=c,a=0;continue}}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(s+1,c):r=e.slice(s+1,c),o=c-s-1;s=c,a=0}else 46===i&&-1!==a?++a:a=-1}return r}var r={resolve:function(){for(var e,r,o="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?e=arguments[a]:(void 0===r&&(r=process.cwd()),e=r),t(e),0!==e.length&&(o=e+"/"+o,s=47===e.charCodeAt(0));return o=i(o,!s),s?o.length>0?"/"+o:"/":o.length>0?o:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return 0!==(e=i(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var o=arguments[i];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=r.resolve(e))===(i=r.resolve(i)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var s=e.length,a=s-o,c=1;c<i.length&&47===i.charCodeAt(c);++c);for(var h=i.length-c,p=a<h?a:h,u=-1,g=0;g<=p;++g){if(g===p){if(h>p){if(47===i.charCodeAt(c+g))return i.slice(c+g+1);if(0===g)return i.slice(c+g)}else a>p&&(47===e.charCodeAt(o+g)?u=g:0===g&&(u=0));break}var m=e.charCodeAt(o+g);if(m!==i.charCodeAt(c+g))break;47===m&&(u=g)}var f="";for(g=o+u+1;g<=s;++g)g!==s&&47!==e.charCodeAt(g)||(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(c+u):(c+=u,47===i.charCodeAt(c)&&++c,i.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),r=47===i,o=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(i=e.charCodeAt(a))){if(!s){o=a;break}}else s=!1;return -1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var r,o=0,s=-1,a=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var c=i.length-1,h=-1;for(r=e.length-1;r>=0;--r){var p=e.charCodeAt(r);if(47===p){if(!a){o=r+1;break}}else -1===h&&(a=!1,h=r+1),c>=0&&(p===i.charCodeAt(c)?-1==--c&&(s=r):(c=-1,s=h))}return o===s?s=h:-1===s&&(s=e.length),e.slice(o,s)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!a){o=r+1;break}}else -1===s&&(a=!1,s=r+1);return -1===s?"":e.slice(o,s)},extname:function(e){t(e);for(var i=-1,r=0,o=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47!==h)-1===o&&(s=!1,o=c+1),46===h?-1===i?i=c:1!==a&&(a=1):-1!==i&&(a=-1);else if(!s){r=c+1;break}}return -1===i||-1===o||0===a||1===a&&i===o-1&&i===r+1?"":e.slice(i,o)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return i;var r,o=e.charCodeAt(0),s=47===o;s?(i.root="/",r=1):r=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,g=0;u>=r;--u)if(47!==(o=e.charCodeAt(u)))-1===h&&(p=!1,h=u+1),46===o?-1===a?a=u:1!==g&&(g=1):-1!==a&&(g=-1);else if(!p){c=u+1;break}return -1===a||-1===h||0===g||1===g&&a===h-1&&a===c+1?-1!==h&&(i.base=i.name=0===c&&s?e.slice(1,h):e.slice(c,h)):(0===c&&s?(i.name=e.slice(1,a),i.base=e.slice(1,h)):(i.name=e.slice(c,a),i.base=e.slice(c,h)),i.ext=e.slice(a,h)),c>0?i.dir=e.slice(0,c-1):s&&(i.dir="/"),i},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,s),i.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(s.r(a),s.d(a,{URI:()=>l,Utils:()=>i}),"object"==typeof process)?e="win32"===process.platform:"object"==typeof navigator&&(e=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function u(e,t){if(!e.scheme&&t)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!c.test(e.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!h.test(e.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(e.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let g=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(e){return e instanceof l||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString}scheme;authority;path;query;fragment;constructor(e,t,i,r,o,s=!1){"object"==typeof e?(this.scheme=e.scheme||"",this.authority=e.authority||"",this.path=e.path||"",this.query=e.query||"",this.fragment=e.fragment||""):(this.scheme=e||s?e:"file",this.authority=t||"",this.path=function(e,t){switch(e){case"https":case"http":case"file":t?"/"!==t[0]&&(t="/"+t):t="/"}return t}(this.scheme,i||""),this.query=r||"",this.fragment=o||"",u(this,s))}get fsPath(){return _(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:i,path:r,query:o,fragment:s}=e;return void 0===t?t=this.scheme:null===t&&(t=""),void 0===i?i=this.authority:null===i&&(i=""),void 0===r?r=this.path:null===r&&(r=""),void 0===o?o=this.query:null===o&&(o=""),void 0===s?s=this.fragment:null===s&&(s=""),t===this.scheme&&i===this.authority&&r===this.path&&o===this.query&&s===this.fragment?this:new d(t,i,r,o,s)}static parse(e,t=!1){let i=g.exec(e);return i?new d(i[2]||"",$(i[4]||""),$(i[5]||""),$(i[7]||""),$(i[9]||""),t):new d("","","","","")}static file(t){let i="";if(e&&(t=t.replace(/\\/g,"/")),"/"===t[0]&&"/"===t[1]){let e=t.indexOf("/",2);-1===e?(i=t.substring(2),t="/"):(i=t.substring(2,e),t=t.substring(e)||"/")}return new d("file",i,t,"","")}static from(e){let t=new d(e.scheme,e.authority,e.path,e.query,e.fragment);return u(t,!0),t}toString(e=!1){return w(this,e)}toJSON(){return this}static revive(e){if(e){if(e instanceof l)return e;{let t=new d(e);return t._formatted=e.external,t._fsPath=e._sep===m?e.fsPath:null,t}}return e}};let m=e?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=_(this,!1)),this._fsPath}toString(e=!1){return e?w(this,!0):(this._formatted||(this._formatted=w(this,!1)),this._formatted)}toJSON(){let e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=m),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}};let f={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function b(e,t,i){let r,o=-1;for(let s=0;s<e.length;s++){let a=e.charCodeAt(s);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||t&&47===a||i&&91===a||i&&93===a||i&&58===a)-1!==o&&(r+=encodeURIComponent(e.substring(o,s)),o=-1),void 0!==r&&(r+=e.charAt(s));else{void 0===r&&(r=e.substr(0,s));let t=f[a];void 0!==t?(-1!==o&&(r+=encodeURIComponent(e.substring(o,s)),o=-1),r+=t):-1===o&&(o=s)}}return -1!==o&&(r+=encodeURIComponent(e.substring(o))),void 0!==r?r:e}function v(e){let t;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);35===r||63===r?(void 0===t&&(t=e.substr(0,i)),t+=f[r]):void 0!==t&&(t+=e[i])}return void 0!==t?t:e}function _(t,i){let r;return r=t.authority&&t.path.length>1&&"file"===t.scheme?`//${t.authority}${t.path}`:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&90>=t.path.charCodeAt(1)||t.path.charCodeAt(1)>=97&&122>=t.path.charCodeAt(1))&&58===t.path.charCodeAt(2)?i?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,e&&(r=r.replace(/\//g,"\\")),r}function w(e,t){let i=t?v:b,r="",{scheme:o,authority:s,path:a,query:c,fragment:h}=e;if(o&&(r+=o,r+=":"),(s||"file"===o)&&(r+="/",r+="/"),s){let e=s.indexOf("@");if(-1!==e){let t=s.substr(0,e);s=s.substr(e+1),-1===(e=t.lastIndexOf(":"))?r+=i(t,!1,!1):(r+=i(t.substr(0,e),!1,!1),r+=":",r+=i(t.substr(e+1),!1,!0)),r+="@"}-1===(e=(s=s.toLowerCase()).lastIndexOf(":"))?r+=i(s,!1,!0):(r+=i(s.substr(0,e),!1,!0),r+=s.substr(e))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let e=a.charCodeAt(1);e>=65&&e<=90&&(a=`/${String.fromCharCode(e+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let e=a.charCodeAt(0);e>=65&&e<=90&&(a=`${String.fromCharCode(e+32)}:${a.substr(2)}`)}r+=i(a,!0,!1)}return c&&(r+="?",r+=i(c,!1,!1)),h&&(r+="#",r+=t?h:b(h,!1,!1)),r}let x=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function $(e){return e.match(x)?e.replace(x,e=>(function e(t){try{return decodeURIComponent(t)}catch{return t.length>3?t.substr(0,3)+e(t.substr(3)):t}})(e)):e}var C=s(975);let E=C.posix||C;(t=i||(i={})).joinPath=function(e,...t){return e.with({path:E.join(e.path,...t)})},t.resolvePath=function(e,...t){let i=e.path,r=!1;"/"!==i[0]&&(i="/"+i,r=!0);let o=E.resolve(i,...t);return r&&"/"===o[0]&&!e.authority&&(o=o.substring(1)),e.with({path:o})},t.dirname=function(e){if(0===e.path.length||"/"===e.path)return e;let t=E.dirname(e.path);return 1===t.length&&46===t.charCodeAt(0)&&(t=""),e.with({path:t})},t.basename=function(e){return E.basename(e.path)},t.extname=function(e){return E.extname(e.path)},S=a})();let{URI:i5,Utils:i3}=S;function i4(e,t){return JSON.parse(e,(e,i)=>(function(e,t){let i=function(e){if("object"!=typeof e||null==e)return;let t=e.__ipc;if(null!=t)switch(t){case"date":return"number"==typeof e.value?e:void 0;case"promise":return"object"==typeof e.value&&"string"==typeof e.value.id&&"string"==typeof e.value.method?e:void 0;case"uri":return"object"==typeof e.value&&"string"==typeof e.value?.scheme?e:void 0;default:return}}(e);if(null==i)return e;switch(i.__ipc){case"date":return new Date(i.value);case"promise":return t(i.value);case"uri":return i5.revive(i.value)}})(i,t))}let i6="__supertalk_rpc__";function i7(e){return"object"==typeof e&&null!==e&&i6 in e&&!0===e[i6]}let i8=new TextEncoder,i9=new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._noop=function(){}}get event(){return this._event??=(e,t,i)=>{this.listeners??=new LinkedList;let r=this.listeners.push(null==t?e:[e,t]),o={dispose:()=>{o.dispose=Emitter._noop,this._disposed||r()}};return Array.isArray(i)&&i.push(o),o},this._event}fire(e){if(null!=this.listeners){this._deliveryQueue??=new LinkedList;for(let t=this.listeners.iterator(),i=t.next();!i.done;i=t.next())this._deliveryQueue.push([i.value,e]);for(;this._deliveryQueue.size>0;){let[e,t]=this._deliveryQueue.shift();try{"function"==typeof e?e(t):e[0].call(e[1],t)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let re={done:!0,value:void 0};let events_Node=class events_Node{static{this.Undefined=new events_Node(void 0)}constructor(e){this.element=e,this.next=events_Node.Undefined,this.prev=events_Node.Undefined}};let LinkedList=class LinkedList{constructor(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===events_Node.Undefined}clear(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}unshift(e){return this._insert(e,!1)}push(e){return this._insert(e,!0)}_insert(e,t){let i=new events_Node(e);if(this._first===events_Node.Undefined)this._first=i,this._last=i;else if(t){let e=this._last;this._last=i,i.prev=e,e.next=i}else{let e=this._first;this._first=i,i.next=e,e.prev=i}this._size+=1;let r=!1;return()=>{r||(r=!0,this._remove(i))}}shift(){if(this._first===events_Node.Undefined)return;let e=this._first.element;return this._remove(this._first),e}pop(){if(this._last===events_Node.Undefined)return;let e=this._last.element;return this._remove(this._last),e}_remove(e){if(e.prev!==events_Node.Undefined&&e.next!==events_Node.Undefined){let t=e.prev;t.next=e.next,e.next.prev=t}else e.prev===events_Node.Undefined&&e.next===events_Node.Undefined?(this._first=events_Node.Undefined,this._last=events_Node.Undefined):e.next===events_Node.Undefined?(this._last=this._last.prev,this._last.next=events_Node.Undefined):e.prev===events_Node.Undefined&&(this._first=this._first.next,this._first.prev=events_Node.Undefined);this._size-=1}iterator(){let e,t=this._first;return{next:function(){return t===events_Node.Undefined?re:(null==e?e={done:!1,value:t.element}:e.value=t.element,t=t.next,e)}}}toArray(){let e=[];for(let t=this._first;t!==events_Node.Undefined;t=t.next)e.push(t.element);return e}};var rt=Object.defineProperty,ri=Object.getOwnPropertyDescriptor,rr=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),ro=e=>{throw TypeError(e)},rs=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ri(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&rt(t,i,s),s};function rn(){return c??=null!=h?h():acquireVsCodeApi()}let ra=ii();function rl(){return`webview:${ra.next()}`}let rc=`wv-${Math.random().toString(36).slice(2,10)}`,rh=Date.now(),rd=class{constructor(e){this.appName=e,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=rn(),this._disposable=C.on(window,"message",e=>this.onMessageReceived(e))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(e){var t,i,r,o,s,c,h,p,u=[];try{if(i7(e.data))return;let o=e.data,s=((e,t,i)=>{if(null!=t){var r,o;"object"!=typeof t&&"function"!=typeof t&&ro("Object expected"),i&&(r=t[rr("asyncDispose")]),void 0===r&&(r=t[rr("dispose")],i&&(o=r)),"function"!=typeof r&&ro("Object not disposable"),o&&(r=function(){try{o.call(this)}catch(e){return Promise.reject(e)}}),e.push([i,r,t])}else i&&e.push([i]);return t})(u,function(e,t,i){var r,o;let s,c,h;if(!t4.enabled())return;let p=(r=i?.scope??!0,o=i?.scopeLabel,c=ie(),a=(h=id(e,r,o)).scopeId,t8.set(h.scopeId,h),h[Symbol.dispose]=()=>{let e;e=h?.scopeId??a,null!=e&&t8.delete(e),a=c?.scopeId},h);if(!t)return p;let u="debug",g=!1;"object"==typeof t&&(u=t.level??u,s=t.message,g=!0===t.onlyExit);let m=ir();g||ip(p,u,s??"");let f=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let e=io(m),t=` [${e}ms]`,i=p.getExitInfo(),r=i.failed??"completed";null!=i.failed?t4.error(null,p,`${r}${i.details??""}${t}`):ip(p,u,`${r}${i.details??""}${t}`),f()},p}(`(e=${o.id}|${o.method})`,void 0,{scope:ih()})),c=function(e,t,...i){let r=("object"==typeof t?.log?t.log.level:void 0)??"info";return(t?.provider??t7).enabled(r)?new Stopwatch(e,t,...i):void 0}(s,{log:{onlyExit:!0,level:"debug"}});if(o.compressed&&o.params instanceof Uint8Array){if("deflate"===o.compressed)try{o.params=iX((r=o.params,iK(r,{i:2},void 0,void 0)))}catch(e){o.params=iX(o.params)}else o.params=iX(o.params);c?.restart({message:`\u2022 decompressed (${o.compressed}) serialized params`})}if("string"==typeof o.params?(o.params=i4(o.params,e=>this.getResponsePromise(e.method,e.id)),c?.stop({message:"• deserialized params"})):null==o.params?c?.stop({message:"• no params"}):c?.stop({message:"• invalid params"}),s?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-o.timestamp}ms`),null!=o.completionId){let e=(t=o.method,i=o.completionId,`${t}|${i}`);this._pendingHandlers.get(e)?.(o);return}this._onReceiveMessage.fire(o)}catch(e){var g=e,m=!0}finally{o=g,s=m,c="function"==typeof SuppressedError?SuppressedError:function(e,t,i,r){return(r=Error(i)).name="SuppressedError",r.error=e,r.suppressed=t,r},h=e=>o=s?new c(e,o,"An error was suppressed during disposal"):(s=!0,e),(p=e=>{for(;e=u.pop();)try{var t=e[1]&&e[1].call(e[2]);if(e[0])return Promise.resolve(t).then(p,e=>(h(e),p()))}catch(e){h(e)}if(s)throw o})()}}deserializeIpcData(e){return i4(e,e=>this.getResponsePromise(e.method,e.id))}sendCommand(e,t){let i=rl();this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now()})}async sendRequest(e,t){let i=rl(),r=this.getResponsePromise(e.response.method,i);return this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now(),completionId:i}),r}getResponsePromise(e,t){return new Promise((i,r)=>{var o,s;let a,c=(o=e,s=t,`${o}|${s}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),r(Error(`Timed out waiting for completion of ${c}`))},(t4.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,e=>{if(h.call(this),e.method===tY.method){let t=e.params;"rejected"===t.status?queueMicrotask(()=>r(Error(t.reason))):queueMicrotask(()=>i(t.value))}else queueMicrotask(()=>i(e.params))})})}setPersistedState(e){this._api.setState(e)}updatePersistedState(e){let t=this._api.getState();null!=t&&"object"==typeof t?(t={...t,...e},this._api.setState(t)):t=e,this.setPersistedState(t)}postMessage(e){this._api.postMessage(e)}};function rp(e,t){let i=Math.pow(10,t);return Math.round(e*i)/i}rs([i2({args:e=>({e:`${e.data.id}|${e.data.method}`})})],rd.prototype,"onMessageReceived",1),rs([i2({args:e=>({commandType:e.method})})],rd.prototype,"sendCommand",1),rs([i2({args:e=>({requestType:e.method})})],rd.prototype,"sendRequest",1),rs([i2({args:e=>({e:`${e.id}, method=${e.method}`})})],rd.prototype,"postMessage",1),rd=rs([(v=e=>`${e.appName}(HostIpc)`,e=>void t6.set(e,v))],rd);let RGBA=class RGBA{constructor(e,t,i,r=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,i)),this.a=rp(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}};let HSLA=class HSLA{constructor(e,t,i,r){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rp(Math.max(Math.min(1,t),0),3),this.l=rp(Math.max(Math.min(1,i),0),3),this.a=rp(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,r=e.b/255,o=e.a,s=Math.max(t,i,r),a=Math.min(t,i,r),c=0,h=0,p=(a+s)/2,u=s-a;if(u>0){switch(h=Math.min(p<=.5?u/(2*p):u/(2-2*p),1),s){case t:c=(i-r)/u+6*(i<r);break;case i:c=(r-t)/u+2;break;case r:c=(t-i)/u+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,o)}static _hue2rgb(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}static toRGBA(e){let t,i,r,o=e.h/360,{s,l:a,a:c}=e;if(0===s)t=i=r=a;else{let e=a<.5?a*(1+s):a+s-a*s,c=2*a-e;t=HSLA._hue2rgb(c,e,o+1/3),i=HSLA._hue2rgb(c,e,o),r=HSLA._hue2rgb(c,e,o-1/3)}return new RGBA(Math.round(255*t),Math.round(255*i),Math.round(255*r),c)}};let HSVA=class HSVA{constructor(e,t,i,r){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rp(Math.max(Math.min(1,t),0),3),this.v=rp(Math.max(Math.min(1,i),0),3),this.a=rp(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,r=e.b/255,o=Math.max(t,i,r),s=o-Math.min(t,i,r);return new HSVA(Math.round(60*(0===s?0:o===t?((i-r)/s%6+6)%6:o===i?(r-t)/s+2:(t-i)/s+4)),0===o?0:s/o,o,e.a)}static toRGBA(e){let{h:t,s:i,v:r,a:o}=e,s=r*i,a=s*(1-Math.abs(t/60%2-1)),c=r-s,[h,p,u]=[0,0,0];return t<60?(h=s,p=a):t<120?(h=a,p=s):t<180?(p=s,u=a):t<240?(p=a,u=s):t<300?(h=a,u=s):t<=360&&(h=s,u=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),u=Math.round((u+c)*255),o)}};function ru(e,t){return t.getPropertyValue(e).trim()}let Color=class Color{static from(e){return e instanceof Color?e:parseColor(e)||Color.red}static fromCssVariable(e,t){return parseColor(ru(e,t))||Color.red}static fromHex(e){return parseHexColor(e)||Color.red}static equals(e,t){return!e&&!t||!!e&&!!t&&e.equals(t)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(e){if(e)if(e instanceof RGBA)this.rgba=e;else if(e instanceof HSLA)this._hsla=e,this.rgba=HSLA.toRGBA(e);else if(e instanceof HSVA)this._hsva=e,this.rgba=HSVA.toRGBA(e);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(e){return null!=e&&!!e&&RGBA.equals(this.rgba,e.rgba)&&HSLA.equals(this.hsla,e.hsla)&&HSVA.equals(this.hsva,e.hsva)}getRelativeLuminance(){return rp(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){let t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}luminance(e){return luminance(this,e)}getContrastRatio(e){let t=this.getRelativeLuminance(),i=e.getRelativeLuminance();return t>i?(t+.05)/(i+.05):(i+.05)/(t+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){let{r:t,g:i,b:r,a:o}=this.rgba;return new Color(new RGBA(t,i,r,o*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(e){let t=e.rgba,i=this.rgba.a,r=t.a,o=i+r*(1-i);return o<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*i/o+t.r*r*(1-i)/o,this.rgba.g*i/o+t.g*r*(1-i)/o,this.rgba.b*i/o+t.b*r*(1-i)/o,o))}mix(e,t){return mixColors(this,e,t)}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;let{r:t,g:i,b:r,a:o}=this.rgba;return new Color(new RGBA(e.rgba.r-o*(e.rgba.r-t),e.rgba.g-o*(e.rgba.g-i),e.rgba.b-o*(e.rgba.b-r),1))}flatten(...e){let t=e.reduceRight((e,t)=>Color._flatten(t,e));return Color._flatten(this,t)}static _flatten(e,t){let i=1-e.rgba.a;return new Color(new RGBA(i*t.rgba.r+e.rgba.a*e.rgba.r,i*t.rgba.g+e.rgba.a*e.rgba.g,i*t.rgba.b+e.rgba.a*e.rgba.b))}toString(){return this._toString||(this._toString=function(e){return e.isOpaque()?`#${rg(e.rgba.r)}${rg(e.rgba.g)}${rg(e.rgba.b)}`:`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${Number(e.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(e,t,i){if(e.isLighterThan(t))return e;i=i||.5;let r=e.getRelativeLuminance(),o=t.getRelativeLuminance();return i=i*(o-r)/o,e.lighten(i)}static getDarkerColor(e,t,i){if(e.isDarkerThan(t))return e;i=i||.5;let r=e.getRelativeLuminance(),o=t.getRelativeLuminance();return i=i*(r-o)/r,e.darken(i)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function rg(e){let t=e.toString(16);return 2!==t.length?`0${t}`:t}let rm=new Emitter,rf=rm.event;function rb(e){let t=document.documentElement,i=window.getComputedStyle(t),r=document.body.classList,o=r.contains("vscode-light")||r.contains("vscode-high-contrast-light"),s=r.contains("vscode-high-contrast")||r.contains("vscode-high-contrast-light"),a=ru("--vscode-editor-background",i),c=ru("--vscode-editor-foreground",i);return c||(c=ru("--vscode-foreground",i)),{colors:{background:a,foreground:c},computedStyle:i,isLightTheme:o,isHighContrastTheme:s,isInitializing:null==e}}var rv=Object.defineProperty,r_=Object.getOwnPropertyDescriptor,ry=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?r_(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&rv(t,i,s),s};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(e){let t=JSON.parse(tW.decode(function(e){let t=globalThis.atob(e),i=t.length,r=new Uint8Array(i),o=0,s=i-i%8;for(;o<s;o+=8)r[o]=t.charCodeAt(o),r[o+1]=t.charCodeAt(o+1),r[o+2]=t.charCodeAt(o+2),r[o+3]=t.charCodeAt(o+3),r[o+4]=t.charCodeAt(o+4),r[o+5]=t.charCodeAt(o+5),r[o+6]=t.charCodeAt(o+6),r[o+7]=t.charCodeAt(o+7);for(;o<i;o++)r[o]=t.charCodeAt(o);return r}(e))),i=t.webviewId,r=t.webviewInstanceId;this._webview={webviewId:i,webviewInstanceId:r,createCommandLink:(e,t)=>{var o;return e.endsWith(":")&&(e=`${e}${i.split(".").at(-1)}`),o=e,`command:${o}?${encodeURIComponent(JSON.stringify({webview:i,webviewInstance:r,...t}))}`}}}connectedCallback(){let e,t,i,r;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new rd(this.name);let o=rb();if(null!=this.onThemeUpdated){let e;this.onThemeUpdated(o),this.disposables.push(((e=new MutationObserver(e=>{rm.fire(rb(e))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>e.disconnect()})),this.disposables.push(rf(this.onThemeUpdated,this))}this.disposables.push(this._ipc.onReceiveMessage(e=>{switch(!0){case tX.is(e):this.onWebviewFocusChanged?.(e.params.focused),window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case tJ.is(e):this.onWebviewVisibilityChanged?.(e.params.visible),window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(i=0,r=iy(e=>{let t=`webview:${++i}`;rn().postMessage({id:t,scope:tK.scope,method:tK.method,params:e,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:i=>{let o=i.composedPath().some(e=>"INPUT"===e.tagName);(!0!==e||t!==o)&&(e=!0,t=o,r({focused:!0,inputFocused:o}))},onFocusOut:i=>{(!1!==e||!1!==t)&&(e=!1,t=!1,r({focused:!1,inputFocused:!1}))}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(e=>e.dispose())}render(){return eC`<slot></slot>`}};ry([eB({type:String})],GlWebviewApp.prototype,"name",2),ry([eB({type:String})],GlWebviewApp.prototype,"placement",2),ry([e0({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),ry([e0({context:"logger"})],GlWebviewApp.prototype,"_logger",2),ry([e0({context:"promos"})],GlWebviewApp.prototype,"_promos",2),ry([e0({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),ry([e0({context:"webview"})],GlWebviewApp.prototype,"_webview",2);let rw=tk(GlWebviewApp);let SignalWatcherWebviewApp=class SignalWatcherWebviewApp extends rw{connectedCallback(){super.connectedCallback?.(),this._ipc.sendRequest(tV,{bootstrap:!1,clientId:rc,clientLoadedAt:rh})}};let VsCodeStorage=class VsCodeStorage{constructor(){this._api=rn()}get(){return this._api.getState()}set(e){this._api.setState(e)}};function rk(){return{storage:new VsCodeStorage,createEndpoint:()=>{let e,t;return e=rn(),t=new Map,{postMessage:function(t,i){let r={[i6]:!0,payload:i8.encode(JSON.stringify(t))};e.postMessage(r)},addEventListener:function(e,i){if("message"!==e)return;let r=e=>{let t=e.data;if(!i7(t))return;let{payload:r}=t;i(new MessageEvent("message",{data:r instanceof Uint8Array||r instanceof ArrayBuffer?JSON.parse(i9.decode(r)):r,origin:e.origin,lastEventId:e.lastEventId,source:e.source,ports:[...e.ports]}))};t.set(i,r),window.addEventListener("message",r)},removeEventListener:function(e,i){if("message"!==e)return;let r=t.get(i);r&&(window.removeEventListener("message",r),t.delete(i))},dispose:function(){for(let e of t.values())window.removeEventListener("message",e);t.clear()}}}}}function rx(e){return null!=e&&"object"==typeof e&&(e instanceof Error||"string"==typeof e.name&&"string"==typeof e.message)}function r$(e){return e.stack??`${e.name}: ${e.message}`}let rC="__st__",rS=Symbol(),rE=Symbol(),rA=()=>{},rP=Symbol(),rz=Symbol();function rR(e){if(e instanceof Error){let t={name:e.name,message:e.message};return void 0!==e.stack&&(t.stack=e.stack),t}return{name:"Error",message:String(e)}}function rI(e){let t=Error(e.message);return t.name=e.name,t.stack=e.stack,t}Symbol(),new WeakMap;let NonCloneableError=class NonCloneableError extends Error{valueType;path;constructor(e,t){super(`The nested ${e} at "${t}" cannot be cloned. Use nestedProxies: true.`),this.valueType=e,this.path=t,this.name="NonCloneableError"}};let Connection=class Connection{#s;#n;#a;#l;#c;#h=new Map;#d=0;#p=1;#u=!1;#g=new Map;#m=new WeakMap;#f=new Map;#b=new WeakMap;#v;#_=0;#y=new Map;#w=new Map;#k;#x=[];#$=!1;constructor(e,t={}){for(let i of(this.#s=e,this.#n=t.nestedProxies??!1,this.#a=t.debug??!1,this.#l=t.logger,this.#c=t.handlers??[],this.#k=t.batching??!1,this.#c))this.#h.set(i.wireType,i),"function"==typeof i.connect&&i.connect({sendMessage:e=>{this.#C(i.wireType,e)}});this.#v=new FinalizationRegistry(({id:e,session:t})=>{t===this.#_&&(this.#f.delete(e),this.#S({type:"release",id:e}))}),e.addEventListener("message",this.#E)}#S(e,t){if(!this.#u){if(!this.#k)return void this.#s.postMessage(e,t);this.#x.push({message:e,transfers:t}),this.#$||(this.#$=!0,queueMicrotask(()=>this.#A()))}}#A(){this.#$=!1;let e=this.#x;if(this.#x=[],0===e.length)return;let t=t=>{let i=t instanceof Error?t:Error(String(t));for(let{message:t}of e)if("call"===t.type&&void 0!==t.id){let e=this.#y.get(t.id);e&&(this.#y.delete(t.id),e.reject(i))}};if(1===e.length){let{message:i,transfers:r}=e[0];try{this.#s.postMessage(i,r)}catch(e){t(e)}}else{let i=[],r=[];for(let{message:t,transfers:o}of e)r.push(t),o&&i.push(...o);try{this.#s.postMessage({type:"batch",messages:r},i.length>0?i:void 0)}catch(e){t(e)}}}#C(e,t){let i=[];this.#S({type:"handler",wireType:e,payload:this.#P(t,"",i)},i)}#z(){let e=this.#d;return this.#d+=this.#p,e}expose(e){this.#p=2,this.#R(e),this.#S({type:"return",id:0,value:this.#I(e)})}#T(e){this.#x=[],this.#$=!1;let t=Error(e);for(let{reject:e}of this.#y.values())e(t);for(let{reject:e}of(this.#y.clear(),this.#w.values()))e(t);this.#w.clear()}close(){for(let e of(this.#u=!0,this.#T("Connection closed"),this.#s.removeEventListener("message",this.#E),this.#c))e.disconnect?.()}reset(e){for(let e of(this.#T("Connection reset"),this.#g.clear(),this.#m=new WeakMap,this.#f.clear(),this.#b=new WeakMap,this.#_++,this.#d=0,this.#p=1,this.#c))e.disconnect?.();for(let t of(void 0!==e&&e!==this.#s?(this.#u||this.#s.removeEventListener("message",this.#E),this.#s=e,e.addEventListener("message",this.#E)):this.#u&&this.#s.addEventListener("message",this.#E),this.#u=!1,this.#c))"function"==typeof t.connect&&t.connect({sendMessage:e=>{this.#C(t.wireType,e)}})}#M(e){if(e!==this.#_)throw Error("Stale proxy from previous session")}waitForReady(){return this.#d=1,this.#p=2,new Promise((e,t)=>{this.#y.set(0,{resolve:e,reject:t})})}#R(e){let t=this.#m.get(e);return void 0!==t||(t=this.#z(),this.#g.set(t,e),this.#m.set(e,t)),t}#j(e){return this.#g.get(e)}#O(e){return this.#f.get(e)?.deref()}#D(e){return this.#b.get(e)}#P(e,t,i){return"object"==typeof e?.[rP]?{[rC]:"property",...e[rP]}:this.#L(e,t,i,new Map)}#I(e,t=!1){return{[rC]:"proxy",id:this.#D(e)??this.#R(e),o:t}}#L(e,t,i,r,o){if(null==e||"object"!=typeof e&&"function"!=typeof e)return e;let s=r.get(e);if(void 0!==s)return s;if(e?.[rE]===!0){if(t&&this.#a&&!this.#n)throw new NonCloneableError("transfer",t);return i.includes(e.value)||i.push(e.value),r.set(e,e.value),e.value}if(e?.[rS]!==void 0){if(t&&this.#a&&!this.#n)throw new NonCloneableError("proxy",t);let i=this.#I(e[rS],e?.[rz]==="handle");return r.set(e,i),i}if("function"==typeof e){if(t&&this.#a&&!this.#n)throw new NonCloneableError("function",t);let i=this.#I(e);return r.set(e,i),i}if(void 0!==this.#D(e)){let t=this.#I(e,"__o"in e);return r.set(e,t),t}if("function"==typeof e?.then){if(t&&this.#a&&!this.#n)throw new NonCloneableError("promise",t);let i={[rC]:"promise",id:this.#B(e)};return r.set(e,i),i}if(this.#c.length>0){for(let s of this.#c)if(s.canHandle(e)){let a={toWire:(e,s)=>{let a=s?t?`${t}.${s}`:s:t;return this.#L(e,a,i,r,o)},...void 0!==o&&{callId:o}},c=s.toWire(e,a);return r.set(e,c),c}}if(!(this.#n||this.#a))return e;if(Array.isArray(e)){let s=[];r.set(e,s);for(let a=0;a<e.length;a++)s.push(this.#L(e[a],`${t}[${String(a)}]`,i,r,o));return s}let a=Object.getPrototypeOf(e);if(a===Object.prototype||null===a){let s={};for(let a of(r.set(e,s),Object.keys(e)))s[a]=this.#L(e[a],t?`${t}.${a}`:a,i,r,o);return s}return e}#F(e){return{fromWire:t=>this.#N(t,e)}}#q(e){let t=e?.[rC];if("property"===t){let t=this.#j(e.targetProxyId);if(!t)throw ReferenceError(`Proxy property target ${String(e.targetProxyId)} not found`);return t[e.property]}if("thrown"===t)throw rI(e.error);return this.#N(e,new Map)}#N(e,t){if(null===e||"object"!=typeof e)return e;let i=t.get(e);if(void 0!==i)return i;if(e?.[rC]==="proxy"){let i=this.#j(e.id);if(i){let r=e.o?{[rS]:i,[rz]:"handle",__nc:rA}:new Proxy(rA,{get:(e,t)=>{var r,o,s;let a;return t===rS?i:t===rz?"proxy":"then"!==t?(r=i,o=t,s=i[t],(a=(...e)=>{if("function"==typeof s)return Promise.resolve(s.apply(r,e));throw TypeError(`${String(o)} is not a function`)}).then=(e,t)=>Promise.resolve(s).then(e,t),a):void 0},set:(e,t,r)=>(i[t]=r,!0),apply(e,t,r){if("function"==typeof i)return Promise.resolve(i(...r));throw TypeError("Proxy target is not callable")}});return t.set(e,r),r}let r=this.#O(e.id)??this.#U(e.id,e.o);return t.set(e,r),r}if(e?.[rC]==="promise"){let{promise:i,resolve:r,reject:o}=Promise.withResolvers();return this.#w.set(e.id,{resolve:r,reject:o}),t.set(e,i),i}let r=e[rC];if("string"==typeof r){let i=this.#h.get(r);if(i?.fromWire){let r=i.fromWire(e,this.#F(t));return t.set(e,r),r}}if(!this.#n)return e;if(Array.isArray(e)){let i=[];for(let r of(t.set(e,i),e))i.push(this.#N(r,t));return i}if(Object.getPrototypeOf(e)!==Object.prototype)return e;let o={};for(let i of(t.set(e,o),Object.keys(e)))o[i]=this.#N(e[i],t);return o}#B(e){let t=this.#z();return e.then(e=>{try{let i=[],r=this.#P(e,"",i);this.#S({type:"resolve",id:t,value:r},i)}catch{this.#S({type:"reject",id:t,error:rR(Error("Failed to serialize resolved promise value"))})}},e=>{try{this.#S({type:"reject",id:t,error:rR(e)})}catch{}}),t}#U(e,t){let i=this.#O(e);if(void 0===i){let r=this.#_;i=t?{__o:rA}:new Proxy(rA,{apply:(t,i,o)=>(this.#M(r),this.#W(e,void 0,o)),get:(t,i)=>"string"==typeof i&&"then"!==i?this.#H(e,i,r):void 0,set:(t,i,o)=>{if("string"!=typeof i)return!1;this.#M(r);let s=[];return this.#V(this.#z(),e,"set",i,[this.#P(o,"",s)],s).catch(()=>{}),!0}}),this.#f.set(e,new WeakRef(i)),this.#b.set(i,e),this.#v.register(i,{id:e,session:this.#_})}return i}#H(e,t,i){let r=(...r)=>(this.#M(i),this.#W(e,t,r));return r.then=(r,o)=>(this.#M(i),this.#V(this.#z(),e,"get",t,[],[]).then(r,o)),r[rP]={targetProxyId:e,property:t},r}#V(e,t,i,r,o,s){let{promise:a,resolve:c,reject:h}=Promise.withResolvers();this.#y.set(e,{resolve:c,reject:h});try{this.#S({type:"call",id:e,target:t,action:i,method:r,args:o},s)}catch(t){this.#y.delete(e),h(t instanceof Error?t:Error(String(t)))}return a}#W(e,t,i){let r=[],o=new Map,s=this.#z();return this.#V(s,e,"call",t,i.map(e=>this.#L(e,"",r,o,s)),r)}#E=e=>{let t=e.data;if(null!=t)if("batch"===t.type)for(let e of t.messages)this.#K(e);else this.#K(t)};#K(e){switch(e.type){case"release":{let t=this.#g.get(e.id);void 0!==t&&(this.#g.delete(e.id),this.#m.delete(t));break}case"resolve":this.#G(this.#w,e.id,e.value);break;case"reject":this.#Z(this.#w,e.id,e.error);break;case"return":this.#G(this.#y,e.id,e.value),this.#Y(e.id);break;case"throw":this.#Z(this.#y,e.id,e.error),this.#Y(e.id);break;case"call":this.#X(e);break;case"handler":this.#J(e.wireType,e.payload)}}#G(e,t,i){let r=e.get(t);if(r){e.delete(t);try{r.resolve(this.#q(i))}catch(e){r.reject(e instanceof Error?e:Error(String(e)))}}}#Z(e,t,i){let r=e.get(t);r&&(e.delete(t),r.reject(rI(i)))}#Y(e){for(let t of this.#c)t.onCallSettle?.(e)}#J(e,t){try{let i=this.#h.get(e);if(i?.onMessage){let e=new Map;i.onMessage(this.#N(t,e),this.#F(e))}}catch(t){this.#l?.error?.(`Error in handler.onMessage for wireType "${e}":`,t)}}async #X(e){let{id:t,target:i,method:r,args:o,action:s}=e,a=new Map,c=o.map(e=>this.#N(e,a)),h=this.#j(i);if(!h)return this.#S({type:"throw",id:t,error:{name:"ReferenceError",message:`Proxy target ${String(i)} not found`}});let p=this.#l,u=p?.debug?performance.now():0;try{let e;if("get"===s){if(void 0===r)throw TypeError("Property name required for get action");e=h[r]}else if("set"===s){if(void 0===r)throw TypeError("Property name required for set action");h[r]=c[0],e=void 0}else if(void 0===r){if("function"!=typeof h)throw TypeError("Target is not callable");e=await h(...c)}else{let t=h[r];if("function"!=typeof t)throw TypeError(`${r} is not a function`);e=await t.apply(h,c)}let i=[],o=this.#P(e,"",i);this.#S({type:"return",id:t,value:o},i),p?.debug?.(`${s} ${r??"(direct)"} completed`,{duration:performance.now()-u})}catch(e){p?.debug?.(`${s} ${r??"(direct)"} failed`,{duration:performance.now()-u,error:e}),this.#S({type:"throw",id:t,error:rR(e)})}}};let RemoteSignal=class RemoteSignal{#Q;#ee;#et;constructor(e,t,i){this.#ee=e,this.#et=i,this.#Q=new $.State(t,{[$.subtle.watched]:()=>{this.#et?.(this.#ee,!0)},[$.subtle.unwatched]:()=>{this.#et?.(this.#ee,!1)}})}get(){return this.#Q.get()}set(e){throw Error("RemoteSignal is read-only. The signal can only be modified on the sender side.")}get signalId(){return this.#ee}_update(e){this.#Q.set(e)}};let rT="signal";let SignalHandler=class SignalHandler{wireType=rT;#ei;#er;#eo=0;#es=1;#en=new Map;#ea=new WeakMap;#el;#$=!1;#ec=new Map;#eh=new Map;#ed=new Map;#ep=new Map;#v=new FinalizationRegistry(({signalId:e,session:t})=>{t===this.#eo&&(this.#ed.delete(e),this.#er?.sendMessage({type:"signal:release",signalId:e}))});constructor(e={}){this.#ei=e.autoWatch??!1}connect(e){this.#er=e}onMessage(e){(null!==e&&"object"==typeof e&&"type"in e?"signal:batch"!==e.type:1)?(null!==e&&"object"==typeof e&&"type"in e?"signal:release"!==e.type:1)?(null!==e&&"object"==typeof e&&"type"in e?"signal:watch"!==e.type:1)?null!==e&&"object"==typeof e&&"type"in e&&"signal:unwatch"===e.type&&this.#eu(e.signalId):this.#eg(e.signalId):this.releaseSignal(e.signalId):this.#em(e)}disconnect(){this.#er=void 0,this.#$=!1,void 0!==this.#el&&(this.#el.unwatch(...this.#ec.values()),this.#el=void 0),this.#en.clear(),this.#ec.clear(),this.#eh.clear(),this.#ed.clear(),this.#ep.clear(),this.#eo++,this.#ea=new WeakMap,this.#es=1}canHandle(e){return e instanceof $.State||e instanceof $.Computed}toWire(e,t){return this.#ef(e,t)}fromWire(e,t){return this.#eb(e,t)}#ef(e,t){let i=this.#ea.get(e);return void 0===i&&(i=this.#es++,this.#en.set(i,e),this.#ea.set(e,i),this.#ei&&this.#eg(i)),{[rC]:rT,signalId:i,value:t.toWire(e.get())}}#eb(e,t){let i=t.fromWire(e.value),r=this.#ed.get(e.signalId),o=r?.deref();if(void 0!==o)return o._update(i),o;let s=this.#ep.get(e.signalId);this.#ep.delete(e.signalId);let a=new RemoteSignal(e.signalId,void 0!==s?s:i,this.#ev);return this.#ed.set(e.signalId,new WeakRef(a)),this.#v.register(a,{signalId:e.signalId,session:this.#eo}),a}#ev=(e,t)=>{void 0!==this.#er&&(t?this.#er.sendMessage({type:"signal:watch",signalId:e}):this.#er.sendMessage({type:"signal:unwatch",signalId:e}))};#eg(e){if(this.#ec.has(e))return;let t=this.#en.get(e);if(void 0===t)return;let i=this.#e_(),r=new $.Computed(()=>t.get());this.#ec.set(e,r),this.#eh.set(r,e),i.watch(r);let o=r.get();this.#er?.sendMessage({type:"signal:batch",updates:[{signalId:e,value:o}]})}#eu(e){let t=this.#ec.get(e);void 0!==t&&(this.#el?.unwatch(t),this.#ec.delete(e),this.#eh.delete(t))}#e_(){return this.#el??=new $.subtle.Watcher(()=>{this.#$||(this.#$=!0,queueMicrotask(this.#A))})}#A=()=>{if(this.#$=!1,void 0===this.#el||void 0===this.#er)return;let e=this.#el.getPending(),t=[];for(let i of e){let e=this.#eh.get(i);if(void 0!==e&&this.#en.has(e)){let r=i.get();t.push({signalId:e,value:r})}}this.#el.watch(),t.length>0&&this.#er.sendMessage({type:"signal:batch",updates:t})};#em(e){for(let t of e.updates){let e=this.#ed.get(t.signalId),i=e?.deref();void 0!==i?i._update(t.value):this.#ep.set(t.signalId,t.value)}}releaseSignal(e){let t=this.#ec.get(e);void 0!==t&&(this.#el?.unwatch(t),this.#ec.delete(e),this.#eh.delete(t)),this.#en.delete(e)}get _sentSignalCount(){return this.#en.size}get _remoteSignalCount(){return this.#ed.size}_isWatching(e){return this.#ec.has(e)}};let rM="abort-signal";let AbortSignalHandler=class AbortSignalHandler{wireType=rM;#er;#eo=0;#d=1;#ea=new WeakMap;#en=new Map;#ey=new Map;#ew=new FinalizationRegistry(({id:e,session:t})=>{t!==this.#eo||this.#ey.has(e)&&(this.#ey.delete(e),this.#en.delete(e),this.#er?.sendMessage({type:"release",id:e}))});#ek=new Map;canHandle(e){return e instanceof AbortSignal}toWire(e,t){if(e.aborted)return{[rC]:rM,id:0,aborted:!0,reason:e.reason};let i=this.#ea.get(e);if(void 0!==i)return{[rC]:rM,id:i,aborted:!1};i=this.#d++,this.#ea.set(e,i),this.#en.set(i,new WeakRef(e)),this.#ew.register(e,{id:i,session:this.#eo},e);let r=new WeakRef(e),o=i,s=()=>{let e=r.deref(),t=e?.reason;"completed"===t?this.#er?.sendMessage({type:"release",id:o}):this.#er?.sendMessage({type:"abort",id:o,reason:t}),void 0!==e&&this.#ew.unregister(e),this.#ex(o)};return e.addEventListener("abort",s,{once:!0}),this.#ey.set(i,s),{[rC]:rM,id:i,aborted:!1}}fromWire(e){if(e.aborted)return AbortSignal.abort(e.reason);let t=this.#ek.get(e.id);if(void 0!==t)return t.signal;let i=new AbortController;return this.#ek.set(e.id,i),i.signal}connect(e){this.#er=e}onMessage(e){"abort"===e.type?(this.#ek.get(e.id)?.abort(e.reason),this.#ek.delete(e.id)):"release"===e.type&&this.#ek.delete(e.id)}disconnect(){for(let e of(this.#er=void 0,this.#ek.values()))e.abort("disconnected");for(let[e,t]of(this.#ek.clear(),this.#ey)){let i=this.#en.get(e)?.deref();void 0!==i&&(i.removeEventListener("abort",t),this.#ew.unregister(i))}this.#ey.clear(),this.#en.clear(),this.#eo++,this.#ea=new WeakMap,this.#d=1}#ex(e){this.#ey.delete(e),this.#en.delete(e)}get _sentCount(){return this.#en.size}get _receivedCount(){return this.#ek.size}};let rj="st-error";function rO(e){return null!=e&&"object"==typeof e&&e.__st__===rj}function rD(e){if(null==e||"object"!=typeof e)return e;if(e instanceof Error||"string"==typeof e.name&&"string"==typeof e.message){let t={__st__:rj,name:e.name,message:e.message};return"string"==typeof e.stack&&(t.stack=e.stack),t}return e}function rL(e){if(!rO(e))return e;if("AbortError"===e.name&&"u">typeof DOMException)return new DOMException(e.message,"AbortError");let t=Error(e.message);return t.name=e.name,void 0!==e.stack&&(t.stack=e.stack),t}function rB(e){return null!=e&&"object"==typeof e&&"abort"===e.type}let GlAbortSignalHandler=class GlAbortSignalHandler extends AbortSignalHandler{toWire(e,t){let i=super.toWire(e,t);return i.aborted&&void 0!==i.reason&&(i.reason=rD(i.reason)),i}fromWire(e){return e.aborted&&rO(e.reason)&&(e={...e,reason:rL(e.reason)}),super.fromWire(e)}connect(e){super.connect({sendMessage:t=>{rB(t)&&void 0!==t.reason&&(t.reason=rD(t.reason)),e.sendMessage(t)}})}onMessage(e){rB(e)&&rO(e.reason)&&(e.reason=rL(e.reason)),super.onMessage(e)}};let rF="__st__",rN=[{wireType:"date",canHandle:function(e){return e instanceof Date},toWire:function(e){return{[rF]:"date",value:e.getTime()}},fromWire:function(e){return new Date(e.value)}},{wireType:"map",canHandle:function(e){return e instanceof Map},toWire:function(e,t){let i=[];for(let[r,o]of e)i.push([t.toWire(r),t.toWire(o)]);return{[rF]:"map",entries:i}},fromWire:function(e,t){let i=new Map;for(let r of e.entries){let[e,o]=r;i.set(t.fromWire(e),t.fromWire(o))}return i}},{wireType:"set",canHandle:function(e){return e instanceof Set},toWire:function(e,t){let i=[];for(let r of e)i.push(t.toWire(r));return{[rF]:"set",values:i}},fromWire:function(e,t){let i=new Set;for(let r of e.values)i.add(t.fromWire(r));return i}},{wireType:"regexp",canHandle:function(e){return e instanceof RegExp},toWire:function(e){return{[rF]:"regexp",source:e.source,flags:e.flags}},fromWire:function(e){return new RegExp(e.source,e.flags)}}];function rq(e){return"string"==typeof e[0]?[e[0],e.slice(1)]:[e.map(String).join(" "),[]]}function rU(e){return e.map(e=>{let t;if(rx(e))return r$(e);if(null==e||"object"!=typeof e||Array.isArray(e))return e;for(let[i,r]of Object.entries(e))rx(r)&&((t??={...e})[i]=r$(r));return t??e})}function rW(e){let t=`[RPC:${e}]`;return{debug:(...e)=>{let[i,r]=rq(e);t4.debug(`${t} ${i}`,...rU(r))},warn:(...e)=>{let[i,r]=rq(e);t4.warn(`${t} ${i}`,...rU(r))},error:(...e)=>{let[i,r]=rq(e),o=function(e){for(let t of e){if(rx(t))return t;if(null!=t&&"object"==typeof t&&!Array.isArray(t)){for(let e of Object.values(t))if(rx(e))return e}}}(r);t4.error(o,`${t} ${i}`)}}}async function rH(e){let t,i,r="function"==typeof e?.webviewId?e.webviewId():e?.webviewId,o="function"==typeof e?.webviewInstanceId?e.webviewInstanceId():e?.webviewInstanceId,s=null==r&&null==o?"?":null==o?r:`${r??"?"}|${o}`,a=`RpcClient(${s})`,c=e?.endpoint?.()??(p??=rk()).createEndpoint(),h=new Connection(c,{handlers:[...rN,new SignalHandler({autoWatch:e?.autoWatchSignals}),new GlAbortSignalHandler,...e?.handlers??[]],nestedProxies:e?.nestedProxies??!0,debug:e?.debug,batching:!0,logger:rW(`client(${s})`)}),u=e?.timeout??6e4,g=[],m=()=>{for(let e of g)clearTimeout(e);g.length=0,null!=t&&(clearTimeout(t),t=void 0),null!=i&&(e?.signal?.removeEventListener("abort",i),i=void 0)},f=()=>{m(),h.close(),c.dispose()},b=()=>{let t=e?.signal?.reason;return t instanceof Error?t:Error("RPC connection aborted")};try{if(e?.signal?.aborted)throw b();t4.debug(`${a}: Connecting to host...`),2e4<u&&g.push(setTimeout(()=>t4.warn(`${a}: Connection still pending after 20000ms`),2e4)),4e4<u&&g.push(setTimeout(()=>t4.warn(`${a}: Connection still pending after 40000ms \u2014 peer may be stuck`),4e4));let r=await Promise.race([h.waitForReady(),new Promise((e,i)=>t=setTimeout(()=>i(Error(`RPC connection timed out after ${u}ms`)),u)),...e?.signal!=null?[new Promise((t,r)=>{i=()=>r(b()),e.signal.addEventListener("abort",i,{once:!0})})]:[]]);return m(),t4.debug(`${a}: Connected to host successfully`),{services:r,dispose:()=>{t4.debug(`${a}: Disposing connection...`),f()}}}catch(e){throw f(),t4.error(e,`${a}: Failed to connect to host`),e}}rW("?");let RpcController=class RpcController{constructor(e,t){this.host=e,this.options=t,e.addController(this)}get services(){return this._services}hostConnected(){this._connectionAbort?.abort(),this._connectionAbort=new AbortController,this._connect(this._connectionAbort.signal)}hostDisconnected(){this._connectionAbort?.abort(),this._connectionAbort=void 0,this._disposeRpc?.(),this._disposeRpc=void 0,this._services=void 0}async _connect(e){try{let{services:t,dispose:i}=await rH({...this.options?.rpcOptions,signal:e});if(e.aborted)return void i();if(this._services=t,this._disposeRpc=i,this.options?.onReady!=null)try{await this.options.onReady(t)}catch(e){throw i(),this._disposeRpc=void 0,this._services=void 0,e}}catch(c){if(e.aborted)return;let t=function(e){if(e instanceof Error)return e;if(rx(e)){let t=Error(`${e.name}: ${e.message}`);return t.cause=e,t}return Error(String(e))}(c),i=this.options?.rpcOptions?.webviewId,r=this.options?.rpcOptions?.webviewInstanceId,o="function"==typeof i?i():i,s="function"==typeof r?r():r,a=null!=s?`${o??"?"}|${s}`:o??"?";t4.error(t,`RpcController(${a}): Failed to connect`),this.options?.onError!=null&&this.options.onError(t)}}};function rV(e,t){let i,r,o=t?.cancelPrevious??!0,s=t?.initialValue,a=tN(s),c=tN(!1),h=tN(void 0),p=tN(!1),u=new $.Computed(()=>c.get()?"loading":null!=h.get()?"error":p.get()?"success":"idle"),g=!1,m=0,f=0;function b(){null!=i&&(i.abort(),i=void 0),c.set(!1)}async function v(...t){if(g)return;o&&b(),r=t;let s=new AbortController,u=++m;f=u,i=s,c.set(!0),h.set(void 0);try{let i=await e(s.signal,...t);if(s.signal.aborted||u!==f)return;a.set(i),p.set(!0)}catch(e){if(s.signal.aborted||u!==f)return;h.set(e instanceof Error?e.message:String(e))}finally{i===s&&(i=void 0,c.set(!1))}}async function _(){if(null!=r)return v(...r)}return{value:a,loading:c,error:h,status:{get:()=>u.get()},generationId:{get:()=>f},fetch:v,refetch:_,mutate:function(e){g||(a.set(e),h.set(void 0),p.set(!0))},cancel:b,reset:function(){b(),a.set(s),h.set(void 0),p.set(!1),r=void 0},dispose:function(){g=!0,b()}}}let LruMap=class LruMap{constructor(e){this.limit=e,this._map=new Map}get size(){return this._map.size}get(e){return this._map.get(e)}has(e){return this._map.has(e)}set(e,t){return this._map.delete(e),this._map.set(e,t),this.evict(),this}update(e,t){let i={...this._map.get(e)??{},...t};return this.set(e,i),i}touch(e){if(!this._map.has(e))return!1;let t=this._map.get(e);return this._map.delete(e),this._map.set(e,t),!0}delete(e){return this._map.delete(e)}clear(){this._map.clear()}keys(){return this._map.keys()}values(){return this._map.values()}evict(){for(;this._map.size>this.limit;){let e=this._map.keys().next().value;if(void 0===e)break;this._map.delete(e)}}};let rK=`\0
\0`,rG=e=>{if(null!=e){let t=e instanceof Error?e.message:"unknown error";t4.warn(`RPC call rejected (noop handler): ${t}`)}},rZ=e=>{if(null==e||e instanceof Error&&"AbortError"===e.name)return;let t=e instanceof Error?e.message:"unknown error";t4.warn(`RPC call rejected (noopUnlessReal handler): ${t}`)},rY=new WeakMap;function rX(e,t){return{signal:e,value:t}}function rJ(e,t,i,r){let o=e.map(e=>{var t;let i,r=e.signal.get(),o=(t=e.signal,i=(rY.get(t)??0)+1,rY.set(t,i),i);return e.signal.set(e.value),{signal:e.signal,optimistic:e.value,previous:r,version:o}});t.catch(e=>{for(let e of o)rY.get(e.signal)===e.version&&e.signal.get()===e.optimistic&&e.signal.set(e.previous);t4.error(e,`RPC call failed${i?` (${i})`:""}, rolled back`),r?.set(e instanceof Error?e.message:"RPC call failed")})}function rQ(e,t){let i=e.generationId.get();return r=>{i===e.generationId.get()&&t(r)}}function r0(e,t,i,r,o){o?.skipIf?.()||i().then(rQ(e,e=>{t.aborted||r(e)}),rZ)}function r1(e,t){e.catch(e=>{t4.error(e,`RPC call failed${t?` (${t})`:""}`)})}function r2(e,t,i){t.catch(t=>{t4.error(t,`RPC call failed${i?` (${i})`:""}`),e.set(t instanceof Error?t.message:"RPC call failed")})}let CommitDetailsActions=class CommitDetailsActions{constructor(e,t,i){this.state=e,this.services=t,this.resources=i,this._navigating=!1,this._commitEnrichmentCache=new LruMap(32)}resetEnrichment(){this._enrichmentController?.abort();let e=new AbortController;return this._enrichmentController=e,e.signal}cancelPendingRequests(){this.resources.commit.cancel(),this.resources.wip.cancel(),this.resources.reachability.cancel(),this.resources.explain.cancel(),this.resources.generate.cancel()}watchWipRepo(e){e!==this._wipWatchRepoPath&&(this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,this._wipWatchRepoPath=e,(async()=>{let t=await this.services.repository.onRepositoryWorkingChanged(e,()=>{this.fetchWipState(e)});if("function"==typeof t){if(this._wipWatchRepoPath!==e)return t();this._wipWatchUnsubscribe=t}})())}unwatchWip(){this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,this._wipWatchRepoPath=void 0}updateTelemetryContext(e){r1(this.services.telemetry.updateContext(e))}sendTelemetryEvent(e,t){r1(this.services.telemetry.sendEvent(e,t))}async navigateBack(){if(!this._navigating&&this.state.canNavigateBack.get()){this._navigating=!0;try{let e=await this.services.inspect.navigate("back");this.state.navigationStack.set(e.navigationStack),null!=e.selectedCommit&&(this.state.searchContext.set(void 0),await this.fetchCommit(e.selectedCommit.repoPath,e.selectedCommit.sha,{force:!0}))}catch(e){t4.error(e,"navigate back failed")}finally{this._navigating=!1}}}async navigateForward(){if(!this._navigating&&this.state.canNavigateForward.get()){this._navigating=!0;try{let e=await this.services.inspect.navigate("forward");this.state.navigationStack.set(e.navigationStack),null!=e.selectedCommit&&(this.state.searchContext.set(void 0),await this.fetchCommit(e.selectedCommit.repoPath,e.selectedCommit.sha,{force:!0}))}catch(e){t4.error(e,"navigate forward failed")}finally{this._navigating=!1}}}async refetchCurrentCommit(){let e=this.state.currentCommit.get();null!=e&&await this.fetchCommit(e.repoPath,e.sha,{force:!0})}togglePin(){var e,t;let i=!this.state.pinned.get();e=this.state.pinned,t=this.services.inspect.setPin(i),rJ([rX(e,i)],t,"toggle pin")}pickCommit(){r1(this.services.inspect.pickCommit(),"pick commit")}searchCommit(){r1(this.services.inspect.searchCommit(),"search commit")}switchMode(e){if(e===this.state.mode.get())return;let t=this.state.currentCommit.get(),i=t?.repoPath;this.state.mode.set(e),this.services.inspect.switchMode(e,i).catch(e=>{t4.error(e,"switch mode RPC failed")}),"wip"===e?this.fetchWipState(i):this.unwatchWip()}changeReviewMode(e){if(e===this.state.inReview.get())return;let t=this.state.wipState.get()?.repo?.path;rJ([rX(this.state.inReview,e),rX(this.state.draftState,{inReview:e})],this.services.inspect.changeReviewMode(e,t),"change review mode",this.state.error)}updatePullRequestExpanded(e){var t,i,r;let o=this.state.preferences.get();null==o?r2(this.state.error,this.services.storage.updateWorkspace("views:commitDetails:pullRequestExpanded",e),"update pullRequestExpanded"):(t=this.state.preferences,i={...o,pullRequestExpanded:e},r=this.services.storage.updateWorkspace("views:commitDetails:pullRequestExpanded",e),rJ([rX(t,i)],r,"update pullRequestExpanded"))}updateFilesLayout(e){let t=this.state.preferences.get();if(null==t)return;let i={...t,files:{...t.files,...e}};this.state.preferences.set(i),null!=e.compact&&r1(this.services.config.update("views.commitDetails.files.compact",e.compact),"update files.compact"),null!=e.icon&&r1(this.services.config.update("views.commitDetails.files.icon",e.icon),"update files.icon"),null!=e.layout&&r1(this.services.config.update("views.commitDetails.files.layout",e.layout),"update files.layout"),null!=e.threshold&&r1(this.services.config.update("views.commitDetails.files.threshold",e.threshold),"update files.threshold")}getRepoPath(){let e=this.state.wipState.get();return e?.repo?.path?e.repo.path:this.state.currentCommit.get()?.repoPath}fetch(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,r1(t.fetch(e),"fetch")}}push(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,r1(t.push(e),"push")}}pull(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,r1(t.pull(e),"pull")}}switchBranch(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,r1(t.switchBranch(e),"switch branch")}}stageFile(e){var t,i;t=this.state.error,i=this.services.repository,r2(t,i.stageFile(e),"stage file")}unstageFile(e){var t,i;t=this.state.error,i=this.services.repository,r2(t,i.unstageFile(e),"unstage file")}getCurrentRef(){if("wip"!==this.state.mode.get())return this.state.currentCommit.get()?.sha}openFile(e,t){var i,r;i=this.services.files,r=this.getCurrentRef(),r1(i.openFile(e,t,r),"open file")}openFileOnRemote(e){var t,i;t=this.services.files,i=this.getCurrentRef(),r1(t.openFileOnRemote(e,i),"open file on remote")}openFileCompareWorking(e,t){var i,r;i=this.services.files,r=this.getCurrentRef(),r1(i.openFileCompareWorking(e,t,r),"compare file with working")}openFileComparePrevious(e,t){var i,r;i=this.services.files,r=this.getCurrentRef(),r1(i.openFileComparePrevious(e,t,r),"compare file with previous")}executeFileAction(e,t){var i,r;i=this.services.files,r=this.getCurrentRef(),r1(i.executeFileAction(e,t,r),"file action")}openMultipleChanges(e){var t;t=this.services.files,r1(t.openMultipleChanges(e),"open multiple changes")}executeCommitAction(e,t){let i=this.state.currentCommit.get();i&&r1(this.services.inspect.executeCommitAction(i.repoPath,i.sha,e,t),`commit action: ${e}`)}executeCommand(e,...t){r1(this.services.commands.execute(e,...t),`command: ${e}`)}openOnRemote(e,t){e&&this.services.commands.execute("gitlens.openOnRemote",{repoPath:e,resource:{type:"commit",sha:t}})}changeFilesLayout(e){let t=this.state.preferences.get();if(!t?.files)return;let i={...t.files,layout:e};this.state.preferences.set({...t,files:i}),this.services.config.update("views.commitDetails.files.layout",e)}getPrContext(){let e=this.state.pullRequest.get(),t=this.state.wipState.get()?.repo?.path??this.state.currentCommit.get()?.repoPath;if(e?.refs&&t)return{repoPath:t,refs:e.refs,url:e.url,id:e.id,provider:e.provider?.id??"unknown"}}openPullRequestChanges(){let e=this.getPrContext();if(e){var t,i,r;t=this.services.pullRequests,i=e.repoPath,r=e.refs,r1(t.openPullRequestChanges(i,r),"open PR changes")}}openPullRequestComparison(){let e=this.getPrContext();if(e){var t,i,r;t=this.services.pullRequests,i=e.repoPath,r=e.refs,r1(t.openPullRequestComparison(i,r),"open PR comparison")}}openPullRequestOnRemote(){let e=this.getPrContext();if(e){var t,i;t=this.services.pullRequests,i=e.url,r1(t.openPullRequestOnRemote(i),"open PR on remote")}}openPullRequestDetails(){let e=this.getPrContext();if(e){var t,i,r,o;t=this.services.pullRequests,i=e.repoPath,r=e.id,o=e.provider,r1(t.openPullRequestDetails(i,r,o),"open PR details")}}createPatchFromWip(e,t){r1(this.services.drafts.createPatchFromWip(e,t),"create patch from WIP")}suggestChanges(e){let t=this.state.wipState.get();t?.repo?.path&&this.services.drafts.suggestChanges({repoPath:t.repo.path,...e}).then(()=>{this.changeReviewMode(!1)},rG)}showCodeSuggestion(e){r1(this.services.drafts.showCodeSuggestion(e),"show code suggestion")}async explainCommit(e){this.state.currentCommit.get()&&await this.resources.explain.fetch(e)}async generateDescription(){this.getRepoPath()&&await this.resources.generate.fetch()}async loadReachability(){this.resources.reachability.loading.get()||null!=this.state.currentCommit.get()&&await this.resources.reachability.fetch()}clearReachability(){this.resources.reachability.cancel(),this.resources.reachability.mutate(void 0)}refreshReachability(){this.resources.reachability.mutate(void 0),this.loadReachability()}async fetchInitialState(){this.state.loading.set(!0),this.state.error.set(void 0);let e=this.state.mode.get(),t=this.state.pinned.get(),i=this.state.commitRef.get();try{let r=await this.services.inspect.getInitialContext(),o=null!=r.initialCommit?r.mode:"commit"!==e?e:r.mode,s=t||r.pinned;this.state.mode.set(o),this.state.pinned.set(s),this.state.navigationStack.set(r.navigationStack),this.state.inReview.set(r.inReview),this.state.draftState.set({inReview:r.inReview}),this.fetchPreferences(),this.services.config.get("views.commitDetails.autolinks.enabled").then(e=>this.state.capabilities.autolinksEnabled=e,rG),this.services.config.get("ai.experimental.composer.enabled").then(e=>this.state.capabilities.experimentalComposerEnabled=e,rG),this.services.integrations.getIntegrationStates().then(e=>this.state.capabilities.hasIntegrationsConnected=e.some(e=>e.connected),rG);let a=r.initialCommit??i;"commit"===o&&null!=a?await this.fetchCommit(a.repoPath,a.sha):"wip"===o&&await this.fetchWipState(r.initialWipRepoPath)}catch(e){t4.error(e,"Failed to fetch initial state"),this.state.error.set(e instanceof Error?e.message:"Failed to initialize")}finally{this.state.loading.set(!1)}}async fetchCommit(e,t,i){let r=this.state.currentCommit.get();if(!i?.force&&r?.repoPath===e&&r?.sha===t)return void this.resources.commit.cancel();this.state.error.set(void 0),this.resources.reachability.cancel(),this.resources.explain.cancel(),this.resources.generate.cancel();let o=this.resetEnrichment(),s=`${t}:${e}`,a=this._commitEnrichmentCache.get(s);if(null!=a?(null!=a.commit&&(this.state.currentCommit.set(a.commit),this.state.commitRef.set({sha:a.commit.sha,repoPath:a.commit.repoPath})),this.state.autolinks.set(a.autolinks),this.state.formattedMessage.set(a.formattedMessage),this.state.autolinkedIssues.set(a.autolinkedIssues),this.state.pullRequest.set(a.hasPullRequest?a.pullRequest:void 0),this.state.signature.set(a.hasSignature?a.signature:void 0)):(this.state.autolinks.set(void 0),this.state.formattedMessage.set(void 0),this.state.autolinkedIssues.set(void 0),this.state.pullRequest.set(void 0),this.state.signature.set(void 0)),await this.resources.commit.fetch(e,t),"success"===this.resources.commit.status.get()){let i=this.resources.commit.value.get();this.state.currentCommit.set(i),this.state.commitRef.set(i?{sha:i.sha,repoPath:i.repoPath}:void 0),null!=i&&(this._commitEnrichmentCache.update(s,{commit:i}),function(e,t,i,r,o){let{repoPath:s,sha:a,isStash:c,autolinksEnabled:h}=r,p=r.headlineSplitterToken??rK,u=()=>!h;r0(t,i,()=>e.autolinks.getCommitAutolinks(s,a,p,c,i),e=>{null!=e&&o.setBasicAutolinks(e.autolinks,e.formattedMessage)},{skipIf:u}),r0(t,i,()=>e.autolinks.getEnrichedAutolinks(s,a,p,c,i),e=>{null!=e&&o.setEnrichedAutolinks(e.autolinkedIssues,e.formattedMessage)},{skipIf:u}),r0(t,i,()=>e.pullRequests.getPullRequestForCommit(s,a,i),e=>o.setPullRequest(e)),r0(t,i,()=>e.repository.getCommitSignature(s,a,i),e=>o.setSignature(e))}(this.services,this.resources.commit,o,{repoPath:e,sha:t,isStash:null!=i.stashNumber,autolinksEnabled:this.state.capabilities.autolinksEnabled},{setBasicAutolinks:(e,t)=>{this._commitEnrichmentCache.update(s,{autolinks:e,formattedMessage:t}),this.state.autolinks.set(e),this.state.formattedMessage.set(t)},setEnrichedAutolinks:(e,t)=>{this._commitEnrichmentCache.update(s,{autolinkedIssues:e,formattedMessage:t}),this.state.autolinkedIssues.set(e),this.state.formattedMessage.set(t)},setPullRequest:e=>{this._commitEnrichmentCache.update(s,{pullRequest:e,hasPullRequest:!0}),this.state.pullRequest.set(e)},setSignature:e=>{this._commitEnrichmentCache.update(s,{signature:e,hasSignature:!0}),this.state.signature.set(e)}}),this.services.repository.hasRemotes(e).then(rQ(this.resources.commit,e=>{o.aborted||this.state.hasRemotes.set(e)}),rZ))}else null!=this.resources.commit.error.get()&&this.state.error.set(this.resources.commit.error.get())}async fetchWipState(e){if(this.state.error.set(void 0),this.state.pullRequest.set(void 0),this.state.codeSuggestions.set(void 0),await this.resources.wip.fetch(e),"success"===this.resources.wip.status.get()){let t=this.resources.wip.value.get();this.state.wipState.set(t);let i=t?.repo?.path??e;if(null!=i){this.watchWipRepo(i);let e=e=>rQ(this.resources.wip,e);this.services.pullRequests.getPullRequestForBranch(i).then(e(e=>{this.state.pullRequest.set(e),null!=e&&this.services.drafts.getCodeSuggestions(i).then(rQ(this.resources.wip,e=>this.state.codeSuggestions.set(e)),rG)}),rG)}}else null!=this.resources.wip.error.get()&&this.state.error.set(this.resources.wip.error.get())}async fetchPreferences(){try{let[e,t,i,r]=await Promise.allSettled([this.services.storage.getWorkspace("views:commitDetails:pullRequestExpanded"),this.services.config.getMany("views.commitDetails.avatars","defaultCurrentUserNameStyle","defaultDateFormat","defaultDateStyle","views.commitDetails.files","signing.showSignatureBadges","views.commitDetails.autolinks.enabled","ai.experimental.composer.enabled"),this.services.config.getManyCore("workbench.tree.renderIndentGuides","workbench.tree.indent","git.enableSmartCommit"),this.services.ai.isEnabled()]),o=i1(e),[s,a,c,h,p,u,g,m]=i1(t)??[],[f,b,v]=i1(i)??[],_=i1(r);this.state.preferences.set({currentUserNameStyle:a??"you",pullRequestExpanded:o??!0,avatars:s??!0,dateFormat:c??"MMMM Do, YYYY h:mma",dateStyle:h??"relative",files:p??this.state.preferences.get()?.files??{layout:"auto",compact:!0,threshold:5,icon:"type"},indentGuides:f??"onHover",indent:b,aiEnabled:_??!1,enableSmartCommit:v??!1,showSignatureBadges:u??!1}),null!=g&&(this.state.capabilities.autolinksEnabled=g),null!=m&&(this.state.capabilities.experimentalComposerEnabled=m)}catch(e){t4.error(e,"Failed to fetch preferences")}}async checkIntegrations(){try{let e=await this.services.integrations.getIntegrationStates();this.state.capabilities.hasIntegrationsConnected=e.some(e=>e.connected)}catch(e){t4.error(e,"Failed to check integrations status")}}handleBranchAction(e){switch(e){case"pull":this.pull();break;case"push":case"publish-branch":this.push();break;case"fetch":this.fetch();break;case"switch":this.switchBranch();break;case"open-pr-changes":this.openPullRequestChanges();break;case"open-pr-compare":this.openPullRequestComparison();break;case"open-pr-remote":this.openPullRequestOnRemote();break;case"open-pr-details":this.openPullRequestDetails()}}};async function r5(e){let t=await Promise.allSettled(e.map(e=>e())),i=[];for(let e of t)"fulfilled"===e.status&&"function"==typeof e.value?i.push(e.value):"rejected"===e.status&&t4.error(e.reason,"Failed to subscribe");return()=>{for(let e of i)try{e()}catch(e){t4.error(e,"Failed to unsubscribe")}}}let r3=(e=null)=>new $.State(e,{equals:()=>!1});new WeakMap;let SignalObjectImpl=class SignalObjectImpl{static fromEntries(e){return new SignalObjectImpl(Object.fromEntries(e))}#e$=new Map;#eC=r3();constructor(e={}){let t=Object.getPrototypeOf(e),i=Object.getOwnPropertyDescriptors(e),r=Object.create(t);for(let e in i)Object.defineProperty(r,e,i[e]);let o=this;return new Proxy(r,{get:(e,t,i)=>(o.#eS(t),Reflect.get(e,t,i)),has:(e,t)=>(o.#eS(t),t in e),ownKeys:e=>(o.#eC.get(),Reflect.ownKeys(e)),set(e,t,i,r){let s=Reflect.set(e,t,i,r);return o.#eE(t),o.#eA(),s},deleteProperty:(e,t)=>(t in e&&(delete e[t],o.#eE(t),o.#eA()),!0),getPrototypeOf:()=>SignalObjectImpl.prototype})}#eS(e){let t=this.#e$.get(e);void 0===t&&(t=r3(),this.#e$.set(e,t)),t.get()}#eE(e){let t=this.#e$.get(e);t&&t.set(null)}#eA(){this.#eC.set(null)}};function r4(e){let t=new $.State(e),i=new $.State(void 0),r=new $.Computed(()=>{let e=i.get();return null!=e?e.get():t.get()});return{get:function(){return r.get()},connect:function(e){i.set(e)},disconnect:function(){let e=i.get();null!=e&&t.set(e.get()),i.set(void 0)}}}let r6="__rk",r7="__ts",r8=new Set(["__v",r6,r7]),r9=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a","add-small":"\\ec7b","remove-small":"\\ec7c","worktree-small":"\\ec7d",worktree:"\\ec7e","screen-cut":"\\ec7f",ask:"\\ec80",openai:"\\ec81",claude:"\\ec82","open-in-window":"\\ec83","new-session":"\\ec84"}),oe=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147","diff-right":"\\f11b","diff-left":"\\f12e","accept-right":"\\f12f","accept-left":"\\f130","accept-all-right":"\\f131","accept-all-left":"\\f132",continue:"\\f148",skip:"\\f149",abort:"\\f14a",pause:"\\f14b"});var ot=Object.defineProperty,oi=Object.getOwnPropertyDescriptor,or=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?oi(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ot(t,i,s),s};function oo(e,t=""){return B(Object.entries(e).map(([e,i])=>(function(e,t,i=""){return`:host([icon='${i}${e}'])::before { content: '${t}'; }`})(e,i,t)).join(""))}let os=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(e){e.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(e)}};os.styles=F`
		:host {
			font: normal normal normal var(--code-icon-size, 16px) / 1 codicon;
			display: inline-block;
			text-decoration: none;
			text-rendering: auto;
			text-align: center;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			color: inherit;
			vertical-align: var(--code-icon-v-align, text-bottom);
			letter-spacing: normal;
		}

		:host([icon^='gl-']) {
			font-family: 'glicons';
		}

		${oo(r9)}
		${oo(oe,"gl-")}

		:host([icon='custom-start-work']) {
			position: relative;
		}
		:host([icon='custom-start-work'])::before {
			content: '\\ea68';
		}
		:host([icon='custom-start-work'])::after {
			content: '\\ea60';
			position: absolute;
			right: -0.2em;
			bottom: -0.2em;
			font-size: 0.6em;
			line-height: normal;
		}

		:host([icon='gl-pinned-filled']):before {
			/* TODO: see relative positioning needed in every use-case */
			position: relative;
			left: 1px;
		}

		@keyframes codicon-spin {
			100% {
				transform: rotate(360deg);
			}
		}

		:host([modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;
		}
		:host([icon='loading'][modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;

			/* custom speed & easing for loading icon */
			animation-duration: 1s !important;
			animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67) !important;
		}

		:host([flip='inline']) {
			transform: rotateY(180deg);
		}

		:host([flip='block']) {
			transform: rotateX(180deg);
		}

		:host([rotate='45']) {
			transform: rotateZ(45deg);
		}
	`,or([eB({reflect:!0})],os.prototype,"icon",2),or([eB({reflect:!0})],os.prototype,"modifier",2),or([eB({type:Number})],os.prototype,"size",2),or([eB({reflect:!0})],os.prototype,"flip",2),or([eB({reflect:!0})],os.prototype,"rotate",2),os=or([eD("code-icon")],os);let on=tx(class extends directive_i{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.st)e in t||(i.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return eE}});let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=eA,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===eA||null==e)return this._t=void 0,this.it=e;if(e===eE)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let oa=tx(unsafe_html_e),ol=F`
	:host {
		/* Banner color custom properties */
		--gl-banner-primary-background: var(--vscode-sideBar-background);
		--gl-banner-secondary-background: var(--vscode-editor-background);
		--gl-banner-primary-emphasis-background: var(--vscode-button-background);
		--gl-banner-secondary-emphasis-background: var(--vscode-button-secondaryBackground);
		--gl-banner-text-color: var(--vscode-foreground);
		--gl-banner-dim-text-color: var(--vscode-descriptionForeground);
		--gl-banner-transparency: 0.5;

		/* Layout properties */
		--gl-banner-padding: 1.2rem;
		--gl-banner-gap: 0.8rem;
		--gl-banner-border-radius: 0.4rem;

		/* Button customization - use 8px horizontal padding, keep original vertical padding */
		--gl-banner-button-padding: 0.4rem 0.8rem;

		display: block;
		margin-block-end: 1.2rem;
	}

	.banner {
		display: flex;
		flex-direction: column;
		padding: var(--gl-banner-padding);
		border-radius: var(--gl-banner-border-radius);
		position: relative;
		overflow: hidden;
		container-type: inline-size;
	}

	/* Solid display mode - same as card background */
	.banner--solid {
		background-color: var(--gl-banner-primary-background);
		border: 1px solid color-mix(in lab, var(--gl-banner-primary-background) 100%, var(--vscode-foreground) 12%);
	}

	/* Outline display mode - emphasis color outline with secondary background */
	.banner--outline {
		background-color: var(--gl-banner-secondary-background);
		border: 2px solid var(--gl-banner-primary-emphasis-background);
	}

	/* Gradient display mode - horizontal gradient from primary to secondary emphasis */
	.banner--gradient {
		background: linear-gradient(
			to right,
			var(--gl-banner-primary-emphasis-background) 0%,
			var(--gl-banner-secondary-emphasis-background) 100%
		);
		border: 1px solid
			color-mix(
				in lab,
				var(--gl-banner-primary-emphasis-background) 50%,
				var(--gl-banner-secondary-emphasis-background) 50%
			);
	}

	/* Gradient transparent display mode - same gradient but with transparency */
	.banner--gradient-transparent {
		background: linear-gradient(
			to right,
			color-mix(
					in lab,
					var(--gl-banner-primary-emphasis-background) calc(100% * (1 - var(--gl-banner-transparency))),
					transparent
				)
				0%,
			color-mix(
					in lab,
					var(--gl-banner-secondary-emphasis-background) calc(100% * (1 - var(--gl-banner-transparency))),
					transparent
				)
				100%
		);
		border: 1px solid
			color-mix(
				in lab,
				color-mix(
						in lab,
						var(--gl-banner-primary-emphasis-background) 50%,
						var(--gl-banner-secondary-emphasis-background) 50%
					)
					calc(100% * (1 - var(--gl-banner-transparency))),
				transparent
			);
	}

	/* Gradient purple display mode - matches the auto-composer container styling */
	.banner--gradient-purple {
		border: 1px solid var(--vscode-panel-border);
		border-radius: 6px;
		background: linear-gradient(135deg, #a100ff1a 0%, #255ed11a 100%);
	}

	.banner--gradient-purple .banner__title {
		font-size: 1.3rem;
		color: var(--vscode-foreground);
		font-weight: normal;
	}

	.banner--gradient-purple .banner__body {
		font-size: 1.2rem;
		color: var(--vscode-descriptionForeground);
		line-height: 1.4;
	}

	.banner--gradient-purple .banner__body a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}

	.banner--gradient-purple .banner__body a:hover {
		color: var(--vscode-textLink-activeForeground);
		text-decoration: underline;
	}

	.banner__content {
		display: flex;
		flex-direction: column;
		gap: var(--gl-banner-gap);
		align-items: center;
		text-align: center;
	}

	/* Responsive layout */
	.banner--responsive .banner__content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-align: left;
		gap: var(--gl-banner-gap);
	}

	.banner--responsive .banner__text {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.banner--responsive .banner__title,
	.banner--responsive .banner__body {
		text-align: left;
	}

	/* < 500px: Stack vertically with full-width buttons */
	.banner--responsive .banner__buttons {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-top: 0.8rem;
		width: 100%;
	}

	.banner--responsive .banner__button {
		grid-column: unset;
		justify-self: unset;
		width: 100% !important;
		min-width: 100% !important;
		max-width: 100% !important;
		justify-content: center;
		flex: 1;
	}

	/* >= 500px: Three-group horizontal layout */
	@container (min-width: 500px) {
		.banner--responsive .banner__content {
			flex-direction: row;
			align-items: center;
			gap: 1.6rem;
		}

		/* Group 1: Text content (left-aligned) */
		.banner--responsive .banner__text {
			flex: 1;
			min-width: 0;
			align-self: center;
		}

		/* Group 2: Buttons (content-sized) */
		.banner--responsive .banner__buttons {
			display: flex;
			flex-direction: column;
			gap: 0.8rem;
			margin-top: 0;
			width: auto;
			flex-shrink: 0;
			align-self: center;
		}

		.banner--responsive .banner__button {
			width: auto;
			white-space: nowrap;
		}

		/* Group 3: Dismiss button (to the right of buttons) */
		.banner--responsive .banner__dismiss {
			position: static !important;
			top: auto !important;
			right: auto !important;
			align-self: center;
			flex-shrink: 0;
		}
	}

	.banner__title {
		font-size: 1.2em;
		font-weight: bold;
		color: var(--gl-banner-text-color);
		margin: 0;
		text-wrap: pretty;
	}

	.banner__body {
		font-size: 1em;
		color: var(--gl-banner-text-color);
		margin: 0;
		line-height: 1.4;
		text-wrap: pretty;
	}

	.banner__buttons {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 0.8rem;
		margin-top: 0.8rem;
		align-items: center;
		width: 100%;
	}

	.banner:not(.banner--gradient-purple) .banner__button--primary {
		grid-column: 2;
		justify-self: center;
		white-space: nowrap;
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 10%, #fff 20%);
		--button-foreground: var(--gl-banner-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 20%, #fff 30%);
		--button-padding: var(--gl-banner-button-padding);
	}

	.banner--gradient-purple .banner__button--primary {
		grid-column: 2;
		justify-self: center;
		white-space: nowrap;
		--button-padding: var(--gl-banner-button-padding);
	}

	.banner__button--secondary {
		grid-column: 3;
		justify-self: end;
		white-space: nowrap;
		--button-background: transparent;
		--button-foreground: var(--gl-banner-dim-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-dim-text-color) 10%, transparent);
	}

	/* When only primary button exists, center it across the full width */
	.banner__buttons:has(.banner__button--primary):not(:has(.banner__button--secondary)) .banner__button--primary {
		grid-column: 1 / -1;
		justify-self: center;
	}

	/* Dismiss button */
	.banner__dismiss {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		--button-background: transparent;
		--button-foreground: var(--gl-banner-dim-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-dim-text-color) 15%, transparent);
		--button-padding: 0.4rem;
		z-index: 1;
	}

	/* Responsive layout dismiss button */
	.banner--responsive .banner__dismiss {
		/* < 500px: Upper right corner (default positioning) */
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
	}

	/* Theme-specific adjustments */

	/* Light theme: Brighten gradient colors for better contrast with dark text */
	:host-context(.vscode-light),
	:host-context(.vscode-high-contrast-light) {
		--gl-banner-primary-emphasis-background: color-mix(in lab, var(--vscode-button-background) 40%, #fff 60%);
		--gl-banner-secondary-emphasis-background: color-mix(
			in lab,
			var(--vscode-button-secondaryBackground) 40%,
			#fff 60%
		);
	}

	/* Override text color for high contrast light theme specifically */
	:host-context(.vscode-high-contrast-light) {
		--gl-banner-text-color: #000;
	}

	:host-context(.vscode-dark) .banner:not(.banner--gradient-purple) .banner__button--primary,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light))
		.banner:not(.banner--gradient-purple)
		.banner__button--primary {
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 10%, #fff 20%);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 20%, #fff 30%);
		--button-foreground: #fff;
	}

	:host-context(.vscode-light) .banner:not(.banner--gradient-purple) .banner__button--primary,
	:host-context(.vscode-high-contrast-light) .banner:not(.banner--gradient-purple) .banner__button--primary {
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 8%, #fff 25%);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 15%, #fff 35%);
		--button-foreground: #000;
	}

	/* Make banner text darker in light themes */
	:host-context(.vscode-light) .banner__body,
	:host-context(.vscode-high-contrast-light) .banner__body {
		color: color-mix(in lab, var(--gl-banner-text-color) 20%, #000 80%);
	}

	/* Strong colors for banner title - pure black/white for maximum contrast */
	:host-context(.vscode-light) .banner__title,
	:host-context(.vscode-high-contrast-light) .banner__title {
		color: #000 !important;
	}

	:host-context(.vscode-dark) .banner__title,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .banner__title {
		color: #fff !important;
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.banner__buttons {
			flex-direction: column;
			width: 100%;
		}

		.banner__button {
			width: 100%;
		}
	}

	/* More aggressive responsive layout for narrow sidebars */
	@media (max-width: 400px) {
		.banner__buttons {
			display: flex;
			flex-direction: column;
			gap: 0.6rem;
			margin-top: 0.8rem;
			align-items: center;
			width: 100%;
		}

		.banner__button--primary,
		.banner__button--secondary {
			grid-column: unset;
			justify-self: unset;
			width: 100%;
			max-width: 200px;
		}

		.banner__button--primary {
			order: 1;
		}

		.banner__button--secondary {
			order: 2;
		}
	}

	/* Support for custom banner buttons layout */
	:host([data-banner-buttons-layout='column']) .banner__buttons,
	.banner__buttons[data-layout='column'] {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-top: 0.8rem;
		align-items: center;
		width: 100%;
	}

	:host([data-banner-buttons-layout='column']) .banner__button--primary,
	:host([data-banner-buttons-layout='column']) .banner__button--secondary,
	.banner__buttons[data-layout='column'] .banner__button--primary,
	.banner__buttons[data-layout='column'] .banner__button--secondary {
		grid-column: unset;
		justify-self: unset;
		width: 100%;
		max-width: 200px;
	}
`,oc=F`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;F`
	.sr-only,
	.sr-only-focusable:not(:active):not(:focus-visible):not(:focus-within) {
		${oc}
	}
`;let oh=F`
	outline: 1px solid var(--color-focus-border);
	outline-offset: -1px;
`,od=F`
	outline: 1px solid var(--color-focus-border);
	outline-offset: 2px;
`;F`
	:focus-visible {
		${oh}
	}
`;let op=F`
	:host {
		box-sizing: border-box;
	}
	:host *,
	:host *::before,
	:host *::after {
		box-sizing: inherit;
	}
	[hidden] {
		display: none !important;
	}
`;F`
	* {
		box-sizing: border-box;
	}
`,F`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		${oh}
	}
	a:hover {
		text-decoration: underline;
	}
`;let ou=F`
	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	::-webkit-scrollbar-corner {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-color: inherit;
		border-right-style: inset;
		border-right-width: calc(100vw + 100vh);
		border-radius: unset !important;
	}
	::-webkit-scrollbar-thumb:hover {
		border-color: var(--vscode-scrollbarSlider-hoverBackground);
	}
	::-webkit-scrollbar-thumb:active {
		border-color: var(--vscode-scrollbarSlider-activeBackground);
	}

	.scrollable {
		border-color: transparent;
		transition: border-color 1s linear;
	}

	:host(:hover) .scrollable,
	:host(:focus-within) .scrollable {
		border-color: var(--vscode-scrollbarSlider-background);
		transition: none;
	}

	:host-context(.preload) .scrollable {
		transition: none;
	}
`;F`
	.inline-code {
		background: var(--vscode-textCodeBlock-background);
		border-radius: 3px;
		padding: 0px 4px 2px 4px;
		font-family: var(--vscode-editor-font-family);
	}
`;let og=F`
	@keyframes sub-panel-enter {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.sub-panel-enter {
		animation: sub-panel-enter 0.2s ease-out;
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	@media (prefers-reduced-motion: reduce) {
		.sub-panel-enter {
			animation: none;
		}
	}
`;F`
	:host {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}
`;let om=F`
	:host {
		--gl-metadata-bar-bg: color-mix(in srgb, var(--color-background) 95%, var(--color-foreground) 5%);
		--gl-metadata-bar-border: var(--vscode-sideBarSectionHeader-border, var(--color-foreground--25));
		--gl-metadata-bar-min-height: 2.94rem;
	}
`;function of(e){return e?.includes(`
`)?oa(e.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):e}var ob=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},ov=F`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;let o_=new Set,oy=new Map,ow="ltr",ok="en",ox="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(ox){let e=new MutationObserver(oC);ow=document.documentElement.dir||"ltr",ok=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function o$(...e){e.map(e=>{let t=e.$code.toLowerCase();oy.has(t)?oy.set(t,Object.assign(Object.assign({},oy.get(t)),e)):oy.set(t,e),u||(u=e)}),oC()}function oC(){ox&&(ow=document.documentElement.dir||"ltr",ok=document.documentElement.lang||navigator.language),[...o_.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){o_.add(this.host)}hostDisconnected(){o_.delete(this.host)}dir(){return`${this.host.dir||ow}`.toLowerCase()}lang(){return`${this.host.lang||ok}`.toLowerCase()}getTranslationData(e){var t,i;let r=new Intl.Locale(e.replace(/_/g,"-")),o=null==r?void 0:r.language.toLowerCase(),s=null!=(i=null==(t=null==r?void 0:r.region)?void 0:t.toLowerCase())?i:"",a=oy.get(`${o}-${s}`),c=oy.get(o);return{locale:r,language:o,region:s,primary:a,secondary:c}}exists(e,t){var i;let{primary:r,secondary:o}=this.getTranslationData(null!=(i=t.lang)?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!r&&!!r[e]||!!o&&!!o[e]||!!t.includeFallback&&!!u&&!!u[e]}term(e,...t){let i,{primary:r,secondary:o}=this.getTranslationData(this.lang());if(r&&r[e])i=r[e];else if(o&&o[e])i=o[e];else{if(!u||!u[e])return String(e);i=u[e]}return"function"==typeof i?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var oS={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",createOption:e=>`Create "${e}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numCharacters:e=>1===e?"1 character":`${e} characters`,numCharactersRemaining:e=>1===e?"1 character remaining":`${e} characters remaining`,numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};o$(oS);var oE=class extends LocalizeController{};o$(oS);var oA=Object.defineProperty,oP=Object.getOwnPropertyDescriptor,oz=e=>{throw TypeError(e)},oR=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?oP(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&oA(t,i,s),s},oI=(e,t,i)=>t.has(e)||oz("Cannot "+i),oT=F`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,oM=class extends lit_element_i{constructor(){let e;super(),(e=E).has(this)?oz("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,t)=>{if(this.internals?.states)try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes("must start with '--'"));else throw e}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{}for(let[e,t]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===t.default&&void 0!==t.initial&&"string"==typeof e&&this.customStates.set(`initial-${e}-${t.initial}`,!0)}static get styles(){return[oT,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(e,t,i){let r,o;if(oI(this,r=E,"read from private field"),o?!o.call(this):!r.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),oI(this,e=E,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&null==this[i]&&(this[i]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){let t=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};E=new WeakMap,oR([eB()],oM.prototype,"dir",2),oR([eB()],oM.prototype,"lang",2),oR([eB({type:Boolean,reflect:!0,attribute:"did-ssr"})],oM.prototype,"didSSR",2);let oj=Math.min,oO=Math.max,oD=Math.round,oL=Math.floor,oB=e=>({x:e,y:e}),oF={left:"right",right:"left",bottom:"top",top:"bottom"};function oN(e,t){return"function"==typeof e?e(t):e}function oq(e){return e.split("-")[0]}function oU(e){return e.split("-")[1]}function oW(e){return"x"===e?"y":"x"}function oH(e){return"y"===e?"height":"width"}function oV(e){let t=e[0];return"t"===t||"b"===t?"y":"x"}function oK(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}let oG=["left","right"],oZ=["right","left"],oY=["top","bottom"],oX=["bottom","top"];function oJ(e){let t=oq(e);return oF[t]+e.slice(t.length)}function oQ(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function o0(e){let{x:t,y:i,width:r,height:o}=e;return{width:r,height:o,top:i,left:t,right:t+r,bottom:i+o,x:t,y:i}}function o1(e,t,i){let r,{reference:o,floating:s}=e,a=oV(t),c=oW(oV(t)),h=oH(c),p=oq(t),u="y"===a,g=o.x+o.width/2-s.width/2,m=o.y+o.height/2-s.height/2,f=o[h]/2-s[h]/2;switch(p){case"top":r={x:g,y:o.y-s.height};break;case"bottom":r={x:g,y:o.y+o.height};break;case"right":r={x:o.x+o.width,y:m};break;case"left":r={x:o.x-s.width,y:m};break;default:r={x:o.x,y:o.y}}switch(oU(t)){case"start":r[c]-=f*(i&&u?-1:1);break;case"end":r[c]+=f*(i&&u?-1:1)}return r}async function o2(e,t){var i;void 0===t&&(t={});let{x:r,y:o,platform:s,rects:a,elements:c,strategy:h}=e,{boundary:p="clippingAncestors",rootBoundary:u="viewport",elementContext:g="floating",altBoundary:m=!1,padding:f=0}=oN(t,e),b=oQ(f),v=c[m?"floating"===g?"reference":"floating":g],_=o0(await s.getClippingRect({element:null==(i=await (null==s.isElement?void 0:s.isElement(v)))||i?v:v.contextElement||await (null==s.getDocumentElement?void 0:s.getDocumentElement(c.floating)),boundary:p,rootBoundary:u,strategy:h})),w="floating"===g?{x:r,y:o,width:a.floating.width,height:a.floating.height}:a.reference,x=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c.floating)),$=await (null==s.isElement?void 0:s.isElement(x))&&await (null==s.getScale?void 0:s.getScale(x))||{x:1,y:1},C=o0(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:w,offsetParent:x,strategy:h}):w);return{top:(_.top-C.top+b.top)/$.y,bottom:(C.bottom-_.bottom+b.bottom)/$.y,left:(_.left-C.left+b.left)/$.x,right:(C.right-_.right+b.right)/$.x}}let o5=async(e,t,i)=>{let{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:a}=i,c=a.detectOverflow?a:{...a,detectOverflow:o2},h=await (null==a.isRTL?void 0:a.isRTL(t)),p=await a.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:g}=o1(p,r,h),m=r,f=0,b={};for(let i=0;i<s.length;i++){let v=s[i];if(!v)continue;let{name:_,fn:w}=v,{x:x,y:$,data:C,reset:S}=await w({x:u,y:g,initialPlacement:r,placement:m,strategy:o,middlewareData:b,rects:p,platform:c,elements:{reference:e,floating:t}});u=null!=x?x:u,g=null!=$?$:g,b[_]={...b[_],...C},S&&f<50&&(f++,"object"==typeof S&&(S.placement&&(m=S.placement),S.rects&&(p=!0===S.rects?await a.getElementRects({reference:e,floating:t,strategy:o}):S.rects),{x:u,y:g}=o1(p,m,h)),i=-1)}return{x:u,y:g,placement:m,strategy:o,middlewareData:b}},o3=new Set(["left","top"]);async function o4(e,t){let{placement:i,platform:r,elements:o}=e,s=await (null==r.isRTL?void 0:r.isRTL(o.floating)),a=oq(i),c=oU(i),h="y"===oV(i),p=o3.has(a)?-1:1,u=s&&h?-1:1,g=oN(t,e),{mainAxis:m,crossAxis:f,alignmentAxis:b}="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:g.mainAxis||0,crossAxis:g.crossAxis||0,alignmentAxis:g.alignmentAxis};return c&&"number"==typeof b&&(f="end"===c?-1*b:b),h?{x:f*u,y:m*p}:{x:m*p,y:f*u}}function o6(){return"u">typeof window}function o7(e){return se(e)?(e.nodeName||"").toLowerCase():"#document"}function o8(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function o9(e){var t;return null==(t=(se(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function se(e){return!!o6()&&(e instanceof Node||e instanceof o8(e).Node)}function st(e){return!!o6()&&(e instanceof Element||e instanceof o8(e).Element)}function si(e){return!!o6()&&(e instanceof HTMLElement||e instanceof o8(e).HTMLElement)}function sr(e){return!(!o6()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof o8(e).ShadowRoot)}function so(e){let{overflow:t,overflowX:i,overflowY:r,display:o}=sp(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+i)&&"inline"!==o&&"contents"!==o}function ss(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}let sn=/transform|translate|scale|rotate|perspective|filter/,sa=/paint|layout|strict|content/,sl=e=>!!e&&"none"!==e;function sc(e){let t=st(e)?sp(e):e;return sl(t.transform)||sl(t.translate)||sl(t.scale)||sl(t.rotate)||sl(t.perspective)||!sh()&&(sl(t.backdropFilter)||sl(t.filter))||sn.test(t.willChange||"")||sa.test(t.contain||"")}function sh(){return null==g&&(g="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),g}function sd(e){return/^(html|body|#document)$/.test(o7(e))}function sp(e){return o8(e).getComputedStyle(e)}function su(e){return st(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function sg(e){if("html"===o7(e))return e;let t=e.assignedSlot||e.parentNode||sr(e)&&e.host||o9(e);return sr(t)?t.host:t}function sm(e,t,i){var r;void 0===t&&(t=[]),void 0===i&&(i=!0);let o=function e(t){let i=sg(t);return sd(i)?t.ownerDocument?t.ownerDocument.body:t.body:si(i)&&so(i)?i:e(i)}(e),s=o===(null==(r=e.ownerDocument)?void 0:r.body),a=o8(o);if(!s)return t.concat(o,sm(o,[],i));{let e=sf(a);return t.concat(a,a.visualViewport||[],so(o)?o:[],e&&i?sm(e):[])}}function sf(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function sb(e){let t=sp(e),i=parseFloat(t.width)||0,r=parseFloat(t.height)||0,o=si(e),s=o?e.offsetWidth:i,a=o?e.offsetHeight:r,c=oD(i)!==s||oD(r)!==a;return c&&(i=s,r=a),{width:i,height:r,$:c}}function sv(e){return st(e)?e:e.contextElement}function s_(e){let t=sv(e);if(!si(t))return oB(1);let i=t.getBoundingClientRect(),{width:r,height:o,$:s}=sb(t),a=(s?oD(i.width):i.width)/r,c=(s?oD(i.height):i.height)/o;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let sy=oB(0);function sw(e){let t=o8(e);return sh()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:sy}function sk(e,t,i,r){var o;void 0===t&&(t=!1),void 0===i&&(i=!1);let s=e.getBoundingClientRect(),a=sv(e),c=oB(1);t&&(r?st(r)&&(c=s_(r)):c=s_(e));let h=(void 0===(o=i)&&(o=!1),r&&(!o||r===o8(a))&&o)?sw(a):oB(0),p=(s.left+h.x)/c.x,u=(s.top+h.y)/c.y,g=s.width/c.x,m=s.height/c.y;if(a){let e=o8(a),t=r&&st(r)?o8(r):r,i=e,o=sf(i);for(;o&&r&&t!==i;){let e=s_(o),t=o.getBoundingClientRect(),r=sp(o),s=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,a=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;p*=e.x,u*=e.y,g*=e.x,m*=e.y,p+=s,u+=a,o=sf(i=o8(o))}}return o0({width:g,height:m,x:p,y:u})}function sx(e,t){let i=su(e).scrollLeft;return t?t.left+i:sk(o9(e)).left+i}function s$(e,t){let i=e.getBoundingClientRect();return{x:i.left+t.scrollLeft-sx(e,i),y:i.top+t.scrollTop}}function sC(e,t,i){var r;let o;if("viewport"===t)o=function(e,t){let i=o8(e),r=o9(e),o=i.visualViewport,s=r.clientWidth,a=r.clientHeight,c=0,h=0;if(o){s=o.width,a=o.height;let e=sh();(!e||e&&"fixed"===t)&&(c=o.offsetLeft,h=o.offsetTop)}let p=sx(r);if(p<=0){let e=r.ownerDocument,t=e.body,i=getComputedStyle(t),o="CSS1Compat"===e.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,a=Math.abs(r.clientWidth-t.clientWidth-o);a<=25&&(s-=a)}else p<=25&&(s+=p);return{width:s,height:a,x:c,y:h}}(e,i);else if("document"===t){let t,i,s,a,c,h,p;r=o9(e),t=o9(r),i=su(r),s=r.ownerDocument.body,a=oO(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),c=oO(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight),h=-i.scrollLeft+sx(r),p=-i.scrollTop,"rtl"===sp(s).direction&&(h+=oO(t.clientWidth,s.clientWidth)-a),o={width:a,height:c,x:h,y:p}}else if(st(t)){let e,r,s,a,c,h;r=(e=sk(t,!0,"fixed"===i)).top+t.clientTop,s=e.left+t.clientLeft,a=si(t)?s_(t):oB(1),c=t.clientWidth*a.x,h=t.clientHeight*a.y,o={width:c,height:h,x:s*a.x,y:r*a.y}}else{let i=sw(e);o={x:t.x-i.x,y:t.y-i.y,width:t.width,height:t.height}}return o0(o)}function sS(e){return"static"===sp(e).position}function sE(e,t){if(!si(e)||"fixed"===sp(e).position)return null;if(t)return t(e);let i=e.offsetParent;return o9(e)===i&&(i=i.ownerDocument.body),i}function sA(e,t){var i;let r=o8(e);if(ss(e))return r;if(!si(e)){let t=sg(e);for(;t&&!sd(t);){if(st(t)&&!sS(t))return t;t=sg(t)}return r}let o=sE(e,t);for(;o&&(i=o,/^(table|td|th)$/.test(o7(i)))&&sS(o);)o=sE(o,t);return o&&sd(o)&&sS(o)&&!sc(o)?r:o||function(e){let t=sg(e);for(;si(t)&&!sd(t);){if(sc(t))return t;if(ss(t))break;t=sg(t)}return null}(e)||r}let sP=async function(e){let t=this.getOffsetParent||sA,i=this.getDimensions,r=await i(e.floating);return{reference:function(e,t,i){let r=si(t),o=o9(t),s="fixed"===i,a=sk(e,!0,s,t),c={scrollLeft:0,scrollTop:0},h=oB(0);if(r||!r&&!s)if(("body"!==o7(t)||so(o))&&(c=su(t)),r){let e=sk(t,!0,s,t);h.x=e.x+t.clientLeft,h.y=e.y+t.clientTop}else o&&(h.x=sx(o));s&&!r&&o&&(h.x=sx(o));let p=!o||r||s?oB(0):s$(o,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},sz={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:i,offsetParent:r,strategy:o}=e,s="fixed"===o,a=o9(r),c=!!t&&ss(t.floating);if(r===a||c&&s)return i;let h={scrollLeft:0,scrollTop:0},p=oB(1),u=oB(0),g=si(r);if((g||!g&&!s)&&(("body"!==o7(r)||so(a))&&(h=su(r)),g)){let e=sk(r);p=s_(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let m=!a||g||s?oB(0):s$(a,h);return{width:i.width*p.x,height:i.height*p.y,x:i.x*p.x-h.scrollLeft*p.x+u.x+m.x,y:i.y*p.y-h.scrollTop*p.y+u.y+m.y}},getDocumentElement:o9,getClippingRect:function(e){let{element:t,boundary:i,rootBoundary:r,strategy:o}=e,s=[..."clippingAncestors"===i?ss(t)?[]:function(e,t){let i=t.get(e);if(i)return i;let r=sm(e,[],!1).filter(e=>st(e)&&"body"!==o7(e)),o=null,s="fixed"===sp(e).position,a=s?sg(e):e;for(;st(a)&&!sd(a);){let t=sp(a),i=sc(a);i||"fixed"!==t.position||(o=null),(s?i||o:!(!i&&"static"===t.position&&o&&("absolute"===o.position||"fixed"===o.position)||so(a)&&!i&&function e(t,i){let r=sg(t);return!(r===i||!st(r)||sd(r))&&("fixed"===sp(r).position||e(r,i))}(e,a)))?o=t:r=r.filter(e=>e!==a),a=sg(a)}return t.set(e,r),r}(t,this._c):[].concat(i),r],a=sC(t,s[0],o),c=a.top,h=a.right,p=a.bottom,u=a.left;for(let e=1;e<s.length;e++){let i=sC(t,s[e],o);c=oO(i.top,c),h=oj(i.right,h),p=oj(i.bottom,p),u=oO(i.left,u)}return{width:h-u,height:p-c,x:u,y:c}},getOffsetParent:sA,getElementRects:sP,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:i}=sb(e);return{width:t,height:i}},getScale:s_,isElement:st,isRTL:function(e){return"rtl"===sp(e).direction}};function sR(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}let sI=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var i,r;let o,s,{placement:a,rects:c,platform:h,elements:p}=t,{apply:u=()=>{},...g}=oN(e,t),m=await h.detectOverflow(t,g),f=oq(a),b=oU(a),v="y"===oV(a),{width:_,height:w}=c.floating;"top"===f||"bottom"===f?(o=f,s=b===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(s=f,o="end"===b?"top":"bottom");let x=w-m.top-m.bottom,$=_-m.left-m.right,C=oj(w-m[o],x),S=oj(_-m[s],$),E=!t.middlewareData.shift,A=C,P=S;if(null!=(i=t.middlewareData.shift)&&i.enabled.x&&(P=$),null!=(r=t.middlewareData.shift)&&r.enabled.y&&(A=x),E&&!b){let e=oO(m.left,0),t=oO(m.right,0),i=oO(m.top,0),r=oO(m.bottom,0);v?P=_-2*(0!==e||0!==t?e+t:oO(m.left,m.right)):A=w-2*(0!==i||0!==r?i+r:oO(m.top,m.bottom))}await u({...t,availableWidth:P,availableHeight:A});let T=await h.getDimensions(p.floating);return _!==T.width||w!==T.height?{reset:{rects:!0}}:{}}}};function sT(e){var t=e;for(let e=t;e;e=sM(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=sM(t);e;e=sM(e)){if(!(e instanceof Element))continue;let t=getComputedStyle(e);if("contents"!==t.display&&("static"!==t.position||sc(t)||"BODY"===e.tagName))return e}return null}function sM(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function sj(e){return null!==e&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e instanceof Element)}var sO=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),sD=class extends oM{constructor(){super(...arguments),this.localize=new oE(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),r=0,o=0,s=0,a=0,c=0,h=0,p=0,u=0;i?e.top<t.top?(r=e.left,o=e.bottom,s=e.right,a=e.bottom,c=t.left,h=t.top,p=t.right,u=t.top):(r=t.left,o=t.bottom,s=t.right,a=t.bottom,c=e.left,h=e.top,p=e.right,u=e.top):e.left<t.left?(r=e.right,o=e.top,s=t.left,a=t.top,c=e.right,h=e.bottom,p=t.left,u=t.bottom):(r=t.right,o=t.top,s=e.left,a=e.top,c=t.right,h=t.bottom,p=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||sj(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(e,t,i,r){let o;void 0===r&&(r={});let{ancestorScroll:s=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=r,u=sv(e),g=s||a?[...u?sm(u):[],...t?sm(t):[]]:[];g.forEach(e=>{s&&e.addEventListener("scroll",i,{passive:!0}),a&&e.addEventListener("resize",i)});let m=u&&h?function(e,t){let i,r=null,o=o9(e);function s(){var e;clearTimeout(i),null==(e=r)||e.disconnect(),r=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),s();let p=e.getBoundingClientRect(),{left:u,top:g,width:m,height:f}=p;if(c||t(),!m||!f)return;let b={rootMargin:-oL(g)+"px "+-oL(o.clientWidth-(u+m))+"px "+-oL(o.clientHeight-(g+f))+"px "+-oL(u)+"px",threshold:oO(0,oj(1,h))||1},v=!0;function _(t){let r=t[0].intersectionRatio;if(r!==h){if(!v)return a();r?a(!1,r):i=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==r||sR(p,e.getBoundingClientRect())||a(),v=!1}try{r=new IntersectionObserver(_,{...b,root:o.ownerDocument})}catch{r=new IntersectionObserver(_,b)}r.observe(e)}(!0),s}(u,i):null,f=-1,b=null;c&&(b=new ResizeObserver(e=>{let[r]=e;r&&r.target===u&&b&&t&&(b.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;null==(e=b)||e.observe(t)})),i()}),u&&!p&&b.observe(u),t&&b.observe(t));let v=p?sk(e):null;return p&&function t(){let r=sk(e);v&&!sR(v,r)&&i(),v=r,o=requestAnimationFrame(t)}(),i(),()=>{var e;g.forEach(e=>{s&&e.removeEventListener("scroll",i),a&&e.removeEventListener("resize",i)}),null==m||m(),null==(e=b)||e.disconnect(),b=null,p&&cancelAnimationFrame(o)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,i,r,o,s;let a,c,h,p,u;if(!this.active||!this.anchorEl||!this.popup)return;let g=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var i,r;let{x:o,y:s,placement:a,middlewareData:c}=t,h=await o4(t,e);return a===(null==(i=c.offset)?void 0:i.placement)&&null!=(r=c.arrow)&&r.alignmentOffset?{}:{x:o+h.x,y:s+h.y,data:{...h,placement:a}}}}];this.sync?g.push(sI({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),sO&&!sj(this.anchor)&&"scroll"===this.boundary&&(a=sm(this.anchorEl).filter(e=>e instanceof Element)),this.flip&&g.push({name:"flip",options:t={boundary:this.flipBoundary||a,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var i,r,o,s,a,c,h,p;let u,g,m,{placement:f,middlewareData:b,rects:v,initialPlacement:_,platform:w,elements:x}=e,{mainAxis:$=!0,crossAxis:C=!0,fallbackPlacements:S,fallbackStrategy:E="bestFit",fallbackAxisSideDirection:A="none",flipAlignment:P=!0,...T}=oN(t,e);if(null!=(i=b.arrow)&&i.alignmentOffset)return{};let M=oq(f),j=oV(_),O=oq(_)===_,D=await (null==w.isRTL?void 0:w.isRTL(x.floating)),B=S||(O||!P?[oJ(_)]:(u=oJ(_),[oK(_),u,oK(u)])),F="none"!==A;!S&&F&&B.push(...(g=oU(_),m=function(e,t,i){switch(e){case"top":case"bottom":if(i)return t?oZ:oG;return t?oG:oZ;case"left":case"right":return t?oY:oX;default:return[]}}(oq(_),"start"===A,D),g&&(m=m.map(e=>e+"-"+g),P&&(m=m.concat(m.map(oK)))),m));let N=[_,...B],q=await w.detectOverflow(e,T),U=[],W=(null==(r=b.flip)?void 0:r.overflows)||[];if($&&U.push(q[M]),C){let e,t,i,r,o=(c=f,h=v,void 0===(p=D)&&(p=!1),e=oU(c),i=oH(t=oW(oV(c))),r="x"===t?e===(p?"end":"start")?"right":"left":"start"===e?"bottom":"top",h.reference[i]>h.floating[i]&&(r=oJ(r)),[r,oJ(r)]);U.push(q[o[0]],q[o[1]])}if(W=[...W,{placement:f,overflows:U}],!U.every(e=>e<=0)){let e=((null==(o=b.flip)?void 0:o.index)||0)+1,t=N[e];if(t&&("alignment"!==C||j===oV(t)||W.every(e=>oV(e.placement)!==j||e.overflows[0]>0)))return{data:{index:e,overflows:W},reset:{placement:t}};let i=null==(s=W.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:s.placement;if(!i)switch(E){case"bestFit":{let e=null==(a=W.filter(e=>{if(F){let t=oV(e.placement);return t===j||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:a[0];e&&(i=e);break}case"initialPlacement":i=_}if(f!==i)return{reset:{placement:i}}}return{}}}),this.shift&&g.push({name:"shift",options:i={boundary:this.shiftBoundary||a,padding:this.shiftPadding},async fn(e){let{x:t,y:r,placement:o,platform:s}=e,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:e=>{let{x:t,y:i}=e;return{x:t,y:i}}},...p}=oN(i,e),u={x:t,y:r},g=await s.detectOverflow(e,p),m=oV(oq(o)),f=oW(m),b=u[f],v=u[m];if(a){let e="y"===f?"top":"left",t="y"===f?"bottom":"right",i=b+g[e],r=b-g[t];b=oO(i,oj(b,r))}if(c){let e="y"===m?"top":"left",t="y"===m?"bottom":"right",i=v+g[e],r=v-g[t];v=oO(i,oj(v,r))}let _=h.fn({...e,[f]:b,[m]:v});return{..._,data:{x:_.x-t,y:_.y-r,enabled:{[f]:a,[m]:c}}}}}),this.autoSize?g.push(sI({boundary:this.autoSizeBoundary||a,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&g.push({name:"arrow",options:c={element:this.arrowEl,padding:this.arrowPadding},async fn(e){let{x:t,y:i,placement:r,rects:o,platform:s,elements:a,middlewareData:h}=e,{element:p,padding:u=0}=oN(c,e)||{};if(null==p)return{};let g=oQ(u),m={x:t,y:i},f=oW(oV(r)),b=oH(f),v=await s.getDimensions(p),_="y"===f,w=_?"clientHeight":"clientWidth",x=o.reference[b]+o.reference[f]-m[f]-o.floating[b],$=m[f]-o.reference[f],C=await (null==s.getOffsetParent?void 0:s.getOffsetParent(p)),S=C?C[w]:0;S&&await (null==s.isElement?void 0:s.isElement(C))||(S=a.floating[w]||o.floating[b]);let E=S/2-v[b]/2-1,A=oj(g[_?"top":"left"],E),P=oj(g[_?"bottom":"right"],E),T=S-v[b]-P,M=S/2-v[b]/2+(x/2-$/2),j=oO(A,oj(M,T)),O=!h.arrow&&null!=oU(r)&&M!==j&&o.reference[b]/2-(M<A?A:P)-v[b]/2<0,D=O?M<A?M-A:M-T:0;return{[f]:m[f]+D,data:{[f]:j,centerOffset:M-j-D,...O&&{alignmentOffset:D}},reset:O}}});let m=sO?e=>sz.getOffsetParent(e,sT):sz.getOffsetParent;(r=this.anchorEl,o=this.popup,s={placement:this.placement,middleware:g,strategy:sO?"absolute":"fixed",platform:{...sz,getOffsetParent:m}},h=new Map,u={...(p={platform:sz,...s}).platform,_c:h},o5(r,o,{...p,platform:u})).then(({x:e,y:t,middlewareData:i,placement:r})=>{let o="rtl"===this.localize.dir(),s={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=i.arrow.x,t=i.arrow.y,r="",a="",c="",h="";if("start"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=o?i:"",h=o?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=o?"":i,h=o?i:"",c="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",r="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof e?`${e}px`:"",r="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:r,right:a,bottom:c,left:h,[s]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new ob)}render(){return eC`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${on({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${on({popup:!0,"popup-active":this.active,"popup-fixed":!sO,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?eC`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};sD.css=ov,oR([eq(".popup")],sD.prototype,"popup",2),oR([eq(".arrow")],sD.prototype,"arrowEl",2),oR([eB()],sD.prototype,"anchor",2),oR([eB({type:Boolean,reflect:!0})],sD.prototype,"active",2),oR([eB({reflect:!0})],sD.prototype,"placement",2),oR([eB()],sD.prototype,"boundary",2),oR([eB({type:Number})],sD.prototype,"distance",2),oR([eB({type:Number})],sD.prototype,"skidding",2),oR([eB({type:Boolean})],sD.prototype,"arrow",2),oR([eB({attribute:"arrow-placement"})],sD.prototype,"arrowPlacement",2),oR([eB({attribute:"arrow-padding",type:Number})],sD.prototype,"arrowPadding",2),oR([eB({type:Boolean})],sD.prototype,"flip",2),oR([eB({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],sD.prototype,"flipFallbackPlacements",2),oR([eB({attribute:"flip-fallback-strategy"})],sD.prototype,"flipFallbackStrategy",2),oR([eB({type:Object})],sD.prototype,"flipBoundary",2),oR([eB({attribute:"flip-padding",type:Number})],sD.prototype,"flipPadding",2),oR([eB({type:Boolean})],sD.prototype,"shift",2),oR([eB({type:Object})],sD.prototype,"shiftBoundary",2),oR([eB({attribute:"shift-padding",type:Number})],sD.prototype,"shiftPadding",2),oR([eB({attribute:"auto-size"})],sD.prototype,"autoSize",2),oR([eB()],sD.prototype,"sync",2),oR([eB({type:Object})],sD.prototype,"autoSizeBoundary",2),oR([eB({attribute:"auto-size-padding",type:Number})],sD.prototype,"autoSizePadding",2),oR([eB({attribute:"hover-bridge",type:Boolean})],sD.prototype,"hoverBridge",2),sD=oR([eD("wa-popup")],sD);var sL=Object.defineProperty,sB=Object.getOwnPropertyDescriptor,sF=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sB(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sL(t,i,s),s};let sN=0,sq=[],sU=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.showDelay=500,this.hideDelay=0,this.suppressed=!1,this.open=!1,this.bodyId=`gl-tooltip-${++sN}`,this.onAnchorSlotChange=e=>{let t=e.target.assignedElements({flatten:!0})[0];t!==this.anchorEl&&(this.detachAnchor(),this.attachAnchor(t))},this.onDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&sq.at(-1)===this&&(e.preventDefault(),e.stopPropagation(),this.open=!1)},this.onMouseOver=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!0},this.showDelay))},this.onMouseOut=()=>{this.anchorEl?.matches(":hover")||this.matches(":hover")||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!1},this.hideDelay))},this.onFocusIn=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.open=!0)},this.onFocusOut=()=>{clearTimeout(this.hoverTimeout),this.open=!1},this.onMouseDown=e=>{this.suppressed=!0,this.open=!1},this.onMouseUp=e=>{this.suppressed=!1},this.onDragStart=e=>{this.suppressed=!0,this.open=!1},this.onDragEnd=e=>{this.suppressed=!1},this.onClick=e=>{this.hideOnClick&&(this.open=!1)}}connectedCallback(){super.connectedCallback?.(),this.eventController=new AbortController;let{signal:e}=this.eventController;this.addEventListener("mouseover",this.onMouseOver,{signal:e}),this.addEventListener("mouseout",this.onMouseOut,{signal:e}),this.addEventListener("focusin",this.onFocusIn,{signal:e}),this.addEventListener("focusout",this.onFocusOut,{signal:e}),this.addEventListener("mousedown",this.onMouseDown,{signal:e}),this.addEventListener("click",this.onClick,{signal:e}),window.addEventListener("mouseup",this.onMouseUp,{signal:e}),window.addEventListener("dragstart",this.onDragStart,{capture:!0,signal:e}),window.addEventListener("dragend",this.onDragEnd,{capture:!0,signal:e})}disconnectedCallback(){this.eventController?.abort(),this.eventController=void 0,this.detachAnchor(),this.unregisterDismissible(),clearTimeout(this.hoverTimeout),super.disconnectedCallback?.()}updated(e){e.has("open")&&(this.open?this.registerDismissible():this.unregisterDismissible()),e.has("disabled")&&this.disabled&&this.open&&(this.open=!1)}attachAnchor(e){null!=e&&(this.anchorEl=e,this.addAriaDescribedBy(e,this.bodyId))}detachAnchor(){null!=this.anchorEl&&(this.removeAriaDescribedBy(this.anchorEl,this.bodyId),this.anchorEl=void 0)}addAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);i.includes(t)||(i.push(t),e.setAttribute("aria-describedby",i.join(" ")))}removeAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean).filter(e=>e!==t);0===i.length?e.removeAttribute("aria-describedby"):e.setAttribute("aria-describedby",i.join(" "))}registerDismissible(){sq.includes(this)||(sq.push(this),document.addEventListener("keydown",this.onDocumentKeyDown,{signal:this.eventController?.signal}))}unregisterDismissible(){let e=sq.indexOf(this);-1!==e&&sq.splice(e,1),document.removeEventListener("keydown",this.onDocumentKeyDown)}async hide(){this.open=!1,await this.updateComplete}async show(){this.disabled||this.suppressed||(this.open=!0,await this.updateComplete)}render(){return eC`<wa-popup
			part="base"
			exportparts="
				popup:base__popup,
				arrow:base__arrow
			"
			class="tooltip"
			placement=${this.placement}
			distance=${this.distance}
			?active=${this.open&&!this.disabled&&!this.suppressed}
			flip
			flip-padding="3"
			shift
			shift-padding="3"
			auto-size="horizontal"
			auto-size-padding="3"
			arrow
			hover-bridge
		>
			<slot slot="anchor" @slotchange=${this.onAnchorSlotChange}></slot>
			<div
				part="body"
				id=${this.bodyId}
				class="tooltip__body"
				role="tooltip"
				aria-live=${this.open?"polite":"off"}
			>
				<slot name="content">${of(this.content)}</slot>
			</div>
		</wa-popup>`}};sU.styles=F`
		:host {
			--max-width: var(--gl-tooltip-max-width, 320px);

			display: contents;
			max-width: inherit;
			overflow: inherit;
			text-transform: var(--gl-tooltip-text-transform, none);
		}

		.tooltip {
			--arrow-size: var(--wa-tooltip-arrow-size);
			--arrow-color: var(--wa-tooltip-background-color);
			/* tells wa-popup to overlap the arrow with the inside edge of our 1px body
			   border, so the arrow base aligns with the body's content area instead of
			   sitting on top of the border line */
			--popup-border-width: 1px;
		}

		.tooltip::part(popup) {
			z-index: var(--wa-z-index-tooltip);
			pointer-events: none;
		}

		.tooltip__body {
			max-width: min(var(--auto-size-available-width, 100vw), var(--max-width));
			border: 1px solid var(--gl-tooltip-border-color);
			border-radius: var(--wa-tooltip-border-radius);
			background-color: var(--wa-tooltip-background-color);
			box-shadow: 0 2px 8px var(--gl-tooltip-shadow);
			color: var(--wa-tooltip-color);
			font-family: var(--wa-tooltip-font-family);
			font-size: var(--wa-tooltip-font-size);
			font-weight: var(--wa-tooltip-font-weight);
			line-height: var(--wa-tooltip-line-height);
			padding: var(--wa-tooltip-padding);
			text-align: start;
			text-transform: var(--gl-tooltip-text-transform, none);
			white-space: normal;
			user-select: none;
			-webkit-user-select: none;
		}

		[slot='content'] hr {
			border: none;
			border-top: 1px solid var(--color-foreground--25);
		}
	`,sF([eB()],sU.prototype,"content",2),sF([eB({reflect:!0})],sU.prototype,"placement",2),sF([eB({type:Boolean})],sU.prototype,"disabled",2),sF([eB({type:Number})],sU.prototype,"distance",2),sF([eB({type:Number,attribute:"show-delay"})],sU.prototype,"showDelay",2),sF([eB({type:Number,attribute:"hide-delay"})],sU.prototype,"hideDelay",2),sF([eB({type:Boolean,attribute:"hide-on-click"})],sU.prototype,"hideOnClick",2),sF([eq("wa-popup")],sU.prototype,"popup",2),sF([eF()],sU.prototype,"suppressed",2),sF([eF()],sU.prototype,"open",2),sU=sF([eD("gl-tooltip")],sU);var sW=Object.defineProperty,sH=Object.getOwnPropertyDescriptor,sV=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sH(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sW(t,i,s),s};let sK=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1,this.ariaLabel=null}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(e){if(e.has("href")&&this.setAttribute("role",this.href?"link":"button"),e.has("disabled")){let t=e.get("disabled");t?this.setAttribute("aria-disabled",t.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(e)}render(){return this.tooltip?eC`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??eA}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?eC`<gl-tooltip placement=${this.tooltipPlacement??eA}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?eC`<a
				class="control"
				aria-label=${this.ariaLabel??eA}
				tabindex="${(!1===this.disabled?void 0:-1)??eA}"
				href=${this.href}
				@keypress=${e=>this.onLinkKeypress(e)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:eC`<button
			class="control"
			role=${this.role??eA}
			aria-label=${this.ariaLabel??eA}
			aria-checked=${this.ariaChecked??eA}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(e){" "===e.key&&this.control.click()}focus(e){this.control.focus(e)}blur(){this.control.blur()}click(){this.control.click()}};sK.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sK.styles=[op,F`
			:host {
				/* Base color variables - can be overridden by variant */
				--button-foreground: var(--vscode-button-foreground);
				--button-background: var(--vscode-button-background);
				--button-hover-background: var(--vscode-button-hoverBackground);
				--button-border: var(--vscode-button-border, transparent);

				/* Layout variables */
				--button-width: max-content;
				--button-padding: 0.4rem;
				--button-gap: 0.6rem;
				--button-compact-padding: 0.4rem;
				--button-input-padding: 0.1rem;
				--button-tight-padding: 0.4rem 0.8rem;
				--button-line-height: 1.35;

				display: inline-block;
				width: var(--button-width);
				border: none;
				font-family: inherit;
				font-size: inherit;
				line-height: var(--button-line-height);
				text-align: center;
				text-decoration: none;
				user-select: none;
				background: var(--button-background);
				color: var(--button-foreground);
				cursor: pointer;
				border: 1px solid var(--button-border);
				border-radius: var(--gk-action-radius, 0.3rem);
				-webkit-font-smoothing: auto;
			}

			.control {
				box-sizing: border-box;
				display: inline-flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				gap: var(--button-gap);
				padding: var(--button-padding);
				line-height: var(--button-line-height);
				font-family: inherit;
				font-size: inherit;

				color: inherit;
				text-decoration: none;

				width: var(--button-width);
				max-width: 100%;
				height: 100%;
				cursor: pointer;
			}

			/* When truncate is enabled, allow the control to shrink */
			:host([truncate]) .control {
				min-width: 0;
			}

			button.control {
				appearance: none;
				background: transparent;
				border: none;
			}

			.control:focus {
				outline: none;
			}

			.label {
				display: inline-flex;
				align-items: center;
				max-width: 100%;
			}

			/* Text truncation option - enabled via truncate attribute */
			:host([truncate]) .label {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: block; /* Change from flex to block for ellipsis to work */
			}

			:host(:hover) {
				background: var(--button-hover-background);
			}

			:host(:focus-within) {
				${od}
			}

			:host([appearance='input']),
			:host([role='checkbox']:focus-within),
			:host([aria-checked]:focus-within) {
				outline-offset: -1px;
			}

			:host([full]),
			:host([full]) .control {
				width: 100%;
			}

			:host([appearance='secondary']) {
				--button-background: var(--vscode-button-secondaryBackground);
				--button-foreground: var(--vscode-button-secondaryForeground);
				--button-hover-background: var(--vscode-button-secondaryHoverBackground);
			}

			:host([appearance='input']),
			:host([appearance='toolbar']) {
				--button-background: transparent;
				--button-foreground: var(--vscode-foreground);
				--button-hover-background: var(--vscode-toolbar-hoverBackground);
				--button-border: transparent;
			}

			:host([appearance='alert']) {
				--button-background: transparent;
				--button-border: var(--color-alert-infoBorder);
				--button-foreground: var(--color-alert-infoForeground);
				--button-hover-background: var(--color-alert-infoBorder);
				--button-line-height: 1.64;
				width: max-content;
			}

			:host([appearance='alert']:hover) {
				--button-foreground: var(--vscode-button-foreground);
			}

			/* Variant property for semantic states - appearance controls structure, variant controls color */

			/* Solid buttons (default and secondary) with variants get full color treatment */
			:host([variant='danger']) {
				--button-foreground: var(--vscode-errorForeground, #f48771);
				--button-background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
				--button-hover-background: color-mix(
					in srgb,
					#000 30%,
					var(--vscode-inputValidation-errorBorder, #be1100)
				);
				--button-border: var(--vscode-inputValidation-errorBorder, #be1100);
			}

			:host([variant='warning']) {
				--button-foreground: #fff;
				--button-background: var(
					--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor,
					#cc6600
				);
				--button-hover-background: color-mix(
					in srgb,
					#000 20%,
					var(--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor, #cc6600)
				);
				--button-border: var(
					--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor,
					#cc6600
				);
			}

			:host([variant='success']) {
				--button-foreground: #fff;
				--button-background: color-mix(in srgb, #000 40%, var(--vscode-testing-iconPassed, #73c991));
				--button-hover-background: color-mix(in srgb, #000 30%, var(--vscode-testing-iconPassed, #73c991));
				--button-border: color-mix(in srgb, #000 40%, var(--vscode-testing-iconPassed, #73c991));
			}

			/* Transparent appearances (toolbar, input, alert) with variants only change foreground color */
			/* These come after the main variant rules to override background/border back to transparent */
			:host([appearance='toolbar'][variant='danger']),
			:host([appearance='input'][variant='danger']),
			:host([appearance='alert'][variant='danger']) {
				--button-foreground: var(--vscode-errorForeground, #f48771);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='toolbar'][variant='warning']),
			:host([appearance='input'][variant='warning']),
			:host([appearance='alert'][variant='warning']) {
				--button-foreground: var(
					--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor,
					#cc6600
				);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='toolbar'][variant='success']),
			:host([appearance='input'][variant='success']),
			:host([appearance='alert'][variant='success']) {
				--button-foreground: var(--vscode-testing-iconPassed, #73c991);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='input']) .control {
				padding: var(--button-input-padding);
				--button-line-height: 1.1;
				height: var(--button-input-height, 1.8rem);
				gap: 0.2rem;
			}

			:host([appearance='input'][href]) > a,
			:host([appearance='toolbar'][href]) > a {
				display: flex;
				align-items: center;
			}

			:host([appearance='alert'][href]) > a {
				display: block;
				width: max-content;
			}

			/* Give solid-filled buttons a bit more horizontal breathing room */
			:host(:not([appearance])) .control,
			:host([appearance='secondary']) .control {
				padding-inline: 0.8rem;
			}

			:host([density='compact']) .control {
				padding: var(--button-compact-padding);
			}

			:host([density='tight']) .control {
				padding: var(--button-tight-padding);
			}

			:host([density='tight']) .control ::slotted(code-icon) {
				--code-icon-size: 11px;
				--code-icon-v-align: unset;
			}

			:host([aria-checked]:hover:not([disabled]):not([aria-checked='true'])) {
				background-color: var(--vscode-inputOption-hoverBackground);
			}

			:host([disabled]) {
				opacity: 0.4;
				cursor: not-allowed;
				pointer-events: none;
			}

			:host([disabled][aria-checked='true']) {
				opacity: 0.8;
			}

			:host([aria-checked='true']) {
				background-color: var(--vscode-inputOption-activeBackground);
				color: var(--vscode-inputOption-activeForeground);
				border-color: var(--vscode-inputOption-activeBorder);
			}

			gl-tooltip {
				height: 100%;
				width: 100%;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
		`],sV([eq(".control")],sK.prototype,"control",2),sV([eB({reflect:!0})],sK.prototype,"appearance",2),sV([eB({reflect:!0})],sK.prototype,"variant",2),sV([eB({type:Boolean,reflect:!0})],sK.prototype,"disabled",2),sV([eB({reflect:!0})],sK.prototype,"density",2),sV([eB({type:Boolean,reflect:!0})],sK.prototype,"full",2),sV([eB()],sK.prototype,"href",2),sV([eB()],sK.prototype,"tooltip",2),sV([eB()],sK.prototype,"tooltipPlacement",2),sV([eB({type:Boolean,reflect:!0})],sK.prototype,"truncate",2),sV([eB({type:String,attribute:"aria-label"})],sK.prototype,"ariaLabel",2),sK=sV([eD("gl-button")],sK);var sG=Object.defineProperty,sZ=Object.getOwnPropertyDescriptor,sY=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sZ(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sG(t,i,s),s};let sX=class extends lit_element_i{constructor(){super(...arguments),this.display="solid",this.dismissible=!1,this.layout="default"}get classNames(){return{banner:!0,[`banner--${this.display}`]:!0,[`banner--${this.layout}`]:"default"!==this.layout}}render(){return eC`<div part="base" class=${on(this.classNames)}>
			<div class="banner__content">
				${"responsive"===this.layout?this.renderResponsiveContent():this.renderDefaultContent()}
			</div>
			${"responsive"!==this.layout?this.renderDismissButton():void 0}
		</div>`}renderDefaultContent(){return eC`${this.renderTitle()} ${this.renderBody()} ${this.renderButtons()}`}renderResponsiveContent(){return eC`
			<div class="banner__text">${this.renderTitle()} ${this.renderBody()}</div>
			${this.renderButtons()} ${this.renderDismissButton()}
		`}renderTitle(){if(this.bannerTitle)return eC`<div class="banner__title">${this.bannerTitle}</div>`}renderBody(){if(this.body)return eC`<div class="banner__body">${oa(this.body)}</div>`}renderButtons(){let e=this.renderPrimaryButton(),t=this.renderSecondaryButton();if(e||t)return eC`<div class="banner__buttons">${e} ${t}</div>`}renderPrimaryButton(){if(this.primaryButton)return eC`
			<gl-button
				class="banner__button banner__button--primary"
				appearance=${"gradient-purple"===this.display?"secondary":void 0}
				?full=${"gradient-purple"===this.display}
				href=${this.primaryButtonHref??eA}
				truncate
				@click=${this.onPrimaryButtonClick}
			>
				${this.primaryButton}
			</gl-button>
		`}renderSecondaryButton(){if(this.secondaryButton)return eC`
			<gl-button
				class="banner__button banner__button--secondary"
				appearance="toolbar"
				href=${this.secondaryButtonHref??eA}
				@click=${this.onSecondaryButtonClick}
			>
				${this.secondaryButton}
			</gl-button>
		`}renderDismissButton(){if(this.dismissible)return eC`
			<gl-button
				class="banner__dismiss"
				appearance="toolbar"
				href=${this.dismissHref??eA}
				aria-label="Dismiss"
				tooltip="Dismiss"
				@click=${this.onDismissClick}
			>
				<code-icon icon="close"></code-icon>
			</gl-button>
		`}onPrimaryButtonClick(e){this.primaryButtonCommand&&e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-primary-click",{detail:{command:this.primaryButtonCommand},bubbles:!0,composed:!0}))}onSecondaryButtonClick(e){this.secondaryButtonCommand&&e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-secondary-click",{detail:{command:this.secondaryButtonCommand},bubbles:!0,composed:!0}))}onDismissClick(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-dismiss",{bubbles:!0,composed:!0}))}};sX.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sX.styles=[ol],sY([eB({reflect:!0})],sX.prototype,"display",2),sY([eB({attribute:"banner-title"})],sX.prototype,"bannerTitle",2),sY([eB()],sX.prototype,"body",2),sY([eB({attribute:"primary-button"})],sX.prototype,"primaryButton",2),sY([eB({attribute:"primary-button-href"})],sX.prototype,"primaryButtonHref",2),sY([eB({attribute:"primary-button-command"})],sX.prototype,"primaryButtonCommand",2),sY([eB({attribute:"secondary-button"})],sX.prototype,"secondaryButton",2),sY([eB({attribute:"secondary-button-href"})],sX.prototype,"secondaryButtonHref",2),sY([eB({attribute:"secondary-button-command"})],sX.prototype,"secondaryButtonCommand",2),sY([eB({type:Boolean,attribute:"dismissible"})],sX.prototype,"dismissible",2),sY([eB({attribute:"dismiss-href"})],sX.prototype,"dismissHref",2),sY([eB({attribute:"layout"})],sX.prototype,"layout",2),sX=sY([eD("gl-banner")],sX);var sJ=Object.defineProperty,sQ=Object.getOwnPropertyDescriptor,s0=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sQ(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sJ(t,i,s),s};let s1=class extends tk(lit_element_i){render(){let e=this.error.get();return e?eC`<gl-banner
			display="solid"
			banner-title="Something went wrong"
			.body=${e}
			dismissible
			@gl-banner-dismiss=${()=>this.error.set(void 0)}
		></gl-banner>`:eA}};s0([eB({attribute:!1})],s1.prototype,"error",2),s1=s0([eD("gl-error-banner")],s1);let s2=F`
	/*
	:host {
		display: inline-block;
	}
    */

	.indicator {
		box-sizing: border-box;
		display: inline-block;
		border-radius: calc(var(--gl-indicator-size, 0.8rem) * 2);
		width: var(--gl-indicator-size, 0.8rem);
		aspect-ratio: 1;
		background-color: var(--gl-indicator-color);
		vertical-align: text-bottom;
	}
`,s5=F`
	.indicator--pulse {
		animation: 1.5s ease 0s infinite normal none running pulse;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 var(--gl-indicator-pulse-color);
		}
		70% {
			box-shadow: 0 0 0 var(--gl-indicator-size, 0.8rem) transparent;
		}
		100% {
			box-shadow: 0 0 0 0 transparent;
		}
	}
`;var s3=Object.defineProperty,s4=Object.getOwnPropertyDescriptor,s6=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?s4(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&s3(t,i,s),s};let s7=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return eC`<slot class="indicator${this.pulse?" indicator--pulse":""}"></slot>`}};s7.styles=[s2,s5],s6([eB({type:Boolean})],s7.prototype,"pulse",2),s7=s6([eD("gl-indicator")],s7);let s8=F`
	:host {
		box-sizing: border-box;
		display: inline-block;
		vertical-align: text-bottom;
	}

	.pill {
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.2rem 0.5rem;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		color: var(--gl-pill-foreground, var(--vscode-foreground));
		background-color: var(--gl-pill-background, var(--vscode-editorWidget-background));
		white-space: nowrap;
	}

	.pill--outlined {
		padding: 0.1rem 0.4rem;
		background-color: transparent;
		border: 1px solid var(--gl-pill-border, var(--vscode-foreground));
	}
`;var s9=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,nt=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ne(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&s9(t,i,s),s};let ni=class extends lit_element_i{constructor(){super(...arguments),this.ahead=0,this.behind=0,this.working=0,this.alwaysShow=!1,this.outlined=!1,this.colorized=!1,this.missingUpstream=!1}render(){return 0===this.ahead&&0===this.behind&&0===this.working?this.alwaysShow?this.missingUpstream?eC`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
					<span class="state${this.colorized?" state--missing":""}"
						><code-icon icon="error"></code-icon></span
				></span>`:eC`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
				<span class="state${this.colorized?" state--ahead":""}"><code-icon icon="check"></code-icon></span>
			</span>`:eA:eC`<span part="base" class="pill${this.outlined?" pill--outlined":""}"
			>${eU(this.behind>0,()=>eC`<span class="state${this.colorized?" state--behind":""}"
						>${this.behind}<code-icon icon="arrow-down"></code-icon
					></span>`)}${eU(this.ahead>0,()=>eC`<span class="state${this.colorized?" state--ahead":""}"
						>${this.ahead}<code-icon icon="arrow-up"></code-icon
					></span>`)}${eU(this.working>0,()=>eC`<span class="state${this.colorized?" state--working":""}"
						>${this.working}<span class="working">&#177;</span></span
					>`)}</span
		>`}};ni.styles=[s8,F`
			.pill {
				gap: 0.1rem;
				text-transform: none;
			}

			.state {
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}

			.state--missing code-icon {
				color: var(--gl-tracking-missing);
			}

			.state--ahead code-icon {
				color: var(--gl-tracking-ahead);
			}

			.state--behind code-icon {
				color: var(--gl-tracking-behind);
			}

			.state--working .working {
				color: var(--gl-tracking-working);
			}

			.state code-icon {
				font-size: inherit !important;
				line-height: inherit !important;
			}

			.working {
				display: inline-block;
				width: 1rem;
				text-align: center;
				vertical-align: text-bottom;
				font-weight: normal;
			}
		`],nt([eB({type:Number})],ni.prototype,"ahead",2),nt([eB({type:Number})],ni.prototype,"behind",2),nt([eB({type:Number})],ni.prototype,"working",2),nt([eB({type:Boolean,attribute:"always-show"})],ni.prototype,"alwaysShow",2),nt([eB({type:Boolean})],ni.prototype,"outlined",2),nt([eB({type:Boolean})],ni.prototype,"colorized",2),nt([eB({type:Boolean})],ni.prototype,"missingUpstream",2),ni=nt([eD("gl-tracking-pill")],ni);let nr=navigator?.userAgentData?.platform,no=navigator.userAgent;"Linux"===nr||no.includes("Linux");let ns="macOS"===nr||no.includes("Macintosh");function nn(){return ns?"⌥":"Alt"}"Windows"===nr||no.includes("Windows");let na="0000000000000000000000000000000000000000",nl="0000000000000000000000000000000000000000:",nc=/^([\w\-/]+(?:\.[\w\-/]+)*)?(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)?$/,nh=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)$/,nd=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,np=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,nu=/(^[0-9a-f]{40}([\^@~:]\S*)?$)|(^[0]{40}(:|-)$)/,ng=/^(.*?)([\^@~:].*)?$/,nm=/^[0]{40}(?:[\^@~:]\S*)?:?$/,nf=/^[0]{40}([\^@~]\S*)?:$/;function nb(e,t){return!!t&&e.test(t)}function nv(e,t=!1){return e===na||e===nl||!t&&nb(nm,e)}function n_(e,t){if("0000000000000000000000000000000000000000-"===e)return"(deleted)";if(!e)return t?.strings?.working??"";if(nv(e))return!function(e,t=!1){return e===nl||!t&&nb(nf,e)}(e)?t?.strings?.uncommitted??"Working Tree":t?.strings?.uncommittedStaged??"Index";if(function(e,t="any"){if(null==e)return!1;switch(t){case"qualified":return nh.test(e);case"qualified-double-dot":return nd.test(e);case"qualified-triple-dot":return np.test(e);default:return nc.test(e)}}(e)||!nb(nu,e))return e;let i=ng.exec(e);if(null!=i){let[,e,t]=i;if(null!=t)return`${e.substring(0,7)}${t}`}return e.substring(0,7)}function ny(e,t,i={refType:"revision"}){switch(i.refType){case"branch":return{refType:"branch",repoPath:t,ref:e,name:i.name,id:i.id,remote:i.remote,sha:i.sha,upstream:i.upstream,worktree:i.worktree};case"stash":return{refType:"stash",repoPath:t,ref:e,sha:e,name:i.name,stashNumber:i.number,message:i.message,stashOnRef:i.stashOnRef};case"tag":return{refType:"tag",repoPath:t,ref:e,name:i.name,id:i.id,sha:i.sha};default:return{refType:"revision",repoPath:t,ref:e,sha:e,name:i.name??n_(e,{strings:{working:"Working Tree"}}),message:i.message}}}function nw(e,t){return null==t?`command:${e}`:`command:${e}?${encodeURIComponent("string"==typeof t?t:JSON.stringify(t))}`}let nk=F`
	a {
		border: 0;
		color: var(--link-foreground);
		font-weight: 400;
		outline: none;
		text-decoration: var(--link-decoration-default, none);
	}

	a:focus-visible {
		outline: 1px solid var(--color-focus-border);
		border-radius: 0.2rem;
	}

	a:hover {
		color: var(--link-foreground-active);
		text-decoration: underline;
	}
`,nx=F`
	hr {
		border: none;
		border-top: 1px solid var(--color-foreground--25);
	}
`;var n$=Object.defineProperty,nC=Object.getOwnPropertyDescriptor,nS=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nC(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&n$(t,i,s),s};let nE=["top","right","bottom","left","top-left","top-right","bottom-left","bottom-right"],nA=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.autoSizeVertical=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.suppressed=!1,this.handleReposition=()=>{let e=this.popup?.getAttribute("data-current-placement");null!=e&&e!==this._resolvedPlacement&&(this._resolvedPlacement=e)},this.handleResizePointerDown=e=>{if(0!==e.button)return;let t=e.currentTarget,i=t.dataset.handle;if(null==i)return;e.preventDefault();let r="right"===i||"top-right"===i||"bottom-right"===i,o="left"===i||"top-left"===i||"bottom-left"===i,s="bottom"===i||"bottom-left"===i||"bottom-right"===i,a="top"===i||"top-left"===i||"top-right"===i,c=this.body,h=e.clientX,p=e.clientY,u=c.getBoundingClientRect(),g=u.width,m=u.height;t.setPointerCapture(e.pointerId),t.classList.add("popover__resizer--active"),this.toggleAttribute("dragging",!0);let f=e=>{let t=e.clientX-h,i=e.clientY-p;r?c.style.width=`${Math.max(0,g+t)}px`:o&&(c.style.width=`${Math.max(0,g-t)}px`),s?c.style.height=`${Math.max(0,m+i)}px`:a&&(c.style.height=`${Math.max(0,m-i)}px`),this.popup?.reposition()},b=()=>{this.toggleAttribute("dragging",!1),t.classList.remove("popover__resizer--active"),t.removeEventListener("pointermove",f),t.removeEventListener("lostpointercapture",b),t.removeEventListener("pointerup",b)};t.addEventListener("pointermove",f,{passive:!0}),t.addEventListener("lostpointercapture",b),t.addEventListener("pointerup",b)},this.handleTriggerBlur=e=>{this.open&&this.hasTrigger("focus")&&(e.relatedTarget&&this.contains(e.relatedTarget)||this.hide())},this.handleTriggerClick=e=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(e.composedPath().includes(this.body))return;this.hide()}else this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=e=>{this.hasTrigger("click")&&this.hasTrigger("focus")&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,this.open&&"hover"===this._triggeredBy&&!e.composedPath().includes(this.body)&&(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=()=>{this.hasTrigger("focus")&&(this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus"))},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handlePopupBlur=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let e=iv(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let e=iv(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),e)}}}static closeOthers(e){for(let t of nA.openPopovers)t===e||t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINS||t.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,nA.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),this.updateResizeObserver()}updateResizeObserver(){null!=this.resize?null==this.resizeObserver&&null!=this.body&&(this.resizeObserver=new ResizeObserver(()=>this.popup?.reposition()),this.resizeObserver.observe(this.body)):null!=this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}render(){let e=this._resolvedPlacement??this.placement,t=(function(e){if(!e)return[];let t=new Set;for(let i of e.trim().split(/\s+/))switch(i){case"horizontal":t.add("right");break;case"vertical":t.add("bottom");break;case"both":t.add("right"),t.add("bottom"),t.add("bottom-right");break;case"all":for(let e of nE)t.add(e);break;default:nE.includes(i)&&t.add(i)}return[...t]})(this.resize).filter(t=>!function(e,t){let i,r;if(!t)return!1;let[o,s]=t.split("-");switch(o){case"top":i="bottom";break;case"right":i="left";break;case"bottom":i="top";break;case"left":i="right"}let a="left"===o||"right"===o;"start"===s?r=a?"top":"left":"end"===s&&(r=a?"bottom":"right");let c=t=>null!=t&&(e===t||e.startsWith(`${t}-`)||e.endsWith(`-${t}`));return c(i)||c(r)}(t,e));return eC`<wa-popup
			part="base"
			exportparts="
				popup:base__popup,
				arrow:base__arrow,
				hover-bridge:base__hover-bridge
			"
			class="popover"
			.anchor=${this.anchor}
			placement=${this.placement}
			distance=${this.distance}
			skidding=${this.skidding}
			auto-size=${this.autoSizeVertical?"both":"horizontal"}
			auto-size-padding="3"
			flip-padding="3"
			flip
			shift
			?arrow=${this.arrow}
			hover-bridge
			@wa-reposition=${this.handleReposition}
		>
			<div slot="anchor" aria-describedby="popover">
				<slot name="anchor"></slot>
			</div>

			<div
				part="body"
				id="popover"
				class="popover__body scrollable ${"menu"===this.appearance?"is-menu":""}"
				role="tooltip"
				aria-live=${this.open?"polite":"off"}
			>
				<slot name="content"></slot>
				${t.map(e=>eC`<div
							class="popover__resizer popover__resizer--${e}"
							role="separator"
							aria-orientation=${"top"===e||"bottom"===e?"horizontal":"vertical"}
							aria-label="Resize"
							data-handle=${e}
							@pointerdown=${this.handleResizePointerDown}
						></div>`)}
			</div>
		</wa-popup>`}async show(e){if(this.open||this.suppressed){"click"===e&&"hover"===this._triggeredBy&&(this._triggeredBy=e);return}return(null==this._triggeredBy||"hover"!==e)&&(this._triggeredBy=e),nA.closeOthers(this),this.open=!0,nA.openPopovers.add(this),i_(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,nA.openPopovers.delete(this),i_(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(e){return this.trigger.split(" ").includes(e)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleResizeChange(){this.updateResizeObserver()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};nA.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nA.openPopovers=new Set,nA.styles=[ou,F`
			:host {
				--hide-delay: 0ms;
				--show-delay: 500ms;

				display: contents;
			}

			.popover {
				--arrow-size: var(--wa-tooltip-arrow-size);
				--arrow-color: var(--wa-tooltip-background-color);
				/* tells wa-popup to overlap the arrow with the inside edge of our 1px body
				   border, so the arrow base aligns with the body's content area instead of
				   sitting on top of the border line */
				--popup-border-width: 1px;
			}

			.popover::part(popup) {
				z-index: var(--wa-z-index-tooltip);
			}

			.popover[placement^='top']::part(popup) {
				transform-origin: bottom;
			}

			.popover[placement^='bottom']::part(popup) {
				transform-origin: top;
			}

			.popover[placement^='left']::part(popup) {
				transform-origin: right;
			}

			.popover[placement^='right']::part(popup) {
				transform-origin: left;
			}

			.popover__body {
				display: block;
				width: fit-content;
				border: 1px solid var(--gl-tooltip-border-color);
				border-radius: var(--wa-tooltip-border-radius);
				box-shadow: 0 2px 8px var(--gl-tooltip-shadow);
				background-color: var(--wa-tooltip-background-color);
				font-family: var(--wa-tooltip-font-family);
				font-size: var(--wa-tooltip-font-size);
				font-weight: var(--wa-tooltip-font-weight);
				line-height: var(--wa-tooltip-line-height);
				text-align: start;
				white-space: normal;
				color: var(--wa-tooltip-color);
				padding: var(--wa-tooltip-padding);
				user-select: none;
				-webkit-user-select: none;
				max-width: min(var(--auto-size-available-width), var(--max-width, 70vw));
				pointer-events: all;
			}

			:host([auto-size-vertical]) .popover__body {
				max-height: var(--auto-size-available-height);
				display: flex;
				flex-direction: column;
				overflow: hidden;
			}

			:host([resize]) .popover__body {
				position: relative;
			}

			.popover__resizer {
				position: absolute;
				background-color: transparent;
				transition: background-color 0.1s ease-out;
				touch-action: none;
				z-index: 1;
			}

			/* Edges — 4px thick bars */
			.popover__resizer--top {
				top: 0;
				left: 0;
				right: 0;
				height: 4px;
				cursor: ns-resize;
			}
			.popover__resizer--right {
				top: 0;
				right: 0;
				bottom: 0;
				width: 4px;
				cursor: ew-resize;
			}
			.popover__resizer--bottom {
				left: 0;
				right: 0;
				bottom: 0;
				height: 4px;
				cursor: ns-resize;
			}
			.popover__resizer--left {
				top: 0;
				left: 0;
				bottom: 0;
				width: 4px;
				cursor: ew-resize;
			}

			/* Corners — 12px squares, layered above edges */
			.popover__resizer--top-left,
			.popover__resizer--top-right,
			.popover__resizer--bottom-left,
			.popover__resizer--bottom-right {
				width: 12px;
				height: 12px;
				z-index: 2;
			}
			.popover__resizer--top-left {
				top: 0;
				left: 0;
				cursor: nwse-resize;
			}
			.popover__resizer--top-right {
				top: 0;
				right: 0;
				cursor: nesw-resize;
			}
			.popover__resizer--bottom-left {
				bottom: 0;
				left: 0;
				cursor: nesw-resize;
			}
			.popover__resizer--bottom-right {
				bottom: 0;
				right: 0;
				cursor: nwse-resize;
			}

			/* Extended hit area for easier grabbing on edges */
			.popover__resizer--top::after,
			.popover__resizer--right::after,
			.popover__resizer--bottom::after,
			.popover__resizer--left::after {
				content: '';
				position: absolute;
			}
			.popover__resizer--top::after {
				left: 0;
				right: 0;
				top: -4px;
				bottom: -2px;
			}
			.popover__resizer--right::after {
				top: 0;
				bottom: 0;
				left: -2px;
				right: -4px;
			}
			.popover__resizer--bottom::after {
				left: 0;
				right: 0;
				top: -2px;
				bottom: -4px;
			}
			.popover__resizer--left::after {
				top: 0;
				bottom: 0;
				left: -4px;
				right: -2px;
			}

			.popover__resizer:hover,
			:host([dragging]) .popover__resizer--active {
				transition-delay: 0.2s;
				background-color: var(--vscode-sash-hoverBorder, var(--vscode-focusBorder));
			}
			:host([dragging]) .popover__resizer--active {
				transition-delay: 0s;
			}

			/* Override scrollbar thumb to not inherit border-color from the popover
			   body's visible border, which conflicts with the scrollableBase trick */
			.popover__body::-webkit-scrollbar-thumb {
				border-color: transparent;
			}
			:host(:hover) .popover__body::-webkit-scrollbar-thumb,
			:host(:focus-within) .popover__body::-webkit-scrollbar-thumb {
				border-color: var(--vscode-scrollbarSlider-background);
			}

			.popover[data-current-placement^='top'] .popover__body,
			.popover[data-current-placement^='bottom'] .popover__body {
				width: max-content;
			}

			:host([appearance='menu']) {
				--wa-tooltip-padding: var(--wa-spacing-2x-small);
				--wa-tooltip-font-size: var(--vscode-font-size);
				--wa-tooltip-background-color: var(--vscode-menu-background);
				--arrow-color: var(--vscode-menu-background);
			}

			[slot='anchor'] {
				width: var(--gl-popover-anchor-width, fit-content);
				max-width: 100%;
				overflow: hidden;
			}

			/* .popover::part(hover-bridge) {
				background: tomato;
				opacity: 0.5;
				z-index: 10000000000;
			} */
		`],nS([eq("#popover")],nA.prototype,"body",2),nS([eq("wa-popup")],nA.prototype,"popup",2),nS([eB({reflect:!0})],nA.prototype,"placement",2),nS([eB({type:Object})],nA.prototype,"anchor",2),nS([eB({reflect:!0,type:Boolean})],nA.prototype,"disabled",2),nS([eB({type:Number})],nA.prototype,"distance",2),nS([eB({reflect:!0,type:Boolean})],nA.prototype,"open",2),nS([eB({reflect:!0,type:Boolean})],nA.prototype,"arrow",2),nS([eB({reflect:!0,type:Boolean,attribute:"auto-size-vertical"})],nA.prototype,"autoSizeVertical",2),nS([eB({reflect:!0})],nA.prototype,"resize",2),nS([eB({type:Number})],nA.prototype,"skidding",2),nS([eB()],nA.prototype,"trigger",2),nS([eB({type:Boolean})],nA.prototype,"hoist",2),nS([eB({reflect:!0})],nA.prototype,"appearance",2),nS([eF()],nA.prototype,"suppressed",2),nS([eF()],nA.prototype,"_resolvedPlacement",2),nS([t0("open",{afterFirstUpdate:!0})],nA.prototype,"handleOpenChange",1),nS([t0(["distance","placement","skidding"])],nA.prototype,"handleOptionsChange",1),nS([t0("resize",{afterFirstUpdate:!0})],nA.prototype,"handleResizeChange",1),nS([t0("disabled")],nA.prototype,"handleDisabledChange",1),nA=nS([eD("gl-popover")],nA);var nP=Object.defineProperty,nz=Object.getOwnPropertyDescriptor,nR=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nz(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nP(t,i,s),s};let nI=class extends lit_element_i{constructor(){super(...arguments),this.truncate=!1,this.overlay="tooltip",this.icon="",this.disabled=!1}render(){return this.label&&"none"!==this.overlay?"popover"===this.overlay?eC`<gl-popover hoist
				>${this.renderContent()}
				<div slot="content">${of(this.label)}</div></gl-popover
			>`:eC`<gl-tooltip content="${this.label}">${this.renderContent()}</gl-tooltip>`:this.renderContent()}renderContent(){let e="popover"===this.overlay?"anchor":eA,t=eC`<code-icon
				class="chip__icon"
				part="icon"
				icon="${this.icon}"
				modifier="${("loading"===this.icon?"spin":"")??eA}"
			></code-icon
			>${this.activeIcon?eC`<code-icon class="chip__icon-active" part="active-icon" icon="${this.activeIcon}"></code-icon>`:eA}`;return this.href?eC`
				<a
					class="chip"
					part="base"
					?disabled=${this.disabled}
					href=${this.href}
					slot=${e}
					aria-label=${this.label??eA}
				>
					${t}<slot></slot>
				</a>
			`:eC`
			<button
				class="chip"
				part="base"
				type="button"
				?disabled=${this.disabled}
				slot=${e}
				aria-label=${this.label??eA}
			>
				${t}<slot></slot>
			</button>
		`}focus(e){this.defaultFocusEl.focus(e)}};function nT(e){let t=nw("gitlens.showSettingsPage!autolinks",{showOptions:{preserveFocus:!0}}),i="Configure autolinks to linkify external references, like Jira or Zendesk tickets, in commit messages.";return e.hasIntegrationsConnected||(i=`<a href="${t}">Configure autolinks</a> to linkify external references, like Jira or Zendesk tickets, in commit messages.

<a href="${nw("gitlens.plus.cloudIntegrations.connect",{source:{source:"inspect",detail:{action:"connect"}}})}">Connect an Integration</a> &mdash;`,e.hasAccount||(i+=" sign up and"),i+=" to get access to automatic rich autolinks for services like Jira, GitHub, and more."),eC`<gl-action-chip
		slot=${e.slotName??eA}
		href=${t}
		data-action="autolink-settings"
		icon="info"
		.label=${i}
		truncate
		overlay=${e.hasIntegrationsConnected?"tooltip":"popover"}
		>${e.showLabel?eC`<span class="mq-hide-sm">&nbsp;No autolinks found</span>`:eA}</gl-action-chip
	>`}nI.styles=[nk,nx,F`
			:host {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				vertical-align: text-bottom;
				border-radius: 0.5rem;
				max-width: 100%;
				min-width: 0;
			}

			* {
				box-sizing: border-box;
			}

			:host(:focus-within) {
				${oh}
			}

			:host(:hover) {
				background-color: var(--vscode-toolbar-hoverBackground);
			}

			:host(:active) {
				background-color: var(--vscode-toolbar-activeBackground);
			}

			:host([disabled]) {
				pointer-events: none;
				opacity: 0.5;
			}

			.chip__icon-active {
				display: none;
			}
			.chip:hover:has(.chip__icon-active) .chip__icon,
			.chip:focus-visible:has(.chip__icon-active) .chip__icon {
				display: none;
			}
			.chip:hover .chip__icon-active,
			.chip:focus-visible .chip__icon-active {
				display: inline-flex;
			}

			.chip {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				gap: 0.2rem;
				/* vertical-align: middle; */
				color: inherit;
				max-width: 100%;
				min-width: 2rem;
				max-width: 100%;
				height: 2rem;
				color: inherit;
				padding: 0.2rem;
				text-decoration: none;
				cursor: pointer;
				background: none;
				border: none;
				font: inherit;
				overflow: hidden;
			}
			.chip:hover {
				text-decoration: none;
			}
			.chip:focus {
				outline: none;
			}

			a:not(.chip) {
				text-decoration: underline;
			}

			::slotted(*) {
				padding-inline-end: 0.2rem;
				vertical-align: middle;
				text-transform: var(--chip-text-transform, capitalize);
			}

			:host([truncate]) {
				min-width: 0;
				max-width: 100%;
			}
			:host([truncate]) ::slotted(*) {
				display: inline-block;
				max-width: 100%;
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				vertical-align: middle;
			}
		`],nR([eB({type:Boolean,reflect:!0})],nI.prototype,"truncate",2),nR([eB()],nI.prototype,"href",2),nR([eB()],nI.prototype,"label",2),nR([eB()],nI.prototype,"overlay",2),nR([eB()],nI.prototype,"icon",2),nR([eB()],nI.prototype,"activeIcon",2),nR([eB({type:Boolean})],nI.prototype,"disabled",2),nR([eq(".chip")],nI.prototype,"defaultFocusEl",2),nI=nR([eD("gl-action-chip")],nI);let ContextMenuProxyController=class ContextMenuProxyController{constructor(e){this._onContextMenu=e=>{let t=e.composedPath().find(e=>e instanceof HTMLElement&&null!=e.dataset.vscodeContext);null!=t&&t!==this._host&&(this._host.dataset.vscodeContext=t.dataset.vscodeContext,setTimeout(()=>{delete this._host.dataset.vscodeContext},100))},this._host=e,e.addController(this)}hostConnected(){this._host.addEventListener("contextmenu",this._onContextMenu)}hostDisconnected(){this._host.removeEventListener("contextmenu",this._onContextMenu)}};let ModifierKeysTracker=class ModifierKeysTracker{constructor(){this._altKey=!1,this._shiftKey=!1,this._ctrlKey=!1,this._metaKey=!1,this._hosts=new Set,this._listening=!1,this._onKey=e=>{let t=e.altKey||"keydown"===e.type&&"Alt"===e.key,i=e.shiftKey||"keydown"===e.type&&"Shift"===e.key,r=e.ctrlKey||"keydown"===e.type&&"Control"===e.key,o=e.metaKey||"keydown"===e.type&&"Meta"===e.key,s=("keyup"!==e.type||"Alt"!==e.key)&&t,a=("keyup"!==e.type||"Shift"!==e.key)&&i,c=("keyup"!==e.type||"Control"!==e.key)&&r,h=("keyup"!==e.type||"Meta"!==e.key)&&o;(this._altKey!==s||this._shiftKey!==a||this._ctrlKey!==c||this._metaKey!==h)&&(this._altKey=s,this._shiftKey=a,this._ctrlKey=c,this._metaKey=h,this._notify())},this._onBlur=()=>{this._reset()}}get altKey(){return this._altKey}get shiftKey(){return this._shiftKey}get ctrlKey(){return this._ctrlKey}get metaKey(){return this._metaKey}subscribe(e){return this._hosts.add(e),this._listening||this._start(),()=>{this._hosts.delete(e),0===this._hosts.size&&this._stop()}}_start(){this._listening=!0,window.addEventListener("keydown",this._onKey,{capture:!0}),window.addEventListener("keyup",this._onKey,{capture:!0}),window.addEventListener("blur",this._onBlur)}_stop(){this._listening=!1,window.removeEventListener("keydown",this._onKey,{capture:!0}),window.removeEventListener("keyup",this._onKey,{capture:!0}),window.removeEventListener("blur",this._onBlur),this._reset()}_reset(){let e=this._altKey||this._shiftKey||this._ctrlKey||this._metaKey;this._altKey=this._shiftKey=this._ctrlKey=this._metaKey=!1,e&&this._notify()}_notify(){for(let e of this._hosts)e.requestUpdate()}};let nM=new ModifierKeysTracker;let ModifierKeysController=class ModifierKeysController{constructor(e){this.host=e,e.addController(this)}get altKey(){return nM.altKey}get shiftKey(){return nM.shiftKey}get ctrlKey(){return nM.ctrlKey}get metaKey(){return nM.metaKey}hostConnected(){this._unsubscribe=nM.subscribe(this.host)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}};let nj=[op,ou,og,om,F`
		:host {
			display: contents;
		}

		a {
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}

		.compare-header__title {
			display: block;
			font-weight: 500;
			font-size: var(--gl-font-base);
			color: var(--color-foreground--85);
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		/* Section layout */
		.section {
			padding: 0 var(--gitlens-scrollbar-gutter-width) 1.5rem var(--gitlens-gutter-width);
		}
		.section:first-child {
			padding-top: 0.8rem;
		}
		.section > :first-child {
			margin-top: 0;
		}
		.section > :last-child {
			margin-bottom: 0;
		}

		.section--message {
			padding: 0 var(--gitlens-scrollbar-gutter-width) 1rem var(--gitlens-scrollbar-gutter-width);
		}

		.section--empty > :last-child {
			margin-top: 0.5rem;
		}

		.section--skeleton {
			padding-top: 1px;
			padding-bottom: 1px;
		}

		.section--actions {
			padding: 0 var(--gitlens-scrollbar-gutter-width) 0 var(--gitlens-gutter-width);
		}

		/* Message block */
		.message-block {
			position: relative;
			font-size: var(--gl-font-base);
			border: 1px solid var(--vscode-input-border);
			background: var(--vscode-input-background);
			padding: 0.5rem;
			border-radius: 0.2rem 0.2rem 0 0;
		}

		.message-block__text {
			margin: 0;
			overflow-y: auto;
			overflow-x: hidden;
			max-height: 9rem;
		}
		.message-block__text strong {
			font-weight: 600;
			font-size: var(--gl-font-lg);
		}

		.message-block__copy {
			position: absolute;
			bottom: 0.4rem;
			right: 0;
			z-index: 1;
			opacity: 0.7;
			transition: opacity 0.15s ease;
			color: var(--vscode-descriptionForeground);
		}
		.message-block__copy:hover,
		.message-block__copy:focus-within {
			opacity: 1;
			color: var(--vscode-foreground);
		}

		/* Message block rows (actions bar below message) */
		.message-block-row,
		.message-block-group {
			display: flex;
			flex-direction: row;
			gap: 0.6rem;
		}

		.message-block-row {
			justify-content: space-between;
		}

		.message-block-row--actions {
			font-size: var(--gl-font-base);
			color: var(--color-foreground--65);
			background: var(--color-background--level-075);
			padding: 0.2rem;
		}
		.message-block-row--actions:last-child {
			border-radius: 0 0 0.2rem 0.2rem;
		}
		.message-block-row--actions:first-of-type:last-child {
			border-radius: 0.2rem;
		}

		.message-block-row--actions gl-action-chip::part(icon),
		.message-block-row--actions gl-autolink-chip::part(icon),
		.message-block-row--actions gl-commit-date {
			--code-icon-size: 1.3rem;
		}

		/* Inline autolinks loading state — replaces "No autolinks found" while the commit
		   identity (sha) is changing. min-height matches gl-action-chip's intrinsic 2rem so
		   the strip doesn't jump between the spinner and the chip-based states. */
		.autolinks-loading {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			min-height: 2rem;
			color: var(--vscode-descriptionForeground);
		}

		/* File-section loading container — sits in the gl-file-tree-pane "before-tree" slot in
		   place of the "No Files" empty text while the embedded panel is showing a "lite" commit
		   shell waiting for the full fetch. */
		.files-loading {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.6rem;
			padding: 2rem 1.2rem;
			color: var(--vscode-descriptionForeground);
			text-align: center;
		}

		.message-block-row--actions .reachability-summary code-icon,
		.message-block-row--actions .reachability-summary gl-action-chip::part(icon) {
			--code-icon-size: 12px;
		}

		.message-block-row--actions gl-commit-date {
			margin-inline-end: 0.2rem;
		}

		.message-block-row--actions gl-action-chip.error {
			background-color: var(--color-alert-errorBackground);
		}

		.message-block-row--actions gl-action-chip.warning {
			background-color: var(--color-alert-warningHoverBackground);
		}

		/* Reachability styles */
		.reachability-summary {
			display: flex;
			flex-wrap: wrap;
			gap: 0.6rem;
			align-items: center;
			overflow: hidden;
			flex: 1 1 0;
			min-width: 0;
		}
		.reachability-summary code-icon,
		.reachability-summary gl-action-chip::part(icon) {
			--code-icon-size: 12px;
		}
		.reachability-summary gl-action-chip::part(base) {
			overflow: hidden;
		}

		.reachability-range-chip-wrapper {
			display: inline-flex;
			max-width: 100%;
			min-width: 0;
			overflow: hidden;
		}
		@media (max-width: 768px) {
			.reachability-range-chip-wrapper {
				flex: 1 1 100%;
			}
		}

		.reachability-range-chip {
			color: var(--color-foreground--65);
			border-radius: 0.3rem;
			padding: 0.1rem 0.25rem;
			--chip-text-transform: none;
			--chip-background: transparent;
			display: inline-flex !important;
			min-width: 0;
			max-width: 100%;
			width: auto;
			overflow: hidden;
		}
		.reachability-range-chip:hover,
		.reachability-range-chip:focus {
			opacity: 1;
		}
		.reachability-range-chip--range {
			cursor: pointer;
		}
		.reachability-range-chip--local-branch {
			color: var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0);
			font-weight: 600;
		}
		.reachability-range-chip--remote-branch {
			color: var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0);
		}
		.reachability-range-chip--tag {
			color: color-mix(in srgb, var(--vscode-editorWarning-foreground, #cca700) 70%, var(--color-foreground) 30%);
		}
		.reachability-range-chip--current .reachability-range-chip__label {
			font-weight: 600;
		}

		.reachability-range-chip__label {
			flex: 1 1 auto;
			min-width: 0;
			max-width: 100%;
			padding-left: 0.25rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: inherit;
		}
		.reachability-range-chip__label code-icon {
			vertical-align: middle;
			margin-right: 0.2rem;
		}

		.reachability-range-chip__ellipsis {
			opacity: 0.8;
			padding: 0 0.4rem;
		}

		.reachability-range-chip__count {
			padding-left: 0.4rem;
			font-weight: 600;
			font-size: var(--gl-font-micro);
			color: var(--color-foreground--50);
		}

		.reachability-popover {
			min-width: 200px;
			max-width: 400px;
		}
		.reachability-popover__header {
			padding-bottom: 0.6rem;
			font-weight: 500;
		}
		.reachability-popover__list {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;
			max-height: 300px;
			overflow-y: auto;
		}

		.reachability-list-item {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.3rem 0.4rem;
			font-size: var(--gl-font-base);
			line-height: 1.4;
		}
		.reachability-list-item--current {
			font-weight: 600;
		}
		.reachability-list-item__icon {
			flex-shrink: 0;
			opacity: 0.8;
			--code-icon-size: 14px;
		}
		.reachability-list-item__label {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		/* Media query hiding */
		.mq-hide-sm,
		gl-autolink-chip::part(label) {
			/* Will be hidden at narrow widths */
		}
		@media (max-width: 300px) {
			.mq-hide-sm,
			gl-autolink-chip::part(label) {
				display: none !important;
			}
		}

		/* Button styles */
		.button--busy[aria-busy='true'] {
			opacity: 0.5;
		}
		.button--busy:not([aria-busy='true']) code-icon {
			display: none;
		}

		.button-container {
			margin: 1rem auto 0;
			text-align: left;
			max-width: 30rem;
			transition: max-width 0.2s ease-out;
		}
		@media (min-width: 640px) {
			.button-container {
				max-width: 100%;
			}
		}

		.button-group {
			display: inline-flex;
			gap: 0.1rem;
		}
		.button-group--single {
			width: 100%;
			max-width: 30rem;
		}
		.button-group > *:not(:first-child),
		.button-group > *:not(:first-child) gl-button {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		.button-group > *:not(:last-child),
		.button-group > *:not(:last-child) gl-button {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		/* AI content */
		.ai-content {
			font-size: var(--gl-font-base);
			border: 0.1rem solid var(--vscode-input-border, transparent);
			background: var(--vscode-input-background);
			margin-top: 1rem;
			padding: 0.5rem;
			border-radius: 2px;
		}
		.ai-content.has-error {
			border-left-color: var(--color-alert-errorBorder);
			border-left-width: 0.3rem;
			padding-left: 0.8rem;
		}
		.ai-content:empty {
			display: none;
		}
		.ai-content__summary {
			display: block;
			margin: 0;
			overflow-y: auto;
			overflow-x: hidden;
			max-height: 20rem;
		}

		/* Popover content */
		.popover-content {
			background-color: var(--color-background--level-15);
			padding: 0.8rem 1.2rem;
		}

		/* Alert */
		.alert {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			gap: 0.6rem;
			width: 100%;
			max-width: 100%;
			margin-block: 0;
			background-color: var(--color-alert-warningBackground);
			border-radius: 0.3rem;
			padding: 0.4rem 0.8rem;
			color: var(--color-alert-warningForeground, var(--vscode-input-foreground));
			border: 1px solid var(--color-alert-warningBorder);
		}
		.alert code-icon {
			flex: none;
			--code-icon-size: 13px;
		}
		.alert__content {
			flex: 1;
			min-width: 0;
			font-size: var(--gl-font-base);
			line-height: 1.4;
			margin: 0;
		}

		/* Inline popover / tooltip hint */
		.inline-popover {
			display: inline-block;
		}
		.tooltip-hint {
			white-space: nowrap;
			border-bottom: 1px dashed currentColor;
		}

		/* Child component layout — these live inside the shadow root */
		webview-pane-group {
			height: 100%;
			flex: 1;
			min-height: 0;
			overflow: hidden;
		}

		webview-pane {
			display: flex;
			flex-direction: column;
			min-height: 0;
		}

		webview-pane[flexible] {
			flex: 1;
			overflow: hidden;
		}
	`,F`
		:host([variant='embedded']) .split__handle {
			position: relative;
			z-index: 1;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-top: 1px solid color-mix(in srgb, var(--vscode-sideBarSectionHeader-border) 60%, transparent);
		}
		:host([variant='embedded']) .split__handle::after {
			content: '';
			position: relative;
			top: -0.2rem;
			width: 5rem;
			height: 0.5rem;
			border-radius: 0.25rem;
			background-color: color-mix(in srgb, var(--color-foreground) 55%, var(--color-background));
			transition: background-color 0.15s ease;
		}
		:host([variant='embedded']) .split__handle:hover::after,
		:host([variant='embedded']) .split[dragging] .split__handle::after {
			background-color: var(--vscode-sash-hoverBorder, var(--vscode-focusBorder));
		}

		:host([variant='embedded']) gl-badge {
			font-size: var(--gl-font-micro);
		}
	`];var nO=Object.defineProperty,nD=Object.getOwnPropertyDescriptor,nL=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nD(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nO(t,i,s),s};function nB(e,t){if(e?.files==null)return;let i=t?.includeLineStats?e.additions??eA:eA,r=t?.includeLineStats?e.deletions??eA:eA;if("number"==typeof e.files)return eC`<commit-stats
			modified="${e.files}"
			additions="${i}"
			deletions="${r}"
			symbol="icons"
		></commit-stats>`;let{added:o,deleted:s,changed:a}=e.files;return eC`<commit-stats
		added="${o}"
		modified="${a}"
		removed="${s}"
		additions="${i}"
		deletions="${r}"
		symbol="icons"
	></commit-stats>`}let nF=Object.freeze([["added",["+","add"]],["modified",["~","edit"]],["removed",["-","remove"]]]),nN=class extends lit_element_i{constructor(){super(...arguments),this.added=0,this.modified=0,this.removed=0,this.noTooltip=!1}render(){let e=nF.map(([e,t])=>this.renderStat(e,t));return this.noTooltip?e:eC`<gl-tooltip>
			${e}
			<div slot="content">${this.renderTooltipContent()}</div>
		</gl-tooltip>`}renderStat(e,t){let i=this[e];if(null==i)return eA;let[r,o]=t,s="icons"===this.symbol?eC`<code-icon class="icon" icon=${o}></code-icon>`:eC`<span class="symbol">${r}</span>`;return eC`<span class="stat ${e}" aria-label="${i} ${e}"
			><span class="label">${s}${i}</span></span
		>`}renderTooltipContent(){let e=this.added??0,t=this.modified??0,i=this.removed??0,r=e+t+i,o=[];e>0&&o.push(eC`<span class="added">${e} added</span>`),t>0&&(o.length&&o.push(", "),o.push(eC`<span class="modified">${t} modified</span>`)),i>0&&(o.length&&o.push(", "),o.push(eC`<span class="removed">${i} removed</span>`));let s=e>0||i>0?eC`${eQ("file",r)} changed (${o})`:eQ("file changed",r,{plural:"files changed",zero:"No files changed"}),a=[];null!=this.additions&&a.push(eC`<span class="added">${eQ("addition",this.additions)}</span>`),null!=this.deletions&&(a.length&&a.push(", "),a.push(eC`<span class="removed">${eQ("deletion",this.deletions)}</span>`));let c=[eC`<div>${s}</div>`];return a.length>0&&c.push(eC`<div>${a}</div>`),c}};nN.styles=F`
		:host {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			white-space: nowrap;
			font-size: 1.1rem;
			font-weight: 600;
		}

		:host([appearance='pill']) {
			background-color: color-mix(
				in srgb,
				var(--vscode-sideBarSectionHeader-background) 90%,
				var(--vscode-foreground) 10%
			);
			border: 1px solid
				color-mix(in srgb, var(--vscode-sideBarSectionHeader-border) 100%, var(--vscode-foreground) 70%);
			border-radius: 0.4rem;
			padding: 0 0.8rem 0 0.6rem;
			white-space: nowrap;
			line-height: 1.5rem;
		}

		:host-context(.vscode-light):host([appearance='pill']),
		:host-context(.vscode-high-contrast-light):host([appearance='pill']) {
			background-color: color-mix(
				in srgb,
				var(--vscode-sideBarSectionHeader-background) 98%,
				var(--vscode-foreground) 2%
			);
		}

		.stat {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
		}

		.stat + .stat {
			margin-inline-start: 1rem;
		}

		:host([symbol='icons']) .stat + .stat {
			margin-inline-start: 0.8rem;
		}

		.added {
			color: var(--gl-stat-added);
		}
		.modified {
			color: var(--gl-stat-modified);
		}
		.removed {
			color: var(--gl-stat-removed);
		}

		.label {
			user-select: none;
		}

		.icon {
			--code-icon-size: 1.1rem;
			--code-icon-v-align: middle;
			margin-inline-end: 0.2rem;
			font-weight: 600;
		}

		/* Pill styles */
		:host([appearance='pill']) .stat {
			padding: 0;
		}

		:host([appearance='pill']) .stat + .stat {
			margin-inline-start: 0.8rem;
		}

		:host([appearance='pill']) .icon {
			margin-inline-end: 0.3rem;
		}
	`,nL([eB({type:Number})],nN.prototype,"added",2),nL([eB({type:Number})],nN.prototype,"modified",2),nL([eB({type:Number})],nN.prototype,"removed",2),nL([eB({type:Number})],nN.prototype,"additions",2),nL([eB({type:Number})],nN.prototype,"deletions",2),nL([eB()],nN.prototype,"symbol",2),nL([eB({reflect:!0})],nN.prototype,"appearance",2),nL([eB({type:Boolean,attribute:"no-tooltip"})],nN.prototype,"noTooltip",2),nN=nL([eD("commit-stats")],nN);let nq=tx(class extends directive_i{constructor(e){if(super(e),3!==e.type&&1!==e.type&&4!==e.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==e.strings)throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===eE||t===eA)return t;let i=e.element,r=e.name;if(3===e.type){if(t===i[r])return eE}else if(4===e.type){if(!!t===i.hasAttribute(r))return eE}else if(1===e.type&&i.getAttribute(r)===t+"")return eE;return tP(e),t}}),nU={".":"Unchanged","!":"Ignored","?":"Untracked",A:"Added",D:"Deleted",M:"Modified",R:"Renamed",C:"Copied",AA:"Added (Both)",AU:"Added (Current)",UA:"Added (Incoming)",DD:"Deleted (Both)",DU:"Deleted (Current)",UD:"Deleted (Incoming)",UU:"Modified (Both)",T:"Modified",U:"Updated but Unmerged"},nW=new Set(["U","AA","AU","UA","DD","DU","UD","UU"]);function nH(e){return null!=e&&nW.has(e)}let nV={A:{label:"Added",kind:"added"},D:{label:"Deleted",kind:"deleted"},U:{label:"Modified",kind:"modified"}};function nK(e,t){let i=nV[e[0]],r=nV[e[1]];if(null==i||null==r)return;let o=i.kind===nV.U.kind?r.kind:i.kind,s=t?`$(git-branch) ${t}`:"incoming";return e[0]===e[1]?{label:`${i.label} (Both)`,kind:o,description:`${i.label} on both ${s} and the target`}:{label:`${i.label} (Current), ${r.label} (Incoming)`,kind:o,description:`${r.label} on ${s}
${i.label} on the target`}}function nG(e,t,i,r=!1,o){let s={name:"",relativePath:"",children:new Map,descendants:[]},a=e.reduce((e,r)=>{let o=e,s="";for(let e of t(r)){s=i(s,e),o.children??=new Map;let t=o.children.get(e);null==t&&(t={name:e,relativePath:s,parent:o,children:void 0,descendants:void 0},o.children.set(e,t)),o.descendants??=[],o.descendants.push(r),o=t}return o.value=r,e},s);return r&&(a=function e(t,i,r=!0,o){if(null==t.children)return t;let s=[...t.children.values()];for(let t of s)e(t,i,!1,o);if(!r&&null==t.value&&1===s.length){let e=s[0];if((null==e.value||o?.(e.value))&&(t.name=i(t.name,e.name),t.relativePath=e.relativePath,t.children=e.children,t.descendants=e.descendants,t.value=e.value,null!=t.children))for(let e of t.children.values())e.parent=t}return t}(a,i,!0,o)),a}var nZ=T(379);function nY(e){return e.sort((e,t)=>e.branch&&!t.branch?-1:!e.branch&&t.branch?1:e.label<t.label?-1:+(e.label>t.label)),e}function nX(e){let t=nQ(e.status)?.tooltip,i=e.repoPath?(0,nZ.join)(e.repoPath,e.path):e.path,r=[`${i}${null!=e.submodule?" (submodule)":""}`];return t&&r.push(t),"R"===e.status&&e.originalPath&&r.push(`\u2190 ${e.originalPath}`),r.join(`
`)}function nJ(e,t,i,r,o,s,a={level:1}){void 0===a.level&&(a.level=1);let c=e;if("matched"===r&&o?.matchedFiles!=null){let t=new Set(o.matchedFiles.map(e=>e.path));c=e.filter(e=>t.has(e.path))}if(!c.length)return[];let h=c[0]?.repoPath,p=[];if(t){let e=nG(c,e=>e.path.split("/"),(...e)=>e.join("/"),i);if(null!=e.children)for(let t of e.children.values()){let e=function e(t,i,r={level:1},o){let s;if(void 0===r.level&&(r.level=1),null==t.value){var a,c;a=t.name,s={branch:!1,expanded:!0,path:c=t.relativePath,level:1,checked:!1,icon:"folder",label:a,tooltip:c,...r,checkable:!1},o&&(s.tooltip=(0,nZ.join)(o,t.relativePath))}else s=i(t.value,r,!1);if(null!=t.children){let a=[];for(let s of t.children.values()){let t=e(s,i,{...r,level:r.level+1},o);a.push(t)}a.length>0&&(nY(a),s.branch=!0,s.children=a,a.some(e=>e.matched)&&(s.matched=!0))}return s}(t,s,a,h);p.push(e)}}else for(let e of c){let t=s(e,{...a,branch:!1},!0);p.push(t)}return nY(p),p}function nQ(e){switch(e){case"A":return{letter:"A",tooltip:"Added",kind:"added"};case"?":return{letter:"U",tooltip:"Untracked",kind:"untracked"};case"M":return{letter:"M",tooltip:"Modified",kind:"modified"};case"D":return{letter:"D",tooltip:"Deleted",kind:"deleted"};case"R":return{letter:"R",tooltip:"Renamed",kind:"renamed"};case"C":return{letter:"C",tooltip:"Copied",kind:"renamed"};case"T":return{letter:"T",tooltip:"Type Changed",kind:"modified"};case"U":case"AA":case"AU":case"UA":case"DD":case"DU":case"UD":case"UU":return{letter:"!",tooltip:"Conflict",kind:"conflict"};default:return}}let n0=F`
	:host {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	webview-pane {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
	}

	webview-pane[flexible] {
		overflow: hidden;
	}

	gl-tree-view {
		flex: 1;
		min-height: 0;
		overflow: hidden;
		margin-top: var(--gl-tree-view-margin-top, 0);
	}
	gl-tree-view[filterable] {
		margin-top: var(--gl-tree-view-filterable-margin-top, var(--gl-tree-view-margin-top, 0));
	}

	/* inline-flex matches the original so webview-pane's .label baseline stays centered.
	   width:100% lets inner children (.checkbox-header__title, badge) ellipse against
	   the .title slot's actual width instead of overflow-clipping at max-content.
	   vertical-align:middle pins the wrapper to the line's vertical middle so its taller
	   contents (checkbox + label + badge) center-align with the action buttons. */
	webview-pane [slot='title'] {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		min-width: 0;
		width: 100%;
		vertical-align: middle;
	}

	/* The Stash button's min-height makes the header taller than .label's fixed
	   2.2rem, and webview-pane's header uses default align-items: stretch which falls
	   back to start (top) for children with an explicit height. That puts .label at
	   the top of the header while .header-actions fills it — visually 3px too high.
	   align-items: center re-centers .label so the title content lines up with the
	   action buttons. */
	webview-pane::part(header) {
		background-color: inherit;
		border-top: var(--gl-file-tree-pane-header-border-top, none);
		align-items: center;
	}

	.header-actions {
		display: flex;
		align-items: center;
		/* Both gaps are var-driven so consumers (e.g. gl-wip-tree-pane) can collapse them
		   to 0 from their own container queries when the leading action goes icon-only. */
		gap: var(--gl-header-actions-gap, 0.4rem);
	}

	.leading-actions::slotted(*) {
		margin-right: var(--gl-leading-action-trailing-gap, 0.2rem);
	}

	gl-badge {
		font-size: var(--gl-font-micro);
		flex: 0 1 auto;
		min-width: 0;
		max-width: 100%;
		/* The slot inside (.badge) has content-box sizing + 4px padding, so width:100%
		   makes it overflow the host by 8px. Clipping at the host pins everything to the
		   visible badge box. */
		overflow: hidden;
	}

	/* Make the badge slot itself overflow-clip so ellipsis at the wrapper text can
	   actually trigger. box-sizing:border-box + width:100% pins the slot inside the
	   host (instead of overflowing 8px due to default content-box + padding). Display
	   stays as the slot's default inline-flex so vertical centering remains intact.
	   !important is needed because the internal .badge class selector (specificity
	   0,1,0) outranks ::part() (0,0,2). */
	gl-badge::part(base) {
		box-sizing: border-box !important;
		width: 100% !important;
		min-width: 0 !important;
		overflow: hidden !important;
	}

	.checkbox-header__badge-text {
		display: block;
		min-width: 0;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.checkbox-header {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 5px 0 5px 2px; /* prevent focus ring from clipping */
		flex: 1 1 auto;
		min-width: 0;
	}

	.checkbox-header gl-checkbox {
		--checkbox-foreground: var(--vscode-sideBarSectionHeader-foreground);
		--checkbox-size: 1.6rem;
		--checkbox-spacing: 0;
		--checkbox-radius: 0.3rem;
		--code-icon-size: 14px;
		margin-block: 0;
		flex-shrink: 0;
	}

	.checkbox-header__label {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--vscode-sideBarSectionHeader-foreground);
		flex: 1 1 auto;
		min-width: 0;
	}

	/* Title yields width before the badge — title clips to ellipsis first, then badge clips.
	   The same shape applies to the non-checkbox header path (.file-tree-pane__title) so
	   multi-commit / commit-details file trees ellipse the title before their badge/stats.
	   display:block is required for text-overflow:ellipsis to actually trigger — when
	   the title sits inside a default <slot> (display:contents), some browsers don't
	   blockify its outer display, leaving it inline. */
	.checkbox-header__title,
	.file-tree-pane__title {
		display: block;
		flex: 0 1 auto;
		min-width: 0;
		flex-shrink: 10;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	action-item.active-toggle {
		color: var(--vscode-inputOption-activeForeground);
		background-color: var(--vscode-inputOption-activeBackground);
		border-radius: 0.3rem;
	}

	/* Filter-mode-mixed: left half shows the filled funnel (icon: 'filter-filled'),
	   right half shows the outline funnel (outline-icon: 'filter') — a visual cue that
	   matches are highlighted, not filtered. Both glyphs share the same outer path so
	   the edges align perfectly at the 50% split. */
	action-item.filter-mode-mixed::part(icon) {
		-webkit-mask-image: linear-gradient(to right, #000 50%, transparent 50%);
		mask-image: linear-gradient(to right, #000 50%, transparent 50%);
	}

	action-item.filter-mode-mixed::part(icon-outline) {
		display: inline-flex;
		-webkit-mask-image: linear-gradient(to right, transparent 50%, #000 50%);
		mask-image: linear-gradient(to right, transparent 50%, #000 50%);
	}
`,n1=F`
	.badge {
		display: inline-flex;
		font-size: var(--gl-badge-font-size, x-small);
		font-variant: all-small-caps;
		font-weight: 600;
		color: var(--gl-badge-color, var(--color-foreground--50));
		border: currentColor 1px solid;
		border-radius: 1rem;
		padding: 0 0.8rem 0.1rem;
		white-space: nowrap;
	}

	:host([appearance='filled']) .badge {
		background-color: var(--vscode-badge-background);
		color: var(--vscode-badge-foreground);
		border: none;
		font-weight: 500;
		line-height: 1;
		min-width: 1.6rem;
		justify-content: center;
		padding: 0.2rem 0.4rem;
		border-radius: 0.4rem;
	}

	:host([appearance='warning']) .badge {
		background-color: var(--vscode-gitDecoration-conflictingResourceForeground);
		color: var(--vscode-button-foreground, #fff);
		border: none;
		font-weight: 500;
		line-height: 1;
		min-width: 1.6rem;
		justify-content: center;
		padding: 0.2rem 0.4rem;
		border-radius: 0.4rem;
	}
`;var n2=Object.defineProperty,n5=Object.getOwnPropertyDescriptor,n3=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?n5(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&n2(t,i,s),s};let n4=class extends lit_element_i{render(){return eC`<slot class="badge" part="base"></slot>`}};n4.styles=[n1],n3([eB({reflect:!0})],n4.prototype,"appearance",2),n4=n3([eD("gl-badge")],n4);var n6=Object.defineProperty,n7=Object.getOwnPropertyDescriptor,n8=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?n7(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&n6(t,i,s),s};let n9=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.position="bottom"}firstUpdated(){this.setAttribute("role","progressbar")}render(){return eC`<div class="progress-bar"></div>`}};n9.styles=F`
		* {
			box-sizing: border-box;
		}

		:host {
			position: absolute;
			left: 0;
			z-index: 5;
			height: 2px;
			width: 100%;
			overflow: hidden;
		}

		:host([position='bottom']) {
			bottom: 0;
		}

		:host([position='top']) {
			top: 0;
		}

		.progress-bar {
			background-color: var(--vscode-progressBar-background);
			display: none;
			position: absolute;
			left: 0;
			width: 2%;
			height: 2px;
		}

		:host([active]:not([active='false'])) .progress-bar {
			display: inherit;
		}

		:host([mode='discrete']) .progress-bar {
			left: 0;
			transition: width 0.1s linear;
		}

		:host([mode='discrete done']) .progress-bar {
			width: 100%;
		}

		:host([mode='infinite']) .progress-bar {
			animation-name: progress;
			animation-duration: 4s;
			animation-iteration-count: infinite;
			animation-timing-function: steps(100);
			transform: translateZ(0);
		}

		@keyframes progress {
			0% {
				transform: translateX(0) scaleX(1);
			}

			50% {
				transform: translateX(2500%) scaleX(3);
			}

			to {
				transform: translateX(4900%) scaleX(1);
			}
		}
	`,n8([eB({reflect:!0})],n9.prototype,"mode",2),n8([eB({type:Boolean})],n9.prototype,"active",2),n8([eB()],n9.prototype,"position",2),n9=n8([eD("progress-indicator")],n9);var ae=Object.defineProperty,at=Object.getOwnPropertyDescriptor,ai=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?at(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ae(t,i,s),s};let ar=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!1,this.expanded=!1,this.loading=!1}renderTitle(){return this.collapsable?eC`<button
			type="button"
			class="label"
			aria-controls="content"
			aria-expanded=${this.expanded}
			@click="${this.toggleExpanded}"
		>
			<code-icon class="icon" icon=${this.expanded?"chevron-down":"chevron-right"}></code-icon
			><span class="title"><slot name="title">Section</slot></span>
			<span class="subtitle"><slot name="subtitle"></slot></span>
		</button>`:eC`<div class="label">
				<span class="title"><slot name="title">Section</slot></span>
				<span class="subtitle"><slot name="subtitle"></slot></span>
			</div>`}render(){return eC`
			<header class="header" part="header">
				${this.renderTitle()}
				<slot name="actions"></slot>
				<progress-indicator ?active="${this.loading}"></progress-indicator>
			</header>
			<div id="content" role="region" part="content" class="content scrollable">
				<slot></slot>
			</div>
		`}toggleExpanded(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("expanded-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}};ar.styles=[ou,F`
			:host {
				display: flex;
				flex-direction: column;
				/* background-color: var(--vscode-sideBar-background); */
				min-height: 23px;
			}

			* {
				box-sizing: border-box;
			}

			.header {
				flex: none;
				display: flex;
				background-color: var(--vscode-sideBarSectionHeader-background);
				color: var(--vscode-sideBarSectionHeader-foreground);
				border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
				position: relative;
			}

			:host([collapsable]) .header:focus-within {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.label {
				appearance: none;
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 100%;
				padding: 0;
				border: none;
				text-align: left;
				font-family: var(--font-family);
				font-size: 1.1rem;
				line-height: 2.2rem;
				height: 2.2rem;
				background: transparent;
				color: inherit;
				outline: none;
				text-overflow: ellipsis;
				user-select: none;
			}

			:host([collapsable]) .label {
				cursor: pointer;
			}

			.title {
				font-weight: bold;
				text-transform: uppercase;
				flex: 1;
				min-width: 0;
				width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			:host(:not([collapsable])) .title {
				margin-left: 0.8rem;
			}

			.subtitle {
				margin-left: 1rem;
			}

			.subtitle::slotted(*) {
				opacity: 0.6;
			}

			.icon {
				font-weight: normal;
				margin: 0 0.2rem;
			}

			.content {
				display: flex;
				flex-direction: column;
				flex: 1;
				overflow: auto;
				min-height: 0;
				/*
			scrollbar-gutter: stable;
			box-shadow: #000000 0 0.6rem 0.6rem -0.6rem inset;
			*/
				padding-top: 0.6rem;
			}

			:host([collapsable]:not([expanded])) .content,
			:host([collapsable][expanded='false']) .content {
				display: none;
			}

			slot[name='actions']::slotted(*) {
				flex: none;
				margin-left: auto;
			}
		`],ai([eB({type:Boolean,reflect:!0})],ar.prototype,"collapsable",2),ai([eB({type:Boolean,reflect:!0})],ar.prototype,"expanded",2),ai([eB({type:Boolean,reflect:!0})],ar.prototype,"loading",2),ar=ai([eD("webview-pane")],ar);var ao=Object.defineProperty,as=Object.getOwnPropertyDescriptor,an=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?as(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ao(t,i,s),s};let aa=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.disabled=!1,this._modifiers=new ModifierKeysController(this),this.handleLinkKeydown=e=>{this.effectiveHref||" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),e.target.click())}}get isAltKeyPressed(){return this._modifiers.altKey||this._modifiers.shiftKey}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${nn()}] ${this.altLabel}`:this.label}get effectiveLabel(){if(this.label||this.altLabel)return this.altLabel&&this.isAltKeyPressed?this.altLabel:this.label}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}render(){return eC`
			<gl-tooltip content="${this.effectiveTooltip??eA}">
				<a
					role="${!this.effectiveHref?"button":eA}"
					type="${!this.effectiveHref?"button":eA}"
					aria-label="${this.effectiveLabel??eA}"
					?disabled=${this.disabled}
					href=${this.effectiveHref??eA}
					tabindex="0"
					@keydown=${this.handleLinkKeydown}
				>
					<span class="icon-wrapper">
						<code-icon part="icon" icon="${this.effectiveIcon}"></code-icon>
						<code-icon
							part="icon-outline"
							icon="${this.outlineIcon??this.effectiveIcon}"
							aria-hidden="true"
						></code-icon>
					</span>
				</a>
			</gl-tooltip>
		`}focus(e){this.defaultFocusEl.focus(e)}};aa.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aa.styles=F`
		:host {
			box-sizing: border-box;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 2rem;
			height: 2rem;
			border-radius: 0.5rem;
			color: var(--action-item-foreground, var(--vscode-icon-foreground));
			padding: 0.2rem;
			vertical-align: text-bottom;
			text-decoration: none;
			cursor: pointer;
		}

		.icon-wrapper {
			position: relative;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		code-icon[part~='icon-outline'] {
			position: absolute;
			inset: 0;
			display: none;
			pointer-events: none;
		}

		:host(:focus-within) {
			${oh}
		}

		:host(:hover),
		:host(:focus-within) {
			background-color: var(--vscode-toolbar-hoverBackground);
		}

		:host(:active) {
			background-color: var(--vscode-toolbar-activeBackground);
		}

		:host([disabled]) {
			pointer-events: none;
			opacity: 0.5;
		}

		a {
			color: inherit;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			text-decoration: none;
		}
		a:focus {
			outline: none;
		}
		a:is(:hover, :focus, :active) {
			text-decoration: none;
		}
	`,an([eB()],aa.prototype,"href",2),an([eB({attribute:"alt-href"})],aa.prototype,"altHref",2),an([eB()],aa.prototype,"label",2),an([eB({attribute:"alt-label"})],aa.prototype,"altLabel",2),an([eB()],aa.prototype,"icon",2),an([eB({attribute:"alt-icon"})],aa.prototype,"altIcon",2),an([eB({attribute:"outline-icon"})],aa.prototype,"outlineIcon",2),an([eB({type:Boolean})],aa.prototype,"disabled",2),an([eq("a")],aa.prototype,"defaultFocusEl",2),aa=an([eD("action-item")],aa);var al=Object.defineProperty,ac=Object.getOwnPropertyDescriptor,ah=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ac(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&al(t,i,s),s};let ad=class extends lit_element_i{firstUpdated(){this.role="navigation"}disconnectedCallback(){this._slotSubscriptionsDisposer?.(),super.disconnectedCallback?.()}render(){return eC`<slot @slotchange=${this.handleSlotChange}></slot>`}handleSlotChange(e){if(this._slotSubscriptionsDisposer?.(),this.actionNodes.length<1)return;let t=this.handleKeydown.bind(this),i=`${this.actionNodes.length}`,r=this.actionNodes.map((e,r)=>(e.setAttribute("aria-posinset",`${r+1}`),e.setAttribute("aria-setsize",i),e.setAttribute("tabindex",0===r?"0":"-1"),this.actionNodes.length>=2&&e.addEventListener("keydown",t,!1),{dispose:()=>{e?.removeEventListener("keydown",t,!1)}}));this._slotSubscriptionsDisposer=()=>{r?.forEach(({dispose:e})=>e())}}handleKeydown(e){if(!e.target||null==this.actionNodes)return;let t=e.target,i=parseInt(t.getAttribute("aria-posinset")??"0",10);if("ArrowLeft"!==e.key&&"ArrowRight"!==e.key||this.actionNodes.length<2)return;let r=null;if("ArrowLeft"===e.key){let e=1===i?this.actionNodes.length-1:i-2;r=this.actionNodes[e]}else if("ArrowRight"===e.key){let e=i===this.actionNodes.length?0:i;r=this.actionNodes[e]}null!=r&&r!==t&&(e.preventDefault(),e.stopPropagation(),t.setAttribute("tabindex","-1"),r.setAttribute("tabindex","0"),r.focus())}};ad.styles=F`
		:host {
			display: flex;
			align-items: center;
			user-select: none;
		}
	`,ah([(_={flatten:!0},(e,t)=>{let{slot:i,selector:r}=_??{},o="slot"+(i?`[name=${i}]`:":not([name])");return eN(e,t,{get(){let e=this.renderRoot?.querySelector(o),t=e?.assignedElements(_)??[];return void 0===r?t:t.filter(e=>e.matches(r))}})})],ad.prototype,"actionNodes",2),ad=ah([eD("action-nav")],ad);let ap=F`
	:host {
		--checkbox-foreground: var(--vscode-checkbox-foreground);
		--checkbox-background: var(--vscode-checkbox-background);
		--checkbox-border: var(--vscode-checkbox-border);
		--checkbox-checked-foreground: var(--vscode-checkbox-foreground);
		--checkbox-checked-background: var(--vscode-checkbox-selectBackground);
		--checkbox-checked-border: var(--vscode-checkbox-selectBorder);
		--checkbox-active-background: var(--vscode-checkbox-selectBackground);
		--checkbox-active-border: var(--vscode-checkbox-selectBorder);
		--checkbox-hover-background: var(--vscode-inputOption-hoverBackground);
		--checkbox-radius: 3px;
		--checkbox-border-width: 1px;
		--checkbox-size: 1.6rem;
		--checkbox-spacing: 1rem;

		display: block;
		margin-block: 0.8rem;
	}

	label {
		display: flex;
		gap: var(--checkbox-spacing);
		align-items: center;
		user-select: none;
		white-space: nowrap;
		cursor: pointer;
		color: var(--checkbox-foreground);
	}

	:host([disabled]) label {
		cursor: default;
		opacity: 0.5;
	}

	.label-text {
		display: block;
		line-height: normal;
		margin-inline-end: var(--checkbox-spacing);
	}

	.input {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}
	.control {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: var(--checkbox-size);
		height: var(--checkbox-size);
		box-sizing: border-box;
		border-radius: var(--checkbox-radius);
		color: var(--checkbox-foreground);
		background: var(--checkbox-background);
		border: var(--checkbox-border-width, 1px) solid var(--vscode-checkbox-border);
		left: 1px;
	}

	.input:hover + .control {
		background-color: var(--checkbox-hover-background);
	}

	.input:focus-visible + .control,
	.input:focus + .control {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: 2px;
	}

	.input:active + .control {
		background-color: var(--checkbox-active-background);
		border-color: var(--checkbox-active-border);
	}

	:host([checked]) .control,
	:host([indeterminate]) .control {
		color: var(--checkbox-checked-foreground);
		background-color: var(--checkbox-checked-background);
		border-color: var(--checkbox-checked-border);
	}

	code-icon {
		pointer-events: none;
		visibility: hidden;
	}

	:host([checked]) code-icon,
	:host([indeterminate]) code-icon {
		visibility: visible;
	}
`;var au=Object.defineProperty,ag=Object.getOwnPropertyDescriptor,am=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ag(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&au(t,i,s),s};let af=class extends GlElement{constructor(){super(),this.disabled=!1,this.value="",this._defaultChecked=!1,this.checked=!1,this.indeterminate=!1,this._defaultChecked=this.checked}get defaultChecked(){return this._defaultChecked}handleChange(e){this.checked=e.target.checked,this.indeterminate=!1;let t=new CustomEvent("gl-change-value");this.dispatchEvent(t)}renderCheck(){return eC`<code-icon icon=${this.indeterminate?"dash":"check"}></code-icon>`}render(){return eC`<label ?aria-disabled=${this.disabled}
			><input
				class="input"
				.disabled=${this.disabled}
				type="checkbox"
				.checked=${this.checked}
				@change=${this.handleChange}
			/>
			<div class="control">${this.renderCheck()}</div>
			<slot class="label-text" part="label"></slot>
		</label>`}};af.shadowRootOptions={...GlElement.shadowRootOptions,delegatesFocus:!0},af.styles=[ap],am([eB({type:Boolean,reflect:!0})],af.prototype,"disabled",2),am([eB({type:String})],af.prototype,"value",2),am([eB({type:Boolean})],af.prototype,"defaultChecked",1),am([eB({type:Boolean,reflect:!0})],af.prototype,"checked",2),am([eB({type:Boolean,reflect:!0})],af.prototype,"indeterminate",2),af=am([eD("gl-checkbox")],af);var ab=T(90);let av=()=>new ref_h;let ref_h=class ref_h{};let a_=new WeakMap,ay=tx(class extends async_directive_f{render(e){return eA}update(e,[t]){let i=t!==this.G;return i&&void 0!==this.G&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),eA}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,i=a_.get(t);void 0===i&&(i=new WeakMap,a_.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?a_.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function aw(e,t,i,r){var o,s=arguments.length,a=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(s<3?o(a):s>3?o(t,i,a):o(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;let ak=(e,t,i)=>{let r=new Map;for(let o=t;o<=i;o++)r.set(e[o],o);return r},ax=tx(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);let o=[],s=[],a=0;for(let t of e)o[a]=r?r(t,a):a,s[a]=i(t,a),a++;return{values:s,keys:o}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,r]){let o=e._$AH,{values:s,keys:a}=this.dt(t,i,r);if(!Array.isArray(o))return this.ut=a,s;let c=this.ut??=[],h=[],p,u,g=0,m=o.length-1,f=0,b=s.length-1;for(;g<=m&&f<=b;)if(null===o[g])g++;else if(null===o[m])m--;else if(c[g]===a[f])h[f]=tE(o[g],s[f]),g++,f++;else if(c[m]===a[b])h[b]=tE(o[m],s[b]),m--,b--;else if(c[g]===a[b])h[b]=tE(o[g],s[b]),tS(e,h[b+1],o[g]),g++,b--;else if(c[m]===a[f])h[f]=tE(o[m],s[f]),tS(e,o[g],o[m]),m--,f++;else if(void 0===p&&(p=ak(a,f,b),u=ak(c,g,m)),p.has(c[g]))if(p.has(c[m])){let t=u.get(a[f]),i=void 0!==t?o[t]:null;if(null===i){let t=tS(e,o[g]);tE(t,s[f]),h[f]=t}else h[f]=tE(i,s[f]),tS(e,o[g],i),o[t]=null;f++}else tz(o[m]),m--;else tz(o[g]),g++;for(;f<=b;){let t=tS(e,h[b+1]);tE(t,s[f]),h[f++]=t}for(;g<=m;){let e=o[g++];null!==e&&tz(e)}return this.ut=a,tP(e,h),eE}});let RangeChangedEvent=class RangeChangedEvent extends Event{constructor(e){super(RangeChangedEvent.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};RangeChangedEvent.eventName="rangeChanged";let VisibilityChangedEvent=class VisibilityChangedEvent extends Event{constructor(e){super(VisibilityChangedEvent.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};VisibilityChangedEvent.eventName="visibilityChanged";let UnpinnedEvent=class UnpinnedEvent extends Event{constructor(){super(UnpinnedEvent.eventName,{bubbles:!1})}};UnpinnedEvent.eventName="unpinned";let ScrollerShim=class ScrollerShim{constructor(e){this._element=null;let t=e??window;this._node=t,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}};let ScrollerController=class ScrollerController extends ScrollerShim{constructor(e,t){super(t),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let i=this._node;this._originalScrollTo=i.scrollTo,this._originalScrollBy=i.scrollBy,this._originalScroll=i.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return null!==this._destination}scrollTo(e,t){this._scrollTo("number"==typeof e&&"number"==typeof t?{left:e,top:t}:e)}scrollBy(e,t){let i="number"==typeof e&&"number"==typeof t?{left:e,top:t}:e;void 0!==i.top&&(i.top+=this.scrollTop),void 0!==i.left&&(i.left+=this.scrollLeft),this._scrollTo(i)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,t=null,i=null){null!==this._end&&this._end(),"smooth"===e.behavior?(this._setDestination(e),this._retarget=t,this._end=i):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:t,left:i}=e;return t=void 0===t?void 0:Math.max(0,Math.min(t,this.maxScrollTop)),i=void 0===i?void 0:Math.max(0,Math.min(i,this.maxScrollLeft)),(null===this._destination||i!==this._destination.left||t!==this._destination.top)&&(this.__destination={top:t,left:i,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,t,i){return this._scrollTo(e,t,i),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(null!==this._destination){let{scrollTop:e,scrollLeft:t}=this,{top:i,left:r}=this._destination;i=Math.min(i||0,this.maxScrollTop);let o=Math.abs((r=Math.min(r||0,this.maxScrollLeft))-t);1>Math.abs(i-e)&&o<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients.delete(e),0===this._clients.size&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.add(e),1===this._clients.size&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};let a$="u">typeof window?window.ResizeObserver:void 0,aC=Symbol("virtualizerRef"),aS="virtualizer-sizer";let Virtualizer=class Virtualizer{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!e)throw Error("Virtualizer constructor requires a configuration object");if(e.hostElement)this._init(e);else throw Error('Virtualizer configuration requires the "hostElement" property')}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e);let t=e.layout||{};this._layoutInitialized=this._initLayout(t)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new a$(()=>this._hostElementSizeChanged()),this._childrenRO=new a$(this._childrenSizeChanged.bind(this))}_initHostElement(e){let t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[aC]=this}connected(){this._initObservers();let e=this._isScroller;this._clippingAncestors=function(e,t=!1){let i=!1;return(function(e,t=!1){let i=[],r=t?e:aA(e);for(;null!==r;)i.push(r),r=aA(r);return i})(e,t).filter(e=>{if(i)return!1;let t=getComputedStyle(e);return i="fixed"===t.position,"visible"!==t.overflow})}(this._hostElement,e),this._scrollerController=new ScrollerController(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(e=>this._childrenRO.observe(e)),this._scrollEventListeners.forEach(e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let e=this._hostElement;if(!this._sizer){let t=e.querySelector(`[${aS}]`);t||((t=document.createElement("div")).setAttribute(aS,""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.textContent="&nbsp;",t.setAttribute(aS,""),this._sizer=t}return this._sizer}async updateLayoutConfig(e){await this._layoutInitialized;let t=e.type||m;if("function"==typeof t&&this._layout instanceof t){let t={...e};return delete t.type,this._layout.config=t,!0}return!1}async _initLayout(e){let t,i;if("function"==typeof e.type){i=e.type;let r={...e};delete r.type,t=r}else t=e;void 0===i&&(m=i=(await Promise.resolve().then(T.bind(T,90))).FlowLayout),this._layout=new i(e=>this._handleLayoutMessage(e),t),this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){let e=window.performance.now(),t=e-this._benchmarkStart,i=performance.getEntriesByName("uv-virtualizing","measure").filter(t=>t.startTime>=this._benchmarkStart&&t.startTime<e).reduce((e,t)=>e+t.duration,0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:i}}return null}_measureChildren(){let e={},t=this._children,i=this._measureChildOverride||this._measureChild;for(let r=0;r<t.length;r++){let o=t[r],s=this._first+r;(this._itemsChanged||this._toBeMeasured.has(o))&&(e[s]=i.call(this,o,this._items[s]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){var t;let i,{width:r,height:o}=e.getBoundingClientRect();return Object.assign({width:r,height:o},(t=e,{marginTop:aE((i=window.getComputedStyle(t)).marginTop),marginRight:aE(i.marginRight),marginBottom:aE(i.marginBottom),marginLeft:aE(i.marginLeft)}))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(e){this._scrollSize=e.scrollSize,this._adjustRange(e.range),this._childrenPos=e.childPositions,this._scrollError=e.scrollError||null;let{_rangeChanged:t,_itemsChanged:i}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(t||i)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(e=>this._childrenRO.observe(e)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch{}window.performance.mark("uv-start")}!1===this._scrollerController.correctingScrollError&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(e){"scroll"===e.type&&(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent()}_handleLayoutMessage(e){"stateChanged"===e.type?this._updateDOM(e):"visibilityChanged"===e.type?(this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._notifyVisibility()):"unpinned"===e.type&&this._hostElement.dispatchEvent(new UnpinnedEvent)}get _children(){let e=[],t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute(aS)||e.push(t),t=t.nextElementSibling;return e}_updateView(){let e=this._hostElement,t=this._scrollerController?.element,i=this._layout;if(e&&t&&i){let r,o,s,a,c=e.getBoundingClientRect();r=0,o=0,s=window.innerHeight,a=window.innerWidth;let h=this._clippingAncestors.map(e=>e.getBoundingClientRect());for(let e of(h.unshift(c),h))r=Math.max(r,e.top),o=Math.max(o,e.left),s=Math.min(s,e.bottom),a=Math.min(a,e.right);let p=t.getBoundingClientRect(),u={left:c.left-p.left,top:c.top-p.top},g={width:t.scrollWidth,height:t.scrollHeight},m=r-c.top+e.scrollTop,f=o-c.left+e.scrollLeft;i.viewportSize={width:Math.max(0,a-o),height:Math.max(0,s-r)},i.viewportScroll={top:m,left:f},i.totalScrollSize=g,i.offsetWithinScroller=u}}_sizeHostElement(e){let t=e&&null!==e.width?Math.min(82e5,e.width):0,i=e&&null!==e.height?Math.min(82e5,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${t}px, ${i}px)`;else{let e=this._hostElement.style;e.minWidth=t?`${t}px`:"100%",e.minHeight=i?`${i}px`:"100%"}}_positionChildren(e){e&&e.forEach(({top:e,left:t,width:i,height:r,xOffset:o,yOffset:s},a)=>{let c=this._children[a-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${t}px, ${e}px)`,void 0!==i&&(c.style.width=i+"px"),void 0!==r&&(c.style.height=r+"px"),c.style.left=void 0===o?null:o+"px",c.style.top=void 0===s?null:s+"px")})}async _adjustRange(e){let{_first:t,_last:i,_firstVisible:r,_lastVisible:o}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==i,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==r||this._lastVisible!==o}_correctScrollError(){if(this._scrollError){let{scrollTop:e,scrollLeft:t}=this._scrollerController,{top:i,left:r}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-i,left:t-r})}}element(e){return e===1/0&&(e=this._items.length-1),this._items?.[e]===void 0?void 0:{scrollIntoView:(t={})=>this._scrollElementIntoView({...t,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),"smooth"===e.behavior){let t=this._layout.getScrollIntoViewCoordinates(e),{behavior:i}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(t,{behavior:i}),()=>this._layout.getScrollIntoViewCoordinates(e),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){let{index:t}=this._scrollIntoViewTarget||{};t&&e?.has(t)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new RangeChangedEvent({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new VisibilityChangedEvent({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((e,t)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=t})),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){null!==this._layoutCompleteRejecter&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&null===this._pendingLayoutComplete&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){null!==this._layoutCompleteResolver&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout?.measureChildren){for(let t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function aE(e){let t=e?parseFloat(e):NaN;return Number.isNaN(t)?0:t}function aA(e){if(null!==e.assignedSlot)return e.assignedSlot;if(null!==e.parentElement)return e.parentElement;let t=e.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}let aP=e=>e,az=(e,t)=>eC`${t}: ${JSON.stringify(e,null,2)}`;let VirtualizeDirective=class VirtualizeDirective extends async_directive_f{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,t)=>az(e,t+this._first),this._keyFunction=(e,t)=>aP(e,this._first),this._items=[],2!==e.type)throw Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);let t=[];if(this._first>=0&&this._last>=this._first)for(let e=this._first;e<=this._last;e++)t.push(this._items[e]);return ax(t,this._keyFunction,this._renderItem)}update(e,[t]){this._setFunctions(t);let i=this._items!==t.items;return this._items=t.items||[],this._virtualizer?this._updateVirtualizerConfig(e,t):this._initialize(e,t),i?eE:this.render()}async _updateVirtualizerConfig(e,t){if(!await this._virtualizer.updateLayoutConfig(t.layout||{})){let i=e.parentNode;this._makeVirtualizer(i,t)}this._virtualizer.items=this._items}_setFunctions(e){let{renderItem:t,keyFunction:i}=e;t&&(this._renderItem=(e,i)=>t(e,i+this._first)),i&&(this._keyFunction=(e,t)=>i(e,t+this._first))}_makeVirtualizer(e,t){this._virtualizer&&this._virtualizer.disconnected();let{layout:i,scroller:r,items:o}=t;this._virtualizer=new Virtualizer({hostElement:e,layout:i,scroller:r}),this._virtualizer.items=o,this._virtualizer.connected()}_initialize(e,t){let i=e.parentNode;i&&1===i.nodeType&&(i.addEventListener("rangeChanged",e=>{this._first=e.first,this._last=e.last,this.setValue(this.render())}),this._makeVirtualizer(i,t))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}};let aR=tx(VirtualizeDirective);let LitVirtualizer=class LitVirtualizer extends lit_element_i{constructor(){super(...arguments),this.items=[],this.renderItem=az,this.keyFunction=aP,this.layout={},this.scroller=!1}createRenderRoot(){return this}render(){let{items:e,renderItem:t,keyFunction:i,layout:r,scroller:o}=this;return eC`${aR({items:e,renderItem:t,keyFunction:i,layout:r,scroller:o})}`}element(e){return this[aC]?.element(e)}get layoutComplete(){return this[aC]?.layoutComplete}scrollToIndex(e,t="start"){this.element(e)?.scrollIntoView({block:t})}};aw([eB({attribute:!1})],LitVirtualizer.prototype,"items",void 0),aw([eB()],LitVirtualizer.prototype,"renderItem",void 0),aw([eB()],LitVirtualizer.prototype,"keyFunction",void 0),aw([eB({attribute:!1})],LitVirtualizer.prototype,"layout",void 0),aw([eB({reflect:!0,type:Boolean})],LitVirtualizer.prototype,"scroller",void 0),customElements.define("lit-virtualizer",LitVirtualizer);var aI=Object.defineProperty,aT=Object.getOwnPropertyDescriptor,aM=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?aT(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&aI(t,i,s),s};let aj=class extends lit_element_i{constructor(){super(...arguments),this.size=12,this.worktree=!1,this.chevron=!1,this.onKeydown=e=>{"button"===this.appearance&&("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}updated(e){e.has("appearance")&&("button"===this.appearance?(this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")):("button"===this.getAttribute("role")&&this.removeAttribute("role"),"0"===this.getAttribute("tabindex")&&this.removeAttribute("tabindex")))}render(){let e=this.icon??(this.worktree?"gl-worktree":"git-branch");return eC`<code-icon class="icon" icon="${e}" size="${this.size}"></code-icon
			><span class="label">${this.name??"<missing>"}</span>${this.chevron?eC`<code-icon class="chevron" icon="chevron-down" size="12"></code-icon>`:eA}`}};function aO(e,t){return eC`<gl-branch-name .name=${e} .size=${12} ?worktree=${t??!1}></gl-branch-name>`}aj.styles=F`
		:host {
			display: inline-flex;
			align-items: baseline;
			min-width: 0;
			max-width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-inline: 0.2rem;
		}

		:host([appearance='pill']) {
			padding: 0.1rem 0.6rem;
			border-radius: 0.3rem;
			background-color: color-mix(
				in srgb,
				var(--gl-branch-color, var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0)) 15%,
				transparent
			);
			color: var(--gl-branch-color, var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0));
		}

		:host([appearance='button']) {
			padding: 0.2rem 0.4rem;
			border-radius: var(--gk-action-radius, 0.3rem);
			cursor: pointer;
			color: var(--gl-branch-color, var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, inherit));
			font-size: var(--gl-font-base);
		}

		:host([appearance='button']:hover) {
			background: var(--vscode-toolbar-hoverBackground);
		}

		:host([appearance='button']:focus-visible) {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		:host(:focus:not([appearance='button'])) {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		.icon {
			margin-right: 0.3rem;
			align-self: center;
		}

		.label {
			font-weight: 600;
			/* Block-level box (default span is inline → text-overflow is ignored). flex 1 1 auto
			   lets the label both grow into available space and shrink when the parent narrows;
			   min-width: 0 unlocks shrinking past intrinsic content size. */
			display: block;
			flex: 1 1 auto;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.chevron {
			margin-left: 0.2rem;
			align-self: center;
			flex-shrink: 0;
		}
	`,aM([eB({reflect:!0})],aj.prototype,"appearance",2),aM([eB({type:String})],aj.prototype,"name",2),aM([eB({type:Number})],aj.prototype,"size",2),aM([eB({type:Boolean})],aj.prototype,"worktree",2),aM([eB({type:Boolean})],aj.prototype,"chevron",2),aM([eB()],aj.prototype,"icon",2),aj=aM([eD("gl-branch-name")],aj);var aD=Object.defineProperty,aL=Object.getOwnPropertyDescriptor,aB=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?aL(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&aD(t,i,s),s};let aF=class extends lit_element_i{constructor(){super(...arguments),this.hasChanges=!1,this.worktree=!1,this.isDefault=!1}render(){return eC`<gl-tooltip placement="bottom"
			>${this.renderIcon()}<span slot="content">${this.renderTooltipContent()}</span></gl-tooltip
		>`}renderIcon(){let e;if(!this.worktree&&(!this.status||"local"===this.status))return eC`<code-icon icon="git-branch"></code-icon>`;if("detached"===this.status)return eC`<code-icon icon="git-commit"></code-icon>`;let t="0.5";switch(this.status){case"diverged":e="var(--gl-icon-color-status-diverged)";break;case"behind":e="var(--gl-icon-color-status-behind)";break;case"ahead":e="var(--gl-icon-color-status-ahead)";break;case"missingUpstream":e="var(--gl-icon-color-status-missingUpstream)";break;case"upToDate":e=`var(--gl-icon-color-status-${this.hasChanges?"changes":"synced"})`;break;default:this.hasChanges?e="var(--gl-icon-color-status-changes)":(e="transparent",t="1")}return this.worktree&&!1===this.isDefault?eS`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="var(--gl-icon-color-foreground, #c5c5c5)"
					d="M13.5 4h.501v1.003h-.2a5.5 5.5 0 0 1 1.2.755V3.5l-.5-.5H13.5v1zm-4 0V3H7.713l-.852-.854L6.507 2H1.511l-.5.5v3.996L1 6.507v6.995l.5.5h6.227a5.528 5.528 0 0 1-.836-1H2V7.496h.01v-.489h4.486l.354-.146.858-.858h.014a5.51 5.51 0 0 1 1.477-1H7.5l-.353.147-.858.857H2.011V3H6.3l.853.853.353.146H9.5z"
				/>
				<path
					fill="${e}"
					stroke="var(--gl-icon-color-foreground, #c5c5c5)"
					stroke-width="${t}"
					d="M11.5 6.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z"
				/>
				<path stroke="var(--gl-icon-color-foreground, #c5c5c5)" d="M11.5 13v3M11.5 1v6" />
			</svg>`:eS`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="${e}"
				stroke="var(--gl-icon-color-foreground, #c5c5c5)"
				stroke-width="${t}"
				d="M12 10.25a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5z"
			/>
			<path
				fill="var(--gl-icon-color-foreground, #c5c5c5)"
				d="M6 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 5.95a2.5 2.5 0 1 0-1 0v4.1a2.5 2.5 0 1 0 1.165.04c.168-.38.383-.622.61-.78.327-.227.738-.32 1.214-.31H7c.387 0 .76.03 1.124.059l.026.002c.343.027.694.055 1.003.046.313-.01.661-.06.954-.248.29-.185.466-.466.544-.812a.756.756 0 0 1 .046-.055 2.5 2.5 0 1 0-1.03-.134c-.028.108-.07.14-.1.16-.063.04-.191.08-.446.089a8.783 8.783 0 0 1-.917-.045A14.886 14.886 0 0 0 7.005 8c-.61-.013-1.249.105-1.8.488-.07.05-.14.102-.205.159V5.95zm7-.45a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-9 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
			/>
		</svg>`}renderTooltipContent(){let e,t=this.branch?aO(this.branch):"Branch",i=this.upstream?aO(this.upstream):"its upstream";switch(this.status){case"diverged":e=eC`${t} has diverged from ${i}`;break;case"behind":e=eC`${t} is behind ${i}`;break;case"ahead":e=eC`${t} is ahead of ${i}`;break;case"missingUpstream":e=eC`${t} is missing its upstream ${i}`;break;case"upToDate":e=eC`${t} is up to date with ${i}`;break;case"local":e=eC`${t} is a local branch which hasn't been published`;break;case"remote":e=eC`${t} is a remote branch`;break;case"detached":e=eC`${t} is in a detached state, i.e. checked out to a commit or tag`;break;default:e=eC`${t} is in an unknown state`}return e=eC`<p>${e}</p>`,this.worktree?e=this.hasChanges?eC`${e}
					<p>Checked out in a worktree and has working (uncommitted) changes</p>`:eC`${e}
					<p>Checked out in a worktree</p>`:this.hasChanges&&(e=eC`${e}
				<p>Has working (uncommitted) changes</p>`),e}};aF.styles=F`
		:host {
			display: inline-flex;
			width: 16px;
			height: 16px;

			--gl-icon-color-foreground: var(--vscode-foreground, #c5c5c5);

			--gl-icon-color-status-synced: var(
				--gl-icon-color-foreground,
				var(--vscode-gitlens-decoration\\.branchUpToDateForegroundColor)
			);
			--gl-icon-color-status-diverged: var(--vscode-gitlens-decorations\\.branchDivergedForegroundColor, #ff5);
			--gl-icon-color-status-behind: var(--vscode-gitlens-decorations\\.branchBehindForegroundColor, #f05);
			--gl-icon-color-status-ahead: var(--vscode-gitlens-decorations\\.branchAheadForegroundColor, #0f5);
			--gl-icon-color-status-missingUpstream: var(
				--vscode-gitlens-decorations\\.branchMissingUpstreamForegroundColor,
				#c74e39
			);
			--gl-icon-color-status-changes: #1a79ff;
		}

		:host-context(.vscode-dark),
		:host-context(.vscode-high-contrast) {
			--gl-icon-color-foreground: #c5c5c5;
		}

		:host-context(.vscode-light),
		:host-context(.vscode-high-contrast-light) {
			--gl-icon-color-foreground: #424242;
		}

		p {
			margin: 0;
		}

		p + p {
			margin-top: 0.4rem;
		}

		svg {
			width: 100%;
			height: 100%;
			margin-top: -0.2rem;
			vertical-align: middle;
		}
	`,aB([eB({type:String})],aF.prototype,"branch",2),aB([eB({type:String})],aF.prototype,"status",2),aB([eB({type:Boolean})],aF.prototype,"hasChanges",2),aB([eB({type:String})],aF.prototype,"upstream",2),aB([eB({type:Boolean})],aF.prototype,"worktree",2),aB([eB({type:Boolean,attribute:"is-default"})],aF.prototype,"isDefault",2),aF=aB([eD("gl-branch-icon")],aF);let aN="important",aq=" !"+aN,aU=tx(class extends directive_i{constructor(e){if(super(e),1!==e.type||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{let r=e[i];return null==r?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){let{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(let e in t){let r=t[e];if(null!=r){this.ft.add(e);let t="string"==typeof r&&r.endsWith(aq);e.includes("-")||t?i.setProperty(e,t?r.slice(0,-11):r,t?aN:""):i[e]=r}}return eE}}),aW={_argdown:["\\E003","#519aba"],_argdown_light:["\\E003","#498ba7"],_asm:["\\E004","#cc3e44"],_asm_light:["\\E004","#b8383d"],_audio:["\\E005","#a074c4"],_audio_light:["\\E005","#9068b0"],_babel:["\\E006","#cbcb41"],_babel_light:["\\E006","#b7b73b"],_bazel:["\\E007","#8dc149"],_bazel_1:["\\E007","#4d5a5e"],_bazel_1_light:["\\E007","#455155"],_bazel_light:["\\E007","#7fae42"],_bicep:["\\E008","#519aba"],_bicep_light:["\\E008","#498ba7"],_bower:["\\E009","#e37933"],_bower_light:["\\E009","#cc6d2e"],_bsl:["\\E00A","#cc3e44"],_bsl_light:["\\E00A","#b8383d"],_c:["\\E00C","#519aba"],_c_1:["\\E00C","#a074c4"],_c_1_light:["\\E00C","#9068b0"],_c_2:["\\E00C","#cbcb41"],_c_2_light:["\\E00C","#b7b73b"],_c_light:["\\E00C","#498ba7"],"_c-sharp":["\\E00B","#519aba"],"_c-sharp_light":["\\E00B","#498ba7"],_cake:["\\E00D","#cc3e44"],_cake_light:["\\E00D","#b8383d"],_cake_php:["\\E00E","#cc3e44"],_cake_php_light:["\\E00E","#b8383d"],_clock:["\\E012","#519aba"],_clock_1:["\\E012","#6d8086"],_clock_1_light:["\\E012","#627379"],_clock_light:["\\E012","#498ba7"],_clojure:["\\E013","#8dc149"],_clojure_1:["\\E013","#519aba"],_clojure_1_light:["\\E013","#498ba7"],_clojure_light:["\\E013","#7fae42"],"_code-climate":["\\E014","#8dc149"],"_code-climate_light":["\\E014","#7fae42"],"_code-search":["\\E015","#a074c4"],"_code-search_light":["\\E015","#9068b0"],_coffee:["\\E016","#cbcb41"],_coffee_light:["\\E016","#b7b73b"],_coldfusion:["\\E018","#519aba"],_coldfusion_light:["\\E018","#498ba7"],_config:["\\E019","#6d8086"],_config_light:["\\E019","#627379"],_cpp:["\\E01A","#519aba"],_cpp_1:["\\E01A","#a074c4"],_cpp_1_light:["\\E01A","#9068b0"],_cpp_2:["\\E01A","#cbcb41"],_cpp_2_light:["\\E01A","#b7b73b"],_cpp_light:["\\E01A","#498ba7"],_crystal:["\\E01B","#d4d7d6"],_crystal_embedded:["\\E01C","#d4d7d6"],_crystal_embedded_light:["\\E01C","#bfc2c1"],_crystal_light:["\\E01B","#bfc2c1"],_css:["\\E01D","#519aba"],_css_light:["\\E01D","#498ba7"],_csv:["\\E01E","#8dc149"],_csv_light:["\\E01E","#7fae42"],_cu:["\\E01F","#8dc149"],_cu_1:["\\E01F","#a074c4"],_cu_1_light:["\\E01F","#9068b0"],_cu_light:["\\E01F","#7fae42"],_d:["\\E020","#cc3e44"],_d_light:["\\E020","#b8383d"],_dart:["\\E021","#519aba"],_dart_light:["\\E021","#498ba7"],_db:["\\E022","#f55385"],_db_1:["\\E022","#519aba"],_db_1_light:["\\E022","#498ba7"],_db_light:["\\E022","#dd4b78"],_default:["\\E023","#d4d7d6"],_default_light:["\\E023","#bfc2c1"],_docker:["\\E025","#519aba"],_docker_1:["\\E025","#4d5a5e"],_docker_1_light:["\\E025","#455155"],_docker_2:["\\E025","#8dc149"],_docker_2_light:["\\E025","#7fae42"],_docker_3:["\\E025","#f55385"],_docker_3_light:["\\E025","#dd4b78"],_docker_light:["\\E025","#498ba7"],_ejs:["\\E027","#cbcb41"],_ejs_light:["\\E027","#b7b73b"],_elixir:["\\E028","#a074c4"],_elixir_light:["\\E028","#9068b0"],_elixir_script:["\\E029","#a074c4"],_elixir_script_light:["\\E029","#9068b0"],_elm:["\\E02A","#519aba"],_elm_light:["\\E02A","#498ba7"],_eslint:["\\E02C","#a074c4"],_eslint_1:["\\E02C","#4d5a5e"],_eslint_1_light:["\\E02C","#455155"],_eslint_light:["\\E02C","#9068b0"],_ethereum:["\\E02D","#519aba"],_ethereum_light:["\\E02D","#498ba7"],"_f-sharp":["\\E02E","#519aba"],"_f-sharp_light":["\\E02E","#498ba7"],_favicon:["\\E02F","#cbcb41"],_favicon_light:["\\E02F","#b7b73b"],_firebase:["\\E030","#e37933"],_firebase_light:["\\E030","#cc6d2e"],_firefox:["\\E031","#e37933"],_firefox_light:["\\E031","#cc6d2e"],_font:["\\E033","#cc3e44"],_font_light:["\\E033","#b8383d"],_git:["\\E034","#41535b"],_git_light:["\\E034","#3b4b52"],_github:["\\E037","#d4d7d6"],_github_light:["\\E037","#bfc2c1"],_gitlab:["\\E038","#e37933"],_gitlab_light:["\\E038","#cc6d2e"],_go:["\\E039","#519aba"],_go_light:["\\E039","#498ba7"],_go2:["\\E03A","#519aba"],_go2_light:["\\E03A","#498ba7"],_godot:["\\E03B","#519aba"],_godot_1:["\\E03B","#cc3e44"],_godot_1_light:["\\E03B","#b8383d"],_godot_2:["\\E03B","#cbcb41"],_godot_2_light:["\\E03B","#b7b73b"],_godot_3:["\\E03B","#a074c4"],_godot_3_light:["\\E03B","#9068b0"],_godot_light:["\\E03B","#498ba7"],_gradle:["\\E03C","#519aba"],_gradle_light:["\\E03C","#498ba7"],_grails:["\\E03D","#8dc149"],_grails_light:["\\E03D","#7fae42"],_graphql:["\\E03E","#f55385"],_graphql_light:["\\E03E","#dd4b78"],_grunt:["\\E03F","#e37933"],_grunt_light:["\\E03F","#cc6d2e"],_gulp:["\\E040","#cc3e44"],_gulp_light:["\\E040","#b8383d"],_hacklang:["\\E041","#e37933"],_hacklang_light:["\\E041","#cc6d2e"],_haml:["\\E042","#cc3e44"],_haml_light:["\\E042","#b8383d"],_happenings:["\\E043","#519aba"],_happenings_light:["\\E043","#498ba7"],_haskell:["\\E044","#a074c4"],_haskell_light:["\\E044","#9068b0"],_haxe:["\\E045","#e37933"],_haxe_1:["\\E045","#cbcb41"],_haxe_1_light:["\\E045","#b7b73b"],_haxe_2:["\\E045","#519aba"],_haxe_2_light:["\\E045","#498ba7"],_haxe_3:["\\E045","#a074c4"],_haxe_3_light:["\\E045","#9068b0"],_haxe_light:["\\E045","#cc6d2e"],_heroku:["\\E046","#a074c4"],_heroku_light:["\\E046","#9068b0"],_hex:["\\E047","#cc3e44"],_hex_light:["\\E047","#b8383d"],_html:["\\E048","#519aba"],_html_1:["\\E048","#8dc149"],_html_1_light:["\\E048","#7fae42"],_html_2:["\\E048","#cbcb41"],_html_2_light:["\\E048","#b7b73b"],_html_3:["\\E048","#e37933"],_html_3_light:["\\E048","#cc6d2e"],_html_erb:["\\E049","#cc3e44"],_html_erb_light:["\\E049","#b8383d"],_html_light:["\\E048","#498ba7"],_ignored:["\\E04A","#41535b"],_ignored_light:["\\E04A","#3b4b52"],_illustrator:["\\E04B","#cbcb41"],_illustrator_light:["\\E04B","#b7b73b"],_image:["\\E04C","#a074c4"],_image_light:["\\E04C","#9068b0"],_info:["\\E04D","#519aba"],_info_light:["\\E04D","#498ba7"],_ionic:["\\E04E","#519aba"],_ionic_light:["\\E04E","#498ba7"],_jade:["\\E04F","#cc3e44"],_jade_light:["\\E04F","#b8383d"],_java:["\\E050","#cc3e44"],_java_1:["\\E050","#519aba"],_java_1_light:["\\E050","#498ba7"],_java_light:["\\E050","#b8383d"],_javascript:["\\E051","#cbcb41"],_javascript_1:["\\E051","#e37933"],_javascript_1_light:["\\E051","#cc6d2e"],_javascript_2:["\\E051","#519aba"],_javascript_2_light:["\\E051","#498ba7"],_javascript_light:["\\E051","#b7b73b"],_jenkins:["\\E052","#cc3e44"],_jenkins_light:["\\E052","#b8383d"],_jinja:["\\E053","#cc3e44"],_jinja_light:["\\E053","#b8383d"],_json:["\\E055","#cbcb41"],_json_1:["\\E055","#8dc149"],_json_1_light:["\\E055","#7fae42"],_json_light:["\\E055","#b7b73b"],_julia:["\\E056","#a074c4"],_julia_light:["\\E056","#9068b0"],_karma:["\\E057","#8dc149"],_karma_light:["\\E057","#7fae42"],_kotlin:["\\E058","#e37933"],_kotlin_light:["\\E058","#cc6d2e"],_less:["\\E059","#519aba"],_less_light:["\\E059","#498ba7"],_license:["\\E05A","#cbcb41"],_license_1:["\\E05A","#e37933"],_license_1_light:["\\E05A","#cc6d2e"],_license_2:["\\E05A","#cc3e44"],_license_2_light:["\\E05A","#b8383d"],_license_light:["\\E05A","#b7b73b"],_liquid:["\\E05B","#8dc149"],_liquid_light:["\\E05B","#7fae42"],_livescript:["\\E05C","#519aba"],_livescript_light:["\\E05C","#498ba7"],_lock:["\\E05D","#8dc149"],_lock_light:["\\E05D","#7fae42"],_lua:["\\E05E","#519aba"],_lua_light:["\\E05E","#498ba7"],_makefile:["\\E05F","#e37933"],_makefile_1:["\\E05F","#a074c4"],_makefile_1_light:["\\E05F","#9068b0"],_makefile_2:["\\E05F","#6d8086"],_makefile_2_light:["\\E05F","#627379"],_makefile_3:["\\E05F","#519aba"],_makefile_3_light:["\\E05F","#498ba7"],_makefile_light:["\\E05F","#cc6d2e"],_markdown:["\\E060","#519aba"],_markdown_light:["\\E060","#498ba7"],_maven:["\\E061","#cc3e44"],_maven_light:["\\E061","#b8383d"],_mdo:["\\E062","#cc3e44"],_mdo_light:["\\E062","#b8383d"],_mustache:["\\E063","#e37933"],_mustache_light:["\\E063","#cc6d2e"],_nim:["\\E065","#cbcb41"],_nim_light:["\\E065","#b7b73b"],_notebook:["\\E066","#519aba"],_notebook_light:["\\E066","#498ba7"],_npm:["\\E067","#41535b"],_npm_1:["\\E067","#cc3e44"],_npm_1_light:["\\E067","#b8383d"],_npm_ignored:["\\E068","#41535b"],_npm_ignored_light:["\\E068","#3b4b52"],_npm_light:["\\E067","#3b4b52"],_nunjucks:["\\E069","#8dc149"],_nunjucks_light:["\\E069","#7fae42"],_ocaml:["\\E06A","#e37933"],_ocaml_light:["\\E06A","#cc6d2e"],_odata:["\\E06B","#e37933"],_odata_light:["\\E06B","#cc6d2e"],_pddl:["\\E06C","#a074c4"],_pddl_light:["\\E06C","#9068b0"],_pdf:["\\E06D","#cc3e44"],_pdf_light:["\\E06D","#b8383d"],_perl:["\\E06E","#519aba"],_perl_light:["\\E06E","#498ba7"],_photoshop:["\\E06F","#519aba"],_photoshop_light:["\\E06F","#498ba7"],_php:["\\E070","#a074c4"],_php_light:["\\E070","#9068b0"],_pipeline:["\\E071","#e37933"],_pipeline_light:["\\E071","#cc6d2e"],_plan:["\\E072","#8dc149"],_plan_light:["\\E072","#7fae42"],_platformio:["\\E073","#e37933"],_platformio_light:["\\E073","#cc6d2e"],_powershell:["\\E074","#519aba"],_powershell_light:["\\E074","#498ba7"],_prisma:["\\E075","#519aba"],_prisma_light:["\\E075","#498ba7"],_prolog:["\\E077","#e37933"],_prolog_light:["\\E077","#cc6d2e"],_pug:["\\E078","#cc3e44"],_pug_light:["\\E078","#b8383d"],_puppet:["\\E079","#cbcb41"],_puppet_light:["\\E079","#b7b73b"],_purescript:["\\E07A","#d4d7d6"],_purescript_light:["\\E07A","#bfc2c1"],_python:["\\E07B","#519aba"],_python_light:["\\E07B","#498ba7"],_R:["\\E001","#519aba"],_R_light:["\\E001","#498ba7"],_react:["\\E07D","#519aba"],_react_1:["\\E07D","#e37933"],_react_1_light:["\\E07D","#cc6d2e"],_react_light:["\\E07D","#498ba7"],_reasonml:["\\E07E","#cc3e44"],_reasonml_light:["\\E07E","#b8383d"],_rescript:["\\E07F","#cc3e44"],_rescript_1:["\\E07F","#f55385"],_rescript_1_light:["\\E07F","#dd4b78"],_rescript_light:["\\E07F","#b8383d"],_rollup:["\\E080","#cc3e44"],_rollup_light:["\\E080","#b8383d"],_ruby:["\\E081","#cc3e44"],_ruby_light:["\\E081","#b8383d"],_rust:["\\E082","#6d8086"],_rust_light:["\\E082","#627379"],_salesforce:["\\E083","#519aba"],_salesforce_light:["\\E083","#498ba7"],_sass:["\\E084","#f55385"],_sass_light:["\\E084","#dd4b78"],_sbt:["\\E085","#519aba"],_sbt_light:["\\E085","#498ba7"],_scala:["\\E086","#cc3e44"],_scala_light:["\\E086","#b8383d"],_shell:["\\E089","#8dc149"],_shell_light:["\\E089","#7fae42"],_slim:["\\E08A","#e37933"],_slim_light:["\\E08A","#cc6d2e"],_smarty:["\\E08B","#cbcb41"],_smarty_light:["\\E08B","#b7b73b"],_spring:["\\E08C","#8dc149"],_spring_light:["\\E08C","#7fae42"],_stylelint:["\\E08D","#d4d7d6"],_stylelint_1:["\\E08D","#4d5a5e"],_stylelint_1_light:["\\E08D","#455155"],_stylelint_light:["\\E08D","#bfc2c1"],_stylus:["\\E08E","#8dc149"],_stylus_light:["\\E08E","#7fae42"],_sublime:["\\E08F","#e37933"],_sublime_light:["\\E08F","#cc6d2e"],_svelte:["\\E090","#cc3e44"],_svelte_light:["\\E090","#b8383d"],_svg:["\\E091","#a074c4"],_svg_1:["\\E091","#519aba"],_svg_1_light:["\\E091","#498ba7"],_svg_light:["\\E091","#9068b0"],_swift:["\\E092","#e37933"],_swift_light:["\\E092","#cc6d2e"],_terraform:["\\E093","#a074c4"],_terraform_light:["\\E093","#9068b0"],_tex:["\\E094","#519aba"],_tex_1:["\\E094","#cbcb41"],_tex_1_light:["\\E094","#b7b73b"],_tex_2:["\\E094","#e37933"],_tex_2_light:["\\E094","#cc6d2e"],_tex_3:["\\E094","#d4d7d6"],_tex_3_light:["\\E094","#bfc2c1"],_tex_light:["\\E094","#498ba7"],_todo:["\\E096",""],_tsconfig:["\\E097","#519aba"],_tsconfig_light:["\\E097","#498ba7"],_twig:["\\E098","#8dc149"],_twig_light:["\\E098","#7fae42"],_typescript:["\\E099","#519aba"],_typescript_1:["\\E099","#e37933"],_typescript_1_light:["\\E099","#cc6d2e"],_typescript_light:["\\E099","#498ba7"],_vala:["\\E09A","#6d8086"],_vala_light:["\\E09A","#627379"],_video:["\\E09B","#f55385"],_video_light:["\\E09B","#dd4b78"],_vite:["\\E09C","#cbcb41"],_vite_light:["\\E09C","#b7b73b"],_vue:["\\E09D","#8dc149"],_vue_light:["\\E09D","#7fae42"],_wasm:["\\E09E","#a074c4"],_wasm_light:["\\E09E","#9068b0"],_wat:["\\E09F","#a074c4"],_wat_light:["\\E09F","#9068b0"],_webpack:["\\E0A0","#519aba"],_webpack_light:["\\E0A0","#498ba7"],_wgt:["\\E0A1","#519aba"],_wgt_light:["\\E0A1","#498ba7"],_windows:["\\E0A2","#519aba"],_windows_light:["\\E0A2","#498ba7"],_word:["\\E0A3","#519aba"],_word_light:["\\E0A3","#498ba7"],_xls:["\\E0A4","#8dc149"],_xls_light:["\\E0A4","#7fae42"],_xml:["\\E0A5","#e37933"],_xml_light:["\\E0A5","#cc6d2e"],_yarn:["\\E0A6","#519aba"],_yarn_light:["\\E0A6","#498ba7"],_yml:["\\E0A7","#a074c4"],_yml_light:["\\E0A7","#9068b0"],_zig:["\\E0A8","#e37933"],_zig_light:["\\E0A8","#cc6d2e"],_zip:["\\E0A9","#cc3e44"],_zip_1:["\\E0A9","#6d8086"],_zip_1_light:["\\E0A9","#627379"],_zip_light:["\\E0A9","#b8383d"]},aH={"babel.config.cjs":"_babel","babel.config.js":"_babel","babel.config.json":"_babel","bower.json":"_bower",build:"_bazel","build.bazel":"_bazel",changelog:"_clock","changelog.md":"_clock","changelog.txt":"_clock",changes:"_clock","changes.md":"_clock","changes.txt":"_clock","cmakelists.txt":"_makefile_3",compiling:"_license_1","compiling.md":"_license_1","compiling.txt":"_license_1",contributing:"_license_2","contributing.md":"_license_2","contributing.txt":"_license_2",copying:"_license","copying.md":"_license","copying.txt":"_license","docker-healthcheck":"_docker_2","eslint.config.js":"_eslint","firebase.json":"_firebase",geckodriver:"_firefox","gruntfile.babel.js":"_grunt","gruntfile.coffee":"_grunt","gruntfile.js":"_grunt",gulpfile:"_gulp","gulpfile.js":"_gulp","ionic.config.json":"_ionic","ionic.project":"_ionic",jenkinsfile:"_jenkins","karma.conf.cjs":"_karma","karma.conf.coffee":"_karma","karma.conf.js":"_karma","karma.conf.mjs":"_karma",licence:"_license","licence.md":"_license","licence.txt":"_license",license:"_license","license.md":"_license","license.txt":"_license","mime.types":"_config",mix:"_hex",mvnw:"_maven","npm-debug.log":"_npm_ignored",omakefile:"_makefile_2","platformio.ini":"_platformio","pom.xml":"_maven",procfile:"_heroku",qmakefile:"_makefile_1",readme:"_info","readme.md":"_info","readme.txt":"_info","rollup.config.js":"_rollup","sass-lint.yml":"_sass","stylelint.config.cjs":"_stylelint","stylelint.config.js":"_stylelint","stylelint.config.mjs":"_stylelint","swagger.json":"_json_1","swagger.yaml":"_json_1","swagger.yml":"_json_1",todo:"_todo","todo.md":"_todo","todo.txt":"_todo","tsconfig.json":"_tsconfig",version:"_clock","version.md":"_clock","version.txt":"_clock","vite.config.cjs":"_vite","vite.config.cts":"_vite","vite.config.js":"_vite","vite.config.mjs":"_vite","vite.config.mts":"_vite","vite.config.ts":"_vite","webpack.common.cjs":"_webpack","webpack.common.js":"_webpack","webpack.common.mjs":"_webpack","webpack.common.ts":"_webpack","webpack.config.build.cjs":"_webpack","webpack.config.build.js":"_webpack","webpack.config.build.mjs":"_webpack","webpack.config.build.ts":"_webpack","webpack.config.cjs":"_webpack","webpack.config.js":"_webpack","webpack.config.mjs":"_webpack","webpack.config.ts":"_webpack","webpack.dev.cjs":"_webpack","webpack.dev.js":"_webpack","webpack.dev.mjs":"_webpack","webpack.dev.ts":"_webpack","webpack.prod.cjs":"_webpack","webpack.prod.js":"_webpack","webpack.prod.mjs":"_webpack","webpack.prod.ts":"_webpack",workspace:"_bazel","workspace.bazel":"_bazel","yarn.clean":"_yarn","yarn.lock":"_yarn"},aV={"3dm":"_svg_1","3ds":"_svg_1",ad:"_argdown",ai:"_illustrator",apex:"_salesforce",argdown:"_argdown",article:"_go",asax:"_html_2",ascx:"_html_1",asm:"_asm",aspx:"_html",avi:"_video",avif:"_image",babelrc:"_babel","babelrc.cjs":"_babel","babelrc.js":"_babel",bazel:"_bazel",bazelignore:"_bazel",bazelrc:"_bazel_1",bazelversion:"_bazel",bicep:"_bicep",bowerrc:"_bower",bsl:"_bsl",build:"_bazel",bzl:"_bazel",cake:"_cake",cer:"_lock",cert:"_lock",cfc:"_coldfusion",cfm:"_coldfusion","cjs.map":"_javascript",cjsx:"_react",class:"_java_1",classpath:"_java",cls:"_salesforce",cmx:"_ocaml",cmxa:"_ocaml","codeclimate.yml":"_code-climate",component:"_html_3",config:"_config",cr:"_crystal",crt:"_lock",cson:"_json","css.map":"_css",csv:"_csv",ctp:"_cake_php",cuh:"_cu_1",d:"_d",dae:"_svg_1",direnv:"_config",doc:"_word",dockerignore:"_docker_1",docx:"_word",ds_store:"_ignored",dtx:"_tex_2",ecr:"_crystal_embedded",edn:"_clojure_1",ejs:"_ejs",elm:"_elm",eot:"_font",epp:"_puppet",erb:"_html_erb","erb.html":"_html_erb",es:"_javascript",es5:"_javascript",es7:"_javascript",eslintignore:"_eslint_1",eslintrc:"_eslint","eslintrc.cjs":"_eslint","eslintrc.js":"_eslint","eslintrc.json":"_eslint","eslintrc.yaml":"_eslint","eslintrc.yml":"_eslint",ex:"_elixir",exs:"_elixir_script",firebaserc:"_firebase",flac:"_audio",gd:"_godot",gif:"_image",gitattributes:"_git",gitconfig:"_git","github-issues":"_github",gitkeep:"_git","gitlab-ci.yml":"_gitlab",gitmodules:"_git",godot:"_godot_1",gql:"_graphql",gradle:"_gradle",graphql:"_graphql",graphqls:"_graphql",gsp:"_grails",h:"_c_1","h++":"_cpp_1",hack:"_hacklang",haml:"_haml",happenings:"_happenings",hh:"_cpp_1",hpp:"_cpp_1",hs:"_haskell",htaccess:"_config","html.erb":"_html_erb",hu:"_cu_1",hx:"_haxe",hxml:"_haxe_3",hxp:"_haxe_2",hxs:"_haxe_1",hxx:"_cpp_1",ico:"_favicon",ins:"_tex_3",ipynb:"_notebook",jade:"_jade",jar:"_zip",jinja:"_jinja",jinja2:"_jinja",jpeg:"_image",jpg:"_image","js.map":"_javascript",jscsrc:"_javascript_2",jshintrc:"_javascript_2",key:"_lock",kt:"_kotlin",kts:"_kotlin",lhs:"_haskell",liquid:"_liquid",litcoffee:"_coffee",ls:"_livescript",master:"_html_2",mdo:"_mdo","mjs.map":"_javascript",ml:"_ocaml",mli:"_ocaml",mov:"_video",mp3:"_audio",mp4:"_video",mpg:"_video",mustache:"_mustache",nim:"_nim",nims:"_nim",nj:"_nunjucks",njk:"_nunjucks",njs:"_nunjucks","npm-debug.log":"_npm",npmignore:"_npm_1",npmrc:"_npm_1",nunj:"_nunjucks",nunjs:"_nunjucks",nunjucks:"_nunjucks",obj:"_svg_1",odata:"_odata",ogg:"_audio",ogv:"_video",otf:"_font",pddl:"_pddl",pdf:"_pdf",pem:"_lock","php.inc":"_php",pipeline:"_pipeline",plan:"_plan",png:"_image",pp:"_puppet",prisma:"_prisma",pro:"_prolog",psd:"_photoshop",purs:"_purescript",pxm:"_image",r:"_R",re:"_reasonml",res:"_rescript",resi:"_rescript_1",rmd:"_R",s:"_asm",sass:"_sass",sbt:"_sbt",scala:"_scala",slang:"_crystal_embedded",slide:"_go",slim:"_slim",slugignore:"_config","smarty.tpl":"_smarty",sol:"_ethereum",soql:"_db_1","spec.cjs":"_javascript_1","spec.js":"_javascript_1","spec.jsx":"_react_1","spec.mjs":"_javascript_1","spec.ts":"_typescript_1","spec.tsx":"_react_1",springbeans:"_spring",sss:"_css",stache:"_mustache",static:"_config",stl:"_svg_1",styl:"_stylus",stylelintignore:"_stylelint_1",stylelintrc:"_stylelint","stylelintrc.js":"_stylelint","stylelintrc.json":"_stylelint","stylelintrc.yaml":"_stylelint","stylelintrc.yml":"_stylelint","sublime-project":"_sublime","sublime-workspace":"_sublime",svelte:"_svelte",svg:"_svg",svgx:"_image","test.cjs":"_javascript_1","test.js":"_javascript_1","test.jsx":"_react_1","test.mjs":"_javascript_1","test.ts":"_typescript_1","test.tsx":"_react_1",tf:"_terraform","tf.json":"_terraform",tfvars:"_terraform","tfvars.json":"_terraform",tiff:"_image",tmp:"_clock_1",toml:"_config",tpl:"_smarty",tres:"_godot_2",tscn:"_godot_3",ttf:"_font",twig:"_twig",vala:"_vala",vapi:"_vala",vue:"_vue",wasm:"_wasm",wat:"_wat",wav:"_audio",webm:"_video",webp:"_image",wgt:"_wgt",woff:"_font",woff2:"_font",workspace:"_bazel",xls:"_xls",xlsx:"_xls",zig:"_zig",zip:"_zip_1"},aK={argdown:"_argdown",bat:"_windows",bicep:"_bicep",blade:"_php",c:"_c",chatagent:"_markdown",clojure:"_clojure",coffeescript:"_coffee",cpp:"_cpp",csharp:"_c-sharp",css:"_css","cuda-cpp":"_cu",dart:"_dart","django-html":"_html_3",dockercompose:"_docker_3",dockerfile:"_docker",dotenv:"_config",elixir:"_elixir",elm:"_elm",erb:"_html_erb",fsharp:"_f-sharp","git-commit":"_git","github-issues":"_github",go:"_go2",godot:"_godot",gradle:"_gradle",groovy:"_grails",haml:"_haml",handlebars:"_mustache",haskell:"_haskell",haxe:"_haxe",html:"_html_3",ignore:"_git",instructions:"_markdown",jade:"_pug",java:"_java",javascript:"_javascript",javascriptreact:"_react",jinja:"_jinja",json:"_json",jsonc:"_json",jsonl:"_json",julia:"_julia",kotlin:"_kotlin",latex:"_tex",less:"_less",lua:"_lua",makefile:"_makefile",markdown:"_markdown",mustache:"_mustache",nunjucks:"_nunjucks","objective-c":"_c_2","objective-cpp":"_cpp_2",ocaml:"_ocaml",perl:"_perl",php:"_php",postcss:"_css",powershell:"_powershell",prompt:"_markdown",properties:"_config",python:"_python",r:"_R",razor:"_html",rescript:"_rescript",ruby:"_ruby",rust:"_rust",sass:"_sass",scss:"_sass","search-result":"_code-search",shellscript:"_shell",skill:"_markdown",sql:"_db",stylus:"_stylus",swift:"_swift",terraform:"_terraform",tex:"_tex_1",todo:"_todo",typescript:"_typescript",typescriptreact:"_react",vala:"_vala",vue:"_vue",xml:"_xml",yaml:"_yml"},aG={"babel.config.cjs":"_babel_light","babel.config.js":"_babel_light","babel.config.json":"_babel_light","bower.json":"_bower_light",build:"_bazel_light","build.bazel":"_bazel_light",changelog:"_clock_light","changelog.md":"_clock_light","changelog.txt":"_clock_light",changes:"_clock_light","changes.md":"_clock_light","changes.txt":"_clock_light","cmakelists.txt":"_makefile_3_light",compiling:"_license_1_light","compiling.md":"_license_1_light","compiling.txt":"_license_1_light",contributing:"_license_2_light","contributing.md":"_license_2_light","contributing.txt":"_license_2_light",copying:"_license_light","copying.md":"_license_light","copying.txt":"_license_light","docker-healthcheck":"_docker_2_light","eslint.config.js":"_eslint_light","firebase.json":"_firebase_light",geckodriver:"_firefox_light","gruntfile.babel.js":"_grunt_light","gruntfile.coffee":"_grunt_light","gruntfile.js":"_grunt_light",gulpfile:"_gulp_light","gulpfile.js":"_gulp_light","ionic.config.json":"_ionic_light","ionic.project":"_ionic_light",jenkinsfile:"_jenkins_light","karma.conf.cjs":"_karma_light","karma.conf.coffee":"_karma_light","karma.conf.js":"_karma_light","karma.conf.mjs":"_karma_light",licence:"_license_light","licence.md":"_license_light","licence.txt":"_license_light",license:"_license_light","license.md":"_license_light","license.txt":"_license_light","mime.types":"_config_light",mix:"_hex_light",mvnw:"_maven_light","npm-debug.log":"_npm_ignored_light",omakefile:"_makefile_2_light","platformio.ini":"_platformio_light","pom.xml":"_maven_light",procfile:"_heroku_light",qmakefile:"_makefile_1_light",readme:"_info_light","readme.md":"_info_light","readme.txt":"_info_light","rollup.config.js":"_rollup_light","sass-lint.yml":"_sass_light","stylelint.config.cjs":"_stylelint_light","stylelint.config.js":"_stylelint_light","stylelint.config.mjs":"_stylelint_light","swagger.json":"_json_1_light","swagger.yaml":"_json_1_light","swagger.yml":"_json_1_light","tsconfig.json":"_tsconfig_light",version:"_clock_light","version.md":"_clock_light","version.txt":"_clock_light","vite.config.cjs":"_vite_light","vite.config.cts":"_vite_light","vite.config.js":"_vite_light","vite.config.mjs":"_vite_light","vite.config.mts":"_vite_light","vite.config.ts":"_vite_light","webpack.common.cjs":"_webpack_light","webpack.common.js":"_webpack_light","webpack.common.mjs":"_webpack_light","webpack.common.ts":"_webpack_light","webpack.config.build.cjs":"_webpack_light","webpack.config.build.js":"_webpack_light","webpack.config.build.mjs":"_webpack_light","webpack.config.build.ts":"_webpack_light","webpack.config.cjs":"_webpack_light","webpack.config.js":"_webpack_light","webpack.config.mjs":"_webpack_light","webpack.config.ts":"_webpack_light","webpack.dev.cjs":"_webpack_light","webpack.dev.js":"_webpack_light","webpack.dev.mjs":"_webpack_light","webpack.dev.ts":"_webpack_light","webpack.prod.cjs":"_webpack_light","webpack.prod.js":"_webpack_light","webpack.prod.mjs":"_webpack_light","webpack.prod.ts":"_webpack_light",workspace:"_bazel_light","workspace.bazel":"_bazel_light","yarn.clean":"_yarn_light","yarn.lock":"_yarn_light"},aZ={"3dm":"_svg_1_light","3ds":"_svg_1_light",ad:"_argdown_light",ai:"_illustrator_light",apex:"_salesforce_light",argdown:"_argdown_light",article:"_go_light",asax:"_html_2_light",ascx:"_html_1_light",asm:"_asm_light",aspx:"_html_light",avi:"_video_light",avif:"_image_light",babelrc:"_babel_light","babelrc.cjs":"_babel_light","babelrc.js":"_babel_light",bazel:"_bazel_light",bazelignore:"_bazel_light",bazelrc:"_bazel_1_light",bazelversion:"_bazel_light",bicep:"_bicep_light",bowerrc:"_bower_light",bsl:"_bsl_light",build:"_bazel_light",bzl:"_bazel_light",cake:"_cake_light",cer:"_lock_light",cert:"_lock_light",cfc:"_coldfusion_light",cfm:"_coldfusion_light","cjs.map":"_javascript_light",cjsx:"_react_light",class:"_java_1_light",classpath:"_java_light",cls:"_salesforce_light",cmx:"_ocaml_light",cmxa:"_ocaml_light","codeclimate.yml":"_code-climate_light",component:"_html_3_light",config:"_config_light",cr:"_crystal_light",crt:"_lock_light",cson:"_json_light","css.map":"_css_light",csv:"_csv_light",ctp:"_cake_php_light",cuh:"_cu_1_light",d:"_d_light",dae:"_svg_1_light",direnv:"_config_light",doc:"_word_light",dockerignore:"_docker_1_light",docx:"_word_light",ds_store:"_ignored_light",dtx:"_tex_2_light",ecr:"_crystal_embedded_light",edn:"_clojure_1_light",ejs:"_ejs_light",elm:"_elm_light",eot:"_font_light",epp:"_puppet_light",erb:"_html_erb_light","erb.html":"_html_erb_light",es:"_javascript_light",es5:"_javascript_light",es7:"_javascript_light",eslintignore:"_eslint_1_light",eslintrc:"_eslint_light","eslintrc.cjs":"_eslint_light","eslintrc.js":"_eslint_light","eslintrc.json":"_eslint_light","eslintrc.yaml":"_eslint_light","eslintrc.yml":"_eslint_light",ex:"_elixir_light",exs:"_elixir_script_light",firebaserc:"_firebase_light",flac:"_audio_light",gd:"_godot_light",gif:"_image_light",gitattributes:"_git_light",gitconfig:"_git_light","github-issues":"_github_light",gitkeep:"_git_light","gitlab-ci.yml":"_gitlab_light",gitmodules:"_git_light",godot:"_godot_1_light",gql:"_graphql_light",gradle:"_gradle_light",graphql:"_graphql_light",graphqls:"_graphql_light",gsp:"_grails_light",h:"_c_1_light","h++":"_cpp_1_light",hack:"_hacklang_light",haml:"_haml_light",happenings:"_happenings_light",hh:"_cpp_1_light",hpp:"_cpp_1_light",hs:"_haskell_light",htaccess:"_config_light","html.erb":"_html_erb_light",hu:"_cu_1_light",hx:"_haxe_light",hxml:"_haxe_3_light",hxp:"_haxe_2_light",hxs:"_haxe_1_light",hxx:"_cpp_1_light",ico:"_favicon_light",ins:"_tex_3_light",ipynb:"_notebook_light",jade:"_jade_light",jar:"_zip_light",jinja:"_jinja_light",jinja2:"_jinja_light",jpeg:"_image_light",jpg:"_image_light","js.map":"_javascript_light",jscsrc:"_javascript_2_light",jshintrc:"_javascript_2_light",key:"_lock_light",kt:"_kotlin_light",kts:"_kotlin_light",lhs:"_haskell_light",liquid:"_liquid_light",litcoffee:"_coffee_light",ls:"_livescript_light",master:"_html_2_light",mdo:"_mdo_light","mjs.map":"_javascript_light",ml:"_ocaml_light",mli:"_ocaml_light",mov:"_video_light",mp3:"_audio_light",mp4:"_video_light",mpg:"_video_light",mustache:"_mustache_light",nim:"_nim_light",nims:"_nim_light",nj:"_nunjucks_light",njk:"_nunjucks_light",njs:"_nunjucks_light","npm-debug.log":"_npm_light",npmignore:"_npm_1_light",npmrc:"_npm_1_light",nunj:"_nunjucks_light",nunjs:"_nunjucks_light",nunjucks:"_nunjucks_light",obj:"_svg_1_light",odata:"_odata_light",ogg:"_audio_light",ogv:"_video_light",otf:"_font_light",pddl:"_pddl_light",pdf:"_pdf_light",pem:"_lock_light","php.inc":"_php_light",pipeline:"_pipeline_light",plan:"_plan_light",png:"_image_light",pp:"_puppet_light",prisma:"_prisma_light",pro:"_prolog_light",psd:"_photoshop_light",purs:"_purescript_light",pxm:"_image_light",r:"_R_light",re:"_reasonml_light",res:"_rescript_light",resi:"_rescript_1_light",rmd:"_R_light",s:"_asm_light",sass:"_sass_light",sbt:"_sbt_light",scala:"_scala_light",slang:"_crystal_embedded_light",slide:"_go_light",slim:"_slim_light",slugignore:"_config_light","smarty.tpl":"_smarty_light",sol:"_ethereum_light",soql:"_db_1_light","spec.cjs":"_javascript_1_light","spec.js":"_javascript_1_light","spec.jsx":"_react_1_light","spec.mjs":"_javascript_1_light","spec.ts":"_typescript_1_light","spec.tsx":"_react_1_light",springbeans:"_spring_light",sss:"_css_light",stache:"_mustache_light",static:"_config_light",stl:"_svg_1_light",styl:"_stylus_light",stylelintignore:"_stylelint_1_light",stylelintrc:"_stylelint_light","stylelintrc.js":"_stylelint_light","stylelintrc.json":"_stylelint_light","stylelintrc.yaml":"_stylelint_light","stylelintrc.yml":"_stylelint_light","sublime-project":"_sublime_light","sublime-workspace":"_sublime_light",svelte:"_svelte_light",svg:"_svg_light",svgx:"_image_light","test.cjs":"_javascript_1_light","test.js":"_javascript_1_light","test.jsx":"_react_1_light","test.mjs":"_javascript_1_light","test.ts":"_typescript_1_light","test.tsx":"_react_1_light",tf:"_terraform_light","tf.json":"_terraform_light",tfvars:"_terraform_light","tfvars.json":"_terraform_light",tiff:"_image_light",tmp:"_clock_1_light",toml:"_config_light",tpl:"_smarty_light",tres:"_godot_2_light",tscn:"_godot_3_light",ttf:"_font_light",twig:"_twig_light",vala:"_vala_light",vapi:"_vala_light",vue:"_vue_light",wasm:"_wasm_light",wat:"_wat_light",wav:"_audio_light",webm:"_video_light",webp:"_image_light",wgt:"_wgt_light",woff:"_font_light",woff2:"_font_light",workspace:"_bazel_light",xls:"_xls_light",xlsx:"_xls_light",zig:"_zig_light",zip:"_zip_1_light"},aY={argdown:"_argdown_light",bat:"_windows_light",bicep:"_bicep_light",blade:"_php_light",c:"_c_light",chatagent:"_markdown_light",clojure:"_clojure_light",coffeescript:"_coffee_light",cpp:"_cpp_light",csharp:"_c-sharp_light",css:"_css_light","cuda-cpp":"_cu_light",dart:"_dart_light","django-html":"_html_3_light",dockercompose:"_docker_3_light",dockerfile:"_docker_light",dotenv:"_config_light",elixir:"_elixir_light",elm:"_elm_light",erb:"_html_erb_light",fsharp:"_f-sharp_light","git-commit":"_git_light","github-issues":"_github_light",go:"_go2_light",godot:"_godot_light",gradle:"_gradle_light",groovy:"_grails_light",haml:"_haml_light",handlebars:"_mustache_light",haskell:"_haskell_light",haxe:"_haxe_light",html:"_html_3_light",ignore:"_git_light",instructions:"_markdown_light",jade:"_pug_light",java:"_java_light",javascript:"_javascript_light",javascriptreact:"_react_light",jinja:"_jinja_light",json:"_json_light",jsonc:"_json_light",jsonl:"_json_light",julia:"_julia_light",kotlin:"_kotlin_light",latex:"_tex_light",less:"_less_light",lua:"_lua_light",makefile:"_makefile_light",markdown:"_markdown_light",mustache:"_mustache_light",nunjucks:"_nunjucks_light","objective-c":"_c_2_light","objective-cpp":"_cpp_2_light",ocaml:"_ocaml_light",perl:"_perl_light",php:"_php_light",postcss:"_css_light",powershell:"_powershell_light",prompt:"_markdown_light",properties:"_config_light",python:"_python_light",r:"_R_light",razor:"_html_light",rescript:"_rescript_light",ruby:"_ruby_light",rust:"_rust_light",sass:"_sass_light",scss:"_sass_light","search-result":"_code-search_light",shellscript:"_shell_light",skill:"_markdown_light",sql:"_db_light",stylus:"_stylus_light",swift:"_swift_light",terraform:"_terraform_light",tex:"_tex_1_light",typescript:"_typescript_light",typescriptreact:"_react_light",vala:"_vala_light",vue:"_vue_light",xml:"_xml_light",yaml:"_yml_light"},aX="_default_light",aJ={".bash":"shellscript",".bat":"bat",".c":"c",".cc":"cpp",".cjs":"javascript",".clj":"clojure",".cljc":"clojure",".cljs":"clojure",".cmd":"bat",".coffee":"coffeescript",".cpp":"cpp",".cs":"csharp",".cshtml":"razor",".css":"css",".cu":"cuda-cpp",".cxx":"cpp",".dart":"dart",".dockerfile":"dockerfile",".fs":"fsharp",".fsx":"fsharp",".gitignore":"ignore",".go":"go",".gradle":"groovy",".groovy":"groovy",".h":"c",".handlebars":"handlebars",".hbs":"handlebars",".hpp":"cpp",".htm":"html",".html":"html",".java":"java",".jl":"julia",".js":"javascript",".json":"json",".jsonc":"jsonc",".jsx":"javascriptreact",".kt":"kotlin",".kts":"kotlin",".less":"less",".lua":"lua",".m":"objective-c",".makefile":"makefile",".markdown":"markdown",".md":"markdown",".mjs":"javascript",".mk":"makefile",".mm":"objective-cpp",".npmignore":"ignore",".php":"php",".pl":"perl",".pm":"perl",".properties":"properties",".ps1":"powershell",".psm1":"powershell",".py":"python",".r":"r",".rb":"ruby",".rs":"rust",".sass":"scss",".scss":"scss",".sh":"shellscript",".sql":"sql",".swift":"swift",".tex":"latex",".ts":"typescript",".tsx":"typescriptreact",".xml":"xml",".xsd":"xml",".xsl":"xml",".yaml":"yaml",".yml":"yaml",".zsh":"shellscript"};function aQ(e){let t=aW[e];if(null!=t)return{character:t[0],color:t[1]}}var a0=Object.defineProperty,a1=Object.getOwnPropertyDescriptor,a2=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?a1(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&a0(t,i,s),s};let a5=class extends lit_element_i{render(){if(null==this.filename)return eA;let e=document.body.classList.contains("vscode-light")||document.body.classList.contains("vscode-high-contrast-light"),t=function(e,t=!1){let i=e.toLowerCase(),r=(t?aG:aH)[i];if(null!=r)return aQ(r);let o=t?aZ:aV,s=i.indexOf(".");for(;-1!==s&&s<i.length-1;){if(null!=(r=o[i.substring(s+1)]))return aQ(r);s=i.indexOf(".",s+1)}let a=i.lastIndexOf(".");if(-1!==a){let e=aJ[i.substring(a)];if(null!=e&&null!=(r=(t?aY:aK)[e]))return aQ(r)}return aQ(t&&aX?aX:"_default")}(this.filename,e);if(null==t)return eA;let i=function(e){if(1===e.length)return e;let t=/^\\+(?:u)?([0-9a-fA-F]{4,6})$/.exec(e);return null!=t?String.fromCodePoint(parseInt(t[1],16)):e}(t.character);return eC`<span class="font-icon" style=${aU({color:t.color||"inherit"})}>${i}</span>`}};a5.styles=F`
		:host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 16px;
			height: 16px;
			vertical-align: text-bottom;
		}

		.font-icon {
			display: inline-block;
			font-family: 'seti';
			font-size: 16px;
			line-height: 1;
			text-align: center;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}
	`,a2([eB()],a5.prototype,"filename",2),a5=a2([eD("gl-file-icon")],a5);var a3=Object.defineProperty,a4=Object.getOwnPropertyDescriptor,a6=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?a4(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&a3(t,i,s),s};let a7=class extends lit_element_i{get statusName(){return this.status?nU[this.status]??"Unknown":""}updated(e){super.updated(e),e.has("status")&&(this.statusName?this.setAttribute("title",this.statusName):this.removeAttribute("title"),this.status?.length===2?this.setAttribute("conflict",""):this.removeAttribute("conflict"))}renderIgnored(){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#969696"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM10 4l-6.01 6.01 1.06 1.061 6.01-6.01L10 4z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderUntracked(){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3.942-3.942l7.5-7.5.884.884-.664.664c.95.655 1.65 1.524 2.222 2.394-1.15 1.75-2.824 3.5-6 3.5-.696 0-1.32-.084-1.882-.234l-1.176 1.176-.884-.884zm5.188-3.42l1.629-1.629c.634.393 1.147.913 1.594 1.491C10.99 8.767 9.692 9.75 7.5 9.75c-.287 0-.56-.017-.817-.05l.455-.454a1.5 1.5 0 0 0 1.608-1.608zM7.362 6.254L5.754 7.862a1.5 1.5 0 0 1 1.608-1.608zm.955-.955A6.595 6.595 0 0 0 7.5 5.25c-2.192 0-3.49.982-4.469 2.25.447.578.96 1.098 1.594 1.491l-.903.903C2.772 9.239 2.072 8.369 1.5 7.5 2.65 5.75 4.324 4 7.5 4c.696 0 1.32.084 1.882.234L8.317 5.299z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderAdded(){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#388A34"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm.75-6.75h3v-1.5h-3v-3h-1.5v3h-3v1.5h3v3h1.5v-3z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderDeleted(){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#9E121D"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-6.75v-1.5h-7.5v1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderModified(){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#1B80B2"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-9.5V7h-3v2.5h-1.5V7h-3V5.5h3v-3h1.5v3h3zm0 5V12h-7.5v-1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderRenamed(){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#C63"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.25 4.5v1.25h1.25l1 1v2.5l-1 1H9.25v1.25H10v1.25H7V11.5h.75v-1.25H4l-1-1v-2.5l1-1h3.75V4.5H7V3.25h3V4.5h-.75zm-5 2.5h3.5v2h-3.5V7zm5 0v2h1V7h-1z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderCopied(){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#692C77"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM6.964 3.75L5.893 4.813v.53h1.071v-.53h3.215v4.25h-.536v1.062h.536l1.071-1.063v-4.25L10.179 3.75H6.964zM3.75 6.938l1.071-1.063h3.215l1.071 1.063v4.25L8.036 12.25H4.82L3.75 11.187v-4.25zm1.071 0v4.25h3.215v-4.25H4.82z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderConflictGlyphs(e,t,i,r,o,s){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 22 16">
				<path d="M3 0H10V16H3C1.35 16 0 14.65 0 13V3C0 1.35 1.35 0 3 0Z" fill="${e}" />
				<path d="M12 0H19C20.65 0 22 1.35 22 3V13C22 14.65 20.65 16 19 16H12V0Z" fill="${r}" />
				<text
					x="5"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${i}"
				>
					${t}
				</text>
				<text
					x="17"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${s}"
				>
					${o}
				</text>
			</svg>
		`}renderConflictUU(){let e="var(--gl-git-status-conflict-modified, #c4a000)";return this.renderConflictGlyphs(e,"±","#000",e,"±","#000")}renderConflictAA(){let e="var(--gl-git-status-added)";return this.renderConflictGlyphs(e,"+","#fff",e,"+","#fff")}renderConflictDD(){let e="var(--gl-git-status-deleted)";return this.renderConflictGlyphs(e,"−","#fff",e,"−","#fff")}renderConflictDU(){return this.renderConflictGlyphs("var(--gl-git-status-deleted)","−","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUD(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-deleted)","−","#fff")}renderConflictAU(){return this.renderConflictGlyphs("var(--gl-git-status-added)","+","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUA(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-added)","+","#fff")}renderUnknown(){return eC`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.19 2.822c-.439-.215-.97-.322-1.596-.322-1.25 0-2.282.478-3.094 1.435l1.05.798c.275-.331.579-.574.91-.728.331-.154.66-.231.987-.231.415 0 .76.093 1.036.28.275.182.413.448.413.798 0 .275-.082.509-.245.7-.159.187-.36.364-.602.532a9.506 9.506 0 0 0-.728.56 2.66 2.66 0 0 0-.602.763c-.159.299-.238.679-.238 1.141v.483h1.498v-.413c0-.364.086-.663.259-.896a2.76 2.76 0 0 1 .637-.616c.252-.177.504-.362.756-.553.257-.196.471-.436.644-.721.173-.285.259-.651.259-1.099 0-.387-.114-.749-.343-1.085-.229-.34-.562-.616-1.001-.826zm-1.169 7.917a1.024 1.024 0 0 0-.763-.315c-.294 0-.544.105-.749.315-.2.205-.301.453-.301.742 0 .294.1.546.301.756.205.205.455.308.749.308.303 0 .558-.103.763-.308.205-.21.308-.462.308-.756 0-.29-.103-.537-.308-.742z"
					clip-rule="evenodd"
				/>
			</svg>
		`}render(){switch(this.status){case"!":return this.renderIgnored();case"?":return this.renderUntracked();case"A":return this.renderAdded();case"D":return this.renderDeleted();case"M":case"T":case"U":return this.renderModified();case"R":return this.renderRenamed();case"C":return this.renderCopied();case"AA":return this.renderConflictAA();case"AU":return this.renderConflictAU();case"UA":return this.renderConflictUA();case"DD":return this.renderConflictDD();case"DU":return this.renderConflictDU();case"UD":return this.renderConflictUD();case"UU":return this.renderConflictUU()}return this.renderUnknown()}};a7.styles=[F`
			:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)),
			:host-context(.vscode-dark) {
				--gl-git-status-ignored: #969696;
				--gl-git-status-untracked: #6c6c6c;
				--gl-git-status-added: #388a34;
				--gl-git-status-deleted: #9e121d;
				--gl-git-status-modified: #1b80b2;
				--gl-git-status-renamed: #c63;
				--gl-git-status-copied: #692c77;
				--gl-git-status-conflict: #7f4e7e;
				--gl-git-status-unknown: #6c6c6c;
			}

			:host-context(.vscode-high-contrast-light),
			:host-context(.vscode-light) {
				--gl-git-status-ignored: #969696;
				--gl-git-status-untracked: #6c6c6c;
				--gl-git-status-added: #388a34;
				--gl-git-status-deleted: #9e121d;
				--gl-git-status-modified: #1b80b2;
				--gl-git-status-renamed: #c63;
				--gl-git-status-copied: #692c77;
				--gl-git-status-conflict: #7f4e7e;
				--gl-git-status-unknown: #6c6c6c;
			}

			:host {
				--gl-icon-size: 1.6rem;

				display: inline-block;
				width: 16px;
				aspect-ratio: 1 / 1;
			}

			:host([conflict]) {
				--gl-icon-size: 2.2rem;
				margin-right: 0.4rem;

				width: 22px;
				aspect-ratio: auto;
			}

			svg {
				display: inline-block;
				vertical-align: text-bottom;
			}
		`],a6([eB()],a7.prototype,"status",2),a6([eF()],a7.prototype,"statusName",1),a7=a6([eD("gl-git-status")],a7);let private_async_helpers_s=class private_async_helpers_s{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let a8=e=>null!==e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...e){return e.find(e=>!a8(e))??eE}update(e,t){let i=this._$Cbt,r=i.length;this._$Cbt=t;let o=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){let a=t[e];if(!a8(a))return this._$Cwt=e,a;e<r&&a===i[e]||(this._$Cwt=0x3fffffff,r=0,Promise.resolve(a).then(async e=>{for(;s.get();)await s.get();let t=o.deref();if(void 0!==t){let i=t._$Cbt.indexOf(a);i>-1&&i<t._$Cwt&&(t._$Cwt=i,t.setValue(e))}}))}return eE}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let a9=tx(until_c);function le(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var lt=le(),li={exec:()=>null};function lr(e,t=""){let i="string"==typeof e?e:e.source,r={replace:(e,t)=>{let o="string"==typeof t?t:t.source;return o=o.replace(ls.caret,"$1"),i=i.replace(e,o),r},getRegex:()=>new RegExp(i,t)};return r}var lo=((e="")=>{try{return!!RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),ls={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}>`)},ln=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,la=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ll=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,lc=lr(ll).replace(/bull/g,la).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lh=lr(ll).replace(/bull/g,la).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ld=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lp=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,lu=lr(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",lp).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lg=lr(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,la).getRegex(),lm="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lf=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,lb=lr("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lf).replace("tag",lm).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),lv=lr(ld).replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",lm).getRegex(),l_={blockquote:lr(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",lv).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:lu,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:ln,html:lb,lheading:lc,list:lg,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:lv,table:li,text:/^[^\n]+/},ly=lr("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",lm).getRegex(),lw={...l_,lheading:lh,table:ly,paragraph:lr(ld).replace("hr",ln).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ly).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",lm).getRegex()},lk={...l_,html:lr("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",lf).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:li,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:lr(ld).replace("hr",ln).replace("heading",` *#{1,6} *[^
]`).replace("lheading",lc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lx=/^( {2,}|\\)\n(?!\s*$)/,l$=/[\p{P}\p{S}]/u,lC=/[\s\p{P}\p{S}]/u,lS=/[^\s\p{P}\p{S}]/u,lE=lr(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,lC).getRegex(),lA=/(?!~)[\p{P}\p{S}]/u,lP=lr(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",lo?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),lz=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,lR=lr(lz,"u").replace(/punct/g,l$).getRegex(),lI=lr(lz,"u").replace(/punct/g,lA).getRegex(),lT="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",lM=lr(lT,"gu").replace(/notPunctSpace/g,lS).replace(/punctSpace/g,lC).replace(/punct/g,l$).getRegex(),lj=lr(lT,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,lA).getRegex(),lO=lr("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,lS).replace(/punctSpace/g,lC).replace(/punct/g,l$).getRegex(),lD=lr(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,l$).getRegex(),lL=lr("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,lS).replace(/punctSpace/g,lC).replace(/punct/g,l$).getRegex(),lB=lr(/\\(punct)/,"gu").replace(/punct/g,l$).getRegex(),lF=lr(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),lN=lr(lf).replace("(?:--\x3e|$)","--\x3e").getRegex(),lq=lr("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",lN).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),lU=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,lW=lr(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",lU).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),lH=lr(/^!?\[(label)\]\[(ref)\]/).replace("label",lU).replace("ref",lp).getRegex(),lV=lr(/^!?\[(ref)\](?:\[\])?/).replace("ref",lp).getRegex(),lK=lr("reflink|nolink(?!\\()","g").replace("reflink",lH).replace("nolink",lV).getRegex(),lG=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,lZ={_backpedal:li,anyPunctuation:lB,autolink:lF,blockSkip:lP,br:lx,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:li,delLDelim:li,delRDelim:li,emStrongLDelim:lR,emStrongRDelimAst:lM,emStrongRDelimUnd:lO,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:lW,nolink:lV,punctuation:lE,reflink:lH,reflinkSearch:lK,tag:lq,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:li},lY={...lZ,link:lr(/^!?\[(label)\]\((.*?)\)/).replace("label",lU).getRegex(),reflink:lr(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",lU).getRegex()},lX={...lZ,emStrongRDelimAst:lj,emStrongLDelim:lI,delLDelim:lD,delRDelim:lL,url:lr(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",lG).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:lr(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",lG).getRegex()},lJ={...lX,br:lr(lx).replace("{2,}","*").getRegex(),text:lr(lX.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},lQ={normal:l_,gfm:lw,pedantic:lk},l0={normal:lZ,gfm:lX,breaks:lJ,pedantic:lY},l1={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},l2=e=>l1[e];function l5(e,t){if(t){if(ls.escapeTest.test(e))return e.replace(ls.escapeReplace,l2)}else if(ls.escapeTestNoEncode.test(e))return e.replace(ls.escapeReplaceNoEncode,l2);return e}function l3(e){try{e=encodeURI(e).replace(ls.percentDecode,"%")}catch{return null}return e}function l4(e,t){let i=e.replace(ls.findPipe,(e,t,i)=>{let r=!1,o=t;for(;--o>=0&&"\\"===i[o];)r=!r;return r?"|":" |"}).split(ls.splitPipe),r=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;r<i.length;r++)i[r]=i[r].trim().replace(ls.slashPipe,"|");return i}function l6(e,t,i){let r=e.length;if(0===r)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s!==t||i)if(s!==t&&i)o++;else break;else o++}return e.slice(0,r-o)}function l7(e){let t=e.split(`
`),i=t.length-1;for(;i>=0&&ls.blankLine.test(t[i]);)i--;return t.length-i<=2?e:t.slice(0,i+1).join(`
`)}function l8(e,t,i,r,o){let s=t.href,a=t.title||null,c=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let h={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:s,title:a,text:c,tokens:r.inlineTokens(c)};return r.state.inLink=!1,h}var l9=class{options;rules;lexer;constructor(e){this.options=e||lt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:l7(t[0]),i=e.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e,codeBlockStyle:"indented",text:i}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let r=e.match(i.other.indentCodeCompensation);if(null===r)return t;let o=r[1];return t.split(`
`).map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[r]=t;return r.length>=o.length?e.slice(o.length):e}).join(`
`)}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=l6(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:l6(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:l6(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=l6(t[0],`
`).split(`
`),i="",r="",o=[];for(;e.length>0;){let t=!1,s=[],a;for(a=0;a<e.length;a++)if(this.rules.other.blockquoteStart.test(e[a]))s.push(e[a]),t=!0;else if(t)break;else s.push(e[a]);e=e.slice(a);let c=s.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,r=r?`${r}
${h}`:h;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=p,0===e.length)break;let u=o.at(-1);if(u?.type==="code")break;if(u?.type==="blockquote"){let t=u.raw+`
`+e.join(`
`),s=this.blockquote(t);o[o.length-1]=s,i=i.substring(0,i.length-u.raw.length)+s.raw,r=r.substring(0,r.length-u.text.length)+s.text;break}if(u?.type==="list"){let t=u.raw+`
`+e.join(`
`),s=this.list(t);o[o.length-1]=s,i=i.substring(0,i.length-u.raw.length)+s.raw,r=r.substring(0,r.length-u.raw.length)+s.raw,e=t.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),r=i.length>1,o={type:"list",raw:"",ordered:r,start:r?+i.slice(0,-1):"",loose:!1,items:[]};i=r?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=r?i:"[*+-]");let s=this.rules.other.listItemRegex(i),a=!1;for(;e;){let i=!1,r="",c="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let h=function(e,t=0){let i=t,r="";for(let t of e)if("	"===t){let e=4-i%4;r+=" ".repeat(e),i+=e}else r+=t,i++;return r}(t[2].split(`
`,1)[0],t[1].length),p=e.split(`
`,1)[0],u=!h.trim(),g=0;if(this.options.pedantic?(g=2,c=h.trimStart()):u?g=t[1].length+1:(g=(g=h.search(this.rules.other.nonSpaceChar))>4?1:g,c=h.slice(g),g+=t[1].length),u&&this.rules.other.blankLine.test(p)&&(r+=p+`
`,e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(g),i=this.rules.other.hrRegex(g),o=this.rules.other.fencesBeginRegex(g),s=this.rules.other.headingBeginRegex(g),a=this.rules.other.htmlBeginRegex(g),m=this.rules.other.blockquoteBeginRegex(g);for(;e;){let f=e.split(`
`,1)[0],b;if(p=f,b=this.options.pedantic?p=p.replace(this.rules.other.listReplaceNesting,"  "):p.replace(this.rules.other.tabCharGlobal,"    "),o.test(p)||s.test(p)||a.test(p)||m.test(p)||t.test(p)||i.test(p))break;if(b.search(this.rules.other.nonSpaceChar)>=g||!p.trim())c+=`
`+b.slice(g);else{if(u||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(h)||s.test(h)||i.test(h))break;c+=`
`+p}u=!p.trim(),r+=f+`
`,e=e.substring(f.length+1),h=b.slice(g)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(a=!0)),o.items.push({type:"list_item",raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),o.raw+=r}let c=o.items.at(-1);if(!c)return;for(let e of(c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd(),o.raw=o.raw.trimEnd(),o.items)){if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),e.task){if(e.text=e.text.replace(this.rules.other.listReplaceTask,""),e.tokens[0]?.type==="text"||e.tokens[0]?.type==="paragraph"){e.tokens[0].raw=e.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),e.tokens[0].text=e.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,"");break}}let t=this.rules.other.listTaskCheckbox.exec(e.raw);if(t){let i={type:"checkbox",raw:t[0]+" ",checked:"[ ]"!==t[0]};e.checked=i.checked,o.loose?e.tokens[0]&&["paragraph","text"].includes(e.tokens[0].type)&&"tokens"in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=i.raw+e.tokens[0].raw,e.tokens[0].text=i.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(i)):e.tokens.unshift({type:"paragraph",raw:i.raw,text:i.raw,tokens:[i]}):e.tokens.unshift(i)}}if(!o.loose){let t=e.tokens.filter(e=>"space"===e.type);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(o.loose)for(let e of o.items)for(let t of(e.loose=!0,e.tokens))"text"===t.type&&(t.type="paragraph");return o}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=l7(t[0]);return{type:"html",block:!0,raw:e,pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:l6(t[0],`
`),href:i,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=l4(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:l6(t[0],`
`),header:[],align:[],rows:[]};if(i.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?s.align.push("right"):this.rules.other.tableAlignCenter.test(e)?s.align.push("center"):this.rules.other.tableAlignLeft.test(e)?s.align.push("left"):s.align.push(null);for(let e=0;e<i.length;e++)s.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:s.align[e]});for(let e of o)s.rows.push(l4(e,s.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:s.align[t]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:"heading",raw:l6(t[0],`
`),depth:"="===t[2].charAt(0)?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=l6(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e){if(-1===e.indexOf(")"))return -1;let t=0;for(let i=0;i<e.length;i++)if("\\"===e[i])i++;else if("("===e[i])t++;else if(")"===e[i]&&--t<0)return i;return t>0?-2:-1}(t[2]);if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),l8(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return l8(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!i||this.rules.inline.punctuation.exec(i))){let i=[...r[0]].length-1,o,s,a=i,c=0,h="*"===r[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+i);null!==(r=h.exec(t));){if(!(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6]))continue;if(s=[...o].length,r[3]||r[4]){a+=s;continue}if((r[5]||r[6])&&i%3&&!((i+s)%3)){c+=s;continue}if((a-=s)>0)continue;s=Math.min(s,s+a+c);let t=[...r[0]][0].length,h=e.slice(0,i+r.index+t+s);if(Math.min(i,s)%2){let e=h.slice(1,-1);return{type:"em",raw:h,text:e,tokens:this.lexer.inlineTokens(e)}}let p=h.slice(2,-2);return{type:"strong",raw:h,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&r&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,i=""){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!i||this.rules.inline.punctuation.exec(i))){let i=[...r[0]].length-1,o,s,a=i,c=this.rules.inline.delRDelim;for(c.lastIndex=0,t=t.slice(-1*e.length+i);null!==(r=c.exec(t));){if(!(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6])||(s=[...o].length)!==i)continue;if(r[3]||r[4]){a+=s;continue}if((a-=s)>0)continue;s=Math.min(s,s+a);let t=[...r[0]][0].length,c=e.slice(0,i+r.index+t+s),h=c.slice(i,-i);return{type:"del",raw:c,text:h,tokens:this.lexer.inlineTokens(h)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return i="@"===t[2]?"mailto:"+(e=t[1]):e=t[1],{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])i="mailto:"+(e=t[0]);else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(r!==t[0])e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},ce=class l{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||lt,this.options.tokenizer=this.options.tokenizer||new l9,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:ls,block:lQ.normal,inline:l0.normal};this.options.pedantic?(t.block=lQ.pedantic,t.inline=l0.pedantic):this.options.gfm&&(t.block=lQ.gfm,this.options.breaks?t.inline=l0.breaks:t.inline=l0.gfm),this.tokenizer.rules=t}static get rules(){return{block:lQ,inline:l0}}static lex(e,t){return new l(t).lex(e)}static lexInline(e,t){return new l(t).inlineTokens(e)}lex(e){e=e.replace(ls.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(ls.tabCharGlobal,"    ").replace(ls.spaceLine,""));let r=1/0;for(;e;){let o;if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}if(this.options.extensions?.block?.some(i=>!!(o=i.call({lexer:this},e,t))&&(e=e.substring(o.raw.length),t.push(o),!0)))continue;if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length);let i=t.at(-1);1===o.raw.length&&void 0!==i?i.raw+=`
`:t.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):t.push(o);continue}if((o=this.tokenizer.fences(e))||(o=this.tokenizer.heading(e))||(o=this.tokenizer.hr(e))||(o=this.tokenizer.blockquote(e))||(o=this.tokenizer.list(e))||(o=this.tokenizer.html(e))){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},t.push(o));continue}if((o=this.tokenizer.table(e))||(o=this.tokenizer.lheading(e))){e=e.substring(o.raw.length),t.push(o);continue}let s=e;if(this.options.extensions?.startBlock){let t=1/0,i=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{"number"==typeof(r=e.call({lexer:this},i))&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let r=t.at(-1);i&&r?.type==="paragraph"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(o),i=s.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length);let i=t.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(o);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i;this.tokenizer.lexer=this;let r=e,o=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!==(o=this.tokenizer.rules.inline.reflinkSearch.exec(r));)e.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!==(o=this.tokenizer.rules.inline.anyPunctuation.exec(r));)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!==(o=this.tokenizer.rules.inline.blockSkip.exec(r));)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,a="",c=1/0;for(;e;){let i;if(e.length<c)c=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}if(s||(a=""),s=!1,this.options.extensions?.inline?.some(r=>!!(i=r.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if((i=this.tokenizer.escape(e))||(i=this.tokenizer.tag(e))||(i=this.tokenizer.link(e))){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let r=t.at(-1);"text"===i.type&&r?.type==="text"?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if((i=this.tokenizer.emStrong(e,r,a))||(i=this.tokenizer.codespan(e))||(i=this.tokenizer.br(e))||(i=this.tokenizer.del(e,r,a))||(i=this.tokenizer.autolink(e))||!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let o=e;if(this.options.extensions?.startInline){let t=1/0,i=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{"number"==typeof(r=e.call({lexer:this},i))&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(i=this.tokenizer.inlineText(o)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(a=i.raw.slice(-1)),s=!0;let r=t.at(-1);r?.type==="text"?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){if(this.options.silent);else throw Error("Infinite loop on byte: "+e)}},ct=class{options;parser;constructor(e){this.options=e||lt}space(e){return""}code({text:e,lang:t,escaped:i}){let r=(t||"").match(ls.notSpaceStart)?.[0],o=e.replace(ls.endingNewline,"")+`
`;return r?'<pre><code class="language-'+l5(r)+'">'+(i?o:l5(o,!0))+`</code></pre>
`:"<pre><code>"+(i?o:l5(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,i=e.start,r="";for(let t=0;t<e.items.length;t++){let i=e.items[t];r+=this.listitem(i)}let o=t?"ol":"ul";return"<"+o+(t&&1!==i?' start="'+i+'"':"")+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let r="";for(let t=0;t<e.rows.length;t++){let o=e.rows[t];i="";for(let e=0;e<o.length;e++)i+=this.tablecell(o[e]);r+=this.tablerow({text:i})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${l5(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let r=this.parser.parseInline(i),o=l3(e);if(null===o)return r;let s='<a href="'+(e=o)+'"';return t&&(s+=' title="'+l5(t)+'"'),s+=">"+r+"</a>"}image({href:e,title:t,text:i,tokens:r}){r&&(i=this.parser.parseInline(r,this.parser.textRenderer));let o=l3(e);if(null===o)return l5(i);e=o;let s=`<img src="${e}" alt="${l5(i)}"`;return t&&(s+=` title="${l5(t)}"`),s+=">"}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:l5(e.text)}},ci=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},cr=class l{options;renderer;textRenderer;constructor(e){this.options=e||lt,this.options.renderer=this.options.renderer||new ct,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ci}static parse(e,t){return new l(t).parse(e)}static parseInline(e,t){return new l(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let i=0;i<e.length;i++){let r=e[i];if(this.options.extensions?.renderers?.[r.type]){let e=this.options.extensions.renderers[r.type].call({parser:this},r);if(!1!==e||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(r.type)){t+=e||"";continue}}switch(r.type){case"space":t+=this.renderer.space(r);break;case"hr":t+=this.renderer.hr(r);break;case"heading":t+=this.renderer.heading(r);break;case"code":t+=this.renderer.code(r);break;case"table":t+=this.renderer.table(r);break;case"blockquote":t+=this.renderer.blockquote(r);break;case"list":t+=this.renderer.list(r);break;case"checkbox":t+=this.renderer.checkbox(r);break;case"html":t+=this.renderer.html(r);break;case"def":t+=this.renderer.def(r);break;case"paragraph":t+=this.renderer.paragraph(r);break;case"text":t+=this.renderer.text(r);break;default:{let e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let i="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=e||"";continue}}switch(o.type){case"escape":case"text":i+=t.text(o);break;case"html":i+=t.html(o);break;case"link":i+=t.link(o);break;case"image":i+=t.image(o);break;case"checkbox":i+=t.checkbox(o);break;case"strong":i+=t.strong(o);break;case"em":i+=t.em(o);break;case"codespan":i+=t.codespan(o);break;case"br":i+=t.br(o);break;case"del":i+=t.del(o);break;default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return i}},co=class{options;block;constructor(e){this.options=e||lt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?ce.lex:ce.lexInline}provideParser(e=this.block){return e?cr.parse:cr.parseInline}},cs=class{defaults=le();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=cr;Renderer=ct;TextRenderer=ci;Lexer=ce;Tokenizer=l9;Hooks=co;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let r of e)switch(i=i.concat(t.call(this,r)),r.type){case"table":for(let e of r.header)i=i.concat(this.walkTokens(e.tokens,t));for(let e of r.rows)for(let r of e)i=i.concat(this.walkTokens(r.tokens,t));break;case"list":i=i.concat(this.walkTokens(r.items,t));break;default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let o=e[r].flat(1/0);i=i.concat(this.walkTokens(o,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];i?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return!1===r&&(r=i.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new ct(this.defaults);for(let i in e.renderer){if(!(i in t))throw Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let r=e.renderer[i],o=t[i];t[i]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new l9(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let r=e.tokenizer[i],o=t[i];t[i]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new co;for(let i in e.hooks){if(!(i in t))throw Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let r=e.hooks[i],o=t[i];co.passThroughHooks.has(i)?t[i]=e=>{if(this.defaults.async&&co.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await r.call(t,e);return o.call(t,i)})();let s=r.call(t,e);return o.call(t,s)}:t[i]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await r.apply(t,e);return!1===i&&(i=await o.apply(t,e)),i})();let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(r.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ce.lex(e,t??this.defaults)}parser(e,t){return cr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let r={...i},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===r.async)return s(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return s(Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return s(Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,r=await (o.hooks?await o.hooks.provideLexer(e):e?ce.lex:ce.lexInline)(i,o),s=o.hooks?await o.hooks.processAllTokens(r):r;o.walkTokens&&await Promise.all(this.walkTokens(s,o.walkTokens));let a=await (o.hooks?await o.hooks.provideParser(e):e?cr.parse:cr.parseInline)(s,o);return o.hooks?await o.hooks.postprocess(a):a})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer(e):e?ce.lex:ce.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let r=(o.hooks?o.hooks.provideParser(e):e?cr.parse:cr.parseInline)(i,o);return o.hooks&&(r=o.hooks.postprocess(r)),r}catch(e){return s(e)}}}onError(e,t){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e="<p>An error occurred:</p><pre>"+l5(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},cn=new cs;function ca(e,t){return cn.parse(e,t)}ca.options=ca.setOptions=function(e){return cn.setOptions(e),ca.defaults=cn.defaults,lt=ca.defaults,ca},ca.getDefaults=le,ca.defaults=lt,ca.use=function(...e){return cn.use(...e),ca.defaults=cn.defaults,lt=ca.defaults,ca},ca.walkTokens=function(e,t){return cn.walkTokens(e,t)},ca.parseInline=cn.parseInline,ca.Parser=cr,ca.parser=cr.parse,ca.Renderer=ct,ca.TextRenderer=ci,ca.Lexer=ce,ca.lexer=ce.lex,ca.Tokenizer=l9,ca.Hooks=co,ca.parse=ca,ca.options,ca.setOptions,ca.use,ca.walkTokens,ca.parseInline,cr.parse,ce.lex;var cl=Object.defineProperty,cc=Object.getOwnPropertyDescriptor,ch=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cc(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cl(t,i,s),s};let cd=class extends lit_element_i{constructor(){super(...arguments),this.markdown="",this.density="compact",this.inline=!1}render(){return eC`${this.markdown?a9(this.renderMarkdown(this.markdown),"Loading..."):""}`}async renderMarkdown(e){let t,i,r,o;return this.inline?(f??=new cs({breaks:!1,gfm:!0,renderer:(i=0,r=!1,{blockquote:function({tokens:e}){return this.parser.parse(e)},code:function({text:e}){return`<code>${cg(e)}</code>`},codespan:function({text:e}){return`<code>${cg(e)}</code>`},heading:function({tokens:e}){return this.parser.parseInline(e)},hr:function(){return""},image:function({text:e}){return e||""},link:function({tokens:e}){return this.parser.parseInline(e)},list:function(e){r=e.ordered,i="number"==typeof e.start?e.start:1;let t="";for(let i of e.items)t+=o.call(this,i);return t},listitem:o=function(e){let t,o=this.parser.parse(e.tokens);return e.task?t=e.checked?"☑":"☐":r?(t=`${i}.`,i++):t="•",`${t} ${o.trim()} `},paragraph:function({tokens:e}){return this.parser.parseInline(e)},table:function(){return""},br:function(){return" "},html:function(){return""}})}),t=ck(t=await f.parse(cw(e))),eC`<span>${oa(t)}</span>`):(b??=new cs({breaks:!0,gfm:!0,renderer:{image:function({href:e,title:t,text:i}){let r=[],o=[];return e&&({href:e,dimensions:r}=function(e){let t=[],i=e.split("|").map(e=>e.trim());e=i[0];let r=i[1];if(r){let e=/height=(\d+)/.exec(r),i=/width=(\d+)/.exec(r),o=e?e[1]:"",s=i?i[1]:"",a=isFinite(parseInt(s)),c=isFinite(parseInt(o));a&&t.push(`width="${s}"`),c&&t.push(`height="${o}"`)}return{href:e,dimensions:t}}(e),o.push(`src="${c$(e)}"`)),i&&o.push(`alt="${c$(i)}"`),t&&o.push(`title="${c$(t)}"`),r.length&&(o=[...o,...r]),`<img ${o.join(" ")}>`},codespan:function({text:e}){return`<code>${cg(e)}</code>`},paragraph:function({tokens:e}){let t=this.parser.parseInline(e);return`<p>${t}</p>`},html:function({text:e}){return e.match(/^(<span[^>]+>)|(<\/\s*span>)$/)?e:""}}}),oa(t=ck(t=await b.parse(cw(e)))))}};cd.styles=[nx,F`
			:host {
				display: contents;

				--markdown-compact-block-spacing: 8px;
				--markdown-list-spacing: 20px;
			}

			a,
			a code {
				text-decoration: none;
				color: var(--vscode-textLink-foreground);
			}

			a:hover,
			a:hover code {
				color: var(--vscode-textLink-activeForeground);
			}

			a:hover:not(.disabled) {
				cursor: pointer;
			}

			p,
			.code,
			ul,
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				margin-inline: 0;
			}

			:where(:host([density='compact'])) p,
			:where(:host([density='compact'])) .code,
			:where(:host([density='compact'])) ul,
			:where(:host([density='compact'])) h1,
			:where(:host([density='compact'])) h2,
			:where(:host([density='compact'])) h3,
			:where(:host([density='compact'])) h4,
			:where(:host([density='compact'])) h5,
			:where(:host([density='compact'])) h6 {
				margin-block: var(--markdown-compact-block-spacing);
			}

			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				line-height: 1.1;
			}

			code {
				background: var(--vscode-textCodeBlock-background);
				border-radius: 3px;
				padding: 0px 4px 2px 4px;
				font-family: var(--vscode-editor-font-family);
			}

			code code-icon {
				color: inherit;
				font-size: inherit;
				vertical-align: middle;
			}

			p:first-child,
			.code:first-child,
			ul:first-child {
				margin-top: 0;
			}

			p:last-child,
			.code:last-child,
			ul:last-child {
				margin-bottom: 0;
			}

			/* MarkupContent Layout */
			ul {
				padding-left: var(--markdown-list-spacing);
			}
			ol {
				padding-left: var(--markdown-list-spacing);
			}

			li > p {
				margin-bottom: 0;
			}

			li > ul {
				margin-top: 0;
			}
=		`],ch([eB({type:String})],cd.prototype,"markdown",2),ch([eB({type:String,reflect:!0})],cd.prototype,"density",2),ch([eB({type:Boolean,reflect:!0})],cd.prototype,"inline",2),cd=ch([eD("gl-markdown")],cd);let cp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},cu=e=>cp[e];function cg(e,t){if(t){if(/[&<>"']/.test(e))return e.replace(/[&<>"']/g,cu)}else if(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/.test(e))return e.replace(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,cu);return e}let cm="[A-Za-z0-9-]+",cf="~[A-Za-z]+",cb=RegExp(`^(${cm})(${cf})?$`),cv=RegExp(`\\$\\(${cm}(?:${cf})?\\)`,"g"),c_=RegExp(`\\\\${cv.source}`,"g"),cy=RegExp(`(\\\\)?\\$\\((${cm}(?:${cf})?)\\)`,"g");function cw(e){return e.replace(c_,e=>`\\${e}`)}function ck(e){let t,i,r=[],o=0;for(;null!==(t=cy.exec(e));){o<(i=t.index||0)&&r.push(e.substring(o,i)),o=(t.index||0)+t[0].length;let[,s,a]=t;r.push(s?`$(${a})`:function(e){let[,t,i]=cb.exec(e.id)??[void 0,"error",void 0];return t.startsWith("gitlens-")&&(t=`gl-${t.substring(8)}`),`<code-icon icon="${t}"${i?` modifier="${i}"`:""}></code-icon>`}({id:a}))}return o<e.length&&r.push(e.substring(o)),r.join("")}let cx=/"/g;function c$(e){return e.replace(cx,"&quot;")}F`
		:host {
			display: block;
			height: 100%;
		}
	`;let cC=[op,F`
		:host {
			--tree-connector-spacing: 0.6rem;
			--tree-connector-size: var(--gitlens-tree-indent, 1.6rem);
			box-sizing: border-box;
			padding-left: var(--gitlens-gutter-width);
			padding-right: 0.5rem;
			padding-top: 0.1rem;
			padding-bottom: 0.1rem;
			line-height: 2.2rem;
			height: 2.2rem;

			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			font-size: var(--vscode-font-size);
			color: var(--gitlens-tree-foreground, var(--vscode-foreground));

			cursor: pointer;
			/* Reduced containment to allow tooltips to escape */
			contain: layout;
		}

		:host([aria-hidden='true']) {
			display: none;
		}

		/* Rich mode: host a multi-line / card component (e.g. gl-commit-row) in the default slot.
		   Relaxes the single-line tree-row constraints so the consumer's content drives row height. */
		:host([rich]) {
			height: auto;
			min-height: var(--gl-tree-item-min-height, 2.2rem);
			line-height: normal;
			padding-top: var(--gl-tree-item-padding-y, 0.4rem);
			padding-bottom: var(--gl-tree-item-padding-y, 0.4rem);
		}

		:host([rich]) .item {
			align-items: stretch;
		}

		:host([rich]) .text {
			line-height: normal;
			white-space: normal;
			text-overflow: clip;
		}

		:host([rich]) .main,
		:host([rich]) .description {
			display: block;
		}

		:host(:hover) {
			color: var(--vscode-list-hoverForeground);
			background-color: var(--vscode-list-hoverBackground);
			/* Raise above sibling items so action tooltips aren't painted behind the next row */
			z-index: 1;
		}

		/* Disabled state — propagated from disable-check so AI-excluded files (or any other
		   row that shouldn't be acted on) read as visually inactive AND inert (clicking the
		   row will not open the file or trigger any action — same UX as a disabled menu item).
		   The checkbox visual is already dimmed via .checkbox:has(:disabled) and the underlying
		   <input> is :disabled, so it cannot be activated regardless. */
		:host([disable-check]) .item,
		:host([disable-check]) slot[name='decorations-before'],
		:host([disable-check]) slot[name='decorations-after'],
		:host([disable-check]) .actions {
			opacity: 0.7;
			color: var(--vscode-disabledForeground, inherit);
		}

		:host([disable-check]) .item {
			cursor: default;
			pointer-events: none;
		}

		:host([disable-check]) .actions {
			pointer-events: none;
		}

		:host([disable-check]:hover) {
			background-color: transparent;
		}

		:host([aria-selected='true']) {
			color: var(--vscode-list-inactiveSelectionForeground);
			background-color: var(--vscode-list-inactiveSelectionBackground);
		}

		/* Focused state - when the item is the active descendant in the tree */
		:host([focused]) {
			outline: 1px solid var(--vscode-list-focusOutline);
			outline-offset: -0.1rem;
			z-index: 1;
		}

		:host([aria-selected='true'][focused]) {
			color: var(--vscode-list-activeSelectionForeground);
			background-color: var(--vscode-list-activeSelectionBackground);
		}

		/* Inactive focus state - when the item would be focused but container doesn't have focus */
		/* In VS Code, inactive focus shows the selection background without the outline */
		:host([focused-inactive]) {
			color: var(--vscode-list-inactiveSelectionForeground);
			background-color: var(--vscode-list-inactiveSelectionBackground);
		}

		/* TODO: these should be :has(.input:focus) instead of :focus-within */
		:host(:focus-within) {
			outline: 1px solid var(--vscode-list-focusOutline);
			outline-offset: -0.1rem;
			z-index: 1;
		}

		:host([aria-selected='true']:focus-within) {
			color: var(--vscode-list-activeSelectionForeground);
			background-color: var(--vscode-list-activeSelectionBackground);
		}

		.item {
			appearance: none;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			gap: 0.6rem;
			flex: 1;
			min-width: 0;
			padding: 0;
			font-family: inherit;
			font-size: inherit;
			text-decoration: none;
			color: inherit;
			background: none;
			border: none;
			outline: none;
			cursor: pointer;
		}
		.icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: var(--gl-icon-size, 1.6rem);
			height: 2.2rem;
			pointer-events: none;
			flex: none;
		}

		slot[name='icon']::slotted(*) {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: var(--gl-icon-size, 1.6rem);
			height: 1.6rem;
			vertical-align: middle;
		}

		.node {
			display: inline-block;
			width: var(--tree-connector-size);
			text-align: center;
			flex: none;
			height: 2.2rem;
			line-height: 2.2rem;
			pointer-events: none;
			vertical-align: text-bottom;
		}

		.node:last-of-type {
			margin-right: 0.3rem;
		}

		.node--connector {
			position: relative;
		}

		.node--connector::before {
			content: '';
			position: absolute;
			height: 2.2rem;
			border-left: 1px solid transparent;
			top: 50%;
			transform: translate(-1px, -50%);
			left: 0.8rem;
			width: 0.1rem;
			transition: border-color 0.1s linear;
			opacity: 0.4;
		}

		@media (prefers-reduced-motion: reduce) {
			.node--connector::before {
				transition: none;
			}
		}

		:host-context([guides='always']) .node--connector::before,
		:host-context([guides='onHover']:focus-within) .node--connector::before,
		:host-context([guides='onHover'][focused]) .node--connector::before,
		:host-context([guides='onHover'][focused-inactive]) .node--connector::before,
		:host-context([guides='onHover']:hover) .node--connector::before {
			border-color: var(--vscode-tree-indentGuidesStroke);
		}

		.branch {
			display: inline-block;
			margin-right: 0.6rem;
			height: 2.2rem;
			line-height: 2.2rem;
			vertical-align: text-bottom;
		}

		.text {
			line-height: 1.8rem;
			overflow: hidden;
			white-space: nowrap;
			text-align: left;
			text-overflow: ellipsis;
			flex: 1;
		}

		.main {
			display: inline;
		}

		.description {
			display: inline;
			opacity: 0.7;
			font-size: 0.9em;
			margin-left: 0.3rem;
			pointer-events: none;
		}

		.actions {
			flex: none;
			user-select: none;
			color: var(--vscode-icon-foreground);
			margin-left: 0.4rem;
		}

		:host(:focus-within) .actions,
		:host([focused]) .actions {
			color: var(--vscode-list-activeSelectionIconForeground);
		}

		:host([focused-inactive]) .actions {
			color: var(--vscode-list-inactiveSelectionIconForeground, var(--vscode-icon-foreground));
		}

		:host(:not(:hover):not(:focus-within):not([focused]):not([focused-inactive])) .actions {
			display: none;
		}

		/* Tooltip wrapper around the checkbox has display: block + line-height from the host,
		   which adds inline leading and pushes the checkbox 1px above the row. Center-fit it. */
		gl-tooltip:has(> .checkbox) {
			display: inline-flex;
			align-items: center;
			line-height: 0;
		}

		.checkbox {
			position: relative;
			display: inline-flex;
			width: 1.6rem;
			aspect-ratio: 1 / 1;
			text-align: center;
			color: var(--vscode-checkbox-foreground);
			background: var(--vscode-checkbox-background);
			border: 1px solid var(--vscode-checkbox-border);
			border-radius: 0.3rem;
			margin-right: 0.6rem;
		}

		.checkbox:has(:checked),
		.checkbox:has(:indeterminate) {
			color: var(--vscode-checkbox-foreground);
			border-color: var(--vscode-checkbox-selectBorder);
			background-color: var(--vscode-checkbox-selectBackground);
		}

		.checkbox:has(:disabled) {
			opacity: 0.4;
		}

		.checkbox__input {
			position: absolute;
			top: 0;
			left: 0;
			appearance: none;
			width: 1.4rem;
			aspect-ratio: 1 / 1;
			margin: 0;
			cursor: pointer;
			border-radius: 0.3rem;
		}

		.checkbox__input:disabled {
			cursor: default;
		}

		.checkbox__check,
		.checkbox__dash {
			position: absolute;
			top: 0;
			left: 0;
			width: 1.6rem;
			aspect-ratio: 1 / 1;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			opacity: 0;
			transition: opacity 0.1s linear;
			color: var(--vscode-checkbox-foreground);
			pointer-events: none;
		}

		.checkbox__input:checked + .checkbox__check {
			opacity: 1;
		}

		.checkbox__input:indeterminate ~ .checkbox__dash {
			opacity: 1;
		}

		slot[name='decorations-before'],
		slot[name='decorations-after'] {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			flex: none;
			white-space: nowrap;
			margin-left: 0.4rem;
			--gl-pill-border: color-mix(in srgb, transparent 80%, var(--color-foreground));
		}

		::slotted([slot='decorations-before'].decoration-text) {
			font-size: var(--gl-decoration-before-font-size, inherit);
			opacity: var(--gl-decoration-before-opacity, 1);
		}

		::slotted([slot='decorations-after'].decoration-text) {
			font-size: var(--gl-decoration-after-font-size, inherit);
			opacity: var(--gl-decoration-after-opacity, 1);
		}

		::slotted([slot^='decorations-'].decoration-text--added),
		::slotted([slot^='decorations-'].conflict-count--added) {
			color: var(--vscode-gitDecoration-addedResourceForeground);
		}
		::slotted([slot^='decorations-'].conflict-count--added) {
			border-color: color-mix(in srgb, transparent 60%, var(--vscode-gitDecoration-addedResourceForeground));
		}

		::slotted([slot^='decorations-'].decoration-text--deleted),
		::slotted([slot^='decorations-'].conflict-count--deleted) {
			color: var(--vscode-gitDecoration-deletedResourceForeground);
		}
		::slotted([slot^='decorations-'].conflict-count--deleted) {
			border-color: color-mix(in srgb, transparent 60%, var(--vscode-gitDecoration-deletedResourceForeground));
		}

		::slotted([slot^='decorations-'].decoration-text--modified),
		::slotted([slot^='decorations-'].conflict-count--modified) {
			color: var(--vscode-gitDecoration-modifiedResourceForeground);
		}
		::slotted([slot^='decorations-'].conflict-count--modified) {
			border-color: color-mix(in srgb, transparent 60%, var(--vscode-gitDecoration-modifiedResourceForeground));
		}

		::slotted([slot^='decorations-'].decoration-text--untracked) {
			color: var(--vscode-gitDecoration-untrackedResourceForeground);
		}

		::slotted([slot^='decorations-'].decoration-text--renamed) {
			color: var(--vscode-gitDecoration-renamedResourceForeground);
		}

		::slotted([slot^='decorations-'].decoration-text--conflict),
		::slotted([slot^='decorations-'].conflict-count--conflict) {
			color: var(--vscode-gitDecoration-conflictingResourceForeground);
		}
		::slotted([slot^='decorations-'].conflict-count--conflict) {
			border-color: color-mix(
				in srgb,
				transparent 60%,
				var(--vscode-gitDecoration-conflictingResourceForeground)
			);
		}

		::slotted([slot^='decorations-'].decoration-text--muted) {
			color: var(--vscode-descriptionForeground);
		}

		/* High Contrast Mode Support */
		@media (forced-colors: active) {
			:host {
				forced-color-adjust: none;
			}

			:host([focused]) {
				outline: 2px solid CanvasText;
				outline-offset: -2px;
			}

			:host([aria-selected='true']) {
				background-color: Highlight;
				color: HighlightText;
			}

			:host([aria-selected='true'][focused]) {
				outline: 2px solid CanvasText;
				outline-offset: -2px;
			}

			.checkbox {
				border: 1px solid CanvasText;
			}

			.checkbox:has(:checked),
			.checkbox:has(:indeterminate) {
				background-color: Highlight;
				border-color: CanvasText;
			}

			.node--connector::before {
				border-color: CanvasText;
				opacity: 1;
			}

			slot[name='decorations-after'] span {
				color: CanvasText !important;
			}
		}
	`];var cS=Object.defineProperty,cE=Object.getOwnPropertyDescriptor,cA=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cE(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cS(t,i,s),s};let cP=class extends GlElement{constructor(){super(...arguments),this.branch=!1,this.expanded=!0,this.path="",this.level=0,this.size=1,this.position=1,this.checkable=!1,this.checked=!1,this.disableCheck=!1,this.showIcon=!0,this.rich=!1,this.matched=!1,this.tabIndex=-1,this.selected=!1,this.focused=!1,this.focusedInactive=!1,this.onComponentClick=e=>{this.selectCore({dblClick:!1,altKey:e.altKey})}}get isHidden(){return!1===this.parentExpanded||!this.branch&&!this.expanded}connectedCallback(){super.connectedCallback?.(),this.addEventListener("click",this.onComponentClick)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("click",this.onComponentClick)}updateAttrs(e,t=!1){(e.has("expanded")||e.has("branch")||t)&&(this.branch?this.setAttribute("aria-expanded",this.expanded.toString()):this.removeAttribute("aria-expanded")),(e.has("parentExpanded")||t)&&this.setAttribute("aria-hidden",this.isHidden.toString()),(e.has("selected")||t)&&this.setAttribute("aria-selected",this.selected.toString()),(e.has("size")||t)&&this.setAttribute("aria-setsize",this.size.toString()),(e.has("position")||t)&&this.setAttribute("aria-posinset",this.position.toString()),(e.has("level")||t)&&this.setAttribute("aria-level",this.level.toString())}firstUpdated(){this.role="treeitem"}updated(e){this.updateAttrs(e)}renderBranching(){let e=this.level-1;if(e<1&&!this.branch)return eA;let t=[];if(e>0)for(let i=0;i<e;i++)t.push(eC`<span class="node node--connector"><code-icon name="blank"></code-icon></span>`);return this.branch&&t.push(eC`<code-icon class="branch" icon="${this.expanded?"chevron-down":"chevron-right"}"></code-icon>`),t}renderCheckbox(){if(!this.checkable)return eA;let e=eC`<span
			class="checkbox"
			@mouseenter=${this.onCheckboxMouseEnter}
			@mouseleave=${this.onCheckboxMouseLeave}
			><input
				class="checkbox__input"
				id="checkbox"
				type="checkbox"
				.checked=${!0===this.checked}
				.indeterminate=${"indeterminate"===this.checked}
				?disabled=${this.disableCheck}
				@change=${this.onCheckboxChange}
				@click=${this.onCheckboxClick} /><code-icon icon="check" size="14" class="checkbox__check"></code-icon
			><code-icon icon="dash" size="14" class="checkbox__dash"></code-icon
		></span>`;return this.checkableTooltip?eC`<gl-tooltip placement="right"
					>${e}<span slot="content">${this.checkableTooltip}</span></gl-tooltip
				>`:e}renderActions(){return eC`<action-nav class="actions" part="actions"><slot name="actions"></slot></action-nav>`}renderBefore(){return eC`<slot name="decorations-before" class="decorations-before"></slot>`}renderAfter(){return eC`<slot name="decorations-after" class="decorations-after"></slot>`}render(){return eC`
			${this.renderBranching()}${this.renderCheckbox()}
			<button
				id="button"
				class="item"
				part="item"
				type="button"
				tabindex=${this.tabIndex}
				@click=${this.onButtonClick}
				@dblclick=${this.onButtonDblClick}
				@contextmenu=${this.onButtonContextMenu}
			>
				${eU(this.showIcon,()=>eC`<slot name="icon" class="icon"></slot>`)}
				<span class="text" part="text">
					<slot class="main" part="main"></slot>
					<slot name="description" class="description"></slot>
				</span>
			</button>
			${this.renderBefore()}${this.renderActions()}${this.renderAfter()}
		`}selectCore(e,t=!1){this.emit("gl-tree-item-select"),this.selected=!0,t||window.requestAnimationFrame(()=>{this.emit("gl-tree-item-selected",{node:this,dblClick:e?.dblClick??!1,altKey:e?.altKey??!1,ctrlKey:e?.ctrlKey??!1,metaKey:e?.metaKey??!1})})}select(){this.selectCore(void 0,!0)}deselect(){this.selected=!1}focus(){this.buttonEl.focus()}onButtonClick(e){e.stopPropagation(),this.selectCore({dblClick:!1,altKey:e.altKey})}onButtonDblClick(e){e.stopPropagation(),this.selectCore({dblClick:!0,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey})}onButtonContextMenu(e){e.preventDefault(),e.stopPropagation();let t=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey});this.dispatchEvent(t)}onCheckboxClick(e){e.stopPropagation()}onCheckboxChange(e){e.preventDefault(),e.stopPropagation();let t=e.target.checked;this.checked=t,this.emit("gl-tree-item-checked",{node:this,checked:t})}onCheckboxMouseEnter(){this.emit("gl-tree-item-suspend-tooltip")}onCheckboxMouseLeave(){this.emit("gl-tree-item-resume-tooltip")}};cP.styles=cC,cA([eB({type:Boolean})],cP.prototype,"branch",2),cA([eB({type:Boolean})],cP.prototype,"expanded",2),cA([eB({type:String})],cP.prototype,"path",2),cA([eB({type:String,attribute:"parent-path"})],cP.prototype,"parentPath",2),cA([eB({type:Boolean,attribute:"parent-expanded"})],cP.prototype,"parentExpanded",2),cA([eB({type:Number})],cP.prototype,"level",2),cA([eB({type:Number})],cP.prototype,"size",2),cA([eB({type:Number})],cP.prototype,"position",2),cA([eB({type:Boolean})],cP.prototype,"checkable",2),cA([eB()],cP.prototype,"checked",2),cA([eB({type:Boolean,reflect:!0,attribute:"disable-check"})],cP.prototype,"disableCheck",2),cA([eB({attribute:"checkable-tooltip"})],cP.prototype,"checkableTooltip",2),cA([eB({type:Boolean})],cP.prototype,"showIcon",2),cA([eB({type:Boolean,reflect:!0})],cP.prototype,"rich",2),cA([eB({type:Boolean,reflect:!0})],cP.prototype,"matched",2),cA([eB({type:Number})],cP.prototype,"tabIndex",2),cA([eB({type:String,attribute:"vscode-context"})],cP.prototype,"vscodeContext",2),cA([eF()],cP.prototype,"selected",2),cA([eB({type:Boolean,reflect:!0})],cP.prototype,"focused",2),cA([eB({type:Boolean,reflect:!0,attribute:"focused-inactive"})],cP.prototype,"focusedInactive",2),cA([eq("#button")],cP.prototype,"buttonEl",2),cP=cA([eD("gl-tree-item")],cP);var cz=Object.defineProperty,cR=Object.getOwnPropertyDescriptor,cI=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cR(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cz(t,i,s),s};let cT=/^[a-zA-Z0-9\s\-_.]$/,cM=class extends GlElement{constructor(){super(...arguments),this.treeItems=void 0,this.filtered=!1,this.filterable=!1,this.filterPlaceholder="Filter...",this.filterMode="filter",this.emptyText="No items",this.tooltipAnchorRight=!1,this._filterText="",this._filterLower="",this._filterTerms=[],this.ariaLabel="Tree",this._focusedItemIndex=-1,this.virtualizerRef=av(),this.scrollableRef=av(),this._containerHasFocus=!1,this._filterHasFocus=!1,this._actionButtonHasFocus=!1,this._scrolling=!1,this._hoverOpen=!1,this._typeAheadBuffer="",this._typeAheadTimeout=800,this._nodeMap=new Map,this._pathToIndexMap=new Map,this.dismissRowTooltip=()=>{clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},this.handleContainerFocus=()=>{this._containerHasFocus=!0,this._focusedItemPath||(this._lastSelectedPath?(this._focusedItemPath=this._lastSelectedPath,this._focusedItemIndex=this.getItemIndex(this._lastSelectedPath)):this.treeItems?.length&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0),this.requestUpdate())},this.handleContainerBlur=()=>{this._containerHasFocus=!1},this.handleFocusIn=e=>{let t=e.target;("ACTION-ITEM"===t.tagName?t:t.closest("action-item"))&&(this._actionButtonHasFocus=!0)},this.handleFocusOut=e=>{let t=e.target,i=e.relatedTarget,r="ACTION-ITEM"===t.tagName?t:t.closest("action-item"),o=i?.tagName==="ACTION-ITEM"?i:i?.closest("action-item");r&&!o&&(this._actionButtonHasFocus=!1)},this.handleContextMenu=e=>{let t=e.composedPath().find(e=>"GL-TREE-ITEM"===e.tagName);if(!t)return;let i=t.vscodeContext;if(!i)return;e.preventDefault(),e.stopPropagation(),this.dataset.vscodeContext=i;let r=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey});this.dispatchEvent(r),setTimeout(()=>{delete this.dataset.vscodeContext},100)},this.handleKeydown=e=>{if("Tab"===e.key&&e.composedPath().find(e=>"ACTION-ITEM"===e.tagName))if(e.shiftKey){e.preventDefault();let t=this.scrollableRef.value;t&&t.focus()}else{e.preventDefault();let t=document.activeElement;setTimeout(()=>{t&&"function"==typeof t.blur&&t.blur()},0)}},this.handleContainerKeydown=e=>{if(!this.treeItems?.length||this._actionButtonHasFocus)return;if("Tab"===e.key&&!e.shiftKey){if(this._focusedItemPath){let t=this.virtualizerRef.value;if(t){let i=[...t.querySelectorAll("gl-tree-item")].find(e=>e.id===`tree-item-${this._focusedItemPath}`);if(i){let t=i.querySelector("action-item");t&&(e.preventDefault(),e.stopPropagation(),t.focus())}}}return}let t=this.getCurrentFocusedIndex(),i=t,r=!1;switch(e.key){case"Enter":case" ":e.preventDefault(),e.stopPropagation(),this.handleItemActivation(this.treeItems[t]);return;case"ArrowDown":i=Math.min(t+1,this.treeItems.length-1),r=!0;break;case"ArrowUp":if(t<=0&&this.filterable){let t=this.renderRoot.querySelector(".filter-input");if(null!=t){e.preventDefault(),e.stopPropagation(),t.focus(),t.select();return}}i=Math.max(t-1,0),r=!0;break;case"Home":i=0,r=!0;break;case"End":i=this.treeItems.length-1,r=!0;break;case"ArrowLeft":case"ArrowRight":if(this.handleBranchToggle(e,this.treeItems[t]))return;if("ArrowRight"===e.key)i=Math.min(t+1,this.treeItems.length-1);else{let e=this.treeItems[t];if(e.parentPath){let r=this.getItemIndex(e.parentPath);i=-1!==r?r:Math.max(t-1,0)}else i=Math.max(t-1,0)}r=!0;break;default:if(this.isPrintableCharacter(e.key)){e.preventDefault(),e.stopPropagation(),this.handleTypeAhead(e.key);return}}r&&(e.preventDefault(),e.stopPropagation(),this.focusItemAtIndex(i))},this.handleFilterInput=e=>{this._filterText=e.target.value,this.dispatchEvent(new CustomEvent("gl-tree-filter-changed",{detail:this._filterText,bubbles:!0,composed:!0})),clearTimeout(this._filterDebounceTimer),this._filterDebounceTimer=setTimeout(()=>this.applyFilterToModel(),150)},this.handleFilterFocus=()=>{this._filterHasFocus=!0,!this._focusedItemPath&&this.treeItems?.length&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0)},this.handleFilterBlur=()=>{this._filterHasFocus=!1},this.handleFilterKeydown=e=>{if(!this.treeItems?.length)return;let t=this.getCurrentFocusedIndex(),i=t,r=!1;switch(e.key){case"ArrowDown":i=t<0?0:Math.min(t+1,this.treeItems.length-1),r=!0;break;case"ArrowUp":i=t<=0?0:t-1,r=!0;break;case"Home":i=0,r=!0;break;case"End":i=this.treeItems.length-1,r=!0;break;case"Enter":{e.preventDefault(),e.stopPropagation();let i=this.treeItems[t]??this.treeItems[0];this.handleItemActivation(i);return}}r&&(e.preventDefault(),e.stopPropagation(),this.setActiveDescendant(i))},this.toggleFilterMode=()=>{this.filterMode="filter"===this.filterMode?"highlight":"filter",this.dispatchEvent(new CustomEvent("gl-tree-filter-mode-changed",{detail:this.filterMode,bubbles:!0,composed:!0})),this.filtered&&this.rebuildFlattenedTree()}}get filterText(){return this._filterText}set filterText(e){let t=this._filterText;t!==e&&(this._filterText=e,clearTimeout(this._filterDebounceTimer),this.applyFilterToModel(),this.requestUpdate("filterText",t))}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.handleKeydown,{capture:!0}),this.addEventListener("focusin",this.handleFocusIn,{capture:!0}),this.addEventListener("focusout",this.handleFocusOut,{capture:!0}),this.addEventListener("mousedown",this.dismissRowTooltip,{capture:!0}),this.addEventListener("contextmenu",this.handleContextMenu)}focus(e){if(this.filterable){let t=this.renderRoot.querySelector(".filter-input");if(null!=t)return void t.focus(e)}this.scrollableRef.value?.focus(e)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("keydown",this.handleKeydown,{capture:!0}),this.removeEventListener("focusin",this.handleFocusIn,{capture:!0}),this.removeEventListener("focusout",this.handleFocusOut,{capture:!0}),this.removeEventListener("mousedown",this.dismissRowTooltip,{capture:!0}),this.removeEventListener("contextmenu",this.handleContextMenu),this._typeAheadTimer&&(clearTimeout(this._typeAheadTimer),this._typeAheadTimer=void 0),clearTimeout(this._filterDebounceTimer),this._typeAheadBuffer=""}set model(e){let t;if(this._model!==e){if(this._model=e,this._filterTerms.length>0&&null!=this._model&&cO(this._model,this._filterTerms),this._nodeMap.clear(),null!=this._model){let e=this._model.length,i=this.filtered&&"filter"===this.filterMode;t=[];for(let r=0;r<e;r++)cj(this._model[r],e,r+1,void 0,this._nodeMap,i,t)}if(this.treeItems=t,this.buildPathToIndexMap(),this.focusedPath&&(this._focusedItemPath=this.focusedPath,this._lastSelectedPath=this.focusedPath),this._focusedItemPath){let e=this._pathToIndexMap.get(this._focusedItemPath);if(null!=e)this._focusedItemIndex=e;else{if(this.treeItems?.length){let e=Math.min(this._focusedItemIndex,this.treeItems.length-1);this._focusedItemPath=this.treeItems[Math.max(0,e)].path,this._focusedItemIndex=Math.max(0,e)}else this._focusedItemPath=void 0,this._focusedItemIndex=-1;this._lastSelectedPath&&!this._pathToIndexMap.has(this._lastSelectedPath)&&(this._lastSelectedPath=this._focusedItemPath)}}else this.treeItems?.length&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0)}}get model(){return this._model}willUpdate(e){if((e.has("filtered")||e.has("filterMode"))&&null!=this._model&&this.rebuildFlattenedTree(),this.focusedPath&&(e.has("focusedPath")||e.has("model"))){let e=this._pathToIndexMap.get(this.focusedPath);null!=e&&(this._focusedItemPath=this.focusedPath,this._focusedItemIndex=e,this._lastSelectedPath=this.focusedPath,this._pendingScrollToIndex=e)}else e.has("model")&&!this.focusedPath&&(this._lastSelectedPath=void 0,this.treeItems?.length?(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0):(this._focusedItemPath=void 0,this._focusedItemIndex=-1),this._pendingScrollToIndex=0)}updated(e){if(super.updated?.(e),null!=this._pendingScrollToIndex){let e=this._pendingScrollToIndex;this._pendingScrollToIndex=void 0,this.scrollToItem(e,!1)}}renderIcon(e){return null==e?eA:"string"==typeof e?eC`<code-icon slot="icon" icon=${e}></code-icon>`:"status"===e.type?eC`<gl-git-status slot="icon" .status=${e.name}></gl-git-status>`:"branch"===e.type?eC`<gl-branch-icon
				slot="icon"
				.status=${e.status}
				.worktree=${e.worktree??!1}
				.hasChanges=${e.hasChanges??!1}
			></gl-branch-icon>`:"file-icon"===e.type?eC`<gl-file-icon slot="icon" .filename=${e.filename}></gl-file-icon>`:eA}renderActions(e){let t=e.actions;return null==t||0===t.length?eA:t.map(t=>eC`<action-item
				slot="actions"
				.icon=${t.icon}
				.label=${t.label}
				.altIcon=${t.altIcon}
				.altLabel=${t.altLabel}
				@mouseenter=${()=>this.onSuspendRowTooltip()}
				@mouseleave=${()=>this.onResumeRowTooltip()}
				@click=${i=>this.onTreeItemActionClicked(i,e,t,!1)}
				@dblclick=${i=>this.onTreeItemActionClicked(i,e,t,!0)}
			></action-item>`)}renderDecorations(e){let t=e.decorations;return null==t||0===t.length?eA:t.map(e=>{let t="before"===e.position?"decorations-before":"decorations-after";if("icon"===e.type)return eC`<code-icon
					slot=${t}
					part=${t}
					aria-label="${e.label}"
					.icon=${e.icon}
				></code-icon>`;if("text"===e.type){let i=`decoration-text${e.kind?` decoration-text--${e.kind}`:""}`;return eC`<span
					slot=${t}
					part=${t}
					class=${i}
					aria-label=${e.tooltip??e.label??eA}
					>${e.label}</span
				>`}if("tracking"===e.type)return eC`<gl-tracking-pill
					slot=${t}
					part=${t}
					.ahead=${e.ahead}
					.behind=${e.behind}
					colorized
					outlined
					?missingUpstream=${e.missingUpstream??!1}
				></gl-tracking-pill>`;if("conflict"===e.type){let i=`conflict-count${e.kind?` conflict-count--${e.kind}`:""}`;return eC`<span
					slot=${t}
					part=${t}
					class=${i}
					aria-label=${e.tooltip??e.label??eA}
					><code-icon icon="warning" size="12"></code-icon>${e.count}</span
				>`}})}highlightText(e){if(!this.filtered||0===this._filterTerms.length)return e;let t=e.toLowerCase(),i=new Set;for(let e of this._filterTerms){let r=t.indexOf(e);if(-1!==r){for(let t=r;t<r+e.length;t++)i.add(t);continue}let o=cD(t,e);if(null!=o)for(let e of o)i.add(e)}return 0===i.size?e:function(e,t){let i=[],r=0,o=0;for(;o<t.length;){let s=o;for(;s+1<t.length&&t[s+1]===t[s]+1;)s++;let a=t[o],c=t[s]+1;a>r&&i.push(e.substring(r,a)),i.push(eC`<mark>${e.substring(a,c)}</mark>`),r=c,o=s+1}return r<e.length&&i.push(e.substring(r)),i}(e,[...i].sort((e,t)=>e-t))}renderTreeItem(e){let t=this._lastSelectedPath===e.path,i=this._focusedItemPath===e.path,r=(this._containerHasFocus||this._filterHasFocus)&&!this._actionButtonHasFocus,o=`tree-item-${e.path}`;return eC`<gl-tree-item
			id=${o}
			.branch=${e.branch}
			.expanded=${e.expanded}
			.path=${e.path}
			.parentPath=${e.parentPath}
			.parentExpanded=${e.parentExpanded}
			.level=${e.level}
			.size=${e.size}
			.position=${e.position}
			.checkable=${e.checkable}
			.checked=${e.checked??!1}
			.disableCheck=${e.disableCheck??!1}
			.checkableTooltip=${e.checkableTooltip}
			.showIcon=${null!=e.icon}
			.matched=${e.matched??!1}
			.selected=${t}
			.focused=${i&&r}
			.focusedInactive=${i&&!r}
			.tabIndex=${-1}
			.vscodeContext=${e.contextData}
			@gl-tree-item-select=${()=>this.onBeforeTreeItemSelected(e)}
			@gl-tree-item-selected=${t=>this.onTreeItemSelected(t,e)}
			@gl-tree-item-checked=${t=>this.onTreeItemChecked(t,e)}
			@mouseenter=${t=>this.onTreeItemHover(t,e)}
			@mouseleave=${()=>this.onTreeItemUnhover()}
			@gl-tree-item-suspend-tooltip=${()=>this.onSuspendRowTooltip()}
			@gl-tree-item-resume-tooltip=${()=>this.onResumeRowTooltip()}
		>
			${this.renderIcon(e.icon)}
			${this.highlightText(e.label)}${eU(null!=e.description,()=>eC`<span slot="description">${this.highlightText(e.description)}</span>`)}
			${this.renderActions(e)} ${this.renderDecorations(e)}
		</gl-tree-item>`}renderFilterBar(e){return this.filterable?eC`<div class="filter">
			<div class="filter-field">
				<input
					class="filter-input"
					type="search"
					role="combobox"
					aria-controls="tree-list"
					aria-expanded="true"
					aria-haspopup="tree"
					aria-autocomplete="list"
					aria-activedescendant=${e||eA}
					placeholder="${this.filterPlaceholder}"
					.value=${this._filterText}
					@input=${this.handleFilterInput}
					@keydown=${this.handleFilterKeydown}
					@focus=${this.handleFilterFocus}
					@blur=${this.handleFilterBlur}
				/>
				<div class="filter-controls">
					<gl-button
						appearance="input"
						role="checkbox"
						aria-checked=${"filter"===this.filterMode?"true":"false"}
						tooltip=${"filter"===this.filterMode?"Filter Results":"Highlight Results"}
						aria-label=${"filter"===this.filterMode?"Filter Results":"Highlight Results"}
						@click=${this.toggleFilterMode}
					>
						<code-icon icon="list-filter"></code-icon>
					</gl-button>
				</div>
			</div>
			<slot name="filter-actions"></slot>
		</div>`:eA}render(){let e=!!this.treeItems?.length,t=!e&&this._filterText&&this._model?.length,i=!e&&!t&&!!this.emptyText;if(!e&&!t&&!i)return eA;let r=this._focusedItemPath?`tree-item-${this._focusedItemPath}`:void 0;return eC`
			${this.renderFilterBar(r)}
			${e?eC`<div
						${ay(this.scrollableRef)}
						id="tree-list"
						class="scrollable"
						tabindex="0"
						role="tree"
						aria-label=${this.ariaLabel}
						aria-multiselectable="false"
						aria-activedescendant=${r||eA}
						@keydown=${this.handleContainerKeydown}
						@focus=${this.handleContainerFocus}
						@blur=${this.handleContainerBlur}
					>
						<lit-virtualizer
							class="scrollable"
							${ay(this.virtualizerRef)}
							.items=${this.treeItems}
							.keyFunction=${e=>e.path}
							.layout=${(0,ab.flow)({direction:"vertical"})}
							.renderItem=${e=>this.renderTreeItem(e)}
							scroller
						></lit-virtualizer>
					</div>`:t?eC`<div class="no-results">No results found</div>`:eC`<div class="no-results">${this.emptyText}</div>`}
			${this._hoverOpen&&this._hoveredTooltip?eC`<gl-popover
						class="hover-popover"
						?open=${this._hoverOpen}
						.anchor=${this._hoveredAnchor}
						placement="right-start"
						trigger="manual"
						hoist
						.distance=${12}
					>
						<div slot="content" class="hover-content">
							<gl-markdown density="compact" .markdown=${this._hoveredTooltip??""}></gl-markdown>
						</div>
					</gl-popover>`:eA}
		`}findTreeNode(e){return this._nodeMap.get(e)}getItemIndex(e){return this._pathToIndexMap.get(e)??-1}rebuildFlattenedTree(){if(!this._model)return;this._nodeMap.clear();let e=this.filtered&&"filter"===this.filterMode,t=this._model.length,i=[];for(let r=0;r<t;r++)cj(this._model[r],t,r+1,void 0,this._nodeMap,e,i);if(this.treeItems=i,this.buildPathToIndexMap(),this._focusedItemPath){let e=this._pathToIndexMap.get(this._focusedItemPath);null!=e?this._focusedItemIndex=e:this.treeItems?.length?(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0):(this._focusedItemPath=void 0,this._focusedItemIndex=-1)}}onBeforeTreeItemSelected(e){if(this._lastSelectedPath!==e.path&&(this._lastSelectedPath=e.path),this._focusedItemPath!==e.path&&(this._focusedItemPath=e.path,this._focusedItemIndex=this.getItemIndex(e.path)),e.branch){let t=this.findTreeNode(e.path);t&&(t.expanded=!t.expanded,this.rebuildFlattenedTree(),this.emit("gl-tree-expansion-changed",{path:e.path,expanded:t.expanded}))}this.requestUpdate()}onTreeItemSelected(e,t){e.stopPropagation(),this.emit("gl-tree-generated-item-selected",{...e.detail,node:t,context:t.context})}onTreeItemChecked(e,t){e.stopPropagation(),this.emit("gl-tree-generated-item-checked",{...e.detail,node:t,context:t.context})}onTreeItemHover(e,t){if(!t.tooltip)return void this.onTreeItemUnhover();let i=e.currentTarget;clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer);let r=i.getBoundingClientRect(),o=this.tooltipAnchorRight?this.getBoundingClientRect().right:e.clientX;this._hoveredAnchor={getBoundingClientRect:()=>({x:o,y:r.top,top:r.top,bottom:r.bottom,left:o,right:o,width:0,height:r.height})},this._hoveredTooltip=t.tooltip,this._hoverOpen||(this._hoverTimer=setTimeout(()=>{this._hoverOpen=!0},500))}onTreeItemUnhover(){clearTimeout(this._hoverTimer),this._unhoverTimer=setTimeout(()=>{this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},100)}onSuspendRowTooltip(){clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1}onResumeRowTooltip(){null!=this._hoveredTooltip&&null!=this._hoveredAnchor&&(this._hoverOpen=!0)}onTreeItemActionClicked(e,t,i,r=!1){e.stopPropagation(),this.emit("gl-tree-generated-item-action-clicked",{node:t,context:t.context,action:i,dblClick:r,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey})}getCurrentFocusedIndex(){if(!this.treeItems?.length)return -1;if(this._focusedItemPath){let e=this.getItemIndex(this._focusedItemPath);if(-1!==e)return e}if(this._focusedItemIndex>=0&&this._focusedItemIndex<this.treeItems.length)return this._focusedItemIndex;if(this._lastSelectedPath){let e=this.getItemIndex(this._lastSelectedPath);if(-1!==e)return e}return 0}handleItemActivation(e){e&&(this.onBeforeTreeItemSelected(e),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),e))}handleBranchToggle(e,t){if(!t?.branch)return!1;let i="ArrowRight"===e.key,r="ArrowLeft"===e.key;if(i&&t.expanded||r&&!t.expanded)return!1;e.preventDefault(),e.stopPropagation();let o=this.findTreeNode(t.path);return!!o&&(o.expanded=!o.expanded,this.rebuildFlattenedTree(),this.emit("gl-tree-expansion-changed",{path:t.path,expanded:o.expanded}),this.requestUpdate(),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),t),!0)}focusItemAtIndex(e){let t=this.treeItems?.[e];t&&(this._focusedItemPath=t.path,this._focusedItemIndex=e,this._lastSelectedPath!==t.path&&(this._lastSelectedPath=t.path),this.requestUpdate(),this.scrollToItem(e))}scrollToItem(e,t=!0){this._scrolling||(this._scrolling=!0,this.updateComplete.then(()=>{let i=this.virtualizerRef.value,r=this.scrollableRef.value;if(!i||!r){this._scrolling=!1;return}let o=()=>{t&&r&&document.activeElement!==r&&r.focus(),this._scrolling=!1},s=0===e,a=e===(this.treeItems?.length??0)-1;s||a?requestAnimationFrame(()=>{s?i.scrollTop=0:i.scrollTop=i.scrollHeight,requestAnimationFrame(o)}):requestAnimationFrame(()=>{let t=i.scrollToIndex(e,"nearest");t&&"function"==typeof t.then?t.then(o):requestAnimationFrame(o)})}))}handleTypeAhead(e){this._typeAheadTimer&&clearTimeout(this._typeAheadTimer);let t=!this._typeAheadBuffer;this._typeAheadBuffer+=e.toLowerCase();let i=this.treeItems?.[this._focusedItemIndex],r=i?.label?.toLowerCase().startsWith(this._typeAheadBuffer),o=!1;if(t?o=!0:r||(o=!0),o){let e=this.findNextMatchingItem(this._typeAheadBuffer);-1!==e&&this.focusItemAtIndex(e)}this._typeAheadTimer=window.setTimeout(()=>{this._typeAheadBuffer="",this._typeAheadTimer=void 0},this._typeAheadTimeout)}buildPathToIndexMap(){if(this._pathToIndexMap.clear(),!this.treeItems)return;let e=0;for(let t of this.treeItems)this._pathToIndexMap.set(t.path,e++)}findNextMatchingItem(e){if(!this.treeItems?.length||!e)return -1;let t=e.toLowerCase(),i=this._focusedItemIndex,r=this.treeItems.length;for(let e=1;e<r;e++){let o=(i+e)%r;if(this.treeItems[o].label?.toLowerCase().startsWith(t))return o}return -1}isPrintableCharacter(e){return 1===e.length&&cT.test(e)}setActiveDescendant(e){let t=this.treeItems?.[e];t&&(this._focusedItemPath=t.path,this._focusedItemIndex=e,this._lastSelectedPath!==t.path&&(this._lastSelectedPath=t.path),this.requestUpdate(),this.scrollToItem(e,!1))}applyFilterToModel(){this._filterLower=this._filterText.toLowerCase().trim(),this._filterTerms=this._filterLower.split(/\s+/).filter(e=>e.length>0),0===this._filterTerms.length?(this.filtered=!1,null!=this._model&&function e(t){for(let i of t)i.matched=!1,null!=i.children&&e(i.children)}(this._model)):(this.filtered=!0,null!=this._model&&cO(this._model,this._filterTerms)),this.rebuildFlattenedTree()}};function cj(e,t,i,r,o,s,a){if(s&&!1===e.matched)return a??[];let c=a??[];if(o?.set(e.path,e),c.push({...e,size:t,position:i,parentPath:r}),!1!==e.expanded&&null!=e.children&&e.children.length>0){let t=e.children.length;for(let i=0;i<t;i++)cj(e.children[i],t,i+1,e.path,o,s,c)}return c}function cO(e,t){let i=!1;for(let r of e){let e=(r.label??"").toLowerCase(),o=r.filterText?.toLowerCase(),s=r.description?.toLowerCase(),a=t.every(t=>o?.includes(t)||e.includes(t)||null!=cD(e,t)||s?.includes(t)),c=!1;null!=r.children&&r.children.length>0&&(c=cO(r.children,t)),r.matched=a||c,r.matched&&(i=!0),r.branch&&c&&(r.expanded=!0)}return i}function cD(e,t){let i=[],r=0;for(let o=0;o<e.length&&r<t.length;o++)e[o]===t[r]&&(i.push(o),r++);return r===t.length?i:void 0}cM.styles=[ou,F`
			:host {
				display: flex;
				flex-direction: column;
				height: 100%;
				width: 100%;
				overflow: hidden;
			}

			.scrollable {
				flex: 1;
				width: 100%;
				min-height: 0;
				overflow-y: auto;
				overflow-x: visible; /* Allow horizontal overflow for tooltips */
				outline: none;
			}

			.scrollable:focus-within {
				outline: none;
			}

			lit-virtualizer {
				display: block;
				width: 100%;
				height: 100%;
				/* Use layout containment instead of strict to avoid rendering issues */
				/* Removed paint containment to allow tooltips to escape */
				contain: layout;
				/* lit-virtualizer sets an inline min-height based on its initial item-size
				   estimate, which can exceed the scrollable container in small viewports and
				   push scrolling onto the outer .scrollable div instead of the virtualizer's
				   own scroller. Since height: 100% already provides correct sizing from the
				   flex layout, the min-height is always redundant. */
				min-height: 0 !important;
			}

			gl-tree-item {
				width: 100%;
			}

			/* Dim non-matched items when highlighting */
			:host([filtered]:not([filter-mode='filter'])) gl-tree-item:not([matched]) {
				opacity: 0.6;
			}

			.filter {
				display: flex;
				align-items: center;
				gap: 0.4rem;
				padding: 0.4rem 0.6rem;
				flex: none;
			}

			.filter-field {
				position: relative;
				flex: 1;
				min-width: 0;
			}

			.filter-input {
				width: 100%;
				height: 2.4rem;
				box-sizing: border-box;
				padding: 0 2rem 0 0.6rem;
				font-family: var(--vscode-font-family);
				font-size: var(--vscode-font-size);
				color: var(--vscode-input-foreground);
				background-color: var(--vscode-input-background);
				border: 1px solid var(--vscode-input-border, transparent);
				border-radius: 2px;
				outline: none;
			}

			.filter-input:focus {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.filter-input::placeholder {
				color: var(--vscode-input-placeholderForeground);
			}

			.filter-input::-webkit-search-cancel-button {
				-webkit-appearance: none;
				cursor: pointer;
				width: 16px;
				height: 16px;
				background-color: var(--vscode-foreground);
				-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z'/%3E%3C/svg%3E");
				-webkit-mask-size: contain;
			}

			.filter-controls {
				position: absolute;
				top: 1px;
				right: 0;
				bottom: 1px;
				display: inline-flex;
				align-items: center;
				gap: 0.1rem;
				padding-right: 0.2rem;
			}

			.filter-controls gl-button {
				--button-line-height: 1;
				--button-input-height: 2rem;
			}

			mark {
				background-color: var(--vscode-editor-findMatchHighlightBackground, rgba(234, 92, 0, 0.33));
				color: inherit;
				border-radius: 1px;
			}

			/* Shared by both the no-data case (emptyText) and the filter-yields-no-matches
			   case ("No results found"); class name dates from the latter. */
			.no-results {
				padding: 1rem;
				color: var(--vscode-descriptionForeground);
				font-style: italic;
				text-align: center;
			}

			.hover-popover {
				pointer-events: none;
			}
			/* gl-popover's body uses auto-size="horizontal", which shrinks to the space left of
			   the anchor — on a narrow webview that produces a cramped tooltip that wraps mid-path.
			   The min-width also gives Floating UI's flip middleware a reason to prefer the
			   opposite side when crowded. */
			.hover-popover::part(body) {
				min-width: 20rem;
				max-width: min(50rem, 92vw);
			}

			.hover-content {
				font-size: 1.2rem;
				line-height: 1.5;
				/* anywhere wraps at any character when forced — avoids the default behavior of
				   breaking paths at hyphens (the worst possible split point). */
				overflow-wrap: anywhere;
			}

			.conflict-count {
				display: inline-flex;
				align-items: center;
				gap: 0.3rem;
				padding: 0 0.6rem;
				height: 1.8rem;
				border-radius: 0.9rem;
				font-size: 1.1rem;
				font-weight: 500;
				border: 1px solid;
			}
		`],cI([eF()],cM.prototype,"treeItems",2),cI([eB({reflect:!0})],cM.prototype,"guides",2),cI([eB({type:Boolean,reflect:!0})],cM.prototype,"filtered",2),cI([eB({type:Boolean,reflect:!0})],cM.prototype,"filterable",2),cI([eB({type:String,attribute:"filter-placeholder"})],cM.prototype,"filterPlaceholder",2),cI([eB({type:String,attribute:"filter-mode",reflect:!0})],cM.prototype,"filterMode",2),cI([eB({type:String,attribute:"empty-text"})],cM.prototype,"emptyText",2),cI([eB({type:Boolean,attribute:"tooltip-anchor-right"})],cM.prototype,"tooltipAnchorRight",2),cI([eB({type:String,attribute:"filter-text"})],cM.prototype,"filterText",1),cI([eB({type:String,attribute:"aria-label"})],cM.prototype,"ariaLabel",2),cI([eB({type:String,attribute:"focused-path"})],cM.prototype,"focusedPath",2),cI([eF()],cM.prototype,"_containerHasFocus",2),cI([eF()],cM.prototype,"_filterHasFocus",2),cI([eF()],cM.prototype,"_actionButtonHasFocus",2),cI([eF()],cM.prototype,"_hoveredTooltip",2),cI([eF()],cM.prototype,"_hoveredAnchor",2),cI([eF()],cM.prototype,"_hoverOpen",2),cI([eB({type:Array,attribute:!1})],cM.prototype,"model",1),cM=cI([eD("gl-tree-view")],cM);var cL=Object.defineProperty,cB=Object.getOwnPropertyDescriptor,cF=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cB(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cL(t,i,s),s};let cN=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!0,this.showFileIcons=!1,this.header="Files changed",this.emptyText="No Files",this.checkable=!1,this.selectionBadge=!0,this.selectionAction="file-compare-previous",this._filterMode="mixed",this._showFilter=!1}willUpdate(e){if(e.has("files")||e.has("filesLayout")||e.has("showFileIcons")||e.has("grouping")||e.has("checkable")||e.has("checkableStates")||e.has("checkableStateDefault")||e.has("searchContext")||e.has("_filterMode")){var t,i,r;let o=this.files??[];if(e.has("files")){let t=e.get("files");if(t?.length&&o.length){let e=new Set;for(let i of t)e.add(i.path);let i=0;for(let t of o)e.has(t.path)&&i++;if(i/Math.max(e.size,o.length)>.5){let e=this.getTreeScrollContainer();null!=e&&(this._pendingScrollRestore=e.scrollTop)}}}this._cachedTreeModel=function(e){let{files:t,isTree:i,compact:r,filterMode:o,searchContext:s,fileToModel:a}=e;if(!e.grouping)return nJ(t,i,r,o,s,a,{level:1,...e.checkable?{checkable:!0}:{}});let c=new Map;for(let i of t){let t=e.grouping.getGroup(i),r=c.get(t);r||(r=[],c.set(t,r)),r.push(i)}let h=[];for(let t of e.grouping.groups){let e=c.get(t.key);e?.length&&h.push({label:t.label,path:`/:${t.key}:/`,level:1,branch:!0,checkable:!1,expanded:!0,checked:!1,context:[t.key],children:nJ(e,i,r,o,s,a,{level:2}),actions:t.actions})}return 0===h.length?nJ(t,i,r,o,s,a):h}({files:o,isTree:(t=this.fileLayout,i=o.length,r=this.filesLayout?.threshold??5,"auto"===t?i>r:"tree"===t),compact:this.filesLayout?.compact??!0,grouping:this.grouping,checkable:this.checkable,filterMode:this._filterMode,searchContext:this.searchContext,fileToModel:(e,t,i)=>this.fileToTreeModel(e,t,i)})}}updated(){if(null!=this._pendingScrollRestore){let e=this.getTreeScrollContainer();null!=e&&(e.scrollTop=this._pendingScrollRestore),this._pendingScrollRestore=void 0}}getTreeScrollContainer(){let e=this.renderRoot?.querySelector("gl-tree-view");return e?.shadowRoot?.querySelector("#tree-list")??void 0}get fileLayout(){return this.filesLayout?.layout??"auto"}get indentGuides(){return this.showIndentGuides??"none"}get fileCount(){return this.files?.length??0}render(){let e=this._cachedTreeModel??[],t=this.fileCount,i=this.badge??(t>0?t:void 0),r=this.buttons?.includes("layout")??!0,o=this.buttons?.includes("search")??!0,s=(this.buttons?.includes("multi-diff")??!1)&&t>0;return eC`
			<webview-pane exportparts="header, content" .collapsable=${this.collapsable} expanded flexible>
				<span slot="title"
					>${this.checkable?this.renderCheckboxTitle(t,i):this.renderTitle(i)}</span
				>
				<slot name="subtitle" slot="subtitle"></slot>
				<div class="header-actions" slot="actions">
					<slot name="leading-actions" class="leading-actions"></slot>
					<action-nav>
						${s?eC`<action-item
									data-action="multi-diff"
									label="Open All Changes"
									icon="diff-multiple"
									@click=${this.onOpenMultiDiff}
								></action-item>`:eA}
						${null!=this.searchContext?function(e,t,i,r){let o,s,a,c;if(0===t&&0===i)return eA;switch(e){case"off":o="filter",a=`Search matched ${t} of ${i} files
Click to highlight matching files`;break;case"mixed":o="filter-filled",s="filter",a=`Search matched ${t} of ${i} files
Click to show only matching files`,c="filter-mode-mixed";break;case"matched":o="filter-filled",a=`Showing ${t} of ${i} files
Click to show all files`}return eC`<action-item
		data-action="filter-mode"
		class="${c??""}"
		label="${a}"
		icon="${o}"
		outline-icon="${s??eA}"
		@click="${r}"
	></action-item>`}(this._filterMode,this.searchContext.matchedFiles?.length??0,t,e=>this.onToggleFilter(e)):eA}
						${r?function(e,t){let{value:i,icon:r,label:o}=function(e){switch(e){case"auto":return{value:"list",icon:"gl-list-auto",label:"View as List"};case"list":return{value:"tree",icon:"list-flat",label:"View as Tree"};case"tree":return{value:"auto",icon:"list-tree",label:"View as Auto"}}}(e);return eC`<action-item
		data-action="files-layout"
		data-files-layout="${i}"
		label="${o}"
		icon="${r}"
		@click="${t}"
	></action-item>`}(this.fileLayout,e=>this.onToggleFilesLayout(e)):eA}
						${o?eC`<action-item
									data-action="search"
									label="${this._showFilter?"Hide Search":"Search"}"
									icon="search"
									class="${this._showFilter?"active-toggle":""}"
									@click=${this.onToggleSearch}
								></action-item>`:eA}
						<slot name="actions"></slot>
					</action-nav>
				</div>
				<slot name="before-tree"></slot>
				${this.renderTreeFileModel(e)}
			</webview-pane>
		`}renderTitle(e){return eC`<slot name="title-content"><span class="file-tree-pane__title">${this.header}</span></slot
			>${null!=e?eC`<gl-badge appearance="filled"
						><span class="checkbox-header__badge-text">${e}</span></gl-badge
					>`:eA}<slot name="header-badge"></slot>`}renderCheckboxTitle(e,t){let i=new Set,r=[],o=0,s=0;if(this.files)for(let e of this.files){if(i.has(e.path))continue;i.add(e.path);let t=this.checkableStates?.get(e.path);(t?.disabled??this.checkableStateDefault?.disabled)||r.push(e.path);let a=t?.state??this.checkableStateDefault?.state;"checked"===a?o++:"mixed"===a&&s++}let a=i.size,c=a>0&&o===a&&0===s,h=0===o&&0===s,p=!c&&!h,u=0;if(this.files){let e=new Set;for(let t of this.files)!(!nH(t.status)||e.has(t.path))&&(e.add(t.path),u++)}let g=t,m="filled";if(u>0)g=eQ("conflict",u),m="warning";else if(this.selectionBadge&&this.checkable&&a>0){let e=o+s,t=this.selectionBadgeLabel;e<a?g=t?`${e} of ${a} ${t}`:`${e} of ${a}`:t&&(g=`${a} ${t}`)}let f=eC`<gl-checkbox
			.checked=${nq(c)}
			.indeterminate=${nq(p)}
			@gl-change-value=${e=>{let t=e.target;this.dispatchEvent(new CustomEvent("gl-check-all",{detail:{checked:t.checked,paths:r},bubbles:!0,composed:!0}))}}
		></gl-checkbox>`,b=this.checkVerb,v=this.uncheckVerb,_=b&&v?c?`${v} All`:p?`${b} Remaining`:`${b} All`:void 0,w=null==g?eC`<span class="checkbox-header__title">${this.header}</span>`:eC`<span class="checkbox-header__title">${this.header}</span>
						<gl-badge appearance=${m}
							><span class="checkbox-header__badge-text">${g}</span></gl-badge
						>`;return eC`<span class="checkbox-header" @click=${e=>e.stopPropagation()}>
			${_?eC`<gl-tooltip placement="bottom"
						>${f}<span slot="content">${_}</span></gl-tooltip
					>`:f}
			<span class="checkbox-header__label">${w}<slot name="header-badge"></slot></span>
		</span>`}onToggleSearch(e){e.preventDefault(),e.stopPropagation(),this._showFilter=!this._showFilter}onOpenMultiDiff(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("gl-file-tree-pane-open-multi-diff",{bubbles:!0,composed:!0}))}onToggleFilter(e){e.preventDefault(),e.stopPropagation(),this._filterMode=function(e){switch(e){case"off":return"mixed";case"mixed":return"matched";case"matched":return"off"}}(this._filterMode)}onToggleFilesLayout(e){e.preventDefault(),e.stopPropagation();let t=e.currentTarget?.dataset?.filesLayout;null!=t&&this.dispatchEvent(new CustomEvent("change-files-layout",{detail:{layout:t},bubbles:!0,composed:!0}))}getFileDecorations(e){let t=[];if(nH(e.status)){var i,r;let o,s,a=(i=e.status,r=e.conflictMarkers,o=nK(i,void 0),s=[],null!=o&&(s.push({type:"text",label:i,tooltip:o.description,kind:o.kind,position:"after"}),s.push({type:"text",label:o.label,tooltip:o.label,kind:"muted",position:"before"})),null!=r&&r>0&&s.push({type:"conflict",label:eQ("conflict",r),count:r,tooltip:eQ("conflict",r),kind:o?.kind??nV.U.kind,position:"before"}),s.length?s:void 0);null!=a&&t.push(...a)}if(e.stats&&t.push({type:"text",label:`+${e.stats.additions}`,kind:"added",position:"before"},{type:"text",label:`\u2212${e.stats.deletions}`,kind:"deleted",position:"before"}),this.showFileIcons&&!nH(e.status)){let i=nQ(e.status);null!=i&&t.push({type:"text",label:i.letter,tooltip:i.tooltip,kind:i.kind,position:"after"})}return t}fileToTreeModel(e,t,i=!1,r="/"){var o,s;let a,c,h,p=e.path.lastIndexOf(r),u=-1!==p?e.path.substring(p+1):e.path,g=i&&-1!==p?e.path.substring(0,p):"",m=this.searchContext?.matchedFiles?.find(t=>t.path===e.path)!=null,f=this.getFileDecorations(e),b="function"==typeof this.fileActions?this.fileActions(e,t):this.fileActions??[];if(this.checkable){let t=this.checkableStates?.get(e.path),i=t?.state??this.checkableStateDefault?.state,r=t?.disabled??this.checkableStateDefault?.disabled??!1,o=t?.disabledReason??this.checkableStateDefault?.disabledReason,s=this.checkVerb,c=this.uncheckVerb,h=r?o:s&&c?"checked"===i?`${c} ${u}`:`${s} ${u}`:void 0;a={checked:"mixed"===i?"indeterminate":"checked"===i,disableCheck:r,checkableTooltip:h}}let v=nH(e.status),_=v?{type:"status",name:e.status}:this.showFileIcons?{type:"file-icon",filename:u}:void 0,w=v?(o=e.status,s=e.conflictMarkers,c=nK(o,void 0),h=[],null!=c&&(h.push(`**${c.label}** (${o})`),h.push(c.description)),null!=s&&s>0&&h.push(eQ("conflict",s)),h.join(`

`)):nX(e);return{branch:!1,expanded:!0,path:e.path,level:1,checkable:this.checkable,checked:!1,icon:_,label:u,description:`${!0===i?g:""}${"R"===e.status?` \u2190 ${e.originalPath}`:""}`,tooltip:w,context:[e],actions:b,decorations:f.length>0?f:void 0,contextData:this.fileContext?.(e),matched:m,...t,...a}}renderTreeFileModel(e){let t="matched"===this._filterMode&&null!=this.searchContext?"No matching files":this.emptyText;return eC`<gl-tree-view
			.model=${e}
			.guides=${this.indentGuides}
			.filtered=${null!=this.searchContext&&"off"!==this._filterMode}
			filter-mode=${"mixed"===this._filterMode?"highlight":"filter"}
			?filterable=${this._showFilter}
			filter-placeholder="Filter files..."
			empty-text=${t}
			style="--gl-decoration-before-font-size: 0.9em; --gl-decoration-before-opacity: 0.8; --gl-decoration-after-font-size: 0.9em; --gl-decoration-after-opacity: 0.8"
			@gl-tree-generated-item-action-clicked=${this.onTreeItemActionClicked}
			@gl-tree-generated-item-checked=${this.onTreeItemChecked}
			@gl-tree-generated-item-selected=${this.onTreeItemSelected}
		></gl-tree-view>`}onTreeItemActionClicked(e){if(!e.detail.action)return;let t=e.detail.context;if(t?.[0]&&"object"==typeof t[0]&&"path"in t[0]){let i=t[0];this.dispatchFileEvent(e.detail.action.action,i,e.detail)}else this.dispatchEvent(new CustomEvent(e.detail.action.action,{detail:e.detail,bubbles:!0,composed:!0}))}onTreeItemChecked(e){this.dispatchEvent(new CustomEvent("file-checked",{detail:e.detail,bubbles:!0,composed:!0}))}onTreeItemSelected(e){e.detail.context&&this.dispatchFileEvent(this.selectionAction,e.detail.context[0],e.detail)}dispatchFileEvent(e,t,i){this.dispatchEvent(new CustomEvent(e,{detail:{path:t.path,repoPath:t.repoPath,status:t.status,staged:t.staged,showOptions:i?{preview:!i.dblClick,viewColumn:i.altKey?-2:void 0}:void 0},bubbles:!0,composed:!0}))}};cN.styles=[op,n0],cF([eB({type:Array})],cN.prototype,"files",2),cF([eB({type:Boolean})],cN.prototype,"collapsable",2),cF([eB({type:Boolean,attribute:"show-file-icons"})],cN.prototype,"showFileIcons",2),cF([eB({type:Object,attribute:"search-context"})],cN.prototype,"searchContext",2),cF([eB()],cN.prototype,"header",2),cF([eB({attribute:"empty-text"})],cN.prototype,"emptyText",2),cF([eB({attribute:!1})],cN.prototype,"fileActions",2),cF([eB({attribute:!1})],cN.prototype,"fileContext",2),cF([eB({attribute:!1})],cN.prototype,"grouping",2),cF([eB({attribute:!1})],cN.prototype,"filesLayout",2),cF([eB()],cN.prototype,"showIndentGuides",2),cF([eB()],cN.prototype,"badge",2),cF([eB({attribute:!1})],cN.prototype,"buttons",2),cF([eB({type:Boolean})],cN.prototype,"checkable",2),cF([eB({attribute:!1})],cN.prototype,"checkableStates",2),cF([eB({attribute:!1})],cN.prototype,"checkableStateDefault",2),cF([eB({attribute:"check-verb"})],cN.prototype,"checkVerb",2),cF([eB({attribute:"uncheck-verb"})],cN.prototype,"uncheckVerb",2),cF([eB({type:Boolean,attribute:"selection-badge"})],cN.prototype,"selectionBadge",2),cF([eB({attribute:"selection-badge-label"})],cN.prototype,"selectionBadgeLabel",2),cF([eB({attribute:"selection-action"})],cN.prototype,"selectionAction",2),cF([eF()],cN.prototype,"_filterMode",2),cF([eF()],cN.prototype,"_showFilter",2),cN=cF([eD("gl-file-tree-pane")],cN);var cq=Object.defineProperty,cU=Object.getOwnPropertyDescriptor,cW=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cU(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cq(t,i,s),s};let GlDetailsBase=class GlDetailsBase extends lit_element_i{constructor(){super(...arguments),this.variant="standalone",this.isUncommitted=!1,this.fileIcons=!1,this.filesCollapsable=!0,this.hasAccount=!1,this.hasIntegrationsConnected=!1,this.emptyText="No Files",this._getFileActions=(e,t)=>this.getFileActions(e,t),this._getFileContext=e=>this.getFileContext(e),this._onFileChecked=e=>this.onFileChecked(e)}static{this.styles=nj}renderChangedFiles(e,t){let i=t?.multiDiff,r=i?["layout","search","multi-diff"]:void 0,o=t?.loading===!0&&!this.files?.length;return eC`
			<gl-file-tree-pane
				.files=${this.files}
				.filesLayout=${this.preferences?.files}
				.showIndentGuides=${this.preferences?.indentGuides}
				.collapsable=${this.filesCollapsable}
				?show-file-icons=${this.fileIcons}
				.fileActions=${this._getFileActions}
				.fileContext=${this._getFileContext}
				.searchContext=${this.searchContext}
				.buttons=${r}
				empty-text=${o?"":this.emptyText??"No Files"}
				@file-checked=${this._onFileChecked}
				@gl-file-tree-pane-open-multi-diff=${i?()=>this.onOpenMultiDiff(i):null}
			>
				${t?.stats?eC`<span slot="subtitle" style="opacity: 1">${this.renderCommitStats(t.stats)}</span>`:eA}
				${o?eC`<div slot="before-tree" class="files-loading" aria-busy="true">
							<code-icon icon="loading" modifier="spin"></code-icon>
							<span>Loading…</span>
						</div>`:eA}
				${this.renderChangedFilesSlottedContent()}
			</gl-file-tree-pane>
		`}onOpenMultiDiff(e){let t=this.files;t?.length&&this.dispatchEvent(new CustomEvent("open-multiple-changes",{detail:{files:t,repoPath:e.repoPath,lhs:e.lhs,rhs:e.rhs,title:e.title},bubbles:!0,composed:!0}))}onFileChecked(e){}renderChangedFilesSlottedContent(){return eA}renderCommitStats(e){return nB(e,{includeLineStats:!0})}onShareWipChanges(e,t,i){if(!i)return;let r=new CustomEvent("share-wip",{detail:{checked:t}});this.dispatchEvent(r)}getFileActions(e,t){return[]}getFileContext(e){}};cW([eB({reflect:!0})],GlDetailsBase.prototype,"variant",2),cW([eB({type:Array})],GlDetailsBase.prototype,"files",2),cW([eB({type:Boolean})],GlDetailsBase.prototype,"isUncommitted",2),cW([eB({type:Object})],GlDetailsBase.prototype,"preferences",2),cW([eB({type:Object})],GlDetailsBase.prototype,"orgSettings",2),cW([eB({type:Object})],GlDetailsBase.prototype,"searchContext",2),cW([eB({type:Boolean,attribute:"file-icons"})],GlDetailsBase.prototype,"fileIcons",2),cW([eB({type:Boolean,attribute:"files-collapsable"})],GlDetailsBase.prototype,"filesCollapsable",2),cW([eB({type:Boolean})],GlDetailsBase.prototype,"hasAccount",2),cW([eB({type:Boolean})],GlDetailsBase.prototype,"hasIntegrationsConnected",2),cW([eB({attribute:"empty-text"})],GlDetailsBase.prototype,"emptyText",2);let cH=F`
	/* Split panel layout */
	:host([variant='embedded']) .split {
		flex: 1;
		min-height: 200px;
		overflow: hidden;
		--gl-split-panel-divider-width: 12px;
	}
	:host([variant='embedded']) .split--auto-size:not([dragging]) {
		--gl-split-panel-start-size: fit-content(var(--_start-size, 25%));
	}

	:host([variant='embedded']) .msg-slot {
		height: 100%;
		min-height: 4.4rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	/* File list wrapper */
	:host([variant='embedded']) .files {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		margin-top: 0.4rem;
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	}

	/* Explain input override */
	:host([variant='embedded']) .explain-input {
		flex: 1;
		width: 0;
		min-width: 0;
		max-width: none;
		margin: 0;
		padding: 0.4rem 0.7rem;
		font-size: var(--vscode-font-size);
		font-family: var(--vscode-font-family);
		color: var(--vscode-input-foreground);
		background: transparent;
		border: none !important;
		outline: none;
	}
	:host([variant='embedded']) .explain-input::placeholder {
		color: var(--vscode-input-placeholderForeground);
	}

	/* Child Shadow DOM component overrides */
	:host([variant='embedded']) webview-pane::part(header) {
		border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
		padding-right: calc(var(--gl-panel-padding-right) - 0.4rem);
		background-color: inherit;
	}

	:host([variant='embedded']) webview-pane [slot='title'] {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
	}

	/* Add spacing between header and tree generator */
	:host([variant='embedded']) {
		--gl-tree-view-margin-top: -0.2rem;
		--gl-tree-view-filterable-margin-top: -0.4rem;
	}

	/* ── Zone 1: Author header (standalone fallback when panelActions=false) ── */
	:host([variant='embedded']) .author-header {
		display: flex;
		align-items: center;
		padding: 0.8rem var(--gl-panel-padding-right) 0.6rem var(--gl-panel-padding-left);
		gap: 0.6rem;
		flex: none;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: var(--titlebar-bg, var(--vscode-sideBar-background, var(--color-background)));
	}

	:host([variant='embedded']) .author-header__author {
		--gl-avatar-size: 3.2rem;
		min-width: 0;
		flex: 1;
	}

	/* ── Zone 2: Metadata bar ── */
	:host([variant='embedded']) .metadata-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--gl-panel-padding-right) 0 var(--gl-panel-padding-left);
		gap: 0.6rem;
		flex: none;
		min-height: var(--gl-metadata-bar-min-height);
		font-size: var(--gl-font-sm);
		background-color: var(--gl-metadata-bar-bg);
		border-top: 1px solid var(--gl-metadata-bar-border);
		border-bottom: 1px solid var(--gl-metadata-bar-border);
	}
	:host([variant='embedded']) .metadata-bar:has(+ .reachability) {
		border-bottom: none;
	}

	:host([variant='embedded']) .metadata-bar__left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
		min-width: 0;
		overflow: hidden;
	}
	:host([variant='embedded']) .metadata-bar__left > gl-tooltip,
	:host([variant='embedded']) .metadata-bar__left > gl-popover {
		display: inline-flex;
		flex-shrink: 1;
		min-width: 0;
	}

	:host([variant='embedded']) .metadata-bar__sha {
		flex-shrink: 0;
		font-size: var(--gl-font-base);
	}

	/* Negate the parent flex gap on the tooltip wrapper so the kebab sits flush against
	   the SHA chip (the inner button can't move it — the tooltip is the flex item). */
	:host([variant='embedded']) .metadata-bar__more-tooltip {
		margin-left: -0.4rem;
	}

	:host([variant='embedded']) .metadata-bar__action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 2.4rem;
		height: 2.4rem;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		border-radius: var(--gk-action-radius, 0.3rem);
		color: var(--color-foreground--65);
		font: inherit;
		line-height: 1;
	}
	:host([variant='embedded']) .metadata-bar__action:hover {
		background: var(--vscode-toolbar-hoverBackground);
		color: var(--color-foreground);
	}
	:host([variant='embedded']) .metadata-bar__action code-icon {
		display: inline-flex;
	}
	:host([variant='embedded']) .metadata-bar__action--apply {
		color: var(--color-foreground);
	}

	:host([variant='embedded']) .metadata-bar__branch {
		flex: 0 1 auto;
		min-width: 0;
		font-size: var(--gl-font-base);
		color: var(--vscode-gitlens-graphScrollMarkerLocalBranchesColor, #4ec9b0);
		text-transform: lowercase;
	}

	:host([variant='embedded']) .metadata-bar__branch-unreachable {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--color-foreground--65);
		font-style: italic;
	}
	:host([variant='embedded']) .metadata-bar__branch-unreachable code-icon {
		--code-icon-size: 12px;
	}

	:host([variant='embedded']) .metadata-bar__branch-indicator {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		border: none;
		background: transparent;
		cursor: pointer;
		flex-shrink: 1;
		min-width: 0;
		overflow: hidden;
		padding: 0.4rem;
		border-radius: var(--gk-action-radius, 0.3rem);
		color: var(--color-foreground--65);
		font-size: inherit;
		font-family: inherit;
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator:hover {
		background: var(--vscode-toolbar-hoverBackground);
		color: var(--color-foreground);
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator:disabled {
		cursor: default;
		opacity: 0.6;
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator:disabled:hover {
		background: transparent;
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator--idle {
		color: var(--color-foreground--50);
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator--warning {
		color: var(--vscode-editorWarning-foreground, #cca700);
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator--error {
		color: var(--vscode-errorForeground, #f48771);
	}
	:host([variant='embedded']) .metadata-bar__branch-indicator code-icon {
		--code-icon-size: 12px;
	}

	:host([variant='embedded']) .metadata-bar__branch-status {
		font-size: var(--gl-font-sm);
	}

	:host([variant='embedded']) .metadata-bar__ref-count {
		font-size: var(--gl-font-micro);
		font-weight: 500;
		color: var(--color-foreground--50);
		flex-shrink: 0;
	}

	:host([variant='embedded']) .metadata-bar__right {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		flex-shrink: 0;
		font-size: var(--gl-font-sm);
		font-weight: 600;
		margin-right: 0.5rem;
	}

	/* Reachability (below metadata bar) */
	:host([variant='embedded']) .reachability {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		padding: 0.2rem var(--gl-panel-padding-right) 0.4rem var(--gl-panel-padding-left);
		font-size: var(--gl-font-base);
		flex: none;
		background-color: var(--gl-metadata-bar-bg);
		border-bottom: 1px solid var(--gl-metadata-bar-border);
	}

	:host([variant='embedded']) .reachability__load-all {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-left: auto;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0.4rem;
		color: var(--color-foreground);
		border-radius: var(--gk-action-radius, 0.3rem);
	}
	:host([variant='embedded']) .reachability__load-all:hover {
		background: var(--vscode-toolbar-hoverBackground);
	}
	:host([variant='embedded']) .reachability__load-all code-icon {
		--code-icon-size: 16px;
	}

	/* ── Zone 3: Message ── */
	:host([variant='embedded']) .message {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0.8rem var(--gitlens-scrollbar-gutter-width) 0 var(--gl-panel-padding-left);
		overflow: hidden;
	}

	:host([variant='embedded']) .message .message-block {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		border: none;
		background: none;
		padding: 0;
		border-radius: 0;
	}

	:host([variant='embedded']) .message .message-block__text {
		--_fade-bg: var(--titlebar-bg, var(--color-background));

		max-height: none;
		overflow-y: auto;
		scroll-timeline: --msg-scroll block;
		flex: 1;
		min-height: 0;
		padding-bottom: 0.6rem;

		/* Scrollbar: fade in on hover/focus, hidden otherwise */
		border-color: transparent;
		transition: border-color 1s linear;
	}
	:host([variant='embedded']) .message .message-block__text:hover,
	:host([variant='embedded']) .message .message-block__text:focus-within {
		border-color: var(--vscode-scrollbarSlider-background);
		transition: none;
	}

	:host([variant='embedded']) .message .message-block__text::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-color: inherit;
		border-right-style: inset;
		border-right-width: calc(100vw + 100vh);
	}
	:host([variant='embedded']) .message .message-block__text::-webkit-scrollbar-thumb:hover {
		border-color: var(--vscode-scrollbarSlider-hoverBackground);
	}
	:host([variant='embedded']) .message .message-block__text::-webkit-scrollbar-thumb:active {
		border-color: var(--vscode-scrollbarSlider-activeBackground);
	}

	:host([variant='embedded']) .message .message-block__text::before,
	:host([variant='embedded']) .message .message-block__text::after {
		content: '';
		display: block;
		position: sticky;
		z-index: 1;
		pointer-events: none;
		opacity: 0;
		animation: linear both;
		animation-timeline: --msg-scroll;
	}
	:host([variant='embedded']) .message .message-block__text::before {
		top: 0;
		height: 2.4rem;
		margin-bottom: -2.4rem;
		background: linear-gradient(to bottom, var(--_fade-bg) 25%, transparent);
		animation-name: scroll-fade-in;
	}
	:host([variant='embedded']) .message .message-block__text::after {
		bottom: -0.6rem;
		height: 3.6rem;
		margin-top: -3.6rem;
		background: linear-gradient(to top, var(--_fade-bg) 25%, transparent);
		animation-name: scroll-fade-out;
	}

	:host([variant='embedded']) .message .message-block__text strong {
		font-size: var(--gl-font-lg);
		display: block;
		margin-bottom: 0.2rem;
	}

	:host([variant='embedded']) .message .message-block__copy {
		position: sticky;
		top: 0;
		z-index: 2;
		display: block;
		width: fit-content;
		margin-left: auto;
		margin-right: -0.4rem;
		margin-bottom: -2.4rem;
		background: var(--titlebar-bg, var(--color-background));
		padding: 0.2rem;
		border-radius: 0.3rem;
		opacity: 1;
		transition: color 0.15s ease;
	}

	/* ── Zone 4: Autolinks footer ── */
	:host([variant='embedded']) .autolinks {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin: 0.2rem var(--gl-panel-padding-right) 0.4rem var(--gl-panel-padding-left);
		font-size: var(--gl-font-sm);
		flex: none;
	}
	:host([variant='embedded']) .autolinks gl-action-chip[data-action='autolink-settings'] {
		color: var(--color-foreground--65);
		--code-icon-size: 12px;
	}

	:host([variant='embedded']) .autolinks__label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: var(--gl-font-sm);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-foreground--50);
		white-space: nowrap;
	}
	:host([variant='embedded']) .autolinks__label code-icon {
		opacity: 0.5;
	}

	/* ── Zone 5: AI input ── */
	:host([variant='embedded']) gl-ai-input {
		width: calc(100% - var(--gl-panel-padding-left) - var(--gl-panel-padding-right));
		max-width: var(--gl-max-input);
		margin: 0.2rem auto;
	}

	/* ── Zone 6: Bottom section (split panel end slot) ── */
	:host([variant='embedded']) .bottom-section {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 120px;
		overflow: hidden;
	}

	/* Split panel divider */
	:host([variant='embedded']) .split::part(divider) {
		background-color: transparent !important;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 0;
	}

	/* ── Scroll fade keyframes ── */
	@keyframes scroll-fade-in {
		0% {
			opacity: 0;
		}
		1%,
		100% {
			opacity: 1;
		}
	}

	@keyframes scroll-fade-out {
		0%,
		95% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;function cV(e="autolink",t="merged",i=!1){let r,o;switch(e){case"issue":o="closed"===t?"issue-closed":"issue-opened",r="closed"===t?"pass":"issues";break;case"pr":switch(t){case"merged":o="pr-merged",r="git-merge";break;case"closed":o="pr-closed",r="git-pull-request-closed";break;default:o=i?"pr-draft":"pr-opened",r=i?"git-pull-request-draft":"git-pull-request"}break;default:o="",r="link"}return{icon:r,modifier:o}}let cK=()=>({toAttribute:e=>e.getTime(),fromAttribute:(e,t)=>{let i=new Date(e);return isNaN(i.getTime())?new Date(parseInt(e,10)):i}});var cG=Object.defineProperty,cZ=Object.getOwnPropertyDescriptor,cY=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cZ(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cG(t,i,s),s};let cX=class extends lit_element_i{constructor(){super(...arguments),this.dateStyle="relative",this.date=new Date,this.tooltip="",this.short=!1}get absoluteDate(){return eY(this.date,this.format??"MMMM Do, YYYY h:mma")}get dateLabel(){return"relative"===this.dateStyle?eZ(this.date,this.short):this.absoluteDate}render(){return eC`<gl-tooltip content="${this.tooltip} ${this.absoluteDate}"
			><time part="base" datetime="${this.date.toISOString()}">${this.dateLabel}</time></gl-tooltip
		>`}};cY([eB()],cX.prototype,"format",2),cY([eB({attribute:"date-style"})],cX.prototype,"dateStyle",2),cY([eB({converter:cK(),reflect:!0,attribute:!1})],cX.prototype,"date",2),cY([eB()],cX.prototype,"tooltip",2),cY([eB({type:Boolean})],cX.prototype,"short",2),cX=cY([eD("formatted-date")],cX);var cJ=Object.defineProperty,cQ=Object.getOwnPropertyDescriptor,c0=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cQ(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cJ(t,i,s),s};let c1=class extends GlElement{constructor(){super(...arguments),this.url="",this.name="",this.status="merged",this.type="autolink",this.identifier="",this.details=!1}get typeLabel(){switch(this.type){case"issue":return"Issue ";case"pr":return"PR ";default:return""}}renderDate(){return this.date?eC`<formatted-date
			.date=${new Date(this.date)}
			.format=${this.dateFormat}
			.dateStyle=${this.dateStyle}
		></formatted-date>`:eA}render(){let{icon:e,modifier:t}=cV(this.type,this.status,this.isDraft);return this.compact?eC`
				<span class="icon icon--${t}"><code-icon icon=${e}></code-icon></span>
				<p class="title">${this.identifier}</p>
			`:eC`
			<span class="icon icon--${t}"><code-icon icon=${e}></code-icon></span>
			<p class="title">
				<a href="${this.url}">${this.name}</a>
			</p>
			<p class="date">
				${this.typeLabel}${this.identifier}${this.author?eC` by ${this.author}`:eA}
				${this.isDraft?eC` <span class="badge">Draft</span>`:eA}
				${this.status?eC` ${this.status}`:eA} ${this.renderDate()}
			</p>
			${this.renderReviewDecision()}
			${eU(!0===this.details,()=>eC`
					<p class="details">
						<gl-button appearance="toolbar" tooltip="Open Details" @click=${()=>this.onDetailsClicked()}
							><code-icon icon="eye"></code-icon
						></gl-button>
					</p>
				`)}
		`}renderReviewDecision(){let e,t,i;if(!this.reviewDecision||"pr"!==this.type)return eA;switch(this.reviewDecision){case"Approved":e="Approved",t="pass",i="review--approved";break;case"ChangesRequested":e="Changes Requested",t="request-changes",i="review--changes-requested";break;case"ReviewRequired":e="Review Required",t="comment-unresolved",i="review--review-required";break;default:return eA}return eC`<p class="review ${i}"><code-icon icon=${t}></code-icon> ${e}</p>`}onDetailsClicked(){this.emit("gl-issue-pull-request-details")}};c1.styles=F`
		:host {
			display: grid;
			gap: 0.25rem 0.6rem;
			justify-content: start;
			font-size: 1.3rem;
			grid-template-columns: min-content 1fr min-content;
		}

		:host([compact]) {
			grid-template-columns: min-content 1fr;
		}

		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}

		.icon {
			grid-column: 1;
			grid-row: 1 / 3;
			text-align: center;
			padding-top: 0.1rem;
		}

		.icon--pr-opened {
			color: var(--vscode-gitlens-openPullRequestIconColor);
		}
		.icon--pr-closed {
			color: var(--vscode-gitlens-closedPullRequestIconColor);
		}
		.icon--pr-merged {
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}
		.icon--pr-draft {
			color: var(--vscode-descriptionForeground);
		}
		.icon--issue-opened {
			color: var(--vscode-gitlens-openAutolinkedIssueIconColor);
		}
		.icon--issue-closed {
			color: var(--vscode-gitlens-closedAutolinkedIssueIconColor);
		}

		.title {
			grid-column: 2;
			grid-row: 1;
			margin: 0;
		}

		.date {
			grid-column: 2;
			grid-row: 2;
			margin: 0;
		}

		.details {
			grid-column: 3;
			grid-row: 1 / 3;
			margin: 0;
		}

		.badge {
			display: inline-block;
			padding: 0.1rem 0.4rem;
			font-size: 0.9em;
			line-height: 1;
			border-radius: 0.3rem;
			border: 1px solid var(--color-foreground--50);
			opacity: 0.8;
		}

		.review {
			grid-column: 2;
			margin: 0;
			display: flex;
			align-items: center;
			gap: 0.3rem;
		}

		.review--approved {
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}

		.review--changes-requested {
			color: var(--vscode-gitlens-closedPullRequestIconColor);
		}

		.review--review-required {
			opacity: 0.8;
		}
	`,c0([eB()],c1.prototype,"url",2),c0([eB()],c1.prototype,"name",2),c0([eB()],c1.prototype,"date",2),c0([eB()],c1.prototype,"dateFormat",2),c0([eB()],c1.prototype,"dateStyle",2),c0([eB()],c1.prototype,"status",2),c0([eB()],c1.prototype,"type",2),c0([eB()],c1.prototype,"identifier",2),c0([eB({type:Boolean,reflect:!0})],c1.prototype,"compact",2),c0([eB()],c1.prototype,"author",2),c0([eB({type:Boolean})],c1.prototype,"isDraft",2),c0([eB()],c1.prototype,"reviewDecision",2),c0([eB({type:Boolean})],c1.prototype,"details",2),c1=c0([eD("issue-pull-request")],c1);var c2=Object.defineProperty,c5=Object.getOwnPropertyDescriptor,c3=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?c5(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&c2(t,i,s),s};let c4=class extends lit_element_i{constructor(){super(...arguments),this.url="",this.name="",this.status="merged",this.type="autolink",this.identifier="",this.details=!1}render(){let{icon:e,modifier:t}=cV(this.type,this.status,this.isDraft);return eC`<gl-popover hoist>
			<gl-action-chip
				exportparts="icon"
				slot="anchor"
				icon=${e}
				overlay="none"
				label=${this.getAccessibleLabel()}
				class="chip--${t}"
				><span part="label">${this.identifier}</span></gl-action-chip
			>
			<div slot="content">
				<issue-pull-request
					type=${this.type}
					name=${this.name}
					url="${this.url}"
					identifier=${this.identifier}
					status=${this.status}
					.date=${this.date}
					.dateFormat=${this.dateFormat}
					.dateStyle=${this.dateStyle}
					.author=${this.author}
					?isDraft=${this.isDraft}
					.reviewDecision=${this.reviewDecision}
					?details=${this.details}
				></issue-pull-request>
			</div>
		</gl-popover>`}getAccessibleLabel(){let e="pr"===this.type?"Pull request":"issue"===this.type?"Issue":"Autolink";return this.name?`${e} ${this.identifier} - ${this.name}`:`${e} ${this.identifier}`}};c4.styles=F`
		:host {
			display: inline-flex;
		}

		.chip--pr-opened::part(icon) {
			color: var(--vscode-gitlens-openPullRequestIconColor);
		}
		.chip--pr-closed::part(icon) {
			color: var(--vscode-gitlens-closedPullRequestIconColor);
		}
		.chip--pr-merged::part(icon) {
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}
		.chip--pr-draft::part(icon) {
			color: var(--vscode-descriptionForeground);
		}
		.chip--issue-opened::part(icon) {
			color: var(--vscode-gitlens-openAutolinkedIssueIconColor);
		}
		.chip--issue-closed::part(icon) {
			color: var(--vscode-gitlens-closedAutolinkedIssueIconColor);
		}
	`,c3([eB()],c4.prototype,"url",2),c3([eB()],c4.prototype,"name",2),c3([eB()],c4.prototype,"date",2),c3([eB()],c4.prototype,"dateFormat",2),c3([eB()],c4.prototype,"dateStyle",2),c3([eB()],c4.prototype,"status",2),c3([eB()],c4.prototype,"type",2),c3([eB()],c4.prototype,"identifier",2),c3([eB()],c4.prototype,"author",2),c3([eB({type:Boolean})],c4.prototype,"isDraft",2),c3([eB()],c4.prototype,"reviewDecision",2),c3([eB({type:Boolean})],c4.prototype,"details",2),c4=c3([eD("gl-autolink-chip")],c4);var c6=Object.defineProperty,c7=Object.getOwnPropertyDescriptor,c8=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?c7(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&c6(t,i,s),s};let c9=class extends lit_element_i{constructor(){super(...arguments),this.maxRows=1,this._overflowCount=0,this._prefixEmpty=!0,this._suffixEmpty=!0,this._measurePending=!1,this._measuring=!1,this._lastVisibleCount=-1,this.handleNamedSlotChange=e=>{let t=e.target,i=t.assignedNodes({flatten:!0}).every(e=>e.nodeType===Node.TEXT_NODE&&0===(e.textContent??"").trim().length);"prefix"===t.name?this._prefixEmpty=i:"suffix"===t.name&&(this._suffixEmpty=i)}}connectedCallback(){super.connectedCallback?.(),this._resizeObserver=new ResizeObserver(()=>this.scheduleMeasure())}disconnectedCallback(){super.disconnectedCallback?.(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0}firstUpdated(){null!=this.containerEl&&this._resizeObserver?.observe(this.containerEl),this.scheduleMeasure()}updated(e){e.has("maxRows")&&(this._lastVisibleCount=-1,this.scheduleMeasure())}render(){let e=1===this.maxRows;return eC`<div class="container ${e?"is-single-row":""}" part="container">
			<span class="suffix ${this._suffixEmpty?"is-empty":""}"
				><slot name="suffix" @slotchange=${this.handleNamedSlotChange}></slot></span
			><span class="prefix ${this._prefixEmpty?"is-empty":""}"
				><slot name="prefix" @slotchange=${this.handleNamedSlotChange}></slot></span
			><slot @slotchange=${this.handleSlotChange}></slot>${this._overflowCount>0?eC`<span class="overflow-host"
						><gl-popover hoist trigger="click" placement="bottom-start" appearance="menu">
							<button
								slot="anchor"
								class="overflow-chip"
								part="overflow-chip"
								aria-label="${this._overflowCount} more items"
							>
								+${this._overflowCount}
							</button>
							<div slot="content" class="overflow-popover scrollable" part="popover">
								<slot name="popover"></slot>
							</div> </gl-popover
					></span>`:eA}
		</div>`}handleSlotChange(){this._lastVisibleCount=-1,this.scheduleMeasure()}scheduleMeasure(){this._measurePending||this._measuring||(this._measurePending=!0,requestAnimationFrame(()=>{this._measurePending=!1,this.measureOverflow()}))}measureOverflow(){if(!this._measuring){this._measuring=!0;try{let e=this.containerEl;if(null==e)return;let t=this.defaultSlot;if(null==t)return;let i=t.assignedElements({flatten:!0});if(0===i.length){this._lastVisibleCount=0,0!==this._overflowCount&&(this._overflowCount=0);return}for(let e of i)e.removeAttribute("data-overflow-hidden");let r=1===this.maxRows?this.measureSingleRow(e,i):this.measureFloat(e,i);if(null==r)return;let{visibleCount:o,overflowCount:s}=r;if(0===o&&i.length>0&&(o=1,s=i.length-1),o===this._lastVisibleCount)return;this._lastVisibleCount=o;for(let e=o;e<i.length;e++)i[e].setAttribute("data-overflow-hidden","");this._overflowCount!==s&&(this._overflowCount=s)}finally{requestAnimationFrame(()=>{this._measuring=!1})}}}measureSingleRow(e,t){let i=t[0];if(0===i.offsetHeight)return;let r=getComputedStyle(e),o=e.clientWidth-(parseFloat(r.paddingLeft)||0)-(parseFloat(r.paddingRight)||0),s=e=>{let t=this.shadowRoot?.querySelector(e);if(null==t||0===t.offsetWidth)return 0;let i=getComputedStyle(t);return t.offsetWidth+(parseFloat(i.marginInlineStart)||0)+(parseFloat(i.marginInlineEnd)||0)},a=s(".prefix"),c=s(".suffix"),h=parseFloat(getComputedStyle(i).marginInlineEnd)||0,p=0;for(let e of t)p+=e.offsetWidth+h;let u=o-a-c;if(p<=u)return{visibleCount:t.length,overflowCount:0};let g=this.shadowRoot?.querySelector(".overflow-chip"),m=u-(null!=g&&g.offsetWidth>0?g.offsetWidth:40),f=0,b=0;for(let e of t){let t=e.offsetWidth+h;if(f+t>m)break;f+=t,b++}return{visibleCount:b,overflowCount:t.length-b}}measureFloat(e,t){let i=t[0],r=i.offsetHeight;if(0===r)return;let o=getComputedStyle(e),s=parseFloat(o.rowGap)||0,a=this.maxRows*r+(this.maxRows-1)*s;e.style.maxHeight=`${a}px`;let c=i.offsetTop,h=0;for(let e of t){if(e.offsetTop-c+1>=a)break;h++}let p=t.length-h;if(p>0&&h>0){let i=e.clientWidth-(parseFloat(o.paddingLeft)||0)-(parseFloat(o.paddingRight)||0),r=this.shadowRoot?.querySelector(".suffix"),s=null!=r&&r.offsetWidth>0?r.offsetWidth:0,a=this.shadowRoot?.querySelector(".overflow-chip"),u=null!=a?a.offsetWidth:40;for(;h>0;){let e=t[h-1];if(e.offsetLeft+e.offsetWidth+(parseFloat(getComputedStyle(e).marginInlineEnd)||0)+u<=(e.offsetTop-c==0?i-s:i))break;h--,p++}}return{visibleCount:h,overflowCount:p}}};c9.styles=[ou,F`
			:host {
				display: contents;
			}

			/* Multi-row layout (maxRows > 1): block layout (display:flow-root) lets the suffix float
		   to the top-right while inline chips flow around it. Row 1 chips share the line with the
		   suffix; subsequent rows reclaim full width once they pass the suffix's bottom edge.
		   Pure CSS, no JS measure for the float positioning itself. */
			.container {
				display: flow-root;
				flex: 1 1 auto;
				min-width: 0;
				/* Negative bottom-margin trims the last row's gap so the container hugs its content. */
				margin-bottom: calc(-1 * var(--gl-chip-overflow-gap, 0.5rem));
			}

			/* Single-row layout (maxRows === 1): flex puts chips, "+N", and suffix on one line with
		   the suffix pushed right via auto-margin. No float — so the "+N" never wraps off-line
		   the way it can with floated suffix on row 1, where chips fill up to the suffix's left
		   edge and any inline content past that point gets pushed to row 2. */
			.container.is-single-row {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				min-width: 0;
				margin-bottom: 0;
			}

			::slotted([data-overflow-hidden]) {
				display: none !important;
			}

			/* Chip-layout styles must only target the DEFAULT slot's content (the actual chips) —
		   not the named "suffix"/"prefix"/"popover" slots, whose content (e.g. the popover's
		   <div slot="popover"> wrapper) would otherwise inherit 'display: inline-flex' and lay
		   its own children horizontally. */
			::slotted(:not([slot])) {
				display: inline-flex;
				vertical-align: middle;
				margin-inline-end: var(--gl-chip-overflow-gap, 0.5rem);
				margin-block-end: var(--gl-chip-overflow-gap, 0.5rem);
			}

			.container.is-single-row ::slotted(:not([slot])) {
				flex-shrink: 0;
				margin-block-end: 0;
			}

			.overflow-chip {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				height: 2rem;
				padding: 0.2rem 0.4rem;
				border-radius: 0.5rem;
				border: none;
				background: none;
				color: inherit;
				font: inherit;
				white-space: nowrap;
				cursor: pointer;
				opacity: 0.65;
				transition: opacity 0.15s ease;
				margin-inline-end: var(--gl-chip-overflow-gap, 0.5rem);
				margin-block-end: var(--gl-chip-overflow-gap, 0.5rem);
				vertical-align: middle;
			}

			.overflow-chip:hover,
			.overflow-chip:focus-visible {
				opacity: 1;
				background-color: var(--vscode-toolbar-hoverBackground);
			}

			.overflow-chip:active {
				background-color: var(--vscode-toolbar-activeBackground);
			}

			.overflow-chip:focus-visible {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: 1px;
			}

			.prefix {
				display: inline-flex;
				align-items: center;
				vertical-align: middle;
				margin-inline-end: var(--gl-chip-overflow-gap, 0.5rem);
				margin-block-end: var(--gl-chip-overflow-gap, 0.5rem);
				min-width: 0;
				max-width: 100%;
			}

			/* Floated to the top-right so chips flow around it on the first row, then wrap
		   beneath once they exceed the suffix's bottom edge (multi-row mode). */
			.suffix {
				float: right;
				display: inline-flex;
				align-items: center;
				height: var(--gl-chip-overflow-row-height, 2rem);
				gap: var(--gl-chip-overflow-gap, 0.5rem);
				margin-inline-start: var(--gl-chip-overflow-gap, 0.5rem);
				margin-block-end: var(--gl-chip-overflow-gap, 0.5rem);
				min-width: 0;
				max-width: 100%;
			}

			/* Single-row: drop float, push to end of the line via auto margin, drop block-end gap. */
			.container.is-single-row .suffix {
				float: none;
				order: 3;
				margin-inline-start: auto;
				margin-block-end: 0;
				flex-shrink: 0;
			}

			.container.is-single-row .prefix {
				order: 0;
				margin-block-end: 0;
			}

			/* Wraps the gl-popover so we can give the +N a flex order distinct from the chips and
		   suffix. gl-popover itself is display:contents so it'd otherwise inherit no order. */
			.overflow-host {
				display: inline-flex;
				vertical-align: middle;
			}

			.container.is-single-row .overflow-host {
				order: 2;
				flex-shrink: 0;
			}

			.container.is-single-row .overflow-chip {
				margin-inline-end: 0;
				margin-block-end: 0;
			}

			/* When prefix/suffix slots have no assigned content, drop them out of layout entirely
		   so the container gap does not leave a phantom inset before the first chip (or
		   after the last). The empty-state class is set by handleSlotChange. */
			.prefix.is-empty,
			.suffix.is-empty {
				display: none;
			}

			.overflow-popover {
				max-height: 300px;
				max-width: 400px;
				overflow-y: auto;
			}
		`],c8([eB({type:Number,attribute:"max-rows"})],c9.prototype,"maxRows",2),c8([eF()],c9.prototype,"_overflowCount",2),c8([eF()],c9.prototype,"_prefixEmpty",2),c8([eF()],c9.prototype,"_suffixEmpty",2),c8([eq(".container")],c9.prototype,"containerEl",2),c8([eq("slot:not([name])")],c9.prototype,"defaultSlot",2),c9=c8([eD("gl-chip-overflow")],c9);var he=Object.defineProperty,ht=Object.getOwnPropertyDescriptor;let hi=class extends lit_element_i{};hi.styles=[op,F`
			:host {
				display: block;
				height: 0;
				margin: 0.6rem;
				border-top: 0.1rem solid var(--vscode-menu-separatorBackground);
			}
		`],hi=((e,t,i,r)=>{for(var o,s=r>1?void 0:r?ht(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&he(t,i,s),s})([eD("menu-divider")],hi);var hr=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,hs=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ho(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hr(t,i,s),s};let hn=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.role="option",this.onKeydown=e=>{this.disabled||e.target!==this||("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.click())}}updateInteractiveState(){this.tabIndex=this.disabled?-1:"option"===this.role?0:-1}updated(e){(e.has("disabled")||e.has("role"))&&this.updateInteractiveState()}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}render(){return this.href?eC`<a href=${this.href}><slot></slot></a>`:eC`<slot></slot>`}};hn.styles=[op,F`
			:host {
				display: block;
				font-family: inherit;
				border: none;
				padding: 0 0.6rem;
				cursor: pointer;
				color: var(--vscode-menu-foreground);
				background-color: var(--vscode-menu-background);
				text-align: left;
				height: auto;
				line-height: 2.2rem;
				-webkit-font-smoothing: auto;
				border-radius: var(--menu-item-radius, 0.3rem);
			}

			:host([role='option']:hover),
			:host([role='option']:focus-visible) {
				color: var(--vscode-menu-selectionForeground);
				background-color: var(--vscode-menu-selectionBackground);
				outline: none;
			}

			:host([disabled]) {
				pointer-events: none;
				cursor: default;
				opacity: 0.5;
			}

			:host([aria-selected='true']) {
				opacity: 1;
				color: var(--vscode-menu-selectionForeground);
				background-color: var(--vscode-menu-background);
			}

			:host([href]) {
				padding-inline: 0;
			}

			a {
				display: block;
				color: inherit;
				text-decoration: none;
				padding: 0 0.6rem;
			}
		`],hs([eB({type:Boolean,reflect:!0})],hn.prototype,"disabled",2),hs([eB({reflect:!0})],hn.prototype,"href",2),hs([eB({reflect:!0})],hn.prototype,"role",2),hn=hs([eD("menu-item")],hn);var ha=Object.defineProperty,hl=Object.getOwnPropertyDescriptor;let hc=class extends lit_element_i{render(){return eC`<slot></slot>`}};hc.styles=[op,F`
			:host {
				display: block;
				text-transform: uppercase;
				font-size: 0.84em;
				line-height: 2.2rem;
				padding-left: 0.6rem;
				padding-right: 0.6rem;
				margin: 0px;
				color: var(--vscode-menu-foreground);
				opacity: 0.6;
				user-select: none;
				-webkit-font-smoothing: auto;
			}
		`],hc=((e,t,i,r)=>{for(var o,s=r>1?void 0:r?hl(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ha(t,i,s),s})([eD("menu-label")],hc);var hh=Object.defineProperty,hd=Object.getOwnPropertyDescriptor,hp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hd(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hh(t,i,s),s};let hu="gl-copy-container",hg=class extends lit_element_i{constructor(){super(...arguments),this.copyLabel="Copy",this.copiedLabel="Copied",this.disabled=!1,this.placement="top",this.timeout=1e3,this._isMouseDown=!1,this.onMouseDown=()=>{this._isMouseDown=!0,window.addEventListener("mouseup",()=>this._isMouseDown=!1,{once:!0})},this.onFocusIn=()=>{this._isMouseDown||this.tooltip?.show()},this.onFocusOut=()=>{this.tooltip?.hide()}}connectedCallback(){super.connectedCallback?.(),this.label=this.copyLabel,this.addEventListener("mousedown",this.onMouseDown),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}willUpdate(e){e.has("copyLabel")&&null==this._resetTimer&&(this.label=this.copyLabel)}disconnectedCallback(){this.cancelResetTimer(),this.removeEventListener("mousedown",this.onMouseDown),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback?.()}render(){return this.content||this.disabled?eC`<gl-tooltip
			tabindex="0"
			.content="${this.label}"
			placement="${this.placement??eA}"
			@click=${this.onClick}
			@keydown=${this.onKeydown}
		>
			<slot></slot>
		</gl-tooltip>`:eA}async onClick(e){if(this.cancelResetTimer(),this.content)try{await navigator.clipboard.writeText(this.content),this.label=this.copiedLabel}catch{this.label="Unable to Copy"}else this.label="Nothing to Copy";this.createResetTimer(),await this.updateComplete,await this.tooltip?.updateComplete,this.tooltip?.show()}onKeydown(e){("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.onClick(e))}cancelResetTimer(){null!=this._resetTimer&&(clearTimeout(this._resetTimer),this._resetTimer=void 0)}createResetTimer(){this._resetTimer=setTimeout(()=>{this._resetTimer=void 0,this.label=this.copyLabel},this.timeout)}};hg.tagName=hu,hg.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},hg.styles=F`
		:host {
			display: inline-block;
		}

		gl-tooltip {
			cursor: pointer;
		}

		gl-tooltip:focus-visible {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		/* Hide focus outline on slotted copy icon - we show it on the host instead */
		::slotted(.copy-icon) {
			outline: none !important;
		}

		:host([appearance='toolbar']) {
			--copy-background: transparent;
			--copy-foreground: var(--vscode-foreground);
			--copy-hover-background: var(--vscode-toolbar-hoverBackground);
			--copy-border: transparent;
			--copy-border-radius: var(--gk-action-radius, 0.3rem);
			--copy-padding: 0.4rem;

			border: 1px solid var(--copy-border);
			border-radius: var(--copy-border-radius);
			background: var(--copy-background);
			color: var(--copy-foreground);
		}

		:host([appearance='toolbar']:hover) {
			background: var(--copy-hover-background);
		}

		:host([appearance='toolbar']:focus-within) {
			outline: 1px solid var(--color-focus-border);
			outline-offset: -1px;
		}

		:host([appearance='toolbar']) gl-tooltip {
			padding: var(--copy-padding);
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 1.8rem;
			box-sizing: border-box;
		}

		:host([disabled]) {
			pointer-events: none;
			opacity: 0.5;
		}
	`,hp([eB({reflect:!0})],hg.prototype,"appearance",2),hp([eB({reflect:!1})],hg.prototype,"content",2),hp([eB()],hg.prototype,"copyLabel",2),hp([eB()],hg.prototype,"copiedLabel",2),hp([eB({type:Boolean,reflect:!0})],hg.prototype,"disabled",2),hp([eB()],hg.prototype,"placement",2),hp([eB({type:Number})],hg.prototype,"timeout",2),hp([eF()],hg.prototype,"label",2),hp([eq("gl-tooltip")],hg.prototype,"tooltip",2),hg=hp([eD(hu)],hg);let hm=/\/EMail=([^/]+)/i,hf=/<([^>]+)>/,hb=/no public key/i;function hv(e,t){if(null==e)return"unknown";let{status:i,trustLevel:r,signer:o}=e;if("bad"===i)return"untrusted";if("good"===i&&("ultimate"===r||"full"===r)){let e=function(e){if(!e)return;let t=e.match(hm);if(t)return t[1];let i=e.match(hf);return i?i[1]:e.includes("@")&&!e.includes(" ")?e:void 0}(o);if(e&&t&&e.toLowerCase()===t.toLowerCase())return"trusted"}return"unknown"}function h_(e){switch(e){case"trusted":return"workspace-trusted";case"untrusted":return"workspace-untrusted";default:return"workspace-unknown"}}var hy=Object.defineProperty,hw=Object.getOwnPropertyDescriptor,hk=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hw(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hy(t,i,s),s};let hx=class extends lit_element_i{render(){if(null==this.signature)return eA;let e=hv(this.signature,this.committerEmail),t=h_(e);return eC`
			<span class="badge badge--${e}">
				<code-icon icon="${t}"></code-icon>
			</span>
		`}};hx.styles=F`
		:host {
			display: inline-flex;
			align-items: center;
		}

		.badge {
			display: inline-flex;
			align-items: center;

			& code-icon {
				margin-top: 0.1rem;
			}
		}

		.badge--trusted {
			color: var(--vscode-charts-green);
		}

		.badge--unknown {
			color: var(--color-foreground--65);
		}

		.badge--untrusted {
			color: var(--vscode-charts-red);
		}
	`,hk([eB({type:String})],hx.prototype,"committerEmail",2),hk([eB({type:Object})],hx.prototype,"signature",2),hx=hk([eD("gl-signature-badge")],hx);var h$=Object.defineProperty,hC=Object.getOwnPropertyDescriptor,hS=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hC(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&h$(t,i,s),s};let hE=class extends lit_element_i{getFormatLabel(e){switch(e){case"gpg":case"openpgp":return"GPG";case"ssh":return"SSH";case"x509":return"X.509";default:return""}}renderKeyLine(){let{keyId:e,fingerprint:t,format:i}=this.signature??{};if(!e&&!t)return eA;let r=t??e,o=this.getFormatLabel(i),s=t?"Fingerprint":"Key ID",a=o?`${o} ${s}:`:`${s}:`;return eC`
			<div class="signature-key">
				<span class="signature-key-label">${a}</span>
				<span class="signature-key-value">${r}</span>
				<gl-copy-container tabindex="0" .content=${r} copyLabel="Copy ${s}">
					<code-icon icon="copy"></code-icon>
				</gl-copy-container>
			</div>
		`}render(){if(null==this.signature)return eA;let e=function(e,t){let i=hv(e,t),r=h_(i);switch(i){case"trusted":return{icon:r,text:"Signed & Verified",description:"Trusted",detail:"Signature is valid and the signer is trusted"};case"untrusted":return{icon:r,text:"Invalid Signature",description:"Untrusted",detail:"Signature does not match the commit contents — this commit may have been tampered with"};case"unknown":switch(e.status){case"good":return{icon:r,text:"Signed",description:"Unverified Signer",detail:"Signature is valid, but the signer is not in your trusted keys"};case"expired":return{icon:r,text:"Signed",description:"Expired",detail:"Signature was made with an expired key and cannot be verified"};case"revoked":return{icon:r,text:"Signed",description:"Revoked",detail:"Signature was made with a revoked key and should not be trusted"};case"error":if(e.errorMessage&&hb.test(e.errorMessage))return{icon:r,text:"Signed",description:"Missing Key",detail:"Signature cannot be verified because the public key is not available"};return{icon:r,text:"Signed",description:"Failed",detail:e.errorMessage?`Signature verification failed: ${e.errorMessage}`:"Signature verification failed"};default:return{icon:r,text:"Signed",description:"Unverified",detail:e.errorMessage??"Signature could not be verified"}}}}(this.signature,this.committerEmail);return eC`
			<div class="signature-details">
				<div class="signature-status">
					<gl-signature-badge
						.signature=${this.signature}
						.committerEmail=${this.committerEmail}
					></gl-signature-badge>
					<div class="signature-status-text">
						<div class="signature-status-message">
							${e.text}${e.description?eC`<span class="signature-status-description">${e.description}</span>`:eA}
						</div>
						${e.detail?eC`<div class="signature-status-detail">${e.detail}</div>`:eA}
						${this.renderKeyLine()}
					</div>
				</div>
			</div>
		`}};hE.styles=F`
		:host {
			display: block;
		}

		.signature-details {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.signature-status {
			display: flex;
			gap: 0.5rem;
			align-items: flex-start;
		}

		.signature-status gl-signature-badge {
			flex-shrink: 0;
		}

		.signature-status-text {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			flex: 1;
			font-weight: 400;
		}

		.signature-status-message {
			color: var(--vscode-foreground);
		}

		.signature-status-description {
			color: var(--vscode-descriptionForeground);
			margin-left: 0.8rem;
			text-transform: lowercase;
			font-variant: small-caps;
		}

		.signature-status-detail {
			color: var(--vscode-descriptionForeground);
		}

		.signature-key {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			color: var(--vscode-descriptionForeground);
			font-size: 0.9em;
		}

		.signature-key-label {
			flex-shrink: 0;
		}

		.signature-key-value {
			word-break: break-all;
			overflow-wrap: break-word;
		}

		gl-copy-container {
			margin-left: auto;
			flex-shrink: 0;
		}

		gl-copy-container code-icon {
			color: var(--vscode-descriptionForeground);
		}

		gl-copy-container:hover code-icon {
			color: var(--vscode-foreground);
		}
	`,hS([eB({type:String})],hE.prototype,"committerEmail",2),hS([eB({type:Object})],hE.prototype,"signature",2),hE=hS([eD("gl-signature-details")],hE);var hA=Object.defineProperty,hP=Object.getOwnPropertyDescriptor,hz=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hP(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hA(t,i,s),s};let hR=class extends lit_element_i{constructor(){super(...arguments),this.avatarUrl="https://www.gravatar.com/avatar/?s=64&d=robohash",this.name="",this.showAvatar=!1,this.showSignature=!0,this.dateStyle="relative"}formatDateLabel(e){return"relative"===this.dateStyle?eZ(e):eY(e,this.dateFormat??"MMMM Do, YYYY h:mma")}formatDateFull(e){return eY(e,this.dateFormat??"MMMM Do, YYYY h:mma")}get hasDistinctCommitter(){let e=this.authorName??this.name;return null!=this.committerName&&this.committerName!==e||null!=this.committerEmail&&this.committerEmail?.toLowerCase()!==this.email?.toLowerCase()}renderAvatar(){return this.showAvatar&&this.avatarUrl?.length?this.hasDistinctCommitter?eC`<span class="avatar-with-overlay">
					<img class="thumb" src="${this.avatarUrl}" alt="${this.name}" />
					${this.committerAvatarUrl?.length?eC`<img
								class="thumb-overlay"
								src="${this.committerAvatarUrl}"
								alt="${this.committerName??""}"
							/>`:eC`<code-icon
								class="thumb-overlay thumb-overlay--icon"
								icon="person"
								size="10"
							></code-icon>`}
				</span>`:eC`<img class="thumb" src="${this.avatarUrl}" alt="${this.name}" />`:eC`<code-icon icon="person" size="18"></code-icon>`}renderSignatureBadge(){return null!=this.signature&&this.showSignature?eC`<gl-signature-badge
			.signature=${this.signature}
			.committerEmail=${this.committerEmail}
		></gl-signature-badge>`:eA}renderPopoverContent(){let e=null!=this.authorDate||null!=this.committerDate,t=null!=this.authorDate&&null!=this.committerDate&&3e4>Math.abs(this.authorDate.getTime()-this.committerDate.getTime()),i=null!=this.signature&&this.showSignature;return eC`
			<div class="popover-content">
				<div class="author-info">
					${this.avatarUrl?.length?eC`<img class="author-avatar" src="${this.avatarUrl}" alt="${this.name}" />`:eA}
					<div class="author-details">
						<div class="author-name-text">${this.name}</div>
						${this.email?eC`<span class="author-email"><a href="mailto:${this.email}">${this.email}</a></span>`:eA}
					</div>
				</div>
				${this.hasDistinctCommitter?eC`<div class="author-info">
							${this.committerAvatarUrl?.length?eC`<img
										class="author-avatar"
										src="${this.committerAvatarUrl}"
										alt="${this.committerName}"
									/>`:eA}
							<div class="author-details">
								<div class="author-name-text">
									${this.committerName}
									<span class="committer-label">(committer)</span>
								</div>
								${this.committerEmail?eC`<span class="author-email"
											><a href="mailto:${this.committerEmail}">${this.committerEmail}</a></span
										>`:eA}
							</div>
						</div>`:eA}
				${i?eC`<gl-signature-details
							.signature=${this.signature}
							.committerEmail=${this.committerEmail}
						></gl-signature-details>`:eA}
				${e?eC`<div class="popover-dates">
							${t?eC`<span class="popover-date"
										>${eZ(this.committerDate)}
										(${this.formatDateFull(this.committerDate)})</span
									>`:eC`${this.authorDate?eC`<span class="popover-date"
												>Authored ${eZ(this.authorDate)}
												(${this.formatDateFull(this.authorDate)})</span
											>`:eA}
									${this.committerDate?eC`<span class="popover-date"
												>Committed ${eZ(this.committerDate)}
												(${this.formatDateFull(this.committerDate)})</span
											>`:eA}`}
						</div>`:eA}
			</div>
		`}render(){let e=this.authorDate?this.formatDateLabel(this.authorDate):void 0;return eC`
			<gl-popover hoist placement="bottom" trigger="hover click focus">
				<span slot="anchor" class="author" tabindex="0"
					><span class="avatar">${this.renderAvatar()}</span>${"stacked"===this.layout?eC`<span class="name-group"
								><span class="name">${this.name}${this.renderSignatureBadge()}</span>${e?eC`<span class="date">${e}</span>`:eA}</span
							>`:eC`<span class="name">${this.name}</span>${this.renderSignatureBadge()}`}</span
				>
				<div slot="content">${this.renderPopoverContent()}</div>
			</gl-popover>
		`}};hR.styles=F`
		:host {
			display: contents;
		}

		* {
			box-sizing: border-box;
		}

		.author {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0 0.6rem;
			border-radius: 0.3rem;
			cursor: pointer;

			&:focus {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: 2px;
			}
		}

		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}

		.author-hover {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.6rem;
			margin: 0.6rem 0.2rem 0.2rem 0.2rem;
		}

		.author-hover img {
			max-width: 64px;
		}

		.avatar {
			width: var(--gl-avatar-size, 1.8rem);
		}

		.thumb {
			width: 100%;
			height: auto;
			vertical-align: middle;
			border-radius: 0.4rem;
		}

		.name {
			flex: 1;
			font-size: 1.3rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.date {
			font-size: 1.1rem;
			color: var(--vscode-descriptionForeground, var(--color-foreground--50));
			line-height: 1.4;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		:host([layout='stacked']) {
			display: inline-flex;
		}

		:host([layout='stacked']) .author {
			flex-wrap: wrap;
		}

		:host([layout='stacked']) .name-group {
			display: flex;
			flex-direction: column;
			flex: 1;
			min-width: 0;
			gap: 0.1rem;
		}

		gl-signature-badge {
			margin-left: 0.4rem;
			vertical-align: middle;
		}

		.popover-content {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		.author-info {
			display: flex;
			gap: 0.625rem;
			align-items: center;
		}

		.author-avatar {
			width: 32px;
			height: 32px;
			border-radius: 8px;
			flex-shrink: 0;
		}

		.author-details {
			display: flex;
			flex-direction: column;
			gap: 0;
			min-width: 0;
			flex: 1;
			line-height: normal;
		}

		.author-name-text {
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: var(--vscode-foreground);
		}

		.author-email {
			font-weight: 400;
			color: var(--vscode-descriptionForeground);

			a {
				display: inline-block;
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				vertical-align: bottom;
			}

			a:focus {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: 2px;
			}
		}

		.popover-dates {
			display: flex;
			flex-direction: column;
			gap: 0;
			font-size: 1.15rem;
			color: var(--vscode-descriptionForeground);
		}

		.popover-date {
			white-space: nowrap;
		}

		.avatar-with-overlay {
			position: relative;
			display: inline-block;
			width: var(--gl-avatar-size, 1.8rem);
			height: var(--gl-avatar-size, 1.8rem);
		}

		.avatar-with-overlay .thumb {
			width: 100%;
			height: 100%;
		}

		.thumb-overlay {
			position: absolute;
			bottom: -2px;
			right: -2px;
			width: 45%;
			height: 45%;
			border-radius: 50%;
			border: 1.5px solid var(--vscode-sideBar-background, var(--color-background));
			object-fit: cover;
		}

		.thumb-overlay--icon {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--vscode-sideBar-background, var(--color-background));
			color: var(--vscode-descriptionForeground);
		}

		.committer-label {
			font-weight: 400;
			color: var(--vscode-descriptionForeground);
			font-size: 0.9em;
		}
	`,hz([eB()],hR.prototype,"avatarUrl",2),hz([eB()],hR.prototype,"committerEmail",2),hz([eB()],hR.prototype,"committerAvatarUrl",2),hz([eB()],hR.prototype,"committerName",2),hz([eB()],hR.prototype,"email",2),hz([eB()],hR.prototype,"name",2),hz([eB({attribute:"author-name"})],hR.prototype,"authorName",2),hz([eB({type:Boolean,attribute:"show-avatar",reflect:!0})],hR.prototype,"showAvatar",2),hz([eB({type:Boolean,attribute:"show-signature",reflect:!0})],hR.prototype,"showSignature",2),hz([eB({type:Object})],hR.prototype,"signature",2),hz([eB({reflect:!0})],hR.prototype,"layout",2),hz([eB({converter:cK()})],hR.prototype,"authorDate",2),hz([eB({converter:cK()})],hR.prototype,"committerDate",2),hz([eB()],hR.prototype,"dateFormat",2),hz([eB()],hR.prototype,"dateStyle",2),hR=hz([eD("gl-commit-author")],hR);var hI=Object.defineProperty,hT=Object.getOwnPropertyDescriptor,hM=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hT(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hI(t,i,s),s};let hj=F`
	:host {
		display: inline-flex;
		align-items: baseline;
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-inline-end: 0.2rem;
	}

	:host(:focus) {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: 2px;
	}

	.label--uncommitted {
		cursor: default;
	}

	.icon {
		margin-right: 0.3rem;
		align-self: center;
	}
`,hO=class extends lit_element_i{constructor(){super(...arguments),this.icon="git-commit",this.size=12}get label(){return n_(this.sha,{strings:{uncommitted:"Working",uncommittedStaged:"Staged",working:"Working"}})}render(){return null==this.sha?eA:!this.sha||nv(this.sha)?eC`<span part="label" class="label--uncommitted">${this.label}</span>`:eC`<code-icon part="icon" class="icon" icon="${this.icon}" size="${this.size}"></code-icon
			><span part="label">${this.label}</span>`}};hO.styles=hj,hM([eB({type:String})],hO.prototype,"sha",2),hM([eB({type:String})],hO.prototype,"icon",2),hM([eB({type:Number})],hO.prototype,"size",2),hO=hM([eD("gl-commit-sha")],hO);let hD=class extends lit_element_i{constructor(){super(...arguments),this.icon="git-commit",this.size=12,this.copyLabel="Copy",this.copiedLabel="Copied!",this.tooltipPlacement="top"}render(){return null==this.sha?eA:eC`<gl-copy-container
			.content=${this.sha}
			placement="${this.tooltipPlacement}"
			.copyLabel=${this.copyLabel}
			.copiedLabel=${this.copiedLabel}
			.appearance=${this.appearance}
		>
			<gl-commit-sha
				exportparts="icon, label"
				.sha=${this.sha}
				.icon=${this.icon}
				.size=${this.size}
			></gl-commit-sha>
		</gl-copy-container>`}};hD.styles=[hj,F`
			:host(:focus) {
				outline: none;
			}
		`],hM([eB({type:String})],hD.prototype,"sha",2),hM([eB({type:String})],hD.prototype,"icon",2),hM([eB({type:Number})],hD.prototype,"size",2),hM([eB({reflect:!0})],hD.prototype,"appearance",2),hM([eB({type:String,attribute:"copy-label"})],hD.prototype,"copyLabel",2),hM([eB({type:String,attribute:"copied-label"})],hD.prototype,"copiedLabel",2),hM([eB({type:String,attribute:"tooltip-placement"})],hD.prototype,"tooltipPlacement",2),hD=hM([eD("gl-commit-sha-copy")],hD);var hL=Object.defineProperty,hB=Object.getOwnPropertyDescriptor;let hF=class extends lit_element_i{render(){return eC`<slot></slot>`}};hF.styles=F`
		:host {
			display: flex;
			box-sizing: border-box;
			flex-direction: column;
		}

		::slotted(webview-pane) {
			flex: none;
		}

		:host([flexible]) ::slotted(webview-pane[flexible][expanded]) {
			flex: 1;
		}
	`,hF=((e,t,i,r)=>{for(var o,s=r>1?void 0:r?hB(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hL(t,i,s),s})([eD("webview-pane-group")],hF);let hN=F`
	:host {
		display: grid;
		grid-template-columns:
			var(
				--gl-split-panel-start-size,
				min(var(--_start-size, 0%), calc(100% - var(--gl-split-panel-divider-width, 4px)))
			)
			var(--gl-split-panel-divider-width, 4px) 1fr;
		grid-template-rows: 1fr;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	:host([orientation='vertical']) {
		grid-template-columns: 1fr;
		grid-template-rows:
			var(
				--gl-split-panel-start-size,
				min(var(--_start-size, 0%), calc(100% - var(--gl-split-panel-divider-width, 4px)))
			)
			var(--gl-split-panel-divider-width, 4px) 1fr;
	}

	:host([dragging]) {
		user-select: none;
	}

	/*
	 * min-width / min-height must be 0 on the slotted grid items themselves.
	 * Grid items default to min-*: auto (intrinsic content size), which prevents
	 * them from shrinking in a single frame when the container narrows — causing
	 * visible multi-frame "catch-up" jank during parent panel resizes. Targeting
	 * the <slot> elements directly doesn't work because slots default to
	 * display: contents and have no box.
	 */
	::slotted(*) {
		height: 100%;
		min-width: 0;
		min-height: 0;
	}

	.divider {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		cursor: ew-resize;
		touch-action: none;
		background-color: transparent;
		transition: background-color 0.1s ease-out;
		z-index: 1;
	}

	:host([orientation='vertical']) .divider {
		cursor: ns-resize;
	}

	.divider:focus {
		outline: none;
	}

	.divider:focus-visible {
		background-color: var(--vscode-focusBorder);
	}

	.divider:hover {
		transition-delay: 0.2s;
		background-color: var(--vscode-sash-hoverBorder, var(--vscode-focusBorder));
	}

	:host([dragging]) .divider,
	.divider:active {
		background-color: var(--vscode-sash-hoverBorder, var(--vscode-focusBorder));
	}

	/* Invisible hit area extending beyond the divider for easier grabbing */
	.divider::after {
		display: block;
		content: '';
		position: absolute;
		height: 100%;
		left: calc(var(--gl-split-panel-divider-hit-area, 8px) / -2 + var(--gl-split-panel-divider-width, 4px) / 2);
		width: var(--gl-split-panel-divider-hit-area, 8px);
	}

	:host([orientation='vertical']) .divider::after {
		width: 100%;
		height: var(--gl-split-panel-divider-hit-area, 8px);
		left: 0;
		top: calc(var(--gl-split-panel-divider-hit-area, 8px) / -2 + var(--gl-split-panel-divider-width, 4px) / 2);
	}

	@media (forced-colors: active) {
		.divider {
			outline: solid 1px transparent;
		}
	}

	/*
	 * Overlay mode — start panel floats over the end panel instead of redistributing space.
	 * Drag/snap/percentage math is unchanged; only the layout switches from grid to absolute
	 * positioning. The end panel always fills the container; the start panel is sized via the
	 * same --_start-size custom property the grid track would have used.
	 */
	:host([mode='overlay']) {
		display: block;
		position: relative;
		grid-template-columns: unset;
		grid-template-rows: unset;
	}

	:host([mode='overlay']) ::slotted([slot='start']) {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: var(--_start-size, 0%);
		max-width: 100%;
		z-index: 2;
		box-shadow: 0 0 0.5rem var(--vscode-widget-shadow, rgba(0, 0, 0, 0.36));
		transition: width 0.08s ease-out;
	}

	:host([mode='overlay'][dragging]) ::slotted([slot='start']) {
		transition: none;
	}

	:host([mode='overlay']) ::slotted([slot='end']) {
		position: absolute;
		inset: 0;
		width: 100%;
	}

	:host([mode='overlay']) .divider {
		position: absolute;
		/* Sit flush against the panel's right edge — not centered on the boundary like split
		   mode — so the visible divider stays entirely outside the floating panel.
		   The ::after hit area still extends 2px into the panel, keeping it grabbable. */
		left: var(--_start-size, 0%);
		top: 0;
		bottom: 0;
		width: var(--gl-split-panel-divider-width, 4px);
		height: auto;
		z-index: 3;
		transition:
			background-color 0.1s ease-out,
			left 0.08s ease-out;
	}

	:host([mode='overlay'][dragging]) .divider {
		transition: none;
	}
`;var hq=Object.defineProperty,hU=Object.getOwnPropertyDescriptor,hW=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hU(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hq(t,i,s),s};let hH=class extends lit_element_i{constructor(){super(...arguments),this._size=0,this._position=0,this._positionBeforeCollapse=0,this._cachedPrimaryPx=0,this._lastPointerDownTime=0,this.orientation="horizontal",this.mode="split",this.disabled=!1}get position(){return this._position}set position(e){let t=this._position;this._position=hV(e),this.updateCachedPrimaryPx(),void 0!==this._closedState&&this.emitClosedIfChanged(),this.requestUpdate("position",t)}get isHorizontal(){return"vertical"!==this.orientation}updateCachedPrimaryPx(){this._size<=0||("end"===this.primary?this._cachedPrimaryPx=(100-this._position)/100*this._size:this._cachedPrimaryPx=this._position/100*this._size)}connectedCallback(){super.connectedCallback?.(),this._resizeObserver=new ResizeObserver(e=>{let t=e[0].contentRect,i=Math.round(this.isHorizontal?t.width:t.height);if(i!==this._size){let e=this._position;this._size=i,this.primary&&this._cachedPrimaryPx>0&&("end"===this.primary?this._position=hV(100-this._cachedPrimaryPx/i*100):this._position=hV(this._cachedPrimaryPx/i*100),this._position=this.applySnap(this._position)),this._position!==e&&this.emitChange(),this.requestUpdate()}}),this.updateComplete.then(()=>{this._resizeObserver.observe(this);let e=this.getBoundingClientRect();this._size=Math.round(this.isHorizontal?e.width:e.height),this._closedState=null!=this.primary&&this.computeClosed(this._position);let t=this.applySnap(this._position);t!==this._position&&(this._position=t,this.emitChange()),this.updateCachedPrimaryPx(),this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback?.(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._dragAc?.abort(),this._dragAc=void 0}willUpdate(){this.style.setProperty("--_start-size",`${this._position}%`)}render(){return eC`
			<slot name="start" part="start" class="start"></slot>

			<div
				part="divider"
				class="divider"
				tabindex=${this.disabled?-1:0}
				role="separator"
				aria-orientation=${this.orientation}
				aria-valuenow=${Math.max(0,Math.min(100,Math.round(this._position)))}
				aria-valuemin="0"
				aria-valuemax="100"
				aria-label="Resize"
				@keydown=${this.handleKeyDown}
				@pointerdown=${this.handlePointerDown}
			>
				<slot name="divider"></slot>
			</div>

			<slot name="end" part="end" class="end"></slot>
		`}applySnap(e){return this.snap?this.snap({pos:e,size:this._size}):e}emitChange(){this.dispatchEvent(new CustomEvent("gl-split-panel-change",{detail:{position:this._position}})),this.emitClosedIfChanged()}computeClosed(e){return null!=this.primary&&("end"===this.primary?e>=100:e<=0)}emitClosedIfChanged(){if(null==this.primary)return;let e=this.computeClosed(this._position);this._closedState!==e&&(this._closedState=e,this.dispatchEvent(new CustomEvent("gl-split-panel-closed-change",{detail:{closed:e,position:this._position}})))}handlePointerDown(e){if(this.disabled||0!==e.button)return;e.preventDefault();let t=e.timeStamp;if(t-this._lastPointerDownTime<400){this._lastPointerDownTime=0,this.dispatchEvent(new CustomEvent("gl-split-panel-dblclick",{bubbles:!0,composed:!0}));return}this._lastPointerDownTime=t;let i=this.isHorizontal,r=this.getBoundingClientRect(),o=i?e.clientX-r.left:e.clientY-r.top,s=this.dividerEl.getBoundingClientRect(),a=hV((i?s.left-r.left+s.width/2:s.top-r.top+s.height/2)/this._size*100);Math.abs(a-this._position)>1&&(this._position=a,this.updateCachedPrimaryPx(),this.style.setProperty("--_start-size",`${this._position}%`)),this.toggleAttribute("dragging",!0),this.dividerEl.setPointerCapture(e.pointerId),this._dragAc?.abort();let c=new AbortController;this._dragAc=c;let h=o-this._position/100*this._size,p=e=>{if(this._size<=0)return;let t=this.getBoundingClientRect(),r=((i?e.clientX-t.left:e.clientY-t.top)-h)/this._size*100;this.position=this.applySnap(r),this.emitChange()},u=()=>{this.toggleAttribute("dragging",!1),c.abort(),this._dragAc=void 0,this.dispatchEvent(new CustomEvent("gl-split-panel-drag-end",{detail:{position:this._position},bubbles:!0,composed:!0}))};this.dividerEl.addEventListener("pointermove",p,{passive:!0,signal:c.signal}),this.dividerEl.addEventListener("lostpointercapture",u,{signal:c.signal})}handleKeyDown(e){if(this.disabled)return;let t=e.shiftKey?10:1,i=this._position,r=!0,o=this.isHorizontal;switch(e.key){case"ArrowLeft":o?i-=t:r=!1;break;case"ArrowRight":o?i+=t:r=!1;break;case"ArrowUp":o?r=!1:i-=t;break;case"ArrowDown":o?r=!1:i+=t;break;case"Home":i=0;break;case"End":i=100;break;case"Enter":"end"===this.primary?this._position>=100&&this._positionBeforeCollapse<100?i=this._positionBeforeCollapse:(this._positionBeforeCollapse=this._position,i=100):this._position<=0&&this._positionBeforeCollapse>0?i=this._positionBeforeCollapse:(this._positionBeforeCollapse=this._position,i=0);break;default:r=!1}r&&(e.preventDefault(),this.position=this.applySnap(i),this.emitChange())}};function hV(e){return Math.max(0,Math.min(100,e))}hH.styles=hN,hW([eB({type:Number,reflect:!0})],hH.prototype,"position",1),hW([eB({reflect:!0})],hH.prototype,"orientation",2),hW([eB({attribute:!1})],hH.prototype,"snap",2),hW([eB({reflect:!0})],hH.prototype,"primary",2),hW([eB({reflect:!0})],hH.prototype,"mode",2),hW([eB({type:Boolean,reflect:!0})],hH.prototype,"disabled",2),hW([eq(".divider")],hH.prototype,"dividerEl",2),hH=hW([eD("gl-split-panel")],hH);var hK=Object.defineProperty,hG=Object.getOwnPropertyDescriptor,hZ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hG(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hK(t,i,s),s};try{CSS.registerProperty({name:"--angle",syntax:"<angle>",inherits:!1,initialValue:"0deg"})}catch{}let hY=class extends lit_element_i{constructor(){super(...arguments),this.busy=!1,this.disabled=!1,this.placeholder="Optional guidance for the AI explanation...",this.buttonLabel="Explain",this.busyLabel="Explaining changes…",this.eventName="gl-explain",this.multiline=!1,this.active=!1,this.rows=1,this.onFooterSlotChange=e=>{let t=e.target.assignedElements({flatten:!0}).length>0;this.toggleAttribute("has-footer",t)}}render(){let e=this.rows>1?`${1.4*this.rows}em`:void 0,t=null!=e?`min-height: ${e}`:void 0,i=this.multiline?eC`<textarea
					part="input"
					rows=${this.rows}
					style=${t??eA}
					aria-label=${this.placeholder}
					placeholder=${this.busy?this.busyLabel:this.placeholder}
					?disabled=${this.disabled||this.busy}
					@input=${this.onInput}
					@focus=${this.onFocusChange}
					@blur=${this.onFocusChange}
					@keydown=${this.onKeydown}
				></textarea>`:eC`<input
					type="search"
					part="input"
					size="1"
					aria-label=${this.placeholder}
					placeholder=${this.busy?this.busyLabel:this.placeholder}
					?disabled=${this.disabled||this.busy}
					@input=${this.onInput}
					@focus=${this.onFocusChange}
					@blur=${this.onFocusChange}
					@keydown=${this.onKeydown}
				/>`;return eC`<div class="ai-input__row">
				${i}<button
					class="action-btn"
					part="button"
					title=${this.buttonLabel}
					aria-busy=${this.busy?"true":eA}
					?disabled=${this.disabled||this.busy}
					@click=${this.onSubmit}
				>
					${this.busy?eC`<code-icon icon="loading" modifier="spin"></code-icon>`:eC`<span class="icon-slider"
								><code-icon class="icon-sparkle" icon="sparkle"></code-icon
								><code-icon class="icon-send" icon="send"></code-icon
							></span>`}
					<span class="action-label">${this.buttonLabel}</span>
				</button>
			</div>
			<div class="ai-input__footer" part="footer">
				<slot name="footer" @slotchange=${this.onFooterSlotChange}></slot>
			</div>`}get inputEl(){return this.shadowRoot?.querySelector("input, textarea")}onInput(){this.toggleAttribute("has-value",!!this.inputEl?.value)}onFocusChange(){let e=this.inputEl===this.shadowRoot?.activeElement,t=this.hasAttribute("focused");this.toggleAttribute("focused",e),!e||t||this.busy?e||this.removeAttribute("focusing"):this.toggleAttribute("focusing",!0)}onKeydown(e){"Enter"===e.key&&(e.shiftKey||(e.preventDefault(),this.onSubmit()))}onSubmit(){if(this.disabled||this.busy)return;let e=this.inputEl?.value?.trim()||void 0;this.dispatchEvent(new CustomEvent(this.eventName,{detail:{prompt:e},bubbles:!0,composed:!0}))}};hY.styles=F`
		:host {
			--gradient-start: #7c3aed;
			--gradient-mid: #0ea5e9;
			--gradient-end: #06b6d4;

			position: relative;
			display: flex;
			flex-direction: column;
			flex: none;
		}

		/* The textarea/input + action button row. Owns the pill border + gradient treatment
		   so the footer can sit as its own "attached" band below without being wrapped by it. */
		.ai-input__row {
			display: flex;
			align-items: stretch;
			min-width: 0;
			background: var(--vscode-input-background);
			border: 1px solid var(--vscode-input-border);
			border-radius: 0.6rem;
			z-index: 1;
			transition:
				border-color 0.3s,
				box-shadow 0.3s,
				background 0.3s;
		}

		/* Footer area — only visible when the consumer slots content (e.g. the model chip).
		   The has-footer host attribute is toggled by slotchange so an empty slot doesn't
		   render an empty bordered band. Rendered as its own bordered pill sitting just below
		   the input — visually attached but clearly distinct from the input pill. */
		.ai-input__footer {
			display: none;
			align-items: center;
			justify-content: flex-start;
			gap: 0.4rem;
			margin-top: -0.3rem;
			padding: 0.5rem 0.4rem 0.2rem 0.4rem;
			min-height: 0px;
			background: var(--vscode-input-background);
			border-bottom: 1px solid var(--vscode-input-border);
			border-right: 1px solid var(--vscode-input-border);
			border-left: 1px solid var(--vscode-input-border);
			border-radius: 0 0 0.6rem 0.6rem;
			color: var(--vscode-descriptionForeground);
		}

		:host([has-footer]) .ai-input__footer {
			display: flex;
		}

		/* Focus / Active: gradient border glow */
		:host([focused]) .ai-input__row,
		:host([active]) .ai-input__row {
			border-color: transparent;
			background:
				linear-gradient(var(--vscode-input-background), var(--vscode-input-background)) padding-box,
				linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end)) border-box;
			box-shadow: 0 0 8px rgba(124 58 237 / 25%);
		}

		:host([focused]) .action-btn,
		:host([active]) .action-btn {
			border-right-color: var(--gradient-end);
		}

		/* Focus-in: same spinning conic gradient as busy, one rotation */
		:host([focusing]) .ai-input__row {
			border-color: transparent;
			background:
				linear-gradient(var(--vscode-input-background), var(--vscode-input-background)) padding-box,
				conic-gradient(
						from var(--angle, 0deg),
						var(--gradient-start),
						var(--gradient-mid),
						var(--gradient-end),
						var(--gradient-start)
					)
					border-box;
			transition: none;
			animation: ai-spin 2s linear 1;
		}

		/* Busy: spinning conic gradient border */
		:host([busy]) .ai-input__row {
			border-color: transparent;
			background:
				linear-gradient(var(--vscode-input-background), var(--vscode-input-background)) padding-box,
				conic-gradient(
						from var(--angle, 0deg),
						var(--gradient-start),
						var(--gradient-mid),
						var(--gradient-end),
						var(--gradient-start)
					)
					border-box;
			animation: ai-spin 2s linear infinite;
		}

		@keyframes ai-spin {
			to {
				--angle: 360deg;
			}
		}

		input,
		textarea {
			flex: 1;
			width: 0;
			min-width: 0;
			max-width: none;
			margin: 0;
			padding: 0.4rem 0.7rem;
			font-size: var(--vscode-font-size);
			font-family: var(--vscode-font-family);
			color: var(--vscode-input-foreground);
			background: transparent;
			border: none;
			outline: none;
		}

		textarea {
			resize: none;
			field-sizing: content;
			/* Min-height is overridden inline via the rows property so callers can request a
			   2-row default without affecting the explain inputs that want a single row. */
			min-height: 1.4em;
			max-height: 6em;
			line-height: 1.4;
			scrollbar-width: thin;
			scrollbar-color: var(--vscode-scrollbarSlider-background) transparent;
		}

		textarea::-webkit-scrollbar {
			width: 6px;
		}

		textarea::-webkit-scrollbar-thumb {
			background-color: var(--vscode-scrollbarSlider-background);
			border-radius: 3px;
		}

		textarea::-webkit-scrollbar-thumb:hover {
			background-color: var(--vscode-scrollbarSlider-hoverBackground);
		}

		textarea::-webkit-scrollbar-track {
			background: transparent;
		}

		textarea::placeholder {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		input::placeholder,
		textarea::placeholder {
			color: var(--vscode-input-placeholderForeground);
		}

		input::-webkit-search-cancel-button {
			-webkit-appearance: none;
			cursor: pointer;
			width: 16px;
			height: 16px;
			background-color: var(--vscode-foreground);
			-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z'/%3E%3C/svg%3E");
			-webkit-mask-size: contain;
		}

		.action-btn {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.3rem 1rem 0.3rem 0.8rem;
			border: none;
			cursor: pointer;
			align-self: stretch;
			flex: none;
			font-size: var(--vscode-font-size);
			font-weight: 500;
			font-family: inherit;
			white-space: nowrap;
			background: transparent;
			color: var(--vscode-foreground);
			border-radius: 0 0.6rem 0.6rem 0;
			border-right: 1px solid transparent;
			margin-right: -1px;
			transition:
				background 0.25s,
				color 0.25s,
				border-color 0.25s,
				flex-direction 0.3s;
			z-index: 1;
		}

		.action-btn:hover:not(:disabled) {
			background: var(--vscode-button-background);
			color: var(--vscode-button-foreground);
		}

		.action-btn:hover:not(:disabled) .icon-sparkle {
			color: var(--vscode-button-foreground);
		}

		.action-btn:disabled {
			opacity: 0.6;
			cursor: default;
			pointer-events: none;
		}

		.action-btn[aria-busy='true'] {
			background: var(--vscode-button-background);
			color: var(--vscode-button-foreground);
		}

		/* Send mode: when input is focused or has text */
		input:focus ~ .action-btn,
		input:not(:placeholder-shown) ~ .action-btn,
		textarea:focus ~ .action-btn,
		textarea:not(:placeholder-shown) ~ .action-btn {
			padding-right: 0.8rem;
			padding-left: 1rem;
			flex-direction: row-reverse;
			gap: 0.5rem;
			background: var(--vscode-button-background);
			color: var(--vscode-button-foreground);
		}

		/* Active mode: border glow + button always active (for review/compose) */
		:host([active]) .action-btn {
			background: var(--vscode-button-background);
			color: var(--vscode-button-foreground);
		}

		input:focus ~ .action-btn .icon-sparkle,
		input:not(:placeholder-shown) ~ .action-btn .icon-sparkle,
		textarea:focus ~ .action-btn .icon-sparkle,
		textarea:not(:placeholder-shown) ~ .action-btn .icon-sparkle {
			transform: translateX(-100%);
			opacity: 0;
		}

		input:focus ~ .action-btn .icon-send,
		input:not(:placeholder-shown) ~ .action-btn .icon-send,
		textarea:focus ~ .action-btn .icon-send,
		textarea:not(:placeholder-shown) ~ .action-btn .icon-send {
			transform: translateX(0);
			opacity: 1;
		}

		.icon-slider {
			position: relative;
			width: 16px;
			height: 16px;
			overflow: hidden;
			flex-shrink: 0;
		}

		.icon-sparkle,
		.icon-send {
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			transition:
				transform 0.3s ease,
				opacity 0.3s ease;
		}

		.icon-sparkle {
			transform: translateX(0);
			opacity: 1;
			color: #c594ff;
		}

		.icon-send {
			transform: translateX(100%);
			opacity: 0;
		}

		.action-label {
			line-height: 1;
		}
	`,hZ([eB({type:Boolean,reflect:!0})],hY.prototype,"busy",2),hZ([eB({type:Boolean})],hY.prototype,"disabled",2),hZ([eB()],hY.prototype,"placeholder",2),hZ([eB({attribute:"button-label"})],hY.prototype,"buttonLabel",2),hZ([eB({attribute:"busy-label"})],hY.prototype,"busyLabel",2),hZ([eB({attribute:"event-name"})],hY.prototype,"eventName",2),hZ([eB({type:Boolean,reflect:!0})],hY.prototype,"multiline",2),hZ([eB({type:Boolean,reflect:!0})],hY.prototype,"active",2),hZ([eB({type:Number})],hY.prototype,"rows",2),hY=hZ([eD("gl-ai-input")],hY);let hX=F`
	.mode-toggle--active {
		background: var(--vscode-focusBorder) !important;
		color: #fff !important;
		border-radius: 0.4rem;
	}

	.mode-toggle--active:hover {
		background: color-mix(in srgb, var(--vscode-focusBorder) 85%, #fff) !important;
	}
`,hJ=F`
	.mode-header {
		background-color: var(--mode-header-bg);
		border-top: 2px solid transparent;
		/* Exit transition (class removed): fast fade back to base */
		transition:
			background-color 0.1s ease-out,
			border-color 0.1s ease-out;
	}

	.mode-header--active {
		border-top-color: var(--vscode-focusBorder);
		background-color: color-mix(
			in srgb,
			var(--vscode-focusBorder) var(--mode-header-tint, 35%),
			var(--mode-header-bg, var(--titlebar-bg, var(--vscode-sideBar-background, var(--color-background))))
		);
		/* Enter transition (class added): slightly slower fade to tinted */
		transition:
			background-color 0.15s ease-in,
			border-color 0.15s ease-in;
	}
`,hQ=F`
	:host {
		display: contents;
	}

	.details-header {
		display: flex;
		flex-direction: column;
		flex: none;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.details-header__row {
		display: flex;
		align-items: flex-start;
		padding: 0.7rem 1.2rem 0.5rem 1.2rem;
		gap: 0.6rem;
		container-type: inline-size;
		container-name: gl-action-chip-host;
	}

	.details-header__content {
		flex: 1;
		min-width: 0;
	}

	.details-header__actions {
		display: flex;
		align-items: center;
		gap: 0.2rem;
		flex-shrink: 0;
	}

	/* Mode-toggle label collapse, staggered.
	   The chip's slotted label is a normal child of <gl-action-chip> in this template,
	   so we target it via descendant selectors. Hiding the slotted span with display:none
	   cleanly removes the flex item and its surrounding gap inside the chip — yielding
	   a true icon-only state instead of clipped/ellipsed text. The active chip is exempt
	   so the selected mode keeps its label visible. Review yields first, then Compose. */
	@container gl-action-chip-host (max-width: 320px) {
		.mode-toggle--review:not(.mode-toggle--active) .mode-toggle__text {
			display: none;
		}
	}

	@container gl-action-chip-host (max-width: 260px) {
		.mode-toggle--compose:not(.mode-toggle--active) .mode-toggle__text {
			display: none;
		}
	}
`;var h0=Object.defineProperty,h1=Object.getOwnPropertyDescriptor,h2=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?h1(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&h0(t,i,s),s};let h5={compose:{icon:"wand",label:"Compose Changes",closeLabel:"Close Compose Changes",text:"Compose",collapsible:!0},review:{icon:"checklist",label:"Review Changes",closeLabel:"Close Review Changes",text:"Review",collapsible:!0},compare:{icon:"compare-changes",label:"Compare",closeLabel:"Close Compare",text:"Compare",collapsible:!1}},h3=class extends lit_element_i{constructor(){super(...arguments),this.loading=!1}render(){let e=null!=this.activeMode;return eC`<div class="details-header mode-header ${e?"mode-header--active":""}">
			<div class="details-header__row">
				<div class="details-header__content">
					<slot></slot>
				</div>
				<div class="details-header__actions">
					${this.renderModeToggles()}
					<slot name="actions"></slot>
				</div>
			</div>
			<slot name="secondary"></slot>
			<progress-indicator position="bottom" ?active=${this.loading}></progress-indicator>
		</div>`}renderModeToggles(){if(!this.modes?.length)return eA;let e=null!=this.activeMode;return this.modes.map(t=>{let i=this.activeMode===t,r=h5[t],o=i||r.collapsible&&!e;return eC`<gl-action-chip
				icon=${r.icon}
				.activeIcon=${i?"close":void 0}
				label="${i?r.closeLabel:r.label}"
				overlay="tooltip"
				class=${on({"mode-toggle":!0,[`mode-toggle--${t}`]:!0,"mode-toggle--active":i})}
				@click=${()=>this.handleToggleMode(t)}
				>${o?eC`<span class="mode-toggle__text">${r.text}</span>`:eA}</gl-action-chip
			>`})}handleToggleMode(e){this.dispatchEvent(new CustomEvent("toggle-mode",{detail:{mode:e},bubbles:!0,composed:!0}))}};h3.styles=[op,hQ,hJ,hX],h2([eB()],h3.prototype,"activeMode",2),h2([eB({type:Boolean})],h3.prototype,"loading",2),h2([eB({type:Array})],h3.prototype,"modes",2),h3=h2([eD("gl-details-header")],h3);var h4=Object.defineProperty,h6=Object.getOwnPropertyDescriptor,h7=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?h6(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&h4(t,i,s),s};let h8=class extends GlDetailsBase{constructor(){super(...arguments),this.autolinksEnabled=!1,this.hasRemotes=!0,this.explainBusy=!1,this.reachabilityState="idle",this.aiEnabled=!1,this.experimentalFeaturesEnabled=!0,this.compareEnabled=!1,this.loading=!1,this.panelActions=!0,this._reachabilityExpanded=!1,this._modifiers=new ModifierKeysController(this),this._contextMenuProxy=new ContextMenuProxyController(this),this._userAdjustedSplitter=!1,this._commitChanging=!1,this._messagePanelSnap=({pos:e})=>Math.max(5,Math.min(e,60)),this._onMessagePanelChange=e=>{this._messagePanelHeight=e.detail.position},this._onMessagePanelDragEnd=()=>{this._userAdjustedSplitter=!0},this._onDividerDblClick=()=>{this._userAdjustedSplitter=!1,this._messagePanelHeight=void 0;let e=this.renderRoot.querySelector("gl-split-panel");e&&(e.position=25),this.requestUpdate()},this.onMoreActionsClick=e=>{e.preventDefault(),e.stopPropagation();let t=e.currentTarget;if(null==t)return;let i=t.getBoundingClientRect();t.dispatchEvent(new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:i.left,clientY:i.bottom,button:2}))},this.onStashApplyClick=e=>{let t=this.commit;t?.stashNumber!=null&&this.dispatchEvent(new CustomEvent("gl-stash-apply",{detail:{repoPath:t.repoPath,stashItem:{refType:"stash",sha:t.sha,ref:t.sha,repoPath:t.repoPath,name:`stash@{${t.stashNumber}}`,stashNumber:t.stashNumber,message:t.message},deleteAfter:e.altKey||e.shiftKey},bubbles:!0,composed:!0}))}}get isStash(){return this.commit?.stashNumber!=null}get isPopMode(){return this._modifiers.altKey||this._modifiers.shiftKey}disconnectedCallback(){super.disconnectedCallback?.(),this._scrollbarObserver?.disconnect(),this._scrollbarObserver=void 0,this._userAdjustedSplitter=!1,this._messagePanelHeight=void 0}willUpdate(e){if(super.willUpdate?.(e),e.has("commit")){let t=e.get("commit");t?.sha!==this.commit?.sha&&this.loading&&(this._commitChanging=!0)}e.has("loading")&&!this.loading&&(this._commitChanging=!1)}updated(e){e.has("explain")&&(this.explainBusy=!1,this.renderRoot.querySelector('[data-region="commit-explanation"]')?.scrollIntoView()),e.has("commit")&&(this.explainBusy=!1,this._reachabilityExpanded=!1,this.renderRoot.querySelector('[data-region="message"]')?.scrollTo?.(0,0)),this.observeMessageScrollbar()}observeMessageScrollbar(){let e=this.renderRoot.querySelector('[data-region="message"]');if(!e||this._scrollbarObserver)return;let t=()=>{let t=e.scrollHeight>e.clientHeight;e.closest(".message-block")?.toggleAttribute("data-has-scrollbar",t)};this._scrollbarObserver=new ResizeObserver(t),this._scrollbarObserver.observe(e),t()}render(){return null==this.commit?this.panelActions?eA:this.renderEmptyContent():this.renderEmbedded()}renderEmbedded(){if(!this.commit)return eA;let e=null!=this.subPanelContent&&this.subPanelContent!==eA,t=!this.isUncommitted,i=this.isStash?"stash":"commit",r={multiDiff:this.getMultiDiffRefs(),loading:this.loading};return eC`
			${e?eA:this.renderHiddenNotice()} ${this.renderEmbeddedAuthorHeader()}
			${e?eC`${"compare"!==this.activeMode?this.renderEmbeddedMetadataBar():eA}
						<div class="sub-panel-enter">${this.subPanelContent}</div>`:eC`${this.renderEmbeddedMetadataBar()}
					${t?eC`<gl-split-panel
								orientation="vertical"
								primary="start"
								class="split ${this._userAdjustedSplitter?"":"split--auto-size"}"
								position="${this._messagePanelHeight??25}"
								.snap=${this._messagePanelSnap}
								@gl-split-panel-change=${this._onMessagePanelChange}
								@gl-split-panel-drag-end=${this._onMessagePanelDragEnd}
								@gl-split-panel-dblclick=${this._onDividerDblClick}
							>
								<div slot="start" class="msg-slot">${this.renderEmbeddedMessage()}</div>
								<div slot="divider" class="split__handle"></div>
								<div slot="end" class="bottom-section">
									${this.renderEmbeddedAutolinks()} ${this.renderEmbeddedExplainInput()}
									<div class="files">
										<webview-pane-group flexible>
											${this.renderChangedFiles(i,r)}
										</webview-pane-group>
									</div>
								</div>
							</gl-split-panel>`:eC`<div class="files">
								<webview-pane-group flexible>
									${this.renderChangedFiles(i,r)}
								</webview-pane-group>
							</div>`}`}
		`}getMultiDiffRefs(){let e=this.commit;if(e)return{repoPath:e.repoPath,lhs:e.parents[0]??"",rhs:e.sha,title:`Changes in ${e.shortSha}`}}renderEmbeddedAuthorHeader(){var e,t;let i=this.commit;if(!i)return eA;let r=(e=i.author,t=this.preferences?.currentUserNameStyle??"you",e.current?function(e,t){switch(t){case"name":return e;case"nameAndYou":if("You"===e||e.endsWith(" (you)"))return e;return e?`${e} (you)`:"You";default:return"You"}}(e.name,t):e.name),o=eC`<gl-commit-author
			class="author-header__author"
			layout="stacked"
			.avatarUrl="${i.author.avatar??""}"
			.committerEmail="${i.committer.email}"
			.committerAvatarUrl="${i.committer.avatar}"
			.committerName="${i.committer.name}"
			email="${i.author.email}"
			name="${r}"
			author-name="${i.author.name}"
			.authorDate="${i.author.date}"
			.committerDate="${i.committer.date}"
			.dateFormat="${this.preferences?.dateFormat}"
			.dateStyle="${this.preferences?.dateStyle??"relative"}"
			.showAvatar="${this.preferences?.avatars??!0}"
			.showSignature="${this.preferences?.showSignatureBadges??!0}"
			.signature="${this.signature}"
		></gl-commit-author>`;if(!this.panelActions)return eC`<div class="author-header">${o}</div>`;let{isStash:s}=this,a="compare"===this.activeMode?eC`<span class="compare-header__title">Comparing References</span>`:o;return eC`<gl-details-header
			.activeMode=${this.activeMode}
			.loading=${this.loading}
			.modes=${this.computeCommitModes()}
			style="--mode-header-bg: var(--titlebar-bg, var(--vscode-sideBar-background, var(--color-background)))"
		>
			${a}
			${eU(!s&&this.hasRemotes&&null==this.activeMode,()=>eC`<gl-action-chip
						slot="actions"
						icon="globe"
						label="Open Commit on Remote"
						overlay="tooltip"
						@click=${()=>this.dispatchEvent(new CustomEvent("open-on-remote",{detail:{sha:i.sha},bubbles:!0,composed:!0}))}
					></gl-action-chip>`)}
		</gl-details-header>`}computeCommitModes(){let e=[];return this.aiEnabled&&this.experimentalFeaturesEnabled&&e.push("review"),this.compareEnabled&&e.push("compare"),e}renderEmbeddedMetadataBar(){let e=this.commit;if(!e)return eA;let{isStash:t}=this;return eC`<div class="metadata-bar">
				<div class="metadata-bar__left">
					<gl-commit-sha-copy
						class="metadata-bar__sha"
						appearance="toolbar"
						tooltip-placement="bottom"
						copy-label="${t?"Copy Stash Number":"Copy SHA"}"
						copied-label="Copied!"
						.sha=${t?`#${e.stashNumber}`:e.sha}
						.icon=${t?"gl-stashes-view":"git-commit"}
					></gl-commit-sha-copy>
					${this.isUncommitted?eA:this.renderMoreActionsButton()}
					${t?this.renderStashApplyButton():eA}
					${t?this.branchName?eC`<gl-tooltip content="Stashed on ${this.branchName}">
									<span class="metadata-bar__branch-indicator">
										<gl-branch-name
											class="metadata-bar__branch"
											.name=${this.branchName}
										></gl-branch-name>
									</span>
								</gl-tooltip>`:eA:!this.isUncommitted?this.renderBranchIndicator():eA}
				</div>
				<div class="metadata-bar__right">${this.renderCommitStats(e.stats)}</div>
			</div>
			${this._reachabilityExpanded?eC`<div class="reachability">${this.renderReachability()}</div>`:eA}`}renderMoreActionsButton(){let e=this.isStash,t=this.getCommitOrStashContext();return null==t?eA:eC`<gl-tooltip
			class="metadata-bar__more-tooltip"
			content="Show ${e?"Stash":"Commit"} Actions"
		>
			<button
				class="metadata-bar__action metadata-bar__action--more"
				type="button"
				aria-label="Show ${e?"Stash":"Commit"} Actions"
				data-vscode-context=${t}
				@click=${this.onMoreActionsClick}
			>
				<code-icon icon="kebab-vertical"></code-icon>
			</button>
		</gl-tooltip>`}renderStashApplyButton(){if(this.commit?.stashNumber==null)return eA;let e=this.isPopMode;return eC`<gl-tooltip>
			<button
				class="metadata-bar__action metadata-bar__action--apply"
				type="button"
				aria-label="${e?"Pop Stash":"Apply Stash"}"
				@click=${this.onStashApplyClick}
			>
				<code-icon icon="${e?"git-stash-pop":"git-stash-apply"}"></code-icon>
			</button>
			<span slot="content"
				>${e?eC`Pop Stash`:eC`Apply Stash<br />[${nn()}] Pop Stash`}</span
			>
		</gl-tooltip>`}getCommitOrStashContext(){let e=this.commit;if(null!=e){if(this.isStash){let t=e.stashNumber;if(null==t)return;return tH({webviewItem:"gitlens:stash",webviewItemValue:{type:"stash",ref:ny(e.sha,e.repoPath,{refType:"stash",name:`stash@{${t}}`,number:t,message:e.message,stashOnRef:e.stashOnRef})}})}return tH({webviewItem:"gitlens:commit",webviewItemValue:{type:"commit",ref:ny(e.sha,e.repoPath,{refType:"revision",message:e.message})}})}}renderBranchIndicator(){let e=this.reachabilityState,t=this.reachability?.refs,i=t?.length?t.length-!!this.branchName:0;return"loading"===e?eC`<button class="metadata-bar__branch-indicator" disabled aria-label="Loading branches and tags">
				<code-icon icon="git-branch"></code-icon>
				<code-icon icon="loading" modifier="spin" class="metadata-bar__branch-status"></code-icon>
			</button>`:"error"===e?eC`<gl-tooltip content="Unable to load branch reachability. Click to Retry">
				<button
					class="metadata-bar__branch-indicator metadata-bar__branch-indicator--error"
					@click=${()=>this.dispatchEvent(new CustomEvent("refresh-reachability"))}
				>
					<code-icon icon="git-branch"></code-icon>
					<code-icon icon="error" class="metadata-bar__branch-status"></code-icon>
				</button>
			</gl-tooltip>`:"loaded"===e&&t?.length===0?eC`<gl-tooltip content="This commit is not reachable from any branch or tag">
				<span class="metadata-bar__branch-unreachable">
					<code-icon icon="git-branch"></code-icon> Unreachable
				</span>
			</gl-tooltip>`:this.branchName?eC`<gl-tooltip
				content="${this._reachabilityExpanded?"Hide All Branches & Tags Containing this Commit":"Show All Branches & Tags Containing this Commit"}"
			>
				<button
					class="metadata-bar__branch-indicator"
					aria-expanded="${this._reachabilityExpanded}"
					@click=${this.onToggleReachability}
				>
					<gl-branch-name class="metadata-bar__branch" .name=${this.branchName}></gl-branch-name>
					${i>0?eC`<span class="metadata-bar__ref-count">+${i}</span>`:eA}
				</button>
			</gl-tooltip>`:eC`<gl-tooltip content="Show All Branches &amp; Tags Containing this Commit">
			<button
				class="metadata-bar__branch-indicator metadata-bar__branch-indicator--idle"
				aria-label="Show all branches and tags"
				@click=${this.onBranchIndicatorClick}
			>
				<code-icon icon="git-branch"></code-icon>
				<code-icon icon="ellipsis" class="metadata-bar__branch-status"></code-icon>
			</button>
		</gl-tooltip>`}onBranchIndicatorClick(){"idle"!==this.reachabilityState||this.reachability?this.onToggleReachability():this.dispatchEvent(new CustomEvent("load-reachability"))}renderEmbeddedMessage(){let e=this.commit;if(!e)return eA;let t=this.formattedMessage??e.message,i=t.indexOf(rK);return eC`<div class="message">
			<div class="message-block">
				${eU(-1===i,()=>eC`<div class="message-block__text scrollable" data-region="message">
							<gl-copy-container
								class="message-block__copy"
								.content=${e.message.replaceAll(rK,`
`)}
								copyLabel="Copy Message"
								copiedLabel="Copied!"
								placement="bottom"
							>
								<code-icon icon="copy"></code-icon>
							</gl-copy-container>
							<strong><gl-markdown .markdown=${t} density="compact"></gl-markdown></strong>
						</div>`,()=>eC`<div class="message-block__text scrollable" data-region="message">
							<gl-copy-container
								class="message-block__copy"
								.content=${e.message.replaceAll(rK,`
`)}
								copyLabel="Copy Message"
								copiedLabel="Copied!"
								placement="bottom"
							>
								<code-icon icon="copy"></code-icon>
							</gl-copy-container>
							<strong
								><gl-markdown .markdown=${t.substring(0,i)} density="compact"></gl-markdown
							></strong>
							<gl-markdown .markdown=${t.substring(i+3)} density="compact"></gl-markdown>
						</div>`)}
			</div>
		</div>`}renderEmbeddedAutolinks(){return eC`<div class="autolinks">${this.renderAutoLinksChips()}</div>`}renderEmbeddedExplainInput(){return this.orgSettings?.ai===!1?eA:eC`<gl-ai-input
			multiline
			.busy=${this.explainBusy}
			@gl-explain=${this.onExplainChanges}
		></gl-ai-input>`}onToggleReachability(){(this._reachabilityExpanded||this.reachability?.refs?.length)&&(this._reachabilityExpanded=!this._reachabilityExpanded)}renderHiddenNotice(){return this.searchContext?.hiddenFromGraph?eC`
			<div class="section">
				<div class="alert alert--warning">
					<code-icon icon="warning"></code-icon>
					<p class="alert__content">
						This ${this.isStash?"stash":"commit"} is not currently visible in the Commit Graph.
					</p>
				</div>
			</div>
		`:eA}renderEmptyContent(){return eC`
			<div class="section section--empty" id="empty">
				<p>Rich details for commits and stashes are shown as you navigate:</p>

				<ul class="bulleted">
					<li>lines in the text editor</li>
					<li>
						commits in the <a href="command:gitlens.showGraph">Commit Graph</a>,
						<a href="command:gitlens.showTimelineView">Visual File History</a>, or
						<a href="command:gitlens.showCommitsView">Commits view</a>
					</li>
					<li>stashes in the <a href="command:gitlens.showStashesView">Stashes view</a></li>
				</ul>

				<p>Alternatively, show your work-in-progress, or search for or choose a commit</p>

				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button full data-action="wip">Overview</gl-button>
					</span>
				</p>
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button full data-action="pick-commit">Choose Commit...</gl-button>
						<gl-button density="compact" data-action="search-commit" tooltip="Search for Commit"
							><code-icon icon="search"></code-icon
						></gl-button>
					</span>
				</p>
			</div>
		`}get autolinkState(){let e=this.autolinksEnabled,t=this.isUncommitted,i=this.autolinks,r=this.autolinkedIssues,o=this.pullRequest,s=this._cachedAutolinkState;if(s?.autolinksEnabled===e&&s.isUncommitted===t&&s.autolinksRef===i&&s.autolinkedIssuesRef===r&&s.pullRequestRef===o)return s.out;let a=this.computeAutolinkState();return this._cachedAutolinkState={autolinksEnabled:e,isUncommitted:t,autolinksRef:i,autolinkedIssuesRef:r,pullRequestRef:o,out:a},a}computeAutolinkState(){if(!this.autolinksEnabled||this.isUncommitted)return;let e=new Map,t=new Map;if(null!=this.autolinks)for(let i of this.autolinks)e.set(i.id,{type:"autolink",value:i}),t.set(i.url,i.id);let i=this.autolinkedIssues;if(null!=i)for(let r of i){if(null!=r.url){let i=t.get(r.url);null!=i&&e.delete(i)}e.set(r.id,{type:"issue",value:r})}let r=this.pullRequest;if(null!=r){if(null!=r.url){let i=t.get(r.url);null!=i&&e.delete(i)}e.set(r.id,{type:"pr",value:r})}let o=[],s=[],a=[];for(let t of e.values())switch(t.type){case"autolink":o.push(t.value);break;case"issue":s.push(t.value);break;case"pr":a.push(t.value)}return{autolinks:o,issues:s,prs:a,size:e.size}}renderAutoLinksChips(){let e=this.autolinkState;if(null==e)return this._commitChanging?this.renderAutolinksLoading():nT({hasIntegrationsConnected:this.hasIntegrationsConnected,hasAccount:this.hasAccount,showLabel:!0});let{autolinks:t,issues:i,prs:r,size:o}=e;return 0===o?this._commitChanging?this.renderAutolinksLoading():nT({hasIntegrationsConnected:this.hasIntegrationsConnected,hasAccount:this.hasAccount,showLabel:!0}):eC`<gl-chip-overflow max-rows="1">
			${eU(t.length,()=>t.map(e=>{let t=e.description??e.title;return void 0===t&&(t=`Custom Autolink ${e.prefix}${e.id}`),eC`<gl-autolink-chip
						type="autolink"
						name="${t}"
						url="${e.url}"
						identifier="${e.prefix}${e.id}"
					></gl-autolink-chip>`}))}
			${eU(r.length,()=>r.map(e=>eC`<gl-autolink-chip
							type="pr"
							name="${e.title}"
							url="${e.url}"
							identifier="#${e.id}"
							status="${e.state}"
							.date=${e.updatedDate}
							.dateFormat="${this.preferences?.dateFormat}"
							.dateStyle="${this.preferences?.dateStyle}"
							.author=${e.author?.name}
							?isDraft=${e.isDraft}
							.reviewDecision=${e.reviewDecision}
						></gl-autolink-chip>`))}
			${eU(i.length,()=>i.map(e=>eC`<gl-autolink-chip
							type="issue"
							name="${e.title}"
							url="${e.url}"
							identifier="#${e.id}"
							status="${e.state}"
							.date=${e.closed?e.closedDate:e.createdDate}
							.dateFormat="${this.preferences?.dateFormat}"
							.dateStyle="${this.preferences?.dateStyle}"
						></gl-autolink-chip>`))}
			${this.renderAutoLinksPopover(t,r,i)}
			${nT({hasIntegrationsConnected:this.hasIntegrationsConnected,hasAccount:this.hasAccount,slotName:"suffix"})}
		</gl-chip-overflow>`}renderAutolinksLoading(){return eC`<span class="autolinks-loading" aria-busy="true">
			<code-icon icon="loading" modifier="spin"></code-icon>
			<span>Loading autolinks…</span>
		</span>`}renderAutoLinksPopover(e,t,i){return 0===e.length&&0===t.length&&0===i.length?eA:eC`<div slot="popover">
			${t.length>0?eC`<menu-label>Pull Requests</menu-label> ${t.map(e=>eC`<menu-item href=${e.url}>
									<code-icon icon="git-pull-request"></code-icon> #${e.id}${e.title?` \u2014 ${e.title}`:""}
								</menu-item>`)}`:eA}
			${i.length>0?eC`${t.length>0?eC`<menu-divider></menu-divider>`:eA}
						<menu-label>Issues</menu-label>
						${i.map(e=>eC`<menu-item href=${e.url}>
									<code-icon icon="issues"></code-icon> #${e.id}${e.title?` \u2014 ${e.title}`:""}
								</menu-item>`)}`:eA}
			${e.length>0?eC`${t.length>0||i.length>0?eC`<menu-divider></menu-divider>`:eA}
						<menu-label>Autolinks</menu-label>
						${e.map(e=>eC`<menu-item href=${e.url}>
									<code-icon icon="link"></code-icon> ${e.prefix}${e.id}${e.title?` \u2014 ${e.title}`:""}
								</menu-item>`)}`:eA}
		</div>`}renderReachability(){if(!this.reachability?.refs?.length)return eA;let{refs:e}=this.reachability,t=e.filter(e=>"branch"===e.refType),i=e.filter(e=>"tag"===e.refType);return eC`<div class="reachability-summary">
				${this.renderReachabilityChip("branch",t)} ${this.renderReachabilityChip("tag",i)}
			</div>
			${this.reachability.partial?eC`<gl-tooltip content="Load All Branches &amp; Tags">
						<button
							class="reachability__load-all"
							aria-label="Load all branches and tags"
							@click=${()=>this.dispatchEvent(new CustomEvent("load-reachability"))}
						>
							<code-icon icon="sync"></code-icon></button
					></gl-tooltip>`:eA}`}renderReachabilityChip(e,t){if(!t.length)return eA;let i="branch"===e?"git-branch":"tag",r=t.length,[o]=t;if(1===r){let e="branch"===o.refType?o.remote?"remote branch":"branch":"tag";return eC`<gl-action-chip
				icon="${i}"
				label="Commit on 1 ${e}: ${o.name}"
				overlay="tooltip"
				class="reachability-range-chip reachability-range-chip--${"branch"===o.refType?o.remote?"remote-branch":"local-branch":"tag"}${o.current?" reachability-range-chip--current":""}"
				><span class="reachability-range-chip__label">${o.name}</span></gl-action-chip
			>`}let s=t.at(-1);return eC`<gl-popover placement="bottom" trigger="hover focus click" class="reachability-range-chip-wrapper">
			<gl-action-chip
				slot="anchor"
				class="reachability-range-chip reachability-range-chip--range reachability-range-chip--${"branch"===e?"local-branch":"tag"}"
				><span class="reachability-range-chip__label">
					<code-icon icon="${i}"></code-icon>${o.name}
					<span class="reachability-range-chip__ellipsis">...</span>
					<code-icon icon="${i}"></code-icon>${s.name}
				</span>
				<span class="reachability-range-chip__count">+${r}</span></gl-action-chip
			>
			<div slot="content" class="reachability-popover">
				<div class="reachability-popover__header">
					Commit is on ${r} ${"branch"===e?"branches":"tags"}
				</div>
				<div class="reachability-popover__list scrollable">
					${t.map(t=>eC`<div
								class="reachability-list-item${t.current?" reachability-list-item--current":""}"
							>
								<code-icon
									icon="${"branch"===e?"git-branch":"tag"}"
									class="reachability-list-item__icon"
								></code-icon>
								<span class="reachability-list-item__label">${t.name}</span>
							</div>`)}
				</div>
			</div>
		</gl-popover>`}onExplainChanges(e){if(this.explainBusy){e.preventDefault(),e.stopPropagation();return}e.stopPropagation(),this.explainBusy=!0;let t=e instanceof CustomEvent?e.detail?.prompt:void 0;this.dispatchEvent(new CustomEvent("explain-commit",{detail:{prompt:t},bubbles:!0,composed:!0}))}getFileActions(e,t){let i=[{icon:"go-to-file",label:"Open File",action:"file-open"}];return this.isUncommitted||(i.push({icon:"git-compare",label:"Open Changes with Working File",action:"file-compare-working"}),this.isStash||null!=e.submodule||i.push({icon:"globe",label:"Open on Remote",action:"file-open-on-remote"})),i}getFileContext(e){if(!this.commit)return;let t=this.commit,i=null!=t.stashNumber,r=null!=e.submodule?"+submodule":"";return tH({webviewItem:i?`gitlens:file+stashed${r}`:`gitlens:file+committed${r}`,webviewItemValue:{type:"file",path:e.path,repoPath:t.repoPath,sha:t.sha,stashNumber:t.stashNumber,status:e.status}})}};h8.styles=[...nj,cH],h7([eB({type:Object})],h8.prototype,"commit",2),h7([eB({type:Boolean})],h8.prototype,"autolinksEnabled",2),h7([eB({type:Array})],h8.prototype,"autolinkedIssues",2),h7([eB({type:Object})],h8.prototype,"pullRequest",2),h7([eB({type:Boolean})],h8.prototype,"hasRemotes",2),h7([eF()],h8.prototype,"isStash",1),h7([eF()],h8.prototype,"explainBusy",2),h7([eB({type:Object})],h8.prototype,"explain",2),h7([eB({type:Object})],h8.prototype,"reachability",2),h7([eB({type:String})],h8.prototype,"reachabilityState",2),h7([eB({type:Array})],h8.prototype,"autolinks",2),h7([eB({type:String})],h8.prototype,"formattedMessage",2),h7([eB({type:Object})],h8.prototype,"signature",2),h7([eB({type:String,attribute:"branch-name"})],h8.prototype,"branchName",2),h7([eB({type:Boolean})],h8.prototype,"aiEnabled",2),h7([eB({type:Boolean})],h8.prototype,"experimentalFeaturesEnabled",2),h7([eB({type:Boolean,attribute:"compare-enabled"})],h8.prototype,"compareEnabled",2),h7([eB()],h8.prototype,"activeMode",2),h7([eB({attribute:!1})],h8.prototype,"subPanelContent",2),h7([eB({type:Boolean})],h8.prototype,"loading",2),h7([eB({type:Boolean,attribute:"panel-actions"})],h8.prototype,"panelActions",2),h7([eF()],h8.prototype,"_reachabilityExpanded",2),h7([eF()],h8.prototype,"_userAdjustedSplitter",2),h7([eF()],h8.prototype,"_commitChanging",2),h8=h7([eD("gl-details-commit-panel")],h8);let h9=F`
	:host([variant='embedded']) {
		--gl-tree-view-margin-top: -0.2rem;
		--gl-tree-view-filterable-margin-top: -0.4rem;
	}

	/* Split panel layout */
	:host([variant='embedded']) .split {
		flex: 1;
		min-height: 200px;
		overflow: hidden;
		--gl-split-panel-divider-width: 12px;
	}
	:host([variant='embedded']) .split--auto-size:not([dragging]) {
		--gl-split-panel-start-size: fit-content(var(--_start-size, 25%));
	}

	:host([variant='embedded']) .msg-slot {
		height: 100%;
		min-height: 4.4rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	/* File list wrapper */
	:host([variant='embedded']) .files {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		margin-top: 0.4rem;
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	}

	/* Explain input override */
	:host([variant='embedded']) .explain-input {
		flex: 1;
		width: 0;
		min-width: 0;
		max-width: none;
		margin: 0;
		padding: 0.4rem 0.7rem;
		font-size: var(--vscode-font-size);
		font-family: var(--vscode-font-family);
		color: var(--vscode-input-foreground);
		background: transparent;
		border: none !important;
		outline: none;
	}
	:host([variant='embedded']) .explain-input::placeholder {
		color: var(--vscode-input-placeholderForeground);
	}

	/* Child Shadow DOM component overrides */
	:host([variant='embedded']) webview-pane::part(header) {
		border-top: none;
		padding-right: calc(var(--gl-panel-padding-right) - 0.4rem);
		background-color: inherit;
	}

	:host([variant='embedded']) webview-pane [slot='title'] {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
	}

	/* ── WIP-specific embedded header ── */
	:host([variant='embedded']) .header {
		display: flex;
		flex-direction: column;
		flex: none;
		background-color: var(--vscode-sideBarSectionHeader-background, var(--color-background--level-05));
	}

	:host([variant='embedded']) .header__identity {
		display: flex;
		align-items: center;
		padding: 0.8rem var(--gl-panel-padding-right) 0.4rem var(--gl-panel-padding-left);
		gap: 0.6rem;
	}

	:host([variant='embedded']) .header__wip-icon {
		--code-icon-size: 24px;
		width: 3.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--color-foreground--50);
	}

	:host([variant='embedded']) .header__wip-title {
		font-weight: 500;
		font-size: var(--gl-font-base);
		color: var(--vscode-gitlens-decorations-worktreeUncommittedForeground, #e2c08d);
	}

	:host([variant='embedded']) .header__wip-subtitle {
		font-size: var(--gl-font-sm);
		color: var(--color-foreground--50);
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	:host([variant='embedded']) .header__identity-left {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-width: 0;
		flex: 1;
	}

	:host([variant='embedded']) .header__identity-right {
		display: flex;
		align-items: center;
		gap: 0.2rem;
		flex-shrink: 0;
	}

	:host([variant='embedded']) .header__branch-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.2rem 1rem 0.6rem 1.2rem;
		gap: 0.6rem;
	}

	:host([variant='embedded']) .header__branch-pill {
		font-size: var(--gl-font-base);
		max-width: 20rem;
	}

	.paused-op {
		display: flex;
		align-items: center;
		padding: 0.4rem 1rem;
	}

	:host([variant='embedded']) .header .paused-op {
		padding: 0.2rem 1rem 0.6rem 1.2rem;
	}

	.paused-op > gl-merge-rebase-status {
		flex: 1;
		min-width: 0;
	}

	/* ── Bottom section (split panel end slot) ── */
	:host([variant='embedded']) .bottom-section {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 120px;
		overflow: hidden;
	}

	/* Split panel divider */
	:host([variant='embedded']) .split::part(divider) {
		background-color: transparent !important;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 0;
	}
`;var de=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,di=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dt(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&de(t,i,s),s};let dr=class extends lit_element_i{constructor(){super(...arguments),this.editor=!1,this.layout="shift",this.grouping="gap"}render(){return eC`<div class="group"><slot></slot></div>`}};dr.styles=[op,F`
			:host {
				--button-group-gap: 0.4rem;
				--button-max-width: 30rem;
				--button-group-max-width: 30rem;
				display: block;
				max-width: var(--button-max-width, 30rem);
				margin-inline: auto;
				text-align: left;
				transition: max-width 0.2s ease-out;
			}

			:host([grouping='gap-wide']) {
				--button-group-gap: 1rem;
			}

			:host([grouping='split']) {
				--button-group-gap: 0.1rem;
			}

			@media (min-width: 640px) {
				:host([layout='shift']) {
					--button-max-width: 100%;
				}
			}

			:host([layout='full']) {
				--button-max-width: 100%;
				--button-group-max-width: 100%;
			}

			.group {
				display: inline-flex;
				gap: var(--button-group-gap, 0.4rem);
				width: 100%;
				max-width: var(--button-group-max-width, 30rem);
			}

			:host([grouping='split']) ::slotted(*:not(:first-child)) {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
			:host([grouping='split']) ::slotted(*:not(:last-child)) {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		`],di([eB({type:Boolean})],dr.prototype,"editor",2),di([eB({reflect:!0})],dr.prototype,"layout",2),di([eB({reflect:!0})],dr.prototype,"grouping",2),dr=di([eD("button-container")],dr);var ds=Object.defineProperty,dn=Object.getOwnPropertyDescriptor,da=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dn(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ds(t,i,s),s};let dl=class extends lit_element_i{render(){return this.name?eC`<gl-tooltip .content=${this.name}>${this.renderAvatar()}</gl-tooltip>`:this.renderAvatar()}renderAvatar(){return this.href?eC`<a href=${this.href} class="avatar" part="avatar">${this.renderContent()}</a>`:eC`<span class="avatar" part="avatar">${this.renderContent()}</span>`}renderContent(){return this.src?eC`<img class="thumb thumb--media" src="${this.src}" alt="${this.name}" />`:eC`<slot class="thumb thumb--text"></slot>`}};dl.styles=[F`
			:host {
				display: inline-block;
				vertical-align: middle;
			}

			.avatar {
				display: inline-flex;
				width: var(--gl-avatar-size, 1.6rem);
				aspect-ratio: 1;
				vertical-align: middle;
				border-radius: 100%;
				justify-content: center;
			}

			.thumb {
				border-radius: 50%;
			}

			.thumb--text {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: clamp(0.8rem, calc(var(--gl-avatar-size, 1.6rem) * 0.5), 1.1rem);
				line-height: 1;
				text-transform: uppercase;
				cursor: default;
				color: var(--vscode-descriptionForeground);
			}

			.thumb--media {
				display: block;
				width: 100%;
				height: auto;
				object-fit: cover;
				object-position: 50% 50%;
			}

			.avatar:hover {
				transform: scale(1.2);
			}
		`],da([eB()],dl.prototype,"src",2),da([eB()],dl.prototype,"name",2),da([eB()],dl.prototype,"href",2),dl=da([eD("gl-avatar")],dl);var dc=Object.defineProperty,dh=Object.getOwnPropertyDescriptor,dd=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dh(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dc(t,i,s),s};let dp=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!0,this.showFileIcons=!1,this.checkable=!1,this._effectiveFiles=[]}willUpdate(e){let t,i,r;if(!e.has("files")&&!e.has("checkable")&&!e.has("checkableStates")&&!e.has("checkableStateDefault")&&!e.has("fileActions"))return;let o=this.files??[],s=new Set;if(this.checkable){let e=this.deduplicateFiles(o),r=e.deduped;if(s=e.mixedPaths,t=function(e){let t=[],i=[];for(let r of e)nH(r.status)?t.push(r):i.push(r);return 0===t.length?e:[...t,...i]}(r),s.size>0||this.checkableStates)for(let e of(i=new Map(this.checkableStates),s)){let t=i.get(e);i.set(e,{...t,state:"mixed"})}else i=this.checkableStates;if(!this.checkableStateDefault)for(let e of r)i?.has(e.path)||s.has(e.path)||(i??=new Map,e.staged&&i.set(e.path,{state:"checked"}))}else t=o,i=this.checkableStates,r={getGroup:e=>nH(e.status)?"conflicts":e.staged?"staged":"unstaged",groups:[{key:"conflicts",label:"Conflicts",actions:[]},{key:"staged",label:"Staged Changes",actions:this.getStagedActions()},{key:"unstaged",label:"Unstaged Changes",actions:this.getUnstagedActions()}]};let a=this.fileActions;this._wrappedActions="function"==typeof a?(e,t)=>a(e,{...t??{},mixed:s.has(e.path)}):a,this._effectiveFiles=t,this._effectiveStates=i,this._grouping=r}render(){let e=this.files??[],t=this.multiDiff,i=t?["layout","search","multi-diff"]:void 0;return eC`<gl-file-tree-pane
			.files=${this._effectiveFiles}
			.collapsable=${this.collapsable}
			?show-file-icons=${this.showFileIcons}
			.searchContext=${this.searchContext}
			.fileActions=${this._wrappedActions}
			.fileContext=${this.fileContext}
			.filesLayout=${this.preferences?.files}
			.showIndentGuides=${this.preferences?.indentGuides}
			.grouping=${this._grouping}
			?checkable=${this.checkable}
			.checkableStates=${this._effectiveStates}
			.checkableStateDefault=${this.checkableStateDefault}
			.buttons=${i}
			selection-badge-label="Staged"
			selection-action="file-open"
			check-verb="Stage"
			uncheck-verb="Unstage"
			@gl-check-all=${this.onCheckAll}
			@gl-file-tree-pane-open-multi-diff=${t?()=>this.onOpenMultiDiff(t):null}
		>
			<span slot="subtitle" style="opacity: 1">${this.renderStats()}</span>
			${e.length>0?eC`<gl-button
						slot="leading-actions"
						appearance="toolbar"
						tooltip="Stash Changes"
						@click=${this.onStashSave}
					>
						<code-icon icon="gl-stash-save" slot="prefix"></code-icon>
						<span class="stash-label">Stash</span>
					</gl-button>`:eA}
			<slot name="before-tree" slot="before-tree"></slot>
		</gl-file-tree-pane>`}onStashSave(){this.dispatchEvent(new CustomEvent("stash-save",{bubbles:!0,composed:!0}))}onOpenMultiDiff(e){let t=this.files;t?.length&&this.dispatchEvent(new CustomEvent("open-multiple-changes",{detail:{files:t,repoPath:e.repoPath,lhs:e.lhs,rhs:e.rhs,title:e.title},bubbles:!0,composed:!0}))}renderStats(){return nB(this.stats)??eA}deduplicateFiles(e){let t=[],i=new Set,r=new Map;for(let o of e){let e=r.get(o.path);null!=e?(i.add(o.path),!o.staged&&t[e].staged&&(t[e]=o)):(r.set(o.path,t.length),t.push(o))}return{deduped:t,mixedPaths:i}}getStagedActions(){return[{icon:"gl-cloud-patch-share",label:"Share Staged Changes",action:"staged-create-patch"}]}getUnstagedActions(){return[{icon:"gl-cloud-patch-share",label:"Share Unstaged Changes",action:"unstaged-create-patch"}]}onCheckAll(e){e.stopPropagation(),this.dispatchEvent(new CustomEvent(e.detail.checked?"stage-all":"unstage-all",{bubbles:!0,composed:!0}))}};dp.styles=F`
		/* Establish the named container on this host so the @container query below resolves
		   in the same shadow scope as the rule (cross-shadow container lookup is spotty). */
		:host {
			flex: 1 1 0%;
			display: flex;
			container-type: inline-size;
			container-name: gl-wip-tree-pane;
		}

		/* Pin the button to a stable height in both expanded and collapsed states so the
		   header doesn't jump vertically when the label hides. Uses px (not rem) to be
		   immune to root-font-size differences across webview themes. 28px covers the
		   natural icon+text height (~27.5px) so collapsed and expanded match. */
		gl-button {
			min-height: 28px;
		}

		/* Collapse the Stash label to icon-only when the pane runs out of room.
		   display:none cleanly removes the slotted flex item so the button's internal gap
		   collapses too — true icon-only, no half-clipped text. The custom properties get
		   set on gl-file-tree-pane (a descendant of the gl-wip-tree-pane container, since
		   :host IS the container and so isn't matched by @container rules) and inherit
		   into its shadow so the surrounding action gaps collapse too. The button's
		   tooltip="Stash Changes" keeps it accessible when the label is hidden. */
		@container gl-wip-tree-pane (max-width: 340px) {
			.stash-label {
				display: none !important;
			}
			gl-file-tree-pane {
				--gl-header-actions-gap: 0;
				--gl-leading-action-trailing-gap: 0;
			}
		}
	`,dd([eB({type:Array})],dp.prototype,"files",2),dd([eB({type:Object})],dp.prototype,"stats",2),dd([eB({type:Boolean})],dp.prototype,"collapsable",2),dd([eB({type:Boolean,attribute:"show-file-icons"})],dp.prototype,"showFileIcons",2),dd([eB({attribute:!1})],dp.prototype,"fileActions",2),dd([eB({attribute:!1})],dp.prototype,"fileContext",2),dd([eB({type:Object,attribute:"search-context"})],dp.prototype,"searchContext",2),dd([eB({type:Object})],dp.prototype,"preferences",2),dd([eB({type:Boolean})],dp.prototype,"checkable",2),dd([eB({attribute:!1})],dp.prototype,"checkableStates",2),dd([eB({attribute:!1})],dp.prototype,"checkableStateDefault",2),dd([eB({attribute:!1})],dp.prototype,"multiDiff",2),dp=dd([eD("gl-wip-tree-pane")],dp);let du={"cherry-pick":{label:"Cherry picking",conflicts:"Resolve conflicts to continue cherry picking",directionality:"into"},merge:{label:"Merging",conflicts:"Resolve conflicts to continue merging",directionality:"into"},rebase:{label:"Rebasing",conflicts:"Resolve conflicts to continue rebasing",directionality:"onto",pending:"Pending rebase of"},revert:{label:"Reverting",conflicts:"Resolve conflicts to continue reverting",directionality:"in"}};var dg=Object.defineProperty,dm=Object.getOwnPropertyDescriptor,df=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dm(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dg(t,i,s),s};let db=class extends lit_element_i{constructor(){super(...arguments),this.conflicts=!1}get onSkipUrl(){return this.createPausedOperationCommandLink("skip")}get onContinueUrl(){return this.createPausedOperationCommandLink("continue")}get onAbortUrl(){return this.createPausedOperationCommandLink("abort")}get onOpenEditorUrl(){return this.createPausedOperationCommandLink("open")}get onShowConflictsUrl(){return this.createPausedOperationCommandLink("showConflicts")}createPausedOperationCommandLink(e){return this._webview.createCommandLink(`gitlens.pausedOperation.${e}:`,this.pausedOpStatus)}render(){return null==this.pausedOpStatus?eA:eC`
			<span class="status" part="base">
				<code-icon icon="warning" class="icon"></code-icon>
				${this.renderStatus(this.pausedOpStatus)}${this.renderActions()}
			</span>
		`}renderStatus(e){if("rebase"!==e.type){let t=du[e.type],i=this.conflicts?t.conflicts:t.label;return eC`<span class="label"
				>${this.renderConflictsLink(i)} ${this.renderReference(e.incoming)}
				${t.directionality} ${this.renderReference(e.current)}</span
			>`}let t=e.steps.total>0,i=du[e.type],r=this.conflicts?i.conflicts:t?i.label:i.pending;return eC`<span class="label"
				>${this.renderConflictsLink(r)} ${this.renderReference(e.incoming)}
				${i.directionality} ${this.renderReference(e.current??e.onto)}</span
			>${t?eC`<span class="steps"
						>(${e.steps.current.number}/${e.steps.total})</span
					>`:eA}`}renderConflictsLink(e){return this.conflicts?eC`<gl-tooltip content="Show Conflicts">
			<a href="${this.onShowConflictsUrl}" class="link">${e}</a>
		</gl-tooltip>`:e}renderReference(e){let t=this._webview.webviewId,i="branch"===e.refType,r=this.createJumpUrl(e);return eC`<gl-tooltip content=${"gitlens.graph"===t||"gitlens.views.graph"===t?i?"Jump to Branch":"Jump to Commit":i?"Open Branch in Commit Graph":"Open Commit in Commit Graph"}>
			<a href=${r} class="ref-link">
				${i?eC`<gl-branch-name .name=${e.name} .size=${12}></gl-branch-name>`:eC`<gl-commit-sha .sha=${e.ref} .size=${12}></gl-commit-sha>`}
			</a>
		</gl-tooltip>`}createJumpUrl(e){return nw("gitlens.showInCommitGraph",{ref:e,source:{source:"merge-target"}})}renderActions(){if(null==this.pausedOpStatus)return eA;let e=this.pausedOpStatus.type;return eC`<action-nav class="actions">
			${eU("rebase"===e,()=>eC`<action-item
						label="Open in Rebase Editor"
						href=${this.onOpenEditorUrl}
						icon="edit"
					></action-item>`)}
			${eU("revert"!==e&&!("rebase"===e&&this.conflicts),()=>eC`
					<action-item label="Continue" icon="gl-continue" href=${this.onContinueUrl}></action-item>
				`)}
			${eU("merge"!==e,()=>eC`<action-item label="Skip" icon="gl-skip" href=${this.onSkipUrl}></action-item>`)}
			<action-item label="Abort" href=${this.onAbortUrl} icon="gl-abort"></action-item>
		</action-nav>`}};db.styles=[F`
			.status {
				--action-item-foreground: #000;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				gap: 0.6rem;
				width: 100%;
				max-width: 100%;
				margin-block: 0;
				background-color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
				color: #000;
				border-radius: 0.3rem;
				padding: 0.1rem 0.4rem;
			}

			:host([conflicts]) .status {
				--action-item-foreground: #fff;
				background-color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor);
				color: #fff;
			}

			.label {
				flex: 1;
				min-width: 0;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.icon,
			.steps,
			.actions {
				flex: none;
			}

			.md-code {
				background: var(--vscode-textCodeBlock-background);
				border-radius: 3px;
				padding: 0px 4px 2px 4px;
				font-family: var(--vscode-editor-font-family);
			}

			gl-commit-sha::part(label) {
				font-weight: bold;
			}

			.link {
				color: inherit;
				text-decoration: underline dotted;
				text-underline-offset: 0.3rem;
				opacity: 0.9;

				&:hover {
					text-decoration: none;
					opacity: 1;
				}
			}

			.link--conflicts {
				margin-left: 1rem;
			}

			.ref-link {
				color: inherit;
				cursor: pointer;
				text-decoration: none !important;
			}
		`],df([function({context:e,subscribe:t}){return(i,r)=>{"object"==typeof r?r.addInitializer(function(){new context_consumer_s(this,{context:e,callback:e=>{i.set.call(this,e)},subscribe:t})}):i.constructor.addInitializer(i=>{new context_consumer_s(i,{context:e,callback:e=>{i[r]=e},subscribe:t})})}}({context:"webview"})],db.prototype,"_webview",2),df([eB({type:Boolean,reflect:!0})],db.prototype,"conflicts",2),df([eB({type:Object})],db.prototype,"pausedOpStatus",2),db=df([eD("gl-merge-rebase-status")],db);let dv=F`
	.button-container {
		margin: 1rem auto 0;
		text-align: left;
		max-width: 30rem;
		transition: max-width 0.2s ease-out;
	}

	@media (min-width: 640px) {
		.button-container {
			max-width: 100%;
		}
	}

	.button-group {
		display: inline-flex;
		gap: 0.1rem;
	}
	.button-group--single {
		width: 100%;
		max-width: 30rem;
	}

	.button-group > *:not(:first-child),
	.button-group > *:not(:first-child) gl-button {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.button-group > *:not(:last-child),
	.button-group > *:not(:last-child) gl-button {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
`;var d_=((w=d_||{}).AngleBracketLeftHeavy="❰",w.AngleBracketRightHeavy="❱",w.ArrowBack="↩",w.ArrowDown="↓",w.ArrowDownUp="⇵",w.ArrowDropRight="⤷",w.ArrowHeadRight="➤",w.ArrowLeft="←",w.ArrowLeftDouble="⇐",w.ArrowLeftRight="↔",w.ArrowLeftRightDouble="⇔",w.ArrowLeftRightDoubleStrike="⇎",w.ArrowLeftRightLong="⟷",w.ArrowRight="→",w.ArrowRightDouble="⇒",w.ArrowRightHollow="⇨",w.ArrowUp="↑",w.ArrowUpDown="⇅",w.ArrowUpRight="↗",w.ArrowsHalfLeftRight="⇋",w.ArrowsHalfRightLeft="⇌",w.ArrowsLeftRight="⇆",w.ArrowsRightLeft="⇄",w.Asterisk="∗",w.Bullseye="◎",w.Check="✔",w.Dash="—",w.Dot="•",w.Ellipsis="…",w.EnDash="–",w.Envelope="✉",w.EqualsTriple="≡",w.Flag="⚑",w.FlagHollow="⚐",w.MiddleEllipsis="⋯",w.MuchLessThan="≪",w.MuchGreaterThan="≫",w.Pencil="✎",w.Space=" ",w.SpaceThin=" ",w.SpaceThinnest=" ",w.SquareWithBottomShadow="❏",w.SquareWithTopShadow="❐",w.Warning="⚠",w.ZeroWidthSpace="​",w);Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]);var dy=((x=dy||{}).File="file",x.Git="git",x.GitHub="github",x.GitLens="gitlens",x.GitLensAIMarkdown="gitlens-ai-markdown",x.GitLensVirtual="gitlens-virtual",x.PRs="pr",x.Remote="vscode-remote",x.Vsls="vsls",x.VslsScc="vsls-scc",x.Virtual="vscode-vfs",x);Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let dw="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",dk=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${dw}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${dw}`,graph:`https://gitkraken.com/solutions/commit-graph?${dw}`,launchpad:`https://gitkraken.com/solutions/launchpad?${dw}`,platform:`https://gitkraken.com/devex?${dw}`,pricing:`https://gitkraken.com/gitlens/pricing?${dw}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${dw}`,security:`https://help.gitkraken.com/gitlens/security?${dw}`,workspaces:`https://gitkraken.com/solutions/workspaces?${dw}`,cli:`https://gitkraken.com/cli?${dw}`,browserExtension:`https://gitkraken.com/browser-extension?${dw}`,desktop:`https://gitkraken.com/git-client?${dw}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${dw}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${dw}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${dw}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${dw}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${dw}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${dw}`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${dw}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${dw}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${dw}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${dw}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${dw}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${dw}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${dw}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${dw}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${dw}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${dw}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${dw}`});var dx=Object.defineProperty,d$=Object.getOwnPropertyDescriptor,dC=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?d$(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dx(t,i,s),s};let dS=class extends lit_element_i{constructor(){super(...arguments),this.lines=1}render(){let e=`--skeleton-lines: ${this.lines};`;return eC`<div class="skeleton" style=${e}></div>`}};dS.styles=F`
		:host {
			--skeleton-line-height: 1.2;
			--skeleton-lines: 1;
		}

		.skeleton {
			position: relative;
			display: block;
			overflow: hidden;
			border-radius: 0.25em;
			width: 100%;
			height: calc(1em * var(--skeleton-line-height, 1.2) * var(--skeleton-lines, 1));
			background-color: var(--color-background--lighten-15);
		}

		.skeleton::before {
			content: '';
			position: absolute;
			display: block;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-image: linear-gradient(
				to right,
				transparent 0%,
				var(--color-background--lighten-15) 20%,
				var(--color-background--lighten-30) 60%,
				transparent 100%
			);
			transform: translateX(-100%);
			animation: skeleton-loader 2s ease-in-out infinite;
		}

		@keyframes skeleton-loader {
			100% {
				transform: translateX(100%);
			}
		}
	`,dC([eB({type:Number})],dS.prototype,"lines",2),dS=dC([eD("skeleton-loader")],dS);let GlTreeBase=class GlTreeBase extends GlElement{renderLoading(){return eC`
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
		`}renderLayoutAction(e){if(!e)return eA;let t="tree",i="list-tree",r="View as Tree";switch(e){case"auto":t="list",i="gl-list-auto",r="View as List";break;case"list":t="tree",i="list-flat",r="View as Tree";break;case"tree":t="auto",i="list-tree",r="View as Auto"}return eC`<action-item data-switch-value="${t}" label="${r}" icon="${i}"></action-item>`}renderTreeView(e,t="none",i){return eC`<gl-tree-view
			.model=${e}
			.guides=${t}
			empty-text=${i??eA}
			@gl-tree-generated-item-action-clicked=${this.onTreeItemActionClicked}
			@gl-tree-generated-item-checked=${this.onTreeItemChecked}
			@gl-tree-generated-item-selected=${this.onTreeItemSelected}
		></gl-tree-view>`}renderFiles(e,t=!1,i=!1,r=2){let o=[];if(t){let t=e[0]?.repoPath,s=nG(e,e=>e.path.split("/"),(...e)=>e.join("/"),i);if(null!=s.children)for(let e of s.children.values()){let i=this.walkFileTree(e,{level:r},t);o.push(i)}}else for(let t of e){let e=this.fileToTreeModel(t,{level:r,branch:!1},!0);o.push(e)}return o}walkFileTree(e,t={level:1},i){let r;if(void 0===t.level&&(t.level=1),null==e.value?(r=this.folderToTreeModel(e.name,e.relativePath,t),i&&(r.tooltip=(0,nZ.join)(i,e.relativePath))):r=this.fileToTreeModel(e.value,t),null!=e.children){let o=[];for(let r of e.children.values()){let e=this.walkFileTree(r,{...t,level:t.level+1},i);o.push(e)}o.length>0&&(r.branch=!0,r.children=o)}return r}folderToTreeModel(e,t,i){return{branch:!1,expanded:!0,path:t,level:1,checkable:!1,checked:!1,icon:"folder",label:e,tooltip:t,...i}}getRepoActions(e,t,i){return[]}emptyTreeModel(e,t){return{branch:!1,expanded:!0,path:"",level:1,checkable:!0,checked:!0,icon:void 0,label:e,...t}}repoToTreeModel(e,t,i,r){return{branch:!1,expanded:!0,path:t,level:1,checkable:!0,checked:!0,icon:"gl-repository",label:e,description:r,context:[t],actions:this.getRepoActions(e,t,i),...i}}getFileActions(e,t){return[]}fileToTreeModel(e,t,i=!1,r="/"){let o=e.path.lastIndexOf(r),s=-1!==o?e.path.substring(o+1):e.path,a=i&&-1!==o?e.path.substring(0,o):"";return{branch:!1,expanded:!0,path:e.path,level:1,checkable:!1,checked:!1,icon:"file",label:s,description:!0===i?a:void 0,tooltip:nX(e),context:[e],actions:this.getFileActions(e,t),decorations:[{type:"text",label:e.status}],...t}}};var dE=Object.defineProperty,dA=Object.getOwnPropertyDescriptor;let dP=class extends lit_element_i{firstUpdated(e){this.role="listbox"}render(){return eC`<slot></slot>`}};dP.styles=[op,F`
			:host {
				width: max-content;
				background-color: var(--vscode-menu-background);
				border: 1px solid var(--vscode-menu-border);
				padding-bottom: 0.6rem;
			}
		`],dP=((e,t,i,r)=>{for(var o,s=r>1?void 0:r?dA(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dE(t,i,s),s})([eD("menu-list")],dP);var dz=Object.defineProperty,dR=Object.getOwnPropertyDescriptor,dI=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dR(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dz(t,i,s),s};let dT=class extends GlTreeBase{constructor(){super(...arguments),this.review=!1,this.generateBusy=!1,this.creationBusy=!1,this.onDebounceTitleInput=iy(this.onTitleInput,500),this.onDebounceDescriptionInput=iy(this.onDescriptionInput,500)}get create(){return this.state.create}get createChanges(){return Object.values(this.create.changes)}get createEntries(){return Object.entries(this.create.changes)}get hasWipChanges(){return this.createChanges.some(e=>e?.type==="wip")}get selectedChanges(){return 1===this.createChanges.length?this.createEntries:this.createEntries.filter(([,e])=>!1!==e.checked)}get canSubmit(){return null!=this.create.title&&this.create.title.length>0&&this.selectedChanges.length>0}get fileLayout(){return this.state?.preferences?.files?.layout??"auto"}get isCompact(){return this.state?.preferences?.files?.compact??!0}get filesModified(){return function(e,t){if(null==e)return 0;let i=0;for(let r of e)i+=t(r);return i}(this.createChanges,e=>e.files?.length??0)}get draftVisibility(){return this.state?.create?.visibility??"public"}updated(e){e.has("state")&&(this.creationBusy=!1),e.has("generate")&&(this.generateBusy=!1,this.generateAiButton.scrollIntoView())}firstUpdated(){window.requestAnimationFrame(()=>{this.titleInput.focus()})}renderUserSelection(e){let t=e.pendingRole,i=new Map([["admin","admin"],["editor","can edit"],["viewer","can view"],["remove","un-invite"]]),r=i.get(t);return eC`
			<div class="user-selection">
				<div class="user-selection__avatar">
					<gl-avatar .src=${e.avatarUrl}></gl-avatar>
				</div>
				<div class="user-selection__info">
					<div class="user-selection__name">
						${e.member.name??e.member.username??"Unknown"}
					</div>
				</div>
				<div class="user-selection__actions">
					<gl-popover trigger="click" appearance="menu" ?arrow=${!1}>
						<gl-button slot="anchor">${r} <code-icon icon="chevron-down"></code-icon></gl-button>
						<menu-list slot="content">
							${function*(e,t){if(void 0!==e){let i=0;for(let r of e)yield t(r,i++)}}(i,([i,r])=>eC`<menu-item
										@click=${t=>this.onChangeSelectionRole(t,e,i)}
									>
										<code-icon
											icon="check"
											class="user-selection__check ${t===i?"is-active":""}"
										></code-icon>
										${r}
									</menu-item>`)}
						</menu-list>
					</gl-popover>
				</div>
			</div>
		`}renderUserSelectionList(){if(this.state?.create?.userSelections!=null&&this.state?.create?.userSelections.length!==0)return eC`
			<div class="message-input">
				<div class="user-selection-container scrollable">
					${ax(this.state.create.userSelections,e=>e.member.id,e=>this.renderUserSelection(e))}
				</div>
			</div>
		`}renderForm(){let e;switch(this.draftVisibility){case"private":e="organization";break;case"invite_only":e="lock";break;default:e="globe"}let t=this.review?"Code Suggestion":"Cloud Patch",i=this.review?"Code Suggestions":"Cloud Patches";return eC`
			<div class="section section--action">
				${eU(this.state?.create?.creationError!=null,()=>eC` <div class="alert alert--error">
							<code-icon icon="error"></code-icon>
							<p class="alert__content">${this.state.create.creationError}</p>
						</div>`)}
				${eU(!1===this.review,()=>eC`
						<div class="message-input message-input--group">
							<div class="message-input__select">
								<span class="message-input__select-icon"
									><code-icon icon=${e}></code-icon
								></span>
								<select
									id="visibility"
									class="message-input__control"
									@change=${this.onVisibilityChange}
								>
									<option value="public" ?selected=${"public"===this.draftVisibility}>
										Anyone with the link
									</option>
									<option value="private" ?selected=${"private"===this.draftVisibility}>
										Members of my Org with the link
									</option>
									<option value="invite_only" ?selected=${"invite_only"===this.draftVisibility}>
										Collaborators only
									</option>
								</select>
								<span class="message-input__select-caret"
									><code-icon icon="chevron-down"></code-icon
								></span>
							</div>
							<gl-button appearance="secondary" @click=${this.onInviteUsers}
								><code-icon icon="person-add" slot="prefix"></code-icon> Invite</gl-button
							>
						</div>
						${this.renderUserSelectionList()}
					`)}
				<div class="message-input message-input--with-menu">
					<input
						id="title"
						type="text"
						class="message-input__control"
						placeholder="Title (required)"
						maxlength="100"
						.value=${this.create.title??""}
						?disabled=${this.generateBusy}
						@input=${e=>this.onDebounceTitleInput(e)}
					/>
					${eU(this.state?.orgSettings.ai===!0&&this.state?.preferences.aiEnabled===!0,()=>eC`<div class="message-input__menu">
								<gl-button
									id="generate-ai"
									appearance="toolbar"
									density="compact"
									tooltip="Generate Title and Description..."
									@click=${e=>this.onGenerateTitleClick(e)}
									?disabled=${this.generateBusy}
									><code-icon
										icon=${this.generateBusy?"loading":"sparkle"}
										modifier="${this.generateBusy?"spin":""}"
									></code-icon
								></gl-button>
							</div>`)}
				</div>

				${eU(this.generate?.error!=null,()=>eC`
						<div class="alert alert--error">
							<code-icon icon="error"></code-icon>
							<p class="alert__content">${this.generate.error.message??"Error retrieving content"}</p>
						</div>
					`)}
				<div class="message-input">
					<textarea
						id="desc"
						class="message-input__control"
						placeholder="Description (optional)"
						maxlength="10000"
						.value=${this.create.description??""}
						?disabled=${this.generateBusy}
						@input=${e=>this.onDebounceDescriptionInput(e)}
					></textarea>
				</div>
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button ?disabled=${this.creationBusy} full @click=${e=>this.onCreateAll(e)}
							>Create ${t}</gl-button
						>
					</span>
				</p>
				${eU(!0===this.review,()=>eC`
						<p class="button-container">
							<span class="button-group button-group--single">
								<gl-button appearance="secondary" full @click=${()=>this.onCancel()}
									>Cancel</gl-button
								>
							</span>
						</p>
					`)}
				${eU(this.state?.orgSettings.byob===!1,()=>eC`<p class="h-deemphasize">
							<code-icon icon="lock"></code-icon>
							<a
								href="${dk.cloudPatches}"
								title="Learn more about ${i}"
								aria-label="Learn more about ${i}"
								>${i}</a
							>
							are
							<a
								href="https://help.gitkraken.com/gitlens/security"
								title="Learn more about GitKraken security"
								aria-label="Learn more about GitKraken security"
								>securely stored</a
							>
							by GitKraken.
						</p>`,()=>eC`<p class="h-deemphasize">
							<code-icon icon="info"></code-icon>
							Your
							<a
								href="${dk.cloudPatches}"
								title="Learn more about ${i}"
								aria-label="Learn more about ${i}"
								>${t}</a
							>
							will be securely stored in your organization's self-hosted storage
						</p>`)}
			</div>
		`}render(){return eC`
			<div class="pane-groups">
				<div class="pane-groups__group">${this.renderChangedFiles()}</div>
				<div class="pane-groups__group-fixed pane-groups__group--bottom">${this.renderForm()}</div>
			</div>
		`}renderChangedFiles(){return eC`
			<webview-pane class="h-no-border" expanded>
				<span slot="title">${this.review?"Changes to Suggest":"Changes to Include"}</span>
				<action-nav slot="actions">${this.renderLayoutAction(this.fileLayout)}</action-nav>

				${eU(null!=this.validityMessage,()=>eC`<div class="section">
							<div class="alert alert--error">
								<code-icon icon="error"></code-icon>
								<p class="alert__content">${this.validityMessage}</p>
							</div>
						</div>`)}
				<div class="change-list" data-region="files">
					${eU(null==this.create.changes,()=>this.renderLoading(),()=>this.renderTreeViewWithModel())}
				</div>
			</webview-pane>
		`}onTreeItemChecked(e){if(null==e.detail.context||e.detail.context.length<1)return;let[t,i]=e.detail.context,r=e.detail.checked;"unstaged"===i&&(r=!!e.detail.checked||"staged");let o=this.getChangeForRepo(t);null==o||o.checked!==r&&(o.checked=r,this.requestUpdate("state"),this.emit("gl-patch-create-repo-checked",{repoUri:t,checked:r}))}onTreeItemSelected(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-compare-previous",{...t})}renderTreeViewWithModel(){if(null==this.createChanges||0===this.createChanges.length)return this.renderTreeView([],"none","No changes");let e=[],t=this.createChanges.length>1,i=this.isTree(this.filesModified??0),r=this.isCompact;if(t)for(let t of this.createChanges){let o=this.getTreeForChange(t,!0,i,r);null!=o&&e.push(...o)}else{let t=this.createChanges[0],o=this.getTreeForChange(t,!1,i,r);null!=o&&e.push(...o)}return this.renderTreeView(e,this.state?.preferences?.indentGuides,"No changes")}getTreeForChange(e,t=!1,i=!1,r=!0){if(null==e.files||0===e.files.length)return;let o=[];if("wip"===e.type){let s=[],a=[];for(let t of e.files)t.staged?s.push(t):a.push(t);0===s.length||0===a.length?o.push(...this.renderFiles(e.files,i,r,t?2:1)):(a.length&&o.push({label:"Unstaged Changes",path:"",level:t?2:1,branch:!0,checkable:!0,expanded:!0,checked:!0===e.checked,context:[e.repository.uri,"unstaged"],children:this.renderFiles(a,i,r,t?3:2)}),s.length&&o.push({label:"Staged Changes",path:"",level:t?2:1,branch:!0,checkable:!0,expanded:!0,checked:!1!==e.checked,disableCheck:!0,children:this.renderFiles(s,i,r,t?3:2)}))}else o.push(...this.renderFiles(e.files,i,r));if(!t)return o;let s=this.repoToTreeModel(e.repository.name,e.repository.uri,{branch:!0,checkable:!0,checked:!1!==e.checked});return s.children=o,[s]}isTree(e){return"auto"===this.fileLayout?e>(this.state?.preferences?.files?.threshold??5):"tree"===this.fileLayout}createPatch(){if(!this.canSubmit){0===this.titleInput.value.length?(this.titleInput.setCustomValidity("Title is required"),this.titleInput.reportValidity(),this.titleInput.focus()):this.titleInput.setCustomValidity(""),null==this.selectedChanges||0===this.selectedChanges.length?this.validityMessage="Check at least one change":this.validityMessage=void 0;return}this.validityMessage=void 0,this.titleInput.setCustomValidity("");let e=this.selectedChanges.reduce((e,[t,i])=>(e[t]=i,e),{}),t={title:this.create.title??"",description:this.create.description,changesets:e,visibility:this.create.visibility,userSelections:this.create.userSelections};this.emit("gl-patch-create-patch",t)}onCreateAll(e){this.createPatch(),this.state?.create&&(this.creationBusy=!0)}onSelectCreateOption(e){}getChangeForRepo(e){return this.create.changes[e]}onTitleInput(e){this.create.title=this.titleInput.value,this.fireMetadataUpdate()}onDescriptionInput(e){this.create.description=this.descInput.value,this.fireMetadataUpdate()}onInviteUsers(e){this.emit("gl-patch-create-invite-users")}onChangeSelectionRole(e,t,i){this.emit("gl-patch-create-update-selection",{selection:t,role:i});let r=e.target?.closest("gl-popover");r?.hide()}onVisibilityChange(e){this.create.visibility=e.target.value,this.fireMetadataUpdate()}onGenerateTitleClick(e){this.generateBusy=!0,this.emit("gl-patch-generate-title",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}fireMetadataUpdate(){this.emit("gl-patch-create-update-metadata",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}createRenderRoot(){return this}onTreeItemActionClicked(e){if(e.detail.context&&e.detail.action)switch(e.detail.action.action){case"show-patch-in-graph":this.onShowInGraph(e);break;case"file-open":this.onOpenFile(e);break;case"file-stage":this.onStageFile(e);break;case"file-unstage":this.onUnstageFile(e)}}onOpenFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-open",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onStageFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-stage",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onUnstageFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-unstage",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onShowInGraph(e){}onCancel(){this.emit("gl-patch-create-cancelled")}getFileActions(e,t){let i={icon:"go-to-file",label:"Open File",action:"file-open"};return this.review?[i]:!0===e.staged?[i,{icon:"remove",label:"Unstage Changes",action:"file-unstage"}]:[i,{icon:"plus",label:"Stage Changes",action:"file-stage"}]}getRepoActions(e,t,i){return[{icon:"gl-graph",label:"Open in Commit Graph",action:"show-patch-in-graph"}]}};dI([eB({type:Object})],dT.prototype,"state",2),dI([eB({type:Boolean})],dT.prototype,"review",2),dI([eB({type:Object})],dT.prototype,"generate",2),dI([eF()],dT.prototype,"generateBusy",2),dI([eF()],dT.prototype,"creationBusy",2),dI([eq("#title")],dT.prototype,"titleInput",2),dI([eq("#desc")],dT.prototype,"descInput",2),dI([eq("#generate-ai")],dT.prototype,"generateAiButton",2),dI([eF()],dT.prototype,"validityMessage",2),dT=dI([eD("gl-patch-create")],dT);var dM=Object.defineProperty,dj=Object.getOwnPropertyDescriptor,dO=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dj(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dM(t,i,s),s};let dD=class extends GlElement{get patchCreateState(){return{preferences:this.preferences,orgSettings:this.orgSettings,create:this.createState}}render(){return eC`<gl-patch-create
			.state=${this.patchCreateState}
			.generate=${this.generate}
			review
			@gl-patch-file-compare-working=${e=>{}}
			@gl-patch-create-update-metadata=${e=>{}}
		></gl-patch-create>`}};dD.styles=[dv,F`
			:host {
				flex: 1;
			}

			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			a {
				color: var(--vscode-textLink-foreground);
				text-decoration: none;
			}
			a:hover {
				text-decoration: underline;
			}

			gl-patch-create {
				height: 100%;
				display: block;
			}

			.pane-groups {
				display: flex;
				flex-direction: column;
				height: 100%;
			}
			.pane-groups__group {
				min-height: 0;
				flex: 1 1 auto;
				display: flex;
				flex-direction: column;
				overflow: hidden;
			}
			.pane-groups__group webview-pane {
				flex: none;
			}
			.pane-groups__group webview-pane[expanded] {
				min-height: 0;
				flex: 1;
			}

			.pane-groups__group-fixed {
				flex: none;
			}
			.pane-groups__group-fixed webview-pane::part(content) {
				overflow: visible;
			}

			.section {
				padding: 0 var(--gitlens-scrollbar-gutter-width) 1.5rem var(--gitlens-gutter-width);
			}
			.section > :first-child {
				margin-top: 0;
			}
			.section > :last-child {
				margin-bottom: 0;
			}

			.section--action {
				border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
				padding-top: 1.5rem;
				padding-bottom: 1.5rem;
			}
			.section--action > :first-child {
				padding-top: 0;
			}

			/* TODO: these form styles should be moved to a common location */
			.message-input {
				padding-top: 0.8rem;
			}

			.message-input__control {
				flex: 1;
				border: 1px solid var(--vscode-input-border);
				background: var(--vscode-input-background);
				padding: 0.5rem;
				font-size: 1.3rem;
				line-height: 1.4;
				width: 100%;
				border-radius: 0.2rem;
				color: var(--vscode-input-foreground);
				font-family: inherit;
			}

			.message-input__control::placeholder {
				color: var(--vscode-input-placeholderForeground);
			}

			.message-input__control:invalid {
				border-color: var(--vscode-inputValidation-errorBorder);
				background-color: var(--vscode-inputValidation-errorBackground);
			}

			.message-input__control:focus {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.message-input__control:disabled {
				opacity: 0.4;
				cursor: not-allowed;
				pointer-events: none;
			}

			.message-input__control--text {
				overflow: hidden;
				white-space: nowrap;
				opacity: 0.7;
			}

			.message-input__action {
				flex: none;
			}

			.message-input__select {
				flex: 1;
				position: relative;
				display: flex;
				align-items: stretch;
			}
			.message-input__select-icon {
				position: absolute;
				left: 0;
				top: 0;
				display: flex;
				width: 2.4rem;
				height: 100%;
				align-items: center;
				justify-content: center;
				pointer-events: none;
				color: var(--vscode-foreground);
			}
			.message-input__select-caret {
				position: absolute;
				right: 0;
				top: 0;
				display: flex;
				width: 2.4rem;
				height: 100%;
				align-items: center;
				justify-content: center;
				pointer-events: none;
				color: var(--vscode-foreground);
			}

			.message-input__select .message-input__control {
				box-sizing: border-box;
				appearance: none;
				padding-left: 2.4rem;
				padding-right: 2.4rem;
			}

			.message-input__menu {
				position: absolute;
				top: 0.8rem;
				right: 0;
			}

			.section--action > :first-child .message-input__menu {
				top: 0;
			}

			.message-input--group {
				display: flex;
				flex-direction: row;
				align-items: stretch;
				gap: 0.6rem;
			}

			.message-input--with-menu {
				position: relative;
			}

			textarea.message-input__control {
				resize: vertical;
				min-height: 4rem;
				max-height: 40rem;
			}

			.user-selection-container {
				max-height: (2.4rem * 4);
				overflow: auto;
			}

			.user-selection {
				--gl-avatar-size: 2rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.4rem;
				height: 2.4rem;
			}
			.user-selection__avatar {
				flex: none;
			}

			.user-selection__info {
				flex: 1;
				min-width: 0;
				white-space: nowrap;
			}

			.user-selection__name {
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.user-selection__actions {
				flex: none;
				color: var(--gl-patch-ghost-color);
			}
			.user-selection__actions gl-button::part(base) {
				padding-right: 0;
				padding-block: 0.4rem;
			}

			.user-selection__actions gl-button code-icon {
				pointer-events: none;
			}

			.user-selection__check:not(.is-active) {
				opacity: 0;
			}

			.alert {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0.8rem 1.2rem;
				line-height: 1.2;
				background-color: var(--color-alert-errorBackground);
				border-left: 0.3rem solid var(--color-alert-errorBorder);
				color: var(--color-alert-foreground);
			}

			.alert code-icon {
				margin-right: 0.4rem;
				vertical-align: baseline;
			}

			.alert__content {
				font-size: 1.2rem;
				line-height: 1.2;
				text-align: left;
				margin: 0;
			}
		`],dO([eB({type:Object})],dD.prototype,"orgSettings",2),dO([eB({type:Object})],dD.prototype,"preferences",2),dO([eB({type:Object})],dD.prototype,"generate",2),dO([eB({type:Object})],dD.prototype,"createState",2),dD=dO([eD("gl-inspect-patch")],dD);var dL=Object.defineProperty,dB=Object.getOwnPropertyDescriptor,dF=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dB(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dL(t,i,s),s};let dN=class extends GlDetailsBase{constructor(){super(...arguments),this.experimentalComposerEnabled=!1,this.checkboxMode=!1,this.patchCreateMetadata={title:void 0,description:void 0}}get inReview(){return this.draftState?.inReview??!1}get isUnpublished(){let e=this.wip?.branch;return e?.upstream==null||!0===e.upstream.missing}get draftsEnabled(){return this.orgSettings?.drafts===!0}get filesCount(){return this.files?.length??0}get branchState(){let e=this.wip?.branch;if(null!=e)return{ahead:e.tracking?.ahead??0,behind:e.tracking?.behind??0}}get patchCreateState(){let e=this.wip,t=e.repo.uri,i={type:"wip",repository:{name:e.repo.name,path:e.repo.path,uri:e.repo.uri},revision:{to:na,from:"HEAD"},files:e.changes?.files??[],checked:!0};return{...this.patchCreateMetadata,changes:{[t]:i},creationError:void 0,visibility:"public",userSelections:void 0}}updated(e){super.updated(e),null!=this.wip&&e.has("generate")&&(this.patchCreateMetadata={title:this.generate?.title??this.patchCreateMetadata.title,description:this.generate?.description??this.patchCreateMetadata.description})}renderChangedFilesSlottedContent(){return"embedded"!==this.variant&&this.files?.length?eC`<div slot="before-tree" class="section section--actions">
			<button-container>
				<gl-button
					full
					.href=${nw("gitlens.composeCommits",{repoPath:this.wip?.repo.path,source:"inspect"})}
					><code-icon icon="wand" slot="prefix"></code-icon>Compose Commits...<span slot="tooltip"
						><strong>Compose Commits</strong> (Preview)<br /><i
							>Automatically or interactively organize changes into meaningful commits</i
						></span
					></gl-button
				>
				<gl-button appearance="secondary" href="command:workbench.view.scm" tooltip="Commit via SCM"
					><code-icon rotate="45" icon="arrow-up"></code-icon
				></gl-button>
			</button-container>
		</div>`:eA}renderSecondaryAction(e=!0){if(!this.draftsEnabled||this.inReview)return;let t="Share as Cloud Patch",i="create-patch",r=this.pullRequest;return r?.state==="opened"&&function(e,t){let i;return null==e&&null==t||null!=e&&null!=t&&0==(0===(i=(o??=new Intl.Collator(void 0,{sensitivity:"accent"})).compare(e,t))?0:i>0?1:-1)}(r.provider.domain,"github.com")?(this.inReview?(t="Close Suggestion for PR",i="end-patch-review"):(t="Suggest Changes for PR",i="start-patch-review"),(this.wip?.changes?.files.length??0)===0)?eC`
					<gl-button
						?full=${!e}
						appearance="secondary"
						data-action="${i}"
						@click=${()=>this.onToggleReviewMode(!this.inReview)}
						.tooltip=${e?t:void 0}
					>
						<code-icon icon="gl-code-suggestion" .slot=${!e?"prefix":eA}></code-icon
						>${!e?t:eA}
					</gl-button>
				`:eC`
				<gl-button
					?full=${!e}
					appearance="secondary"
					data-action="${i}"
					.tooltip=${e?t:void 0}
					@click=${()=>this.onToggleReviewMode(!this.inReview)}
				>
					<code-icon icon="gl-code-suggestion" .slot=${!e?"prefix":eA}></code-icon
					>${!e?t:eA}
				</gl-button>
				<gl-button
					appearance="secondary"
					density="compact"
					data-action="create-patch"
					tooltip="Share as Cloud Patch"
					@click=${()=>this.onDataActionClick("create-patch")}
				>
					<code-icon icon="gl-cloud-patch-share"></code-icon>
				</gl-button>
			`:(this.wip?.changes?.files.length??0)!==0?eC`
			<gl-button
				?full=${!e}
				appearance="secondary"
				data-action="${i}"
				.tooltip=${e?t:void 0}
				@click=${()=>this.onDataActionClick(i)}
			>
				<code-icon icon="gl-cloud-patch-share" .slot=${!e?"prefix":eA}></code-icon
				>${!e?t:eA}
			</gl-button>
		`:void 0}renderPrimaryAction(){if(this.isUnpublished)return eC`
				<gl-button full data-action="publish-branch" @click=${()=>this.onDataActionClick("publish-branch")}>
					<code-icon icon="cloud-upload" slot="prefix"></code-icon>Publish Branch<span slot="tooltip"
						>Publish (push) <strong>${this.wip?.branch?.name}</strong> to
						${this.wip?.branch?.upstream?.name??"a remote"}</span
					>
				</gl-button>
			`;if(null==this.branchState)return;let{ahead:e,behind:t}=this.branchState;if(0===e&&0===t)return;let i=t>0?"Pull":e>0?"Push":"Fetch";return eC`
			<gl-button
				full
				data-action="${i.toLowerCase()}"
				@click=${()=>this.onDataActionClick(i.toLowerCase())}
			>
				<code-icon icon="${t>0?"repo-pull":e>0?"repo-push":"repo-fetch"}" slot="prefix"></code-icon> ${i}
				<gl-tracking-pill .ahead=${e} .behind=${t} slot="suffix"></gl-tracking-pill>
				<span slot="tooltip">${t>0?"Pull from":e>0?"Push to":"Fetch from"} <strong>${this.wip?.branch?.upstream?.name}</strong></span>
			</gl-button>
		`}renderActions(){let e=this.renderPrimaryAction(),t=this.renderSecondaryAction(null!=e);return null==e&&null==t?eA:eC`<div class="section section--actions">
			<button-container>${e}${t}</button-container>
		</div>`}renderSuggestedChanges(){return this.codeSuggestions?.length?eC`
			<gl-tree>
				<gl-tree-item branch .expanded=${!0} .level=${0}>
					<code-icon slot="icon" icon="gl-code-suggestion"></code-icon>
					Code Suggestions
				</gl-tree-item>
				${ax(this.codeSuggestions,e=>e.id,e=>eC`
						<gl-tree-item
							.expanded=${!0}
							.level=${1}
							@gl-tree-item-selected=${()=>this.onShowCodeSuggestion(e.id)}
						>
							<gl-avatar
								class="author-icon"
								src="${e.author.avatarUri}"
								name="${e.author.name} (author)"
							></gl-avatar>
							${e.title}
							<span slot="description"
								><formatted-date .date=${new Date(e.updatedAt)}></formatted-date
							></span>
						</gl-tree-item>
					`)}
			</gl-tree>
		`:eA}renderPullRequest(){return null==this.pullRequest?eA:eC`
			<webview-pane
				collapsable
				flexible
				?expanded=${this.preferences?.pullRequestExpanded??!0}
				data-region="pullrequest-pane"
			>
				<span slot="title">Pull Request #${this.pullRequest?.id}</span>
				<action-nav slot="actions">
					<action-item
						label="Open Pull Request Changes"
						icon="diff-multiple"
						@click=${()=>this.onDataActionClick("open-pr-changes")}
					></action-item>
					<action-item
						label="Compare Pull Request"
						icon="compare-changes"
						@click=${()=>this.onDataActionClick("open-pr-compare")}
					></action-item>
					<action-item
						label="Open Pull Request on Remote"
						icon="globe"
						@click=${()=>this.onDataActionClick("open-pr-remote")}
					></action-item>
				</action-nav>
				<div class="section">
					<issue-pull-request
						type="pr"
						name="${this.pullRequest.title}"
						url="${this.pullRequest.url}"
						identifier="#${this.pullRequest.id}"
						status="${this.pullRequest.state}"
						.date=${this.pullRequest.updatedDate}
						.dateFormat="${this.preferences?.dateFormat}"
						.dateStyle="${this.preferences?.dateStyle}"
						details
					></issue-pull-request>
				</div>
				${this.renderSuggestedChanges()}
			</webview-pane>
		`}renderIncomingOutgoing(){return null==this.branchState||0===this.branchState.ahead&&0===this.branchState.behind?eA:eC`
			<webview-pane collapsable>
				<span slot="title">Incoming / Outgoing</span>
				<gl-tree>
					<gl-tree-item branch .expanded=${!1}>
						<code-icon slot="icon" icon="arrow-circle-down"></code-icon>
						Incoming Changes
						<span slot="decorations">${this.branchState.behind??0}</span>
					</gl-tree-item>
					<gl-tree-item branch .expanded=${!1}>
						<code-icon slot="icon" icon="arrow-circle-up"></code-icon>
						Outgoing Changes
						<span slot="decorations">${this.branchState.ahead??0}</span>
					</gl-tree-item>
				</gl-tree>
			</webview-pane>
		`}renderPatchCreation(){return this.inReview?eC`<gl-inspect-patch
			.orgSettings=${this.orgSettings}
			.preferences=${this.preferences}
			.generate=${this.generate}
			.createState=${this.patchCreateState}
			@gl-patch-create-patch=${e=>{this.dispatchEvent(new CustomEvent("gl-inspect-create-suggestions",{detail:e.detail}))}}
		></gl-inspect-patch>`:eA}render(){return null==this.wip?eA:"embedded"===this.variant?this.renderEmbedded():eC`
			${this.renderActions()} ${this.renderPausedOpStatus()}
			<webview-pane-group flexible>
				${this.renderPullRequest()}
				${eU(!1===this.inReview,()=>this.renderChangedFiles("wip"))}${this.renderPatchCreation()}
			</webview-pane-group>
		`}renderPausedOpStatus(){let e=this.wip?.changes?.pausedOpStatus;return null==e?eA:eC`<div class="paused-op">
			<gl-merge-rebase-status
				?conflicts=${this.wip?.changes?.hasConflicts??!1}
				.pausedOpStatus=${e}
			></gl-merge-rebase-status>
		</div>`}renderEmbedded(){return this.checkboxMode?eC`<div class="files">
				<webview-pane-group flexible> ${this.renderChangedFiles("wip")} </webview-pane-group>
			</div>`:eC`
			${this.renderEmbeddedHeader()}
			<div class="files">
				<webview-pane-group flexible> ${this.renderChangedFiles("wip")} </webview-pane-group>
			</div>
		`}renderChangedFiles(e){return eC`
			<gl-wip-tree-pane
				.files=${this.files}
				.preferences=${this.preferences}
				.collapsable=${this.filesCollapsable}
				?show-file-icons=${this.fileIcons}
				?checkable=${this.checkboxMode}
				.fileActions=${this._getFileActions}
				.fileContext=${this._getFileContext}
				.searchContext=${this.searchContext}
				.multiDiff=${this.getMultiDiffRefs()}
				@file-checked=${this._onFileChecked}
			>
				${this.renderChangedFilesSlottedContent()}
			</gl-wip-tree-pane>
		`}getMultiDiffRefs(){let e=this.wip?.repo?.path??this.files?.find(e=>e.repoPath)?.repoPath;if(e)return{repoPath:e,lhs:"HEAD",rhs:"",title:"Working Changes"}}onFileChecked(e){if(!e.detail.context)return;let[t]=e.detail.context,i=t.repoPath??this.wip?.repo?.path;if(!i)return;let r={path:t.path,repoPath:i,status:t.status,staged:t.staged};this.dispatchEvent(new CustomEvent(e.detail.checked?"file-stage":"file-unstage",{detail:r}))}renderEmbeddedHeader(){let e=this.wip;if(!e)return eA;let t=e.branch?.name,i=this.filesCount,r=this.files?.filter(e=>e.staged)?.length??0,o=i-r;return eC`<div class="header">
			<div class="header__identity">
				<code-icon class="header__wip-icon" icon="diff"></code-icon>
				<div class="header__identity-left">
					<span class="header__wip-title">Working Changes</span>
					<span class="header__wip-subtitle">
						${this.worktreePath?eC`<code-icon icon="folder"></code-icon> ${this.worktreePath}`:eC`${r>0||o>0?`${r} staged \xb7 ${o} unstaged`:"No changes"}`}
					</span>
				</div>
				<div class="header__identity-right">
					<div class="header__actions">
						<gl-action-chip
							icon="close"
							label="Close"
							overlay="tooltip"
							@click=${()=>this.dispatchEvent(new CustomEvent("close-details",{bubbles:!0,composed:!0}))}
						></gl-action-chip>
					</div>
				</div>
			</div>
			<div class="header__branch-row">
				${t?eC`<gl-branch-name
							class="header__branch-pill"
							appearance="pill"
							.name=${t}
						></gl-branch-name>`:eA}
				${i>0?eC`<commit-stats modified="${i}" symbol="icons" appearance="pill"></commit-stats>`:eA}
			</div>
			${this.renderPausedOpStatus()}
		</div>`}getFileActions(e,t){if(nH(e.status))return[{icon:"gl-diff-left",label:"Open Current Changes",action:"file-open-current"},{icon:"gl-diff-right",label:"Open Incoming Changes",action:"file-open-incoming"}];if(this.checkboxMode)return[];let i={icon:"plus",label:"Stage Changes",action:"file-stage"},r={icon:"remove",label:"Unstage Changes",action:"file-unstage"};return t?.mixed?[i,r]:!0===e.staged?[r]:[i]}getFileContext(e){if(this.wip?.repo?.path)return tH({webviewItem:e.staged?"gitlens:file+staged":"gitlens:file+unstaged",webviewItemValue:{type:"file",path:e.path,repoPath:this.wip.repo.path,sha:na,staged:e.staged,status:e.status}})}onDataActionClick(e){this.dispatchEvent(new CustomEvent("data-action",{detail:{name:e}}))}onToggleReviewMode(e){this.dispatchEvent(new CustomEvent("draft-state-changed",{detail:{inReview:e}}))}onShowCodeSuggestion(e){this.dispatchEvent(new CustomEvent("gl-show-code-suggestion",{detail:{id:e}}))}};dN.styles=[...nj,h9,F`
			:host {
				--gl-avatar-size: 1.6rem;
			}
		`],dF([eB({type:Object})],dN.prototype,"wip",2),dF([eB({type:Object})],dN.prototype,"pullRequest",2),dF([eB({type:Array})],dN.prototype,"codeSuggestions",2),dF([eB({type:Object})],dN.prototype,"draftState",2),dF([eB({type:Object})],dN.prototype,"generate",2),dF([eB({type:Boolean})],dN.prototype,"experimentalComposerEnabled",2),dF([eB({type:String,attribute:"worktree-path"})],dN.prototype,"worktreePath",2),dF([eB({type:Boolean,attribute:"checkbox-mode"})],dN.prototype,"checkboxMode",2),dF([eF()],dN.prototype,"inReview",1),dF([eF()],dN.prototype,"patchCreateMetadata",2),dN=dF([eD("gl-details-wip-panel")],dN);let dq=F`
	.commit-action {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: 2rem;
		border-radius: 0.25em;
		color: inherit;
		padding: 0.2rem;
		vertical-align: middle;
		text-decoration: none;
		gap: 0.2rem;
	}

	.commit-action > * {
		pointer-events: none;
	}

	.commit-action:focus {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: -1px;
	}

	.commit-action:hover {
		color: var(--vscode-foreground);
		text-decoration: none;
	}

	:host-context(.vscode-dark) .commit-action:hover,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .commit-action:hover {
		background-color: var(--color-background--lighten-15);
	}
	:host-context(.vscode-light) .commit-action:hover,
	:host-context(.vscode-high-contrast-light) .commit-action:hover {
		background-color: var(--color-background--darken-15);
	}

	:host-context(.vscode-dark) .commit-action.is-active,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .commit-action.is-active {
		background-color: var(--color-background--lighten-10);
	}
	:host-context(.vscode-light) .commit-action.is-active,
	:host-context(.vscode-high-contrast-light) .commit-action.is-active {
		background-color: var(--color-background--darken-10);
	}

	.commit-action.is-disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.commit-action.is-hidden {
		display: none;
	}

	.commit-action--emphasis-low:not(:hover, :focus, :active) {
		opacity: 0.5;
	}

	.pr--opened {
		color: var(--vscode-gitlens-openPullRequestIconColor);
	}
	.pr--closed {
		color: var(--vscode-gitlens-closedPullRequestIconColor);
	}
	.pr--merged {
		color: var(--vscode-gitlens-mergedPullRequestIconColor);
	}
`;var dU=Object.defineProperty,dW=Object.getOwnPropertyDescriptor,dH=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dW(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dU(t,i,s),s};let dV=class extends lit_element_i{constructor(){super(...arguments),this.pinned=!1,this.uncommitted=!1,this.shortSha=""}get navigationState(){if(null==this.navigation)return{back:!1,forward:!1};let e={back:!0,forward:!0};return this.navigation.count<=1?(e.back=!1,e.forward=!1):0===this.navigation.position?(e.back=!0,e.forward=!1):this.navigation.position===this.navigation.count-1&&(e.back=!1,e.forward=!0),e}handleAction(e){let t=e.target,i=t.dataset.action;if(null!=i)if("commit-actions"===i){let i=e instanceof MouseEvent&&e.altKey;this.fireEvent("commit-actions",{action:t.dataset.actionType,alt:i})}else this.fireEvent(i)}fireEvent(e,t){this.dispatchEvent(new CustomEvent(`gl-${e}`,{detail:t}))}render(){let e=this.pinned?eC`Unpin this Commit<br />Restores Automatic Following`:eC`Pin this Commit<br />Suspends Automatic Following`,t="Forward",i="Back";return this.navigation?.hint&&(this.pinned?i+=` - ${this.navigation.hint}`:t+=` - ${this.navigation.hint}`),eC`
			<div class="group">
				${eU(!this.uncommitted,()=>eC`
						<gl-tooltip>
							<a
								class="commit-action"
								href="#"
								data-action="commit-actions"
								data-action-type="sha"
								@click=${this.handleAction}
							>
								<code-icon
									icon="${null!=this.stashNumber?"gl-stashes-view":"git-commit"}"
								></code-icon>
								<span class="sha" data-region="shortsha"
									>${null!=this.stashNumber?`#${this.stashNumber}`:this.shortSha}</span
								>
							</a>
							<span slot="content"
								>Copy ${null!=this.stashNumber?"Stash Name":"SHA"}<br />[${nn()}]
								Copy Message</span
							>
						</gl-tooltip>
					`)}
			</div>
			<div class="group">
				<gl-tooltip
					><a
						class="commit-action${this.pinned?" is-active":""}"
						href="#"
						data-action="pin"
						@click=${this.handleAction}
						><code-icon
							icon="${this.pinned?"gl-pinned-filled":"pin"}"
							data-region="commit-pin"
						></code-icon></a
					><span slot="content">${e}</span></gl-tooltip
				>
				<gl-tooltip content="${i}"
					><a
						class="commit-action${this.navigationState.back?"":" is-disabled"}"
						aria-disabled="${this.navigationState.back?"false":"true"}"
						href="#"
						data-action="back"
						@click=${this.handleAction}
						><code-icon icon="arrow-left" data-region="commit-back"></code-icon></a
				></gl-tooltip>
				${eU(this.navigationState.forward,()=>eC`
						<gl-tooltip content="${t}"
							><a class="commit-action" href="#" data-action="forward" @click=${this.handleAction}
								><code-icon icon="arrow-right" data-region="commit-forward"></code-icon></a
						></gl-tooltip>
					`)}
				<!-- TODO: add a spacer -->
				${eU(this.uncommitted,()=>eC`
						<gl-tooltip content="Open SCM view"
							><a
								class="commit-action"
								href="#"
								data-action="commit-actions"
								data-action-type="scm"
								@click=${this.handleAction}
								><code-icon icon="source-control"></code-icon></a
						></gl-tooltip>
					`)}
				<gl-tooltip content="Open in Commit Graph"
					><a
						class="commit-action"
						href="#"
						data-action="commit-actions"
						data-action-type="graph"
						@click=${this.handleAction}
						><code-icon icon="gl-graph"></code-icon></a
				></gl-tooltip>
			</div>
		`}};dV.styles=[dq,F`
			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			:host {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				gap: 0.2rem;
			}

			:host([pinned]) {
				background-color: var(--color-alert-warningBackground);
				box-shadow: 0 0 0 0.1rem var(--color-alert-warningBorder);
				color: var(--color-alert-warningForeground);
				border-radius: 0.3rem;
			}

			:host([pinned]) .commit-action:hover,
			:host([pinned]) .commit-action.is-active {
				background-color: var(--color-alert-warningHoverBackground);
			}

			.group {
				display: flex;
				flex: none;
				flex-direction: row;
				max-width: 100%;
			}

			.group:last-child {
				margin-inline-start: auto;
			}

			.sha {
				margin: 0 0.5rem 0 0.25rem;
			}
		`],dH([eB({type:Boolean,reflect:!0})],dV.prototype,"pinned",2),dH([eB({type:Boolean})],dV.prototype,"uncommitted",2),dH([eB({type:Object})],dV.prototype,"navigation",2),dH([eB()],dV.prototype,"shortSha",2),dH([eB()],dV.prototype,"stashNumber",2),dV=dH([eD("gl-inspect-nav")],dV);var dK=Object.defineProperty,dG=Object.getOwnPropertyDescriptor,dZ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dG(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dK(t,i,s),s};let dY=class extends lit_element_i{render(){if(null==this.wip)return eA;let e=this.wip.changes,t=this.wip.branch;if(null==e||null==t)return eA;let i="git-pull-request";if(this.pullRequest?.state)switch(this.pullRequest.state){case"merged":i="git-merge";break;case"closed":i="git-pull-request-closed"}return eC`
			<div class="group">
				${eU(null!=this.pullRequest,()=>eC`<gl-popover hoist>
							<a href="#" class="commit-action" slot="anchor"
								><code-icon icon=${i} class="pr pr--${this.pullRequest.state}"></code-icon
								><span>#${this.pullRequest.id}</span></a
							>
							<div slot="content">
								<issue-pull-request
									type="pr"
									name="${this.pullRequest.title}"
									url="${this.pullRequest.url}"
									identifier="#${this.pullRequest.id}"
									status="${this.pullRequest.state}"
									.date=${this.pullRequest.updatedDate}
									.dateFormat="${this.preferences?.dateFormat}"
									.dateStyle="${this.preferences?.dateStyle}"
									details
								></issue-pull-request>
							</div>
						</gl-popover>`)}
				<gl-tooltip class="tooltip--overflowed">
					<a
						href="#"
						class="commit-action commit-action--overflowed"
						@click=${e=>this.handleAction(e,"switch")}
					>
						${eU(null==this.pullRequest,()=>eC`<code-icon icon="git-branch"></code-icon>`)}<span
							class="branch"
							>${t.name}</span
						><code-icon icon="chevron-down" size="10"></code-icon
					></a>
					<div slot="content">
						Switch to Another Branch...
						<hr />
						<code-icon icon="git-branch"></code-icon><span class="md-code">${this.wip.branch?.name}</span>
					</div>
				</gl-tooltip>
			</div>
			<div class="group">
				<gl-tooltip content="Fetch">
					<a href="#" class="commit-action" @click=${e=>this.handleAction(e,"fetch")}
						><code-icon icon="repo-fetch"></code-icon></a
				></gl-tooltip>
			</div>
		`}handleAction(e,t){let i=e instanceof MouseEvent&&e.altKey;this.dispatchEvent(new CustomEvent("gl-branch-action",{detail:{action:t,alt:i}}))}};dY.styles=[dq,F`
			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			:host {
				display: flex;
				flex-direction: row;
				/* flex-wrap: wrap; */
				align-items: center;
				justify-content: space-between;
				gap: 0.2rem;
			}

			.tooltip--overflowed {
				min-width: 0;
			}

			.commit-action--overflowed {
				width: 100%;
			}

			.branch {
				min-width: 0;
				max-width: fit-content;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.group {
				display: flex;
				flex: none;
				flex-direction: row;
				min-width: 0;
				max-width: 100%;
			}

			.group:first-child {
				min-width: 0;
				flex: 0 1 auto;
			}

			hr {
				border: none;
				border-top: 1px solid var(--color-foreground--25);
			}

			.md-code {
				background: var(--vscode-textCodeBlock-background);
				border-radius: 3px;
				padding: 0px 4px 2px 4px;
				font-family: var(--vscode-editor-font-family);
			}
		`],dZ([eB({type:Object})],dY.prototype,"wip",2),dZ([eB({type:Object})],dY.prototype,"pullRequest",2),dZ([eB({type:Object})],dY.prototype,"preferences",2),dY=dZ([eD("gl-status-nav")],dY);var dX=Object.defineProperty,dJ=Object.getOwnPropertyDescriptor,dQ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dJ(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dX(t,i,s),s};let d0="0000000000000000000000000000000000000000",d1=class extends SignalWatcherWebviewApp{constructor(){super(...arguments),this._host=p??=rk(),this._state=function(e){let{signal:t,persisted:i,resetAll:r,startAutoPersist:o,dispose:s}=function(e){let t,i=e?.storage,r=e?.version,o=e?.restoreKey;function s(){if(null==i)return;let t=i.get();if(null==t)return;let s=t.__v,a=t[r6];if(null==o||a===o)return null!=r&&s!==r&&(t=e?.migrate?.(t,s)??void 0),t}let a=s(),c=[],h=[],p=!1;function u(){if(p=!1,t?.getPending(),t?.watch(),null==i||0===h.length)return;let e={};for(let t of(null!=r&&(e.__v=r),null!=o&&(e[r6]=o),e[r7]=Date.now(),h))e[t.key]=t.serialize(t.signal.get());i.set(e)}function g(e){if(null!=e){for(let i of(t===e&&p&&u(),h))e.unwatch(i.signal);t===e&&(t=void 0)}}return{signal:function(e){let t=tN(e);return c.push(()=>t.set(e)),t},persisted:function(e,i,r){if(r8.has(e))throw Error(`Cannot use reserved key '${e}' for persisted signal`);let o=r?.deserialize,s=r?.serialize??(e=>e),c=t=>{if(null==t||!(e in t))return i;let r=t[e];if(null!=o){let e=o(r);return void 0!==e?e:i}return r},p=tN(c(a));return h.push({key:e,signal:p,serialize:s,reset:e=>{p.set(c(e))}}),null!=t&&t.watch(p),p},resetAll:function(){for(let e of c)e();let e=s();for(let t of h)t.reset(e)},startAutoPersist:function(){if(null==i)return()=>{};g(t);let e=new $.subtle.Watcher(()=>{p||(p=!0,queueMicrotask(u))});for(let i of(t=e,h))e.watch(i.signal);return()=>{g(e)}},dispose:function(){g(t),c.length=0,h.length=0}}}({storage:e,version:1}),a=t(!1),c=t(void 0),h=i("mode","commit"),p=i("pinned",!1),u=i("commitRef",void 0),g=t({count:0,position:0}),m=t(!1),f=t({inReview:!1}),b=t(void 0),v=t(void 0),_=t(void 0),w=t(void 0),x=r4({ai:!1,drafts:!1}),C=r4(!1),S=new SignalObjectImpl({hasIntegrationsConnected:!1,autolinksEnabled:!1,experimentalComposerEnabled:!1}),E=t(!1),A=t(void 0),P=t(void 0),T=t(void 0),M=t(void 0),j=t(void 0),O=t(void 0),D=tq(()=>g.get().position>0),B=tq(()=>{let e=g.get();return e.position<e.count-1}),F=tq(()=>{let e=b.get();return e?.sha==="0000000000000000000000000000000000000000"}),N=tq(()=>{let e=b.get();return e?.stashNumber!=null}),q=tq(()=>{let e=_.get();if(null==e)return;let t=e.branch;if(null==t)return;let i=e.changes,r=i?.files.length??0,o=t.tracking?.ahead??0,s=t.tracking?.behind??0;return{branch:e.repositoryCount>1?`${e.repo.name}:${t.name}`:t.name,upstream:t.upstream?.name,ahead:o,behind:s,working:e.changes?.files.length??0,status:s>0&&o>0?"both":s>0?"behind":o>0?"ahead":r>0?"working":void 0}});return{loading:a,error:c,mode:h,pinned:p,commitRef:u,navigationStack:g,inReview:m,draftState:f,currentCommit:b,searchContext:v,wipState:_,preferences:w,orgSettings:x,hasAccount:C,capabilities:S,hasRemotes:E,autolinks:A,formattedMessage:P,autolinkedIssues:T,pullRequest:M,signature:j,codeSuggestions:O,canNavigateBack:D,canNavigateForward:B,isUncommitted:F,isStash:N,wipStatus:q,resetAll:r,startAutoPersist:o,dispose:s}}(this._host.storage),this._rpc=new RpcController(this,{rpcOptions:{endpoint:()=>this._host.createEndpoint()},onReady:e=>this._onRpcReady(e),onError:e=>this._state.error.set(e.message)}),this._lastTelemetryContextStr="",this.indentPreference=16}createRenderRoot(){return this}connectedCallback(){super.connectedCallback?.();let e=this.context;this.context=void 0,this.initWebviewContext(e)}disconnectedCallback(){this._actions?.unwatchWip(),this._unsubscribeEvents?.(),this._unsubscribeEvents=void 0,this._stopAutoPersist?.(),this._stopAutoPersist=void 0,this._resources?.commit.dispose(),this._resources?.wip.dispose(),this._resources?.reachability.dispose(),this._resources?.explain.dispose(),this._resources?.generate.dispose(),this._resources=void 0,this._state.orgSettings.disconnect(),this._state.hasAccount.disconnect(),this._actions=void 0,this._state.resetAll(),super.disconnectedCallback?.()}async _onRpcReady(e){var t,i,r;let o=this._state,[s,a,c,h,p,u,g,m,f,b,v,_,w,x]=await Promise.all([e.inspect,e.repository,e.repositories,e.commands,e.config,e.storage,e.ai,e.autolinks,e.subscription,e.integrations,e.files,e.pullRequests,e.drafts,e.telemetry]),[$,C]=await Promise.all([f.orgSettingsState,f.hasAccountState]);o.orgSettings.connect($),o.hasAccount.connect(C);let S={commit:rV((e,t,i)=>s.getCommit(t,i,e)),wip:rV((e,t)=>s.getWipChanges(t,e)),reachability:rV(async e=>{let t=o.currentCommit.get();if(null!=t)return a.getCommitReachability(t.repoPath,t.sha,e)}),explain:rV(async(e,t)=>{let i=o.currentCommit.get();if(null!=i)try{let r=await s.explainCommit(i.repoPath,i.sha,t,e);if(r.error)return{error:{message:r.error.message??"Error retrieving content"}};return{result:r.result}}catch{return{error:{message:"Error retrieving content"}}}}),generate:rV(async e=>{let t=o.wipState.get()?.repo?.path??o.currentCommit.get()?.repoPath;if(null!=t)try{let i=await s.generateDescription(t,e);if(i.error)return{error:{message:i.error.message??"Error retrieving content"}};if(i.title||i.description)return{title:i.title,description:i.description};return}catch{return{error:{message:"Error retrieving content"}}}})};this._resources=S,this._actions=(t={inspect:s,drafts:w,repositories:c,repository:a,commands:h,config:p,storage:u,ai:g,autolinks:m,subscription:f,integrations:b,files:v,pullRequests:_,telemetry:x},new CommitDetailsActions(o,t,S)),this._stopAutoPersist=o.startAutoPersist(),this.setupDomListeners(),this._unsubscribeEvents=await (i={inspect:s,repositories:c,config:p,integrations:b},r=this._actions,r5([()=>i.inspect.onCommitSelected(e=>{var t,i,s;return t=o,i=e,s=r,void(t.pinned.get()&&i.passive||(t.searchContext.set(i.searchContext),"commit"===t.mode.get()&&s.fetchCommit(i.repoPath,i.sha)))}),()=>i.repositories.onRepositoryChanged(e=>(function(e,t,i){if("wip"===e.mode.get()){let r=e.wipState.get()?.repo?.path;t.repoPath===r&&t.changes.some(e=>"index"===e||"head"===e)&&i.fetchWipState(t.repoPath)}let r=e.currentCommit.get();r?.repoPath===t.repoPath&&t.changes.some(e=>"head"===e||"heads"===e)&&i.clearReachability()})(o,e,r)),()=>i.config.onConfigChanged(()=>{r.fetchPreferences()}),()=>i.integrations.onIntegrationsChanged(e=>{var t,i;return t=o,i=e.hasAnyConnected,void(t.capabilities.hasIntegrationsConnected=i)}),()=>i.inspect.onShowWip(e=>{var t,i,s;return t=o,i=e,s=r,void(t.mode.set("wip"),t.inReview.set(i.inReview),t.draftState.set({inReview:i.inReview}),s.fetchWipState(i.repoPath))})])),await this._actions.fetchInitialState(),this.updateDocumentProperties()}setupDomListeners(){let e=this._actions;if(null==e)return;let t=this._state,i=()=>{if("visible"!==document.visibilityState)return void e.cancelPendingRequests();if(!t.loading.get()){if("wip"===t.mode.get()){let i=t.wipState.get()?.repo?.path;null!=i&&e.fetchWipState(i);return}e.refetchCurrentCommit()}};document.addEventListener("visibilitychange",i),this.disposables.push({dispose:()=>document.removeEventListener("visibilitychange",i)}),this.disposables.push(C.on('[data-action="pick-commit"]',"click",()=>e.pickCommit()),C.on('[data-action="wip"]',"click",()=>e.switchMode("wip")),C.on('[data-action="details"]',"click",()=>e.switchMode("commit")),C.on('[data-action="search-commit"]',"click",()=>e.searchCommit()),C.on('[data-action="files-layout"]',"click",e=>this.onToggleFilesLayout(e)),C.on('[data-action="create-patch"]',"click",()=>this.onCreatePatchFromWip(!0)),C.on('[data-region="pullrequest-pane"]',"expanded-change",e=>this.onExpandedChange(e.detail,"pullrequest")),C.on('[data-action="switch-ai"]',"click",()=>e.executeCommand("gitlens.ai.switchProvider")))}updated(e){this.updateDocumentProperties(),this.pushTelemetryContext()}pushTelemetryContext(){let e,t=this._actions;if(null==t)return;let i=this._state;if("wip"===i.mode.get())e={"context.autolinks":0,"context.codeSuggestions":i.codeSuggestions.get()?.length??0};else{let t=i.currentCommit.get();e={"context.autolinks":i.autolinks.get()?.length??0,"context.type":t?.stashNumber!=null?"stash":null!=t?"commit":void 0,"context.uncommitted":i.isUncommitted.get()}}let r=JSON.stringify(e);r!==this._lastTelemetryContextStr&&(this._lastTelemetryContextStr=r,t.updateTelemetryContext(e))}updateDocumentProperties(){let e=this._state.preferences.get(),t=e?.indent;t===this.indentPreference||(this.indentPreference=t??16,document.documentElement.style.setProperty("--gitlens-tree-indent",`${this.indentPreference}px`))}renderTopInspect(){let e=this._actions,t=this._state,i=t.currentCommit.get();if(null==i)return eA;let r=t.navigationStack.get(),o=t.pinned.get();return eC`<gl-inspect-nav
			?uncommitted=${t.isUncommitted.get()}
			?pinned=${o}
			.navigation=${r}
			.shortSha=${i.shortSha??""}
			.stashNumber=${i.stashNumber}
			@gl-commit-actions=${e=>this.onCommitActions(e)}
			@gl-pin=${()=>e?.togglePin()}
			@gl-back=${()=>e?.navigateBack()}
			@gl-forward=${()=>e?.navigateForward()}
		></gl-inspect-nav>`}renderTopWip(){let e=this._actions,t=this._state,i=t.wipState.get(),r=t.preferences.get();return null==i?eA:eC`<gl-status-nav
			.wip=${i}
			.pullRequest=${t.pullRequest.get()}
			.preferences=${r}
			@gl-branch-action=${e=>this.onBranchAction(e.detail.action)}
			@gl-issue-pull-request-details=${()=>e?.openPullRequestDetails()}
		></gl-status-nav>`}renderRepoStatusContent(e){let t=this._state.wipStatus.get(),i=t?.status;return eC`
			<code-icon icon="gl-repository-filled"></code-icon>
			${eU(t?.status!=null,()=>eC`<gl-tracking-pill
						class="inspect-header__tab-tracking"
						.ahead=${t.ahead}
						.behind=${t.behind}
						.working=${t.working}
						outlined
					></gl-tracking-pill>`)}
			${eU(null!=i,()=>eC`<gl-indicator
						class="inspect-header__tab-indicator inspect-header__tab-indicator--${i}"
					></gl-indicator>`)}
		`}renderWipTooltipContent(){let e=this._state.wipStatus.get();return null==e?"Overview":eC`
			Overview of &nbsp;<code-icon icon="git-branch" size="12"></code-icon
			><span class="md-code">${e.branch}</span>
			${eU("both"===e.status,()=>eC`<hr />
						<span class="md-code">${e.branch}</span> is ${eQ("commit",e.behind)}
						behind and ${eQ("commit",e.ahead)} ahead of
						<span class="md-code">${e.upstream??"origin"}</span>`)}
			${eU("behind"===e.status,()=>eC`<hr />
						<span class="md-code">${e.branch}</span> is ${eQ("commit",e.behind)}
						behind <span class="md-code">${e.upstream??"origin"}</span>`)}
			${eU("ahead"===e.status,()=>eC`<hr />
						<span class="md-code">${e.branch}</span> is ${eQ("commit",e.ahead)}
						ahead of <span class="md-code"> ${e.upstream??"origin"}</span>`)}
			${eU(e.working>0,()=>eC`<hr />
						${eQ("working change",e.working)}`)}
		`}renderTopSection(){let e=this._state,t="wip"===e.mode.get(),i=e.currentCommit.get(),r=e.pinned.get();return eC`
			<div class="inspect-header">
				<nav class="inspect-header__tabs">
					<gl-tooltip>
						<button class="inspect-header__tab${!t?" is-active":""}" data-action="details">
							<code-icon icon="gl-inspect"></code-icon>
						</button>
						<span slot="content"
							>${null!=i?!e.isStash.get()?eC`Inspect Commit
											<span class="md-code"
												><code-icon icon="git-commit"></code-icon> ${i.shortSha}</span
											>`:eC`Inspect Stash
											<span class="md-code"
												><code-icon icon="gl-stashes-view"></code-icon>
												#${i.stashNumber}</span
											>`:"Inspect"}${r?eC`(pinned)
										<hr />
										Automatic following is suspended while pinned`:""}</span
						>
					</gl-tooltip>
					<gl-tooltip>
						<button class="inspect-header__tab${t?" is-active":""}" data-action="wip">
							${this.renderRepoStatusContent(t)}
						</button>
						<span slot="content">${this.renderWipTooltipContent()}</span>
					</gl-tooltip>
				</nav>
				<div class="inspect-header__content">
					${eU(!t,()=>this.renderTopInspect(),()=>this.renderTopWip())}
				</div>
			</div>
		`}render(){var e;let t=this._actions,i=this._state,r=this._resources,o=i.mode.get(),s=i.currentCommit.get(),a=i.wipState.get(),c=i.preferences.get(),h=i.orgSettings.get(),p=r?.explain.value.get(),u=r?.generate.value.get(),g=r?.reachability.value.get(),m="success"===(e=r?.reachability.status.get()??"idle")?"loaded":e,f=i.searchContext.get(),b=i.draftState.get(),v=i.capabilities.experimentalComposerEnabled;return eC`
			<div class="commit-detail-panel scrollable">
				<gl-error-banner .error=${i.error}></gl-error-banner>
				${this.renderTopSection()}
				<main id="main" tabindex="-1">
					${eU("commit"===o,()=>eC`<gl-details-commit-panel
								variant="embedded"
								file-icons
								?panel-actions=${!1}
								.commit=${s}
								.loading=${r?.commit.loading.get()??!1}
								.files=${s?.files}
								.preferences=${c}
								.orgSettings=${h}
								.isUncommitted=${i.isUncommitted.get()}
								.filesCollapsable=${!1}
								.autolinksEnabled=${i.capabilities.autolinksEnabled}
								.autolinks=${i.autolinks.get()}
								.formattedMessage=${i.formattedMessage.get()}
								.autolinkedIssues=${i.autolinkedIssues.get()}
								.pullRequest=${i.pullRequest.get()}
								.signature=${i.signature.get()}
								.hasAccount=${i.hasAccount.get()}
								.hasIntegrationsConnected=${i.capabilities.hasIntegrationsConnected}
								.hasRemotes=${i.hasRemotes.get()}
								.explain=${p}
								.searchContext=${f}
								.reachability=${g}
								.reachabilityState=${m}
								.branchName=${s?.stashOnRef??this.getCommitBranchName(g)}
								.aiEnabled=${h?.ai!==!1}
								@gl-stash-apply=${e=>t?.executeCommand("gitlens.stashesApply",e.detail)}
								@explain-commit=${e=>void t?.explainCommit(e.detail?.prompt)}
								@load-reachability=${()=>void t?.loadReachability()}
								@refresh-reachability=${()=>t?.refreshReachability()}
								@open-on-remote=${e=>t?.openOnRemote(s?.repoPath,e.detail.sha)}
								@change-files-layout=${e=>t?.changeFilesLayout(e.detail.layout)}
								@file-open-on-remote=${e=>t?.openFileOnRemote(e.detail)}
								@file-open=${e=>t?.openFile(e.detail,e.detail.showOptions)}
								@file-compare-working=${e=>t?.openFileCompareWorking(e.detail,e.detail.showOptions)}
								@file-compare-previous=${e=>t?.openFileComparePrevious(e.detail,e.detail.showOptions)}
								@file-more-actions=${e=>t?.executeFileAction(e.detail,e.detail.showOptions)}
								@open-multiple-changes=${e=>t?.openMultipleChanges(e.detail)}
							></gl-details-commit-panel>`,()=>eC`<gl-details-wip-panel
								.experimentalComposerEnabled=${v}
								.wip=${a}
								.pullRequest=${i.pullRequest.get()}
								.codeSuggestions=${i.codeSuggestions.get()}
								.files=${a?.changes?.files}
								.preferences=${c}
								.orgSettings=${h}
								.generate=${u}
								.isUncommitted=${!0}
								.emptyText=${"No working changes"}
								.draftState=${b}
								@draft-state-changed=${e=>t?.changeReviewMode(e.detail.inReview)}
								@create-patch=${e=>this.onCreatePatchFromWip(e.detail.checked)}
								@file-open=${e=>t?.openFile(e.detail,e.detail.showOptions)}
								@file-compare-previous=${e=>t?.openFileComparePrevious(e.detail,e.detail.showOptions)}
								@file-stage=${e=>t?.stageFile(e.detail)}
								@file-unstage=${e=>t?.unstageFile(e.detail)}
								@data-action=${e=>this.onBranchAction(e.detail.name)}
								@gl-inspect-create-suggestions=${e=>t?.suggestChanges(e.detail)}
								@gl-patch-generate-title=${()=>void t?.generateDescription()}
								@gl-show-code-suggestion=${e=>{let r=i.codeSuggestions.get()?.find(t=>t.id===e.detail.id);r&&t?.showCodeSuggestion(r)}}
								@gl-patch-file-compare-previous=${e=>t?.openFileComparePrevious(e.detail,e.detail.showOptions)}
								@gl-patch-file-open=${e=>t?.openFile(e.detail,e.detail.showOptions)}
								@gl-patch-file-stage=${e=>t?.stageFile(e.detail)}
								@gl-patch-file-unstage=${e=>t?.unstageFile(e.detail)}
								@gl-patch-create-cancelled=${()=>t?.changeReviewMode(!1)}
								@open-multiple-changes=${e=>t?.openMultipleChanges(e.detail)}
							></gl-details-wip-panel>`)}
				</main>
			</div>
		`}getCommitBranchName(e){if(!e?.refs?.length)return;let t=e.refs.filter(e=>"branch"===e.refType),i=t.find(e=>e.current);return i?i.name:t.length>0?t[0].name:void 0}onBranchAction(e){this._actions?.handleBranchAction(e)}onCreatePatchFromWip(e=!0){let t=this._state.wipState.get();t?.changes!=null&&this._actions?.createPatchFromWip(t.changes,e)}onToggleFilesLayout(e){let t=e.target?.dataset.filesLayout??void 0,i=this._state.preferences.get();if(i?.files==null||t===i.files.layout)return;let r={...i.files,layout:t??"auto"};this._actions?.updateFilesLayout(r)}onExpandedChange(e,t){"pullrequest"===t&&this._actions?.updatePullRequestExpanded(e.expanded)}onCommitActions(e){null!=this._state.currentCommit.get()&&this._actions?.executeCommitAction(e.detail.action,e.detail.alt)}};dQ([eB({type:String,noAccessor:!0})],d1.prototype,"context",2),d1=dQ([eD("gl-commit-details-app")],d1);export{d1 as GlCommitDetailsApp,d0 as uncommittedSha};