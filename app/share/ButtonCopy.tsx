"use client";

import React, { useEffect, useState } from "react";

const ButtonCopy = () => {
  useEffect(() => {
    const loc = window.location;
    const host = `${loc.protocol}//${loc.host}/start`;
    setText(host);
  }, []);
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          readOnly
          value={text}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
        />
      </div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          handleCopyClick();
          setIsCopied(true);
        }}
      >
        <span>{isCopied ? "Copiado!" : "Copiar"}</span>
      </button>
    </>
  );
};

export default ButtonCopy;
