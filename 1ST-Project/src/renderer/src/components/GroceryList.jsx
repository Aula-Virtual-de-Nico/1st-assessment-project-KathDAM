import { useState } from 'react';
export default function GroceryList() {
    const [groceries, setGroceries] = useState([]);
    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const input = form.elements['itemName'];
        if (input.value === '') return;
        const newList = [...groceries, input.value];
        setGroceries(newList);
        input.value = '';
        input.focus();
    }
    function handleDelete(index) {
        const newList = groceries.filter((value, i) => i !== index);
        setGroceries(newList);
    }
    return (
        <div className="row gap-3">
            <form className="input-group mb-3" onSubmit={handleSubmit}>
                <input name="itemName" type="text" className="form-control" />
                <button className="btn btn-primary" type="submit">
                    Add
                </button>
            </form>
            <ul className="list-group">
                {groceries.map((grocery, index) => (
                    <li className="list-group-item" key={index}>
                        <span>{grocery}</span>
                        <button className="btn btn-danger float-end"
                            onClick={() => handleDelete(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}