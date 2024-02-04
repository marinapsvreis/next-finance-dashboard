import { Gauge, House, SignOut } from "@phosphor-icons/react";[]
import Cookies from 'js-cookie';
import styled from "styled-components";

export const SidebarContainer = styled.div`
  background-color: #fff;
  width: 300px;
  height: 100vh;
  position: fixed;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #4996fe;
`;

export const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-top: 60px;
`;

export const NavItemContainer = styled.div`
  display: flex;
  gap: 20px;

  & > p {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #5f6c73;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: #2d2d2d;
    }
  }
`;

export const LogoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #5f6c73;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;

  width: 100%;

  &:hover {
    color: #2d2d2d;
  }
`;

export default function Sidebar() {
  const handleLogout = () => {
    Cookies.remove('token');

    window.location.href = '/';
  };

  return (
    <SidebarContainer>
      <div>
        <LogoContainer>Findash</LogoContainer>
        <NavItemsContainer>
          <NavItemContainer>
            <House size={24} /> Home
          </NavItemContainer>
          <NavItemContainer>
            <Gauge size={24} /> Dashboard
          </NavItemContainer>
        </NavItemsContainer>
      </div>
      <LogoutContainer onClick={handleLogout}>
        Logout
        <SignOut size={24} />
      </LogoutContainer>
    </SidebarContainer>
  );
}
