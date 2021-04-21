const ListItem = ({ item, togglePending }) => {

    return (
        <li onClick={() => togglePending(item.id)} className={item.pending ? 'list-item' : 'list-item list-item-complete'}>
            { item.text}
        </li >
    )
}

export default ListItem
