let e,t,i,r,o,s,a,c,h,p;var u,g,b,m,f,v,w,x,_,$,C={379(e){function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,r="",o=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)i=e.charCodeAt(c);else if(47===i)break;else i=47;if(47===i){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){var h=r.lastIndexOf("/");if(h!==r.length-1){-1===h?(r="",o=0):o=(r=r.slice(0,h)).length-1-r.lastIndexOf("/"),s=c,a=0;continue}}else if(2===r.length||1===r.length){r="",o=0,s=c,a=0;continue}}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(s+1,c):r=e.slice(s+1,c),o=c-s-1;s=c,a=0}else 46===i&&-1!==a?++a:a=-1}return r}var r={resolve:function(){for(var e,r,o="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?r=arguments[a]:(void 0===e&&(e=process.cwd()),r=e),t(r),0!==r.length&&(o=r+"/"+o,s=47===r.charCodeAt(0));if(o=i(o,!s),s)if(o.length>0)return"/"+o;else return"/";return o.length>0?o:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return(0!==(e=i(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r)?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var o=arguments[i];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=r.resolve(e))===(i=r.resolve(i)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var s=e.length,a=s-o,c=1;c<i.length&&47===i.charCodeAt(c);++c);for(var h=i.length-c,p=a<h?a:h,u=-1,g=0;g<=p;++g){if(g===p){if(h>p){if(47===i.charCodeAt(c+g))return i.slice(c+g+1);else if(0===g)return i.slice(c+g)}else a>p&&(47===e.charCodeAt(o+g)?u=g:0===g&&(u=0));break}var b=e.charCodeAt(o+g);if(b!==i.charCodeAt(c+g))break;47===b&&(u=g)}var m="";for(g=o+u+1;g<=s;++g)(g===s||47===e.charCodeAt(g))&&(0===m.length?m+="..":m+="/..");return m.length>0?m+i.slice(c+u):(c+=u,47===i.charCodeAt(c)&&++c,i.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),r=47===i,o=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(i=e.charCodeAt(a))){if(!s){o=a;break}}else s=!1;return -1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var r,o=0,s=-1,a=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var c=i.length-1,h=-1;for(r=e.length-1;r>=0;--r){var p=e.charCodeAt(r);if(47===p){if(!a){o=r+1;break}}else -1===h&&(a=!1,h=r+1),c>=0&&(p===i.charCodeAt(c)?-1==--c&&(s=r):(c=-1,s=h))}return o===s?s=h:-1===s&&(s=e.length),e.slice(o,s)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!a){o=r+1;break}}else -1===s&&(a=!1,s=r+1);return -1===s?"":e.slice(o,s)},extname:function(e){t(e);for(var i=-1,r=0,o=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47===h){if(!s){r=c+1;break}continue}-1===o&&(s=!1,o=c+1),46===h?-1===i?i=c:1!==a&&(a=1):-1!==i&&(a=-1)}return -1===i||-1===o||0===a||1===a&&i===o-1&&i===r+1?"":e.slice(i,o)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i,r={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return r;var o=e.charCodeAt(0),s=47===o;s?(r.root="/",i=1):i=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,g=0;u>=i;--u){if(47===(o=e.charCodeAt(u))){if(!p){c=u+1;break}continue}-1===h&&(p=!1,h=u+1),46===o?-1===a?a=u:1!==g&&(g=1):-1!==a&&(g=-1)}return -1===a||-1===h||0===g||1===g&&a===h-1&&a===c+1?-1!==h&&(0===c&&s?r.base=r.name=e.slice(1,h):r.base=r.name=e.slice(c,h)):(0===c&&s?(r.name=e.slice(1,a),r.base=e.slice(1,h)):(r.name=e.slice(c,a),r.base=e.slice(c,h)),r.ext=e.slice(a,h)),c>0?r.dir=e.slice(0,c-1):s&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r}},S={};function P(e){var t=S[e];if(void 0!==t)return t.exports;var i=S[e]={exports:{}};return C[e](i,i.exports,P),i.exports}P.m=C,P.d=(e,t)=>{for(var i in t)P.o(t,i)&&!P.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},P.f={},P.e=e=>Promise.all(Object.keys(P.f).reduce((t,i)=>(P.f[i](e,t),t),[])),P.u=e=>"lib-billboard.js",P.miniCssF=e=>{},P.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch{if("object"==typeof window)return window}}(),P.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),P.p="#{root}/dist/webviews/",Object.defineProperty(P,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(e){}}),u={122:0},g=e=>{var t,i,{__webpack_esm_ids__:r,__webpack_esm_modules__:o,__webpack_esm_runtime__:s}=e,a=0;for(t in o)P.o(o,t)&&(P.m[t]=o[t]);for(s&&s(P);a<r.length;a++)i=r[a],P.o(u,i)&&u[i]&&u[i][0](),u[r[a]]=0},P.f.j=(e,t)=>{var i=P.o(u,e)?u[e]:void 0;if(0!==i)if(i)t.push(i[1]);else{var r=import(P.p+P.u(e)).then(g,t=>{throw 0!==u[e]&&(u[e]=void 0),t}),r=Promise.race([r,new Promise(t=>i=u[e]=[t])]);t.push(i[1]=r)}};let E=globalThis,A=E.ShadowRoot&&(void 0===E.ShadyCSS||E.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,T=Symbol(),D=new WeakMap;let n=class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==T)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(A&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=D.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&D.set(t,e))}return e}toString(){return this.cssText}};let O=e=>new n("string"==typeof e?e:e+"",void 0,T),M=(e,...t)=>new n(1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]),e,T),B=A?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return O(t)})(e):e,{is:F,defineProperty:N,getOwnPropertyDescriptor:j,getOwnPropertyNames:W,getOwnPropertySymbols:V,getPrototypeOf:U}=Object,q=globalThis,K=q.trustedTypes,G=K?K.emptyScript:"",Y=q.reactiveElementPolyfillSupport,X={toAttribute(e,t){switch(t){case Boolean:e=e?G:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},J=(e,t)=>!F(e,t),Q={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Q){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&N(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:o}=j(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let s=r?.call(this);o?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Q}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=U(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...W(e),...V(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let i of new Set(e.flat(1/0).reverse()))t.unshift(B(i));else void 0!==e&&t.push(B(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(A)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),r=E.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){let o=(void 0!==i.converter?.toAttribute?i.converter:X).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){let e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:X;this._$Em=r;let s=o.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){let s=this.constructor;if(!1===r&&(o=this[e]),!(((i??=s.getPropertyOptions(e)).hasChanged??J)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e){let{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,Y?.({ReactiveElement:y}),(q.reactiveElementVersions??=[]).push("2.1.2");let ee=globalThis,et=e=>e,ei=ee.trustedTypes,er=ei?ei.createPolicy("lit-html",{createHTML:e=>e}):void 0,eo="$lit$",es=`lit$${Math.random().toFixed(9).slice(2)}$`,en="?"+es,ea=`<${en}>`,el=document,ec=()=>el.createComment(""),eh=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ed=Array.isArray,ep=e=>ed(e)||"function"==typeof e?.[Symbol.iterator],eu=`[ 	
\x0c\r]`,eg=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,eb=/-->/g,em=/>/g,ef=RegExp(`>|${eu}(?:([^\\s"'>=/]+)(${eu}*=${eu}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ev=/'/g,ey=/"/g,ew=/^(?:script|style|textarea|title)$/i,ex=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),e_=ex(1),ek=ex(2),e$=(ex(3),Symbol.for("lit-noChange")),eC=Symbol.for("lit-nothing"),eS=new WeakMap,eP=el.createTreeWalker(el,129);function eE(e,t){if(!ed(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==er?er.createHTML(t):t}let eA=(e,t)=>{let i=e.length-1,r=[],o,s=2===t?"<svg>":3===t?"<math>":"",a=eg;for(let t=0;t<i;t++){let i=e[t],c,h,p=-1,u=0;for(;u<i.length&&(a.lastIndex=u,null!==(h=a.exec(i)));)u=a.lastIndex,a===eg?"!--"===h[1]?a=eb:void 0!==h[1]?a=em:void 0!==h[2]?(ew.test(h[2])&&(o=RegExp("</"+h[2],"g")),a=ef):void 0!==h[3]&&(a=ef):a===ef?">"===h[0]?(a=o??eg,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?ef:'"'===h[3]?ey:ev):a===ey||a===ev?a=ef:a===eb||a===em?a=eg:(a=ef,o=void 0);let g=a===ef&&e[t+1].startsWith("/>")?" ":"";s+=a===eg?i+ea:p>=0?(r.push(c),i.slice(0,p)+eo+i.slice(p)+es+g):i+es+(-2===p?t:g)}return[eE(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};let lit_html_S=class lit_html_S{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,s=0,a=e.length-1,c=this.parts,[h,p]=eA(e,t);if(this.el=lit_html_S.createElement(h,i),eP.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=eP.nextNode())&&c.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(let e of r.getAttributeNames())if(e.endsWith(eo)){let t=p[s++],i=r.getAttribute(e).split(es),a=/([.?@])?(.*)/.exec(t);c.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),r.removeAttribute(e)}else e.startsWith(es)&&(c.push({type:6,index:o}),r.removeAttribute(e));if(ew.test(r.tagName)){let e=r.textContent.split(es),t=e.length-1;if(t>0){r.textContent=ei?ei.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],ec()),eP.nextNode(),c.push({type:2,index:++o});r.append(e[t],ec())}}}else if(8===r.nodeType)if(r.data===en)c.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(es,e+1));)c.push({type:7,index:o}),e+=es.length-1}o++}}static createElement(e,t){let i=el.createElement("template");return i.innerHTML=e,i}};function eT(e,t,i=e,r){if(t===e$)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl,s=eh(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(e))._$AT(e,i,r),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=eT(e,o._$AS(e,t.values),o,r)),t}let R=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??el).importNode(t,!0);eP.currentNode=r;let o=eP.nextNode(),s=0,a=0,c=i[0];for(;void 0!==c;){if(s===c.index){let t;2===c.type?t=new k(o,o.nextSibling,this,e):1===c.type?t=new c.ctor(o,c.name,c.strings,this,e):6===c.type&&(t=new Z(o,this,e)),this._$AV.push(t),c=i[++a]}s!==c?.index&&(o=eP.nextNode(),s++)}return eP.currentNode=el,r}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=eC,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){eh(e=eT(this,e,t))?e===eC||null==e||""===e?(this._$AH!==eC&&this._$AR(),this._$AH=eC):e!==this._$AH&&e!==e$&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):ep(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==eC&&eh(this._$AH)?this._$AA.nextSibling.data=e:this.T(el.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=lit_html_S.createElement(eE(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new R(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=eS.get(e.strings);return void 0===t&&eS.set(e.strings,t=new lit_html_S(e)),t}k(e){ed(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let o of e)r===t.length?t.push(i=new k(this.O(ec()),this.O(ec()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=et(e).nextSibling;et(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=eC,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=eC}_$AI(e,t=this,i,r){let o=this.strings,s=!1;if(void 0===o)(s=!eh(e=eT(this,e,t,0))||e!==this._$AH&&e!==e$)&&(this._$AH=e);else{let r,a,c=e;for(e=o[0],r=0;r<o.length-1;r++)(a=eT(this,c[i+r],t,r))===e$&&(a=this._$AH[r]),s||=!eh(a)||a!==this._$AH[r],a===eC?e=eC:e!==eC&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}s&&!r&&this.j(e)}j(e){e===eC?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===eC?void 0:e}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==eC)}};let z=class z extends H{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=eT(this,e,t,0)??eC)===e$)return;let i=this._$AH,r=e===eC&&i!==eC||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==eC&&(i===eC||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};let Z=class Z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){eT(this,e)}};let eR=ee.litHtmlPolyfillSupport;eR?.(lit_html_S,k),(ee.litHtmlVersions??=[]).push("3.3.2");let ez=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{let r=i?.renderBefore??t,o=r._$litPart$;if(void 0===o){let e=i?.renderBefore??null;r._$litPart$=o=new k(t.insertBefore(ec(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return e$}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,ez.litElementHydrateSupport?.({LitElement:lit_element_i});let eD=ez.litElementPolyfillSupport;eD?.({LitElement:lit_element_i}),(ez.litElementVersions??=[]).push("4.2.2");let eO=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},eI={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:J};function eM(e){return(t,i)=>{let r;return"object"==typeof i?((e=eI,t,i)=>{let{kind:r,metadata:o}=i,s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===r){let{name:r}=i;return{set(i){let o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){let{name:r}=i;return function(i){let o=this[r];t.call(this,i),this.requestUpdate(r,o,e,!0,i)}}throw Error("Unsupported decorator location: "+r)})(e,t,i):(r=t.hasOwnProperty(i),t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0)}}function eL(e){return eM({...e,state:!0,attribute:!1})}let eB=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);function eF(e,t){return(i,r,o)=>{let s=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:a}="object"==typeof r?i:o??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return eB(i,r,{get(){let e=t.call(this);return void 0===e&&(null!==(e=s(this))||this.hasUpdated)&&a.call(this,e),e}})}return eB(i,r,{get(){return s(this)}})}}let eN=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,ej=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,eW=[["year",629856e5,31536e6,"yr"],["month",2628e6,2628e6,"mo"],["week",6048e5,6048e5,"wk"],["day",864e5,864e5,"d"],["hour",36e5,36e5,"h"],["minute",6e4,6e4,"m"],["second",1e3,1e3,"s"]],eV=new Map,eU=new Map;function eH(e,t){let i=new Date(e.getTime());for(let[e,r]of Object.entries(t))if(r)switch(e){case"years":i.setFullYear(i.getFullYear()+r);break;case"months":i.setMonth(i.getMonth()+r);break;case"days":i.setDate(i.getDate()+r);break;case"hours":i.setHours(i.getHours()+r);break;case"minutes":i.setMinutes(i.getMinutes()+r);break;case"seconds":i.setSeconds(i.getSeconds()+r)}return i}function eq(t,i,r,o=!0){i=i??void 0;let s=`${r??""}:${i}`,a=eV.get(s);if(null==a){let t=function(e){if(null==e)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};let t=ej.exec(e);if(t?.groups!=null){let{dateStyle:e,timeStyle:i}=t.groups;return{localeMatcher:"best fit",dateStyle:e||"full",timeStyle:i||void 0}}let i={localeMatcher:"best fit"};for(let{groups:t}of e.matchAll(eN))if(null!=t){for(let[e,r]of Object.entries(t))if(null!=r)switch(e){case"year":i.year=4===r.length?"numeric":"2-digit";break;case"month":switch(r.length){case 4:i.month="long";break;case 3:i.month="short";break;case 2:i.month="2-digit";break;case 1:i.month="numeric"}break;case"day":"DD"===r?i.day="2-digit":i.day="numeric";break;case"weekday":switch(r.length){case 4:i.weekday="long";break;case 3:i.weekday="short";break;case 2:i.weekday="narrow"}break;case"hour":i.hour=2===r.length?"2-digit":"numeric",i.hour12="hh"===r||"h"===r;break;case"minute":i.minute=2===r.length?"2-digit":"numeric";break;case"second":i.second=2===r.length?"2-digit":"numeric";break;case"fractionalSecond":i.fractionalSecondDigits=3;break;case"dayPeriod":i.dayPeriod="narrow",i.hour12=!0,i.hourCycle="h12";break;case"timeZoneName":i.timeZoneName=2===r.length?"long":"short"}}return i}(i);a=new Intl.DateTimeFormat(null==r?e:"system"===r?void 0:[r],t),o&&eV.set(s,a)}if(null==i||ej.test(i))return a.format(t);let c=a.formatToParts(t);return i.replace(eN,(i,s,a,h,p,u,g,b,m,f,v,w,x,_,$)=>{if(null!=s)return s.substring(1,s.length-1);for(let[i,s]of Object.entries($)){if(null==s)continue;let a=c.find(e=>e.type===i);if("Do"===s&&a?.type==="day")return function(e){let t=e%100;return`${e}${eK[(t-20)%10]??eK[t]??eK[0]}`}(Number(a.value));if("a"===s&&a?.type==="dayPeriod"){let i=(function(t){let i=`${r??""}:time:${t}`,s=eV.get(i);if(null==s){let a;a=null==r?e:"system"===r?void 0:[r],s=new Intl.DateTimeFormat(a,{localeMatcher:"best fit",timeStyle:t}),o&&eV.set(i,s)}return s})("short").formatToParts(t).find(e=>"dayPeriod"===e.type);return` ${(i??a)?.value??""}`}return a?.value??""}return""})}let eK=["th","st","nd","rd"];function eG(t,i){t??="decimal";let r=`${i??""}:${t}`,o=eU.get(r);if(null==o){let s={localeMatcher:"best fit",style:t};o=new Intl.NumberFormat(null==i?e:"system"===i?void 0:[i],s),eU.set(r,o)}return o.format}var eY=((b=eY||{})[b.VerificationRequired=-1]="VerificationRequired",b[b.Community=0]="Community",b[b.DeprecatedPreview=1]="DeprecatedPreview",b[b.DeprecatedPreviewExpired=2]="DeprecatedPreviewExpired",b[b.Trial=3]="Trial",b[b.TrialExpired=4]="TrialExpired",b[b.TrialReactivationEligible=5]="TrialReactivationEligible",b[b.Paid=6]="Paid",b);let eZ=["student","pro","advanced","teams","enterprise"];function eX(e){var t;return t=e.plan.actual.id,eZ.includes(t)}let context_request_event_s=class context_request_event_s extends Event{constructor(e,t,i,r){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=i,this.subscribe=r??!1}};let context_consumer_s=class context_consumer_s{constructor(e,t,i,r){(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,void 0!==t.context)?(this.context=t.context,this.callback=t.callback,this.subscribe=t.subscribe??!1):(this.context=t,this.callback=i,this.subscribe=r??!1),this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new context_request_event_s(this.context,this.host,this.t,this.subscribe))}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}};let context_provider_e=class context_provider_e extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(e,t,i){super(void 0!==t.context?t.initialValue:i),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:i}]of this.subscriptions)t.has(e)||(t.add(e),i.dispatchEvent(new context_request_event_s(this.context,i,e,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new context_provider_e(this.context,this.host))}};function eJ({context:e}){return(t,i)=>{let r=new WeakMap;if("object"==typeof i)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new context_provider_i(this,{context:e,initialValue:t})),t}};{let o;t.constructor.addInitializer(t=>{r.set(t,new context_provider_i(t,{context:e}))});let s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){let e=new WeakMap;o={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=s.set;o={...s,set(t){r.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,i,o)}}}function eQ({context:e,subscribe:t}){return(i,r)=>{"object"==typeof r?r.addInitializer(function(){new context_consumer_s(this,{context:e,callback:e=>{i.set.call(this,e)},subscribe:t})}):i.constructor.addInitializer(i=>{new context_consumer_s(i,{context:e,callback:e=>{i[r]=e},subscribe:t})})}}var e0=Object.defineProperty,e1=(e,t,i)=>{let r;return(r="symbol"!=typeof t?t+"":t)in e?e0(e,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[r]=i,i},e2=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},e5=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},e4=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot access private method");return i};function e6(e,t){return Object.is(e,t)}let e3=null,e8=!1,e7=1,e9=Symbol("SIGNAL");function te(e){let t=e3;return e3=e,t}let tt={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ti(e){if(e8)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===e3)return;e3.consumerOnSignalRead(e);let t=e3.nextProducerIndex++;ts(e3),t<e3.producerNode.length&&e3.producerNode[t]!==e&&to(e3)&&tr(e3.producerNode[t],e3.producerIndexOfThis[t]),e3.producerNode[t]!==e&&(e3.producerNode[t]=e,e3.producerIndexOfThis[t]=to(e3)?function e(t,i,r){var o;if(tn(t),ts(t),0===t.liveConsumerNode.length){null==(o=t.watched)||o.call(t.wrapper);for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=e(t.producerNode[i],t,i)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(i)-1}(e,e3,t):0),e3.producerLastReadVersion[t]=e.version}function tr(e,t){var i;if(tn(e),ts(e),"u">typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(i=e.unwatched)||i.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)tr(e.producerNode[t],e.producerIndexOfThis[t])}let r=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[r],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[r],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let i=e.liveConsumerIndexOfThis[t],r=e.liveConsumerNode[t];ts(r),r.producerIndexOfThis[i]=t}}function to(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function ts(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function tn(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function ta(e){if(function e(t){if(t.dirty||t.lastCleanEpoch!==e7){if(!t.producerMustRecompute(t)&&!function(t){ts(t);for(let i=0;i<t.producerNode.length;i++){let r=t.producerNode[i],o=t.producerLastReadVersion[i];if(o!==r.version||(e(r),o!==r.version))return!0}return!1}(t)){t.dirty=!1,t.lastCleanEpoch=e7;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=e7}}(e),ti(e),e.value===th)throw e.error;return e.value}let tl=Symbol("UNSET"),tc=Symbol("COMPUTING"),th=Symbol("ERRORED"),td={...tt,value:tl,dirty:!0,error:null,equal:e6,producerMustRecompute:e=>e.value===tl||e.value===tc,producerRecomputeValue(e){let t;if(e.value===tc)throw Error("Detected cycle in computations.");let i=e.value;e.value=tc;let r=(e&&(e.nextProducerIndex=0),te(e)),o=!1;try{t=e.computation.call(e.wrapper),o=i!==tl&&i!==th&&e.equal.call(e.wrapper,i,t)}catch(i){t=th,e.error=i}finally{if(te(r),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(to(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)tr(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}if(o){e.value=i;return}e.value=t,e.version++}},tp=function(){throw Error()};function tu(){return ti(this),this.value}let tg={...tt,equal:e6,value:void 0},tb=Symbol("node");(e=>{var t,i,r,o;let State=class State{constructor(r,o={}){let s,a;e5(this,i),e1(this,t);let c=((s=Object.create(tg)).value=r,(a=()=>(ti(s),s.value))[e9]=s,a)[e9];if(this[tb]=c,c.wrapper=this,o){let t=o.equals;t&&(c.equal=t),c.watched=o[e.subtle.watched],c.unwatched=o[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return tu.call(this[tb])}set(t){var i,r;if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(e8)throw Error("Writes to signals not permitted during Watcher callback");i=this[tb],(null==e3?void 0:e3.consumerAllowSignalWrites)===!1&&tp(),i.equal.call(i.wrapper,i.value,t)||(i.value=t,r=i,r.version++,e7++,function e(t){if(void 0===t.liveConsumerNode)return;let i=e8;e8=!0;try{for(let i of t.liveConsumerNode)i.dirty||function(t){var i;t.dirty=!0,e(t),null==(i=t.consumerMarkedDirty)||i.call(t.wrapper??t)}(i)}finally{e8=i}}(r))}};t=tb,i=new WeakSet,e.isState=e=>"object"==typeof e&&e2(i,e),e.State=State;let Computed=class Computed{constructor(t,i){let s,a;e5(this,o),e1(this,r);let c=((s=Object.create(td)).computation=t,(a=()=>ta(s))[e9]=s,a)[e9];if(c.consumerAllowSignalWrites=!0,this[tb]=c,c.wrapper=this,i){let t=i.equals;t&&(c.equal=t),c.watched=i[e.subtle.watched],c.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return ta(this[tb])}};r=tb,o=new WeakSet,e.isComputed=e=>"object"==typeof e&&e2(o,e),e.Computed=Computed,(t=>{var i,r,o,s;t.untrack=function(e){let t,i=null;try{i=te(null),t=e()}finally{te(i)}return t},t.introspectSources=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(i=t[tb].producerNode)?void 0:i.map(e=>e.wrapper))??[]},t.introspectSinks=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called introspectSinks without a Signal argument");return(null==(i=t[tb].liveConsumerNode)?void 0:i.map(e=>e.wrapper))??[]},t.hasSinks=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called hasSinks without a Signal argument");let i=t[tb].liveConsumerNode;return!!i&&i.length>0},t.hasSources=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called hasSources without a Computed or Watcher argument");let i=t[tb].producerNode;return!!i&&i.length>0};let Watcher=class Watcher{constructor(e){e5(this,r),e5(this,o),e1(this,i);let t=Object.create(tt);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[tb]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");e4(this,o,s).call(this,t);let i=this[tb];i.dirty=!1;let r=te(i);for(let e of t)ti(e[tb]);te(r)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");e4(this,o,s).call(this,t);let i=this[tb];ts(i);for(let e=i.producerNode.length-1;e>=0;e--)if(t.includes(i.producerNode[e].wrapper)){tr(i.producerNode[e],i.producerIndexOfThis[e]);let t=i.producerNode.length-1;if(i.producerNode[e]=i.producerNode[t],i.producerIndexOfThis[e]=i.producerIndexOfThis[t],i.producerNode.length--,i.producerIndexOfThis.length--,i.nextProducerIndex--,e<i.producerNode.length){let t=i.producerIndexOfThis[e],r=i.producerNode[e];tn(r),r.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[tb].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}};i=tb,r=new WeakSet,o=new WeakSet,s=function(t){for(let i of t)if(!(0,e.isComputed)(i)&&!(0,e.isState)(i))throw TypeError("Called watch/unwatch without a Computed or State argument")},e.isWatcher=e=>e2(r,e),t.Watcher=Watcher,t.currentComputed=function(){var e;return null==(e=e3)?void 0:e.wrapper},t.watched=Symbol("watched"),t.unwatched=Symbol("unwatched")})(e.subtle||(e.subtle={}))})(w||(w={}));let tm=!1,tf=new w.subtle.Watcher(()=>{tm||(tm=!0,queueMicrotask(()=>{for(let e of(tm=!1,tf.getPending()))e.get();tf.watch()}))}),tv=Symbol("SignalWatcherBrand"),ty=new FinalizationRegistry(e=>{e.unwatch(...w.subtle.introspectSources(e))}),tw=new WeakMap;function tx(e){return!0===e[tv]?e:class extends e{constructor(){super(...arguments),this._$St=new Map,this._$So=new w.State(0),this._$Si=!1}_$Sl(){var e,t;let i=[],r=[];this._$St.forEach((e,t)=>{((null==e?void 0:e.beforeUpdate)?i:r).push(t)});let o=null==(e=this.h)?void 0:e.getPending().filter(e=>e!==this._$Su&&!this._$St.has(e));i.forEach(e=>e.get()),null==(t=this._$Su)||t.get(),o.forEach(e=>e.get()),r.forEach(e=>e.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(void 0!==this.h)return;this._$Su=new w.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new w.subtle.Watcher(function(){let e=tw.get(this);void 0!==e&&(!1===e._$Si&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});tw.set(e,this),ty.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(void 0===this.h)return;let e=!1;this.h.unwatch(...w.subtle.introspectSources(this.h).filter(t=>{var i;let r=!0!==(null==(i=this._$St.get(t))?void 0:i.manualDispose);return r&&this._$St.delete(t),e||(e=!r),r})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,t){var i;this._$S_();let r=new w.Computed(()=>{e()});return this.h.watch(r),this._$St.set(r,t),null!=(i=null==t?void 0:t.beforeUpdate)&&i?w.subtle.untrack(()=>r.get()):this.updateComplete.then(()=>w.subtle.untrack(()=>r.get())),()=>{this._$St.delete(r),this.h.unwatch(r),!1===this.isConnected&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{!1===this.isConnected&&this._$Sp()})}}}let t_=e=>(...t)=>({_$litDirective$:e,values:t});let directive_i=class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let{I:tk}={M:eo,P:es,A:en,C:1,L:eA,R,D:ep,V:eT,I:k,H,N:L,U:z,B:I,F:Z},t$=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),t$(e,t);return!0},tC=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},tS=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),tA(t)}};function tP(e){void 0!==this._$AN?(tC(this),this._$AM=e,tS(this)):this._$AM=e}function tE(e,t=!1,i=0){let r=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(r))for(let e=i;e<r.length;e++)t$(r[e],!1),tC(r[e]);else null!=r&&(t$(r,!1),tC(r));else t$(this,e)}let tA=e=>{2==e.type&&(e._$AP??=tE,e._$AQ??=tP)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),tS(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(t$(this,e),tC(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let tT=!1,tR=new w.subtle.Watcher(async()=>{tT||(tT=!0,queueMicrotask(()=>{for(let e of(tT=!1,tR.getPending()))e.get();tR.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var e,t;void 0===this._$Sm&&(this._$Sj=new w.Computed(()=>{var e;let t=null==(e=this._$SW)?void 0:e.get();return this.setValue(t),t}),this._$Sm=null!=(t=null==(e=this._$Sk)?void 0:e.h)?t:tR,this._$Sm.watch(this._$Sj),w.subtle.untrack(()=>{var e;return null==(e=this._$Sj)?void 0:e.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return w.subtle.untrack(()=>e.get())}update(e,[t]){var i;return null!=this._$Sk||(this._$Sk=null==(i=e.options)?void 0:i.host),t!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=t,this._$S_(),w.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tz=t_(watch_r),tD=e=>(t,...i)=>e(t,...i.map(e=>e instanceof w.State||e instanceof w.Computed?tz(e):e));tD(e_),tD(ek),w.State,w.Computed;let tO=(e,t)=>new w.State(e,t),tI=(e,t)=>new w.Computed(e,t),{fromCharCode:tM}=String;new TextEncoder;let tL=new TextDecoder;let IpcCall=class IpcCall{constructor(e,t,i=!1){this.scope=e,this.reset=i,this.method=`${e}/${t}`}is(e){return e.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(e,t,i){super(e,t,i),this.response=new IpcNotification(this.scope,`${t}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let tB=new IpcRequest("core","webview/ready"),tF=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tN=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tj=new IpcCommand("core","telemetry/sendEvent"),tW=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let tV=new IpcCommand("core","webview/focus/didChange"),tU=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let tH=new WeakMap;function tq(e,t){return function(i,r,o){let s=tH.get(i.constructor);null==s&&tH.set(i.constructor,s=[]),s.push({method:o.value,keys:Array.isArray(e)?e:[e],afterFirstUpdate:t?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(e,t,i){let r=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:t});return this.dispatchEvent(r),r}update(e){let t=tH.get(this.constructor);if(null!=t)for(let{keys:i,method:r,afterFirstUpdate:o}of t){if(o&&!this.hasUpdated)continue;let t=i.filter(t=>e.has(t));t.length&&r.call(this,t)}super.update(e)}};let tK=(p=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,e=>{let t=0;for(p.lastIndex=0;p.test(e);)t+=1;return e.length-t}),tG=e=>12288===e||e>=65281&&e<=65376||e>=65504&&e<=65510,tY=e=>8987===e||9001===e||e>=12272&&e<=12287||e>=12289&&e<=12350||e>=12441&&e<=12543||e>=12549&&e<=12591||e>=12593&&e<=12686||e>=12688&&e<=12771||e>=12783&&e<=12830||e>=12832&&e<=12871||e>=12880&&e<=19903||e>=65040&&e<=65049||e>=65072&&e<=65106||e>=65108&&e<=65126||e>=65128&&e<=65131||e>=127488&&e<=127490||e>=127504&&e<=127547||e>=127552&&e<=127560||e>=131072&&e<=196605||e>=196608&&e<=262141,tZ=/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\u001b\]8;[^;]*;.*?(?:\u0007|\u001b\u005c)/y,tX=/[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y,tJ=/(?:(?![\uFF61-\uFF9F\uFF00-\uFFEF])[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Tangut}]){1,1000}/yu,tQ=/\t{1,1000}/y,t0=/[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu,t1=/(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y,t2=/\p{M}+/gu,t5={limit:1/0,ellipsis:""},t4=(e,t={},i={})=>{let r=t.limit??1/0,o=t.ellipsis??"",s=t?.ellipsisWidth??(o?t4(o,t5,i).width:0),a=i.controlWidth??0,c=i.tabWidth??8,h=i.emojiWidth??2,p=i.regularWidth??1,u=i.wideWidth??2,g=[[t1,p],[tZ,0],[tX,a],[tQ,c],[t0,h],[tJ,u]],b=0,m=0,f=e.length,v=0,w=!1,x=f,_=Math.max(0,r-s),$=0,C=0,S=0,P=0;e:for(;;){if(C>$||m>=f&&m>b){for(let t of(v=0,(e.slice($,C)||e.slice(b,m)).replaceAll(t2,""))){let e=t.codePointAt(0)||0;if(S+(P=tG(e)?2:tY(e)?u:p)>_&&(x=Math.min(x,Math.max($,b)+v)),S+P>r){w=!0;break e}v+=t.length,S+=P}$=C=0}if(m>=f)break;for(let t=0,i=g.length;t<i;t++){let[i,o]=g[t];if(i.lastIndex=m,i.test(e)){if(S+(P=(v=i===tJ?tK(e.slice(m,i.lastIndex)):i===t0?1:i.lastIndex-m)*o)>_&&(x=Math.min(x,m+Math.floor((_-S)/o))),S+P>r){w=!0;break e}S+=P,$=b,C=m,m=b=i.lastIndex;continue e}}m+=1}return{width:w?_:S,index:w?x:f,truncated:w,ellipsed:w&&r>=s}},t6={ellipsisWidth:0,limit:0x40000000-1},t3={controlWidth:0,emojiWidth:2,regularWidth:1,wideWidth:2};function t8(e,t,r){let o;if(null==r)return i??=eG(),`${i(t)} ${e}${1===t?"":"s"}`;let s=1===t?e:r.plural??`${e}s`;return r.only?s:(0===t?o=r.zero??t:!1===r.format?o=t:null!=r.format?o=r.format(t):(i??=eG(),o=i(t)),`${o}${r.infix??" "}${s}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let t7=/T/,t9=/.*\s*?at\s(.+?)\s/,ie=/^_+/,it=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(e,t=!1){this.#t={...e,sanitizeKeys:new Set([...it,...e.sanitizeKeys??[]])},this.#i=t,this.#e=e.createChannel(e.name),this.#r=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(e=>{this.#r=e})}enabled(e){return!!this.isDebugging||0!==this.#r&&(null==e||this.#r<=function(e){switch(e){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(e))}#i=!1;get isDebugging(){return this.#i}#r=0;get logLevel(){var e=this.#r;switch(e){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(t7," ").slice(0,-1)}]`}trace(e,...t){let i;(0!==this.#r&&!(this.#r>1)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.trace(`  ${i??""}${this.#o(!0,t)}`))}debug(e,...t){let i;(0!==this.#r&&!(this.#r>2)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.debug(`  ${i??""}${this.#o(!1,t)}`))}info(e,...t){let i;(0!==this.#r&&!(this.#r>3)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.info(`   ${i??""}${this.#o(!1,t)}`))}warn(e,...t){let i;(0!==this.#r&&!(this.#r>4)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.warn(`${i??""}${this.#o(!1,t)}`))}error(e,t,...i){let r;if((0===this.#r||this.#r>5)&&!this.isDebugging)return;if(null==(r=null==t||"string"==typeof t?t:`${t.prefix} ${i.shift()??""}`)){let t=e instanceof Error?e.stack:void 0;if(t){let e=t9.exec(t);null!=e&&(r=e[1])}}this.isDebugging;let o=`  ${r??""}${this.#o(!1,i)}`;null!=e?this.#e?.error(String(e),o):this.#e?.error(o)}showOutputChannel(e){this.#e?.show?.(e)}toLoggable(e,t){if(null!=t){let i=this.sanitize(t,e);if(null!=i)return i}if("function"==typeof e)return"<function>";if(null==e||"object"!=typeof e||e instanceof Error)return String(e);if(Array.isArray(e)){let t=e.length>10?e.slice(0,10):e,i=e.length>10?`, \u2026+${e.length-10}`:"";return`[${t.map(e=>this.toLoggable(e)).join(", ")}${i}]`}let i=this.#t?.toLoggable,r=i?.(e);if(null!=r)return r;let o=this.#t?.sanitizeKeys;try{return JSON.stringify(e,(e,t)=>{if(95!==e.charCodeAt(0))return o?.has(e)?this.sanitize(e,t):""===e||"object"!=typeof t||null==t||Array.isArray(t)?t:t instanceof Error?String(t):i?.(t)??t})}catch{return"<error>"}}sanitize(e,t){if(null==t)return;let i=e.replace(ie,"")||e;if(this.#t?.sanitizeKeys?.has(i))return null!=this.#t.hash?`<${i}:${this.#t.hash("string"==typeof t?t:JSON.stringify(t))}>`:`<${i}>`}#o(e,t){if(0===t.length||e&&(0===this.#r||this.#r>2)&&!this.isDebugging)return"";let i=t.map(e=>this.toLoggable(e)).join(", ");return 0!==i.length?` \u2014 ${i}`:""}};let ii=new Logger,ir=new WeakMap,io={enabled:e=>ii.enabled(e),log:(e,t,i,...r)=>{switch(e){case"error":ii.error(void 0,t,i,...r);break;case"warn":t?.warn(i,...r);break;case"info":t?.info(i,...r);break;case"debug":default:t?.debug(i,...r);break;case"trace":t?.trace(i,...r)}}},is=new Map;function ia(e,t){let i=r;r=e.scopeId,is.set(e.scopeId,e);try{return t()}finally{r=i,is.delete(e.scopeId)}}function il(){return null!=r?is.get(r):void 0}let ic=0x40000000-1;function ih(){let e=0;return{get current(){return e},next:function(){return e===ic&&(e=0),++e},reset:function(){e=0}}}function id(e){let t=.001*performance.now(),i=Math.floor(t),r=Math.floor(t%1*1e9);return void 0!==e&&(i-=e[0],(r-=e[1])<0&&(i--,r+=1e9)),[i,r]}function ip(e){let[t,i]=id(e);return 1e3*t+Math.floor(i/1e6)}let iu=ih();function ig(e,t,i){var r;let o,s,a={scopeId:e,prevScopeId:t,prefix:i,enabled:e=>ii.enabled(e),addExitInfo:function(...e){(o??=[]).push(...e)},setFailed:function(e){s=e},getExitInfo:function(){return{details:o?.length?` \u2022 ${o.join(", ")}`:void 0,failed:s}}};return ib(a,"trace",ii.trace),ib(a,"debug",ii.debug),ib(a,"info",ii.info),ib(a,"warn",ii.warn),Object.defineProperty(r=a,"error",{configurable:!0,enumerable:!0,get:function(){let e=(e,t,...i)=>ii.error(e,r,t,...i);return Object.defineProperty(r,"error",{value:e,writable:!1,enumerable:!0}),e}}),a}function ib(e,t,i){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){let r=i.bind(ii,e);return Object.defineProperty(e,t,{value:r,writable:!1,enumerable:!0}),r}})}function im(e,t,i){if(null!=i){let r=null==t?e.toString(16):`${t.toString(16)} \u2192 ${e.toString(16)}`;return null==r?`[${i.padEnd(13)}]`:`[${i}${r.padStart(13-i.length)}]`}return null==t?`[${e.toString(16).padStart(13)}]`:`[${t.toString(16).padStart(5)} \u2192 ${e.toString(16).padStart(5)}]`}function iv(){let e=il();if(null==e)return;let t=Object.create(e);return t[Symbol.dispose]=()=>{},t}function iy(e,t,i){if(null!=t&&"boolean"!=typeof t)return ig(t.scopeId,t.prevScopeId,`${t.prefix}${e}`);let r=t?il()?.scopeId:void 0,o=iu.next();return ig(o,r,`${im(o,r,i)} ${e}`)}function iw(e,t,i,...r){switch(t){case"trace":ii.trace(e,i,...r);break;case"info":ii.info(e,i,...r);break;default:ii.debug(e,i,...r)}}let LoggerContext=class LoggerContext{constructor(e){this.scope=iy(e,void 0),ii.configure({name:e,createChannel:function(e){let t=ii.isDebugging?function(e){}:function(e){};return{name:e,logLevel:0,trace:t,debug:t,info:t,warn:t,error:t}}},!1)}trace(e,...t){"string"==typeof e?ii.trace(this.scope,e,...t):ii.trace(e,t.shift(),...t)}debug(e,...t){"string"==typeof e?ii.debug(this.scope,e,...t):ii.debug(e,t.shift(),...t)}info(e,...t){"string"==typeof e?ii.info(this.scope,e,...t):ii.info(e,t.shift(),...t)}};let ix=new IpcNotification("home","subscription/didChange"),i_="graph";new IpcCommand(i_,"chooseRepository"),new IpcCommand(i_,"dblclick"),new IpcCommand(i_,"avatars/get"),new IpcCommand(i_,"refs/metadata/get"),new IpcCommand(i_,"rows/get"),new IpcCommand(i_,"pullRequest/openDetails"),new IpcCommand(i_,"row/action"),new IpcCommand(i_,"search/openInView"),new IpcCommand(i_,"search/cancel"),new IpcCommand(i_,"columns/update"),new IpcCommand(i_,"refs/update/visibility"),new IpcCommand(i_,"filters/update/excludeTypes"),new IpcCommand(i_,"configuration/update"),new IpcCommand(i_,"search/update/mode"),new IpcCommand(i_,"filters/update/includedRefs"),new IpcCommand(i_,"filters/reset"),new IpcCommand(i_,"selection/update"),new IpcRequest(i_,"jumpToHead"),new IpcRequest(i_,"chooseRef"),new IpcRequest(i_,"chooseComparison"),new IpcRequest(i_,"chooseAuthor"),new IpcRequest(i_,"chooseFile"),new IpcRequest(i_,"scope/resolve"),new IpcRequest(i_,"rows/ensure"),new IpcRequest(i_,"search/history/get"),new IpcRequest(i_,"search/history/store"),new IpcRequest(i_,"search/history/delete"),new IpcRequest(i_,"counts"),new IpcRequest(i_,"overview/get"),new IpcRequest(i_,"overview/wip/get"),new IpcRequest(i_,"overview/enrichment/get"),new IpcRequest(i_,"agentSessions/get"),new IpcRequest(i_,"wip/stats/get"),new IpcCommand(i_,"wip/watches/sync"),new IpcNotification(i_,"wip/stale/didChange"),new IpcRequest(i_,"row/hover/get"),new IpcRequest(i_,"search"),new IpcNotification(i_,"overview/didChange"),new IpcNotification(i_,"overview/wip/didChange"),new IpcNotification(i_,"agentSessions/didChange"),new IpcNotification(i_,"repositories/integration/didChange"),new IpcNotification(i_,"didChange",!0),new IpcNotification(i_,"configuration/didChange");let ik=new IpcNotification(i_,"subscription/didChange");new IpcNotification(i_,"org/settings/didChange"),new IpcNotification(i_,"avatars/didChange"),new IpcNotification(i_,"mcp/didChange"),new IpcNotification(i_,"agents/canInstallClaudeHook/didChange"),new IpcNotification(i_,"branchState/didChange"),new IpcNotification(i_,"refs/didChangeMetadata"),new IpcNotification(i_,"columns/didChange"),new IpcNotification(i_,"scrollMarkers/didChange"),new IpcNotification(i_,"refs/didChangeVisibility"),new IpcNotification(i_,"rows/didChange"),new IpcNotification(i_,"rows/stats/didChange"),new IpcNotification(i_,"selection/didChange"),new IpcNotification(i_,"compareMode/didRequestOpen"),new IpcNotification(i_,"workingTree/didChange"),new IpcNotification(i_,"didSearch"),new IpcNotification(i_,"didFetch"),new IpcNotification(i_,"featurePreview/didStart");let i$=new IpcNotification("timeline","didChange");let PromosContext=class PromosContext{constructor(e){this.disposables=[],this._promos=new Map,this.ipc=e,this.disposables.push(this.ipc.onReceiveMessage(e=>{(ix.is(e)||ik.is(e)||i$.is(e))&&this._promos.clear()}))}async getApplicablePromo(e,t){let i=`${e}|${t}`,r=this._promos.get(i);return null==r&&(r=this.ipc.sendRequest(tN,{plan:e,location:t}).then(e=>e.promo,()=>void 0),this._promos.set(i,r)),await r}dispose(){this.disposables.forEach(e=>e.dispose())}};let TelemetryContext=class TelemetryContext{constructor(e){this.disposables=[],this.ipc=e}sendEvent(e){this.ipc.sendCommand(tj,e)}dispose(){this.disposables.forEach(e=>e.dispose())}};function iC(e){return(e=e.toString().toLowerCase()).includes("ms")?parseFloat(e):e.includes("s")?1e3*parseFloat(e):parseFloat(e)}function iS(e,t){return new Promise(i=>{e.addEventListener(t,function r(o){o.target===e&&(e.removeEventListener(t,r),i())})})}function iP(e,t,i){let r,o,s,a,c,h,p,u,g,b,m=0;null!=i&&({edges:h,maxWait:p,cancellation:u,aggregator:g}=i);let f="leading"===(h??="trailing")||"both"===h,v="trailing"===h||"both"===h;function w(){if(null!=r){m=Date.now();let t=r,i=b;return b=void 0,r=void 0,s=e.apply(i,t)}}function x(){null!=a&&(clearTimeout(a),a=void 0)}function _(){null!=c&&(clearTimeout(c),c=void 0)}function $(){x(),_(),b=void 0,r=void 0,o=void 0,m=0}function C(...e){if(u?.aborted)return;let i=Date.now();null!=g&&null!=r?r=g(r,e):(b=this,r=e);let h=null==a&&null==c;o=i,x();let _=Date.now();if(o=_,a=setTimeout(()=>{a=void 0,function e(){let i,r,s=Date.now();if(i=s-(o??0),r=s-m,null==o||i>=t||i<0||null!=p&&r>=p){v&&w(),$();return}a=setTimeout(()=>{a=void 0,e()},t-(s-(o??0)))}()},t),null!=p&&!c){0===m&&(m=_);let e=p-(_-m);e>0?c=setTimeout(()=>{c=void 0,v&&null!=r&&w(),m=Date.now()},e):(v&&null!=r&&w(),$())}return f&&h?w():s}return C.cancel=$,C.flush=function(){return x(),_(),w()},C.pending=function(){return null!=a||null!=c},u?.addEventListener("abort",$,{once:!0}),C}(x||(x={})).on=function(e,t,i,r){let o=!1;if("string"==typeof e){let s=function(t){let r=t?.target?.closest(e);null!=r&&i(t,r)};return document.addEventListener(t,s,r??!0),{dispose:()=>{o||(o=!0,document.removeEventListener(t,s,r??!0))}}}let s=function(e){i(e,this)};return e.addEventListener(t,s,r??!1),{dispose:()=>{o||(o=!0,e.removeEventListener(t,s,r??!1))}}};var iE=Uint8Array,iA=Uint16Array,iT=Int32Array,iR=new iE([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),iz=new iE([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),iD=new iE([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),iO=function(e,t){for(var i=new iA(31),r=0;r<31;++r)i[r]=t+=1<<e[r-1];for(var o=new iT(i[30]),r=1;r<30;++r)for(var s=i[r];s<i[r+1];++s)o[s]=s-i[r]<<5|r;return{b:i,r:o}},iI=iO(iR,2),iM=iI.b,iL=iI.r;iM[28]=258,iL[258]=28;var iB=iO(iz,0),iF=iB.b;iB.r;for(var iN=new iA(32768),ij=0;ij<32768;++ij){var iW=(43690&ij)>>1|(21845&ij)<<1;iW=(61680&(iW=(52428&iW)>>2|(13107&iW)<<2))>>4|(3855&iW)<<4,iN[ij]=((65280&iW)>>8|(255&iW)<<8)>>1}for(var iV=function(e,t,i){for(var r,o=e.length,s=0,a=new iA(t);s<o;++s)e[s]&&++a[e[s]-1];var c=new iA(t);for(s=1;s<t;++s)c[s]=c[s-1]+a[s-1]<<1;if(i){r=new iA(1<<t);var h=15-t;for(s=0;s<o;++s)if(e[s])for(var p=s<<4|e[s],u=t-e[s],g=c[e[s]-1]++<<u,b=g|(1<<u)-1;g<=b;++g)r[iN[g]>>h]=p}else for(s=0,r=new iA(o);s<o;++s)e[s]&&(r[s]=iN[c[e[s]-1]++]>>15-e[s]);return r},iU=new iE(288),ij=0;ij<144;++ij)iU[ij]=8;for(var ij=144;ij<256;++ij)iU[ij]=9;for(var ij=256;ij<280;++ij)iU[ij]=7;for(var ij=280;ij<288;++ij)iU[ij]=8;for(var iH=new iE(32),ij=0;ij<32;++ij)iH[ij]=5;var iq=iV(iU,9,1),iK=iV(iH,5,1),iG=function(e){for(var t=e[0],i=1;i<e.length;++i)e[i]>t&&(t=e[i]);return t},iY=function(e,t,i){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&i},iZ=function(e,t){var i=t/8|0;return(e[i]|e[i+1]<<8|e[i+2]<<16)>>(7&t)},iX=function(e,t,i){return(null==t||t<0)&&(t=0),(null==i||i>e.length)&&(i=e.length),new iE(e.subarray(t,i))},iJ=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],iQ=function(e,t,i){var r=Error(t||iJ[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,iQ),!i)throw r;return r},i0=function(e,t,i,r){var o=e.length,s=r?r.length:0;if(!o||t.f&&!t.l)return i||new iE(0);var a=!i,c=a||2!=t.i,h=t.i;a&&(i=new iE(3*o));var p=function(e){var t=i.length;if(e>t){var r=new iE(Math.max(2*t,e));r.set(i),i=r}},u=t.f||0,g=t.p||0,b=t.b||0,m=t.l,f=t.d,v=t.m,w=t.n,x=8*o;do{if(!m){u=iY(e,g,1);var _=iY(e,g+1,3);if(g+=3,_)if(1==_)m=iq,f=iK,v=9,w=5;else if(2==_){var $=iY(e,g,31)+257,C=iY(e,g+10,15)+4,S=$+iY(e,g+5,31)+1;g+=14;for(var P=new iE(S),E=new iE(19),A=0;A<C;++A)E[iD[A]]=iY(e,g+3*A,7);g+=3*C;for(var T=iG(E),D=(1<<T)-1,O=iV(E,T,1),A=0;A<S;){var M=O[iY(e,g,D)];g+=15&M;var B=M>>4;if(B<16)P[A++]=B;else{var F=0,N=0;for(16==B?(N=3+iY(e,g,3),g+=2,F=P[A-1]):17==B?(N=3+iY(e,g,7),g+=3):18==B&&(N=11+iY(e,g,127),g+=7);N--;)P[A++]=F}}var j=P.subarray(0,$),W=P.subarray($);v=iG(j),w=iG(W),m=iV(j,v,1),f=iV(W,w,1)}else iQ(1);else{var B=((g+7)/8|0)+4,V=e[B-4]|e[B-3]<<8,U=B+V;if(U>o){h&&iQ(0);break}c&&p(b+V),i.set(e.subarray(B,U),b),t.b=b+=V,t.p=g=8*U,t.f=u;continue}if(g>x){h&&iQ(0);break}}c&&p(b+131072);for(var q=(1<<v)-1,K=(1<<w)-1,G=g;;G=g){var F=m[iZ(e,g)&q],Y=F>>4;if((g+=15&F)>x){h&&iQ(0);break}if(F||iQ(2),Y<256)i[b++]=Y;else if(256==Y){G=g,m=null;break}else{var X=Y-254;if(Y>264){var A=Y-257,J=iR[A];X=iY(e,g,(1<<J)-1)+iM[A],g+=J}var Q=f[iZ(e,g)&K],ee=Q>>4;Q||iQ(3),g+=15&Q;var W=iF[ee];if(ee>3){var J=iz[ee];W+=iZ(e,g)&(1<<J)-1,g+=J}if(g>x){h&&iQ(0);break}c&&p(b+131072);var et=b+X;if(b<W){var ei=s-W,er=Math.min(W,et);for(ei+b<0&&iQ(3);b<er;++b)i[b]=r[ei+b]}for(;b<et;++b)i[b]=i[b-W]}}t.l=m,t.p=G,t.b=b,t.f=u,m&&(u=1,t.m=v,t.d=f,t.n=w)}while(!u)return b!=i.length&&a?iX(i,0,b):i.subarray(0,b)},i1=new iE(0),i2="u">typeof TextDecoder&&new TextDecoder;try{i2.decode(i1,{stream:!0})}catch{}var i5=function(e){for(var t="",i=0;;){var r=e[i++],o=(r>127)+(r>223)+(r>239);if(i+o>e.length)return{s:t,r:iX(e,i-1)};o?3==o?t+=String.fromCharCode(55296|(r=((15&r)<<18|(63&e[i++])<<12|(63&e[i++])<<6|63&e[i++])-65536)>>10,56320|1023&r):1&o?t+=String.fromCharCode((31&r)<<6|63&e[i++]):t+=String.fromCharCode((15&r)<<12|(63&e[i++])<<6|63&e[i++]):t+=String.fromCharCode(r)}};function i4(e,t){if(t){for(var i="",r=0;r<e.length;r+=16384)i+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return i}if(i2)return i2.decode(e);var o=i5(e),s=o.s,i=o.r;return i.length&&iQ(8),s}"function"==typeof queueMicrotask&&queueMicrotask;let i6=/\(([\s\S]*)\)/,i3=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,i8=/\s?=.*$/;function i7(e){var t,i;let r,o,s,a,c,h,p,u,g;return t="debug",c=!1,h=!0,null!=(i=e)&&({args:r,when:o,exit:s,prefix:a,onlyExit:c=!1,timing:h=!0}=i),p="object"==typeof h?h.warnAfter:1500,u=!1!==h||"object"==typeof c&&c.after>0,g="trace"===t?ii.trace:"debug"===t?ii.debug:ii.info,(e,i,h)=>{let b,m;if("function"==typeof h.value?(b=h.value,m="value"):"function"==typeof h.get&&(b=h.get,m="get"),null==b||null==m)throw Error("Not supported");let f=null==r?function(e){if("function"!=typeof e)throw Error("Not supported");if(0===e.length)return[];let t=Function.prototype.toString.call(e),i=(t=(t=t.replace(i3,"")||t).slice(0,t.indexOf("{"))).indexOf("("),r=t.indexOf(")");i=i>=0?i+1:0,r=r>0?r:t.indexOf("="),t=t.slice(i,r),t=`(${t})`;let o=i6.exec(t);return null!=o?o[1].split(",").map(e=>e.trim().replace(i8,"")):[]}(b):[];h[m]=function(...e){let h;if(!ii.enabled()||null!=o&&!o.apply(this,e))return b.apply(this,e);let m=ii.enabled(t),v=iv(),w=v?.scopeId,x=iu.next(),_=this!=null?function(e){let t;if("function"==typeof e){if(null==(t=e.prototype?.constructor))return e.name}else t=e.constructor;let i=t?.name??"",r=i.indexOf("_");-1!==r&&(i=i.substring(r+1));let o=t;for(;null!=o;){let t=ir.get(o);if(null!=t)return t(e,i);o=Object.getPrototypeOf(o)}return i}(this):void 0,$=_?`${im(x,w)} ${_}.${i}`:`${im(x,w)} ${i}`;null!=a&&($=a({id:x,instance:this,instanceName:_??"",name:i,prefix:$},...e));let C=ig(x,w,$),S=!1,P=()=>(S||(S=!0,h=function(e,t,i){if(!1===e||!t.length)return;if("function"==typeof e){let i=e(...t);if(!1===i)return;let r="";for(let[e,t]of Object.entries(i))r.length&&(r+=", "),r+=`${e}=${ii.toLoggable(t,e)}`;return r||void 0}let r="",o=-1;for(let e of t){let t=i[++o];r.length&&(r+=", "),r+=t?`${t}=${ii.toLoggable(e,t)}`:ii.toLoggable(e)}return r||void 0}(r,e,f)),h);if(!c&&m){let e=P();g.call(ii,e?`${$}(${e})`:$)}if(c||u||null!=s){let t=u?id():void 0,i=e=>{let i=void 0!==t?` [${ip(t)}ms]`:"",r=C.getExitInfo();if(c){let t=P();ii.error(e,t?`${$}(${t})`:$,r?.details?`failed${r.details}${i}`:`failed${i}`)}else ii.error(e,$,r?.details?`failed${r.details}${i}`:`failed${i}`)},r=e=>{let i,r,o,a;null!=t?(i=ip(t))>p?(r=ii.warn,o=` [*${i}ms] (slow)`):(r=g,o=` [${i}ms]`):(o="",r=g);let h=C.getExitInfo();if(null!=s)if("function"==typeof s)try{a=s(e)}catch(e){a=`@log.exit error: ${e}`}else!0===s&&(a=`returned ${ii.toLoggable(e)}`);else h?.failed?(a=h.failed,r=(e,...t)=>ii.error(null,e,...t)):a="completed";if(m||r!==g){let e=P();c?(!0===c||0===c.after||i>c.after)&&r.call(ii,e?`${$}(${e}) ${a}${h?.details||""}${o}`:`${$} ${a}${h?.details||""}${o}`):r.call(ii,e?`${$}(${e}) ${a}${h?.details||""}${o}`:`${$} ${a}${h?.details||""}${o}`)}};return ia(C,()=>{var t;let o;try{o=b.apply(this,e)}catch(e){throw i(e),e}return null!=o&&null!=(t=o)&&(t instanceof Promise||"function"==typeof t?.then)?o.then(r,i).catch(()=>{}):r(o),o})}return ia(C,()=>b.apply(this,e))}}}globalThis.scheduler?.yield?.bind(globalThis.scheduler),Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(e,t,...i){let r;this._stopped=!1,this.logScope=null!=e&&"string"!=typeof e?e:iy(e??"",!1,t?.scopeLabel);let o=t?.log;if(r=null==o||!0===o?{}:!1===o||o.onlyExit?void 0:o,this.logLevel=("object"==typeof o?o.level:void 0)??"debug",this.logProvider=t?.provider??io,this._time=id(),null!=r){if(!this.logProvider.enabled(this.logLevel))return;i.length?this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`,...i):this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return ip(this._time)}log(e){this.logCore(e,!1)}restart(e){this.logCore(e,!0),this._time=id(),this._stopped=!1}stop(e){this._stopped||(this.restart(e),this._stopped=!0)}logCore(e,t){if(!this.logProvider.enabled(this.logLevel))return;if(!t)return void this.logProvider.log(this.logLevel,this.logScope,`${e?.message??""}${e?.suffix??""}`);let i=ip(this._time),r=e?.message??"";this.logProvider.log(i>250?"warn":this.logLevel,this.logScope,`${r?`${r} `:""}[${i}ms]${e?.suffix??""}`)}};(()=>{let e;var t,i,r={975:e=>{function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,r="",o=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)i=e.charCodeAt(c);else{if(47===i)break;i=47}if(47===i){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){var h=r.lastIndexOf("/");if(h!==r.length-1){-1===h?(r="",o=0):o=(r=r.slice(0,h)).length-1-r.lastIndexOf("/"),s=c,a=0;continue}}else if(2===r.length||1===r.length){r="",o=0,s=c,a=0;continue}}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(s+1,c):r=e.slice(s+1,c),o=c-s-1;s=c,a=0}else 46===i&&-1!==a?++a:a=-1}return r}var r={resolve:function(){for(var e,r,o="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?e=arguments[a]:(void 0===r&&(r=process.cwd()),e=r),t(e),0!==e.length&&(o=e+"/"+o,s=47===e.charCodeAt(0));return o=i(o,!s),s?o.length>0?"/"+o:"/":o.length>0?o:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return 0!==(e=i(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var o=arguments[i];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=r.resolve(e))===(i=r.resolve(i)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var s=e.length,a=s-o,c=1;c<i.length&&47===i.charCodeAt(c);++c);for(var h=i.length-c,p=a<h?a:h,u=-1,g=0;g<=p;++g){if(g===p){if(h>p){if(47===i.charCodeAt(c+g))return i.slice(c+g+1);if(0===g)return i.slice(c+g)}else a>p&&(47===e.charCodeAt(o+g)?u=g:0===g&&(u=0));break}var b=e.charCodeAt(o+g);if(b!==i.charCodeAt(c+g))break;47===b&&(u=g)}var m="";for(g=o+u+1;g<=s;++g)g!==s&&47!==e.charCodeAt(g)||(0===m.length?m+="..":m+="/..");return m.length>0?m+i.slice(c+u):(c+=u,47===i.charCodeAt(c)&&++c,i.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),r=47===i,o=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(i=e.charCodeAt(a))){if(!s){o=a;break}}else s=!1;return -1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var r,o=0,s=-1,a=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var c=i.length-1,h=-1;for(r=e.length-1;r>=0;--r){var p=e.charCodeAt(r);if(47===p){if(!a){o=r+1;break}}else -1===h&&(a=!1,h=r+1),c>=0&&(p===i.charCodeAt(c)?-1==--c&&(s=r):(c=-1,s=h))}return o===s?s=h:-1===s&&(s=e.length),e.slice(o,s)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!a){o=r+1;break}}else -1===s&&(a=!1,s=r+1);return -1===s?"":e.slice(o,s)},extname:function(e){t(e);for(var i=-1,r=0,o=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47!==h)-1===o&&(s=!1,o=c+1),46===h?-1===i?i=c:1!==a&&(a=1):-1!==i&&(a=-1);else if(!s){r=c+1;break}}return -1===i||-1===o||0===a||1===a&&i===o-1&&i===r+1?"":e.slice(i,o)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return i;var r,o=e.charCodeAt(0),s=47===o;s?(i.root="/",r=1):r=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,g=0;u>=r;--u)if(47!==(o=e.charCodeAt(u)))-1===h&&(p=!1,h=u+1),46===o?-1===a?a=u:1!==g&&(g=1):-1!==a&&(g=-1);else if(!p){c=u+1;break}return -1===a||-1===h||0===g||1===g&&a===h-1&&a===c+1?-1!==h&&(i.base=i.name=0===c&&s?e.slice(1,h):e.slice(c,h)):(0===c&&s?(i.name=e.slice(1,a),i.base=e.slice(1,h)):(i.name=e.slice(c,a),i.base=e.slice(c,h)),i.ext=e.slice(a,h)),c>0?i.dir=e.slice(0,c-1):s&&(i.dir="/"),i},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,s),i.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(s.r(a),s.d(a,{URI:()=>l,Utils:()=>i}),"object"==typeof process)?e="win32"===process.platform:"object"==typeof navigator&&(e=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function u(e,t){if(!e.scheme&&t)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!c.test(e.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!h.test(e.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(e.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let g=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(e){return e instanceof l||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString}scheme;authority;path;query;fragment;constructor(e,t,i,r,o,s=!1){"object"==typeof e?(this.scheme=e.scheme||"",this.authority=e.authority||"",this.path=e.path||"",this.query=e.query||"",this.fragment=e.fragment||""):(this.scheme=e||s?e:"file",this.authority=t||"",this.path=function(e,t){switch(e){case"https":case"http":case"file":t?"/"!==t[0]&&(t="/"+t):t="/"}return t}(this.scheme,i||""),this.query=r||"",this.fragment=o||"",u(this,s))}get fsPath(){return w(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:i,path:r,query:o,fragment:s}=e;return void 0===t?t=this.scheme:null===t&&(t=""),void 0===i?i=this.authority:null===i&&(i=""),void 0===r?r=this.path:null===r&&(r=""),void 0===o?o=this.query:null===o&&(o=""),void 0===s?s=this.fragment:null===s&&(s=""),t===this.scheme&&i===this.authority&&r===this.path&&o===this.query&&s===this.fragment?this:new d(t,i,r,o,s)}static parse(e,t=!1){let i=g.exec(e);return i?new d(i[2]||"",C(i[4]||""),C(i[5]||""),C(i[7]||""),C(i[9]||""),t):new d("","","","","")}static file(t){let i="";if(e&&(t=t.replace(/\\/g,"/")),"/"===t[0]&&"/"===t[1]){let e=t.indexOf("/",2);-1===e?(i=t.substring(2),t="/"):(i=t.substring(2,e),t=t.substring(e)||"/")}return new d("file",i,t,"","")}static from(e){let t=new d(e.scheme,e.authority,e.path,e.query,e.fragment);return u(t,!0),t}toString(e=!1){return x(this,e)}toJSON(){return this}static revive(e){if(e){if(e instanceof l)return e;{let t=new d(e);return t._formatted=e.external,t._fsPath=e._sep===b?e.fsPath:null,t}}return e}};let b=e?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=w(this,!1)),this._fsPath}toString(e=!1){return e?x(this,!0):(this._formatted||(this._formatted=x(this,!1)),this._formatted)}toJSON(){let e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=b),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}};let m={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function f(e,t,i){let r,o=-1;for(let s=0;s<e.length;s++){let a=e.charCodeAt(s);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||t&&47===a||i&&91===a||i&&93===a||i&&58===a)-1!==o&&(r+=encodeURIComponent(e.substring(o,s)),o=-1),void 0!==r&&(r+=e.charAt(s));else{void 0===r&&(r=e.substr(0,s));let t=m[a];void 0!==t?(-1!==o&&(r+=encodeURIComponent(e.substring(o,s)),o=-1),r+=t):-1===o&&(o=s)}}return -1!==o&&(r+=encodeURIComponent(e.substring(o))),void 0!==r?r:e}function v(e){let t;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);35===r||63===r?(void 0===t&&(t=e.substr(0,i)),t+=m[r]):void 0!==t&&(t+=e[i])}return void 0!==t?t:e}function w(t,i){let r;return r=t.authority&&t.path.length>1&&"file"===t.scheme?`//${t.authority}${t.path}`:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&90>=t.path.charCodeAt(1)||t.path.charCodeAt(1)>=97&&122>=t.path.charCodeAt(1))&&58===t.path.charCodeAt(2)?i?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,e&&(r=r.replace(/\//g,"\\")),r}function x(e,t){let i=t?v:f,r="",{scheme:o,authority:s,path:a,query:c,fragment:h}=e;if(o&&(r+=o,r+=":"),(s||"file"===o)&&(r+="/",r+="/"),s){let e=s.indexOf("@");if(-1!==e){let t=s.substr(0,e);s=s.substr(e+1),-1===(e=t.lastIndexOf(":"))?r+=i(t,!1,!1):(r+=i(t.substr(0,e),!1,!1),r+=":",r+=i(t.substr(e+1),!1,!0)),r+="@"}-1===(e=(s=s.toLowerCase()).lastIndexOf(":"))?r+=i(s,!1,!0):(r+=i(s.substr(0,e),!1,!0),r+=s.substr(e))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let e=a.charCodeAt(1);e>=65&&e<=90&&(a=`/${String.fromCharCode(e+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let e=a.charCodeAt(0);e>=65&&e<=90&&(a=`${String.fromCharCode(e+32)}:${a.substr(2)}`)}r+=i(a,!0,!1)}return c&&(r+="?",r+=i(c,!1,!1)),h&&(r+="#",r+=t?h:f(h,!1,!1)),r}let $=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function C(e){return e.match($)?e.replace($,e=>(function e(t){try{return decodeURIComponent(t)}catch{return t.length>3?t.substr(0,3)+e(t.substr(3)):t}})(e)):e}var S=s(975);let P=S.posix||S;(t=i||(i={})).joinPath=function(e,...t){return e.with({path:P.join(e.path,...t)})},t.resolvePath=function(e,...t){let i=e.path,r=!1;"/"!==i[0]&&(i="/"+i,r=!0);let o=P.resolve(i,...t);return r&&"/"===o[0]&&!e.authority&&(o=o.substring(1)),e.with({path:o})},t.dirname=function(e){if(0===e.path.length||"/"===e.path)return e;let t=P.dirname(e.path);return 1===t.length&&46===t.charCodeAt(0)&&(t=""),e.with({path:t})},t.basename=function(e){return P.basename(e.path)},t.extname=function(e){return P.extname(e.path)},_=a})();let{URI:i9,Utils:re}=_;function rt(e,t){return JSON.parse(e,(e,i)=>(function(e,t){let i=function(e){if("object"!=typeof e||null==e)return;let t=e.__ipc;if(null!=t)switch(t){case"date":return"number"==typeof e.value?e:void 0;case"promise":return"object"==typeof e.value&&"string"==typeof e.value.id&&"string"==typeof e.value.method?e:void 0;case"uri":return"object"==typeof e.value&&"string"==typeof e.value?.scheme?e:void 0;default:return}}(e);if(null==i)return e;switch(i.__ipc){case"date":return new Date(i.value);case"promise":return t(i.value);case"uri":return i9.revive(i.value)}})(i,t))}let ri="__supertalk_rpc__";function rr(e){return"object"==typeof e&&null!==e&&ri in e&&!0===e[ri]}let ro=new TextEncoder,rs=new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._noop=function(){}}get event(){return this._event??=(e,t,i)=>{this.listeners??=new LinkedList;let r=this.listeners.push(null==t?e:[e,t]),o={dispose:()=>{o.dispose=Emitter._noop,this._disposed||r()}};return Array.isArray(i)&&i.push(o),o},this._event}fire(e){if(null!=this.listeners){this._deliveryQueue??=new LinkedList;for(let t=this.listeners.iterator(),i=t.next();!i.done;i=t.next())this._deliveryQueue.push([i.value,e]);for(;this._deliveryQueue.size>0;){let[e,t]=this._deliveryQueue.shift();try{"function"==typeof e?e(t):e[0].call(e[1],t)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let rn={done:!0,value:void 0};let events_Node=class events_Node{static{this.Undefined=new events_Node(void 0)}constructor(e){this.element=e,this.next=events_Node.Undefined,this.prev=events_Node.Undefined}};let LinkedList=class LinkedList{constructor(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===events_Node.Undefined}clear(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}unshift(e){return this._insert(e,!1)}push(e){return this._insert(e,!0)}_insert(e,t){let i=new events_Node(e);if(this._first===events_Node.Undefined)this._first=i,this._last=i;else if(t){let e=this._last;this._last=i,i.prev=e,e.next=i}else{let e=this._first;this._first=i,i.next=e,e.prev=i}this._size+=1;let r=!1;return()=>{r||(r=!0,this._remove(i))}}shift(){if(this._first===events_Node.Undefined)return;let e=this._first.element;return this._remove(this._first),e}pop(){if(this._last===events_Node.Undefined)return;let e=this._last.element;return this._remove(this._last),e}_remove(e){if(e.prev!==events_Node.Undefined&&e.next!==events_Node.Undefined){let t=e.prev;t.next=e.next,e.next.prev=t}else e.prev===events_Node.Undefined&&e.next===events_Node.Undefined?(this._first=events_Node.Undefined,this._last=events_Node.Undefined):e.next===events_Node.Undefined?(this._last=this._last.prev,this._last.next=events_Node.Undefined):e.prev===events_Node.Undefined&&(this._first=this._first.next,this._first.prev=events_Node.Undefined);this._size-=1}iterator(){let e,t=this._first;return{next:function(){return t===events_Node.Undefined?rn:(null==e?e={done:!1,value:t.element}:e.value=t.element,t=t.next,e)}}}toArray(){let e=[];for(let t=this._first;t!==events_Node.Undefined;t=t.next)e.push(t.element);return e}};var ra=Object.defineProperty,rl=Object.getOwnPropertyDescriptor,rc=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),rh=e=>{throw TypeError(e)},rd=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?rl(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ra(t,i,s),s};function rp(){return o??=null!=s?s():acquireVsCodeApi()}let ru=ih();function rg(){return`webview:${ru.next()}`}let rb=`wv-${Math.random().toString(36).slice(2,10)}`,rm=Date.now(),rf=class{constructor(e){this.appName=e,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=rp(),this._disposable=x.on(window,"message",e=>this.onMessageReceived(e))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(e){var t,i,o,s,a,c,h,p,u=[];try{if(rr(e.data))return;let s=e.data,a=((e,t,i)=>{if(null!=t){var r,o;"object"!=typeof t&&"function"!=typeof t&&rh("Object expected"),i&&(r=t[rc("asyncDispose")]),void 0===r&&(r=t[rc("dispose")],i&&(o=r)),"function"!=typeof r&&rh("Object not disposable"),o&&(r=function(){try{o.call(this)}catch(e){return Promise.reject(e)}}),e.push([i,r,t])}else i&&e.push([i]);return t})(u,function(e,t,i){var o,s;let a,c,h;if(!ii.enabled())return;let p=(o=i?.scope??!0,s=i?.scopeLabel,c=il(),r=(h=iy(e,o,s)).scopeId,is.set(h.scopeId,h),h[Symbol.dispose]=()=>{let e;e=h?.scopeId??r,null!=e&&is.delete(e),r=c?.scopeId},h);if(!t)return p;let u="debug",g=!1;"object"==typeof t&&(u=t.level??u,a=t.message,g=!0===t.onlyExit);let b=id();g||iw(p,u,a??"");let m=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let e=ip(b),t=` [${e}ms]`,i=p.getExitInfo(),r=i.failed??"completed";null!=i.failed?ii.error(null,p,`${r}${i.details??""}${t}`):iw(p,u,`${r}${i.details??""}${t}`),m()},p}(`(e=${s.id}|${s.method})`,void 0,{scope:iv()})),c=function(e,t,...i){let r=("object"==typeof t?.log?t.log.level:void 0)??"info";return(t?.provider??io).enabled(r)?new Stopwatch(e,t,...i):void 0}(a,{log:{onlyExit:!0,level:"debug"}});if(s.compressed&&s.params instanceof Uint8Array){if("deflate"===s.compressed)try{s.params=i4((o=s.params,i0(o,{i:2},void 0,void 0)))}catch(e){s.params=i4(s.params)}else s.params=i4(s.params);c?.restart({message:`\u2022 decompressed (${s.compressed}) serialized params`})}if("string"==typeof s.params?(s.params=rt(s.params,e=>this.getResponsePromise(e.method,e.id)),c?.stop({message:"• deserialized params"})):null==s.params?c?.stop({message:"• no params"}):c?.stop({message:"• invalid params"}),a?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-s.timestamp}ms`),null!=s.completionId){let e=(t=s.method,i=s.completionId,`${t}|${i}`);this._pendingHandlers.get(e)?.(s);return}this._onReceiveMessage.fire(s)}catch(e){var g=e,b=!0}finally{s=g,a=b,c="function"==typeof SuppressedError?SuppressedError:function(e,t,i,r){return(r=Error(i)).name="SuppressedError",r.error=e,r.suppressed=t,r},h=e=>s=a?new c(e,s,"An error was suppressed during disposal"):(a=!0,e),(p=e=>{for(;e=u.pop();)try{var t=e[1]&&e[1].call(e[2]);if(e[0])return Promise.resolve(t).then(p,e=>(h(e),p()))}catch(e){h(e)}if(a)throw s})()}}deserializeIpcData(e){return rt(e,e=>this.getResponsePromise(e.method,e.id))}sendCommand(e,t){let i=rg();this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now()})}async sendRequest(e,t){let i=rg(),r=this.getResponsePromise(e.response.method,i);return this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now(),completionId:i}),r}getResponsePromise(e,t){return new Promise((i,r)=>{var o,s;let a,c=(o=e,s=t,`${o}|${s}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),r(Error(`Timed out waiting for completion of ${c}`))},(ii.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,e=>{if(h.call(this),e.method===tW.method){let t=e.params;"rejected"===t.status?queueMicrotask(()=>r(Error(t.reason))):queueMicrotask(()=>i(t.value))}else queueMicrotask(()=>i(e.params))})})}setPersistedState(e){this._api.setState(e)}updatePersistedState(e){let t=this._api.getState();null!=t&&"object"==typeof t?(t={...t,...e},this._api.setState(t)):t=e,this.setPersistedState(t)}postMessage(e){this._api.postMessage(e)}};function rv(e,t){let i=Math.pow(10,t);return Math.round(e*i)/i}rd([i7({args:e=>({e:`${e.data.id}|${e.data.method}`})})],rf.prototype,"onMessageReceived",1),rd([i7({args:e=>({commandType:e.method})})],rf.prototype,"sendCommand",1),rd([i7({args:e=>({requestType:e.method})})],rf.prototype,"sendRequest",1),rd([i7({args:e=>({e:`${e.id}, method=${e.method}`})})],rf.prototype,"postMessage",1),rf=rd([(m=e=>`${e.appName}(HostIpc)`,e=>void ir.set(e,m))],rf);let RGBA=class RGBA{constructor(e,t,i,r=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,i)),this.a=rv(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}};let HSLA=class HSLA{constructor(e,t,i,r){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rv(Math.max(Math.min(1,t),0),3),this.l=rv(Math.max(Math.min(1,i),0),3),this.a=rv(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,r=e.b/255,o=e.a,s=Math.max(t,i,r),a=Math.min(t,i,r),c=0,h=0,p=(a+s)/2,u=s-a;if(u>0){switch(h=Math.min(p<=.5?u/(2*p):u/(2-2*p),1),s){case t:c=(i-r)/u+6*(i<r);break;case i:c=(r-t)/u+2;break;case r:c=(t-i)/u+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,o)}static _hue2rgb(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}static toRGBA(e){let t,i,r,o=e.h/360,{s,l:a,a:c}=e;if(0===s)t=i=r=a;else{let e=a<.5?a*(1+s):a+s-a*s,c=2*a-e;t=HSLA._hue2rgb(c,e,o+1/3),i=HSLA._hue2rgb(c,e,o),r=HSLA._hue2rgb(c,e,o-1/3)}return new RGBA(Math.round(255*t),Math.round(255*i),Math.round(255*r),c)}};let HSVA=class HSVA{constructor(e,t,i,r){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rv(Math.max(Math.min(1,t),0),3),this.v=rv(Math.max(Math.min(1,i),0),3),this.a=rv(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,r=e.b/255,o=Math.max(t,i,r),s=o-Math.min(t,i,r);return new HSVA(Math.round(60*(0===s?0:o===t?((i-r)/s%6+6)%6:o===i?(r-t)/s+2:(t-i)/s+4)),0===o?0:s/o,o,e.a)}static toRGBA(e){let{h:t,s:i,v:r,a:o}=e,s=r*i,a=s*(1-Math.abs(t/60%2-1)),c=r-s,[h,p,u]=[0,0,0];return t<60?(h=s,p=a):t<120?(h=a,p=s):t<180?(p=s,u=a):t<240?(p=a,u=s):t<300?(h=a,u=s):t<=360&&(h=s,u=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),u=Math.round((u+c)*255),o)}};function ry(e,t){return t.getPropertyValue(e).trim()}let Color=class Color{static from(e){return e instanceof Color?e:parseColor(e)||Color.red}static fromCssVariable(e,t){return parseColor(ry(e,t))||Color.red}static fromHex(e){return parseHexColor(e)||Color.red}static equals(e,t){return!e&&!t||!!e&&!!t&&e.equals(t)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(e){if(e)if(e instanceof RGBA)this.rgba=e;else if(e instanceof HSLA)this._hsla=e,this.rgba=HSLA.toRGBA(e);else if(e instanceof HSVA)this._hsva=e,this.rgba=HSVA.toRGBA(e);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(e){return null!=e&&!!e&&RGBA.equals(this.rgba,e.rgba)&&HSLA.equals(this.hsla,e.hsla)&&HSVA.equals(this.hsva,e.hsva)}getRelativeLuminance(){return rv(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){let t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}luminance(e){return luminance(this,e)}getContrastRatio(e){let t=this.getRelativeLuminance(),i=e.getRelativeLuminance();return t>i?(t+.05)/(i+.05):(i+.05)/(t+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){let{r:t,g:i,b:r,a:o}=this.rgba;return new Color(new RGBA(t,i,r,o*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(e){let t=e.rgba,i=this.rgba.a,r=t.a,o=i+r*(1-i);return o<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*i/o+t.r*r*(1-i)/o,this.rgba.g*i/o+t.g*r*(1-i)/o,this.rgba.b*i/o+t.b*r*(1-i)/o,o))}mix(e,t){return mixColors(this,e,t)}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;let{r:t,g:i,b:r,a:o}=this.rgba;return new Color(new RGBA(e.rgba.r-o*(e.rgba.r-t),e.rgba.g-o*(e.rgba.g-i),e.rgba.b-o*(e.rgba.b-r),1))}flatten(...e){let t=e.reduceRight((e,t)=>Color._flatten(t,e));return Color._flatten(this,t)}static _flatten(e,t){let i=1-e.rgba.a;return new Color(new RGBA(i*t.rgba.r+e.rgba.a*e.rgba.r,i*t.rgba.g+e.rgba.a*e.rgba.g,i*t.rgba.b+e.rgba.a*e.rgba.b))}toString(){return this._toString||(this._toString=function(e){return e.isOpaque()?`#${rw(e.rgba.r)}${rw(e.rgba.g)}${rw(e.rgba.b)}`:`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${Number(e.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(e,t,i){if(e.isLighterThan(t))return e;i=i||.5;let r=e.getRelativeLuminance(),o=t.getRelativeLuminance();return i=i*(o-r)/o,e.lighten(i)}static getDarkerColor(e,t,i){if(e.isDarkerThan(t))return e;i=i||.5;let r=e.getRelativeLuminance(),o=t.getRelativeLuminance();return i=i*(r-o)/r,e.darken(i)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function rw(e){let t=e.toString(16);return 2!==t.length?`0${t}`:t}let rx=new Emitter,r_=rx.event;function rk(e){let t=document.documentElement,i=window.getComputedStyle(t),r=document.body.classList,o=r.contains("vscode-light")||r.contains("vscode-high-contrast-light"),s=r.contains("vscode-high-contrast")||r.contains("vscode-high-contrast-light"),a=ry("--vscode-editor-background",i),c=ry("--vscode-editor-foreground",i);return c||(c=ry("--vscode-foreground",i)),{colors:{background:a,foreground:c},computedStyle:i,isLightTheme:o,isHighContrastTheme:s,isInitializing:null==e}}var r$=Object.defineProperty,rC=Object.getOwnPropertyDescriptor,rS=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?rC(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&r$(t,i,s),s};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(e){let t=JSON.parse(tL.decode(function(e){let t=globalThis.atob(e),i=t.length,r=new Uint8Array(i),o=0,s=i-i%8;for(;o<s;o+=8)r[o]=t.charCodeAt(o),r[o+1]=t.charCodeAt(o+1),r[o+2]=t.charCodeAt(o+2),r[o+3]=t.charCodeAt(o+3),r[o+4]=t.charCodeAt(o+4),r[o+5]=t.charCodeAt(o+5),r[o+6]=t.charCodeAt(o+6),r[o+7]=t.charCodeAt(o+7);for(;o<i;o++)r[o]=t.charCodeAt(o);return r}(e))),i=t.webviewId,r=t.webviewInstanceId;this._webview={webviewId:i,webviewInstanceId:r,createCommandLink:(e,t)=>{var o;return e.endsWith(":")&&(e=`${e}${i.split(".").at(-1)}`),o=e,`command:${o}?${encodeURIComponent(JSON.stringify({webview:i,webviewInstance:r,...t}))}`}}}connectedCallback(){let e,t,i,r;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new rf(this.name);let o=rk();if(null!=this.onThemeUpdated){let e;this.onThemeUpdated(o),this.disposables.push(((e=new MutationObserver(e=>{rx.fire(rk(e))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>e.disconnect()})),this.disposables.push(r_(this.onThemeUpdated,this))}this.disposables.push(this._ipc.onReceiveMessage(e=>{switch(!0){case tV.is(e):this.onWebviewFocusChanged?.(e.params.focused),window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case tU.is(e):this.onWebviewVisibilityChanged?.(e.params.visible),window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(i=0,r=iP(e=>{let t=`webview:${++i}`;rp().postMessage({id:t,scope:tF.scope,method:tF.method,params:e,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:i=>{let o=i.composedPath().some(e=>"INPUT"===e.tagName);(!0!==e||t!==o)&&(e=!0,t=o,r({focused:!0,inputFocused:o}))},onFocusOut:i=>{(!1!==e||!1!==t)&&(e=!1,t=!1,r({focused:!1,inputFocused:!1}))}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(e=>e.dispose())}render(){return e_`<slot></slot>`}};rS([eM({type:String})],GlWebviewApp.prototype,"name",2),rS([eM({type:String})],GlWebviewApp.prototype,"placement",2),rS([eJ({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),rS([eJ({context:"logger"})],GlWebviewApp.prototype,"_logger",2),rS([eJ({context:"promos"})],GlWebviewApp.prototype,"_promos",2),rS([eJ({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),rS([eJ({context:"webview"})],GlWebviewApp.prototype,"_webview",2);let rP=tx(GlWebviewApp);let SignalWatcherWebviewApp=class SignalWatcherWebviewApp extends rP{connectedCallback(){super.connectedCallback?.(),this._ipc.sendRequest(tB,{bootstrap:!1,clientId:rb,clientLoadedAt:rm})}};let VsCodeStorage=class VsCodeStorage{constructor(){this._api=rp()}get(){return this._api.getState()}set(e){this._api.setState(e)}};function rE(){return{storage:new VsCodeStorage,createEndpoint:()=>{let e,t;return e=rp(),t=new Map,{postMessage:function(t,i){let r={[ri]:!0,payload:ro.encode(JSON.stringify(t))};e.postMessage(r)},addEventListener:function(e,i){if("message"!==e)return;let r=e=>{let t=e.data;if(!rr(t))return;let{payload:r}=t;i(new MessageEvent("message",{data:r instanceof Uint8Array||r instanceof ArrayBuffer?JSON.parse(rs.decode(r)):r,origin:e.origin,lastEventId:e.lastEventId,source:e.source,ports:[...e.ports]}))};t.set(i,r),window.addEventListener("message",r)},removeEventListener:function(e,i){if("message"!==e)return;let r=t.get(i);r&&(window.removeEventListener("message",r),t.delete(i))},dispose:function(){for(let e of t.values())window.removeEventListener("message",e);t.clear()}}}}}function rA(e){return null!=e&&"object"==typeof e&&(e instanceof Error||"string"==typeof e.name&&"string"==typeof e.message)}function rT(e){return e.stack??`${e.name}: ${e.message}`}let rR="__st__",rz=Symbol(),rD=Symbol(),rO=()=>{},rI=Symbol(),rM=Symbol();function rL(e){if(e instanceof Error){let t={name:e.name,message:e.message};return void 0!==e.stack&&(t.stack=e.stack),t}return{name:"Error",message:String(e)}}function rB(e){let t=Error(e.message);return t.name=e.name,t.stack=e.stack,t}Symbol(),new WeakMap;let NonCloneableError=class NonCloneableError extends Error{valueType;path;constructor(e,t){super(`The nested ${e} at "${t}" cannot be cloned. Use nestedProxies: true.`),this.valueType=e,this.path=t,this.name="NonCloneableError"}};let Connection=class Connection{#s;#n;#a;#l;#c;#h=new Map;#d=0;#p=1;#u=!1;#g=new Map;#b=new WeakMap;#m=new Map;#f=new WeakMap;#v;#y=0;#w=new Map;#x=new Map;#_;#k=[];#$=!1;constructor(e,t={}){for(let i of(this.#s=e,this.#n=t.nestedProxies??!1,this.#a=t.debug??!1,this.#l=t.logger,this.#c=t.handlers??[],this.#_=t.batching??!1,this.#c))this.#h.set(i.wireType,i),"function"==typeof i.connect&&i.connect({sendMessage:e=>{this.#C(i.wireType,e)}});this.#v=new FinalizationRegistry(({id:e,session:t})=>{t===this.#y&&(this.#m.delete(e),this.#S({type:"release",id:e}))}),e.addEventListener("message",this.#P)}#S(e,t){if(!this.#u){if(!this.#_)return void this.#s.postMessage(e,t);this.#k.push({message:e,transfers:t}),this.#$||(this.#$=!0,queueMicrotask(()=>this.#E()))}}#E(){this.#$=!1;let e=this.#k;if(this.#k=[],0===e.length)return;let t=t=>{let i=t instanceof Error?t:Error(String(t));for(let{message:t}of e)if("call"===t.type&&void 0!==t.id){let e=this.#w.get(t.id);e&&(this.#w.delete(t.id),e.reject(i))}};if(1===e.length){let{message:i,transfers:r}=e[0];try{this.#s.postMessage(i,r)}catch(e){t(e)}}else{let i=[],r=[];for(let{message:t,transfers:o}of e)r.push(t),o&&i.push(...o);try{this.#s.postMessage({type:"batch",messages:r},i.length>0?i:void 0)}catch(e){t(e)}}}#C(e,t){let i=[];this.#S({type:"handler",wireType:e,payload:this.#A(t,"",i)},i)}#T(){let e=this.#d;return this.#d+=this.#p,e}expose(e){this.#p=2,this.#R(e),this.#S({type:"return",id:0,value:this.#z(e)})}#D(e){this.#k=[],this.#$=!1;let t=Error(e);for(let{reject:e}of this.#w.values())e(t);for(let{reject:e}of(this.#w.clear(),this.#x.values()))e(t);this.#x.clear()}close(){for(let e of(this.#u=!0,this.#D("Connection closed"),this.#s.removeEventListener("message",this.#P),this.#c))e.disconnect?.()}reset(e){for(let e of(this.#D("Connection reset"),this.#g.clear(),this.#b=new WeakMap,this.#m.clear(),this.#f=new WeakMap,this.#y++,this.#d=0,this.#p=1,this.#c))e.disconnect?.();for(let t of(void 0!==e&&e!==this.#s?(this.#u||this.#s.removeEventListener("message",this.#P),this.#s=e,e.addEventListener("message",this.#P)):this.#u&&this.#s.addEventListener("message",this.#P),this.#u=!1,this.#c))"function"==typeof t.connect&&t.connect({sendMessage:e=>{this.#C(t.wireType,e)}})}#O(e){if(e!==this.#y)throw Error("Stale proxy from previous session")}waitForReady(){return this.#d=1,this.#p=2,new Promise((e,t)=>{this.#w.set(0,{resolve:e,reject:t})})}#R(e){let t=this.#b.get(e);return void 0!==t||(t=this.#T(),this.#g.set(t,e),this.#b.set(e,t)),t}#I(e){return this.#g.get(e)}#M(e){return this.#m.get(e)?.deref()}#L(e){return this.#f.get(e)}#A(e,t,i){return"object"==typeof e?.[rI]?{[rR]:"property",...e[rI]}:this.#B(e,t,i,new Map)}#z(e,t=!1){return{[rR]:"proxy",id:this.#L(e)??this.#R(e),o:t}}#B(e,t,i,r,o){if(null==e||"object"!=typeof e&&"function"!=typeof e)return e;let s=r.get(e);if(void 0!==s)return s;if(e?.[rD]===!0){if(t&&this.#a&&!this.#n)throw new NonCloneableError("transfer",t);return i.includes(e.value)||i.push(e.value),r.set(e,e.value),e.value}if(e?.[rz]!==void 0){if(t&&this.#a&&!this.#n)throw new NonCloneableError("proxy",t);let i=this.#z(e[rz],e?.[rM]==="handle");return r.set(e,i),i}if("function"==typeof e){if(t&&this.#a&&!this.#n)throw new NonCloneableError("function",t);let i=this.#z(e);return r.set(e,i),i}if(void 0!==this.#L(e)){let t=this.#z(e,"__o"in e);return r.set(e,t),t}if("function"==typeof e?.then){if(t&&this.#a&&!this.#n)throw new NonCloneableError("promise",t);let i={[rR]:"promise",id:this.#F(e)};return r.set(e,i),i}if(this.#c.length>0){for(let s of this.#c)if(s.canHandle(e)){let a={toWire:(e,s)=>{let a=s?t?`${t}.${s}`:s:t;return this.#B(e,a,i,r,o)},...void 0!==o&&{callId:o}},c=s.toWire(e,a);return r.set(e,c),c}}if(!(this.#n||this.#a))return e;if(Array.isArray(e)){let s=[];r.set(e,s);for(let a=0;a<e.length;a++)s.push(this.#B(e[a],`${t}[${String(a)}]`,i,r,o));return s}let a=Object.getPrototypeOf(e);if(a===Object.prototype||null===a){let s={};for(let a of(r.set(e,s),Object.keys(e)))s[a]=this.#B(e[a],t?`${t}.${a}`:a,i,r,o);return s}return e}#N(e){return{fromWire:t=>this.#j(t,e)}}#W(e){let t=e?.[rR];if("property"===t){let t=this.#I(e.targetProxyId);if(!t)throw ReferenceError(`Proxy property target ${String(e.targetProxyId)} not found`);return t[e.property]}if("thrown"===t)throw rB(e.error);return this.#j(e,new Map)}#j(e,t){if(null===e||"object"!=typeof e)return e;let i=t.get(e);if(void 0!==i)return i;if(e?.[rR]==="proxy"){let i=this.#I(e.id);if(i){let r=e.o?{[rz]:i,[rM]:"handle",__nc:rO}:new Proxy(rO,{get:(e,t)=>{var r,o,s;let a;return t===rz?i:t===rM?"proxy":"then"!==t?(r=i,o=t,s=i[t],(a=(...e)=>{if("function"==typeof s)return Promise.resolve(s.apply(r,e));throw TypeError(`${String(o)} is not a function`)}).then=(e,t)=>Promise.resolve(s).then(e,t),a):void 0},set:(e,t,r)=>(i[t]=r,!0),apply(e,t,r){if("function"==typeof i)return Promise.resolve(i(...r));throw TypeError("Proxy target is not callable")}});return t.set(e,r),r}let r=this.#M(e.id)??this.#V(e.id,e.o);return t.set(e,r),r}if(e?.[rR]==="promise"){let{promise:i,resolve:r,reject:o}=Promise.withResolvers();return this.#x.set(e.id,{resolve:r,reject:o}),t.set(e,i),i}let r=e[rR];if("string"==typeof r){let i=this.#h.get(r);if(i?.fromWire){let r=i.fromWire(e,this.#N(t));return t.set(e,r),r}}if(!this.#n)return e;if(Array.isArray(e)){let i=[];for(let r of(t.set(e,i),e))i.push(this.#j(r,t));return i}if(Object.getPrototypeOf(e)!==Object.prototype)return e;let o={};for(let i of(t.set(e,o),Object.keys(e)))o[i]=this.#j(e[i],t);return o}#F(e){let t=this.#T();return e.then(e=>{try{let i=[],r=this.#A(e,"",i);this.#S({type:"resolve",id:t,value:r},i)}catch{this.#S({type:"reject",id:t,error:rL(Error("Failed to serialize resolved promise value"))})}},e=>{try{this.#S({type:"reject",id:t,error:rL(e)})}catch{}}),t}#V(e,t){let i=this.#M(e);if(void 0===i){let r=this.#y;i=t?{__o:rO}:new Proxy(rO,{apply:(t,i,o)=>(this.#O(r),this.#U(e,void 0,o)),get:(t,i)=>"string"==typeof i&&"then"!==i?this.#H(e,i,r):void 0,set:(t,i,o)=>{if("string"!=typeof i)return!1;this.#O(r);let s=[];return this.#q(this.#T(),e,"set",i,[this.#A(o,"",s)],s).catch(()=>{}),!0}}),this.#m.set(e,new WeakRef(i)),this.#f.set(i,e),this.#v.register(i,{id:e,session:this.#y})}return i}#H(e,t,i){let r=(...r)=>(this.#O(i),this.#U(e,t,r));return r.then=(r,o)=>(this.#O(i),this.#q(this.#T(),e,"get",t,[],[]).then(r,o)),r[rI]={targetProxyId:e,property:t},r}#q(e,t,i,r,o,s){let{promise:a,resolve:c,reject:h}=Promise.withResolvers();this.#w.set(e,{resolve:c,reject:h});try{this.#S({type:"call",id:e,target:t,action:i,method:r,args:o},s)}catch(t){this.#w.delete(e),h(t instanceof Error?t:Error(String(t)))}return a}#U(e,t,i){let r=[],o=new Map,s=this.#T();return this.#q(s,e,"call",t,i.map(e=>this.#B(e,"",r,o,s)),r)}#P=e=>{let t=e.data;if(null!=t)if("batch"===t.type)for(let e of t.messages)this.#K(e);else this.#K(t)};#K(e){switch(e.type){case"release":{let t=this.#g.get(e.id);void 0!==t&&(this.#g.delete(e.id),this.#b.delete(t));break}case"resolve":this.#G(this.#x,e.id,e.value);break;case"reject":this.#Y(this.#x,e.id,e.error);break;case"return":this.#G(this.#w,e.id,e.value),this.#Z(e.id);break;case"throw":this.#Y(this.#w,e.id,e.error),this.#Z(e.id);break;case"call":this.#X(e);break;case"handler":this.#J(e.wireType,e.payload)}}#G(e,t,i){let r=e.get(t);if(r){e.delete(t);try{r.resolve(this.#W(i))}catch(e){r.reject(e instanceof Error?e:Error(String(e)))}}}#Y(e,t,i){let r=e.get(t);r&&(e.delete(t),r.reject(rB(i)))}#Z(e){for(let t of this.#c)t.onCallSettle?.(e)}#J(e,t){try{let i=this.#h.get(e);if(i?.onMessage){let e=new Map;i.onMessage(this.#j(t,e),this.#N(e))}}catch(t){this.#l?.error?.(`Error in handler.onMessage for wireType "${e}":`,t)}}async #X(e){let{id:t,target:i,method:r,args:o,action:s}=e,a=new Map,c=o.map(e=>this.#j(e,a)),h=this.#I(i);if(!h)return this.#S({type:"throw",id:t,error:{name:"ReferenceError",message:`Proxy target ${String(i)} not found`}});let p=this.#l,u=p?.debug?performance.now():0;try{let e;if("get"===s){if(void 0===r)throw TypeError("Property name required for get action");e=h[r]}else if("set"===s){if(void 0===r)throw TypeError("Property name required for set action");h[r]=c[0],e=void 0}else if(void 0===r){if("function"!=typeof h)throw TypeError("Target is not callable");e=await h(...c)}else{let t=h[r];if("function"!=typeof t)throw TypeError(`${r} is not a function`);e=await t.apply(h,c)}let i=[],o=this.#A(e,"",i);this.#S({type:"return",id:t,value:o},i),p?.debug?.(`${s} ${r??"(direct)"} completed`,{duration:performance.now()-u})}catch(e){p?.debug?.(`${s} ${r??"(direct)"} failed`,{duration:performance.now()-u,error:e}),this.#S({type:"throw",id:t,error:rL(e)})}}};let RemoteSignal=class RemoteSignal{#Q;#ee;#et;constructor(e,t,i){this.#ee=e,this.#et=i,this.#Q=new w.State(t,{[w.subtle.watched]:()=>{this.#et?.(this.#ee,!0)},[w.subtle.unwatched]:()=>{this.#et?.(this.#ee,!1)}})}get(){return this.#Q.get()}set(e){throw Error("RemoteSignal is read-only. The signal can only be modified on the sender side.")}get signalId(){return this.#ee}_update(e){this.#Q.set(e)}};let rF="signal";let SignalHandler=class SignalHandler{wireType=rF;#ei;#er;#eo=0;#es=1;#en=new Map;#ea=new WeakMap;#el;#$=!1;#ec=new Map;#eh=new Map;#ed=new Map;#ep=new Map;#v=new FinalizationRegistry(({signalId:e,session:t})=>{t===this.#eo&&(this.#ed.delete(e),this.#er?.sendMessage({type:"signal:release",signalId:e}))});constructor(e={}){this.#ei=e.autoWatch??!1}connect(e){this.#er=e}onMessage(e){(null!==e&&"object"==typeof e&&"type"in e?"signal:batch"!==e.type:1)?(null!==e&&"object"==typeof e&&"type"in e?"signal:release"!==e.type:1)?(null!==e&&"object"==typeof e&&"type"in e?"signal:watch"!==e.type:1)?null!==e&&"object"==typeof e&&"type"in e&&"signal:unwatch"===e.type&&this.#eu(e.signalId):this.#eg(e.signalId):this.releaseSignal(e.signalId):this.#eb(e)}disconnect(){this.#er=void 0,this.#$=!1,void 0!==this.#el&&(this.#el.unwatch(...this.#ec.values()),this.#el=void 0),this.#en.clear(),this.#ec.clear(),this.#eh.clear(),this.#ed.clear(),this.#ep.clear(),this.#eo++,this.#ea=new WeakMap,this.#es=1}canHandle(e){return e instanceof w.State||e instanceof w.Computed}toWire(e,t){return this.#em(e,t)}fromWire(e,t){return this.#ef(e,t)}#em(e,t){let i=this.#ea.get(e);return void 0===i&&(i=this.#es++,this.#en.set(i,e),this.#ea.set(e,i),this.#ei&&this.#eg(i)),{[rR]:rF,signalId:i,value:t.toWire(e.get())}}#ef(e,t){let i=t.fromWire(e.value),r=this.#ed.get(e.signalId),o=r?.deref();if(void 0!==o)return o._update(i),o;let s=this.#ep.get(e.signalId);this.#ep.delete(e.signalId);let a=new RemoteSignal(e.signalId,void 0!==s?s:i,this.#ev);return this.#ed.set(e.signalId,new WeakRef(a)),this.#v.register(a,{signalId:e.signalId,session:this.#eo}),a}#ev=(e,t)=>{void 0!==this.#er&&(t?this.#er.sendMessage({type:"signal:watch",signalId:e}):this.#er.sendMessage({type:"signal:unwatch",signalId:e}))};#eg(e){if(this.#ec.has(e))return;let t=this.#en.get(e);if(void 0===t)return;let i=this.#ey(),r=new w.Computed(()=>t.get());this.#ec.set(e,r),this.#eh.set(r,e),i.watch(r);let o=r.get();this.#er?.sendMessage({type:"signal:batch",updates:[{signalId:e,value:o}]})}#eu(e){let t=this.#ec.get(e);void 0!==t&&(this.#el?.unwatch(t),this.#ec.delete(e),this.#eh.delete(t))}#ey(){return this.#el??=new w.subtle.Watcher(()=>{this.#$||(this.#$=!0,queueMicrotask(this.#E))})}#E=()=>{if(this.#$=!1,void 0===this.#el||void 0===this.#er)return;let e=this.#el.getPending(),t=[];for(let i of e){let e=this.#eh.get(i);if(void 0!==e&&this.#en.has(e)){let r=i.get();t.push({signalId:e,value:r})}}this.#el.watch(),t.length>0&&this.#er.sendMessage({type:"signal:batch",updates:t})};#eb(e){for(let t of e.updates){let e=this.#ed.get(t.signalId),i=e?.deref();void 0!==i?i._update(t.value):this.#ep.set(t.signalId,t.value)}}releaseSignal(e){let t=this.#ec.get(e);void 0!==t&&(this.#el?.unwatch(t),this.#ec.delete(e),this.#eh.delete(t)),this.#en.delete(e)}get _sentSignalCount(){return this.#en.size}get _remoteSignalCount(){return this.#ed.size}_isWatching(e){return this.#ec.has(e)}};let rN="abort-signal";let AbortSignalHandler=class AbortSignalHandler{wireType=rN;#er;#eo=0;#d=1;#ea=new WeakMap;#en=new Map;#ew=new Map;#ex=new FinalizationRegistry(({id:e,session:t})=>{t!==this.#eo||this.#ew.has(e)&&(this.#ew.delete(e),this.#en.delete(e),this.#er?.sendMessage({type:"release",id:e}))});#e_=new Map;canHandle(e){return e instanceof AbortSignal}toWire(e,t){if(e.aborted)return{[rR]:rN,id:0,aborted:!0,reason:e.reason};let i=this.#ea.get(e);if(void 0!==i)return{[rR]:rN,id:i,aborted:!1};i=this.#d++,this.#ea.set(e,i),this.#en.set(i,new WeakRef(e)),this.#ex.register(e,{id:i,session:this.#eo},e);let r=new WeakRef(e),o=i,s=()=>{let e=r.deref(),t=e?.reason;"completed"===t?this.#er?.sendMessage({type:"release",id:o}):this.#er?.sendMessage({type:"abort",id:o,reason:t}),void 0!==e&&this.#ex.unregister(e),this.#ek(o)};return e.addEventListener("abort",s,{once:!0}),this.#ew.set(i,s),{[rR]:rN,id:i,aborted:!1}}fromWire(e){if(e.aborted)return AbortSignal.abort(e.reason);let t=this.#e_.get(e.id);if(void 0!==t)return t.signal;let i=new AbortController;return this.#e_.set(e.id,i),i.signal}connect(e){this.#er=e}onMessage(e){"abort"===e.type?(this.#e_.get(e.id)?.abort(e.reason),this.#e_.delete(e.id)):"release"===e.type&&this.#e_.delete(e.id)}disconnect(){for(let e of(this.#er=void 0,this.#e_.values()))e.abort("disconnected");for(let[e,t]of(this.#e_.clear(),this.#ew)){let i=this.#en.get(e)?.deref();void 0!==i&&(i.removeEventListener("abort",t),this.#ex.unregister(i))}this.#ew.clear(),this.#en.clear(),this.#eo++,this.#ea=new WeakMap,this.#d=1}#ek(e){this.#ew.delete(e),this.#en.delete(e)}get _sentCount(){return this.#en.size}get _receivedCount(){return this.#e_.size}};let rj="st-error";function rW(e){return null!=e&&"object"==typeof e&&e.__st__===rj}function rV(e){if(null==e||"object"!=typeof e)return e;if(e instanceof Error||"string"==typeof e.name&&"string"==typeof e.message){let t={__st__:rj,name:e.name,message:e.message};return"string"==typeof e.stack&&(t.stack=e.stack),t}return e}function rU(e){if(!rW(e))return e;if("AbortError"===e.name&&"u">typeof DOMException)return new DOMException(e.message,"AbortError");let t=Error(e.message);return t.name=e.name,void 0!==e.stack&&(t.stack=e.stack),t}function rH(e){return null!=e&&"object"==typeof e&&"abort"===e.type}let GlAbortSignalHandler=class GlAbortSignalHandler extends AbortSignalHandler{toWire(e,t){let i=super.toWire(e,t);return i.aborted&&void 0!==i.reason&&(i.reason=rV(i.reason)),i}fromWire(e){return e.aborted&&rW(e.reason)&&(e={...e,reason:rU(e.reason)}),super.fromWire(e)}connect(e){super.connect({sendMessage:t=>{rH(t)&&void 0!==t.reason&&(t.reason=rV(t.reason)),e.sendMessage(t)}})}onMessage(e){rH(e)&&rW(e.reason)&&(e.reason=rU(e.reason)),super.onMessage(e)}};let rq="__st__",rK=[{wireType:"date",canHandle:function(e){return e instanceof Date},toWire:function(e){return{[rq]:"date",value:e.getTime()}},fromWire:function(e){return new Date(e.value)}},{wireType:"map",canHandle:function(e){return e instanceof Map},toWire:function(e,t){let i=[];for(let[r,o]of e)i.push([t.toWire(r),t.toWire(o)]);return{[rq]:"map",entries:i}},fromWire:function(e,t){let i=new Map;for(let r of e.entries){let[e,o]=r;i.set(t.fromWire(e),t.fromWire(o))}return i}},{wireType:"set",canHandle:function(e){return e instanceof Set},toWire:function(e,t){let i=[];for(let r of e)i.push(t.toWire(r));return{[rq]:"set",values:i}},fromWire:function(e,t){let i=new Set;for(let r of e.values)i.add(t.fromWire(r));return i}},{wireType:"regexp",canHandle:function(e){return e instanceof RegExp},toWire:function(e){return{[rq]:"regexp",source:e.source,flags:e.flags}},fromWire:function(e){return new RegExp(e.source,e.flags)}}];function rG(e){return"string"==typeof e[0]?[e[0],e.slice(1)]:[e.map(String).join(" "),[]]}function rY(e){return e.map(e=>{let t;if(rA(e))return rT(e);if(null==e||"object"!=typeof e||Array.isArray(e))return e;for(let[i,r]of Object.entries(e))rA(r)&&((t??={...e})[i]=rT(r));return t??e})}function rZ(e){let t=`[RPC:${e}]`;return{debug:(...e)=>{let[i,r]=rG(e);ii.debug(`${t} ${i}`,...rY(r))},warn:(...e)=>{let[i,r]=rG(e);ii.warn(`${t} ${i}`,...rY(r))},error:(...e)=>{let[i,r]=rG(e),o=function(e){for(let t of e){if(rA(t))return t;if(null!=t&&"object"==typeof t&&!Array.isArray(t)){for(let e of Object.values(t))if(rA(e))return e}}}(r);ii.error(o,`${t} ${i}`)}}}async function rX(e){let t,i,r="function"==typeof e?.webviewId?e.webviewId():e?.webviewId,o="function"==typeof e?.webviewInstanceId?e.webviewInstanceId():e?.webviewInstanceId,s=null==r&&null==o?"?":null==o?r:`${r??"?"}|${o}`,c=`RpcClient(${s})`,h=e?.endpoint?.()??(a??=rE()).createEndpoint(),p=new Connection(h,{handlers:[...rK,new SignalHandler({autoWatch:e?.autoWatchSignals}),new GlAbortSignalHandler,...e?.handlers??[]],nestedProxies:e?.nestedProxies??!0,debug:e?.debug,batching:!0,logger:rZ(`client(${s})`)}),u=e?.timeout??6e4,g=[],b=()=>{for(let e of g)clearTimeout(e);g.length=0,null!=t&&(clearTimeout(t),t=void 0),null!=i&&(e?.signal?.removeEventListener("abort",i),i=void 0)},m=()=>{b(),p.close(),h.dispose()},f=()=>{let t=e?.signal?.reason;return t instanceof Error?t:Error("RPC connection aborted")};try{if(e?.signal?.aborted)throw f();ii.debug(`${c}: Connecting to host...`),2e4<u&&g.push(setTimeout(()=>ii.warn(`${c}: Connection still pending after 20000ms`),2e4)),4e4<u&&g.push(setTimeout(()=>ii.warn(`${c}: Connection still pending after 40000ms \u2014 peer may be stuck`),4e4));let r=await Promise.race([p.waitForReady(),new Promise((e,i)=>t=setTimeout(()=>i(Error(`RPC connection timed out after ${u}ms`)),u)),...e?.signal!=null?[new Promise((t,r)=>{i=()=>r(f()),e.signal.addEventListener("abort",i,{once:!0})})]:[]]);return b(),ii.debug(`${c}: Connected to host successfully`),{services:r,dispose:()=>{ii.debug(`${c}: Disposing connection...`),m()}}}catch(e){throw m(),ii.error(e,`${c}: Failed to connect to host`),e}}rZ("?");let RpcController=class RpcController{constructor(e,t){this.host=e,this.options=t,e.addController(this)}get services(){return this._services}hostConnected(){this._connectionAbort?.abort(),this._connectionAbort=new AbortController,this._connect(this._connectionAbort.signal)}hostDisconnected(){this._connectionAbort?.abort(),this._connectionAbort=void 0,this._disposeRpc?.(),this._disposeRpc=void 0,this._services=void 0}async _connect(e){try{let{services:t,dispose:i}=await rX({...this.options?.rpcOptions,signal:e});if(e.aborted)return void i();if(this._services=t,this._disposeRpc=i,this.options?.onReady!=null)try{await this.options.onReady(t)}catch(e){throw i(),this._disposeRpc=void 0,this._services=void 0,e}}catch(c){if(e.aborted)return;let t=function(e){if(e instanceof Error)return e;if(rA(e)){let t=Error(`${e.name}: ${e.message}`);return t.cause=e,t}return Error(String(e))}(c),i=this.options?.rpcOptions?.webviewId,r=this.options?.rpcOptions?.webviewInstanceId,o="function"==typeof i?i():i,s="function"==typeof r?r():r,a=null!=s?`${o??"?"}|${s}`:o??"?";ii.error(t,`RpcController(${a}): Failed to connect`),this.options?.onError!=null&&this.options.onError(t)}}};let rJ=M`
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
`,rQ=M`
	hr {
		border: none;
		border-top: 1px solid var(--color-foreground--25);
	}
`,r0="0000000000000000000000000000000000000000:",r1=/^([\w\-/]+(?:\.[\w\-/]+)*)?(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)?$/,r2=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)$/,r5=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,r4=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,r6=/(^[0-9a-f]{40}([\^@~:]\S*)?$)|(^[0]{40}(:|-)$)/,r3=/^(.*?)([\^@~:].*)?$/,r8=/^[0]{40}(?:[\^@~:]\S*)?:?$/,r7=/^[0]{40}([\^@~]\S*)?:$/;function r9(e,t){return!!t&&e.test(t)}function oe(e,t=!1){return"0000000000000000000000000000000000000000"===e||e===r0||!t&&r9(r8,e)}let ot=7;function oi(e,t){if("0000000000000000000000000000000000000000-"===e)return"(deleted)";if(!e)return t?.strings?.working??"";if(oe(e))return!function(e,t=!1){return e===r0||!t&&r9(r7,e)}(e)?t?.strings?.uncommitted??"Working Tree":t?.strings?.uncommittedStaged??"Index";if(function(e,t="any"){if(null==e)return!1;switch(t){case"qualified":return r2.test(e);case"qualified-double-dot":return r5.test(e);case"qualified-triple-dot":return r4.test(e);default:return r1.test(e)}}(e)||!r9(r6,e))return e;let i=Math.max(5,ot),r=r3.exec(e);if(null!=r){let[,e,t]=r;if(null!=t)return`${e.substring(0,i)}${t}`}return e.substring(0,i)}var or=P(379);let oo=new Set(["config","remotes","tags","starred","remoteProviders","ignores","gkConfig"]);let TimelineActions=class TimelineActions{constructor(e,t,i,r,o){var s;let a;this._state=e,this._services=t,this._timeline=i,this._repository=r,this._datasetResource=o;let c=Promise.resolve(t.telemetry);this._pushTelemetryContext=(s=e=>void c.then(t=>t.updateContext(e)),a="",e=>{let t=JSON.stringify(e);t!==a&&(a=t,s(e))})}dispose(){this._fireSelectDataPointDebounced?.cancel?.(),this.unwatchWip()}watchWip(e){e!==this._wipWatchRepoPath&&(this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,this._wipWatchRepoPath=e,(async()=>{let t=await this._repository.onRepositoryWorkingChanged(e,()=>{this.fetchTimeline()});if("function"==typeof t){if(this._wipWatchRepoPath!==e)return t();this._wipWatchUnsubscribe=t}})())}unwatchWip(){this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,this._wipWatchRepoPath=void 0}cancelPendingRequests(){this._datasetResource.cancel(),this._fireSelectDataPointDebounced?.cancel?.()}async populateInitialState(){var e;let t=this._state,i=await this._timeline.getInitialContext();t.displayConfig.set({abbreviatedShaLength:i.displayConfig.abbreviatedShaLength,dateFormat:i.displayConfig.dateFormat,shortDateFormat:i.displayConfig.shortDateFormat}),ot=i.displayConfig.abbreviatedShaLength,null!=i.configOverrides&&(null!=i.configOverrides.period&&t.period.set(i.configOverrides.period),null!=i.configOverrides.showAllBranches&&t.showAllBranches.set(i.configOverrides.showAllBranches),null!=i.configOverrides.sliceBy&&t.sliceBy.set(i.configOverrides.sliceBy));let r=(e=t.scope.get(),i.scope??e);null!=r&&(t.scope.set(r),await this.fetchTimeline()),this.fetchRepoCount()}async fetchTimeline(){let e=this._state;if(null!=e.scope.get())if(await this._datasetResource.fetch(),"success"===this._datasetResource.status.get()){let t=this._datasetResource.value.get();null!=t&&(e.scope.set(t.scope),e.repository.set(t.repository),e.access.set(t.access),e.error.set(void 0),t.repository?.path&&this.watchWip(t.repository.path))}else"error"===this._datasetResource.status.get()&&e.error.set(this._datasetResource.error.get())}async fetchDisplayConfig(){let e=await this._services.config,[t,i,r]=await e.getMany("defaultDateFormat","defaultDateShortFormat","advanced.abbreviatedShaLength");this._state.displayConfig.set({dateFormat:t??"",shortDateFormat:i??"",abbreviatedShaLength:r}),ot=r}async fetchRepoCount(){let e=await this._services.repositories,t=await e.getRepositoriesState();this._state.repositories.set({count:t.count,openCount:t.openCount})}onScopeChanged(e){let t=this._state;if(null==e){t.scope.set(void 0),this._datasetResource.cancel(),this._datasetResource.mutate(void 0),t.repository.set(void 0),this.unwatchWip();return}let i=t.scope.get();(i?.uri!==e.uri||i?.type!==e.type)&&(t.scope.set({type:e.type,uri:e.uri,relativePath:""}),this.fetchTimeline())}onRepoChanged(e){let t=this._state.scope.get();null==t||t.uri!==e.repoUri&&!t.uri.startsWith(`${e.repoUri}/`)||e.changes.some(e=>!oo.has(e))&&this.fetchTimeline()}pushTelemetryContext(){this._pushTelemetryContext({"context.period":this._state.period.get(),"context.showAllBranches":this._state.showAllBranches.get(),"context.sliceBy":this._state.sliceBy.get()})}sendConfigChangedTelemetry(){var e;e=Promise.resolve(this._services.telemetry).then(e=>e.sendEvent("timeline/config/changed",{period:this._state.period.get(),showAllBranches:this._state.showAllBranches.get(),sliceBy:this._state.sliceBy.get()})),e.catch(e=>{ii.error(e,"RPC call failed (timeline config changed telemetry)")})}changePeriod(e){this._state.period.set(e),this.sendConfigChangedTelemetry(),this.fetchTimeline()}changeSliceBy(e){let t=this._state;t.sliceBy.set(e),"branch"!==e||t.showAllBranches.get()||t.showAllBranches.set(!0),this.sendConfigChangedTelemetry(),this.fetchTimeline()}changeShowAllBranches(e){this._state.showAllBranches.set(e),this.sendConfigChangedTelemetry(),this.fetchTimeline()}async chooseBaseRef(){let e=this._state,t=e.scope.get();if(null==t)return;let i=await this._timeline.chooseRef({scope:t,type:"base",showAllBranches:e.showAllBranches.get()});i?.ref!=null&&(e.scope.set({...t,base:i.ref}),this.fetchTimeline())}async chooseHeadRef(e){let t=this._state,i=t.scope.get();if(null==i)return;let r=await this._timeline.chooseRef({scope:i,type:"head",showAllBranches:t.showAllBranches.get()});if(r?.ref===null){t.showAllBranches.get()||(t.showAllBranches.set(!0),this.fetchTimeline());return}if(r?.ref!=null){if("config"===e){let e=t.showAllBranches.get()?void 0:i.base;t.scope.set({...i,head:r.ref,base:e}),this.fetchTimeline();return}t.scope.set({...i,head:r.ref,base:void 0}),t.showAllBranches.get()&&t.showAllBranches.set(!1),this.fetchTimeline()}}async choosePath(e){let t=this._state,i=t.repository.get(),r=t.scope.get();if(null==i||null==r)return;let o=await this._timeline.choosePath({repoUri:i.uri,ref:t.head.get(),title:"Select a File or Folder to Visualize",initialPath:"file"===r.type?(0,or.dirname)(r.relativePath):r.relativePath});if(o?.picked!=null){if(e)return void this._timeline.openInEditor({...r,type:o.picked.type,relativePath:o.picked.relativePath});t.scope.set({...r,type:o.picked.type,relativePath:o.picked.relativePath}),this.fetchTimeline()}}changeScope(e,t,i){let r=this._state,o=r.scope.get();if(null!=o){if("repo"===e)return i?void this._timeline.openInEditor({...o,type:"repo",relativePath:""}):"repo"===o.type?void this.pickAndNavigateRepo():(r.scope.set({...o,type:"repo",relativePath:""}),void this.fetchTimeline());if(null!=t){if(i)return void this._timeline.openInEditor({...o,type:e,relativePath:t});r.scope.set({...o,type:e,relativePath:t}),this.fetchTimeline()}}}async pickAndNavigateRepo(){let e=this._state,t=await this._timeline.chooseRepo();null!=t&&(e.scope.set({type:t.type,uri:t.uri,relativePath:""}),this.fetchTimeline())}selectDataPoint(e){let t=this._state;null!=t.scope.get()&&(this._fireSelectDataPointDebounced??=iP(e=>{let i=t.scope.get();null!=i&&this._timeline.selectDataPoint({scope:i,...e})},250,{maxWait:500}),this._fireSelectDataPointDebounced(e))}};async function os(e){let t=await Promise.allSettled(e.map(e=>e())),i=[];for(let e of t)"fulfilled"===e.status&&"function"==typeof e.value?i.push(e.value):"rejected"===e.status&&ii.error(e.reason,"Failed to subscribe");return()=>{for(let e of i)try{e()}catch(e){ii.error(e,"Failed to unsubscribe")}}}let on="__rk",oa="__ts",ol=new Set(["__v",on,oa]),oc={abbreviatedShaLength:7,dateFormat:"",shortDateFormat:""},oh=M`
	* {
		box-sizing: border-box;
	}

	:not(:defined) {
		visibility: hidden;
	}

	[hidden] {
		display: none !important;
	}

	/* roll into shared focus style */
	:focus-visible {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: -1px;
	}

	a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	b {
		font-weight: 600;
	}

	p {
		margin-top: 0;
	}

	ul {
		margin-top: 0;
		padding-left: 1.2em;
	}

	section,
	header {
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	h2 {
		font-weight: 400;
	}

	h3 {
		border: none;
		color: var(--color-view-header-foreground);
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0;
		white-space: nowrap;
	}

	h4 {
		font-size: 1.5rem;
		font-weight: 400;
		margin: 0.5rem 0 1rem 0;
	}
`,od=M`
	:host {
		display: block;
		color: var(--color-view-foreground);
		font-family: var(--font-family);
		font-size: var(--font-size);
		margin: 0;
		padding: 0;
		height: 100vh;
		overflow: hidden;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		flex: none;
		display: grid;
		grid-template-columns: 1fr min-content;
		align-items: center;
		grid-template-areas: 'details toolbox';
		margin: 0.5rem 1rem;
	}

	:host-context(body[data-placement='editor']) .header {
		margin-top: 1rem;
		margin-right: 1.5rem;
	}

	.details {
		grid-area: details;
		display: flex;
		gap: 1rem;
		align-items: center;
		font-size: var(--font-size);
		min-width: 0;
		margin-right: 1rem;
	}

	.details gl-breadcrumbs {
		flex: 1;
		min-width: 0;
		padding: 0.1rem 0;
		overflow: hidden;
	}

	.details .details__ref,
	.details .details__timeframe {
		min-width: 0;
		margin: 0;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.details .details__ref {
		flex: 0 100000000 auto;
		color: var(--color-foreground--75);
		font-size: 1.2rem;
		margin-left: auto;
	}

	.details .details__ref .ref {
		margin-left: 0.25rem;
	}

	.details .details__timeframe {
		flex: 0 0 auto;
		color: var(--color-foreground--75);
		margin-right: 0.6rem;
		user-select: none;
		white-space: nowrap;
		font-size: 1.2rem;
		margin-left: auto;
	}

	.toolbox {
		grid-area: toolbox;
		align-items: center;
		display: flex;
		gap: 0.3rem;
	}

	.toolbox gl-feature-badge {
		padding-bottom: 0.4rem;
	}

	:host-context(body[data-placement='editor']) .toolbox gl-feature-badge {
		padding-left: 0.4rem;
	}

	.select-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 100% 0 1;
		position: relative;
	}

	.select-container label {
		margin: 0 1rem 0 0;
		font-size: var(--font-size);
		user-select: none;
	}

	.select-container::after {
		font-family: codicon;
		content: '\\eab4';
		font-size: 1.4rem;
		pointer-events: none;
		top: 50%;
		right: 8px;
		transform: translateY(-50%);
		position: absolute;
		color: var(--vscode-foreground);
	}

	.select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		border: 1px solid var(--vscode-dropdown-border);
		cursor: pointer;
		font-family: inherit;
		min-height: 100%;
		padding: 2px 26px 2px 8px;
		background-color: var(--vscode-dropdown-background);
		border-radius: 0.3rem;
		box-sizing: border-box;
		color: var(--vscode-foreground);
		font-family: var(--font-family);
		height: 26px;
		user-select: none;
	}

	.timeline {
		flex: 1;
		min-height: 0;
	}

	.timeline__empty {
		padding: 0.4rem 2rem 1.3rem 2rem;
		font-size: var(--font-size);
	}

	.timeline__empty p {
		margin-top: 0;
	}

	:host-context(body[data-placement='view']) gl-feature-gate {
		background-color: var(--vscode-sideBar-background);
	}

	gl-feature-gate gl-feature-badge {
		vertical-align: super;
		margin-left: 0.4rem;
		margin-right: 0.4rem;
	}

	label {
		min-width: fit-content;
	}

	label[disabled] {
		opacity: 0.5;
	}

	.config__content {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		max-width: 30rem;
		min-width: 20rem;

		margin-bottom: 0.4rem;
	}

	.config__content menu-label {
		padding: 0;
		margin-bottom: -0.4rem;
	}

	.config__content section {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.breadcrumb-item-children {
		display: flex;
	}

	.breadcrumb-folder {
		cursor: pointer;
	}
`,op=navigator?.userAgentData?.platform,ou=navigator.userAgent;"Linux"===op||ou.includes("Linux");let og="macOS"===op||ou.includes("Macintosh");"Windows"===op||ou.includes("Windows");let ModifierKeysTracker=class ModifierKeysTracker{constructor(){this._altKey=!1,this._shiftKey=!1,this._ctrlKey=!1,this._metaKey=!1,this._hosts=new Set,this._listening=!1,this._onKey=e=>{let t=e.altKey||"keydown"===e.type&&"Alt"===e.key,i=e.shiftKey||"keydown"===e.type&&"Shift"===e.key,r=e.ctrlKey||"keydown"===e.type&&"Control"===e.key,o=e.metaKey||"keydown"===e.type&&"Meta"===e.key,s=("keyup"!==e.type||"Alt"!==e.key)&&t,a=("keyup"!==e.type||"Shift"!==e.key)&&i,c=("keyup"!==e.type||"Control"!==e.key)&&r,h=("keyup"!==e.type||"Meta"!==e.key)&&o;(this._altKey!==s||this._shiftKey!==a||this._ctrlKey!==c||this._metaKey!==h)&&(this._altKey=s,this._shiftKey=a,this._ctrlKey=c,this._metaKey=h,this._notify())},this._onBlur=()=>{this._reset()}}get altKey(){return this._altKey}get shiftKey(){return this._shiftKey}get ctrlKey(){return this._ctrlKey}get metaKey(){return this._metaKey}subscribe(e){return this._hosts.add(e),this._listening||this._start(),()=>{this._hosts.delete(e),0===this._hosts.size&&this._stop()}}_start(){this._listening=!0,window.addEventListener("keydown",this._onKey,{capture:!0}),window.addEventListener("keyup",this._onKey,{capture:!0}),window.addEventListener("blur",this._onBlur)}_stop(){this._listening=!1,window.removeEventListener("keydown",this._onKey,{capture:!0}),window.removeEventListener("keyup",this._onKey,{capture:!0}),window.removeEventListener("blur",this._onBlur),this._reset()}_reset(){let e=this._altKey||this._shiftKey||this._ctrlKey||this._metaKey;this._altKey=this._shiftKey=this._ctrlKey=this._metaKey=!1,e&&this._notify()}_notify(){for(let e of this._hosts)e.requestUpdate()}};let ob=new ModifierKeysTracker;let ModifierKeysController=class ModifierKeysController{constructor(e){this.host=e,e.addController(this)}get altKey(){return ob.altKey}get shiftKey(){return ob.shiftKey}get ctrlKey(){return ob.ctrlKey}get metaKey(){return ob.metaKey}hostConnected(){this._unsubscribe=ob.subscribe(this.host)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}};let om=M`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		position: relative;

		--scroller-track-top: unset;
		--scroller-track-left: 0;
		--scroller-track-width: 100%;
		--scroller-thumb-height: 0.6rem;
		--scroller-track-height: 1.2rem;
	}

	gl-chart-scroller {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		min-height: 0;
	}

	gl-chart-scroller::part(track) {
		--track-top: var(--scroller-track-top);
		--track-left: var(--scroller-track-left);
		--track-width: var(--scroller-track-width);
		--track-height: var(--scroller-track-height);
		--thumb-height: var(--scroller-thumb-height);
	}

	#chart {
		flex: 1;
		width: 100%;
		height: 100%;
		min-height: 0;
	}

	footer {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		margin: 0 1rem 0.4rem 1rem;
		gap: 0.8rem;
	}

	gl-chart-slider {
		flex: 1 0 auto;
		margin-left: 1.4rem;
	}

	gl-commit-sha-copy {
		color: var(--color-foreground--75);
		justify-content: flex-end;
		min-width: 7.5rem; /* Reserves space so the badge doesn't resize across SHAs */
		font-variant-numeric: tabular-nums;
	}

	.bb svg {
		font: 10px var(--font-family);
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.bb path,
	.bb line {
		fill: none;
	}

	:host-context(.vscode-dark) .bb path.domain,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb path.domain {
		stroke: var(--color-background--lighten-15);
	}

	:host-context(.vscode-light) .bb path.domain,
	:host-context(.vscode-high-contrast-light) .bb path.domain {
		stroke: var(--color-background--darken-15);
	}

	.bb text,
	.bb .bb-button {
		user-select: none;
		fill: var(--color-view-foreground);
	}

	.bb .bb-event-rects,
	.bb .bb-event-rect {
		cursor: pointer !important;
	}

	.bb .bb-event-rects:active,
	.bb .bb-event-rect:active {
		cursor: ew-resize !important;
	}

	.bb .bb-xgrid-focus,
	.bb .bb-ygrid-focus,
	.bb .bb-ygrid,
	.bb .bb-event-rect,
	.bb .bb-bars path {
		shape-rendering: crispEdges;
	}

	.bb .bb-legend-item text {
		fill: var(--color-foreground--85);
	}

	.bb .bb-legend-item-tile {
		stroke-width: 2px;
		transform: translate(0, 1px);
	}

	.bb .bb-chart-arc .bb-gauge-value {
		fill: #000;
	}

	.bb .bb-chart-arc path {
		stroke: #fff;
	}

	.bb .bb-chart-arc rect {
		stroke: #fff;
		stroke-width: 1;
	}

	.bb .bb-chart-arc text {
		fill: #fff;
		font-size: 13px;
	}

	.bb .bb-axis {
		shape-rendering: crispEdges;
	}

	.bb .bb-grid {
		pointer-events: none;
	}

	:host-context(.vscode-dark) .bb .bb-grid line,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb .bb-grid line {
		stroke: var(--color-background--lighten-05);
	}

	:host-context(.vscode-dark) .bb .bb-grid line.bb-ygrid,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb .bb-grid line.bb-ygrid {
		stroke: var(--color-background--lighten-05);
	}

	:host-context(.vscode-light) .bb .bb-grid line,
	:host-context(.vscode-high-contrast-light) .bb .bb-grid line {
		stroke: var(--color-background--darken-05);
	}

	:host-context(.vscode-light) .bb .bb-grid line.bb-ygrid,
	:host-context(.vscode-high-contrast-light) .bb .bb-grid line.bb-ygrid {
		stroke: var(--color-background--darken-05);
	}

	.bb .bb-grid text {
		fill: var(--color-view-foreground);
	}

	:host-context(.vscode-dark) .bb .bb-xgrid-focus line,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb .bb-xgrid-focus line {
		stroke: var(--color-background--lighten-30);
	}

	:host-context(.vscode-light) .bb .bb-xgrid-focus line,
	:host-context(.vscode-high-contrast-light) .bb .bb-xgrid-focus line {
		stroke: var(--color-background--darken-30);
	}

	.bb .bb-text.bb-empty {
		fill: #808080;
		font-size: 2em;
	}

	.bb .bb-line {
		stroke-width: 1px;
	}

	.bb .bb-circle._expanded_ {
		opacity: 1 !important;
		fill-opacity: 1 !important;
		stroke-opacity: 1 !important;
		stroke-width: 3px;
	}

	.bb .bb-selected-circle {
		opacity: 1 !important;
		fill-opacity: 1 !important;
		stroke-opacity: 1 !important;
		stroke-width: 3px;
	}

	.bb .bb-bar {
		stroke-width: 0;
		opacity: 0.9 !important;
		fill-opacity: 0.9 !important;
	}

	.bb .bb-bar._expanded_ {
		opacity: 1 !important;
		fill-opacity: 1 !important;
	}

	.bb .bb-candlestick {
		stroke-width: 1px;
	}

	.bb .bb-candlestick._expanded_ {
		fill-opacity: 0.75;
	}

	.bb .bb-target.bb-focused,
	.bb .bb-circles.bb-focused {
		opacity: 1;
	}

	.bb .bb-target.bb-focused path.bb-line,
	.bb .bb-target.bb-focused path.bb-step,
	.bb .bb-circles.bb-focused path.bb-line,
	.bb .bb-circles.bb-focused path.bb-step {
		stroke-width: 2px;
	}

	.bb .bb-target.bb-defocused,
	.bb .bb-circles.bb-defocused {
		opacity: 0.2 !important;
	}

	.bb .bb-target.bb-defocused .text-overlapping,
	.bb .bb-circles.bb-defocused .text-overlapping {
		opacity: 0.05 !important;
	}

	.bb .bb-region {
		fill: steelblue;
		fill-opacity: 0.1;
	}

	:host-context(.vscode-dark) .bb .bb-zoom-brush,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb .bb-zoom-brush {
		fill: white;
		fill-opacity: 0.2;
	}

	:host-context(.vscode-light) .bb .bb-zoom-brush,
	:host-context(.vscode-high-contrast-light) .bb .bb-zoom-brush {
		fill: black;
		fill-opacity: 0.1;
	}

	.bb .bb-brush .extent {
		fill-opacity: 0.1;
	}

	.bb .bb-legend-item {
		font-size: 12px;
		user-select: none;
	}

	.bb .bb-legend-item-hidden {
		opacity: 0.15;
	}

	.bb .bb-legend-background {
		opacity: 0.75;
		fill: white;
		stroke: lightgray;
		stroke-width: 1;
	}

	.bb .bb-title {
		font: 14px var(--font-family);
	}

	.bb .bb-tooltip-container {
		z-index: 10;
		user-select: none;
	}

	.bb .bb-area {
		stroke-width: 0;
		opacity: 0.2;
	}

	.bb .bb-chart-arcs-title {
		dominant-baseline: middle;
		font-size: 1.3em;
	}

	.bb text.bb-chart-arcs-gauge-title {
		dominant-baseline: middle;
		font-size: 2.7em;
	}

	.bb .bb-chart-arcs .bb-chart-arcs-background {
		fill: #e0e0e0;
		stroke: #fff;
	}

	.bb .bb-chart-arcs .bb-chart-arcs-gauge-unit {
		fill: #000;
		font-size: 16px;
	}

	.bb .bb-chart-arcs .bb-chart-arcs-gauge-max {
		fill: #777;
	}

	.bb .bb-chart-arcs .bb-chart-arcs-gauge-min {
		fill: #777;
	}

	.bb .bb-chart-radars .bb-levels polygon {
		fill: none;
		stroke: #848282;
		stroke-width: 0.5px;
	}

	.bb .bb-chart-radars .bb-levels text {
		fill: #848282;
	}

	.bb .bb-chart-radars .bb-axis line {
		stroke: #848282;
		stroke-width: 0.5px;
	}

	.bb .bb-chart-radars .bb-axis text {
		font-size: 1.15em;
		cursor: default;
	}

	.bb .bb-chart-radars .bb-shapes polygon {
		fill-opacity: 0.2;
		stroke-width: 1px;
	}

	.bb .bb-button {
		position: absolute;
		top: 0.4rem;
		right: -1.4rem;
		background-color: var(--color-button-background);
		color: var(--color-button-foreground);
		font-size: var(--font-size);
		font-family: var(--font-family);
	}

	:host-context([data-placement='view']) .bb .bb-button {
		margin-right: 2.8rem;
	}

	.bb .bb-zoom-reset {
		display: inline-block;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.notice {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10% 2rem 30% 2rem;
		font-size: var(--font-size);

		z-index: 1;
	}

	.notice--blur {
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);

		animation: fadeIn 0.2s ease-in;
		animation-fill-mode: forwards;
		opacity: 0;
	}

	:host-context([data-placement='view']) .notice--blur {
		animation-delay: 0.5s;
	}

	.notice p {
		margin: 0;
	}

	.bb-tooltip {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: var(--color-hover-background);
		color: var(--color-hover-foreground);
		border: 1px solid var(--color-hover-border);
		box-shadow: 0 2px 8px var(--vscode-widget-shadow);
		font-size: var(--font-size);
		opacity: 1;
		white-space: nowrap;
		min-width: 0;
		max-width: 360px;
		overflow: hidden;
	}

	.bb-tooltip .author {
		font-weight: 600;
	}

	.bb-tooltip .icon {
		font-family: codicon;
	}

	.bb-tooltip .branches {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/* font-family: var(--vscode-editor-font-family); */
	}

	.bb-tooltip .sha {
		/* background: var(--vscode-textCodeBlock-background);
		border-radius: 0.3rem; */
		/* padding: 0.1rem 0.4rem 0.2rem 0.4rem; */
		font-family: var(--vscode-editor-font-family);
		margin-right: 0.4rem;
	}

	.bb-tooltip .additions {
		color: var(--vscode-gitDecoration-addedResourceForeground);
	}

	.bb-tooltip .deletions {
		color: var(--vscode-gitDecoration-deletedResourceForeground);
	}

	.bb-tooltip .date {
		flex: 1 1 auto;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		font-weight: normal;
		gap: 0.5rem;
		min-width: 0;
	}

	.bb-tooltip .date--relative {
		flex: 0 1 auto;
	}

	.bb-tooltip .date--absolute {
		flex: 0 100000 auto;
		font-style: italic;
	}

	.bb-tooltip .message {
		margin-left: 0rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		max-height: 50vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.bb-tooltip .message__content {
		white-space: pre-line;
	}

	:host-context([data-placement='editor']) .bb-axis-y .tick text {
		fill: var(--color-foreground--85);
	}

	:host-context([data-placement='view']) .bb-axis-y .tick text {
		transform: translate(0, 0.4rem);
		font-family: codicon;
		font-size: 1.5rem;
	}

	@media (max-height: 275px) {
		:host-context([data-placement='view']) .bb-axis-y .tick text {
			transform: none;
			font-size: 1rem;
		}
	}

	@media (max-height: 225px) {
		:host-context([data-placement='view']) .bb-axis-y .tick text {
			display: none;
		}
	}
`;var of=M`
  :host {
    --track-size: 0.5em;
    --thumb-width: 1.4em;
    --thumb-height: 1.4em;
    --marker-width: 0.1875em;
    --marker-height: 0.1875em;
  }

  :host([orientation='vertical']) {
    width: auto;
  }

  #label:has(~ .vertical) {
    display: block;
    order: 2;
    max-width: none;
    text-align: center;
  }

  #description:has(~ .vertical) {
    order: 3;
    text-align: center;
  }

  /* Add extra space between slider and label, when present */
  #label.has-label ~ #slider {
    &.horizontal {
      margin-block-start: 0.5em;
    }
    &.vertical {
      margin-block-end: 0.5em;
    }
  }

  #slider {
    touch-action: none;

    &:focus {
      outline: none;
    }

    &:focus-visible:not(.disabled) #thumb,
    &:focus-visible:not(.disabled) #thumb-min,
    &:focus-visible:not(.disabled) #thumb-max {
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  #track {
    position: relative;
    border-radius: 9999px;
    background: var(--wa-color-neutral-fill-normal);
    isolation: isolate;
  }

  /* Orientation */
  .horizontal #track {
    height: var(--track-size);
  }

  .vertical #track {
    order: 1;
    width: var(--track-size);
    height: 200px;
  }

  /* Disabled */
  .disabled #track {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Indicator */
  #indicator {
    position: absolute;
    border-radius: inherit;
    background-color: var(--wa-form-control-activated-color);

    &:dir(ltr) {
      right: calc(100% - max(var(--start), var(--end)));
      left: min(var(--start), var(--end));
    }

    &:dir(rtl) {
      right: min(var(--start), var(--end));
      left: calc(100% - max(var(--start), var(--end)));
    }
  }

  .horizontal #indicator {
    top: 0;
    height: 100%;
  }

  .vertical #indicator {
    top: calc(100% - var(--end));
    bottom: var(--start);
    left: 0;
    width: 100%;
  }

  /* Thumbs */
  #thumb,
  #thumb-min,
  #thumb-max {
    z-index: 3;
    position: absolute;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border: solid 0.125em var(--wa-color-surface-default);
    border-radius: 50%;
    background-color: var(--wa-form-control-activated-color);
    cursor: pointer;
  }

  .disabled #thumb,
  .disabled #thumb-min,
  .disabled #thumb-max {
    cursor: inherit;
  }

  .horizontal #thumb,
  .horizontal #thumb-min,
  .horizontal #thumb-max {
    top: calc(50% - var(--thumb-height) / 2);

    &:dir(ltr) {
      right: auto;
      left: calc(var(--position) - var(--thumb-width) / 2);
    }

    &:dir(rtl) {
      right: calc(var(--position) - var(--thumb-width) / 2);
      left: auto;
    }
  }

  .vertical #thumb,
  .vertical #thumb-min,
  .vertical #thumb-max {
    bottom: calc(var(--position) - var(--thumb-height) / 2);
    left: calc(50% - var(--thumb-width) / 2);
  }

  /* Range-specific thumb styles */
  :host([range]) {
    #thumb-min:focus-visible,
    #thumb-max:focus-visible {
      z-index: 4; /* Ensure focused thumb appears on top */
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  /* Markers */
  #markers {
    pointer-events: none;
  }

  .marker {
    z-index: 2;
    position: absolute;
    width: var(--marker-width);
    height: var(--marker-height);
    border-radius: 50%;
    background-color: var(--wa-color-surface-default);
  }

  .marker:first-of-type,
  .marker:last-of-type {
    display: none;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-height) / 2);
    left: calc(var(--position) - var(--marker-width) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-height) / 2);
    left: calc(50% - var(--marker-width) / 2);
  }

  /* Marker labels */
  #references {
    position: relative;

    slot {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    ::slotted(*) {
      color: var(--wa-color-text-quiet);
      font-size: 0.875em;
      line-height: 1;
    }
  }

  .horizontal {
    #references {
      margin-block-start: 0.5em;
    }
  }

  .vertical {
    display: flex;
    margin-inline: auto;

    #track {
      order: 1;
    }

    #references {
      order: 2;
      width: min-content;
      margin-inline-start: 0.75em;

      slot {
        flex-direction: column;
      }
    }
  }

  .vertical #references slot {
    flex-direction: column;
  }
`,ov="u">typeof window&&"ontouchstart"in window,oy=class{constructor(e,t){this.isActive=!1,this.isDragging=!1,this.handleDragStart=e=>{let t="touches"in e?e.touches[0].clientX:e.clientX,i="touches"in e?e.touches[0].clientY:e.clientY;this.isDragging||!ov&&e.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("pointercancel",this.handleDragStop),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),document.addEventListener("touchcancel",this.handleDragStop),this.options.start(t,i))},this.handleDragStop=e=>{let t="changedTouches"in e?e.changedTouches[0].clientX:e.clientX,i="changedTouches"in e?e.changedTouches[0].clientY:e.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.options.stop(t,i)},this.handleDragMove=e=>{let t="touches"in e?e.touches[0].clientX:e.clientX,i="touches"in e?e.touches[0].clientY:e.clientY;window.getSelection()?.removeAllRanges(),this.options.move(t,i)},this.element=e,this.options={start:()=>void 0,stop:()=>void 0,move:()=>void 0,...t},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),ov&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.element.removeEventListener("pointerdown",this.handleDragStart),ov&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(e){(void 0!==e?e:!this.isActive)?this.start():this.stop()}};function ow(e,t,i){let r=e=>Object.is(e,-0)?0:e;return r(e<t?t:e>i?i:e)}var ox=M`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`,o_=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},ok=Object.defineProperty,o$=Object.getOwnPropertyDescriptor,oC=e=>{throw TypeError(e)},oS=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?o$(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ok(t,i,s),s},oP=(e,t,i)=>t.has(e)||oC("Cannot "+i),oE=M`
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
`,oA=class extends lit_element_i{constructor(){let e;super(),(e=$).has(this)?oC("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,t)=>{if(this.internals?.states)try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes("must start with '--'"));else throw e}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{}for(let[e,t]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===t.default&&void 0!==t.initial&&"string"==typeof e&&this.customStates.set(`initial-${e}-${t.initial}`,!0)}static get styles(){return[oE,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(e,t,i){let r,o;if(oP(this,r=$,"read from private field"),o?!o.call(this):!r.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),oP(this,e=$,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&null==this[i]&&(this[i]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){let t=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};$=new WeakMap,oS([eM()],oA.prototype,"dir",2),oS([eM()],oA.prototype,"lang",2),oS([eM({type:Boolean,reflect:!0,attribute:"did-ssr"})],oA.prototype,"didSSR",2);var oT=class extends oA{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new o_))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[{observedAttributes:["custom-error"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let i of t.observedAttributes)e.add(i);return[...e]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(e.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),e.has("value")||e.has("disabled")||e.has("defaultValue")){let e=this.value;if(Array.isArray(e)){if(this.name){let t=new FormData;for(let i of e)t.append(this.name,i);this.setValue(t,t)}}else this.setValue(e,e)}e.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(e),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute("form",e):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],i=e[1],r=e[2];r||(r=this.validationTarget),this.internals.setValidity(t,i,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,i=this.hasInteracted;this.customStates.set("required",e),this.customStates.set("optional",!e),this.customStates.set("invalid",!t),this.customStates.set("valid",t),this.customStates.set("user-invalid",!t&&i),this.customStates.set("user-valid",t&&i)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.value=e,"restore"===t&&this.resetValidity(),this.updateValidity()}setValue(...e){let[t,i]=e;this.internals.setFormValue(t,i)}get allValidators(){return[...this.constructor.validators||[],...this.validators||[]]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate)return void this.resetValidity();let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},i=this.validationTarget||this.input||void 0,r="";for(let i of e){let{isValid:e,message:o,invalidKeys:s}=i.checkValidity(this);!e&&(r||(r=o),s?.length>=0&&s.forEach(e=>t[e]=!0))}r||(r=this.validationMessage),this.setValidity(t,r,i)}};oT.formAssociated=!0,oS([eM({reflect:!0})],oT.prototype,"name",2),oS([eM({type:Boolean})],oT.prototype,"disabled",2),oS([eM({state:!0,attribute:!1})],oT.prototype,"valueHasChanged",2),oS([eM({state:!0,attribute:!1})],oT.prototype,"hasInteracted",2),oS([eM({attribute:"custom-error",reflect:!0})],oT.prototype,"customError",2),oS([eM({attribute:!1,state:!0,type:Object})],oT.prototype,"validity",1);var oR=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{let t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return!!this.host.childNodes&&[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&""!==e.textContent.trim())return!0;if(e.nodeType===Node.ELEMENT_NODE){if("wa-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector?.(`:scope > [slot="${e}"]`)!==null}test(e){return"[default]"===e?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}},oz=M`
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
`;let oD=new Set,oO=new Map,oI="ltr",oM="en",oL="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(oL){let e=new MutationObserver(oF);oI=document.documentElement.dir||"ltr",oM=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function oB(...e){e.map(e=>{let t=e.$code.toLowerCase();oO.has(t)?oO.set(t,Object.assign(Object.assign({},oO.get(t)),e)):oO.set(t,e),c||(c=e)}),oF()}function oF(){oL&&(oI=document.documentElement.dir||"ltr",oM=document.documentElement.lang||navigator.language),[...oD.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){oD.add(this.host)}hostDisconnected(){oD.delete(this.host)}dir(){return`${this.host.dir||oI}`.toLowerCase()}lang(){return`${this.host.lang||oM}`.toLowerCase()}getTranslationData(e){var t,i;let r=new Intl.Locale(e.replace(/_/g,"-")),o=null==r?void 0:r.language.toLowerCase(),s=null!=(i=null==(t=null==r?void 0:r.region)?void 0:t.toLowerCase())?i:"",a=oO.get(`${o}-${s}`),c=oO.get(o);return{locale:r,language:o,region:s,primary:a,secondary:c}}exists(e,t){var i;let{primary:r,secondary:o}=this.getTranslationData(null!=(i=t.lang)?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!r&&!!r[e]||!!o&&!!o[e]||!!t.includeFallback&&!!c&&!!c[e]}term(e,...t){let i,{primary:r,secondary:o}=this.getTranslationData(this.lang());if(r&&r[e])i=r[e];else if(o&&o[e])i=o[e];else{if(!c||!c[e])return String(e);i=c[e]}return"function"==typeof i?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var oN={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",createOption:e=>`Create "${e}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numCharacters:e=>1===e?"1 character":`${e} characters`,numCharactersRemaining:e=>1===e?"1 character remaining":`${e} characters remaining`,numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};oB(oN);var oj=class extends LocalizeController{};oB(oN);let oW=t_(class extends directive_i{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.st)e in t||(i.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return e$}}),oV="important",oU=" !"+oV,oH=t_(class extends directive_i{constructor(e){if(super(e),1!==e.type||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{let r=e[i];return null==r?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){let{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(let e in t){let r=t[e];if(null!=r){this.ft.add(e);let t="string"==typeof r&&r.endsWith(oU);e.includes("-")||t?i.setProperty(e,t?r.slice(0,-11):r,t?oV:""):i[e]=r}}return e$}});var oq=class extends oT{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new oR(this,"hint","label"),this.localize=new oj(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=null==this.getAttribute("value")?this.minValue:Number(this.getAttribute("value")),this._value=null,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.min=0,this.max=100,this.step=1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,{observedAttributes:["min","max","step"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]},i=(e,t,i,r)=>{let o=document.createElement("input");return o.type="range",o.min=String(t),o.max=String(i),o.step=String(r),o.value=String(e),o.checkValidity(),o.validationMessage};if(e.isRange){let r=e.minValue,o=e.maxValue;if(r<e.min)return t.isValid=!1,t.invalidKeys.push("rangeUnderflow"),t.message=i(r,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,t;if(o>e.max)return t.isValid=!1,t.invalidKeys.push("rangeOverflow"),t.message=i(o,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,t;if(e.step&&1!==e.step){let s=(r-e.min)%e.step!=0,a=(o-e.min)%e.step!=0;(s||a)&&(t.isValid=!1,t.invalidKeys.push("stepMismatch"),t.message=i(s?r:o,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`)}}else{let r=e.value;if(r<e.min)return t.isValid=!1,t.invalidKeys.push("rangeUnderflow"),t.message=i(r,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,t;if(r>e.max)return t.isValid=!1,t.invalidKeys.push("rangeOverflow"),t.message=i(r,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,t;e.step&&1!==e.step&&(r-e.min)%e.step!=0&&(t.isValid=!1,t.invalidKeys.push("stepMismatch"),t.message=i(r,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`)}return t}}]}get focusableAnchor(){return this.isRange&&this.thumbMin||this.slider}get validationTarget(){return this.focusableAnchor}get value(){return this.valueHasChanged?ow(this._value??this.minValue??0,this.min,this.max):ow(this._value??this.defaultValue,this.min,this.max)}set value(e){e=Number(e)??this.minValue,this._value!==e&&(this.valueHasChanged=!0,this._value=e)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new oy(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(e,t)=>{this.setThumbValueFromCoordinates(e,t,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new oy(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(e,t)=>{this.setThumbValueFromCoordinates(e,t,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new oy(this.track,{start:(e,t)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted="min"===this.activeThumb?this.minValue:this.maxValue;else{let i=this.getValueFromCoordinates(e,t),r=Math.abs(i-this.minValue),o=Math.abs(i-this.maxValue);if(r===o)if(i>this.maxValue)this.activeThumb="max";else if(i<this.minValue)this.activeThumb="min";else{let i="rtl"===this.localize.dir(),r="vertical"===this.orientation,o=r?t:e,s=this.lastTrackPosition||o;this.lastTrackPosition=o,this.activeThumb=o>s!==i&&!r||o<s&&r?"max":"min"}else this.activeThumb=r<=o?"min":"max";this.valueWhenDraggingStarted="min"===this.activeThumb?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(e,t,this.activeThumb),this.showRangeTooltips()},move:(e,t)=>{this.activeThumb&&this.setThumbValueFromCoordinates(e,t,this.activeThumb)},stop:()=>{this.activeThumb&&("min"===this.activeThumb?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new oy(this.slider,{start:(e,t)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(e,t),this.showTooltip()},move:(e,t)=>{this.setValueFromCoordinates(e,t)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}willUpdate(e){this.isRange&&(e.has("minValue")||e.has("maxValue")||e.has("min")||e.has("max"))&&(this.minValue=ow(this.minValue,this.min,this.maxValue),this.maxValue=ow(this.maxValue,this.minValue,this.max)),super.willUpdate(e)}updated(e){if(this.isRange&&(e.has("minValue")||e.has("maxValue"))&&this.updateFormValue(),e.has("disabled")||e.has("readonly")){let e=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(e)}formDisabledCallback(e){this.disabled=e}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):(this._value=null,this.defaultValue=this.defaultValue??parseFloat(this.getAttribute("value")??String(this.min))),this.valueHasChanged=!1,this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(e){let t=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length,i=Number(this.step),r=Number(this.min),o=Number(this.max);return parseFloat((e=ow(e=Math.round(e/i)*i,r,o)).toFixed(t))}getPercentageFromValue(e){return(e-this.min)/(this.max-this.min)*100}getValueFromCoordinates(e,t){let i="rtl"===this.localize.dir(),r="vertical"===this.orientation,{top:o,right:s,bottom:a,left:c,height:h,width:p}=this.trackBoundingClientRect,u=r?t:e,g=r?{start:o,end:a,size:h}:{start:c,end:s,size:p},b=(r||i?g.end-u:u-g.start)/g.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*b)}handleBlur(){this.isRange?requestAnimationFrame(()=>{let e=this.shadowRoot?.activeElement;e!==this.thumbMin&&e!==this.thumbMax&&this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(e){let t=e.target;this.isRange?(t===this.thumbMin?this.activeThumb="min":t===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(e){let t="rtl"===this.localize.dir(),i=e.target;if(this.disabled||this.readonly||this.isRange&&(i===this.thumbMin?this.activeThumb="min":i===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;let r=this.isRange?"min"===this.activeThumb?this.minValue:this.maxValue:this.value,o=r;switch(e.key){case"ArrowUp":case t?"ArrowLeft":"ArrowRight":e.preventDefault(),o=this.clampAndRoundToStep(r+this.step);break;case"ArrowDown":case t?"ArrowRight":"ArrowLeft":e.preventDefault(),o=this.clampAndRoundToStep(r-this.step);break;case"Home":e.preventDefault(),o=this.isRange&&"min"===this.activeThumb?this.min:this.isRange?this.minValue:this.min;break;case"End":e.preventDefault(),o=this.isRange&&"max"===this.activeThumb?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":e.preventDefault();let s=Math.max(r+(this.max-this.min)/10,r+this.step);o=this.clampAndRoundToStep(s);break;case"PageDown":e.preventDefault();let a=Math.min(r-(this.max-this.min)/10,r-this.step);o=this.clampAndRoundToStep(a);break;case"Enter":var c;let h;c=this,h=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey,"Enter"!==e.key||h||setTimeout(()=>{e.defaultPrevented||e.isComposing||function(e){let t=null;if("form"in e&&(t=e.form),!t&&"getForm"in e&&(t=e.getForm()),!t)return;let i=[...t.elements];if(1===i.length)return t.requestSubmit(null);let r=i.find(e=>"submit"===e.type&&!e.matches(":disabled"));r&&(["input","button"].includes(r.localName)?t.requestSubmit(r):r.click())}(c)});return}o!==r&&(this.isRange?("min"===this.activeThumb?o>this.maxValue?(this.maxValue=o,this.minValue=o):this.minValue=Math.max(this.min,o):o<this.minValue?(this.minValue=o,this.maxValue=o):this.maxValue=Math.min(this.max,o),this.updateFormValue()):this.value=ow(o,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(e){e.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(e,t){let i=this.value;this.value=this.getValueFromCoordinates(e,t),this.value!==i&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(e,t,i){let r=this.getValueFromCoordinates(e,t),o="min"===i?this.minValue:this.maxValue;"min"===i?r>this.maxValue?(this.maxValue=r,this.minValue=r):this.minValue=Math.max(this.min,r):r<this.minValue?(this.minValue=r,this.maxValue=r):this.maxValue=Math.min(this.max,r),o!==("min"===i?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;let e=this.shadowRoot?.getElementById("tooltip-thumb-min"),t=this.shadowRoot?.getElementById("tooltip-thumb-max");"min"===this.activeThumb?(e&&(e.open=!0),t&&(t.open=!1)):"max"===this.activeThumb&&(t&&(t.open=!0),e&&(e.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;let e=this.shadowRoot?.getElementById("tooltip-thumb-min"),t=this.shadowRoot?.getElementById("tooltip-thumb-max");e&&(e.open=!1),t&&(t.open=!1)}updateFormValue(){if(this.isRange){let e=new FormData;e.append(this.name||"",String(this.minValue)),e.append(this.name||"",String(this.maxValue)),this.setValue(e)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){let e=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=ow(e,this.min,this.maxValue),this.updateFormValue()}else{let e=this.clampAndRoundToStep(this.value-this.step);this.value=e}}stepUp(){if(this.isRange){let e=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=ow(e,this.minValue,this.max),this.updateFormValue()}else{let e=this.clampAndRoundToStep(this.value+this.step);this.value=e}}render(){let e=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,i=!!this.label||!!e,r=!!this.hint||!!t,o=this.hasSlotController.test("reference"),s=oW({small:"small"===this.size,medium:"medium"===this.size,large:"large"===this.size,horizontal:"horizontal"===this.orientation,vertical:"vertical"===this.orientation,disabled:this.disabled}),a=[];if(this.withMarkers)for(let e=this.min;e<=this.max;e+=this.step)a.push(this.getPercentageFromValue(e));let c=e_`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${oW({vh:!i,"has-label":i})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,h=e_`
      <div
        id="hint"
        part="hint"
        class=${oW({"has-slotted":r})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,p=this.withMarkers?e_`
          <div id="markers" part="markers">
            ${a.map(e=>e_`<span part="marker" class="marker" style=${oH({"--position":`${e}%`})}></span>`)}
          </div>
        `:"",u=o?e_`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",g=(e,t)=>this.withTooltip?e_`
            <wa-tooltip
              id=${`tooltip${"thumb"!==e?"-"+e:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${e}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${"function"==typeof this.valueFormatter?this.valueFormatter(t):this.localize.number(t)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){let e=ow(this.getPercentageFromValue(this.minValue),0,100),t=ow(this.getPercentageFromValue(this.maxValue),0,100);return e_`
        ${c}

        <div id="slider" part="slider" class=${s}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${oH({"--start":`${Math.min(e,t)}%`,"--end":`${Math.max(e,t)}%`})}
            ></div>

            ${p}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${oH({"--position":`${e}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.minValue):this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (minimum value)`:"Minimum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style=${oH({"--position":`${t}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.maxValue):this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (maximum value)`:"Maximum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${u} ${h}
        </div>

        ${g("thumb-min",this.minValue)} ${g("thumb-max",this.maxValue)}
      `}{let e=ow(this.getPercentageFromValue(this.value),0,100),t=ow(this.getPercentageFromValue("number"==typeof this.indicatorOffset?this.indicatorOffset:this.min),0,100);return e_`
        ${c}

        <div
          id="slider"
          part="slider"
          class=${s}
          role="slider"
          aria-disabled=${this.disabled?"true":"false"}
          aria-readonly=${this.disabled?"true":"false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.value):this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled?-1:0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${oH({"--start":`${t}%`,"--end":`${e}%`})}
            ></div>

            ${p}
            <span id="thumb" part="thumb" style=${oH({"--position":`${e}%`})}></span>
          </div>

          ${u} ${h}
        </div>

        ${g("thumb",this.value)}
      `}}};oq.formAssociated=!0,oq.observeSlots=!0,oq.css=[oz,ox,of],oS([eF("#slider")],oq.prototype,"slider",2),oS([eF("#thumb")],oq.prototype,"thumb",2),oS([eF("#thumb-min")],oq.prototype,"thumbMin",2),oS([eF("#thumb-max")],oq.prototype,"thumbMax",2),oS([eF("#track")],oq.prototype,"track",2),oS([eF("#tooltip")],oq.prototype,"tooltip",2),oS([eM()],oq.prototype,"label",2),oS([eM({attribute:"hint"})],oq.prototype,"hint",2),oS([eM({reflect:!0})],oq.prototype,"name",2),oS([eM({type:Number,attribute:"min-value"})],oq.prototype,"minValue",2),oS([eM({type:Number,attribute:"max-value"})],oq.prototype,"maxValue",2),oS([eM({attribute:"value",reflect:!0,type:Number})],oq.prototype,"defaultValue",2),oS([eL()],oq.prototype,"value",1),oS([eM({type:Boolean,reflect:!0})],oq.prototype,"range",2),oS([eM({type:Boolean})],oq.prototype,"disabled",2),oS([eM({type:Boolean,reflect:!0})],oq.prototype,"readonly",2),oS([eM({reflect:!0})],oq.prototype,"orientation",2),oS([eM({reflect:!0})],oq.prototype,"size",2),oS([eM({attribute:"indicator-offset",type:Number})],oq.prototype,"indicatorOffset",2),oS([eM({type:Number})],oq.prototype,"min",2),oS([eM({type:Number})],oq.prototype,"max",2),oS([eM({type:Number})],oq.prototype,"step",2),oS([eM({type:Boolean})],oq.prototype,"autofocus",2),oS([eM({attribute:"tooltip-distance",type:Number})],oq.prototype,"tooltipDistance",2),oS([eM({attribute:"tooltip-placement",reflect:!0})],oq.prototype,"tooltipPlacement",2),oS([eM({attribute:"with-markers",type:Boolean})],oq.prototype,"withMarkers",2),oS([eM({attribute:"with-tooltip",type:Boolean})],oq.prototype,"withTooltip",2),oS([eM({attribute:"with-label",type:Boolean})],oq.prototype,"withLabel",2),oS([eM({attribute:"with-hint",type:Boolean})],oq.prototype,"withHint",2),oS([eM({attribute:!1})],oq.prototype,"valueFormatter",2),oq=oS([eO("wa-slider")],oq);var oK=M`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`,oG=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},oY=M`
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
`;let oZ=Math.min,oX=Math.max,oJ=Math.round,oQ=Math.floor,o0=e=>({x:e,y:e}),o1={left:"right",right:"left",bottom:"top",top:"bottom"};function o2(e,t){return"function"==typeof e?e(t):e}function o5(e){return e.split("-")[0]}function o4(e){return e.split("-")[1]}function o6(e){return"x"===e?"y":"x"}function o3(e){return"y"===e?"height":"width"}function o8(e){let t=e[0];return"t"===t||"b"===t?"y":"x"}function o7(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}let o9=["left","right"],se=["right","left"],st=["top","bottom"],si=["bottom","top"];function sr(e){let t=o5(e);return o1[t]+e.slice(t.length)}function so(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function ss(e){let{x:t,y:i,width:r,height:o}=e;return{width:r,height:o,top:i,left:t,right:t+r,bottom:i+o,x:t,y:i}}function sn(e,t,i){let r,{reference:o,floating:s}=e,a=o8(t),c=o6(o8(t)),h=o3(c),p=o5(t),u="y"===a,g=o.x+o.width/2-s.width/2,b=o.y+o.height/2-s.height/2,m=o[h]/2-s[h]/2;switch(p){case"top":r={x:g,y:o.y-s.height};break;case"bottom":r={x:g,y:o.y+o.height};break;case"right":r={x:o.x+o.width,y:b};break;case"left":r={x:o.x-s.width,y:b};break;default:r={x:o.x,y:o.y}}switch(o4(t)){case"start":r[c]-=m*(i&&u?-1:1);break;case"end":r[c]+=m*(i&&u?-1:1)}return r}async function sa(e,t){var i;void 0===t&&(t={});let{x:r,y:o,platform:s,rects:a,elements:c,strategy:h}=e,{boundary:p="clippingAncestors",rootBoundary:u="viewport",elementContext:g="floating",altBoundary:b=!1,padding:m=0}=o2(t,e),f=so(m),v=c[b?"floating"===g?"reference":"floating":g],w=ss(await s.getClippingRect({element:null==(i=await (null==s.isElement?void 0:s.isElement(v)))||i?v:v.contextElement||await (null==s.getDocumentElement?void 0:s.getDocumentElement(c.floating)),boundary:p,rootBoundary:u,strategy:h})),x="floating"===g?{x:r,y:o,width:a.floating.width,height:a.floating.height}:a.reference,_=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c.floating)),$=await (null==s.isElement?void 0:s.isElement(_))&&await (null==s.getScale?void 0:s.getScale(_))||{x:1,y:1},C=ss(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:_,strategy:h}):x);return{top:(w.top-C.top+f.top)/$.y,bottom:(C.bottom-w.bottom+f.bottom)/$.y,left:(w.left-C.left+f.left)/$.x,right:(C.right-w.right+f.right)/$.x}}let sl=async(e,t,i)=>{let{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:a}=i,c=a.detectOverflow?a:{...a,detectOverflow:sa},h=await (null==a.isRTL?void 0:a.isRTL(t)),p=await a.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:g}=sn(p,r,h),b=r,m=0,f={};for(let i=0;i<s.length;i++){let v=s[i];if(!v)continue;let{name:w,fn:x}=v,{x:_,y:$,data:C,reset:S}=await x({x:u,y:g,initialPlacement:r,placement:b,strategy:o,middlewareData:f,rects:p,platform:c,elements:{reference:e,floating:t}});u=null!=_?_:u,g=null!=$?$:g,f[w]={...f[w],...C},S&&m<50&&(m++,"object"==typeof S&&(S.placement&&(b=S.placement),S.rects&&(p=!0===S.rects?await a.getElementRects({reference:e,floating:t,strategy:o}):S.rects),{x:u,y:g}=sn(p,b,h)),i=-1)}return{x:u,y:g,placement:b,strategy:o,middlewareData:f}},sc=new Set(["left","top"]);async function sh(e,t){let{placement:i,platform:r,elements:o}=e,s=await (null==r.isRTL?void 0:r.isRTL(o.floating)),a=o5(i),c=o4(i),h="y"===o8(i),p=sc.has(a)?-1:1,u=s&&h?-1:1,g=o2(t,e),{mainAxis:b,crossAxis:m,alignmentAxis:f}="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:g.mainAxis||0,crossAxis:g.crossAxis||0,alignmentAxis:g.alignmentAxis};return c&&"number"==typeof f&&(m="end"===c?-1*f:f),h?{x:m*u,y:b*p}:{x:b*p,y:m*u}}function sd(){return"u">typeof window}function sp(e){return sb(e)?(e.nodeName||"").toLowerCase():"#document"}function su(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function sg(e){var t;return null==(t=(sb(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function sb(e){return!!sd()&&(e instanceof Node||e instanceof su(e).Node)}function sm(e){return!!sd()&&(e instanceof Element||e instanceof su(e).Element)}function sf(e){return!!sd()&&(e instanceof HTMLElement||e instanceof su(e).HTMLElement)}function sv(e){return!(!sd()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof su(e).ShadowRoot)}function sy(e){let{overflow:t,overflowX:i,overflowY:r,display:o}=sP(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+i)&&"inline"!==o&&"contents"!==o}function sw(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}let sx=/transform|translate|scale|rotate|perspective|filter/,s_=/paint|layout|strict|content/,sk=e=>!!e&&"none"!==e;function s$(e){let t=sm(e)?sP(e):e;return sk(t.transform)||sk(t.translate)||sk(t.scale)||sk(t.rotate)||sk(t.perspective)||!sC()&&(sk(t.backdropFilter)||sk(t.filter))||sx.test(t.willChange||"")||s_.test(t.contain||"")}function sC(){return null==h&&(h="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),h}function sS(e){return/^(html|body|#document)$/.test(sp(e))}function sP(e){return su(e).getComputedStyle(e)}function sE(e){return sm(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function sA(e){if("html"===sp(e))return e;let t=e.assignedSlot||e.parentNode||sv(e)&&e.host||sg(e);return sv(t)?t.host:t}function sT(e,t,i){var r;void 0===t&&(t=[]),void 0===i&&(i=!0);let o=function e(t){let i=sA(t);return sS(i)?t.ownerDocument?t.ownerDocument.body:t.body:sf(i)&&sy(i)?i:e(i)}(e),s=o===(null==(r=e.ownerDocument)?void 0:r.body),a=su(o);if(!s)return t.concat(o,sT(o,[],i));{let e=sR(a);return t.concat(a,a.visualViewport||[],sy(o)?o:[],e&&i?sT(e):[])}}function sR(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function sz(e){let t=sP(e),i=parseFloat(t.width)||0,r=parseFloat(t.height)||0,o=sf(e),s=o?e.offsetWidth:i,a=o?e.offsetHeight:r,c=oJ(i)!==s||oJ(r)!==a;return c&&(i=s,r=a),{width:i,height:r,$:c}}function sD(e){return sm(e)?e:e.contextElement}function sO(e){let t=sD(e);if(!sf(t))return o0(1);let i=t.getBoundingClientRect(),{width:r,height:o,$:s}=sz(t),a=(s?oJ(i.width):i.width)/r,c=(s?oJ(i.height):i.height)/o;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let sI=o0(0);function sM(e){let t=su(e);return sC()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:sI}function sL(e,t,i,r){var o;void 0===t&&(t=!1),void 0===i&&(i=!1);let s=e.getBoundingClientRect(),a=sD(e),c=o0(1);t&&(r?sm(r)&&(c=sO(r)):c=sO(e));let h=(void 0===(o=i)&&(o=!1),r&&(!o||r===su(a))&&o)?sM(a):o0(0),p=(s.left+h.x)/c.x,u=(s.top+h.y)/c.y,g=s.width/c.x,b=s.height/c.y;if(a){let e=su(a),t=r&&sm(r)?su(r):r,i=e,o=sR(i);for(;o&&r&&t!==i;){let e=sO(o),t=o.getBoundingClientRect(),r=sP(o),s=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,a=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;p*=e.x,u*=e.y,g*=e.x,b*=e.y,p+=s,u+=a,o=sR(i=su(o))}}return ss({width:g,height:b,x:p,y:u})}function sB(e,t){let i=sE(e).scrollLeft;return t?t.left+i:sL(sg(e)).left+i}function sF(e,t){let i=e.getBoundingClientRect();return{x:i.left+t.scrollLeft-sB(e,i),y:i.top+t.scrollTop}}function sN(e,t,i){var r;let o;if("viewport"===t)o=function(e,t){let i=su(e),r=sg(e),o=i.visualViewport,s=r.clientWidth,a=r.clientHeight,c=0,h=0;if(o){s=o.width,a=o.height;let e=sC();(!e||e&&"fixed"===t)&&(c=o.offsetLeft,h=o.offsetTop)}let p=sB(r);if(p<=0){let e=r.ownerDocument,t=e.body,i=getComputedStyle(t),o="CSS1Compat"===e.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,a=Math.abs(r.clientWidth-t.clientWidth-o);a<=25&&(s-=a)}else p<=25&&(s+=p);return{width:s,height:a,x:c,y:h}}(e,i);else if("document"===t){let t,i,s,a,c,h,p;r=sg(e),t=sg(r),i=sE(r),s=r.ownerDocument.body,a=oX(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),c=oX(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight),h=-i.scrollLeft+sB(r),p=-i.scrollTop,"rtl"===sP(s).direction&&(h+=oX(t.clientWidth,s.clientWidth)-a),o={width:a,height:c,x:h,y:p}}else if(sm(t)){let e,r,s,a,c,h;r=(e=sL(t,!0,"fixed"===i)).top+t.clientTop,s=e.left+t.clientLeft,a=sf(t)?sO(t):o0(1),c=t.clientWidth*a.x,h=t.clientHeight*a.y,o={width:c,height:h,x:s*a.x,y:r*a.y}}else{let i=sM(e);o={x:t.x-i.x,y:t.y-i.y,width:t.width,height:t.height}}return ss(o)}function sj(e){return"static"===sP(e).position}function sW(e,t){if(!sf(e)||"fixed"===sP(e).position)return null;if(t)return t(e);let i=e.offsetParent;return sg(e)===i&&(i=i.ownerDocument.body),i}function sV(e,t){var i;let r=su(e);if(sw(e))return r;if(!sf(e)){let t=sA(e);for(;t&&!sS(t);){if(sm(t)&&!sj(t))return t;t=sA(t)}return r}let o=sW(e,t);for(;o&&(i=o,/^(table|td|th)$/.test(sp(i)))&&sj(o);)o=sW(o,t);return o&&sS(o)&&sj(o)&&!s$(o)?r:o||function(e){let t=sA(e);for(;sf(t)&&!sS(t);){if(s$(t))return t;if(sw(t))break;t=sA(t)}return null}(e)||r}let sU=async function(e){let t=this.getOffsetParent||sV,i=this.getDimensions,r=await i(e.floating);return{reference:function(e,t,i){let r=sf(t),o=sg(t),s="fixed"===i,a=sL(e,!0,s,t),c={scrollLeft:0,scrollTop:0},h=o0(0);if(r||!r&&!s)if(("body"!==sp(t)||sy(o))&&(c=sE(t)),r){let e=sL(t,!0,s,t);h.x=e.x+t.clientLeft,h.y=e.y+t.clientTop}else o&&(h.x=sB(o));s&&!r&&o&&(h.x=sB(o));let p=!o||r||s?o0(0):sF(o,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},sH={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:i,offsetParent:r,strategy:o}=e,s="fixed"===o,a=sg(r),c=!!t&&sw(t.floating);if(r===a||c&&s)return i;let h={scrollLeft:0,scrollTop:0},p=o0(1),u=o0(0),g=sf(r);if((g||!g&&!s)&&(("body"!==sp(r)||sy(a))&&(h=sE(r)),g)){let e=sL(r);p=sO(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let b=!a||g||s?o0(0):sF(a,h);return{width:i.width*p.x,height:i.height*p.y,x:i.x*p.x-h.scrollLeft*p.x+u.x+b.x,y:i.y*p.y-h.scrollTop*p.y+u.y+b.y}},getDocumentElement:sg,getClippingRect:function(e){let{element:t,boundary:i,rootBoundary:r,strategy:o}=e,s=[..."clippingAncestors"===i?sw(t)?[]:function(e,t){let i=t.get(e);if(i)return i;let r=sT(e,[],!1).filter(e=>sm(e)&&"body"!==sp(e)),o=null,s="fixed"===sP(e).position,a=s?sA(e):e;for(;sm(a)&&!sS(a);){let t=sP(a),i=s$(a);i||"fixed"!==t.position||(o=null),(s?i||o:!(!i&&"static"===t.position&&o&&("absolute"===o.position||"fixed"===o.position)||sy(a)&&!i&&function e(t,i){let r=sA(t);return!(r===i||!sm(r)||sS(r))&&("fixed"===sP(r).position||e(r,i))}(e,a)))?o=t:r=r.filter(e=>e!==a),a=sA(a)}return t.set(e,r),r}(t,this._c):[].concat(i),r],a=sN(t,s[0],o),c=a.top,h=a.right,p=a.bottom,u=a.left;for(let e=1;e<s.length;e++){let i=sN(t,s[e],o);c=oX(i.top,c),h=oZ(i.right,h),p=oZ(i.bottom,p),u=oX(i.left,u)}return{width:h-u,height:p-c,x:u,y:c}},getOffsetParent:sV,getElementRects:sU,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:i}=sz(e);return{width:t,height:i}},getScale:sO,isElement:sm,isRTL:function(e){return"rtl"===sP(e).direction}};function sq(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}let sK=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var i,r;let o,s,{placement:a,rects:c,platform:h,elements:p}=t,{apply:u=()=>{},...g}=o2(e,t),b=await h.detectOverflow(t,g),m=o5(a),f=o4(a),v="y"===o8(a),{width:w,height:x}=c.floating;"top"===m||"bottom"===m?(o=m,s=f===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(s=m,o="end"===f?"top":"bottom");let _=x-b.top-b.bottom,$=w-b.left-b.right,C=oZ(x-b[o],_),S=oZ(w-b[s],$),P=!t.middlewareData.shift,E=C,A=S;if(null!=(i=t.middlewareData.shift)&&i.enabled.x&&(A=$),null!=(r=t.middlewareData.shift)&&r.enabled.y&&(E=_),P&&!f){let e=oX(b.left,0),t=oX(b.right,0),i=oX(b.top,0),r=oX(b.bottom,0);v?A=w-2*(0!==e||0!==t?e+t:oX(b.left,b.right)):E=x-2*(0!==i||0!==r?i+r:oX(b.top,b.bottom))}await u({...t,availableWidth:A,availableHeight:E});let T=await h.getDimensions(p.floating);return w!==T.width||x!==T.height?{reset:{rects:!0}}:{}}}};function sG(e){var t=e;for(let e=t;e;e=sY(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=sY(t);e;e=sY(e)){if(!(e instanceof Element))continue;let t=getComputedStyle(e);if("contents"!==t.display&&("static"!==t.position||s$(t)||"BODY"===e.tagName))return e}return null}function sY(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function sZ(e){return null!==e&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e instanceof Element)}var sX=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),sJ=class extends oA{constructor(){super(...arguments),this.localize=new oj(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),r=0,o=0,s=0,a=0,c=0,h=0,p=0,u=0;i?e.top<t.top?(r=e.left,o=e.bottom,s=e.right,a=e.bottom,c=t.left,h=t.top,p=t.right,u=t.top):(r=t.left,o=t.bottom,s=t.right,a=t.bottom,c=e.left,h=e.top,p=e.right,u=e.top):e.left<t.left?(r=e.right,o=e.top,s=t.left,a=t.top,c=e.right,h=e.bottom,p=t.left,u=t.bottom):(r=t.right,o=t.top,s=e.left,a=e.top,c=t.right,h=t.bottom,p=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||sZ(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(e,t,i,r){let o;void 0===r&&(r={});let{ancestorScroll:s=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=r,u=sD(e),g=s||a?[...u?sT(u):[],...t?sT(t):[]]:[];g.forEach(e=>{s&&e.addEventListener("scroll",i,{passive:!0}),a&&e.addEventListener("resize",i)});let b=u&&h?function(e,t){let i,r=null,o=sg(e);function s(){var e;clearTimeout(i),null==(e=r)||e.disconnect(),r=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),s();let p=e.getBoundingClientRect(),{left:u,top:g,width:b,height:m}=p;if(c||t(),!b||!m)return;let f={rootMargin:-oQ(g)+"px "+-oQ(o.clientWidth-(u+b))+"px "+-oQ(o.clientHeight-(g+m))+"px "+-oQ(u)+"px",threshold:oX(0,oZ(1,h))||1},v=!0;function w(t){let r=t[0].intersectionRatio;if(r!==h){if(!v)return a();r?a(!1,r):i=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==r||sq(p,e.getBoundingClientRect())||a(),v=!1}try{r=new IntersectionObserver(w,{...f,root:o.ownerDocument})}catch{r=new IntersectionObserver(w,f)}r.observe(e)}(!0),s}(u,i):null,m=-1,f=null;c&&(f=new ResizeObserver(e=>{let[r]=e;r&&r.target===u&&f&&t&&(f.unobserve(t),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var e;null==(e=f)||e.observe(t)})),i()}),u&&!p&&f.observe(u),t&&f.observe(t));let v=p?sL(e):null;return p&&function t(){let r=sL(e);v&&!sq(v,r)&&i(),v=r,o=requestAnimationFrame(t)}(),i(),()=>{var e;g.forEach(e=>{s&&e.removeEventListener("scroll",i),a&&e.removeEventListener("resize",i)}),null==b||b(),null==(e=f)||e.disconnect(),f=null,p&&cancelAnimationFrame(o)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,i,r,o,s;let a,c,h,p,u;if(!this.active||!this.anchorEl||!this.popup)return;let g=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var i,r;let{x:o,y:s,placement:a,middlewareData:c}=t,h=await sh(t,e);return a===(null==(i=c.offset)?void 0:i.placement)&&null!=(r=c.arrow)&&r.alignmentOffset?{}:{x:o+h.x,y:s+h.y,data:{...h,placement:a}}}}];this.sync?g.push(sK({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),sX&&!sZ(this.anchor)&&"scroll"===this.boundary&&(a=sT(this.anchorEl).filter(e=>e instanceof Element)),this.flip&&g.push({name:"flip",options:t={boundary:this.flipBoundary||a,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var i,r,o,s,a,c,h,p;let u,g,b,{placement:m,middlewareData:f,rects:v,initialPlacement:w,platform:x,elements:_}=e,{mainAxis:$=!0,crossAxis:C=!0,fallbackPlacements:S,fallbackStrategy:P="bestFit",fallbackAxisSideDirection:E="none",flipAlignment:A=!0,...T}=o2(t,e);if(null!=(i=f.arrow)&&i.alignmentOffset)return{};let D=o5(m),O=o8(w),M=o5(w)===w,B=await (null==x.isRTL?void 0:x.isRTL(_.floating)),F=S||(M||!A?[sr(w)]:(u=sr(w),[o7(w),u,o7(u)])),N="none"!==E;!S&&N&&F.push(...(g=o4(w),b=function(e,t,i){switch(e){case"top":case"bottom":if(i)return t?se:o9;return t?o9:se;case"left":case"right":return t?st:si;default:return[]}}(o5(w),"start"===E,B),g&&(b=b.map(e=>e+"-"+g),A&&(b=b.concat(b.map(o7)))),b));let j=[w,...F],W=await x.detectOverflow(e,T),V=[],U=(null==(r=f.flip)?void 0:r.overflows)||[];if($&&V.push(W[D]),C){let e,t,i,r,o=(c=m,h=v,void 0===(p=B)&&(p=!1),e=o4(c),i=o3(t=o6(o8(c))),r="x"===t?e===(p?"end":"start")?"right":"left":"start"===e?"bottom":"top",h.reference[i]>h.floating[i]&&(r=sr(r)),[r,sr(r)]);V.push(W[o[0]],W[o[1]])}if(U=[...U,{placement:m,overflows:V}],!V.every(e=>e<=0)){let e=((null==(o=f.flip)?void 0:o.index)||0)+1,t=j[e];if(t&&("alignment"!==C||O===o8(t)||U.every(e=>o8(e.placement)!==O||e.overflows[0]>0)))return{data:{index:e,overflows:U},reset:{placement:t}};let i=null==(s=U.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:s.placement;if(!i)switch(P){case"bestFit":{let e=null==(a=U.filter(e=>{if(N){let t=o8(e.placement);return t===O||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:a[0];e&&(i=e);break}case"initialPlacement":i=w}if(m!==i)return{reset:{placement:i}}}return{}}}),this.shift&&g.push({name:"shift",options:i={boundary:this.shiftBoundary||a,padding:this.shiftPadding},async fn(e){let{x:t,y:r,placement:o,platform:s}=e,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:e=>{let{x:t,y:i}=e;return{x:t,y:i}}},...p}=o2(i,e),u={x:t,y:r},g=await s.detectOverflow(e,p),b=o8(o5(o)),m=o6(b),f=u[m],v=u[b];if(a){let e="y"===m?"top":"left",t="y"===m?"bottom":"right",i=f+g[e],r=f-g[t];f=oX(i,oZ(f,r))}if(c){let e="y"===b?"top":"left",t="y"===b?"bottom":"right",i=v+g[e],r=v-g[t];v=oX(i,oZ(v,r))}let w=h.fn({...e,[m]:f,[b]:v});return{...w,data:{x:w.x-t,y:w.y-r,enabled:{[m]:a,[b]:c}}}}}),this.autoSize?g.push(sK({boundary:this.autoSizeBoundary||a,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&g.push({name:"arrow",options:c={element:this.arrowEl,padding:this.arrowPadding},async fn(e){let{x:t,y:i,placement:r,rects:o,platform:s,elements:a,middlewareData:h}=e,{element:p,padding:u=0}=o2(c,e)||{};if(null==p)return{};let g=so(u),b={x:t,y:i},m=o6(o8(r)),f=o3(m),v=await s.getDimensions(p),w="y"===m,x=w?"clientHeight":"clientWidth",_=o.reference[f]+o.reference[m]-b[m]-o.floating[f],$=b[m]-o.reference[m],C=await (null==s.getOffsetParent?void 0:s.getOffsetParent(p)),S=C?C[x]:0;S&&await (null==s.isElement?void 0:s.isElement(C))||(S=a.floating[x]||o.floating[f]);let P=S/2-v[f]/2-1,E=oZ(g[w?"top":"left"],P),A=oZ(g[w?"bottom":"right"],P),T=S-v[f]-A,D=S/2-v[f]/2+(_/2-$/2),O=oX(E,oZ(D,T)),M=!h.arrow&&null!=o4(r)&&D!==O&&o.reference[f]/2-(D<E?E:A)-v[f]/2<0,B=M?D<E?D-E:D-T:0;return{[m]:b[m]+B,data:{[m]:O,centerOffset:D-O-B,...M&&{alignmentOffset:B}},reset:M}}});let b=sX?e=>sH.getOffsetParent(e,sG):sH.getOffsetParent;(r=this.anchorEl,o=this.popup,s={placement:this.placement,middleware:g,strategy:sX?"absolute":"fixed",platform:{...sH,getOffsetParent:b}},h=new Map,u={...(p={platform:sH,...s}).platform,_c:h},sl(r,o,{...p,platform:u})).then(({x:e,y:t,middlewareData:i,placement:r})=>{let o="rtl"===this.localize.dir(),s={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=i.arrow.x,t=i.arrow.y,r="",a="",c="",h="";if("start"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=o?i:"",h=o?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=o?"":i,h=o?i:"",c="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",r="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof e?`${e}px`:"",r="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:r,right:a,bottom:c,left:h,[s]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new oG)}render(){return e_`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${oW({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${oW({popup:!0,"popup-active":this.active,"popup-fixed":!sX,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?e_`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};sJ.css=oY,oS([eF(".popup")],sJ.prototype,"popup",2),oS([eF(".arrow")],sJ.prototype,"arrowEl",2),oS([eM()],sJ.prototype,"anchor",2),oS([eM({type:Boolean,reflect:!0})],sJ.prototype,"active",2),oS([eM({reflect:!0})],sJ.prototype,"placement",2),oS([eM()],sJ.prototype,"boundary",2),oS([eM({type:Number})],sJ.prototype,"distance",2),oS([eM({type:Number})],sJ.prototype,"skidding",2),oS([eM({type:Boolean})],sJ.prototype,"arrow",2),oS([eM({attribute:"arrow-placement"})],sJ.prototype,"arrowPlacement",2),oS([eM({attribute:"arrow-padding",type:Number})],sJ.prototype,"arrowPadding",2),oS([eM({type:Boolean})],sJ.prototype,"flip",2),oS([eM({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],sJ.prototype,"flipFallbackPlacements",2),oS([eM({attribute:"flip-fallback-strategy"})],sJ.prototype,"flipFallbackStrategy",2),oS([eM({type:Object})],sJ.prototype,"flipBoundary",2),oS([eM({attribute:"flip-padding",type:Number})],sJ.prototype,"flipPadding",2),oS([eM({type:Boolean})],sJ.prototype,"shift",2),oS([eM({type:Object})],sJ.prototype,"shiftBoundary",2),oS([eM({attribute:"shift-padding",type:Number})],sJ.prototype,"shiftPadding",2),oS([eM({attribute:"auto-size"})],sJ.prototype,"autoSize",2),oS([eM()],sJ.prototype,"sync",2),oS([eM({type:Object})],sJ.prototype,"autoSizeBoundary",2),oS([eM({attribute:"auto-size-padding",type:Number})],sJ.prototype,"autoSizePadding",2),oS([eM({attribute:"hover-bridge",type:Boolean})],sJ.prototype,"hoverBridge",2),sJ=oS([eO("wa-popup")],sJ);var sQ=[];function s0(e){for(let t=sQ.length-1;t>=0;t--)if(sQ[t]===e){sQ.splice(t,1);break}}var s1=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}},s2=class extends Event{constructor(e){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}},s5=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},s4=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};function s6(e,t){return new Promise(i=>{e.addEventListener(t,function r(o){o.target===e&&(e.removeEventListener(t,r),i())})})}function s3(e,t){return new Promise(i=>{let r=new AbortController,{signal:o}=r;if(e.classList.contains(t))return;e.classList.add(t);let s=!1,a=()=>{s||(s=!0,e.classList.remove(t),i(),r.abort())};e.addEventListener("animationend",a,{once:!0,signal:o}),e.addEventListener("animationcancel",a,{once:!0,signal:o}),requestAnimationFrame(()=>{s||0!==e.getAnimations().length||a()})})}function s8(e,t){let i={waitUntilFirstUpdate:!1,...t};return(t,r)=>{let{update:o}=t,s=Array.isArray(e)?e:[e];t.update=function(e){s.forEach(t=>{if(e.has(t)){let o=e.get(t),s=this[t];o!==s&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[r](o,s)}}),o.call(this,e)}}}var s7=class extends oA{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&sQ.length>0&&sQ[sQ.length-1]===this&&(e.preventDefault(),e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let e=!!this.anchor?.matches(":hover"),t=this.matches(":hover");!e&&!t&&(clearTimeout(this.hoverTimeout),e||t||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay)))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=function(e=""){return`${e}${((e=21)=>{let t="",i=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&i[e]];return t})()}`}("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),s0(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}addToAriaLabelledBy(e,t){let i=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);i.includes(t)||(i.push(t),e.setAttribute("aria-labelledby",i.join(" ")))}removeFromAriaLabelledBy(e,t){let i=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(e=>e!==t);i.length>0?e.setAttribute("aria-labelledby",i.join(" ")):e.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let e=new s1;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),sQ.push(this),this.body.hidden=!1,this.popup.active=!0,await s3(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new s4)}else{let e=new s2;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),s0(this),await s3(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new s5)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,i=this.anchor;if(t===i)return;let{signal:r}=this.eventController;t&&(this.addToAriaLabelledBy(t,this.id),t.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),t.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),t.addEventListener("click",this.handleClick,{signal:r}),t.addEventListener("mouseover",this.handleMouseOver,{signal:r}),t.addEventListener("mouseout",this.handleMouseOut,{signal:r})),i&&(this.removeFromAriaLabelledBy(i,this.id),i.removeEventListener("blur",this.handleBlur,{capture:!0}),i.removeEventListener("focus",this.handleFocus,{capture:!0}),i.removeEventListener("click",this.handleClick),i.removeEventListener("mouseover",this.handleMouseOver),i.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,s6(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,s6(this,"wa-after-hide")}render(){return e_`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${oW({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};s7.css=oK,s7.dependencies={"wa-popup":sJ},oS([eF("slot:not([name])")],s7.prototype,"defaultSlot",2),oS([eF(".body")],s7.prototype,"body",2),oS([eF("wa-popup")],s7.prototype,"popup",2),oS([eM()],s7.prototype,"placement",2),oS([eM({type:Boolean,reflect:!0})],s7.prototype,"disabled",2),oS([eM({type:Number})],s7.prototype,"distance",2),oS([eM({type:Boolean,reflect:!0})],s7.prototype,"open",2),oS([eM({type:Number})],s7.prototype,"skidding",2),oS([eM({attribute:"show-delay",type:Number})],s7.prototype,"showDelay",2),oS([eM({attribute:"hide-delay",type:Number})],s7.prototype,"hideDelay",2),oS([eM()],s7.prototype,"trigger",2),oS([eM({attribute:"without-arrow",type:Boolean,reflect:!0})],s7.prototype,"withoutArrow",2),oS([eM()],s7.prototype,"for",2),oS([eL()],s7.prototype,"anchor",2),oS([s8("open",{waitUntilFirstUpdate:!0})],s7.prototype,"handleOpenChange",1),oS([s8("for")],s7.prototype,"handleForChange",1),oS([s8(["distance","placement","skidding"])],s7.prototype,"handleOptionsChange",1),oS([s8("disabled")],s7.prototype,"handleDisabledChange",1),s7=oS([eO("wa-tooltip")],s7);var s9=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,nt=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ne(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&s9(t,i,s),s};let ni="gl-chart-slider",nr=class extends GlElement{constructor(){super(...arguments),this._value=0,this._max=0,this._min=0,this._shift=!1,this.handleShowTooltip=()=>{let e=this._slider?.shadowRoot?.getElementById("tooltip");null!=e&&(e.open=!0)},this.handleHideTooltip=()=>{let e=this._slider?.shadowRoot?.getElementById("tooltip");null!=e&&(e.open=!1)}}get data(){return this._data}set data(e){this._data!==e&&(this._data=e,this._min=0,this._max=(e?.length??1)-1)}get shift(){return this._shift}set shift(e){this._shift=e}get value(){return this.data?.[this._value]}render(){return e_`<div class="slider-container">
			<wa-slider
				id="slider"
				.min=${this._min}
				.max=${this._max}
				.value=${this._value}
				.indicatorOffset=${this._max}
				with-tooltip
				tooltip-placement="top"
				.valueFormatter=${e=>"Hold shift to compare with working tree"}
				@change=${this.handleSliderInput}
				@input=${this.handleSliderInput}
				@click=${this.handleSliderInput}
				@pointerenter=${this.handleShowTooltip}
				@pointermove=${this.handleShowTooltip}
				@pointerleave=${this.handleHideTooltip}
			></wa-slider>
		</div>`}select(e){let t;if("string"==typeof e)t=this.data?.findIndex(t=>t.sha===e);else{let i=e.toISOString();t=this.data?.findIndex(e=>e.date===i)}null!=t&&-1!==t&&(this._value=t)}handleSliderInput(e){if(!this.data?.length)return;let t=parseInt(e.target.value),i=new Date(this.data[t].date);this.emit("gl-slider-change",{date:i,shift:this.shift,interim:"input"===e.type})}};nr.tagName=ni,nr.styles=M`
		:host {
			display: block;
		}

		.slider-container {
			width: 100%;
			position: relative;
			padding-bottom: 0.4rem;
		}

		wa-slider {
			--track-size: 3px;
			--thumb-width: 16px;
			--thumb-height: 16px;
		}

		wa-slider::part(track) {
			background-color: var(--vscode-scrollbarSlider-background);
		}

		/* Indicator is anchored to max via indicator-offset, so it spans thumb to right edge —
		   the range from the selected commit to the working tree. Hidden by default (matches
		   track), revealed in the accent color only while Shift is held. */
		wa-slider::part(indicator) {
			background-color: transparent;
		}

		:host([shift]) wa-slider::part(indicator) {
			background-color: var(--wa-color-primary-600);
		}

		/* WA's thumb defaults to var(--wa-form-control-activated-color) (background) + 2px
		   border in var(--wa-color-surface-default) — neither token is defined since we
		   don't ship WA's theme CSS, so the thumb is invisible without these overrides. */
		wa-slider::part(thumb) {
			cursor: pointer;
			background-color: var(--vscode-foreground);
			border: 2px solid var(--vscode-editor-background);
		}
	`,nt([eL()],nr.prototype,"_value",2),nt([eM({type:Array})],nr.prototype,"data",1),nt([eM({type:Boolean})],nr.prototype,"shift",1),nt([eF("wa-slider")],nr.prototype,"_slider",2),nr=nt([eO(ni)],nr);var no=Object.defineProperty,ns=Object.getOwnPropertyDescriptor,nn=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ns(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&no(t,i,s),s};let na="gl-chart-scroller",nl=class extends GlElement{constructor(){super(...arguments),this.position=0,this.size=100,this.onDragStart=e=>{if(!this.isScrollable())return;e.preventDefault(),e.stopPropagation();let t=e.currentTarget,i=t.parentElement;if(!i)return;t.setPointerCapture(e.pointerId);let[r,o]=this.range,s=this.visibleRange[1]-this.visibleRange[0];this._dragInfo={startX:e.clientX,startPosition:this.position,trackWidth:i.offsetWidth,viewRange:o-r,zoomRange:s,viewStart:r,maxPosition:100-this.size,pointerId:e.pointerId},this.emit("gl-scroll-start")},this.onDragMove=e=>{if(e.pointerId!==this._dragInfo?.pointerId)return;e.preventDefault(),e.stopPropagation();let t=(e.clientX-this._dragInfo.startX)/this._dragInfo.trackWidth*100,i=Math.max(0,Math.min(this._dragInfo.maxPosition,this._dragInfo.startPosition+t))/(100-this.size)*(this._dragInfo.viewRange-this._dragInfo.zoomRange),r=this._dragInfo.viewStart+i,o=r+this._dragInfo.zoomRange;this.emitScrollEvent(r,o)},this.onDragEnd=e=>{if(!this._dragInfo||e&&e.pointerId!==this._dragInfo.pointerId)return;let t=this.renderRoot.querySelector(".thumb");t&&this._dragInfo.pointerId&&t.releasePointerCapture(this._dragInfo.pointerId),this._dragInfo=void 0,this.requestUpdate(),this.emit("gl-scroll-end")},this.onTrackClick=e=>{if(!this.isScrollable()||e.target!==e.currentTarget)return;let t=e.currentTarget.getBoundingClientRect(),i=(e.clientX-t.left)/t.width,[r,o]=this.range,s=this.visibleRange[1]-this.visibleRange[0],a=o-r,c=r+a*i,h=Math.max(r,Math.min(o-s,c-s/2));this.emitScrollEvent(h,h+s)},this.onWheel=e=>{if(e.ctrlKey)return void Object.defineProperty(e,"ctrlKey",{value:!1});if(e.stopPropagation(),e.stopImmediatePropagation(),!this.isScrollable())return;let t=null!=this._wheelTimer;t&&clearTimeout(this._wheelTimer),this._wheelTimer=setTimeout(()=>{this._wheelTimer=void 0,this.emit("gl-scroll-end")},150),t||this.emit("gl-scroll-start");let[i,r]=this.range,[o,s]=this.visibleRange,a=s-o,c=e.deltaY*a*.001,h=Math.max(i,Math.min(r-a,o+c));this.emitScrollEvent(h,h+a)}}isScrollable(){return null!=this.range&&null!=this.visibleRange&&this.size<100}connectedCallback(){super.connectedCallback?.(),this.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0})}disconnectedCallback(){this.onDragEnd(),this.removeEventListener("wheel",this.onWheel),super.disconnectedCallback?.()}willUpdate(e){({size:this.size,position:this.position}=this.calculateScrollState()),this.style.setProperty("--thumb-width",`${this.size}%`),this.style.setProperty("--thumb-left",`${this.position}%`)}render(){return e_`<slot></slot>
			<div class="track" part="track" ?scrollable="${this.isScrollable()}" @pointerdown="${this.onTrackClick}">
				<div
					class="thumb"
					@pointerdown="${this.onDragStart}"
					@pointermove="${this.onDragMove}"
					@pointerup="${this.onDragEnd}"
					@pointercancel="${this.onDragEnd}"
					@lostpointercapture="${this.onDragEnd}"
				></div>
			</div>`}calculateScrollState(){if(null==this.range||null==this.visibleRange)return{position:0,size:100};let[e,t]=this.range,[i,r]=this.visibleRange,o=t-e,s=r-i;if(o<=1||s<=1)return{position:0,size:100};let a=Math.max(20,Math.min(100,s/o*100)),c=o-s;return c<=0?{position:0,size:a}:{position:Math.max(0,Math.min(100-a,(i-e)/c*(100-a))),size:a}}emitScrollEvent(e,t){(e!==this.visibleRange?.[0]||t!==this.visibleRange[1])&&this.emit("gl-scroll",{range:[e,t]})}};nl.tagName=na,nl.styles=M`
		:host {
			--track-top: unset;
			--track-left: 0;
			--track-width: 100%;
			--track-height: 1.2rem;

			--thumb-height: 0.6rem;
			--thumb-width: 2rem;
			--thumb-left: 0;
		}

		.track {
			visibility: hidden;
			position: absolute;
			background: transparent;
			top: var(--track-top);
			left: var(--track-left);
			width: var(--track-width, 100%);
			height: var(--track-height, 1rem);
			z-index: 1;
		}

		.track[scrollable] {
			visibility: visible;
		}

		.thumb {
			position: absolute;
			top: 0;
			left: var(--thumb-left);
			height: var(--thumb-height);
			width: var(--thumb-width);
			min-width: 2rem;
			background: transparent;
			transition: background 1s linear;
			cursor: default;
		}

		/* :host(:focus-within) .thumb, */
		:host(:hover) .thumb {
			background: var(--vscode-scrollbarSlider-background);
			transition: none;
		}

		.thumb:hover {
			background: var(--vscode-scrollbarSlider-hoverBackground) !important;
		}

		.thumb:active {
			background: var(--vscode-scrollbarSlider-activeBackground) !important;
		}
	`,nn([eM({type:Array})],nl.prototype,"range",2),nn([eM({type:Array})],nl.prototype,"visibleRange",2),nn([eL()],nl.prototype,"position",2),nn([eL()],nl.prototype,"size",2),nl=nn([eO(na)],nl);let nc=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a","add-small":"\\ec7b","remove-small":"\\ec7c","worktree-small":"\\ec7d",worktree:"\\ec7e","screen-cut":"\\ec7f",ask:"\\ec80",openai:"\\ec81",claude:"\\ec82","open-in-window":"\\ec83","new-session":"\\ec84"}),nh=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147","diff-right":"\\f11b","diff-left":"\\f12e","accept-right":"\\f12f","accept-left":"\\f130","accept-all-right":"\\f131","accept-all-left":"\\f132",continue:"\\f148",skip:"\\f149",abort:"\\f14a",pause:"\\f14b"});var nd=Object.defineProperty,np=Object.getOwnPropertyDescriptor,nu=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?np(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nd(t,i,s),s};function ng(e,t=""){return O(Object.entries(e).map(([e,i])=>(function(e,t,i=""){return`:host([icon='${i}${e}'])::before { content: '${t}'; }`})(e,i,t)).join(""))}let nb=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(e){e.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(e)}};nb.styles=M`
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

		${ng(nc)}
		${ng(nh,"gl-")}

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
	`,nu([eM({reflect:!0})],nb.prototype,"icon",2),nu([eM({reflect:!0})],nb.prototype,"modifier",2),nu([eM({type:Number})],nb.prototype,"size",2),nu([eM({reflect:!0})],nb.prototype,"flip",2),nu([eM({reflect:!0})],nb.prototype,"rotate",2),nb=nu([eO("code-icon")],nb);let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=eC,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===eC||null==e)return this._t=void 0,this.it=e;if(e===e$)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let nm=t_(unsafe_html_e);var nf=Object.defineProperty,nv=Object.getOwnPropertyDescriptor,ny=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nv(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nf(t,i,s),s};let nw=0,nx=[],n_=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.showDelay=500,this.hideDelay=0,this.suppressed=!1,this.open=!1,this.bodyId=`gl-tooltip-${++nw}`,this.onAnchorSlotChange=e=>{let t=e.target.assignedElements({flatten:!0})[0];t!==this.anchorEl&&(this.detachAnchor(),this.attachAnchor(t))},this.onDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&nx.at(-1)===this&&(e.preventDefault(),e.stopPropagation(),this.open=!1)},this.onMouseOver=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!0},this.showDelay))},this.onMouseOut=()=>{this.anchorEl?.matches(":hover")||this.matches(":hover")||(clearTimeout(this.hoverTimeout),this.hoverTimeout=setTimeout(()=>{this.open=!1},this.hideDelay))},this.onFocusIn=()=>{this.disabled||this.suppressed||(clearTimeout(this.hoverTimeout),this.open=!0)},this.onFocusOut=()=>{clearTimeout(this.hoverTimeout),this.open=!1},this.onMouseDown=e=>{this.suppressed=!0,this.open=!1},this.onMouseUp=e=>{this.suppressed=!1},this.onDragStart=e=>{this.suppressed=!0,this.open=!1},this.onDragEnd=e=>{this.suppressed=!1},this.onClick=e=>{this.hideOnClick&&(this.open=!1)}}connectedCallback(){super.connectedCallback?.(),this.eventController=new AbortController;let{signal:e}=this.eventController;this.addEventListener("mouseover",this.onMouseOver,{signal:e}),this.addEventListener("mouseout",this.onMouseOut,{signal:e}),this.addEventListener("focusin",this.onFocusIn,{signal:e}),this.addEventListener("focusout",this.onFocusOut,{signal:e}),this.addEventListener("mousedown",this.onMouseDown,{signal:e}),this.addEventListener("click",this.onClick,{signal:e}),window.addEventListener("mouseup",this.onMouseUp,{signal:e}),window.addEventListener("dragstart",this.onDragStart,{capture:!0,signal:e}),window.addEventListener("dragend",this.onDragEnd,{capture:!0,signal:e})}disconnectedCallback(){this.eventController?.abort(),this.eventController=void 0,this.detachAnchor(),this.unregisterDismissible(),clearTimeout(this.hoverTimeout),super.disconnectedCallback?.()}updated(e){e.has("open")&&(this.open?this.registerDismissible():this.unregisterDismissible()),e.has("disabled")&&this.disabled&&this.open&&(this.open=!1)}attachAnchor(e){null!=e&&(this.anchorEl=e,this.addAriaDescribedBy(e,this.bodyId))}detachAnchor(){null!=this.anchorEl&&(this.removeAriaDescribedBy(this.anchorEl,this.bodyId),this.anchorEl=void 0)}addAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);i.includes(t)||(i.push(t),e.setAttribute("aria-describedby",i.join(" ")))}removeAriaDescribedBy(e,t){let i=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean).filter(e=>e!==t);0===i.length?e.removeAttribute("aria-describedby"):e.setAttribute("aria-describedby",i.join(" "))}registerDismissible(){nx.includes(this)||(nx.push(this),document.addEventListener("keydown",this.onDocumentKeyDown,{signal:this.eventController?.signal}))}unregisterDismissible(){let e=nx.indexOf(this);-1!==e&&nx.splice(e,1),document.removeEventListener("keydown",this.onDocumentKeyDown)}async hide(){this.open=!1,await this.updateComplete}async show(){this.disabled||this.suppressed||(this.open=!0,await this.updateComplete)}render(){var e;return e_`<wa-popup
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
				<slot name="content">${e=this.content,e?.includes(`
`)?nm(e.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):e}</slot>
			</div>
		</wa-popup>`}};n_.styles=M`
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
	`,ny([eM()],n_.prototype,"content",2),ny([eM({reflect:!0})],n_.prototype,"placement",2),ny([eM({type:Boolean})],n_.prototype,"disabled",2),ny([eM({type:Number})],n_.prototype,"distance",2),ny([eM({type:Number,attribute:"show-delay"})],n_.prototype,"showDelay",2),ny([eM({type:Number,attribute:"hide-delay"})],n_.prototype,"hideDelay",2),ny([eM({type:Boolean,attribute:"hide-on-click"})],n_.prototype,"hideOnClick",2),ny([eF("wa-popup")],n_.prototype,"popup",2),ny([eL()],n_.prototype,"suppressed",2),ny([eL()],n_.prototype,"open",2),n_=ny([eO("gl-tooltip")],n_);var nk=Object.defineProperty,n$=Object.getOwnPropertyDescriptor,nC=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?n$(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nk(t,i,s),s};let nS="gl-copy-container",nP=class extends lit_element_i{constructor(){super(...arguments),this.copyLabel="Copy",this.copiedLabel="Copied",this.disabled=!1,this.placement="top",this.timeout=1e3,this._isMouseDown=!1,this.onMouseDown=()=>{this._isMouseDown=!0,window.addEventListener("mouseup",()=>this._isMouseDown=!1,{once:!0})},this.onFocusIn=()=>{this._isMouseDown||this.tooltip?.show()},this.onFocusOut=()=>{this.tooltip?.hide()}}connectedCallback(){super.connectedCallback?.(),this.label=this.copyLabel,this.addEventListener("mousedown",this.onMouseDown),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}willUpdate(e){e.has("copyLabel")&&null==this._resetTimer&&(this.label=this.copyLabel)}disconnectedCallback(){this.cancelResetTimer(),this.removeEventListener("mousedown",this.onMouseDown),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback?.()}render(){return this.content||this.disabled?e_`<gl-tooltip
			tabindex="0"
			.content="${this.label}"
			placement="${this.placement??eC}"
			@click=${this.onClick}
			@keydown=${this.onKeydown}
		>
			<slot></slot>
		</gl-tooltip>`:eC}async onClick(e){if(this.cancelResetTimer(),this.content)try{await navigator.clipboard.writeText(this.content),this.label=this.copiedLabel}catch{this.label="Unable to Copy"}else this.label="Nothing to Copy";this.createResetTimer(),await this.updateComplete,await this.tooltip?.updateComplete,this.tooltip?.show()}onKeydown(e){("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.onClick(e))}cancelResetTimer(){null!=this._resetTimer&&(clearTimeout(this._resetTimer),this._resetTimer=void 0)}createResetTimer(){this._resetTimer=setTimeout(()=>{this._resetTimer=void 0,this.label=this.copyLabel},this.timeout)}};nP.tagName=nS,nP.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nP.styles=M`
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
	`,nC([eM({reflect:!0})],nP.prototype,"appearance",2),nC([eM({reflect:!1})],nP.prototype,"content",2),nC([eM()],nP.prototype,"copyLabel",2),nC([eM()],nP.prototype,"copiedLabel",2),nC([eM({type:Boolean,reflect:!0})],nP.prototype,"disabled",2),nC([eM()],nP.prototype,"placement",2),nC([eM({type:Number})],nP.prototype,"timeout",2),nC([eL()],nP.prototype,"label",2),nC([eF("gl-tooltip")],nP.prototype,"tooltip",2),nP=nC([eO(nS)],nP);var nE=Object.defineProperty,nA=Object.getOwnPropertyDescriptor,nT=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nA(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nE(t,i,s),s};let nR=M`
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
`,nz=class extends lit_element_i{constructor(){super(...arguments),this.icon="git-commit",this.size=12}get label(){return oi(this.sha,{strings:{uncommitted:"Working",uncommittedStaged:"Staged",working:"Working"}})}render(){return null==this.sha?eC:!this.sha||oe(this.sha)?e_`<span part="label" class="label--uncommitted">${this.label}</span>`:e_`<code-icon part="icon" class="icon" icon="${this.icon}" size="${this.size}"></code-icon
			><span part="label">${this.label}</span>`}};nz.styles=nR,nT([eM({type:String})],nz.prototype,"sha",2),nT([eM({type:String})],nz.prototype,"icon",2),nT([eM({type:Number})],nz.prototype,"size",2),nz=nT([eO("gl-commit-sha")],nz);let nD=class extends lit_element_i{constructor(){super(...arguments),this.icon="git-commit",this.size=12,this.copyLabel="Copy",this.copiedLabel="Copied!",this.tooltipPlacement="top"}render(){return null==this.sha?eC:e_`<gl-copy-container
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
		</gl-copy-container>`}};nD.styles=[nR,M`
			:host(:focus) {
				outline: none;
			}
		`],nT([eM({type:String})],nD.prototype,"sha",2),nT([eM({type:String})],nD.prototype,"icon",2),nT([eM({type:Number})],nD.prototype,"size",2),nT([eM({reflect:!0})],nD.prototype,"appearance",2),nT([eM({type:String,attribute:"copy-label"})],nD.prototype,"copyLabel",2),nT([eM({type:String,attribute:"copied-label"})],nD.prototype,"copiedLabel",2),nT([eM({type:String,attribute:"tooltip-placement"})],nD.prototype,"tooltipPlacement",2),nD=nT([eO("gl-commit-sha-copy")],nD);let nO=M`
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
		position: absolute;
		top: 5%;
		bottom: 45%;
		left: 0;
		right: 0;
	}

	::slotted(p) {
		padding-top: 1rem;
		color: var(--color-foreground--75);
		font-size: 1.4rem;
	}

	.watermark {
		width: 12rem;
		height: 12rem;
		fill: color-mix(in srgb, var(--color-foreground) 15%, var(--color-background));
		transform-origin: center;
	}
`,nI=M`
	@keyframes pulse {
		0% {
			transform: scale(0.9);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(0.9);
		}
	}

	.watermark--pulse .watermark-path {
		transform: scale(0.9);
		animation: pulse 1.8s ease-in-out infinite;
		transform-origin: center;
	}

	/* Stagger the pulse animation for a wave effect on all paths */
	/* Targeting all paths using their order within the SVG */
	.watermark-path:nth-of-type(1) {
		/* Target the outer circle path */
		animation-delay: 0.2s;
	}

	.watermark-path:nth-of-type(2) {
		/* Target the connection path */
		animation-delay: 0.4s;
	}

	.watermark-path:nth-of-type(3) {
		/* Target the first dot path */
		animation-delay: 0.1s;
	}

	.watermark-path:nth-of-type(4) {
		/* Target the second dot path */
		animation-delay: 0.1s;
	}

	.watermark-path:nth-of-type(5) {
		/* Target the third dot path */
		animation-delay: 0.1s;
	}
`;var nM=Object.defineProperty,nL=Object.getOwnPropertyDescriptor,nB=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nL(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nM(t,i,s),s};let nF=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return e_`<div class="container">
			<svg
				class="watermark${this.pulse?" watermark--pulse":""}"
				viewBox="0 0 28 28"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					class="watermark-path"
					d="M14 3.25C12.5883 3.25 11.1904 3.52806 9.88615 4.0683C8.5819 4.60853 7.39683 5.40037 6.3986 6.3986C5.40037 7.39683 4.60853 8.5819 4.06829 9.88615C3.52806 11.1904 3.25 12.5883 3.25 14C3.25 15.4117 3.52806 16.8096 4.06829 18.1138C4.60853 19.4181 5.40037 20.6032 6.3986 21.6014C7.39683 22.5996 8.5819 23.3915 9.88615 23.9317C11.1904 24.4719 12.5883 24.75 14 24.75C16.8511 24.75 19.5854 23.6174 21.6014 21.6014C23.6174 19.5854 24.75 16.8511 24.75 14C24.75 11.1489 23.6174 8.41462 21.6014 6.3986C19.5854 4.38259 16.8511 3.25 14 3.25ZM2 14C2 10.8174 3.26428 7.76516 5.51472 5.51472C7.76516 3.26428 10.8174 2 14 2C17.1826 2 20.2348 3.26428 22.4853 5.51472C24.7357 7.76516 26 10.8174 26 14C26 17.1826 24.7357 20.2348 22.4853 22.4853C20.2348 24.7357 17.1826 26 14 26C10.8174 26 7.76516 24.7357 5.51472 22.4853C3.26428 20.2348 2 17.1826 2 14Z"
				/>
				<path class="watermark-path" d="M18 15L11.5 8.5L12.5 7.5L19 14L18 15ZM11.5 20V8H13V20H11.5Z" />
				<path
					class="watermark-path"
					d="M12.25 10.5C12.8467 10.5 13.419 10.2629 13.841 9.84099C14.2629 9.41903 14.5 8.84674 14.5 8.25C14.5 7.65326 14.2629 7.08097 13.841 6.65901C13.419 6.23705 12.8467 6 12.25 6C11.6533 6 11.081 6.23705 10.659 6.65901C10.2371 7.08097 10 7.65326 10 8.25C10 8.84674 10.2371 9.41903 10.659 9.84099C11.081 10.2629 11.6533 10.5 12.25 10.5Z"
				/>
				<path
					class="watermark-path"
					d="M18.25 16.5C18.5455 16.5 18.8381 16.4418 19.111 16.3287C19.384 16.2157 19.6321 16.0499 19.841 15.841C20.0499 15.6321 20.2157 15.384 20.3287 15.111C20.4418 14.8381 20.5 14.5455 20.5 14.25C20.5 13.9545 20.4418 13.6619 20.3287 13.389C20.2157 13.116 20.0499 12.8679 19.841 12.659C19.6321 12.4501 19.384 12.2843 19.111 12.1713C18.8381 12.0582 18.5455 12 18.25 12C17.6533 12 17.081 12.2371 16.659 12.659C16.2371 13.081 16 13.6533 16 14.25C16 14.8467 16.2371 15.419 16.659 15.841C17.081 16.2629 17.6533 16.5 18.25 16.5Z"
				/>
				<path
					class="watermark-path"
					d="M12.25 22C12.8467 22 13.419 21.7629 13.841 21.341C14.2629 20.919 14.5 20.3467 14.5 19.75C14.5 19.1533 14.2629 18.581 13.841 18.159C13.419 17.7371 12.8467 17.5 12.25 17.5C11.6533 17.5 11.081 17.7371 10.659 18.159C10.2371 18.581 10 19.1533 10 19.75C10 20.3467 10.2371 20.919 10.659 21.341C11.081 21.7629 11.6533 22 12.25 22Z"
				/>
			</svg>
			<slot></slot>
		</div>`}};nF.styles=[nO,nI],nB([eM({type:Boolean})],nF.prototype,"pulse",2),nF=nB([eO("gl-watermark-loader")],nF);var nN=Object.defineProperty,nj=Object.getOwnPropertyDescriptor,nW=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nj(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nN(t,i,s),s};let nV="gl-timeline-chart",nU=class extends GlElement{constructor(){super(...arguments),this._slices=new Map,this._slicesByIndex=new Map,this._commitsByTimestamp=new Map,this.placement="editor",this.sliceBy="author",this._data=null,this._suppressHoverState=!1,this._modifiers=new ModifierKeysController(this),this.onDataPointClicked=iP((e,t)=>{let i=e.x,r=i instanceof Date?i:new Date(i),o=this._commitsByTimestamp.get(r.getTime())?.sha;null!=o&&(this._shaHovered=void 0,this._shaSelected=o,this.slider?.select(o),this.emit("gl-commit-select",{id:o,shift:this._modifiers.shiftKey}))},50),this.onDataPointHovered=(e,t)=>{if(this._suppressHoverState)return;let i=e.x,r=i instanceof Date?i:new Date(i),o=this._commitsByTimestamp.get(r.getTime())?.sha;this._shaHovered=o},this.onDataPointUnhovered=(e,t)=>{if(!this._suppressHoverState&&(this._shaHovered=void 0,this._shaSelected)){let e=this._data?.find(e=>e.sha===this._shaSelected)?.date;null!=e&&this.selectDataPoint(new Date(e))}},this.onDocumentKeyDown=e=>{("Escape"===e.key||"Esc"===e.key)&&this.resetZoom()},this.onResize=e=>{this._chart&&e.length&&this.updateChartSize(e[0].contentRect)},this.onZoom=e=>{this.zoomedRange=e[0]<=this.range[0]&&e[1]>=this.range[1]?void 0:e}}get compact(){return"editor"!==this.placement}get data(){return this._data}get dataPromise(){return this._dataPromise}set dataPromise(e){this._dataPromise!==e&&(this._dataPromise=e,this._dataPromise?.then(e=>{this._data=e,this._dataReversed=e.toReversed()},()=>this._data=void 0))}get range(){return this._range}set range(e){this._range=e,this._rangeScrollable=[e[0].getTime()-144e5,e[1].getTime()+432e5],this.resetZoom()}get zoomedRange(){return this._zoomedRange}set zoomedRange(e){this._zoomedRange=e,this._zoomedRangeScrollable=e?[e[0].getTime(),e[1].getTime()]:void 0}get zoomed(){return null!=this._zoomedRange}connectedCallback(){super.connectedCallback?.(),document.addEventListener("keydown",this.onDocumentKeyDown)}firstUpdated(){this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this.chartContainer)}disconnectedCallback(){this._chart?.destroy(),this._chart=void 0,this._chartAborter?.abort(),this._chartAborter=void 0,this._loading?.cancel(),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,document.removeEventListener("keydown",this.onDocumentKeyDown),super.disconnectedCallback?.()}update(e){this.isConnected&&(e.has("dataPromise")||null==this.dataPromise)&&this.updateChart(),super.update(e)}updateChart(){if(!this._loading?.pending){let e;this._loading=((e={pending:!0,promise:void 0,fulfill:void 0,cancel:void 0}).promise=new Promise((t,i)=>{e.fulfill=function(i){e.pending=!1,t(i)},e.cancel=function(t){e.pending=!1,null!=t?i(t):i()}}),e),this._loading.promise.finally(()=>this._loading=void 0),this.emit("gl-loading",this._loading.promise)}null!=this.dataPromise&&(this._chartAborter?.abort(),this._chartAborter=new AbortController,this.renderChart(this.dataPromise,this._loading,this._chartAborter.signal))}render(){return e_`${this.renderNotice()}
			<gl-chart-scroller
				.range=${this._rangeScrollable}
				.visibleRange=${this._zoomedRangeScrollable}
				@gl-scroll=${this.onScroll}
				@gl-scroll-start=${this.onScrollStart}
				@gl-scroll-end=${this.onScrollEnd}
			>
				<div id="chart" tabindex="-1"></div>
				${this.data?.length?this.renderFooter():eC}
			</gl-chart-scroller>`}renderNotice(){return this._loading?.pending||null==this.data?e_`<div class="notice notice--blur">
				<gl-watermark-loader pulse><p>Loading...</p></gl-watermark-loader>
			</div>`:this.data.length?eC:e_`<div class="notice">
				<gl-watermark-loader><slot name="empty"></slot></gl-watermark-loader>
			</div>`}renderFooter(){let e=this._shaHovered??this._shaSelected;return e_`<footer>
			<gl-chart-slider
				.data=${this._dataReversed}
				?shift=${this._modifiers.shiftKey}
				@gl-slider-change=${this.onSliderChanged}
				@mouseover=${this.onSliderMouseOver}
				@mouseout=${this.onSliderMouseOut}
			></gl-chart-slider>
			<span @mouseover=${this.onFooterShaMouseOver} @mouseout=${this.onFooterShaMouseOut}
				><gl-commit-sha-copy .sha=${e} .size=${16}></gl-commit-sha-copy
			></span>
			${this.renderActions()}
		</footer>`}renderActions(){return e_`<div class="actions">
			${this.zoomed?e_`<gl-button
						appearance="toolbar"
						@click=${e=>e.shiftKey||e.altKey?this.resetZoom():this.zoom(-1)}
						aria-label="Zoom Out"
					>
						<code-icon icon="zoom-out"></code-icon>
						<span slot="tooltip">Zoom Out<br />${og?"⌥":"Alt"} Reset Zoom</span>
					</gl-button>`:eC}
			<gl-button appearance="toolbar" @click=${()=>this.zoom(.5)} tooltip="Zoom In" aria-label="Zoom In">
				<code-icon icon="zoom-in"></code-icon>
			</gl-button>
		</div>`}onFooterShaMouseOver(){this._shaSelected&&this.showTooltip(this._data?.find(e=>e.sha===this._shaSelected))}onFooterShaMouseOut(){this.hideTooltip()}onScrollStart(){this._chart&&this.zoomed&&(this._transitionDuration=this._chart?.config("transition.duration"),this._chart?.config("transition.duration",0))}onScrollEnd(){this._chart&&this.zoomed&&this._chart?.config("transition.duration",this._transitionDuration)}onScroll(e){if(!this._chart||!this.zoomed)return;let t=[new Date(e.detail.range[0]),new Date(e.detail.range[1])];this._chart.zoom(t)}onSliderChanged(e){this.revealDate(e.detail.date,{focus:!0,select:!0});let t=this._commitsByTimestamp.get(e.detail.date.getTime()),i=t?.sha;this._shaHovered=void 0,this._shaSelected=i,this.showTooltip(t),null==i||e.detail.interim||this.emit("gl-commit-select",{id:i,shift:e.detail.shift})}onSliderMouseOver(e){this.showTooltip(this.slider?.value)}onSliderMouseOut(e){this.hideTooltip()}resetZoom(){this.zoomedRange=void 0,this._chart?.unzoom()}revealDate(e,t){let i,r;if(!this._chart||(this.selectDataPoint(e,t),!this.zoomedRange))return;let o=this.zoomedRange,s=o[1].getTime()-o[0].getTime();if(e<o[0])r=new Date((i=new Date(e.getTime()-.2*s)).getTime()+s),i<=this.range[0]&&(r=new Date((i=eH(this.range[0],{hours:-12})).getTime()+s));else{if(!(e>o[1]))return;i=new Date((r=new Date(e.getTime()+.2*s)).getTime()-s),r>=this.range[1]&&(i=new Date((r=eH(this.range[1],{hours:12})).getTime()-s))}this._chart.zoom([i,r])}selectDataPoint(e,t){let i=this.getInternalChart();if(null==i)return;let r=this.getDataPoint(e);if(null==r)return;t?.focus&&i.showGridFocus([r]);let{index:o}=r;if(null!=o&&(this._chart?.$.main.selectAll(`.bb-chart-circles .bb-shape-${o}`).each(()=>i.setExpand?.(o,null,!0)),t?.select)){let t=this._commitsByTimestamp.get(e.getTime())?.sha;this._shaHovered=void 0,this._shaSelected=t,null!=t&&this.slider?.select(t)}}showTooltip(e){if(null!=e){this._suppressHoverState=!0;try{this._chart?.tooltip.show({x:new Date(e.date)})}finally{this._suppressHoverState=!1}}}hideTooltip(){this._suppressHoverState=!0;try{this._chart?.tooltip.hide()}finally{this._suppressHoverState=!1}}zoom(e){if(0===e)return void this.resetZoom();if(!this._chart)return;let t=this._chart.zoom(),i=[t[0].getTime(),t[1].getTime()],r=i[1]-i[0],o=new Date((i[1]+i[0])/2),s=o.getTime()-r*(1-e)/2,a=o.getTime()+r*(1-e)/2;if(a-s<(this.range[1].getTime()-this.range[0].getTime())/40)return;let c=this._chart.zoom([new Date(s),new Date(a)]);e<0&&c[0].getTime()===i[0]&&c[1].getTime()===i[1]&&this.resetZoom()}calculateBubbleSize(e,{minRadius:t,maxRadius:i,q1:r,q3:o,maxChanges:s}){let a;return 0===e?t:(a=e<=r?t+e/r*10:e<=o?t+10+(e-r)/(o-r)*15:t+25+Math.log(e-o+1)/Math.log(s-o+1)*15,Math.max(t,Math.min(i,a)))}calculateChangeMetrics(e){let t=e.map(e=>(e.additions??0)+(e.deletions??0)).sort((e,t)=>e-t);return{maxChanges:t.at(-1),q1:t[Math.floor(.25*t.length)],q3:t[Math.floor(.75*t.length)]}}getDataPoint(e){let t=e instanceof Date?e.getTime():new Date(e).getTime();return this._chart?.data()[0]?.values.find(e=>("number"==typeof e.x?e.x:e.x.getTime())===t)}getInternalChart(){try{let e=this._chart?.internal;return this._chart,e}catch{return}}getOnRenderedCallback(e){return function(){let t=this;null!=t&&t.$.main.selectAll(".bb-axis-y .tick text tspan").each(function(i){if(this==null)return;let r=e._slicesByIndex.get(-i.index),o=t.color(r);e.compact&&this.setAttribute("fill",o);let s=document.createElementNS("http://www.w3.org/2000/svg","title");s.textContent=r,this.appendChild(s)})}}prepareChartData(e,t){let i=e.length+1,r=Array(i);r[0]="time";let o=Array(i);o[0]="additions";let s=Array(i);s[0]="deletions";let a={time:"x",additions:"y2",deletions:"y2"},c={additions:"bar",deletions:"bar"},h={additions:"time",deletions:"time"};this._slices.clear(),this._slicesByIndex.clear();let p=0,u=(e,t,i)=>{let r=this._slices.get(e);null==r?(r={x:[`time.${e}`,t],y:p,z:new Map([[t,i]])},this._slices.set(e,r),this._slicesByIndex.set(p,e),a[e]="y",c[e]="scatter",h[e]=`time.${e}`,p--):(r.x.push(t),r.z.set(t,i))},g=0;for(let i of e){let{author:e,date:a,additions:c=0,deletions:h=0,branches:p}=i;this._commitsByTimestamp.set(new Date(a).getTime(),i),r[++g]=a,o[g]=c,s[g]=h;let b=this.calculateBubbleSize(c+h,t);if("branch"===this.sliceBy)for(let e of p?.length?p:[this.head??"HEAD"])u(e,a,b);else u(e,a,b)}let b=[r,o,s];for(let[e,t]of this._slices){b.push(t.x);let i=Array(t.x.length).fill(t.y);i[0]=e,b.push(i)}return{axes:a,columns:b,names:{additions:"Additions",deletions:"Deletions"},types:c,xs:h}}async renderChart(i,r,o){let s=await i;if(o.aborted)return void r?.cancel();this._slices.clear(),this._slicesByIndex.clear(),this._commitsByTimestamp.clear();let a={minRadius:6,maxRadius:50,...this.calculateChangeMetrics(s)},{bb:c,bar:h,scatter:p,selection:u,zoom:g}=await P.e(162).then(P.bind(P,973));if(o.aborted)return void r?.cancel();this.range=s.length?[new Date(s.at(-1).date),new Date(s[0].date)]:[new Date,new Date],h(),p();let b=this.prepareChartData(s,a);try{let i=-(this._slices.size+1),a=[...this._slicesByIndex.keys()];if(null==this._chart){let h={bindto:this.chartContainer,onafterinit:()=>{this.updateChartSize(),setTimeout(()=>r?.fulfill(),0)},onrendered:this.getOnRenderedCallback(this),clipPath:!0,data:{...b,colors:{additions:"rgba(73, 190, 71, 1)",deletions:"rgba(195, 32, 45, 1)"},groups:[["additions","deletions"]],selection:{enabled:u(),draggable:!1,grouped:!0,multiple:!1,isselectable:()=>!1},onclick:this.onDataPointClicked,onover:this.onDataPointHovered,onout:this.onDataPointUnhovered},axis:{x:{type:"timeseries",localtime:!0,height:this.compact?28:void 0,forceAsSingle:!0,tick:{fit:!1,format:e=>"number"==typeof e?e:eq(e,this.shortDateFormat??"short"),outer:!0}},y:{max:0,min:i,padding:this.compact?{top:10,bottom:10}:{top:75,bottom:75},tick:{format:e=>this.compact?"branch"===this.sliceBy?"":"":function(e,t="…"){if(!e)return e;let i=null==e||0===e.length?0:t4(e,t6,t3).width;return i<=30?e:`${e.slice(0,Math.floor(15)-1)}${t}${e.slice(i-Math.ceil(15))}`}(this._slicesByIndex.get(e)??""),outer:!0,values:a}},y2:{padding:this.compact?{top:0,bottom:0}:void 0,label:this.compact?void 0:{text:"Lines changed",position:"outer-middle"},show:!0,tick:{format:e=>this.compact?"":e,outer:!0}}},bar:{width:2,sensitivity:4,padding:2},scatter:{zerobased:!0},grid:{focus:{edge:!0,show:!0,y:!0},front:!1,lines:{front:!1},x:{show:!1},y:{show:!0}},legend:{show:!0,hide:["additions","deletions"],padding:4,item:{tile:{type:"circle",r:5},interaction:{dblclick:!0}},tooltip:!0},point:{r:e=>null==e||"function"==typeof e.data&&(e=e.data()[0],null==e)?0:null!=e.r?e.r:Math.max(6,this._slices.get(e.id)?.z.get(e.x.toISOString())??6),focus:{expand:{enabled:!0}},select:{r:6}},resize:{auto:!1},tooltip:{contents:(i,r,o,s)=>{var a;let c=i[0],h=new Date(c.x),p=this._commitsByTimestamp.get(h.getTime());if(null==p)return"";if(""===p.sha)return`<div class="bb-tooltip">
									<div class="author">Working Tree</div>
									<div class="message"><span class="message__content">No uncommitted changes</span></div>
								</div>`;let u=p.additions,g=p.deletions,b=null==u?"":`<span class="additions">+${t8("line",u)}</span>`,m=null==g?"":`<span class="deletions">-${t8("line",g)}</span>`;b&&(m=`, ${m}`);let f=p.branches?.length?`<div class="branches"><span class="icon">\uEA68</span> ${p.branches.join(", ")}</div>`:"";return`<div class="bb-tooltip">
									<div class="author">${p.author}</div>
									<div>
										<span class="sha"><span class="icon">\uEAFC</span> ${oi(p.sha)}</span>
										<span class="changes">${b}${m}</span>
									</div>
									<div class="date">
										<span class="icon">\uEA82</span><span class="date--relative">${(a=function(i){let r=("number"==typeof i?i:i.getTime())-Date.now();for(let[i,o,s,a]of eW)if(Math.abs(r)>=o||1e3===o)return(t??=new Intl.RelativeTimeFormat(e,{localeMatcher:"best fit",numeric:"auto",style:"long"})).format(Math.trunc(r/s),i);return""}(h)).charAt(0).toUpperCase()+a.slice(1)}</span><span class="date--absolute">(${eq(h,this.dateFormat)})</span>
									</div>
									${f}
									<div class="message"><span class="message__content">${p.message}</span></div>
								</div>`},show:!0},zoom:{enabled:g(),type:"wheel",extent:[1,40],onzoom:this.onZoom,onzoomend:this.onZoom}};if(await this.waitForContainerSize(o),o.aborted)return void r?.cancel();this._chart=c.generate(h);let p=s[0];this._shaHovered=void 0,this._shaSelected=p?.sha,null!=p&&requestAnimationFrame(()=>{o.aborted||null==this._chart||this.selectDataPoint(new Date(p.date),{select:!0})})}else this._chart.config("axis.y.tick.values",a,!1),this._chart.config("axis.y.min",i,!1),this._chart.load({...b,resizeAfter:!0,unload:!0,done:()=>{let e;null!=this._shaSelected&&(e=s.find(e=>e.sha===this._shaSelected)),null==e&&(e=s[0],this._shaHovered=void 0,this._shaSelected=e?.sha),null!=e&&this.selectDataPoint(new Date(e.date),{select:!0}),setTimeout(()=>r?.fulfill(),0)}});return void await r.promise.catch(()=>{})}catch(e){r?.cancel()}}updateChartSize(e){(e??=this.chartContainer.getBoundingClientRect()).width>0&&e.height>0&&requestAnimationFrame(()=>{this._chart.resize({width:e.width,height:e.height}),this.updateScrollerTrackPosition()})}waitForContainerSize(e){let t=this.chartContainer.getBoundingClientRect();return t.width>0&&t.height>0?Promise.resolve():new Promise(t=>{let i,r=new ResizeObserver(o=>{let{width:s,height:a}=o[0].contentRect;s>0&&a>0&&(r.disconnect(),e.removeEventListener("abort",i),t())});i=()=>{r.disconnect(),t()},e.addEventListener("abort",i,{once:!0}),r.observe(this.chartContainer)})}updateScrollerTrackPosition(){let e=this.shadowRoot?.querySelector(".bb-axis.bb-axis-x");if(null==e)return;let t=e.getBoundingClientRect(),i=this.chartContainer.getBoundingClientRect();this.style.setProperty("--scroller-track-top",`${t.top-(i.top-1)}px`),this.style.setProperty("--scroller-track-left",`${t.left+2}px`),this.style.setProperty("--scroller-track-width",`${t.width-2}px`)}};nU.tagName=nV,nU.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nU.styles=[om],nW([eF("#chart")],nU.prototype,"chartContainer",2),nW([eF(nr.tagName)],nU.prototype,"slider",2),nW([eL()],nU.prototype,"_loading",2),nW([eM()],nU.prototype,"placement",2),nW([eM()],nU.prototype,"dateFormat",2),nW([eM({type:String})],nU.prototype,"head",2),nW([eM({type:Object})],nU.prototype,"scope",2),nW([eM()],nU.prototype,"shortDateFormat",2),nW([eM()],nU.prototype,"sliceBy",2),nW([eL()],nU.prototype,"_data",2),nW([eM({type:Object})],nU.prototype,"dataPromise",1),nW([eL()],nU.prototype,"_shaHovered",2),nW([eL()],nU.prototype,"_shaSelected",2),nW([eL()],nU.prototype,"_zoomedRange",2),nW([eM({type:Boolean,reflect:!0})],nU.prototype,"zoomed",1),nW([i7({args:e=>({dataset:e?.length})})],nU.prototype,"prepareChartData",1),nW([i7({args:!1})],nU.prototype,"renderChart",1),nU=nW([eO(nV)],nU);let nH=M`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;M`
	.sr-only,
	.sr-only-focusable:not(:active):not(:focus-visible):not(:focus-within) {
		${nH}
	}
`;let nq=M`
	outline: 1px solid var(--color-focus-border);
	outline-offset: -1px;
`,nK=M`
	outline: 1px solid var(--color-focus-border);
	outline-offset: 2px;
`,nG=M`
	:focus-visible {
		${nq}
	}
`;var nY=Object.defineProperty,nZ=Object.getOwnPropertyDescriptor,nX=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nZ(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nY(t,i,s),s};let nJ=class extends lit_element_i{render(){return e_`<slot></slot>`}};nJ.styles=M`
		* {
			box-sizing: border-box;
		}

		:host {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			gap: 0.4rem;
			overflow: hidden;
			font-size: var(--vscode-font-size);
			color: var(--vscode-foreground);
			width: 100%;
		}

		::slotted(gl-breadcrumb-item:not(:last-of-type))::after {
			content: '\\eab6'; /* chevron-right codicon */
			font-family: codicon;
			font-size: 12px;
			width: 12px;
			height: 12px;
			opacity: 0.6;
			display: flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;
			position: relative;
			left: -0.6rem;
			margin-right: -0.6rem;
			transition:
				left 0.3s cubic-bezier(0.25, 1, 0.5, 1),
				margin-right 0.3s cubic-bezier(0.25, 1, 0.5, 1);
		}

		::slotted(gl-breadcrumb-item[collapsed]:not(:hover):not(:focus-within):not(:last-of-type))::after {
			left: -1.2rem;
			margin-right: -1.2rem;
		}

		::slotted(:last-child:not(gl-breadcrumb-item:last-of-type)) {
			margin-left: 1rem;
		}
	`,nJ=nX([eO("gl-breadcrumbs")],nJ);let nQ=class extends lit_element_i{constructor(){super(...arguments),this.collapsibleState="none",this._shrink=1,this.onToggleCollapse=e=>{e.preventDefault(),e.stopPropagation(),e instanceof KeyboardEvent&&"Enter"!==e.key&&" "!==e.key||(this.collapsed=!this.collapsed)}}get collapsed(){return this._collapsed??"collapsed"===this.collapsibleState}set collapsed(e){this._collapsed=e}get collapsible(){return"none"!==this.collapsibleState}get shrink(){return this._shrink}set shrink(e){let t=this._shrink;this._shrink=e,this.style.setProperty("--gl-breadcrumb-item-shrink",String(e)),this.requestUpdate("shrink",t)}render(){let{collapsed:e,collapsible:t}=this;return e_`<div class=${oW({"breadcrumb-item":!0,collapsible:t})}>
			<span class="breadcrumb-content">
				${this.renderIcon(t,e)}
				<slot class="breadcrumb-label"></slot>
			</span>
			<slot name="children"></slot>
		</div>`}renderIcon(e,t){return this.icon?e||this.iconTooltip?e_`<gl-tooltip
			content="${e?t?"Click to Expand":"Click to Collapse":this.iconTooltip}"
			placement="bottom"
		>
			<code-icon
				class="breadcrumb-icon"
				icon="${this.icon}"
				tabindex="0"
				@click=${e?this.onToggleCollapse:void 0}
				@keyup=${e?this.onToggleCollapse:void 0}
			></code-icon>
		</gl-tooltip>`:e_`<code-icon class="breadcrumb-icon" icon="${this.icon}"></code-icon>`:eC}};nQ.styles=[nG,M`
			* {
				box-sizing: border-box;
			}

			:host {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.4rem;
				white-space: nowrap;
				overflow: hidden;
				min-width: 0;
				flex-shrink: var(--gl-breadcrumb-item-shrink, 1);
			}

			:host([icon]) {
				min-width: calc(24px + 0.6rem);
			}

			:host(:hover),
			:host(:focus-within) {
				flex-shrink: 0;
			}

			.breadcrumb-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.4rem;
				white-space: nowrap;
				overflow: hidden;
				min-width: 0;
				width: 100%;
				cursor: default;
			}

			.breadcrumb-content {
				display: inline-flex;
				align-items: center;
				gap: 0.6rem;
				vertical-align: middle;
				max-width: 100%;
			}

			.breadcrumb-icon {
				flex-shrink: 0;
				z-index: 2;
			}

			.collapsible .breadcrumb-icon {
				cursor: pointer;
			}

			.breadcrumb-label {
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100vw;
				transition: max-width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
			}

			.breadcrumb-tooltip {
				display: inline-flex;
				align-items: center;
				vertical-align: middle;
			}

			slot[name='children'] {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.4rem;
				overflow: hidden;
				max-width: 100vw;
				transition: max-width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
			}

			:host([collapsed]) .breadcrumb-item:not(:hover):not(:focus-within) .breadcrumb-label,
			:host([collapsed]) .breadcrumb-item:not(:hover):not(:focus-within) slot[name='children'] {
				max-width: 0;
			}
		`],nX([eL()],nQ.prototype,"_collapsed",2),nX([eM({type:Boolean,reflect:!0})],nQ.prototype,"collapsed",1),nX([eM({type:String})],nQ.prototype,"collapsibleState",2),nX([eM()],nQ.prototype,"icon",2),nX([eM()],nQ.prototype,"iconTooltip",2),nX([eM({type:Number})],nQ.prototype,"shrink",1),nQ=nX([eO("gl-breadcrumb-item")],nQ);let n0=class extends lit_element_i{render(){return e_`<slot></slot>`}};n0.styles=M`
		:host {
			display: flex;
			flex-direction: row;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			margin-right: 0.6rem;
		}

		:host::before {
			content: '\\eab6'; /* chevron-right codicon */
			font-family: codicon;
			font-size: 12px;
			width: 12px;
			height: 12px;
			opacity: 0.6;
			margin-right: 0.4rem;
			display: flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;
		}

		.breadcrumb-label {
			display: inline-block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	`,n0=nX([eO("gl-breadcrumb-item-child")],n0);let n1=M`
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
`;M`
	* {
		box-sizing: border-box;
	}
`;let n2=M`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		${nq}
	}
	a:hover {
		text-decoration: underline;
	}
`,n5=M`
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
`;M`
	.inline-code {
		background: var(--vscode-textCodeBlock-background);
		border-radius: 3px;
		padding: 0px 4px 2px 4px;
		font-family: var(--vscode-editor-font-family);
	}
`,M`
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
`,M`
	:host {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}
`,M`
	:host {
		--gl-metadata-bar-bg: color-mix(in srgb, var(--color-background) 95%, var(--color-foreground) 5%);
		--gl-metadata-bar-border: var(--vscode-sideBarSectionHeader-border, var(--color-foreground--25));
		--gl-metadata-bar-min-height: 2.94rem;
	}
`;var n4=Object.defineProperty,n6=Object.getOwnPropertyDescriptor,n3=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?n6(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&n4(t,i,s),s};let n8=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1,this.ariaLabel=null}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(e){if(e.has("href")&&this.setAttribute("role",this.href?"link":"button"),e.has("disabled")){let t=e.get("disabled");t?this.setAttribute("aria-disabled",t.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(e)}render(){return this.tooltip?e_`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??eC}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?e_`<gl-tooltip placement=${this.tooltipPlacement??eC}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?e_`<a
				class="control"
				aria-label=${this.ariaLabel??eC}
				tabindex="${(!1===this.disabled?void 0:-1)??eC}"
				href=${this.href}
				@keypress=${e=>this.onLinkKeypress(e)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:e_`<button
			class="control"
			role=${this.role??eC}
			aria-label=${this.ariaLabel??eC}
			aria-checked=${this.ariaChecked??eC}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(e){" "===e.key&&this.control.click()}focus(e){this.control.focus(e)}blur(){this.control.blur()}click(){this.control.click()}};n8.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},n8.styles=[n1,M`
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
				${nK}
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
		`],n3([eF(".control")],n8.prototype,"control",2),n3([eM({reflect:!0})],n8.prototype,"appearance",2),n3([eM({reflect:!0})],n8.prototype,"variant",2),n3([eM({type:Boolean,reflect:!0})],n8.prototype,"disabled",2),n3([eM({reflect:!0})],n8.prototype,"density",2),n3([eM({type:Boolean,reflect:!0})],n8.prototype,"full",2),n3([eM()],n8.prototype,"href",2),n3([eM()],n8.prototype,"tooltip",2),n3([eM()],n8.prototype,"tooltipPlacement",2),n3([eM({type:Boolean,reflect:!0})],n8.prototype,"truncate",2),n3([eM({type:String,attribute:"aria-label"})],n8.prototype,"ariaLabel",2),n8=n3([eO("gl-button")],n8);let n7=M`
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
`;var n9=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,at=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ae(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&n9(t,i,s),s};let ai=class extends GlElement{constructor(){super(),this.disabled=!1,this.value="",this._defaultChecked=!1,this.checked=!1,this.indeterminate=!1,this._defaultChecked=this.checked}get defaultChecked(){return this._defaultChecked}handleChange(e){this.checked=e.target.checked,this.indeterminate=!1;let t=new CustomEvent("gl-change-value");this.dispatchEvent(t)}renderCheck(){return e_`<code-icon icon=${this.indeterminate?"dash":"check"}></code-icon>`}render(){return e_`<label ?aria-disabled=${this.disabled}
			><input
				class="input"
				.disabled=${this.disabled}
				type="checkbox"
				.checked=${this.checked}
				@change=${this.handleChange}
			/>
			<div class="control">${this.renderCheck()}</div>
			<slot class="label-text" part="label"></slot>
		</label>`}};function ar(e,t){return null==t?`command:${e}`:`command:${e}?${encodeURIComponent("string"==typeof t?t:JSON.stringify(t))}`}ai.shadowRootOptions={...GlElement.shadowRootOptions,delegatesFocus:!0},ai.styles=[n7],at([eM({type:Boolean,reflect:!0})],ai.prototype,"disabled",2),at([eM({type:String})],ai.prototype,"value",2),at([eM({type:Boolean})],ai.prototype,"defaultChecked",1),at([eM({type:Boolean,reflect:!0})],ai.prototype,"checked",2),at([eM({type:Boolean,reflect:!0})],ai.prototype,"indeterminate",2),ai=at([eO("gl-checkbox")],ai);var ao=Object.defineProperty,as=Object.getOwnPropertyDescriptor,an=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?as(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ao(t,i,s),s};let aa=["top","right","bottom","left","top-left","top-right","bottom-left","bottom-right"],al=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.autoSizeVertical=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.suppressed=!1,this.handleReposition=()=>{let e=this.popup?.getAttribute("data-current-placement");null!=e&&e!==this._resolvedPlacement&&(this._resolvedPlacement=e)},this.handleResizePointerDown=e=>{if(0!==e.button)return;let t=e.currentTarget,i=t.dataset.handle;if(null==i)return;e.preventDefault();let r="right"===i||"top-right"===i||"bottom-right"===i,o="left"===i||"top-left"===i||"bottom-left"===i,s="bottom"===i||"bottom-left"===i||"bottom-right"===i,a="top"===i||"top-left"===i||"top-right"===i,c=this.body,h=e.clientX,p=e.clientY,u=c.getBoundingClientRect(),g=u.width,b=u.height;t.setPointerCapture(e.pointerId),t.classList.add("popover__resizer--active"),this.toggleAttribute("dragging",!0);let m=e=>{let t=e.clientX-h,i=e.clientY-p;r?c.style.width=`${Math.max(0,g+t)}px`:o&&(c.style.width=`${Math.max(0,g-t)}px`),s?c.style.height=`${Math.max(0,b+i)}px`:a&&(c.style.height=`${Math.max(0,b-i)}px`),this.popup?.reposition()},f=()=>{this.toggleAttribute("dragging",!1),t.classList.remove("popover__resizer--active"),t.removeEventListener("pointermove",m),t.removeEventListener("lostpointercapture",f),t.removeEventListener("pointerup",f)};t.addEventListener("pointermove",m,{passive:!0}),t.addEventListener("lostpointercapture",f),t.addEventListener("pointerup",f)},this.handleTriggerBlur=e=>{this.open&&this.hasTrigger("focus")&&(e.relatedTarget&&this.contains(e.relatedTarget)||this.hide())},this.handleTriggerClick=e=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(e.composedPath().includes(this.body))return;this.hide()}else this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=e=>{this.hasTrigger("click")&&this.hasTrigger("focus")&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,this.open&&"hover"===this._triggeredBy&&!e.composedPath().includes(this.body)&&(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=()=>{this.hasTrigger("focus")&&(this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus"))},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handlePopupBlur=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let e=iC(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let e=iC(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),e)}}}static closeOthers(e){for(let t of al.openPopovers)t===e||t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINS||t.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,al.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),this.updateResizeObserver()}updateResizeObserver(){null!=this.resize?null==this.resizeObserver&&null!=this.body&&(this.resizeObserver=new ResizeObserver(()=>this.popup?.reposition()),this.resizeObserver.observe(this.body)):null!=this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}render(){let e=this._resolvedPlacement??this.placement,t=(function(e){if(!e)return[];let t=new Set;for(let i of e.trim().split(/\s+/))switch(i){case"horizontal":t.add("right");break;case"vertical":t.add("bottom");break;case"both":t.add("right"),t.add("bottom"),t.add("bottom-right");break;case"all":for(let e of aa)t.add(e);break;default:aa.includes(i)&&t.add(i)}return[...t]})(this.resize).filter(t=>!function(e,t){let i,r;if(!t)return!1;let[o,s]=t.split("-");switch(o){case"top":i="bottom";break;case"right":i="left";break;case"bottom":i="top";break;case"left":i="right"}let a="left"===o||"right"===o;"start"===s?r=a?"top":"left":"end"===s&&(r=a?"bottom":"right");let c=t=>null!=t&&(e===t||e.startsWith(`${t}-`)||e.endsWith(`-${t}`));return c(i)||c(r)}(t,e));return e_`<wa-popup
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
				${t.map(e=>e_`<div
							class="popover__resizer popover__resizer--${e}"
							role="separator"
							aria-orientation=${"top"===e||"bottom"===e?"horizontal":"vertical"}
							aria-label="Resize"
							data-handle=${e}
							@pointerdown=${this.handleResizePointerDown}
						></div>`)}
			</div>
		</wa-popup>`}async show(e){if(this.open||this.suppressed){"click"===e&&"hover"===this._triggeredBy&&(this._triggeredBy=e);return}return(null==this._triggeredBy||"hover"!==e)&&(this._triggeredBy=e),al.closeOthers(this),this.open=!0,al.openPopovers.add(this),iS(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,al.openPopovers.delete(this),iS(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(e){return this.trigger.split(" ").includes(e)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleResizeChange(){this.updateResizeObserver()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};al.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},al.openPopovers=new Set,al.styles=[n5,M`
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
		`],an([eF("#popover")],al.prototype,"body",2),an([eF("wa-popup")],al.prototype,"popup",2),an([eM({reflect:!0})],al.prototype,"placement",2),an([eM({type:Object})],al.prototype,"anchor",2),an([eM({reflect:!0,type:Boolean})],al.prototype,"disabled",2),an([eM({type:Number})],al.prototype,"distance",2),an([eM({reflect:!0,type:Boolean})],al.prototype,"open",2),an([eM({reflect:!0,type:Boolean})],al.prototype,"arrow",2),an([eM({reflect:!0,type:Boolean,attribute:"auto-size-vertical"})],al.prototype,"autoSizeVertical",2),an([eM({reflect:!0})],al.prototype,"resize",2),an([eM({type:Number})],al.prototype,"skidding",2),an([eM()],al.prototype,"trigger",2),an([eM({type:Boolean})],al.prototype,"hoist",2),an([eM({reflect:!0})],al.prototype,"appearance",2),an([eL()],al.prototype,"suppressed",2),an([eL()],al.prototype,"_resolvedPlacement",2),an([tq("open",{afterFirstUpdate:!0})],al.prototype,"handleOpenChange",1),an([tq(["distance","placement","skidding"])],al.prototype,"handleOptionsChange",1),an([tq("resize",{afterFirstUpdate:!0})],al.prototype,"handleResizeChange",1),an([tq("disabled")],al.prototype,"handleDisabledChange",1),al=an([eO("gl-popover")],al);let private_async_helpers_s=class private_async_helpers_s{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let ac=e=>null!==e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...e){return e.find(e=>!ac(e))??e$}update(e,t){let i=this._$Cbt,r=i.length;this._$Cbt=t;let o=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){let a=t[e];if(!ac(a))return this._$Cwt=e,a;e<r&&a===i[e]||(this._$Cwt=0x3fffffff,r=0,Promise.resolve(a).then(async e=>{for(;s.get();)await s.get();let t=o.deref();if(void 0!==t){let i=t._$Cbt.indexOf(a);i>-1&&i<t._$Cwt&&(t._$Cwt=i,t.setValue(e))}}))}return e$}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let ah=t_(until_c);var ad=Object.defineProperty,ap=Object.getOwnPropertyDescriptor,au=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ap(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ad(t,i,s),s};let ag=class extends lit_element_i{constructor(){super(...arguments),this.type="info",this._hasPromo=!1}get hasPromo(){return this._hasPromo}set hasPromo(e){this._hasPromo=e}render(){return e_`${ah(this.promoPromise?.then(e=>this.renderPromo(e)),eC)}`}renderPromo(e){if(!e?.content?.webview){this.hasPromo=!1;return}let t=e.content.webview;switch(this.type){case"icon":return e_`<code-icon icon="star-full" size="16"></code-icon>`;case"info":if(t.info)return this.hasPromo=!0,e_`<p class="promo" part="text">${nm(t.info.html)}</p>`;break;case"link":if(t.link)return this.hasPromo=!0,e_`<a
						class="link"
						part="link"
						href="${this.getCommandUrl(e)}"
						title="${t.link.title??eC}"
						>${nm(t.link.html)}</a
					>`}return this.hasPromo=!1,eC}getCommandUrl(e){let t;return e?.content?.webview?.link?.command?.startsWith("command:")&&(t=e.content.webview.link.command.substring(8)),ar(t??"gitlens.plus.upgrade",this.source)}focus(){this._focusable?.focus()}};ag.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},ag.styles=[M`
			:host {
				display: block;
			}

			.promo {
				margin: 0;
				margin-top: 0.8rem;
				text-align: center;
			}

			.header {
				margin-right: 0.4rem;
			}

			.content {
				font-size: smaller;
			}

			.muted {
				opacity: 0.7;
			}

			.link {
				display: block;
				color: inherit;
				max-width: 100%;
				text-align: center;
				text-decoration: none;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.link:focus-visible {
				${nq}
			}

			.link:hover {
				color: inherit;
				text-decoration: underline;
			}
		`],au([eF('a,button,[tabindex="0"]')],ag.prototype,"_focusable",2),au([eM({type:Object})],ag.prototype,"promoPromise",2),au([eM({type:Object})],ag.prototype,"source",2),au([eM({reflect:!0,type:String})],ag.prototype,"type",2),au([eM({type:Boolean,reflect:!0,attribute:"has-promo"})],ag.prototype,"hasPromo",1),ag=au([eO("gl-promo")],ag);var ab=Object.defineProperty,am=Object.getOwnPropertyDescriptor,af=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?am(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ab(t,i,s),s};let av=class extends lit_element_i{constructor(){super(...arguments),this.cloud=!1,this.placement="bottom",this.preview=!1}get daysRemaining(){var e,t;return null==this.subscription?0:(e=this.subscription,t=e.plan.effective.expiresOn,(null!=t?function(e,t,i,r){let o=("number"==typeof t?t:t.getTime())-("number"==typeof e?e:e.getTime()),s=r??Math.floor;switch(i){case"days":return s(o/864e5);case"hours":return s(o/36e5);case"minutes":return s(o/6e4);case"seconds":return s(o/1e3);default:return o}}(Date.now(),new Date(t),"days",Math.round):void 0)??0)}get state(){return this.subscription?.state}render(){return e_`
			<gl-popover placement=${this.placement} hoist>
				<span slot="anchor" class="badge" tabindex="0">${this.renderBadge()}</span>
				<div slot="content" class="badge-popup" tabindex="-1">
					${this.renderPopoverHeader()}${this.renderPopoverContent()}
				</div>
			</gl-popover>
		`}renderBadge(){let e=this.preview?"Preview":"Pro";if(null!=this.subscription)if(this.state===eY.VerificationRequired)return e_`${e} <code-icon class="badge-icon" icon="warning" size="10"></code-icon>`;else{var t;if(eX(this.subscription)||this.cloud&&null!=this.subscription.account)return e_`${e} <code-icon class="badge-icon" icon="check" size="10"></code-icon>`;if(null!=(t=this.subscription).state?t.state===eY.Trial:t.plan.actual.id!==t.plan.effective.id)return e_`${e} <code-icon class="badge-icon" icon="clock" size="10"></code-icon>`}return e}renderPopoverHeader(){let e=e_`<span class="popup-title">${this.preview?"Preview feature":"Pro feature"}</span>`;return this.state===eY.Paid?e_`<div class="popup-header">${e}</div>`:this.cloud?this.preview?e_`<div class="popup-header">
					${e}<span class="popup-subtitle"
						>Unlock this feature with an account and may require GitLens Pro in the future</span
					>
				</div>`:e_`<div class="popup-header">
				${e}<span class="popup-subtitle"> Unlock this feature with GitLens Pro</span>
			</div>`:this.preview?e_`<div class="popup-header">
				${e}<span class="popup-subtitle">May require GitLens Pro in the future</span>
			</div>`:e_`<div class="popup-header">
			${e}<span class="popup-subtitle"> Unlock this feature for privately hosted repos with GitLens Pro</span>
		</div>`}renderPopoverContent(){let e;if(null==this.subscription)return eC;switch(this.state){case eY.Paid:var t;e=e_`<p>
					Your
					<gl-tooltip content="Show Account view">
						<a href="${ar("gitlens.showAccountView")}"
							>${t=this.subscription?.plan.actual.id??"pro",`GitLens ${function(e){switch(e){case"student":return"Student";case"pro":return"Pro";case"advanced":return"Advanced";case"teams":return"Business";case"enterprise":return"Enterprise";default:return"Community"}}(t)}`}</a
						>
					</gl-tooltip>
					plan provides access to all Pro features.
				</p>`;break;case eY.VerificationRequired:e=e_`<p>You must verify your email before you can access Pro features.</p>
					<div class="actions">
						<gl-button
							density="tight"
							href="${ar("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							appearance="secondary"
							density="tight"
							href="${ar("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</div>`;break;case eY.Trial:{let t=this.daysRemaining;e=e_`<p>
						You have
						<strong>${t<1?"<1 day":t8("day",t,{infix:" more "})} left</strong>
						in your Pro trial. Once your trial ends, you will only be able to use Pro features on
						publicly-hosted repos.
					</p>
					${this.renderUpgradeActions()}`;break}case eY.TrialExpired:e=e_`<p>
						Your Pro trial has ended. You can now only use Pro features on publicly-hosted repos.
					</p>
					${this.renderUpgradeActions(e_`<p>Please upgrade for full access to all GitLens Pro features:</p>`)}`;break;case eY.TrialReactivationEligible:e=e_`<p>
						Reactivate your Pro trial and experience all the new Pro features — free for another
						${t8("day",14)}!
					</p>
					<div class="actions center">
						<gl-button
							density="tight"
							href="${ar("gitlens.plus.reactivateProTrial",this.source)}"
							tooltip="Reactivate your Pro trial for another ${t8("day",14)}"
							>Reactivate Pro Trial</gl-button
						>
					</div>`;break;default:e=e_`<p>
						You only have access to
						<gl-tooltip content="Pro features that do not require an account"
							><span class="hint">local</span></gl-tooltip
						>
						Pro features on publicly-hosted repos.
					</p>
					${this.renderStartTrialActions()}`}return e_`<div class="popup-content">${e}</div>`}renderStartTrialActions(){return e_`<div class="actions">
			<p>For access to all Pro features:</p>
			<gl-button density="tight" href="${ar("gitlens.plus.signUp",this.source)}"
				>Start ${14}-day Pro Trial</gl-button
			>
			&nbsp;or
			<a href="${ar("gitlens.plus.login",this.source)}" title="Sign In">sign in</a>
		</div>`}renderUpgradeActions(e){return e_`<div class="actions">
			${e??eC}
			<gl-button
				density="tight"
				href="${ar("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-badge"}})}"
				>Upgrade to Pro</gl-button
			>
			${this.renderPromo()}
		</div>`}renderPromo(){return e_`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"badge")}
			.source=${this.source}
		></gl-promo>`}};av.styles=[n1,n2,M`
			:host {
				/* position: relative; */
				display: inline-block;
				--gl-feature-badge-color: currentColor;
				--gl-feature-badge-border-color: var(--color-foreground--50);
				--max-width: 40rem;
			}

			a {
				color: var(--color-link);
				text-decoration: underline;
			}

			.badge {
				color: var(--gl-feature-badge-color, currentColor);
				cursor: help;
				font-size: var(--gl-feature-badge-font-size, x-small);
				font-variant: all-small-caps;
				font-weight: 600;
				border: 1px solid var(--gl-feature-badge-border-color, var(--color-foreground--50));
				border-radius: 1rem;
				padding: 0 0.8rem 0.1rem 0.8rem;
				white-space: nowrap;
			}

			.badge:focus-visible {
				${O(nq)}
			}

			.badge-icon {
				font-weight: 400;
				margin-left: 0.4rem;
				white-space: nowrap;
			}

			.badge-popup {
				display: flex;
				flex-direction: column;
				white-space: normal;
				gap: 0.6rem;
			}

			.popup-header {
				display: flex;
				flex-direction: column;
				margin-bottom: 0.4rem;
			}

			.popup-title {
				font-size: 1.3rem;
				font-weight: 600;
			}

			.popup-subtitle {
				font-size: smaller;
				margin-top: 0.6rem;
			}

			.popup-content {
				display: flex;
				flex-direction: column;
				border-top: 1px solid var(--color-foreground--25);
				padding-top: 0.6rem;
			}

			.popup-content p {
				margin: 0;
			}

			.popup-content .actions {
				margin-top: 0.8rem;
				margin-bottom: 0.6rem;
			}

			.popup-content .actions:first-child {
				margin-bottom: 0.8rem;
			}

			.popup-content .actions :not(:first-child) {
				margin-top: 0.4rem;
			}

			.popup-content .actions gl-button:not(:first-child) {
				margin-top: 0.8rem;
			}

			.hint {
				border-bottom: 1px dashed currentColor;
			}
		`],af([eM({type:Boolean})],av.prototype,"cloud",2),af([eM({reflect:!0})],av.prototype,"placement",2),af([eM({type:Boolean})],av.prototype,"preview",2),af([eQ({context:"promos"})],av.prototype,"promos",2),af([eM({type:Object})],av.prototype,"source",2),af([eM({attribute:!1})],av.prototype,"subscription",2),av=af([eO("gl-feature-badge")],av);var ay=((f=ay||{}).AngleBracketLeftHeavy="❰",f.AngleBracketRightHeavy="❱",f.ArrowBack="↩",f.ArrowDown="↓",f.ArrowDownUp="⇵",f.ArrowDropRight="⤷",f.ArrowHeadRight="➤",f.ArrowLeft="←",f.ArrowLeftDouble="⇐",f.ArrowLeftRight="↔",f.ArrowLeftRightDouble="⇔",f.ArrowLeftRightDoubleStrike="⇎",f.ArrowLeftRightLong="⟷",f.ArrowRight="→",f.ArrowRightDouble="⇒",f.ArrowRightHollow="⇨",f.ArrowUp="↑",f.ArrowUpDown="⇅",f.ArrowUpRight="↗",f.ArrowsHalfLeftRight="⇋",f.ArrowsHalfRightLeft="⇌",f.ArrowsLeftRight="⇆",f.ArrowsRightLeft="⇄",f.Asterisk="∗",f.Bullseye="◎",f.Check="✔",f.Dash="—",f.Dot="•",f.Ellipsis="…",f.EnDash="–",f.Envelope="✉",f.EqualsTriple="≡",f.Flag="⚑",f.FlagHollow="⚐",f.MiddleEllipsis="⋯",f.MuchLessThan="≪",f.MuchGreaterThan="≫",f.Pencil="✎",f.Space=" ",f.SpaceThin=" ",f.SpaceThinnest=" ",f.SquareWithBottomShadow="❏",f.SquareWithTopShadow="❐",f.Warning="⚠",f.ZeroWidthSpace="​",f);Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]);var aw=((v=aw||{}).File="file",v.Git="git",v.GitHub="github",v.GitLens="gitlens",v.GitLensAIMarkdown="gitlens-ai-markdown",v.GitLensVirtual="gitlens-virtual",v.PRs="pr",v.Remote="vscode-remote",v.Vsls="vsls",v.VslsScc="vsls-scc",v.Virtual="vscode-vfs",v);Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let ax="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",a_=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${ax}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${ax}`,graph:`https://gitkraken.com/solutions/commit-graph?${ax}`,launchpad:`https://gitkraken.com/solutions/launchpad?${ax}`,platform:`https://gitkraken.com/devex?${ax}`,pricing:`https://gitkraken.com/gitlens/pricing?${ax}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${ax}`,security:`https://help.gitkraken.com/gitlens/security?${ax}`,workspaces:`https://gitkraken.com/solutions/workspaces?${ax}`,cli:`https://gitkraken.com/cli?${ax}`,browserExtension:`https://gitkraken.com/browser-extension?${ax}`,desktop:`https://gitkraken.com/git-client?${ax}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${ax}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${ax}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${ax}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${ax}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${ax}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${ax}`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${ax}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${ax}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${ax}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${ax}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${ax}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${ax}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${ax}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${ax}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${ax}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${ax}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${ax}`});var ak=Object.defineProperty,a$=Object.getOwnPropertyDescriptor,aC=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?a$(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ak(t,i,s),s};let aS=class extends lit_element_i{firstUpdated(){"alert"===this.appearance&&queueMicrotask(()=>this.button.focus())}render(){let e=null==this.state;if(this.hidden=e,e)return;let t=(this.appearance??"alert")==="alert"?"alert":void 0;switch(this.state){case eY.VerificationRequired:return e_`
					<slot name="feature"></slot>
					<p class="actions">
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${ar("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${ar("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</p>
					<p>You must verify your email before you can continue.</p>
				`;case eY.Community:if(this.featurePreview&&"expired"!==function(e){let t=e?.usages;if(!t?.length)return"eligible";let i=(new Date(t.at(-1).expiresOn).getTime()-Date.now())/36e5;return t.length<=3&&i>0&&i<24?"active":"expired"}(this.featurePreview))return e_`${this.renderFeaturePreview(this.featurePreview)}`;return e_`<slot name="feature"></slot>
					<p>
						${"private-repos"===this.featureRestriction?"Unlock this feature for privately hosted repos with ":"Unlock this feature with "} <a href="${a_.communityVsPro}">GitLens Pro</a>.
					</p>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${ar("gitlens.plus.signUp",this.source)}"
							>&nbsp;Try GitLens Pro&nbsp;</gl-button
						><span
							>or
							<a href="${ar("gitlens.plus.login",this.source)}" title="Sign In"
								>sign in</a
							></span
						>
					</p>
					<p>
						Get ${t8("day",14)} of
						<a href="${a_.communityVsPro}">GitLens Pro</a> for free — no credit card required.
					</p>`;case eY.TrialExpired:return e_`<slot name="feature"></slot>
					<p>
						${"private-repos"===this.featureRestriction?"Unlock this feature for privately hosted repos with ":"Unlock this feature with "} <a href="${a_.communityVsPro}">GitLens Pro</a>.
					</p>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${ar("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-gate"}})}"
							>Upgrade to Pro</gl-button
						>
					</p>
					<p>${this.renderPromo()}</p>`;case eY.TrialReactivationEligible:return e_`<slot name="feature"></slot>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${ar("gitlens.plus.reactivateProTrial",this.source)}"
							>Continue</gl-button
						>
					</p>
					<p>
						Reactivate your GitLens Pro trial and experience
						${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} and `:""}all the new
						Pro features — free for another ${t8("day",14)}!
					</p> `}}renderFeaturePreview(e){let t=(this.appearance??"alert")==="alert"?"alert":void 0,i=e.usages.length;return 0===i?e_`<slot name="feature"></slot>
				<gl-button appearance="${t??eC}" href="${this.featurePreviewCommandLink??eC}"
					>Continue</gl-button
				>
				<p>
					Continue to preview
					${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} on`:""} privately hosted
					repos, or
					<a href="${ar("gitlens.plus.login",this.source)}" title="Sign In">sign in</a
					>.<br />
					${"alert"!==t?e_`<br />`:""} For full access to all GitLens Pro features,
					<a href="${ar("gitlens.plus.signUp",this.source)}"
						>start your free ${14}-day Pro trial</a
					>
					— no credit card required.
				</p> `:e_`
			${this.renderFeaturePreviewStep(e,i)}
			<p class="actions-row">
				<gl-button
					class="inline"
					appearance="${t??eC}"
					href="${this.featurePreviewCommandLink??eC}"
					>Continue Preview</gl-button
				><span
					>or
					<a href="${ar("gitlens.plus.login",this.source)}" title="Sign In"
						>sign in</a
					></span
				>
			</p>
			<p>
				After continuing, you will have ${t8("day",3-i,{infix:" more "})} to preview
				${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} on`:""} privately hosted
				repos.<br />
				${"alert"!==t?e_`<br />`:""} For full access to all GitLens Pro features,
				<a href="${ar("gitlens.plus.signUp",this.source)}"
					>start your free ${14}-day Pro trial</a
				>
				— no credit card required.
			</p>
		`}renderFeaturePreviewStep(e,t){if("graph"!==e.feature)return e_`<slot name="feature"></slot>`;switch(t){case 1:return e_`<p>Try Commit Search</p>
							<p>
								Search for commits in your repo by author, commit message, SHA, file, change, or type.
								Turn on the commit filter to show only commits that match your query.
							</p>
							<p>
								<img
									src="${this.webroot??""}/media/graph-commit-search.webp"
									style="width:100%"
									alt="Graph Commit Search"
								/>
							</p> `;case 2:return e_`
							<p>Try the Graph Minimap</p>
							<p>
								Visualize the amount of changes to a repository over time, and inspect specific points
								in the history to locate branches, stashes, tags and pull requests.
							</p>
							<p>
								<img
									src="${this.webroot??""}/media/graph-minimap.webp"
									style="width:100%"
									alt="Graph Minimap"
								/>
							</p>
						`;default:return e_`<slot name="feature"></slot>`}}renderPromo(){return e_`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"gate")}
			.source=${this.source}
		></gl-promo>`}};aS.styles=[M`
			:host {
				--gk-action-radius: 0.3rem;

				--link-foreground: var(--vscode-textLink-foreground);
				--link-foreground-active: var(--vscode-textLink-activeForeground);
			}

			:host([appearance='alert']) {
				--link-decoration-default: underline;
				--link-foreground: color-mix(in srgb, var(--section-foreground) 50%, var(--vscode-textLink-foreground));
				--link-foreground-active: color-mix(
					in srgb,
					var(--section-foreground) 50%,
					var(--vscode-textLink-activeForeground)
				);
			}

			:host([appearance='default']) gl-button:only-child {
				width: 100%;
				max-width: 300px;
			}

			@container (max-width: 600px) {
				:host([appearance='default']) gl-button:not(.inline) {
					display: block;
					margin-left: auto;
					margin-right: auto;
				}
			}

			:host([appearance='alert']) gl-button:not(.inline) {
				display: block;
				margin-left: auto;
				margin-right: auto;
			}

			:host-context([appearance='alert']) p:first-child {
				margin-top: 0;
			}

			:host-context([appearance='alert']) p:last-child {
				margin-bottom: 0;
			}

			.actions {
				text-align: center;
			}

			.actions-row {
				display: flex;
				gap: 0.6em;
				align-items: baseline;
				justify-content: center;
				white-space: nowrap;
			}

			.hint {
				border-bottom: 1px dashed currentColor;
			}
		`,rJ],aC([eF("gl-button")],aS.prototype,"button",2),aC([eM()],aS.prototype,"appearance",2),aC([eM({type:Object})],aS.prototype,"featurePreview",2),aC([eM()],aS.prototype,"featurePreviewCommandLink",2),aC([eM()],aS.prototype,"featureRestriction",2),aC([eM()],aS.prototype,"featureWithArticleIfNeeded",2),aC([eQ({context:"promos"})],aS.prototype,"promos",2),aC([eM({type:Object})],aS.prototype,"source",2),aC([eM({attribute:!1,type:Number})],aS.prototype,"state",2),aC([eM()],aS.prototype,"webroot",2),aS=aC([eO("gl-feature-gate-plus-state")],aS);var aP=Object.defineProperty,aE=Object.getOwnPropertyDescriptor,aA=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?aE(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&aP(t,i,s),s};let aT=class extends lit_element_i{render(){var e;if(this.hidden||null!=(e=this.state)&&(e===eY.Trial||e===eY.Paid))return;let t=this.appearance??(document.body.getAttribute("data-placement")??"editor")==="editor"?"alert":"default";return e_`
			<section>
				<slot></slot>
				<gl-feature-gate-plus-state
					appearance=${t}
					.featurePreview=${this.featurePreview}
					.featurePreviewCommandLink=${this.featurePreviewCommandLink}
					.featureRestriction=${this.featureRestriction}
					.featureWithArticleIfNeeded=${this.featureWithArticleIfNeeded}
					.source=${this.source}
					.state=${this.state}
					.webroot=${this.webroot}
				>
					<slot name="feature" slot="feature"></slot>
				</gl-feature-gate-plus-state>
			</section>
		`}};aT.styles=[rJ,M`
			:host {
				--background: var(--vscode-sideBar-background);
				--foreground: var(--vscode-sideBar-foreground);

				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				overflow: auto;
				z-index: 100;

				box-sizing: border-box;
			}

			:host-context(body[data-placement='editor']),
			:host([appearance='alert']) {
				--background: transparent;
				--foreground: var(--vscode-editor-foreground);

				backdrop-filter: blur(3px) saturate(0.8);
				padding: 0 2rem;
			}

			::slotted(p) {
				margin: revert !important;
			}

			::slotted(p:first-child) {
				margin-top: 0 !important;
			}

			section {
				--section-foreground: var(--foreground);
				--section-background: var(--background);
				--section-border-color: transparent;

				--link-foreground: var(--vscode-textLink-foreground);
				--link-foreground-active: var(--vscode-textLink-activeForeground);

				display: flex;
				flex-direction: column;
				padding: 0 2rem 1.3rem 2rem;
				background: var(--section-background);
				color: var(--section-foreground);
				border: 1px solid var(--section-border-color);

				height: min-content;
			}

			:host-context(body[data-placement='editor']) section,
			:host([appearance='alert']) section {
				--section-foreground: var(--color-alert-infoForeground);
				--section-background: var(--color-alert-infoBackground);
				--section-border-color: var(--color-alert-infoBorder);

				--link-decoration-default: underline;
				--link-foreground: color-mix(in srgb, var(--section-foreground) 50%, var(--vscode-textLink-foreground));
				--link-foreground-active: color-mix(
					in srgb,
					var(--section-foreground) 50%,
					var(--vscode-textLink-activeForeground)
				);

				border-radius: 0.3rem;
				max-width: 600px;
				max-height: min-content;
				margin: 0.2rem auto;
				padding: 1.3rem;
			}

			:host-context(body[data-placement='editor']) section ::slotted(gl-button),
			:host([appearance='alert']) section ::slotted(gl-button) {
				display: block;
				margin-left: auto;
				margin-right: auto;
			}
		`],aA([eM({reflect:!0})],aT.prototype,"appearance",2),aA([eM({type:Object})],aT.prototype,"featurePreview",2),aA([eM({type:String})],aT.prototype,"featurePreviewCommandLink",2),aA([eM()],aT.prototype,"featureRestriction",2),aA([eM()],aT.prototype,"featureWithArticleIfNeeded",2),aA([eM({type:Object})],aT.prototype,"source",2),aA([eM({attribute:!1,type:Number})],aT.prototype,"state",2),aA([eM({type:String})],aT.prototype,"webroot",2),aT=aA([eO("gl-feature-gate")],aT);let aR=M`
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
`;var az=Object.defineProperty,aD=Object.getOwnPropertyDescriptor,aO=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?aD(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&az(t,i,s),s};let aI=class extends lit_element_i{constructor(){super(...arguments),this.display="solid",this.dismissible=!1,this.layout="default"}get classNames(){return{banner:!0,[`banner--${this.display}`]:!0,[`banner--${this.layout}`]:"default"!==this.layout}}render(){return e_`<div part="base" class=${oW(this.classNames)}>
			<div class="banner__content">
				${"responsive"===this.layout?this.renderResponsiveContent():this.renderDefaultContent()}
			</div>
			${"responsive"!==this.layout?this.renderDismissButton():void 0}
		</div>`}renderDefaultContent(){return e_`${this.renderTitle()} ${this.renderBody()} ${this.renderButtons()}`}renderResponsiveContent(){return e_`
			<div class="banner__text">${this.renderTitle()} ${this.renderBody()}</div>
			${this.renderButtons()} ${this.renderDismissButton()}
		`}renderTitle(){if(this.bannerTitle)return e_`<div class="banner__title">${this.bannerTitle}</div>`}renderBody(){if(this.body)return e_`<div class="banner__body">${nm(this.body)}</div>`}renderButtons(){let e=this.renderPrimaryButton(),t=this.renderSecondaryButton();if(e||t)return e_`<div class="banner__buttons">${e} ${t}</div>`}renderPrimaryButton(){if(this.primaryButton)return e_`
			<gl-button
				class="banner__button banner__button--primary"
				appearance=${"gradient-purple"===this.display?"secondary":void 0}
				?full=${"gradient-purple"===this.display}
				href=${this.primaryButtonHref??eC}
				truncate
				@click=${this.onPrimaryButtonClick}
			>
				${this.primaryButton}
			</gl-button>
		`}renderSecondaryButton(){if(this.secondaryButton)return e_`
			<gl-button
				class="banner__button banner__button--secondary"
				appearance="toolbar"
				href=${this.secondaryButtonHref??eC}
				@click=${this.onSecondaryButtonClick}
			>
				${this.secondaryButton}
			</gl-button>
		`}renderDismissButton(){if(this.dismissible)return e_`
			<gl-button
				class="banner__dismiss"
				appearance="toolbar"
				href=${this.dismissHref??eC}
				aria-label="Dismiss"
				tooltip="Dismiss"
				@click=${this.onDismissClick}
			>
				<code-icon icon="close"></code-icon>
			</gl-button>
		`}onPrimaryButtonClick(e){this.primaryButtonCommand&&e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-primary-click",{detail:{command:this.primaryButtonCommand},bubbles:!0,composed:!0}))}onSecondaryButtonClick(e){this.secondaryButtonCommand&&e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-secondary-click",{detail:{command:this.secondaryButtonCommand},bubbles:!0,composed:!0}))}onDismissClick(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-dismiss",{bubbles:!0,composed:!0}))}};aI.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aI.styles=[aR],aO([eM({reflect:!0})],aI.prototype,"display",2),aO([eM({attribute:"banner-title"})],aI.prototype,"bannerTitle",2),aO([eM()],aI.prototype,"body",2),aO([eM({attribute:"primary-button"})],aI.prototype,"primaryButton",2),aO([eM({attribute:"primary-button-href"})],aI.prototype,"primaryButtonHref",2),aO([eM({attribute:"primary-button-command"})],aI.prototype,"primaryButtonCommand",2),aO([eM({attribute:"secondary-button"})],aI.prototype,"secondaryButton",2),aO([eM({attribute:"secondary-button-href"})],aI.prototype,"secondaryButtonHref",2),aO([eM({attribute:"secondary-button-command"})],aI.prototype,"secondaryButtonCommand",2),aO([eM({type:Boolean,attribute:"dismissible"})],aI.prototype,"dismissible",2),aO([eM({attribute:"dismiss-href"})],aI.prototype,"dismissHref",2),aO([eM({attribute:"layout"})],aI.prototype,"layout",2),aI=aO([eO("gl-banner")],aI);var aM=Object.defineProperty,aL=Object.getOwnPropertyDescriptor,aB=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?aL(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&aM(t,i,s),s};let aF=class extends tx(lit_element_i){render(){let e=this.error.get();return e?e_`<gl-banner
			display="solid"
			banner-title="Something went wrong"
			.body=${e}
			dismissible
			@gl-banner-dismiss=${()=>this.error.set(void 0)}
		></gl-banner>`:eC}};aB([eM({attribute:!1})],aF.prototype,"error",2),aF=aB([eO("gl-error-banner")],aF);var aN=Object.defineProperty,aj=Object.getOwnPropertyDescriptor;let aW=class extends lit_element_i{render(){return e_`<slot></slot>`}};aW.styles=[n1,M`
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
		`],aW=((e,t,i,r)=>{for(var o,s=r>1?void 0:r?aj(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&aN(t,i,s),s})([eO("menu-label")],aW);var aV=Object.defineProperty,aU=Object.getOwnPropertyDescriptor,aH=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?aU(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&aV(t,i,s),s};let aq=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.position="bottom"}firstUpdated(){this.setAttribute("role","progressbar")}render(){return e_`<div class="progress-bar"></div>`}};aq.styles=M`
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
	`,aH([eM({reflect:!0})],aq.prototype,"mode",2),aH([eM({type:Boolean})],aq.prototype,"active",2),aH([eM()],aq.prototype,"position",2),aq=aH([eO("progress-indicator")],aq);let aK=M`
	:host {
		box-sizing: border-box;
		display: flex;
		align-items: center;

		max-width: 100%;
		min-width: 4.6rem;
	}

	* {
		box-sizing: border-box;
	}
`,aG=M`
	code-icon.picker-icon {
		font-size: 1rem;
		/* margin-top: 0.4rem; */
		margin-right: -0.25rem;
	}

	code-icon.picker-icon::before {
		margin-left: -0.4rem;
	}
`,aY=M`
	.truncated-button {
		max-width: 100%;
		min-width: 4rem;
	}
	gl-button[disabled] {
		opacity: 1;
		cursor: default;
	}
	.truncated-button__label {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;var aZ=Object.defineProperty,aX=Object.getOwnPropertyDescriptor,aJ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?aX(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&aZ(t,i,s),s};let aQ=class extends lit_element_i{constructor(){super(...arguments),this.icon=!1,this.size=13,this.worktree=!1}render(){let e,t;if(null==this.ref)return eC;switch(this.ref.refType){case"branch":e=this.worktree?"worktree":"branch",t=this.worktree?"gl-worktree":"git-branch";break;case"tag":e="tag",t="tag";break;default:e="revision",t="git-commit"}return e_`${this.icon?e_`<code-icon
						class="icon${e?` ${e}`:""}"
						icon="${t}"
						size="${this.size}"
					></code-icon>`:eC}<span class="label">${this.ref.name}</span>`}};aQ.styles=M`
		:host {
			box-sizing: border-box;
			display: grid;
			grid-template-columns: minmax(0, 1fr);
			align-items: center;

			max-width: 100%;
			min-width: 1.4rem;
			gap: 0.4rem;
		}

		:host([icon]) {
			grid-template-columns: auto minmax(0, 1fr);
			min-width: 3.6rem;
		}

		* {
			box-sizing: border-box;
		}

		.icon {
			flex-shrink: 0;
		}

		.icon.tag,
		.icon.worktree {
			margin-right: 0.1rem;
		}

		.label {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: var(--font-weight, bold);
		}
	`,aJ([eM({type:Boolean,reflect:!0})],aQ.prototype,"icon",2),aJ([eM({type:Object})],aQ.prototype,"ref",2),aJ([eM({type:Number})],aQ.prototype,"size",2),aJ([eM({type:Boolean})],aQ.prototype,"worktree",2),aQ=aJ([eO("gl-ref-name")],aQ);var a0=Object.defineProperty,a1=Object.getOwnPropertyDescriptor,a2=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?a1(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&a0(t,i,s),s};let a5=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.icon=!1,this.size=16,this.worktree=!1}render(){return e_`<gl-button appearance="toolbar" href=${this.href??eC} ?disabled=${this.disabled}
			>${null==this.ref?e_`<slot name="empty">&lt;missing&gt;</slot>`:e_`<gl-ref-name
						part="label"
						?icon=${this.icon}
						.ref=${this.ref}
						.size=${this.size}
						?worktree=${this.worktree}
					></gl-ref-name>`}<code-icon
				slot="suffix"
				class="picker-icon"
				icon="chevron-down"
				size="10"
			></code-icon
			><slot name="tooltip" slot="tooltip"></slot
		></gl-button>`}};a5.styles=[aK,M`
			:host {
				--font-weight: normal;
			}

			gl-button {
				max-width: 100%;
				min-width: 0;
			}

			gl-ref-name:not([icon]) {
				padding-left: 0.2rem;
			}
		`,aG],a2([eM({type:Boolean,reflect:!0})],a5.prototype,"disabled",2),a2([eM({type:String,reflect:!0})],a5.prototype,"href",2),a2([eM({type:Boolean,reflect:!0})],a5.prototype,"icon",2),a2([eM({type:Object})],a5.prototype,"ref",2),a2([eM({type:Number})],a5.prototype,"size",2),a2([eM({type:Boolean})],a5.prototype,"worktree",2),a5=a2([eO("gl-ref-button")],a5);let a4=M`
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
`,a6=M`
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
`;var a3=Object.defineProperty,a8=Object.getOwnPropertyDescriptor,a7=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?a8(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&a3(t,i,s),s};let a9=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return e_`<slot class="indicator${this.pulse?" indicator--pulse":""}"></slot>`}};a9.styles=[a4,a6],a7([eM({type:Boolean})],a9.prototype,"pulse",2),a9=a7([eO("gl-indicator")],a9);var le=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,li=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lt(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&le(t,i,s),s};let lr=class extends GlElement{constructor(){super(...arguments),this.connectIcon=!0,this.disabled=!1,this.icon=!0,this.hasMultipleRepositories=!1,this.expandable=!1}get icons(){if(this.repository?.provider===void 0)return;let e=0;if(this.icon&&e++,this.connectIcon&&this.repository.provider.integration?.connected===!1&&e++,0!==e)return e}get displayName(){return this.repository?.name??"none selected"}render(){return e_`
			${this.renderProviderIcon()}
			<gl-button
				class="truncated-button"
				appearance="toolbar"
				?disabled=${this.disabled}
				@click=${e=>this.emit("gl-click",{event:e,part:"label",repository:this.repository})}
			>
				<span class="truncated-button__label">${this.displayName}</span>
				${this.hasMultipleRepositories?e_`<code-icon
							slot="suffix"
							class="picker-icon"
							icon="chevron-down"
							aria-hidden="true"
						></code-icon>`:eC}
				<slot name="tooltip" slot="tooltip">${this.displayName}</slot>
			</gl-button>
		`}renderProviderIcon(){var e,t,i;if(!this.icon)return eC;let{repository:r}=this;if(!r?.provider)return e_`
				<gl-button part="provider-icon" appearance="toolbar" ?disabled=${!0}>
					<code-icon icon="gl-repository" aria-hidden="true"></code-icon>
				</gl-button>
			`;let{provider:o}=r,s=o.integration?.connected;return e_`<gl-popover placement="bottom" trigger="hover click focus">
				<gl-button
					slot="anchor"
					part="provider-icon"
					appearance="toolbar"
					href=${o.url??eC}
					aria-label=${`Open Repository on ${o.name}`}
					@click=${e=>this.emit("gl-click",{event:e,part:"icon",repository:this.repository})}
				>
					<code-icon
						icon=${"cloud"===o.icon?"cloud":`gl-provider-${o.icon}`}
						aria-hidden="true"
					></code-icon>
					${e=()=>e_`<gl-indicator class="indicator-dot"></gl-indicator>`,s?e():void 0}
				</gl-button>
				<span slot="content">
					Open Repository on ${o.name}
					<hr />
					${t=()=>e_`
							<span>
								<code-icon style="margin-top: -3px" icon="check" aria-hidden="true"></code-icon>
								Connected to ${o.name}
							</span>
						`,i=()=>!1!==s?eC:e_`
								<code-icon style="margin-top: -3px" icon="plug" aria-hidden="true"></code-icon>
								<a
									href=${ar("gitlens.connectRemoteProvider",{repoPath:r.path,remote:o.bestRemoteName})}
								>
									Connect to ${r.provider.name}
								</a>
								<span>&mdash; not connected</span>
							`,s?t():i?.(s)}
				</span>
			</gl-popover>
			${this.renderConnectIcon()}`}renderConnectIcon(){if(!this.connectIcon)return eC;let{repository:e}=this;if(!e?.provider)return eC;let{provider:t}=e;return t.integration?.connected!==!1?eC:e_`
			<gl-button
				part="connect-icon"
				appearance="toolbar"
				href=${ar("gitlens.connectRemoteProvider",{repoPath:e.path,remote:t.bestRemoteName})}
			>
				<code-icon icon="plug" style="color: var(--titlebar-fg)"></code-icon>
				<span slot="tooltip">
					Connect to ${t.name}
					<hr />
					View pull requests and issues in Home, Commit Graph, Launchpad, autolinks, and more
				</span>
			</gl-button>
		`}};lr.styles=[rJ,rQ,aK,aY,M`
			:host {
				display: grid;
				grid-template-columns: minmax(0, 1fr);
				min-width: 1.4rem;
			}

			:host([icons]) {
				grid-template-columns: auto minmax(0, 1fr);
				min-width: 3.6rem;
			}

			:host([icons='1']:not([expandable])) {
				min-width: 3rem;
			}

			.indicator-dot {
				--gl-indicator-color: green;
				--gl-indicator-size: 0.4rem;
				margin-left: -0.2rem;
			}

			gl-popover,
			[part='provider-icon'] {
				flex-shrink: 0;
			}

			/* :host([expandable]) .truncated-button {
				transition: max-width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
			} */

			:host([expandable]:not(:hover, :focus-within)) .truncated-button .picker-icon::before {
				visibility: hidden;
			}
			:host([expandable]:not(:hover, :focus-within)) .truncated-button {
				min-width: 0;
				max-width: 0;
			}
		`,aG],li([eM({type:Boolean})],lr.prototype,"connectIcon",2),li([eM({type:Boolean})],lr.prototype,"disabled",2),li([eM({type:Boolean})],lr.prototype,"icon",2),li([eM({type:Object})],lr.prototype,"repository",2),li([eM({type:Boolean})],lr.prototype,"hasMultipleRepositories",2),li([eM({type:Object})],lr.prototype,"source",2),li([eM({type:Boolean,reflect:!0})],lr.prototype,"expandable",2),li([eM({type:Number,reflect:!0})],lr.prototype,"icons",1),lr=li([eO("gl-repo-button-group")],lr);var lo=Object.defineProperty,ls=Object.getOwnPropertyDescriptor,ln=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ls(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lo(t,i,s),s};let la=class extends SignalWatcherWebviewApp{constructor(){super(...arguments),this._host=a??=rE(),this._state=function(e){let{signal:t,persisted:i,resetAll:r,startAutoPersist:o,dispose:s}=function(e){let t,i=e?.storage,r=e?.version,o=e?.restoreKey;function s(){if(null==i)return;let t=i.get();if(null==t)return;let s=t.__v,a=t[on];if(null==o||a===o)return null!=r&&s!==r&&(t=e?.migrate?.(t,s)??void 0),t}let a=s(),c=[],h=[],p=!1;function u(){if(p=!1,t?.getPending(),t?.watch(),null==i||0===h.length)return;let e={};for(let t of(null!=r&&(e.__v=r),null!=o&&(e[on]=o),e[oa]=Date.now(),h))e[t.key]=t.serialize(t.signal.get());i.set(e)}function g(e){if(null!=e){for(let i of(t===e&&p&&u(),h))e.unwatch(i.signal);t===e&&(t=void 0)}}return{signal:function(e){let t=tO(e);return c.push(()=>t.set(e)),t},persisted:function(e,i,r){if(ol.has(e))throw Error(`Cannot use reserved key '${e}' for persisted signal`);let o=r?.deserialize,s=r?.serialize??(e=>e),c=t=>{if(null==t||!(e in t))return i;let r=t[e];if(null!=o){let e=o(r);return void 0!==e?e:i}return r},p=tO(c(a));return h.push({key:e,signal:p,serialize:s,reset:e=>{p.set(c(e))}}),null!=t&&t.watch(p),p},resetAll:function(){for(let e of c)e();let e=s();for(let t of h)t.reset(e)},startAutoPersist:function(){if(null==i)return()=>{};g(t);let e=new w.subtle.Watcher(()=>{p||(p=!0,queueMicrotask(u))});for(let i of(t=e,h))e.watch(i.signal);return()=>{g(e)}},dispose:function(){g(t),c.length=0,h.length=0}}}({storage:e,version:1}),a=i("period","1|Y"),c=i("showAllBranches",!1),h=i("sliceBy","author"),p=i("scope",void 0),u=t(oc),g=t(void 0),b=t({count:0,openCount:0}),m=t(void 0),f=t(void 0),v=tI(()=>m.get()?.allowed??!0),x=tI(()=>p.get()?.head??g.get()?.ref),_=tI(()=>p.get()?.base??g.get()?.ref),$=tI(()=>!g.get()?.virtual),C=tI(()=>{let e=g.get(),t=p.get();return!e?.virtual&&(t?.type==="file"||t?.type==="folder")}),S=tI(()=>C.get()&&c.get()?h.get():"author");return{period:a,showAllBranches:c,sliceBy:h,scope:p,displayConfig:u,repository:g,repositories:b,access:m,error:f,allowed:v,head:x,base:_,isShowAllBranchesSupported:$,isSliceBySupported:C,effectiveSliceBy:S,resetAll:r,startAutoPersist:o,dispose:s}}(this._host.storage),this._rpc=new RpcController(this,{rpcOptions:{webviewId:()=>this._webview?.webviewId,webviewInstanceId:()=>this._webview?.webviewInstanceId,endpoint:()=>this._host.createEndpoint()},onReady:e=>this._onRpcReady(e),onError:e=>this._state.error.set(e.message)}),this.onChooseBaseRef=e=>{e.target.disabled||this._actions?.chooseBaseRef()},this.onChooseHeadRef=e=>{if(e.target.disabled)return;let t=e.target.getAttribute("location");this._actions?.chooseHeadRef(t)},this.onChoosePath=e=>{e.stopImmediatePropagation(),this._actions?.choosePath("view"===this.placement||e.altKey||e.shiftKey)},this.onChangeScope=e=>{let t=e.target?.closest("gl-breadcrumb-item-child")??e.target?.closest("gl-breadcrumb-item"),i=t?.getAttribute("type");if(null==i)return;let r=t?.getAttribute("value")??void 0;this._actions?.changeScope(i,r,"view"===this.placement||e.altKey||e.shiftKey)}}connectedCallback(){super.connectedCallback?.();let e=this.context;this.context=void 0,this.initWebviewContext(e)}disconnectedCallback(){this._unsubscribeEvents?.(),this._unsubscribeEvents=void 0,this._stopAutoPersist?.(),this._stopAutoPersist=void 0,this._datasetResource?.dispose(),this._datasetResource=void 0,this._chartDataset=void 0,this._chartDataPromise=void 0,this._actions?.dispose(),this._actions=void 0,this._state.resetAll(),this._state.dispose(),super.disconnectedCallback?.()}async _onRpcReady(e){var t,i;let r=this._state,[o,s,a,c,h]=await Promise.all([e.timeline,e.repositories,e.repository,e.subscription,e.config]),p=function(e){let t,i,r=(void 0)??!0,o,s=tO(o),a=tO(!1),c=tO(void 0),h=tO(!1),p=new w.Computed(()=>a.get()?"loading":null!=c.get()?"error":h.get()?"success":"idle"),u=!1,g=0,b=0;function m(){null!=t&&(t.abort(),t=void 0),a.set(!1)}async function f(...o){if(u)return;r&&m(),i=o;let p=new AbortController,v=++g;b=v,t=p,a.set(!0),c.set(void 0);try{let t=await e(p.signal,...o);if(p.signal.aborted||v!==b)return;s.set(t),h.set(!0)}catch(e){if(p.signal.aborted||v!==b)return;c.set(e instanceof Error?e.message:String(e))}finally{t===p&&(t=void 0,a.set(!1))}}async function v(){if(null!=i)return f(...i)}return{value:s,loading:a,error:c,status:{get:()=>p.get()},generationId:{get:()=>b},fetch:f,refetch:v,mutate:function(e){u||(s.set(e),c.set(void 0),h.set(!0))},cancel:m,reset:function(){m(),s.set(o),c.set(void 0),h.set(!1),i=void 0},dispose:function(){u=!0,m()}}}(async e=>{let t=r.scope.get();if(null!=t)return o.getDataset(t,{period:r.period.get(),showAllBranches:r.showAllBranches.get(),sliceBy:r.sliceBy.get()},e)});this._datasetResource=p;let u=new TimelineActions(r,e,o,a,p);this._actions=u,this._stopAutoPersist=r.startAutoPersist(),this._unsubscribeEvents=await (t={timeline:o,repositories:s,subscription:c,config:h},i={onScopeChanged:e=>u.onScopeChanged(e),onRepoChanged:e=>u.onRepoChanged(e),onDataChanged:()=>void u.fetchTimeline(),onConfigChanged:()=>void u.fetchDisplayConfig(),onRepoCountChanged:()=>void u.fetchRepoCount()},os([()=>t.timeline.onScopeChanged(e=>i.onScopeChanged(e)),()=>t.repositories.onRepositoryChanged(e=>i.onRepoChanged(e)),()=>t.subscription.onSubscriptionChanged(()=>i.onDataChanged()),()=>t.config.onConfigChanged(()=>i.onConfigChanged()),()=>t.repositories.onRepositoriesChanged(()=>i.onRepoCountChanged())]));let g=()=>{"visible"!==document.visibilityState?u.cancelPendingRequests():null!=r.scope.get()&&u.fetchTimeline()};document.addEventListener("visibilitychange",g),this.disposables.push({dispose:()=>document.removeEventListener("visibilitychange",g)}),await u.populateInitialState()}updated(e){super.updated?.(e),this._actions?.pushTelemetryContext()}onPeriodChanged(e){let t=e.target,i=t.options[t.selectedIndex].value;(function(e){if("all"===e)return;let[t,i]=e.split("|");if(isNaN(Number(t))||"D"!==i&&"M"!==i&&"Y"!==i)throw Error(`Invalid period: ${e}`)})(i),this._actions?.changePeriod(i)}onSliceByChanged(e){let t=e.target,i=t.options[t.selectedIndex].value;(function(e){if("author"!==e&&"branch"!==e)throw Error(`Invalid slice by: ${e}`)})(i),this._actions?.changeSliceBy(i)}onShowAllBranchesChanged(e){let t=e.target.checked;this._actions?.changeShowAllBranches(t)}onChartCommitSelected(e){null!=e.detail.id&&this._actions?.selectDataPoint(e.detail)}render(){let e=this._state,t=this._datasetResource?.loading.get()??!1;return e_`${this.renderGate()}
			<div class="container">
				<gl-error-banner .error=${e.error}></gl-error-banner>
				<progress-indicator ?active=${t}></progress-indicator>
				<header class="header" ?hidden=${!e.scope.get()}>
					<span class="details">${this.renderBreadcrumbs()} ${this.renderTimeframe()}</span>
					<span class="toolbox">
						${this.renderConfigPopover()}
						${"view"===this.placement?e_`<gl-button
									appearance="toolbar"
									href="command:gitlens.views.timeline.openInTab"
									tooltip="Open in Editor"
									aria-label="Open in Editor"
								>
									<code-icon icon="link-external"></code-icon>
								</gl-button>`:eC}
						${e.access.get()?.subscription?.current==null||!eX(e.access.get().subscription.current)?e_`<gl-feature-badge
									placement="bottom"
									.source=${{source:"timeline",detail:"badge"}}
									.subscription=${e.access.get()?.subscription?.current}
								></gl-feature-badge>`:eC}
					</span>
				</header>

				<main class="timeline">${this.renderChart()}</main>
			</div> `}renderGate(){let e=this._state,t=e.access.get()?.subscription?.current;return"editor"===this.placement?e_`<gl-feature-gate
				?hidden=${!1!==e.allowed.get()}
				featureRestriction="private-repos"
				.source=${{source:"timeline",detail:"gate"}}
				.state=${t?.state}
				><p slot="feature">
					<a href="https://help.gitkraken.com/gitlens/gitlens-features/#visual-file-history-pro"
						>Visual History</a
					>
					<gl-feature-badge></gl-feature-badge>
					&mdash; visualize the evolution of a repository, branch, folder, or file and identify when the most
					impactful changes were made and by whom. Quickly see unmerged changes in files or folders, when
					slicing by branch.
				</p></gl-feature-gate
			>`:e_`<gl-feature-gate
			?hidden=${!1!==e.allowed.get()}
			featureRestriction="private-repos"
			.source=${{source:"timeline",detail:"gate"}}
			.state=${t?.state}
			><p slot="feature">
				<a href="https://help.gitkraken.com/gitlens/gitlens-features/#visual-file-history-pro"
					>Visual File History</a
				>
				<gl-feature-badge></gl-feature-badge>
				&mdash; visualize the evolution of a file and quickly identify when the most impactful changes were made
				and by whom. Quickly see unmerged changes in files or folders, when slicing by branch.
			</p></gl-feature-gate
		>`}renderBreadcrumbs(){return e_`<gl-breadcrumbs>
			${this.renderRepositoryBreadcrumbItem()}
			${this.renderBranchBreadcrumbItem()}${this.renderBreadcrumbPathItems()}
			${"editor"===this.placement?e_`<gl-button
						appearance="toolbar"
						density="compact"
						@click=${this.onChoosePath}
						tooltip="Choose File or Folder to Visualize..."
						aria-label="Choose File or Folder to Visualize..."
						><code-icon slot="prefix" icon="folder-opened"></code-icon>Choose File / Folder...</gl-button
					>`:eC}
		</gl-breadcrumbs>`}renderRepositoryBreadcrumbItem(){let e=this._state,t=e.repository.get();return null==t?eC:e_`<gl-breadcrumb-item
			collapsibleState="${e.scope.get()?.relativePath?"collapsed":"expanded"}"
			icon="gl-repository"
			shrink="10000000"
			type="repo"
		>
			<gl-repo-button-group
				aria-label="Visualize Repository History"
				.connectIcon=${!1}
				.hasMultipleRepositories=${e.repositories.get().openCount>1}
				.icon=${!1}
				.repository=${t}
				.source=${{source:"timeline"}}
				@gl-click=${this.onChangeScope}
				><span slot="tooltip">
					Visualize Repository History
					<hr />
					${t.name}
				</span></gl-repo-button-group
			>
		</gl-breadcrumb-item>`}renderBranchBreadcrumbItem(){let e=this._state,t=e.head.get(),i=e.showAllBranches.get();return e_`<gl-breadcrumb-item
			collapsibleState="expanded"
			icon="${i?"git-branch":function(e){switch(e?.refType){case"branch":return"git-branch";case"tag":return"tag";default:return"git-commit"}}(t)}"
			shrink="100000"
			type="ref"
		>
			<gl-ref-button .ref=${i?void 0:t} @click=${this.onChooseHeadRef}
				><span slot="empty">All Branches</span
				><span slot="tooltip"
					>Change Reference...
					<hr />
					${i?"Showing All Branches":e_`<gl-ref-name icon .ref=${t}></gl-ref-name>`}</span
				></gl-ref-button
			>
		</gl-breadcrumb-item>`}renderBreadcrumbPathItems(){let e=this._state,t=e.scope.get()?.relativePath;if(!t)return eC;let i=[],r=t.split("/"),o=r.pop()||"",s=r.length;if(s){let e=r.shift(),t=e,o=e_`
				<gl-breadcrumb-item
					collapsibleState="expanded"
					icon="folder"
					type="${"folder"}"
					value="${e}"
				>
					<gl-button
						appearance="toolbar"
						@click=${this.onChangeScope}
						aria-label="Visualize folder history of ${e}"
						>${e}<span slot="tooltip"
							>Visualize Folder History
							<hr />
							${e}</span
						></gl-button
					>

					${r.length?e_`<span slot="children" class="breadcrumb-item-children">
								${r.map(e=>(t=`${t}/${e}`,e_`<gl-breadcrumb-item-child
										type="${"folder"}"
										value="${t}"
									>
										<gl-button
											appearance="toolbar"
											@click=${this.onChangeScope}
											aria-label="Visualize folder history of ${t}"
											>${e}<span slot="tooltip"
												>Visualize Folder History
												<hr />
												${t}</span
											></gl-button
										>
									</gl-breadcrumb-item-child>`))}
							</span>`:eC}
				</gl-breadcrumb-item>
			`;i.push(o)}let a=e.scope.get()?.type;return i.push(e_`
			<gl-breadcrumb-item
				collapsibleState="none"
				icon="${("folder"===a?s?void 0:"folder":"file")??eC}"
				shrink="0"
				tooltip="${t}"
				type="${"folder"===a?"folder":"file"}"
				value="${t}"
			>
				<gl-copy-container
					tabindex="0"
					copyLabel="Copy Path&#10;&#10;${t}"
					.content=${t}
					placement="bottom"
				>
					<span>${o}</span>
				</gl-copy-container>
			</gl-breadcrumb-item>
		`),i}renderChart(){let e=this._state;if(!e.scope.get()&&"view"===this.placement)return e_`<div class="timeline__empty">
				<p>There are no editors open that can provide file history information.</p>
			</div>`;let t=this._datasetResource?.value.get(),i=this.getChartDataPromise(t?.dataset);return e_`<gl-timeline-chart
			id="chart"
			placement="${this.placement}"
			dateFormat="${e.displayConfig.get().dateFormat}"
			.dataPromise=${i}
			head="${e.head.get()?.ref??"HEAD"}"
			.scope=${e.scope.get()}
			shortDateFormat="${e.displayConfig.get().shortDateFormat}"
			sliceBy="${e.effectiveSliceBy.get()}"
			@gl-commit-select=${this.onChartCommitSelected}
			@gl-loading=${e=>{e.detail}}
		>
			<div slot="empty">
				${null==e.scope.get()?e_`<p>Something went wrong</p>
							<p>Please close this tab and try again</p>`:e_`<p>No commits found for the specified time period</p>
							${this.renderPeriodSelect(e.period.get())}`}
			</div>
		</gl-timeline-chart>`}getChartDataPromise(e){if(null==e){this._chartDataset=void 0,this._chartDataPromise=void 0;return}return(this._chartDataset!==e||null==this._chartDataPromise)&&(this._chartDataset=e,this._chartDataPromise=Promise.resolve(e)),this._chartDataPromise}renderConfigPopover(){let e=this._state.period.get();return e_`<gl-popover class="config" placement="bottom" trigger="hover focus click" hoist>
			<gl-button slot="anchor" appearance="toolbar">
				<code-icon icon="settings"></code-icon>
			</gl-button>
			<div slot="content" class="config__content">
				<menu-label>View Options</menu-label>
				${this.renderConfigHead()} ${this.renderConfigBase()} ${this.renderConfigShowAllBranches()}
				${this.renderPeriodSelect(e)} ${this.renderConfigSliceBy()}
			</div>
		</gl-popover>`}renderConfigHead(){let e=this._state,t=e.head.get(),i=e.showAllBranches.get(),r=i&&"branch"!==e.effectiveSliceBy.get();return e_`<section>
			<label for="head" ?disabled=${r}>Branch</label>
			<gl-ref-button
				name="head"
				?disabled=${r}
				icon
				.ref=${t}
				location="config"
				@click=${this.onChooseHeadRef}
				><span slot="tooltip"
					>Change Reference...
					<hr />
					${i?"Showing All Branches":e_`<gl-ref-name icon .ref=${t}></gl-ref-name>`}</span
				></gl-ref-button
			>
		</section>`}renderConfigBase(){return eC}renderConfigShowAllBranches(){let e=this._state;if(e.repository.get()?.virtual)return eC;let t=e.showAllBranches.get();return e_`<section>
			<gl-checkbox value="all" .checked=${t} @gl-change-value=${this.onShowAllBranchesChanged}
				>View All Branches</gl-checkbox
			>
		</section>`}renderPeriodSelect(e){return e_`<section>
			<span class="select-container">
				<label for="periods">Timeframe</label>
				<select class="select" name="periods" position="below" .value=${e} @change=${this.onPeriodChanged}>
					<option value="7|D" ?selected=${"7|D"===e}>1 week</option>
					<option value="1|M" ?selected=${"1|M"===e}>1 month</option>
					<option value="3|M" ?selected=${"3|M"===e}>3 months</option>
					<option value="6|M" ?selected=${"6|M"===e}>6 months</option>
					<option value="9|M" ?selected=${"9|M"===e}>9 months</option>
					<option value="1|Y" ?selected=${"1|Y"===e}>1 year</option>
					<option value="2|Y" ?selected=${"2|Y"===e}>2 years</option>
					<option value="4|Y" ?selected=${"4|Y"===e}>4 years</option>
					<option value="all" ?selected=${"all"===e}>Full history</option>
				</select>
			</span>
		</section>`}renderConfigSliceBy(){let e=this._state;if(!e.isSliceBySupported.get())return eC;let t=e.effectiveSliceBy.get();return e_`<section>
			<span class="select-container"
				><label for="sliceBy">Slice By</label>
				<select
					class="select"
					name="sliceBy"
					position="below"
					.value=${t}
					@change=${this.onSliceByChanged}
				>
					<option value="author" ?selected=${"author"===t}>Author</option>
					<option value="branch" ?selected=${"branch"===t}>Branch</option>
				</select></span
			>
		</section>`}renderTimeframe(){let e;switch(this._state.period.get()){case"7|D":e="Up to 1wk ago";break;case"1|M":e="Up to 1mo ago";break;case"3|M":e="Up to 3mo ago";break;case"6|M":e="Up to 6mo ago";break;case"9|M":e="Up to 9mo ago";break;case"1|Y":e="Up to 1yr ago";break;case"2|Y":e="Up to 2yr ago";break;case"4|Y":e="Up to 4yr ago";break;case"all":e="All time";break;default:return eC}return e_`<span class="details__timeframe" tabindex="0">${e}</span>`}};la.styles=[rJ,rQ,oh,od],ln([eM({type:String,noAccessor:!0})],la.prototype,"context",2),ln([eF("#chart")],la.prototype,"_chart",2),la=ln([eO("gl-timeline-app")],la);export{la as GlTimelineApp};