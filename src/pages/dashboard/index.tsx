import { useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import AuthService from "@/services/auth-token";

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
