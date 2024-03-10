Approach Documentation of DashBoard, TabView and DateSelector components
![Screenshot (21)](https://github.com/blackdevil0071/refineUI/assets/76084841/621e7774-c0fa-447d-9ab4-56b64240d5e9)
![Screenshot (22)](https://github.com/blackdevil0071/refineUI/assets/76084841/e2e77cfa-239f-4265-a8d2-2827dc2af2ad)
![Screenshot (23)](https://github.com/blackdevil0071/refineUI/assets/76084841/066cf388-bf43-4b62-8044-93f7306671b0)


TabView

The [TabView] component is a React functional component used in the context of a dashboard to display multiple tabs, each containing different charts. It allows users to switch between tabs and change the time frame for data visualisation.
Implementation:
Tab Structure:
The component uses a [TabItem] component to represent each tab in the dashboard.
The [TabPanel] component is used to display the content corresponding to the active tab.
State Management:
The component manages state using the [useState] hooks for different states.
Date Range Calculation:
The [calculateDateRange] function is used to determine the start and end dates based on the selected time frame (7 or 14 days).
Button Click Handling:
The [handleButtonClick] function is triggered when the user clicks on a time frame button. It calculates the new date range, updates the time frame and updates the charts.
The useEffect hook is used to reset the disabled buttons when the selected time frame changes.
Rendering:
The component renders a container div for the entire dashboard with tabs, a date selector, and chart panels..
Styling:
CSS classes are used to style the buttons, date selector container, and overall layout.
Media queries are implemented to adjust the layout for larger screen
Assumptions:
The component assumes the existence of all the components.
The DateSelctor component is assumed to handle date range selection.


DateSelector

The [DateSelector] component is a React functional component responsible for rendering a date picker for selecting start and end dates. It communicates with the parent component by updating the charts when the date range changes.
Implementation:
The component uses the [useState] hook to manage the selected start and end dates.
Date Change Handling:
The [handleDateChange] function is called when the user selects start or end dates. It updates the state and triggers the charts with the adjusted start and end dates.
Rendering
The component renders a div container for the date picker using the reactDatePicker library.
Two date pickers are used, one for the start date and one for the end date.
Styling:
CSS classes are applied for styling.
Assumptions:

The react-datepicker library is assumed to be installed and properly configured.
Style classes such as buttons, custom-input and custom-calendar etc..  are assumed to be defined in an external stylesheet.

![Screenshot (4)](https://github.com/blackdevil0071/refineUI/assets/76084841/da85c2e6-d8ad-4238-bf0c-927cd53382e4)

3.DashBoard

The [DashBoard] component is a React functional component representing the main dashboard layout. It includes charts for daily revenue, daily orders, new customers, statistics, and recent sales.
Implementation:
State Management:
The component uses the [useState] hook to manage the selected time frame and selected start and end dates.:
The [useEffect] hook is used to set the initial date range when the component mounts.
Date Range Calculation:
The [calculateDateRange] function is used to determine the start and end dates based on the selected time frame.
Data Fetching:
The component fetches daily revenue, daily orders, and new customers data using the [useList] hook from the refine core library.


This Chart Data Memoization function is used to memoize chart data transformations for better performance.
Rendering:
The component renders a [TabView] component for charts, and a [RecentSales] component.

Assumptions:


The [ResponsiveAreaChart, ResponsiveBarChart,TabView and RecentSales], components are assumed to be correctly implemented and available.
Styling classes are assumed to be defined in an external stylesheets.
