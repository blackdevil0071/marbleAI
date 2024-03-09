import React, { useEffect, useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import TabView from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import "./index.css";

export const Dashboard: React.FC = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<"7days" | "14days">("7days");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleTimeFrameChange = (newTimeFrame: "7days" | "14days") => {
    setSelectedTimeFrame(newTimeFrame);
    updateDateRangeFilters(newTimeFrame, selectedStartDate, selectedEndDate);
  };

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    updateDateRangeFilters(selectedTimeFrame, startDate, endDate);
  };

  const updateDateRangeFilters = (
    timeFrame: "7days" | "14days",
    startDate?: Date | null,
    endDate?: Date | null
  ) => {
    const days = timeFrame === "7days" ? 7 : 14;
    const dailyRevenueFilters: CrudFilter[] = getDailyFilters(days, startDate, endDate);
    const dailyOrdersFilters: CrudFilter[] = getDailyFilters(days, startDate, endDate);
    const newCustomersFilters: CrudFilter[] = getDailyFilters(days, startDate, endDate);

    // Fetch data using useList hook for different data sets
    const { data: updatedDailyRevenue } = useList<IChartDatum>({
      resource: "dailyRevenue",
      filters: dailyRevenueFilters,
    });

    const { data: updatedDailyOrders } = useList<IChartDatum>({
      resource: "dailyOrders",
      filters: dailyOrdersFilters,
    });

    const { data: updatedNewCustomers } = useList<IChartDatum>({
      resource: "newCustomers",
      filters: newCustomersFilters,
    });

    // Process the updated data as needed
  };

  // Function to get daily filters based on selectedTimeFrame
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

  // Fetch data using useList hook for different data sets
  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters: getDailyFilters(selectedTimeFrame === "7days" ? 7 : 14, selectedStartDate, selectedEndDate),
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters: getDailyFilters(selectedTimeFrame === "7days" ? 7 : 14, selectedStartDate, selectedEndDate),
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters: getDailyFilters(selectedTimeFrame === "7days" ? 7 : 14, selectedStartDate, selectedEndDate),
  });

  // Function to memoize chart data
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

  // Memoized chart data for different data sets
  const memoizedRevenueData: IChartDatum[] = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData: IChartDatum[] = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomerData: IChartDatum[] = useMemoizedChartData(newCustomers);

  // Tabs configuration
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
      <Stats
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
      />
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
