import type {Metadata} from 'next';
import {Catalog,Quiz,Calculator,About,Contacts} from '../../components/Tools';
import {Privacy,Consent} from '../../components/Legal';
const pages={services:Catalog,quiz:Quiz,calculator:Calculator,about:About,contacts:Contacts,privacy:Privacy,consent:Consent};export function generateStaticParams(){return Object.keys(pages).map(page=>({page}))}export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;const Component=pages[page as keyof typeof pages];return <Component/>}

export const dynamicParams=false;
const labels:Record<string,string>={services:'Все услуги',quiz:'Подбор услуги',calculator:'Запрос стоимости',about:'О компании',contacts:'Контакты',privacy:'Политика обработки персональных данных',consent:'Согласие на обработку персональных данных'};
export async function generateMetadata({params}:{params:Promise<{page:string}>}):Promise<Metadata>{return {title:`${labels[(await params).page]} — КАЛМКАДАСТР`}}
