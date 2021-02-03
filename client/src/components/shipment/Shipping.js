import { useState, useEffect } from "react";
import { shippingPrices } from "../../models/productArrays";
import { Link } from "react-router-dom";

const Shipping = (props) => {
  const { total, cart, removeAllProductsInStorage, redirectToShopAll } = props;
  const [totalPlusShipping, setTotalPlusShipping] = useState(0);
  const [user, setUser] = useState(false);
  const checkStorageForUser = () => {
    if (localStorage.getItem("user") !== null) {
      setUser(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTotalPlusShipping = (id) => {
    return shippingPrices.forEach((item) => {
      if (item.id === id) {
        setTotalPlusShipping(
          Math.round(item.price + parseFloat(total.addSubtotal))
        );
      }
    });
  };

  const redirectToLogin = () => {
    window.location.replace("/login");
  };
  useEffect(() => {
    checkStorageForUser();
  }, []);

  if (cart === null) return "";

  return (
    <>
      <div className="flex flex-row text-center">
        <form
          className="  container border border-box box-2 "
          onSubmit={handleSubmit}
        >
          <h1>Shipping method</h1>
          <p>Select the one you want</p>
          <div>
            {shippingPrices &&
              shippingPrices.map((item) => (
                <div key={item.price}>
                  <h2>{item.method}</h2>
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onClick={() => addTotalPlusShipping(item.id)}
                  />
                  <p>{`£${item.price > 0 ? item.price : "0.00"}`}</p>
                </div>
              ))}
          </div>

          <h2>Coupon code</h2>

          <input
            placeholder="Enter your coupon code…"
            className="bg-gray-700 form-input p-3 mt-1 block w-full item-center"
            type="text"
          />
          <button className="bg-gray-300 rounded h-10 m-5 w-20 hover:opacity-70">
            apply
          </button>
          <div>
            <h2>Total</h2>
            <h2>{`£${totalPlusShipping}.00`}</h2>
          </div>

          <div>
            <button
              className="text-white shadow  bg-black shadow border border-solid
               border-white hover:bg-pink hover:text-black
                active:bg-white-600 font-bold uppercase text-sm px-6 py-3
                 rounded outline-none focus:outline-none mr-1 "
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => {
                removeAllProductsInStorage();
                redirectToShopAll();
              }}
            >
              Empty cart
            </button>{" "}
            {user ? (
              <>
                <Link
                  className="text-white shadow  bg-black shadow border border-solid border-white 
              hover:bg-pink hover:text-black active:bg-white-600 font-bold uppercase
               text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 "
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  to="/checkout"
                  onClick={() => removeAllProductsInStorage()}
                >
                  Check out
                </Link>
              </>
            ) : (
              <>
                <button
                  className="text-white shadow  bg-black shadow border border-solid border-white 
              hover:bg-pink hover:text-black active:bg-white-600 font-bold uppercase
               text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 "
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => redirectToLogin()}
                >
                  go to login
                </button>
                <div className="text-red-400 w-32 m-auto ">
                  <h2>Please login to continue to checkout</h2>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default Shipping;
