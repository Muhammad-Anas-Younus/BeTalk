import React, {useContext} from 'react'
import IdContext from './context/IdContext'
import {v4 as uuidV4} from 'uuid'
import styled from 'styled-components'

function Profile({ID, showID}) {
    const createID = () => {
        ID(uuidV4())
    }

    const MainProfile = styled.div`
        width: 66%;
        display: flex;
        flex-direction: column;
        margin: auto;
        height: 100vh;
        justify-content: center;
    `
    const IdDiv = styled.div`
        margin-top: 2.5rem;
        margin-left: 1rem;
    `
    const ShowIdDIv = styled.div`
        border-radius: 1rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        height: 2.5rem;
        border: 1px solid black;
        width: 100%;
        margin-bottom: 1rem;
    `
    const Button = styled.button`
        width: 10rem;
        height: 2.5rem; 
        background-color: blue;
        border-radius: 1rem;
        color: white;
        &:focus{
            outline: none;
        }

    `

    return (
        <MainProfile className="w-8/12 flex flex-col m-auto h-screen justify-center">
            <IdDiv className="id mt-6 ml-2">
                <h1 className="text-xl mb-4">Your Id</h1>
                <ShowIdDIv className="border flex items-center px-2 h-10 border-black rounded w-full mb-4">{showID}</ShowIdDIv>
                <Button onClick={createID} className="w-32 h-10 bg-blue-500 rounded text-white ">Create Id</Button>
            </IdDiv>
        </MainProfile>
    )
}

export default Profile
