import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const TodoItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: 5px;

  form {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  label {
    width: 180px;
    display: flex;
  }

  span {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const TodoList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TodoPage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 10% 90%;
  overflow-y: scroll;
`;
