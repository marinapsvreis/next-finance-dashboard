import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/Input";
import FormHeader from "@/components/FormHeader";
import Cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
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

import * as yup from "yup";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Home() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const email = watch("email");
  const password = watch("password");

  const onSubmit: SubmitHandler<LoginFormData> = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Login failed: ${errorData.error}`);
        return;
      }

      const { token } = await response.json();

      Cookies.set("token", token, { expires: 1 });

      toast.success("Login successful");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast.error(`Login failed: ${error}`);
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
              subtitle="Please sign-in to your account and see your finance dashboard."
            />
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                register={register("email")}
              />
              {errors.email && (
                <MessageError>{errors.email.message}</MessageError>
              )}
              <Input
                type="password"
                label="Password"
                placeholder="*********"
                register={register("password")}
              />
              {errors.password && (
                <MessageError>{errors.password.message}</MessageError>
              )}
              <Button type="submit">Sign in</Button>
            </FormContainer>
          </LoginContainer>
        </RightContainer>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Container>
    </>
  );
}
