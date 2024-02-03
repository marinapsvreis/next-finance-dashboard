import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/Input";
import FormHeader from "@/components/FormHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Container,
  FormContainer,
  LeftContainer,
  LoginContainer,
  MessageError,
  RightContainer,
} from "@/pages/styles";

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
    console.log("new:", formData);

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
            </FormContainer>
          </LoginContainer>
        </RightContainer>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Container>
    </>
  );
}
