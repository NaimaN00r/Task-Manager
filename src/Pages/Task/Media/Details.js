import { Card } from 'flowbite-react';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Details = () => {
    const data = useLoaderData()
    // console.log(data)
    return (
        <div className='my-16'>
            <h2 className='text-2xl text-center text-purple-900 font-semibold my-6'>Task Detail here</h2>
            <Card className='mx-auto w-96 h-full'>
                <img src={data[0]?.image} alt="" />
                <h5 className="text-2xl font-semibold tracking-tight dark:text-white">
                   Task Name: {data[0]?.name}
                </h5>
                <p className="font-normal text-xl dark:text-gray-400">
                    Task Detail: {data[0]?.detail}
                </p>
                <p className="font-normal text-xl dark:text-gray-400">
                    Time Duration: {data[0]?.time}
                </p>
            </Card>

        </div>
    );
};

export default Details;