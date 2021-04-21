const ListItem = ({ item, togglePending, deleteItem }) => {

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteItem(item.id)
    }
    return (
        <li onClick={() => togglePending(item.id)} className={item.pending ? 'list-item' : 'list-item list-item-complete'}>
            { item.text}
            <button className="delete-btn" onClick={handleDelete}>X</button>
        </li >
    )
}

export default ListItem
