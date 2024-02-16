import * as React from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';

import Title from './Layouts/Title';

export default function Chart() {
  const theme = useTheme();

  const [bookingData, setBookingData] = React.useState([]);

  // Fetch booking data from the API
  React.useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookingData(response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };
  
    fetchBookingData();
  }, []);
  
  // Aggregate booking data by month
  const aggregateDataByMonth = () => {
    const aggregatedData = {};

    // Group bookings by month
    bookingData.forEach((booking) => {
      const month = new Date(booking.bookingStart).getMonth();
      if (!aggregatedData[month]) {
        aggregatedData[month] = 1;
      } else {
        aggregatedData[month]++;
      }
    });

    // Convert aggregated data to array format expected by the chart
    const dataArray = Object.entries(aggregatedData).map(([month, count]) => ({
      time: month, // Month is used as time
      amount: count,
    }));

    return dataArray;
  };

  // Format booking data for the chart
  const data = aggregateDataByMonth();

  return (
    <React.Fragment>
      <Title>Reservations by Month</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: {
                ...theme.typography.body2,
                fill: theme.palette.text.secondary,
              },
            },
          ]}
          yAxis={[
            {
              label: 'Reservations',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: {
                ...theme.typography.body2,
                fill: theme.palette.text.secondary,
              },
              tickNumber: 5,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.mode === 'light' ? '#000' : '#fff', // Set color to black in light mode and white in dark mode
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
