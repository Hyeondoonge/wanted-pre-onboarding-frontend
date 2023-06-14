import { SIGNIN_URL, SIGNUP_URL } from 'constants/api';

export async function signUp(signupBody: {
  email: string;
  password: string;
}): Promise<{ email: string; password: string } | { message: string }> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}${SIGNUP_URL}`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(signupBody)
    });

    const result = await response.json();
    if (response.ok) return result;
    throw new Error((result as { message: string }).message);
  } catch (error) {
    if (error instanceof Error) return { message: error.message };
    return { message: '알 수 없는 에러 입니다' };
  }
}

export async function signIn(signinBody: {
  email: string;
  password: string;
}): Promise<{ access_token: string } | { message: string }> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}${SIGNIN_URL}`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(signinBody)
    });
    const result = await response.json();
    if (response.ok) return result;
    throw new Error((result as { message: string }).message);
  } catch (error) {
    if (error instanceof Error) return { message: error.message };
    return { message: '알 수 없는 에러 입니다' };
  }
}
