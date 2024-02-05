import Select, { Props } from "react-select";
import styled from "styled-components";
import { ComponentType } from "react";

export const DashboardContainer = styled.div`
  background-color: #fafafa;
  min-height: 100vh;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100vw;

  @media (min-width: 768px) {    
    margin-left: 320px;
    max-width: calc(100vw - 320px);
  }
`;

export const Title = styled.div`
  color: #5f6c73;
  font-size: 24px;
  margin-bottom: 20px;
  width: 100%;

  display: flex;
`;

export const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const GraphContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 20px;
`;
