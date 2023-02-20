const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");
const USER = require("./user");
const user = require("./user");
const app = express();
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.DBURL, () => {
  console.log("DB Connected");
});

app.post("/users1", async (req, res) => {
  try {
    const user1 = await USER.create(req.body);
    res.json(user1);
  } catch (error) {
    console.log(error);
  }
});

app.get("/users1", async (req, res) => {
    try {
      const users = await USER.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  });
  
  app.put("/users1/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await USER.findByIdAndUpdate(
     id,
        req.body,
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
    }
  });
  
  app.delete("/users1/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await USER.findByIdAndDelete(id
      );
      res.json(deletedUser);
    } catch (error) {
      console.log(error);
    }
  });
app.listen(process.env.URL, () => {
  console.log(`Server is running on ${process.env.URL}`);
});