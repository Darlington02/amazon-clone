import React, {createContext, useContext, useReducer} from "react"

// the data layer
export const StateContext = createContext()

// build provider
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)