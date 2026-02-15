import { Lightbulb, Plus } from 'lucide-react';
import { useEffect, useRef } from 'react';


interface HintModalInterface {
  hint: string;
  hideModal: () => void
}


function HintModal({ hint, hideModal }: HintModalInterface) {

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!modalRef.current) return
    const hintBox = modalRef.current.querySelector('#hint-box') as HTMLDivElement
    
    const hideOnClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !hintBox.contains(e.target as Node)) {
        hideModal()
      }
    }
    modalRef.current.addEventListener("click", hideOnClickOutside)


    return () => {
      if (!modalRef.current) return
      modalRef.current.removeEventListener("click", hideOnClickOutside)
    }
  }, [hideModal])

  return (
    <div ref={modalRef} className='fixed inset-0 flex items-center justify-center z-30 bg-[#ffffff42] backdrop-blur-md p-6 w-screen h-screen '>
      <div id='hint-box' className='relative box box-shadow p-6 flex justify-center items-center flex-col gap-6 w-full max-w-xs bg-secondary/80 pt-10'>
        <button onClick={hideModal} className='absolute top-4 right-4 outline-none cursor-pointer'>
          <Plus className='rotate-45' size={20} />
        </button>
        <div className='w-full flex justify-center items-start flex-col gap-4 '>
          <div className='w-fit h-fit'>
            <Lightbulb strokeWidth={2} className='fill-error' />
          </div>
          <p className='text-base'>{hint}</p>
        </div>
      </div>
    </div>
  )
}

export default HintModal