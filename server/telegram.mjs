import {randomUUID} from 'node:crypto';
export const MAX_BODY=12*1024*1024;
export async function submit(form,{token,chatId,fetcher=fetch}){
 const read=(key,max=200)=>{const v=form.get(key);if(v!==null&&typeof v!=='string')throw Error('Некорректное поле');const s=(v||'').trim();if(s.length>max)throw Error('Слишком длинное поле');return s;};
 const name=read('name',100),phone=read('phone',30),consent=read('consent',10);
 if(name.length<2||!/^\+7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(phone)||consent!=='yes')throw Error('Проверьте имя, телефон и согласие');
 const district=read('district'),address=read('address',500),service=read('service'),comment=read('comment',1500),details=read('details',1000);
 const files=form.getAll('files').filter(f=>typeof f!=='string'&&f.size);
 if(files.length>5||files.reduce((n,f)=>n+f.size,0)>10*1024*1024||files.some(f=>!/^.+\.(pdf|png|jpe?g|docx?)$/i.test(f.name)))throw Error('Допустимо до 5 файлов PDF, JPG, PNG, DOC/DOCX, суммарно до 10 МБ');
 if(!token||!chatId)throw Object.assign(Error('Приём заявок ещё не настроен'),{status:503});
 const id=randomUUID();
 async function call(method,body){const r=await fetcher(`https://api.telegram.org/bot${token}/${method}`,{method:'POST',body,signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('Telegram временно недоступен');const j=await r.json();if(!j.ok)throw Error('Telegram не принял сообщение');return j.result;}
 const body=new FormData();body.set('chat_id',chatId);body.set('text',`Новая заявка ${id}\nИмя: ${name}\nТелефон: ${phone}\nРегион: Республика Калмыкия\nРайон: ${district||'Не указан'}\nАдрес: ${address||'Не указан'}\nУслуга: ${service||'Консультация'}\nКомментарий: ${comment||'Нет'}\n${details?`Параметры: ${details}\n`:''}Согласие на обработку: получено`);
 let message;try{message=await call('sendMessage',body)}catch{throw Object.assign(Error('Не удалось подтвердить доставку. Свяжитесь с компанией перед повторной отправкой.'),{status:502})}
 let failed=0;for(const file of files){const payload=new FormData();payload.set('chat_id',chatId);payload.set('document',file,file.name.replace(/[\r\n]/g,'_'));payload.set('caption',`Заявка ${id}`);payload.set('reply_parameters',JSON.stringify({message_id:message.message_id}));try{await call('sendDocument',payload)}catch{failed++}}
 return {ok:true,id,warning:failed?'Заявка доставлена, но часть файлов отправить не удалось. Передайте их специалисту отдельно.':undefined};
}
