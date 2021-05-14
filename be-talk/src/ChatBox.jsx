import React, {useState, useContext, useRef, useEffect} from 'react'
import AuthContext from './context/AuthContext'
import axios from 'axios'
import ContactsContext from './context/ContactsContext'
import ConversationsContext from './context/ConversationsContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'



const Buttons = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (max-width: 1023px){
        display: none;
    }
`

const ButtonsButton = styled.button`
    border-radius: 2rem;
    width: 8rem;
    height: 2.5rem;
    margin-right: 1rem;
    &:focus{
        outline: none;
    }
`

const ProfileImg = styled.div`
    border-radius: 50%;
    margin-right: 1rem;
    width: 3.5rem;
    height: 3.5rem;
    background-color: black;
    &:hover{
        cursor: pointer;
    }
    @media (max-width: 1023px){
        display: none;
    }
`
const ProfileImgUlLi = styled.li`
    height: 50%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: .5rem;
    &:hover{
        cursor: pointer;
    }
`
const ProfileImgUlLi2 = styled.li`
    height: 50%;
    width: 100%;
    &:hover{
        cursor: pointer;
    }

`
const SendMessageFormInput = styled.input`
    width: 66%;
    height: 3.5rem;
    border-radius: 2rem;
    background: transparent;
    border: 1px solid blue;
    padding-left: 2.5rem;
    &:focus{
        outline: none;
    }
`


const ChatBox = React.forwardRef(({mobile, setMobile, id}, ref) =>  {
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState()
    const [contactsToggle, setContactsToggle] = useState()
    const [contactsOpen, setContactsOpen] = useState()
    const [conversationModel, setConversationModel] = useState()
    const [selectedContactIds, setSelectedContactsIds] = useState([])

    const {getLoggedIn} = useContext(AuthContext)
    const {contacts, createContacts} = useContext(ContactsContext)
    const {conversations, createConversations, selectedConversation, sendMessage} = useContext(ConversationsContext)
    const idRef = useRef()
    const nameRef = useRef()
    async function logOut(){
        await axios.get("http://localhost:4000/auth/logout")
        getLoggedIn()
        window.location.reload(true)
    }


    const handleOnClick = () => {
        setMobile(false)
        ref.current.style.display = "flex"
      } 

    const MainChatBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 100%;
    align-items: center;
    margin-left: 1.5rem;
    @media (max-width: 1023px){
        display: ${mobile === true  ? "flex" : "none"};
        width: 100%;
        justify-content: center;
        margin-left: 2.5rem;
    }
`

    const ProfileImgUl = styled.ul`
    position: absolute;
    background-color: white;	
    height: 8rem;
    top: 6rem;
    right: 1rem;
    margin-top: .5rem;
    width: 3.5rem;
    padding-left: .5rem;
    border-radius: .5rem;
    display: ${toggle ? "flex": "none"};
    flex-direction: column;
    align-items: center;
`

const ChatContactModal = styled.div`
    height: 50%;
    width: 50%;
    position: absolute;
    background-color: white;
    left: 24rem;
    top: 2.5rem;
    flex-direction: column;
    align-items: center;
    display: ${contactsToggle ? "flex": "none"};
`
const ChatContactModalI = styled.i`
    height: 10%;
    width: 100%;
    padding-left: 1rem;
    padding-top: .5rem;
    font-size: 2rem;
`

const ChatContactModalUl = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 70%;
`
const ChatContactModalButton = styled.button`
    height: 10%;
    align-items: center;
    color: white;
    padding-left: 1rem;
    background-color: blue;
    width: 10.5rem;
`
const ChatCreateContactModal = styled.form`
    height: 50%;
    width: 50%;
    position: absolute;
    background-color: white;
    left: 24rem;
    top: 2.5rem;
    flex-direction: column;
    align-items: center;
    display: ${contactsOpen ? "flex": "none"};
`
const ChatCreateContactModalI = styled.i`
    height: 10%;
    width: 100%;
    padding-left: 1rem;
    padding-top: .5rem;
    font-size: 2rem;
`
const ChatCreateContactModalInputs = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ChatCreateContactModalInput = styled.input`
    border: 1px solid black;
    padding-left: 1rem;
    height: 2.5rem;
    width: 20rem;
    margin-top: 1.5rem;
`

const ChatCreateContactModalButton = styled.button`
    height: 10%;
    align-items: center;
    color: white;
    padding-left: 1rem;
    background-color: blue;
    width: 10.5rem;
`

const ChatConversationModal = styled.form`
    height: 50%;
    width: 50%;
    position: absolute;
    background-color: white;
    left: 24rem;
    top: 2.5rem;
    flex-direction: column;
    align-items: center;
    display: ${conversationModel ? "flex": "none"};
`
const ChatConversationModalI = styled.i`
    height: 10%;
    width: 100%;
    padding-left: 1rem;
    padding-top: .5rem;
    font-size: 2rem;
`

const ChatConversationModalConversation = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 70%;
`
const ChatConversationModalConversationDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    margin-lefft: 2.5rem;
`     
const ChatConversationModalCreateConversationButton = styled.button`
    height: 10%;
    align-items: center;
    color: white;
    padding-left: 1rem;
    background-color: blue;
    width: 10.5rem;
`

const ActualChat = styled.div`
    background-color: white;
    width: 100%;
    height: 70%;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    @media (max-width: 1023px){
        display: ${mobile === true ? "flex" : "none"};
        height: 90%;
        width: 95%;
    }
`
const ActualChatMessages = styled.div`
    height: 83%;
    width: 100%;
    display: flex;
    &:nth-child(1n+2){
        margin-top: -2rem;
    }
`

const ActualChatMessageRecAvatar = styled.div`
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    background: black;
    margin-top: .5rem;
    margin-left: .5rem;
`
const ActualChatMessageSent = styled.div`
    display: flex;
    width: 50%;
    height: 5rem;
    align-items: center;
    margin-left: 24rem;
`
const ActualChatMessageSentMsg = styled.div`
    background-color: blue;
    color: white;
    padding-left: .5rem;
    padding-top: .5rem;
    border-radius: .5rem;
    width: 83%;
    margin-top: 1rem;
    margin-left: .8rem;
`
const SendMessageForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
`
    const messageSend = (e) => {
        e.preventDefault()
        sendMessage(selectedConversation.recipients.map(r => r.id), text)
        setText('')
    }
    const hanldeCreateContacts = (e) => {
        e.preventDefault()
        createContacts(nameRef.current.value, idRef.current.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()        
        createConversations(selectedContactIds)
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactsIds(prevSelectedContactIds => {
          if (prevSelectedContactIds.includes(contactId)) {
            return prevSelectedContactIds.filter(prevId => {
              return contactId !== prevId
            })
          } else {
            return [...prevSelectedContactIds, contactId]
          }
        })
      }

      const [text, setText] = useState('')
      const handlechange = (e) => {
        setText(e.target.value)
      }

    return (
        <MainChatBox>
            <Buttons>
                <ButtonsButton style={{backgroundColor: 'blue',border: '1px transparent', color: 'white' }} onClick={() => setContactsToggle(true)}>Contacts</ButtonsButton>
                <ButtonsButton style={{backgroundColor: 'transparent',border: '1px solid blue', color: 'blue' }} onClick={() => setConversationModel(true)}>New Chat</ButtonsButton>
                <ProfileImg onClick={() => setToggle(!toggle)}></ProfileImg>
                <ProfileImgUl>
                    <ProfileImgUlLi><Link to="/profile" style={{fontSize: '.9rem'}}>Profile</Link></ProfileImgUlLi>
                    <ProfileImgUlLi2 onClick={logOut}><p className="text-sm">Logout</p></ProfileImgUlLi2>
                </ProfileImgUl>
            </Buttons>

            <ChatContactModal>
                <ChatContactModalI onClick={() => setContactsToggle(false)} className="fa fa-times" style={{fontSize: '2rem'}} aria-hidden="true"></ChatContactModalI>
                <ChatContactModalUl>
                    {contacts.map(contact => (
                        <li id={contact.id}>
                            {contact.name}
                        </li>
                    ))}
                </ChatContactModalUl>
                <ChatContactModalButton onClick={() => setContactsOpen(true)}>Add new contacts</ChatContactModalButton>
            </ChatContactModal>


            <ChatCreateContactModal 
            id="createContact"
            onSubmit={hanldeCreateContacts}
            className={`createContactModal h-1/2 w-1/2 absolute bg-white left-96 top-10 flex-col items-center ${ contactsOpen ?  "flex" : "hidden"}`}>
                <ChatCreateContactModalI onClick={() => setContactsOpen(false)} className="fa fa-times h-10% w-full pl-4 pt-2" style={{fontSize: '2rem'}} aria-hidden="true"></ChatCreateContactModalI>
                <ChatCreateContactModalInputs className="inputs h-70% flex flex-col justify-center items-center">
                    <ChatCreateContactModalInput ref={nameRef} required type="text" className="border border-black px-4 h-10 w-80 my-6" placeholder="Name"/>
                    <ChatCreateContactModalInput ref={idRef} required type="text" className="border border-black px-4 h-10 w-80" placeholder="Id"/>
                </ChatCreateContactModalInputs>
                <ChatCreateContactModalButton type='submit' className="h-10% items-center text-white px-2 bg-blue-500 w-42">Add new contacts</ChatCreateContactModalButton>
            </ChatCreateContactModal>

                        
            <ChatConversationModal 
            id="chatConversation"
            onSubmit={handleSubmit}
            className={`conversationsModal h-1/2 w-1/2 absolute bg-white left-96 top-10 flex-col items-center ${conversationModel ? "flex" : "hidden"}`}>
                <ChatConversationModalI onClick={() => setConversationModel(false)} className="fa fa-times h-10% w-full pl-4 pt-2" style={{fontSize: '2rem'}} aria-hidden="true"></ChatConversationModalI>
                <ChatConversationModalConversation className="flex flex-col w-full items-center justify-center min-h-70%">
                    {contacts.map(contact => (
                        <ChatConversationModalConversationDiv 
                        id={contact.id}
                        className="flex items-center w-full h-10 ml-10">
                            <input 
                            checked={selectedContactIds.includes(contact.id)}                         
                            type="checkbox" 
                            // checked="checked"
                            id={contact.id}
                            onChange={() => handleCheckboxChange(contact.id)}
                            style={{marginLeft: '1rem', marginRight: '1rem'}}
                            />
                            <label className="ml-4 text-xl" htmlFor={contact.id}>
                                {contact.name}
                            </label>
                        </ChatConversationModalConversationDiv>
                    ))}
                </ChatConversationModalConversation>
                <ChatConversationModalCreateConversationButton type="submit" className="h-10% items-center text-white px-2 bg-blue-500 w-42">Create Chat</ChatConversationModalCreateConversationButton>
            </ChatConversationModal>

            {selectedConversation && 
            <ActualChat
            style={{justifyContent: 'space-between',marginRight: '3rem',overflow: 'hidden'}}>
                <>
                <BackButton>
                    <MobileI onClick={() => handleOnClick()} className="fa fa-angle-left" aria-hidden="true"></MobileI>
                    <h1
                    style={{fontSize: '1.5rem', marginLeft: '1rem', fontFamily: "'Poppins', san-serif"}}
                    >{selectedConversation.recipients.map(r => r.name).join()}</h1>
                </BackButton>
                <div 
                style={{height: '80%', background: 'white', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}
                className="messages">
                    {selectedConversation.messages.map((message, index) => (
                        <>
                            <DesktopMessages
                            style={{background: `${message.fromMe ? "blue" : "gray"}`, marginRight: `${message.fromMe ? "5rem" : "35rem"}`}}
                            >{message.text}</DesktopMessages>
                            <MobileMessages
                            style={{background: `${message.fromMe ? "blue" : "gray"}`, marginRight: `${message.fromMe ? "1rem" : "2.5rem"}`}}
                            >
                                {message.text}
                            </MobileMessages>
                         </>
                    ))}
                </div>
                </>
                <SendMessageForm 
                style={{height: '20%'}}
                onSubmit={messageSend} className="sendMessage flex items-center justify-center w-full">
                    <SendMessageFormInput 
                    value={text}
                    autoFocus="true"
                    required
                    id="sendMessage"
                    onChange={handlechange}
                    type="text" placeholder="Enter Your Message"/>    
                    <button type="submit" ><i className="fa fa-telegram fa-4x text-blue-500 ml-6" 
                    style={{color: 'blue', marginLeft: '1rem'}}
                    aria-hidden="true"></i></button>
                </SendMessageForm>                    
            </ActualChat>}
            
        </MainChatBox>
    )
})

const BackButton = styled.div`
    display: flex; 
    align-items: center; 
    height: 5rem; 
    width: 100%;
    @media (min-width: 1023px){
        display: none;
    }
`

const MobileI = styled.i`
    font-size: 2rem;
    margin-left: 1rem;
    @media (min-width: 1023px){
        display: none;
    }
    &:hover{
        cursor: pointer;
    }
`

const DesktopMessages = styled.p`
    width: 20rem;
    height: auto; 
    margin-top: 1rem; 
    border-radius: 1rem; 
    padding: 1rem; 
    margin-bottom: .5rem; 
    color: white;
    @media (max-width: 1023px){
        display: none;
    }
`
const MobileMessages = styled.p`
    width: 18rem;
    height: auto; 
    margin-top: 1rem; 
    border-radius: 1rem; 
    padding: 1rem; 
    margin-bottom: .5rem; 
    color: white;
    @media (min-width: 1023px){
        display: none;
    }
`


export default ChatBox
