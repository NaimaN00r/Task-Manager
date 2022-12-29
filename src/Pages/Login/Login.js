import { GoogleAuthProvider } from 'firebase/auth';
import { Button, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {

    const [error, setError] = useState('');
    const { providerLogin, signIn, setLoading } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                toast.success('User Login successfully')
                form.reset();
                if (user) {
                    navigate(from, { replace: true });
                }
                setError('');
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user
                console.log(user)
                if (user) {
                    navigate(from, { replace: true });
                }
            })
            .catch(error => console.error(error));
    }
    return (
        <div className='w-1/2 mx-auto border-2 rounded my-24 p-5 bg-purple-900'>
            <h2 className='text-center text-3xl font-semibold my-5 text-white'>Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block ">
                        <Label
                        className='text-pink-400'
                            htmlFor="email1"
                            value="Your email"
                        />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        name='email'
                        placeholder="email"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                        className='text-pink-400'
                            htmlFor="password1"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        name="password"
                        placeholder="password"
                        required={true}
                    />
                </div>
                <Button type="submit" className=''>
                    Login
                </Button>
                <Button onClick={handleGoogleSignIn} type="submit" >
                    Google
                </Button>
                {error}
                <p><small className='text-pink-400'>New to this website ? please Register <Link to='/signup'><button className='text-red-600 text-lg'>Sign Up</button></Link></small></p>
            </form>
        </div>
    );
};

export default Login;