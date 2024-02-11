import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import axios from "axios";
import Members from "../components/Members";
import AddNewProduct from "../components/AddNewProduct";
import ListSettings from "../components/ListSettings";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";

export default function List() {
  const [listName, setListName] = useState("");
  const [archived, setArchived] = useState(null);
  const [members, setMembers] = useState([]);
  const [owner, setOwner] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [search, setSearch] = useState("");
  let { id } = useParams();
  let navigate = useNavigate();

  const url = process.env.REACT_APP_BACKEND_LINK;
  const auth = useAuthUser();

  const changeProductStatus = (productId, productName, status) => {
    console.log(products);
    const newProduct = {
      id: productId,
      name: productName,
      completed: status,
    };
    axios
      .patch(url + "/shopping-lists/updateproduct", {
        id: id,
        product: newProduct,
      })
      .then((response) => {
        let productData = products;
        let objIndex = productData.findIndex((obj) => obj.id == productId);
        productData[objIndex] = newProduct;
        setProducts(response.data.products);
        setSearchedProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (productId) => {
    axios
      .delete(url + "/shopping-lists/removeproduct", {
        params: {
          id,
          productId,
        },
      })
      .then((response) => {
        setSearchedProducts(response.data.products);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setFilter(null);
    axios
      .get(url + "/shopping-lists/getsl", {
        params: {
          id,
          ownerId: auth.id,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data.archived);
        setListName(data.name);
        setArchived(data.archived);
        setMembers(data.members);
        setProducts(data.products);
        setOwner(data.ownerId);
        setOwnerEmail(data.ownerEmail);
        setSearchedProducts(data.products);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        navigate("/");
      });
    console.log(id);
  }, []);

  useEffect(() => {
    setSearchedProducts(
      products.filter((singleProduct) => {
        return singleProduct.name
          .toLowerCase()
          .trim()
          .includes(search.toLowerCase().trim());
      })
    );
    console.log(searchedProducts);
  }, [search]);

  return (
    <div className="min-h-full">
      <Nav />
      {loading ? (
        <div
          role="status"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <header className="bg-white shadow dark:bg-gray-700 ">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mr-3">
                  {listName}
                </h1>
                {archived ? (
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Archived
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                    Active
                  </span>
                )}
              </div>
              <div className="ml-auto flex items-center gap-2">
                {auth.id == owner && (
                  <ListSettings
                    listName={listName}
                    archived={archived}
                    listId={id}
                    setListName={setListName}
                    setArchived={setArchived}
                    owner={owner}
                    selfId={auth.id}
                  />
                )}

                <Members
                  members={members}
                  listId={id}
                  listName={listName}
                  ownerEmail={ownerEmail}
                  setMembers={setMembers}
                  selfId={auth.id}
                  owner={owner}
                />
              </div>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 px-6 lg:px-8">
              <div className="relative overflow-x-auto sm:rounded-lg">
                <div className="relative bg-white dark:bg-gray-900 sm:rounded-lg">
                  <div className="flex flex-col items-center justify-between py-3 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2">
                      <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="simple-search"
                            value={search}
                            onChange={(e) =>
                              setSearch(e.target.value.trimStart())
                            }
                            disabled={
                              searchedProducts.length == 0 &&
                              products.length == 0
                            }
                            className="block w-full p-2 pl-10 disabled:bg-gray-100 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-200 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search"
                            required=""
                          />
                        </div>
                      </form>
                    </div>
                    <div
                      className={`flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3`}
                    >
                      <div
                        className="inline-flex rounded-md shadow-sm"
                        role="group"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            if (filter == false) {
                              setFilter(null);
                            } else {
                              setFilter(false);
                            }
                          }}
                          disabled={searchedProducts.length == 0}
                          className={`${
                            filter == false
                              ? "bg-gray-100 text-blue-700"
                              : "hover:bg-gray-100 hover:text-blue-700 bg-white"
                          } px-4 disabled:bg-gray-100 disabled:text-gray-600 py-2 text-sm font-medium text-gray-900  border  border-r-0 border-gray-200 rounded-s-lg focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                        >
                          In Progress
                        </button>
                        <button
                          type="button"
                          disabled={searchedProducts.length == 0}
                          onClick={() => {
                            if (filter == true) {
                              setFilter(null);
                            } else {
                              setFilter(true);
                            }
                          }}
                          className={`${
                            filter == true
                              ? "bg-gray-100 text-blue-700"
                              : "hover:bg-gray-100 hover:text-blue-700 bg-white"
                          } px-4 py-2 disabled:bg-gray-100 disabled:text-gray-600 text-sm font-medium text-gray-900 border border-gray-200 rounded-e-lg focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
                        >
                          Completed
                        </button>
                      </div>

                      <AddNewProduct
                        listId={id}
                        setProducts={setSearchedProducts}
                        setSearch={setSearch}
                      />
                    </div>
                  </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>

                  {searchedProducts.length == 0 && search == "" && (
                    <tbody>
                      <tr>
                        <td colSpan={3} className="text-center p-5">
                          There's no products, try adding a new one!
                        </td>
                      </tr>
                    </tbody>
                  )}
                  <tbody>
                    {searchedProducts.length == 0 &&
                    products.length != 0 &&
                    search != "" ? (
                      <tr>
                        <td colSpan={3} className="text-center p-5">
                          There's no product related to {search} , try searching
                          for another one!
                        </td>
                      </tr>
                    ) : (
                      searchedProducts.map((product) => (
                        <Product
                          key={product.id}
                          filter={filter}
                          product={product}
                          changeProductStatus={changeProductStatus}
                          deleteProduct={deleteProduct}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
