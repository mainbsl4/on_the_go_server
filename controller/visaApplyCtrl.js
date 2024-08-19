const prisma = require("../db/db.config");
const asyncHandler = require("express-async-handler");
const upload = require("../middleware/upload");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { log } = require("util");

const createVisaApply = asyncHandler(async (req, res) => {
  const {
    userId,
    foreignAdd,
    localAdd,
    profession,
    email,
    mobileNo,
    dob,
    religion,
    buyingPrise,
    sellingPrise,
    trackingId,
    applyForCountry,
    deliveredVisa,
    applicationCopy,
    paymentReceive,
    passExpiryDate,
    passportNo,
    nationality,
    gender,
    surName,
    givenName,
    passportPdf,
    otherDocumentPdf,
    previousPassPdf,
    image,
    comment,
  } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      return res.status(400).json({ error: "User not found" });
    }

    const newApply = await prisma.visa_Apply.create({
      data: {
        givenName: givenName,
        surName: surName || null,
        gender: gender,
        nationality: nationality,
        passportNo: passportNo,
        passExpiryDate: passExpiryDate,
        dob: dob,
        religion: religion || null,
        buyingPrise: buyingPrise || null,
        sellingPrise: sellingPrise || null,
        trackingId: trackingId || null,
        applyForCountry: applyForCountry,
        deliveredVisa: deliveredVisa || deliveredVisa,
        applicationCopy: applicationCopy || applicationCopy,
        paymentReceive: paymentReceive || paymentReceive,
        mobileNo: mobileNo || null,
        comment: comment || null,
        email: email || null,
        profession: profession || null,
        localAdd: localAdd || null,
        foreignAdd: foreignAdd || null,
        passportPdf: passportPdf,
        otherDocumentPdf: otherDocumentPdf || null,
        previousPassPdf: previousPassPdf || null,
        image: image,
        user: {
          connect: { id: userId },
        },
      },
    });

    return res.json({ status: 200, newApply });
  } catch (error) {
    console.error("Error creating visa application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// const createVisaApply = asyncHandler(async (req, res) => {
//   const {
//     userId,
//     foreignAdd,
//     localAdd,
//     profession,
//     email,
//     mobileNo,
//     dob,
//     religion,
//     buyingPrise,
//     sellingPrise,
//     trackingId,
//     applyForCountry,
//     deliveredVisa,
//     applicationCopy,
//     paymentReceive,
//     passExpiryDate,
//     passportNo,
//     nationality,
//     gender,
//     surName,
//     givenName,
//     passportPdf,
//     otherDocumentPdf,
//     previousPassPdf,
//     image,
//     comment,
//   } = req.body;

//   try {
//     // Check if user exists
//     const userExists = await prisma.user.findUnique({ where: { id: userId } });

//     if (!userExists) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Create visa application within a transaction
//     const newApply = await prisma.$transaction(async (prisma) => {
//       const newApply = await prisma.visa_Apply.create({
//         data: {
//           givenName: givenName,
//           surName: surName || null,
//           gender: gender,
//           nationality: nationality,
//           passportNo: passportNo,
//           passExpiryDate: passExpiryDate,
//           dob: dob,
//           religion: religion || null,
//           buyingPrise: buyingPrise || null,
//           sellingPrise: sellingPrise || null,
//           trackingId: trackingId || null,
//           applyForCountry: applyForCountry,
//           deliveredVisa: deliveredVisa || deliveredVisa,
//           applicationCopy: applicationCopy || applicationCopy,
//           paymentReceive: paymentReceive || paymentReceive,
//           mobileNo: mobileNo || null,
//           comment: comment || null,
//           email: email || null,
//           profession: profession || null,
//           localAdd: localAdd || null,
//           foreignAdd: foreignAdd || null,
//           passportPdf: passportPdf,
//           otherDocumentPdf: otherDocumentPdf || null,
//           previousPassPdf: previousPassPdf || null,
//           image: image,
//           user: {
//             connect: { id: userId },
//           },
//         },
//       });

//       return newApply;
//     });

//     return res.json({ status: 200, newApply });
//   } catch (error) {
//     console.error("Error creating visa application:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

const getAllVisaApply = asyncHandler(async (req, res) => {
  const allVisa = await prisma.visa_Apply.findMany({
    include: {
      user: true, // Include the related User data
    },
  });

  return res.json({ status: 200, data: allVisa });
});

const getaVisaApply = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const visa = await prisma.visa_Apply.findFirst({
    where: {
      id: id,
    },
    include: { user: true },
  });
  return res.json({ status: 200, data: visa });
});

const updateVisaAppStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const {
    buyingPrise,
    sellingPrise,
    trackingId,
    comment,
    deliveredVisa,
    applicationCopy,
    paymentReceive,
  } = req.body;

  // Validate input
  const validStatuses = [
    "SUBMITTED",
    "CANCELLED",
    "RECEIVED",
    "APPLIED",
    "APPROVED",
    "REJECTED",
    "DELIVERED",
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    // Update the status in the database
    const updatedVisaApply = await prisma.visa_Apply.update({
      where: { id },
      data: {
        isApproved: status,
        comment: comment || null,
        buyingPrise: buyingPrise || null,
        sellingPrise: sellingPrise || null,
        deliveredVisa: deliveredVisa || null,
        applicationCopy: applicationCopy || null,
        paymentReceive: paymentReceive || null,
        trackingId: trackingId || null,
      },
    });

    // Send the updated record as a response
    res.json({ status: 200, data: updatedVisaApply });
  } catch (error) {
    console.error("Error updating visa application status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateVisaApply = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const {
    foreignAdd,
    localAdd,
    profession,
    email,
    mobileNo,
    dob,
    religion,
    buyingPrise,
    sellingPrise,
    trackingId,
    applyForCountry,
    deliveredVisa,
    applicationCopy,
    paymentReceive,
    passExpiryDate,
    passportNo,
    nationality,
    gender,
    surName,
    givenName,
    passportPdf,
    otherDocumentPdf,
    previousPassPdf,
    image,
    comment,

    created_at,
  } = req.body;

  const visaDataToUpdate = {}; // Initialize an empty object to store the fields to update

  // Check each field in the request body and add it to the userDataToUpdate object if it exists
  if (givenName !== undefined) visaDataToUpdate.givenName = givenName;
  if (surName !== undefined) visaDataToUpdate.surName = surName;
  if (gender !== undefined) visaDataToUpdate.gender = gender;
  if (nationality !== undefined) visaDataToUpdate.nationality = nationality;
  if (passportNo !== undefined) visaDataToUpdate.passportNo = passportNo;
  if (passExpiryDate !== undefined)
    visaDataToUpdate.passExpiryDate = passExpiryDate;
  if (religion !== undefined) visaDataToUpdate.religion = religion;
  if (buyingPrise !== undefined) visaDataToUpdate.buyingPrise = buyingPrise;
  if (sellingPrise !== undefined) visaDataToUpdate.sellingPrise = sellingPrise;
  if (trackingId !== undefined) visaDataToUpdate.trackingId = trackingId;
  if (applyForCountry !== undefined)
    visaDataToUpdate.applyForCountry = applyForCountry;
  if (deliveredVisa !== undefined)
    visaDataToUpdate.deliveredVisa = deliveredVisa;
  if (applicationCopy !== undefined)
    visaDataToUpdate.applicationCopy = applicationCopy;
  if (paymentReceive !== undefined)
    visaDataToUpdate.paymentReceive = paymentReceive;
  if (dob !== undefined) visaDataToUpdate.dob = dob;
  if (mobileNo !== undefined) visaDataToUpdate.mobileNo = mobileNo;
  if (email !== undefined) visaDataToUpdate.email = email;
  if (profession !== undefined) visaDataToUpdate.profession = profession;
  if (localAdd !== undefined) visaDataToUpdate.localAdd = localAdd;
  if (foreignAdd !== undefined) visaDataToUpdate.foreignAdd = foreignAdd;
  if (otherDocumentPdf !== undefined)
    visaDataToUpdate.otherDocumentPdf = otherDocumentPdf;
  if (previousPassPdf !== undefined)
    visaDataToUpdate.previousPassPdf = previousPassPdf;
  if (passportPdf !== undefined) visaDataToUpdate.passportPdf = passportPdf;
  if (image !== undefined) visaDataToUpdate.image = image;
  if (comment !== undefined) visaDataToUpdate.comment = comment;
  if (created_at !== undefined) visaDataToUpdate.created_at = created_at;

  // Update the user with the provided data
  await prisma.visa_Apply.update({
    where: {
      id: id,
    },
    data: visaDataToUpdate, // Pass the userDataToUpdate object
  });

  res.json({ status: 200 });
});

const deleteVisaApp = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the bank detail exists
    const visaApp = await prisma.visa_Apply.findUnique({
      where: { id: id },
    });

    if (!visaApp) {
      return res.status(404).json({ error: "Visa Apply not found" });
    }

    // Delete the bank detail
    await prisma.visa_Apply.delete({
      where: { id: id },
    });

    return res.json({
      status: 200,
      message: "Visa Apply deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Visa Apply:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  createVisaApply,
  getAllVisaApply,
  getaVisaApply,
  updateVisaAppStatus,
  updateVisaApply,
  deleteVisaApp,
};
