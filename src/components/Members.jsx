import React, { useState } from "react";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { redirect, useNavigate } from "react-router-dom";

export default function Members(props) {
  const [modalShow, setModalShow] = useState(false);
  const [toAdd, setToAdd] = useState("");
  const [addError, setAddError] = useState("");
  const auth = useAuthUser();
  let navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }

  const url = process.env.REACT_APP_BACKEND_LINK;

  const deleteMember = (userId) => {
    axios
      .delete(url + "/shopping-lists/removeuser", {
        params: {
          id: props.listId,
          userId,
        },
      })
      .then((response) => {
        props.setMembers(
          props.members.filter(function (e) {
            return e.id !== userId;
          })
        );
        console.log(response);
        if (userId == auth.id) {
          return navigate("/", {
            state: { removedInvitedList: props.listName },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addMember = () => {
    console.log(toAdd);
    axios
      .post(url + "/shopping-lists/adduser", {
        id: props.listId,
        userEmail: toAdd,
      })
      .then((response) => {
        console.log(response);
        props.setMembers([
          ...props.members,
          {
            id: response.data.id,
            email: toAdd,
          },
        ]);
        setToAdd("");
        console.log(response);
      })
      .catch((error) => {
        setAddError(error.response.data.message);
        setTimeout(() => {
          setAddError("");
        }, 8000);
      });
  };
  return (
    <div className=" ml-auto">
      <button
        type="button"
        onClick={() => setModalShow(true)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Members (
        {props.selfId == props.owner
          ? props.members.length
          : props.members.length + 1}
        )
        <svg
          className="w-5 h-5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8Zm4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5L9 13Zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
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
          !modalShow && "hidden"
        } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {props.selfId == props.owner
                  ? props.members.length
                  : props.members.length + 1}
                {props.members.length > 1 ? " members" : " member"}
              </h3>
              <button
                type="button"
                onClick={() => setModalShow(false)}
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
            <div>
              <ul className="max-w mb-5 border border-gray-200 rounded-lg flex divide-y divide-gray-200 dark:divide-gray-700 justify-center">
                <li className="w-full">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm ml-3 cursor-default py-2 font-medium text-gray-900 truncate dark:text-white">
                        {props.ownerEmail} (Owner{" "}
                        {props.ownerEmail == auth.email && " - Me"}){" "}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {props.members.length == 0 && (
              <h3 className="mb-5 text-center">
                There's no members, try adding one!
              </h3>
            )}
            {props.members.map((member) => (
              <div key={member.id}>
                <ul className="max-w mb-5 border border-gray-200 rounded-lg flex divide-y divide-gray-200 dark:divide-gray-700 justify-center">
                  <li className="w-full">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-1 min-w-0">
                        <p className="py-2 text-sm ml-3 cursor-default font-medium text-gray-900 truncate dark:text-white">
                          {member.email} {member.email == auth.email && "(Me)"}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base ml-auto font-semibold text-gray-900 dark:text-white">
                        {member.email == auth.email ? (
                          <button
                            type="button"
                            onClick={() => deleteMember(member.id)}
                            className="bg-white-700 hover:bg-red-200 border border-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <p className="text-xs text-red-700 font-bold">
                              Leave List
                            </p>
                          </button>
                        ) : (
                          props.selfId == props.owner && (
                            <button
                              type="button"
                              onClick={() => deleteMember(member.id)}
                              className="bg-white-700 hover:bg-red-200 border border-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <svg
                                className="w-4 h-4 text-red-700"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
            {props.selfId == props.owner && (
              <form action="#">
                <hr className="mb-2" />

                <div className="grid gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Add a member
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border col-span-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Email"
                    value={toAdd}
                    onChange={(e) => setToAdd(e.target.value)}
                    required=""
                  />
                  <button
                    type="button"
                    onClick={() => addMember()}
                    className="text-white w-full h-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Invite
                  </button>
                </div>
                {addError != "" && (
                  <div
                    className="flex items-center mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Error!</span> {addError}
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
