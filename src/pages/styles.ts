import styled from "styled-components";

export const Container = styled.div`
  background-color: #fafafa;
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
  height: 40px;
  margin-top: 8px;
  border: 1px solid #4996FE;
  border-radius: 4px;

  background-color: #4996FE;
  color: white;

  font-weight: bold;
`;

export const MessageError = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -12px;
`;
