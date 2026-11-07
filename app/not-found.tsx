import Link from 'next/link';
export default function NotFound(){return <main className="wrap section"><p>404</p><h1>Страница не найдена</h1><p style={{margin:'24px 0'}}>Возможно, ссылка устарела или страница была удалена.</p><Link className="button" href="/">Вернуться на главную</Link></main>}
