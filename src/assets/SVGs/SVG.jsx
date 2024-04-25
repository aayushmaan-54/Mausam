import * as React from "react";

export const DropDown = (props) => (
  <svg
    height={20}
    width={20}
    viewBox="0 0 20 20"
    aria-hidden="true"
    focusable="false"
    className="css-8mmkcg mr-3 ml-2 fill-indigo-700 cursor-pointer"
    {...props}
  >
    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
  </svg>
)


export const Search = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 ml-4 fill-indigo-700"
    {...props}
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

export const DarkMode = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    viewBox="0 0 24 24"
    width={24}
    className="w-8 flex items-center justify-center cursor-pointer"
  >
    <path
      d="m12 22c5.5228475 0 10-4.4771525 10-10s-4.4771525-10-10-10-10 4.4771525-10 10 4.4771525 10 10 10zm0-1.5v-17c4.6944204 0 8.5 3.80557963 8.5 8.5 0 4.6944204-3.8055796 8.5-8.5 8.5z"
      fill="#4338CA"
    />
  </svg>
)

export const Location = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={18}
    viewBox="0 0 14 18"
    {...props}
  >
    <path
      fill="#4338ca"
      fillOpacity={0.996}
      fillRule="evenodd"
      d="M13.696 0l-3.304 17.722-3.496-5.944L0 11.722z"
    />
  </svg>
)