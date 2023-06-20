import { SIGNIN_URL, SIGNUP_URL } from 'constants/api';
import { IUser, Response } from 'interface/common';

type SignupBody = IUser;

export async function signUp(signupBody: SignupBody): Response<IUser> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_END_POINT}${SIGNUP_URL}`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(signupBody)
    });

    if (response.ok) return signupBody;
    throw new Error(((await response.json()) as { message: string }).message);
  } catch (error) {
    if (error instanceof Error) return { message: error.message };
    return { message: '알 수 없는 에러 입니다' };
  }
}

type SigninBody = IUser;

export async function signIn(signinBody: SigninBody): Response<{ access_token: string }> {
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
