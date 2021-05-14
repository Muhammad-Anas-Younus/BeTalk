import React from 'react'
import styled from 'styled-components'

const Main = styled.footer`
    height: 25vh;
    width: 100%; 
    background-color: blue;
`

const H1 = styled.h1`
    font-size: 1.2rem;
    color: white;
    width: 70%;
    height: 60%;
    margin: auto;
    display: flex;
    align-items: center;
    font-family: "Poppins", san-serif;
    @media (max-width: 768px){
        font-size: 1rem;
    }
`
const P = styled.p`
    font-size: 1rem;
    color: white;
    width: 70%;
    height: 40%;
    margin: auto;
    display: flex;
    font-family: "Poppins", san-serif;
    @media (max-width: 768px){
        font-size: .8rem;
    }
`

const Footer = () => {
    return (
        <Main>
            <H1
            >Created for fun by <a href="#">@Muhamamd Anas</a></H1>
            <P
            > © Source code available <a href="#">@Github</a></P>
        </Main>
    )
}

export default Footer
