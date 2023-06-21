import * as Styled from './TodoPage.styled';
import { FormEvent, useState } from 'react';
import * as Api from 'apis/todo';
import { ITodo } from 'interface/common';

interface TodoListProps {
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export default function TodoList({ todoList, setTodoList }: TodoListProps) {
  return (
    <Styled.TodoList>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} item={todo} setTodoList={setTodoList} />
      ))}
    </Styled.TodoList>
  );
}

type UpdateTodo = Pick<ITodo, 'todo' | 'isCompleted'>;

interface TodoFormEventTarget extends EventTarget {
  todo: HTMLInputElement;
}

function TodoItem({
  item,
  setTodoList
}: {
  item: ITodo;
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
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

  const updateTodo = (targetId: number, data: UpdateTodo, callback?: () => void) => {
    const { todo, isCompleted } = data;

    const access_token = localStorage.getItem('access_token') || '';
    const result = Api.updateTodo({ access_token, id: targetId, updateTodoBody: data });

    if ('message' in result) {
      console.log(result);
    } else {
      setTodoList((todolist) => {
        const newTodolist = todolist.map((todo) => ({ ...todo }));
        for (let i = 0; i < newTodolist.length; i++) {
          const { id } = newTodolist[i];
          if (targetId === id) {
            newTodolist[i] = { ...newTodolist[i], todo, isCompleted };
            break;
          }
        }
        return newTodolist;
      });
      if (callback) callback();
    }
  };

  const deleteTodo = (targetId: number) => {
    const access_token = localStorage.getItem('access_token') || '';
    const result = Api.deleteTodo({ access_token, id: targetId });

    if ('message' in result) {
      console.log(result);
    } else {
      setTodoList((todolist) => todolist.filter(({ id }) => id !== targetId));
    }
  };

  return (
    <Styled.TodoItem>
      <form onSubmit={handleSubmit}>
        {!isUpdatemode ? (
          <>
            <label>
              <input type='checkbox' checked={isCompleted} onChange={handleCheck} />
              <span>{todo}</span>
            </label>
            <button
              key='modify-button'
              data-testid='modify-button'
              onClick={() => setIsUpdatemode(!isUpdatemode)}
              type='button'
            >
              수정
            </button>
            <button
              key='delete-button'
              data-testid='delete-button'
              onClick={() => deleteTodo(id)}
              type='button'
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <label>
              <input type='checkbox' checked={isCompleted} onChange={handleCheck} />
              <input data-testid='modify-input' name='todo' defaultValue={todo} />
            </label>
            <button key='delete-button' data-testid='submit-button'>
              제출
            </button>
            <button
              key='cancel-button'
              data-testid='cancel-button'
              onClick={() => setIsUpdatemode(!isUpdatemode)}
              type='button'
            >
              취소
            </button>
          </>
        )}
      </form>
    </Styled.TodoItem>
  );
}
