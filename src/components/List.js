import { useContext } from "react"
import GlobalContext from "../context/GlobalContext";
import ListItem from "./ListItem"
import Spinner from "./Spinner";

const List = () => {

    const [state, setState] = useContext(GlobalContext);

    const deleteListItem = async (id) => {
        const requestOption = {
            method: 'DELETE'
        }

        const res = await fetch(`http://localhost:5000/list/${id}`, requestOption);
        const data = await res.json();
        //set state data is empty
        const updatedList = state.list.filter(item => item.id !== id);

        setState({ ...state, list: updatedList })

    }
    const deleteItem = (id) => {
        deleteListItem(id);
    }

    const updateList = async (id) => {
        const item = state.list.find(value => value.id === id);
        const updatedItem = { ...item, pending: !item.pending }
        const requestOption = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        }
        const res = await fetch(`http://localhost:5000/list/${id}`, requestOption)
        const data = await res.json();
        return data;
    }

    const togglePending = async (id) => {
        const updatedData = await updateList(id);
        const updatedList = [...state.list.filter(myItem => myItem.id !== updatedData.id), updatedData]
        setState({
            ...state,
            list: updatedList,
        })
    }

    const { list } = state;

    if (list.length === 0 || list === undefined)
        return <Spinner />
    else {

        const listPending = list.filter(item => item.pending)
        const listCompleted = list.filter(item => !item.pending)

        const dipList = (<ul className='list'>
            <div className='list-pending'>
                {
                    listPending.map((item, index) => {
                        return <ListItem item={item} key={index} deleteItem={deleteItem} togglePending={togglePending} />
                    })
                }
            </div>
            <div className='list-completed'>
                {
                    listCompleted.map((item, index) => {
                        return <ListItem item={item} key={index} deleteItem={deleteItem} togglePending={togglePending} />
                    })
                }
            </div>
        </ul>);

        return dipList;

    }
}

export default List
