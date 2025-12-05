import { useContext, useEffect } from 'react'
import { Context } from '../provider/ContextProvider'
import { Link } from 'react-router-dom'
function PageNav(params) {
    const { currPage, pageNumber, setCurrPage, activPage, setActivPage }  = useContext(Context)
    useEffect(()=>{
        setCurrPage(Number.isNaN(currPage) ? 1 : currPage)
    },[currPage])

    return(
        <>
            <div className="pagination" aria-label="Pagination">
                {!Number.isNaN(currPage) && <Link to={`/articles?page=${currPage - 1}`} className={currPage === 1 || 0 ? 'disabled' : "page back"}>Back</Link>}
                {[...Array(pageNumber)].map((_, i) => {
                    setActivPage( i + 1)
                    return(
                    <Link to={`/articles?page=${activPage}`} 
                    key = { i } 
                    className = {`page${currPage === activPage ? "active" : ''}`} 
                    aria-current="page" >{i + 1} </Link>
                    )
                })}
                <Link to={`/articles?page=${currPage + 1}`} className={currPage === pageNumber ? 'disabled' : "page back" }>Next</Link>
            </div>
        </>
    )
}
export default PageNav