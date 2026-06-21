import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card"
import { Button } from "../ui/button"

const Product = () => {
  const { id } = useParams()
  const book = useSelector((state: RootState) =>
    state.auth.books.find((b) => b.id === Number(id))
  )

  if (!book) {
    return <p className="mt-10 text-center">Product not found</p>
  }

  return (
    <div className="flex justify-start p-20">
      <Card className="h-auto w-[600px] p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-lg">
          <p className="text-gray-600">by {book.author}</p>
          <p>
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
          <p>
            Quantity: <span className="font-medium">{book.quantity}</span>
          </p>
          <p>
            Stock: <span className="font-medium">{book.stock}</span>
          </p>
          <p>
            Category: <span className="font-medium">{book.category}</span>
          </p>
        </CardContent>
        <CardFooter className="bg-black-400 mt-50 flex justify-center">
          <Button className="rounded bg-blue-500 px-6 py-3 text-lg text-white hover:bg-blue-600">
            Buy Now
          </Button>
          {/* {book.quantity > 0 ? (
            <Button className="rounded bg-blue-500 px-6 py-3 text-lg text-white hover:bg-blue-600">
              Buy Now
            </Button>
          ) : (
            <span className="text-xl font-semibold text-red-500">
              Out of Stock
            </span>
          )} */}
        </CardFooter>
      </Card>
    </div>
  )
}

export default Product
