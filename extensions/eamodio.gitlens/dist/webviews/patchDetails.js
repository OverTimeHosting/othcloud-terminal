let t,i,r,s,o,n,a,c,h,p;var u,g,f,m,b,_,v,y,w={379(t){function i(t){if("string"!=typeof t)throw TypeError("Path must be a string. Received "+JSON.stringify(t))}function r(t,i){for(var r,s="",o=0,n=-1,a=0,c=0;c<=t.length;++c){if(c<t.length)r=t.charCodeAt(c);else if(47===r)break;else r=47;if(47===r){if(n===c-1||1===a);else if(n!==c-1&&2===a){if(s.length<2||2!==o||46!==s.charCodeAt(s.length-1)||46!==s.charCodeAt(s.length-2)){if(s.length>2){var h=s.lastIndexOf("/");if(h!==s.length-1){-1===h?(s="",o=0):o=(s=s.slice(0,h)).length-1-s.lastIndexOf("/"),n=c,a=0;continue}}else if(2===s.length||1===s.length){s="",o=0,n=c,a=0;continue}}i&&(s.length>0?s+="/..":s="..",o=2)}else s.length>0?s+="/"+t.slice(n+1,c):s=t.slice(n+1,c),o=c-n-1;n=c,a=0}else 46===r&&-1!==a?++a:a=-1}return s}var s={resolve:function(){for(var t,s,o="",n=!1,a=arguments.length-1;a>=-1&&!n;a--)a>=0?s=arguments[a]:(void 0===t&&(t=process.cwd()),s=t),i(s),0!==s.length&&(o=s+"/"+o,n=47===s.charCodeAt(0));if(o=r(o,!n),n)if(o.length>0)return"/"+o;else return"/";return o.length>0?o:"."},normalize:function(t){if(i(t),0===t.length)return".";var s=47===t.charCodeAt(0),o=47===t.charCodeAt(t.length-1);return(0!==(t=r(t,!s)).length||s||(t="."),t.length>0&&o&&(t+="/"),s)?"/"+t:t},isAbsolute:function(t){return i(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var t,r=0;r<arguments.length;++r){var o=arguments[r];i(o),o.length>0&&(void 0===t?t=o:t+="/"+o)}return void 0===t?".":s.normalize(t)},relative:function(t,r){if(i(t),i(r),t===r||(t=s.resolve(t))===(r=s.resolve(r)))return"";for(var o=1;o<t.length&&47===t.charCodeAt(o);++o);for(var n=t.length,a=n-o,c=1;c<r.length&&47===r.charCodeAt(c);++c);for(var h=r.length-c,p=a<h?a:h,u=-1,g=0;g<=p;++g){if(g===p){if(h>p){if(47===r.charCodeAt(c+g))return r.slice(c+g+1);else if(0===g)return r.slice(c+g)}else a>p&&(47===t.charCodeAt(o+g)?u=g:0===g&&(u=0));break}var f=t.charCodeAt(o+g);if(f!==r.charCodeAt(c+g))break;47===f&&(u=g)}var m="";for(g=o+u+1;g<=n;++g)(g===n||47===t.charCodeAt(g))&&(0===m.length?m+="..":m+="/..");return m.length>0?m+r.slice(c+u):(c+=u,47===r.charCodeAt(c)&&++c,r.slice(c))},_makeLong:function(t){return t},dirname:function(t){if(i(t),0===t.length)return".";for(var r=t.charCodeAt(0),s=47===r,o=-1,n=!0,a=t.length-1;a>=1;--a)if(47===(r=t.charCodeAt(a))){if(!n){o=a;break}}else n=!1;return -1===o?s?"/":".":s&&1===o?"//":t.slice(0,o)},basename:function(t,r){if(void 0!==r&&"string"!=typeof r)throw TypeError('"ext" argument must be a string');i(t);var s,o=0,n=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=t.length){if(r.length===t.length&&r===t)return"";var c=r.length-1,h=-1;for(s=t.length-1;s>=0;--s){var p=t.charCodeAt(s);if(47===p){if(!a){o=s+1;break}}else -1===h&&(a=!1,h=s+1),c>=0&&(p===r.charCodeAt(c)?-1==--c&&(n=s):(c=-1,n=h))}return o===n?n=h:-1===n&&(n=t.length),t.slice(o,n)}for(s=t.length-1;s>=0;--s)if(47===t.charCodeAt(s)){if(!a){o=s+1;break}}else -1===n&&(a=!1,n=s+1);return -1===n?"":t.slice(o,n)},extname:function(t){i(t);for(var r=-1,s=0,o=-1,n=!0,a=0,c=t.length-1;c>=0;--c){var h=t.charCodeAt(c);if(47===h){if(!n){s=c+1;break}continue}-1===o&&(n=!1,o=c+1),46===h?-1===r?r=c:1!==a&&(a=1):-1!==r&&(a=-1)}return -1===r||-1===o||0===a||1===a&&r===o-1&&r===s+1?"":t.slice(r,o)},format:function(t){var i,r;if(null===t||"object"!=typeof t)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return i=t.dir||t.root,r=t.base||(t.name||"")+(t.ext||""),i?i===t.root?i+r:i+"/"+r:r},parse:function(t){i(t);var r,s={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return s;var o=t.charCodeAt(0),n=47===o;n?(s.root="/",r=1):r=0;for(var a=-1,c=0,h=-1,p=!0,u=t.length-1,g=0;u>=r;--u){if(47===(o=t.charCodeAt(u))){if(!p){c=u+1;break}continue}-1===h&&(p=!1,h=u+1),46===o?-1===a?a=u:1!==g&&(g=1):-1!==a&&(g=-1)}return -1===a||-1===h||0===g||1===g&&a===h-1&&a===c+1?-1!==h&&(0===c&&n?s.base=s.name=t.slice(1,h):s.base=s.name=t.slice(c,h)):(0===c&&n?(s.name=t.slice(1,a),s.base=t.slice(1,h)):(s.name=t.slice(c,a),s.base=t.slice(c,h)),s.ext=t.slice(a,h)),c>0?s.dir=t.slice(0,c-1):n&&(s.dir="/"),s},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,t.exports=s},90(t,i,r){r.d(i,{FlowLayout:()=>FlowLayout,flow:()=>o}),r.r(i);let SizeCache=class SizeCache{constructor(t){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,t?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(t,i){let r=this._map.get(t)||0;this._map.set(t,i),this.totalSize+=i-r}get averageSize(){if(this._map.size>0){let t=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(t):t}return 0}getSize(t){return this._map.get(t)}clear(){this._map.clear(),this.totalSize=0}};function s(t){return"horizontal"===t?"width":"height"}let BaseLayout=class BaseLayout{_getDefaultConfig(){return{direction:"vertical"}}constructor(t,i){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=t,Promise.resolve().then(()=>this.config=i||this._getDefaultConfig())}set config(t){Object.assign(this,Object.assign({},this._getDefaultConfig(),t))}get config(){return{direction:this.direction}}get items(){return this._items}set items(t){this._setItems(t)}_setItems(t){t!==this._items&&(this._items=t,this._scheduleReflow())}get direction(){return this._direction}set direction(t){(t="horizontal"===t?t:"vertical")!==this._direction&&(this._direction=t,this._sizeDim="horizontal"===t?"width":"height",this._secondarySizeDim="horizontal"===t?"height":"width",this._positionDim="horizontal"===t?"left":"top",this._secondaryPositionDim="horizontal"===t?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(t){let{_viewDim1:i,_viewDim2:r}=this;Object.assign(this._viewportSize,t),r!==this._viewDim2?this._scheduleLayoutUpdate():i!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(t){Object.assign(this._latestCoords,t);let i=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(i-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(t=!1){(t||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(t){this._pin=t,this._triggerReflow()}get pin(){if(null!==this._pin){let{index:t,block:i}=this._pin;return{index:Math.max(0,Math.min(t,this.items.length-1)),block:i}}return null}_clampScrollPosition(t){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(t,this.totalScrollSize[s(this.direction)]-this._viewDim1))}unpin(){null!==this._pin&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(null!==this.pin){let t=this._scrollPosition,{index:i,block:r}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:i,block:r||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=t-this._scrollPosition}}_calculateScrollIntoViewPosition(t){let{block:i}=t,r=Math.min(this.items.length,Math.max(0,t.index)),s=this._getItemPosition(r)[this._positionDim],o=s;if("start"!==i){let t=this._getItemSize(r)[this._sizeDim];if("center"===i)o=s-.5*this._viewDim1+.5*t;else{let r=s-this._viewDim1+t;if("end"===i)o=r;else{let t=this._scrollPosition;o=Math.abs(t-s)<Math.abs(t-r)?s:r}}}return o+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(o)}getScrollIntoViewCoordinates(t){return{[this._positionDim]:this._calculateScrollIntoViewPosition(t)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let t=new Map;if(-1!==this._first&&-1!==this._last)for(let i=this._first;i<=this._last;i++)t.set(i,this._getItemPosition(i));let i={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:t};this._scrollError&&(i.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(i)}get _num(){return -1===this._first||-1===this._last?0:this._last-this._first+1}_checkThresholds(){if(0===this._viewDim1&&this._num>0||null!==this._pin)this._scheduleReflow();else{let t=Math.max(0,this._scrollPosition-this._overhang),i=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>t||this._physicalMax<i?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(t){if(-1===this._first||-1===this._last)return;let i=this._first;for(;i<this._last&&Math.round(this._getItemPosition(i)[this._positionDim]+this._getItemSize(i)[this._sizeDim])<=Math.round(this._scrollPosition);)i++;let r=this._last;for(;r>this._first&&Math.round(this._getItemPosition(r)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)r--;(i!==this._firstVisible||r!==this._lastVisible)&&(this._firstVisible=i,this._lastVisible=r,t&&t.emit&&this._sendVisibilityChangedMessage())}};let o=t=>Object.assign({type:FlowLayout},t);function n(t){return"horizontal"===t?"marginLeft":"marginTop"}let MetricsCache=class MetricsCache{constructor(){this._childSizeCache=new SizeCache,this._marginSizeCache=new SizeCache,this._metricsCache=new Map}update(t,i){let r=new Set;for(let o of(Object.keys(t).forEach(o=>{let n=Number(o);this._metricsCache.set(n,t[n]),this._childSizeCache.set(n,t[n][s(i)]),r.add(n),r.add(n+1)}),r)){let t=this._metricsCache.get(o)?.[n(i)]||0,r=this._metricsCache.get(o-1)?.["horizontal"===i?"marginRight":"marginBottom"]||0;this._marginSizeCache.set(o,function(t,i){let r=[t,i].sort();return r[1]<=0?Math.min(...r):r[0]>=0?Math.max(...r):r[0]+r[1]}(t,r))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(t,i){return this._metricsCache.get(t)?.[n(i)]||0}getChildSize(t){return this._childSizeCache.getSize(t)}getMarginSize(t){return this._marginSizeCache.getSize(t)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}};let FlowLayout=class FlowLayout extends BaseLayout{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new MetricsCache,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(t){this._metricsCache.update(t,this.direction),this._scheduleReflow()}_getPhysicalItem(t){return this._newPhysicalItems.get(t)??this._physicalItems.get(t)}_getSize(t){return this._getPhysicalItem(t)&&this._metricsCache.getChildSize(t)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(t){let i=this._metricsCache;if(-1===this._first||-1===this._last)return i.averageMarginSize+t*(i.averageMarginSize+this._getAverageSize());if(t<this._first){let r=this._first-t;return this._getPhysicalItem(this._first).pos-(i.getMarginSize(this._first-1)||i.averageMarginSize)-(r*i.averageChildSize+(r-1)*i.averageMarginSize)}{let r=t-this._last;return this._getPhysicalItem(this._last).pos+(i.getChildSize(this._last)||i.averageChildSize)+(i.getMarginSize(this._last)||i.averageMarginSize)+r*(i.averageChildSize+i.averageMarginSize)}}_getPosition(t){let i=this._getPhysicalItem(t),{averageMarginSize:r}=this._metricsCache;return 0===t?this._metricsCache.getMarginSize(0)??r:i?i.pos:this._estimatePosition(t)}_calculateAnchor(t,i){return t<=0?0:i>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((t+i)/2/this._delta)))}_getAnchor(t,i){if(0===this._physicalItems.size||this._first<0||this._last<0)return this._calculateAnchor(t,i);let r=this._getPhysicalItem(this._first),s=this._getPhysicalItem(this._last),o=r.pos;if(s.pos+this._metricsCache.getChildSize(this._last)<t||o>i)return this._calculateAnchor(t,i);let n=this._firstVisible-1,a=-1/0;for(;a<t;)a=this._getPhysicalItem(++n).pos+this._metricsCache.getChildSize(n);return n}_getActiveItems(){0===this._viewDim1||0===this.items.length?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let t=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=t,this._stable=!0}_getItems(){let t,i,r=this._newPhysicalItems;if(this._stable=!0,null!==this.pin){let{index:t}=this.pin;this._anchorIdx=t,this._anchorPos=this._getPosition(t)}if(t=this._scrollPosition-this._overhang,(i=this._scrollPosition+this._viewDim1+this._overhang)<0||t>this._scrollSize)return void this._clearItems();(null===this._anchorIdx||null===this._anchorPos)&&(this._anchorIdx=this._getAnchor(t,i),this._anchorPos=this._getPosition(this._anchorIdx));let s=this._getSize(this._anchorIdx);void 0===s&&(this._stable=!1,s=this._getAverageSize());let o=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,n=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;0===this._anchorIdx&&(this._anchorPos=o),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-n-s);let a=0;for(this._anchorPos+s+n<t&&(a=t-(this._anchorPos+s+n)),this._anchorPos-o>i&&(a=i-(this._anchorPos-o)),a&&(this._scrollPosition-=a,t-=a,i-=a,this._scrollError+=a),r.set(this._anchorIdx,{pos:this._anchorPos,size:s}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-o,this._physicalMax=this._anchorPos+s+n;this._physicalMin>t&&this._first>0;){let t=this._getSize(--this._first);void 0===t&&(this._stable=!1,t=this._getAverageSize());let i=this._metricsCache.getMarginSize(this._first);void 0===i&&(this._stable=!1,i=this._metricsCache.averageMarginSize),this._physicalMin-=t;let s=this._physicalMin;if(r.set(this._first,{pos:s,size:t}),this._physicalMin-=i,!1===this._stable&&!1===this._estimate)break}for(;this._physicalMax<i&&this._last<this.items.length-1;){let t=this._getSize(++this._last);void 0===t&&(this._stable=!1,t=this._getAverageSize());let i=this._metricsCache.getMarginSize(this._last);void 0===i&&(this._stable=!1,i=this._metricsCache.averageMarginSize);let s=this._physicalMax;if(r.set(this._last,{pos:s,size:t}),this._physicalMax+=t+i,!this._stable&&!this._estimate)break}let c=this._calculateError();c&&(this._physicalMin-=c,this._physicalMax-=c,this._anchorPos-=c,this._scrollPosition-=c,r.forEach(t=>t.pos-=c),this._scrollError+=c),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=r)}_calculateError(){return 0===this._first?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:t,_last:i}=this;super._reflow(),(-1===this._first&&-1==this._last||this._first===t&&this._last===i)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:t}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(t+this._getAverageSize())+t)}get _delta(){let{averageMarginSize:t}=this._metricsCache;return this._getAverageSize()+t}_getItemPosition(t){return{[this._positionDim]:this._getPosition(t),[this._secondaryPositionDim]:0,["horizontal"===this.direction?"xOffset":"yOffset"]:-(this._metricsCache.getLeadingMarginValue(t,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(t){return{[this._sizeDim]:this._getSize(t)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}}},x={};function C(t){var i=x[t];if(void 0!==i)return i.exports;var r=x[t]={exports:{}};return w[t](r,r.exports,C),r.exports}function $(t,i,r){let s,o,n,a,c,h,p,u,g,f,m=0;null!=r&&({edges:h,maxWait:p,cancellation:u,aggregator:g}=r);let b="leading"===(h??="trailing")||"both"===h,_="trailing"===h||"both"===h;function v(){if(null!=s){m=Date.now();let i=s,r=f;return f=void 0,s=void 0,n=t.apply(r,i)}}function y(){null!=a&&(clearTimeout(a),a=void 0)}function w(){null!=c&&(clearTimeout(c),c=void 0)}function x(){y(),w(),f=void 0,s=void 0,o=void 0,m=0}function C(...t){if(u?.aborted)return;let r=Date.now();null!=g&&null!=s?s=g(s,t):(f=this,s=t);let h=null==a&&null==c;o=r,y();let w=Date.now();if(o=w,a=setTimeout(()=>{a=void 0,function t(){let r,s,n=Date.now();if(r=n-(o??0),s=n-m,null==o||r>=i||r<0||null!=p&&s>=p){_&&v(),x();return}a=setTimeout(()=>{a=void 0,t()},i-(n-(o??0)))}()},i),null!=p&&!c){0===m&&(m=w);let t=p-(w-m);t>0?c=setTimeout(()=>{c=void 0,_&&null!=s&&v(),m=Date.now()},t):(_&&null!=s&&v(),x())}return b&&h?v():n}return C.cancel=x,C.flush=function(){return y(),w(),v()},C.pending=function(){return null!=a||null!=c},u?.addEventListener("abort",x,{once:!0}),C}C.d=(t,i)=>{for(var r in i)C.o(i,r)&&!C.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:i[r]})},C.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),C.r=t=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},Object.defineProperty(C,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(t){}});let IpcCall=class IpcCall{constructor(t,i,r=!1){this.scope=t,this.reset=r,this.method=`${t}/${i}`}is(t){return t.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(t,i,r){super(t,i,r),this.response=new IpcNotification(this.scope,`${i}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let E="patchDetails",A=new IpcCommand(E,"apply"),T=new IpcCommand(E,"archive"),P=new IpcCommand(E,"create");new IpcCommand(E,"openInGraph");let j=new IpcCommand(E,"checked"),M=new IpcCommand(E,"selectRepo"),O=new IpcCommand(E,"selectBase"),D=new IpcCommand(E,"file/actions/execute"),B=new IpcCommand(E,"file/open"),F=new IpcCommand(E,"file/openOnRemote"),N=new IpcCommand(E,"file/compareWorking"),U=new IpcCommand(E,"file/comparePrevious"),q=new IpcCommand(E,"preferences/update"),V=new IpcCommand(E,"switchMode"),K=new IpcCommand(E,"cloud/copyLink"),W=new IpcCommand(E,"local/createPatch"),G=new IpcCommand(E,"create/repository/check"),X=new IpcCommand(E,"update/create/metadata"),Q=new IpcCommand(E,"update/draft/metadata"),Y=new IpcCommand(E,"update/draft/permissions"),J=new IpcCommand(E,"update/users"),ee=new IpcCommand(E,"update/userSelection"),et=new IpcRequest(E,"explain"),ei=new IpcRequest(E,"generate"),er=new IpcNotification(E,"didChange",!0),es=new IpcNotification(E,"create/didChange"),eo=new IpcNotification(E,"draft/didChange"),en=new IpcNotification(E,"preferences/didChange"),ea=new IpcNotification(E,"draft/didChangeRepository");new IpcNotification(E,"org/settings/didChange");let el=new IpcRequest("core","webview/ready"),ec=new IpcCommand("core","webview/focus/changed"),eh=new IpcCommand("core","command/execute"),ed=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let ep=new IpcCommand("core","telemetry/sendEvent"),eu=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let eg=new IpcCommand("core","webview/focus/didChange"),ef=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let context_request_event_s=class context_request_event_s extends Event{constructor(t,i,r,s){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=i,this.callback=r,this.subscribe=s??!1}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,i=!1){let r=i||!Object.is(t,this.o);this.o=t,r&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(let[t,{disposer:i}]of this.subscriptions)t(this.o,i)},void 0!==t&&(this.value=t)}addCallback(t,i,r){if(!r)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:i});let{disposer:s}=this.subscriptions.get(t);t(this.value,s)}clearCallbacks(){this.subscriptions.clear()}};let e=class e extends Event{constructor(t,i){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=i}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(t,i,r){super(void 0!==i.context?i.initialValue:r),this.onContextRequest=t=>{if(t.context!==this.context)return;let i=t.contextTarget??t.composedPath()[0];i!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,i,t.subscribe))},this.onProviderRequest=t=>{if(t.context!==this.context||(t.contextTarget??t.composedPath()[0])===this.host)return;let i=new Set;for(let[t,{consumerHost:r}]of this.subscriptions)i.has(t)||(i.add(t),r.dispatchEvent(new context_request_event_s(this.context,r,t,!0)));t.stopPropagation()},this.host=t,void 0!==i.context?this.context=i.context:this.context=i,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new e(this.context,this.host))}};function em({context:t}){return(i,r)=>{let s=new WeakMap;if("object"==typeof r)return{get(){return i.get.call(this)},set(t){return s.get(this).setValue(t),i.set.call(this,t)},init(i){return s.set(this,new context_provider_i(this,{context:t,initialValue:i})),i}};{let o;i.constructor.addInitializer(i=>{s.set(i,new context_provider_i(i,{context:t}))});let n=Object.getOwnPropertyDescriptor(i,r);if(void 0===n){let t=new WeakMap;o={get(){return t.get(this)},set(i){s.get(this).setValue(i),t.set(this,i)},configurable:!0,enumerable:!0}}else{let t=n.set;o={...n,set(i){s.get(this).setValue(i),t?.call(this,i)}}}return void Object.defineProperty(i,r,o)}}}var eb=Object.defineProperty,e_=(t,i,r)=>{let s;return(s="symbol"!=typeof i?i+"":i)in t?eb(t,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[s]=r,r},ev=(t,i)=>{if(Object(i)!==i)throw TypeError('Cannot use the "in" operator on this value');return t.has(i)},ey=(t,i,r)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,r)},ew=(t,i,r)=>{if(!i.has(t))throw TypeError("Cannot access private method");return r};function ek(t,i){return Object.is(t,i)}let ex=null,eC=!1,e$=1,eE=Symbol("SIGNAL");function eS(t){let i=ex;return ex=t,i}let eA={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ez(t){if(eC)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===ex)return;ex.consumerOnSignalRead(t);let i=ex.nextProducerIndex++;eP(ex),i<ex.producerNode.length&&ex.producerNode[i]!==t&&eT(ex)&&eI(ex.producerNode[i],ex.producerIndexOfThis[i]),ex.producerNode[i]!==t&&(ex.producerNode[i]=t,ex.producerIndexOfThis[i]=eT(ex)?function t(i,r,s){var o;if(ej(i),eP(i),0===i.liveConsumerNode.length){null==(o=i.watched)||o.call(i.wrapper);for(let r=0;r<i.producerNode.length;r++)i.producerIndexOfThis[r]=t(i.producerNode[r],i,r)}return i.liveConsumerIndexOfThis.push(s),i.liveConsumerNode.push(r)-1}(t,ex,i):0),ex.producerLastReadVersion[i]=t.version}function eI(t,i){var r;if(ej(t),eP(t),"u">typeof ngDevMode&&ngDevMode&&i>=t.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${i} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(1===t.liveConsumerNode.length){null==(r=t.unwatched)||r.call(t.wrapper);for(let i=0;i<t.producerNode.length;i++)eI(t.producerNode[i],t.producerIndexOfThis[i])}let s=t.liveConsumerNode.length-1;if(t.liveConsumerNode[i]=t.liveConsumerNode[s],t.liveConsumerIndexOfThis[i]=t.liveConsumerIndexOfThis[s],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,i<t.liveConsumerNode.length){let r=t.liveConsumerIndexOfThis[i],s=t.liveConsumerNode[i];eP(s),s.producerIndexOfThis[r]=i}}function eT(t){var i;return t.consumerIsAlwaysLive||((null==(i=null==t?void 0:t.liveConsumerNode)?void 0:i.length)??0)>0}function eP(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function ej(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function eR(t){if(function t(i){if(i.dirty||i.lastCleanEpoch!==e$){if(!i.producerMustRecompute(i)&&!function(i){eP(i);for(let r=0;r<i.producerNode.length;r++){let s=i.producerNode[r],o=i.producerLastReadVersion[r];if(o!==s.version||(t(s),o!==s.version))return!0}return!1}(i)){i.dirty=!1,i.lastCleanEpoch=e$;return}i.producerRecomputeValue(i),i.dirty=!1,i.lastCleanEpoch=e$}}(t),ez(t),t.value===eO)throw t.error;return t.value}let eM=Symbol("UNSET"),eL=Symbol("COMPUTING"),eO=Symbol("ERRORED"),eD={...eA,value:eM,dirty:!0,error:null,equal:ek,producerMustRecompute:t=>t.value===eM||t.value===eL,producerRecomputeValue(t){let i;if(t.value===eL)throw Error("Detected cycle in computations.");let r=t.value;t.value=eL;let s=(t&&(t.nextProducerIndex=0),eS(t)),o=!1;try{i=t.computation.call(t.wrapper),o=r!==eM&&r!==eO&&t.equal.call(t.wrapper,r,i)}catch(r){i=eO,t.error=r}finally{if(eS(s),t&&void 0!==t.producerNode&&void 0!==t.producerIndexOfThis&&void 0!==t.producerLastReadVersion){if(eT(t))for(let i=t.nextProducerIndex;i<t.producerNode.length;i++)eI(t.producerNode[i],t.producerIndexOfThis[i]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}if(o){t.value=r;return}t.value=i,t.version++}},eB=function(){throw Error()};function eF(){return ez(this),this.value}let eN={...eA,equal:ek,value:void 0},eU=Symbol("node");(t=>{var i,r,s,o;let State=class State{constructor(s,o={}){let n,a;ey(this,r),e_(this,i);let c=((n=Object.create(eN)).value=s,(a=()=>(ez(n),n.value))[eE]=n,a)[eE];if(this[eU]=c,c.wrapper=this,o){let i=o.equals;i&&(c.equal=i),c.watched=o[t.subtle.watched],c.unwatched=o[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return eF.call(this[eU])}set(i){var r,s;if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(eC)throw Error("Writes to signals not permitted during Watcher callback");r=this[eU],(null==ex?void 0:ex.consumerAllowSignalWrites)===!1&&eB(),r.equal.call(r.wrapper,r.value,i)||(r.value=i,s=r,s.version++,e$++,function t(i){if(void 0===i.liveConsumerNode)return;let r=eC;eC=!0;try{for(let r of i.liveConsumerNode)r.dirty||function(i){var r;i.dirty=!0,t(i),null==(r=i.consumerMarkedDirty)||r.call(i.wrapper??i)}(r)}finally{eC=r}}(s))}};i=eU,r=new WeakSet,t.isState=t=>"object"==typeof t&&ev(r,t),t.State=State;let Computed=class Computed{constructor(i,r){let n,a;ey(this,o),e_(this,s);let c=((n=Object.create(eD)).computation=i,(a=()=>eR(n))[eE]=n,a)[eE];if(c.consumerAllowSignalWrites=!0,this[eU]=c,c.wrapper=this,r){let i=r.equals;i&&(c.equal=i),c.watched=r[t.subtle.watched],c.unwatched=r[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return eR(this[eU])}};s=eU,o=new WeakSet,t.isComputed=t=>"object"==typeof t&&ev(o,t),t.Computed=Computed,(i=>{var r,s,o,n;i.untrack=function(t){let i,r=null;try{r=eS(null),i=t()}finally{eS(r)}return i},i.introspectSources=function(i){var r;if(!(0,t.isComputed)(i)&&!(0,t.isWatcher)(i))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(r=i[eU].producerNode)?void 0:r.map(t=>t.wrapper))??[]},i.introspectSinks=function(i){var r;if(!(0,t.isComputed)(i)&&!(0,t.isState)(i))throw TypeError("Called introspectSinks without a Signal argument");return(null==(r=i[eU].liveConsumerNode)?void 0:r.map(t=>t.wrapper))??[]},i.hasSinks=function(i){if(!(0,t.isComputed)(i)&&!(0,t.isState)(i))throw TypeError("Called hasSinks without a Signal argument");let r=i[eU].liveConsumerNode;return!!r&&r.length>0},i.hasSources=function(i){if(!(0,t.isComputed)(i)&&!(0,t.isWatcher)(i))throw TypeError("Called hasSources without a Computed or Watcher argument");let r=i[eU].producerNode;return!!r&&r.length>0};let Watcher=class Watcher{constructor(t){ey(this,s),ey(this,o),e_(this,r);let i=Object.create(eA);i.wrapper=this,i.consumerMarkedDirty=t,i.consumerIsAlwaysLive=!0,i.consumerAllowSignalWrites=!1,i.producerNode=[],this[eU]=i}watch(...i){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");ew(this,o,n).call(this,i);let r=this[eU];r.dirty=!1;let s=eS(r);for(let t of i)ez(t[eU]);eS(s)}unwatch(...i){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");ew(this,o,n).call(this,i);let r=this[eU];eP(r);for(let t=r.producerNode.length-1;t>=0;t--)if(i.includes(r.producerNode[t].wrapper)){eI(r.producerNode[t],r.producerIndexOfThis[t]);let i=r.producerNode.length-1;if(r.producerNode[t]=r.producerNode[i],r.producerIndexOfThis[t]=r.producerIndexOfThis[i],r.producerNode.length--,r.producerIndexOfThis.length--,r.nextProducerIndex--,t<r.producerNode.length){let i=r.producerIndexOfThis[t],s=r.producerNode[t];ej(s),s.liveConsumerIndexOfThis[i]=t}}}getPending(){if(!(0,t.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[eU].producerNode.filter(t=>t.dirty).map(t=>t.wrapper)}};r=eU,s=new WeakSet,o=new WeakSet,n=function(i){for(let r of i)if(!(0,t.isComputed)(r)&&!(0,t.isState)(r))throw TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=t=>ev(s,t),i.Watcher=Watcher,i.currentComputed=function(){var t;return null==(t=ex)?void 0:t.wrapper},i.watched=Symbol("watched"),i.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(b||(b={}));let eq=!1,eH=new b.subtle.Watcher(()=>{eq||(eq=!0,queueMicrotask(()=>{for(let t of(eq=!1,eH.getPending()))t.get();eH.watch()}))}),eV=Symbol("SignalWatcherBrand"),eK=(new FinalizationRegistry(t=>{t.unwatch(...b.subtle.introspectSources(t))}),new WeakMap,t=>(...i)=>({_$litDirective$:t,values:i}));let directive_i=class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,r){this._$Ct=t,this._$AM=i,this._$Ci=r}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};let eW=globalThis,eG=t=>t,eZ=eW.trustedTypes,eX=eZ?eZ.createPolicy("lit-html",{createHTML:t=>t}):void 0,eQ="$lit$",eY=`lit$${Math.random().toFixed(9).slice(2)}$`,eJ="?"+eY,e0=`<${eJ}>`,e1=document,e2=()=>e1.createComment(""),e3=t=>null===t||"object"!=typeof t&&"function"!=typeof t,e5=Array.isArray,e4=t=>e5(t)||"function"==typeof t?.[Symbol.iterator],e7=`[ 	
\x0c\r]`,e6=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,e8=/-->/g,e9=/>/g,te=RegExp(`>|${e7}(?:([^\\s"'>=/]+)(${e7}*=${e7}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tt=/'/g,ti=/"/g,tr=/^(?:script|style|textarea|title)$/i,ts=t=>(i,...r)=>({_$litType$:t,strings:i,values:r}),to=ts(1),tn=ts(2),ta=(ts(3),Symbol.for("lit-noChange")),tl=Symbol.for("lit-nothing"),tc=new WeakMap,th=e1.createTreeWalker(e1,129);function td(t,i){if(!e5(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==eX?eX.createHTML(i):i}let tp=(t,i)=>{let r=t.length-1,s=[],o,n=2===i?"<svg>":3===i?"<math>":"",a=e6;for(let i=0;i<r;i++){let r=t[i],c,h,p=-1,u=0;for(;u<r.length&&(a.lastIndex=u,null!==(h=a.exec(r)));)u=a.lastIndex,a===e6?"!--"===h[1]?a=e8:void 0!==h[1]?a=e9:void 0!==h[2]?(tr.test(h[2])&&(o=RegExp("</"+h[2],"g")),a=te):void 0!==h[3]&&(a=te):a===te?">"===h[0]?(a=o??e6,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?te:'"'===h[3]?ti:tt):a===ti||a===tt?a=te:a===e8||a===e9?a=e6:(a=te,o=void 0);let g=a===te&&t[i+1].startsWith("/>")?" ":"";n+=a===e6?r+e0:p>=0?(s.push(c),r.slice(0,p)+eQ+r.slice(p)+eY+g):r+eY+(-2===p?i:g)}return[td(t,n+(t[r]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),s]};let S=class S{constructor({strings:t,_$litType$:i},r){let s;this.parts=[];let o=0,n=0,a=t.length-1,c=this.parts,[h,p]=tp(t,i);if(this.el=S.createElement(h,r),th.currentNode=this.el.content,2===i||3===i){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=th.nextNode())&&c.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(let t of s.getAttributeNames())if(t.endsWith(eQ)){let i=p[n++],r=s.getAttribute(t).split(eY),a=/([.?@])?(.*)/.exec(i);c.push({type:1,index:o,name:a[2],strings:r,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),s.removeAttribute(t)}else t.startsWith(eY)&&(c.push({type:6,index:o}),s.removeAttribute(t));if(tr.test(s.tagName)){let t=s.textContent.split(eY),i=t.length-1;if(i>0){s.textContent=eZ?eZ.emptyScript:"";for(let r=0;r<i;r++)s.append(t[r],e2()),th.nextNode(),c.push({type:2,index:++o});s.append(t[i],e2())}}}else if(8===s.nodeType)if(s.data===eJ)c.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(eY,t+1));)c.push({type:7,index:o}),t+=eY.length-1}o++}}static createElement(t,i){let r=e1.createElement("template");return r.innerHTML=t,r}};function tu(t,i,r=t,s){if(i===ta)return i;let o=void 0!==s?r._$Co?.[s]:r._$Cl,n=e3(i)?void 0:i._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t))._$AT(t,r,s),void 0!==s?(r._$Co??=[])[s]=o:r._$Cl=o),void 0!==o&&(i=tu(t,o._$AS(t,i.values),o,s)),i}let R=class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:i},parts:r}=this._$AD,s=(t?.creationScope??e1).importNode(i,!0);th.currentNode=s;let o=th.nextNode(),n=0,a=0,c=r[0];for(;void 0!==c;){if(n===c.index){let i;2===c.type?i=new k(o,o.nextSibling,this,t):1===c.type?i=new c.ctor(o,c.name,c.strings,this,t):6===c.type&&(i=new Z(o,this,t)),this._$AV.push(i),c=r[++a]}n!==c?.index&&(o=th.nextNode(),n++)}return th.currentNode=e1,s}p(t){let i=0;for(let r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,i),i+=r.strings.length-2):r._$AI(t[i])),i++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,r,s){this.type=2,this._$AH=tl,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){e3(t=tu(this,t,i))?t===tl||null==t||""===t?(this._$AH!==tl&&this._$AR(),this._$AH=tl):t!==this._$AH&&t!==ta&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):e4(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==tl&&e3(this._$AH)?this._$AA.nextSibling.data=t:this.T(e1.createTextNode(t)),this._$AH=t}$(t){let{values:i,_$litType$:r}=t,s="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=S.createElement(td(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(i);else{let t=new R(s,this),r=t.u(this.options);t.p(i),this.T(r),this._$AH=t}}_$AC(t){let i=tc.get(t.strings);return void 0===i&&tc.set(t.strings,i=new S(t)),i}k(t){e5(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,r,s=0;for(let o of t)s===i.length?i.push(r=new k(this.O(e2()),this.O(e2()),this,this.options)):r=i[s],r._$AI(o),s++;s<i.length&&(this._$AR(r&&r._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){let i=eG(t).nextSibling;eG(t).remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,r,s,o){this.type=1,this._$AH=tl,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=o,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=tl}_$AI(t,i=this,r,s){let o=this.strings,n=!1;if(void 0===o)(n=!e3(t=tu(this,t,i,0))||t!==this._$AH&&t!==ta)&&(this._$AH=t);else{let s,a,c=t;for(t=o[0],s=0;s<o.length-1;s++)(a=tu(this,c[r+s],i,s))===ta&&(a=this._$AH[s]),n||=!e3(a)||a!==this._$AH[s],a===tl?t=tl:t!==tl&&(t+=(a??"")+o[s+1]),this._$AH[s]=a}n&&!s&&this.j(t)}j(t){t===tl?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===tl?void 0:t}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==tl)}};let z=class z extends H{constructor(t,i,r,s,o){super(t,i,r,s,o),this.type=5}_$AI(t,i=this){if((t=tu(this,t,i,0)??tl)===ta)return;let r=this._$AH,s=t===tl&&r!==tl||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==tl&&(r===tl||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};let Z=class Z{constructor(t,i,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){tu(this,t)}};let tg=eW.litHtmlPolyfillSupport;tg?.(S,k),(eW.litHtmlVersions??=[]).push("3.3.2");let{I:tf}={M:eQ,P:eY,A:eJ,C:1,L:tp,R,D:e4,V:tu,I:k,H,N:L,U:z,B:I,F:Z},tm=t=>t,tb=(t,i,r)=>{let s=t._$AA.parentNode,o=void 0===i?t._$AB:i._$AA;if(void 0===r)r=new tf(s.insertBefore(document.createComment(""),o),s.insertBefore(document.createComment(""),o),t,t.options);else{let i=r._$AB.nextSibling,n=r._$AM,a=n!==t;if(a){let i;r._$AQ?.(t),r._$AM=t,void 0!==r._$AP&&(i=t._$AU)!==n._$AU&&r._$AP(i)}if(i!==o||a){let t=r._$AA;for(;t!==i;){let i=tm(t).nextSibling;tm(s).insertBefore(t,o),t=i}}}return r},t_=(t,i,r=t)=>(t._$AI(i,r),t),tv={},ty=t=>{t._$AR(),t._$AA.remove()},tw=(t,i)=>{let r=t._$AN;if(void 0===r)return!1;for(let t of r)t._$AO?.(i,!1),tw(t,i);return!0},tk=t=>{let i,r;do{if(void 0===(i=t._$AM))break;(r=i._$AN).delete(t),t=i}while(0===r?.size)},tx=t=>{for(let i;i=t._$AM;t=i){let r=i._$AN;if(void 0===r)i._$AN=r=new Set;else if(r.has(t))break;r.add(t),tE(i)}};function tC(t){void 0!==this._$AN?(tk(this),this._$AM=t,tx(this)):this._$AM=t}function t$(t,i=!1,r=0){let s=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(i)if(Array.isArray(s))for(let t=r;t<s.length;t++)tw(s[t],!1),tk(s[t]);else null!=s&&(tw(s,!1),tk(s));else tw(this,t)}let tE=t=>{2==t.type&&(t._$AP??=t$,t._$AQ??=tC)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,r){super._$AT(t,i,r),tx(this),this.isConnected=t._$AU}_$AO(t,i=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),i&&(tw(this,t),tk(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{let i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}};let tS=!1,tA=new b.subtle.Watcher(async()=>{tS||(tS=!0,queueMicrotask(()=>{for(let t of(tS=!1,tA.getPending()))t.get();tA.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var t,i;void 0===this._$Sm&&(this._$Sj=new b.Computed(()=>{var t;let i=null==(t=this._$SW)?void 0:t.get();return this.setValue(i),i}),this._$Sm=null!=(i=null==(t=this._$Sk)?void 0:t.h)?i:tA,this._$Sm.watch(this._$Sj),b.subtle.untrack(()=>{var t;return null==(t=this._$Sj)?void 0:t.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return b.subtle.untrack(()=>t.get())}update(t,[i]){var r;return null!=this._$Sk||(this._$Sk=null==(r=t.options)?void 0:r.host),i!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=i,this._$S_(),b.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tz=eK(watch_r),tI=t=>(i,...r)=>t(i,...r.map(t=>t instanceof b.State||t instanceof b.Computed?tz(t):t));tI(to),tI(tn),b.State,b.Computed;let tT=globalThis,tP=tT.ShadowRoot&&(void 0===tT.ShadyCSS||tT.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tj=Symbol(),tR=new WeakMap;let css_tag_n=class css_tag_n{constructor(t,i,r){if(this._$cssResult$=!0,r!==tj)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o,i=this.t;if(tP&&void 0===t){let r=void 0!==i&&1===i.length;r&&(t=tR.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&tR.set(i,t))}return t}toString(){return this.cssText}};let tM=t=>new css_tag_n("string"==typeof t?t:t+"",void 0,tj),tL=(t,...i)=>new css_tag_n(1===t.length?t[0]:i.reduce((i,r,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]),t,tj),tO=tP?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(let r of t.cssRules)i+=r.cssText;return tM(i)})(t):t,{is:tD,defineProperty:tB,getOwnPropertyDescriptor:tF,getOwnPropertyNames:tN,getOwnPropertySymbols:tU,getPrototypeOf:tq}=Object,tH=globalThis,tV=tH.trustedTypes,tK=tV?tV.emptyScript:"",tW=tH.reactiveElementPolyfillSupport,tG={toAttribute(t,i){switch(i){case Boolean:t=t?tK:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let r=t;switch(i){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},tZ=(t,i)=>!tD(t,i),tX={attribute:!0,type:String,converter:tG,reflect:!1,useDefault:!1,hasChanged:tZ};Symbol.metadata??=Symbol("metadata"),tH.litPropertyMetadata??=new WeakMap;let reactive_element_y=class reactive_element_y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=tX){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,i);void 0!==s&&tB(this.prototype,t,s)}}static getPropertyDescriptor(t,i,r){let{get:s,set:o}=tF(this.prototype,t)??{get(){return this[i]},set(t){this[i]=t}};return{get:s,set(i){let n=s?.call(this);o?.call(this,i),this.requestUpdate(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??tX}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=tq(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let i of[...tN(t),...tU(t)])this.createProperty(i,t[i])}let t=this[Symbol.metadata];if(null!==t){let i=litPropertyMetadata.get(t);if(void 0!==i)for(let[t,r]of i)this.elementProperties.set(t,r)}for(let[t,i]of(this._$Eh=new Map,this.elementProperties)){let r=this._$Eu(t,i);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let i=[];if(Array.isArray(t))for(let r of new Set(t.flat(1/0).reverse()))i.unshift(tO(r));else void 0!==t&&i.push(tO(t));return i}static _$Eu(t,i){let r=i.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let i of this.constructor.elementProperties.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(tP)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let r of i){let i=document.createElement("style"),s=tT.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,r){this._$AK(t,r)}_$ET(t,i){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(void 0!==s&&!0===r.reflect){let o=(void 0!==r.converter?.toAttribute?r.converter:tG).toAttribute(i,r.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,i){let r=this.constructor,s=r._$Eh.get(t);if(void 0!==s&&this._$Em!==s){let t=r.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:tG;this._$Em=s;let n=o.fromAttribute(i,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,i,r,s=!1,o){if(void 0!==t){let n=this.constructor;if(!1===s&&(o=this[t]),!(((r??=n.getPropertyOptions(t)).hasChanged??tZ)(o,i)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,i,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,i,{useDefault:r,reflect:s,wrapped:o},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??i??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||r||(i=void 0),this._$AL.set(t,i)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,i]of this._$Ep)this[t]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,r]of t){let{wrapped:t}=r,s=this[i];!0!==t||this._$AL.has(i)||void 0===s||this.C(i,void 0,r,s)}}let t=!1,i=this._$AL;try{(t=this.shouldUpdate(i))?(this.willUpdate(i),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(i)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};reactive_element_y.elementStyles=[],reactive_element_y.shadowRootOptions={mode:"open"},reactive_element_y.elementProperties=new Map,reactive_element_y.finalized=new Map,tW?.({ReactiveElement:reactive_element_y}),(tH.reactiveElementVersions??=[]).push("2.1.2");let tQ=globalThis;let lit_element_i=class lit_element_i extends reactive_element_y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,r)=>{let s=r?.renderBefore??i,o=s._$litPart$;if(void 0===o){let t=r?.renderBefore??null;s._$litPart$=o=new k(i.insertBefore(e2(),t),t,void 0,r??{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ta}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,tQ.litElementHydrateSupport?.({LitElement:lit_element_i});let tY=tQ.litElementPolyfillSupport;tY?.({LitElement:lit_element_i}),(tQ.litElementVersions??=[]).push("4.2.2");let tJ=t=>(i,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,i)}):customElements.define(t,i)},t0={attribute:!0,type:String,converter:tG,reflect:!1,hasChanged:tZ};function t1(t){return(i,r)=>{let s;return"object"==typeof r?((t=t0,i,r)=>{let{kind:s,metadata:o}=r,n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(r.name,t),"accessor"===s){let{name:s}=r;return{set(r){let o=i.get.call(this);i.set.call(this,r),this.requestUpdate(s,o,t,!0,r)},init(i){return void 0!==i&&this.C(s,void 0,t,i),i}}}if("setter"===s){let{name:s}=r;return function(r){let o=this[s];i.call(this,r),this.requestUpdate(s,o,t,!0,r)}}throw Error("Unsupported decorator location: "+s)})(t,i,r):(s=i.hasOwnProperty(r),i.constructor.createProperty(r,t),s?Object.getOwnPropertyDescriptor(i,r):void 0)}}function t2(t){return t1({...t,state:!0,attribute:!1})}let t3=(t,i,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof i&&Object.defineProperty(t,i,r),r);function t5(t,i){return(r,s,o)=>{let n=i=>i.renderRoot?.querySelector(t)??null;if(i){let t,{get:i,set:a}="object"==typeof s?r:o??(t=Symbol(),{get(){return this[t]},set(i){this[t]=i}});return t3(r,s,{get(){let t=i.call(this);return void 0===t&&(null!==(t=n(this))||this.hasUpdated)&&a.call(this,t),t}})}return t3(r,s,{get(){return n(this)}})}}let{fromCharCode:t4}=String;new TextEncoder;let t7=new TextDecoder;function t6(t,i,r,s){return`command:${t}?${encodeURIComponent(JSON.stringify({webview:i,webviewInstance:r,...s}))}`}let t8=new WeakMap;function t9(t,i){return function(r,s,o){let n=t8.get(r.constructor);null==n&&t8.set(r.constructor,n=[]),n.push({method:o.value,keys:Array.isArray(t)?t:[t],afterFirstUpdate:i?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(t,i,r){let s=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,...r,detail:i});return this.dispatchEvent(s),s}update(t){let i=t8.get(this.constructor);if(null!=i)for(let{keys:r,method:s,afterFirstUpdate:o}of i){if(o&&!this.hasUpdated)continue;let i=r.filter(i=>t.has(i));i.length&&s.call(this,i)}super.update(t)}};let ie=new Map;function it(i,r){i??="decimal";let s=`${r??""}:${i}`,o=ie.get(s);if(null==o){let n={localeMatcher:"best fit",style:i};o=new Intl.NumberFormat(null==r?t:"system"===r?void 0:[r],n),ie.set(s,o)}return o.format}function ii(t,r,s){let o;if(null==s)return i??=it(),`${i(r)} ${t}${1===r?"":"s"}`;let n=1===r?t:s.plural??`${t}s`;return s.only?n:(0===r?o=s.zero??r:!1===s.format?o=r:null!=s.format?o=s.format(r):(i??=it(),o=i(r)),`${o}${s.infix??" "}${n}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let ir=/T/,is=/.*\s*?at\s(.+?)\s/,io=/^_+/,ia=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(t,i=!1){this.#t={...t,sanitizeKeys:new Set([...ia,...t.sanitizeKeys??[]])},this.#i=i,this.#e=t.createChannel(t.name),this.#r=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(t=>{this.#r=t})}enabled(t){return!!this.isDebugging||0!==this.#r&&(null==t||this.#r<=function(t){switch(t){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(t))}#i=!1;get isDebugging(){return this.#i}#r=0;get logLevel(){var t=this.#r;switch(t){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(ir," ").slice(0,-1)}]`}trace(t,...i){let r;(0!==this.#r&&!(this.#r>1)||this.isDebugging)&&("string"==typeof t?r=t:(r=i.shift(),null!=t&&(r=`${t.prefix} ${r??""}`)),this.isDebugging,this.#e?.trace(`  ${r??""}${this.#s(!0,i)}`))}debug(t,...i){let r;(0!==this.#r&&!(this.#r>2)||this.isDebugging)&&("string"==typeof t?r=t:(r=i.shift(),null!=t&&(r=`${t.prefix} ${r??""}`)),this.isDebugging,this.#e?.debug(`  ${r??""}${this.#s(!1,i)}`))}info(t,...i){let r;(0!==this.#r&&!(this.#r>3)||this.isDebugging)&&("string"==typeof t?r=t:(r=i.shift(),null!=t&&(r=`${t.prefix} ${r??""}`)),this.isDebugging,this.#e?.info(`   ${r??""}${this.#s(!1,i)}`))}warn(t,...i){let r;(0!==this.#r&&!(this.#r>4)||this.isDebugging)&&("string"==typeof t?r=t:(r=i.shift(),null!=t&&(r=`${t.prefix} ${r??""}`)),this.isDebugging,this.#e?.warn(`${r??""}${this.#s(!1,i)}`))}error(t,i,...r){let s;if((0===this.#r||this.#r>5)&&!this.isDebugging)return;if(null==(s=null==i||"string"==typeof i?i:`${i.prefix} ${r.shift()??""}`)){let i=t instanceof Error?t.stack:void 0;if(i){let t=is.exec(i);null!=t&&(s=t[1])}}this.isDebugging;let o=`  ${s??""}${this.#s(!1,r)}`;null!=t?this.#e?.error(String(t),o):this.#e?.error(o)}showOutputChannel(t){this.#e?.show?.(t)}toLoggable(t,i){if(null!=i){let r=this.sanitize(i,t);if(null!=r)return r}if("function"==typeof t)return"<function>";if(null==t||"object"!=typeof t||t instanceof Error)return String(t);if(Array.isArray(t)){let i=t.length>10?t.slice(0,10):t,r=t.length>10?`, \u2026+${t.length-10}`:"";return`[${i.map(t=>this.toLoggable(t)).join(", ")}${r}]`}let r=this.#t?.toLoggable,s=r?.(t);if(null!=s)return s;let o=this.#t?.sanitizeKeys;try{return JSON.stringify(t,(t,i)=>{if(95!==t.charCodeAt(0))return o?.has(t)?this.sanitize(t,i):""===t||"object"!=typeof i||null==i||Array.isArray(i)?i:i instanceof Error?String(i):r?.(i)??i})}catch{return"<error>"}}sanitize(t,i){if(null==i)return;let r=t.replace(io,"")||t;if(this.#t?.sanitizeKeys?.has(r))return null!=this.#t.hash?`<${r}:${this.#t.hash("string"==typeof i?i:JSON.stringify(i))}>`:`<${r}>`}#s(t,i){if(0===i.length||t&&(0===this.#r||this.#r>2)&&!this.isDebugging)return"";let r=i.map(t=>this.toLoggable(t)).join(", ");return 0!==r.length?` \u2014 ${r}`:""}};let il=new Logger,ic=new WeakMap,ih={enabled:t=>il.enabled(t),log:(t,i,r,...s)=>{switch(t){case"error":il.error(void 0,i,r,...s);break;case"warn":i?.warn(r,...s);break;case"info":i?.info(r,...s);break;case"debug":default:i?.debug(r,...s);break;case"trace":i?.trace(r,...s)}}},id=new Map;function ip(t,i){let s=r;r=t.scopeId,id.set(t.scopeId,t);try{return i()}finally{r=s,id.delete(t.scopeId)}}function iu(){return null!=r?id.get(r):void 0}let ig=0x40000000-1;function im(){let t=0;return{get current(){return t},next:function(){return t===ig&&(t=0),++t},reset:function(){t=0}}}function ib(t){let i=.001*performance.now(),r=Math.floor(i),s=Math.floor(i%1*1e9);return void 0!==t&&(r-=t[0],(s-=t[1])<0&&(r--,s+=1e9)),[r,s]}function i_(t){let[i,r]=ib(t);return 1e3*i+Math.floor(r/1e6)}let iv=im();function iy(t,i,r){var s;let o,n,a={scopeId:t,prevScopeId:i,prefix:r,enabled:t=>il.enabled(t),addExitInfo:function(...t){(o??=[]).push(...t)},setFailed:function(t){n=t},getExitInfo:function(){return{details:o?.length?` \u2022 ${o.join(", ")}`:void 0,failed:n}}};return iw(a,"trace",il.trace),iw(a,"debug",il.debug),iw(a,"info",il.info),iw(a,"warn",il.warn),Object.defineProperty(s=a,"error",{configurable:!0,enumerable:!0,get:function(){let t=(t,i,...r)=>il.error(t,s,i,...r);return Object.defineProperty(s,"error",{value:t,writable:!1,enumerable:!0}),t}}),a}function iw(t,i,r){Object.defineProperty(t,i,{configurable:!0,enumerable:!0,get:function(){let s=r.bind(il,t);return Object.defineProperty(t,i,{value:s,writable:!1,enumerable:!0}),s}})}function ik(t,i,r){if(null!=r){let s=null==i?t.toString(16):`${i.toString(16)} \u2192 ${t.toString(16)}`;return null==s?`[${r.padEnd(13)}]`:`[${r}${s.padStart(13-r.length)}]`}return null==i?`[${t.toString(16).padStart(13)}]`:`[${i.toString(16).padStart(5)} \u2192 ${t.toString(16).padStart(5)}]`}function ix(){let t=iu();if(null==t)return;let i=Object.create(t);return i[Symbol.dispose]=()=>{},i}function iC(t,i,r){if(null!=i&&"boolean"!=typeof i)return iy(i.scopeId,i.prevScopeId,`${i.prefix}${t}`);let s=i?iu()?.scopeId:void 0,o=iv.next();return iy(o,s,`${ik(o,s,r)} ${t}`)}function i$(t,i,r,...s){switch(i){case"trace":il.trace(t,r,...s);break;case"info":il.info(t,r,...s);break;default:il.debug(t,r,...s)}}let LoggerContext=class LoggerContext{constructor(t){this.scope=iC(t,void 0),il.configure({name:t,createChannel:function(t){let i=il.isDebugging?function(t){}:function(t){};return{name:t,logLevel:0,trace:i,debug:i,info:i,warn:i,error:i}}},!1)}trace(t,...i){"string"==typeof t?il.trace(this.scope,t,...i):il.trace(t,i.shift(),...i)}debug(t,...i){"string"==typeof t?il.debug(this.scope,t,...i):il.debug(t,i.shift(),...i)}info(t,...i){"string"==typeof t?il.info(this.scope,t,...i):il.info(t,i.shift(),...i)}};let iE=new IpcNotification("home","subscription/didChange"),iS="graph";new IpcCommand(iS,"chooseRepository"),new IpcCommand(iS,"dblclick"),new IpcCommand(iS,"avatars/get"),new IpcCommand(iS,"refs/metadata/get"),new IpcCommand(iS,"rows/get"),new IpcCommand(iS,"pullRequest/openDetails"),new IpcCommand(iS,"row/action"),new IpcCommand(iS,"search/openInView"),new IpcCommand(iS,"search/cancel"),new IpcCommand(iS,"columns/update"),new IpcCommand(iS,"refs/update/visibility"),new IpcCommand(iS,"filters/update/excludeTypes"),new IpcCommand(iS,"configuration/update"),new IpcCommand(iS,"search/update/mode"),new IpcCommand(iS,"filters/update/includedRefs"),new IpcCommand(iS,"filters/reset"),new IpcCommand(iS,"selection/update"),new IpcRequest(iS,"jumpToHead"),new IpcRequest(iS,"chooseRef"),new IpcRequest(iS,"chooseComparison"),new IpcRequest(iS,"chooseAuthor"),new IpcRequest(iS,"chooseFile"),new IpcRequest(iS,"scope/resolve"),new IpcRequest(iS,"rows/ensure"),new IpcRequest(iS,"search/history/get"),new IpcRequest(iS,"search/history/store"),new IpcRequest(iS,"search/history/delete"),new IpcRequest(iS,"counts"),new IpcRequest(iS,"overview/get"),new IpcRequest(iS,"overview/wip/get"),new IpcRequest(iS,"overview/enrichment/get"),new IpcRequest(iS,"agentSessions/get"),new IpcRequest(iS,"wip/stats/get"),new IpcCommand(iS,"wip/watches/sync"),new IpcNotification(iS,"wip/stale/didChange"),new IpcRequest(iS,"row/hover/get"),new IpcRequest(iS,"search"),new IpcNotification(iS,"overview/didChange"),new IpcNotification(iS,"overview/wip/didChange"),new IpcNotification(iS,"agentSessions/didChange"),new IpcNotification(iS,"repositories/integration/didChange"),new IpcNotification(iS,"didChange",!0),new IpcNotification(iS,"configuration/didChange");let iA=new IpcNotification(iS,"subscription/didChange");new IpcNotification(iS,"org/settings/didChange"),new IpcNotification(iS,"avatars/didChange"),new IpcNotification(iS,"mcp/didChange"),new IpcNotification(iS,"agents/canInstallClaudeHook/didChange"),new IpcNotification(iS,"branchState/didChange"),new IpcNotification(iS,"refs/didChangeMetadata"),new IpcNotification(iS,"columns/didChange"),new IpcNotification(iS,"scrollMarkers/didChange"),new IpcNotification(iS,"refs/didChangeVisibility"),new IpcNotification(iS,"rows/didChange"),new IpcNotification(iS,"rows/stats/didChange"),new IpcNotification(iS,"selection/didChange"),new IpcNotification(iS,"compareMode/didRequestOpen"),new IpcNotification(iS,"workingTree/didChange"),new IpcNotification(iS,"didSearch"),new IpcNotification(iS,"didFetch"),new IpcNotification(iS,"featurePreview/didStart");let iz=new IpcNotification("timeline","didChange");let PromosContext=class PromosContext{constructor(t){this.disposables=[],this._promos=new Map,this.ipc=t,this.disposables.push(this.ipc.onReceiveMessage(t=>{(iE.is(t)||iA.is(t)||iz.is(t))&&this._promos.clear()}))}async getApplicablePromo(t,i){let r=`${t}|${i}`,s=this._promos.get(r);return null==s&&(s=this.ipc.sendRequest(ed,{plan:t,location:i}).then(t=>t.promo,()=>void 0),this._promos.set(r,s)),await s}dispose(){this.disposables.forEach(t=>t.dispose())}};let TelemetryContext=class TelemetryContext{constructor(t){this.disposables=[],this.ipc=t}sendEvent(t){this.ipc.sendCommand(ep,t)}dispose(){this.disposables.forEach(t=>t.dispose())}};function iI(t){return(t=t.toString().toLowerCase()).includes("ms")?parseFloat(t):t.includes("s")?1e3*parseFloat(t):parseFloat(t)}function iT(t,i){return new Promise(r=>{t.addEventListener(i,function s(o){o.target===t&&(t.removeEventListener(i,s),r())})})}(_||(_={})).on=function(t,i,r,s){let o=!1;if("string"==typeof t){let n=function(i){let s=i?.target?.closest(t);null!=s&&r(i,s)};return document.addEventListener(i,n,s??!0),{dispose:()=>{o||(o=!0,document.removeEventListener(i,n,s??!0))}}}let n=function(t){r(t,this)};return t.addEventListener(i,n,s??!1),{dispose:()=>{o||(o=!0,t.removeEventListener(i,n,s??!1))}}};var iP=Uint8Array,ij=Uint16Array,iR=Int32Array,iM=new iP([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),iL=new iP([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),iO=new iP([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),iD=function(t,i){for(var r=new ij(31),s=0;s<31;++s)r[s]=i+=1<<t[s-1];for(var o=new iR(r[30]),s=1;s<30;++s)for(var n=r[s];n<r[s+1];++n)o[n]=n-r[s]<<5|s;return{b:r,r:o}},iB=iD(iM,2),iF=iB.b,iN=iB.r;iF[28]=258,iN[258]=28;var iU=iD(iL,0),iq=iU.b;iU.r;for(var iH=new ij(32768),iV=0;iV<32768;++iV){var iK=(43690&iV)>>1|(21845&iV)<<1;iK=(61680&(iK=(52428&iK)>>2|(13107&iK)<<2))>>4|(3855&iK)<<4,iH[iV]=((65280&iK)>>8|(255&iK)<<8)>>1}for(var iW=function(t,i,r){for(var s,o=t.length,n=0,a=new ij(i);n<o;++n)t[n]&&++a[t[n]-1];var c=new ij(i);for(n=1;n<i;++n)c[n]=c[n-1]+a[n-1]<<1;if(r){s=new ij(1<<i);var h=15-i;for(n=0;n<o;++n)if(t[n])for(var p=n<<4|t[n],u=i-t[n],g=c[t[n]-1]++<<u,f=g|(1<<u)-1;g<=f;++g)s[iH[g]>>h]=p}else for(n=0,s=new ij(o);n<o;++n)t[n]&&(s[n]=iH[c[t[n]-1]++]>>15-t[n]);return s},iG=new iP(288),iV=0;iV<144;++iV)iG[iV]=8;for(var iV=144;iV<256;++iV)iG[iV]=9;for(var iV=256;iV<280;++iV)iG[iV]=7;for(var iV=280;iV<288;++iV)iG[iV]=8;for(var iZ=new iP(32),iV=0;iV<32;++iV)iZ[iV]=5;var iX=iW(iG,9,1),iQ=iW(iZ,5,1),iY=function(t){for(var i=t[0],r=1;r<t.length;++r)t[r]>i&&(i=t[r]);return i},iJ=function(t,i,r){var s=i/8|0;return(t[s]|t[s+1]<<8)>>(7&i)&r},i0=function(t,i){var r=i/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(7&i)},i1=function(t,i,r){return(null==i||i<0)&&(i=0),(null==r||r>t.length)&&(r=t.length),new iP(t.subarray(i,r))},i2=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],i3=function(t,i,r){var s=Error(i||i2[t]);if(s.code=t,Error.captureStackTrace&&Error.captureStackTrace(s,i3),!r)throw s;return s},i5=function(t,i,r,s){var o=t.length,n=s?s.length:0;if(!o||i.f&&!i.l)return r||new iP(0);var a=!r,c=a||2!=i.i,h=i.i;a&&(r=new iP(3*o));var p=function(t){var i=r.length;if(t>i){var s=new iP(Math.max(2*i,t));s.set(r),r=s}},u=i.f||0,g=i.p||0,f=i.b||0,m=i.l,b=i.d,_=i.m,v=i.n,y=8*o;do{if(!m){u=iJ(t,g,1);var w=iJ(t,g+1,3);if(g+=3,w)if(1==w)m=iX,b=iQ,_=9,v=5;else if(2==w){var x=iJ(t,g,31)+257,C=iJ(t,g+10,15)+4,$=x+iJ(t,g+5,31)+1;g+=14;for(var E=new iP($),A=new iP(19),T=0;T<C;++T)A[iO[T]]=iJ(t,g+3*T,7);g+=3*C;for(var P=iY(A),j=(1<<P)-1,M=iW(A,P,1),T=0;T<$;){var O=M[iJ(t,g,j)];g+=15&O;var D=O>>4;if(D<16)E[T++]=D;else{var B=0,F=0;for(16==D?(F=3+iJ(t,g,3),g+=2,B=E[T-1]):17==D?(F=3+iJ(t,g,7),g+=3):18==D&&(F=11+iJ(t,g,127),g+=7);F--;)E[T++]=B}}var N=E.subarray(0,x),U=E.subarray(x);_=iY(N),v=iY(U),m=iW(N,_,1),b=iW(U,v,1)}else i3(1);else{var D=((g+7)/8|0)+4,q=t[D-4]|t[D-3]<<8,V=D+q;if(V>o){h&&i3(0);break}c&&p(f+q),r.set(t.subarray(D,V),f),i.b=f+=q,i.p=g=8*V,i.f=u;continue}if(g>y){h&&i3(0);break}}c&&p(f+131072);for(var K=(1<<_)-1,W=(1<<v)-1,G=g;;G=g){var B=m[i0(t,g)&K],X=B>>4;if((g+=15&B)>y){h&&i3(0);break}if(B||i3(2),X<256)r[f++]=X;else if(256==X){G=g,m=null;break}else{var Q=X-254;if(X>264){var T=X-257,Y=iM[T];Q=iJ(t,g,(1<<Y)-1)+iF[T],g+=Y}var J=b[i0(t,g)&W],ee=J>>4;J||i3(3),g+=15&J;var U=iq[ee];if(ee>3){var Y=iL[ee];U+=i0(t,g)&(1<<Y)-1,g+=Y}if(g>y){h&&i3(0);break}c&&p(f+131072);var et=f+Q;if(f<U){var ei=n-U,er=Math.min(U,et);for(ei+f<0&&i3(3);f<er;++f)r[f]=s[ei+f]}for(;f<et;++f)r[f]=r[f-U]}}i.l=m,i.p=G,i.b=f,i.f=u,m&&(u=1,i.m=_,i.d=b,i.n=v)}while(!u)return f!=r.length&&a?i1(r,0,f):r.subarray(0,f)},i4=new iP(0),i7="u">typeof TextDecoder&&new TextDecoder;try{i7.decode(i4,{stream:!0})}catch{}var i6=function(t){for(var i="",r=0;;){var s=t[r++],o=(s>127)+(s>223)+(s>239);if(r+o>t.length)return{s:i,r:i1(t,r-1)};o?3==o?i+=String.fromCharCode(55296|(s=((15&s)<<18|(63&t[r++])<<12|(63&t[r++])<<6|63&t[r++])-65536)>>10,56320|1023&s):1&o?i+=String.fromCharCode((31&s)<<6|63&t[r++]):i+=String.fromCharCode((15&s)<<12|(63&t[r++])<<6|63&t[r++]):i+=String.fromCharCode(s)}};function i8(t,i){if(i){for(var r="",s=0;s<t.length;s+=16384)r+=String.fromCharCode.apply(null,t.subarray(s,s+16384));return r}if(i7)return i7.decode(t);var o=i6(t),n=o.s,r=o.r;return r.length&&i3(8),n}"function"==typeof queueMicrotask&&queueMicrotask;let i9=/\(([\s\S]*)\)/,re=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,rt=/\s?=.*$/;function ri(t){var i,r;let s,o,n,a,c,h,p,u,g;return i="debug",c=!1,h=!0,null!=(r=t)&&({args:s,when:o,exit:n,prefix:a,onlyExit:c=!1,timing:h=!0}=r),p="object"==typeof h?h.warnAfter:1500,u=!1!==h||"object"==typeof c&&c.after>0,g="trace"===i?il.trace:"debug"===i?il.debug:il.info,(t,r,h)=>{let f,m;if("function"==typeof h.value?(f=h.value,m="value"):"function"==typeof h.get&&(f=h.get,m="get"),null==f||null==m)throw Error("Not supported");let b=null==s?function(t){if("function"!=typeof t)throw Error("Not supported");if(0===t.length)return[];let i=Function.prototype.toString.call(t),r=(i=(i=i.replace(re,"")||i).slice(0,i.indexOf("{"))).indexOf("("),s=i.indexOf(")");r=r>=0?r+1:0,s=s>0?s:i.indexOf("="),i=i.slice(r,s),i=`(${i})`;let o=i9.exec(i);return null!=o?o[1].split(",").map(t=>t.trim().replace(rt,"")):[]}(f):[];h[m]=function(...t){let h;if(!il.enabled()||null!=o&&!o.apply(this,t))return f.apply(this,t);let m=il.enabled(i),_=ix(),v=_?.scopeId,y=iv.next(),w=this!=null?function(t){let i;if("function"==typeof t){if(null==(i=t.prototype?.constructor))return t.name}else i=t.constructor;let r=i?.name??"",s=r.indexOf("_");-1!==s&&(r=r.substring(s+1));let o=i;for(;null!=o;){let i=ic.get(o);if(null!=i)return i(t,r);o=Object.getPrototypeOf(o)}return r}(this):void 0,x=w?`${ik(y,v)} ${w}.${r}`:`${ik(y,v)} ${r}`;null!=a&&(x=a({id:y,instance:this,instanceName:w??"",name:r,prefix:x},...t));let C=iy(y,v,x),$=!1,E=()=>($||($=!0,h=function(t,i,r){if(!1===t||!i.length)return;if("function"==typeof t){let r=t(...i);if(!1===r)return;let s="";for(let[t,i]of Object.entries(r))s.length&&(s+=", "),s+=`${t}=${il.toLoggable(i,t)}`;return s||void 0}let s="",o=-1;for(let t of i){let i=r[++o];s.length&&(s+=", "),s+=i?`${i}=${il.toLoggable(t,i)}`:il.toLoggable(t)}return s||void 0}(s,t,b)),h);if(!c&&m){let t=E();g.call(il,t?`${x}(${t})`:x)}if(c||u||null!=n){let i=u?ib():void 0,r=t=>{let r=void 0!==i?` [${i_(i)}ms]`:"",s=C.getExitInfo();if(c){let i=E();il.error(t,i?`${x}(${i})`:x,s?.details?`failed${s.details}${r}`:`failed${r}`)}else il.error(t,x,s?.details?`failed${s.details}${r}`:`failed${r}`)},s=t=>{let r,s,o,a;null!=i?(r=i_(i))>p?(s=il.warn,o=` [*${r}ms] (slow)`):(s=g,o=` [${r}ms]`):(o="",s=g);let h=C.getExitInfo();if(null!=n)if("function"==typeof n)try{a=n(t)}catch(t){a=`@log.exit error: ${t}`}else!0===n&&(a=`returned ${il.toLoggable(t)}`);else h?.failed?(a=h.failed,s=(t,...i)=>il.error(null,t,...i)):a="completed";if(m||s!==g){let t=E();c?(!0===c||0===c.after||r>c.after)&&s.call(il,t?`${x}(${t}) ${a}${h?.details||""}${o}`:`${x} ${a}${h?.details||""}${o}`):s.call(il,t?`${x}(${t}) ${a}${h?.details||""}${o}`:`${x} ${a}${h?.details||""}${o}`)}};return ip(C,()=>{var i;let o;try{o=f.apply(this,t)}catch(t){throw r(t),t}return null!=o&&null!=(i=o)&&(i instanceof Promise||"function"==typeof i?.then)?o.then(s,r).catch(()=>{}):s(o),o})}return ip(C,()=>f.apply(this,t))}}}globalThis.scheduler?.yield?.bind(globalThis.scheduler),Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(t,i,...r){let s;this._stopped=!1,this.logScope=null!=t&&"string"!=typeof t?t:iC(t??"",!1,i?.scopeLabel);let o=i?.log;if(s=null==o||!0===o?{}:!1===o||o.onlyExit?void 0:o,this.logLevel=("object"==typeof o?o.level:void 0)??"debug",this.logProvider=i?.provider??ih,this._time=ib(),null!=s){if(!this.logProvider.enabled(this.logLevel))return;r.length?this.logProvider.log(this.logLevel,this.logScope,`${s.message??""}${s.suffix??""}`,...r):this.logProvider.log(this.logLevel,this.logScope,`${s.message??""}${s.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return i_(this._time)}log(t){this.logCore(t,!1)}restart(t){this.logCore(t,!0),this._time=ib(),this._stopped=!1}stop(t){this._stopped||(this.restart(t),this._stopped=!0)}logCore(t,i){if(!this.logProvider.enabled(this.logLevel))return;if(!i)return void this.logProvider.log(this.logLevel,this.logScope,`${t?.message??""}${t?.suffix??""}`);let r=i_(this._time),s=t?.message??"";this.logProvider.log(r>250?"warn":this.logLevel,this.logScope,`${s?`${s} `:""}[${r}ms]${t?.suffix??""}`)}};(()=>{let t;var i,r,s={975:t=>{function i(t){if("string"!=typeof t)throw TypeError("Path must be a string. Received "+JSON.stringify(t))}function r(t,i){for(var r,s="",o=0,n=-1,a=0,c=0;c<=t.length;++c){if(c<t.length)r=t.charCodeAt(c);else{if(47===r)break;r=47}if(47===r){if(n===c-1||1===a);else if(n!==c-1&&2===a){if(s.length<2||2!==o||46!==s.charCodeAt(s.length-1)||46!==s.charCodeAt(s.length-2)){if(s.length>2){var h=s.lastIndexOf("/");if(h!==s.length-1){-1===h?(s="",o=0):o=(s=s.slice(0,h)).length-1-s.lastIndexOf("/"),n=c,a=0;continue}}else if(2===s.length||1===s.length){s="",o=0,n=c,a=0;continue}}i&&(s.length>0?s+="/..":s="..",o=2)}else s.length>0?s+="/"+t.slice(n+1,c):s=t.slice(n+1,c),o=c-n-1;n=c,a=0}else 46===r&&-1!==a?++a:a=-1}return s}var s={resolve:function(){for(var t,s,o="",n=!1,a=arguments.length-1;a>=-1&&!n;a--)a>=0?t=arguments[a]:(void 0===s&&(s=process.cwd()),t=s),i(t),0!==t.length&&(o=t+"/"+o,n=47===t.charCodeAt(0));return o=r(o,!n),n?o.length>0?"/"+o:"/":o.length>0?o:"."},normalize:function(t){if(i(t),0===t.length)return".";var s=47===t.charCodeAt(0),o=47===t.charCodeAt(t.length-1);return 0!==(t=r(t,!s)).length||s||(t="."),t.length>0&&o&&(t+="/"),s?"/"+t:t},isAbsolute:function(t){return i(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var t,r=0;r<arguments.length;++r){var o=arguments[r];i(o),o.length>0&&(void 0===t?t=o:t+="/"+o)}return void 0===t?".":s.normalize(t)},relative:function(t,r){if(i(t),i(r),t===r||(t=s.resolve(t))===(r=s.resolve(r)))return"";for(var o=1;o<t.length&&47===t.charCodeAt(o);++o);for(var n=t.length,a=n-o,c=1;c<r.length&&47===r.charCodeAt(c);++c);for(var h=r.length-c,p=a<h?a:h,u=-1,g=0;g<=p;++g){if(g===p){if(h>p){if(47===r.charCodeAt(c+g))return r.slice(c+g+1);if(0===g)return r.slice(c+g)}else a>p&&(47===t.charCodeAt(o+g)?u=g:0===g&&(u=0));break}var f=t.charCodeAt(o+g);if(f!==r.charCodeAt(c+g))break;47===f&&(u=g)}var m="";for(g=o+u+1;g<=n;++g)g!==n&&47!==t.charCodeAt(g)||(0===m.length?m+="..":m+="/..");return m.length>0?m+r.slice(c+u):(c+=u,47===r.charCodeAt(c)&&++c,r.slice(c))},_makeLong:function(t){return t},dirname:function(t){if(i(t),0===t.length)return".";for(var r=t.charCodeAt(0),s=47===r,o=-1,n=!0,a=t.length-1;a>=1;--a)if(47===(r=t.charCodeAt(a))){if(!n){o=a;break}}else n=!1;return -1===o?s?"/":".":s&&1===o?"//":t.slice(0,o)},basename:function(t,r){if(void 0!==r&&"string"!=typeof r)throw TypeError('"ext" argument must be a string');i(t);var s,o=0,n=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=t.length){if(r.length===t.length&&r===t)return"";var c=r.length-1,h=-1;for(s=t.length-1;s>=0;--s){var p=t.charCodeAt(s);if(47===p){if(!a){o=s+1;break}}else -1===h&&(a=!1,h=s+1),c>=0&&(p===r.charCodeAt(c)?-1==--c&&(n=s):(c=-1,n=h))}return o===n?n=h:-1===n&&(n=t.length),t.slice(o,n)}for(s=t.length-1;s>=0;--s)if(47===t.charCodeAt(s)){if(!a){o=s+1;break}}else -1===n&&(a=!1,n=s+1);return -1===n?"":t.slice(o,n)},extname:function(t){i(t);for(var r=-1,s=0,o=-1,n=!0,a=0,c=t.length-1;c>=0;--c){var h=t.charCodeAt(c);if(47!==h)-1===o&&(n=!1,o=c+1),46===h?-1===r?r=c:1!==a&&(a=1):-1!==r&&(a=-1);else if(!n){s=c+1;break}}return -1===r||-1===o||0===a||1===a&&r===o-1&&r===s+1?"":t.slice(r,o)},format:function(t){var i,r;if(null===t||"object"!=typeof t)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return i=t.dir||t.root,r=t.base||(t.name||"")+(t.ext||""),i?i===t.root?i+r:i+"/"+r:r},parse:function(t){i(t);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;var s,o=t.charCodeAt(0),n=47===o;n?(r.root="/",s=1):s=0;for(var a=-1,c=0,h=-1,p=!0,u=t.length-1,g=0;u>=s;--u)if(47!==(o=t.charCodeAt(u)))-1===h&&(p=!1,h=u+1),46===o?-1===a?a=u:1!==g&&(g=1):-1!==a&&(g=-1);else if(!p){c=u+1;break}return -1===a||-1===h||0===g||1===g&&a===h-1&&a===c+1?-1!==h&&(r.base=r.name=0===c&&n?t.slice(1,h):t.slice(c,h)):(0===c&&n?(r.name=t.slice(1,a),r.base=t.slice(1,h)):(r.name=t.slice(c,a),r.base=t.slice(c,h)),r.ext=t.slice(a,h)),c>0?r.dir=t.slice(0,c-1):n&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,t.exports=s}},o={};function n(t){var i=o[t];if(void 0!==i)return i.exports;var r=o[t]={exports:{}};return s[t](r,r.exports,n),r.exports}n.d=(t,i)=>{for(var r in i)n.o(i,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:i[r]})},n.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),n.r=t=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var a={};(n.r(a),n.d(a,{URI:()=>l,Utils:()=>r}),"object"==typeof process)?t="win32"===process.platform:"object"==typeof navigator&&(t=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function u(t,i){if(!t.scheme&&i)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t.authority}", path: "${t.path}", query: "${t.query}", fragment: "${t.fragment}"}`);if(t.scheme&&!c.test(t.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(t.path){if(t.authority){if(!h.test(t.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(t.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let g=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(t){return t instanceof l||!!t&&"string"==typeof t.authority&&"string"==typeof t.fragment&&"string"==typeof t.path&&"string"==typeof t.query&&"string"==typeof t.scheme&&"string"==typeof t.fsPath&&"function"==typeof t.with&&"function"==typeof t.toString}scheme;authority;path;query;fragment;constructor(t,i,r,s,o,n=!1){"object"==typeof t?(this.scheme=t.scheme||"",this.authority=t.authority||"",this.path=t.path||"",this.query=t.query||"",this.fragment=t.fragment||""):(this.scheme=t||n?t:"file",this.authority=i||"",this.path=function(t,i){switch(t){case"https":case"http":case"file":i?"/"!==i[0]&&(i="/"+i):i="/"}return i}(this.scheme,r||""),this.query=s||"",this.fragment=o||"",u(this,n))}get fsPath(){return y(this,!1)}with(t){if(!t)return this;let{scheme:i,authority:r,path:s,query:o,fragment:n}=t;return void 0===i?i=this.scheme:null===i&&(i=""),void 0===r?r=this.authority:null===r&&(r=""),void 0===s?s=this.path:null===s&&(s=""),void 0===o?o=this.query:null===o&&(o=""),void 0===n?n=this.fragment:null===n&&(n=""),i===this.scheme&&r===this.authority&&s===this.path&&o===this.query&&n===this.fragment?this:new d(i,r,s,o,n)}static parse(t,i=!1){let r=g.exec(t);return r?new d(r[2]||"",C(r[4]||""),C(r[5]||""),C(r[7]||""),C(r[9]||""),i):new d("","","","","")}static file(i){let r="";if(t&&(i=i.replace(/\\/g,"/")),"/"===i[0]&&"/"===i[1]){let t=i.indexOf("/",2);-1===t?(r=i.substring(2),i="/"):(r=i.substring(2,t),i=i.substring(t)||"/")}return new d("file",r,i,"","")}static from(t){let i=new d(t.scheme,t.authority,t.path,t.query,t.fragment);return u(i,!0),i}toString(t=!1){return w(this,t)}toJSON(){return this}static revive(t){if(t){if(t instanceof l)return t;{let i=new d(t);return i._formatted=t.external,i._fsPath=t._sep===f?t.fsPath:null,i}}return t}};let f=t?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=y(this,!1)),this._fsPath}toString(t=!1){return t?w(this,!0):(this._formatted||(this._formatted=w(this,!1)),this._formatted)}toJSON(){let t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=f),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t}};let m={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function b(t,i,r){let s,o=-1;for(let n=0;n<t.length;n++){let a=t.charCodeAt(n);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||i&&47===a||r&&91===a||r&&93===a||r&&58===a)-1!==o&&(s+=encodeURIComponent(t.substring(o,n)),o=-1),void 0!==s&&(s+=t.charAt(n));else{void 0===s&&(s=t.substr(0,n));let i=m[a];void 0!==i?(-1!==o&&(s+=encodeURIComponent(t.substring(o,n)),o=-1),s+=i):-1===o&&(o=n)}}return -1!==o&&(s+=encodeURIComponent(t.substring(o))),void 0!==s?s:t}function _(t){let i;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);35===s||63===s?(void 0===i&&(i=t.substr(0,r)),i+=m[s]):void 0!==i&&(i+=t[r])}return void 0!==i?i:t}function y(i,r){let s;return s=i.authority&&i.path.length>1&&"file"===i.scheme?`//${i.authority}${i.path}`:47===i.path.charCodeAt(0)&&(i.path.charCodeAt(1)>=65&&90>=i.path.charCodeAt(1)||i.path.charCodeAt(1)>=97&&122>=i.path.charCodeAt(1))&&58===i.path.charCodeAt(2)?r?i.path.substr(1):i.path[1].toLowerCase()+i.path.substr(2):i.path,t&&(s=s.replace(/\//g,"\\")),s}function w(t,i){let r=i?_:b,s="",{scheme:o,authority:n,path:a,query:c,fragment:h}=t;if(o&&(s+=o,s+=":"),(n||"file"===o)&&(s+="/",s+="/"),n){let t=n.indexOf("@");if(-1!==t){let i=n.substr(0,t);n=n.substr(t+1),-1===(t=i.lastIndexOf(":"))?s+=r(i,!1,!1):(s+=r(i.substr(0,t),!1,!1),s+=":",s+=r(i.substr(t+1),!1,!0)),s+="@"}-1===(t=(n=n.toLowerCase()).lastIndexOf(":"))?s+=r(n,!1,!0):(s+=r(n.substr(0,t),!1,!0),s+=n.substr(t))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let t=a.charCodeAt(1);t>=65&&t<=90&&(a=`/${String.fromCharCode(t+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let t=a.charCodeAt(0);t>=65&&t<=90&&(a=`${String.fromCharCode(t+32)}:${a.substr(2)}`)}s+=r(a,!0,!1)}return c&&(s+="?",s+=r(c,!1,!1)),h&&(s+="#",s+=i?h:b(h,!1,!1)),s}let x=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function C(t){return t.match(x)?t.replace(x,t=>(function t(i){try{return decodeURIComponent(i)}catch{return i.length>3?i.substr(0,3)+t(i.substr(3)):i}})(t)):t}var $=n(975);let E=$.posix||$;(i=r||(r={})).joinPath=function(t,...i){return t.with({path:E.join(t.path,...i)})},i.resolvePath=function(t,...i){let r=t.path,s=!1;"/"!==r[0]&&(r="/"+r,s=!0);let o=E.resolve(r,...i);return s&&"/"===o[0]&&!t.authority&&(o=o.substring(1)),t.with({path:o})},i.dirname=function(t){if(0===t.path.length||"/"===t.path)return t;let i=E.dirname(t.path);return 1===i.length&&46===i.charCodeAt(0)&&(i=""),t.with({path:i})},i.basename=function(t){return E.basename(t.path)},i.extname=function(t){return E.extname(t.path)},v=a})();let{URI:rr,Utils:rs}=v;function ro(t,i){return JSON.parse(t,(t,r)=>(function(t,i){let r=function(t){if("object"!=typeof t||null==t)return;let i=t.__ipc;if(null!=i)switch(i){case"date":return"number"==typeof t.value?t:void 0;case"promise":return"object"==typeof t.value&&"string"==typeof t.value.id&&"string"==typeof t.value.method?t:void 0;case"uri":return"object"==typeof t.value&&"string"==typeof t.value?.scheme?t:void 0;default:return}}(t);if(null==r)return t;switch(r.__ipc){case"date":return new Date(r.value);case"promise":return i(r.value);case"uri":return rr.revive(r.value)}})(r,i))}let rn="__supertalk_rpc__";new TextEncoder,new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._noop=function(){}}get event(){return this._event??=(t,i,r)=>{this.listeners??=new LinkedList;let s=this.listeners.push(null==i?t:[t,i]),o={dispose:()=>{o.dispose=Emitter._noop,this._disposed||s()}};return Array.isArray(r)&&r.push(o),o},this._event}fire(t){if(null!=this.listeners){this._deliveryQueue??=new LinkedList;for(let i=this.listeners.iterator(),r=i.next();!r.done;r=i.next())this._deliveryQueue.push([r.value,t]);for(;this._deliveryQueue.size>0;){let[t,i]=this._deliveryQueue.shift();try{"function"==typeof t?t(i):t[0].call(t[1],i)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let ra={done:!0,value:void 0};let events_Node=class events_Node{static{this.Undefined=new events_Node(void 0)}constructor(t){this.element=t,this.next=events_Node.Undefined,this.prev=events_Node.Undefined}};let LinkedList=class LinkedList{constructor(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===events_Node.Undefined}clear(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}unshift(t){return this._insert(t,!1)}push(t){return this._insert(t,!0)}_insert(t,i){let r=new events_Node(t);if(this._first===events_Node.Undefined)this._first=r,this._last=r;else if(i){let t=this._last;this._last=r,r.prev=t,t.next=r}else{let t=this._first;this._first=r,r.next=t,t.prev=r}this._size+=1;let s=!1;return()=>{s||(s=!0,this._remove(r))}}shift(){if(this._first===events_Node.Undefined)return;let t=this._first.element;return this._remove(this._first),t}pop(){if(this._last===events_Node.Undefined)return;let t=this._last.element;return this._remove(this._last),t}_remove(t){if(t.prev!==events_Node.Undefined&&t.next!==events_Node.Undefined){let i=t.prev;i.next=t.next,t.next.prev=i}else t.prev===events_Node.Undefined&&t.next===events_Node.Undefined?(this._first=events_Node.Undefined,this._last=events_Node.Undefined):t.next===events_Node.Undefined?(this._last=this._last.prev,this._last.next=events_Node.Undefined):t.prev===events_Node.Undefined&&(this._first=this._first.next,this._first.prev=events_Node.Undefined);this._size-=1}iterator(){let t,i=this._first;return{next:function(){return i===events_Node.Undefined?ra:(null==t?t={done:!1,value:i.element}:t.value=i.element,i=i.next,t)}}}toArray(){let t=[];for(let i=this._first;i!==events_Node.Undefined;i=i.next)t.push(i.element);return t}};var rl=Object.defineProperty,rc=Object.getOwnPropertyDescriptor,rh=(t,i)=>(i=Symbol[t])?i:Symbol.for("Symbol."+t),rd=t=>{throw TypeError(t)},rp=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?rc(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&rl(i,r,n),n};function ru(){return s??=null!=o?o():acquireVsCodeApi()}let rg=im();function rf(){return`webview:${rg.next()}`}let rm=`wv-${Math.random().toString(36).slice(2,10)}`,rb=Date.now(),r_=class{constructor(t){this.appName=t,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=ru(),this._disposable=_.on(window,"message",t=>this.onMessageReceived(t))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(t){var i,s,o,n,a,c,h,p,u,g=[];try{if(o=t.data,"object"==typeof o&&null!==o&&rn in o&&!0===o[rn])return;let a=t.data,c=((t,i,r)=>{if(null!=i){var s,o;"object"!=typeof i&&"function"!=typeof i&&rd("Object expected"),r&&(s=i[rh("asyncDispose")]),void 0===s&&(s=i[rh("dispose")],r&&(o=s)),"function"!=typeof s&&rd("Object not disposable"),o&&(s=function(){try{o.call(this)}catch(t){return Promise.reject(t)}}),t.push([r,s,i])}else r&&t.push([r]);return i})(g,function(t,i,s){var o,n;let a,c,h;if(!il.enabled())return;let p=(o=s?.scope??!0,n=s?.scopeLabel,c=iu(),r=(h=iC(t,o,n)).scopeId,id.set(h.scopeId,h),h[Symbol.dispose]=()=>{let t;t=h?.scopeId??r,null!=t&&id.delete(t),r=c?.scopeId},h);if(!i)return p;let u="debug",g=!1;"object"==typeof i&&(u=i.level??u,a=i.message,g=!0===i.onlyExit);let f=ib();g||i$(p,u,a??"");let m=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let t=i_(f),i=` [${t}ms]`,r=p.getExitInfo(),s=r.failed??"completed";null!=r.failed?il.error(null,p,`${s}${r.details??""}${i}`):i$(p,u,`${s}${r.details??""}${i}`),m()},p}(`(e=${a.id}|${a.method})`,void 0,{scope:ix()})),h=function(t,i,...r){let s=("object"==typeof i?.log?i.log.level:void 0)??"info";return(i?.provider??ih).enabled(s)?new Stopwatch(t,i,...r):void 0}(c,{log:{onlyExit:!0,level:"debug"}});if(a.compressed&&a.params instanceof Uint8Array){if("deflate"===a.compressed)try{a.params=i8((n=a.params,i5(n,{i:2},void 0,void 0)))}catch(t){a.params=i8(a.params)}else a.params=i8(a.params);h?.restart({message:`\u2022 decompressed (${a.compressed}) serialized params`})}if("string"==typeof a.params?(a.params=ro(a.params,t=>this.getResponsePromise(t.method,t.id)),h?.stop({message:"• deserialized params"})):null==a.params?h?.stop({message:"• no params"}):h?.stop({message:"• invalid params"}),c?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-a.timestamp}ms`),null!=a.completionId){let t=(i=a.method,s=a.completionId,`${i}|${s}`);this._pendingHandlers.get(t)?.(a);return}this._onReceiveMessage.fire(a)}catch(t){var f=t,m=!0}finally{a=f,c=m,h="function"==typeof SuppressedError?SuppressedError:function(t,i,r,s){return(s=Error(r)).name="SuppressedError",s.error=t,s.suppressed=i,s},p=t=>a=c?new h(t,a,"An error was suppressed during disposal"):(c=!0,t),(u=t=>{for(;t=g.pop();)try{var i=t[1]&&t[1].call(t[2]);if(t[0])return Promise.resolve(i).then(u,t=>(p(t),u()))}catch(t){p(t)}if(c)throw a})()}}deserializeIpcData(t){return ro(t,t=>this.getResponsePromise(t.method,t.id))}sendCommand(t,i){let r=rf();this.postMessage({id:r,scope:t.scope,method:t.method,params:i,compressed:!1,timestamp:Date.now()})}async sendRequest(t,i){let r=rf(),s=this.getResponsePromise(t.response.method,r);return this.postMessage({id:r,scope:t.scope,method:t.method,params:i,compressed:!1,timestamp:Date.now(),completionId:r}),s}getResponsePromise(t,i){return new Promise((r,s)=>{var o,n;let a,c=(o=t,n=i,`${o}|${n}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),s(Error(`Timed out waiting for completion of ${c}`))},(il.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,t=>{if(h.call(this),t.method===eu.method){let i=t.params;"rejected"===i.status?queueMicrotask(()=>s(Error(i.reason))):queueMicrotask(()=>r(i.value))}else queueMicrotask(()=>r(t.params))})})}setPersistedState(t){this._api.setState(t)}updatePersistedState(t){let i=this._api.getState();null!=i&&"object"==typeof i?(i={...i,...t},this._api.setState(i)):i=t,this.setPersistedState(i)}postMessage(t){this._api.postMessage(t)}};function rv(t,i){let r=Math.pow(10,i);return Math.round(t*r)/r}rp([ri({args:t=>({e:`${t.data.id}|${t.data.method}`})})],r_.prototype,"onMessageReceived",1),rp([ri({args:t=>({commandType:t.method})})],r_.prototype,"sendCommand",1),rp([ri({args:t=>({requestType:t.method})})],r_.prototype,"sendRequest",1),rp([ri({args:t=>({e:`${t.id}, method=${t.method}`})})],r_.prototype,"postMessage",1),r_=rp([(u=t=>`${t.appName}(HostIpc)`,t=>void ic.set(t,u))],r_);let RGBA=class RGBA{constructor(t,i,r,s=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,t)),this.g=0|Math.min(255,Math.max(0,i)),this.b=0|Math.min(255,Math.max(0,r)),this.a=rv(Math.max(Math.min(1,s),0),3)}static equals(t,i){return t.r===i.r&&t.g===i.g&&t.b===i.b&&t.a===i.a}};let HSLA=class HSLA{constructor(t,i,r,s){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=rv(Math.max(Math.min(1,i),0),3),this.l=rv(Math.max(Math.min(1,r),0),3),this.a=rv(Math.max(Math.min(1,s),0),3)}static equals(t,i){return t.h===i.h&&t.s===i.s&&t.l===i.l&&t.a===i.a}static fromRGBA(t){let i=t.r/255,r=t.g/255,s=t.b/255,o=t.a,n=Math.max(i,r,s),a=Math.min(i,r,s),c=0,h=0,p=(a+n)/2,u=n-a;if(u>0){switch(h=Math.min(p<=.5?u/(2*p):u/(2-2*p),1),n){case i:c=(r-s)/u+6*(r<s);break;case r:c=(s-i)/u+2;break;case s:c=(i-r)/u+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,o)}static _hue2rgb(t,i,r){return(r<0&&(r+=1),r>1&&(r-=1),r<1/6)?t+(i-t)*6*r:r<.5?i:r<2/3?t+(i-t)*(2/3-r)*6:t}static toRGBA(t){let i,r,s,o=t.h/360,{s:n,l:a,a:c}=t;if(0===n)i=r=s=a;else{let t=a<.5?a*(1+n):a+n-a*n,c=2*a-t;i=HSLA._hue2rgb(c,t,o+1/3),r=HSLA._hue2rgb(c,t,o),s=HSLA._hue2rgb(c,t,o-1/3)}return new RGBA(Math.round(255*i),Math.round(255*r),Math.round(255*s),c)}};let HSVA=class HSVA{constructor(t,i,r,s){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=rv(Math.max(Math.min(1,i),0),3),this.v=rv(Math.max(Math.min(1,r),0),3),this.a=rv(Math.max(Math.min(1,s),0),3)}static equals(t,i){return t.h===i.h&&t.s===i.s&&t.v===i.v&&t.a===i.a}static fromRGBA(t){let i=t.r/255,r=t.g/255,s=t.b/255,o=Math.max(i,r,s),n=o-Math.min(i,r,s);return new HSVA(Math.round(60*(0===n?0:o===i?((r-s)/n%6+6)%6:o===r?(s-i)/n+2:(i-r)/n+4)),0===o?0:n/o,o,t.a)}static toRGBA(t){let{h:i,s:r,v:s,a:o}=t,n=s*r,a=n*(1-Math.abs(i/60%2-1)),c=s-n,[h,p,u]=[0,0,0];return i<60?(h=n,p=a):i<120?(h=a,p=n):i<180?(p=n,u=a):i<240?(p=a,u=n):i<300?(h=a,u=n):i<=360&&(h=n,u=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),u=Math.round((u+c)*255),o)}};function ry(t,i){return i.getPropertyValue(t).trim()}let Color=class Color{static from(t){return t instanceof Color?t:parseColor(t)||Color.red}static fromCssVariable(t,i){return parseColor(ry(t,i))||Color.red}static fromHex(t){return parseHexColor(t)||Color.red}static equals(t,i){return!t&&!i||!!t&&!!i&&t.equals(i)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(t){if(t)if(t instanceof RGBA)this.rgba=t;else if(t instanceof HSLA)this._hsla=t,this.rgba=HSLA.toRGBA(t);else if(t instanceof HSVA)this._hsva=t,this.rgba=HSVA.toRGBA(t);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(t){return null!=t&&!!t&&RGBA.equals(this.rgba,t.rgba)&&HSLA.equals(this.hsla,t.hsla)&&HSVA.equals(this.hsva,t.hsva)}getRelativeLuminance(){return rv(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(t){let i=t/255;return i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}luminance(t){return luminance(this,t)}getContrastRatio(t){let i=this.getRelativeLuminance(),r=t.getRelativeLuminance();return i>r?(i+.05)/(r+.05):(r+.05)/(i+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(t){return this.getRelativeLuminance()>t.getRelativeLuminance()}isDarkerThan(t){return this.getRelativeLuminance()<t.getRelativeLuminance()}lighten(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*t,this.hsla.a))}darken(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*t,this.hsla.a))}transparent(t){let{r:i,g:r,b:s,a:o}=this.rgba;return new Color(new RGBA(i,r,s,o*t))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(t){let i=t.rgba,r=this.rgba.a,s=i.a,o=r+s*(1-r);return o<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*r/o+i.r*s*(1-r)/o,this.rgba.g*r/o+i.g*s*(1-r)/o,this.rgba.b*r/o+i.b*s*(1-r)/o,o))}mix(t,i){return mixColors(this,t,i)}makeOpaque(t){if(this.isOpaque()||1!==t.rgba.a)return this;let{r:i,g:r,b:s,a:o}=this.rgba;return new Color(new RGBA(t.rgba.r-o*(t.rgba.r-i),t.rgba.g-o*(t.rgba.g-r),t.rgba.b-o*(t.rgba.b-s),1))}flatten(...t){let i=t.reduceRight((t,i)=>Color._flatten(i,t));return Color._flatten(this,i)}static _flatten(t,i){let r=1-t.rgba.a;return new Color(new RGBA(r*i.rgba.r+t.rgba.a*t.rgba.r,r*i.rgba.g+t.rgba.a*t.rgba.g,r*i.rgba.b+t.rgba.a*t.rgba.b))}toString(){return this._toString||(this._toString=function(t){return t.isOpaque()?`#${rw(t.rgba.r)}${rw(t.rgba.g)}${rw(t.rgba.b)}`:`rgba(${t.rgba.r}, ${t.rgba.g}, ${t.rgba.b}, ${Number(t.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(t,i,r){if(t.isLighterThan(i))return t;r=r||.5;let s=t.getRelativeLuminance(),o=i.getRelativeLuminance();return r=r*(o-s)/o,t.lighten(r)}static getDarkerColor(t,i,r){if(t.isDarkerThan(i))return t;r=r||.5;let s=t.getRelativeLuminance(),o=i.getRelativeLuminance();return r=r*(s-o)/s,t.darken(r)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function rw(t){let i=t.toString(16);return 2!==i.length?`0${i}`:i}let rk=new Emitter,rx=rk.event;function rC(t){let i=document.documentElement,r=window.getComputedStyle(i),s=document.body.classList,o=s.contains("vscode-light")||s.contains("vscode-high-contrast-light"),n=s.contains("vscode-high-contrast")||s.contains("vscode-high-contrast-light"),a=ry("--vscode-editor-background",r),c=ry("--vscode-editor-foreground",r);return c||(c=ry("--vscode-foreground",r)),{colors:{background:a,foreground:c},computedStyle:r,isLightTheme:o,isHighContrastTheme:n,isInitializing:null==t}}function r$(){let t=new MutationObserver(t=>{rk.fire(rC(t))});return t.observe(document.body,{attributeFilter:["class"]}),{dispose:()=>t.disconnect()}}var rE=Object.defineProperty,rS=Object.getOwnPropertyDescriptor,rA=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?rS(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&rE(i,r,n),n};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(t){let i=JSON.parse(t7.decode(function(t){let i=globalThis.atob(t),r=i.length,s=new Uint8Array(r),o=0,n=r-r%8;for(;o<n;o+=8)s[o]=i.charCodeAt(o),s[o+1]=i.charCodeAt(o+1),s[o+2]=i.charCodeAt(o+2),s[o+3]=i.charCodeAt(o+3),s[o+4]=i.charCodeAt(o+4),s[o+5]=i.charCodeAt(o+5),s[o+6]=i.charCodeAt(o+6),s[o+7]=i.charCodeAt(o+7);for(;o<r;o++)s[o]=i.charCodeAt(o);return s}(t))),r=i.webviewId,s=i.webviewInstanceId;this._webview={webviewId:r,webviewInstanceId:s,createCommandLink:(t,i)=>(t.endsWith(":")&&(t=`${t}${r.split(".").at(-1)}`),t6(t,r,s,i))}}connectedCallback(){let t,i,r,s;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new r_(this.name);let o=rC();null!=this.onThemeUpdated&&(this.onThemeUpdated(o),this.disposables.push(r$()),this.disposables.push(rx(this.onThemeUpdated,this))),this.disposables.push(this._ipc.onReceiveMessage(t=>{switch(!0){case eg.is(t):this.onWebviewFocusChanged?.(t.params.focused),window.dispatchEvent(new CustomEvent(t.params.focused?"webview-focus":"webview-blur"));break;case ef.is(t):this.onWebviewVisibilityChanged?.(t.params.visible),window.dispatchEvent(new CustomEvent(t.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(r=0,s=$(t=>{let i=`webview:${++r}`;ru().postMessage({id:i,scope:ec.scope,method:ec.method,params:t,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:r=>{let o=r.composedPath().some(t=>"INPUT"===t.tagName);(!0!==t||i!==o)&&(t=!0,i=o,s({focused:!0,inputFocused:o}))},onFocusOut:r=>{(!1!==t||!1!==i)&&(t=!1,i=!1,s({focused:!1,inputFocused:!1}))}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(t=>{t.href===t.title&&t.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(t=>t.dispose())}render(){return to`<slot></slot>`}};rA([t1({type:String})],GlWebviewApp.prototype,"name",2),rA([t1({type:String})],GlWebviewApp.prototype,"placement",2),rA([em({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),rA([em({context:"logger"})],GlWebviewApp.prototype,"_logger",2),rA([em({context:"promos"})],GlWebviewApp.prototype,"_promos",2),rA([em({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),rA([em({context:"webview"})],GlWebviewApp.prototype,"_webview",2),GlWebviewApp[eV];let App=class App{constructor(t){this.appName=t;let i=[],r=rC();null!=this.onThemeUpdated&&(this.onThemeUpdated(r),i.push(rx(this.onThemeUpdated,this))),this.state=window.bootstrap,window.bootstrap=void 0,this.placement=document.body.getAttribute("data-placement")??"editor",this._logger=new LoggerContext(t),this.log("opening..."),this._api=ru(),this._hostIpc=new r_(this.appName),i.push(this._hostIpc),this._promos=new PromosContext(this._hostIpc),i.push(this._promos),this._telemetry=new TelemetryContext(this._hostIpc),i.push(this._telemetry);let{webviewId:s,webviewInstanceId:o}=this.state;if(this._webview={webviewId:s,webviewInstanceId:o,createCommandLink:(t,i)=>(t.endsWith(":")&&(t=`${t}${s.split(".").at(-1)}`),t6(t,s,o,i))},new context_provider_i(document.body,{context:"ipc",initialValue:this._hostIpc}),new context_provider_i(document.body,{context:"logger",initialValue:this._logger}),new context_provider_i(document.body,{context:"promos",initialValue:this._promos}),new context_provider_i(document.body,{context:"telemetry",initialValue:this._telemetry}),new context_provider_i(document.body,{context:"webview",initialValue:this._webview}),null!=this.state){let t=this.getState();this.state.timestamp>=(t?.timestamp??0)?this._api.setState(this.state):this.state=t}i.push(r$()),requestAnimationFrame(()=>{this.log("initializing...");try{this.onInitialize?.(),this.bind(),null!=this.onMessageReceived&&i.push(this._hostIpc.onReceiveMessage(t=>{switch(!0){case eg.is(t):window.dispatchEvent(new CustomEvent(t.params.focused?"webview-focus":"webview-blur"));break;case ef.is(t):window.dispatchEvent(new CustomEvent(t.params.visible?"webview-visible":"webview-hidden"));break;default:this.onMessageReceived(t)}})),this.sendRequest(el,{bootstrap:!1,clientId:rm,clientLoadedAt:rb}),this.onInitialized?.()}finally{this.log("initialized"),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}}),i.push(_.on(window,"pagehide",()=>{i?.forEach(t=>t.dispose()),this.bindDisposables?.forEach(t=>t.dispose()),this.bindDisposables=void 0})),i.push(_.on(window,"gl-telemetry-fired",t=>{this._telemetry.sendEvent(t.detail)})),this.log("opened")}bind(){document.querySelectorAll("a").forEach(t=>{t.href===t.title&&t.removeAttribute("title")}),this.bindDisposables?.forEach(t=>t.dispose()),this.bindDisposables=this.onBind?.(),this.bindDisposables??=[];let t=$(t=>{this.sendCommand(ec,t)},150);this.bindDisposables.push(_.on(document,"focusin",i=>{let r=i.composedPath().some(t=>"INPUT"===t.tagName);(!0!==this._focused||this._inputFocused!==r)&&(this._focused=!0,this._inputFocused=r,t({focused:!0,inputFocused:r}))}),_.on(document,"focusout",()=>{(!1!==this._focused||!1!==this._inputFocused)&&(this._focused=!1,this._inputFocused=!1,t({focused:!1,inputFocused:!1}))}))}log(t,...i){this._logger.debug(t,...i)}getState(){return this._api.getState()}sendCommand(t,i){this._hostIpc.sendCommand(t,i)}sendRequest(t,i){return this._hostIpc.sendRequest(t,i)}setState(t){this._api.setState(t)}};function rz(t,i,r){return t?i(t):r?.(t)}function*rI(t,i){if(void 0!==t){let r=0;for(let s of t)yield i(s,r++)}}let rT=(t,i,r)=>{let s=new Map;for(let o=i;o<=r;o++)s.set(t[o],o);return s},rP=eK(class extends directive_i{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,i,r){let s;void 0===r?r=i:void 0!==i&&(s=i);let o=[],n=[],a=0;for(let i of t)o[a]=s?s(i,a):a,n[a]=r(i,a),a++;return{values:n,keys:o}}render(t,i,r){return this.dt(t,i,r).values}update(t,[i,r,s]){let o=t._$AH,{values:n,keys:a}=this.dt(i,r,s);if(!Array.isArray(o))return this.ut=a,n;let c=this.ut??=[],h=[],p,u,g=0,f=o.length-1,m=0,b=n.length-1;for(;g<=f&&m<=b;)if(null===o[g])g++;else if(null===o[f])f--;else if(c[g]===a[m])h[m]=t_(o[g],n[m]),g++,m++;else if(c[f]===a[b])h[b]=t_(o[f],n[b]),f--,b--;else if(c[g]===a[b])h[b]=t_(o[g],n[b]),tb(t,h[b+1],o[g]),g++,b--;else if(c[f]===a[m])h[m]=t_(o[f],n[m]),tb(t,o[g],o[f]),f--,m++;else if(void 0===p&&(p=rT(a,m,b),u=rT(c,g,f)),p.has(c[g]))if(p.has(c[f])){let i=u.get(a[m]),r=void 0!==i?o[i]:null;if(null===r){let i=tb(t,o[g]);t_(i,n[m]),h[m]=i}else h[m]=t_(r,n[m]),tb(t,o[g],r),o[i]=null;m++}else ty(o[f]),f--;else ty(o[g]),g++;for(;m<=b;){let i=tb(t,h[b+1]);t_(i,n[m]),h[m++]=i}for(;g<=f;){let t=o[g++];null!==t&&ty(t)}return this.ut=a,((t,i=tv)=>t._$AH=i)(t,h),ta}});let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(t){if(super(t),this.it=tl,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===tl||null==t)return this._t=void 0,this.it=t;if(t===ta)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let rj=eK(unsafe_html_e);function rR(t,i,r,s=!1,o){let n={name:"",relativePath:"",children:new Map,descendants:[]},a=t.reduce((t,s)=>{let o=t,n="";for(let t of i(s)){n=r(n,t),o.children??=new Map;let i=o.children.get(t);null==i&&(i={name:t,relativePath:n,parent:o,children:void 0,descendants:void 0},o.children.set(t,i)),o.descendants??=[],o.descendants.push(s),o=i}return o.value=s,t},n);return s&&(a=function t(i,r,s=!0,o){if(null==i.children)return i;let n=[...i.children.values()];for(let i of n)t(i,r,!1,o);if(!s&&null==i.value&&1===n.length){let t=n[0];if((null==t.value||o?.(t.value))&&(i.name=r(i.name,t.name),i.relativePath=t.relativePath,i.children=t.children,i.descendants=t.descendants,i.value=t.value,null!=i.children))for(let t of i.children.values())t.parent=i}return i}(a,r,!0,o)),a}function rM(t,i){if(null==t)return 0;let r=0;for(let s of t)r+=i(s);return r}var rL=C(379),rO=C(90);let rD=()=>new ref_h;let ref_h=class ref_h{};let rB=new WeakMap,rF=eK(class extends async_directive_f{render(t){return tl}update(t,[i]){let r=i!==this.G;return r&&void 0!==this.G&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.G=i,this.ht=t.options?.host,this.rt(this.ct=t.element)),tl}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){let i=this.ht??globalThis,r=rB.get(i);void 0===r&&(r=new WeakMap,rB.set(i,r)),void 0!==r.get(this.G)&&this.G.call(this.ht,void 0),r.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?rB.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),rN=tL`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;tL`
	.sr-only,
	.sr-only-focusable:not(:active):not(:focus-visible):not(:focus-within) {
		${rN}
	}
`;let rU=tL`
	outline: 1px solid var(--color-focus-border);
	outline-offset: -1px;
`,rq=tL`
	outline: 1px solid var(--color-focus-border);
	outline-offset: 2px;
`;tL`
	:focus-visible {
		${rU}
	}
`;let rH=tL`
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
`;tL`
	* {
		box-sizing: border-box;
	}
`,tL`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		${rU}
	}
	a:hover {
		text-decoration: underline;
	}
`;let rV=tL`
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
`;tL`
	.inline-code {
		background: var(--vscode-textCodeBlock-background);
		border-radius: 3px;
		padding: 0px 4px 2px 4px;
		font-family: var(--vscode-editor-font-family);
	}
`,tL`
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
`,tL`
	:host {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}
`,tL`
	:host {
		--gl-metadata-bar-bg: color-mix(in srgb, var(--color-background) 95%, var(--color-foreground) 5%);
		--gl-metadata-bar-border: var(--vscode-sideBarSectionHeader-border, var(--color-foreground--25));
		--gl-metadata-bar-min-height: 2.94rem;
	}
`;function rK(t,i,r,s){var o,n=arguments.length,a=n<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,i,r,s);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(a=(n<3?o(a):n>3?o(i,r,a):o(i,r))||a);return n>3&&a&&Object.defineProperty(i,r,a),a}"function"==typeof SuppressedError&&SuppressedError;let RangeChangedEvent=class RangeChangedEvent extends Event{constructor(t){super(RangeChangedEvent.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};RangeChangedEvent.eventName="rangeChanged";let VisibilityChangedEvent=class VisibilityChangedEvent extends Event{constructor(t){super(VisibilityChangedEvent.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};VisibilityChangedEvent.eventName="visibilityChanged";let UnpinnedEvent=class UnpinnedEvent extends Event{constructor(){super(UnpinnedEvent.eventName,{bubbles:!1})}};UnpinnedEvent.eventName="unpinned";let ScrollerShim=class ScrollerShim{constructor(t){this._element=null;let i=t??window;this._node=i,t&&(this._element=t)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}};let ScrollerController=class ScrollerController extends ScrollerShim{constructor(t,i){super(i),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let r=this._node;this._originalScrollTo=r.scrollTo,this._originalScrollBy=r.scrollBy,this._originalScroll=r.scroll,this._attach(t)}get _destination(){return this.__destination}get scrolling(){return null!==this._destination}scrollTo(t,i){this._scrollTo("number"==typeof t&&"number"==typeof i?{left:t,top:i}:t)}scrollBy(t,i){let r="number"==typeof t&&"number"==typeof i?{left:t,top:i}:t;void 0!==r.top&&(r.top+=this.scrollTop),void 0!==r.left&&(r.left+=this.scrollLeft),this._scrollTo(r)}_nativeScrollTo(t){this._originalScrollTo.bind(this._element||window)(t)}_scrollTo(t,i=null,r=null){null!==this._end&&this._end(),"smooth"===t.behavior?(this._setDestination(t),this._retarget=i,this._end=r):this._resetScrollState(),this._nativeScrollTo(t)}_setDestination(t){let{top:i,left:r}=t;return i=void 0===i?void 0:Math.max(0,Math.min(i,this.maxScrollTop)),r=void 0===r?void 0:Math.max(0,Math.min(r,this.maxScrollLeft)),(null===this._destination||r!==this._destination.left||i!==this._destination.top)&&(this.__destination={top:i,left:r,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(t){this._destination&&this._setDestination(t)&&this._nativeScrollTo(this._destination)}managedScrollTo(t,i,r){return this._scrollTo(t,i,r),this._updateManagedScrollTo}correctScrollError(t){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(t),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(null!==this._destination){let{scrollTop:t,scrollLeft:i}=this,{top:r,left:s}=this._destination;r=Math.min(r||0,this.maxScrollTop);let o=Math.abs((s=Math.min(s||0,this.maxScrollLeft))-i);1>Math.abs(r-t)&&o<1&&(this._end&&this._end(),this._resetScrollState())}}detach(t){return this._clients.delete(t),0===this._clients.size&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(t){this._clients.add(t),1===this._clients.size&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};let rW="u">typeof window?window.ResizeObserver:void 0,rG=Symbol("virtualizerRef"),rZ="virtualizer-sizer";let Virtualizer=class Virtualizer{constructor(t){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!t)throw Error("Virtualizer constructor requires a configuration object");if(t.hostElement)this._init(t);else throw Error('Virtualizer configuration requires the "hostElement" property')}set items(t){Array.isArray(t)&&t!==this._items&&(this._itemsChanged=!0,this._items=t,this._schedule(this._updateLayout))}_init(t){this._isScroller=!!t.scroller,this._initHostElement(t);let i=t.layout||{};this._layoutInitialized=this._initLayout(i)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new rW(()=>this._hostElementSizeChanged()),this._childrenRO=new rW(this._childrenSizeChanged.bind(this))}_initHostElement(t){let i=this._hostElement=t.hostElement;this._applyVirtualizerStyles(),i[rG]=this}connected(){this._initObservers();let t=this._isScroller;this._clippingAncestors=function(t,i=!1){let r=!1;return(function(t,i=!1){let r=[],s=i?t:rQ(t);for(;null!==s;)r.push(s),s=rQ(s);return r})(t,i).filter(t=>{if(r)return!1;let i=getComputedStyle(t);return r="fixed"===i.position,"visible"!==i.overflow})}(this._hostElement,t),this._scrollerController=new ScrollerController(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(t=>{t.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(t),this._hostElementRO.observe(t)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(t=>this._childrenRO.observe(t)),this._scrollEventListeners.forEach(t=>t.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(t=>t.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let t=this._hostElement.style;t.display=t.display||"block",t.position=t.position||"relative",t.contain=t.contain||"size layout",this._isScroller&&(t.overflow=t.overflow||"auto",t.minHeight=t.minHeight||"150px")}_getSizer(){let t=this._hostElement;if(!this._sizer){let i=t.querySelector(`[${rZ}]`);i||((i=document.createElement("div")).setAttribute(rZ,""),t.appendChild(i)),Object.assign(i.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),i.textContent="&nbsp;",i.setAttribute(rZ,""),this._sizer=i}return this._sizer}async updateLayoutConfig(t){await this._layoutInitialized;let i=t.type||n;if("function"==typeof i&&this._layout instanceof i){let i={...t};return delete i.type,this._layout.config=i,!0}return!1}async _initLayout(t){let i,r;if("function"==typeof t.type){r=t.type;let s={...t};delete s.type,i=s}else i=t;void 0===r&&(n=r=(await Promise.resolve().then(C.bind(C,90))).FlowLayout),this._layout=new r(t=>this._handleLayoutMessage(t),i),this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){let t=window.performance.now(),i=t-this._benchmarkStart,r=performance.getEntriesByName("uv-virtualizing","measure").filter(i=>i.startTime>=this._benchmarkStart&&i.startTime<t).reduce((t,i)=>t+i.duration,0);return this._benchmarkStart=null,{timeElapsed:i,virtualizationTime:r}}return null}_measureChildren(){let t={},i=this._children,r=this._measureChildOverride||this._measureChild;for(let s=0;s<i.length;s++){let o=i[s],n=this._first+s;(this._itemsChanged||this._toBeMeasured.has(o))&&(t[n]=r.call(this,o,this._items[n]))}this._childMeasurements=t,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(t){var i;let r,{width:s,height:o}=t.getBoundingClientRect();return Object.assign({width:s,height:o},(i=t,{marginTop:rX((r=window.getComputedStyle(i)).marginTop),marginRight:rX(r.marginRight),marginBottom:rX(r.marginBottom),marginLeft:rX(r.marginLeft)}))}async _schedule(t){this._scheduled.has(t)||(this._scheduled.add(t),await Promise.resolve(),this._scheduled.delete(t),t.call(this))}async _updateDOM(t){this._scrollSize=t.scrollSize,this._adjustRange(t.range),this._childrenPos=t.childPositions,this._scrollError=t.scrollError||null;let{_rangeChanged:i,_itemsChanged:r}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(i||r)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(t=>this._childrenRO.observe(t)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch{}window.performance.mark("uv-start")}!1===this._scrollerController.correctingScrollError&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(t){"scroll"===t.type&&(t.currentTarget===window||this._clippingAncestors.includes(t.currentTarget))&&this._handleScrollEvent()}_handleLayoutMessage(t){"stateChanged"===t.type?this._updateDOM(t):"visibilityChanged"===t.type?(this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._notifyVisibility()):"unpinned"===t.type&&this._hostElement.dispatchEvent(new UnpinnedEvent)}get _children(){let t=[],i=this._hostElement.firstElementChild;for(;i;)i.hasAttribute(rZ)||t.push(i),i=i.nextElementSibling;return t}_updateView(){let t=this._hostElement,i=this._scrollerController?.element,r=this._layout;if(t&&i&&r){let s,o,n,a,c=t.getBoundingClientRect();s=0,o=0,n=window.innerHeight,a=window.innerWidth;let h=this._clippingAncestors.map(t=>t.getBoundingClientRect());for(let t of(h.unshift(c),h))s=Math.max(s,t.top),o=Math.max(o,t.left),n=Math.min(n,t.bottom),a=Math.min(a,t.right);let p=i.getBoundingClientRect(),u={left:c.left-p.left,top:c.top-p.top},g={width:i.scrollWidth,height:i.scrollHeight},f=s-c.top+t.scrollTop,m=o-c.left+t.scrollLeft;r.viewportSize={width:Math.max(0,a-o),height:Math.max(0,n-s)},r.viewportScroll={top:f,left:m},r.totalScrollSize=g,r.offsetWithinScroller=u}}_sizeHostElement(t){let i=t&&null!==t.width?Math.min(82e5,t.width):0,r=t&&null!==t.height?Math.min(82e5,t.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${i}px, ${r}px)`;else{let t=this._hostElement.style;t.minWidth=i?`${i}px`:"100%",t.minHeight=r?`${r}px`:"100%"}}_positionChildren(t){t&&t.forEach(({top:t,left:i,width:r,height:s,xOffset:o,yOffset:n},a)=>{let c=this._children[a-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${i}px, ${t}px)`,void 0!==r&&(c.style.width=r+"px"),void 0!==s&&(c.style.height=s+"px"),c.style.left=void 0===o?null:o+"px",c.style.top=void 0===n?null:n+"px")})}async _adjustRange(t){let{_first:i,_last:r,_firstVisible:s,_lastVisible:o}=this;this._first=t.first,this._last=t.last,this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==i||this._last!==r,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==s||this._lastVisible!==o}_correctScrollError(){if(this._scrollError){let{scrollTop:t,scrollLeft:i}=this._scrollerController,{top:r,left:s}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:t-r,left:i-s})}}element(t){return t===1/0&&(t=this._items.length-1),this._items?.[t]===void 0?void 0:{scrollIntoView:(i={})=>this._scrollElementIntoView({...i,index:t})}}_scrollElementIntoView(t){if(t.index>=this._first&&t.index<=this._last)this._children[t.index-this._first].scrollIntoView(t);else if(t.index=Math.min(t.index,this._items.length-1),"smooth"===t.behavior){let i=this._layout.getScrollIntoViewCoordinates(t),{behavior:r}=t;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(i,{behavior:r}),()=>this._layout.getScrollIntoViewCoordinates(t),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=t}else this._layout.pin=t}_checkScrollIntoViewTarget(t){let{index:i}=this._scrollIntoViewTarget||{};i&&t?.has(i)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new RangeChangedEvent({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new VisibilityChangedEvent({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((t,i)=>{this._layoutCompleteResolver=t,this._layoutCompleteRejecter=i})),this._layoutCompletePromise}_rejectLayoutCompletePromise(t){null!==this._layoutCompleteRejecter&&this._layoutCompleteRejecter(t),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&null===this._pendingLayoutComplete&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){null!==this._layoutCompleteResolver&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(t){if(this._layout?.measureChildren){for(let i of t)this._toBeMeasured.set(i.target,i.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function rX(t){let i=t?parseFloat(t):NaN;return Number.isNaN(i)?0:i}function rQ(t){if(null!==t.assignedSlot)return t.assignedSlot;if(null!==t.parentElement)return t.parentElement;let i=t.parentNode;return i&&i.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&i.host||null}let rY=t=>t,rJ=(t,i)=>to`${i}: ${JSON.stringify(t,null,2)}`;let VirtualizeDirective=class VirtualizeDirective extends async_directive_f{constructor(t){if(super(t),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(t,i)=>rJ(t,i+this._first),this._keyFunction=(t,i)=>rY(t,this._first),this._items=[],2!==t.type)throw Error("The virtualize directive can only be used in child expressions")}render(t){t&&this._setFunctions(t);let i=[];if(this._first>=0&&this._last>=this._first)for(let t=this._first;t<=this._last;t++)i.push(this._items[t]);return rP(i,this._keyFunction,this._renderItem)}update(t,[i]){this._setFunctions(i);let r=this._items!==i.items;return this._items=i.items||[],this._virtualizer?this._updateVirtualizerConfig(t,i):this._initialize(t,i),r?ta:this.render()}async _updateVirtualizerConfig(t,i){if(!await this._virtualizer.updateLayoutConfig(i.layout||{})){let r=t.parentNode;this._makeVirtualizer(r,i)}this._virtualizer.items=this._items}_setFunctions(t){let{renderItem:i,keyFunction:r}=t;i&&(this._renderItem=(t,r)=>i(t,r+this._first)),r&&(this._keyFunction=(t,i)=>r(t,i+this._first))}_makeVirtualizer(t,i){this._virtualizer&&this._virtualizer.disconnected();let{layout:r,scroller:s,items:o}=i;this._virtualizer=new Virtualizer({hostElement:t,layout:r,scroller:s}),this._virtualizer.items=o,this._virtualizer.connected()}_initialize(t,i){let r=t.parentNode;r&&1===r.nodeType&&(r.addEventListener("rangeChanged",t=>{this._first=t.first,this._last=t.last,this.setValue(this.render())}),this._makeVirtualizer(r,i))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}};let r0=eK(VirtualizeDirective);let LitVirtualizer=class LitVirtualizer extends lit_element_i{constructor(){super(...arguments),this.items=[],this.renderItem=rJ,this.keyFunction=rY,this.layout={},this.scroller=!1}createRenderRoot(){return this}render(){let{items:t,renderItem:i,keyFunction:r,layout:s,scroller:o}=this;return to`${r0({items:t,renderItem:i,keyFunction:r,layout:s,scroller:o})}`}element(t){return this[rG]?.element(t)}get layoutComplete(){return this[rG]?.layoutComplete}scrollToIndex(t,i="start"){this.element(t)?.scrollIntoView({block:i})}};rK([t1({attribute:!1})],LitVirtualizer.prototype,"items",void 0),rK([t1()],LitVirtualizer.prototype,"renderItem",void 0),rK([t1()],LitVirtualizer.prototype,"keyFunction",void 0),rK([t1({attribute:!1})],LitVirtualizer.prototype,"layout",void 0),rK([t1({reflect:!0,type:Boolean})],LitVirtualizer.prototype,"scroller",void 0),customElements.define("lit-virtualizer",LitVirtualizer);let r1=navigator?.userAgentData?.platform,r2=navigator.userAgent;"Linux"===r1||r2.includes("Linux");let r3="macOS"===r1||r2.includes("Macintosh");"Windows"===r1||r2.includes("Windows");let ModifierKeysTracker=class ModifierKeysTracker{constructor(){this._altKey=!1,this._shiftKey=!1,this._ctrlKey=!1,this._metaKey=!1,this._hosts=new Set,this._listening=!1,this._onKey=t=>{let i=t.altKey||"keydown"===t.type&&"Alt"===t.key,r=t.shiftKey||"keydown"===t.type&&"Shift"===t.key,s=t.ctrlKey||"keydown"===t.type&&"Control"===t.key,o=t.metaKey||"keydown"===t.type&&"Meta"===t.key,n=("keyup"!==t.type||"Alt"!==t.key)&&i,a=("keyup"!==t.type||"Shift"!==t.key)&&r,c=("keyup"!==t.type||"Control"!==t.key)&&s,h=("keyup"!==t.type||"Meta"!==t.key)&&o;(this._altKey!==n||this._shiftKey!==a||this._ctrlKey!==c||this._metaKey!==h)&&(this._altKey=n,this._shiftKey=a,this._ctrlKey=c,this._metaKey=h,this._notify())},this._onBlur=()=>{this._reset()}}get altKey(){return this._altKey}get shiftKey(){return this._shiftKey}get ctrlKey(){return this._ctrlKey}get metaKey(){return this._metaKey}subscribe(t){return this._hosts.add(t),this._listening||this._start(),()=>{this._hosts.delete(t),0===this._hosts.size&&this._stop()}}_start(){this._listening=!0,window.addEventListener("keydown",this._onKey,{capture:!0}),window.addEventListener("keyup",this._onKey,{capture:!0}),window.addEventListener("blur",this._onBlur)}_stop(){this._listening=!1,window.removeEventListener("keydown",this._onKey,{capture:!0}),window.removeEventListener("keyup",this._onKey,{capture:!0}),window.removeEventListener("blur",this._onBlur),this._reset()}_reset(){let t=this._altKey||this._shiftKey||this._ctrlKey||this._metaKey;this._altKey=this._shiftKey=this._ctrlKey=this._metaKey=!1,t&&this._notify()}_notify(){for(let t of this._hosts)t.requestUpdate()}};let r5=new ModifierKeysTracker;let ModifierKeysController=class ModifierKeysController{constructor(t){this.host=t,t.addController(this)}get altKey(){return r5.altKey}get shiftKey(){return r5.shiftKey}get ctrlKey(){return r5.ctrlKey}get metaKey(){return r5.metaKey}hostConnected(){this._unsubscribe=r5.subscribe(this.host)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}};var r4=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},r7=tL`
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
`;let r6=new Set,r8=new Map,r9="ltr",se="en",st="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(st){let t=new MutationObserver(sr);r9=document.documentElement.dir||"ltr",se=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function si(...t){t.map(t=>{let i=t.$code.toLowerCase();r8.has(i)?r8.set(i,Object.assign(Object.assign({},r8.get(i)),t)):r8.set(i,t),a||(a=t)}),sr()}function sr(){st&&(r9=document.documentElement.dir||"ltr",se=document.documentElement.lang||navigator.language),[...r6.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){r6.add(this.host)}hostDisconnected(){r6.delete(this.host)}dir(){return`${this.host.dir||r9}`.toLowerCase()}lang(){return`${this.host.lang||se}`.toLowerCase()}getTranslationData(t){var i,r;let s=new Intl.Locale(t.replace(/_/g,"-")),o=null==s?void 0:s.language.toLowerCase(),n=null!=(r=null==(i=null==s?void 0:s.region)?void 0:i.toLowerCase())?r:"",a=r8.get(`${o}-${n}`),c=r8.get(o);return{locale:s,language:o,region:n,primary:a,secondary:c}}exists(t,i){var r;let{primary:s,secondary:o}=this.getTranslationData(null!=(r=i.lang)?r:this.lang());return i=Object.assign({includeFallback:!1},i),!!s&&!!s[t]||!!o&&!!o[t]||!!i.includeFallback&&!!a&&!!a[t]}term(t,...i){let r,{primary:s,secondary:o}=this.getTranslationData(this.lang());if(s&&s[t])r=s[t];else if(o&&o[t])r=o[t];else{if(!a||!a[t])return String(t);r=a[t]}return"function"==typeof r?r(...i):r}date(t,i){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),i).format(t)}number(t,i){return isNaN(t=Number(t))?"":new Intl.NumberFormat(this.lang(),i).format(t)}relativeTime(t,i,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(t,i)}};var ss={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",createOption:t=>`Create "${t}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(t,i)=>`Go to slide ${t} of ${i}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numCharacters:t=>1===t?"1 character":`${t} characters`,numCharactersRemaining:t=>1===t?"1 character remaining":`${t} characters remaining`,numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};si(ss);var so=class extends LocalizeController{};si(ss);var sn=Object.defineProperty,sa=Object.getOwnPropertyDescriptor,sl=t=>{throw TypeError(t)},sc=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?sa(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&sn(i,r,n),n},sh=(t,i,r)=>i.has(t)||sl("Cannot "+r),sd=tL`
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
`,sp=class extends lit_element_i{constructor(){let t;super(),(t=y).has(this)?sl("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(this):t.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,i)=>{if(this.internals?.states)try{i?this.internals.states.add(t):this.internals.states.delete(t)}catch(t){if(String(t).includes("must start with '--'"));else throw t}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{}for(let[t,i]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===i.default&&void 0!==i.initial&&"string"==typeof t&&this.customStates.set(`initial-${t}-${i.initial}`,!0)}static get styles(){return[sd,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(t,i,r){let s,o;if(sh(this,s=y,"read from private field"),o?!o.call(this):!s.get(this)){let t,i;this.constructor.elementProperties.forEach((t,i)=>{t.reflect&&null!=this[i]&&this.initialReflectedProperties.set(i,this[i])}),sh(this,t=y,"write to private field"),i?i.call(this,!0):t.set(this,!0)}super.attributeChangedCallback(t,i,r)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((i,r)=>{t.has(r)&&null==this[r]&&(this[r]=i)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(t){if(this.didSSR&&!this.hasUpdated){let i=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});i.error=t,this.dispatchEvent(i)}throw t}}relayNativeEvent(t,i){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...i}))}};y=new WeakMap,sc([t1()],sp.prototype,"dir",2),sc([t1()],sp.prototype,"lang",2),sc([t1({type:Boolean,reflect:!0,attribute:"did-ssr"})],sp.prototype,"didSSR",2);let su=Math.min,sg=Math.max,sf=Math.round,sm=Math.floor,sb=t=>({x:t,y:t}),s_={left:"right",right:"left",bottom:"top",top:"bottom"};function sv(t,i){return"function"==typeof t?t(i):t}function sy(t){return t.split("-")[0]}function sw(t){return t.split("-")[1]}function sk(t){return"x"===t?"y":"x"}function sx(t){return"y"===t?"height":"width"}function sC(t){let i=t[0];return"t"===i||"b"===i?"y":"x"}function s$(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}let sE=["left","right"],sS=["right","left"],sA=["top","bottom"],sz=["bottom","top"];function sI(t){let i=sy(t);return s_[i]+t.slice(i.length)}function sT(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function sP(t){let{x:i,y:r,width:s,height:o}=t;return{width:s,height:o,top:r,left:i,right:i+s,bottom:r+o,x:i,y:r}}function sj(t,i,r){let s,{reference:o,floating:n}=t,a=sC(i),c=sk(sC(i)),h=sx(c),p=sy(i),u="y"===a,g=o.x+o.width/2-n.width/2,f=o.y+o.height/2-n.height/2,m=o[h]/2-n[h]/2;switch(p){case"top":s={x:g,y:o.y-n.height};break;case"bottom":s={x:g,y:o.y+o.height};break;case"right":s={x:o.x+o.width,y:f};break;case"left":s={x:o.x-n.width,y:f};break;default:s={x:o.x,y:o.y}}switch(sw(i)){case"start":s[c]-=m*(r&&u?-1:1);break;case"end":s[c]+=m*(r&&u?-1:1)}return s}async function sR(t,i){var r;void 0===i&&(i={});let{x:s,y:o,platform:n,rects:a,elements:c,strategy:h}=t,{boundary:p="clippingAncestors",rootBoundary:u="viewport",elementContext:g="floating",altBoundary:f=!1,padding:m=0}=sv(i,t),b=sT(m),_=c[f?"floating"===g?"reference":"floating":g],v=sP(await n.getClippingRect({element:null==(r=await (null==n.isElement?void 0:n.isElement(_)))||r?_:_.contextElement||await (null==n.getDocumentElement?void 0:n.getDocumentElement(c.floating)),boundary:p,rootBoundary:u,strategy:h})),y="floating"===g?{x:s,y:o,width:a.floating.width,height:a.floating.height}:a.reference,w=await (null==n.getOffsetParent?void 0:n.getOffsetParent(c.floating)),x=await (null==n.isElement?void 0:n.isElement(w))&&await (null==n.getScale?void 0:n.getScale(w))||{x:1,y:1},C=sP(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:y,offsetParent:w,strategy:h}):y);return{top:(v.top-C.top+b.top)/x.y,bottom:(C.bottom-v.bottom+b.bottom)/x.y,left:(v.left-C.left+b.left)/x.x,right:(C.right-v.right+b.right)/x.x}}let sM=async(t,i,r)=>{let{placement:s="bottom",strategy:o="absolute",middleware:n=[],platform:a}=r,c=a.detectOverflow?a:{...a,detectOverflow:sR},h=await (null==a.isRTL?void 0:a.isRTL(i)),p=await a.getElementRects({reference:t,floating:i,strategy:o}),{x:u,y:g}=sj(p,s,h),f=s,m=0,b={};for(let r=0;r<n.length;r++){let _=n[r];if(!_)continue;let{name:v,fn:y}=_,{x:w,y:x,data:C,reset:$}=await y({x:u,y:g,initialPlacement:s,placement:f,strategy:o,middlewareData:b,rects:p,platform:c,elements:{reference:t,floating:i}});u=null!=w?w:u,g=null!=x?x:g,b[v]={...b[v],...C},$&&m<50&&(m++,"object"==typeof $&&($.placement&&(f=$.placement),$.rects&&(p=!0===$.rects?await a.getElementRects({reference:t,floating:i,strategy:o}):$.rects),{x:u,y:g}=sj(p,f,h)),r=-1)}return{x:u,y:g,placement:f,strategy:o,middlewareData:b}},sL=new Set(["left","top"]);async function sO(t,i){let{placement:r,platform:s,elements:o}=t,n=await (null==s.isRTL?void 0:s.isRTL(o.floating)),a=sy(r),c=sw(r),h="y"===sC(r),p=sL.has(a)?-1:1,u=n&&h?-1:1,g=sv(i,t),{mainAxis:f,crossAxis:m,alignmentAxis:b}="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:g.mainAxis||0,crossAxis:g.crossAxis||0,alignmentAxis:g.alignmentAxis};return c&&"number"==typeof b&&(m="end"===c?-1*b:b),h?{x:m*u,y:f*p}:{x:f*p,y:m*u}}function sD(){return"u">typeof window}function sB(t){return sU(t)?(t.nodeName||"").toLowerCase():"#document"}function sF(t){var i;return(null==t||null==(i=t.ownerDocument)?void 0:i.defaultView)||window}function sN(t){var i;return null==(i=(sU(t)?t.ownerDocument:t.document)||window.document)?void 0:i.documentElement}function sU(t){return!!sD()&&(t instanceof Node||t instanceof sF(t).Node)}function sq(t){return!!sD()&&(t instanceof Element||t instanceof sF(t).Element)}function sH(t){return!!sD()&&(t instanceof HTMLElement||t instanceof sF(t).HTMLElement)}function sV(t){return!(!sD()||"u"<typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof sF(t).ShadowRoot)}function sK(t){let{overflow:i,overflowX:r,overflowY:s,display:o}=s0(t);return/auto|scroll|overlay|hidden|clip/.test(i+s+r)&&"inline"!==o&&"contents"!==o}function sW(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}let sG=/transform|translate|scale|rotate|perspective|filter/,sZ=/paint|layout|strict|content/,sX=t=>!!t&&"none"!==t;function sQ(t){let i=sq(t)?s0(t):t;return sX(i.transform)||sX(i.translate)||sX(i.scale)||sX(i.rotate)||sX(i.perspective)||!sY()&&(sX(i.backdropFilter)||sX(i.filter))||sG.test(i.willChange||"")||sZ.test(i.contain||"")}function sY(){return null==c&&(c="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),c}function sJ(t){return/^(html|body|#document)$/.test(sB(t))}function s0(t){return sF(t).getComputedStyle(t)}function s1(t){return sq(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function s2(t){if("html"===sB(t))return t;let i=t.assignedSlot||t.parentNode||sV(t)&&t.host||sN(t);return sV(i)?i.host:i}function s3(t,i,r){var s;void 0===i&&(i=[]),void 0===r&&(r=!0);let o=function t(i){let r=s2(i);return sJ(r)?i.ownerDocument?i.ownerDocument.body:i.body:sH(r)&&sK(r)?r:t(r)}(t),n=o===(null==(s=t.ownerDocument)?void 0:s.body),a=sF(o);if(!n)return i.concat(o,s3(o,[],r));{let t=s5(a);return i.concat(a,a.visualViewport||[],sK(o)?o:[],t&&r?s3(t):[])}}function s5(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function s4(t){let i=s0(t),r=parseFloat(i.width)||0,s=parseFloat(i.height)||0,o=sH(t),n=o?t.offsetWidth:r,a=o?t.offsetHeight:s,c=sf(r)!==n||sf(s)!==a;return c&&(r=n,s=a),{width:r,height:s,$:c}}function s7(t){return sq(t)?t:t.contextElement}function s6(t){let i=s7(t);if(!sH(i))return sb(1);let r=i.getBoundingClientRect(),{width:s,height:o,$:n}=s4(i),a=(n?sf(r.width):r.width)/s,c=(n?sf(r.height):r.height)/o;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let s8=sb(0);function s9(t){let i=sF(t);return sY()&&i.visualViewport?{x:i.visualViewport.offsetLeft,y:i.visualViewport.offsetTop}:s8}function oe(t,i,r,s){var o;void 0===i&&(i=!1),void 0===r&&(r=!1);let n=t.getBoundingClientRect(),a=s7(t),c=sb(1);i&&(s?sq(s)&&(c=s6(s)):c=s6(t));let h=(void 0===(o=r)&&(o=!1),s&&(!o||s===sF(a))&&o)?s9(a):sb(0),p=(n.left+h.x)/c.x,u=(n.top+h.y)/c.y,g=n.width/c.x,f=n.height/c.y;if(a){let t=sF(a),i=s&&sq(s)?sF(s):s,r=t,o=s5(r);for(;o&&s&&i!==r;){let t=s6(o),i=o.getBoundingClientRect(),s=s0(o),n=i.left+(o.clientLeft+parseFloat(s.paddingLeft))*t.x,a=i.top+(o.clientTop+parseFloat(s.paddingTop))*t.y;p*=t.x,u*=t.y,g*=t.x,f*=t.y,p+=n,u+=a,o=s5(r=sF(o))}}return sP({width:g,height:f,x:p,y:u})}function ot(t,i){let r=s1(t).scrollLeft;return i?i.left+r:oe(sN(t)).left+r}function oi(t,i){let r=t.getBoundingClientRect();return{x:r.left+i.scrollLeft-ot(t,r),y:r.top+i.scrollTop}}function or(t,i,r){var s;let o;if("viewport"===i)o=function(t,i){let r=sF(t),s=sN(t),o=r.visualViewport,n=s.clientWidth,a=s.clientHeight,c=0,h=0;if(o){n=o.width,a=o.height;let t=sY();(!t||t&&"fixed"===i)&&(c=o.offsetLeft,h=o.offsetTop)}let p=ot(s);if(p<=0){let t=s.ownerDocument,i=t.body,r=getComputedStyle(i),o="CSS1Compat"===t.compatMode&&parseFloat(r.marginLeft)+parseFloat(r.marginRight)||0,a=Math.abs(s.clientWidth-i.clientWidth-o);a<=25&&(n-=a)}else p<=25&&(n+=p);return{width:n,height:a,x:c,y:h}}(t,r);else if("document"===i){let i,r,n,a,c,h,p;s=sN(t),i=sN(s),r=s1(s),n=s.ownerDocument.body,a=sg(i.scrollWidth,i.clientWidth,n.scrollWidth,n.clientWidth),c=sg(i.scrollHeight,i.clientHeight,n.scrollHeight,n.clientHeight),h=-r.scrollLeft+ot(s),p=-r.scrollTop,"rtl"===s0(n).direction&&(h+=sg(i.clientWidth,n.clientWidth)-a),o={width:a,height:c,x:h,y:p}}else if(sq(i)){let t,s,n,a,c,h;s=(t=oe(i,!0,"fixed"===r)).top+i.clientTop,n=t.left+i.clientLeft,a=sH(i)?s6(i):sb(1),c=i.clientWidth*a.x,h=i.clientHeight*a.y,o={width:c,height:h,x:n*a.x,y:s*a.y}}else{let r=s9(t);o={x:i.x-r.x,y:i.y-r.y,width:i.width,height:i.height}}return sP(o)}function os(t){return"static"===s0(t).position}function oo(t,i){if(!sH(t)||"fixed"===s0(t).position)return null;if(i)return i(t);let r=t.offsetParent;return sN(t)===r&&(r=r.ownerDocument.body),r}function on(t,i){var r;let s=sF(t);if(sW(t))return s;if(!sH(t)){let i=s2(t);for(;i&&!sJ(i);){if(sq(i)&&!os(i))return i;i=s2(i)}return s}let o=oo(t,i);for(;o&&(r=o,/^(table|td|th)$/.test(sB(r)))&&os(o);)o=oo(o,i);return o&&sJ(o)&&os(o)&&!sQ(o)?s:o||function(t){let i=s2(t);for(;sH(i)&&!sJ(i);){if(sQ(i))return i;if(sW(i))break;i=s2(i)}return null}(t)||s}let oa=async function(t){let i=this.getOffsetParent||on,r=this.getDimensions,s=await r(t.floating);return{reference:function(t,i,r){let s=sH(i),o=sN(i),n="fixed"===r,a=oe(t,!0,n,i),c={scrollLeft:0,scrollTop:0},h=sb(0);if(s||!s&&!n)if(("body"!==sB(i)||sK(o))&&(c=s1(i)),s){let t=oe(i,!0,n,i);h.x=t.x+i.clientLeft,h.y=t.y+i.clientTop}else o&&(h.x=ot(o));n&&!s&&o&&(h.x=ot(o));let p=!o||s||n?sb(0):oi(o,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(t.reference,await i(t.floating),t.strategy),floating:{x:0,y:0,width:s.width,height:s.height}}},ol={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:i,rect:r,offsetParent:s,strategy:o}=t,n="fixed"===o,a=sN(s),c=!!i&&sW(i.floating);if(s===a||c&&n)return r;let h={scrollLeft:0,scrollTop:0},p=sb(1),u=sb(0),g=sH(s);if((g||!g&&!n)&&(("body"!==sB(s)||sK(a))&&(h=s1(s)),g)){let t=oe(s);p=s6(s),u.x=t.x+s.clientLeft,u.y=t.y+s.clientTop}let f=!a||g||n?sb(0):oi(a,h);return{width:r.width*p.x,height:r.height*p.y,x:r.x*p.x-h.scrollLeft*p.x+u.x+f.x,y:r.y*p.y-h.scrollTop*p.y+u.y+f.y}},getDocumentElement:sN,getClippingRect:function(t){let{element:i,boundary:r,rootBoundary:s,strategy:o}=t,n=[..."clippingAncestors"===r?sW(i)?[]:function(t,i){let r=i.get(t);if(r)return r;let s=s3(t,[],!1).filter(t=>sq(t)&&"body"!==sB(t)),o=null,n="fixed"===s0(t).position,a=n?s2(t):t;for(;sq(a)&&!sJ(a);){let i=s0(a),r=sQ(a);r||"fixed"!==i.position||(o=null),(n?r||o:!(!r&&"static"===i.position&&o&&("absolute"===o.position||"fixed"===o.position)||sK(a)&&!r&&function t(i,r){let s=s2(i);return!(s===r||!sq(s)||sJ(s))&&("fixed"===s0(s).position||t(s,r))}(t,a)))?o=i:s=s.filter(t=>t!==a),a=s2(a)}return i.set(t,s),s}(i,this._c):[].concat(r),s],a=or(i,n[0],o),c=a.top,h=a.right,p=a.bottom,u=a.left;for(let t=1;t<n.length;t++){let r=or(i,n[t],o);c=sg(r.top,c),h=su(r.right,h),p=su(r.bottom,p),u=sg(r.left,u)}return{width:h-u,height:p-c,x:u,y:c}},getOffsetParent:on,getElementRects:oa,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:i,height:r}=s4(t);return{width:i,height:r}},getScale:s6,isElement:sq,isRTL:function(t){return"rtl"===s0(t).direction}};function oc(t,i){return t.x===i.x&&t.y===i.y&&t.width===i.width&&t.height===i.height}let oh=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(i){var r,s;let o,n,{placement:a,rects:c,platform:h,elements:p}=i,{apply:u=()=>{},...g}=sv(t,i),f=await h.detectOverflow(i,g),m=sy(a),b=sw(a),_="y"===sC(a),{width:v,height:y}=c.floating;"top"===m||"bottom"===m?(o=m,n=b===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(n=m,o="end"===b?"top":"bottom");let w=y-f.top-f.bottom,x=v-f.left-f.right,C=su(y-f[o],w),$=su(v-f[n],x),E=!i.middlewareData.shift,A=C,T=$;if(null!=(r=i.middlewareData.shift)&&r.enabled.x&&(T=x),null!=(s=i.middlewareData.shift)&&s.enabled.y&&(A=w),E&&!b){let t=sg(f.left,0),i=sg(f.right,0),r=sg(f.top,0),s=sg(f.bottom,0);_?T=v-2*(0!==t||0!==i?t+i:sg(f.left,f.right)):A=y-2*(0!==r||0!==s?r+s:sg(f.top,f.bottom))}await u({...i,availableWidth:T,availableHeight:A});let P=await h.getDimensions(p.floating);return v!==P.width||y!==P.height?{reset:{rects:!0}}:{}}}};function od(t){var i=t;for(let t=i;t;t=op(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=op(i);t;t=op(t)){if(!(t instanceof Element))continue;let i=getComputedStyle(t);if("contents"!==i.display&&("static"!==i.position||sQ(i)||"BODY"===t.tagName))return t}return null}function op(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}let ou=eK(class extends directive_i{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(i=>t[i]).join(" ")+" "}update(t,[i]){if(void 0===this.st){for(let r in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),i)i[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(i)}let r=t.element.classList;for(let t of this.st)t in i||(r.remove(t),this.st.delete(t));for(let t in i){let s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)))}return ta}});function og(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}var of=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),om=class extends sp{constructor(){super(...arguments),this.localize=new so(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),i=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom"),s=0,o=0,n=0,a=0,c=0,h=0,p=0,u=0;r?t.top<i.top?(s=t.left,o=t.bottom,n=t.right,a=t.bottom,c=i.left,h=i.top,p=i.right,u=i.top):(s=i.left,o=i.bottom,n=i.right,a=i.bottom,c=t.left,h=t.top,p=t.right,u=t.top):t.left<i.left?(s=t.right,o=t.top,n=i.left,a=i.top,c=t.right,h=t.bottom,p=i.left,u=i.bottom):(s=i.right,o=i.top,n=t.left,a=t.top,c=i.right,h=i.bottom,p=t.left,u=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${s}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||og(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(t,i,r,s){let o;void 0===s&&(s={});let{ancestorScroll:n=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=s,u=s7(t),g=n||a?[...u?s3(u):[],...i?s3(i):[]]:[];g.forEach(t=>{n&&t.addEventListener("scroll",r,{passive:!0}),a&&t.addEventListener("resize",r)});let f=u&&h?function(t,i){let r,s=null,o=sN(t);function n(){var t;clearTimeout(r),null==(t=s)||t.disconnect(),s=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),n();let p=t.getBoundingClientRect(),{left:u,top:g,width:f,height:m}=p;if(c||i(),!f||!m)return;let b={rootMargin:-sm(g)+"px "+-sm(o.clientWidth-(u+f))+"px "+-sm(o.clientHeight-(g+m))+"px "+-sm(u)+"px",threshold:sg(0,su(1,h))||1},_=!0;function v(i){let s=i[0].intersectionRatio;if(s!==h){if(!_)return a();s?a(!1,s):r=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==s||oc(p,t.getBoundingClientRect())||a(),_=!1}try{s=new IntersectionObserver(v,{...b,root:o.ownerDocument})}catch{s=new IntersectionObserver(v,b)}s.observe(t)}(!0),n}(u,r):null,m=-1,b=null;c&&(b=new ResizeObserver(t=>{let[s]=t;s&&s.target===u&&b&&i&&(b.unobserve(i),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var t;null==(t=b)||t.observe(i)})),r()}),u&&!p&&b.observe(u),i&&b.observe(i));let _=p?oe(t):null;return p&&function i(){let s=oe(t);_&&!oc(_,s)&&r(),_=s,o=requestAnimationFrame(i)}(),r(),()=>{var t;g.forEach(t=>{n&&t.removeEventListener("scroll",r),a&&t.removeEventListener("resize",r)}),null==f||f(),null==(t=b)||t.disconnect(),b=null,p&&cancelAnimationFrame(o)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){var t,i,r,s,o,n;let a,c,h,p,u;if(!this.active||!this.anchorEl||!this.popup)return;let g=[{name:"offset",options:t={mainAxis:this.distance,crossAxis:this.skidding},async fn(i){var r,s;let{x:o,y:n,placement:a,middlewareData:c}=i,h=await sO(i,t);return a===(null==(r=c.offset)?void 0:r.placement)&&null!=(s=c.arrow)&&s.alignmentOffset?{}:{x:o+h.x,y:n+h.y,data:{...h,placement:a}}}}];this.sync?g.push(oh({apply:({rects:t})=>{let i="width"===this.sync||"both"===this.sync,r="height"===this.sync||"both"===this.sync;this.popup.style.width=i?`${t.reference.width}px`:"",this.popup.style.height=r?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),of&&!og(this.anchor)&&"scroll"===this.boundary&&(a=s3(this.anchorEl).filter(t=>t instanceof Element)),this.flip&&g.push({name:"flip",options:i={boundary:this.flipBoundary||a,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(t){var r,s,o,n,a,c,h,p;let u,g,f,{placement:m,middlewareData:b,rects:_,initialPlacement:v,platform:y,elements:w}=t,{mainAxis:x=!0,crossAxis:C=!0,fallbackPlacements:$,fallbackStrategy:E="bestFit",fallbackAxisSideDirection:A="none",flipAlignment:T=!0,...P}=sv(i,t);if(null!=(r=b.arrow)&&r.alignmentOffset)return{};let j=sy(m),M=sC(v),O=sy(v)===v,D=await (null==y.isRTL?void 0:y.isRTL(w.floating)),B=$||(O||!T?[sI(v)]:(u=sI(v),[s$(v),u,s$(u)])),F="none"!==A;!$&&F&&B.push(...(g=sw(v),f=function(t,i,r){switch(t){case"top":case"bottom":if(r)return i?sS:sE;return i?sE:sS;case"left":case"right":return i?sA:sz;default:return[]}}(sy(v),"start"===A,D),g&&(f=f.map(t=>t+"-"+g),T&&(f=f.concat(f.map(s$)))),f));let N=[v,...B],U=await y.detectOverflow(t,P),q=[],V=(null==(s=b.flip)?void 0:s.overflows)||[];if(x&&q.push(U[j]),C){let t,i,r,s,o=(c=m,h=_,void 0===(p=D)&&(p=!1),t=sw(c),r=sx(i=sk(sC(c))),s="x"===i?t===(p?"end":"start")?"right":"left":"start"===t?"bottom":"top",h.reference[r]>h.floating[r]&&(s=sI(s)),[s,sI(s)]);q.push(U[o[0]],U[o[1]])}if(V=[...V,{placement:m,overflows:q}],!q.every(t=>t<=0)){let t=((null==(o=b.flip)?void 0:o.index)||0)+1,i=N[t];if(i&&("alignment"!==C||M===sC(i)||V.every(t=>sC(t.placement)!==M||t.overflows[0]>0)))return{data:{index:t,overflows:V},reset:{placement:i}};let r=null==(n=V.filter(t=>t.overflows[0]<=0).sort((t,i)=>t.overflows[1]-i.overflows[1])[0])?void 0:n.placement;if(!r)switch(E){case"bestFit":{let t=null==(a=V.filter(t=>{if(F){let i=sC(t.placement);return i===M||"y"===i}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,i)=>t+i,0)]).sort((t,i)=>t[1]-i[1])[0])?void 0:a[0];t&&(r=t);break}case"initialPlacement":r=v}if(m!==r)return{reset:{placement:r}}}return{}}}),this.shift&&g.push({name:"shift",options:r={boundary:this.shiftBoundary||a,padding:this.shiftPadding},async fn(t){let{x:i,y:s,placement:o,platform:n}=t,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:t=>{let{x:i,y:r}=t;return{x:i,y:r}}},...p}=sv(r,t),u={x:i,y:s},g=await n.detectOverflow(t,p),f=sC(sy(o)),m=sk(f),b=u[m],_=u[f];if(a){let t="y"===m?"top":"left",i="y"===m?"bottom":"right",r=b+g[t],s=b-g[i];b=sg(r,su(b,s))}if(c){let t="y"===f?"top":"left",i="y"===f?"bottom":"right",r=_+g[t],s=_-g[i];_=sg(r,su(_,s))}let v=h.fn({...t,[m]:b,[f]:_});return{...v,data:{x:v.x-i,y:v.y-s,enabled:{[m]:a,[f]:c}}}}}),this.autoSize?g.push(oh({boundary:this.autoSizeBoundary||a,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:i})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&g.push({name:"arrow",options:c={element:this.arrowEl,padding:this.arrowPadding},async fn(t){let{x:i,y:r,placement:s,rects:o,platform:n,elements:a,middlewareData:h}=t,{element:p,padding:u=0}=sv(c,t)||{};if(null==p)return{};let g=sT(u),f={x:i,y:r},m=sk(sC(s)),b=sx(m),_=await n.getDimensions(p),v="y"===m,y=v?"clientHeight":"clientWidth",w=o.reference[b]+o.reference[m]-f[m]-o.floating[b],x=f[m]-o.reference[m],C=await (null==n.getOffsetParent?void 0:n.getOffsetParent(p)),$=C?C[y]:0;$&&await (null==n.isElement?void 0:n.isElement(C))||($=a.floating[y]||o.floating[b]);let E=$/2-_[b]/2-1,A=su(g[v?"top":"left"],E),T=su(g[v?"bottom":"right"],E),P=$-_[b]-T,j=$/2-_[b]/2+(w/2-x/2),M=sg(A,su(j,P)),O=!h.arrow&&null!=sw(s)&&j!==M&&o.reference[b]/2-(j<A?A:T)-_[b]/2<0,D=O?j<A?j-A:j-P:0;return{[m]:f[m]+D,data:{[m]:M,centerOffset:j-M-D,...O&&{alignmentOffset:D}},reset:O}}});let f=of?t=>ol.getOffsetParent(t,od):ol.getOffsetParent;(s=this.anchorEl,o=this.popup,n={placement:this.placement,middleware:g,strategy:of?"absolute":"fixed",platform:{...ol,getOffsetParent:f}},h=new Map,u={...(p={platform:ol,...n}).platform,_c:h},sM(s,o,{...p,platform:u})).then(({x:t,y:i,middlewareData:r,placement:s})=>{let o="rtl"===this.localize.dir(),n={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${t}px`,top:`${i}px`}),this.arrow){let t=r.arrow.x,i=r.arrow.y,s="",a="",c="",h="";if("start"===this.arrowPlacement){let r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s="number"==typeof i?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=o?r:"",h=o?"":r}else if("end"===this.arrowPlacement){let r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=o?"":r,h=o?r:"",c="number"==typeof i?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",s="number"==typeof i?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof t?`${t}px`:"",s="number"==typeof i?`${i}px`:"");Object.assign(this.arrowEl.style,{top:s,right:a,bottom:c,left:h,[n]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new r4)}render(){return to`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${ou({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${ou({popup:!0,"popup-active":this.active,"popup-fixed":!of,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?to`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};om.css=r7,sc([t5(".popup")],om.prototype,"popup",2),sc([t5(".arrow")],om.prototype,"arrowEl",2),sc([t1()],om.prototype,"anchor",2),sc([t1({type:Boolean,reflect:!0})],om.prototype,"active",2),sc([t1({reflect:!0})],om.prototype,"placement",2),sc([t1()],om.prototype,"boundary",2),sc([t1({type:Number})],om.prototype,"distance",2),sc([t1({type:Number})],om.prototype,"skidding",2),sc([t1({type:Boolean})],om.prototype,"arrow",2),sc([t1({attribute:"arrow-placement"})],om.prototype,"arrowPlacement",2),sc([t1({attribute:"arrow-padding",type:Number})],om.prototype,"arrowPadding",2),sc([t1({type:Boolean})],om.prototype,"flip",2),sc([t1({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],om.prototype,"flipFallbackPlacements",2),sc([t1({attribute:"flip-fallback-strategy"})],om.prototype,"flipFallbackStrategy",2),sc([t1({type:Object})],om.prototype,"flipBoundary",2),sc([t1({attribute:"flip-padding",type:Number})],om.prototype,"flipPadding",2),sc([t1({type:Boolean})],om.prototype,"shift",2),sc([t1({type:Object})],om.prototype,"shiftBoundary",2),sc([t1({attribute:"shift-padding",type:Number})],om.prototype,"shiftPadding",2),sc([t1({attribute:"auto-size"})],om.prototype,"autoSize",2),sc([t1()],om.prototype,"sync",2),sc([t1({type:Object})],om.prototype,"autoSizeBoundary",2),sc([t1({attribute:"auto-size-padding",type:Number})],om.prototype,"autoSizePadding",2),sc([t1({attribute:"hover-bridge",type:Boolean})],om.prototype,"hoverBridge",2),om=sc([tJ("wa-popup")],om);var ob=Object.defineProperty,o_=Object.getOwnPropertyDescriptor,ov=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?o_(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&ob(i,r,n),n};let oy=0,ow=[],ok=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.showDelay=500,this.hideDelay=0,this.suppressed=!1,this.open=!1,this.bodyId=`gl-tooltip-${++oy}`,this.onAnchorSlotChange=t=>{let i=t.target.assignedElements({flatten:!0})[0];i!==this.anchorEl&&(this.detachAnchor(),this.attachAnchor(i))},this.onDocumentKeyDown=t=>{"Escape"===t.key&&this.open&&ow.at(-1)===this&&(t.preventDefault(),t.stopPropagation(),this.open=!1)},this.onMouseOver=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!0},this.showDelay))},this.onMouseOut=()=>{this.anchorEl?.matches(":hover")||this.matches(":hover")||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!1},this.hideDelay))},this.onFocusIn=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.open=!0)},this.onFocusOut=()=>{clearTimeout(this.hoverTimeout),this.open=!1},this.onMouseDown=t=>{this.suppressed=!0,this.open=!1},this.onMouseUp=t=>{this.suppressed=!1},this.onDragStart=t=>{this.suppressed=!0,this.open=!1},this.onDragEnd=t=>{this.suppressed=!1},this.onClick=t=>{this.hideOnClick&&(this.open=!1)}}connectedCallback(){super.connectedCallback?.(),this.eventController=new AbortController;let{signal:t}=this.eventController;this.addEventListener("mouseover",this.onMouseOver,{signal:t}),this.addEventListener("mouseout",this.onMouseOut,{signal:t}),this.addEventListener("focusin",this.onFocusIn,{signal:t}),this.addEventListener("focusout",this.onFocusOut,{signal:t}),this.addEventListener("mousedown",this.onMouseDown,{signal:t}),this.addEventListener("click",this.onClick,{signal:t}),window.addEventListener("mouseup",this.onMouseUp,{signal:t}),window.addEventListener("dragstart",this.onDragStart,{capture:!0,signal:t}),window.addEventListener("dragend",this.onDragEnd,{capture:!0,signal:t})}disconnectedCallback(){this.eventController?.abort(),this.eventController=void 0,this.detachAnchor(),this.unregisterDismissible(),clearTimeout(this.hoverTimeout),super.disconnectedCallback?.()}updated(t){t.has("open")&&(this.open?this.registerDismissible():this.unregisterDismissible()),t.has("disabled")&&this.disabled&&this.open&&(this.open=!1)}attachAnchor(t){null!=t&&(this.anchorEl=t,this.addAriaDescribedBy(t,this.bodyId))}detachAnchor(){null!=this.anchorEl&&(this.removeAriaDescribedBy(this.anchorEl,this.bodyId),this.anchorEl=void 0)}addAriaDescribedBy(t,i){let r=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);r.includes(i)||(r.push(i),t.setAttribute("aria-describedby",r.join(" ")))}removeAriaDescribedBy(t,i){let r=(t.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean).filter(t=>t!==i);0===r.length?t.removeAttribute("aria-describedby"):t.setAttribute("aria-describedby",r.join(" "))}registerDismissible(){ow.includes(this)||(ow.push(this),document.addEventListener("keydown",this.onDocumentKeyDown,{signal:this.eventController?.signal}))}unregisterDismissible(){let t=ow.indexOf(this);-1!==t&&ow.splice(t,1),document.removeEventListener("keydown",this.onDocumentKeyDown)}async hide(){this.open=!1,await this.updateComplete}async show(){this.disabled||this.suppressed||(this.open=!0,await this.updateComplete)}render(){var t;return to`<wa-popup
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
				<slot name="content">${t=this.content,t?.includes(`
`)?rj(t.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):t}</slot>
			</div>
		</wa-popup>`}};ok.styles=tL`
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
	`,ov([t1()],ok.prototype,"content",2),ov([t1({reflect:!0})],ok.prototype,"placement",2),ov([t1({type:Boolean})],ok.prototype,"disabled",2),ov([t1({type:Number})],ok.prototype,"distance",2),ov([t1({type:Number,attribute:"show-delay"})],ok.prototype,"showDelay",2),ov([t1({type:Number,attribute:"hide-delay"})],ok.prototype,"hideDelay",2),ov([t1({type:Boolean,attribute:"hide-on-click"})],ok.prototype,"hideOnClick",2),ov([t5("wa-popup")],ok.prototype,"popup",2),ov([t2()],ok.prototype,"suppressed",2),ov([t2()],ok.prototype,"open",2),ok=ov([tJ("gl-tooltip")],ok);let ox=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a","add-small":"\\ec7b","remove-small":"\\ec7c","worktree-small":"\\ec7d",worktree:"\\ec7e","screen-cut":"\\ec7f",ask:"\\ec80",openai:"\\ec81",claude:"\\ec82","open-in-window":"\\ec83","new-session":"\\ec84"}),oC=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147","diff-right":"\\f11b","diff-left":"\\f12e","accept-right":"\\f12f","accept-left":"\\f130","accept-all-right":"\\f131","accept-all-left":"\\f132",continue:"\\f148",skip:"\\f149",abort:"\\f14a",pause:"\\f14b"});var o$=Object.defineProperty,oE=Object.getOwnPropertyDescriptor,oS=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oE(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&o$(i,r,n),n};function oA(t,i=""){return tM(Object.entries(t).map(([t,r])=>(function(t,i,r=""){return`:host([icon='${r}${t}'])::before { content: '${i}'; }`})(t,r,i)).join(""))}let oz=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(t){t.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(t)}};oz.styles=tL`
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

		${oA(ox)}
		${oA(oC,"gl-")}

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
	`,oS([t1({reflect:!0})],oz.prototype,"icon",2),oS([t1({reflect:!0})],oz.prototype,"modifier",2),oS([t1({type:Number})],oz.prototype,"size",2),oS([t1({reflect:!0})],oz.prototype,"flip",2),oS([t1({reflect:!0})],oz.prototype,"rotate",2),oz=oS([tJ("code-icon")],oz);var oI=Object.defineProperty,oT=Object.getOwnPropertyDescriptor,oP=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oT(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oI(i,r,n),n};let oj=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.disabled=!1,this._modifiers=new ModifierKeysController(this),this.handleLinkKeydown=t=>{this.effectiveHref||" "!==t.key&&"Enter"!==t.key||(t.preventDefault(),t.target.click())}}get isAltKeyPressed(){return this._modifiers.altKey||this._modifiers.shiftKey}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${r3?"⌥":"Alt"}] ${this.altLabel}`:this.label}get effectiveLabel(){if(this.label||this.altLabel)return this.altLabel&&this.isAltKeyPressed?this.altLabel:this.label}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}render(){return to`
			<gl-tooltip content="${this.effectiveTooltip??tl}">
				<a
					role="${!this.effectiveHref?"button":tl}"
					type="${!this.effectiveHref?"button":tl}"
					aria-label="${this.effectiveLabel??tl}"
					?disabled=${this.disabled}
					href=${this.effectiveHref??tl}
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
		`}focus(t){this.defaultFocusEl.focus(t)}};oj.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},oj.styles=tL`
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
			${rU}
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
	`,oP([t1()],oj.prototype,"href",2),oP([t1({attribute:"alt-href"})],oj.prototype,"altHref",2),oP([t1()],oj.prototype,"label",2),oP([t1({attribute:"alt-label"})],oj.prototype,"altLabel",2),oP([t1()],oj.prototype,"icon",2),oP([t1({attribute:"alt-icon"})],oj.prototype,"altIcon",2),oP([t1({attribute:"outline-icon"})],oj.prototype,"outlineIcon",2),oP([t1({type:Boolean})],oj.prototype,"disabled",2),oP([t5("a")],oj.prototype,"defaultFocusEl",2),oj=oP([tJ("action-item")],oj);var oR=Object.defineProperty,oM=Object.getOwnPropertyDescriptor,oL=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oM(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oR(i,r,n),n};let oO=class extends lit_element_i{constructor(){super(...arguments),this.size=12,this.worktree=!1,this.chevron=!1,this.onKeydown=t=>{"button"===this.appearance&&("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.click())}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}updated(t){t.has("appearance")&&("button"===this.appearance?(this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")):("button"===this.getAttribute("role")&&this.removeAttribute("role"),"0"===this.getAttribute("tabindex")&&this.removeAttribute("tabindex")))}render(){let t=this.icon??(this.worktree?"gl-worktree":"git-branch");return to`<code-icon class="icon" icon="${t}" size="${this.size}"></code-icon
			><span class="label">${this.name??"<missing>"}</span>${this.chevron?to`<code-icon class="chevron" icon="chevron-down" size="12"></code-icon>`:tl}`}};function oD(t,i){return to`<gl-branch-name .name=${t} .size=${12} ?worktree=${i??!1}></gl-branch-name>`}oO.styles=tL`
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
	`,oL([t1({reflect:!0})],oO.prototype,"appearance",2),oL([t1({type:String})],oO.prototype,"name",2),oL([t1({type:Number})],oO.prototype,"size",2),oL([t1({type:Boolean})],oO.prototype,"worktree",2),oL([t1({type:Boolean})],oO.prototype,"chevron",2),oL([t1()],oO.prototype,"icon",2),oO=oL([tJ("gl-branch-name")],oO);var oB=Object.defineProperty,oF=Object.getOwnPropertyDescriptor,oN=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oF(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oB(i,r,n),n};let oU=class extends lit_element_i{constructor(){super(...arguments),this.hasChanges=!1,this.worktree=!1,this.isDefault=!1}render(){return to`<gl-tooltip placement="bottom"
			>${this.renderIcon()}<span slot="content">${this.renderTooltipContent()}</span></gl-tooltip
		>`}renderIcon(){let t;if(!this.worktree&&(!this.status||"local"===this.status))return to`<code-icon icon="git-branch"></code-icon>`;if("detached"===this.status)return to`<code-icon icon="git-commit"></code-icon>`;let i="0.5";switch(this.status){case"diverged":t="var(--gl-icon-color-status-diverged)";break;case"behind":t="var(--gl-icon-color-status-behind)";break;case"ahead":t="var(--gl-icon-color-status-ahead)";break;case"missingUpstream":t="var(--gl-icon-color-status-missingUpstream)";break;case"upToDate":t=`var(--gl-icon-color-status-${this.hasChanges?"changes":"synced"})`;break;default:this.hasChanges?t="var(--gl-icon-color-status-changes)":(t="transparent",i="1")}return this.worktree&&!1===this.isDefault?tn`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="var(--gl-icon-color-foreground, #c5c5c5)"
					d="M13.5 4h.501v1.003h-.2a5.5 5.5 0 0 1 1.2.755V3.5l-.5-.5H13.5v1zm-4 0V3H7.713l-.852-.854L6.507 2H1.511l-.5.5v3.996L1 6.507v6.995l.5.5h6.227a5.528 5.528 0 0 1-.836-1H2V7.496h.01v-.489h4.486l.354-.146.858-.858h.014a5.51 5.51 0 0 1 1.477-1H7.5l-.353.147-.858.857H2.011V3H6.3l.853.853.353.146H9.5z"
				/>
				<path
					fill="${t}"
					stroke="var(--gl-icon-color-foreground, #c5c5c5)"
					stroke-width="${i}"
					d="M11.5 6.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z"
				/>
				<path stroke="var(--gl-icon-color-foreground, #c5c5c5)" d="M11.5 13v3M11.5 1v6" />
			</svg>`:tn`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="${t}"
				stroke="var(--gl-icon-color-foreground, #c5c5c5)"
				stroke-width="${i}"
				d="M12 10.25a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5z"
			/>
			<path
				fill="var(--gl-icon-color-foreground, #c5c5c5)"
				d="M6 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 5.95a2.5 2.5 0 1 0-1 0v4.1a2.5 2.5 0 1 0 1.165.04c.168-.38.383-.622.61-.78.327-.227.738-.32 1.214-.31H7c.387 0 .76.03 1.124.059l.026.002c.343.027.694.055 1.003.046.313-.01.661-.06.954-.248.29-.185.466-.466.544-.812a.756.756 0 0 1 .046-.055 2.5 2.5 0 1 0-1.03-.134c-.028.108-.07.14-.1.16-.063.04-.191.08-.446.089a8.783 8.783 0 0 1-.917-.045A14.886 14.886 0 0 0 7.005 8c-.61-.013-1.249.105-1.8.488-.07.05-.14.102-.205.159V5.95zm7-.45a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-9 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
			/>
		</svg>`}renderTooltipContent(){let t,i=this.branch?oD(this.branch):"Branch",r=this.upstream?oD(this.upstream):"its upstream";switch(this.status){case"diverged":t=to`${i} has diverged from ${r}`;break;case"behind":t=to`${i} is behind ${r}`;break;case"ahead":t=to`${i} is ahead of ${r}`;break;case"missingUpstream":t=to`${i} is missing its upstream ${r}`;break;case"upToDate":t=to`${i} is up to date with ${r}`;break;case"local":t=to`${i} is a local branch which hasn't been published`;break;case"remote":t=to`${i} is a remote branch`;break;case"detached":t=to`${i} is in a detached state, i.e. checked out to a commit or tag`;break;default:t=to`${i} is in an unknown state`}return t=to`<p>${t}</p>`,this.worktree?t=this.hasChanges?to`${t}
					<p>Checked out in a worktree and has working (uncommitted) changes</p>`:to`${t}
					<p>Checked out in a worktree</p>`:this.hasChanges&&(t=to`${t}
				<p>Has working (uncommitted) changes</p>`),t}};oU.styles=tL`
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
	`,oN([t1({type:String})],oU.prototype,"branch",2),oN([t1({type:String})],oU.prototype,"status",2),oN([t1({type:Boolean})],oU.prototype,"hasChanges",2),oN([t1({type:String})],oU.prototype,"upstream",2),oN([t1({type:Boolean})],oU.prototype,"worktree",2),oN([t1({type:Boolean,attribute:"is-default"})],oU.prototype,"isDefault",2),oU=oN([tJ("gl-branch-icon")],oU);var oq=Object.defineProperty,oH=Object.getOwnPropertyDescriptor,oV=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oH(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oq(i,r,n),n};let oK=["top","right","bottom","left","top-left","top-right","bottom-left","bottom-right"],oW=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.autoSizeVertical=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.suppressed=!1,this.handleReposition=()=>{let t=this.popup?.getAttribute("data-current-placement");null!=t&&t!==this._resolvedPlacement&&(this._resolvedPlacement=t)},this.handleResizePointerDown=t=>{if(0!==t.button)return;let i=t.currentTarget,r=i.dataset.handle;if(null==r)return;t.preventDefault();let s="right"===r||"top-right"===r||"bottom-right"===r,o="left"===r||"top-left"===r||"bottom-left"===r,n="bottom"===r||"bottom-left"===r||"bottom-right"===r,a="top"===r||"top-left"===r||"top-right"===r,c=this.body,h=t.clientX,p=t.clientY,u=c.getBoundingClientRect(),g=u.width,f=u.height;i.setPointerCapture(t.pointerId),i.classList.add("popover__resizer--active"),this.toggleAttribute("dragging",!0);let m=t=>{let i=t.clientX-h,r=t.clientY-p;s?c.style.width=`${Math.max(0,g+i)}px`:o&&(c.style.width=`${Math.max(0,g-i)}px`),n?c.style.height=`${Math.max(0,f+r)}px`:a&&(c.style.height=`${Math.max(0,f-r)}px`),this.popup?.reposition()},b=()=>{this.toggleAttribute("dragging",!1),i.classList.remove("popover__resizer--active"),i.removeEventListener("pointermove",m),i.removeEventListener("lostpointercapture",b),i.removeEventListener("pointerup",b)};i.addEventListener("pointermove",m,{passive:!0}),i.addEventListener("lostpointercapture",b),i.addEventListener("pointerup",b)},this.handleTriggerBlur=t=>{this.open&&this.hasTrigger("focus")&&(t.relatedTarget&&this.contains(t.relatedTarget)||this.hide())},this.handleTriggerClick=t=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(t.composedPath().includes(this.body))return;this.hide()}else this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=t=>{this.hasTrigger("click")&&this.hasTrigger("focus")&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,this.open&&"hover"===this._triggeredBy&&!t.composedPath().includes(this.body)&&(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=()=>{this.hasTrigger("focus")&&(this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus"))},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handlePopupBlur=t=>{let i=t.composedPath();i.includes(this)||i.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=t=>{let i=t.composedPath();i.includes(this)||i.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let t=iI(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let t=iI(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),t)}}}static closeOthers(t){for(let i of oW.openPopovers)i===t||i.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINS||i.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,oW.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),this.updateResizeObserver()}updateResizeObserver(){null!=this.resize?null==this.resizeObserver&&null!=this.body&&(this.resizeObserver=new ResizeObserver(()=>this.popup?.reposition()),this.resizeObserver.observe(this.body)):null!=this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}render(){let t=this._resolvedPlacement??this.placement,i=(function(t){if(!t)return[];let i=new Set;for(let r of t.trim().split(/\s+/))switch(r){case"horizontal":i.add("right");break;case"vertical":i.add("bottom");break;case"both":i.add("right"),i.add("bottom"),i.add("bottom-right");break;case"all":for(let t of oK)i.add(t);break;default:oK.includes(r)&&i.add(r)}return[...i]})(this.resize).filter(i=>!function(t,i){let r,s;if(!i)return!1;let[o,n]=i.split("-");switch(o){case"top":r="bottom";break;case"right":r="left";break;case"bottom":r="top";break;case"left":r="right"}let a="left"===o||"right"===o;"start"===n?s=a?"top":"left":"end"===n&&(s=a?"bottom":"right");let c=i=>null!=i&&(t===i||t.startsWith(`${i}-`)||t.endsWith(`-${i}`));return c(r)||c(s)}(i,t));return to`<wa-popup
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
				${i.map(t=>to`<div
							class="popover__resizer popover__resizer--${t}"
							role="separator"
							aria-orientation=${"top"===t||"bottom"===t?"horizontal":"vertical"}
							aria-label="Resize"
							data-handle=${t}
							@pointerdown=${this.handleResizePointerDown}
						></div>`)}
			</div>
		</wa-popup>`}async show(t){if(this.open||this.suppressed){"click"===t&&"hover"===this._triggeredBy&&(this._triggeredBy=t);return}return(null==this._triggeredBy||"hover"!==t)&&(this._triggeredBy=t),oW.closeOthers(this),this.open=!0,oW.openPopovers.add(this),iT(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,oW.openPopovers.delete(this),iT(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(t){return this.trigger.split(" ").includes(t)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleResizeChange(){this.updateResizeObserver()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};oW.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},oW.openPopovers=new Set,oW.styles=[rV,tL`
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
		`],oV([t5("#popover")],oW.prototype,"body",2),oV([t5("wa-popup")],oW.prototype,"popup",2),oV([t1({reflect:!0})],oW.prototype,"placement",2),oV([t1({type:Object})],oW.prototype,"anchor",2),oV([t1({reflect:!0,type:Boolean})],oW.prototype,"disabled",2),oV([t1({type:Number})],oW.prototype,"distance",2),oV([t1({reflect:!0,type:Boolean})],oW.prototype,"open",2),oV([t1({reflect:!0,type:Boolean})],oW.prototype,"arrow",2),oV([t1({reflect:!0,type:Boolean,attribute:"auto-size-vertical"})],oW.prototype,"autoSizeVertical",2),oV([t1({reflect:!0})],oW.prototype,"resize",2),oV([t1({type:Number})],oW.prototype,"skidding",2),oV([t1()],oW.prototype,"trigger",2),oV([t1({type:Boolean})],oW.prototype,"hoist",2),oV([t1({reflect:!0})],oW.prototype,"appearance",2),oV([t2()],oW.prototype,"suppressed",2),oV([t2()],oW.prototype,"_resolvedPlacement",2),oV([t9("open",{afterFirstUpdate:!0})],oW.prototype,"handleOpenChange",1),oV([t9(["distance","placement","skidding"])],oW.prototype,"handleOptionsChange",1),oV([t9("resize",{afterFirstUpdate:!0})],oW.prototype,"handleResizeChange",1),oV([t9("disabled")],oW.prototype,"handleDisabledChange",1),oW=oV([tJ("gl-popover")],oW);let oG=tL`
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
`;var oZ=Object.defineProperty,oX=Object.getOwnPropertyDescriptor,oQ=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oX(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oZ(i,r,n),n};let oY=class extends lit_element_i{constructor(){super(...arguments),this.ahead=0,this.behind=0,this.working=0,this.alwaysShow=!1,this.outlined=!1,this.colorized=!1,this.missingUpstream=!1}render(){return 0===this.ahead&&0===this.behind&&0===this.working?this.alwaysShow?this.missingUpstream?to`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
					<span class="state${this.colorized?" state--missing":""}"
						><code-icon icon="error"></code-icon></span
				></span>`:to`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
				<span class="state${this.colorized?" state--ahead":""}"><code-icon icon="check"></code-icon></span>
			</span>`:tl:to`<span part="base" class="pill${this.outlined?" pill--outlined":""}"
			>${rz(this.behind>0,()=>to`<span class="state${this.colorized?" state--behind":""}"
						>${this.behind}<code-icon icon="arrow-down"></code-icon
					></span>`)}${rz(this.ahead>0,()=>to`<span class="state${this.colorized?" state--ahead":""}"
						>${this.ahead}<code-icon icon="arrow-up"></code-icon
					></span>`)}${rz(this.working>0,()=>to`<span class="state${this.colorized?" state--working":""}"
						>${this.working}<span class="working">&#177;</span></span
					>`)}</span
		>`}};oY.styles=[oG,tL`
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
		`],oQ([t1({type:Number})],oY.prototype,"ahead",2),oQ([t1({type:Number})],oY.prototype,"behind",2),oQ([t1({type:Number})],oY.prototype,"working",2),oQ([t1({type:Boolean,attribute:"always-show"})],oY.prototype,"alwaysShow",2),oQ([t1({type:Boolean})],oY.prototype,"outlined",2),oQ([t1({type:Boolean})],oY.prototype,"colorized",2),oQ([t1({type:Boolean})],oY.prototype,"missingUpstream",2),oY=oQ([tJ("gl-tracking-pill")],oY);let oJ="important",o0=" !"+oJ,o1=eK(class extends directive_i{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((i,r)=>{let s=t[r];return null==s?i:i+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[i]){let{style:r}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(i)),this.render(i);for(let t of this.ft)null==i[t]&&(this.ft.delete(t),t.includes("-")?r.removeProperty(t):r[t]=null);for(let t in i){let s=i[t];if(null!=s){this.ft.add(t);let i="string"==typeof s&&s.endsWith(o0);t.includes("-")||i?r.setProperty(t,i?s.slice(0,-11):s,i?oJ:""):r[t]=s}}return ta}}),o2={_argdown:["\\E003","#519aba"],_argdown_light:["\\E003","#498ba7"],_asm:["\\E004","#cc3e44"],_asm_light:["\\E004","#b8383d"],_audio:["\\E005","#a074c4"],_audio_light:["\\E005","#9068b0"],_babel:["\\E006","#cbcb41"],_babel_light:["\\E006","#b7b73b"],_bazel:["\\E007","#8dc149"],_bazel_1:["\\E007","#4d5a5e"],_bazel_1_light:["\\E007","#455155"],_bazel_light:["\\E007","#7fae42"],_bicep:["\\E008","#519aba"],_bicep_light:["\\E008","#498ba7"],_bower:["\\E009","#e37933"],_bower_light:["\\E009","#cc6d2e"],_bsl:["\\E00A","#cc3e44"],_bsl_light:["\\E00A","#b8383d"],_c:["\\E00C","#519aba"],_c_1:["\\E00C","#a074c4"],_c_1_light:["\\E00C","#9068b0"],_c_2:["\\E00C","#cbcb41"],_c_2_light:["\\E00C","#b7b73b"],_c_light:["\\E00C","#498ba7"],"_c-sharp":["\\E00B","#519aba"],"_c-sharp_light":["\\E00B","#498ba7"],_cake:["\\E00D","#cc3e44"],_cake_light:["\\E00D","#b8383d"],_cake_php:["\\E00E","#cc3e44"],_cake_php_light:["\\E00E","#b8383d"],_clock:["\\E012","#519aba"],_clock_1:["\\E012","#6d8086"],_clock_1_light:["\\E012","#627379"],_clock_light:["\\E012","#498ba7"],_clojure:["\\E013","#8dc149"],_clojure_1:["\\E013","#519aba"],_clojure_1_light:["\\E013","#498ba7"],_clojure_light:["\\E013","#7fae42"],"_code-climate":["\\E014","#8dc149"],"_code-climate_light":["\\E014","#7fae42"],"_code-search":["\\E015","#a074c4"],"_code-search_light":["\\E015","#9068b0"],_coffee:["\\E016","#cbcb41"],_coffee_light:["\\E016","#b7b73b"],_coldfusion:["\\E018","#519aba"],_coldfusion_light:["\\E018","#498ba7"],_config:["\\E019","#6d8086"],_config_light:["\\E019","#627379"],_cpp:["\\E01A","#519aba"],_cpp_1:["\\E01A","#a074c4"],_cpp_1_light:["\\E01A","#9068b0"],_cpp_2:["\\E01A","#cbcb41"],_cpp_2_light:["\\E01A","#b7b73b"],_cpp_light:["\\E01A","#498ba7"],_crystal:["\\E01B","#d4d7d6"],_crystal_embedded:["\\E01C","#d4d7d6"],_crystal_embedded_light:["\\E01C","#bfc2c1"],_crystal_light:["\\E01B","#bfc2c1"],_css:["\\E01D","#519aba"],_css_light:["\\E01D","#498ba7"],_csv:["\\E01E","#8dc149"],_csv_light:["\\E01E","#7fae42"],_cu:["\\E01F","#8dc149"],_cu_1:["\\E01F","#a074c4"],_cu_1_light:["\\E01F","#9068b0"],_cu_light:["\\E01F","#7fae42"],_d:["\\E020","#cc3e44"],_d_light:["\\E020","#b8383d"],_dart:["\\E021","#519aba"],_dart_light:["\\E021","#498ba7"],_db:["\\E022","#f55385"],_db_1:["\\E022","#519aba"],_db_1_light:["\\E022","#498ba7"],_db_light:["\\E022","#dd4b78"],_default:["\\E023","#d4d7d6"],_default_light:["\\E023","#bfc2c1"],_docker:["\\E025","#519aba"],_docker_1:["\\E025","#4d5a5e"],_docker_1_light:["\\E025","#455155"],_docker_2:["\\E025","#8dc149"],_docker_2_light:["\\E025","#7fae42"],_docker_3:["\\E025","#f55385"],_docker_3_light:["\\E025","#dd4b78"],_docker_light:["\\E025","#498ba7"],_ejs:["\\E027","#cbcb41"],_ejs_light:["\\E027","#b7b73b"],_elixir:["\\E028","#a074c4"],_elixir_light:["\\E028","#9068b0"],_elixir_script:["\\E029","#a074c4"],_elixir_script_light:["\\E029","#9068b0"],_elm:["\\E02A","#519aba"],_elm_light:["\\E02A","#498ba7"],_eslint:["\\E02C","#a074c4"],_eslint_1:["\\E02C","#4d5a5e"],_eslint_1_light:["\\E02C","#455155"],_eslint_light:["\\E02C","#9068b0"],_ethereum:["\\E02D","#519aba"],_ethereum_light:["\\E02D","#498ba7"],"_f-sharp":["\\E02E","#519aba"],"_f-sharp_light":["\\E02E","#498ba7"],_favicon:["\\E02F","#cbcb41"],_favicon_light:["\\E02F","#b7b73b"],_firebase:["\\E030","#e37933"],_firebase_light:["\\E030","#cc6d2e"],_firefox:["\\E031","#e37933"],_firefox_light:["\\E031","#cc6d2e"],_font:["\\E033","#cc3e44"],_font_light:["\\E033","#b8383d"],_git:["\\E034","#41535b"],_git_light:["\\E034","#3b4b52"],_github:["\\E037","#d4d7d6"],_github_light:["\\E037","#bfc2c1"],_gitlab:["\\E038","#e37933"],_gitlab_light:["\\E038","#cc6d2e"],_go:["\\E039","#519aba"],_go_light:["\\E039","#498ba7"],_go2:["\\E03A","#519aba"],_go2_light:["\\E03A","#498ba7"],_godot:["\\E03B","#519aba"],_godot_1:["\\E03B","#cc3e44"],_godot_1_light:["\\E03B","#b8383d"],_godot_2:["\\E03B","#cbcb41"],_godot_2_light:["\\E03B","#b7b73b"],_godot_3:["\\E03B","#a074c4"],_godot_3_light:["\\E03B","#9068b0"],_godot_light:["\\E03B","#498ba7"],_gradle:["\\E03C","#519aba"],_gradle_light:["\\E03C","#498ba7"],_grails:["\\E03D","#8dc149"],_grails_light:["\\E03D","#7fae42"],_graphql:["\\E03E","#f55385"],_graphql_light:["\\E03E","#dd4b78"],_grunt:["\\E03F","#e37933"],_grunt_light:["\\E03F","#cc6d2e"],_gulp:["\\E040","#cc3e44"],_gulp_light:["\\E040","#b8383d"],_hacklang:["\\E041","#e37933"],_hacklang_light:["\\E041","#cc6d2e"],_haml:["\\E042","#cc3e44"],_haml_light:["\\E042","#b8383d"],_happenings:["\\E043","#519aba"],_happenings_light:["\\E043","#498ba7"],_haskell:["\\E044","#a074c4"],_haskell_light:["\\E044","#9068b0"],_haxe:["\\E045","#e37933"],_haxe_1:["\\E045","#cbcb41"],_haxe_1_light:["\\E045","#b7b73b"],_haxe_2:["\\E045","#519aba"],_haxe_2_light:["\\E045","#498ba7"],_haxe_3:["\\E045","#a074c4"],_haxe_3_light:["\\E045","#9068b0"],_haxe_light:["\\E045","#cc6d2e"],_heroku:["\\E046","#a074c4"],_heroku_light:["\\E046","#9068b0"],_hex:["\\E047","#cc3e44"],_hex_light:["\\E047","#b8383d"],_html:["\\E048","#519aba"],_html_1:["\\E048","#8dc149"],_html_1_light:["\\E048","#7fae42"],_html_2:["\\E048","#cbcb41"],_html_2_light:["\\E048","#b7b73b"],_html_3:["\\E048","#e37933"],_html_3_light:["\\E048","#cc6d2e"],_html_erb:["\\E049","#cc3e44"],_html_erb_light:["\\E049","#b8383d"],_html_light:["\\E048","#498ba7"],_ignored:["\\E04A","#41535b"],_ignored_light:["\\E04A","#3b4b52"],_illustrator:["\\E04B","#cbcb41"],_illustrator_light:["\\E04B","#b7b73b"],_image:["\\E04C","#a074c4"],_image_light:["\\E04C","#9068b0"],_info:["\\E04D","#519aba"],_info_light:["\\E04D","#498ba7"],_ionic:["\\E04E","#519aba"],_ionic_light:["\\E04E","#498ba7"],_jade:["\\E04F","#cc3e44"],_jade_light:["\\E04F","#b8383d"],_java:["\\E050","#cc3e44"],_java_1:["\\E050","#519aba"],_java_1_light:["\\E050","#498ba7"],_java_light:["\\E050","#b8383d"],_javascript:["\\E051","#cbcb41"],_javascript_1:["\\E051","#e37933"],_javascript_1_light:["\\E051","#cc6d2e"],_javascript_2:["\\E051","#519aba"],_javascript_2_light:["\\E051","#498ba7"],_javascript_light:["\\E051","#b7b73b"],_jenkins:["\\E052","#cc3e44"],_jenkins_light:["\\E052","#b8383d"],_jinja:["\\E053","#cc3e44"],_jinja_light:["\\E053","#b8383d"],_json:["\\E055","#cbcb41"],_json_1:["\\E055","#8dc149"],_json_1_light:["\\E055","#7fae42"],_json_light:["\\E055","#b7b73b"],_julia:["\\E056","#a074c4"],_julia_light:["\\E056","#9068b0"],_karma:["\\E057","#8dc149"],_karma_light:["\\E057","#7fae42"],_kotlin:["\\E058","#e37933"],_kotlin_light:["\\E058","#cc6d2e"],_less:["\\E059","#519aba"],_less_light:["\\E059","#498ba7"],_license:["\\E05A","#cbcb41"],_license_1:["\\E05A","#e37933"],_license_1_light:["\\E05A","#cc6d2e"],_license_2:["\\E05A","#cc3e44"],_license_2_light:["\\E05A","#b8383d"],_license_light:["\\E05A","#b7b73b"],_liquid:["\\E05B","#8dc149"],_liquid_light:["\\E05B","#7fae42"],_livescript:["\\E05C","#519aba"],_livescript_light:["\\E05C","#498ba7"],_lock:["\\E05D","#8dc149"],_lock_light:["\\E05D","#7fae42"],_lua:["\\E05E","#519aba"],_lua_light:["\\E05E","#498ba7"],_makefile:["\\E05F","#e37933"],_makefile_1:["\\E05F","#a074c4"],_makefile_1_light:["\\E05F","#9068b0"],_makefile_2:["\\E05F","#6d8086"],_makefile_2_light:["\\E05F","#627379"],_makefile_3:["\\E05F","#519aba"],_makefile_3_light:["\\E05F","#498ba7"],_makefile_light:["\\E05F","#cc6d2e"],_markdown:["\\E060","#519aba"],_markdown_light:["\\E060","#498ba7"],_maven:["\\E061","#cc3e44"],_maven_light:["\\E061","#b8383d"],_mdo:["\\E062","#cc3e44"],_mdo_light:["\\E062","#b8383d"],_mustache:["\\E063","#e37933"],_mustache_light:["\\E063","#cc6d2e"],_nim:["\\E065","#cbcb41"],_nim_light:["\\E065","#b7b73b"],_notebook:["\\E066","#519aba"],_notebook_light:["\\E066","#498ba7"],_npm:["\\E067","#41535b"],_npm_1:["\\E067","#cc3e44"],_npm_1_light:["\\E067","#b8383d"],_npm_ignored:["\\E068","#41535b"],_npm_ignored_light:["\\E068","#3b4b52"],_npm_light:["\\E067","#3b4b52"],_nunjucks:["\\E069","#8dc149"],_nunjucks_light:["\\E069","#7fae42"],_ocaml:["\\E06A","#e37933"],_ocaml_light:["\\E06A","#cc6d2e"],_odata:["\\E06B","#e37933"],_odata_light:["\\E06B","#cc6d2e"],_pddl:["\\E06C","#a074c4"],_pddl_light:["\\E06C","#9068b0"],_pdf:["\\E06D","#cc3e44"],_pdf_light:["\\E06D","#b8383d"],_perl:["\\E06E","#519aba"],_perl_light:["\\E06E","#498ba7"],_photoshop:["\\E06F","#519aba"],_photoshop_light:["\\E06F","#498ba7"],_php:["\\E070","#a074c4"],_php_light:["\\E070","#9068b0"],_pipeline:["\\E071","#e37933"],_pipeline_light:["\\E071","#cc6d2e"],_plan:["\\E072","#8dc149"],_plan_light:["\\E072","#7fae42"],_platformio:["\\E073","#e37933"],_platformio_light:["\\E073","#cc6d2e"],_powershell:["\\E074","#519aba"],_powershell_light:["\\E074","#498ba7"],_prisma:["\\E075","#519aba"],_prisma_light:["\\E075","#498ba7"],_prolog:["\\E077","#e37933"],_prolog_light:["\\E077","#cc6d2e"],_pug:["\\E078","#cc3e44"],_pug_light:["\\E078","#b8383d"],_puppet:["\\E079","#cbcb41"],_puppet_light:["\\E079","#b7b73b"],_purescript:["\\E07A","#d4d7d6"],_purescript_light:["\\E07A","#bfc2c1"],_python:["\\E07B","#519aba"],_python_light:["\\E07B","#498ba7"],_R:["\\E001","#519aba"],_R_light:["\\E001","#498ba7"],_react:["\\E07D","#519aba"],_react_1:["\\E07D","#e37933"],_react_1_light:["\\E07D","#cc6d2e"],_react_light:["\\E07D","#498ba7"],_reasonml:["\\E07E","#cc3e44"],_reasonml_light:["\\E07E","#b8383d"],_rescript:["\\E07F","#cc3e44"],_rescript_1:["\\E07F","#f55385"],_rescript_1_light:["\\E07F","#dd4b78"],_rescript_light:["\\E07F","#b8383d"],_rollup:["\\E080","#cc3e44"],_rollup_light:["\\E080","#b8383d"],_ruby:["\\E081","#cc3e44"],_ruby_light:["\\E081","#b8383d"],_rust:["\\E082","#6d8086"],_rust_light:["\\E082","#627379"],_salesforce:["\\E083","#519aba"],_salesforce_light:["\\E083","#498ba7"],_sass:["\\E084","#f55385"],_sass_light:["\\E084","#dd4b78"],_sbt:["\\E085","#519aba"],_sbt_light:["\\E085","#498ba7"],_scala:["\\E086","#cc3e44"],_scala_light:["\\E086","#b8383d"],_shell:["\\E089","#8dc149"],_shell_light:["\\E089","#7fae42"],_slim:["\\E08A","#e37933"],_slim_light:["\\E08A","#cc6d2e"],_smarty:["\\E08B","#cbcb41"],_smarty_light:["\\E08B","#b7b73b"],_spring:["\\E08C","#8dc149"],_spring_light:["\\E08C","#7fae42"],_stylelint:["\\E08D","#d4d7d6"],_stylelint_1:["\\E08D","#4d5a5e"],_stylelint_1_light:["\\E08D","#455155"],_stylelint_light:["\\E08D","#bfc2c1"],_stylus:["\\E08E","#8dc149"],_stylus_light:["\\E08E","#7fae42"],_sublime:["\\E08F","#e37933"],_sublime_light:["\\E08F","#cc6d2e"],_svelte:["\\E090","#cc3e44"],_svelte_light:["\\E090","#b8383d"],_svg:["\\E091","#a074c4"],_svg_1:["\\E091","#519aba"],_svg_1_light:["\\E091","#498ba7"],_svg_light:["\\E091","#9068b0"],_swift:["\\E092","#e37933"],_swift_light:["\\E092","#cc6d2e"],_terraform:["\\E093","#a074c4"],_terraform_light:["\\E093","#9068b0"],_tex:["\\E094","#519aba"],_tex_1:["\\E094","#cbcb41"],_tex_1_light:["\\E094","#b7b73b"],_tex_2:["\\E094","#e37933"],_tex_2_light:["\\E094","#cc6d2e"],_tex_3:["\\E094","#d4d7d6"],_tex_3_light:["\\E094","#bfc2c1"],_tex_light:["\\E094","#498ba7"],_todo:["\\E096",""],_tsconfig:["\\E097","#519aba"],_tsconfig_light:["\\E097","#498ba7"],_twig:["\\E098","#8dc149"],_twig_light:["\\E098","#7fae42"],_typescript:["\\E099","#519aba"],_typescript_1:["\\E099","#e37933"],_typescript_1_light:["\\E099","#cc6d2e"],_typescript_light:["\\E099","#498ba7"],_vala:["\\E09A","#6d8086"],_vala_light:["\\E09A","#627379"],_video:["\\E09B","#f55385"],_video_light:["\\E09B","#dd4b78"],_vite:["\\E09C","#cbcb41"],_vite_light:["\\E09C","#b7b73b"],_vue:["\\E09D","#8dc149"],_vue_light:["\\E09D","#7fae42"],_wasm:["\\E09E","#a074c4"],_wasm_light:["\\E09E","#9068b0"],_wat:["\\E09F","#a074c4"],_wat_light:["\\E09F","#9068b0"],_webpack:["\\E0A0","#519aba"],_webpack_light:["\\E0A0","#498ba7"],_wgt:["\\E0A1","#519aba"],_wgt_light:["\\E0A1","#498ba7"],_windows:["\\E0A2","#519aba"],_windows_light:["\\E0A2","#498ba7"],_word:["\\E0A3","#519aba"],_word_light:["\\E0A3","#498ba7"],_xls:["\\E0A4","#8dc149"],_xls_light:["\\E0A4","#7fae42"],_xml:["\\E0A5","#e37933"],_xml_light:["\\E0A5","#cc6d2e"],_yarn:["\\E0A6","#519aba"],_yarn_light:["\\E0A6","#498ba7"],_yml:["\\E0A7","#a074c4"],_yml_light:["\\E0A7","#9068b0"],_zig:["\\E0A8","#e37933"],_zig_light:["\\E0A8","#cc6d2e"],_zip:["\\E0A9","#cc3e44"],_zip_1:["\\E0A9","#6d8086"],_zip_1_light:["\\E0A9","#627379"],_zip_light:["\\E0A9","#b8383d"]},o3={"babel.config.cjs":"_babel","babel.config.js":"_babel","babel.config.json":"_babel","bower.json":"_bower",build:"_bazel","build.bazel":"_bazel",changelog:"_clock","changelog.md":"_clock","changelog.txt":"_clock",changes:"_clock","changes.md":"_clock","changes.txt":"_clock","cmakelists.txt":"_makefile_3",compiling:"_license_1","compiling.md":"_license_1","compiling.txt":"_license_1",contributing:"_license_2","contributing.md":"_license_2","contributing.txt":"_license_2",copying:"_license","copying.md":"_license","copying.txt":"_license","docker-healthcheck":"_docker_2","eslint.config.js":"_eslint","firebase.json":"_firebase",geckodriver:"_firefox","gruntfile.babel.js":"_grunt","gruntfile.coffee":"_grunt","gruntfile.js":"_grunt",gulpfile:"_gulp","gulpfile.js":"_gulp","ionic.config.json":"_ionic","ionic.project":"_ionic",jenkinsfile:"_jenkins","karma.conf.cjs":"_karma","karma.conf.coffee":"_karma","karma.conf.js":"_karma","karma.conf.mjs":"_karma",licence:"_license","licence.md":"_license","licence.txt":"_license",license:"_license","license.md":"_license","license.txt":"_license","mime.types":"_config",mix:"_hex",mvnw:"_maven","npm-debug.log":"_npm_ignored",omakefile:"_makefile_2","platformio.ini":"_platformio","pom.xml":"_maven",procfile:"_heroku",qmakefile:"_makefile_1",readme:"_info","readme.md":"_info","readme.txt":"_info","rollup.config.js":"_rollup","sass-lint.yml":"_sass","stylelint.config.cjs":"_stylelint","stylelint.config.js":"_stylelint","stylelint.config.mjs":"_stylelint","swagger.json":"_json_1","swagger.yaml":"_json_1","swagger.yml":"_json_1",todo:"_todo","todo.md":"_todo","todo.txt":"_todo","tsconfig.json":"_tsconfig",version:"_clock","version.md":"_clock","version.txt":"_clock","vite.config.cjs":"_vite","vite.config.cts":"_vite","vite.config.js":"_vite","vite.config.mjs":"_vite","vite.config.mts":"_vite","vite.config.ts":"_vite","webpack.common.cjs":"_webpack","webpack.common.js":"_webpack","webpack.common.mjs":"_webpack","webpack.common.ts":"_webpack","webpack.config.build.cjs":"_webpack","webpack.config.build.js":"_webpack","webpack.config.build.mjs":"_webpack","webpack.config.build.ts":"_webpack","webpack.config.cjs":"_webpack","webpack.config.js":"_webpack","webpack.config.mjs":"_webpack","webpack.config.ts":"_webpack","webpack.dev.cjs":"_webpack","webpack.dev.js":"_webpack","webpack.dev.mjs":"_webpack","webpack.dev.ts":"_webpack","webpack.prod.cjs":"_webpack","webpack.prod.js":"_webpack","webpack.prod.mjs":"_webpack","webpack.prod.ts":"_webpack",workspace:"_bazel","workspace.bazel":"_bazel","yarn.clean":"_yarn","yarn.lock":"_yarn"},o5={"3dm":"_svg_1","3ds":"_svg_1",ad:"_argdown",ai:"_illustrator",apex:"_salesforce",argdown:"_argdown",article:"_go",asax:"_html_2",ascx:"_html_1",asm:"_asm",aspx:"_html",avi:"_video",avif:"_image",babelrc:"_babel","babelrc.cjs":"_babel","babelrc.js":"_babel",bazel:"_bazel",bazelignore:"_bazel",bazelrc:"_bazel_1",bazelversion:"_bazel",bicep:"_bicep",bowerrc:"_bower",bsl:"_bsl",build:"_bazel",bzl:"_bazel",cake:"_cake",cer:"_lock",cert:"_lock",cfc:"_coldfusion",cfm:"_coldfusion","cjs.map":"_javascript",cjsx:"_react",class:"_java_1",classpath:"_java",cls:"_salesforce",cmx:"_ocaml",cmxa:"_ocaml","codeclimate.yml":"_code-climate",component:"_html_3",config:"_config",cr:"_crystal",crt:"_lock",cson:"_json","css.map":"_css",csv:"_csv",ctp:"_cake_php",cuh:"_cu_1",d:"_d",dae:"_svg_1",direnv:"_config",doc:"_word",dockerignore:"_docker_1",docx:"_word",ds_store:"_ignored",dtx:"_tex_2",ecr:"_crystal_embedded",edn:"_clojure_1",ejs:"_ejs",elm:"_elm",eot:"_font",epp:"_puppet",erb:"_html_erb","erb.html":"_html_erb",es:"_javascript",es5:"_javascript",es7:"_javascript",eslintignore:"_eslint_1",eslintrc:"_eslint","eslintrc.cjs":"_eslint","eslintrc.js":"_eslint","eslintrc.json":"_eslint","eslintrc.yaml":"_eslint","eslintrc.yml":"_eslint",ex:"_elixir",exs:"_elixir_script",firebaserc:"_firebase",flac:"_audio",gd:"_godot",gif:"_image",gitattributes:"_git",gitconfig:"_git","github-issues":"_github",gitkeep:"_git","gitlab-ci.yml":"_gitlab",gitmodules:"_git",godot:"_godot_1",gql:"_graphql",gradle:"_gradle",graphql:"_graphql",graphqls:"_graphql",gsp:"_grails",h:"_c_1","h++":"_cpp_1",hack:"_hacklang",haml:"_haml",happenings:"_happenings",hh:"_cpp_1",hpp:"_cpp_1",hs:"_haskell",htaccess:"_config","html.erb":"_html_erb",hu:"_cu_1",hx:"_haxe",hxml:"_haxe_3",hxp:"_haxe_2",hxs:"_haxe_1",hxx:"_cpp_1",ico:"_favicon",ins:"_tex_3",ipynb:"_notebook",jade:"_jade",jar:"_zip",jinja:"_jinja",jinja2:"_jinja",jpeg:"_image",jpg:"_image","js.map":"_javascript",jscsrc:"_javascript_2",jshintrc:"_javascript_2",key:"_lock",kt:"_kotlin",kts:"_kotlin",lhs:"_haskell",liquid:"_liquid",litcoffee:"_coffee",ls:"_livescript",master:"_html_2",mdo:"_mdo","mjs.map":"_javascript",ml:"_ocaml",mli:"_ocaml",mov:"_video",mp3:"_audio",mp4:"_video",mpg:"_video",mustache:"_mustache",nim:"_nim",nims:"_nim",nj:"_nunjucks",njk:"_nunjucks",njs:"_nunjucks","npm-debug.log":"_npm",npmignore:"_npm_1",npmrc:"_npm_1",nunj:"_nunjucks",nunjs:"_nunjucks",nunjucks:"_nunjucks",obj:"_svg_1",odata:"_odata",ogg:"_audio",ogv:"_video",otf:"_font",pddl:"_pddl",pdf:"_pdf",pem:"_lock","php.inc":"_php",pipeline:"_pipeline",plan:"_plan",png:"_image",pp:"_puppet",prisma:"_prisma",pro:"_prolog",psd:"_photoshop",purs:"_purescript",pxm:"_image",r:"_R",re:"_reasonml",res:"_rescript",resi:"_rescript_1",rmd:"_R",s:"_asm",sass:"_sass",sbt:"_sbt",scala:"_scala",slang:"_crystal_embedded",slide:"_go",slim:"_slim",slugignore:"_config","smarty.tpl":"_smarty",sol:"_ethereum",soql:"_db_1","spec.cjs":"_javascript_1","spec.js":"_javascript_1","spec.jsx":"_react_1","spec.mjs":"_javascript_1","spec.ts":"_typescript_1","spec.tsx":"_react_1",springbeans:"_spring",sss:"_css",stache:"_mustache",static:"_config",stl:"_svg_1",styl:"_stylus",stylelintignore:"_stylelint_1",stylelintrc:"_stylelint","stylelintrc.js":"_stylelint","stylelintrc.json":"_stylelint","stylelintrc.yaml":"_stylelint","stylelintrc.yml":"_stylelint","sublime-project":"_sublime","sublime-workspace":"_sublime",svelte:"_svelte",svg:"_svg",svgx:"_image","test.cjs":"_javascript_1","test.js":"_javascript_1","test.jsx":"_react_1","test.mjs":"_javascript_1","test.ts":"_typescript_1","test.tsx":"_react_1",tf:"_terraform","tf.json":"_terraform",tfvars:"_terraform","tfvars.json":"_terraform",tiff:"_image",tmp:"_clock_1",toml:"_config",tpl:"_smarty",tres:"_godot_2",tscn:"_godot_3",ttf:"_font",twig:"_twig",vala:"_vala",vapi:"_vala",vue:"_vue",wasm:"_wasm",wat:"_wat",wav:"_audio",webm:"_video",webp:"_image",wgt:"_wgt",woff:"_font",woff2:"_font",workspace:"_bazel",xls:"_xls",xlsx:"_xls",zig:"_zig",zip:"_zip_1"},o4={argdown:"_argdown",bat:"_windows",bicep:"_bicep",blade:"_php",c:"_c",chatagent:"_markdown",clojure:"_clojure",coffeescript:"_coffee",cpp:"_cpp",csharp:"_c-sharp",css:"_css","cuda-cpp":"_cu",dart:"_dart","django-html":"_html_3",dockercompose:"_docker_3",dockerfile:"_docker",dotenv:"_config",elixir:"_elixir",elm:"_elm",erb:"_html_erb",fsharp:"_f-sharp","git-commit":"_git","github-issues":"_github",go:"_go2",godot:"_godot",gradle:"_gradle",groovy:"_grails",haml:"_haml",handlebars:"_mustache",haskell:"_haskell",haxe:"_haxe",html:"_html_3",ignore:"_git",instructions:"_markdown",jade:"_pug",java:"_java",javascript:"_javascript",javascriptreact:"_react",jinja:"_jinja",json:"_json",jsonc:"_json",jsonl:"_json",julia:"_julia",kotlin:"_kotlin",latex:"_tex",less:"_less",lua:"_lua",makefile:"_makefile",markdown:"_markdown",mustache:"_mustache",nunjucks:"_nunjucks","objective-c":"_c_2","objective-cpp":"_cpp_2",ocaml:"_ocaml",perl:"_perl",php:"_php",postcss:"_css",powershell:"_powershell",prompt:"_markdown",properties:"_config",python:"_python",r:"_R",razor:"_html",rescript:"_rescript",ruby:"_ruby",rust:"_rust",sass:"_sass",scss:"_sass","search-result":"_code-search",shellscript:"_shell",skill:"_markdown",sql:"_db",stylus:"_stylus",swift:"_swift",terraform:"_terraform",tex:"_tex_1",todo:"_todo",typescript:"_typescript",typescriptreact:"_react",vala:"_vala",vue:"_vue",xml:"_xml",yaml:"_yml"},o7={"babel.config.cjs":"_babel_light","babel.config.js":"_babel_light","babel.config.json":"_babel_light","bower.json":"_bower_light",build:"_bazel_light","build.bazel":"_bazel_light",changelog:"_clock_light","changelog.md":"_clock_light","changelog.txt":"_clock_light",changes:"_clock_light","changes.md":"_clock_light","changes.txt":"_clock_light","cmakelists.txt":"_makefile_3_light",compiling:"_license_1_light","compiling.md":"_license_1_light","compiling.txt":"_license_1_light",contributing:"_license_2_light","contributing.md":"_license_2_light","contributing.txt":"_license_2_light",copying:"_license_light","copying.md":"_license_light","copying.txt":"_license_light","docker-healthcheck":"_docker_2_light","eslint.config.js":"_eslint_light","firebase.json":"_firebase_light",geckodriver:"_firefox_light","gruntfile.babel.js":"_grunt_light","gruntfile.coffee":"_grunt_light","gruntfile.js":"_grunt_light",gulpfile:"_gulp_light","gulpfile.js":"_gulp_light","ionic.config.json":"_ionic_light","ionic.project":"_ionic_light",jenkinsfile:"_jenkins_light","karma.conf.cjs":"_karma_light","karma.conf.coffee":"_karma_light","karma.conf.js":"_karma_light","karma.conf.mjs":"_karma_light",licence:"_license_light","licence.md":"_license_light","licence.txt":"_license_light",license:"_license_light","license.md":"_license_light","license.txt":"_license_light","mime.types":"_config_light",mix:"_hex_light",mvnw:"_maven_light","npm-debug.log":"_npm_ignored_light",omakefile:"_makefile_2_light","platformio.ini":"_platformio_light","pom.xml":"_maven_light",procfile:"_heroku_light",qmakefile:"_makefile_1_light",readme:"_info_light","readme.md":"_info_light","readme.txt":"_info_light","rollup.config.js":"_rollup_light","sass-lint.yml":"_sass_light","stylelint.config.cjs":"_stylelint_light","stylelint.config.js":"_stylelint_light","stylelint.config.mjs":"_stylelint_light","swagger.json":"_json_1_light","swagger.yaml":"_json_1_light","swagger.yml":"_json_1_light","tsconfig.json":"_tsconfig_light",version:"_clock_light","version.md":"_clock_light","version.txt":"_clock_light","vite.config.cjs":"_vite_light","vite.config.cts":"_vite_light","vite.config.js":"_vite_light","vite.config.mjs":"_vite_light","vite.config.mts":"_vite_light","vite.config.ts":"_vite_light","webpack.common.cjs":"_webpack_light","webpack.common.js":"_webpack_light","webpack.common.mjs":"_webpack_light","webpack.common.ts":"_webpack_light","webpack.config.build.cjs":"_webpack_light","webpack.config.build.js":"_webpack_light","webpack.config.build.mjs":"_webpack_light","webpack.config.build.ts":"_webpack_light","webpack.config.cjs":"_webpack_light","webpack.config.js":"_webpack_light","webpack.config.mjs":"_webpack_light","webpack.config.ts":"_webpack_light","webpack.dev.cjs":"_webpack_light","webpack.dev.js":"_webpack_light","webpack.dev.mjs":"_webpack_light","webpack.dev.ts":"_webpack_light","webpack.prod.cjs":"_webpack_light","webpack.prod.js":"_webpack_light","webpack.prod.mjs":"_webpack_light","webpack.prod.ts":"_webpack_light",workspace:"_bazel_light","workspace.bazel":"_bazel_light","yarn.clean":"_yarn_light","yarn.lock":"_yarn_light"},o6={"3dm":"_svg_1_light","3ds":"_svg_1_light",ad:"_argdown_light",ai:"_illustrator_light",apex:"_salesforce_light",argdown:"_argdown_light",article:"_go_light",asax:"_html_2_light",ascx:"_html_1_light",asm:"_asm_light",aspx:"_html_light",avi:"_video_light",avif:"_image_light",babelrc:"_babel_light","babelrc.cjs":"_babel_light","babelrc.js":"_babel_light",bazel:"_bazel_light",bazelignore:"_bazel_light",bazelrc:"_bazel_1_light",bazelversion:"_bazel_light",bicep:"_bicep_light",bowerrc:"_bower_light",bsl:"_bsl_light",build:"_bazel_light",bzl:"_bazel_light",cake:"_cake_light",cer:"_lock_light",cert:"_lock_light",cfc:"_coldfusion_light",cfm:"_coldfusion_light","cjs.map":"_javascript_light",cjsx:"_react_light",class:"_java_1_light",classpath:"_java_light",cls:"_salesforce_light",cmx:"_ocaml_light",cmxa:"_ocaml_light","codeclimate.yml":"_code-climate_light",component:"_html_3_light",config:"_config_light",cr:"_crystal_light",crt:"_lock_light",cson:"_json_light","css.map":"_css_light",csv:"_csv_light",ctp:"_cake_php_light",cuh:"_cu_1_light",d:"_d_light",dae:"_svg_1_light",direnv:"_config_light",doc:"_word_light",dockerignore:"_docker_1_light",docx:"_word_light",ds_store:"_ignored_light",dtx:"_tex_2_light",ecr:"_crystal_embedded_light",edn:"_clojure_1_light",ejs:"_ejs_light",elm:"_elm_light",eot:"_font_light",epp:"_puppet_light",erb:"_html_erb_light","erb.html":"_html_erb_light",es:"_javascript_light",es5:"_javascript_light",es7:"_javascript_light",eslintignore:"_eslint_1_light",eslintrc:"_eslint_light","eslintrc.cjs":"_eslint_light","eslintrc.js":"_eslint_light","eslintrc.json":"_eslint_light","eslintrc.yaml":"_eslint_light","eslintrc.yml":"_eslint_light",ex:"_elixir_light",exs:"_elixir_script_light",firebaserc:"_firebase_light",flac:"_audio_light",gd:"_godot_light",gif:"_image_light",gitattributes:"_git_light",gitconfig:"_git_light","github-issues":"_github_light",gitkeep:"_git_light","gitlab-ci.yml":"_gitlab_light",gitmodules:"_git_light",godot:"_godot_1_light",gql:"_graphql_light",gradle:"_gradle_light",graphql:"_graphql_light",graphqls:"_graphql_light",gsp:"_grails_light",h:"_c_1_light","h++":"_cpp_1_light",hack:"_hacklang_light",haml:"_haml_light",happenings:"_happenings_light",hh:"_cpp_1_light",hpp:"_cpp_1_light",hs:"_haskell_light",htaccess:"_config_light","html.erb":"_html_erb_light",hu:"_cu_1_light",hx:"_haxe_light",hxml:"_haxe_3_light",hxp:"_haxe_2_light",hxs:"_haxe_1_light",hxx:"_cpp_1_light",ico:"_favicon_light",ins:"_tex_3_light",ipynb:"_notebook_light",jade:"_jade_light",jar:"_zip_light",jinja:"_jinja_light",jinja2:"_jinja_light",jpeg:"_image_light",jpg:"_image_light","js.map":"_javascript_light",jscsrc:"_javascript_2_light",jshintrc:"_javascript_2_light",key:"_lock_light",kt:"_kotlin_light",kts:"_kotlin_light",lhs:"_haskell_light",liquid:"_liquid_light",litcoffee:"_coffee_light",ls:"_livescript_light",master:"_html_2_light",mdo:"_mdo_light","mjs.map":"_javascript_light",ml:"_ocaml_light",mli:"_ocaml_light",mov:"_video_light",mp3:"_audio_light",mp4:"_video_light",mpg:"_video_light",mustache:"_mustache_light",nim:"_nim_light",nims:"_nim_light",nj:"_nunjucks_light",njk:"_nunjucks_light",njs:"_nunjucks_light","npm-debug.log":"_npm_light",npmignore:"_npm_1_light",npmrc:"_npm_1_light",nunj:"_nunjucks_light",nunjs:"_nunjucks_light",nunjucks:"_nunjucks_light",obj:"_svg_1_light",odata:"_odata_light",ogg:"_audio_light",ogv:"_video_light",otf:"_font_light",pddl:"_pddl_light",pdf:"_pdf_light",pem:"_lock_light","php.inc":"_php_light",pipeline:"_pipeline_light",plan:"_plan_light",png:"_image_light",pp:"_puppet_light",prisma:"_prisma_light",pro:"_prolog_light",psd:"_photoshop_light",purs:"_purescript_light",pxm:"_image_light",r:"_R_light",re:"_reasonml_light",res:"_rescript_light",resi:"_rescript_1_light",rmd:"_R_light",s:"_asm_light",sass:"_sass_light",sbt:"_sbt_light",scala:"_scala_light",slang:"_crystal_embedded_light",slide:"_go_light",slim:"_slim_light",slugignore:"_config_light","smarty.tpl":"_smarty_light",sol:"_ethereum_light",soql:"_db_1_light","spec.cjs":"_javascript_1_light","spec.js":"_javascript_1_light","spec.jsx":"_react_1_light","spec.mjs":"_javascript_1_light","spec.ts":"_typescript_1_light","spec.tsx":"_react_1_light",springbeans:"_spring_light",sss:"_css_light",stache:"_mustache_light",static:"_config_light",stl:"_svg_1_light",styl:"_stylus_light",stylelintignore:"_stylelint_1_light",stylelintrc:"_stylelint_light","stylelintrc.js":"_stylelint_light","stylelintrc.json":"_stylelint_light","stylelintrc.yaml":"_stylelint_light","stylelintrc.yml":"_stylelint_light","sublime-project":"_sublime_light","sublime-workspace":"_sublime_light",svelte:"_svelte_light",svg:"_svg_light",svgx:"_image_light","test.cjs":"_javascript_1_light","test.js":"_javascript_1_light","test.jsx":"_react_1_light","test.mjs":"_javascript_1_light","test.ts":"_typescript_1_light","test.tsx":"_react_1_light",tf:"_terraform_light","tf.json":"_terraform_light",tfvars:"_terraform_light","tfvars.json":"_terraform_light",tiff:"_image_light",tmp:"_clock_1_light",toml:"_config_light",tpl:"_smarty_light",tres:"_godot_2_light",tscn:"_godot_3_light",ttf:"_font_light",twig:"_twig_light",vala:"_vala_light",vapi:"_vala_light",vue:"_vue_light",wasm:"_wasm_light",wat:"_wat_light",wav:"_audio_light",webm:"_video_light",webp:"_image_light",wgt:"_wgt_light",woff:"_font_light",woff2:"_font_light",workspace:"_bazel_light",xls:"_xls_light",xlsx:"_xls_light",zig:"_zig_light",zip:"_zip_1_light"},o8={argdown:"_argdown_light",bat:"_windows_light",bicep:"_bicep_light",blade:"_php_light",c:"_c_light",chatagent:"_markdown_light",clojure:"_clojure_light",coffeescript:"_coffee_light",cpp:"_cpp_light",csharp:"_c-sharp_light",css:"_css_light","cuda-cpp":"_cu_light",dart:"_dart_light","django-html":"_html_3_light",dockercompose:"_docker_3_light",dockerfile:"_docker_light",dotenv:"_config_light",elixir:"_elixir_light",elm:"_elm_light",erb:"_html_erb_light",fsharp:"_f-sharp_light","git-commit":"_git_light","github-issues":"_github_light",go:"_go2_light",godot:"_godot_light",gradle:"_gradle_light",groovy:"_grails_light",haml:"_haml_light",handlebars:"_mustache_light",haskell:"_haskell_light",haxe:"_haxe_light",html:"_html_3_light",ignore:"_git_light",instructions:"_markdown_light",jade:"_pug_light",java:"_java_light",javascript:"_javascript_light",javascriptreact:"_react_light",jinja:"_jinja_light",json:"_json_light",jsonc:"_json_light",jsonl:"_json_light",julia:"_julia_light",kotlin:"_kotlin_light",latex:"_tex_light",less:"_less_light",lua:"_lua_light",makefile:"_makefile_light",markdown:"_markdown_light",mustache:"_mustache_light",nunjucks:"_nunjucks_light","objective-c":"_c_2_light","objective-cpp":"_cpp_2_light",ocaml:"_ocaml_light",perl:"_perl_light",php:"_php_light",postcss:"_css_light",powershell:"_powershell_light",prompt:"_markdown_light",properties:"_config_light",python:"_python_light",r:"_R_light",razor:"_html_light",rescript:"_rescript_light",ruby:"_ruby_light",rust:"_rust_light",sass:"_sass_light",scss:"_sass_light","search-result":"_code-search_light",shellscript:"_shell_light",skill:"_markdown_light",sql:"_db_light",stylus:"_stylus_light",swift:"_swift_light",terraform:"_terraform_light",tex:"_tex_1_light",typescript:"_typescript_light",typescriptreact:"_react_light",vala:"_vala_light",vue:"_vue_light",xml:"_xml_light",yaml:"_yml_light"},o9="_default_light",ne={".bash":"shellscript",".bat":"bat",".c":"c",".cc":"cpp",".cjs":"javascript",".clj":"clojure",".cljc":"clojure",".cljs":"clojure",".cmd":"bat",".coffee":"coffeescript",".cpp":"cpp",".cs":"csharp",".cshtml":"razor",".css":"css",".cu":"cuda-cpp",".cxx":"cpp",".dart":"dart",".dockerfile":"dockerfile",".fs":"fsharp",".fsx":"fsharp",".gitignore":"ignore",".go":"go",".gradle":"groovy",".groovy":"groovy",".h":"c",".handlebars":"handlebars",".hbs":"handlebars",".hpp":"cpp",".htm":"html",".html":"html",".java":"java",".jl":"julia",".js":"javascript",".json":"json",".jsonc":"jsonc",".jsx":"javascriptreact",".kt":"kotlin",".kts":"kotlin",".less":"less",".lua":"lua",".m":"objective-c",".makefile":"makefile",".markdown":"markdown",".md":"markdown",".mjs":"javascript",".mk":"makefile",".mm":"objective-cpp",".npmignore":"ignore",".php":"php",".pl":"perl",".pm":"perl",".properties":"properties",".ps1":"powershell",".psm1":"powershell",".py":"python",".r":"r",".rb":"ruby",".rs":"rust",".sass":"scss",".scss":"scss",".sh":"shellscript",".sql":"sql",".swift":"swift",".tex":"latex",".ts":"typescript",".tsx":"typescriptreact",".xml":"xml",".xsd":"xml",".xsl":"xml",".yaml":"yaml",".yml":"yaml",".zsh":"shellscript"};function nt(t){let i=o2[t];if(null!=i)return{character:i[0],color:i[1]}}var ni=Object.defineProperty,nr=Object.getOwnPropertyDescriptor,ns=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?nr(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&ni(i,r,n),n};let no=class extends lit_element_i{render(){if(null==this.filename)return tl;let t=document.body.classList.contains("vscode-light")||document.body.classList.contains("vscode-high-contrast-light"),i=function(t,i=!1){let r=t.toLowerCase(),s=(i?o7:o3)[r];if(null!=s)return nt(s);let o=i?o6:o5,n=r.indexOf(".");for(;-1!==n&&n<r.length-1;){if(null!=(s=o[r.substring(n+1)]))return nt(s);n=r.indexOf(".",n+1)}let a=r.lastIndexOf(".");if(-1!==a){let t=ne[r.substring(a)];if(null!=t&&null!=(s=(i?o8:o4)[t]))return nt(s)}return nt(i&&o9?o9:"_default")}(this.filename,t);if(null==i)return tl;let r=function(t){if(1===t.length)return t;let i=/^\\+(?:u)?([0-9a-fA-F]{4,6})$/.exec(t);return null!=i?String.fromCodePoint(parseInt(i[1],16)):t}(i.character);return to`<span class="font-icon" style=${o1({color:i.color||"inherit"})}>${r}</span>`}};no.styles=tL`
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
	`,ns([t1()],no.prototype,"filename",2),no=ns([tJ("gl-file-icon")],no);let nn={".":"Unchanged","!":"Ignored","?":"Untracked",A:"Added",D:"Deleted",M:"Modified",R:"Renamed",C:"Copied",AA:"Added (Both)",AU:"Added (Current)",UA:"Added (Incoming)",DD:"Deleted (Both)",DU:"Deleted (Current)",UD:"Deleted (Incoming)",UU:"Modified (Both)",T:"Modified",U:"Updated but Unmerged"};var na=Object.defineProperty,nl=Object.getOwnPropertyDescriptor,nc=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?nl(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&na(i,r,n),n};let nh=class extends lit_element_i{get statusName(){return this.status?nn[this.status]??"Unknown":""}updated(t){super.updated(t),t.has("status")&&(this.statusName?this.setAttribute("title",this.statusName):this.removeAttribute("title"),this.status?.length===2?this.setAttribute("conflict",""):this.removeAttribute("conflict"))}renderIgnored(){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#969696"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM10 4l-6.01 6.01 1.06 1.061 6.01-6.01L10 4z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderUntracked(){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3.942-3.942l7.5-7.5.884.884-.664.664c.95.655 1.65 1.524 2.222 2.394-1.15 1.75-2.824 3.5-6 3.5-.696 0-1.32-.084-1.882-.234l-1.176 1.176-.884-.884zm5.188-3.42l1.629-1.629c.634.393 1.147.913 1.594 1.491C10.99 8.767 9.692 9.75 7.5 9.75c-.287 0-.56-.017-.817-.05l.455-.454a1.5 1.5 0 0 0 1.608-1.608zM7.362 6.254L5.754 7.862a1.5 1.5 0 0 1 1.608-1.608zm.955-.955A6.595 6.595 0 0 0 7.5 5.25c-2.192 0-3.49.982-4.469 2.25.447.578.96 1.098 1.594 1.491l-.903.903C2.772 9.239 2.072 8.369 1.5 7.5 2.65 5.75 4.324 4 7.5 4c.696 0 1.32.084 1.882.234L8.317 5.299z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderAdded(){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#388A34"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm.75-6.75h3v-1.5h-3v-3h-1.5v3h-3v1.5h3v3h1.5v-3z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderDeleted(){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#9E121D"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-6.75v-1.5h-7.5v1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderModified(){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#1B80B2"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-9.5V7h-3v2.5h-1.5V7h-3V5.5h3v-3h1.5v3h3zm0 5V12h-7.5v-1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderRenamed(){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#C63"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.25 4.5v1.25h1.25l1 1v2.5l-1 1H9.25v1.25H10v1.25H7V11.5h.75v-1.25H4l-1-1v-2.5l1-1h3.75V4.5H7V3.25h3V4.5h-.75zm-5 2.5h3.5v2h-3.5V7zm5 0v2h1V7h-1z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderCopied(){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#692C77"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM6.964 3.75L5.893 4.813v.53h1.071v-.53h3.215v4.25h-.536v1.062h.536l1.071-1.063v-4.25L10.179 3.75H6.964zM3.75 6.938l1.071-1.063h3.215l1.071 1.063v4.25L8.036 12.25H4.82L3.75 11.187v-4.25zm1.071 0v4.25h3.215v-4.25H4.82z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderConflictGlyphs(t,i,r,s,o,n){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 22 16">
				<path d="M3 0H10V16H3C1.35 16 0 14.65 0 13V3C0 1.35 1.35 0 3 0Z" fill="${t}" />
				<path d="M12 0H19C20.65 0 22 1.35 22 3V13C22 14.65 20.65 16 19 16H12V0Z" fill="${s}" />
				<text
					x="5"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${r}"
				>
					${i}
				</text>
				<text
					x="17"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${n}"
				>
					${o}
				</text>
			</svg>
		`}renderConflictUU(){let t="var(--gl-git-status-conflict-modified, #c4a000)";return this.renderConflictGlyphs(t,"±","#000",t,"±","#000")}renderConflictAA(){let t="var(--gl-git-status-added)";return this.renderConflictGlyphs(t,"+","#fff",t,"+","#fff")}renderConflictDD(){let t="var(--gl-git-status-deleted)";return this.renderConflictGlyphs(t,"−","#fff",t,"−","#fff")}renderConflictDU(){return this.renderConflictGlyphs("var(--gl-git-status-deleted)","−","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUD(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-deleted)","−","#fff")}renderConflictAU(){return this.renderConflictGlyphs("var(--gl-git-status-added)","+","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUA(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-added)","+","#fff")}renderUnknown(){return to`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.19 2.822c-.439-.215-.97-.322-1.596-.322-1.25 0-2.282.478-3.094 1.435l1.05.798c.275-.331.579-.574.91-.728.331-.154.66-.231.987-.231.415 0 .76.093 1.036.28.275.182.413.448.413.798 0 .275-.082.509-.245.7-.159.187-.36.364-.602.532a9.506 9.506 0 0 0-.728.56 2.66 2.66 0 0 0-.602.763c-.159.299-.238.679-.238 1.141v.483h1.498v-.413c0-.364.086-.663.259-.896a2.76 2.76 0 0 1 .637-.616c.252-.177.504-.362.756-.553.257-.196.471-.436.644-.721.173-.285.259-.651.259-1.099 0-.387-.114-.749-.343-1.085-.229-.34-.562-.616-1.001-.826zm-1.169 7.917a1.024 1.024 0 0 0-.763-.315c-.294 0-.544.105-.749.315-.2.205-.301.453-.301.742 0 .294.1.546.301.756.205.205.455.308.749.308.303 0 .558-.103.763-.308.205-.21.308-.462.308-.756 0-.29-.103-.537-.308-.742z"
					clip-rule="evenodd"
				/>
			</svg>
		`}render(){switch(this.status){case"!":return this.renderIgnored();case"?":return this.renderUntracked();case"A":return this.renderAdded();case"D":return this.renderDeleted();case"M":case"T":case"U":return this.renderModified();case"R":return this.renderRenamed();case"C":return this.renderCopied();case"AA":return this.renderConflictAA();case"AU":return this.renderConflictAU();case"UA":return this.renderConflictUA();case"DD":return this.renderConflictDD();case"DU":return this.renderConflictDU();case"UD":return this.renderConflictUD();case"UU":return this.renderConflictUU()}return this.renderUnknown()}};nh.styles=[tL`
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
		`],nc([t1()],nh.prototype,"status",2),nc([t2()],nh.prototype,"statusName",1),nh=nc([tJ("gl-git-status")],nh);var nd=Object.defineProperty,np=Object.getOwnPropertyDescriptor,nu=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?np(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&nd(i,r,n),n};let ng=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1,this.ariaLabel=null}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(t){if(t.has("href")&&this.setAttribute("role",this.href?"link":"button"),t.has("disabled")){let i=t.get("disabled");i?this.setAttribute("aria-disabled",i.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(t)}render(){return this.tooltip?to`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??tl}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?to`<gl-tooltip placement=${this.tooltipPlacement??tl}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?to`<a
				class="control"
				aria-label=${this.ariaLabel??tl}
				tabindex="${(!1===this.disabled?void 0:-1)??tl}"
				href=${this.href}
				@keypress=${t=>this.onLinkKeypress(t)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:to`<button
			class="control"
			role=${this.role??tl}
			aria-label=${this.ariaLabel??tl}
			aria-checked=${this.ariaChecked??tl}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(t){" "===t.key&&this.control.click()}focus(t){this.control.focus(t)}blur(){this.control.blur()}click(){this.control.click()}};ng.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},ng.styles=[rH,tL`
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
				${rq}
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
		`],nu([t5(".control")],ng.prototype,"control",2),nu([t1({reflect:!0})],ng.prototype,"appearance",2),nu([t1({reflect:!0})],ng.prototype,"variant",2),nu([t1({type:Boolean,reflect:!0})],ng.prototype,"disabled",2),nu([t1({reflect:!0})],ng.prototype,"density",2),nu([t1({type:Boolean,reflect:!0})],ng.prototype,"full",2),nu([t1()],ng.prototype,"href",2),nu([t1()],ng.prototype,"tooltip",2),nu([t1()],ng.prototype,"tooltipPlacement",2),nu([t1({type:Boolean,reflect:!0})],ng.prototype,"truncate",2),nu([t1({type:String,attribute:"aria-label"})],ng.prototype,"ariaLabel",2),ng=nu([tJ("gl-button")],ng);let private_async_helpers_s=class private_async_helpers_s{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(t=>this.Z=t)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let nf=t=>null!==t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...t){return t.find(t=>!nf(t))??ta}update(t,i){let r=this._$Cbt,s=r.length;this._$Cbt=i;let o=this._$CK,n=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cwt);t++){let a=i[t];if(!nf(a))return this._$Cwt=t,a;t<s&&a===r[t]||(this._$Cwt=0x3fffffff,s=0,Promise.resolve(a).then(async t=>{for(;n.get();)await n.get();let i=o.deref();if(void 0!==i){let r=i._$Cbt.indexOf(a);r>-1&&r<i._$Cwt&&(i._$Cwt=r,i.setValue(t))}}))}return ta}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let nm=eK(until_c);function nb(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var n_=nb(),nv={exec:()=>null};function ny(t,i=""){let r="string"==typeof t?t:t.source,s={replace:(t,i)=>{let o="string"==typeof i?i:i.source;return o=o.replace(nk.caret,"$1"),r=r.replace(t,o),s},getRegex:()=>new RegExp(r,i)};return s}var nw=((t="")=>{try{return!!RegExp("(?<=1)(?<!1)"+t)}catch{return!1}})(),nk={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}>`)},nx=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,nC=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,n$=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,nE=ny(n$).replace(/bull/g,nC).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),nS=ny(n$).replace(/bull/g,nC).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),nA=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nz=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,nI=ny(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",nz).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nT=ny(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,nC).getRegex(),nP="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",nj=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nR=ny("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",nj).replace("tag",nP).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),nM=ny(nA).replace("hr",nx).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nP).getRegex(),nL={blockquote:ny(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",nM).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:nI,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:nx,html:nR,lheading:nE,list:nT,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:nM,table:nv,text:/^[^\n]+/},nO=ny("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",nx).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nP).getRegex(),nD={...nL,lheading:nS,table:nO,paragraph:ny(nA).replace("hr",nx).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",nO).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nP).getRegex()},nB={...nL,html:ny("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",nj).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nv,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ny(nA).replace("hr",nx).replace("heading",` *#{1,6} *[^
]`).replace("lheading",nE).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},nF=/^( {2,}|\\)\n(?!\s*$)/,nN=/[\p{P}\p{S}]/u,nU=/[\s\p{P}\p{S}]/u,nq=/[^\s\p{P}\p{S}]/u,nH=ny(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,nU).getRegex(),nV=/(?!~)[\p{P}\p{S}]/u,nK=ny(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",nw?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),nW=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,nG=ny(nW,"u").replace(/punct/g,nN).getRegex(),nZ=ny(nW,"u").replace(/punct/g,nV).getRegex(),nX="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",nQ=ny(nX,"gu").replace(/notPunctSpace/g,nq).replace(/punctSpace/g,nU).replace(/punct/g,nN).getRegex(),nY=ny(nX,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,nV).getRegex(),nJ=ny("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,nq).replace(/punctSpace/g,nU).replace(/punct/g,nN).getRegex(),n0=ny(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,nN).getRegex(),n1=ny("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,nq).replace(/punctSpace/g,nU).replace(/punct/g,nN).getRegex(),n2=ny(/\\(punct)/,"gu").replace(/punct/g,nN).getRegex(),n3=ny(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),n5=ny(nj).replace("(?:--\x3e|$)","--\x3e").getRegex(),n4=ny("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",n5).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),n7=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,n6=ny(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",n7).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),n8=ny(/^!?\[(label)\]\[(ref)\]/).replace("label",n7).replace("ref",nz).getRegex(),n9=ny(/^!?\[(ref)\](?:\[\])?/).replace("ref",nz).getRegex(),ae=ny("reflink|nolink(?!\\()","g").replace("reflink",n8).replace("nolink",n9).getRegex(),at=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ai={_backpedal:nv,anyPunctuation:n2,autolink:n3,blockSkip:nK,br:nF,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:nv,delLDelim:nv,delRDelim:nv,emStrongLDelim:nG,emStrongRDelimAst:nQ,emStrongRDelimUnd:nJ,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:n6,nolink:n9,punctuation:nH,reflink:n8,reflinkSearch:ae,tag:n4,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:nv},ar={...ai,link:ny(/^!?\[(label)\]\((.*?)\)/).replace("label",n7).getRegex(),reflink:ny(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",n7).getRegex()},as={...ai,emStrongRDelimAst:nY,emStrongLDelim:nZ,delLDelim:n0,delRDelim:n1,url:ny(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",at).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ny(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",at).getRegex()},ao={...as,br:ny(nF).replace("{2,}","*").getRegex(),text:ny(as.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},an={normal:nL,gfm:nD,pedantic:nB},aa={normal:ai,gfm:as,breaks:ao,pedantic:ar},al={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ac=t=>al[t];function ah(t,i){if(i){if(nk.escapeTest.test(t))return t.replace(nk.escapeReplace,ac)}else if(nk.escapeTestNoEncode.test(t))return t.replace(nk.escapeReplaceNoEncode,ac);return t}function ad(t){try{t=encodeURI(t).replace(nk.percentDecode,"%")}catch{return null}return t}function ap(t,i){let r=t.replace(nk.findPipe,(t,i,r)=>{let s=!1,o=i;for(;--o>=0&&"\\"===r[o];)s=!s;return s?"|":" |"}).split(nk.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),i)if(r.length>i)r.splice(i);else for(;r.length<i;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(nk.slashPipe,"|");return r}function au(t,i,r){let s=t.length;if(0===s)return"";let o=0;for(;o<s;){let n=t.charAt(s-o-1);if(n!==i||r)if(n!==i&&r)o++;else break;else o++}return t.slice(0,s-o)}function ag(t){let i=t.split(`
`),r=i.length-1;for(;r>=0&&nk.blankLine.test(i[r]);)r--;return i.length-r<=2?t:i.slice(0,r+1).join(`
`)}function af(t,i,r,s,o){let n=i.href,a=i.title||null,c=t[1].replace(o.other.outputLinkReplace,"$1");s.state.inLink=!0;let h={type:"!"===t[0].charAt(0)?"image":"link",raw:r,href:n,title:a,text:c,tokens:s.inlineTokens(c)};return s.state.inLink=!1,h}var am=class{options;rules;lexer;constructor(t){this.options=t||n_}space(t){let i=this.rules.block.newline.exec(t);if(i&&i[0].length>0)return{type:"space",raw:i[0]}}code(t){let i=this.rules.block.code.exec(t);if(i){let t=this.options.pedantic?i[0]:ag(i[0]),r=t.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t,codeBlockStyle:"indented",text:r}}}fences(t){let i=this.rules.block.fences.exec(t);if(i){let t=i[0],r=function(t,i,r){let s=t.match(r.other.indentCodeCompensation);if(null===s)return i;let o=s[1];return i.split(`
`).map(t=>{let i=t.match(r.other.beginningSpace);if(null===i)return t;let[s]=i;return s.length>=o.length?t.slice(o.length):t}).join(`
`)}(t,i[3]||"",this.rules);return{type:"code",raw:t,lang:i[2]?i[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):i[2],text:r}}}heading(t){let i=this.rules.block.heading.exec(t);if(i){let t=i[2].trim();if(this.rules.other.endingHash.test(t)){let i=au(t,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(t=i.trim())}return{type:"heading",raw:au(i[0],`
`),depth:i[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(t){let i=this.rules.block.hr.exec(t);if(i)return{type:"hr",raw:au(i[0],`
`)}}blockquote(t){let i=this.rules.block.blockquote.exec(t);if(i){let t=au(i[0],`
`).split(`
`),r="",s="",o=[];for(;t.length>0;){let i=!1,n=[],a;for(a=0;a<t.length;a++)if(this.rules.other.blockquoteStart.test(t[a]))n.push(t[a]),i=!0;else if(i)break;else n.push(t[a]);t=t.slice(a);let c=n.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${c}`:c,s=s?`${s}
${h}`:h;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=p,0===t.length)break;let u=o.at(-1);if(u?.type==="code")break;if(u?.type==="blockquote"){let i=u.raw+`
`+t.join(`
`),n=this.blockquote(i);o[o.length-1]=n,r=r.substring(0,r.length-u.raw.length)+n.raw,s=s.substring(0,s.length-u.text.length)+n.text;break}if(u?.type==="list"){let i=u.raw+`
`+t.join(`
`),n=this.list(i);o[o.length-1]=n,r=r.substring(0,r.length-u.raw.length)+n.raw,s=s.substring(0,s.length-u.raw.length)+n.raw,t=i.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(t){let i=this.rules.block.list.exec(t);if(i){let r=i[1].trim(),s=r.length>1,o={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let n=this.rules.other.listItemRegex(r),a=!1;for(;t;){let r=!1,s="",c="";if(!(i=n.exec(t))||this.rules.block.hr.test(t))break;s=i[0],t=t.substring(s.length);let h=function(t,i=0){let r=i,s="";for(let i of t)if("	"===i){let t=4-r%4;s+=" ".repeat(t),r+=t}else s+=i,r++;return s}(i[2].split(`
`,1)[0],i[1].length),p=t.split(`
`,1)[0],u=!h.trim(),g=0;if(this.options.pedantic?(g=2,c=h.trimStart()):u?g=i[1].length+1:(g=(g=h.search(this.rules.other.nonSpaceChar))>4?1:g,c=h.slice(g),g+=i[1].length),u&&this.rules.other.blankLine.test(p)&&(s+=p+`
`,t=t.substring(p.length+1),r=!0),!r){let i=this.rules.other.nextBulletRegex(g),r=this.rules.other.hrRegex(g),o=this.rules.other.fencesBeginRegex(g),n=this.rules.other.headingBeginRegex(g),a=this.rules.other.htmlBeginRegex(g),f=this.rules.other.blockquoteBeginRegex(g);for(;t;){let m=t.split(`
`,1)[0],b;if(p=m,b=this.options.pedantic?p=p.replace(this.rules.other.listReplaceNesting,"  "):p.replace(this.rules.other.tabCharGlobal,"    "),o.test(p)||n.test(p)||a.test(p)||f.test(p)||i.test(p)||r.test(p))break;if(b.search(this.rules.other.nonSpaceChar)>=g||!p.trim())c+=`
`+b.slice(g);else{if(u||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(h)||n.test(h)||r.test(h))break;c+=`
`+p}u=!p.trim(),s+=m+`
`,t=t.substring(m.length+1),h=b.slice(g)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(s)&&(a=!0)),o.items.push({type:"list_item",raw:s,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),o.raw+=s}let c=o.items.at(-1);if(!c)return;for(let t of(c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd(),o.raw=o.raw.trimEnd(),o.items)){if(this.lexer.state.top=!1,t.tokens=this.lexer.blockTokens(t.text,[]),t.task){if(t.text=t.text.replace(this.rules.other.listReplaceTask,""),t.tokens[0]?.type==="text"||t.tokens[0]?.type==="paragraph"){t.tokens[0].raw=t.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),t.tokens[0].text=t.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let t=this.lexer.inlineQueue.length-1;t>=0;t--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[t].src)){this.lexer.inlineQueue[t].src=this.lexer.inlineQueue[t].src.replace(this.rules.other.listReplaceTask,"");break}}let i=this.rules.other.listTaskCheckbox.exec(t.raw);if(i){let r={type:"checkbox",raw:i[0]+" ",checked:"[ ]"!==i[0]};t.checked=r.checked,o.loose?t.tokens[0]&&["paragraph","text"].includes(t.tokens[0].type)&&"tokens"in t.tokens[0]&&t.tokens[0].tokens?(t.tokens[0].raw=r.raw+t.tokens[0].raw,t.tokens[0].text=r.raw+t.tokens[0].text,t.tokens[0].tokens.unshift(r)):t.tokens.unshift({type:"paragraph",raw:r.raw,text:r.raw,tokens:[r]}):t.tokens.unshift(r)}}if(!o.loose){let i=t.tokens.filter(t=>"space"===t.type);o.loose=i.length>0&&i.some(t=>this.rules.other.anyLine.test(t.raw))}}if(o.loose)for(let t of o.items)for(let i of(t.loose=!0,t.tokens))"text"===i.type&&(i.type="paragraph");return o}}html(t){let i=this.rules.block.html.exec(t);if(i){let t=ag(i[0]);return{type:"html",block:!0,raw:t,pre:"pre"===i[1]||"script"===i[1]||"style"===i[1],text:t}}}def(t){let i=this.rules.block.def.exec(t);if(i){let t=i[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=i[2]?i[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=i[3]?i[3].substring(1,i[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):i[3];return{type:"def",tag:t,raw:au(i[0],`
`),href:r,title:s}}}table(t){let i=this.rules.block.table.exec(t);if(!i||!this.rules.other.tableDelimiter.test(i[2]))return;let r=ap(i[1]),s=i[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=i[3]?.trim()?i[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],n={type:"table",raw:au(i[0],`
`),header:[],align:[],rows:[]};if(r.length===s.length){for(let t of s)this.rules.other.tableAlignRight.test(t)?n.align.push("right"):this.rules.other.tableAlignCenter.test(t)?n.align.push("center"):this.rules.other.tableAlignLeft.test(t)?n.align.push("left"):n.align.push(null);for(let t=0;t<r.length;t++)n.header.push({text:r[t],tokens:this.lexer.inline(r[t]),header:!0,align:n.align[t]});for(let t of o)n.rows.push(ap(t,n.header.length).map((t,i)=>({text:t,tokens:this.lexer.inline(t),header:!1,align:n.align[i]})));return n}}lheading(t){let i=this.rules.block.lheading.exec(t);if(i){let t=i[1].trim();return{type:"heading",raw:au(i[0],`
`),depth:"="===i[2].charAt(0)?1:2,text:t,tokens:this.lexer.inline(t)}}}paragraph(t){let i=this.rules.block.paragraph.exec(t);if(i){let t=i[1].charAt(i[1].length-1)===`
`?i[1].slice(0,-1):i[1];return{type:"paragraph",raw:i[0],text:t,tokens:this.lexer.inline(t)}}}text(t){let i=this.rules.block.text.exec(t);if(i)return{type:"text",raw:i[0],text:i[0],tokens:this.lexer.inline(i[0])}}escape(t){let i=this.rules.inline.escape.exec(t);if(i)return{type:"escape",raw:i[0],text:i[1]}}tag(t){let i=this.rules.inline.tag.exec(t);if(i)return!this.lexer.state.inLink&&this.rules.other.startATag.test(i[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(i[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(i[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(i[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:i[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:i[0]}}link(t){let i=this.rules.inline.link.exec(t);if(i){let t=i[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let i=au(t.slice(0,-1),"\\");if((t.length-i.length)%2==0)return}else{let t=function(t){if(-1===t.indexOf(")"))return -1;let i=0;for(let r=0;r<t.length;r++)if("\\"===t[r])r++;else if("("===t[r])i++;else if(")"===t[r]&&--i<0)return r;return i>0?-2:-1}(i[2]);if(-2===t)return;if(t>-1){let r=(0===i[0].indexOf("!")?5:4)+i[1].length+t;i[2]=i[2].substring(0,t),i[0]=i[0].substring(0,r).trim(),i[3]=""}}let r=i[2],s="";if(this.options.pedantic){let t=this.rules.other.pedanticHrefTitle.exec(r);t&&(r=t[1],s=t[3])}else s=i[3]?i[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(r=this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?r.slice(1):r.slice(1,-1)),af(i,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},i[0],this.lexer,this.rules)}}reflink(t,i){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let t=i[(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!t){let t=r[0].charAt(0);return{type:"text",raw:t,text:t}}return af(r,t,r[0],this.lexer,this.rules)}}emStrong(t,i,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[3])||!r||this.rules.inline.punctuation.exec(r))){let r=[...s[0]].length-1,o,n,a=r,c=0,h="*"===s[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,i=i.slice(-1*t.length+r);null!==(s=h.exec(i));){if(!(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6]))continue;if(n=[...o].length,s[3]||s[4]){a+=n;continue}if((s[5]||s[6])&&r%3&&!((r+n)%3)){c+=n;continue}if((a-=n)>0)continue;n=Math.min(n,n+a+c);let i=[...s[0]][0].length,h=t.slice(0,r+s.index+i+n);if(Math.min(r,n)%2){let t=h.slice(1,-1);return{type:"em",raw:h,text:t,tokens:this.lexer.inlineTokens(t)}}let p=h.slice(2,-2);return{type:"strong",raw:h,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(t){let i=this.rules.inline.code.exec(t);if(i){let t=i[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(t),s=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return r&&s&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:i[0],text:t}}}br(t){let i=this.rules.inline.br.exec(t);if(i)return{type:"br",raw:i[0]}}del(t,i,r=""){let s=this.rules.inline.delLDelim.exec(t);if(s&&(!s[1]||!r||this.rules.inline.punctuation.exec(r))){let r=[...s[0]].length-1,o,n,a=r,c=this.rules.inline.delRDelim;for(c.lastIndex=0,i=i.slice(-1*t.length+r);null!==(s=c.exec(i));){if(!(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6])||(n=[...o].length)!==r)continue;if(s[3]||s[4]){a+=n;continue}if((a-=n)>0)continue;n=Math.min(n,n+a);let i=[...s[0]][0].length,c=t.slice(0,r+s.index+i+n),h=c.slice(r,-r);return{type:"del",raw:c,text:h,tokens:this.lexer.inlineTokens(h)}}}}autolink(t){let i=this.rules.inline.autolink.exec(t);if(i){let t,r;return r="@"===i[2]?"mailto:"+(t=i[1]):t=i[1],{type:"link",raw:i[0],text:t,href:r,tokens:[{type:"text",raw:t,text:t}]}}}url(t){let i;if(i=this.rules.inline.url.exec(t)){let t,r;if("@"===i[2])r="mailto:"+(t=i[0]);else{let s;do s=i[0],i[0]=this.rules.inline._backpedal.exec(i[0])?.[0]??"";while(s!==i[0])t=i[0],r="www."===i[1]?"http://"+i[0]:i[0]}return{type:"link",raw:i[0],text:t,href:r,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(t){let i=this.rules.inline.text.exec(t);if(i){let t=this.lexer.state.inRawBlock;return{type:"text",raw:i[0],text:i[0],escaped:t}}}},ab=class l{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||n_,this.options.tokenizer=this.options.tokenizer||new am,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let i={other:nk,block:an.normal,inline:aa.normal};this.options.pedantic?(i.block=an.pedantic,i.inline=aa.pedantic):this.options.gfm&&(i.block=an.gfm,this.options.breaks?i.inline=aa.breaks:i.inline=aa.gfm),this.tokenizer.rules=i}static get rules(){return{block:an,inline:aa}}static lex(t,i){return new l(i).lex(t)}static lexInline(t,i){return new l(i).inlineTokens(t)}lex(t){t=t.replace(nk.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let i=this.inlineQueue[t];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,i=[],r=!1){this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(nk.tabCharGlobal,"    ").replace(nk.spaceLine,""));let s=1/0;for(;t;){let o;if(t.length<s)s=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}if(this.options.extensions?.block?.some(r=>!!(o=r.call({lexer:this},t,i))&&(t=t.substring(o.raw.length),i.push(o),!0)))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let r=i.at(-1);1===o.raw.length&&void 0!==r?r.raw+=`
`:i.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let r=i.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+o.raw,r.text+=`
`+o.text,this.inlineQueue.at(-1).src=r.text):i.push(o);continue}if((o=this.tokenizer.fences(t))||(o=this.tokenizer.heading(t))||(o=this.tokenizer.hr(t))||(o=this.tokenizer.blockquote(t))||(o=this.tokenizer.list(t))||(o=this.tokenizer.html(t))){t=t.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let r=i.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+o.raw,r.text+=`
`+o.raw,this.inlineQueue.at(-1).src=r.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},i.push(o));continue}if((o=this.tokenizer.table(t))||(o=this.tokenizer.lheading(t))){t=t.substring(o.raw.length),i.push(o);continue}let n=t;if(this.options.extensions?.startBlock){let i=1/0,r=t.slice(1),s;this.options.extensions.startBlock.forEach(t=>{"number"==typeof(s=t.call({lexer:this},r))&&s>=0&&(i=Math.min(i,s))}),i<1/0&&i>=0&&(n=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(n))){let s=i.at(-1);r&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):i.push(o),r=n.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let r=i.at(-1);r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):i.push(o);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return this.state.top=!0,i}inline(t,i=[]){return this.inlineQueue.push({src:t,tokens:i}),i}inlineTokens(t,i=[]){let r;this.tokenizer.lexer=this;let s=t,o=null;if(this.tokens.links){let t=Object.keys(this.tokens.links);if(t.length>0)for(;null!==(o=this.tokenizer.rules.inline.reflinkSearch.exec(s));)t.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!==(o=this.tokenizer.rules.inline.anyPunctuation.exec(s));)s=s.slice(0,o.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!==(o=this.tokenizer.rules.inline.blockSkip.exec(s));)r=o[2]?o[2].length:0,s=s.slice(0,o.index+r)+"["+"a".repeat(o[0].length-r-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let n=!1,a="",c=1/0;for(;t;){let r;if(t.length<c)c=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}if(n||(a=""),n=!1,this.options.extensions?.inline?.some(s=>!!(r=s.call({lexer:this},t,i))&&(t=t.substring(r.raw.length),i.push(r),!0)))continue;if((r=this.tokenizer.escape(t))||(r=this.tokenizer.tag(t))||(r=this.tokenizer.link(t))){t=t.substring(r.raw.length),i.push(r);continue}if(r=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(r.raw.length);let s=i.at(-1);"text"===r.type&&s?.type==="text"?(s.raw+=r.raw,s.text+=r.text):i.push(r);continue}if((r=this.tokenizer.emStrong(t,s,a))||(r=this.tokenizer.codespan(t))||(r=this.tokenizer.br(t))||(r=this.tokenizer.del(t,s,a))||(r=this.tokenizer.autolink(t))||!this.state.inLink&&(r=this.tokenizer.url(t))){t=t.substring(r.raw.length),i.push(r);continue}let o=t;if(this.options.extensions?.startInline){let i=1/0,r=t.slice(1),s;this.options.extensions.startInline.forEach(t=>{"number"==typeof(s=t.call({lexer:this},r))&&s>=0&&(i=Math.min(i,s))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(r=this.tokenizer.inlineText(o)){t=t.substring(r.raw.length),"_"!==r.raw.slice(-1)&&(a=r.raw.slice(-1)),n=!0;let s=i.at(-1);s?.type==="text"?(s.raw+=r.raw,s.text+=r.text):i.push(r);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return i}infiniteLoopError(t){if(this.options.silent);else throw Error("Infinite loop on byte: "+t)}},a_=class{options;parser;constructor(t){this.options=t||n_}space(t){return""}code({text:t,lang:i,escaped:r}){let s=(i||"").match(nk.notSpaceStart)?.[0],o=t.replace(nk.endingNewline,"")+`
`;return s?'<pre><code class="language-'+ah(s)+'">'+(r?o:ah(o,!0))+`</code></pre>
`:"<pre><code>"+(r?o:ah(o,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:i}){return`<h${i}>${this.parser.parseInline(t)}</h${i}>
`}hr(t){return`<hr>
`}list(t){let i=t.ordered,r=t.start,s="";for(let i=0;i<t.items.length;i++){let r=t.items[i];s+=this.listitem(r)}let o=i?"ol":"ul";return"<"+o+(i&&1!==r?' start="'+r+'"':"")+`>
`+s+"</"+o+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let i="",r="";for(let i=0;i<t.header.length;i++)r+=this.tablecell(t.header[i]);i+=this.tablerow({text:r});let s="";for(let i=0;i<t.rows.length;i++){let o=t.rows[i];r="";for(let t=0;t<o.length;t++)r+=this.tablecell(o[t]);s+=this.tablerow({text:r})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+i+`</thead>
`+s+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let i=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+i+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ah(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:i,tokens:r}){let s=this.parser.parseInline(r),o=ad(t);if(null===o)return s;let n='<a href="'+(t=o)+'"';return i&&(n+=' title="'+ah(i)+'"'),n+=">"+s+"</a>"}image({href:t,title:i,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let o=ad(t);if(null===o)return ah(r);t=o;let n=`<img src="${t}" alt="${ah(r)}"`;return i&&(n+=` title="${ah(i)}"`),n+=">"}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ah(t.text)}},av=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},ay=class l{options;renderer;textRenderer;constructor(t){this.options=t||n_,this.options.renderer=this.options.renderer||new a_,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new av}static parse(t,i){return new l(i).parse(t)}static parseInline(t,i){return new l(i).parseInline(t)}parse(t){this.renderer.parser=this;let i="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let t=this.options.extensions.renderers[s.type].call({parser:this},s);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){i+=t||"";continue}}switch(s.type){case"space":i+=this.renderer.space(s);break;case"hr":i+=this.renderer.hr(s);break;case"heading":i+=this.renderer.heading(s);break;case"code":i+=this.renderer.code(s);break;case"table":i+=this.renderer.table(s);break;case"blockquote":i+=this.renderer.blockquote(s);break;case"list":i+=this.renderer.list(s);break;case"checkbox":i+=this.renderer.checkbox(s);break;case"html":i+=this.renderer.html(s);break;case"def":i+=this.renderer.def(s);break;case"paragraph":i+=this.renderer.paragraph(s);break;case"text":i+=this.renderer.text(s);break;default:{let t='Token with "'+s.type+'" type was not found.';if(this.options.silent)return"";throw Error(t)}}}return i}parseInline(t,i=this.renderer){this.renderer.parser=this;let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let t=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==t||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=t||"";continue}}switch(o.type){case"escape":case"text":r+=i.text(o);break;case"html":r+=i.html(o);break;case"link":r+=i.link(o);break;case"image":r+=i.image(o);break;case"checkbox":r+=i.checkbox(o);break;case"strong":r+=i.strong(o);break;case"em":r+=i.em(o);break;case"codespan":r+=i.codespan(o);break;case"br":r+=i.br(o);break;case"del":r+=i.del(o);break;default:{let t='Token with "'+o.type+'" type was not found.';if(this.options.silent)return"";throw Error(t)}}}return r}},aw=class{options;block;constructor(t){this.options=t||n_}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(t=this.block){return t?ab.lex:ab.lexInline}provideParser(t=this.block){return t?ay.parse:ay.parseInline}},ak=class{defaults=nb();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=ay;Renderer=a_;TextRenderer=av;Lexer=ab;Tokenizer=am;Hooks=aw;constructor(...t){this.use(...t)}walkTokens(t,i){let r=[];for(let s of t)switch(r=r.concat(i.call(this,s)),s.type){case"table":for(let t of s.header)r=r.concat(this.walkTokens(t.tokens,i));for(let t of s.rows)for(let s of t)r=r.concat(this.walkTokens(s.tokens,i));break;case"list":r=r.concat(this.walkTokens(s.items,i));break;default:{let t=s;this.defaults.extensions?.childTokens?.[t.type]?this.defaults.extensions.childTokens[t.type].forEach(s=>{let o=t[s].flat(1/0);r=r.concat(this.walkTokens(o,i))}):t.tokens&&(r=r.concat(this.walkTokens(t.tokens,i)))}}return r}use(...t){let i=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(t=>{let r={...t};if(r.async=this.defaults.async||r.async||!1,t.extensions&&(t.extensions.forEach(t=>{if(!t.name)throw Error("extension name required");if("renderer"in t){let r=i.renderers[t.name];r?i.renderers[t.name]=function(...i){let s=t.renderer.apply(this,i);return!1===s&&(s=r.apply(this,i)),s}:i.renderers[t.name]=t.renderer}if("tokenizer"in t){if(!t.level||"block"!==t.level&&"inline"!==t.level)throw Error("extension level must be 'block' or 'inline'");let r=i[t.level];r?r.unshift(t.tokenizer):i[t.level]=[t.tokenizer],t.start&&("block"===t.level?i.startBlock?i.startBlock.push(t.start):i.startBlock=[t.start]:"inline"===t.level&&(i.startInline?i.startInline.push(t.start):i.startInline=[t.start]))}"childTokens"in t&&t.childTokens&&(i.childTokens[t.name]=t.childTokens)}),r.extensions=i),t.renderer){let i=this.defaults.renderer||new a_(this.defaults);for(let r in t.renderer){if(!(r in i))throw Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let s=t.renderer[r],o=i[r];i[r]=(...t)=>{let r=s.apply(i,t);return!1===r&&(r=o.apply(i,t)),r||""}}r.renderer=i}if(t.tokenizer){let i=this.defaults.tokenizer||new am(this.defaults);for(let r in t.tokenizer){if(!(r in i))throw Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let s=t.tokenizer[r],o=i[r];i[r]=(...t)=>{let r=s.apply(i,t);return!1===r&&(r=o.apply(i,t)),r}}r.tokenizer=i}if(t.hooks){let i=this.defaults.hooks||new aw;for(let r in t.hooks){if(!(r in i))throw Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let s=t.hooks[r],o=i[r];aw.passThroughHooks.has(r)?i[r]=t=>{if(this.defaults.async&&aw.passThroughHooksRespectAsync.has(r))return(async()=>{let r=await s.call(i,t);return o.call(i,r)})();let n=s.call(i,t);return o.call(i,n)}:i[r]=(...t)=>{if(this.defaults.async)return(async()=>{let r=await s.apply(i,t);return!1===r&&(r=await o.apply(i,t)),r})();let r=s.apply(i,t);return!1===r&&(r=o.apply(i,t)),r}}r.hooks=i}if(t.walkTokens){let i=this.defaults.walkTokens,s=t.walkTokens;r.walkTokens=function(t){let r=[];return r.push(s.call(this,t)),i&&(r=r.concat(i.call(this,t))),r}}this.defaults={...this.defaults,...r}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,i){return ab.lex(t,i??this.defaults)}parser(t,i){return ay.parse(t,i??this.defaults)}parseMarkdown(t){return(i,r)=>{let s={...r},o={...this.defaults,...s},n=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===s.async)return n(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof i>"u"||null===i)return n(Error("marked(): input parameter is undefined or null"));if("string"!=typeof i)return n(Error("marked(): input parameter is of type "+Object.prototype.toString.call(i)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=t),o.async)return(async()=>{let r=o.hooks?await o.hooks.preprocess(i):i,s=await (o.hooks?await o.hooks.provideLexer(t):t?ab.lex:ab.lexInline)(r,o),n=o.hooks?await o.hooks.processAllTokens(s):s;o.walkTokens&&await Promise.all(this.walkTokens(n,o.walkTokens));let a=await (o.hooks?await o.hooks.provideParser(t):t?ay.parse:ay.parseInline)(n,o);return o.hooks?await o.hooks.postprocess(a):a})().catch(n);try{o.hooks&&(i=o.hooks.preprocess(i));let r=(o.hooks?o.hooks.provideLexer(t):t?ab.lex:ab.lexInline)(i,o);o.hooks&&(r=o.hooks.processAllTokens(r)),o.walkTokens&&this.walkTokens(r,o.walkTokens);let s=(o.hooks?o.hooks.provideParser(t):t?ay.parse:ay.parseInline)(r,o);return o.hooks&&(s=o.hooks.postprocess(s)),s}catch(t){return n(t)}}}onError(t,i){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let t="<p>An error occurred:</p><pre>"+ah(r.message+"",!0)+"</pre>";return i?Promise.resolve(t):t}if(i)return Promise.reject(r);throw r}}},ax=new ak;function aC(t,i){return ax.parse(t,i)}aC.options=aC.setOptions=function(t){return ax.setOptions(t),aC.defaults=ax.defaults,n_=aC.defaults,aC},aC.getDefaults=nb,aC.defaults=n_,aC.use=function(...t){return ax.use(...t),aC.defaults=ax.defaults,n_=aC.defaults,aC},aC.walkTokens=function(t,i){return ax.walkTokens(t,i)},aC.parseInline=ax.parseInline,aC.Parser=ay,aC.parser=ay.parse,aC.Renderer=a_,aC.TextRenderer=av,aC.Lexer=ab,aC.lexer=ab.lex,aC.Tokenizer=am,aC.Hooks=aw,aC.parse=aC,aC.options,aC.setOptions,aC.use,aC.walkTokens,aC.parseInline,ay.parse,ab.lex,tL`
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
`;let a$=tL`
	hr {
		border: none;
		border-top: 1px solid var(--color-foreground--25);
	}
`;var aE=Object.defineProperty,aS=Object.getOwnPropertyDescriptor,aA=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aS(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aE(i,r,n),n};let az=class extends lit_element_i{constructor(){super(...arguments),this.markdown="",this.density="compact",this.inline=!1}render(){return to`${this.markdown?nm(this.renderMarkdown(this.markdown),"Loading..."):""}`}async renderMarkdown(t){let i,r,s,o;return this.inline?(h??=new ak({breaks:!1,gfm:!0,renderer:(r=0,s=!1,{blockquote:function({tokens:t}){return this.parser.parse(t)},code:function({text:t}){return`<code>${aP(t)}</code>`},codespan:function({text:t}){return`<code>${aP(t)}</code>`},heading:function({tokens:t}){return this.parser.parseInline(t)},hr:function(){return""},image:function({text:t}){return t||""},link:function({tokens:t}){return this.parser.parseInline(t)},list:function(t){s=t.ordered,r="number"==typeof t.start?t.start:1;let i="";for(let r of t.items)i+=o.call(this,r);return i},listitem:o=function(t){let i,o=this.parser.parse(t.tokens);return t.task?i=t.checked?"☑":"☐":s?(i=`${r}.`,r++):i="•",`${i} ${o.trim()} `},paragraph:function({tokens:t}){return this.parser.parseInline(t)},table:function(){return""},br:function(){return" "},html:function(){return""}})}),i=aF(i=await h.parse(aB(t))),to`<span>${rj(i)}</span>`):(p??=new ak({breaks:!0,gfm:!0,renderer:{image:function({href:t,title:i,text:r}){let s=[],o=[];return t&&({href:t,dimensions:s}=function(t){let i=[],r=t.split("|").map(t=>t.trim());t=r[0];let s=r[1];if(s){let t=/height=(\d+)/.exec(s),r=/width=(\d+)/.exec(s),o=t?t[1]:"",n=r?r[1]:"",a=isFinite(parseInt(n)),c=isFinite(parseInt(o));a&&i.push(`width="${n}"`),c&&i.push(`height="${o}"`)}return{href:t,dimensions:i}}(t),o.push(`src="${aU(t)}"`)),r&&o.push(`alt="${aU(r)}"`),i&&o.push(`title="${aU(i)}"`),s.length&&(o=[...o,...s]),`<img ${o.join(" ")}>`},codespan:function({text:t}){return`<code>${aP(t)}</code>`},paragraph:function({tokens:t}){let i=this.parser.parseInline(t);return`<p>${i}</p>`},html:function({text:t}){return t.match(/^(<span[^>]+>)|(<\/\s*span>)$/)?t:""}}}),rj(i=aF(i=await p.parse(aB(t)))))}};az.styles=[a$,tL`
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
=		`],aA([t1({type:String})],az.prototype,"markdown",2),aA([t1({type:String,reflect:!0})],az.prototype,"density",2),aA([t1({type:Boolean,reflect:!0})],az.prototype,"inline",2),az=aA([tJ("gl-markdown")],az);let aI={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},aT=t=>aI[t];function aP(t,i){if(i){if(/[&<>"']/.test(t))return t.replace(/[&<>"']/g,aT)}else if(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/.test(t))return t.replace(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,aT);return t}let aj="[A-Za-z0-9-]+",aR="~[A-Za-z]+",aM=RegExp(`^(${aj})(${aR})?$`),aL=RegExp(`\\$\\(${aj}(?:${aR})?\\)`,"g"),aO=RegExp(`\\\\${aL.source}`,"g"),aD=RegExp(`(\\\\)?\\$\\((${aj}(?:${aR})?)\\)`,"g");function aB(t){return t.replace(aO,t=>`\\${t}`)}function aF(t){let i,r,s=[],o=0;for(;null!==(i=aD.exec(t));){o<(r=i.index||0)&&s.push(t.substring(o,r)),o=(i.index||0)+i[0].length;let[,n,a]=i;s.push(n?`$(${a})`:function(t){let[,i,r]=aM.exec(t.id)??[void 0,"error",void 0];return i.startsWith("gitlens-")&&(i=`gl-${i.substring(8)}`),`<code-icon icon="${i}"${r?` modifier="${r}"`:""}></code-icon>`}({id:a}))}return o<t.length&&s.push(t.substring(o)),s.join("")}let aN=/"/g;function aU(t){return t.replace(aN,"&quot;")}tL`
		:host {
			display: block;
			height: 100%;
		}
	`;let aq=[rH,tL`
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
	`];var aH=Object.defineProperty,aV=Object.getOwnPropertyDescriptor,aK=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aV(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aH(i,r,n),n};let aW=class extends lit_element_i{firstUpdated(){this.role="navigation"}disconnectedCallback(){this._slotSubscriptionsDisposer?.(),super.disconnectedCallback?.()}render(){return to`<slot @slotchange=${this.handleSlotChange}></slot>`}handleSlotChange(t){if(this._slotSubscriptionsDisposer?.(),this.actionNodes.length<1)return;let i=this.handleKeydown.bind(this),r=`${this.actionNodes.length}`,s=this.actionNodes.map((t,s)=>(t.setAttribute("aria-posinset",`${s+1}`),t.setAttribute("aria-setsize",r),t.setAttribute("tabindex",0===s?"0":"-1"),this.actionNodes.length>=2&&t.addEventListener("keydown",i,!1),{dispose:()=>{t?.removeEventListener("keydown",i,!1)}}));this._slotSubscriptionsDisposer=()=>{s?.forEach(({dispose:t})=>t())}}handleKeydown(t){if(!t.target||null==this.actionNodes)return;let i=t.target,r=parseInt(i.getAttribute("aria-posinset")??"0",10);if("ArrowLeft"!==t.key&&"ArrowRight"!==t.key||this.actionNodes.length<2)return;let s=null;if("ArrowLeft"===t.key){let t=1===r?this.actionNodes.length-1:r-2;s=this.actionNodes[t]}else if("ArrowRight"===t.key){let t=r===this.actionNodes.length?0:r;s=this.actionNodes[t]}null!=s&&s!==i&&(t.preventDefault(),t.stopPropagation(),i.setAttribute("tabindex","-1"),s.setAttribute("tabindex","0"),s.focus())}};aW.styles=tL`
		:host {
			display: flex;
			align-items: center;
			user-select: none;
		}
	`,aK([(g={flatten:!0},(t,i)=>{let{slot:r,selector:s}=g??{},o="slot"+(r?`[name=${r}]`:":not([name])");return t3(t,i,{get(){let t=this.renderRoot?.querySelector(o),i=t?.assignedElements(g)??[];return void 0===s?i:i.filter(t=>t.matches(s))}})})],aW.prototype,"actionNodes",2),aW=aK([tJ("action-nav")],aW);var aG=Object.defineProperty,aZ=Object.getOwnPropertyDescriptor,aX=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aZ(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aG(i,r,n),n};let aQ=class extends GlElement{constructor(){super(...arguments),this.branch=!1,this.expanded=!0,this.path="",this.level=0,this.size=1,this.position=1,this.checkable=!1,this.checked=!1,this.disableCheck=!1,this.showIcon=!0,this.rich=!1,this.matched=!1,this.tabIndex=-1,this.selected=!1,this.focused=!1,this.focusedInactive=!1,this.onComponentClick=t=>{this.selectCore({dblClick:!1,altKey:t.altKey})}}get isHidden(){return!1===this.parentExpanded||!this.branch&&!this.expanded}connectedCallback(){super.connectedCallback?.(),this.addEventListener("click",this.onComponentClick)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("click",this.onComponentClick)}updateAttrs(t,i=!1){(t.has("expanded")||t.has("branch")||i)&&(this.branch?this.setAttribute("aria-expanded",this.expanded.toString()):this.removeAttribute("aria-expanded")),(t.has("parentExpanded")||i)&&this.setAttribute("aria-hidden",this.isHidden.toString()),(t.has("selected")||i)&&this.setAttribute("aria-selected",this.selected.toString()),(t.has("size")||i)&&this.setAttribute("aria-setsize",this.size.toString()),(t.has("position")||i)&&this.setAttribute("aria-posinset",this.position.toString()),(t.has("level")||i)&&this.setAttribute("aria-level",this.level.toString())}firstUpdated(){this.role="treeitem"}updated(t){this.updateAttrs(t)}renderBranching(){let t=this.level-1;if(t<1&&!this.branch)return tl;let i=[];if(t>0)for(let r=0;r<t;r++)i.push(to`<span class="node node--connector"><code-icon name="blank"></code-icon></span>`);return this.branch&&i.push(to`<code-icon class="branch" icon="${this.expanded?"chevron-down":"chevron-right"}"></code-icon>`),i}renderCheckbox(){if(!this.checkable)return tl;let t=to`<span
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
		></span>`;return this.checkableTooltip?to`<gl-tooltip placement="right"
					>${t}<span slot="content">${this.checkableTooltip}</span></gl-tooltip
				>`:t}renderActions(){return to`<action-nav class="actions" part="actions"><slot name="actions"></slot></action-nav>`}renderBefore(){return to`<slot name="decorations-before" class="decorations-before"></slot>`}renderAfter(){return to`<slot name="decorations-after" class="decorations-after"></slot>`}render(){return to`
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
				${rz(this.showIcon,()=>to`<slot name="icon" class="icon"></slot>`)}
				<span class="text" part="text">
					<slot class="main" part="main"></slot>
					<slot name="description" class="description"></slot>
				</span>
			</button>
			${this.renderBefore()}${this.renderActions()}${this.renderAfter()}
		`}selectCore(t,i=!1){this.emit("gl-tree-item-select"),this.selected=!0,i||window.requestAnimationFrame(()=>{this.emit("gl-tree-item-selected",{node:this,dblClick:t?.dblClick??!1,altKey:t?.altKey??!1,ctrlKey:t?.ctrlKey??!1,metaKey:t?.metaKey??!1})})}select(){this.selectCore(void 0,!0)}deselect(){this.selected=!1}focus(){this.buttonEl.focus()}onButtonClick(t){t.stopPropagation(),this.selectCore({dblClick:!1,altKey:t.altKey})}onButtonDblClick(t){t.stopPropagation(),this.selectCore({dblClick:!0,altKey:t.altKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey})}onButtonContextMenu(t){t.preventDefault(),t.stopPropagation();let i=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:t.clientX,clientY:t.clientY,button:t.button,buttons:t.buttons,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,altKey:t.altKey,metaKey:t.metaKey});this.dispatchEvent(i)}onCheckboxClick(t){t.stopPropagation()}onCheckboxChange(t){t.preventDefault(),t.stopPropagation();let i=t.target.checked;this.checked=i,this.emit("gl-tree-item-checked",{node:this,checked:i})}onCheckboxMouseEnter(){this.emit("gl-tree-item-suspend-tooltip")}onCheckboxMouseLeave(){this.emit("gl-tree-item-resume-tooltip")}};aQ.styles=aq,aX([t1({type:Boolean})],aQ.prototype,"branch",2),aX([t1({type:Boolean})],aQ.prototype,"expanded",2),aX([t1({type:String})],aQ.prototype,"path",2),aX([t1({type:String,attribute:"parent-path"})],aQ.prototype,"parentPath",2),aX([t1({type:Boolean,attribute:"parent-expanded"})],aQ.prototype,"parentExpanded",2),aX([t1({type:Number})],aQ.prototype,"level",2),aX([t1({type:Number})],aQ.prototype,"size",2),aX([t1({type:Number})],aQ.prototype,"position",2),aX([t1({type:Boolean})],aQ.prototype,"checkable",2),aX([t1()],aQ.prototype,"checked",2),aX([t1({type:Boolean,reflect:!0,attribute:"disable-check"})],aQ.prototype,"disableCheck",2),aX([t1({attribute:"checkable-tooltip"})],aQ.prototype,"checkableTooltip",2),aX([t1({type:Boolean})],aQ.prototype,"showIcon",2),aX([t1({type:Boolean,reflect:!0})],aQ.prototype,"rich",2),aX([t1({type:Boolean,reflect:!0})],aQ.prototype,"matched",2),aX([t1({type:Number})],aQ.prototype,"tabIndex",2),aX([t1({type:String,attribute:"vscode-context"})],aQ.prototype,"vscodeContext",2),aX([t2()],aQ.prototype,"selected",2),aX([t1({type:Boolean,reflect:!0})],aQ.prototype,"focused",2),aX([t1({type:Boolean,reflect:!0,attribute:"focused-inactive"})],aQ.prototype,"focusedInactive",2),aX([t5("#button")],aQ.prototype,"buttonEl",2),aQ=aX([tJ("gl-tree-item")],aQ);var aY=Object.defineProperty,aJ=Object.getOwnPropertyDescriptor,a0=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aJ(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aY(i,r,n),n};let a1=/^[a-zA-Z0-9\s\-_.]$/,a2=class extends GlElement{constructor(){super(...arguments),this.treeItems=void 0,this.filtered=!1,this.filterable=!1,this.filterPlaceholder="Filter...",this.filterMode="filter",this.emptyText="No items",this.tooltipAnchorRight=!1,this._filterText="",this._filterLower="",this._filterTerms=[],this.ariaLabel="Tree",this._focusedItemIndex=-1,this.virtualizerRef=rD(),this.scrollableRef=rD(),this._containerHasFocus=!1,this._filterHasFocus=!1,this._actionButtonHasFocus=!1,this._scrolling=!1,this._hoverOpen=!1,this._typeAheadBuffer="",this._typeAheadTimeout=800,this._nodeMap=new Map,this._pathToIndexMap=new Map,this.dismissRowTooltip=()=>{clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},this.handleContainerFocus=()=>{this._containerHasFocus=!0,this._focusedItemPath||(this._lastSelectedPath?(this._focusedItemPath=this._lastSelectedPath,this._focusedItemIndex=this.getItemIndex(this._lastSelectedPath)):this.treeItems?.length&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0),this.requestUpdate())},this.handleContainerBlur=()=>{this._containerHasFocus=!1},this.handleFocusIn=t=>{let i=t.target;("ACTION-ITEM"===i.tagName?i:i.closest("action-item"))&&(this._actionButtonHasFocus=!0)},this.handleFocusOut=t=>{let i=t.target,r=t.relatedTarget,s="ACTION-ITEM"===i.tagName?i:i.closest("action-item"),o=r?.tagName==="ACTION-ITEM"?r:r?.closest("action-item");s&&!o&&(this._actionButtonHasFocus=!1)},this.handleContextMenu=t=>{let i=t.composedPath().find(t=>"GL-TREE-ITEM"===t.tagName);if(!i)return;let r=i.vscodeContext;if(!r)return;t.preventDefault(),t.stopPropagation(),this.dataset.vscodeContext=r;let s=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:t.clientX,clientY:t.clientY,button:t.button,buttons:t.buttons,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,altKey:t.altKey,metaKey:t.metaKey});this.dispatchEvent(s),setTimeout(()=>{delete this.dataset.vscodeContext},100)},this.handleKeydown=t=>{if("Tab"===t.key&&t.composedPath().find(t=>"ACTION-ITEM"===t.tagName))if(t.shiftKey){t.preventDefault();let i=this.scrollableRef.value;i&&i.focus()}else{t.preventDefault();let i=document.activeElement;setTimeout(()=>{i&&"function"==typeof i.blur&&i.blur()},0)}},this.handleContainerKeydown=t=>{if(!this.treeItems?.length||this._actionButtonHasFocus)return;if("Tab"===t.key&&!t.shiftKey){if(this._focusedItemPath){let i=this.virtualizerRef.value;if(i){let r=[...i.querySelectorAll("gl-tree-item")].find(t=>t.id===`tree-item-${this._focusedItemPath}`);if(r){let i=r.querySelector("action-item");i&&(t.preventDefault(),t.stopPropagation(),i.focus())}}}return}let i=this.getCurrentFocusedIndex(),r=i,s=!1;switch(t.key){case"Enter":case" ":t.preventDefault(),t.stopPropagation(),this.handleItemActivation(this.treeItems[i]);return;case"ArrowDown":r=Math.min(i+1,this.treeItems.length-1),s=!0;break;case"ArrowUp":if(i<=0&&this.filterable){let i=this.renderRoot.querySelector(".filter-input");if(null!=i){t.preventDefault(),t.stopPropagation(),i.focus(),i.select();return}}r=Math.max(i-1,0),s=!0;break;case"Home":r=0,s=!0;break;case"End":r=this.treeItems.length-1,s=!0;break;case"ArrowLeft":case"ArrowRight":if(this.handleBranchToggle(t,this.treeItems[i]))return;if("ArrowRight"===t.key)r=Math.min(i+1,this.treeItems.length-1);else{let t=this.treeItems[i];if(t.parentPath){let s=this.getItemIndex(t.parentPath);r=-1!==s?s:Math.max(i-1,0)}else r=Math.max(i-1,0)}s=!0;break;default:if(this.isPrintableCharacter(t.key)){t.preventDefault(),t.stopPropagation(),this.handleTypeAhead(t.key);return}}s&&(t.preventDefault(),t.stopPropagation(),this.focusItemAtIndex(r))},this.handleFilterInput=t=>{this._filterText=t.target.value,this.dispatchEvent(new CustomEvent("gl-tree-filter-changed",{detail:this._filterText,bubbles:!0,composed:!0})),clearTimeout(this._filterDebounceTimer),this._filterDebounceTimer=setTimeout(()=>this.applyFilterToModel(),150)},this.handleFilterFocus=()=>{this._filterHasFocus=!0,!this._focusedItemPath&&this.treeItems?.length&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0)},this.handleFilterBlur=()=>{this._filterHasFocus=!1},this.handleFilterKeydown=t=>{if(!this.treeItems?.length)return;let i=this.getCurrentFocusedIndex(),r=i,s=!1;switch(t.key){case"ArrowDown":r=i<0?0:Math.min(i+1,this.treeItems.length-1),s=!0;break;case"ArrowUp":r=i<=0?0:i-1,s=!0;break;case"Home":r=0,s=!0;break;case"End":r=this.treeItems.length-1,s=!0;break;case"Enter":{t.preventDefault(),t.stopPropagation();let r=this.treeItems[i]??this.treeItems[0];this.handleItemActivation(r);return}}s&&(t.preventDefault(),t.stopPropagation(),this.setActiveDescendant(r))},this.toggleFilterMode=()=>{this.filterMode="filter"===this.filterMode?"highlight":"filter",this.dispatchEvent(new CustomEvent("gl-tree-filter-mode-changed",{detail:this.filterMode,bubbles:!0,composed:!0})),this.filtered&&this.rebuildFlattenedTree()}}get filterText(){return this._filterText}set filterText(t){let i=this._filterText;i!==t&&(this._filterText=t,clearTimeout(this._filterDebounceTimer),this.applyFilterToModel(),this.requestUpdate("filterText",i))}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.handleKeydown,{capture:!0}),this.addEventListener("focusin",this.handleFocusIn,{capture:!0}),this.addEventListener("focusout",this.handleFocusOut,{capture:!0}),this.addEventListener("mousedown",this.dismissRowTooltip,{capture:!0}),this.addEventListener("contextmenu",this.handleContextMenu)}focus(t){if(this.filterable){let i=this.renderRoot.querySelector(".filter-input");if(null!=i)return void i.focus(t)}this.scrollableRef.value?.focus(t)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("keydown",this.handleKeydown,{capture:!0}),this.removeEventListener("focusin",this.handleFocusIn,{capture:!0}),this.removeEventListener("focusout",this.handleFocusOut,{capture:!0}),this.removeEventListener("mousedown",this.dismissRowTooltip,{capture:!0}),this.removeEventListener("contextmenu",this.handleContextMenu),this._typeAheadTimer&&(clearTimeout(this._typeAheadTimer),this._typeAheadTimer=void 0),clearTimeout(this._filterDebounceTimer),this._typeAheadBuffer=""}set model(t){let i;if(this._model!==t){if(this._model=t,this._filterTerms.length>0&&null!=this._model&&a5(this._model,this._filterTerms),this._nodeMap.clear(),null!=this._model){let t=this._model.length,r=this.filtered&&"filter"===this.filterMode;i=[];for(let s=0;s<t;s++)a3(this._model[s],t,s+1,void 0,this._nodeMap,r,i)}if(this.treeItems=i,this.buildPathToIndexMap(),this.focusedPath&&(this._focusedItemPath=this.focusedPath,this._lastSelectedPath=this.focusedPath),this._focusedItemPath){let t=this._pathToIndexMap.get(this._focusedItemPath);if(null!=t)this._focusedItemIndex=t;else{if(this.treeItems?.length){let t=Math.min(this._focusedItemIndex,this.treeItems.length-1);this._focusedItemPath=this.treeItems[Math.max(0,t)].path,this._focusedItemIndex=Math.max(0,t)}else this._focusedItemPath=void 0,this._focusedItemIndex=-1;this._lastSelectedPath&&!this._pathToIndexMap.has(this._lastSelectedPath)&&(this._lastSelectedPath=this._focusedItemPath)}}else this.treeItems?.length&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0)}}get model(){return this._model}willUpdate(t){if((t.has("filtered")||t.has("filterMode"))&&null!=this._model&&this.rebuildFlattenedTree(),this.focusedPath&&(t.has("focusedPath")||t.has("model"))){let t=this._pathToIndexMap.get(this.focusedPath);null!=t&&(this._focusedItemPath=this.focusedPath,this._focusedItemIndex=t,this._lastSelectedPath=this.focusedPath,this._pendingScrollToIndex=t)}else t.has("model")&&!this.focusedPath&&(this._lastSelectedPath=void 0,this.treeItems?.length?(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0):(this._focusedItemPath=void 0,this._focusedItemIndex=-1),this._pendingScrollToIndex=0)}updated(t){if(super.updated?.(t),null!=this._pendingScrollToIndex){let t=this._pendingScrollToIndex;this._pendingScrollToIndex=void 0,this.scrollToItem(t,!1)}}renderIcon(t){return null==t?tl:"string"==typeof t?to`<code-icon slot="icon" icon=${t}></code-icon>`:"status"===t.type?to`<gl-git-status slot="icon" .status=${t.name}></gl-git-status>`:"branch"===t.type?to`<gl-branch-icon
				slot="icon"
				.status=${t.status}
				.worktree=${t.worktree??!1}
				.hasChanges=${t.hasChanges??!1}
			></gl-branch-icon>`:"file-icon"===t.type?to`<gl-file-icon slot="icon" .filename=${t.filename}></gl-file-icon>`:tl}renderActions(t){let i=t.actions;return null==i||0===i.length?tl:i.map(i=>to`<action-item
				slot="actions"
				.icon=${i.icon}
				.label=${i.label}
				.altIcon=${i.altIcon}
				.altLabel=${i.altLabel}
				@mouseenter=${()=>this.onSuspendRowTooltip()}
				@mouseleave=${()=>this.onResumeRowTooltip()}
				@click=${r=>this.onTreeItemActionClicked(r,t,i,!1)}
				@dblclick=${r=>this.onTreeItemActionClicked(r,t,i,!0)}
			></action-item>`)}renderDecorations(t){let i=t.decorations;return null==i||0===i.length?tl:i.map(t=>{let i="before"===t.position?"decorations-before":"decorations-after";if("icon"===t.type)return to`<code-icon
					slot=${i}
					part=${i}
					aria-label="${t.label}"
					.icon=${t.icon}
				></code-icon>`;if("text"===t.type){let r=`decoration-text${t.kind?` decoration-text--${t.kind}`:""}`;return to`<span
					slot=${i}
					part=${i}
					class=${r}
					aria-label=${t.tooltip??t.label??tl}
					>${t.label}</span
				>`}if("tracking"===t.type)return to`<gl-tracking-pill
					slot=${i}
					part=${i}
					.ahead=${t.ahead}
					.behind=${t.behind}
					colorized
					outlined
					?missingUpstream=${t.missingUpstream??!1}
				></gl-tracking-pill>`;if("conflict"===t.type){let r=`conflict-count${t.kind?` conflict-count--${t.kind}`:""}`;return to`<span
					slot=${i}
					part=${i}
					class=${r}
					aria-label=${t.tooltip??t.label??tl}
					><code-icon icon="warning" size="12"></code-icon>${t.count}</span
				>`}})}highlightText(t){if(!this.filtered||0===this._filterTerms.length)return t;let i=t.toLowerCase(),r=new Set;for(let t of this._filterTerms){let s=i.indexOf(t);if(-1!==s){for(let i=s;i<s+t.length;i++)r.add(i);continue}let o=a4(i,t);if(null!=o)for(let t of o)r.add(t)}return 0===r.size?t:function(t,i){let r=[],s=0,o=0;for(;o<i.length;){let n=o;for(;n+1<i.length&&i[n+1]===i[n]+1;)n++;let a=i[o],c=i[n]+1;a>s&&r.push(t.substring(s,a)),r.push(to`<mark>${t.substring(a,c)}</mark>`),s=c,o=n+1}return s<t.length&&r.push(t.substring(s)),r}(t,[...r].sort((t,i)=>t-i))}renderTreeItem(t){let i=this._lastSelectedPath===t.path,r=this._focusedItemPath===t.path,s=(this._containerHasFocus||this._filterHasFocus)&&!this._actionButtonHasFocus,o=`tree-item-${t.path}`;return to`<gl-tree-item
			id=${o}
			.branch=${t.branch}
			.expanded=${t.expanded}
			.path=${t.path}
			.parentPath=${t.parentPath}
			.parentExpanded=${t.parentExpanded}
			.level=${t.level}
			.size=${t.size}
			.position=${t.position}
			.checkable=${t.checkable}
			.checked=${t.checked??!1}
			.disableCheck=${t.disableCheck??!1}
			.checkableTooltip=${t.checkableTooltip}
			.showIcon=${null!=t.icon}
			.matched=${t.matched??!1}
			.selected=${i}
			.focused=${r&&s}
			.focusedInactive=${r&&!s}
			.tabIndex=${-1}
			.vscodeContext=${t.contextData}
			@gl-tree-item-select=${()=>this.onBeforeTreeItemSelected(t)}
			@gl-tree-item-selected=${i=>this.onTreeItemSelected(i,t)}
			@gl-tree-item-checked=${i=>this.onTreeItemChecked(i,t)}
			@mouseenter=${i=>this.onTreeItemHover(i,t)}
			@mouseleave=${()=>this.onTreeItemUnhover()}
			@gl-tree-item-suspend-tooltip=${()=>this.onSuspendRowTooltip()}
			@gl-tree-item-resume-tooltip=${()=>this.onResumeRowTooltip()}
		>
			${this.renderIcon(t.icon)}
			${this.highlightText(t.label)}${rz(null!=t.description,()=>to`<span slot="description">${this.highlightText(t.description)}</span>`)}
			${this.renderActions(t)} ${this.renderDecorations(t)}
		</gl-tree-item>`}renderFilterBar(t){return this.filterable?to`<div class="filter">
			<div class="filter-field">
				<input
					class="filter-input"
					type="search"
					role="combobox"
					aria-controls="tree-list"
					aria-expanded="true"
					aria-haspopup="tree"
					aria-autocomplete="list"
					aria-activedescendant=${t||tl}
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
		</div>`:tl}render(){let t=!!this.treeItems?.length,i=!t&&this._filterText&&this._model?.length,r=!t&&!i&&!!this.emptyText;if(!t&&!i&&!r)return tl;let s=this._focusedItemPath?`tree-item-${this._focusedItemPath}`:void 0;return to`
			${this.renderFilterBar(s)}
			${t?to`<div
						${rF(this.scrollableRef)}
						id="tree-list"
						class="scrollable"
						tabindex="0"
						role="tree"
						aria-label=${this.ariaLabel}
						aria-multiselectable="false"
						aria-activedescendant=${s||tl}
						@keydown=${this.handleContainerKeydown}
						@focus=${this.handleContainerFocus}
						@blur=${this.handleContainerBlur}
					>
						<lit-virtualizer
							class="scrollable"
							${rF(this.virtualizerRef)}
							.items=${this.treeItems}
							.keyFunction=${t=>t.path}
							.layout=${(0,rO.flow)({direction:"vertical"})}
							.renderItem=${t=>this.renderTreeItem(t)}
							scroller
						></lit-virtualizer>
					</div>`:i?to`<div class="no-results">No results found</div>`:to`<div class="no-results">${this.emptyText}</div>`}
			${this._hoverOpen&&this._hoveredTooltip?to`<gl-popover
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
					</gl-popover>`:tl}
		`}findTreeNode(t){return this._nodeMap.get(t)}getItemIndex(t){return this._pathToIndexMap.get(t)??-1}rebuildFlattenedTree(){if(!this._model)return;this._nodeMap.clear();let t=this.filtered&&"filter"===this.filterMode,i=this._model.length,r=[];for(let s=0;s<i;s++)a3(this._model[s],i,s+1,void 0,this._nodeMap,t,r);if(this.treeItems=r,this.buildPathToIndexMap(),this._focusedItemPath){let t=this._pathToIndexMap.get(this._focusedItemPath);null!=t?this._focusedItemIndex=t:this.treeItems?.length?(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0):(this._focusedItemPath=void 0,this._focusedItemIndex=-1)}}onBeforeTreeItemSelected(t){if(this._lastSelectedPath!==t.path&&(this._lastSelectedPath=t.path),this._focusedItemPath!==t.path&&(this._focusedItemPath=t.path,this._focusedItemIndex=this.getItemIndex(t.path)),t.branch){let i=this.findTreeNode(t.path);i&&(i.expanded=!i.expanded,this.rebuildFlattenedTree(),this.emit("gl-tree-expansion-changed",{path:t.path,expanded:i.expanded}))}this.requestUpdate()}onTreeItemSelected(t,i){t.stopPropagation(),this.emit("gl-tree-generated-item-selected",{...t.detail,node:i,context:i.context})}onTreeItemChecked(t,i){t.stopPropagation(),this.emit("gl-tree-generated-item-checked",{...t.detail,node:i,context:i.context})}onTreeItemHover(t,i){if(!i.tooltip)return void this.onTreeItemUnhover();let r=t.currentTarget;clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer);let s=r.getBoundingClientRect(),o=this.tooltipAnchorRight?this.getBoundingClientRect().right:t.clientX;this._hoveredAnchor={getBoundingClientRect:()=>({x:o,y:s.top,top:s.top,bottom:s.bottom,left:o,right:o,width:0,height:s.height})},this._hoveredTooltip=i.tooltip,this._hoverOpen||(this._hoverTimer=setTimeout(()=>{this._hoverOpen=!0},500))}onTreeItemUnhover(){clearTimeout(this._hoverTimer),this._unhoverTimer=setTimeout(()=>{this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},100)}onSuspendRowTooltip(){clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1}onResumeRowTooltip(){null!=this._hoveredTooltip&&null!=this._hoveredAnchor&&(this._hoverOpen=!0)}onTreeItemActionClicked(t,i,r,s=!1){t.stopPropagation(),this.emit("gl-tree-generated-item-action-clicked",{node:i,context:i.context,action:r,dblClick:s,altKey:t.altKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey})}getCurrentFocusedIndex(){if(!this.treeItems?.length)return -1;if(this._focusedItemPath){let t=this.getItemIndex(this._focusedItemPath);if(-1!==t)return t}if(this._focusedItemIndex>=0&&this._focusedItemIndex<this.treeItems.length)return this._focusedItemIndex;if(this._lastSelectedPath){let t=this.getItemIndex(this._lastSelectedPath);if(-1!==t)return t}return 0}handleItemActivation(t){t&&(this.onBeforeTreeItemSelected(t),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),t))}handleBranchToggle(t,i){if(!i?.branch)return!1;let r="ArrowRight"===t.key,s="ArrowLeft"===t.key;if(r&&i.expanded||s&&!i.expanded)return!1;t.preventDefault(),t.stopPropagation();let o=this.findTreeNode(i.path);return!!o&&(o.expanded=!o.expanded,this.rebuildFlattenedTree(),this.emit("gl-tree-expansion-changed",{path:i.path,expanded:o.expanded}),this.requestUpdate(),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),i),!0)}focusItemAtIndex(t){let i=this.treeItems?.[t];i&&(this._focusedItemPath=i.path,this._focusedItemIndex=t,this._lastSelectedPath!==i.path&&(this._lastSelectedPath=i.path),this.requestUpdate(),this.scrollToItem(t))}scrollToItem(t,i=!0){this._scrolling||(this._scrolling=!0,this.updateComplete.then(()=>{let r=this.virtualizerRef.value,s=this.scrollableRef.value;if(!r||!s){this._scrolling=!1;return}let o=()=>{i&&s&&document.activeElement!==s&&s.focus(),this._scrolling=!1},n=0===t,a=t===(this.treeItems?.length??0)-1;n||a?requestAnimationFrame(()=>{n?r.scrollTop=0:r.scrollTop=r.scrollHeight,requestAnimationFrame(o)}):requestAnimationFrame(()=>{let i=r.scrollToIndex(t,"nearest");i&&"function"==typeof i.then?i.then(o):requestAnimationFrame(o)})}))}handleTypeAhead(t){this._typeAheadTimer&&clearTimeout(this._typeAheadTimer);let i=!this._typeAheadBuffer;this._typeAheadBuffer+=t.toLowerCase();let r=this.treeItems?.[this._focusedItemIndex],s=r?.label?.toLowerCase().startsWith(this._typeAheadBuffer),o=!1;if(i?o=!0:s||(o=!0),o){let t=this.findNextMatchingItem(this._typeAheadBuffer);-1!==t&&this.focusItemAtIndex(t)}this._typeAheadTimer=window.setTimeout(()=>{this._typeAheadBuffer="",this._typeAheadTimer=void 0},this._typeAheadTimeout)}buildPathToIndexMap(){if(this._pathToIndexMap.clear(),!this.treeItems)return;let t=0;for(let i of this.treeItems)this._pathToIndexMap.set(i.path,t++)}findNextMatchingItem(t){if(!this.treeItems?.length||!t)return -1;let i=t.toLowerCase(),r=this._focusedItemIndex,s=this.treeItems.length;for(let t=1;t<s;t++){let o=(r+t)%s;if(this.treeItems[o].label?.toLowerCase().startsWith(i))return o}return -1}isPrintableCharacter(t){return 1===t.length&&a1.test(t)}setActiveDescendant(t){let i=this.treeItems?.[t];i&&(this._focusedItemPath=i.path,this._focusedItemIndex=t,this._lastSelectedPath!==i.path&&(this._lastSelectedPath=i.path),this.requestUpdate(),this.scrollToItem(t,!1))}applyFilterToModel(){this._filterLower=this._filterText.toLowerCase().trim(),this._filterTerms=this._filterLower.split(/\s+/).filter(t=>t.length>0),0===this._filterTerms.length?(this.filtered=!1,null!=this._model&&function t(i){for(let r of i)r.matched=!1,null!=r.children&&t(r.children)}(this._model)):(this.filtered=!0,null!=this._model&&a5(this._model,this._filterTerms)),this.rebuildFlattenedTree()}};function a3(t,i,r,s,o,n,a){if(n&&!1===t.matched)return a??[];let c=a??[];if(o?.set(t.path,t),c.push({...t,size:i,position:r,parentPath:s}),!1!==t.expanded&&null!=t.children&&t.children.length>0){let i=t.children.length;for(let r=0;r<i;r++)a3(t.children[r],i,r+1,t.path,o,n,c)}return c}function a5(t,i){let r=!1;for(let s of t){let t=(s.label??"").toLowerCase(),o=s.filterText?.toLowerCase(),n=s.description?.toLowerCase(),a=i.every(i=>o?.includes(i)||t.includes(i)||null!=a4(t,i)||n?.includes(i)),c=!1;null!=s.children&&s.children.length>0&&(c=a5(s.children,i)),s.matched=a||c,s.matched&&(r=!0),s.branch&&c&&(s.expanded=!0)}return r}function a4(t,i){let r=[],s=0;for(let o=0;o<t.length&&s<i.length;o++)t[o]===i[s]&&(r.push(o),s++);return s===i.length?r:void 0}a2.styles=[rV,tL`
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
		`],a0([t2()],a2.prototype,"treeItems",2),a0([t1({reflect:!0})],a2.prototype,"guides",2),a0([t1({type:Boolean,reflect:!0})],a2.prototype,"filtered",2),a0([t1({type:Boolean,reflect:!0})],a2.prototype,"filterable",2),a0([t1({type:String,attribute:"filter-placeholder"})],a2.prototype,"filterPlaceholder",2),a0([t1({type:String,attribute:"filter-mode",reflect:!0})],a2.prototype,"filterMode",2),a0([t1({type:String,attribute:"empty-text"})],a2.prototype,"emptyText",2),a0([t1({type:Boolean,attribute:"tooltip-anchor-right"})],a2.prototype,"tooltipAnchorRight",2),a0([t1({type:String,attribute:"filter-text"})],a2.prototype,"filterText",1),a0([t1({type:String,attribute:"aria-label"})],a2.prototype,"ariaLabel",2),a0([t1({type:String,attribute:"focused-path"})],a2.prototype,"focusedPath",2),a0([t2()],a2.prototype,"_containerHasFocus",2),a0([t2()],a2.prototype,"_filterHasFocus",2),a0([t2()],a2.prototype,"_actionButtonHasFocus",2),a0([t2()],a2.prototype,"_hoveredTooltip",2),a0([t2()],a2.prototype,"_hoveredAnchor",2),a0([t2()],a2.prototype,"_hoverOpen",2),a0([t1({type:Array,attribute:!1})],a2.prototype,"model",1),a2=a0([tJ("gl-tree-view")],a2);var a7=Object.defineProperty,a6=Object.getOwnPropertyDescriptor,a8=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?a6(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&a7(i,r,n),n};let a9=class extends lit_element_i{constructor(){super(...arguments),this.lines=1}render(){let t=`--skeleton-lines: ${this.lines};`;return to`<div class="skeleton" style=${t}></div>`}};a9.styles=tL`
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
	`,a8([t1({type:Number})],a9.prototype,"lines",2),a9=a8([tJ("skeleton-loader")],a9);let GlTreeBase=class GlTreeBase extends GlElement{renderLoading(){return to`
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
		`}renderLayoutAction(t){if(!t)return tl;let i="tree",r="list-tree",s="View as Tree";switch(t){case"auto":i="list",r="gl-list-auto",s="View as List";break;case"list":i="tree",r="list-flat",s="View as Tree";break;case"tree":i="auto",r="list-tree",s="View as Auto"}return to`<action-item data-switch-value="${i}" label="${s}" icon="${r}"></action-item>`}renderTreeView(t,i="none",r){return to`<gl-tree-view
			.model=${t}
			.guides=${i}
			empty-text=${r??tl}
			@gl-tree-generated-item-action-clicked=${this.onTreeItemActionClicked}
			@gl-tree-generated-item-checked=${this.onTreeItemChecked}
			@gl-tree-generated-item-selected=${this.onTreeItemSelected}
		></gl-tree-view>`}renderFiles(t,i=!1,r=!1,s=2){let o=[];if(i){let i=t[0]?.repoPath,n=rR(t,t=>t.path.split("/"),(...t)=>t.join("/"),r);if(null!=n.children)for(let t of n.children.values()){let r=this.walkFileTree(t,{level:s},i);o.push(r)}}else for(let i of t){let t=this.fileToTreeModel(i,{level:s,branch:!1},!0);o.push(t)}return o}walkFileTree(t,i={level:1},r){let s;if(void 0===i.level&&(i.level=1),null==t.value?(s=this.folderToTreeModel(t.name,t.relativePath,i),r&&(s.tooltip=(0,rL.join)(r,t.relativePath))):s=this.fileToTreeModel(t.value,i),null!=t.children){let o=[];for(let s of t.children.values()){let t=this.walkFileTree(s,{...i,level:i.level+1},r);o.push(t)}o.length>0&&(s.branch=!0,s.children=o)}return s}folderToTreeModel(t,i,r){return{branch:!1,expanded:!0,path:i,level:1,checkable:!1,checked:!1,icon:"folder",label:t,tooltip:i,...r}}getRepoActions(t,i,r){return[]}emptyTreeModel(t,i){return{branch:!1,expanded:!0,path:"",level:1,checkable:!0,checked:!0,icon:void 0,label:t,...i}}repoToTreeModel(t,i,r,s){return{branch:!1,expanded:!0,path:i,level:1,checkable:!0,checked:!0,icon:"gl-repository",label:t,description:s,context:[i],actions:this.getRepoActions(t,i,r),...r}}getFileActions(t,i){return[]}fileToTreeModel(t,i,r=!1,s="/"){let o,n,a,c=t.path.lastIndexOf(s),h=-1!==c?t.path.substring(c+1):t.path,p=r&&-1!==c?t.path.substring(0,c):"";return{branch:!1,expanded:!0,path:t.path,level:1,checkable:!1,checked:!1,icon:"file",label:h,description:!0===r?p:void 0,tooltip:(o=function(t){switch(t){case"A":return{letter:"A",tooltip:"Added",kind:"added"};case"?":return{letter:"U",tooltip:"Untracked",kind:"untracked"};case"M":return{letter:"M",tooltip:"Modified",kind:"modified"};case"D":return{letter:"D",tooltip:"Deleted",kind:"deleted"};case"R":return{letter:"R",tooltip:"Renamed",kind:"renamed"};case"C":return{letter:"C",tooltip:"Copied",kind:"renamed"};case"T":return{letter:"T",tooltip:"Type Changed",kind:"modified"};case"U":case"AA":case"AU":case"UA":case"DD":case"DU":case"UD":case"UU":return{letter:"!",tooltip:"Conflict",kind:"conflict"};default:return}}(t.status)?.tooltip,n=t.repoPath?(0,rL.join)(t.repoPath,t.path):t.path,a=[`${n}${null!=t.submodule?" (submodule)":""}`],o&&a.push(o),"R"===t.status&&t.originalPath&&a.push(`\u2190 ${t.originalPath}`),a.join(`
`)),context:[t],actions:this.getFileActions(t,i),decorations:[{type:"text",label:t.status}],...i}}};var le=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,li=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lt(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&le(i,r,n),n};let lr=class extends lit_element_i{render(){return this.name?to`<gl-tooltip .content=${this.name}>${this.renderAvatar()}</gl-tooltip>`:this.renderAvatar()}renderAvatar(){return this.href?to`<a href=${this.href} class="avatar" part="avatar">${this.renderContent()}</a>`:to`<span class="avatar" part="avatar">${this.renderContent()}</span>`}renderContent(){return this.src?to`<img class="thumb thumb--media" src="${this.src}" alt="${this.name}" />`:to`<slot class="thumb thumb--text"></slot>`}};lr.styles=[tL`
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
		`],li([t1()],lr.prototype,"src",2),li([t1()],lr.prototype,"name",2),li([t1()],lr.prototype,"href",2),lr=li([tJ("gl-avatar")],lr);let ls=tL`
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
`;var lo=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,la=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?ln(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lo(i,r,n),n};let ll=class extends lit_element_i{render(){return to`<slot class="badge" part="base"></slot>`}};ll.styles=[ls],la([t1({reflect:!0})],ll.prototype,"appearance",2),ll=la([tJ("gl-badge")],ll);var lc=Object.defineProperty,lh=Object.getOwnPropertyDescriptor,ld=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lh(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lc(i,r,n),n};let lp=class extends lit_element_i{constructor(){super(...arguments),this.editor=!1,this.layout="shift",this.grouping="gap"}render(){return to`<div class="group"><slot></slot></div>`}};lp.styles=[rH,tL`
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
		`],ld([t1({type:Boolean})],lp.prototype,"editor",2),ld([t1({reflect:!0})],lp.prototype,"layout",2),ld([t1({reflect:!0})],lp.prototype,"grouping",2),lp=ld([tJ("button-container")],lp);var lu=Object.defineProperty,lg=Object.getOwnPropertyDescriptor,lf=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lg(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lu(i,r,n),n};let lm=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.role="option",this.onKeydown=t=>{this.disabled||t.target!==this||("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.click())}}updateInteractiveState(){this.tabIndex=this.disabled?-1:"option"===this.role?0:-1}updated(t){(t.has("disabled")||t.has("role"))&&this.updateInteractiveState()}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.onKeydown)}disconnectedCallback(){this.removeEventListener("keydown",this.onKeydown),super.disconnectedCallback?.()}render(){return this.href?to`<a href=${this.href}><slot></slot></a>`:to`<slot></slot>`}};lm.styles=[rH,tL`
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
		`],lf([t1({type:Boolean,reflect:!0})],lm.prototype,"disabled",2),lf([t1({reflect:!0})],lm.prototype,"href",2),lf([t1({reflect:!0})],lm.prototype,"role",2),lm=lf([tJ("menu-item")],lm);var lb=Object.defineProperty,l_=Object.getOwnPropertyDescriptor;let lv=class extends lit_element_i{firstUpdated(t){this.role="listbox"}render(){return to`<slot></slot>`}};lv.styles=[rH,tL`
			:host {
				width: max-content;
				background-color: var(--vscode-menu-background);
				border: 1px solid var(--vscode-menu-border);
				padding-bottom: 0.6rem;
			}
		`],lv=((t,i,r,s)=>{for(var o,n=s>1?void 0:s?l_(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lb(i,r,n),n})([tJ("menu-list")],lv);var ly=Object.defineProperty,lw=Object.getOwnPropertyDescriptor,lk=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lw(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&ly(i,r,n),n};let lx=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.position="bottom"}firstUpdated(){this.setAttribute("role","progressbar")}render(){return to`<div class="progress-bar"></div>`}};lx.styles=tL`
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
	`,lk([t1({reflect:!0})],lx.prototype,"mode",2),lk([t1({type:Boolean})],lx.prototype,"active",2),lk([t1()],lx.prototype,"position",2),lx=lk([tJ("progress-indicator")],lx);var lC=Object.defineProperty,l$=Object.getOwnPropertyDescriptor,lE=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?l$(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lC(i,r,n),n};let lS=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!1,this.expanded=!1,this.loading=!1}renderTitle(){return this.collapsable?to`<button
			type="button"
			class="label"
			aria-controls="content"
			aria-expanded=${this.expanded}
			@click="${this.toggleExpanded}"
		>
			<code-icon class="icon" icon=${this.expanded?"chevron-down":"chevron-right"}></code-icon
			><span class="title"><slot name="title">Section</slot></span>
			<span class="subtitle"><slot name="subtitle"></slot></span>
		</button>`:to`<div class="label">
				<span class="title"><slot name="title">Section</slot></span>
				<span class="subtitle"><slot name="subtitle"></slot></span>
			</div>`}render(){return to`
			<header class="header" part="header">
				${this.renderTitle()}
				<slot name="actions"></slot>
				<progress-indicator ?active="${this.loading}"></progress-indicator>
			</header>
			<div id="content" role="region" part="content" class="content scrollable">
				<slot></slot>
			</div>
		`}toggleExpanded(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("expanded-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}};lS.styles=[rV,tL`
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
		`],lE([t1({type:Boolean,reflect:!0})],lS.prototype,"collapsable",2),lE([t1({type:Boolean,reflect:!0})],lS.prototype,"expanded",2),lE([t1({type:Boolean,reflect:!0})],lS.prototype,"loading",2),lS=lE([tJ("webview-pane")],lS);var lA=Object.defineProperty,lz=Object.getOwnPropertyDescriptor,lI=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lz(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lA(i,r,n),n};let lT=class extends GlTreeBase{constructor(){super(...arguments),this.explainBusy=!1,this.selectedPatches=[],this._copiedLink=!1}get cloudDraft(){if(this.state.draft?.draftType==="cloud")return this.state.draft}get isCodeSuggestion(){return this.cloudDraft?.type==="suggested_pr_change"}get canSubmit(){return this.selectedPatches.length>0}updated(t){if(t.has("explain")&&(this.explainBusy=!1,this.querySelector('[data-region="ai-explanation"]')?.scrollIntoView()),t.has("state")){let t=this.state?.draft?.patches;if(t?.length)for(let i of(this.selectedPatches=t.map(t=>t.id),t)){let t=this.selectedPatches.indexOf(i.id);i.repository.located?-1===t&&this.selectedPatches.push(i.id):t>-1&&this.selectedPatches.splice(t,1)}else this.selectedPatches=[]}}renderEmptyContent(){return to`
			<div class="section section--empty" id="empty">
				<button-container>
					<gl-button full href="command:gitlens.openPatch">Open Patch...</gl-button>
				</button-container>
			</div>
		`}renderPatchMessage(){if(this.state?.draft?.title==null)return;let t=this.cloudDraft?.description;if(null!=t)return t=t.trim(),to`
			<div class="message-block">
				<p class="message-block__text scrollable" data-region="message">
					<span>${rj(t)}</span>
				</p>
			</div>
		`}renderExplainAi(){if(this.state?.orgSettings.ai===!1||this.state?.preferences.aiEnabled===!1)return;let t=this.explain?.result!=null?`${this.explain.result.summary}

${this.explain.result.body}`:void 0;return to`
			<webview-pane collapsable data-region="explain-pane">
				<span slot="title">Explain (AI)</span>
				<action-nav slot="actions">
					<action-item
						data-action="switch-ai"
						label="Switch AI Provider/Model"
						icon="arrow-swap"
					></action-item>
				</action-nav>

				<div class="section">
					<p>Let AI assist in understanding the changes made with this patch.</p>
					<p class="button-container">
						<span class="button-group button-group--single">
							<gl-button
								full
								class="button--busy"
								data-action="ai-explain"
								aria-busy="${(this.explainBusy?"true":void 0)??tl}"
								@click=${this.onExplainChanges}
								@keydown=${this.onExplainChanges}
								><code-icon icon="loading" modifier="spin" slot="prefix"></code-icon>Explain
								Changes</gl-button
							>
						</span>
					</p>
					${t?to`<div class="ai-content" data-region="commit-explanation">
								<gl-markdown
									class="ai-content__summary scrollable"
									markdown="${t}"
								></gl-markdown>
							</div>`:this.explain?.error?to`<div class="ai-content has-error" data-region="commit-explanation">
									<p class="ai-content__summary scrollable">
										${this.explain.error.message??"Error retrieving content"}
									</p>
								</div>`:void 0}
				</div>
			</webview-pane>
		`}renderChangedFiles(){let t=this.state?.preferences?.files?.layout??"auto";return to`
			<webview-pane collapsable expanded>
				<span slot="title">Files changed </span>
				<!-- <span slot="subtitle" data-region="stats">\${this.renderCommitStats()}</span> -->
				<action-nav slot="actions">${this.renderLayoutAction(t)}</action-nav>

				${rz(null!=this.validityMessage,()=>to`<div class="section">
							<div class="alert alert--error">
								<code-icon icon="error"></code-icon>
								<p class="alert__content">${this.validityMessage}</p>
							</div>
						</div>`)}
				<div class="change-list" data-region="files">
					${rz(this.state?.draft?.patches==null,()=>this.renderLoading(),()=>this.renderTreeView(this.treeModel,this.state?.preferences?.indentGuides,"No files"))}
				</div>
			</webview-pane>
		`}get treeModel(){if(this.state?.draft?.patches==null)return[];let{draft:{patches:t}}=this.state,i=this.state?.preferences?.files?.layout??"auto",r=!1,s=rM(t,t=>t?.files?.length??0);return r="auto"===i?s>(this.state.preferences?.files?.threshold??5):"tree"===i,t?.map(t=>this.draftPatchToTreeModel(t,r,this.state.preferences?.files?.compact,{checkable:!0,checked:this.selectedPatches.includes(t.id)}))}renderUserSelection(t,i){if("delete"===t.change)return;let r=t.pendingRole??t.user.role,s=new Map([["owner","owner"],["admin","admin"],["editor","can edit"],["viewer","can view"],["remove","un-invite"]]),o=s.get(r);return to`
			<div class="user-selection">
				<div class="user-selection__avatar">
					<gl-avatar .src=${t.avatarUrl}></gl-avatar>
				</div>
				<div class="user-selection__info">
					<div class="user-selection__name">
						${t.member?.name??t.member?.username??"Unknown"}
					</div>
				</div>
				<div class="user-selection__actions">
					${rz("owner"!==r&&("owner"===i||"admin"===i),()=>to`
							<gl-popover trigger="click" appearance="menu" ?arrow=${!1}>
								<gl-button slot="anchor"
									>${o} <code-icon icon="chevron-down"></code-icon
								></gl-button>
								<menu-list slot="content">
									${rI(s,([i,s])=>"owner"===i?void 0:to`<menu-item
													@click=${r=>this.onChangeSelectionRole(r,t,i)}
												>
													<code-icon
														icon="check"
														class="user-selection__check ${r===i?"is-active":""}"
													></code-icon>
													${s}
												</menu-item>`)}
								</menu-list>
							</gl-popover>
						`,()=>to`${o}`)}
				</div>
			</div>
		`}renderUserSelectionList(t,i=!1){if(!t.userSelections?.length)return;let r=t.userSelections;return!1===i&&(r=r.filter(t=>t.user?.role!=="owner")),to`
			<div class="message-input">
				<div class="user-selection-container scrollable">
					${rP(r,t=>t.member?.id??t.user?.id,i=>this.renderUserSelection(i,t.role))}
				</div>
			</div>
		`}renderPatchPermissions(){let t=this.cloudDraft;if(null!=t){if("admin"===t.role||"owner"===t.role){let i,r=t.userSelections?.some(t=>void 0!==t.change);switch(t.visibility){case"private":i="organization";break;case"invite_only":i="lock";break;default:i="globe"}return to`
				${rz(!0!==this.isCodeSuggestion,()=>to` <div class="message-input message-input--group">
							<div class="message-input__select">
								<span class="message-input__select-icon"
									><code-icon icon=${i}></code-icon
								></span>
								<select
									id="visibility"
									class="message-input__control"
									@change=${this.onVisibilityChange}
								>
									<option value="public" ?selected=${"public"===t.visibility}>
										Anyone with the link
									</option>
									<option value="private" ?selected=${"private"===t.visibility}>
										Members of my Org with the link
									</option>
									<option value="invite_only" ?selected=${"invite_only"===t.visibility}>
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
						</div>`)}
				${this.renderUserSelectionList(t)}
				${rz(r,()=>to`
						<p class="button-container">
							<span class="button-group button-group--single">
								<gl-button appearance="secondary" full @click=${this.onUpdatePatch}
									>Update Patch</gl-button
								>
							</span>
						</p>
					`)}
			`}return to`
			${rz(!0!==this.isCodeSuggestion,()=>to` <div class="message-input">
						<div class="message-input__control message-input__control--text">
							${rz("public"===t.visibility,()=>to`<code-icon icon="globe"></code-icon> Anyone with the link`)}
							${rz("private"===t.visibility,()=>to`<code-icon icon="organization"></code-icon> Members of my Org with the link`)}
							${rz("invite_only"===t.visibility,()=>to`<code-icon icon="lock"></code-icon> Collaborators only`)}
						</div>
					</div>`)}
			${this.renderUserSelectionList(t,!0)}
		`}}renderCodeSuggectionActions(){if(this.isCodeSuggestion&&null!=this.cloudDraft&&!this.cloudDraft.isArchived&&"viewer"!==this.cloudDraft.role)return to`
			<p class="button-container">
				<span class="button-group button-group--single">
					<gl-button appearance="secondary" full @click=${()=>this.onArchiveDraft("accepted")}
						>Accept</gl-button
					>
					<gl-button appearance="secondary" full @click=${()=>this.onArchiveDraft("rejected")}
						>Reject</gl-button
					>
				</span>
			</p>
		`}renderPatches(){return to`
			<div class="section section--action">
				${this.renderPatchPermissions()}
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button full @click=${this.onApplyPatch}>Apply Patch</gl-button>
						<gl-popover placement="top" trigger="click" appearance="menu" ?arrow=${!1}>
							<gl-button
								slot="anchor"
								density="compact"
								aria-label="Apply Patch Options..."
								title="Apply Patch Options..."
								><code-icon icon="chevron-down"></code-icon
							></gl-button>
							<menu-list slot="content" class="mine-menu">
								<menu-item data-value="branch" @click=${this.onSelectApplyOption}
									>Apply to a Branch</menu-item
								>
								<!-- <menu-item data-value="worktree">Apply to new worktree</menu-item> -->
							</menu-list>
						</gl-popover>
					</span>
				</p>
				${this.renderCodeSuggectionActions()}
			</div>
		`}renderActionbar(){let t=this.state?.draft;if(null!=t)return"local"===t.draftType?to`
				<div class="top-details__actionbar">
					<div class="top-details__actionbar-group"></div>
					<div class="top-details__actionbar-group">
						<a
							class="commit-action"
							href="#"
							aria-label="Share Patch"
							title="Share Patch"
							@click=${this.onShareLocalPatch}
							>Share</a
						>
					</div>
				</div>
			`:to`
			<div class="top-details__actionbar">
				<div class="top-details__actionbar-group"></div>
				<div class="top-details__actionbar-group">
					<a class="commit-action" href="#" @click=${this.onCopyCloudLink}>
						<code-icon icon="${this._copiedLink?"check":"link"}"></code-icon>
						<span class="top-details__sha">Copy Link</span></a
					>
					${rz(this.cloudDraft?.gkDevLink!=null,()=>to`
							<a class="commit-action" href=${this.cloudDraft.gkDevLink} title="Open on gitkraken.dev">
								<code-icon icon="globe"></code-icon>
							</a>
						`)}
				</div>
			</div>
		`}renderDraftInfo(){let t;if(this.state.draft?.title==null)return tl;if(this.cloudDraft?.isArchived){let i=this.cloudDraft.archivedReason??"archived";t=to`<gl-badge class="title__badge">${i}</gl-badge>`}return to`
			<h1 class="title">${this.state.draft?.title} ${t}</h1>
			${this.renderPatchMessage()}
		`}render(){return this.state?.draft==null?to` <div class="commit-detail-panel scrollable">${this.renderEmptyContent()}</div>`:to`
			<div class="pane-groups">
				<div class="pane-groups__group-fixed">
					<div class="section">${this.renderActionbar()}${this.renderDraftInfo()}</div>
				</div>
				<div class="pane-groups__group">${this.renderChangedFiles()}</div>
				<div class="pane-groups__group-fixed pane-groups__group--bottom">
					${this.renderExplainAi()}${this.renderPatches()}
				</div>
			</div>
		`}createRenderRoot(){return this}onInviteUsers(t){this.emit("gl-patch-details-invite-users")}onChangeSelectionRole(t,i,r){this.emit("gl-patch-details-update-selection",{selection:i,role:r});let s=t.target?.closest("gl-popover");s?.hide()}onVisibilityChange(t){let i=this.state.draft;i.visibility=t.target.value,this.emit("gl-patch-details-update-metadata",{visibility:i.visibility})}onUpdatePatch(t){this.emit("gl-patch-details-update-permissions")}onExplainChanges(t){if(!0===this.explainBusy||t instanceof KeyboardEvent&&"Enter"!==t.key){t.preventDefault(),t.stopPropagation();return}this.explainBusy=!0}onTreeItemActionClicked(t){if(t.detail.context&&t.detail.action)switch(t.detail.action.action){case"apply-patch":this.onApplyPatch();break;case"change-patch-base":this.onChangePatchBase();break;case"show-patch-in-graph":this.onShowInGraph();break;case"file-open":this.onOpenFile(t);break;case"file-compare-working":this.onCompareWorking(t)}}fireFileEvent(t,i,r){let s=new CustomEvent(t,{detail:{...i,showOptions:r}});this.dispatchEvent(s)}onCompareWorking(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-compare-working",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onOpenFile(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-open",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onTreeItemChecked(t){if(!t.detail.context)return;let[i]=t.detail.context,r=this.state.draft?.patches?.find(t=>t.gkRepositoryId===i);if(!r)return;let s=this.selectedPatches.indexOf(r?.id);t.detail.checked?-1===s&&(this.selectedPatches.push(r.id),this.validityMessage=void 0):s>-1&&this.selectedPatches.splice(s,1);let o=new CustomEvent("gl-patch-checked",{detail:{patch:r,checked:t.detail.checked}});this.dispatchEvent(o)}onTreeItemSelected(t){let{node:i,context:r}=t.detail;if(!0===i.branch||null==r)return;let[s]=r;this.emit("gl-patch-file-compare-previous",{...s})}onApplyPatch(t,i="current"){if(!1===this.canSubmit){this.validityMessage="Please select changes to apply";return}this.validityMessage=void 0,this.emit("gl-patch-apply-patch",{draft:this.state.draft,target:i,selectedPatches:this.selectedPatches})}onArchiveDraft(t){this.emit("gl-draft-archive",{reason:t})}onSelectApplyOption(t){if(!1===this.canSubmit){this.validityMessage="Please select changes to apply";return}let i=t.target?.closest("menu-item");i?.dataset?.value!=null&&this.onApplyPatch(void 0,i.dataset.value)}onChangePatchBase(t){let i=new CustomEvent("change-patch-base",{detail:{draft:this.state.draft}});this.dispatchEvent(i)}onSelectPatchRepo(t){let i=new CustomEvent("select-patch-repo",{detail:{draft:this.state.draft}});this.dispatchEvent(i)}onShowInGraph(t){this.emit("gl-patch-details-graph-show-patch",{draft:this.state.draft})}onCopyCloudLink(){this.emit("gl-patch-details-copy-cloud-link",{draft:this.state.draft}),this._copiedLink=!0,setTimeout(()=>this._copiedLink=!1,1e3)}onShareLocalPatch(){this.emit("gl-patch-details-share-local-patch",{draft:this.state.draft})}draftPatchToTreeModel(t,i=!1,r=!0,s){let o=this.repoToTreeModel(t.repository.name,t.gkRepositoryId,s,t.repository.located?void 0:"missing");if(!t.files?.length)return o;let n=[];if(i){let i=rR(t.files,t=>t.path.split("/"),(...t)=>t.join("/"),r);if(null!=i.children)for(let t of i.children.values()){let i=this.walkFileTree(t,{level:2});n.push(i)}}else for(let i of t.files){let t=this.fileToTreeModel(i,{level:2,branch:!1},!0);n.push(t)}return n.length>0&&(o.branch=!0,o.children=n),o}getFileActions(t,i){return[{icon:"go-to-file",label:"Open file",action:"file-open"},{icon:"git-compare",label:"Open Changes with Working File",action:"file-compare-working"}]}};lI([t1({type:Object})],lT.prototype,"state",2),lI([t2()],lT.prototype,"explainBusy",2),lI([t1({type:Object})],lT.prototype,"explain",2),lI([t2()],lT.prototype,"selectedPatches",2),lI([t2()],lT.prototype,"validityMessage",2),lI([t2()],lT.prototype,"_copiedLink",2),lT=lI([tJ("gl-draft-details")],lT);var lP=((f=lP||{}).AngleBracketLeftHeavy="❰",f.AngleBracketRightHeavy="❱",f.ArrowBack="↩",f.ArrowDown="↓",f.ArrowDownUp="⇵",f.ArrowDropRight="⤷",f.ArrowHeadRight="➤",f.ArrowLeft="←",f.ArrowLeftDouble="⇐",f.ArrowLeftRight="↔",f.ArrowLeftRightDouble="⇔",f.ArrowLeftRightDoubleStrike="⇎",f.ArrowLeftRightLong="⟷",f.ArrowRight="→",f.ArrowRightDouble="⇒",f.ArrowRightHollow="⇨",f.ArrowUp="↑",f.ArrowUpDown="⇅",f.ArrowUpRight="↗",f.ArrowsHalfLeftRight="⇋",f.ArrowsHalfRightLeft="⇌",f.ArrowsLeftRight="⇆",f.ArrowsRightLeft="⇄",f.Asterisk="∗",f.Bullseye="◎",f.Check="✔",f.Dash="—",f.Dot="•",f.Ellipsis="…",f.EnDash="–",f.Envelope="✉",f.EqualsTriple="≡",f.Flag="⚑",f.FlagHollow="⚐",f.MiddleEllipsis="⋯",f.MuchLessThan="≪",f.MuchGreaterThan="≫",f.Pencil="✎",f.Space=" ",f.SpaceThin=" ",f.SpaceThinnest=" ",f.SquareWithBottomShadow="❏",f.SquareWithTopShadow="❐",f.Warning="⚠",f.ZeroWidthSpace="​",f);Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]);var lj=((m=lj||{}).File="file",m.Git="git",m.GitHub="github",m.GitLens="gitlens",m.GitLensAIMarkdown="gitlens-ai-markdown",m.GitLensVirtual="gitlens-virtual",m.PRs="pr",m.Remote="vscode-remote",m.Vsls="vsls",m.VslsScc="vsls-scc",m.Virtual="vscode-vfs",m);Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let lR="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",lM=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${lR}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${lR}`,graph:`https://gitkraken.com/solutions/commit-graph?${lR}`,launchpad:`https://gitkraken.com/solutions/launchpad?${lR}`,platform:`https://gitkraken.com/devex?${lR}`,pricing:`https://gitkraken.com/gitlens/pricing?${lR}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${lR}`,security:`https://help.gitkraken.com/gitlens/security?${lR}`,workspaces:`https://gitkraken.com/solutions/workspaces?${lR}`,cli:`https://gitkraken.com/cli?${lR}`,browserExtension:`https://gitkraken.com/browser-extension?${lR}`,desktop:`https://gitkraken.com/git-client?${lR}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${lR}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${lR}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lR}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${lR}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${lR}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${lR}`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lR}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lR}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${lR}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lR}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lR}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${lR}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${lR}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${lR}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${lR}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lR}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lR}`});var lL=Object.defineProperty,lO=Object.getOwnPropertyDescriptor,lD=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lO(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lL(i,r,n),n};let lB=Object.freeze([["added",["+","add"]],["modified",["~","edit"]],["removed",["-","remove"]]]),lF=class extends lit_element_i{constructor(){super(...arguments),this.added=0,this.modified=0,this.removed=0,this.noTooltip=!1}render(){let t=lB.map(([t,i])=>this.renderStat(t,i));return this.noTooltip?t:to`<gl-tooltip>
			${t}
			<div slot="content">${this.renderTooltipContent()}</div>
		</gl-tooltip>`}renderStat(t,i){let r=this[t];if(null==r)return tl;let[s,o]=i,n="icons"===this.symbol?to`<code-icon class="icon" icon=${o}></code-icon>`:to`<span class="symbol">${s}</span>`;return to`<span class="stat ${t}" aria-label="${r} ${t}"
			><span class="label">${n}${r}</span></span
		>`}renderTooltipContent(){let t=this.added??0,i=this.modified??0,r=this.removed??0,s=t+i+r,o=[];t>0&&o.push(to`<span class="added">${t} added</span>`),i>0&&(o.length&&o.push(", "),o.push(to`<span class="modified">${i} modified</span>`)),r>0&&(o.length&&o.push(", "),o.push(to`<span class="removed">${r} removed</span>`));let n=t>0||r>0?to`${ii("file",s)} changed (${o})`:ii("file changed",s,{plural:"files changed",zero:"No files changed"}),a=[];null!=this.additions&&a.push(to`<span class="added">${ii("addition",this.additions)}</span>`),null!=this.deletions&&(a.length&&a.push(", "),a.push(to`<span class="removed">${ii("deletion",this.deletions)}</span>`));let c=[to`<div>${n}</div>`];return a.length>0&&c.push(to`<div>${a}</div>`),c}};lF.styles=tL`
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
	`,lD([t1({type:Number})],lF.prototype,"added",2),lD([t1({type:Number})],lF.prototype,"modified",2),lD([t1({type:Number})],lF.prototype,"removed",2),lD([t1({type:Number})],lF.prototype,"additions",2),lD([t1({type:Number})],lF.prototype,"deletions",2),lD([t1()],lF.prototype,"symbol",2),lD([t1({reflect:!0})],lF.prototype,"appearance",2),lD([t1({type:Boolean,attribute:"no-tooltip"})],lF.prototype,"noTooltip",2),lF=lD([tJ("commit-stats")],lF);var lN=Object.defineProperty,lU=Object.getOwnPropertyDescriptor,lq=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lU(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lN(i,r,n),n};let lH=class extends GlTreeBase{constructor(){super(...arguments),this.review=!1,this.generateBusy=!1,this.creationBusy=!1,this.onDebounceTitleInput=$(this.onTitleInput,500),this.onDebounceDescriptionInput=$(this.onDescriptionInput,500)}get create(){return this.state.create}get createChanges(){return Object.values(this.create.changes)}get createEntries(){return Object.entries(this.create.changes)}get hasWipChanges(){return this.createChanges.some(t=>t?.type==="wip")}get selectedChanges(){return 1===this.createChanges.length?this.createEntries:this.createEntries.filter(([,t])=>!1!==t.checked)}get canSubmit(){return null!=this.create.title&&this.create.title.length>0&&this.selectedChanges.length>0}get fileLayout(){return this.state?.preferences?.files?.layout??"auto"}get isCompact(){return this.state?.preferences?.files?.compact??!0}get filesModified(){return rM(this.createChanges,t=>t.files?.length??0)}get draftVisibility(){return this.state?.create?.visibility??"public"}updated(t){t.has("state")&&(this.creationBusy=!1),t.has("generate")&&(this.generateBusy=!1,this.generateAiButton.scrollIntoView())}firstUpdated(){window.requestAnimationFrame(()=>{this.titleInput.focus()})}renderUserSelection(t){let i=t.pendingRole,r=new Map([["admin","admin"],["editor","can edit"],["viewer","can view"],["remove","un-invite"]]),s=r.get(i);return to`
			<div class="user-selection">
				<div class="user-selection__avatar">
					<gl-avatar .src=${t.avatarUrl}></gl-avatar>
				</div>
				<div class="user-selection__info">
					<div class="user-selection__name">
						${t.member.name??t.member.username??"Unknown"}
					</div>
				</div>
				<div class="user-selection__actions">
					<gl-popover trigger="click" appearance="menu" ?arrow=${!1}>
						<gl-button slot="anchor">${s} <code-icon icon="chevron-down"></code-icon></gl-button>
						<menu-list slot="content">
							${rI(r,([r,s])=>to`<menu-item
										@click=${i=>this.onChangeSelectionRole(i,t,r)}
									>
										<code-icon
											icon="check"
											class="user-selection__check ${i===r?"is-active":""}"
										></code-icon>
										${s}
									</menu-item>`)}
						</menu-list>
					</gl-popover>
				</div>
			</div>
		`}renderUserSelectionList(){if(this.state?.create?.userSelections!=null&&this.state?.create?.userSelections.length!==0)return to`
			<div class="message-input">
				<div class="user-selection-container scrollable">
					${rP(this.state.create.userSelections,t=>t.member.id,t=>this.renderUserSelection(t))}
				</div>
			</div>
		`}renderForm(){let t;switch(this.draftVisibility){case"private":t="organization";break;case"invite_only":t="lock";break;default:t="globe"}let i=this.review?"Code Suggestion":"Cloud Patch",r=this.review?"Code Suggestions":"Cloud Patches";return to`
			<div class="section section--action">
				${rz(this.state?.create?.creationError!=null,()=>to` <div class="alert alert--error">
							<code-icon icon="error"></code-icon>
							<p class="alert__content">${this.state.create.creationError}</p>
						</div>`)}
				${rz(!1===this.review,()=>to`
						<div class="message-input message-input--group">
							<div class="message-input__select">
								<span class="message-input__select-icon"
									><code-icon icon=${t}></code-icon
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
						@input=${t=>this.onDebounceTitleInput(t)}
					/>
					${rz(this.state?.orgSettings.ai===!0&&this.state?.preferences.aiEnabled===!0,()=>to`<div class="message-input__menu">
								<gl-button
									id="generate-ai"
									appearance="toolbar"
									density="compact"
									tooltip="Generate Title and Description..."
									@click=${t=>this.onGenerateTitleClick(t)}
									?disabled=${this.generateBusy}
									><code-icon
										icon=${this.generateBusy?"loading":"sparkle"}
										modifier="${this.generateBusy?"spin":""}"
									></code-icon
								></gl-button>
							</div>`)}
				</div>

				${rz(this.generate?.error!=null,()=>to`
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
						@input=${t=>this.onDebounceDescriptionInput(t)}
					></textarea>
				</div>
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button ?disabled=${this.creationBusy} full @click=${t=>this.onCreateAll(t)}
							>Create ${i}</gl-button
						>
					</span>
				</p>
				${rz(!0===this.review,()=>to`
						<p class="button-container">
							<span class="button-group button-group--single">
								<gl-button appearance="secondary" full @click=${()=>this.onCancel()}
									>Cancel</gl-button
								>
							</span>
						</p>
					`)}
				${rz(this.state?.orgSettings.byob===!1,()=>to`<p class="h-deemphasize">
							<code-icon icon="lock"></code-icon>
							<a
								href="${lM.cloudPatches}"
								title="Learn more about ${r}"
								aria-label="Learn more about ${r}"
								>${r}</a
							>
							are
							<a
								href="https://help.gitkraken.com/gitlens/security"
								title="Learn more about GitKraken security"
								aria-label="Learn more about GitKraken security"
								>securely stored</a
							>
							by GitKraken.
						</p>`,()=>to`<p class="h-deemphasize">
							<code-icon icon="info"></code-icon>
							Your
							<a
								href="${lM.cloudPatches}"
								title="Learn more about ${r}"
								aria-label="Learn more about ${r}"
								>${i}</a
							>
							will be securely stored in your organization's self-hosted storage
						</p>`)}
			</div>
		`}render(){return to`
			<div class="pane-groups">
				<div class="pane-groups__group">${this.renderChangedFiles()}</div>
				<div class="pane-groups__group-fixed pane-groups__group--bottom">${this.renderForm()}</div>
			</div>
		`}renderChangedFiles(){return to`
			<webview-pane class="h-no-border" expanded>
				<span slot="title">${this.review?"Changes to Suggest":"Changes to Include"}</span>
				<action-nav slot="actions">${this.renderLayoutAction(this.fileLayout)}</action-nav>

				${rz(null!=this.validityMessage,()=>to`<div class="section">
							<div class="alert alert--error">
								<code-icon icon="error"></code-icon>
								<p class="alert__content">${this.validityMessage}</p>
							</div>
						</div>`)}
				<div class="change-list" data-region="files">
					${rz(null==this.create.changes,()=>this.renderLoading(),()=>this.renderTreeViewWithModel())}
				</div>
			</webview-pane>
		`}onTreeItemChecked(t){if(null==t.detail.context||t.detail.context.length<1)return;let[i,r]=t.detail.context,s=t.detail.checked;"unstaged"===r&&(s=!!t.detail.checked||"staged");let o=this.getChangeForRepo(i);null==o||o.checked!==s&&(o.checked=s,this.requestUpdate("state"),this.emit("gl-patch-create-repo-checked",{repoUri:i,checked:s}))}onTreeItemSelected(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-compare-previous",{...i})}renderTreeViewWithModel(){if(null==this.createChanges||0===this.createChanges.length)return this.renderTreeView([],"none","No changes");let t=[],i=this.createChanges.length>1,r=this.isTree(this.filesModified??0),s=this.isCompact;if(i)for(let i of this.createChanges){let o=this.getTreeForChange(i,!0,r,s);null!=o&&t.push(...o)}else{let i=this.createChanges[0],o=this.getTreeForChange(i,!1,r,s);null!=o&&t.push(...o)}return this.renderTreeView(t,this.state?.preferences?.indentGuides,"No changes")}getTreeForChange(t,i=!1,r=!1,s=!0){if(null==t.files||0===t.files.length)return;let o=[];if("wip"===t.type){let n=[],a=[];for(let i of t.files)i.staged?n.push(i):a.push(i);0===n.length||0===a.length?o.push(...this.renderFiles(t.files,r,s,i?2:1)):(a.length&&o.push({label:"Unstaged Changes",path:"",level:i?2:1,branch:!0,checkable:!0,expanded:!0,checked:!0===t.checked,context:[t.repository.uri,"unstaged"],children:this.renderFiles(a,r,s,i?3:2)}),n.length&&o.push({label:"Staged Changes",path:"",level:i?2:1,branch:!0,checkable:!0,expanded:!0,checked:!1!==t.checked,disableCheck:!0,children:this.renderFiles(n,r,s,i?3:2)}))}else o.push(...this.renderFiles(t.files,r,s));if(!i)return o;let n=this.repoToTreeModel(t.repository.name,t.repository.uri,{branch:!0,checkable:!0,checked:!1!==t.checked});return n.children=o,[n]}isTree(t){return"auto"===this.fileLayout?t>(this.state?.preferences?.files?.threshold??5):"tree"===this.fileLayout}createPatch(){if(!this.canSubmit){0===this.titleInput.value.length?(this.titleInput.setCustomValidity("Title is required"),this.titleInput.reportValidity(),this.titleInput.focus()):this.titleInput.setCustomValidity(""),null==this.selectedChanges||0===this.selectedChanges.length?this.validityMessage="Check at least one change":this.validityMessage=void 0;return}this.validityMessage=void 0,this.titleInput.setCustomValidity("");let t=this.selectedChanges.reduce((t,[i,r])=>(t[i]=r,t),{}),i={title:this.create.title??"",description:this.create.description,changesets:t,visibility:this.create.visibility,userSelections:this.create.userSelections};this.emit("gl-patch-create-patch",i)}onCreateAll(t){this.createPatch(),this.state?.create&&(this.creationBusy=!0)}onSelectCreateOption(t){}getChangeForRepo(t){return this.create.changes[t]}onTitleInput(t){this.create.title=this.titleInput.value,this.fireMetadataUpdate()}onDescriptionInput(t){this.create.description=this.descInput.value,this.fireMetadataUpdate()}onInviteUsers(t){this.emit("gl-patch-create-invite-users")}onChangeSelectionRole(t,i,r){this.emit("gl-patch-create-update-selection",{selection:i,role:r});let s=t.target?.closest("gl-popover");s?.hide()}onVisibilityChange(t){this.create.visibility=t.target.value,this.fireMetadataUpdate()}onGenerateTitleClick(t){this.generateBusy=!0,this.emit("gl-patch-generate-title",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}fireMetadataUpdate(){this.emit("gl-patch-create-update-metadata",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}createRenderRoot(){return this}onTreeItemActionClicked(t){if(t.detail.context&&t.detail.action)switch(t.detail.action.action){case"show-patch-in-graph":this.onShowInGraph(t);break;case"file-open":this.onOpenFile(t);break;case"file-stage":this.onStageFile(t);break;case"file-unstage":this.onUnstageFile(t)}}onOpenFile(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-open",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onStageFile(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-stage",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onUnstageFile(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-unstage",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onShowInGraph(t){}onCancel(){this.emit("gl-patch-create-cancelled")}getFileActions(t,i){let r={icon:"go-to-file",label:"Open File",action:"file-open"};return this.review?[r]:!0===t.staged?[r,{icon:"remove",label:"Unstage Changes",action:"file-unstage"}]:[r,{icon:"plus",label:"Stage Changes",action:"file-stage"}]}getRepoActions(t,i,r){return[{icon:"gl-graph",label:"Open in Commit Graph",action:"show-patch-in-graph"}]}};lq([t1({type:Object})],lH.prototype,"state",2),lq([t1({type:Boolean})],lH.prototype,"review",2),lq([t1({type:Object})],lH.prototype,"generate",2),lq([t2()],lH.prototype,"generateBusy",2),lq([t2()],lH.prototype,"creationBusy",2),lq([t5("#title")],lH.prototype,"titleInput",2),lq([t5("#desc")],lH.prototype,"descInput",2),lq([t5("#generate-ai")],lH.prototype,"generateAiButton",2),lq([t2()],lH.prototype,"validityMessage",2),lH=lq([tJ("gl-patch-create")],lH);var lV=Object.defineProperty,lK=Object.getOwnPropertyDescriptor,lW=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lK(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lV(i,r,n),n};let lG=class extends GlElement{constructor(){super(...arguments),this.indentPreference=16}get wipChangesCount(){return this.state?.create==null?0:Object.values(this.state.create.changes).reduce((t,i)=>t+=i.files?.length??0,0)}get wipChangeState(){if(this.state?.create==null)return;let t=Object.values(this.state.create.changes).reduce((t,i)=>(null!=i.files&&(t.files+=i.files.length,t.on.add(i.repository.uri)),t),{files:0,on:new Set});return{count:t.files,branches:[...t.on].join(", ")}}get mode(){return this.state?.mode??"view"}updateDocumentProperties(){let t=this.state?.preferences?.indent;t===this.indentPreference||(this.indentPreference=t??16,document.documentElement.style.setProperty("--gitlens-tree-indent",`${this.indentPreference}px`))}updated(t){t.has("state")&&this.updateDocumentProperties()}render(){return to`
			<div class="commit-detail-panel scrollable">
				<main id="main" tabindex="-1">
					${rz("view"===this.mode,()=>to`<gl-draft-details .state=${this.state} .explain=${this.explain}></gl-draft-details>`,()=>to`<gl-patch-create .state=${this.state} .generate=${this.generate}></gl-patch-create>`)}
				</main>
			</div>
		`}createRenderRoot(){return this}};lW([t1({type:Object})],lG.prototype,"state",2),lW([t1({type:Object})],lG.prototype,"explain",2),lW([t1({type:Object})],lG.prototype,"generate",2),lW([t1({attribute:!1,type:Object})],lG.prototype,"app",2),lG=lW([tJ("gl-patch-details-app")],lG);let lZ="0000000000000000000000000000000000000000";let PatchDetailsApp=class PatchDetailsApp extends App{constructor(){super("PatchDetailsApp"),this.debouncedAttachState=$(this.attachState.bind(this),100)}onInitialize(){this.debouncedAttachState()}onBind(){return[_.on("[data-switch-value]","click",t=>this.onToggleFilesLayout(t)),_.on('[data-action="ai-explain"]',"click",t=>this.onAIExplain(t)),_.on('[data-action="switch-ai"]',"click",t=>this.onSwitchAIModel(t)),_.on('[data-action="mode"]',"click",t=>this.onModeClicked(t)),_.on("gl-draft-details","gl-patch-apply-patch",t=>this.onApplyPatch(t.detail)),_.on("gl-draft-details","gl-draft-archive",t=>this.onArchiveDraft(t.detail.reason)),_.on("gl-patch-details-app","change-patch-base",t=>this.onChangePatchBase(t.detail)),_.on("gl-patch-details-app","select-patch-repo",t=>this.onSelectPatchRepo(t.detail)),_.on("gl-patch-details-app","gl-patch-details-graph-show-patch",t=>this.onShowPatchInGraph(t.detail)),_.on("gl-patch-details-app","gl-patch-create-patch",t=>this.onCreatePatch(t.detail)),_.on("gl-patch-details-app","gl-patch-share-local-patch",()=>this.onShareLocalPatch()),_.on("gl-draft-details","gl-patch-details-copy-cloud-link",()=>this.onCopyCloudLink()),_.on("gl-patch-create","gl-patch-create-invite-users",()=>this.onInviteUsers()),_.on("gl-draft-details","gl-patch-details-invite-users",()=>this.onInviteUsers()),_.on("gl-patch-create","gl-patch-create-update-selection",t=>this.onUpdateUserSelection(t.detail)),_.on("gl-draft-details","gl-patch-details-update-selection",t=>this.onUpdateUserSelection(t.detail)),_.on("gl-patch-create","gl-patch-create-repo-checked",t=>this.onCreateCheckRepo(t.detail)),_.on("gl-patch-create","gl-patch-generate-title",t=>this.onCreateGenerateTitle(t.detail)),_.on("gl-patch-create","gl-patch-create-update-metadata",t=>this.onCreateUpdateMetadata(t.detail)),_.on("gl-draft-details","gl-patch-details-update-metadata",t=>this.onDraftUpdateMetadata(t.detail)),_.on("gl-draft-details","gl-patch-details-update-permissions",()=>this.onDraftUpdatePermissions()),_.on("gl-patch-create,gl-draft-details","gl-patch-file-compare-previous",t=>this.onCompareFileWithPrevious(t.detail)),_.on("gl-patch-create,gl-draft-details","gl-patch-file-compare-working",t=>this.onCompareFileWithWorking(t.detail)),_.on("gl-patch-create,gl-draft-details","gl-patch-file-open",t=>this.onOpenFile(t.detail)),_.on("gl-draft-details","gl-patch-checked",t=>this.onPatchChecked(t.detail))]}onMessageReceived(t){switch(!0){case er.is(t):t.params.state,this.state=t.params.state,this.setState(this.state),this.debouncedAttachState();break;case es.is(t):case eo.is(t):case en.is(t):this.state={...this.state,...t.params},this.setState(this.state),this.debouncedAttachState(!0);break;case ea.is(t):{let i=this.state.draft,r=i.patches,s=r.findIndex(i=>i.id===t.params.patch.id);r.splice(s,1,t.params.patch),this.state={...this.state,draft:i},this.setState(this.state),this.debouncedAttachState(!0);break}default:super.onMessageReceived?.(t)}}onPatchChecked(t){this.sendCommand(j,t)}onCreateCheckRepo(t){this.sendCommand(G,t)}onCreateUpdateMetadata(t){this.sendCommand(X,t)}async onCreateGenerateTitle(t){try{let t=await this.sendRequest(ei,void 0);t.error?this.component.generate={error:{message:t.error.message??"Error retrieving content"}}:t.title||t.description?(this.component.generate={title:t.title,description:t.description},this.state={...this.state,create:{...this.state.create,title:t.title??this.state.create?.title,description:t.description??this.state.create?.description}},this.setState(this.state),this.debouncedAttachState()):this.component.generate=void 0}catch{this.component.generate={error:{message:"Error retrieving content"}}}}onDraftUpdateMetadata(t){this.sendCommand(Q,t)}onDraftUpdatePermissions(){this.sendCommand(Y,void 0)}onShowPatchInGraph(t){}onCreatePatch(t){this.sendCommand(P,t)}onShareLocalPatch(){this.sendCommand(W,void 0)}onCopyCloudLink(){this.sendCommand(K,void 0)}onModeClicked(t){let i=t.target?.dataset.actionValue??void 0;i!==this.state.mode&&this.sendCommand(V,{mode:i})}onApplyPatch(t){null!=t.selectedPatches&&0!==t.selectedPatches.length&&this.sendCommand(A,{details:t.draft,target:t.target??"current",selected:t.selectedPatches})}onArchiveDraft(t){this.sendCommand(T,{reason:t})}onChangePatchBase(t){this.sendCommand(O,void 0)}onSelectPatchRepo(t){this.sendCommand(M,void 0)}onCommandClickedCore(t){let i=t?.startsWith("command:")?t.slice(8):t;null!=i&&this.sendCommand(eh,{command:i})}onSwitchAIModel(t){this.onCommandClickedCore("gitlens.ai.switchProvider")}async onAIExplain(t){try{let t=await this.sendRequest(et,void 0);t.error?this.component.explain={error:{message:t.error.message??"Error retrieving content"}}:this.component.explain=t}catch{this.component.explain={error:{message:"Error retrieving content"}}}}onToggleFilesLayout(t){let i=t.target?.dataset.switchValue??void 0;if(i===this.state.preferences.files?.layout)return;let r={...this.state.preferences.files,layout:i??"auto",compact:this.state.preferences.files?.compact??!0,threshold:this.state.preferences.files?.threshold??5,icon:this.state.preferences.files?.icon??"type"};this.state={...this.state,preferences:{...this.state.preferences,files:r}},this.debouncedAttachState(),this.sendCommand(q,{files:r})}onInviteUsers(){this.sendCommand(J,void 0)}onUpdateUserSelection(t){this.sendCommand(ee,t)}onOpenFileOnRemote(t){this.sendCommand(F,t)}onOpenFile(t){this.sendCommand(B,t)}onCompareFileWithWorking(t){this.sendCommand(N,t)}onCompareFileWithPrevious(t){this.sendCommand(U,t)}onFileMoreActions(t){this.sendCommand(D,t)}get component(){return null==this._component&&(this._component=document.getElementById("app"),this._component.app=this),this._component}attachState(t){this.component.state=this.state}};new PatchDetailsApp;export{PatchDetailsApp,lZ as uncommittedSha};