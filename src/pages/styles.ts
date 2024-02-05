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

  display: none;
  align-items: center;
  justify-content: center;

  @media (min-width: 1400px) {
    display: flex;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RightContainer = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: 1400px) {
    width: 50%;
  }

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
  border: 1px solid #4996fe;
  border-radius: 4px;

  background-color: #4996fe;
  color: white;

  font-weight: bold;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const MessageError = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -12px;
`;

export const RegisterText = styled.p`
  color: #5f6c73;
  text-align: center;
  margin-top: -4px;

  & > a {
    color: #4996fe;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const LoginText = styled.p`
  color: #5f6c73;
  text-align: center;
  margin-top: -4px;

  & > a {
    color: #4996fe;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;