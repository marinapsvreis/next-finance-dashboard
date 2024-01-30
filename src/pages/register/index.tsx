import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/Input";
import FormHeader from "@/components/FormHeader";
import {
  Button,
  Container,
  FormContainer,
  LeftContainer,
  LoginContainer,
  RightContainer,
} from "@/pages/styles";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    handleSubmit,
    register,
    watch,
    // formState: { errors },
  } = useForm<RegisterFormData>();

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");

  const newUser = {
    name,
    email,
    password,
  };

  const onSubmit: SubmitHandler<RegisterFormData> = async () => {
    console.log('new:', newUser);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
        return;
      }
  
      console.log('Registration successful');
    } catch (error) {
      console.error('Error during registration:', error);
    }

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
            </FormContainer>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}
