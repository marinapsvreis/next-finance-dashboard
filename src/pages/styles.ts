import styled from "styled-components";

export const Container = styled.div`
  background-color: #2f3349;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeftContainer = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RightContainer = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  padding: 2rem;
  border-radius: 4px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Button = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 8px;
  border: 1px solid #7367f0;
  border-radius: 4px;

  background-color: #7367f0;
  color: white;

  font-weight: bold;
`;