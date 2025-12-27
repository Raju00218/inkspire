import { useState } from 'react'
import './App.css'
import Nave from './components/nave'
import Footer  from './components/footer'
import { useEffect } from 'react'
import { Link,useSearchParams } from 'react-router-dom'
import Loader from './components/loder'
import { useContext } from 'react'
import { Context } from './provider/ContextProvider'
import PageNav from './components/pagination'
const API_BASE = import.meta.env.VITE_API_URL

function App() {
  const { setCurrPage, setPageNumber } = useContext(Context)
  // getting search query from url
  const [ searchParams ] = useSearchParams()
  const currPage = parseInt(searchParams.get("page")||'1')
  
const [article, setArticle]=useState([])
  const [loading, setLoading] = useState(false) // pre load when article fetching
useEffect(()=>{
  const fetchArticle = async()=>{
    setLoading(true)
    try{
      const res = await fetch(`${API_BASE}/articles?page=${currPage}`)
      if(!res.ok){
        throw new Error('Failed fetch article')
      }
      const data = await res.json()
      setArticle(data.articles)
      setPageNumber(data.totalPage)
      setCurrPage(currPage)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false); 
    }
  }
  fetchArticle();
},[currPage])
  return (
    <>
    <Nave    />

     <div className='main-page'>
        {loading ? <Loader /> : <div className='article-container'>
          <h1>articles</h1>
          <div>
            <ul className='article-ul'>
              {article.map(article => (
                <li key={article._id} className="article-item">
                  <Link to={`/articles/${article._id}`} className="article-link">
                    <h3>{article.title}</h3>
                    <p>{article.snippet}</p>
                  </Link>
                  <div className='date'>
                    <p className="pub-date">{new Date(article.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>}
     </div>
      {article.length > 0 && <PageNav />}
      <Footer />
    </>
  )
}

export default (App)
