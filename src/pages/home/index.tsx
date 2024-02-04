import FormHeader from "@/components/FormHeader";
import Sidebar from "@/components/Sidebar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100vw - 320px);
  height: 100vh;

  text-align: center;

  margin-left: 320px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4996fe;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default function Home() {
  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <>
      <Sidebar activePage={"home"} />
      <Container>
        <FormHeader
          title="Welcome to Findash"
          subtitle="Please click bellow to see you dashboard"
        />
        <Button onClick={handleGoToDashboard}>Go to dashboard</Button>
      </Container>
    </>
  );
}
