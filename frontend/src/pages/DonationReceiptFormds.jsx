// pages/DonationReceiptForm.jsx
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import {
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import ep1 from '../api/ep1';
import global1 from '../components/global1';
import { Link } from 'react-router-dom';

const DonationReceiptFormds = () => {
  const [formData, setFormData] = useState({
    receiptNo: '000',
    trustRegNo: 'YPR-4-00351-2025-26',
    pan: 'AAETV6768J',
    donorName: '',
    amountReceived: '',
    amountInWords: '',
    modeOfPayment: 'Cash',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ep1.post('/api/v2/createdonationreceiptds', {
        ...formData,
        name: global1.name,
        user: global1.user,
        colid: global1.colid,
      });

      alert('Donation receipt created successfully');

      setFormData({
        receiptNo: '000',
        trustRegNo: 'YPR-4-00351-2025-26',
        pan: 'AAETV6768J',
        donorName: '',
        amountReceived: '',
        amountInWords: '',
        modeOfPayment: 'Cash',
      });

    } catch (err) {
      alert('Failed to create donation receipt');
    } finally {
      setLoading(false);
    }
  };

  /* remove input underline + outline */
  const cleanInput = {
    '& .MuiInputBase-root:before': { borderBottom: 'none' },
    '& .MuiInputBase-root:after': { borderBottom: 'none' },
    '& .MuiInputBase-root:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: 900, mx: 'auto' }}>
      <Paper
        elevation={0}
        sx={{
          background: '#cfe3d4',
          border: '2px solid #000',
          p: { xs: 2, sm: 4 },
          fontFamily: 'Times New Roman, serif',
          position: 'relative',
        }}
      >
        {/* ===== TOP RIGHT ===== */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 16,
            textAlign: 'right',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              px: 2,
              py: 0.6,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.4,
              display: 'inline-block',
            }}
          >
            DONATION RECEIPT
          </Box>

          {/* Receipt No */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mt: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                whiteSpace: 'nowrap',
              }}
            >
              <b>Receipt No :</b>
            </Typography>

            <TextField
              variant="standard"
              name="receiptNo"
              value={formData.receiptNo}
              onChange={handleChange}
              sx={{
                width: 80,
                ml: 1,
                ...cleanInput,
              }}
            />
          </Box>

        </Box>

        <form onSubmit={handleSubmit}>

          {/* ===== HEADER ===== */}
          <Box sx={{ pb: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Box
                  component="img"
                  src={logo}
                  alt="Trust Logo"
                  sx={{
                    width: 120,
                    height: 120,
                    objectFit: 'contain',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={9}>
                <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
                  Vyagrashila Seva Samithi
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                  (Registered Religious Trust)
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* ===== TRUST INFO ===== */}
          <Grid container sx={{ borderBottom: '1px solid #000', py: 1 }}>
            <Grid item xs={12}>
              <Typography fontSize={14}>
                <b>Trust Regn No:</b> {formData.trustRegNo} &nbsp;/&nbsp;
                <b>PAN:</b> {formData.pan}
              </Typography>
            </Grid>
          </Grid>

          {/* ===== NAME ===== */}
          <Grid
            container
            alignItems="center"
            sx={{
              borderBottom: '1px solid #000',
              py: 1,
            }}
          >
            {/* Label */}
            <Grid item xs={12} sm={2}>
              <Typography
                fontSize={15}
                sx={{ whiteSpace: 'nowrap' }}
              >
                <b>Name:</b>
              </Typography>
            </Grid>

            {/* Input */}
            <Grid item xs={12} sm={10}>
              <TextField
                variant="standard"
                fullWidth
                name="donorName"
                value={formData.donorName}
                onChange={handleChange}
                sx={{
                  ml: { sm: 1 },
                  ...cleanInput,
                }}
              />
            </Grid>
          </Grid>


          {/* ===== AMOUNT ===== */}
          <Grid
            container
            sx={{ borderBottom: '1px solid #000', py: 1 }}
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography fontSize={15}>
                <b>Amount:</b>
              </Typography>
            </Grid>

            <Grid item xs={10}>
              <TextField
                variant="standard"
                name="amountReceived"
                value={formData.amountReceived}
                onChange={(e) => {
                  // allow only digits
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData((prev) => ({
                    ...prev,
                    amountReceived: value,
                  }));
                }}
                sx={{
                  width: 160,
                  ...cleanInput,
                }}
                inputProps={{
                  inputMode: 'numeric', // mobile numeric keypad
                  pattern: '[0-9]*',     // blocks text
                }}
                InputProps={{
                  startAdornment: (
                    <Typography sx={{ mr: 0.5, ml: 0.5, fontSize: 15 }}>
                      ₹
                    </Typography>
                  ),
                }}
              />
            </Grid>
          </Grid>



          {/* ===== AMOUNT IN WORDS ===== */}
          <Grid
            container
            alignItems="center"
            sx={{
              borderBottom: '1px solid #000',
              py: 1,
            }}
          >
            {/* Label */}
            <Grid item xs={12} sm={4}>
              <Typography fontSize={15}>
                <b>(Rupees in words) :</b>
              </Typography>
            </Grid>

            {/* Input */}
            <Grid item xs={12} sm={8}>
              <TextField
                variant="standard"
                fullWidth
                name="amountInWords"
                value={formData.amountInWords}
                onChange={handleChange}
                sx={{
                  ml: { sm: 1 },
                  ...cleanInput,
                }}
              />
            </Grid>
          </Grid>


          {/* ===== PAYMENT MODE ===== */}
          <Grid
            container
            alignItems="center"
          >
            {/* Label */}
            <Grid item xs={12} sm={4}>
              <Typography
                fontSize={15}
                sx={{ whiteSpace: 'nowrap' }}
              >
                <b>Mode of Payment:</b>
              </Typography>
            </Grid>

            {/* Options */}
            <Grid item xs={12} sm={8}>
              <RadioGroup
                row
                name="modeOfPayment"
                value={formData.modeOfPayment}
                onChange={handleChange}
                sx={{
                  ml: { sm: 1 },
                }}
              >
                <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="Online" control={<Radio />} label="Online" />
              </RadioGroup>
            </Grid>
          </Grid>


          {/* ===== DECLARATION + SIGNATURE ===== */}
          <Grid
            container
            sx={{
              borderTop: '1px solid #000',
              pt: 2,

            }}
          >
            {/* Declaration - Left */}
            <Grid item xs={12} sm={7}>
              <Typography fontSize={14}>
                <b>Declaration:</b>
              </Typography>
              <Typography fontSize={14} sx={{ mt: 0.5, maxWidth: '95%' }}>
                This donation has been received towards the
                religious/charitable purposes of the Trust.
              </Typography>
            </Grid>

            {/* Signature - Right */}
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                textAlign: 'right',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Typography fontSize={14}>
                For <b>Vyagrashila Seva Samithi</b>
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Typography fontSize={14}>
                  Authorized Signatory
                </Typography>
              </Box>
            </Grid>
          </Grid>


          {/* ===== SUBMIT ===== */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 4,
              background: '#000',
              '&:hover': { background: '#333' },
            }}
          >
            {loading ? 'Generating...' : 'Generate Receipt'}
          </Button>


        </form>
      </Paper>
      <Link className='mt-2' to='/view'>Donation Receipts</Link>
    </Box>
  );
};

export default DonationReceiptFormds;
