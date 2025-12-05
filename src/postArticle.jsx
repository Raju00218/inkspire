import { useEffect,useState } from "react";
import React from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import './App.css'
import Nave from "./components/nave";
import Footer from './components/footer'
import { useNavigate } from "react-router-dom";

import { Context } from './provider/ContextProvider'
import { useContext } from "react";
import Loader from './components/loder'

const API_BASE = import.meta.env.VITE_API_URL
const Font = Quill.import("formats/font");
Font.whitelist = ["Inter", "Ubuntu", "Poppins", 'Nunito', 'Alegreyasc','Natasans', 'sans-serif', 'monospace'];
Quill.register(Font, true);

function ArticleEditer() {
const {userId} = useContext(Context)
 const [loading, setLoading] = useState(false)
 console.log(userId)

  const navigate= useNavigate()
  const [editer, setEditer] = useState(null)
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direc;tion

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],     
    [{ 'font': Font.whitelist }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  useEffect(() => {
    const editorContainer = document.getElementById('editer')
    if (editorContainer && !editer) {
      editorContainer.innerHTML = ""; // ✅ clear old toolbar/editor
      const quill = new Quill("#editer", {
        theme: "snow",
        modules:{
          toolbar:toolbarOptions,
        }
      });
      setEditer(quill);
    }
  },[]);
  const handleUpload=async(e)=>{
    let error = null
    e.preventDefault();
    const formData = new FormData(e.target);
    if(editer){
      const delta = editer.getContents()
      const title =  formData.get('article-title')
      const snippet = formData.get('article-snippet')
      setLoading(true)
      try{
        const res = await fetch(`${API_BASE}/articles`,{
          method:"POST",
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({body:delta,title,snippet,userId})
        })
        const response = await res.json()
        if (response.error){
          error = response.error
        }
      }catch(err){
        error = err.message
        console.log(error)
      }finally{
        if (res.ok) {
          setTimeout(() => {
            setLoading(false),
              navigate('/')
          }, 1000);
        }

      }
    }
    if(!error){
      e.target.reset()
      editer.setContents([])
    }

  }

  return (
    <>
      <Nave />
      {loading && <Loader />}
      <div >
      <div className="editor-wraper" >
          <form className="postArticle" onSubmit={handleUpload}>
            <input type="text"
              name="article-title"
              className='in-name'
              placeholder='Article name'
              required />
            <input type="text"
              name="article-snippet"
              className='last-name'
              placeholder='Sippet'
              required />
            <div className="article-editor">
              <div id="editer" style={{ height: "300px" }} ></div>
              {/* <button className="upload-article-btn" onClick={handleUpload} >Upload Article</button> */}
            </div>
            <button type="submit" className="upload-article-btn" >upload</button>
          </form>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default ArticleEditer