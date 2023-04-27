import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { FieldValues, useForm } from "react-hook-form"
import { auth, db, timestamp } from "../lib/config"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"

type Inputs = {
  first_name: string,
  last_name: string,
  position: string,
  salary: number,
}

export default function Add() {

  const [user] = useAuthState(auth)
  const { state } = useLocation()
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>()

  const onSubmit = (data: FieldValues) => {
    if (state) {
      updateDoc(doc(db, 'employees', state.id), {
        ...data,
        updatedAt: timestamp(),
      }).then(() => {
        reset({ first_name: '', last_name: '', position: '', salary: 0 })
        navigate('/')
      })

    } else {
      const employeeCollectionRef = collection(db, 'employees');

      addDoc(employeeCollectionRef, {
        ...data,
        createdAt: timestamp(),
        updatedAt: timestamp(),
      }).then(() => navigate('/')
      )
    }

  }
  return (
    <div className='flex justify-center items-center h-screen'>

      {user ? <form className="w-9/12" onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label htmlFor='first-name' className="block mb-2 text-sm font-medium text-gray-900">First Name:</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:border-white-200 block w-full p-2.5' type="text" id='first_name' {...register('first_name', { required: true, value: state?.first_name })}
          />
          {errors.first_name?.type === 'required' && <p role="alert">First name is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor='last_name' className="block mb-2 text-sm font-medium text-gray-900 ">Last Name:</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:border-white-200 block w-full p-2.5' type="text" id='last_name' {...register('last_name', { required: true, value: state?.last_name })}

          />
        </div>

        <div className="mb-4">
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 ">Position:</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:border-white-200 block w-full p-2.5' type="text" id='position' {...register('position', { required: true, value: state?.position })} />
        </div>

        <div className="mb-4">
          <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 ">Salary:</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:border-white-200 block w-full p-2.5' type="number" id='salary' {...register('salary', { required: true, min: 1, value: state?.salary })} defaultValue={0} />
        </div>

        <div className="mb-4">
          <input className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 mx-auto dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center self-center w-full" type="submit" value="Submit" />
        </div>

      </form>
        : <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 mx-auto dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center self-center w-9/12 " to={'/login'} >Login</Link>}
    </div>
  )
}
