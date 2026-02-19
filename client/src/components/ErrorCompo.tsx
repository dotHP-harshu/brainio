import React, { useRef } from 'react'

interface ErrorCompoProps {
  errorMsg: string
  hideError: () => void
  retryFunc: () => void
}

function ErrorCompo({ errorMsg, hideError, retryFunc }: ErrorCompoProps) {
    const errorBoxRef = useRef<HTMLDivElement>(null)
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center px-6 z-40 backdrop-blur-md bg-black/30">
          <div 
            ref={errorBoxRef} 
            className="relative bg-error w-full max-w-lg p-6 box box-shadow transform transition-all duration-300 animate-in fade-in zoom-in"
          >
            {/* Close Button */}
            <button
              onClick={hideError}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center  cursor-pointer select-none"
              aria-label="Close error"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Error Icon */}
            <div className="flex items-center gap-1 mb-4">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold font-sans">
                Oops! Something went wrong
              </h4>
            </div>
            
            {/* Error Message */}
            <p className="text-text/70 text-base font-mono mb-6 leading-relaxed">
              {errorMsg}
            </p>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={hideError}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors cursor-pointer select-none font-medium"
              >
                Cancel
              </button>
              <button
                onClick={retryFunc}
                className="px-6 py-2 bg-text text-error font-bold uppercase cursor-pointer select-none hover:bg-gray-100 transition-colors shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
  )
}

export default ErrorCompo