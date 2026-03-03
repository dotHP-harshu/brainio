import { Github } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-text py-8 border-t border-gray-800">
      <div
        className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
      >
        <p>© 2026 Brainio. Build with ❤️ by <span className='font-semibold'>DotHP</span></p>
        <div className="flex space-x-6 mt-4 md:mt-0 font-bold">
          <a className="hover:text-white" href="https://github.com/dothp-harshu/brainio" target='_blank'><Github/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer