import Nave from './components/nave'
import Footer from './components/footer'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Quill from 'quill'
import Loader from './components/loder'
import { Link } from 'react-router-dom'

const API_BASE =import.meta.env.VITE_API_URL

function ShowArticle(params) {
    const {id}= useParams()
    const [detailArticle, setDetailArticle]=useState([])
    const [athor,setAthor]=useState('')
       const [loading, setLoading] = useState(false)
useEffect(()=>{
    const fetchData =async()=>{
    setLoading(true)
    try{
        const res = await fetch(`${API_BASE}/articles/${id}`)
        
        const result = await res.json()
        setAthor(result.userId.username)
        setTimeout(() => { 
            setLoading(false), 
            setDetailArticle(result) 
        },200);
    } catch (err) {
        console.log(err)
    }
  }
  
 fetchData()
},[])

useEffect(()=>{
    if(detailArticle?.body){
        const quill = new Quill('.article-body', {
            theme: null,
            readOnly: true,
            modules: { toolbar: false }
        })
        quill.setContents(detailArticle.body)}
},[detailArticle])

    const date = detailArticle.createdAt ? new Date(detailArticle.createdAt):null
    const formattedDate = date?.toLocaleDateString('en-US',{
        month: 'long',
        day:'numeric',
        year: 'numeric'
    })
    return(
        <>
            <Nave />
            {loading && <Loader />}
            {detailArticle?.body ?<div className="container">
                <div className='article-card'>
                    <div className="article-content" >
                        <div>
                            <div>
                                <h2 className="article-title">{detailArticle.title}</h2>
                                <p className='article-snippet'>{detailArticle.snippet}</p>
                                <div className="article-meta">
                                    <span className="author-name">published by {athor}</span>
                                    <span className="pub-date">Published on {formattedDate} </span>
                                </div>
                                <div className='article-body'></div>
                            </div>
                        </div>
                    </div>
                </div>
                {detailArticle?.body ?<div className="back-link-wrapper">
                    <Link to="article" className="back-link">
                        &larr; Back to all articles
                    </Link>
                </div>: ''}
            </div>:<div className='empty-detailArticle-div'></div>}
            <Footer />
        </>
    )
}
export default ShowArticle