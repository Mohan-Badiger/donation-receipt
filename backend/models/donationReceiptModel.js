import mongoose from "mongoose";

const donationReceiptSchema = new mongoose.Schema(
  {
    receiptNo: {
      type: String,
      unique: true,
    },

    trustRegNo: {
      type: String,
      required: true,
    },

    pan: {
      type: String,
      required: true,
    },

    donorName: {
      type: String,
      required: true,
      trim: true,
    },

    amountReceived: {
      type: Number,
      required: true,
    },

    amountInWords: {
      type: String,
      required: true,
    },

    modeOfPayment: {
      type: String,
      enum: ["Cash", "Online"],
      required: true,
    },

    createdByName: String,
    userId: String,
    colid: String,
  },
  {
    timestamps: true,
  }
);

/* ✅ AUTO-GENERATE RECEIPT NO (ASYNC STYLE — NO next) */
donationReceiptSchema.pre("save", async function () {
  // only generate if receiptNo is missing
  if (this.receiptNo) return;

  const lastReceipt = await mongoose
    .model("DonationReceipt")
    .findOne()
    .sort({ createdAt: -1 })
    .select("receiptNo")
    .lean();

  let nextNumber = 1;

  if (lastReceipt && lastReceipt.receiptNo) {
    nextNumber = parseInt(lastReceipt.receiptNo, 10) + 1;
  }

  this.receiptNo = nextNumber.toString().padStart(2, "0");
});

export default mongoose.model("DonationReceipt", donationReceiptSchema);
