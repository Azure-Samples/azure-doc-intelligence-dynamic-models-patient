"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[52],{4137:(e,t,o)=>{o.d(t,{Zo:()=>l,kt:()=>h});var r=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var p=r.createContext({}),c=function(e){var t=r.useContext(p),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},l=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=c(o),m=n,h=u["".concat(p,".").concat(m)]||u[m]||d[m]||a;return o?r.createElement(h,s(s({ref:t},l),{},{components:o})):r.createElement(h,s({ref:t},l))}));function h(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,s=new Array(a);s[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:n,s[1]=i;for(var c=2;c<a;c++)s[c]=o[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,o)}m.displayName="MDXCreateElement"},8642:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var r=o(7462),n=(o(7294),o(4137));const a={pagination_prev:"install-prerequisites",pagination_next:"create-azure-services"},s="Load the workshop",i={unversionedId:"install-prerequisites/codespaces",id:"install-prerequisites/codespaces",title:"Load the workshop",description:"We're going to load the workshop using GitHub Codespaces. GitHub Codespaces is a cloud-based development environment that allows you to code from anywhere. Follow these steps to create a codespace.",source:"@site/docs/17-install-prerequisites/05-codespaces.md",sourceDirName:"17-install-prerequisites",slug:"/install-prerequisites/codespaces",permalink:"/Contoso-New-Patient-App/install-prerequisites/codespaces",draft:!1,editUrl:"https://github.com/Contoso-New-Patient-App/tree/main/docs/docs/17-install-prerequisites/05-codespaces.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{pagination_prev:"install-prerequisites",pagination_next:"create-azure-services"},sidebar:"tutorialSidebar",previous:{title:"Install prerequisites",permalink:"/Contoso-New-Patient-App/install-prerequisites"},next:{title:"Create Azure services",permalink:"/Contoso-New-Patient-App/create-azure-services"}},p={},c=[],l={toc:c},u="wrapper";function d(e){let{components:t,...o}=e;return(0,n.kt)(u,(0,r.Z)({},l,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"load-the-workshop"},"Load the workshop"),(0,n.kt)("p",null,"We're going to load the workshop using GitHub Codespaces. GitHub Codespaces is a cloud-based development environment that allows you to code from anywhere. Follow these steps to create a codespace."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Navigate to the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/newpatiente2e/Contoso-New-Patient-App"},"Contoso New Patient App")," repo and click the ",(0,n.kt)("strong",{parentName:"p"},"Code")," button, then select ",(0,n.kt)("strong",{parentName:"p"},"Codespaces"),".")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"If prompted, select the smallest size VM to use for the codespace. As at Feburary 2023, this will be 2 vCPUs and 4GB of RAM.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Select the ",(0,n.kt)("strong",{parentName:"p"},"+")," button to create a new codespace. It will take a few minutes to create the codespace."),(0,n.kt)("admonition",{parentName:"li",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Note, if you already have an active codespace running for the repo, you can select it from the list of active codespaces.")),(0,n.kt)("admonition",{parentName:"li",type:"warning"},(0,n.kt)("p",{parentName:"admonition"},"As at Feburary 2023, GitHub personal accounts have up to 120 core hours per month of free codespaces usage. When you have completed the workshop, be sure to stop the current codespace to preserve your usage."),(0,n.kt)("p",{parentName:"admonition"},'A "core hour" is a measure used for included compute usage. On a 2-core machine, you would get 60 hours free. On a 4-core machine, you would get 30 hours free, etc. ',(0,n.kt)("a",{parentName:"p",href:"https://docs.github.com/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces"},"Learn more")," "),(0,n.kt)("p",{parentName:"admonition"},"To stop a codespace, from VS Code in your web browser, select ",(0,n.kt)("kbd",null,"F1")," to open the command palette, then type and select ",(0,n.kt)("strong",{parentName:"p"},"Codespaces: Stop Codespace"),".")))),(0,n.kt)("p",null,"Congratulations! You've created a codespace. Now you can now continue with the next section of the workshop."))}d.isMDXComponent=!0}}]);