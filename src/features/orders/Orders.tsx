import OrdersTable from "./component/OrdersTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Order.module.scss"

const Orders = () => {
  return (
    <div>
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
          <input type="text" placeholder="search" className="toolbar_search" />
        </div>
          <button className="toolbar_filter-new-order">New Order <FontAwesomeIcon icon={faPlus} /></button>
        </div>

        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;
