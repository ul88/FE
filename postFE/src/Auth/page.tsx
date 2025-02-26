"use client"
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from "js-cookie"

const apiUrl = "http://localhost:8080/"

export default function Auth(){
    const navigate = useNavigate();
    const getCsrfToken = () => Cookies.get("XSRF-TOKEN");

    console.log("csrf " + getCsrfToken())

    const closeModal = () => {
        navigate("/");    
    }

    const modalStyle = {
        overlay:{
            width: '300px',
            height: '400px',
            top: '25%',
            left: '35%'
        }
    }

    return (
        <>
        <Modal isOpen={true} ariaHideApp={false} style={modalStyle} onRequestClose={closeModal}>
            <form action="http://localhost:8080/auth/login" method='post'>
                <input type="hidden" name="_csrf" value={getCsrfToken()} />

                <label htmlFor="id">로그인: </label>
                <input type="text" name="id" id="id" /> <br />

                <label htmlFor="password">비밀번호: </label>
                <input type="password" name="password" id="password" />

                <input type="submit" value="로그인"/>
            </form>
        </Modal>
        </>
      );
}