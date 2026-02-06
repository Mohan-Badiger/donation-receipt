import { Route, Routes } from 'react-router-dom'
import DonationReceiptFormds from '../src/pages/DonationReceiptFormds'
import DonationReceiptsViewds from './pages/DonationReceiptsViewds'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<DonationReceiptFormds/>}/>
        <Route path='/view' element={<DonationReceiptsViewds/>}/>
      </Routes>
    </div>
  )
}

export default App