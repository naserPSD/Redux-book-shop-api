import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../app/store"
import { useParams, useNavigate } from "react-router-dom"
import { updateBook, deleteBook } from "../../features/authSlice"
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
import { Button } from "../ui/button"

const BookEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const book = useSelector((state: RootState) =>
    state.auth.books.find((b) => b.id === Number(id))
  )

  const [editedBook, setEditedBook] = useState(() => {
    if (book) {
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        regularPrice: String(book.regularPrice),
        offerPrice: book.offerPrice != null ? String(book.offerPrice) : "",
        stock: book.stock || "",
        quantity: String(book.quantity),
        category: book.category,
      }
    }

    return {
      id: Number(id),
      title: "",
      author: "",
      regularPrice: "",
      offerPrice: "",
      stock: "",
      quantity: "",
      category: "",
    }
  })

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    const bookPayload = {
      id: Number(editedBook.id),
      title: editedBook.title,
      author: editedBook.author,
      regularPrice: Number(editedBook.regularPrice) || 0,
      offerPrice: editedBook.offerPrice ? Number(editedBook.offerPrice) : null,
      stock: editedBook.stock,
      quantity: Number(editedBook.quantity) || 0,
      category: editedBook.category,
    }
    dispatch(updateBook(bookPayload))
    navigate("/")
  }

  const handleDelete = () => {
    dispatch(deleteBook(Number(id)))
    navigate("/")
  }

  if (!book) {
    return <p className="mt-10 text-center">Book not found</p>
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="mt-8 mb-3 text-xl font-bold">Edit Book</h3>
      <Card className="max-w-sm p-15 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Book Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="flex flex-col gap-2 pt-4">
            <div className="justify-start text-left">
              <p className="font-medium">Title</p>
              <input
                type="text"
                placeholder="Title"
                value={editedBook.title}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, title: e.target.value })
                }
                className="w-full rounded border px-2 py-1"
                required
              />
              <p className="mt-2 font-medium">Author</p>
              <input
                type="text"
                placeholder="Author"
                value={editedBook.author}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, author: e.target.value })
                }
                className="w-full rounded border px-2 py-1"
                required
              />
              <p className="mt-2 font-medium">Regular Price</p>
              <input
                type="number"
                placeholder="Regular Price"
                value={editedBook.regularPrice}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, regularPrice: e.target.value })
                }
                className="w-full rounded border px-2 py-1"
                required
              />

              <p className="mt-2 font-medium">Offer Price</p>
              <input
                type="number"
                placeholder="Offer Price"
                value={editedBook.offerPrice}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, offerPrice: e.target.value })
                }
                className="w-full rounded border px-2 py-1"
              />
              <p className="mt-2 font-medium">Stock</p>
              <input
                type="text"
                placeholder="Stock Availability"
                value={editedBook.stock}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, stock: e.target.value })
                }
                className="w-full rounded border px-2 py-1"
              />
              <p className="mt-2 font-medium">Quantity</p>
              <input
                type="number"
                placeholder="Quantity"
                value={editedBook.quantity}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, quantity: e.target.value })
                }
                className="w-full rounded border px-2 py-1"
                required
              />
              <p className="mt-2 font-medium">Category</p>
              <input
                type="text"
                placeholder="Category"
                value={editedBook.category}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, category: e.target.value })
                }
                className="w-full rounded border px-2 py-1"
                required
              />
            </div>

            <CardFooter>
              <Button
                type="submit"
                className="rounded bg-green-500 px-3 py-2 text-white hover:bg-green-600"
              >
                Update Book
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
                      {`You want to delete ${editedBook.title}.`}
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
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookEdit
