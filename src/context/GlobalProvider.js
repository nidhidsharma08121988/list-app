import { useEffect, useState } from "react"
import GlobalContext from "./GlobalContext"

const GlobalProvider = ({ children }) => {
    const [state, setState] = useState({ list: [] })

    //fetch data
    const fetchData = async (path) => {
        const res = await fetch(`http://localhost:5000/${path}`);
        const data = await res.json();
        return data;
    }

    //get List
    const getList = async () => {
        const path = 'list';
        const list = await fetchData(path);
        setState({ ...state, list: list });
    }

    //on load fetch data
    useEffect(() => {
        getList();
    }, [])


    return (
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider