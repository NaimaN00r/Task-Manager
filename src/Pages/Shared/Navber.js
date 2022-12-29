import { Button, Navbar } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { FaLightbulb } from 'react-icons/fa';
import './Navber'
const Navber = () => {
    const [theme, setTheme] = useState('light');
  const changeMode = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }
    return (
        <div className='px-5'>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand href="">
                    <span className="self-center text-purple-900 text-3xl whitespace-nowrap font-semibold dark:text-white">
                        Task Management
                    </span>
                    <button onClick={changeMode} variant='light' className='pl-8'><FaLightbulb></FaLightbulb></button>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Link to='/addtask'><button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add Task</button></Link>
                    <Link to='/mytask'><button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">My Task</button></Link>
                    <Link to='/media'><button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">All Task</button></Link>
                    

                    
                    {/* <Link to='/addtask'><Button className='my-2' color='light'>Add Task</Button></Link>
                    <Link to='/mytask'><Button className='my-2' color='light'>My Task</Button></Link>
                    {/* <Link to='/completetask'><Button className='my-2' color='light'>Complete Task</Button></Link> */}
                    {/* <Link to='/media'><Button className='my-2' color='light'>All Task</Button></Link> */} 
                   {
                    user?.email? <>
                     <Link><Button onClick={handleLogOut} className='my-2' color='light'>Log Out</Button></Link>
                    </> : 
                    <>
                    <Link to='/login'><button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Login</button></Link>
                    <Link to='/login'><button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Sign UP</button></Link>
                    {/* <Link to='/login'><Button className='my-2' color='light'>Login</Button></Link>
                    <Link to='/login'><Button className='my-2' color='light'>Sign Up</Button></Link> */}
                    </>
                   }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navber;