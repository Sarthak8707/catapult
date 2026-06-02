import axios from 'axios';
import { useEffect, useState } from 'react'




const Organizations = () => {
  
  const token = window.localStorage.getItem('token');
  const [organizationData, setOrganizationData] = useState < {organizationName: string, role: string, joinedAt: string} []> ([]);

  useEffect(() => {
    const getOrganizations = async () => {

      const response = await axios.get(`http://localhost:3000/organizations`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });

     setOrganizationData(response.data.organizations);
     console.log(response.data);

  }

  getOrganizations();
  }, []);

  return (
    <div className='bg-neutral-950 min-h-screen w-300 m-10'>
      
      <div className=' text-white flex flex-col gap-5'>
        <h1 className='ml-20 text-2xl font-bold text-start'>Your Organizations</h1>
        <p className='ml-20 text-start text-gray-200'>Here is the  list of all your organizations you are part of and associated with...</p>
      </div>

      <div className='grid grid-cols-4 ml-20 gap-4 mt-10'>
  <div className='text-gray-500 text-sm font-medium'>Organization</div>
  <div className='text-gray-500 text-sm font-medium'>Role</div>
  <div className='text-gray-500 text-sm font-medium'>Created On</div>
  <div className='text-gray-500 text-sm font-medium'>Actions</div>
</div>

{organizationData.map((organization, index) => (
  <div
    key={index}
    className='grid grid-cols-4 ml-20 gap-4 mt-10'
  >
    <div className='text-white'>
      {organization.organizationName}
    </div>

    <div className='text-white'>
      {organization.role}
    </div>

    <div className='text-white'>
      {organization.joinedAt}
    </div>

    <div className='text-white'>
      Configure
    </div>
  </div>
))}
      
    </div>
  )
}

export default Organizations