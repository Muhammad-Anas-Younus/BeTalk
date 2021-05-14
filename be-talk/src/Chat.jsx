import React, {useContext, useEffect, useState, useRef} from 'react'
import axios from 'axios'
import AuthContext from './context/AuthContext'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'
import styled from 'styled-components'


const ChatMain = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #F0F0F0;
`


function Chat({id}) {
    const [mobile, setMobile] = useState(false)
    const sidebarRef = useRef()

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1023px)")
        if(mobile === true && mediaQuery.matches){
            setMobile(false)
            sidebarRef.current.style.display = "flex"
        }
    }, [mobile])

    return (
        <ChatMain>
            <Sidebar mobile={mobile} setMobile={setMobile} id={id} ref={sidebarRef}/>
            <ChatBox mobile={mobile} setMobile={setMobile} id={id} ref={sidebarRef}/>
        </ChatMain>
    )
}

export default Chat
