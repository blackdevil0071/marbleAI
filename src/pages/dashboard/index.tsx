import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import "./index.css";

export const Dashboard: React.FC = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<"7days" | "14days">("7days");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleTimeFrameChange = (newTimeFrame: "7days" | "14days") => {
    setSelectedTimeFrame(newTimeFrame);
    console.warn("Button Clicked");
  };

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const getDailyFilters = (days: number, startDate?: Date | null, endDate?: Date | null): CrudFilter[] => [
    {
      field: "start",
      operator: "eq",
      value: startDate || dayjs().subtract(days, "days").startOf("day"),
    },
    {
      field: "end",
      operator: "eq",
      value: endDate || dayjs().startOf("day"),
    },
  ];

  const useDailyData = (resource: string) => {
    return useList<IChartDatum>({
      resource,
      filters: getDailyFilters(selectedTimeFrame === "7days" ? 7 : 14, selectedStartDate, selectedEndDate),
    });
  };

  const { data: dailyRevenue } = useDailyData("dailyRevenue");
  const { data: dailyOrders } = useDailyData("dailyOrders");
  const { data: newCustomers } = useDailyData("newCustomers");

  const useMemoizedChartData = (data: any) => {
    return useMemo(() => {
      return data?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [data]);
  };

  const memoizedRevenueData: IChartDatum[] = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData: IChartDatum[] = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomerData: IChartDatum[] = useMemoizedChartData(newCustomers);

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveAreaChart
          kpi="Daily revenue"
          data={memoizedRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
    {
      id: 2,
      label: "Daily Orders",
      content: (
        <ResponsiveBarChart
          kpi="Daily orders"
          data={memoizedOrdersData}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: "rgba(255, 159, 64, 0.7)",
          }}
        />
      ),
    },
    {
      id: 3,
      label: "New Customers",
      content: (
        <ResponsiveAreaChart
          kpi="New Customers"
          data={memoizedNewCustomerData}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Stats {...{ dailyRevenue, dailyOrders, newCustomers }} />
      <TabView
        tabs={tabs}
        handleTimeFrameChange={handleTimeFrameChange}
        selectedTimeFrame={selectedTimeFrame}
        onDateRangeChange={handleDateRangeChange}
      />
      <RecentSales />
    </>
  );
};

export default Dashboard;
