import React, {useState} from 'react'
import Header from './Header'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

function ResetPassword() {
    const [password, setPassword] = useState()
    const {token} = useParams()
    const history = useHistory()
    console.log(token)
    const PostData = ()=>{
        fetch("http://localhost:4000/auth/newPassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            history.push('/login')
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="login bg-white w-screen h-screen flex flex-col">
        <Header/>
        <section className="w-full h-full flex justify-center items-center">
           <form onSubmit={(e) => e.preventDefault()} className="card w-1/3 h-4/6 bg-gray-100 rounded flex flex-col items-center lg:w-11/12	">
                <h1 className="text-3xl text-black my-10 sm:text-xl text-center">Please Enter Your <br></br> New Password</h1>
                <div className="inputs flex flex-col w-full items-center h-2/5 justify-evenly">
                    <input  
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Enter Your New Password" className="w-5/6 bg-white h-12 px-4"/>
                </div>
                <button onClick={PostData} className="bg-blue-500 w-5/6 h-12 text-white">Reset Password</button>
           </form>
        </section>
        </div>
    )
}

export default ResetPassword
