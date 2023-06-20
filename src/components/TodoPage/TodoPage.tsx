import { FormEvent, useEffect, useState } from 'react';
import * as Styled from './TodoPage.styled';
import * as Api from 'apis/todo';
import { ITodo } from 'interface/common';
import { Navigate } from 'react-router-dom';
import { SIGNIN_URL } from 'constants/route';

type UpdateTodo = Pick<ITodo, 'todo' | 'isCompleted'>;

interface TodoFormEventTarget extends EventTarget {
  todo: HTMLInputElement;
}

function TodoItem({
  item,
  updateTodo,
  deleteTodo
}: {
  item: ITodo;
  updateTodo: (id: number, data: UpdateTodo, callback?: () => void) => void;
  deleteTodo: (id: number) => void;
}) {
  const [isUpdatemode, setIsUpdatemode] = useState<boolean>(false);
  const { id, todo, isCompleted, userId } = item;

  const handleCheck = async (event: FormEvent<HTMLInputElement>) => {
    if ('checked' in event.target) {
      const checked = event.target.checked as boolean;
      updateTodo(id, { todo, isCompleted: checked });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const $input = event.target as TodoFormEventTarget;
    const todo = $input.todo.value;

    updateTodo(id, { todo, isCompleted }, () => {
      setIsUpdatemode(!isUpdatemode);
    });
  };

  return !isUpdatemode ? (
    <Styled.TodoItem>
      <label>
        <input type='checkbox' checked={isCompleted} onChange={handleCheck} />
        <span>{todo}</span>
      </label>
      <button data-testid='modify-button' onClick={() => setIsUpdatemode(!isUpdatemode)}>
        수정
      </button>
      <button data-testid='delete-button' onClick={() => deleteTodo(id)}>
        삭제
      </button>
    </Styled.TodoItem>
  ) : (
    <Styled.TodoItem>
      <form onSubmit={handleSubmit}>
        <label>
          <input type='checkbox' checked={isCompleted} onChange={handleCheck} />
          <input data-testid='modify-input' name='todo' defaultValue={todo} />
        </label>
        <button data-testid='submit-button' type='submit'>
          제출
        </button>
        <button data-testid='cancel-button' onClick={() => setIsUpdatemode(!isUpdatemode)}>
          취소
        </button>
      </form>
    </Styled.TodoItem>
  );
}

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

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const access_token = localStorage.getItem('access_token') || '';

    const $input = event.target as TodoFormEventTarget;
    const todo = $input.todo.value;

    const result = await Api.createTodo({ access_token, createTodoBody: { todo } });

    if ('message' in result) {
      console.log(result);
    } else {
      setTodoList((todo) => [...todo, result]);
      $input.todo.value = '';
    }
  };

  const updateTodo = (targetId: number, data: UpdateTodo, callback?: () => void) => {
    const { todo, isCompleted } = data;
    const newTodolist = todolist.map((todo) => ({ ...todo }));

    const access_token = localStorage.getItem('access_token') || '';
    const result = Api.updateTodo({ access_token, id: targetId, updateTodoBody: data });

    if ('message' in result) {
      console.log(result);
    } else {
      // 성공시
      for (let i = 0; i < newTodolist.length; i++) {
        const { id } = newTodolist[i];
        if (targetId === id) {
          newTodolist[i] = { ...newTodolist[i], todo, isCompleted };
          break;
        }
      }
      setTodoList(newTodolist);
      if (callback) callback();
    }
  };

  const deleteTodo = (targetId: number) => {
    const access_token = localStorage.getItem('access_token') || '';
    const result = Api.deleteTodo({ access_token, id: targetId });

    if ('message' in result) {
      console.log(result);
    } else {
      setTodoList(todolist.filter(({ id }) => id !== targetId));
    }
  };

  const access_token = localStorage.getItem('access_token') || '';
  if (!access_token) return <Navigate to={SIGNIN_URL} />;

  return (
    <Styled.TodoPage>
      <Styled.Form onSubmit={handleAddTodo}>
        <input data-testid='new-todo-input' name='todo' autoComplete='off' />
        <button data-testid='new-todo-add-button' type='submit'>
          추가
        </button>
      </Styled.Form>
      <Styled.TodoList>
        {todolist.map((todo) => (
          <TodoItem key={todo.id} item={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        ))}
      </Styled.TodoList>
    </Styled.TodoPage>
  );
}
