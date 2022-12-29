import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const Update = () => {

    const storeReview = useLoaderData();
    console.log(storeReview)
    const [user, setUser] = useState(storeReview)


    const handleUpdateUser = event => {
        event.preventDefault();
        console.log(user);
        fetch(`https://my-task-server-iota.vercel.app/addTask/${storeReview._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Task Updated')
                    console.log(data);
                }

            })
    }

    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div className='my-32 border w-1/2 p-4 mx-auto'>
            <h2 className='text-center text-rose-600 mb-3 font-semibold text-xl'>Update Task: </h2>
            <form onSubmit={handleUpdateUser} className=''>
                <input onChange={handleInputChange} className='w-full p-4' defaultValue={storeReview?.task} type="text" name="task" placeholder='name' required />
                <br />
                <Button type='submit' className='mb-3 mt-5 w-52 mx-auto' gradientDuoTone="purpleToPink">
                    Update Task
                </Button>
            </form>
        </div>
    );
};

export default Update;