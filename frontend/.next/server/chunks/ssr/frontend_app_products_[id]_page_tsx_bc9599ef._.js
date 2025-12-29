module.exports=[70796,a=>{"use strict";let b,c;var d,e=a.i(57850),f=a.i(45056),g=a.i(50813),h=a.i(15528),i=a.i(70579),j=a.i(59843),k=a.i(93609);let l={data:""},m=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,p=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?p(g,f):f+"{"+p(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=p(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=p.p?p.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},q={},r=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+r(a[c]);return b}return a};function s(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let g=r(a),h=q[g]||(q[g]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(g));if(!q[h]){let b=g!==a?a:(a=>{let b,c,d=[{}];for(;b=m.exec(a.replace(n,""));)b[4]?d.shift():b[3]?(c=b[3].replace(o," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(o," ").trim();return d[0]})(a);q[h]=p(e?{["@keyframes "+h]:b}:b,c?"":"."+h)}let i=c&&q.g?q.g:null;return c&&(q.g=q[h]),f=q[h],i?b.data=b.data.replace(i,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),h})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":p(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||l,d.g,d.o,d.k)}s.bind({g:1});let t,u,v,w=s.bind({k:1});function x(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:u&&u()},h),c.o=/ *go\d+/.test(i),h.className=s.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),v&&j[0]&&v(h),t(j,h)}return b?b(e):e}}var y=(a,b)=>"function"==typeof a?a(b):a,z=(b=0,()=>(++b).toString()),A="default",B=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return B(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},C=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},E={},F=(a,b=A)=>{E[b]=B(E[b]||D,a),C.forEach(([a,c])=>{a===b&&c(E[b])})},G=a=>Object.keys(E).forEach(b=>F(a,b)),H=(a=A)=>b=>{F(b,a)},I=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||z()}))(b,a,c);return H(e.toasterId||(d=e.id,Object.keys(E).find(a=>E[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},J=(a,b)=>I("blank")(a,b);J.error=I("error"),J.success=I("success"),J.loading=I("loading"),J.custom=I("custom"),J.dismiss=(a,b)=>{let c={type:3,toastId:a};b?H(b)(c):G(c)},J.dismissAll=a=>J.dismiss(void 0,a),J.remove=(a,b)=>{let c={type:4,toastId:a};b?H(b)(c):G(c)},J.removeAll=a=>J.remove(void 0,a),J.promise=(a,b,c)=>{let d=J.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?y(b.success,a):void 0;return e?J.success(e,{id:d,...c,...null==c?void 0:c.success}):J.dismiss(d),a}).catch(a=>{let e=b.error?y(b.error,a):void 0;e?J.error(e,{id:d,...c,...null==c?void 0:c.error}):J.dismiss(d)}),a};var K=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,M=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,N=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,O=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${O} 1s linear infinite;
`,Q=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,S=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${R} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,T=x("div")`
  position: absolute;
`,U=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:a})=>{let{icon:b,type:c,iconTheme:d}=a;return void 0!==b?"string"==typeof b?f.createElement(W,null,b):b:"blank"===c?null:f.createElement(U,null,f.createElement(P,{...d}),"loading"!==c&&f.createElement(T,null,"error"===c?f.createElement(N,{...d}):f.createElement(S,{...d})))},Y=x("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Z=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;f.memo(({toast:a,position:b,style:d,children:e})=>{let g=a.height?((a,b)=>{let d=a.includes("top")?1:-1,[e,f]=c?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*d}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*d}%,-1px) scale(.6); opacity:0;}
`];return{animation:b?`${w(e)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(f)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(a.position||b||"top-center",a.visible):{opacity:0},h=f.createElement(X,{toast:a}),i=f.createElement(Z,{...a.ariaProps},y(a.message,a));return f.createElement(Y,{className:a.className,style:{...g,...d,...a.style}},"function"==typeof e?e({icon:h,message:i}):f.createElement(f.Fragment,null,h,i))}),d=f.createElement,p.p=void 0,t=d,u=void 0,v=void 0,s`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var $=a.i(16497),_=a.i(71502),aa=a.i(85797),ab=a.i(26177),ac=a.i(81353),ad=a.i(59398),ae=a.i(59996),af=a.i(58317),ag=a.i(99486),ah=a.i(31261);let ai=(0,ah.default)("share-2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);var aj=a.i(36714),ak=a.i(73092),al=a.i(88450);let am=(0,ah.default)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]),an=(0,ah.default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);var ao=a.i(62922),ap=a.i(59009);let aq=()=>(0,e.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t-2 border-gray-200 dark:border-gray-700",children:[(0,e.jsxs)(g.motion.div,{whileHover:{scale:1.1},className:"text-center",children:[(0,e.jsx)(aj.Truck,{className:"w-16 h-16 mx-auto text-green-600 mb-3"}),(0,e.jsx)("p",{className:"font-bold text-lg",children:"ফ্রি ডেলিভারি"}),(0,e.jsx)("p",{className:"text-sm text-gray-600",children:"৫০০৳+ অর্ডারে"})]}),(0,e.jsxs)(g.motion.div,{whileHover:{scale:1.1},className:"text-center",children:[(0,e.jsx)(al.RotateCcw,{className:"w-16 h-16 mx-auto text-blue-600 mb-3"}),(0,e.jsx)("p",{className:"font-bold text-lg",children:"৭ দিন রিটার্ন"}),(0,e.jsx)("p",{className:"text-sm text-gray-600",children:"সম্পূর্ণ ফ্রি"})]}),(0,e.jsxs)(g.motion.div,{whileHover:{scale:1.1},className:"text-center",children:[(0,e.jsx)(ak.Shield,{className:"w-16 h-16 mx-auto text-purple-600 mb-3"}),(0,e.jsx)("p",{className:"font-bold text-lg",children:"১০০% অরিজিনাল"}),(0,e.jsx)("p",{className:"text-sm text-gray-600",children:"গ্যারান্টি সহ"})]})]});function ar({params:a}){let{id:b}=(0,f.use)(a),c=(0,k.useRouter)(),[d,l]=(0,f.useState)(null),[m,n]=(0,f.useState)(!0),[o,p]=(0,f.useState)(1),[q,r]=(0,f.useState)(0),[s,t]=(0,f.useState)(!1),[u,v]=(0,f.useState)(!1),[w,x]=(0,f.useState)(!1),[y,z]=(0,f.useState)(null),[A,B]=(0,f.useState)([]),[C,D]=(0,f.useState)(!1),[E,F]=(0,f.useState)(0),[G,H]=(0,f.useState)(""),[I,K]=(0,f.useState)(!1),{addItem:L}=(0,_.default)(),{userInfo:M}=(0,aa.default)();(0,f.useEffect)(()=>{let a=!0;return(async()=>{try{let c=await $.productApi.getById(b);if(!a)return;if(!c)return void z("প্রোডাক্ট পাওয়া যায়নি।");l(c),z(null),D(!0);let d=await $.productApi.getReviews(b);if(!a)return;B(d);let e=M?._id?d.find(a=>String(a.user)===String(M._id)):void 0;F(e?.rating??0),H(e?.comment??"")}catch(b){if(console.error(b),!a)return;z("প্রোডাক্ট লোড করতে সমস্যা হয়েছে।")}finally{if(!a)return;D(!1),n(!1)}})(),()=>{a=!1}},[b,M?._id]);let N=async()=>{if(!M)return void c.push(`/login?redirect=/products/${b}`);let a=Number(E),d=String(G||"").trim();if(!Number.isFinite(a)||a<1||a>5)return void J.error("রেটিং ১ থেকে ৫ এর মধ্যে দিন");if(!d)return void J.error("কমেন্ট লিখুন");if(d.length>1e3)return void J.error("কমেন্ট ১০০০ অক্ষরের মধ্যে লিখুন");K(!0);try{let c=await $.productApi.upsertReview(b,{rating:a,comment:d});l(c),B(c.reviewsList||[]),J.success("রিভিউ সেভ হয়েছে!")}catch(a){if(console.error(a),a instanceof $.ApiClientError){if("UNAUTHORIZED"===a.code)return void c.push(`/login?redirect=/products/${b}`);J.error(a.message||"রিভিউ সাবমিট করা যায়নি");return}J.error("রিভিউ সাবমিট করা যায়নি")}finally{K(!1)}},O=a=>{let b=window.location.href;if(!d)return;let c=`${d.name} - ShopKoro`;"copy"===a?(navigator.clipboard.writeText(b),J.success("লিংক কপি হয়েছে!")):"fb"===a?window.open(`https://www.facebook.com/sharer/sharer.php?u=${b}`):"twitter"===a&&window.open(`https://twitter.com/intent/tweet?url=${b}&text=${c}`),x(!1)};return m?(0,e.jsx)(ab.default,{label:"লোড হচ্ছে...",variant:"gradient"}):d?(0,e.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 pt-20 px-4 pb-20",children:(0,e.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,e.jsxs)(j.default,{href:"/products",className:"inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 transition",children:[(0,e.jsx)(am,{size:20}),"পিছনে যান"]}),(0,e.jsxs)("div",{className:"grid lg:grid-cols-2 gap-10 lg:gap-16",children:[(0,e.jsxs)("div",{className:"space-y-6",children:[(0,e.jsxs)(g.motion.div,{layoutId:`img-${d._id}`,className:"relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-xl",children:[(0,e.jsx)(i.default,{src:d.images?.[q]||d.image,alt:d.name,fill:!0,priority:!0,className:"object-cover"}),d.isFlashSale&&(0,e.jsx)("div",{className:"absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full font-bold animate-pulse",children:"Flash Sale"})]}),d.images&&d.images.length>1&&(0,e.jsx)("div",{className:"grid grid-cols-4 gap-4",children:d.images.map((a,b)=>(0,e.jsx)(g.motion.button,{whileHover:{scale:1.05},onClick:()=>r(b),className:`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${q===b?"border-purple-600 shadow-2xl shadow-purple-500/40":"border-transparent hover:border-purple-300"}`,children:(0,e.jsx)(i.default,{src:a,alt:"",fill:!0,className:"object-cover"})},b))})]}),(0,e.jsxs)(g.motion.div,{initial:{opacity:0,x:60},animate:{opacity:1,x:0},className:"space-y-8",children:[(0,e.jsxs)("div",{children:[(0,e.jsx)("h1",{className:"text-4xl md:text-5xl font-black text-gray-800 dark:text-white mb-4",children:d.name}),(0,e.jsxs)("div",{className:"flex items-center gap-4 mb-6",children:[(0,e.jsx)("div",{className:"flex gap-1",children:[void 0,void 0,void 0,void 0,void 0].map((a,b)=>(0,e.jsx)(ag.Star,{size:28,className:b<Math.floor(d.rating||0)?"fill-yellow-500 text-yellow-500":"text-gray-300"},b))}),(0,e.jsxs)("span",{className:"text-lg font-bold text-gray-600 dark:text-gray-400",children:["(",d.reviews||0," reviews)"]})]}),(0,e.jsxs)("div",{className:"flex items-end gap-5 mb-8",children:[(0,e.jsxs)("span",{className:"text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600",children:["৳",d.price.toLocaleString("bn-BD")]}),d.originalPrice&&d.originalPrice>d.price&&(0,e.jsxs)("div",{children:[(0,e.jsxs)("span",{className:"text-2xl text-gray-500 line-through",children:["৳",d.originalPrice.toLocaleString("bn-BD")]}),(0,e.jsxs)("span",{className:"ml-3 text-xl font-bold text-green-600",children:["-",Math.round((d.originalPrice-d.price)/d.originalPrice*100),"%"]})]})]})]}),(0,e.jsx)("p",{className:"text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6",children:d.description||"এই প্রোডাক্টটি সেরা কোয়ালিটির।"}),(0,e.jsxs)("div",{className:"flex flex-col sm:flex-row items-stretch sm:items-center gap-6 py-8",children:[(0,e.jsxs)("div",{className:"flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4",children:[(0,e.jsx)("button",{onClick:()=>p(Math.max(1,o-1)),className:"w-14 h-14 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 flex-center transition",children:(0,e.jsx)(af.Minus,{size:22})}),(0,e.jsx)("span",{className:"mx-10 text-3xl font-black w-16 text-center",children:o}),(0,e.jsx)("button",{onClick:()=>p(o+1),className:"w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg flex-center",children:(0,e.jsx)(ae.Plus,{size:22})})]}),(0,e.jsx)(g.motion.button,{whileHover:{scale:1.04},whileTap:{scale:.96},onClick:()=>{d&&(t(!0),L({productId:d._id||d.name,name:d.name,price:d.price??0,image:d.images?.[0]||d.image,quantity:o}),J.success("কার্টে যোগ হয়েছে!"),setTimeout(()=>t(!1),1200))},disabled:s,className:"flex-1 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-xl rounded-2xl shadow-2xl flex-center gap-4 disabled:opacity-70 transition-all",children:s?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(g.motion.div,{animate:{rotate:360},transition:{duration:1,repeat:1/0},className:"w-8 h-8 border-4 border-white/30 border-t-white rounded-full"}),"যোগ হচ্ছে..."]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(ac.ShoppingCart,{size:30}),"কার্টে যোগ করুন"]})}),(0,e.jsxs)("div",{className:"flex gap-3",children:[(0,e.jsx)("button",{onClick:()=>v(!u),className:"p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition",children:(0,e.jsx)(ad.Heart,{size:28,className:u?"fill-red-600 text-red-600":"text-gray-600"})}),(0,e.jsxs)("div",{className:"relative",children:[(0,e.jsx)("button",{onClick:()=>x(!w),className:"p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition",children:(0,e.jsx)(ai,{size:28,className:"text-gray-700 dark:text-gray-300"})}),(0,e.jsx)(h.AnimatePresence,{children:w&&(0,e.jsxs)(g.motion.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},className:"absolute right-0 top-16 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-3 border border-gray-200 dark:border-gray-700",children:[(0,e.jsxs)("button",{onClick:()=>O("copy"),className:"w-full text-left px-4 py-3 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex items-center gap-3",children:[(0,e.jsx)(an,{size:18})," লিংক কপি"]}),(0,e.jsxs)("button",{onClick:()=>O("fb"),className:"w-full text-left px-4 py-3 hover:bg-purple-100 flex items-center gap-3",children:[(0,e.jsx)(ao.Facebook,{size:18})," Facebook"]}),(0,e.jsxs)("button",{onClick:()=>O("twitter"),className:"w-full text-left px-4 py-3 hover:bg-purple-100 flex items-center gap-3",children:[(0,e.jsx)(ap.Twitter,{size:18})," Twitter"]})]})})]})]})]}),(0,e.jsx)(aq,{})]})]}),(0,e.jsx)("div",{className:"mt-16",children:(0,e.jsxs)("div",{className:"bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-6 md:p-10",children:[(0,e.jsxs)("div",{className:"flex items-center justify-between gap-6 flex-wrap mb-8",children:[(0,e.jsxs)("div",{children:[(0,e.jsx)("h2",{className:"text-2xl md:text-3xl font-black text-gray-800 dark:text-white",children:"রিভিউ"}),(0,e.jsxs)("p",{className:"text-gray-600 dark:text-gray-400 mt-2",children:["মোট ",d.reviews||0," টি রিভিউ"]})]}),(0,e.jsxs)("div",{className:"flex items-center gap-2",children:[(0,e.jsx)("div",{className:"flex gap-1",children:[void 0,void 0,void 0,void 0,void 0].map((a,b)=>(0,e.jsx)(ag.Star,{size:18,className:b<Math.floor(d.rating||0)?"fill-yellow-500 text-yellow-500":"text-gray-300"},b))}),(0,e.jsx)("span",{className:"font-bold text-gray-700 dark:text-gray-300",children:(d.rating||0).toFixed(1)})]})]}),(0,e.jsxs)("div",{className:"grid lg:grid-cols-2 gap-10",children:[(0,e.jsx)("div",{className:"space-y-5",children:C?(0,e.jsx)("div",{className:"text-gray-600 dark:text-gray-400",children:"লোড হচ্ছে..."}):0===A.length?(0,e.jsx)("div",{className:"text-gray-600 dark:text-gray-400",children:"এখনো কোনো রিভিউ নেই।"}):A.slice().sort((a,b)=>new Date(b.createdAt||0).getTime()-new Date(a.createdAt||0).getTime()).map((a,b)=>(0,e.jsxs)("div",{className:"bg-white/70 dark:bg-gray-800/70 rounded-2xl border border-gray-200 dark:border-gray-700 p-5",children:[(0,e.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{className:"font-bold text-gray-800 dark:text-white",children:a.name}),(0,e.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:a.createdAt?new Date(a.createdAt).toLocaleDateString("bn-BD"):""})]}),(0,e.jsx)("div",{className:"flex gap-1",children:[void 0,void 0,void 0,void 0,void 0].map((b,c)=>(0,e.jsx)(ag.Star,{size:16,className:c<Math.floor(a.rating||0)?"fill-yellow-500 text-yellow-500":"text-gray-300"},c))})]}),(0,e.jsx)("p",{className:"text-gray-700 dark:text-gray-300 mt-4 whitespace-pre-line",children:a.comment})]},`${a.user}-${b}`))}),(0,e.jsxs)("div",{className:"bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 dark:from-gray-900 dark:via-purple-950/40 dark:to-pink-950/30 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 md:p-8",children:[(0,e.jsx)("h3",{className:"text-xl font-black text-gray-800 dark:text-white mb-4",children:"আপনার রিভিউ লিখুন"}),M?(0,e.jsxs)("div",{className:"space-y-5",children:[(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{className:"text-sm font-bold text-gray-700 dark:text-gray-300 mb-2",children:"রেটিং"}),(0,e.jsx)("div",{className:"flex gap-2",children:[1,2,3,4,5].map(a=>(0,e.jsx)("button",{type:"button",onClick:()=>F(a),className:"p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700","aria-label":`Rate ${a}`,children:(0,e.jsx)(ag.Star,{size:22,className:a<=E?"fill-yellow-500 text-yellow-500":"text-gray-300"})},a))})]}),(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{className:"text-sm font-bold text-gray-700 dark:text-gray-300 mb-2",children:"কমেন্ট"}),(0,e.jsx)("textarea",{value:G,onChange:a=>H(a.target.value),rows:5,className:"w-full px-4 py-4 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30",placeholder:"আপনার অভিজ্ঞতা লিখুন..."}),(0,e.jsxs)("div",{className:"text-right text-xs text-gray-500 mt-2",children:[G.length,"/1000"]})]}),(0,e.jsx)("button",{type:"button",onClick:N,disabled:I,className:"w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold rounded-2xl shadow-xl disabled:opacity-70",children:I?"সেভ হচ্ছে...":"রিভিউ সাবমিট করুন"})]}):(0,e.jsx)("button",{onClick:()=>c.push(`/login?redirect=/products/${b}`),className:"w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold rounded-2xl shadow-xl",children:"লগইন করে রিভিউ দিন"})]})]})]})})]})}):(0,e.jsxs)("div",{className:"min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-purple-50 to-pink-50 px-6",children:[(0,e.jsx)("p",{className:"text-2xl font-bold text-gray-800",children:"প্রোডাক্ট পাওয়া যায়নি"}),(0,e.jsxs)("div",{className:"flex gap-3",children:[(0,e.jsx)("button",{onClick:()=>c.push("/products"),className:"px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow",children:"সব প্রোডাক্ট দেখুন"}),(0,e.jsx)("button",{onClick:()=>c.refresh(),className:"px-5 py-3 rounded-xl bg-white text-purple-700 border border-purple-200 font-semibold shadow-sm",children:"আবার চেষ্টা করুন"})]}),y&&(0,e.jsx)("p",{className:"text-sm text-gray-600",children:y})]})}a.s(["default",()=>ar],70796)}];

//# sourceMappingURL=frontend_app_products_%5Bid%5D_page_tsx_bc9599ef._.js.map