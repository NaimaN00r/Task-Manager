import { useQuery } from '@tanstack/react-query';
import { Button, Card, Spinner } from 'flowbite-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Media = () => {

  const { data: tasks = [], isLoading, refetch } = useQuery({
    queryKey: ['myTasks'],
    queryFn: async () => {
      const res = await fetch('https://my-task-server-iota.vercel.app/myTask');
      const data = await res.json();
      return data
    }
  })

  const handleDeleteProduct = id => {
    fetch(`https://my-task-server-iota.vercel.app/myTask/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.deletedCount > 0) {
          refetch();
          toast.success('deleted successfully');
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
    <div className='px-16'>
      <h2 className='text-4xl text-center my-10 text-purple-600'>All Tasks</h2>

      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          tasks?.map(task => <div className="my-3 max-w-sm">
            <Card className='h-full'>
              <img className='h-60' src={task?.image} alt="" />
              <h5 className="text-2xl font-semibold tracking-tight dark:text-white">
                Task Name : {task?.name}
              </h5>
              <h5 className="text-xl font-semibold tracking-tight dark:text-white">
                Duration Time : {task?.time}
              </h5>
              <div className='flex mx-auto gap-5 '>
                <Link to={`/myTask/${task?._id}`}><Button className='w-32 ' gradientDuoTone="purpleToBlue">
                  Details
                </Button></Link>
                <Button onClick={() => handleDeleteProduct(task?._id)} className='w-32' gradientDuoTone="pinkToOrange">
                  Delete
                </Button>

              </div>
            </Card>
          </div>)
        }
      </div>
    </div>
  );
};

export default Media;
