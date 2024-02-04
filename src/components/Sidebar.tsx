import styled from "styled-components";

export const SidebarContainer = styled.div`
  background-color: #fff;
  width: 300px;
  height: 100vh;
  position: fixed;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

export default function Sidebar() { 
  return (
    <SidebarContainer>
      <p>Findash</p>
      <p>Home</p>
      <p>Dashboard</p>
      <p>Logout</p>
    </SidebarContainer>
  );
}