import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,facebookAuthProvider,signInWithPopup } from '../lib/config';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string,
  password: string,
};

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  const [serverErr, setServerErr] = useState('')
  const onSubmit = (e: any) => {
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setServerErr(`Failed with error code ${errorCode}`)

      });
    reset()

  }


  const withFacebook = async () => {
    setLoading(true);
    await signInWithPopup(auth, facebookAuthProvider)
      .then(async (result) => {
        console.log(result)
        return
      }).catch((err)=>console.log(err))
    }
  return (
    <div className='flex justify-center flex-col items-center h-screen'>
      <h1 className='text-3xl font-bold my-5'>Login</h1>

      <form className="w-9/12" onSubmit={handleSubmit(onSubmit)}>
        {serverErr && <span className='flex text-red-600 '>{serverErr}</span>}
        <div className="mb-4">

          <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">Email:</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:border-white-200 block w-full p-2.5' type="text" id='email' {...register('email', { required: true, })} />
          {errors.email && <span className='flex text-red-600 '>This field is required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password:</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:border-white-200 block w-full p-2.5' type="password" id='password' {...register('password', { required: true })} />
          {errors.password && <span className='flex text-red-600 '>This field is required</span>}
        </div>

        <div className="mb-4">
          <input className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 mx-auto dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center self-center w-full" type="submit" value="Submit" />
        </div>
      </form>
      <button
        onClick={withFacebook}
        className="py-3  cursor-pointer border border-slate-300 rounded-[35px] flex gap-2 items-center w-[80%] sm:w-[280px] justify-center"
      >
       <p>Continue with Facebook</p>
      </button>
    </div>

  )
}
