import { FormEvent, useEffect, useState } from 'react';
import * as Styled from './TodoPage.styled';
import * as Api from 'apis/todo';
import { Todo } from 'interface/common';

type UpdateTodo = Pick<Todo, 'todo' | 'isCompleted'>;

function TodoItem({
  item,
  updateTodo
}: {
  item: Todo;
  updateTodo: (id: number, data: UpdateTodo) => void;
}) {
  const [isUpdatemode, setIsUpdatemode] = useState<boolean>(false);
  const { id, todo, isCompleted, userId } = item;

  const handleCheck = async (event: FormEvent<HTMLInputElement>) => {
    if ('checked' in event.target) {
      const checked = event.target.checked as boolean;
      updateTodo(id, { todo, isCompleted: checked });
    }
  };

  return !isUpdatemode ? (
    <li>
      <label>
        <input type='checkbox' checked={isCompleted} onChange={handleCheck} />
        <span>{todo}</span>
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
        <input data-testid='modify-input' defaultValue={todo} />
      </label>
      <button data-testid='submit-button'>제출</button>
      <button data-testid='cancel-button' onClick={() => setIsUpdatemode(!isUpdatemode)}>
        취소
      </button>
    </li>
  );
}

interface TodoFormEventTarget extends EventTarget {
  todo: HTMLInputElement;
}

export default function TodoPage() {
  const [todolist, setTodoList] = useState<Todo[]>([]);

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
    }
  };

  const updateTodo = (targetId: number, data: UpdateTodo) => {
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
    }
  };

  return (
    <Styled.TodoPage>
      <Styled.Form onSubmit={handleAddTodo}>
        <input data-testid='new-todo-input' name='todo' />
        <button data-testid='new-todo-add-button' type='submit'>
          추가
        </button>
      </Styled.Form>
      {todolist.map((todo) => (
        <TodoItem key={todo.id} item={todo} updateTodo={updateTodo} />
      ))}
    </Styled.TodoPage>
  );
}
