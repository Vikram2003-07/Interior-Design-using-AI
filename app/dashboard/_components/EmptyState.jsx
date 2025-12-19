import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';



function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center mt-10 gap-5'>
        <Image src={'/placeholder.png'} alt='placeholderImage' width={400} height={400}/>
        {/* <BeforeAfterSlider /> */}
        <h2 className='font-medium text-lg text-gray-500'>Create New AI Interior Room Design</h2>
        <Link href={'/dashboard/create-new'}>
            <Button>+ Redesign Room</Button>
        </Link>
    </div>
  )
}

export default EmptyState