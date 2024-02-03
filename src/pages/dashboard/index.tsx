import { useEffect, useState } from "react";
import styled from "styled-components";
import Highcharts from "highcharts";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const DashboardContainer = styled.div`
  background-color: #fafafa;
  min-height: 100vh;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Sidebar = styled.div`
  background-color: #fff;
  width: 300px;
  height: 100vh;
  position: fixed;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  margin-left: 320px;
  max-width: calc(100vw - 320px);
`;

const Title = styled.div`
  color: #5f6c73;
  font-size: 24px;
  margin-bottom: 20px;
  width: 100%;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  width: 430px;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const GraphCard = styled.div`
  height: 440px;
  width: 749px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const Dashboard = () => {
  const [tokenValid, setTokenValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = Cookies.get("token");

        const response = await fetch("/api/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setTokenValid(true);
        } else {
          console.error("Error verifying token:", response.statusText);
          router.push("/");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        router.push("/");
      }
    };

    verifyToken();
  }, [router]);

  useEffect(() => {
    const industriesData = {
      Advertising: {
        totalRevenues: 699.23,
        totalExpenses: 577.5600000000001,
      },
      Apparel: {
        totalRevenues: 6804.15,
        totalExpenses: 6433.9900000000025,
      },
      "Food Consumer Products": {
        totalRevenues: 9850.349999999997,
        totalExpenses: 10006.429999999995,
      },
      "Oil and Gas Equipment": {
        totalRevenues: 6799.259999999998,
        totalExpenses: 7002.079999999998,
      },
      Hotels: {
        totalRevenues: 5361.140000000002,
        totalExpenses: 5162.6900000000005,
      },
      Airlines: {
        totalRevenues: 3867.789999999999,
        totalExpenses: 3437.809999999999,
      },
      "Computer Software": {
        totalRevenues: 6369.54,
        totalExpenses: 5595.59,
      },
      Education: {
        totalRevenues: 907.24,
        totalExpenses: 1118.1399999999999,
      },
      "Automotive Retailing": {
        totalRevenues: 4025.479999999999,
        totalExpenses: 3261.4899999999993,
      },
      Mail: {
        totalRevenues: 592.12,
        totalExpenses: 748.9300000000001,
      },
    };

    const chartData = Object.entries(industriesData).map(
      ([industry, data]) => ({
        name: industry,
        deposit: data.totalRevenues,
        withdraw: data.totalExpenses,
      })
    );

    const options = {
      chart: {
        type: "column",
      },
      title: {
        text: "Deposits and Withdraws by Industry",
      },
      xAxis: {
        categories: chartData.map((item) => item.name),
      },
      yAxis: {
        title: {
          text: "Amount",
        },
      },
      series: [
        {
          name: "Withdraw",
          data: chartData.map((item) => item.withdraw),
          color: "#B9D3FF",
        },
        {
          name: "Deposit",
          data: chartData.map((item) => item.deposit),
          color: "#007DFF",
        },
      ],
    };

    const options2 = {
      chart: {
        type: "line",
      },
      title: {
        text: "Deposits and Withdraws by Industry",
      },
      xAxis: {
        categories: chartData.map((item) => item.name),
      },
      yAxis: {
        title: {
          text: "Amount",
        },
      },
      series: [
        {
          name: "Withdraw",
          data: chartData.map((item) => item.withdraw),
          color: "#B9D3FF",
        },
        {
          name: "Deposit",
          data: chartData.map((item) => item.deposit),
          color: "#007DFF",
        },
      ],
    };

    Highcharts.chart("chart-container", options as Highcharts.Options);
    Highcharts.chart("chart-container2", options2 as Highcharts.Options);
  }, []);

  return (
    <>
      <DashboardContainer>
        <Sidebar>
          <p>Home</p>
          <p>Logout</p>
        </Sidebar>
        <ContentContainer>
          <Title>Dashboard</Title>
          <CardsContainer>
            <Card>Income</Card>
            <Card>Expenses</Card>
            <Card>Pending Transactions</Card>
            <Card>Total Balance</Card>
          </CardsContainer>
          <GraphContainer>
            <GraphCard>
              <div id="chart-container"></div>
            </GraphCard>
            <GraphCard>
              <div id="chart-container2"></div>
            </GraphCard>
          </GraphContainer>
        </ContentContainer>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
