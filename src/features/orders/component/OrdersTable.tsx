import React, { useEffect, useState } from "react";
import styles from "../Order.module.scss";
import { getOrders } from "../api/order";
import { Order } from "../types/Order";

type Props = {
    loading: boolean
    orders: Order[]
}

const OrdersTable: React.FC<Props> = ({orders, loading}) => {
  const handleCreate = () => {

  }

  const handleViewDetails = (orderId: number) => {
    console.log("View details for order:", orderId);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (orders.length === 0 || !orders) {
    return <p className={styles.not_found}>No orders</p>;
  }

  return (
    <table className={styles.orders_table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ім’я</th>
          <th>Сума</th>
          <th>Статус</th>
          <th>Оплата</th>
          <th>Кількість товарів</th>
          <th>Дата створення</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer_name}</td>
            <td>{order.total} грн</td>
            <td>{order.status}</td>
            <td>{order.payment_status}</td>
            <td>{order.items.length}</td>
            <td>{new Date(order.created_at).toLocaleDateString()}</td>
            <td>
              <button
                className={styles.details_button}
                onClick={() => handleViewDetails(order.id)}
              >
                Деталі
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
