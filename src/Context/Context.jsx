import { createContext, useContext, useState } from "react";

export let DataContext = createContext(null);

export let UseCustomContext = ()=>{
    return useContext(DataContext);
}

export let ContextProvider = (props)=>{
    let [count , setCount] = useState(0)
    return(
        <DataContext.Provider value={{count,setCount}}>
            {props.children}
        </DataContext.Provider>
    )
}
