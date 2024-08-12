const prisma = require("../db/db.config");
const asyncHandler = require("express-async-handler");
const upload = require('../middleware/upload');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');





// const createDeposit = asyncHandler(async (req, res) => {
//     const {
//         userId,
//         dpType,
//         date,
//         amount,
//         bankName,
//         trnId,
//         chequeNo,
//         slipImage,
//         comment
//     } = req.body;

//     console.log( req.body);

//     const formatedAmount = JSON.parse(req.body.amount)

//     try {
//         const userExists = await prisma.user.findUnique({ where: { id: userId } });

//         if (!userExists) {
//             return res.status(400).json({ error: 'User not found' });
//         }


//         const newDeposit = await prisma.deposit_Request.create({
//             data: {
//                 dpType: dpType,
//                 date: date,
//                 amount: formatedAmount,
//                 bankName: bankName,
//                 trnId: trnId || null,
//                 chequeNo: chequeNo || null,
//                 comment: comment || null,
//                 paySlip: null,
//                 slipImage: slipImage || null,
//                 user: {
//                     connect: { id: userId }
//                 }
//             },
//         });

//         return res.json({ status: 200, newDeposit });
//     } catch (error) {
//         console.error('Error creating visa application:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

const createDeposit = asyncHandler(async (req, res) => {
    const {
        userId,
        dpType,
        date,
        amount,
        bankName,
        trnId,
        chequeNo,
        slipImage,
        comment
    } = req.body;

    console.log(req.body);

    // Ensure amount is a valid number
    const formattedAmount = JSON.parse(req.body.amount)

    try {
        // Start a transaction
        const [userExists] = await prisma.$transaction([
            prisma.user.findUnique({ where: { id: userId } }),
        ]);

        if (!userExists) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Create deposit request within a transaction
        const [newDeposit] = await prisma.$transaction([
            prisma.deposit_Request.create({
                data: {
                    dpType: dpType || null,
                    date: date || null,
                    amount: formattedAmount,
                    bankName: bankName || null,
                    trnId: trnId || null,
                    chequeNo: chequeNo || null,
                    comment: comment || null,
                    slipImage: slipImage || null,
                    user: {
                        connect: { id: userId }
                    }
                },
            }),
        ]);

        return res.json({ status: 200, newDeposit });
    } catch (error) {
        console.error('Error creating deposit request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



const getAllDeposit = asyncHandler(async (req, res) => {
    const allDeposit = await prisma.deposit_Request.findMany({
        include: {
            user: true // Include the related User data
        }
    })
    return res.json({ status: 200, data: allDeposit })
})


const getaDeposit = asyncHandler(async (req, res) => {

    const id = req.params.id
  
    const deposit = await prisma.deposit_Request.findFirst({
      where: {
        id: id
      },
      include: { user: true, },
    })
    return res.json({ status: 200, data: deposit })
  });



const updateDepositReqStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { comment } = req.body;

    // Validate input
    const validStatuses = ['SUBMITTED', 'APPROVED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        // Update the status in the database
        const updatedDepositStatus = await prisma.deposit_Request.update({
            where: { id },
            data: { isApproved: status, comment: comment },
        });

        // Send the updated record as a response
        res.json({ status: 200, data: updatedDepositStatus });
    } catch (error) {
        console.error('Error updating deposit application status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const updateDeposit = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {
        dpType,
        date,
        amount,
        bankName,
        chequeNo,
        slipImage,
        comment,
        trnId,
        created_at
    } = req.body;

    const formatedAmount = JSON.parse(req.body.amount)
    const DepositDataToUpdate = {}; // Initialize an empty object to store the fields to update

    // Check each field in the request body and add it to the userDataToUpdate object if it exists
    if (dpType !== undefined) DepositDataToUpdate.dpType = dpType;
    if (date !== undefined) DepositDataToUpdate.date = date;
    if (amount !== undefined) DepositDataToUpdate.amount = formatedAmount;
    if (bankName !== undefined) DepositDataToUpdate.bankName = bankName;
    if (trnId !== undefined) DepositDataToUpdate.trnId = trnId;
    if (chequeNo !== undefined) DepositDataToUpdate.chequeNo = chequeNo;
    if (slipImage !== undefined) DepositDataToUpdate.slipImage = slipImage;
    if (comment !== undefined) DepositDataToUpdate.comment = comment;
    if (created_at !== undefined) DepositDataToUpdate.created_at = created_at;

    // Update the user with the provided data
    await prisma.deposit_Request.update({
        where: {
            id: id
        },
        data: DepositDataToUpdate // Pass the userDataToUpdate object
    });

    res.json({ status: 200 });
});


const deleteDeposit = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the bank detail exists
        const deposit = await prisma.deposit_Request.findUnique({
            where: { id: id },
        });

        if (!deposit) {
            return res.status(404).json({ error: 'loan not found' });
        }

        // Delete the bank detail
        await prisma.deposit_Request.delete({
            where: { id: id },
        });

        return res.json({ status: 200, message: 'Deposit deleted successfully' });
    } catch (error) {
        console.error('Error deleting deposit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
























module.exports = {
    createDeposit,
    getAllDeposit,
    getaDeposit,
    updateDepositReqStatus,
    updateDeposit,
    deleteDeposit
};




