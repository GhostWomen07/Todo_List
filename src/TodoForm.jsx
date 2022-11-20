import React, { useState } from 'react'

function TodoForm({ onAdd }) {
    const [taskName, setTaskName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(taskName);
        setTaskName("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button>+</button>
                <input type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder='your next task,...' />
            </form>
        </div>
    )
}

export default TodoForm