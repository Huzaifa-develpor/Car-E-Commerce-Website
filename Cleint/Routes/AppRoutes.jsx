import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import ItemDetails from '../pages/ItemDetails'
import Cart from '../pages/Cart'
import LogIn from '../Forms/LogIn'
import CategoryItems from '../components/Categoryitems'
import SignUp from '../Forms/SignUp'
import ListProducts from '../components/ListProducts'
import OrderDetail from '../Forms/OrderDetail'
import Explore from '../components/Explore'
import ProtectedAdmin from './ProtectedAdmin'
import ProtectedRoute from './ProtectedRoute'
import AdminPanel from '../components/adminComponents/AdminPanel'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/order" element={
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        } />
        <Route path="/categories/:name" element={<CategoryItems/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/search/:model" element={<ListProducts/>} />
        <Route path="/product/:id" element={<ItemDetails/>} />
        <Route path="/admin" element= {
          <ProtectedAdmin>
      <AdminPanel/>
    </ProtectedAdmin> } />
        <Route path="/explore" element={<Explore/>} />
      </Routes>
    </div>
  )
}

export default AppRoutes
