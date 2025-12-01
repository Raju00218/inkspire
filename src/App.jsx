import { useState } from 'react'
import './App.css'
import Nave from './components/nave'
import Footer  from './components/footer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from './components/loder'
const API_BASE = import.meta.env.VITE_API_URL
function App() {
const [article, setArticle]=useState([])
  const [loading, setLoading] = useState(true)
    

useEffect(()=>{
  const fetchArticle = async()=>{
    try{
      const res = await fetch(`${API_BASE}/articles`)
      if(!res.ok){
        throw new Error('Failed fetch article')
      }
      const data = await res.json()
      setArticle(data)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false); 
    }
  }
  fetchArticle();
},[])
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
      <Footer />
    </>
  )
}

export default (App)
