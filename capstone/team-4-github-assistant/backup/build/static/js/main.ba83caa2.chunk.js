(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{32:function(e,t,a){},42:function(e,t,a){e.exports=a(64)},62:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n,r,c=a(0),s=a.n(c),l=a(26),i=a.n(l),o=a(24),u=a(15),m=a(38),d=a(11),E=a.n(d),h=a(36),p=a(10);!function(e){e.ADD_NEW_CHANNEL="@@types/ADD_NEW_CHANNEL",e.GET_CHANNEL_MESSAGE="@@types/GET_CHANNEL_MESSAGE",e.ADD_NEW_MESSAGE="@@types/ADD_NEW_MESSAGE",e.DELETE_MESSAGE="@@types/DELETE_MESSAGE",e.CREATE_REPO="@@type/CREATE_GITHUB_REPO",e.CREATE_ISSUE="@@type/CREATE_GITHUB_ISSUE",e.GET_ISSUE_LIST="@@type/GET_ISSUE_LIST",e.GITHUB_AUTH="@@type/GITHUB_AUTH",e.GET_CURRENT_CHANNEL="@@type/GET_CURRENT_CHANNEL",e.USER_REGISTER="@@type/USER_REGISTER",e.USER_LOGIN="@@TYPE/USER_LOGIN"}(n||(n={})),function(e){e.LOGIN_REQUEST="@@types/LOGIN_REQUEST",e.LOGOUT="@@types/LOGOUT",e.LOGIN_SUCCESS="@@types/LOGIN_SUCCESS",e.LOGIN_ERROR="@@types/LOGIN_ERROR",e.LOGIN_CANCELLED="@@types/LOGIN_CANCELLED",e.SAVE_TOKEN="@@types/SAVE_TOKEN",e.DELETE_TOKEN="@@types/DELETE_TOKEN"}(r||(r={}));var b=E.a.mark(k),g=E.a.mark(L),f=E.a.mark(T),O=E.a.mark(A),v=E.a.mark(I),N=E.a.mark(G),j=E.a.mark(R),y=E.a.mark(x),C=E.a.mark(U),S=E.a.mark(D),_=E.a.mark(H);function w(e){return new Promise(function(){var t=Object(h.a)(E.a.mark(function t(a,n){var r,c;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e.payload)},t.next=4,fetch("/api/auth/login",r).then(function(e){return e.json()},function(e){return e}).then(function(e){return e.success?{token:e.token}:{token:null}});case 4:c=t.sent,a(c.token),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),n(t.t0);case 11:case"end":return t.stop()}},t,this,[[0,8]])}));return function(e,a){return t.apply(this,arguments)}}())}function k(e){var t;return E.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(p.b)(w,e);case 3:return t=a.sent,console.log(t),a.next=7,Object(p.f)({type:r.LOGIN_SUCCESS});case 7:return a.next=9,Object(p.f)({type:r.SAVE_TOKEN,payload:{token:t}});case 9:a.next=15;break;case 11:return a.prev=11,a.t0=a.catch(0),a.next=15,Object(p.f)({type:r.LOGIN_ERROR,payload:{status:a.t0}});case 15:return a.prev=15,a.next=18,Object(p.d)();case 18:if(!a.sent){a.next=21;break}return a.next=21,Object(p.f)({type:r.LOGIN_CANCELLED});case 21:return a.finish(15);case 22:case"end":return a.stop()}},b,this,[[0,11,15,22]])}function L(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(n.GET_ISSUE_LIST,function(){});case 2:case"end":return e.stop()}},g,this)}function T(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(n.CREATE_ISSUE,function(){});case 2:case"end":return e.stop()}},f,this)}function A(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(n.CREATE_REPO,function(){});case 2:case"end":return e.stop()}},O,this)}function I(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(n.GITHUB_AUTH,function(){});case 2:case"end":return e.stop()}},v,this)}function G(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(n.ADD_NEW_MESSAGE,function(){});case 2:case"end":return e.stop()}},N,this)}function R(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(n.DELETE_MESSAGE,function(){});case 2:case"end":return e.stop()}},j,this)}function x(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(n.GET_CHANNEL_MESSAGE,function(){});case 2:case"end":return e.stop()}},y,this)}function U(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(n.USER_REGISTER,function(){});case 2:case"end":return e.stop()}},C,this)}function D(){var e;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(p.h)(n.USER_LOGIN,function(e){return console.log(e),k(e)});case 2:return e=t.sent,t.next=5,Object(p.g)([r.LOGOUT,r.LOGIN_ERROR]);case 5:if(t.sent.type!==r.LOGOUT){t.next=11;break}return t.next=9,Object(p.c)(e);case 9:return t.next=11,Object(p.f)({type:r.DELETE_TOKEN});case 11:case"end":return t.stop()}},S,this)}function H(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)([Object(p.e)(L),Object(p.e)(T),Object(p.e)(A),Object(p.e)(I),Object(p.e)(G),Object(p.e)(R),Object(p.e)(x),Object(p.e)(U),Object(p.e)(D)]);case 2:case"end":return e.stop()}},_,this)}var M=H,F={channels:[{id:1,name:"Public",members:[1,2,3]},{id:2,name:"Star",members:[1,2,3]},{id:3,name:"national",members:[1,2]}],users:[{id:1,name:"Anurag"},{id:2,name:"Amit"},{id:3,name:"Ankit"}],messages:[{id:1,message:"Hi , Anurag",channelid:1,userid:1},{id:2,message:"How are you .....",channelid:1,userid:2},{id:3,message:"I am fine, what about you ?",channelid:1,userid:1},{id:4,message:"I am fine, what about you ?",channelid:2,userid:2}]},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F;switch((arguments.length>1?arguments[1]:void 0).type){case n.GET_CURRENT_CHANNEL:case n.GET_CHANNEL_MESSAGE:case n.ADD_NEW_CHANNEL:case n.ADD_NEW_MESSAGE:default:return e}},B={},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B;switch((arguments.length>1?arguments[1]:void 0).type){case n.CREATE_REPO:break;case n.CREATE_ISSUE:case n.GET_ISSUE_LIST:case n.GITHUB_AUTH:default:return e}},W=a(17),q={token:null,status:"loggedout"},V=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case r.LOGIN_SUCCESS:return e=Object(W.a)({},t,{status:"Logged in"});case r.SAVE_TOKEN:return e=Object(W.a)({},t,{token:a.payload.token});case r.DELETE_TOKEN:return(e=Object(W.a)({},t,{token:null})).token=null,e;case r.LOGOUT:return e=Object(W.a)({},t,{status:"Logged out"});case r.LOGIN_ERROR:return e=Object(W.a)({},t,{status:"Login error"});case r.LOGIN_CANCELLED:return e=Object(W.a)({},t,{status:"Login cancelled"});default:return t}},J=Object(u.c)({slackReducer:P,gitHubReducer:K,loginReducer:V}),X=Object(m.a)(),Q=[Object(u.a)(X),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()],z=Object(u.e)(J,u.d.apply(void 0,Q));X.run(M);var Y=z,Z=a(4),$=a(5),ee=a(7),te=a(6),ae=a(8),ne=a(68),re=a(67),ce=a(66),se=a(14),le=a(40),ie=a(65),oe=function(e){return{type:n.USER_LOGIN,payload:e}},ue=(a(32),function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={username:null,password:null},a.handleUserNameChange=a.handleUserNameChange.bind(Object(se.a)(a)),a.handlePasswordChange=a.handlePasswordChange.bind(Object(se.a)(a)),a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"onLoginAction",value:function(e){e.preventDefault();var t={username:this.state.username,password:this.state.password};this.props.onLoginAction(t)}},{key:"handleUserNameChange",value:function(e){this.setState({username:e.target.value})}},{key:"handlePasswordChange",value:function(e){this.setState({password:e.target.value})}},{key:"render",value:function(){var e=this;return s.a.createElement(c.Fragment,null,!("Logged in"===this.props.status)&&s.a.createElement("div",{className:"login-container"},s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",{className:"main-panel dark"},s.a.createElement("div",{className:"content dark"},s.a.createElement("div",{className:"registerpage"},s.a.createElement("section",{className:"login-block"},s.a.createElement("div",{className:"auth-wrapper"},s.a.createElement("div",{className:""},s.a.createElement("div",{className:"form"},s.a.createElement("ul",{className:"tab-group"},s.a.createElement("li",{className:"tab active"},s.a.createElement(ie.a,{to:"/signin"},"Log In")),s.a.createElement("li",{className:"tab "},s.a.createElement(ie.a,{to:"/signup"},"Sign Up"))),s.a.createElement("form",{name:"loginForm",onSubmit:function(t){e.onLoginAction(t)}},s.a.createElement("div",{className:"tab-content"},s.a.createElement("div",{id:"login"},s.a.createElement("h2",{className:"text-center"},"Login to your account!"),s.a.createElement("div",{className:"top-row"},s.a.createElement("div",{className:"field-wrap"},s.a.createElement("input",{type:"text",name:"username",placeholder:"Username",onChange:this.handleUserNameChange,required:!0})),s.a.createElement("div",{className:"field-wrap"},s.a.createElement("input",{type:"password",placeholder:"Password",name:"password",onChange:this.handlePasswordChange,required:!0}))),s.a.createElement("button",{type:"submit",className:"button button-block"},"Log In")))),s.a.createElement("p",null," ","Don't have an Account ?",s.a.createElement(ie.a,{to:"/signup"},s.a.createElement("strong",null," Signup Now")))))))))))),"Logged in"===this.props.status&&s.a.createElement(le.a,{to:"/app"}))}}]),t}(c.Component)),me=Object(o.b)(function(e){return{token:e.loginReducer.token,status:e.loginReducer.status}},function(e){return Object(u.b)({onLoginAction:oe},e)})(ue),de=function(e){function t(e){return Object(Z.a)(this,t),Object(ee.a)(this,Object(te.a)(t).call(this,e))}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"tab"},s.a.createElement("div",{className:"tab_container"},s.a.createElement(me,null)),s.a.createElement("div",null,s.a.createElement(ie.a,{to:"/app"},"Slack")))}}]),t}(c.Component),Ee=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={username:null,lastname:null,email:null,password:null,redirect:!1},a.handleUserNameChange=a.handleUserNameChange.bind(Object(se.a)(a)),a.handleLastNameChange=a.handleLastNameChange.bind(Object(se.a)(a)),a.handleEmailChange=a.handleEmailChange.bind(Object(se.a)(a)),a.handlePasswordChange=a.handlePasswordChange.bind(Object(se.a)(a)),a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"componentWillUnmount",value:function(){this.setState({redirect:!1})}},{key:"onRegisterAction",value:function(e){var t=this;e.preventDefault();var a={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(Object(W.a)({},this.state))};fetch("/api/auth/register",a).then(function(e){return e.json()},function(e){return e}).then(function(e){e.success?(alert(e.message),t.setState({redirect:!0})):alert("Register failed")})}},{key:"handleUserNameChange",value:function(e){this.setState({username:e.target.value})}},{key:"handleLastNameChange",value:function(e){this.setState({lastname:e.target.value})}},{key:"handleEmailChange",value:function(e){this.setState({email:e.target.value})}},{key:"handlePasswordChange",value:function(e){this.setState({password:e.target.value})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"register-container"},!this.state.redirect&&s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",{className:"main-panel dark"},s.a.createElement("div",{className:"content dark"},s.a.createElement(c.Fragment,null,s.a.createElement("div",{className:"registerpage"},s.a.createElement("section",{className:"login-block"},s.a.createElement("div",{className:"auth-wrapper"},s.a.createElement("div",{className:""},s.a.createElement("div",{className:"form"},s.a.createElement("ul",{className:"tab-group"},s.a.createElement("li",{className:"tab "},s.a.createElement(ie.a,{to:"/signin"},"Log In")),s.a.createElement("li",{className:"tab active"},s.a.createElement(ie.a,{to:"/signup"},"Sign Up"))),s.a.createElement("form",{onSubmit:function(t){e.onRegisterAction(t)}},s.a.createElement("div",{id:"signup"},s.a.createElement("h2",{className:"text-center"},"Sign up now"),s.a.createElement("div",{className:"top-row"},s.a.createElement("div",{className:"field-wrap"},s.a.createElement("input",{placeholder:"First Name",type:"text",name:"username",required:!0,onChange:this.handleUserNameChange,autoComplete:"off"})),s.a.createElement("div",{className:"field-wrap"},s.a.createElement("input",{type:"text",placeholder:"Last Name",required:!0,name:"lastname",onChange:this.handleLastNameChange,autoComplete:"off"}))),s.a.createElement("div",{className:"field-wrap"},s.a.createElement("input",{type:"email",placeholder:"Email Address",required:!0,name:"email",onChange:this.handleEmailChange,autoComplete:"off"})),s.a.createElement("div",{className:"field-wrap"},s.a.createElement("input",{type:"password",placeholder:"Set A Password",required:!0,name:"password",onChange:this.handlePasswordChange,autoComplete:"off"})),s.a.createElement("button",{type:"submit",className:"button button-block"},"Create Account"))),s.a.createElement("p",null,"Have already an account ?"," ",s.a.createElement(ie.a,{to:"/signin"},s.a.createElement("strong",null,"Login Here")))))))))))),this.state.redirect&&s.a.createElement(le.a,{to:"/signin"}))}}]),t}(c.Component),he=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={login:!0,register:!1},a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"tab"},s.a.createElement("div",{className:"tab_container"},s.a.createElement(Ee,null)),s.a.createElement("div",null,s.a.createElement(ie.a,{to:"/app"},"Slack")))}}]),t}(c.Component),pe=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={},a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"profile"},s.a.createElement("div",{className:"wrap"},s.a.createElement("h2",null,"CHAT")))}}]),t}(c.Component),be=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={},a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",{id:"contacts",className:"chat-users"},s.a.createElement("h4",null,"Direct Message"),s.a.createElement("div",{className:"users-list"},s.a.createElement("div",{className:"chat-user"},s.a.createElement("div",{className:"chat-user-name"},s.a.createElement(ie.a,{to:"/app/user/1"},"Karl Jordan"))),s.a.createElement("div",{className:"chat-user"},s.a.createElement("div",{className:"chat-user-name"},s.a.createElement(ie.a,{to:"/app/user/1"},"Monica Smith"))))))}}]),t}(c.Component),ge=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={},a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",{id:"contacts",className:"chat-channel"},s.a.createElement("h4",null,"Channels"),s.a.createElement("div",{className:"channel-list"},s.a.createElement("div",{className:"chat-channel-item"},s.a.createElement("div",{className:"chat-channel-name"},s.a.createElement(ie.a,{to:"/app/channel/1"},"Channel 1"))),s.a.createElement("div",{className:"chat-channel-item"},s.a.createElement("div",{className:"chat-channel-name"},s.a.createElement(ie.a,{to:"/app/channel/2"},"Channel 1"))))))}}]),t}(c.Component),fe=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={},a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",{id:"bottom-bar"},s.a.createElement("button",{id:"addcontact"},s.a.createElement("i",{className:"fa fa-user-plus fa-fw","aria-hidden":"true"})," ",s.a.createElement("span",null,"Add contact")),s.a.createElement("button",{id:"settings"},s.a.createElement("i",{className:"fa fa-cog fa-fw","aria-hidden":"true"})," ",s.a.createElement("span",null,"Settings"))))}}]),t}(c.Component),Oe=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={},a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement(pe,null),s.a.createElement(ge,null),s.a.createElement(be,null),s.a.createElement(fe,null))}}]),t}(c.Component),ve=a(39),Ne=a(37),je=a.n(Ne),ye=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={},a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",{className:"contact-profile"},s.a.createElement("img",{src:"http://emilcarlsson.se/assets/harveyspecter.png",alt:""}),s.a.createElement("p",null,"Harvey Specter")))}}]),t}(c.Component),Ce=function(e){function t(e){return Object(Z.a)(this,t),Object(ee.a)(this,Object(te.a)(t).call(this,e))}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-header"},s.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"}),s.a.createElement("strong",null," \xa0 Github Assistance ")),s.a.createElement("div",{className:"card-body"},s.a.createElement("div",{className:"bd-callout bd-callout-warning"},s.a.createElement("span",null,"Close an issue:"),s.a.createElement("br",null),s.a.createElement("span",{className:"alert alert-secondary",role:"alert"},"/github close [issue link]")),s.a.createElement("div",{className:"bd-callout bd-callout-warning"},s.a.createElement("span",null,"Connect your GitHub account:"),s.a.createElement("br",null),s.a.createElement("span",{className:"alert alert-secondary",role:"alert"},"/github signin")),s.a.createElement("div",{className:"bd-callout bd-callout-warning"},s.a.createElement("span",null,"Show this help message:"),s.a.createElement("br",null),s.a.createElement("span",{className:"alert alert-secondary",role:"alert"},"/github help")),s.a.createElement("div",{className:"bd-callout bd-callout-warning"},s.a.createElement("span",null,"Create a new issue:"),s.a.createElement("br",null),s.a.createElement("span",{className:"alert alert-secondary",role:"alert"},"/github open owner/repository")))))}}]),t}(c.Component),Se=function(e){function t(e){return Object(Z.a)(this,t),Object(ee.a)(this,Object(te.a)(t).call(this,e))}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-header"},s.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"}),s.a.createElement("strong",null," \xa0 Github login ")),s.a.createElement("div",{className:"card-body"},s.a.createElement("div",{className:"bd-callout bd-callout-warning"},s.a.createElement("span",null,"Finish connecting your GitHub account:"),s.a.createElement("br",null),s.a.createElement("a",{href:"/api/auth/login/github",className:"btn btn-sm btn-secondary"},"Connect Github Account")))))}}]),t}(c.Component),_e=function(e){function t(e){return Object(Z.a)(this,t),Object(ee.a)(this,Object(te.a)(t).call(this,e))}return Object(ae.a)(t,e),Object($.a)(t,[{key:"renderBotMessage",value:function(e){var t;switch(e){case"help":t=s.a.createElement(Ce,null);break;case"signin":t=s.a.createElement(Se,null);break;default:t=s.a.createElement(Ce,null)}return t}},{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",null,this.renderBotMessage(this.props.subtype)))}}]),t}(c.Component),we=function(e){function t(e){return Object(Z.a)(this,t),Object(ee.a)(this,Object(te.a)(t).call(this,e))}return Object(ae.a)(t,e),Object($.a)(t,[{key:"renderReceiverOrSenderTemplate",value:function(){return"send"===this.props.type?s.a.createElement("div",{className:"row msg_container base_sent"},s.a.createElement("div",{className:"col-md-10 col-xs-10"},s.a.createElement("div",{className:"messages msg_sent"},s.a.createElement("p",null,this.props.item.message)))):s.a.createElement("div",{className:"row msg_container base_receive"},s.a.createElement("div",{className:"col-md-10 col-xs-10"},s.a.createElement("div",{className:"messages msg_receive"},s.a.createElement("p",null,this.props.item.message))))}},{key:"render",value:function(){return s.a.createElement("div",{className:"msg_container_base"},this.renderReceiverOrSenderTemplate())}}]),t}(c.Component),ke=function(e){function t(e){return Object(Z.a)(this,t),Object(ee.a)(this,Object(te.a)(t).call(this,e))}return Object(ae.a)(t,e),Object($.a)(t,[{key:"renderchatTemplate",value:function(){return this.props.messgae.map(function(e,t){return s.a.createElement("div",{key:t},"chat"===e.type?s.a.createElement(we,{item:e,type:"send"}):"github"===e.type?s.a.createElement(_e,{subtype:e.subtype}):void 0)})}},{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",{className:"messages-container"},s.a.createElement("div",{className:"msg_container_base"},this.renderchatTemplate())))}}]),t}(c.Component),Le=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={message:""},a.messageAreaContoller=a.messageAreaContoller.bind(Object(se.a)(a)),a.sendMessage=a.sendMessage.bind(Object(se.a)(a)),a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"messageAreaContoller",value:function(e){this.setState({message:e.target.value})}},{key:"sendMessage",value:function(e){(e.preventDefault(),""!==this.state.message)&&(this.flterGitbotCommands(this.state.message)?this.triggerActions(this.state.message):this.props.postMessage({type:"chat",message:this.state.message,name:"Anurag"}))}},{key:"triggerActions",value:function(e){switch(e.trim()){case"/github signin":this.props.postMessage({type:"github",subtype:"signin"});break;case"/github help":this.props.postMessage({type:"github",subtype:"help"});break;case"/github open":this.props.showOverlay({type:"github",repo:"https://github.com/anuraggautam77/slack-demo"});break;default:console.log("actions mismatch")}}},{key:"flterGitbotCommands",value:function(e){return"/"===e[0]}},{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement("div",{className:"message-input"},s.a.createElement("form",{onSubmit:this.sendMessage},s.a.createElement("div",{className:"wrap"},s.a.createElement("input",{type:"text",placeholder:"Write your message...",onChange:this.messageAreaContoller}),s.a.createElement("button",{className:"submit",type:"submit"},s.a.createElement("i",{className:"fa fa-paper-plane","aria-hidden":"true"}))))))}}]),t}(c.Component),Te=a(22),Ae={title:"",body:""},Ie=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state=Object(W.a)({},Ae),a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"handleChange",value:function(e){var t=e.target.name,a=e.target.value;this.setState(Object(Te.a)({},t,a))}},{key:"clearState",value:function(){this.setState(Object(W.a)({},Ae))}},{key:"createIssueHandler",value:function(){}},{key:"render",value:function(){var e=this,t=this.state,a=t.title,n=t.body;return s.a.createElement(c.Fragment,null,s.a.createElement("form",{onSubmit:this.createIssueHandler},s.a.createElement("div",{className:"card",style:{width:"100%"}},s.a.createElement("div",{className:"card-header"},s.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"}),s.a.createElement("strong",null," \xa0 Open a New Issue ")),s.a.createElement("div",{className:"card-body"},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Repository"),s.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",value:"https://github.com/anuraggautam77/slack-demo",readOnly:!0})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Title"),s.a.createElement("input",{type:"text",className:"form-control",name:"title",value:a,placeholder:"Title of issue"})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Body"),s.a.createElement("textarea",{className:"form-control",name:"body",value:n,placeholder:"Leave a comment"})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Label(Optional)"),s.a.createElement("select",{className:"form-control"},s.a.createElement("option",null,"1"),s.a.createElement("option",null,"2"),s.a.createElement("option",null,"3"),s.a.createElement("option",null,"4"),s.a.createElement("option",null,"5"))),s.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Open"),"\xa0",s.a.createElement("button",{type:"button",onClick:function(){e.props.closewindow()},className:"btn btn-default"},"Cancel")))))}}]),t}(c.Component),Ge={content:{top:"5%",left:"25%",right:"auto",bottom:"auto",width:"50%",zIndex:1e4}};var Re=function(e){function t(e){var a;return Object(Z.a)(this,t),(a=Object(ee.a)(this,Object(te.a)(t).call(this,e))).state={modalIsOpen:!1,chats:[]},a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"openModal",value:function(){this.setState({modalIsOpen:!0})}},{key:"afterOpenModal",value:function(){}},{key:"closeModal",value:function(){this.setState({modalIsOpen:!1})}},{key:"addMessageHandler",value:function(e){this.setState({chats:[].concat(Object(ve.a)(this.state.chats),[e])})}},{key:"showIssueOverlay",value:function(e){this.setState({modalIsOpen:!0})}},{key:"render",value:function(){var e=this;return s.a.createElement(c.Fragment,null,s.a.createElement(ye,null),s.a.createElement(je.a,{isOpen:this.state.modalIsOpen,style:Ge},s.a.createElement(Ie,{closewindow:function(){e.closeModal()},saveClick:function(e){console.log(e)}})),s.a.createElement(ke,{messgae:this.state.chats}),s.a.createElement(Le,{postMessage:function(t){e.addMessageHandler(t)},showOverlay:function(t){e.showIssueOverlay(t)}}))}}]),t}(c.Component),xe=function(e){function t(){return Object(Z.a)(this,t),Object(ee.a)(this,Object(te.a)(t).apply(this,arguments))}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"frame"},s.a.createElement("div",{id:"sidepanel"},s.a.createElement(Oe,null)),s.a.createElement("div",{className:"content"},s.a.createElement(Re,null)))}}]),t}(c.Component);a(62),a(63);var Ue=function(e){function t(e){var a;return Object(Z.a)(this,t),a=Object(ee.a)(this,Object(te.a)(t).call(this,e)),t.isLoggedIn=function(e){for(var t=e+"=",a=decodeURIComponent(document.cookie).split(";"),n=0;n<a.length;n++){for(var r=a[n];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""}("username").length>0,a}return Object(ae.a)(t,e),Object($.a)(t,[{key:"render",value:function(){return s.a.createElement(c.Fragment,null,s.a.createElement(ne.a,null,s.a.createElement(c.Fragment,null,s.a.createElement(re.a,{exact:!0,path:"/",component:de}),s.a.createElement(re.a,{path:"/app/channel/:id",component:xe}),s.a.createElement(re.a,{path:"/app/user/:id",component:xe}),s.a.createElement(re.a,{exact:!0,path:"/signin",component:de}),s.a.createElement(re.a,{exact:!0,path:"/signup",component:he}),t.isLoggedIn&&s.a.createElement(ce.a,{to:{pathname:"/app/channel/general"}}))))}}]),t}(c.Component);Ue.isLoggedIn=void 0;var De=Ue;i.a.render(s.a.createElement(o.a,{store:Y},s.a.createElement(De,null)),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.ba83caa2.chunk.js.map