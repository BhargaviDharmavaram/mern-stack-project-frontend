import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';

const PaymentsPieChart = () => {
  const completedPayments = useSelector((state) => state.payments.completedPayments)
  const pendingPayments = useSelector((state) => state.payments.pendingPayments)

  const completedPaymentsCount = completedPayments.length
  const pendingPaymentsCount = pendingPayments.length
  const payments = completedPaymentsCount + pendingPaymentsCount

  const chartData = [
    ['Task', 'Count'],
    ['Payments', payments],
    ['Completed Payments', completedPaymentsCount],
    ['Pending Payments', pendingPaymentsCount],
  ]

  return (
    <div>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: 'Payments Distribution',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

export default PaymentsPieChart
