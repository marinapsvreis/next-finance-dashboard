import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Sidebar from "@/components/Sidebar";
import BarGraphic from "@/components/BarGraphic";
import LineGraphic from "@/components/LineGraphic";
import React from "react";
import Select from "react-select";
import {
  CardsContainer,
  ContentContainer,
  DashboardContainer,
  FiltersContainer,
  GraphContainer,
  Title,
} from "../../styles/dashboard/styles";
import { CaretDown, CaretUp, Coins, Warning } from "@phosphor-icons/react";
import CardDashboard from "@/components/CardDashboard";

interface ChartDataItem {
  name: string;
  withdraw: number;
  deposit: number;
}

export default function Dashboard() {
  const [tokenValid, setTokenValid] = useState(false);
  const router = useRouter();
  const [barChartData, setBarChartData] = useState<ChartDataItem[]>([]);
  const [lineChartData, setLineChartData] = useState<ChartDataItem[]>([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [futureTransactions, setFutureTransactions] = useState(0);
  const [balance, setBalance] = useState(0);

  const token = Cookies.get("token");

  const [filterLists, setFilterLists] = useState<{
    dates: string[];
    industries: string[];
    accounts: string[];
    states: string[];
  }>({
    dates: [],
    industries: [],
    accounts: [],
    states: [],
  });

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

  useEffect(() => {
    const fetchFilterLists = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/filtersLists?token=${token}`
        );
        if (response.ok) {
          const data = await response.json();
          setFilterLists(data.data);
        } else {
          console.error("Error fetching filter lists:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching filter lists:", error);
      }
    };

    fetchFilterLists();
  }, [token]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
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

  const handleFilterUpdate = async () => {
    try {
      const queryParams = new URLSearchParams();

      filterLists.dates.forEach((date) => {
        queryParams.append("months", date);
      });

      filterLists.industries.forEach((industry) => {
        queryParams.append("industries", industry);
      });

      filterLists.accounts.forEach((account) => {
        queryParams.append("accounts", account);
      });

      filterLists.states.forEach((state) => {
        queryParams.append("states", state);
      });

      const response = await fetch(
        `/api/dashboard/cardsData?token=${token}&${queryParams.toString()}`
      );

      if (response.ok) {
        const data = await response.json();

        setIncome(Number(data.depositsSum));
        setExpenses(Number(data.withdrawsSum));
        setFutureTransactions(Number(data.futureTransactionsSum));
      } else {
        throw new Error("Error fetching chart data");
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    handleFilterUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLists]);

  return (
    <>
      <DashboardContainer>
        <Sidebar activePage="dashboard" />
        <ContentContainer>
          <Title>Dashboard</Title>
          <FiltersContainer>
            {Object.entries(filterLists).map(([key, options], index) => (
              <Select
                key={key}
                options={(options as string[]).map(
                  (option: string, optionIndex: number) => ({
                    value: optionIndex,
                    label: option,
                  })
                )}
                isSearchable={false}
                placeholder={`All ${key}`}
                isMulti
                onChange={(selectedOptions) => {
                  setFilterLists({
                    ...filterLists,
                    [key]: selectedOptions.map((option) => option.label),
                  });
                }}
              />
            ))}
          </FiltersContainer>
          <CardsContainer>
            <CardDashboard
              icon={<CaretUp size={42} color="#4996FE" />}
              amount={`$ ${income.toFixed(2)}`}
              description="Income"
            />
            <CardDashboard
              icon={<CaretDown size={42} color="#4996FE" />}
              amount={`$ ${expenses.toFixed(2)}`}
              description="Expenses"
            />
            <CardDashboard
              icon={<Warning size={42} color="#4996FE" />}
              amount={`$ ${futureTransactions.toFixed(2)}`}
              description="Pending Transactions"
            />
            <CardDashboard
              icon={<Coins size={42} color="#4996FE" />}
              amount={`$ ${balance.toFixed(2)}`}
              description="Total Balance"
            />
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
}
