import React from "react";
import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from ".././Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentpage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book category");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseUrl: string = "http://localhost:8080/api/books";
        let url: string = "";

        if (searchUrl === "") {
          url = `${baseUrl}?page=${
            currentpage - 1
          }&size=${booksPerPage}&projection=bookProjection`;
        } else {
          let searchWithPage = searchUrl.replace(
            "<pageNumber>",
            `${currentpage - 1}`
          );
          url = baseUrl + searchWithPage;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();
        const responseData = responseJson._embedded.books;

        setTotalAmountOfBooks(responseJson.page.totalElements);
        setTotalPages(responseJson.page.totalPages);

        const loadedBooks: BookModel[] = responseData.map((book: any) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description,
          copies: book.copies,
          copiesAvailable: book.copiesAvailable,
          category: book.category,
          img: book.img,
        }));

        setBooks(loadedBooks);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchBooks();
    window.scrollTo(0, 0);
  }, [currentpage, searchUrl]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);

    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}&projection=bookProjection`
      );
    }
    setCategorySelection("Book Category");
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === "fe" ||
      value.toLocaleLowerCase() === "be" ||
      value.toLocaleLowerCase() === "data" ||
      value.toLocaleLowerCase() === "devops"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}&projection=bookProjection`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(
        `?page=<pageNumber>&size=${booksPerPage}&projection=bookProjection`
      );
    }
  };

  const indexOfLastBook: number = currentpage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastitem =
    booksPerPage * currentpage <= totalAmountOfBooks
      ? booksPerPage * currentpage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown ">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryField("All")}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryField("FE")}>
                    <a className="dropdown-item" href="#">
                      Front Rnd
                    </a>
                  </li>

                  <li onClick={() => categoryField("BE")}>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>

                  <li onClick={() => categoryField("Data")}>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>

                  <li onClick={() => categoryField("DevOps")}>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of Results:({totalAmountOfBooks})</h5>
              </div>
              <p>
                {" "}
                {indexOfFirstBook + 1} to {lastitem} of {totalAmountOfBooks}{" "}
                items:
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md px-4 ne-md-2 fw-bold text-white"
                href="#"
              >
                Library Services
              </a>
            </div>
          )}

          {/* if thotal pages >1 then render below says tat */}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentpage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
