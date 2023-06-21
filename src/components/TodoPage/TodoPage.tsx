import { useEffect, useState } from 'react';
import * as Styled from './TodoPage.styled';
import * as Api from 'apis/todo';
import { ITodo } from 'interface/common';
import { Navigate } from 'react-router-dom';
import { SIGNIN_URL } from 'constants/route';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

export default function TodoPage() {
  const [todolist, setTodoList] = useState<ITodo[]>([]);

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
      <Styled.TodoList>
        {todolist.map((todo) => (
          <TodoItem key={todo.id} item={todo} setTodoList={setTodoList} />
        ))}
      </Styled.TodoList>
    </Styled.TodoPage>
  );
}
