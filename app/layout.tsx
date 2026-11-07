import type {Metadata} from 'next';
import './globals.css';
import localFont from 'next/font/local';
const manrope=localFont({src:[{path:'../public/fonts/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf',weight:'400',style:'normal'},{path:'../public/fonts/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F.ttf',weight:'500',style:'normal'},{path:'../public/fonts/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4jE-_F.ttf',weight:'600',style:'normal'},{path:'../public/fonts/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf',weight:'700',style:'normal'},{path:'../public/fonts/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F.ttf',weight:'800',style:'normal'}],variable:'--font-manrope',display:'swap'});
export const metadata:Metadata={robots:{index:false,follow:false},title:'КАЛМКАДАСТР — точность в каждом измерении',description:'Кадастровые, геодезические и юридические услуги. Интерактивный демонстрационный прототип.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body className={manrope.variable}>{children}</body></html>}
