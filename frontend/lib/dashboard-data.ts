export interface DailySale {
  date: string;
  amount: number;
}

export interface WeeklySale {
  week: string;
  amount: number;
}

export interface TopDrink {
  name: string;
  orders: number;
  percentage: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: string;
  time: string;
}

// export const dashboardData = {
//   dailySales: [
//     { date: '2026-05-15', amount: 420 },
//     { date: '2026-05-16', amount: 380 },
//     { date: '2026-05-17', amount: 510 },
//     { date: '2026-05-18', amount: 490 },
//     { date: '2026-05-19', amount: 620 },
//     { date: '2026-05-20', amount: 580 },
//     { date: '2026-05-21', amount: 710 },
//   ],
//   weeklySales: [
//     { week: 'Week 1', amount: 2800 },
//     { week: 'Week 2', amount: 3100 },
//     { week: 'Week 3', amount: 2900 },
//     { week: 'Week 4', amount: 3400 },
//   ],
//   topDrinks: [
//     { name: 'Caramel Macchiato', orders: 1240, percentage: 35 },
//     { name: 'Oat Milk Latte', orders: 980, percentage: 27 },
//     { name: 'Vanilla Sweet Cream', orders: 720, percentage: 20 },
//     { name: 'Matcha Latte', orders: 510, percentage: 18 },
//   ],
//   recentOrders: [
//     {
//       id: "ORD-001",
//       customer: "Alice Johnson",
//       amount: 12.5,
//       status: "Completed",
//       time: "10:30 AM",
//     },
//     {
//       id: "ORD-002",
//       customer: "Bob Smith",
//       amount: 8.0,
//       status: "Completed",
//       time: "11:15 AM",
//     },
//     {
//       id: "ORD-003",
//       customer: "Charlie Brown",
//       amount: 15.25,
//       status: "Pending",
//       time: "12:00 PM",
//     },
//     {
//       id: "ORD-004",
//       customer: "Diana Prince",
//       amount: 22.0,
//       status: "Completed",
//       time: "1:30 PM",
//     },
//     {
//       id: "ORD-005",
//       customer: "Ethan Hunt",
//       amount: 6.5,
//       status: "Cancelled",
//       time: "2:15 PM",
//     },
//   ],
// };
