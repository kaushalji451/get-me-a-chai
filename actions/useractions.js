"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
//   const secret = "rgxd3Cc7xISEFEiWC9hNykVk";
  var instance = new Razorpay({
    key_id: user.razorpayid,  
    key_secret: user.razorpaysecret
});

// dddd
let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };


let x = await instance.orders.create(options).catch(err => {
    console.error("Razorpay Error:", err);
    throw new Error("Failed to create Razorpay order");
});

//   let x = await instance.orders.create(options);
  // create a payment object which shows a pending payment in the database
  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return x;
};

export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username });
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayments = async (username) => {
  await connectDb();
  // find all payments sorted by decreasing order of amount and flatten object ids
  let p = await Payment.find({ to_user: username, done: true });
  const cleanPayments = p.map((payment) => ({
    ...payment.toObject(), 
    _id: payment._id.toString(),
    createdAt: payment.createdAt.toISOString(),
    updatedAt: payment.updatedAt.toISOString(),
  }));
  return cleanPayments;
};

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);

  // If the username is being updated, check if username is available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    // Now update all the usernames in the Payments table
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};
