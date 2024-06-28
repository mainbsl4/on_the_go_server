const express = require("express");
const app = express();
const cors = require("cors")
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan")
const authRouter = require("./routes/authRoute");
const bankDetailsRoute = require("./routes/bankDetailsRoute");
const visaApplyRoute = require("./routes/visaApplyRoute");
const loanReqRoute = require("./routes/loanReqRoute");
const depositRoute = require("./routes/depositRoute");
app.use(cors()); 
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.send('App running')
})

app.use("/api/user", authRouter);
app.use("/api/mst_bank_details", bankDetailsRoute);
app.use("/api/visa_apply", visaApplyRoute);
app.use("/api/loan_request", loanReqRoute);
app.use("/api/deposit", depositRoute);






app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
