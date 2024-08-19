const prisma = require("../db/db.config");
const asyncHandler = require("express-async-handler");

const createLoanReq = asyncHandler(async (req, res) => {
  const { userId, reqDate, settlmentDate, amount, remarks, comment } = req.body;

  const newLoanReq = await prisma.loan_Request.create({
    data: {
      reqDate: reqDate,
      settlmentDate: settlmentDate,
      amount: amount,
      remarks: remarks || null,
      comment: comment || null,
      user: {
        connect: { id: userId },
      },
    },
  });
  return res.json({ status: 200, newLoanReq });
});

// const createLoanReq = asyncHandler(async (req, res) => {
//   const { userId, reqDate, settlmentDate, amount, remarks, comment } = req.body;

//   try {
//     // Start a transaction
//     const [newLoanReq] = await prisma.$transaction([
//       prisma.loan_Request.create({
//         data: {
//           reqDate: reqDate || null,
//           settlmentDate: settlmentDate || null,
//           amount: amount,
//           remarks: remarks || null,
//           comment: comment || null,
//           user: {
//             connect: { id: userId },
//           },
//         },
//       }),
//     ]);

//     return res.json({ status: 200, newLoanReq });
//   } catch (error) {
//     console.error("Error creating loan request:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

const getAllLoanReq = asyncHandler(async (req, res) => {
  const loanReq = await prisma.loan_Request.findMany({
    include: {
      user: true, // Include the related User data
    },
  });
  return res.json({ status: 200, data: loanReq });
});

const getaLoan = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const loan = await prisma.loan_Request.findFirst({
    where: {
      id: id,
    },
    include: { user: true },
  });
  return res.json({ status: 200, data: loan });
});

const updateLoanReqStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { comment } = req.body;

  // Validate input
  const validStatuses = ["SUBMITTED", "APPROVED", "REJECTED"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    // Update the status in the database
    const updatedLoanStatus = await prisma.loan_Request.update({
      where: { id },
      data: { isApproved: status, comment: comment },
    });

    // Send the updated record as a response
    res.json({ status: 200, data: updatedLoanStatus });
  } catch (error) {
    console.error("Error updating loan application status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateLoanReq = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { reqDate, settlmentDate, amount, remarks, comment, created_at } =
    req.body;

  const loanDataToUpdate = {}; // Initialize an empty object to store the fields to update

  // Check each field in the request body and add it to the userDataToUpdate object if it exists
  if (reqDate !== undefined) loanDataToUpdate.reqDate = reqDate;
  if (settlmentDate !== undefined)
    loanDataToUpdate.settlmentDate = settlmentDate;
  if (amount !== undefined) loanDataToUpdate.amount = amount;
  if (remarks !== undefined) loanDataToUpdate.remarks = remarks;
  if (comment !== undefined) loanDataToUpdate.comment = comment;
  if (created_at !== undefined) loanDataToUpdate.created_at = created_at;

  // Update the user with the provided data
  await prisma.loan_Request.update({
    where: {
      id: id,
    },
    data: loanDataToUpdate, // Pass the userDataToUpdate object
  });

  res.json({ status: 200 });
});

const deleteLoanReq = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the bank detail exists
    const loan = await prisma.loan_Request.findUnique({
      where: { id: id },
    });

    if (!loan) {
      return res.status(404).json({ error: "loan not found" });
    }

    // Delete the bank detail
    await prisma.loan_Request.delete({
      where: { id: id },
    });

    return res.json({ status: 200, message: "Loan deleted successfully" });
  } catch (error) {
    console.error("Error deleting Loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  createLoanReq,
  getAllLoanReq,
  getaLoan,
  updateLoanReqStatus,
  updateLoanReq,
  deleteLoanReq,
};
