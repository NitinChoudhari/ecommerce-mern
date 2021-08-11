import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, getCartItems } from "../../actions";
import { createOrder } from "../../actions/order.action";
import Layout from "../../components/Layout/index.";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import CartPage from "../CartPage";
import AddressForm from "./AddressForm";
import "./style.css";
/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressConatiner">
      <div>
        <input name="address" type="radio" onClick={() => selectAddress(adr)} />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="Edit"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state}-${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title={"DELIVERY HERE"}
                style={{ width: "250px", padding: "8px 0" }}
                onClick={() => confirmDeliveryAddress(adr)}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [newAddressFormModal, setnewAddressFormModal] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setconfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const dispatch = useDispatch();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setconfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    const updateAddress = address.map((adr) =>
      adr._id == addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updateAddress);
  };

  const enableAddressEditForm = (addr) => {
    const updateAddress = address.map((adr) =>
      adr._id == addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updateAddress);
  };

  const onConfirmOrder = () =>{
   const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0)

    const items = Object.keys(cart.cartItems).map((key) => 
      ({ productId: key,
        payablePrice: cart.cartItems[key].price,
        purchasedQty: cart.cartItems[key].qty
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus:"pending"
    };
    dispatch(createOrder(payload));
    setConfirmOrder(true);
  }

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setconfirmAddress(true);
    setOrderSummary(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    user.address.length === 0 && setnewAddressFormModal(true);
  }, [user.address]);

  if(confirmOrder){
    return(
      <Layout>
        <Card>
          <div>Thank You..</div>
        </Card>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"1"}
            title={"Login"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullname}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"Delivery Address"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      adr={adr}
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                    />
                  ))
                )}
              </>
            }
          />
          {confirmAddress ? null : newAddressFormModal ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              onClick={() => {
                setnewAddressFormModal(true);
              }}
            />
          )}
          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />
          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}
          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div className="flexRow" 
                  style={{ 
                    alignItems:"center",
                    padding:"20px"
                    }}>
                  <input type="radio" name="paymentoption" value="cod" />
                  <div> Cash On Delivery</div>
                  <MaterialButton
                    title={"Confirm Order"}
                    onClick={onConfirmOrder}
                    style={{
                      width:"200px",
                      padding:"0 0 20px 20px"
                    }}
                  />
                  </div>
                </div>
              )
            }
          />
        </div>
        {/* Price Component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
