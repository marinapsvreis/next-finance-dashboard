import React, { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  border-radius: 8px;

  width: 100%;

  & > label {
    font-size: 1rem;
    color: #b6bee3;
  }

  & > input {
    height: 32px;
  }
`;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password';
  register: UseFormRegisterReturn;
};

const Input: React.FC<InputProps> = ({ label, placeholder, type, register, ...inputProps }) => {
  return (
    <InputContainer>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} {...register} {...inputProps} />
    </InputContainer>
  );
};

export default Input;