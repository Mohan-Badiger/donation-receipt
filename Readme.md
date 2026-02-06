# 🧾 Donation Receipt Management System

A full-stack web application to **create, store, view, and download donation receipts** for a trust or organization.

---

## 🚀 Features

- Create donation receipts via structured form  
- Auto-generated receipt numbers (backend)  
- Store receipts in MongoDB  
- View all receipts in table format  
- Filter receipts by date  
- Download receipts as PDF  
- Loading state during submission  
- Clean, printable receipt-style UI  

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Material UI
- Axios
- React Router DOM
- jsPDF

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

---

## 📂 Project Structure

```

receipt/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── DonationReceiptForm.jsx
│   │   │   └── DonationReceiptsView.jsx
│   │   ├── api/ep1.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   └── donationReceiptController.js
│   ├── models/
│   │   └── donationReceiptModel.js
│   ├── routes/
│   │   └── donationReceiptRoutes.js
│   ├── config/db.js
│   ├── server.js
│   └── package.json

````

---

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
````

Create `.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

Backend runs on:

```
http://localhost:4000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Create Donation Receipt

**POST**

```
/api/v2/createdonationreceiptds
```

```json
{
  "donorName": "Ramesh",
  "amountReceived": 1000,
  "amountInWords": "One Thousand Rupees",
  "modeOfPayment": "Cash"
}
```

---

### Get All Donation Receipts

**GET**

```
/api/v2/getdonationreceiptsds
```

Optional query:

```
?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

---

## 🧪 Testing

* Test APIs using Postman
* Verify data in MongoDB
* Download PDFs from frontend

---

## 👨‍💻 Author

**Mohan S Badiger**
📧 [mohanbadiger250@gmail.com](mailto:mohanbadiger250@gmail.com)
💻 Full-Stack MERN Developer

```

---

If you want next:
- ⭐ GitHub badges
- 📸 Screenshots section
- 🚀 Deployment guide
- 📝 Resume-ready project summary

Just say the word 👍
```
