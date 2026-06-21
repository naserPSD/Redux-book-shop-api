import { useTheme } from "@/components/theme-provider"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "./app/store"
import HomePage from "./components/pages/HomePage"
import BookCreate from "./components/pages/BookCreate"
import BookEdit from "./components/pages/BookEdit"
import Login from "./components/pages/Login"
import Product from "./components/pages/Product"

export function App() {
  const { isSuccess } = useSelector((state: RootState) => state.auth)
  const { theme, setTheme } = useTheme()
  const nextTheme = theme === "dark" ? "light" : "dark"

  return (
    <div className="px-5 py-5 text-center text-4xl">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="text-2xl font-semibold">MyBookSelf</span>
        <button
          type="button"
          onClick={() => setTheme(nextTheme)}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
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
