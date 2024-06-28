const prisma = require("../db/db.config");
const asyncHandler = require("express-async-handler");
const upload = require('../middleware/upload');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');





const createDeposit = asyncHandler(async (req, res) => {
    const {
        userId,
        dpType,
        date,
        amount,
        bankName,
        chequeNo
    } = req.body;

    try {
        const userExists = await prisma.user.findUnique({ where: { id: userId } });

        if (!userExists) {
            return res.status(400).json({ error: 'User not found' });
        }



        const slipPdf = req.files['paySlip'] ? req.files['paySlip'][0].path : null;
        //   const slipImage = req.files['image'] ? req.files['image'][0].path : null;
        let slipImage = null;




        if (req.files['image']) {
            const imagePath = req.files['image'][0].path;

            const imageExt = path.extname(imagePath);
            console.log(imageExt);
            const optimizedImagePath = path.join(path.dirname(imagePath), `optimized-${path.basename(imagePath, imageExt)}.jpg`);

            await sharp(imagePath)
                .resize({ width: 400, fit: 'inside' }) // Resize image to fit within 800px width
                .toFormat('jpeg') // Convert all input images to JPEG format
                .jpeg({ quality: 50 }) // Set JPEG quality to 80%
                .toFile(optimizedImagePath);

            fs.unlinkSync(imagePath); // Remove the original file

            slipImage = optimizedImagePath;
        }

        const newDeposit = await prisma.deposit_Request.create({
            data: {
                dpType: dpType,
                date: date,
                amount: amount,
                bankName: bankName,
                chequeNo: chequeNo || null,
                paySlip: slipPdf || null,
                slipImage: slipImage || null,
                user: {
                    connect: { id: userId }
                }
            },
        });

        return res.json({ status: 200, newDeposit });
    } catch (error) {
        console.error('Error creating visa application:', error);
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


























module.exports = {
    createDeposit,
    getAllDeposit
};




