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

  margin-left: 320px;
  max-width: calc(100vw - 320px);
`;

export const Title = styled.div`
  color: #5f6c73;
  font-size: 24px;
  margin-bottom: 20px;
  width: 100%;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const GraphContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const StyledSelect: ComponentType<Props<any, boolean>> = styled(Select)`
  width: 300px;
`;
