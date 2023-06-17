import { TODO_URL } from 'constants/api';

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

async function createTodo({
  access_token,
  todo
}: {
  access_token: string;
  todo: string;
}): Promise<Todo | { message: string }> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/${TODO_URL}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    if (response.ok) return response.json() as Promise<Todo>;
    throw new Error(((await response.json()) as Error).message);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: '알 수 없는 에러입니다.' };
    }
  }
}

async function getTodos({
  access_token
}: {
  access_token: string;
}): Promise<Todo[] | { message: string }> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/${TODO_URL}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) return response.json() as Promise<Todo[]>;
    throw new Error(((await response.json()) as Error).message);
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
  id: string;
  updateTodoBody: { todo: string; isCompleted: boolean };
}): Promise<Todo | { message: string }> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/${TODO_URL}/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTodoBody)
    });

    if (response.ok) return response.json() as Promise<Todo>;
    throw new Error(((await response.json()) as Error).message);
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
  id: string;
}): Promise<undefined | { message: string }> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/${TODO_URL}/${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    if (response.ok) return; // return nothing
    throw new Error(((await response.json()) as Error).message);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: '알 수 없는 에러입니다.' };
    }
  }
}

export { createTodo, getTodos, updateTodo, deleteTodo };
