import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = () => {
    if (newTodos.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodos }]);
      setNewTodos("");
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
    setNewTodos(todoToEdit.text);
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todos) =>
        todos.id === editingTodo.id ? { ...todos, text: newTodos } : todos
      )
    );
    setNewTodos("");
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex pt-10 bg-[#000000] justify-center w-full h-screen">
      <div className="w-[40%]">
        <div className="bg-[#FFFF] py-10">
          <div className="text-center pb-10">
            <h1 className="text-4xl font-bold">To-do list</h1>
          </div>
          <div className="flex flex-col gap-5">
            <div className="px-12">
              <input
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-transparent rounded-lg py-2 pl-2 border-2 border-blue-500 border-opacity-75 md:border-opacity-50"
                type="text"
                placeholder="Search..."
              />
            </div>
            <div className="px-12 flex items-center gap-4">
              <input
                value={newTodos}
                onChange={(e) => setNewTodos(e.target.value)}
                className="w-full bg-transparent rounded-lg py-2 pl-2 border-2 border-blue-500 border-opacity-75 md:border-opacity-50"
                type="text"
                placeholder="Add a new task..."
              />
              <button
                onClick={addTodo}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </div>
            <div className="px-12">
              <ul className="flex flex-col gap-5">
                {filteredTodos.map((todo, index) => (
                  <li
                    className=" flex items-center gap-2 border px-2 py-2"
                    key={todo.id}
                  >
                    <span className=" border border-black px-2 ">
                      {index + 1}{" "}
                    </span>
                    {todo.text}
                    <div className="flex ml-auto gap-3">
                      <button
                        onClick={
                          editingTodo ? updateTodo : () => editTodo(todo.id)
                        }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        {editingTodo ? "Save" : "Edit"}
                      </button>
                      <div>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
