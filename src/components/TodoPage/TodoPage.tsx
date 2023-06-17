import { useState } from 'react';
import * as Styled from './TodoPage.styled';

function TodoItem() {
  const [isUpdatemode, setIsUpdatemode] = useState<boolean>(false);

  return !isUpdatemode ? (
    <li>
      <label>
        <input type='checkbox' />
        <span>TODO</span>
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
        <input data-testid='modify-input' />
      </label>
      <button data-testid='submit-button'>제출</button>
      <button data-testid='cancel-button' onClick={() => setIsUpdatemode(!isUpdatemode)}>
        취소
      </button>
    </li>
  );
}

export default function TodoPage() {
  return (
    <Styled.TodoPage>
      <Styled.Form>
        <input data-testid='new-todo-input' />
        <button data-testid='new-todo-add-button'>추가</button>
      </Styled.Form>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <TodoItem key={index} />
        ))}
    </Styled.TodoPage>
  );
}
