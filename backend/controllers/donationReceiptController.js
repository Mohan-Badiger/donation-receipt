import DonationReceipt from '../models/donationReceiptModel.js';

/* ================= CREATE RECEIPT ================= */
export const createDonationReceipt = async (req, res) => {
  try {
    const {
      trustRegNo,
      pan,
      donorName,
      amountReceived,
      amountInWords,
      modeOfPayment,
      name,
      user,
      colid,
    } = req.body;

    /* ✅ Proper validation */
    if (
      !trustRegNo ||
      !pan ||
      !donorName ||
      amountReceived === undefined ||
      !amountInWords ||
      !modeOfPayment
    ) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const receipt = await DonationReceipt.create({
      trustRegNo,
      pan,
      donorName,
      amountReceived,
      amountInWords,
      modeOfPayment,
      createdByName: name,
      userId: user,
      colid,
    });

    res.status(201).json({
      success: true,
      data: receipt,
    });
  } catch (err) {
    console.error('CREATE RECEIPT ERROR:', err); // 🔥 IMPORTANT

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Duplicate receipt number',
      });
    }

    res.status(500).json({
      message: 'Server error',
    });
  }
};

/* ================= GET ALL RECEIPTS ================= */
export const getDonationReceipts = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const receipts = await DonationReceipt.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(receipts);
  } catch (error) {
    console.error('FETCH RECEIPTS ERROR:', error); // 🔥 IMPORTANT
    res.status(500).json({
      message: 'Failed to fetch donation receipts',
    });
  }
};
