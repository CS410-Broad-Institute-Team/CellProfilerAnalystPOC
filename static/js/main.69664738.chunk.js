(this.webpackJsonpcpa_poc=this.webpackJsonpcpa_poc||[]).push([[0],{1081:function(e,t){},1082:function(e,t){},1090:function(e,t){},1091:function(e,t){},1092:function(e,t){},1096:function(e,t){},1097:function(e,t){},1105:function(e,t){},1113:function(e,t){},1114:function(e,t){},1115:function(e,t){},1123:function(e,t){},1274:function(e,t,n){"use strict";n.r(t);var c=n(30),r=n.n(c),o=n(122),a=n.n(o),i=(n(783),n(784),n(3)),l=n.n(i),s=n(8),u=n(2),j=n(5),f=n(12),h=n(13),d=(n(258),n(683),n(228)),b=n(503),p=(n(684),n.p+"static/media/logo.6ce24c58.svg"),m=n(248),O=n.n(m),x=n.p+"static/media/example_SETUP.c8183f4e.SQL",g=n(37),v=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(e){var c;return Object(u.a)(this,n),(c=t.call(this,e)).state={imageSource:p},c}return Object(j.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=this,t=function(){var t=Object(s.a)(l.a.mark((function t(n){var c,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),(c=new FileReader).onload=function(){var t=Object(s.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log(n.target.result),e.setState({imageSource:n.target.result});case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),c.readAsDataURL(n.target.files[6]),console.log(n.target.files),Array.from(n.target.files).findIndex((function(e){return"per_object.csv"===e.name})),(r=new(function(){function e(){Object(u.a)(this,e),this.df=null,this.perObjData=null,this.column_names=null,O.a.parsePromise=function(e){return new Promise((function(t,n){O.a.parse(e,{complete:t,error:n})}))}}return Object(j.a)(e,[{key:"getDF",value:function(){return this.df}},{key:"findFileIndex",value:function(e){return Array.from(n.target.files).findIndex((function(t){return t.name===e}))}},{key:"parseSQLData",value:function(){var e=this;(new FileReader).onload=function(){var e=Object(s.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t.target.result);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var t=this.findFileIndex("example_SETUP.SQL");return n.target.files[t].text().then((function(e){return e.split("\n").map((function(e){return e.trim()}))})).then((function(t){console.log(t.indexOf("CREATE TABLE per_object (")),console.log(t.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"));var n=t.indexOf("CREATE TABLE per_object ("),c=t.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"),r=t.slice(n+1,c);e.column_names=r.map((function(e){return e.split(" ")[0]})),console.assert(e.column_names[e.column_names.length-1],"AreaNormalized_Cytoplasm_AreaShape_Zernike9_9"),console.log("df complete")}))}},{key:"parsePerObj",value:function(){var e=this;return O.a.parsePromise(n.target.files[this.findFileIndex("per_object.cvs")],{worker:!0,skipEmptyLines:!0,fastMode:!0,dynamicTyping:!0,complete:function(t,n){console.log("Parsing complete:"),console.log(t.data),e.perObjData=t.data}})}},{key:"setupDF",value:function(){var e=this;this.df=new d.a(this.perObjData,{columns:this.column_names}),console.log("df complete");var t=this.df.column("ImageNumber").tensor;console.log("imagekeys complete");var n=this.df.column("ObjectNumber").tensor;console.log("objeckeys complete");var c=t.square().add(t).add(n);console.log("output1 complete");var r=n.square().add(t);console.log("output2 complete"),c.where(t.greaterEqual(n),r).array().then((function(t){console.log("indices complete",t),e.df.set_index({key:t,inplace:!0}),e.df.head().print(),window.data_df=e.df}))}},{key:"init",value:function(){var e=this;this.parseSQLData().then((function(){e.parsePerObj().then((function(){console.log(e.column_names),console.log(e.perObjData),e.setupDF()}))}))}}]),e}())).init(),r.getDF();case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(g.jsxs)("div",{children:[Object(g.jsx)("h2",{children:"Emma"}),Object(g.jsx)("p",{children:"Stuff of Emma"}),Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsx)("img",{src:this.state.imageSource,className:"App-logo",alt:"logo"}),Object(g.jsx)("p",{children:"woo the atom thingy do the rotate woo yea"}),Object(g.jsx)("script",{src:"https://cdn.jsdelivr.net/npm/danfojs@0.2.4/lib/bundle.min.js"}),Object(g.jsx)("input",{type:"file",onChange:function(e){return t(e)},webkitdirectory:"true",mozdirectory:"true",msdirectory:"true",odirectory:"true",directory:"true",multiple:!0}),Object(g.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})]})}}]),n}(r.a.Component),y=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(e){var c;return Object(u.a)(this,n),(c=t.call(this,e)).state={imageSource:p},O.a.parsePromise=function(e){return new Promise((function(t,n){O.a.parse(e,{complete:t,error:n})}))},c}return Object(j.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=null,t=null,n=null,c=null;return fetch(x).then((function(e){return e.text()})).then((function(e){return e.split("\n").map((function(e){return e.trim()}))})).then((function(c){return c,e=c.indexOf("CREATE TABLE per_object ("),t=c.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"),n=c.slice(e+1,t),n.map((function(e){return e.split(" ")[0]})),n})).then((function(e){c=e.filter((function(e){return e.includes("Location")})),console.log(e),console.log(c);new b.a({numStep:1e3,learningRate:.005})})),Object(g.jsxs)("div",{children:[Object(g.jsx)("h2",{children:"Yahiya"}),Object(g.jsx)("p",{children:"Yahiya Stuff"}),Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsx)("img",{src:this.state.imageSource,className:"App-logo",alt:"logo"}),Object(g.jsx)("p",{children:"woo the atom thingy do the rotate woo yea"}),Object(g.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})]})}}]),n}(r.a.Component),k=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(j.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return console.log("hello woorld?"),Object(g.jsx)("div",{children:Object(g.jsx)("p",{children:"Bella is here "})})}}]),n}(r.a.Component),A=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(j.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return console.log("hello world"),Object(g.jsx)("div",{children:Object(g.jsx)("p",{children:"Abby"})})}}]),n}(r.a.Component),w=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(j.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return console.log("hi there"),Object(g.jsxs)("div",{children:[Object(g.jsx)("h2",{children:"Alex"}),Object(g.jsx)("p",{children:"Alex stuff"})]})}}]),n}(r.a.Component),E=n(1298),C=n(1296),_=n(1295),D=n(1297),P=n(1299),S=n.p+"static/media/jones.88567442.jpg",N=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(j.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return console.log("hi there"),Object(g.jsxs)("div",{children:[Object(g.jsxs)(_.a,{container:!0,justify:"center",spacing:2,style:{backgroundColor:"#cfe8fc"},children:[Object(g.jsx)(_.a,{item:!0,children:Object(g.jsx)(E.a,{variant:"contained",onClick:function(){return console.log("Fetch!")},children:"Fetch"})},0),Object(g.jsx)(_.a,{item:!0,children:Object(g.jsx)(E.a,{variant:"contained",onClick:function(){return console.log("Train!")},children:"Train"})},1),Object(g.jsx)(_.a,{item:!0,children:Object(g.jsx)(E.a,{variant:"contained",onClick:function(){return console.log("Evaluate!")},children:"Evaluate"})},2)]}),Object(g.jsx)(C.a,{maxWidth:"sm",children:Object(g.jsx)(D.a,{cellHeight:160,cols:3,children:[0,1,2,3,4,5,6,7,8].map((function(e){return Object(g.jsx)(P.a,{cols:1,children:Object(g.jsx)(E.a,{onClick:function(){return console.log("Click Image: ".concat(e,"!"))},children:Object(g.jsx)("img",{width:"100%",src:S,alt:"jones"})})},e)}))})})]})}}]),n}(r.a.Component),F=n(231),I=n(89);function R(){return Object(g.jsx)(N,{})}function L(){return Object(g.jsx)(y,{})}function T(){return Object(g.jsx)(w,{})}function M(){return Object(g.jsx)(v,{})}function Y(){return Object(g.jsx)(k,{})}function B(){return Object(g.jsx)(A,{})}var U=function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(F.a,{children:Object(g.jsxs)("div",{children:[Object(g.jsxs)("ul",{children:[Object(g.jsx)("li",{children:Object(g.jsx)(F.b,{to:"/ProofOfConcept",children:"Proof Of Concept"})}),Object(g.jsx)("li",{children:Object(g.jsx)(F.b,{to:"/Yahiya",children:"Yahiya"})}),Object(g.jsx)("li",{children:Object(g.jsx)(F.b,{to:"/Alex",children:"Alex"})}),Object(g.jsx)("li",{children:Object(g.jsx)(F.b,{to:"/Emma",children:"Emma"})}),Object(g.jsx)("li",{children:Object(g.jsx)(F.b,{to:"/Bella",children:"Bella"})}),Object(g.jsx)("li",{children:Object(g.jsx)(F.b,{to:"/Abby",children:"Abby"})})]}),Object(g.jsx)("hr",{}),Object(g.jsxs)(I.c,{children:[Object(g.jsx)(I.a,{exact:!0,path:"/ProofOfConcept",children:Object(g.jsx)(R,{})}),Object(g.jsx)(I.a,{exact:!0,path:"/Yahiya",children:Object(g.jsx)(L,{})}),Object(g.jsx)(I.a,{path:"/Alex",children:Object(g.jsx)(T,{})}),Object(g.jsx)(I.a,{path:"/Emma",children:Object(g.jsx)(M,{})}),Object(g.jsx)(I.a,{path:"/Abby",children:Object(g.jsx)(B,{})}),Object(g.jsx)(I.a,{path:"/Bella",children:Object(g.jsx)(Y,{})})]})]})})})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,1300)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),o(e),a(e)}))};a.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(U,{})}),document.getElementById("root")),W()},783:function(e,t,n){},784:function(e,t,n){}},[[1274,1,2]]]);
//# sourceMappingURL=main.69664738.chunk.js.map