import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateList from "../components/CreateList";
import Success from "../components/Success";
import Error from "../components/Error";
import DeleteList from "../components/DeleteList";
import { Link, useLocation } from "react-router-dom";
import Nav from "../components/Nav";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export default function Home() {
  const [shoppingList, setShoppingList] = useState([]);
  const [invitedList, setInvitedList] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_BACKEND_LINK;
  const auth = useAuthUser();
  const { state } = useLocation();

  const fetchLists = async () => {
    const response = await axios.get(url + "/shopping-lists/lsuser", {
      params: {
        pageIndex: 0,
        pageSize: 0,
        owner: auth.id,
      },
    });
    if (response.status == 200) {
      console.log(response.data);
      setShoppingList(response.data.lists);
      setInvitedList(response.data.invitedLists);

      setLoading(false);
    } else {
      console.log("error");
    }
  };

  const addStatus = (success, type) => {
    if (success) {
      switch (type) {
        case "create":
          setAlertMessage("List created successfully");
          break;
        case "delete":
          setAlertMessage("List deleted successfully");
          break;
      }
      setTimeout(() => setAlertSuccess(false), 3000);
      setAlertSuccess(true);
    } else {
      setAlertError(true);
      setTimeout(() => setAlertError(false), 3000);
    }
  };

  useEffect(() => {
    if (state) {
      const { removedInvitedList } = state;
      setAlertMessage("You left " + removedInvitedList + " successfully");
      setTimeout(() => setAlertSuccess(false), 3000);
      setAlertSuccess(true);
    }
    fetchLists();
  }, []);

  return (
    <>
      <div className="min-h-full">
        <Nav />
        <header className="bg-white shadow dark:bg-gray-700 dark:text-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {auth.name}'s shopping lists
            </h1>
            <CreateList fetchLists={fetchLists} addStatus={addStatus} />
          </div>
        </header>
        <main>
          {loading ? (
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 dark:fill-white"
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
            <div className="dark:text-white">
              <div className=" mx-auto max-w-7xl py-6 px-6 lg:px-8 grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
                {shoppingList.length != 0 && (
                  <h4 className="col-span-3">Personal lists:</h4>
                )}
                {shoppingList.map((list) => (
                  <div
                    key={list.id}
                    className="max-w bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="p-5">
                      <Link to={list.id}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
                          {list.name}
                          <span class="inline-flex ml-auto items-center justify-center h-5 ms-2 px-2 text-sm font-semibold text-blue-800 bg-blue-200 rounded-full">
                            {list.products.length}{" "}
                            {list.products.length > 1 ? "products" : "product"}
                          </span>
                        </h5>
                      </Link>
                      {list.archived ? (
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          Archived
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                          Active
                        </span>
                      )}

                      <p className="mb-3 mt-3 text-right font-normal text-gray-700 dark:text-gray-400">
                        Created at:{" "}
                        {new Date(list.sys.cts).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        <Link
                          to={list.id}
                          className="col-span-2 inline-flex w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Open this list
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <DeleteList
                          id={list.id}
                          fetchLists={fetchLists}
                          addStatus={addStatus}
                          members={list.members}
                          ownerId={list.ownerId}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mx-auto max-w-7xl py-6 px-6 lg:px-8 grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
                {shoppingList.length == 0 && (
                  <h3 className="text-center col-span-3">
                    You don't have any list. Try creating a new one!
                  </h3>
                )}
                {invitedList.length == 0 ? (
                  <h3 className="text-center col-span-3">
                    <hr className="mb-2" />
                    You aren't invited to any list
                  </h3>
                ) : (
                  <h4 className="col-span-3">Invited lists:</h4>
                )}
                {invitedList.map((list) => (
                  <div
                    key={list.id}
                    className="max-w bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="p-5">
                      <Link to={list.id}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
                          {list.name}
                          <span class="inline-flex ml-auto items-center justify-center h-5 ms-2 px-2 text-sm font-semibold text-blue-800 bg-blue-200 rounded-full">
                            {list.products.length}{" "}
                            {list.products.length > 1 ? "products" : "product"}
                          </span>
                        </h5>
                      </Link>
                      {list.archived ? (
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          Archived
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                          Active
                        </span>
                      )}

                      <p className="mb-3 mt-3 text-right font-normal text-gray-700 dark:text-gray-400">
                        Created at:{" "}
                        {new Date(list.sys.cts).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        <Link
                          to={list.id}
                          className="col-span-2 inline-flex w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Open this list
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <DeleteList
                          id={list.id}
                          disable={true}
                          fetchLists={fetchLists}
                          addStatus={addStatus}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
        {alertSuccess && <Success message={alertMessage} />}
        {alertError && <Error />}
      </div>
    </>
  );
}
