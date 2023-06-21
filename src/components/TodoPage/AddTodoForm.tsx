import React, { FormEvent, useState } from 'react';
import * as Styled from './TodoPage.styled';
import * as Api from 'apis/todo';
import { ITodo } from 'interface/common';
import Toast from 'components/common/Toast';

interface TodoFormEventTarget extends EventTarget {
  todo: HTMLInputElement;
}

interface AddTodoFormProps {
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export default function AddTodoForm({ setTodoList }: AddTodoFormProps) {
  const [toast, setToast] = useState({ message: '', index: 0 });

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const access_token = localStorage.getItem('access_token') || '';

    const $input = event.target as TodoFormEventTarget;
    const todo = $input.todo.value;

    const result = await Api.createTodo({ access_token, createTodoBody: { todo } });

    if ('message' in result) {
      setToast((toast) => ({ message: result.message, index: toast.index + 1 }));
    } else {
      setTodoList((todo) => [...todo, result]);
      $input.todo.value = '';
    }
  };

  return (
    <>
      <Styled.Form onSubmit={handleAddTodo}>
        <input data-testid='new-todo-input' name='todo' autoComplete='off' />
        <button data-testid='new-todo-add-button' type='submit'>
          추가
        </button>
      </Styled.Form>
      {toast.message && <Toast key={`${toast}-${toast.index}`}>{toast.message}</Toast>}
    </>
  );
}
