import React, { useState } from 'react'

function usePassword() {
    const [visible, setVisible] = useState(false)

    const toggle = () => {
        setVisible(!visible)
    }

    const inputType = visible ? "text" : "password"
    return [inputType, toggle]
}

export default usePassword
