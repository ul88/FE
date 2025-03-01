"use client"
import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Auth/page'
import Cookies from "js-cookie"

function App() {
  const [pages, setPages] = useState<any[]>()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  console.log(pages)

  function moveButton(){
    const result = []
    if(!pages) return

    if(pages.prev == true){
      result.push(<a onClick={()=>setPageNumber(pages.startPage-1)}>prev&ensp;</a>)
    }

    for(let i = pages.startPage;i<=pages.endPage;i++){
      result.push(<a onClick={()=>setPageNumber(i)}>{i}&ensp;</a>)
    }

    if(pages.next == true){
      result.push(<a onClick={()=>setPageNumber(pages.endPage+1)}>next&ensp;</a>)
    }

    return result
  }

  useEffect(()=>{
    async function fetchPage(){
      const {data} = await axios.get("http://localhost:8080/api/post", {
        params : {
          page : pageNumber,
          size : pageSize
        }
      })

      try{
        await axios.get("http://localhost:8080", {
          withCredentials: true
        })
      }catch (error) {
        console.error("CSRF Token initialization error:", error);
      }
    
    
      setPages(data)
    }

    fetchPage()
  }
  ,[pageNumber])

  return (
    <>
    
      <nav className="navbar">
        <div className="logo">MyLogo</div>
        <ul className="nav-links">
            <li><a href="#">홈</a></li>
            <li><a href="#">소개</a></li>
            <li><a href="#">서비스</a></li>
            <li>
              <Link to="/auth/login">로그인</Link>
            </li>
            <li ><a href="#">회원가입</a></li>
            <li ><span>name</span></li>
            <li >
                <a href="javascript:void(0)">
                    로그아웃
                </a>
            </li>
            <li><a href="#">글쓰기</a></li>
        </ul>
        <div className="menu-toggle">☰</div>
    </nav>
    <main>
      { pages && pages.page.map((p: any) => (
        <div key={p.id}>
          <span>{p.title}&ensp;&ensp;&ensp;&ensp;</span>
          <span>{p.content}&ensp;&ensp;&ensp;&ensp;</span>
          <span>{p.userId}&ensp;&ensp;&ensp;&ensp;</span>
          <span>{p.likes}&ensp;&ensp;&ensp;&ensp;</span>
          <span>{p.views}&ensp;&ensp;&ensp;&ensp;</span>
          <span>{p.createdAt}&ensp;&ensp;&ensp;&ensp;</span>
        </div>
      ))}

      {moveButton()}
    </main>
    <Routes>
      <Route path="/auth/login" element={<Login/>}></Route>
    </Routes>
    </>
  )
}

export default App
