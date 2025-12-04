import { useContext } from 'react'
import { Context } from '../provider/ContextProvider'
function PageNav(params) {
    const { currPage, pageNumber }  = useContext(Context)
    
    return(
        <>
            <div className="pagination" aria-label="Pagination">
                <a href={`/articles?page=${currPage - 1}`} className={currPage === 1 || 0 ? 'disabled' :"page back"}>Back</a>
                {[...Array(pageNumber)].map((_, i) => {
                    const activPage = i + 1
                    return(
                    < a href = {`/articles?page=${activPage}`} 
                    key = { i } 
                    className = {`page${currPage === activPage ? "active" : ''}`} 
                    aria-current="page" >{i + 1} </a>
                    )
                })}
                <a href={`/articles?page=${currPage + 1}`} className={currPage === pageNumber ? 'disabled' : "page back" }>Next</a>
            </div>
        </>
    )
}
export default PageNav