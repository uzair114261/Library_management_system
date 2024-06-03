import { createContext,useEffect, useState } from "react";

export const AppStates = createContext()

export const AppStatesProvider = ({ children }) => {
    const [collapse, setCollapse] = useState(true);
  
    const contextValues = {
        collapse, setCollapse
    }
    return (
        <AppStates.Provider value={contextValues}>
            {children}
        </AppStates.Provider>
    )
}