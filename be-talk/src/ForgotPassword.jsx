import axios from 'axios'
import React, {useState} from 'react'
import Header from './Header'
import styled from 'styled-components'

function ForgotPassword() {
    const [email, setEmail] = useState()

    const resetPassword = async (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/auth/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           
        }).catch(err=>{
            console.log(err)
        })
    }

    const Main = styled.div`
        background-color: white;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    `
    const Section = styled.section`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `
    const Form = styled.form`
        width: 33%;
        height: 66%;
        background-color: rgba(243, 244, 246, var(--tw-bg-opacity));	
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (max-width: 768px){
            width: 91%;
        }
    `

    const H1 = styled.h1`
        font-size: 2rem;
        color: black;
        margin-top: 2rem;
        text-align: center;
        @media (max-width: 768px){
            font-size: 1.5rem;
        }

    `
    const Div = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 60%;
        align-items: center;
        justifyp-content: space-evenly;
    `
    const Input = styled.input`
        width: 83%;
        background-color: white;
        height: 3rem;
        padding-left: 1rem;
    `

    const Button = styled.button`
        background-color: rgba(59, 130, 246, var(--tw-bg-opacity));	
        width: 83%;
        height: 3rem;
        color: white;
    `

    return (
        <Main className="login bg-white w-screen h-screen flex flex-col">
        <Header/>
        <Section className="w-full h-full flex justify-center items-center">
           <Form onSubmit={resetPassword} className="card w-1/3 h-4/6 bg-gray-100 rounded flex flex-col items-center lg:w-11/12	">
                <H1 className="text-3xl text-black my-10 sm:text-xl">Please Enter Your Email</H1>
                <Div className="inputs flex flex-col w-full items-center h-2/5 justify-evenly">
                    <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" placeholder="Email" className="w-5/6 bg-white h-12 px-4"/>
                </Div>
                <Button type="submit" className="bg-blue-500 w-5/6 h-12 text-white">Send Email</Button>
           </Form>
        </Section>
        </Main>
    )
}

export default ForgotPassword
