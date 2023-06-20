import { TODO_URL } from 'constants/api';
import { ITodo, Response } from 'interface/common';

async function createTodo({
  access_token,
  createTodoBody
}: {
  access_token: string;
  createTodoBody: { todo: string };
}): Response<ITodo> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/${TODO_URL}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createTodoBody)
    });
    const json = response.json();
    if (response.ok) return json as Promise<ITodo>;
    throw new Error(((await json) as Error).message);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: '알 수 없는 에러입니다.' };
    }
  }
}

async function getTodos({ access_token }: { access_token: string }): Response<ITodo[]> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/${TODO_URL}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });
    const json = response.json();
    if (response.ok) return json as Promise<ITodo[]>;
    throw new Error(((await json) as Error).message);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: '알 수 없는 에러입니다.' };
    }
  }
}

async function updateTodo({
  access_token,
  id,
  updateTodoBody
}: {
  access_token: string;
  id: number;
  updateTodoBody: { todo: string; isCompleted: boolean };
}): Response<ITodo> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/${TODO_URL}/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTodoBody)
    });

    const json = response.json();
    if (response.ok) return json as Promise<ITodo>;
    throw new Error(((await json) as Error).message);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: '알 수 없는 에러입니다.' };
    }
  }
}

async function deleteTodo({
  access_token,
  id
}: {
  access_token: string;
  id: number;
}): Response<undefined> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/${TODO_URL}/${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    if (response.ok) return;
    const json = response.json();
    throw new Error(((await json) as Error).message);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: '알 수 없는 에러입니다.' };
    }
  }
}

export { createTodo, getTodos, updateTodo, deleteTodo };
