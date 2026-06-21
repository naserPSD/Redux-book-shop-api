import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../app/store"
import { deleteBook } from "../../features/authSlice"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"

const HomePage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const books = useSelector((state: RootState) => state.auth.books)

  const [searchId, setSearchId] = useState("")

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`)
  }
  const handleDelete = (id: number) => {
    dispatch(deleteBook(id))
  }
  const filteredBooks =
    searchId.trim() === ""
      ? books
      : books.filter((book) => book.id === Number(searchId))

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="flex justify-center text-5xl font-bold">Book List</h2>
        <div className="mt-2 flex justify-center">
          <Input
            type="number"
            placeholder="Search by Book ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-64"
          />
        </div>

        <div className="mt-2 flex justify-start">
          <p className="text-sm text-gray-700">Total: {filteredBooks.length}</p>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => navigate("/create")}
            className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
          >
            Add Book
          </Button>
        </div>
      </div>
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
      </div>
      <br />
      {filteredBooks.length === 0 ? (
        <p>No books available</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="shadow-md">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">by {book.author}</p>
                <p className="mt-2 text-sm">
                  Price:{" "}
                  {book.offerPrice ? (
                    <>
                      <span className="mr-2 text-gray-500 line-through">
                        {book.regularPrice}
                      </span>
                      <span className="font-medium text-red-600">
                        {book.offerPrice}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium">{book.regularPrice}</span>
                  )}
                </p>
                <p className="text-sm">
                  Quantity: <span className="font-medium">{book.quantity}</span>
                </p>
                <p className="text-sm">
                  Stock: <span className="font-medium">{book.stock}</span>
                </p>
                <p className="text-sm">
                  Category: <span className="font-medium">{book.category}</span>
                </p>
                <br />
                <div className="flex justify-center">
                  <Button
                    onClick={() => navigate(`/product/${book.id}`)}
                    className="ml-2 rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      className="cursor-pointer border border-red-200 bg-red-600 px-3 py-1 font-medium text-white hover:bg-red-200 hover:text-black"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[340px] rounded-3xl border-0 p-8 shadow-xl">
                    <DialogHeader className="flex flex-col items-center gap-2 text-center">
                      <DialogTitle className="text-lg font-bold !text-black">
                        Are you sure you want to delete?
                      </DialogTitle>
                      <DialogDescription className="text-sm leading-relaxed text-gray-500">
                        {`You want to delete ${book.title}.`}
                        <br />
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex justify-center gap-3">
                      <DialogTrigger asChild>
                        <Button className="cursor-pointer rounded border-0 bg-gray-100 px-4 py-2 font-semibold text-gray-600 shadow-none hover:bg-gray-200 hover:text-black">
                          Cancel
                        </Button>
                      </DialogTrigger>
                      <Button
                        onClick={() => handleDelete(book.id)}
                        className="cursor-pointer border border-red-200 bg-red-600 px-3 py-1 font-medium text-white hover:bg-red-200 hover:text-black"
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={() => handleEdit(book.id)}
                  className="ml-2 rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                >
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
