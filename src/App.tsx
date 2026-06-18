// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./components/pages/HomePage"
import BookCreate from "./components/pages/BookCreate"
import BookEdit from "./components/pages/BookEdit"
import Login from "./components/pages/Login"
import { useSelector } from "react-redux"
import Product from "./components/pages/Product"

export function App() {
  const { isSuccess } = useSelector((state) => state.auth)

  return (
    <div className="px-5 py-5 text-center text-4xl">
      <BrowserRouter>
        <Routes>
          {!isSuccess ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<BookCreate />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/edit/:id" element={<BookEdit />} />
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
