import { useEffect, useState } from "react";
import styled from "styled-components";
import Highcharts from "highcharts";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Container = styled.div`
  background-color: red;
`;

const Title = styled.div`
  color: white;
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
      "Hotels": {
        totalRevenues: 5361.140000000002,
        totalExpenses: 5162.6900000000005,
      },
      "Airlines": {
        totalRevenues: 3867.789999999999,
        totalExpenses: 3437.809999999999,
      },
      "Computer Software": {
        totalRevenues: 6369.54,
        totalExpenses: 5595.59,
      },
      "Education": {
        totalRevenues: 907.24,
        totalExpenses: 1118.1399999999999,
      },
      "Automotive Retailing": {
        totalRevenues: 4025.479999999999,
        totalExpenses: 3261.4899999999993,
      },
      "Mail": {
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
        text: "Receitas e Despesas por Indústria",
      },
      xAxis: {
        categories: chartData.map((item) => item.name),
      },
      yAxis: {
        title: {
          text: "Valor",
        },
      },
      series: [
        {
          name: "Withdraw",
          data: chartData.map((item) => item.withdraw),
          color: "rgba(255, 165, 0, 0.7)",
        },
        {
          name: "Deposit",
          data: chartData.map((item) => item.deposit),
          color: "rgba(144, 238, 144, 0.7)",
        },
      ],
    };

    Highcharts.chart("chart-container", options as Highcharts.Options);
  }, []);

  return (
    <>
      <Container>
        <Title>Dashboard</Title>
      </Container>
      <div id="chart-container"></div>
    </>
  );
};

export default Dashboard;
