import { SIGNIN_URL, SIGNUP_URL } from 'constants/api';
import { IUser, Response } from 'interface/common';
import { request } from 'utils/api';

type SignupBody = IUser;

export async function signUp(signupBody: SignupBody): Response<IUser> {
  return request({
    path: SIGNUP_URL,
    body: JSON.stringify(signupBody),
    headers: { 'content-type': 'application/json' },
    method: 'post'
  });
}

type SigninBody = IUser;

export async function signIn(signinBody: SigninBody): Response<{ access_token: string }> {
  return request({
    path: SIGNIN_URL,
    body: JSON.stringify(signinBody),
    headers: { 'content-type': 'application/json' },
    method: 'post'
  });
}
