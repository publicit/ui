
import React, { useState } from 'react'
import ButtonCopy from './ButtonCopy'
import sharedLink from './SharedLink'

function SharePage() {
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
                            <ButtonCopy text={sharedLink} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePage