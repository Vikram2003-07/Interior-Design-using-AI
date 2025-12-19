import React from 'react'
import { Textarea } from "@/components/ui/textarea"
const AdditionalRequirments = ({additionalRequirements}) => {
  return (
    <div className='mt-4'>
        <label className='text-slate-700 ml-1'>Enter Additional Requirements (Optional)</label>
        <Textarea className='p-2 border border-slate-300 rounded-md mt-1' placeholder='Add any additional requirements (optional)' onChange={(e)=>additionalRequirements(e.target.value)} />
    </div>
  )
}

export default AdditionalRequirments