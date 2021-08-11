import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions/order.action";
import Layout from "../../components/Layout/index.";
import Card from "../../components/UI/Card";
import { generatePublicURL } from "../../urlConfig";
import { BiRupee } from 'react-icons/bi';
import "./style.css";

/**
 * @author
 * @function OrdersPage
 **/

const OrdersPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return (
    <Layout>
      {user.orders.map((order) => {
        return order.items.map((item) => (
          <Card
            style={{ maxWidht: "1200px", margin: "5px auto", width: "70%" }}
          >
            <div className="orderItemContainer">
              <div className="orderImgContainer">
                <img
                  className="orderImg"
                  src={generatePublicURL(item.productId.productImage[0].img)}
                  style={{
                    maxHeight: 100,
                    maxWidth: 100,
                  }}
                />
              </div>
              <div className="orderRow"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <div className="orderName">{item.productId.name}</div>
                <div className="orderPrice"><BiRupee/>{item.payablePrice}</div>
                <div>{order.paymentStatus}</div>
              </div>
            </div>
          </Card>
        ));
      })}
    </Layout>
  );
};

export default OrdersPage;
