import http from 'node:http';
import {submit,MAX_BODY} from './telegram.mjs';
import {telegramFetch} from './telegram-transport.mjs';
const origins=new Set((process.env.ALLOWED_ORIGINS||'').split(',').filter(Boolean));
const limits=new Map();
setInterval(()=>{const now=Date.now();for(const [key,v] of limits)if(v.until<now)limits.delete(key)},60000).unref();
const server=http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 const reply=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data))};
 if(req.url==='/health'&&req.method==='GET')return reply(200,{ok:true});
 if(req.url!=='/api/enquiries')return reply(404,{error:'Не найдено'});
 const origin=req.headers.origin;if(!origin||!origins.has(origin))return reply(403,{error:'Недопустимый источник'});
 res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');
 if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'});return res.end()}
 if(req.method!=='POST')return reply(405,{error:'Метод не поддерживается'});
 const ip=String(req.headers['x-real-ip']||req.socket.remoteAddress);const now=Date.now();const rate=limits.get(ip);if(rate&&rate.until>now&&rate.count>=5)return reply(429,{error:'Слишком много попыток. Повторите через 10 минут.'});limits.set(ip,rate&&rate.until>now?{...rate,count:rate.count+1}:{count:1,until:now+600000});
 // Bind to loopback: Nginx supplies TLS and enforces a second upload/rate limit.
 try{if(!req.headers['content-type']?.startsWith('multipart/form-data;'))return reply(415,{error:'Ожидается форма'});let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>MAX_BODY)return reply(413,{error:'Файлы слишком большие'});chunks.push(chunk)}
 const request=new Request('http://localhost/api/enquiries',{method:'POST',headers:{'Content-Type':req.headers['content-type']},body:Buffer.concat(chunks)});const form=await request.formData();if(form.get('website'))return reply(400,{error:'Не удалось отправить форму'});
 const result=await submit(form,{token:process.env.TELEGRAM_BOT_TOKEN,chatId:process.env.TELEGRAM_CHAT_ID,fetcher:telegramFetch});reply(200,result);
 }catch(e){reply(e.status||400,{error:e.status?e.message:'Проверьте заполнение формы и размер файлов.'})}
});
server.requestTimeout=30000;server.headersTimeout=10000;
server.listen(Number(process.env.PORT||8787),'127.0.0.1',()=>console.log('Enquiry API listening on loopback'));
