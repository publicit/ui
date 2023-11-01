'use client'

import React, { useState } from 'react'

const copyText = `${location.origin}/start`

function SharePage() {
    const [isCopied, setIsCopied] = useState(false)
    const handleCopyClick = () => {
        navigator.clipboard.writeText(copyText)
    }
    return (
        <div>
            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <h6 className="text-xl text-red-400 font-semibold">
                            Comparte con tus amigos!
                        </h6>
                        <p className="mt-2 mb-4 text-gray-600">
                            Envia este link y gana premios por ello.
                        </p>

                        <form>
                            <div className="mb-6">
                                <input type="text"
                                    readOnly
                                    value={copyText}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"
                                />
                            </div>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => {
                                    handleCopyClick()
                                    setIsCopied(true)
                                }}
                            >
                                <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePage