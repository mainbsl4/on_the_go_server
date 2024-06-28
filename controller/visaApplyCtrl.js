const prisma = require("../db/db.config");
const asyncHandler = require("express-async-handler");
const upload = require('../middleware/upload');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');





const createVisaApply = asyncHandler(async (req, res) => {
  const {
    userId,
    foreignAdd,
    localAdd,
    profession,
    email,
    mobileNo,
    dob,
    passExpiryDate,
    passportNo,
    nationality,
    gender,
    surName,
    givenName,
  } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const passportPdf = req.files['passportPdf'] ? req.files['passportPdf'][0].path : null;
    const otherDocumentPdf = req.files['otherDocumentPdf'] ? req.files['otherDocumentPdf'][0].path : null;
    //   const image = req.files['image'] ? req.files['image'][0].path : null;
    let image = null;




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

      image = optimizedImagePath;
    }

    const newApply = await prisma.visa_Apply.create({
      data: {
        givenName: givenName,
        surName: surName,
        gender: gender,
        nationality: nationality,
        passportNo: passportNo,
        passExpiryDate: passExpiryDate,
        dob: dob,
        mobileNo: mobileNo || null,
        email: email || null,
        profession: profession || null,
        localAdd: localAdd || null,
        foreignAdd: foreignAdd || null,
        passportPdf: passportPdf,
        otherDocumentPdf: otherDocumentPdf,
        image: image,
        user: {
          connect: { id: userId }
        }
      },
    });

    return res.json({ status: 200, newApply });
  } catch (error) {
    console.error('Error creating visa application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const getAllVisaApply = asyncHandler(async (req, res) => {
  const allVisa = await prisma.visa_Apply.findMany({
      include: {
          user: true // Include the related User data
      }
  })
  return res.json({ status: 200, data: allVisa })
})





const updateVisaAppStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate input
  const validStatuses = [ 'SUBMITTED', 'CANCELLED', 'RECEIVED', 'APPLIED', 'APPROVED', 'REJECTED'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    // Update the status in the database
    const updatedVisaApply = await prisma.visa_Apply.update({
      where: { id },
      data: { isApproved: status },
    });

    // Send the updated record as a response
    res.json({ status: 200, data: updatedVisaApply });
  } catch (error) {
    console.error('Error updating visa application status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
























module.exports = {
  createVisaApply,
  getAllVisaApply,
  updateVisaAppStatus

};




