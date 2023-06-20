import { SIGNUP_URL } from 'constants/api';

type TMethod = 'get' | 'put' | 'post' | 'delete';

export async function request({
  path,
  pathVariable,
  headers,
  body,
  method
}: {
  path: string;
  pathVariable?: number;
  headers?: HeadersInit;
  body?: string;
  method?: TMethod;
}) {
  try {
    const init: RequestInit = { method: method || 'get' };

    if (headers) {
      init.headers = headers;
    }

    if (body) {
      init.body = body;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_END_POINT}/${path}${pathVariable ? `/${pathVariable}` : ''}`,
      init
    );

    if (path === SIGNUP_URL || method === 'delete') {
      return {};
    }

    const json = await response.json();

    if (response.ok) {
      return json;
    }
    throw new Error(((await json) as Error).message);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: '알 수 없는 에러입니다.' };
    }
  }
}
