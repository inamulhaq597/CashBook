import React from 'react'

const header = () => {
  return (
    <div>
     <header>
          {/*Nav*/}
          <nav aria-label="menu nav" className="bg-gray-800   p-2 w-full ">
            <div className="flex flex-wrap items-center">
              <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">

              </div>
              <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
                <span className="relative w-full">
                  <input aria-label="search" type="search" id="search" placeholder="Search" className="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal" />
                  <div className="absolute search-icon" style={{ top: '1rem', left: '.8rem' }}>
                    <svg className="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                    </svg>
                  </div>
                </span>
              </div>
              <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                  <li className="flex-1 md:flex-none md:mr-3">
                    <a className="inline-block py-2 px-4 text-white no-underline hover:text-red-400 font-bold" href="#">Log in</a>
                  </li>

                  <li className="flex-1 md:flex-none md:mr-3">
                    <a className="inline-block py-2 px-4 text-white no-underline hover:text-red-400  font-bold" href="#">Settings</a>
                  </li>
                  <span className='lg:hidden px-3 py-2 text-white '   ><i class="fa fa-bars"></i></span>
                </ul>
              </div>
            </div>
          </nav>
        </header></div>
  )
}

export default header