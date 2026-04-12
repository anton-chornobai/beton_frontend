import OrdersTable from "./component/OrdersTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Order.module.scss";
import { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import CreateOrderModal from "./component/CreateOrderModal";
import { Order } from "./types/Order";
import { getOrders } from "./api/order";

const Orders = () => {
  const [newProductModalIsOpen, setNewProductModalIsOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrders("/v1/orders");

        if (!res.ok) {
          throw new Error("Error: " + res.status);
        }

        const data = await res.json();
        console.log(data);

        setOrders(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.order_container}>
      <div className="toolbar">
        <h3>Orders</h3>

        <div className="toolbar_analysis">
          {/* <AnalyticsBlock name="Total Orders" procent={10.2} value={30} />
          <AnalyticsBlock name="Total Orders" procent={10.2} value={30} />
          <AnalyticsBlock name="Total Orders" procent={10.2} value={30} />
          <AnalyticsBlock name="Total Orders" procent={10.2} value={30} /> */}
        </div>

        <div className="toolbar_filter">
          {/* <AnalyticsFilter /> */}
          <div>
            <input
              type="text"
              placeholder="search"
              className="toolbar_search"
            />
          </div>
          <button
            onClick={() => setNewProductModalIsOpen(true)}
            className="new_order_button"
          >
            New Order <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {newProductModalIsOpen && (
          <CreateOrderModal
            onClose={() => setNewProductModalIsOpen(false)}
            isOpen={newProductModalIsOpen}
            orders={orders}
            setOrders={setOrders}
          />
        )}

        <OrdersTable orders={orders} loading={loading} />
      </div>
    </div>
  );
};

export default Orders;
