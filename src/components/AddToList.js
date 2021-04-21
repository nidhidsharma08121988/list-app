import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const AddToList = () => {
    const [text, setText] = useState('');
    const [state, setState] = useContext(GlobalContext);
    const addListItem = async (obj) => {
        const content = { ...obj };
        const requestOption = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(content),
        };
        const res = await fetch('http://localhost:5000/list', requestOption);
        const data = await res.json();
        return data;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (text === '')
            return
        else {
            const newItem = {
                text: text,
                pending: true
            }

            let data = await addListItem(newItem);
            setState({ ...state, list: [...state.list, data] })
        }
        setText('');
    }
    return (
        <form className='add-to-list'>
            <input type="text" className="text-input" aria-multiline="true" value={text} onChange={e => setText(e.target.value)} />
            <input type="submit" className="btn" value='Add to list' onClick={handleClick} />
        </form >
    )
}

export default AddToList
