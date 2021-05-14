import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import ImageOne from './assets/screely-1620838784957.png'
import ImageTwo from './assets/screely-1620838807085.png'
import ImageThree from './assets/screely-1620838820763.png'
import ImageFour from './assets/screely-1620838835085.png'
import ImageFive from './assets/screely-1620838846793.png'
import ImageSix from './assets/screely-1620838854886.png'
import ImageSeventh from './assets/screely-1620838865254.png'
import ImageEight from './assets/screely-1620838875809.png'

const Main = styled.div`
    display: flex;
    flex-direction: column;
`
const Div = styled.div`
    width: 75%;
    margin: auto;
`
const Img = styled.img`
    width: 90%;
    margin: auto;
    margin-bottom: 1rem;
    @media (max-width: 768px){
        width: 100%;
    }
`

const H1 = styled.h1`
    font-size: 1.5rem;
    height: 3rem;
    width: 90%;
    margin: auto;
`

function HowItWorks() {
    return (
        <Main>
            <Header/>
            <Div className="howitworks">
                <H1>First,</H1>
                <Img src={ImageOne} alt="" />
                <H1>Then,</H1>
                <Img src={ImageTwo} alt="" />
                <Img src={ImageThree} alt="" />
                <Img src={ImageFour} alt="" />
                <Img src={ImageFive} alt="" />
                <Img src={ImageSix} alt="" />
                <Img src={ImageSeventh} alt="" />
                <Img src={ImageEight} alt="" />
                <H1>Enjoy!</H1>
            </Div>
            <Footer/>
        </Main>
    )
}

export default HowItWorks
