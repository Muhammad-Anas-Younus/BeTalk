import React, {createContext, useContext, useState, useCallback, useEffect} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import ContactsContext from './ContactsContext'
import SocketContext from './SocketContext'

const ConversationsContext = createContext()
export default ConversationsContext

export const ConversationsContextProvider = ({id, children}) => {
  const [conversations, setConversations] = useLocalStorage("conversations", [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

  const socket = useContext(SocketContext)
  
  function createConversations(recipients){
    setConversations(prevConversations => {
      return [...prevConversations, {recipients, messages: []}]
    })
  }



  const {contacts} = useContext(ContactsContext)

 
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })
    

    const selected = index === selectedConversationIndex
    return { ...conversation, messages , recipients, selected }
  })

  
  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConversations.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, text) {
    socket.emit('send-message', { recipients, text })
    
    addMessageToConversation({ recipients, text, sender: id })
  }


  const output = {
    conversations: formattedConversations, 
    selectedConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    createConversations
  }

  return (
    <ConversationsContext.Provider value={output}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}