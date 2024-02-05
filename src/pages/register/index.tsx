import FormHeader from "@/components/FormHeader";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

import {
  Button,
  Container,
  FormContainer,
  LeftContainer,
  LoginContainer,
  LoginText,
  MessageError,
  RightContainer,
} from "../../styles/general/styles";

const schema = yup.object().shape({
  name: yup.string().min(2).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .min(6)
    .oneOf([yup.ref("password")], "passwords must match")
    .nullable(),
});

type RegisterFormData = yup.InferType<typeof schema>;

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (formData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.error}`);
        return;
      }

      toast.success("Registration successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      toast.error(`Registration failed: ${error}`);
    }
  };

  const handleGoToLogin = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Container>
        <LeftContainer>
          <Image
            src="/cover-image.jpg"
            alt="Example Image"
            width={2000}
            height={1500}
          />
        </LeftContainer>
        <RightContainer>
          <LoginContainer>
            <FormHeader
              title="Welcome to Findash! 👋"
              subtitle="Please create your account and see your finance dashboard."
            />
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <Input
                type={"text"}
                label={"Name"}
                placeholder={"Enter your name"}
                register={register("name")}
              />
              {errors.name && (
                <MessageError>{errors.name.message}</MessageError>
              )}

              <Input
                type={"email"}
                label={"Email"}
                placeholder={"Enter your email"}
                register={register("email")}
              />
              {errors.email && (
                <MessageError>{errors.email.message}</MessageError>
              )}

              <Input
                type={"password"}
                label={"Password"}
                placeholder={"*********"}
                register={register("password")}
              />
              {errors.password && (
                <MessageError>{errors.password.message}</MessageError>
              )}

              <Input
                type={"password"}
                label={"Confirm password"}
                placeholder={"*********"}
                register={register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <MessageError>{errors.confirmPassword.message}</MessageError>
              )}

              <Button type="submit">Sign up</Button>
              <LoginText>
                Have an account? <a onClick={handleGoToLogin}>Login here</a>
              </LoginText>
            </FormContainer>
          </LoginContainer>
        </RightContainer>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Container>
    </>
  );
}
