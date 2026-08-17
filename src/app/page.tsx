import HomeLP from './HomeLP'
import { fetchNews } from '@/lib/news'

export default async function Home() {
  const news = await fetchNews()

  return <HomeLP news={news} />
}
