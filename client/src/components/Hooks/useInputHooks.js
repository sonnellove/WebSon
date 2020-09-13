import { useState } from 'react'

function useInputHooks(initialState) {
    const [value, setValue] = useState(initialState)
    
    const resetValue = () => {
        setValue(initialState)
    }

    const bindValue = {
        value,
        onChange: e =>{
            setValue(e.target.value)
        }
    }

    return [value, bindValue, resetValue]
}

export default useInputHooks
