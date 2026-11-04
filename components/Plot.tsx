'use client';
import {assetPath} from './assets';
import {Canvas,useThree,useFrame} from '@react-three/fiber';
import {PerspectiveCamera,Vector3} from 'three';
import {ContactShadows,OrbitControls,Line} from '@react-three/drei';
import {Component,Suspense,useState,useEffect,useRef} from 'react';
import {RotateCcw,Plus,Minus,MousePointer2} from 'lucide-react';
import Link from 'next/link';
class Boundary extends Component<{children:React.ReactNode},{error:boolean}>{state={error:false};static getDerivedStateFromError(){return {error:true}}render(){return this.state.error?<img className="fallback" src={assetPath('/plot.svg')} alt="Схема земельного участка с домом и границами"/>:this.props.children}}
function Box({p,s,c,onClick}:{p:[number,number,number],s:[number,number,number],c:string,onClick?:()=>void}){return <mesh position={p} castShadow receiveShadow onClick={onClick}><boxGeometry args={s}/><meshStandardMaterial color={c} roughness={.8}/></mesh>}
function Tree({x,z}:{x:number,z:number}){return <group position={[x,0,z]}><Box p={[0,.5,0]} s={[.08,1,.08]} c="#736753"/><mesh position={[0,1.25,0]} castShadow><sphereGeometry args={[.48,12,12]}/><meshStandardMaterial color="#70876b" roughness={1}/></mesh><mesh position={[.2,1,0]} castShadow><sphereGeometry args={[.33,12,12]}/><meshStandardMaterial color="#849378"/></mesh></group>}
function Model({mode,select}:{mode:number,select:(n:string)=>void}){const [hover,setHover]=useState(false);const lime='#b5df43';return <group position={[0,-.3,0]}>
<Box p={[0,-.18,0]} s={[7.2,.36,5.8]} c="#b9b4a0"/>
<Box p={[0,.015,0]} s={[7.2,.04,5.8]} c="#a7b390" onClick={()=>select('Геодезические изыскания')}/>
<Box p={[.65,.045,1.8]} s={[2.2,.05,2.1]} c="#cfcec0"/><Box p={[1.9,.06,1.8]} s={[.15,.07,2.1]} c="#e4e1d6"/>
<group onPointerOver={e=>{e.stopPropagation();setHover(true);document.body.style.cursor='pointer'}} onPointerOut={()=>{setHover(false);document.body.style.cursor='auto'}} onClick={e=>{e.stopPropagation();select('Технический план')}}>
<Box p={[-.35,.7,-.25]} s={[3.3,1.4,2.35]} c={mode===4||hover?'#d7ff64':'#e8e5dc'}/>
<Box p={[-.85,1.8,-.55]} s={[2.4,.8,1.7]} c="#f2efe7"/>
<Box p={[-.85,2.24,-.55]} s={[2.6,.09,1.9]} c="#777b70"/>
<Box p={[.7,1.43,-.25]} s={[1.3,.1,2.55]} c="#6c7069"/>
<Box p={[-.7,.75,.94]} s={[1.7,.85,.025]} c="#394b49"/>
<Box p={[.65,.65,.94]} s={[.72,1.2,.025]} c="#53615a"/>
{[-1.55,-.95,-.35].map(x=><Box key={x} p={[x,1.85,.31]} s={[.45,.5,.025]} c="#40514e"/>)}
{[-1.3,-.5,.3,1.1].map(x=><Box key={x} p={[x,.7,.96]} s={[.035,1.3,.03]} c="#c9c6bc"/>)}
<Box p={[-.3,.07,1.2]} s={[3.7,.12,.5]} c="#d9d3c4"/>
{Array.from({length:9},(_,i)=><Box key={i} p={[-1.8+i*.4,.12,1.2]} s={[.025,.015,.5]} c="#aaa292"/>)}
</group>
{[[-2.75,-1.85],[-2.8,1.7],[2.65,-1.8],[2.7,-.6]].map(([x,z],i)=><Tree key={i} x={x} z={z}/>)}
<Line points={[[-3.25,.1,2.55],[3.25,.1,2.55],[3.25,.1,-2.55],[-3.25,.1,-2.55],[-3.25,.1,2.55]]} color={lime} lineWidth={2.5}/>
{[[-3.25,2.55],[3.25,2.55],[3.25,-2.55],[-3.25,-2.55]].map(([x,z],i)=><group key={i} position={[x,.12,z]}><mesh onClick={()=>select('Межевание земельного участка')}><sphereGeometry args={[.075,16,16]}/><meshBasicMaterial color="#d7ff64"/></mesh><Line points={[[0,0,0],[0,.5,0]]} color="#d7ff64" lineWidth={1}/></group>)}


{mode===1&&[-2,-1,0,1,2].map((x,i)=><Line key={i} points={[[x,.13,-2.5],[x,.13,2.5]]} color="#e7ffaf" lineWidth={1} dashed dashSize={.12} gapSize={.12}/>)}
{mode===2&&<Line points={[[-3,.2,2.3],[3,.2,-2.3],[-3,.2,-2.3],[-3,.2,2.3],[3,.2,2.3],[3,.2,-2.3]]} color="#f3ffdd" lineWidth={1}/>}

</group>}
function CameraControls({zoom,reset}:{zoom:number,reset:number}){const {camera}=useThree();const ref=useRef<React.ComponentRef<typeof OrbitControls>>(null);useEffect(()=>{if(camera instanceof PerspectiveCamera){camera.fov=zoom;camera.updateProjectionMatrix();}},[camera,zoom]);useEffect(()=>{ref.current?.reset()},[reset]);return <OrbitControls ref={ref} enablePan={false} minDistance={8} maxDistance={19} minPolarAngle={.35} maxPolarAngle={1.4} autoRotate={false}/>}
const labelPositions=[[-3.25,.47,2.55],[3.25,.47,2.55],[3.25,.47,-2.55],[-3.25,.47,-2.55],[0,-.18,2.9],[3.6,-.15,0]];
function ProjectedLabels({elements}:{elements:React.RefObject<(HTMLElement|null)[]>}){const {camera,size}=useThree();const vector=useRef(new Vector3());useFrame(()=>{labelPositions.forEach(([x,y,z],i)=>{const el=elements.current[i];if(!el)return;const v=vector.current.set(x,y,z).project(camera);el.style.display=v.z<1?'block':'none';el.style.left=`${(v.x+1)*size.width/2}px`;el.style.top=`${(-v.y+1)*size.height/2}px`;})});return null}
export default function Plot({mode=0}:{mode?:number}){const labelRefs=useRef<(HTMLElement|null)[]>([]);const [selected,setSelected]=useState('');const [zoom,setZoom]=useState(39);const [reset,setReset]=useState(0);return <div className="plot"><img className="static-plot" src={assetPath('/plot.svg')} alt="Изометрическая схема участка"/><Boundary><Suspense fallback={null}><Canvas shadows dpr={[1,1.6]} camera={{position:[9,8,10],fov:zoom}} onCreated={({gl})=>{gl.setClearColor('#eeeee7',0)}}><ambientLight intensity={1.6}/><directionalLight position={[5,10,5]} intensity={2.4} castShadow shadow-mapSize={[1024,1024]}/><Model mode={mode} select={setSelected}/><ContactShadows position={[0,-.52,0]} opacity={.35} scale={17} blur={2.5} far={6}/><CameraControls zoom={zoom} reset={reset}/><ProjectedLabels elements={labelRefs}/></Canvas></Suspense></Boundary><div className="plot-labels">{[0,1,2,3].map(i=><button className="point" style={{position:'absolute',display:'none',transform:'translate(-50%,-50%)'}} key={i} ref={el=>{labelRefs.current[i]=el}} onClick={()=>setSelected('Вынос границ')}>H{i+1}</button>)}{['32,40 м','25,80 м'].map((t,i)=><span className="measurement" key={t} style={{position:'absolute',display:'none',transform:'translate(-50%,-50%)'}} ref={el=>{labelRefs.current[i+4]=el}}>{t}</span>)}</div>{mode===2&&<div className="plan-preview"><small>МЕЖЕВОЙ ПЛАН · УСЛОВНО</small><svg viewBox="0 0 180 130"><path d="M20 20h140v90H20Z M40 80l20-40 65 5 20 45-65 9Z M25 120h95" fill="none" stroke="#637452"/></svg></div>}{mode===3&&<div className="scene-tag">01 Измерения → 02 План → 03 Учёт</div>}<div className="plot-meta"><span><i/> ИНТЕРАКТИВНАЯ МОДЕЛЬ</span><span>УЧАСТОК / 01</span></div><div className="plot-foot"><span><MousePointer2 size={13}/> Вращайте · нажимайте на объекты</span><div><button aria-label="Приблизить" onClick={()=>setZoom(Math.max(30,zoom-6))}><Plus size={17}/></button><button aria-label="Отдалить" onClick={()=>setZoom(Math.min(66,zoom+6))}><Minus size={17}/></button><button aria-label="Сбросить вид" onClick={()=>setReset(reset+1)}><RotateCcw size={16}/></button></div></div>{selected&&<div className="scene-info"><button className="close" aria-label="Закрыть информацию" onClick={()=>setSelected('')}>×</button><small>ТОЧНОСТЬ В ДЕТАЛЯХ</small><h3>{selected}</h3><p>Узнайте, какие измерения и документы потребуются для вашей задачи.</p><Link href="/calculator/">Обсудить задачу ↗</Link></div>}</div>}
