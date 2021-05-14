import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import styled from 'styled-components'

const Head = styled.header`
    height: 15vh; 
    display: flex; 
    align-items: center;
    width: 75%; 
    margin: auto; 
    justify-content: space-between;
`

const HeadLeft = styled.section`
    display: flex;
    align-items: center;
`

const HeadLeftLogo = styled.section`
    background: white;
    width: 3rem;
    border-radius: 50%;
    height: 3rem; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    margin-left: .5rem; 
    margin-right: 1rem;
`

const HeadLeftLogoH1 = styled.h1`
    color: blue; 
    font-family: 'Sarina', cursive;
    font-size: 1.4rem;
`
const HeadLeftTitle = styled(Link)`
    color: white;
    font-family: 'Poppins', san-serif;
    font-size: 1.5rem;
`

const HeadRight = styled.section`
    @media (min-width: 1023px){
        display: flex;
        margin-left: 1rem;
        margin-right: 1rem;
        align-items: center;
    }
`

const HeadRightButton = styled.button`
    background-color: white;
    width: 8rem;
    height: 2.5rem;
    border-radius: .5rem;
    color: white;
    font-family: 'Poppins', san-serif;  
    
    @media (max-width: 1023px){
        display: none;
    }
` 
const HeadRightA = styled(Link)`
    color: white;
    margin-left: 2rem;
    margin-right: 2rem;
    @media (max-width: 1023px){
        display: none;
    }
`
const HeadRightI = styled.i`
        color: white;
        margin-right: 1rem;
        margin-left: 1rem;
    
    &:hover{
        cursor: pointer;
    }
    @media (min-width:1023px){
        display: none;
    }
`


function Header() {
    
    const resMenu = useRef()
    const [navbarOpen, setNavbarOpen] = useState(false)

    const toggleResMenu = () => {
        resMenu.current.classList.toggle("")
        resMenu.current.classList.remove("hidden")
    }
    const HeadRightMobile = styled.section`
    position: absolute;
    background-color: white;
    z-index: 10;
    width: 100vw;
    height: 15vh;
    top: 12vh;
    left: 0;
    display: ${navbarOpen ? "flex": "none"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 1023px){
        display: none;
    }
`

    const HeadRightMobileButton = styled.button`
        background-color: blue;
        width: 10rem;
        height: 2rem;
        color: white;
    `
    const HeadRightMobileA = styled(Link)`
        color:blue;
        margin-top: .5rem;
    `

    return (
        <Head>
            <HeadLeft>
                <HeadLeftLogo
                >
                    <HeadLeftLogoH1>B</HeadLeftLogoH1>
                </HeadLeftLogo>
                <HeadLeftTitle to="/">BeTalk</HeadLeftTitle>
            </HeadLeft>
            <HeadRight>
                <HeadRightButton><Link style={{color: 'blue'}} to="/signup">Sign Up</Link></HeadRightButton>
                <HeadRightA className='text-blue-700 mx-8 md:hidden' to="/login">Login</HeadRightA>
                <HeadRightI onClick={() => setNavbarOpen(!navbarOpen)} className="fa fa-bars" aria-hidden="true"></HeadRightI>
            </HeadRight>
            <HeadRightMobile ref={resMenu}>
                <HeadRightMobileButton><Link href="/signup">Sign Up</Link></HeadRightMobileButton>
                <HeadRightMobileA className="text-blue-700 my-2 text-xl" to="/login">Login</HeadRightMobileA>
            </HeadRightMobile>
        </Head>
    )
}

export default Header
