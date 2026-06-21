import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const dummyUsers = [
  { email: "test@gmail.com", password: "123456" },
  { email: "admin@gmail.com", password: "admin123" },
  { email: "user@gmail.com", password: "userpass" },
]

type Book = {
  id: number
  title: string
  author: string
  regularPrice: number
  offerPrice: number | null | string
  stock: string
  quantity: number
  category: string
}

export type AuthState = {
  user: { email: string } | null
  isSuccess: boolean
  isError: boolean
  errorMessage: string
  books: Book[]
}

const initialState: AuthState = {
  user: null,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  books: [
    {
      id: 1,
      title: "JavaScript Basics",
      author: "John Doe",
      regularPrice: 200,
      offerPrice: 150,
      stock: "Available",
      quantity: 10,
      category: "Programming",
    },
    {
      id: 2,
      title: "React Guide",
      author: "Jane Smith",
      regularPrice: 300,
      offerPrice: 250,
      stock: "Limited",
      quantity: 5,
      category: "Programming",
    },
    {
      id: 3,
      title: "Redux Toolkit",
      author: "Alex Johnson",
      regularPrice: 250,
      offerPrice: null,
      stock: "Available",
      quantity: 7,
      category: "Programming",
    },
    {
      id: 4,
      title: "Basic HTML",
      author: "Johnson",
      regularPrice: 250,
      offerPrice: 200,
      stock: "Out of Stock",
      quantity: 7,
      category: "Programming",
    },
  ],
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload
      const foundUser = dummyUsers.find(
        (u) => u.email === email && u.password === password
      )

      if (foundUser) {
        state.user = { email: foundUser.email }
        state.isSuccess = true
        state.isError = false
        state.errorMessage = ""
      } else {
        state.isSuccess = false
        state.isError = true
        state.errorMessage = "Invalid credentials"
      }
    },

    logout: (state) => {
      state.user = null
      state.isSuccess = false
    },

    resetAuth: (state) => {
      state.isSuccess = false
      state.isError = false
      state.errorMessage = ""
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.unshift(action.payload)
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const {
        id,
        title,
        author,
        regularPrice,
        offerPrice,
        stock, //destructure
        quantity,
        category,
      } = action.payload
      const existingBook = state.books.find((book) => book.id === id)
      if (existingBook) {
        existingBook.title = title
        existingBook.author = author
        existingBook.regularPrice = regularPrice
        existingBook.offerPrice = offerPrice
        existingBook.stock = stock
        existingBook.quantity = quantity
        existingBook.category = category
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.books = state.books.filter((book) => book.id !== id)
    },
  },
})

export const { login, logout, resetAuth, addBook, updateBook, deleteBook } =
  authSlice.actions
export default authSlice.reducer
