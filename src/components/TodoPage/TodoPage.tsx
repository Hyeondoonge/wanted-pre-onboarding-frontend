import { useEffect, useState } from 'react';
import * as Styled from './TodoPage.styled';
import { getTodos } from 'apis/todo';

function TodoItem({ todo }: { todo: Todo }) {
  const [isUpdatemode, setIsUpdatemode] = useState<boolean>(false);
  const { id, todo: name, isCompleted, userId } = todo;

  return !isUpdatemode ? (
    <li>
      <label>
        <input type='checkbox' checked={isCompleted} />
        <span>{name}</span>
      </label>
      <button data-testid='modify-button' onClick={() => setIsUpdatemode(!isUpdatemode)}>
        수정
      </button>
      <button data-testid='delete-button'>삭제</button>
    </li>
  ) : (
    <li>
      <label>
        <input type='checkbox' />
        <input data-testid='modify-input' defaultValue={name} />
      </label>
      <button data-testid='submit-button'>제출</button>
      <button data-testid='cancel-button' onClick={() => setIsUpdatemode(!isUpdatemode)}>
        취소
      </button>
    </li>
  );
}

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export default function TodoPage() {
  const [todolist, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodo() {
      const access_token = localStorage.getItem('access_token') || '';
      const result = await getTodos({ access_token });

      if ('message' in result) {
        console.log(result);
      } else {
        setTodoList(result);
      }
    }

    fetchTodo();
  }, []);

  return (
    <Styled.TodoPage>
      <Styled.Form>
        <input data-testid='new-todo-input' />
        <button data-testid='new-todo-add-button'>추가</button>
      </Styled.Form>
      {todolist.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Styled.TodoPage>
  );
}
