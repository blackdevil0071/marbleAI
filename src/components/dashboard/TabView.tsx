import React, { useState, useEffect } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";
import "./TabView.css";
import DateSelector from "./DateSelector";

type TTabViewProps = {
  tabs: TTab[];
  handleTimeFrameChange: (newTimeFrame: "7days" | "14days") => void;
  selectedTimeFrame: "7days" | "14days";
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
};
export const TabView: React.FC<TTabViewProps> = ({
  tabs,
  handleTimeFrameChange,
  selectedTimeFrame,
  onDateRangeChange,
}: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [dateSelectorKey, setDateSelectorKey] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState<"7days" | "14days" | null>(null);

  const calculateDateRange = (days: number): [Date, Date] => {
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0); // Set to the beginning of the day
  
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days);
  
    return [startDate, endDate];
  };
  

  const handleButtonClick = (timeFrame: "7days" | "14days", days: number) => {
    const [startDate, endDate] = calculateDateRange(days);
    handleTimeFrameChange(timeFrame);
    onDateRangeChange(startDate, endDate);
    setDateSelectorKey((prevKey) => prevKey + 1);
    setDisabledButtons(timeFrame);
  };

  useEffect(() => {
    setDisabledButtons(null);
  }, [selectedTimeFrame]);

  return (
    <div className={`mx-auto py-4 bg-slate-50 border rounded-lg drop-shadow-md`}>
      <div className="tabs">
        {tabs?.map((tab: TTab, index: number) => (
          <TabItem
            key={tab?.id}
            label={tab?.label}
            isActive={index === activeTab}
            clickHandler={() => setActiveTab(index)}
          />
        ))}

        <DateSelector
          key={dateSelectorKey}
          onDateRangeChange={onDateRangeChange}
        />
      </div>

      <div className="mx-auto">
        {tabs?.map((tab: TTab, index: number) => (
          <TabPanel key={tab?.id} isActive={index === activeTab}>
            {tab?.content}
          </TabPanel>
        ))}
      </div>

      <div className="button-container">
        <button
          className={selectedTimeFrame === "7days" ? "active" : ""}
          onClick={() => handleButtonClick("7days", 7)}
          disabled={disabledButtons === "7days"}
        >
          Last 7 days
        </button>

        <button
          className={selectedTimeFrame === "14days" ? "active" : ""}
          onClick={() => handleButtonClick("14days", 14)}
          disabled={disabledButtons === "14days"}
        >
          Last 14 days
        </button>
      </div>
    </div>
  );
};