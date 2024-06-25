import { createContext, useState, useEffect } from "react";
import {onAuthStateChangedListner, createUserDocFromAuth} from "../utils/firebase/firebase.utlis";

//as the actual value you want to acess
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: () => null
})

export const UserProvider =({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser}

    // signOutUser();
    
    useEffect(()=>{
       const unsubcribe =  onAuthStateChangedListner((user)=>{
        if(user){
            createUserDocFromAuth(user);
        }
        setCurrentUser(user);
        return unsubcribe
       })
    },[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

