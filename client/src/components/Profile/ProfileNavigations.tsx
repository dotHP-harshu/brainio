import { Clock, PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ProfileNavigations() {
    const navigate = useNavigate()
  return (
    <div className='mb-10 select-none'>
        <div className='grid grid-cols-2 justify-center items-center gap-4 max-sm:grid-cols-1'>
            <button onClick={()=>navigate("/history", {replace:true})} className='flex justify-center items-center gap-2 box box-shadow cursor-pointer p-2 w-full bg-secondary '>
                <span><Clock/> </span>
                <span>Go to History</span>
            </button>
            <button onClick={()=>navigate("/generator", {replace:true})} className='flex justify-center items-center gap-2 box box-shadow cursor-pointer p-2 w-full bg-primary '>
                <span><PlusCircle/> </span>
                <span>Generate a Test</span>
            </button>
        </div>
    </div>
  )
}

export default ProfileNavigations