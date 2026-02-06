import express from 'express';
import {
  createDonationReceipt,
  getDonationReceipts,
} from '../controllers/donationReceiptController.js';

const router = express.Router();

router.post('/api/v2/createdonationreceiptds', createDonationReceipt);
router.get('/api/v2/getdonationreceiptsds', getDonationReceipts);

export default router;
