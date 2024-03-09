import React, { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";
import "./TabView.css";
import DateSelector from "./DateSelector";

const BUTTON_7_DAYS_TEXT = 'Mar 2, 2024 - Mar 9, 2024';
const BUTTON_14_DAYS_TEXT = 'Feb 24, 2024 - Mar 9, 2024';

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

  const calculateDateRange = (days: number): [Date, Date] => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days);
    return [startDate, endDate];
  };

  const handleButtonClick = (timeFrame: "7days" | "14days", days: number) => {
    const [startDate, endDate] = calculateDateRange(days);
    handleTimeFrameChange(timeFrame);
    onDateRangeChange(startDate, endDate);
    // Update the key to force re-render DateSelector and clear its state
    setDateSelectorKey((prevKey) => prevKey + 1);
  };

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
          onClick={() => handleButtonClick("7days", 7)}
          disabled={selectedTimeFrame === "7days"}
        >
          {BUTTON_7_DAYS_TEXT}
        </button>

        <button
          onClick={() => handleButtonClick("14days", 14)}
          disabled={selectedTimeFrame === "14days"}
        >
          {BUTTON_14_DAYS_TEXT}
        </button>
      </div>
    </div>
  );
};
