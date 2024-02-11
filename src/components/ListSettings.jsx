import React, { useState } from "react";
import axios from "axios";

export default function ListSettings(props) {
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newStatus, setNewStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = process.env.REACT_APP_BACKEND_LINK;

  const updateList = () => {
    setLoading(true);
    console.log(props.listName);
    console.log(newStatus);
    if (newListName != props.listName) {
      axios
        .patch(url + "/shopping-lists/nameupdate", {
          id: props.listId,
          name: newListName,
        })
        .then((response) => {
          setShowModal(false);
          props.setListName(response.data.name);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (newStatus != props.archived.toString) {
      axios
        .patch(url + "/shopping-lists/archiveupdate", {
          id: props.listId,
          archived: newStatus == "true" ? true : false,
        })
        .then((response) => {
          setShowModal(false);
          props.setArchived(response.data.archived);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onOptionChange = (e) => {
    setNewStatus(e.target.value);
  };

  return (
    <div className="">
      <button
        type="button"
        onClick={() => {
          setNewListName(props.listName);
          setNewStatus(props.archived.toString());
          setShowModal(true);
        }}
        className="text-gray-900 flex gap-2 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        List Settings
        <svg
          className="w-5 h-5 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M9.6 2.6A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2l.5.3a2 2 0 0 1 2.9 0l1.4 1.3a2 2 0 0 1 0 2.9l.1.5h.1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2l-.3.5a2 2 0 0 1 0 2.9l-1.3 1.4a2 2 0 0 1-2.9 0l-.5.1v.1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2l-.5-.3a2 2 0 0 1-2.9 0l-1.4-1.3a2 2 0 0 1 0-2.9l-.1-.5H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2l.3-.5a2 2 0 0 1 0-2.9l1.3-1.4a2 2 0 0 1 2.9 0l.5-.1V4c0-.5.2-1 .6-1.4ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        className={`${
          !showModal && "hidden"
        } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                List settings
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form action="#">
              <div className="grid gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name:
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="bg-gray-50 border disabled:bg-gray-200 disabled:text-gray-700 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Shopping list name"
                    required=""
                  />
                </div>
              </div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status:
              </label>
              <div className="grid grid-cols-2">
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    name="status"
                    checked={newStatus == "false"}
                    value="false"
                    onChange={onOptionChange}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="country-option-1"
                    className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    name="status"
                    type="radio"
                    checked={newStatus == "true"}
                    value="true"
                    onChange={onOptionChange}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="country-option-2"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Archived
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => updateList()}
                disabled={loading}
                className="text-white mt-8 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  "Update"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
