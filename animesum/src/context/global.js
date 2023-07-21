import React, {createContext} from "react";

const GlobalContext = createContext();

// GlobalContextProvider is a component that wraps around the entire app.
export const GlobalContextProvider = ({children}) => {
    return(
        <GlobalContext.Provider VALUE={'hello'}>
            {children}
        </GlobalContext.Provider>
    )
}

// allow us to use the global context in any component we want.
export const useGlobalContext = () => {
    return useContext(GlobalContext);
}