import {ServicePage} from '../../../components/Tools';import {services} from '../../../components/data';export function generateStaticParams(){return services.map(s=>({slug:s.slug}))}export default async function Page({params}:{params:Promise<{slug:string}>}){return <ServicePage slug={(await params).slug}/>}

export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const service=services.find(s=>s.slug===slug);return {title:`${service?.title||'Услуга'} — КАЛМКАДАСТР`,description:service?.desc}}
