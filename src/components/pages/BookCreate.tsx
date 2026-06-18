import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBook } from "../../features/authSlice"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const BookCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  type BookForm = {
    id: number | null
    title: string
    author: string
    regularPrice: string
    offerPrice: string
    stock: string
    quantity: string
    category: string
  }

  const [newBook, setNewBook] = useState<BookForm>({
    id: null,
    title: "",
    author: "",
    regularPrice: "",
    offerPrice: "",
    stock: "",
    quantity: "",
    category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const book = {
      id: Date.now(),
      title: newBook.title,
      author: newBook.author,
      regularPrice: Number(newBook.regularPrice) || 0,
      offerPrice: newBook.offerPrice ? Number(newBook.offerPrice) : null,
      stock: newBook.stock,
      quantity: Number(newBook.quantity) || 0,
      category: newBook.category,
    }
    dispatch(addBook(book))
    setNewBook({
      id: null,
      title: "",
      author: "",
      regularPrice: "",
      offerPrice: "",
      stock: "",
      quantity: "",
      category: "",
    })
    navigate("/")
  }

  const handleDelete = () => {}

  return (
    <div className="flex flex-col items-center">
      <h3 className="mt-8 mb-3 text-xl font-bold">Add New Book</h3>
      <Card className="max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Book Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 pt-4">
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              className="rounded border px-2 py-1"
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="rounded border px-2 py-1"
              required
            />

            <input
              type="number"
              placeholder="Regular Price"
              value={newBook.regularPrice}
              onChange={(e) =>
                setNewBook({ ...newBook, regularPrice: e.target.value })
              }
              className="rounded border px-2 py-1"
              required
            />

            <input
              type="number"
              placeholder="Offer Price"
              value={newBook.offerPrice}
              onChange={(e) =>
                setNewBook({ ...newBook, offerPrice: e.target.value })
              }
              className="rounded border px-2 py-1"
            />

            <input
              type="text"
              placeholder="Stock Availability"
              value={newBook.stock}
              onChange={(e) =>
                setNewBook({ ...newBook, stock: e.target.value })
              }
              className="rounded border px-2 py-1"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={newBook.quantity}
              onChange={(e) =>
                setNewBook({ ...newBook, quantity: e.target.value })
              }
              className="rounded border px-2 py-1"
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={newBook.category}
              onChange={(e) =>
                setNewBook({ ...newBook, category: e.target.value })
              }
              className="w-full rounded border px-2 py-1"
              required
            />

            <CardFooter>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                >
                  Add Book
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      className="flex-1 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[340px] rounded-3xl border-0 p-8 shadow-xl">
                    <DialogHeader className="flex flex-col items-center gap-2 text-center">
                      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-400">
                          <span className="text-base leading-none font-bold text-red-400">
                            !
                          </span>
                        </div>
                      </div>
                      <DialogTitle className="text-lg font-bold !text-black">
                        Are you sure you want to delete?
                      </DialogTitle>
                      <DialogDescription className="text-sm leading-relaxed text-gray-500">
                        {`You want to delete ${newBook.title}.`}
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
                        onClick={handleDelete}
                        className="rounded border-0 bg-red-500 px-6 py-2 font-semibold text-white shadow-none hover:bg-red-200 hover:text-black"
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookCreate
