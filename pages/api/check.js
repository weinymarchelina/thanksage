const jwt = require("jsonwebtoken");
import Cookies from "cookies";
const apiSecret = process.env.SECRET;
const User = require("../../models/user");
import dbConnect from "../../db/database";

dbConnect();

export default async (req, res) => {
  const cookies = new Cookies(req, res);

  const token = cookies.get("jwt");
  if (token) {
    jwt.verify(token, apiSecret, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Please login first",
        });
      } else {
        const user = await User.findOne({ _id: decodedToken.grants.identity });
        res.status(200).json({
          message: "Success! You can send msg now",
          user,
        });
      }
    });
  } else {
    res.status(401).json({
      message: "Please login first",
    });
  }
};
