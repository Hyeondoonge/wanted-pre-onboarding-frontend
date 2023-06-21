import { useEffect, useState } from 'react';
import * as Styled from './TodoPage.styled';
import * as Api from 'apis/todo';
import { ITodo } from 'interface/common';
import { Navigate } from 'react-router-dom';
import { SIGNIN_URL } from 'constants/route';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import Toast from 'components/common/Toast';

export default function TodoPage() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const [toast, setToast] = useState({ message: '', index: 0 });
  useEffect(() => {
    async function fetchTodo() {
      const access_token = localStorage.getItem('access_token') || '';
      const result = await Api.getTodos({ access_token });

      if ('message' in result) {
        setToast((toast) => ({ message: result.message, index: toast.index + 1 }));
      } else {
        setTodoList(result);
      }
    }

    fetchTodo();
  }, []);

  const access_token = localStorage.getItem('access_token') || '';
  if (!access_token) return <Navigate to={SIGNIN_URL} />;

  return (
    <>
      <Styled.TodoPage>
        <AddTodoForm setTodoList={setTodoList} />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </Styled.TodoPage>
      {toast.message && <Toast key={`${toast}-${toast.index}`}>{toast.message}</Toast>}
    </>
  );
}
