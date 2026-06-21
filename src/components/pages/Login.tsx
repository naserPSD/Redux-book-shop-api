// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import type { RootState } from "../../app/store"
// import { login, resetAuth } from "../../features/authSlice"
// import { useNavigate } from "react-router-dom"
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "../ui/card"

// const Login = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { isSuccess, isError, errorMessage } = useSelector(
//     (state: RootState) => state.auth
//   )
//   const handleReset = () => {
//     dispatch(resetAuth())
//     setFormData({ email: "", password: "" })
//   }
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     dispatch(login(formData))

//     if (isSuccess) {
//       navigate("/")
//     }
//   }

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-center text-2xl font-bold">
//             Login
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="rounded border px-3 py-2"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="rounded border px-3 py-2"
//               required
//             />
//             {isError && <p className="text-sm text-red-500">{errorMessage}</p>}
//             <button
//               type="submit"
//               className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
//             >
//               Login
//             </button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <button
//             onClick={handleReset}
//             className="text-sm text-gray-500 hover:text-gray-700"
//           >
//             Reset
//           </button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, resetAuth } from "../../features/authSlice"
import type { RootState } from "../../store"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card"

const Login = () => {
  const dispatch = useDispatch()
  const { isError, errorMessage, isSuccess } = useSelector(
    (state: RootState) => state.auth
  )

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  const handleReset = () => {
    dispatch(resetAuth())
    setEmail("") // ✅ email ফিল্ড খালি হবে
    setPassword("") // ✅ password ফিল্ড খালি হবে
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border px-3 py-2"
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border px-3 py-2"
              required
            />

            <button
              type="submit"
              className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          {isError && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
          {isSuccess && (
            <p className="mt-2 text-sm text-green-500">Login successful!</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
