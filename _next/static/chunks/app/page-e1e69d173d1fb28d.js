(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{7672:(e,t,s)=>{Promise.resolve().then(s.bind(s,8433))},8433:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>D});var n=s(5155),a=s(2115),i=s(760),r=s(6183);function o(e){let{onAnimationComplete:t}=e,[s,o]=(0,a.useState)(0),[l,c]=(0,a.useState)(!0),d=(0,a.useMemo)(()=>[{text:"exec ./dLucas.dev",delay:1e3},{text:"Server starting...",delay:1e3},{text:"Server listening on http://localhost:5173",delay:1500},{text:"Loading portfolio...",delay:1e3},{text:"Ready!",delay:500}],[]);return(0,a.useEffect)(()=>{if(s<d.length){let e=setTimeout(()=>{o(s+1),s===d.length-1&&setTimeout(()=>{t()},500)},d[s].delay);return()=>clearTimeout(e)}},[s,d,t]),(0,n.jsxs)("section",{className:"relative mx-4 h-[100dvh] overflow-hidden py-4 2xl:mx-40 2xl:py-28 flex flex-col gap-2 font-terminal text-secondary",children:[l&&(0,n.jsx)("button",{onClick:()=>{c(!1),t()},className:"absolute bottom-12 right-0 flex items-center gap-2 text-responsive-h6 2xl:bottom-auto 2xl:top-20",children:(0,n.jsx)("span",{children:"Skip Animation"})}),(0,n.jsxs)("div",{className:"flex gap-4",children:[(0,n.jsx)("div",{className:"font-bold",children:"myphz@archlinux:$"}),(0,n.jsx)(i.N,{children:(0,n.jsx)(r.P.div,{initial:{width:0},animate:{width:"auto"},transition:{duration:1,ease:"easeInOut"},className:"relative h-fit w-fit",style:{"--text-length":"18","--caret-color":"#69afff","--delay":"500","--speed":"10","--disable-caret-after":"0.5"},children:s>=0&&d[0].text},0===s?"typing":"typed")})]}),(0,n.jsx)(i.N,{children:s>=1&&(0,n.jsx)(r.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:d[1].text})}),(0,n.jsx)(i.N,{children:s>=2&&(0,n.jsx)(r.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:d[2].text})}),(0,n.jsx)(i.N,{children:s>=3&&(0,n.jsx)(r.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:d[3].text})}),(0,n.jsx)(i.N,{children:s>=4&&(0,n.jsx)(r.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:d[4].text})})]})}var l=s(6874),c=s.n(l),d=s(2596),m=s(9688);function x(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,m.QP)((0,d.$)(t))}function h(e){let{activeSection:t}=e;return(0,n.jsx)("nav",{className:"fixed top-8 right-8 z-50 hidden md:block",children:(0,n.jsx)("ul",{className:"flex items-center space-x-8 text-responsive-h6",children:[{id:"about",title:"0. ABOUT",path:"#about"},{id:"skills",title:"1. SKILLS",path:"#skills"},{id:"work",title:"2. WORK",path:"#work"},{id:"projects",title:"3. PROJECTS",path:"#projects"},{id:"contact",title:"4. CONTACT",path:"#contact"},{id:"resume",title:"5. RESUME",path:"#resume"}].map(e=>(0,n.jsx)("li",{children:(0,n.jsx)(c(),{href:e.path,className:x("relative transition-colors duration-300 hover:text-secondary",t===e.id?"text-secondary":"text-text"),children:e.title})},e.id))})})}function p(e){let{activeSection:t}=e;return(0,n.jsx)("div",{className:"fixed bottom-8 right-8 z-50 flex flex-col items-end md:hidden",children:(0,n.jsx)("div",{className:"flex flex-col items-end space-y-4",children:Array(6).fill(0).map((e,s)=>(0,n.jsx)(c(),{href:"#".concat(["about","skills","work","projects","contact","resume"][s]),className:"block",children:(0,n.jsx)("div",{className:x("nav-dot",t===["about","skills","work","projects","contact","resume"][s]?"active":"")})},s))})})}function u(){return(0,n.jsx)("div",{className:"fixed top-8 left-8 z-50 text-responsive-h6 text-text/70",children:"DRAG ANYWHERE"})}var y=s(4624);let f=(0,s(2085).F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),g=a.forwardRef((e,t)=>{let{className:s,variant:a,size:i,asChild:r=!1,...o}=e,l=r?y.DX:"button";return(0,n.jsx)(l,{className:x(f({variant:a,size:i,className:s})),ref:t,...o})});g.displayName="Button";var v=s(6766);function j(){return(0,n.jsxs)("section",{id:"about",className:"relative min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40",children:[(0,n.jsx)("div",{className:"absolute inset-0 bg-black/20 z-0 pointer-events-none",children:(0,n.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-green-900/30 to-transparent opacity-30"})}),(0,n.jsxs)(r.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},className:"z-10",children:[(0,n.jsx)("h1",{className:"text-responsive-h1 font-bold mb-6 neon-text",children:"Lucas Song"}),(0,n.jsx)("h2",{className:"text-responsive-h3 font-terminal text-secondary mb-6",children:"FULL STACK DEVELOPER"}),(0,n.jsxs)("p",{className:"text-responsive-h5 max-w-2xl mb-8 opacity-90",children:["Computer Engineering @ UBC",(0,n.jsx)("br",{})]}),(0,n.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4",children:[(0,n.jsx)(g,{asChild:!0,size:"lg",className:"bg-secondary text-background hover:bg-secondary/90 px-8 py-6 rounded-md text-responsive-h6 font-medium",children:(0,n.jsx)("a",{href:"#contact",children:"Contact Me"})}),(0,n.jsx)(g,{asChild:!0,variant:"outline",size:"lg",className:"bg-transparent border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 rounded-md text-responsive-h6 font-medium",children:(0,n.jsxs)("a",{href:"#about",className:"flex items-center gap-2",children:["Learn More",(0,n.jsx)(v.default,{src:"icons/chevrons-right.svg",alt:"Arrow right",width:20,height:20,className:"text-secondary"})]})})]})]})]})}function b(){let e=[{name:"JavaScript",level:90,category:"Frontend"},{name:"TypeScript",level:65,category:"Frontend"},{name:"React",level:88,category:"Frontend"},{name:"Next.js",level:82,category:"Frontend"},{name:"HTML/CSS",level:95,category:"Frontend"},{name:"Tailwind CSS",level:90,category:"Frontend"},{name:"Node.js",level:80,category:"Backend"},{name:"Express",level:78,category:"Backend"},{name:"MongoDB",level:75,category:"Backend"},{name:"PostgreSQL",level:72,category:"Backend"},{name:"Git",level:85,category:"Tools"},{name:"Docker",level:70,category:"DevOps"}],t=Array.from(new Set(e.map(e=>e.category))),s={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1}}},a={hidden:{opacity:0,y:20},show:{opacity:1,y:0}};return(0,n.jsx)("section",{id:"skills",className:"min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40 py-20",children:(0,n.jsxs)("div",{className:"max-w-6xl mx-auto w-full",children:[(0,n.jsx)(r.P.h2,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},transition:{duration:.5},viewport:{once:!0},className:"text-responsive-h2 font-terminal text-secondary mb-12 border-b border-secondary/30 pb-4",children:"1. SKILLS"}),(0,n.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-12",children:t.map(t=>(0,n.jsxs)("div",{className:"mb-8",children:[(0,n.jsx)(r.P.h3,{initial:{opacity:0},whileInView:{opacity:1},transition:{duration:.5},viewport:{once:!0},className:"text-responsive-h4 font-terminal mb-6",children:t}),(0,n.jsx)(r.P.ul,{variants:s,initial:"hidden",whileInView:"show",viewport:{once:!0},className:"space-y-4",children:e.filter(e=>e.category===t).map(e=>(0,n.jsxs)(r.P.li,{variants:a,className:"mb-4",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center mb-2",children:[(0,n.jsx)("span",{className:"font-terminal text-responsive-h6",children:e.name}),(0,n.jsxs)("span",{className:"text-secondary text-responsive-h6",children:[e.level,"%"]})]}),(0,n.jsx)("div",{className:"w-full bg-gray-800 rounded-full h-2.5",children:(0,n.jsx)(r.P.div,{className:"bg-secondary h-2.5 rounded-full",initial:{width:0},whileInView:{width:"".concat(e.level,"%")},transition:{duration:1,ease:"easeOut"},viewport:{once:!0}})})]},e.name))})]},t))})]})})}function w(){let[e,t]=(0,a.useState)(0);console.log("\uD83D\uDE80 ~ WorkSection ~ activeTab:",e);let s=[{id:"ibm-software-dev-2024",company:"IBM",position:"Software Developer Intern",period:"Jan - Aug 2024",description:["Developed 15+ features to enhance IT performance visibility, improving AI automation.","Designed an upgraded filter selection system for 600k+ alerts, enhancing customer efficiency.","Created training decks and presented to 100’s of client and internal stakeholder attendees.","Built an internal Python tool to replay specific product API calls, cutting bug reproduction time by 30%."],technologies:["React","HTML5","CSS3","Python"]},{id:"ibm-frontend-dev-2023",company:"IBM",position:"Front-End Developer Intern",period:"Sep - Dec 2023",description:["Maintained and optimized AI IT operations dashboards for performance improvements.","Collaborated with a 5-person global team across design, QA, and backend engineering.","Integrated 20+ React components with RESTful and GraphQL APIs.","Refactored React hooks, reducing unnecessary renders on affected pages by up to 50%."],technologies:["React","HTML","CSS","Node.js","Redux"]},{id:"ibm-qa-intern-2023",company:"IBM",position:"Quality Assurance Intern",period:"May - Aug 2023",description:["Rebuilt a 2-year-old end-to-end (e2e) testing pipeline using Nightwatch, Selenium, and JavaScript.","Logged and resolved 100+ issues via Zenhub and Jira, streamlining development.","Benchmarked backend performance of new features before production releases.","Automated e2e test creation, reducing test failure rate on new releases by 50%."],technologies:["Zenhub","Python","Jira","Nightwatch","Selenium","Jenkins"]}];return console.log("\uD83D\uDE80 ~ WorkSection ~ experiences:",s),(0,n.jsx)("section",{id:"work",className:"min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40 py-20",children:(0,n.jsxs)("div",{className:"max-w-6xl mx-auto w-full",children:[(0,n.jsx)(r.P.h2,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},transition:{duration:.5},viewport:{once:!0},className:"text-responsive-h2 font-terminal text-secondary mb-12 border-b border-secondary/30 pb-4",children:"2. WORK"}),(0,n.jsxs)("div",{className:"flex flex-col md:flex-row gap-8",children:[(0,n.jsx)("div",{className:"md:w-1/3 mb-6 md:mb-0",children:(0,n.jsx)("div",{className:"sticky top-24 space-y-2 font-terminal",children:s.map((s,a)=>(0,n.jsx)("button",{onClick:()=>t(a),className:"w-full text-left p-3 rounded-md transition-colors ".concat(e===a?"bg-secondary/20 text-secondary border-l-2 border-secondary":"hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"),children:s.company},s.id))})}),(0,n.jsxs)(r.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},className:"md:w-2/3",children:[(0,n.jsxs)("h3",{className:"text-responsive-h4 font-terminal",children:[s[e].position,(0,n.jsxs)("span",{className:"text-secondary",children:[" ","@ ",s[e].company]})]}),(0,n.jsx)("p",{className:"text-gray-400 font-terminal mb-4",children:s[e].period}),(0,n.jsx)("ul",{className:"space-y-4 mb-6",children:s[e].description.map((e,t)=>(0,n.jsxs)("li",{className:"flex items-start",children:[(0,n.jsx)("span",{className:"text-secondary mr-2",children:"▹"}),(0,n.jsx)("span",{children:e})]},t))}),(0,n.jsx)("div",{className:"flex flex-wrap gap-2 mt-4",children:s[e].technologies.map(e=>(0,n.jsx)("span",{className:"px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md font-terminal",children:e},e))})]},e)]})]})})}let N=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,n.jsx)("div",{ref:t,className:x("rounded-xl border bg-card text-card-foreground shadow",s),...a})});N.displayName="Card";let k=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,n.jsx)("div",{ref:t,className:x("flex flex-col space-y-1.5 p-6",s),...a})});k.displayName="CardHeader";let S=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,n.jsx)("div",{ref:t,className:x("font-semibold leading-none tracking-tight",s),...a})});S.displayName="CardTitle";let C=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,n.jsx)("div",{ref:t,className:x("text-sm text-muted-foreground",s),...a})});C.displayName="CardDescription";let L=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,n.jsx)("div",{ref:t,className:x("p-6 pt-0",s),...a})});L.displayName="CardContent";let P=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,n.jsx)("div",{ref:t,className:x("flex items-center p-6 pt-0",s),...a})});function E(){return(0,n.jsx)("section",{id:"projects",className:"min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40 py-20",children:(0,n.jsxs)("div",{className:"max-w-6xl mx-auto w-full",children:[(0,n.jsx)(r.P.h2,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},transition:{duration:.5},viewport:{once:!0},className:"text-responsive-h2 font-terminal text-secondary mb-12 border-b border-secondary/30 pb-4",children:"3. PROJECTS"}),(0,n.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[{title:"2022 Pathfinding Visualizer",description:"grid-based visualizer to help your intuition on common pathfinding algorithms",technologies:["React","Node.js","CSS","HTML"],image:"documents/SC_pathfinding.png",link:"https://lucas-song-dev.github.io/Shortest-Path/",github:"https://github.com/Lucas-Song-Dev/Shortest-Path"}].map((e,t)=>(0,n.jsx)(r.P.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{duration:.5,delay:.1*t},viewport:{once:!0},children:(0,n.jsxs)(N,{className:"bg-black/60 border-secondary/20 overflow-hidden h-full flex flex-col",children:[(0,n.jsx)("div",{className:"relative h-48 w-full overflow-hidden",children:(0,n.jsx)(c(),{href:e.link,className:"text-xs text-secondary hover:text-secondary/70 transition-colors font-terminal",children:(0,n.jsx)(v.default,{src:e.image,alt:e.title,fill:!0,className:"object-cover transform hover:scale-110 transition-transform duration-500"})})}),(0,n.jsxs)(k,{children:[(0,n.jsx)(S,{className:"text-responsive-h5 font-terminal",children:e.title}),(0,n.jsx)(C,{className:"text-gray-400",children:e.description})]}),(0,n.jsx)(L,{className:"flex-grow",children:(0,n.jsx)("div",{className:"flex flex-wrap gap-2",children:e.technologies.map(e=>(0,n.jsx)("span",{className:"px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md",children:e},e))})}),(0,n.jsxs)(P,{className:"flex justify-between border-t border-secondary/20 pt-4",children:[(0,n.jsx)(c(),{href:e.link,className:"text-xs text-secondary hover:text-secondary/70 transition-colors font-terminal",children:"View Project →"}),e.github&&(0,n.jsx)(c(),{href:e.github,className:"text-xs text-gray-400 hover:text-white transition-colors font-terminal",children:"GitHub →"})]})]})},e.title))})]})})}function I(){let[e,t]=(0,a.useState)({name:"",email:"",message:""}),[s,i]=(0,a.useState)(""),o=s=>{t({...e,[s.target.id]:s.target.value})},l=async s=>{s.preventDefault(),i("Sending...");try{(await fetch("/api/sendEmail",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok?(i("Message sent successfully!"),t({name:"",email:"",message:""})):i("Failed to send message. (my Heroku server ran out of credits :c)")}catch(e){console.error(e),i("An error occurred.")}};return(0,n.jsx)("section",{id:"contact",className:"min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40 py-20",children:(0,n.jsxs)("div",{className:"max-w-4xl mx-auto w-full",children:[(0,n.jsx)(r.P.h2,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},transition:{duration:.5},viewport:{once:!0},className:"text-responsive-h2 font-terminal text-secondary mb-12 border-b border-secondary/30 pb-4",children:"4. CONTACT"}),(0,n.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-12",children:[(0,n.jsxs)(r.P.div,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},transition:{duration:.5},viewport:{once:!0},className:"space-y-6",children:[(0,n.jsx)("h3",{className:"text-responsive-h4 font-terminal mb-6",children:"Get In Touch"}),(0,n.jsx)("p",{className:"text-gray-400",children:"I'm currently looking for new opportunities. Whether you have a question or just want to say hi, feel free to reach out and I'll get back to you!"}),(0,n.jsxs)("div",{className:"space-y-4 mt-8",children:[(0,n.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-secondary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})}),(0,n.jsx)("a",{href:"mailto:Lucas02.song@gmail.com",className:"text-gray-300 hover:text-secondary transition-colors",children:"Lucas02.song@gmail.com"})]}),(0,n.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-secondary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"})}),(0,n.jsx)("a",{href:"https://github.com/Lucas-Song-Dev",target:"_blank",rel:"noopener noreferrer",className:"text-gray-300 hover:text-secondary transition-colors",children:"github.com/Lucas-Song-Dev"})]}),(0,n.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-secondary",fill:"currentColor",viewBox:"0 0 24 24",stroke:"none",children:(0,n.jsx)("path",{d:"M19 0H5C3.9 0 3 .9 3 2v20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM8 20H5v-8h3v8zm-1.5-9.1c-.9 0-1.5-.6-1.5-1.5s.6-1.5 1.5-1.5 1.5.6 1.5 1.5-.6 1.5-1.5 1.5zM20 20h-3v-5.5c0-1.4-.5-2.4-1.5-2.4-1.1 0-1.6.8-1.6 2v5.9h-3v-8h3v1.1c.5-.7 1.3-1.2 2.5-1.2 1.9 0 3 1.3 3 3.8v4.1z"})}),(0,n.jsx)("a",{href:"linkedin.com/in/lucas02-song/",target:"_blank",rel:"noopener noreferrer",className:"text-gray-300 hover:text-secondary transition-colors",children:"in/Lucas02-song"})]})]})]}),(0,n.jsx)(r.P.div,{initial:{opacity:0,x:50},whileInView:{opacity:1,x:0},transition:{duration:.5},viewport:{once:!0},className:"bg-black/30 p-6 rounded-lg border border-secondary/20",children:(0,n.jsxs)("form",{onSubmit:l,className:"space-y-4",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"name",className:"block text-sm font-terminal text-gray-400 mb-1",children:"Your Name"}),(0,n.jsx)("input",{type:"text",id:"name",value:e.name,onChange:o,className:"w-full bg-gray-900/50 border border-secondary/20 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50",placeholder:"John Doe",required:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"email",className:"block text-sm font-terminal text-gray-400 mb-1",children:"Your Email"}),(0,n.jsx)("input",{type:"email",id:"email",value:e.email,onChange:o,className:"w-full bg-gray-900/50 border border-secondary/20 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50",placeholder:"john@example.com",required:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"message",className:"block text-sm font-terminal text-gray-400 mb-1",children:"Message"}),(0,n.jsx)("textarea",{id:"message",rows:5,value:e.message,onChange:o,className:"w-full bg-gray-900/50 border border-secondary/20 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none",placeholder:"Your message here...",required:!0})]}),(0,n.jsx)(g,{type:"submit",className:"w-full bg-secondary text-background hover:bg-secondary/90 transition-colors",children:"Send Message"}),s&&(0,n.jsx)("p",{className:"text-gray-400 mt-2",children:s})]})})]})]})})}function R(){return(0,n.jsx)("section",{id:"resume",className:"min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40 py-20",children:(0,n.jsxs)("div",{className:"max-w-6xl mx-auto w-full",children:[(0,n.jsx)(r.P.h2,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},transition:{duration:.5},viewport:{once:!0},className:"text-responsive-h2 font-terminal text-secondary mb-12 border-b border-secondary/30 pb-4",children:"5. RESUME"}),(0,n.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-12",children:[(0,n.jsxs)(r.P.div,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},transition:{duration:.5},viewport:{once:!0},className:"space-y-6",children:[(0,n.jsx)("h3",{className:"text-responsive-h4 font-terminal mb-6",children:"Education"}),(0,n.jsx)("div",{className:"space-y-8",children:(0,n.jsxs)("div",{className:"bg-black/30 p-6 rounded-lg border border-secondary/20",children:[(0,n.jsx)("h4",{className:"text-responsive-h5 font-terminal",children:"Bachelor’s Degree in Applied Science, Computer Engineering"}),(0,n.jsx)("p",{className:"text-secondary font-terminal mb-2",children:"The University of British Columbia"}),(0,n.jsx)("p",{className:"text-gray-400",children:"Expected 2026"}),(0,n.jsx)("p",{className:"mt-4",children:"Coursework: Software Construction, Computer Hardware, Data Structures and Algorithms, Math Proofs, Linear Algebra."})]})})]}),(0,n.jsx)(r.P.div,{initial:{opacity:0,x:50},whileInView:{opacity:1,x:0},transition:{duration:.5},viewport:{once:!0},className:"space-y-6",children:(0,n.jsx)("div",{className:"mt-12 flex justify-center",children:(0,n.jsxs)("a",{href:"documents/lucas_song_resume.pdf",download:!0,className:"bg-secondary text-background hover:bg-secondary/90 px-8 py-6 rounded-md text-responsive-h6 font-medium flex items-center",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})}),"Download Full Resume"]})})})]})]})})}P.displayName="CardFooter";let M=["cyan","magenta","blue","cyan","magenta","blue"],T=()=>{let[e,t]=(0,a.useState)([]),[s,i]=(0,a.useState)([]),[r,o]=(0,a.useState)(!1),[l,c]=(0,a.useState)(null),[d,m]=(0,a.useState)(0),[x,h]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let e=e=>{let s=Date.now();t(t=>[...t,{point:{x:e.clientX,y:e.clientY},timestamp:s}].slice(-10)),r&&l&&s-x>50&&(i(t=>[...t,{line:{from:l,to:{x:e.clientX,y:e.clientY}},color:M[d],timestamp:s}]),m(e=>(e+1)%M.length),h(s)),c({x:e.clientX,y:e.clientY})},s=e=>{o(!0),c({x:e.clientX,y:e.clientY})},n=()=>{o(!1),c(null),setTimeout(()=>i([]),500)},a=setInterval(()=>{let e=Date.now();i(t=>t.filter(t=>e-t.timestamp<500)),t(t=>t.filter(t=>e-t.timestamp<500))},50);return window.addEventListener("mousemove",e),window.addEventListener("mousedown",s),window.addEventListener("mouseup",n),()=>{clearInterval(a),window.removeEventListener("mousemove",e),window.removeEventListener("mousedown",s),window.removeEventListener("mouseup",n)}},[r,l,d,x]),(0,n.jsxs)("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none"},children:[e.map((e,t)=>{let{point:s,timestamp:a}=e;return(0,n.jsx)("div",{style:{position:"absolute",left:s.x,top:s.y,width:"".concat(50-t,"px"),height:"".concat(50-t,"px"),background:"linear-gradient(45deg, ".concat(M[(d+t)%M.length],", transparent)"),borderRadius:"50%",filter:"blur(5px)",transform:"translate(-50%, -50%)",opacity:Math.max(0,(500-(Date.now()-a))/500),transition:"opacity 0.5s ease-out"}},"".concat(a," + ").concat(s.x," + ").concat(t))}),s.map((e,t)=>{let{line:s,color:a,timestamp:i}=e;return(0,n.jsx)("svg",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh"},children:(0,n.jsx)("line",{x1:s.from.x,y1:s.from.y,x2:s.to.x,y2:s.to.y,stroke:a,strokeWidth:"50",strokeLinecap:"round",opacity:Math.max(0,(500-(Date.now()-i))/500)})},t)})]})},A=()=>{let[e,t]=(0,a.useState)("about");return(0,a.useEffect)(()=>{let e=()=>{for(let e of["about","skills","work","projects","contact","resume"]){let s=document.getElementById(e);if(!s)continue;let n=s.getBoundingClientRect();if(n.top<=100&&n.bottom>=100){t(e);break}}};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),(0,n.jsxs)(r.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},className:"bg-background text-text",children:[(0,n.jsx)(T,{}),(0,n.jsx)(u,{}),(0,n.jsx)(h,{activeSection:e}),(0,n.jsx)(p,{activeSection:e}),(0,n.jsxs)("main",{children:[(0,n.jsx)(j,{}),(0,n.jsx)(b,{}),(0,n.jsx)(w,{}),(0,n.jsx)(E,{}),(0,n.jsx)(I,{}),(0,n.jsx)(R,{})]})]})};function D(){let[e,t]=(0,a.useState)(!0),[s,i]=(0,a.useState)(!1);return((0,a.useEffect)(()=>{i(!0)},[]),s)?(0,n.jsx)(n.Fragment,{children:e?(0,n.jsx)(o,{onAnimationComplete:()=>{t(!1)}}):(0,n.jsx)(A,{})}):null}}},e=>{var t=t=>e(e.s=t);e.O(0,[983,441,684,358],()=>t(7672)),_N_E=e.O()}]);