// pages/DonationReceiptsView.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Grid,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import ep1 from '../api/ep1';
import jsPDF from 'jspdf';

const DonationReceiptsViewds = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async (filterStartDate = '', filterEndDate = '') => {
    try {
      let url = '/api/v2/getdonationreceiptsds';
      if (filterStartDate && filterEndDate) {
        url += `?startDate=${filterStartDate}&endDate=${filterEndDate}`;
      }
      const response = await ep1.get(url);
      setReceipts(response.data);
    } catch (error) {
      console.error('Error fetching receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    fetchReceipts(startDate, endDate);
  };

  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    fetchReceipts();
  };

  /* ================= PDF GENERATION ================= */
  const generatePDF = (receipt) => {
    const doc = new jsPDF();

    doc.setFont('helvetica');

    doc.setFontSize(20);
    doc.setTextColor(74, 111, 165);
    doc.text('Vyagrashila Seva Samithi', 105, 30, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('(Registered Religious Trust)', 105, 38, { align: 'center' });

    const trustRegNo = receipt.trustRegNo || 'YPR-4-00351-2025-26';
    const pan = receipt.pan || 'AAETV6768J';

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Trust Regn. No: ${trustRegNo} | PAN: ${pan}`,
      105,
      48,
      { align: 'center' }
    );

    doc.setFontSize(16);
    doc.setTextColor(74, 111, 165);
    doc.text('Donation / Contribution E-Receipt', 105, 65, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Receipt No: ${receipt.receiptNo}`, 20, 75);
    doc.text(
      `Date: ${new Date(receipt.createdAt).toLocaleDateString()}`,
      20,
      81
    );

    doc.setFontSize(12);
    doc.setTextColor(74, 111, 165);
    doc.text('Donor Details', 20, 93);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${receipt.donorName}`, 20, 101);

    doc.setFontSize(12);
    doc.setTextColor(74, 111, 165);
    doc.text('Donation Details', 20, 115);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Amount Received: ₹ ${receipt.amountReceived}`, 20, 123);
    doc.text(`In Words: ${receipt.amountInWords}`, 20, 129);

    doc.text(
      `Mode of Payment: ${receipt.modeOfPayment}`,
      20,
      135
    );

    doc.setFontSize(12);
    doc.setTextColor(74, 111, 165);
    doc.text('Declaration', 20, 150);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(
      'This donation has been received towards the',
      20,
      158
    );
    doc.text(
      'religious/charitable purposes of the Trust.',
      20,
      164
    );

    doc.text('For Vyagrashila Seva Samithi', 20, 185);
    doc.text('Authorized Signatory', 20, 195);

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      '*This is a digitally generated receipt and does not require a physical signature.*',
      20,
      210
    );

    doc.save(`Donation_Receipt_${receipt.receiptNo}.pdf`);
  };

  /* ================= UI ================= */
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#4a6fa5' }}>
          Donation Receipts
        </Typography>

        {/* ===== DATE FILTER ===== */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={handleFilter} fullWidth>
                  Filter
                </Button>
                <Button variant="outlined" onClick={handleClearFilter} fullWidth>
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ===== TABLE ===== */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Receipt No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Donor Name</TableCell>
                <TableCell>Amount (₹)</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt._id}>
                  <TableCell>{receipt.receiptNo}</TableCell>
                  <TableCell>
                    {new Date(receipt.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{receipt.donorName}</TableCell>
                  <TableCell>{receipt.amountReceived}</TableCell>
                  <TableCell>{receipt.modeOfPayment}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => generatePDF(receipt)}
                      title="Download PDF"
                    >
                      <Download />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {receipts.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No donation receipts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DonationReceiptsViewds;
  