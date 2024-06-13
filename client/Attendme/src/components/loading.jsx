import React from 'react'

const Loading = () => {
    return (
        <div className='w-full h-full flex justify-center items-center z-10 bg-gray-900/55 backdrop:blur-md'>
            <div className="loader"></div>
        </div>
    )
}

export default Loading
