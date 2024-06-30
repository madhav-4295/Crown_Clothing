import { createContext, useState , useEffect} from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utlis";
export const CategoriesContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(()=>{
        const getCateriesMap = async () =>{
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap)
            setCategoriesMap(categoryMap);
        }
        getCateriesMap()
    },[])
    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}