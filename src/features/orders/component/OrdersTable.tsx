import React from "react";


// type Props = {
//   order: {};
// };

const mockOrders = [
    {
      id: "ORD-001",
      date: "2025-01-12",
      customer: "Alice Johnson",
      total: 129.99,
      items: 3,
      delivery: "Courier",
      fulfilled: false,
    },
    {
      id: "ORD-002",
      date: "2025-01-13",
      customer: "Bob Miller",
      total: 49.5,
      items: 1,
      delivery: "Pickup",
      fulfilled: true,
    },
    {
      id: "ORD-003",
      date: "2025-01-14",
      customer: "Charlie Smith",
      total: 278.0,
      items: 5,
      delivery: "Courier",
      fulfilled: false,
    },
    {
      id: "ORD-004",
      date: "2025-01-15",
      customer: "David Green",
      total: 88.75,
      items: 2,
      delivery: "Post",
      fulfilled: true,
    },
  ];
  

const OrdersTable: React.FC = () => {
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Items</th>
          <th>Delivery</th>
          <th>Fulfilled</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {mockOrders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.date}</td>
            <td>{order.customer}</td>
            <td>${order.total.toFixed(2)}</td>
            <td>{order.items}</td>
            <td>{order.delivery}</td>
            <td>{order.fulfilled ? "Yes" : "No"}</td>
            <td>
              <button>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
