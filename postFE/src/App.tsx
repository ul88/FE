"use client"
import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [page, setPage] = useState()

  async function fetchPage(){
    const {data} = await axios.get("http://localhost:8080/api/post", {
      params : {
        page : 1,
        size : 10
      }
    })
    console.log(data)
    
  }

  useEffect(()=>{fetchPage(), []})

  return (
    <>
      <nav className="navbar">
        <div className="logo">MyLogo</div>
        <ul className="nav-links">
            <li><a href="#">홈</a></li>
            <li><a href="#">소개</a></li>
            <li><a href="#">서비스</a></li>
            <li>
                <a href="#">
                    로그인
                </a>
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
    </main>
    </>
  )
}

export default App
