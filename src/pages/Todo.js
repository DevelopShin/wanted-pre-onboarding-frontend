import Item from 'Components/Item';
import axios from 'axios';
import useInput from 'hooks/useInput';
import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Todo() {
  const [newTodo, onChangeNewTodo, setNewTodo] = useInput('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const access_token = localStorage.getItem('access_token');

  if (!access_token) {
    navigate('/signin');
  }

  useEffect(() => {
    const getTodos = async () => {
      await axios.get('api/todos').then((res) => {
        let data = res.data;
        data.sort((a, b) => (a.id > b.id ? -1 : 1));
        setTodos(data);
      });
    };
    getTodos();
  }, []);
  const submitCreate = useCallback(async () => {
    await axios
      .post('api/todos/', { todo: newTodo })
      .then((res) => {
        res.data.id && setTodos([res.data, ...todos]);
        setNewTodo('');
      })
      .catch((error) => console.log('에러: ', error));
  }, [newTodo, setNewTodo, todos]);

  return (
    <div className="todo">
      <div className="edit-form">
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={onChangeNewTodo}
        />

        <button data-testid="new-todo-add-button" onClick={submitCreate}>
          추가
        </button>
      </div>
      <br />
      <ul className="todo-list">
        {todos.map((todo) => (
          <Item key={todo.id} data={todo} />
          // <div key={i}>hi</div>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
