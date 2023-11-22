import React from 'react'

export default async function Campaign({params}: { params: { id: string } }) {
    return (
        <div>
            hello, this is the campaign editor!
            The id provided is: {params.id}
        </div>
    )
}