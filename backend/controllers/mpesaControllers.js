import dotenv from "dotenv";
import axios from "axios";
import datetime from "node-datetime";

dotenv.config();

const passKey = process.env.PASSKEY;
const shortCode = process.env.SHORT_CODE;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const mpesaDate = datetime.create().format("YmdHMS");
const baseURL = "https://b0ab-197-237-186-137.ngrok.io";

const password = () => {
  const passString = shortCode + passKey + mpesaDate;
  const base64Encoded = Buffer.from(passString).toString("base64");
  return base64Encoded;
};

// Access Token
export const access = (req, res, next) => {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth = {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(consumerKey + ":" + consumerSecret).toString("base64"),
    },
  };

  axios
    .get(url, auth)
    .then((response) => {
      req.token = response.data.access_token;
      next();
    })
    .catch((error) => console.log(error));
};

// Test Token is being passed
export const accessToken = (req, res) => {
  res.status(200).json({ access_token: req.token });
};

// Register URLs
export const register = (req, res) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";

  const auth = {
    headers: {
      Authorization: "Bearer " + req.token,
    },
  };

  const data = {
    ShortCode: 600987,
    ResponseType: "Completed",
    ConfirmationURL: `${baseURL}/confirmation`,
    ValidationURL: `${baseURL}/validation`,
  };

  axios
    .post(url, data, auth)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log(error));
};

// Confirmation CB API
export const confirmation = (req, res) => {
  console.log("...............Confirmation................");
  console.log(req.body);
};

// Validation CB API
export const validation = (req, res) => {
  console.log("...............Validation................");
  console.log(req.body);
};

// Simulate
export const simulate = (req, res) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
  let auth = {
    headers: {
      Authorization: "Bearer " + req.token,
    },
  };
  const data = {
    ShortCode: 600383,
    CommandID: "CustomerPayBillOnline",
    Amount: 1,
    Msisdn: 254708374149,
    BillRefNumber: "TestAPI",
  };

  axios
    .post(url, data, auth)
    .then((response) => res.json(response.data))
    .catch((error) => console.log(error));
};
