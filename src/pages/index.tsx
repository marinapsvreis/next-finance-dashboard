import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/Input";
import FormHeader from "@/components/FormHeader";
import Cookies from "js-cookie"; 
import {
  Button,
  Container,
  FormContainer,
  LeftContainer,
  LoginContainer,
  RightContainer,
} from "@/pages/styles";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Home() {
  const {
    handleSubmit,
    register,
    watch,
    // formState: { errors },
  } = useForm<LoginFormData>();

  const email = watch("email");
  const password = watch("password");

  const onSubmit: SubmitHandler<LoginFormData> = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // setError(errorData.error);
        return;
      }

      const { token } = await response.json();

      Cookies.set('token', token, { expires: 1 });

      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error during login:', error);
      // setError('Internal Server Error');
    }

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
              subtitle="Please sign-in to your account and see your finance dashboard."
            />
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                register={register("email")}
              />
              <Input
                type="password"
                label="Password"
                placeholder="*********"
                register={register("password")}
              />
              <Button type="submit">Sign in</Button>
            </FormContainer>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}
