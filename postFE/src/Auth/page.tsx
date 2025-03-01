"use client"
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from "js-cookie"

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

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log("id : %s, password : %s", formData.get("id"), formData.get("password"));
        try{
            await axios.post("http://localhost:8080/auth/login", {
                id : formData.get("id"),
                password : formData.get("password")
            },{
                withCredentials: true,
                headers : {"X-XSRF-TOKEN" : getCsrfToken()}
            }).then(function(response){
                alert("로그인 성공!");
                closeModal();
            });
        }
        catch{
            console.log("로그인 실패");
        }

    }

    return (
        <>
        <Modal isOpen={true} ariaHideApp={false} style={modalStyle} onRequestClose={closeModal}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">로그인: </label>
                <input type="text" name="id" id="id" /> <br />

                <label htmlFor="password">비밀번호: </label>
                <input type="password" name="password" id="password" />

                <button type='submit'>로그인</button>
            </form>
        </Modal>
        </>
      );
}