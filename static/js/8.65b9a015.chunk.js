(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[8],{401:function(e,c,t){"use strict";var s=t(394),r=(t(0),t(7));c.a=e=>Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(s.a,{...e,children:e=>Object(r.jsx)("div",{style:{color:"red"},children:e})})})},560:function(e,c,t){"use strict";t.d(c,"a",(function(){return s}));const s=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M384,200V144a128,128,0,0,0-256,0v56H88V328c0,92.635,75.364,168,168,168s168-75.365,168-168V200ZM160,144a96,96,0,0,1,192,0v56H160ZM392,328c0,74.99-61.01,136-136,136s-136-61.01-136-136V232H392Z' class='ci-primary'/>"]},571:function(e,c,t){"use strict";t.r(c);var s=t(0),r=t(18),n=t(64),a=t(389),l=t(554),i=t(560),o=t(55),j=(t(401),t(7));c.default=()=>{const[e,c]=Object(s.useState)(""),[t,d]=Object(s.useState)(""),[b,h]=Object(s.useState)(""),u=Object(r.useHistory)(),x=Object(r.useLocation)();return Object(j.jsx)("div",{className:"bg-light min-vh-100 d-flex flex-row align-items-center",children:Object(j.jsx)(n.j,{children:Object(j.jsx)(n.F,{className:"justify-content-center",children:Object(j.jsx)(n.i,{md:4,children:Object(j.jsx)(n.h,{children:Object(j.jsx)(n.f,{className:"p-4",children:Object(j.jsx)(n.g,{children:Object(j.jsxs)(n.q,{onSubmit:c=>{console.log("on submit called"),h(""),o.a.authenticate(e,t).then((e=>{console.log("successfully logged in"),console.log(e),console.log("token is "+e.data.token),u.push("/dashboard"),x.reload()})).catch((e=>{console.log(e),h("Unable to login")}))},children:[Object(j.jsx)("h1",{children:"Login"}),Object(j.jsx)("p",{className:"text-medium-emphasis",children:"Sign In to your account"}),Object(j.jsxs)(n.y,{className:"mb-3",children:[Object(j.jsx)(n.z,{children:Object(j.jsx)(a.a,{icon:l.a})}),Object(j.jsx)(n.r,{placeholder:"Username",autoComplete:"username",onChange:e=>c(e.target.value)})]}),Object(j.jsxs)(n.y,{className:"mb-4",children:[Object(j.jsx)(n.z,{children:Object(j.jsx)(a.a,{icon:i.a})}),Object(j.jsx)(n.r,{type:"password",placeholder:"Password",autoComplete:"current-password",onChange:e=>d(e.target.value)})]}),Object(j.jsx)(n.F,{children:Object(j.jsx)(n.i,{xs:6,children:Object(j.jsx)(n.d,{color:"primary",type:"submit",className:"px-4",children:"Login"})})}),b&&Object(j.jsx)(n.F,{children:Object(j.jsx)(n.i,{children:Object(j.jsx)("p",{style:{color:"red"},children:b})})})]})})})})})})})})}}}]);
//# sourceMappingURL=8.65b9a015.chunk.js.map