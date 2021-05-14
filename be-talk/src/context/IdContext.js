import React, {createContext, useState} from 'react'
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const IdContext = createContext()
export default IdContext

export const IdContextProvider = (props) => {
    const [id, setId] = useState()

    const createId = () => {
        setId(uuidV4())
    }

    return(
        <IdContext.Provider value={{id, createId}}>
            {props.children}
        </IdContext.Provider>
    )
}

