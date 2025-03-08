"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
  // const { data: session } = useSession()

  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Thanks for your donation!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push(`/${username}`);
  }, [searchParams, router, username]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = useCallback(async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  }, [username]);

  const pay = async (amount) => {
    if (typeof window === "undefined") return; // Ensure this runs on the client side

    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;

    if (!window.Razorpay) {
      console.error("Razorpay SDK failed to load");
      return;
    }
    var options = {
      key: currentUser.razorpayid,
      amount: amount,
      currency: "INR",
      name: "Get Me A Chai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `http://localhost:3000/api/razorpay`,
      prefill: {
        name: paymentform.name,
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm"
          src={currentUser.coverpic}
          alt=""
        />
        <div className="flex justify-center -mt-20 items-center bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          <img
            className="rounded-full object-cover size-36"
            width={128}
            height={128}
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex justify-center items-center mt-5 pb-20 flex-col gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Lets help {username} get a chai!</div>
        <div className="text-slate-400">
          {payments.length} Payments . ₹
          {payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full  h-110 overflow-auto bg-slate-900 rounded-lg text-white p-2">
            {/* Show list of all the supporters as a leaderboard  */}
            <h2 className="text-2xl font-bold my-5 text-center"> Top 10 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length == 0 && <li>No payments yet</li>}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <img width={33} src="avatar.gif" alt="user avatar" />
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message &quot;{p.message}&quot;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="makePayment w-full  h-110 bg-slate-900 rounded-lg text-white p-4  md:p-8">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              {/* input for name and message   */}
              <div>
                <input
                  onChange={handleChange}
                  value={paymentform.name}
                  name="name"
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter Name"
                />
              </div>
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />

              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />

              <button
                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4 ||
                  paymentform.amount?.length < 1
                }
              >
                Pay
              </button>
            </div>
            {/* Or choose from these amounts  */}
            <div className="flex flex-col flex-row items-center justify-center gap-2 mt-5">
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
