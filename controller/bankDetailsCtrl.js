const prisma = require("../db/db.config");
const asyncHandler = require("express-async-handler");




const createBankDetails = asyncHandler(async (req, res) => {

    const { bankName, accName, accNo, branch, district , routingNo} = req.body;

    const newBank = await prisma.mst_Bank_Details.create({
        data: {
            bankName: bankName,
            accName: accName,
            accNo: accNo,
            branch: branch,
            district: district,
            routingNo: routingNo

        }
    })
    return res.json({ status: 200, newBank })
});



const getAllBankDetails = asyncHandler(async (req, res) => {
    const bankDetails = await prisma.mst_Bank_Details.findMany()
    return res.json({ status: 200, data: bankDetails })
})


const getaBankDetails = asyncHandler(async (req, res) => {

    const id = req.params.id
  
    const bankDetails = await prisma.mst_Bank_Details.findFirst({
      where: {
        id: id
      },
      include: { user: true, },
    })
    return res.json({ status: 200, data: bankDetails })
  });



const updateBankDetails = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {  bankName, accName, accNo, branch, created_at, routingNo, district} = req.body;
  
    const bankDataToUpdate = {}; // Initialize an empty object to store the fields to update
  
    // Check each field in the request body and add it to the userDataToUpdate object if it exists
    if (bankName !== undefined) bankDataToUpdate.bankName = bankName;
    if (accName !== undefined) bankDataToUpdate.accName = accName;
    if (accNo !== undefined) bankDataToUpdate.accNo = accNo;
    if (branch !== undefined) bankDataToUpdate.branch = branch;
    if (routingNo !== undefined) bankDataToUpdate.routingNo = routingNo;
    if (district !== undefined) bankDataToUpdate.district = district;
    if (created_at !== undefined) bankDataToUpdate.created_at = created_at;
  
    // Update the user with the provided data
    await prisma.mst_Bank_Details.update({
      where: {
        id: id
      },
      data: bankDataToUpdate // Pass the userDataToUpdate object
    });
  
    res.json({ status: 200 });
  });
  







const deleteBankDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the bank detail exists
        const bankDetail = await prisma.mst_Bank_Details.findUnique({
            where: { id: id },
        });

        if (!bankDetail) {
            return res.status(404).json({ error: 'Bank detail not found' });
        }

        // Delete the bank detail
        await prisma.mst_Bank_Details.delete({
            where: { id: id },
        });

        return res.json({ status: 200, message: 'Bank detail deleted successfully' });
    } catch (error) {
        console.error('Error deleting bank detail:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = {
    createBankDetails,
    getAllBankDetails,
    getaBankDetails,
    updateBankDetails,
    deleteBankDetails,

};