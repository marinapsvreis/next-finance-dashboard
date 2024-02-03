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
    color: #5F6C73;
  }

  & > input {
    height: 40px;
    padding: 4px 8px;
    border: 0.2px solid #5F6C7350;
    border-radius: 8px;
    background-color: white;
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