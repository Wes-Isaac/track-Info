import { DocumentData, collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../lib/config'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
export default function Home() {

  const [employees, setEmployees] = useState([] as {
    id: string,
    first_name: string,
    last_name: string,
    position: string,
    salary: number
  }[]
  );
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const fetch = useCallback(() => {
    onSnapshot(collection(db, 'employees'), (snap) => {
      const data = []
      snap.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      })
      setEmployees(data)
    })
  }, [])
  useEffect(() => {
    fetch()
  }, [fetch])

  const onEdit = (data: any) => {
    navigate(`/edit/${data.id}`, {
      state: data
    })

  }


  const onDelete = async (id: string) => {
    const docRef = doc(db, 'employees', id)
    const doIt = window.confirm('are you sure!')
    if (doIt) {
      await deleteDoc(docRef)
    }
  }

  return (
    <div className=' flex justify-center items-center h-screen'>
      {user ? <table className="text-sm text-left text-gray-900 ">
        <tbody className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-200">
          <tr>
            <th className="px-6 py-3">First Name</th>
            <th className='px-6 py-3'>Last Name</th>
            <th className='px-6 py-3'>Position</th>
            <th className='px-6 py-3'>Salary</th>
            <th className='px-6 py-3'>Edit</th>
            <th className='px-6 py-3'>Delete</th>
          </tr>
          {employees.map((employee) => (
            <tr key={employee.id} className="bg-white border-b dark:bg-gray-700 dark:border-gray-700">
              <td className="px-6 py-4">{employee?.first_name}</td>
              <td className="px-6 py-4">{employee?.last_name}</td>
              <td className="px-6 py-4">{employee?.position}</td>
              <td className="px-6 py-4">${employee?.salary}</td>
              <td className="px-6 py-4"> <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => onEdit(employee)}>Edit</button> </td>
              <td className="px-6 py-4"> <button className="font-medium  dark:text-red-500 hover:underline" onClick={() => onDelete(employee.id)}>Delete</button> </td>
            </tr>
          ))}
        </tbody>
      </table> :
        <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 mx-auto dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center self-center w-9/12 " to={'/login'} >Login</Link>}
    </div>
  )
}
