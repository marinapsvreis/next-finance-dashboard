import styled from "styled-components";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/Input";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Container = styled.div`
  background-color: #2f3349;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
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

const LeftContainer = styled.div`
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

const RightContainer = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  padding: 2rem;
  border-radius: 4px;
`;
const Button = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 8px;
  border: 1px solid #7367f0;
  border-radius: 4px;

  background-color: #7367f0;
  color: white;

  font-weight: bold;
`;

export default function Register() {
  const {
    handleSubmit,
    register,
    watch,
    // formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log(watch("name"));
    console.log(watch("email"));
    console.log(watch("password"));
    console.log(watch("confirmPassword"));

    // window.location.href = '/dashboard';
  };

  return (
    <>
      <Container>
        <LeftContainer>
          <Image
            src="/cover-image.jpg"
            alt="Example Image"
            width={500}
            height={300}
          />
        </LeftContainer>
        <RightContainer>
          <LoginContainer>
            <Title>
              <h1>Welcome to Findash! 👋</h1>
              <p>Please create your account and see your finance dashboard.</p>
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type={"text"}
                label={"Name"}
                placeholder={"Enter your name"}
                register={register("name")}
              />
              <Input
                type={"email"}
                label={"Email"}
                placeholder={"Enter your email"}
                register={register("email")}
              />
              <Input
                type={"password"}
                label={"Password"}
                placeholder={"*********"}
                register={register("password")}
              />
              <Input
                type={"password"}
                label={"Confirm password"}
                placeholder={"*********"}
                register={register("confirmPassword")}
              />
              <Button type="submit">Sign in</Button>
            </form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}
