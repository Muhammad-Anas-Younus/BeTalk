import React, {useContext, createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = createContext()
export default ContactsContext

export const ContactsContextProvider = ({children}) => {
    const [contacts, setContacts] = useLocalStorage("contacts", [])

    const createContacts = (name,id) => {
        setContacts(prevContacts => {
            return [...prevContacts, {id, name}]
        })
    }

    return (
        <ContactsContext.Provider value={{contacts, createContacts}}>
            {children}
        </ContactsContext.Provider>
    )
}

