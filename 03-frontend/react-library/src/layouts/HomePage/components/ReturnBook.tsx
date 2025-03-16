import React from "react";
import bookImage from "../../../Images/BooksImages/book-luv2code-1000.png"; // ✅ Corrected path
import BookModel from "../../../models/BookModel"; // ✅ Fixed import

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {props.book.img ? ( // ✅ Fixed property name from `image` to `img`
          <img src={props.book.img} width="151" height="233" alt="book" />
        ) : (
          <img src={bookImage} width="151" height="233" alt="book" />
        )}

        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author}</p>
        <button className="btn main-color text-white">Reserve</button>
      </div>
    </div>
  );
};
