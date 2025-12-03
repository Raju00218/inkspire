import {Routes,Route} from 'react-router-dom'
import ArticleEditer from './postArticle'
import App from './App'
import ShowArticle from './showArticle'
import Login from './components/login'
import { useContext } from 'react'
import { Context } from './provider/ContextProvider'
import ProtectedRoutes from './protectedRouets/protectRoutes'
import Loader from './components/loder'
function RoutePage(params) {
     const { loginPop }  = useContext(Context)
     const { logoutLoading, } = useContext(Context)
     const {openMenu, isMenuOpen} =useContext(Context)
    return(
       <>
            <Routes>
             <Route path="/" element={<App />} />
             <Route path="/articles" element={<App />} />
             <Route path="/article_editor" 
              element={
              <ProtectedRoutes>
                    <ArticleEditer />
              </ProtectedRoutes>
             }/>
              
             <Route path="/articles/:id" element={<ShowArticle />} />
            </Routes>
            {loginPop && <Login />}
             {logoutLoading && <Loader />}
                <div className={`${openMenu ? 'cover' : ''}`} onClick={isMenuOpen}></div>
       </>
    )
}
export default RoutePage
