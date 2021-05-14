import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import SecondHeader from './SecondHeader'
import axios from "axios"
import usePassword from './usePassword'
import styled from 'styled-components'
import {TextField, InputAdornment, makeStyles} from "@material-ui/core"
import VisibilityIcon from '@material-ui/icons/Visibility';
import {ToastContainer, toast}  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
    input: {
        width: "83%",
        backgroundColor: "rgba(239, 246, 255, var(--tw-bg-opacity))",	
        height: "3rem",        
        padding: "1rem"
    },
    icon: {
        "&:hover": {
            cursor: "pointer",
        }
    }
})

const MainSignUp = styled.div`
background-color: rgba(59, 130, 246, var(--tw-bg-opacity));	
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

const SignUpCard = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`

const SignUpForm = styled.form`
    width: 33.33%;
    height: 80%;
    background-color: white;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px){
        width: 91%;
    }
` 

const SignUpFormH1 = styled.h1`
    margin-top: 2rem;
    font-size: 2.5rem;
`

const SignUpFormInputs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    height: 60%;
    justify-content: space-evenly; 

`
const SignUpFormInput = styled.input`
    width: 83%;
    background-color: rgba(239, 246, 255, var(--tw-bg-opacity));	
    height: 3rem;
    padding: 1rem;
`

const SingUpFormI = styled.i`
    position: absolute;
    top: 27.8rem;
    left: 60%;
    &:hover{
        color: blue;
        cursor: pointer;
    }
    @media (max-width: 768px){
        top: 31.5rem;
        left: 75%;
    }

`

const SignUpFormButton = styled.button`
background-color: rgba(59, 130, 246, var(--tw-bg-opacity));	
    width: 83%;
    height: 3rem;
    color: white;
`

const SignUpP = styled.p`
    margin-top: 1rem;
`

const SignUpPA = styled(Link)`
    color: orange;
    text-decoration: underline;
`

function SignUp() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [inputType, toggle] = usePassword()
    const [errors, setErrors] = useState()

    async function signup(e){
        e.preventDefault()

        try{
            const registerData = {
                email, password
            }
            
            await axios.post("http://localhost:4000/auth/signup", registerData)
            window.location.reload(true)
            
        }   catch(err)    {
            setErrors(err.response.data.errorMessage)
            toast.warn(errors, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    const classes = useStyles()

    return (
        <MainSignUp className="singup bg-blue-500 w-screen h-screen flex flex-col">
            <SecondHeader/>
            <SignUpCard className="w-full h-full flex justify-center items-center">
               <SignUpForm onSubmit={signup} className="card w-1/3 h-4/6 bg-white rounded flex flex-col items-center lg:w-11/12	">
                    <SignUpFormH1 className="text-3xl my-6">Welcome!</SignUpFormH1>
                    <SignUpFormInputs className="inputs flex flex-col w-full items-center h-3/5 justify-evenly">
                        <TextField
                        InputProps={{
                            disableUnderline: true,
                        }}
                        type="text" placeholder="Name" className={classes.input}/>
                        <TextField type="text" placeholder="Email"  
                        value={email}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        onChange={(e) => setEmail(e.target.value)}                        
                        className={classes.input}/>
                        <TextField type={inputType} placeholder="Password" 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment className={classes.icon} onClick={toggle} >
                                    <VisibilityIcon />
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                        
                        className={classes.input}/>
                        {/* <SingUpFormI
                    onClick={toggle}
                    className="fa fa-eye absolute top-100 left-6/2 hover:text-blue-500 cursor-pointer" aria-hidden="true"></SingUpFormI> */}
                    </SignUpFormInputs>
                    <SignUpFormButton type="submit" className="bg-blue-500 w-5/6 h-12 text-white">Sign Up</SignUpFormButton>
                    {/* <h2 className="w-96 text-center border-b-2 leading-1 my-6 lg:w-72"><span className="bg-white text-md px-4">OR</span></h2>
                    <button className="bg-blue-500 w-5/6 h-12 text-white flex items-center">
                        <img className="mx-10 lg:mx-6" width="40rem" src="https://www.freepngimg.com/thumb/google/66903-google-pay-gboard-platform-logo-cloud.png" alt=""/>
                    Sign Up With Google</button> */}
                    <SignUpP className="my-4">Already have an account? <SignUpPA className="text-orange underline" to="/login">Login</SignUpPA></SignUpP>
               </SignUpForm>
            </SignUpCard>
            <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </MainSignUp>
    )
}

export default SignUp
