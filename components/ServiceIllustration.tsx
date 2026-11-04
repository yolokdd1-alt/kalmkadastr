'use client';
import {useId} from 'react';
/** Each service has a stable illustration, including after catalog filtering. */
export default function ServiceIllustration({slug}:{slug:string}){
const id=useId().replace(/:/g,'');
const drawings:Record<string,React.ReactNode>={
mezhevanie:<><path d="m65 113 48-66 138 22-35 66Z"/><path d="m65 113 186-44m-138-22 103 88" opacity=".25" strokeDasharray="4 5"/>{[[65,113],[113,47],[251,69],[216,135]].map(([x,y],i)=><g key={i}><path d={`M${x} ${y}v-22m-5 0h10m-5-4v8`}/><circle cx={x} cy={y} r="4" fill="#d7ff64"/><text x={x+9} y={y-10}>Н{i+1}</text></g>)}</>,
uchet:<><path d="m87 80 61-35 61 35-61 35Zm0 0v34l61 35 61-35V80m-61 35v34m0-104v33"/><path d="M227 44h39v53h-39Z M235 54h22m-22 8h17"/><circle cx="246" cy="87" r="16" fill="#fafaf8"/><path d="m238 87 6 6 11-13" strokeWidth="2"/><path d="M72 155h160" strokeDasharray="3 5" opacity=".4"/></>,
'mezhevoy-plan':<><path d="M95 24h130v124H95Zm-10 8H75v124h130v-8M110 41h75m-75 10h95m-95 10h60"/><path d="m111 111 26-35 53 9 20 39-70 7Z"/>{[[111,111],[137,76],[190,85],[210,124],[140,131]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#d7ff64"/>)}</>,
semka:<><path d="M52 125c25-53 43-18 70-49s38-47 70-30 41 5 76-9M49 141c33-46 44-21 77-46s44-44 73-29 41 3 70-9M60 153c30-30 46-14 75-33s43-40 73-30 37 5 61-5M65 105c22-40 36-18 53-46s45-40 65-32M148 147c21-12 39-34 62-32s40 1 56-8"/><circle cx="210" cy="66" r="4" fill="#d7ff64"/><circle cx="122" cy="95" r="4" fill="#d7ff64"/><path d="M210 53v26m-13-13h26" opacity=".5"/><text x="224" y="62">+24.6</text><text x="83" y="90">+18.2</text></>,
tehplan:<><path d="M75 43h166v101H75Zm83 0v64h83M75 99h83m-42 0v45m42-70h83M158 107v37" strokeWidth="2"/><path d="M67 35v117m-5-117h10m-10 117h10M75 26h166m-166-5v10m166-10v10" opacity=".5"/><path d="M116 117a27 27 0 0 1 27 27m-27-27v27M185 74v23a23 23 0 0 0 23-23" opacity=".6"/><text x="144" y="22">12.40</text><path d="M191 140h26" stroke="#a3c448" strokeWidth="4"/></>,
tehpasport:<><path d="M103 24h106l22 23v102H103Zm106 0v25h22M116 65h99M116 126h99m-99 9h76M117 42h53"/><path d="m127 94 28-21 28 21v24h-56Zm20 24V98h16v20m-30-32v-9"/><circle cx="204" cy="97" r="13"/><path d="m198 97 4 4 8-9" stroke="#88a846" strokeWidth="2"/></>,
izyskaniya:<><path d="M132 61h56V38h-56Zm28 0v17m-18 0h36m-18 0-37 70m37-70 37 70m-37-70v70M116 148h14m60 0h14m-51 0h14"/><circle cx="160" cy="49" r="9"/><path d="m188 49 71 40m-71-40 57-24" strokeDasharray="4 5" opacity=".5"/><path d="M246 89h25m-12-12v24M237 25h16m-8-8v16"/><circle cx="259" cy="89" r="3" fill="#d7ff64"/></>,
pravo:<><path d="M160 37v101m-35 6h70m-59-8h48M106 62h108m-54-25-54 25m54-25 54 25M112 62l-25 48h50Zm96 0-25 48h50Z"/><path d="M87 110q25 30 50 0m46 0q25 30 50 0"/><circle cx="160" cy="36" r="5" fill="#d7ff64"/></>,
dokumentaciya:<><path d="M110 24h106v115H110Zm-11 10H89v115h106v-10m-117-95H68v115h106v-10M126 43h70M126 54h52"/>{[79,99,119].map((y,i)=><g key={i}><path d={`m125 ${y-4} 4 4 7-9M145 ${y-3}h54`}/></g>)}<path d="M206 126h30m-15-15v30" stroke="#91af4d" strokeWidth="2"/></>,
soprovozhdenie:<><path d="M68 83h180" strokeDasharray="4 5" opacity=".4"/>{[79,160,241].map((x,i)=><g key={i}><circle cx={x} cy="83" r="23" fill="#fafaf8"/>{i<2?<path d={`m${x-8} 83 6 6 11-13`}/>:<circle cx={x} cy="83" r="5" fill="#d7ff64"/>}<text x={x-5} y="125">0{i+1}</text></g>)}<path d="M66 41h94m0 0-6-5m6 5-6 5M160 142h81m0 0-6-5m6 5-6 5" opacity=".5"/></>
};
return <div className={`technical service-illustration service-${slug}`} aria-hidden="true"><svg viewBox="0 0 320 165"><defs><pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" opacity=".07"/></pattern></defs><rect width="320" height="165" fill={`url(#${id})`}/>{drawings[slug]}</svg></div>
}
