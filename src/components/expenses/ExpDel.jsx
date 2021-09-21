const ExpDel = (props) => {

    // *** this needs to be called form view all delete button
    const deleteExpense = (expense) => {
        fetch(`http://localhost:3000/expense/delete/{expense.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'props.token'
            })        
    })
    .then(() => props.viewAll()) // *** need to know the correction function name
}
    
    return ( <>
        
    </> );
}
 
export default ExpDel;