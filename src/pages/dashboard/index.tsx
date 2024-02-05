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
import { set } from "react-hook-form";

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

  const [selectedFilters, setSelectedFilters] = useState<{
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
    const industriesData = [
      {
        industry: "Advertising",
        withdrawsSum: "577.56",
        depositsSum: "699.23",
      },
      {
        industry: "Apparel",
        withdrawsSum: "6433.99",
        depositsSum: "6804.15",
      },
      {
        industry: "Food Consumer Products",
        withdrawsSum: "10006.43",
        depositsSum: "9850.35",
      },
      {
        industry: "Oil and Gas Equipment",
        withdrawsSum: "7002.08",
        depositsSum: "6799.26",
      },
      {
        industry: "Hotels",
        withdrawsSum: "5162.69",
        depositsSum: "5361.14",
      },
      {
        industry: "Airlines",
        withdrawsSum: "3437.81",
        depositsSum: "3867.79",
      },
      {
        industry: "Computer Software",
        withdrawsSum: "5595.59",
        depositsSum: "6369.54",
      },
      {
        industry: "Education",
        withdrawsSum: "1118.14",
        depositsSum: "907.24",
      },
      {
        industry: "Automotive Retailing",
        withdrawsSum: "3261.49",
        depositsSum: "4025.48",
      },
      {
        industry: "Mail",
        withdrawsSum: "748.93",
        depositsSum: "592.12",
      },
    ];    

    const newChartData = industriesData.map(({ industry, withdrawsSum, depositsSum }) => ({
      name: industry,
      deposit: Number(depositsSum),
      withdraw: Number(withdrawsSum),
    }));

    console.log(newChartData)

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

      selectedFilters.dates.forEach((date) => {
        queryParams.append("months", date);
      });

      selectedFilters.industries.forEach((industry) => {
        queryParams.append("industries", industry);
      });

      selectedFilters.accounts.forEach((account) => {
        queryParams.append("accounts", account);
      });

      selectedFilters.states.forEach((state) => {
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
        setBalance(Number(data.depositsSum - data.withdrawsSum));
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
  }, [selectedFilters]);

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
                  setSelectedFilters({
                    ...selectedFilters,
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
