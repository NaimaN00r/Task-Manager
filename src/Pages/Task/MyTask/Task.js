import { Button, Card } from 'flowbite-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Task = ({ myTask, refetch, handleDelete }) => {
  const { task } = myTask;
  const navigate = useNavigate()

  const handleComplete = event => {
    const complete = {
      task
    }
    //   console.log(complete)
    fetch('https://my-task-server-iota.vercel.app/completeTask', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(complete)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        navigate('/completetask')
      })
  }
  return (
    <div className="max-w-sm">
      <Card>
        <h5 className="text-xl font-semibold dark:text-white">
          Task Details:
        </h5>
        <p>{task}</p>
        <div className='flex gap-2 mx-auto'>
          <Button onClick={handleComplete} gradientDuoTone="purpleToBlue" size="sm">Completed</Button>
          <Link to={`/update/${myTask?._id}`}><Button gradientDuoTone="greenToBlue" size="sm">Update</Button></Link>
          <Button onClick={() => handleDelete(myTask?._id)} size="sm" gradientDuoTone="purpleToPink">Delete</Button>
        </div>
      </Card>
    </div>
  );
};

export default Task;