import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import axios from "axios";
import datetime from "node-datetime";

dotenv.config();

const passKey = process.env.PASSKEY;
const callBackURL = process.env.CALLBACK_URL;
const shortCode = process.env.SHORT_CODE;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const baseURL = process.env.BASE_URL;
const mpesaDate = datetime.create().format("YmdHMS");

const newPassword = () => {
  const passString = shortCode + passKey + mpesaDate;
  const base64Encoded = Buffer.from(passString).toString("base64");
  return base64Encoded;
};

export const mpesaPassword = expressAsyncHandler(async (req, res) => {
  res.json({ password: newPassword() });
});

export const accessToken = (req, res, next) => {
  const auth =
    "Basic " +
    Buffer.from(consumerKey + ":" + consumerSecret).toString("base64");

  const headers = {
    Authorization: auth,
  };

  axios
    .get(baseURL, { headers })
    .then((response) => {
      let data = response.data;
      let access_token = data.access_token;
      req.token = access_token;
      next();
    })
    .catch((error) => console.log(error));
};

//Register URLs
export const registerURLS = (req, res) => {
  const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
  const auth = "Bearer " + req.token;

  const data = {
    ShortCode: 600983,
    ResponseType: "Completed",
    ConfirmationURL: "https://mydomain.com/confirmation",
    ValidationURL: "https://mydomain.com/validation",
  };

  axios
    .post(url, data, { headers: auth })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.send(err));
};

// STK Push
export const stkPush = (req, res) => {
  const token = req.token;
  const stkURL = process.env.STK_URL;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const amount = 1;
  const mobileNumber = 254702688826;
  const data = {
    BusinessShortCode: shortCode,
    Password: newPassword(),
    Timestamp: mpesaDate,
    TransactionType: "CustomerPayBillOnline",
    Amount: 2,
    PartyA: 254702688826,
    PartyB: shortCode,
    PhoneNumber: 254702688826,
    CallBackURL: "https://mydomain.com/confirmation",
    AccountReference: "House of Glamour",
    TransactionDesc: "Household Products",
  };

  axios
    .post(stkURL, data, { headers: headers })
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
};

export const mpesaConfirmation = (req, res) => {
  console.log("...................Confirmation...............");
  console.log(req.body);
};
