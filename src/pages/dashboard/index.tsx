import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Sidebar from "@/components/Sidebar";
import BarGraphic from "@/components/BarGraphic";
import LineGraphic from "@/components/LineGraphic";
import { Card, CardsContainer, ContentContainer, DashboardContainer, GraphContainer, Title } from "./styles";

interface ChartDataItem {
  name: string;
  withdraw: number;
  deposit: number;
}

const Dashboard = () => {
  const [tokenValid, setTokenValid] = useState(false);
  const router = useRouter();
  const [barChartData, setBarChartData] = useState<ChartDataItem[]>([]);
  const [lineChartData, setLineChartData] = useState<ChartDataItem[]>([]);

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

    const newChartData = Object.entries(industriesData).map(
      ([industry, data]) => ({
        name: industry,
        deposit: data.totalRevenues,
        withdraw: data.totalExpenses,
      })
    );

    setBarChartData(newChartData);
    setLineChartData(newChartData);
  }, []);

  return (
    <>
      <DashboardContainer>
        <Sidebar />
        <ContentContainer>
          <Title>Dashboard</Title>
          <CardsContainer>
            <Card>Income</Card>
            <Card>Expenses</Card>
            <Card>Pending Transactions</Card>
            <Card>Total Balance</Card>
          </CardsContainer>
          <GraphContainer>
            <BarGraphic
              title="Deposits and Withdraws by Industry"
              chartData={barChartData}
            />
            <LineGraphic
              title="Deposits and Withdraws by Industry"
              chartData={lineChartData}
            />
          </GraphContainer>
        </ContentContainer>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
