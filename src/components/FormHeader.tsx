import React from "react";
import styled from "styled-components";

const FormHeaderContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2px;

  & > h1 {
    font-size: 1.6rem;
    margin-bottom: 8px;
    color: #cfd3e6;
    font-weight: 500;
  }

  & > p {
    font-size: 1rem;
    color: #b6bee3;
    margin-top: -8px;
  }
`;

type FormHeaderProps = {
  title: string;
  subtitle: string;
};

const FormHeader = ({ title, subtitle }: FormHeaderProps) => {
  return (
    <FormHeaderContainer>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </FormHeaderContainer>
  );
};

export default FormHeader;
