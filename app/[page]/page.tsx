import {Catalog,Quiz,Calculator,Projects,About,Contacts,Account} from '../../components/Tools';
import {Privacy,Consent} from '../../components/Legal';
const pages={services:Catalog,quiz:Quiz,calculator:Calculator,about:About,contacts:Contacts,privacy:Privacy,consent:Consent};export function generateStaticParams(){return Object.keys(pages).map(page=>({page}))}export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;const Component=pages[page as keyof typeof pages];return <Component/>}
