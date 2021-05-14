import React, {createContext, useContext, useState, useRef, useEffect} from 'react'
import AuthContext from './context/AuthContext'
import ConversationsContext from './context/ConversationsContext'
import ContactsContext from './context/ContactsContext'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {InputAdornment} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    input: {
        backgroundColor: "white",
        borderRadius: "2rem",
        width: "18rem",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "3.5rem",
        "&:focus": {
            outline: "none",
        },
        ["@media (max-width: 1023px)"]: {
            width: "12rem",
            paddingLeft: '2rem',
            marginRight: '.5rem'
        }
    }
})

const MainSidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    min-height: 100%:
    align-items: center;
    @media (max-width: 1023px){
        width: 100%;
    }
`
const Search = styled.div`
    height: 20%:
    width: 100%:
    display: flex;
    align-items: center;
    justify-content: center;
`

const SearchI = styled.i`
    position: absolute;
    left: 5rem;
    top: 4rem;
    color: rgba(156, 163, 175, var(--tw-bg-opacity));
    @media (max-width: 768px){
        top: 3.8rem;
    }
`

const SearchInput = styled.input`
    background-color: white;
    border-radius: 2rem;
    width: 18rem;
    height: 3.5rem;
    padding-left: 4rem;
    &:focus{
        outline: none;
    }
    @media (max-width: 1023px){
        width: 12rem;
        margin-right: 1rem;
    }
`

const CurrentChats = styled.div`
    background-color: white;
    width: 18rem;
    height: 70%;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
`

const ChatLine = styled.div`
    width: 8rem;
    height: 0.125rem;
    background-color: rgba(229, 231, 235, var(--tw-bg-opacity));	
    position: absolute;
    top: 5rem;
    left: 5rem;
`
const ChatLeft = styled.div`
    height: 100%:
    width: 30%:
    display: flex;
    align-items: center;
    justify-content: center;
`
const BackgroundImg = styled.div`
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    background-color: black;
`
const ChatRight = styled.div`
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const ChatRightH4 = styled.h4`
    color: black;
`

const ChatRightP = styled.p`
    color: rgba(156, 163, 175, var(--tw-bg-opacity));
`

const ProfileImg = styled.div`
    border-radius: 50%;
    margin-right: 1rem;
    width: 3.5rem;
    height: 3.5rem;
    // background-image: url("https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar");
    background-color: black;
    &:hover{
        cursor: pointer;
    }
    @media (min-width: 1023px){
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

const Sidebar = React.forwardRef(({mobile,setMobile,id}, ref) =>  {
    const {getLoggedIn} = createContext(AuthContext)
    const [toggle, setToggle] = useState(false)
    const {contacts, createContacts} = useContext(ContactsContext)
    const {conversations, selectedConversationIndex, createConversations} = useContext(ConversationsContext)
    const [contactsToggle, setContactsToggle] = useState()
    const [contactsOpen, setContactsOpen] = useState()
    const [conversationModel, setConversationModel] = useState()
    const [selectedContactIds, setSelectedContactsIds] = useState([])
    const nameRef = useRef()
    const idRef = useRef()

    async function logOut(){
        await axios.get("http://localhost:4000/auth/logout")
        getLoggedIn()
        window.location.reload(true)
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

      const ProfileImgUl = styled.ul`
      position: absolute;
      background-color: white;	
      height: 8rem;
      top: 6rem;
      right: 3.8rem;
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
    width: 80%;
    position: absolute;
    background-color: white;
    left: 50%;
    top: 50%;
    flex-direction: column;
    align-items: center;
    display: ${contactsToggle ? "flex": "none"};
    transform: translate(-50%,-50%);
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
    width: 80%;
    position: absolute;
    background-color: white;
    left: 50%;
    top: 50%;
    flex-direction: column;
    align-items: center;
    display: ${contactsOpen ? "flex": "none"};
    transform: translate(-50%,-50%);
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
    width: 15rem;
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
    width: 80%;
    position: absolute;
    background-color: white;
    left: 50%;
    top: 50%;
    flex-direction: column;
    align-items: center;
    display: ${conversationModel ? "flex": "none"};
    transform: translate(-50%,-50%);
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

    const ChatConversation = styled.div`
    height: 5rem;
    width: 100%:
    display: flex;
    align-items: center;
    position: relative;
    margin-top: .5rem;
    &:hover{
        cursor: pointer;
    }
`
    const ActiveChat = styled.span`
        width: .7rem;
        height: .7rem;
        background: blue;
        border-radius: 50%; 
        position: absolute; 
        left: .5rem;
        top: 1rem;
    `
    const sidebarRef = useRef()
    const handleOnClick = (index) => {
        selectedConversationIndex(index)
        const mediaQuery = window.matchMedia("(max-width: 1023px)")
        if(mediaQuery.matches){
            ref.current.style.display = "none"
            setMobile(true)
        }
    }

    const classes = useStyles()

    const [search, setSearch] = useState("")

    return (
        <MainSidebar ref={ref} className="flex flex-col w-30% min-h-full items-center ">
            <Search id="seacrh" className="h-20% w-full flex items-center justify-center">
                <TextField
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                className={classes.input}
                value={search}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                    disableUnderline: true,
                }}
                />
                <ProfileImg onClick={() => setToggle(!toggle)}></ProfileImg>
                <ProfileImgUl>
                    <ProfileImgUlLi><Link to="/profile" style={{fontSize: '.9rem'}}>Profile</Link></ProfileImgUlLi>
                    <ProfileImgUlLi2 onClick={logOut}><p className="text-sm">Logout</p></ProfileImgUlLi2>
                </ProfileImgUl>
            </Search>
            <CurrentChats id="chatbox" className="bg-white w-72 min-h-70% rounded-lg flex flex-col">
                    {conversations.filter((conversation) => {
                        if(search == ''){
                            return conversation
                        }
                        else if (conversation.recipients.map(r => r.name.toLowerCase()).includes(search.toLowerCase())){
                            return conversation
                        }
                    }).map((conversation, index) => (
                        <ChatConversation
                        id={index}
                        onClick={() => handleOnClick(index)}
                        // style={{background: `${conversation.selected ? "lightblue": "none"}`}}
                        className={`h-15% w-full flex items-center relative my-2`}> 
                        <ChatLine className="line w-32 h-0.5 bg-gray-200 absolute top-20 left-20"></ChatLine>
                        <ChatLeft className="left h-full w-30% flex items-center justify-center"> 
                            <ActiveChat
                            style={{ display: `${conversation.selected ? "block" : "none"}`}}
                            ></ActiveChat>
                            <BackgroundImg ></BackgroundImg> 
                        </ChatLeft> 
                        <ChatRight className="right h-full w-70% flex flex-col justify-center">
                            <ChatRightH4>
                                {conversation.recipients.map(r => r.name).join(", ")}
                            </ChatRightH4>
                            <ChatRightP className="text-gray-400">
                                {conversation.messages.length > 0  ? conversation.messages.slice(-1)[0].text : "No Messages Yet"}
                            </ChatRightP>
                        </ChatRight>
                    </ChatConversation> 
                    ))}
                        
            </CurrentChats>
            <MobileButtons className="buttons">
                <button
                onClick={() => setConversationModel(true)}
                style={{
                    width: '7rem',
                    background: 'blue',
                    color: 'white',
                    borderRadius: '1rem',
                    border: 'none'
                }}
                >New Chat</button>
                <button
                onClick={() => setContactsToggle(true)}
                style={{
                    width: '7rem',
                    background: 'transparent',
                    color: 'blue',
                    borderRadius: '1rem',
                    border: '1px solid blue'
                }}
                >Contacts</button>
            </MobileButtons>
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
                            checked={selectedContactIds && selectedContactIds.includes(contact.id)}                         
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
        </MainSidebar>
    )
})

const MobileButtons = styled.div`
    display: flex;
    margin-top: 1rem;
    height: 2.5rem;
    width: 65%;
    justify-content: space-between;
    @media (min-width: 1023px){
        display: none;
    }
`

export default Sidebar
