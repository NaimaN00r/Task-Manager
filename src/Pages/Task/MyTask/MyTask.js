import { useQuery } from '@tanstack/react-query';
import { Button, Spinner } from 'flowbite-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import Task from './Task';

const MyTask = () => {

    const { data: myTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['myTasks'],
        queryFn: async () => {
            const res = await fetch('https://my-task-server-iota.vercel.app/addTask');
            const data = await res.json();
            return data
        }
    })

    const handleDelete = id => {
        fetch(`https://my-task-server-iota.vercel.app/addTask/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success('Task deleted successfully')
                }
            })
    };

    if (isLoading) {
        return <div className='w-40 mx-auto'> <Button outline={true}>
            <div className="mr-3">
                <Spinner
                    size="sm"
                    light={true}
                />
            </div>
            Loading ...
        </Button></div>
    }

    return (
        <div>
            <h2 className='text-3xl my-16 font-medium text-purple-900 text-center'>My Tasks</h2>
            <div className='gap-6 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    myTasks?.map(myTask => <Task
                        key={myTask?._id}
                        myTask={myTask}
                        handleDelete={handleDelete}
                        refetch={refetch}
                    ></Task>)
                }
            </div>
        </div>
    );
};

export default MyTask;