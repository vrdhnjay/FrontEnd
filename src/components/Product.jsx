import React from "react";

export default function Product(props) {
  if (props.filter == null) {
    return (
      <tr
        key={props.product.id}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <th
          scope="row"
          className=" items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="ps-3">
            <div className="text-base font-semibold">{props.product.name} </div>
          </div>
        </th>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <label className="relative inline-flex items-center me-5 cursor-pointer">
              <input
                type="checkbox"
                checked={props.product.completed}
                onChange={() =>
                  props.changeProductStatus(
                    props.product.id,
                    props.product.name,
                    !props.product.completed
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {props.product.completed ? "Completed" : "In Progress"}
              </span>
            </label>
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <button
            type="button"
            onClick={() => props.deleteProduct(props.product.id)}
            className="bg-white-700 hover:bg-red-200 border border-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:hover:bg-gray-800 dark:focus:ring-gray-800"
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
        </td>
      </tr>
    );
  } else {
    return (
      <tr
        key={props.product.id}
        className={`${
          props.filter != props.product.completed && "hidden "
        } bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
      >
        <th
          scope="row"
          className=" items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="ps-3">
            <div className="text-base font-semibold">{props.product.name}</div>
          </div>
        </th>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <label className="relative inline-flex items-center me-5 cursor-pointer">
              <input
                type="checkbox"
                checked={props.product.completed}
                onChange={() =>
                  props.changeProductStatus(
                    props.product.id,
                    props.product.name,
                    !props.product.completed
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {props.product.completed ? "Completed" : "In Progress"}
              </span>
            </label>
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <button
            type="button"
            onClick={() => props.deleteProduct(props.product.id)}
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
        </td>
      </tr>
    );
  }
}
