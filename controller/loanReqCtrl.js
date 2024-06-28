const prisma = require("../db/db.config");
const asyncHandler = require("express-async-handler");


const createLoanReq = asyncHandler(async (req, res) => {
    const {userId, reqDate, settlmentDate, amount, remarks, refNo } = req.body;

    const newLoanReq = await prisma.loan_Request.create({
        data: {

            reqDate: reqDate,
            settlmentDate: settlmentDate,
            amount: amount,
            remarks: remarks || null,
            refNo: refNo,
            user: {
                connect: { id: userId }
              }
        }
    })
    return res.json({ status: 200, newLoanReq })
})


const getAllLoanReq = asyncHandler(async (req, res) => {
    const loanReq = await prisma.loan_Request.findMany({
        include: {
            user: true // Include the related User data
        }
    })
    return res.json({ status: 200, data: loanReq })
  })
  




module.exports = {
    createLoanReq,
    getAllLoanReq
};