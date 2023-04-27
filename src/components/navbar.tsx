import { Link, useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { auth } from '../lib/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Fragment } from 'react'
function Navbar() {

  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const logOut = () => {
    signOut(auth)
    navigate('/login')
  }


  return (
    <nav className=" w-full px-4 py-2 top-0 z-30 bg-white fixed box-sizing flex border-b-2 justify-between items-center">
      <Link to={'/'} className='text-xl text-gray-800 font-medium'>Info Tracker</Link>
      <div >

        {user ?
          (
            <Fragment>

              <Link className="text-xl font-normal text-blue-500 px-2 hover:underline" to={'/add'}>Add Employee</Link>
              <button className="text-xl font-normal text-red-500 px-2 hover:underline" onClick={logOut} >Log Out</button>
            </Fragment>
          ) : <Link className="text-xl font-normal text-blue-500 px-2 hover:underline" to={'/login'} >Login</Link>}
      </div>
    </nav>
  )
}

export default Navbar