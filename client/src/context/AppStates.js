import { createContext, useState } from "react";

export const AppStates = createContext()

export const AppStatesProvider = ({ children }) => {
    const [collapse, setCollapse] = useState(false);
    const contextValues = {
        collapse, setCollapse
    }
    return (
        <AppStates.Provider value={contextValues}>
            {children}
        </AppStates.Provider>
    )
}