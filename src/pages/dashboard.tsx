import styled from "styled-components";

const Container = styled.div`
  background-color: red;
`;

const Title = styled.div`
  color: white;
`;

export default function Dashboard() {
  return (
    <>
      <Container>
        <Title>Dashboard</Title>
      </Container>
    </>
  );
}
