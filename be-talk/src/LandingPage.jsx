import React from 'react'
import landingLogo from './assets/undraw_Online_messaging_re_qft3.svg'
import Header from './Header'
import styled from 'styled-components'
import screenshot from './assets/screely-1620838875809.png'
import {Link} from 'react-router-dom'
import Footer from './Footer'

const LandingMain = styled.section`
    width: 75%;
    margin: auto;
    min-height: 85vh;
    display: flex;
    align-items: center;
    overflow-x: hidden;
    @media (max-width: 1023px){
        width: 100%;
        flex-direction: column;
    }
`
const LandingLeft = styled.section`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    @media (max-width: 1023px){
        width: 100%;
        overflow-x: hidden;
        height: 85vh;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`
const LandingLeftH1 = styled.h1`
    font-size: 2.3rem;
    margin-top: .5rem;
    padding-left: .5rem;
    font-family: 'Poppins', san-serif;
    @media (max-width: 1023px){
        font-size: 2rem;
    }
`

const LandingLeftP = styled.p`
    font-size: 1.5rem;
    color: gray;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: .5rem;
    font-family: 'Poppins', san-serif;
`

const LandingLeftButton = styled.button`
    background-color: blue;
    width: 50%;
    height: 3rem;
    color: white;
    border-radius: .5rem;
    margin: .5rem;
    font-family: 'Poppins', san-serif;
`
const LandingRight = styled.section`
    width: 50%;
    display: flex;
    algin-items: center;
    justify-content: center;
    @media (max-width: 1023px){
        display: none;
    }
`
const LandingRightImg = styled.img`
    width: 80%;
`


function LandingPage() {
    return (
        <div className="landingPage ">
            <Header/>
            <LandingMain>
                <LandingLeft>
                    <LandingLeftH1 >Are you convinced that in order to stay connected you must sacrifise your data?</LandingLeftH1>
                    <LandingLeftP >Introducing BeTalk, a free messaging service, where you own your data.</LandingLeftP>
                    <LandingLeftButton><Link to="/signup">Get Started For Free</Link></LandingLeftButton>
                </LandingLeft>
                <LandingRight>
                    <LandingRightImg src={landingLogo} alt=""/>
                </LandingRight>
            </LandingMain>
            <HowItWorksDiv
            style={{}}
            className="secondPage">
                <h1 style={{fontSize: '3rem', fontFamily: '"Poppins", san-serif'}}>Chat With Your Friends</h1>
                <p style={{fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem', fontFamily: '"Poppins", san-serif'}}>Without Worrying about Privacy</p>
                <button
                style={{
                    height: '3rem',
                    width: '10rem',
                    background: 'blue',
                    color: 'white',
                    borderRadius: '.5rem',
                    marginBottom: '3rem'
                }}
                ><Link to="/how">See how it works</Link></button>
                <Img src={screenshot} alt=""/>
            </HowItWorksDiv>
            <Footer/>
        </div>
    )
}

const HowItWorksDiv = styled.div`
    height: 120vh; 
    width: 75%; 
    margin: auto; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
    @media (max-width: 768px){
        width: 90%;
    }
`

const Img = styled.img`
    width: 90%;
    @media (max-width: 768px){
        width: 100%;
    }
`

export default LandingPage
