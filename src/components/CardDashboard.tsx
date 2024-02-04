import styled from "styled-components";

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  width: 430px;
  padding-inline: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    border-radius: 8px;

    width: 100px;
    height: 100px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    & > p:first-child {
      font-size: 40px;
      font-weight: 600;
      margin: 0;
      color: #5f6c73;
    }

    & > p:last-child {
      font-size: 16px;
      color: #5f6c73;
  }
`;

interface CardDashboardProps {
  icon: React.ReactNode;
  amount: string;
  description: string;
}

export default function CardDashboard({
  icon,
  amount,
  description,
}: CardDashboardProps) {
  return (
    <Card>
      <p>{icon}</p>
      <div>
        <p>{amount}</p>
        <p>{description}</p>
      </div>
    </Card>
  );
}
