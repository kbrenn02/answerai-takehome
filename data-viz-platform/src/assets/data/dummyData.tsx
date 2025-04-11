export type Variable = {
    name: string;
    description: string;
    category: string;
};
  
export const dummyData: Variable[] = [
    { 
        name: 'CO2 Emissions',
         description: 'Total CO2 emitted by the fleet', 
         category: 'Variable 1' 
    },
    { 
        name: 'Distance Traveled', 
        description: 'Average miles per day',
        category: 'Variable 2' 
    },
    { 
        name: 'Fuel Consumption', 
        description: 'Gallons per 100 miles', 
        category: 'Variable 1' 
    },
    {
      name: 'Idle Time Percentage',
      description:
        'Percentage of time vehicles spend idling, which can indicate fuel inefficiencies and operational downtime, often tied to specific routes or traffic patterns.',
      category: 'Variable 2',
    },
    {
      name: 'Average Speed During Delivery',
      description:
        'Calculated speed during active delivery routes. Helps determine route efficiency and potential delays due to traffic, stops, or slow zones.',
      category: 'Variable 3',
    },
    {
      name: 'Engine Hours',
      description:
        'Total accumulated engine run-time in hours, used to monitor wear and maintenance scheduling for fleet vehicles.',
      category: 'Variable 1',
    },
    {
      name: 'Number of Deliveries Per Day',
      description:
        'Measures how many deliveries each vehicle or driver completes per day. Useful for assessing productivity and route density.',
      category: 'Variable 2',
    },
    {
      name: 'Fuel Efficiency Trend',
      description:
        'Displays the long-term trend of miles per gallon or liters per 100km over a selected period of time to assess performance improvements or degradation.',
      category: 'Variable 1',
    },
    {
      name: 'Driver Behavior Score',
      description:
        'A composite score based on harsh braking, acceleration, cornering, and speeding. Helps evaluate driver safety and performance.',
      category: 'Variable 3',
    },
    {
      name: 'Maintenance Cost per Mile',
      description:
        'Average cost of vehicle maintenance per mile driven. Useful for identifying high-cost vehicles or routes.',
      category: 'Variable 2',
    },
    {
      name: 'Fleet Utilization Rate',
      description:
        'Percentage of fleet that is active and being used for delivery or transport tasks. Low utilization may indicate inefficiencies.',
      category: 'Variable 3',
    },
    {
      name: 'Emissions per Package Delivered',
      description:
        'Average CO2 emissions produced for each package delivered. Helps assess environmental efficiency per delivery unit.',
      category: 'Variable 1',
    },
    {
      name: 'Peak Delivery Hours',
      description:
        'Time windows during which the majority of deliveries occur. Helps in workforce planning and traffic analysis.',
      category: 'Variable 2',
    },
    {
      name: 'Average Load Weight',
      description:
        'Tracks the average weight carried per vehicle per trip to ensure optimal vehicle loading and to prevent overloading.',
      category: 'Variable 3',
    },
    {
      name: 'Out-of-Route Miles',
      description:
        'Miles driven outside of planned delivery routes. High values may indicate poor planning or driver error.',
      category: 'Variable 2',
    },
    {
      name: 'Green Score',
      description:
        'Environmental performance score based on emissions, idling time, and fuel usage. Helps track sustainability goals.',
      category: 'Variable 1',
    },
    {
      name: 'Time at Delivery Location',
      description:
        'Average duration vehicles remain at customer delivery locations. Helps track delivery efficiency and potential delays.',
      category: 'Variable 3',
    },
    {
      name: 'Unplanned Stops',
      description:
        'Number of stops Variable 2t included in the original delivery plan. Could indicate driver breaks, mechanical issues, or emergencies.',
      category: 'Variable 2',
    },
    {
      name: 'Cargo Temperature Stability',
      description:
        'Monitors whether temperature-sensitive cargo maintains required temperature thresholds during transport.',
      category: 'Variable 3',
    },
    {
      name: 'Route Deviation Events',
      description:
        'Instances where drivers deviated from assigned routes. Important for safety and efficiency audits.',
      category: 'Variable 1',
    },
    {
      name: 'Vehicle Downtime',
      description:
        'Total time a vehicle is unavailable due to maintenance or breakdowns. Critical for operational planning.',
      category: 'Variable 2',
    },
    {
      name: 'Real-Time Location Accuracy',
      description:
        'Measures the accuracy of vehicle tracking systems. Higher accuracy ensures better logistics and customer transparency.',
      category: 'Variable 3',
    },
  ];
  