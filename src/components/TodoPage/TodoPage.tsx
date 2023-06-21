import { useEffect, useState } from 'react';
import * as Styled from './TodoPage.styled';
import * as Api from 'apis/todo';
import { ITodo } from 'interface/common';
import { Navigate } from 'react-router-dom';
import { SIGNIN_URL } from 'constants/route';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

export default function TodoPage() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  useEffect(() => {
    async function fetchTodo() {
      const access_token = localStorage.getItem('access_token') || '';
      const result = await Api.getTodos({ access_token });

      if ('message' in result) {
        console.log(result);
      } else {
        setTodoList(result);
      }
    }

    fetchTodo();
  }, []);

  const access_token = localStorage.getItem('access_token') || '';
  if (!access_token) return <Navigate to={SIGNIN_URL} />;

  return (
    <Styled.TodoPage>
      <AddTodoForm setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </Styled.TodoPage>
  );
}
