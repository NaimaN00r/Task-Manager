import { useQuery } from '@tanstack/react-query';
import { Button, Card, Spinner } from 'flowbite-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CompleteTask = () => {

    const { data: completes = [], isLoading, refetch } = useQuery({
        queryKey: ['completeTask'],
        queryFn: async () => {
            const res = await fetch('https://my-task-server-iota.vercel.app/completeTask');
            const data = await res.json();
            return data
        }
    })

    const handleTaskDelete = id => {
        fetch(`https://my-task-server-iota.vercel.app/completeTask/${id}`, {
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
        <div className='pl-16 mx-5'>
            <h1 className='text-4xl text-center text-purple-900 my-8'>Complete Task</h1>
            <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    completes.map(complete => <div className="max-w-sm">
                        <Card>
                            <h5 className="text-xl font-semibold text-pink-500 dark:text-white">
                                Task Details:
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {complete?.task}
                            </p>
                            <div className="flex gap-2 mx-auto">
                                <div>
                                    <Button onClick={() => handleTaskDelete(complete?._id)} gradientDuoTone="purpleToBlue">
                                        Delete
                                    </Button>
                                </div>
                                <div>
                                    <Link to='/mytask'><Button gradientDuoTone="purpleToPink">
                                        Not Completed
                                    </Button></Link>
                                </div>
                                <div>
                                    <Link><Button gradientDuoTone="purpleToBlue">
                                        Comment
                                    </Button></Link>
                                </div>
                            </div>
                        </Card>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CompleteTask;