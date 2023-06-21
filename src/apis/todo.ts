import { TODO_URL } from 'constants/api';
import { ITodo, Response } from 'interface/common';
import { request } from 'utils/api';

async function createTodo({
  access_token,
  createTodoBody
}: {
  access_token: string;
  createTodoBody: { todo: string };
}): Response<ITodo> {
  return request({
    method: 'post',
    path: TODO_URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createTodoBody)
  });
}

async function getTodos({ access_token }: { access_token: string }): Response<ITodo[]> {
  return request({
    path: TODO_URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  });
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
  return request({
    method: 'put',
    path: TODO_URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    pathVariable: id,
    body: JSON.stringify(updateTodoBody)
  });
}

async function deleteTodo({
  access_token,
  id
}: {
  access_token: string;
  id: number;
}): Response<undefined> {
  return request({
    path: TODO_URL,
    pathVariable: id,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
}

export { createTodo, getTodos, updateTodo, deleteTodo };
