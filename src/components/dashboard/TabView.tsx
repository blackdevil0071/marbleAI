import React, { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";
import "./TabView.css";
import DateSelector from "./DateSelector"; // Import DateSelector without curly braces

type TTabViewProps = {
  tabs: TTab[];
  handleTimeFrameChange: (newTimeFrame: "7days" | "14days") => void;
  selectedTimeFrame: "7days" | "14days";
  onDateRangeChange: (startDate: Date, endDate: Date) => void; // Add this line
};

const TabView: React.FC<TTabViewProps> = ({
  tabs,
  handleTimeFrameChange,
  selectedTimeFrame,
  onDateRangeChange,
}: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {
        <div
          className={`mx-auto py-4 bg-slate-50 border rounded-lg drop-shadow-md`}
        >
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
              onDateRangeChange={onDateRangeChange}
              onUpdateButtonClick={() => {
                console.log("Update button clicked in TabView!");
              }}
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
              onClick={() => handleTimeFrameChange("7days")}
              disabled={selectedTimeFrame === "7days"}
            >
              Feb 28, 2024 - Mar 06, 2024
            </button>

            <button
              onClick={() => handleTimeFrameChange("14days")}
              disabled={selectedTimeFrame === "14days"}
            >
              Feb 21, 2024 - Mar 06, 2024
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default TabView;
