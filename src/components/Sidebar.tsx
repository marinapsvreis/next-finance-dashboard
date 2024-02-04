import { Gauge, House, SignOut } from "@phosphor-icons/react";
[];
import Cookies from "js-cookie";
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

interface NavItemContainerProps {
  active: boolean;
}

export const NavItemContainer = styled.div<NavItemContainerProps>`
  display: flex;
  gap: 20px;
  cursor: pointer;

  padding: 10px;
  border-radius: 8px;

  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: #4996fe;
  }

  color: ${(props) => (props.active ? "#4996fe" : "#5f6c73")};
  background-color: ${(props) => (props.active ? "#4996fe20" : "transparent")};

  & > p {
    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 18px;
    font-weight: 500;
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

  transition: color 0.2s;

  &:hover {
    color: #4996fe;;
  }
`;

interface SidebarProps {
  activePage: "home" | "dashboard";
}

export default function Sidebar({ activePage }: SidebarProps) {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  const handleGoToHome = () => {
    if (!(activePage == "home")) {
      window.location.href = "/home";
    }
  };

  const handleGoToDashboard = () => {
    if (!(activePage == "dashboard")) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <SidebarContainer>
      <div>
        <LogoContainer>Findash</LogoContainer>
        <NavItemsContainer>
          <NavItemContainer
            active={activePage === "home" ? true : false}
            onClick={handleGoToHome}
          >
            <House size={24} /> Home
          </NavItemContainer>
          <NavItemContainer
            active={activePage === "dashboard" ? true : false}
            onClick={handleGoToDashboard}
          >
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
