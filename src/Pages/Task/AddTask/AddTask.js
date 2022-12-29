import { Button } from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const imageHostKey = "d6f4ba825ae32d4c6e0f11b90f2819a4";
    console.log(imageHostKey)

    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {

                if (imgData.success) {
                    console.log(imgData.data.url);
                    const task = {
                        name: data.name,
                        detail: data.detail,
                        time: data.time,
                        image: imgData.data.url
                    }

                    console.log(task)

                    fetch('https://my-task-server-iota.vercel.app/myTask', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            navigate('/media')
                            toast.success('Task Added Successfully')
                        })
                }
            })
    };
    return (
        <div>
            <h2 className='text-5xl text-bold text-center my-8 text-purple-900'>Add Your Task</h2>
            <div className='mt-10 w-96 mx-auto border-2 rounded my-24 p-5 bg-purple-900'>
                <form onSubmit={handleSubmit(handleAddProduct)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text text-pink-500 text-xl">Task Name</span></label>
                        <input type="text" className="input input-bordered rounded w-full max-w-xs" {...register("name", {
                            required: "name is required"
                        })} />
                        {errors.price && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text text-pink-500 text-xl">Time Duration</span></label>
                        <input type="text" className="input input-bordered rounded w-full max-w-xs" {...register("time", {
                            required: "time is required"
                        })} />
                        {errors.price && <p className='text-red-600'>{errors.time.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text text-pink-500 text-xl">Task Details</span></label>
                        <textarea id="comment" rows="4" class="border w-full rounded max-w-xs p-2 text-sm" placeholder="Write task details..." {...register("detail", {
                            required: "Description is required"
                        })}></textarea>
                        {errors.detail && <p className='text-red-600'>{errors.detail.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text text-pink-500 text-xl">Photo</span></label>
                        <input type="file" className="input input-bordered rounded w-full max-w-xs" {...register("image", {
                            required: "Photo is required"
                        })} />
                        {errors.image && <p className='text-pink-500'>{errors.image.message}</p>}
                    </div>

                    {/* <button type="submit" class="text-white  hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full max-w-xs my-5 px-5 py-2.5 text-center dark:bg-purple-900 dark:hover:bg-purple-900 dark:focus:ring-purple-300">Add Task</button> */}
                    <Button type='submit' className='mb-3 mt-5 w-52 mx-auto' gradientDuoTone="pinkToOrange">
                    Add Task
                </Button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;