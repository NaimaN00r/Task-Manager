import React from 'react';
import { toast } from 'react-hot-toast';
import logo from "../../../Assets/pic1.webp"


const DailyTask = () => {


    const handleAdd = event => {
        event.preventDefault();
        const form = event.target;
        const task = form.message.value;

        const tasks = {
            task
        }
        console.log(tasks)
        fetch('https://my-task-server-iota.vercel.app/addTask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tasks)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                form.reset()
                toast.success('Task Added Successfully')
            })

    }

   

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full mt-12 mb-56'>
            <div className='text-center'>
                <h2 className='text-2xl font-semibold text-purple-900'>Manage Your Everyday Task Here</h2>
                <img className='pl-20' src={logo}></img>
            </div>
            <div>
                <form onSubmit={handleAdd}>
                    <div className="form-control w-full max-w-xs pt-48">
                        <label className="label"><span className="label-text text-pink-500 text-2xl">Give Your Task</span></label>
                        <input type="text" name='message' className="input input-bordered w-full max-w-xs border-purple-900 rounded" required />
                        {/* <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-xs my-5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Task</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DailyTask;