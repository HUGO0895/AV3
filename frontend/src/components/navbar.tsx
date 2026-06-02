import '../index.css'
import logo from '../assets/e.png'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom' 

function Navbar() {
    return (
        <div className='m-0 p-0 '>
            <nav className='max-w-2xl mx-auto flex flex-row justify-between items-center px-6 pl-6 border border-white rounded-full h-20 bg-white m-5 shadow-sm'>

              
                <Link to="/" className='group relative flex items-center shrink-0 hover:scale-110 transition-transform'>
                    <img src={logo} width={70} className='scale-110 -ml-2' alt="Logo" />
                </Link>

                
                <Link to="/aeronaves" className="group relative w-10 flex justify-center hover:scale-110 transition-transform">
                    <Icon icon="subway:airplane-mode" className='text-5xl text-[#123354]' />
                    <span className="absolute top-12 scale-0 group-hover:scale-100 transition-all bg-[#123354] text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                        AERONAVES
                    </span>
                </Link>

                <Link to="/Pecas" className="group relative w-10 flex justify-center hover:scale-110 transition-transform">
                    <Icon icon="grommet-icons:actions" className='text-5xl text-[#123354]' />
                    <span className="absolute top-12 scale-0 group-hover:scale-100 transition-all bg-[#123354] text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                        PEÇAS
                    </span>
                </Link>

          
                <Link to="/etapas" className="group relative w-10 flex justify-center hover:scale-110 transition-transform">
                    <Icon icon="qlementine-icons:address-book-add-16" className='text-5xl text-[#123354]' />
                    <span className="absolute top-12 scale-0 group-hover:scale-100 transition-all bg-[#123354] text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                        ETAPAS
                    </span>
                </Link>

                <Link to="/testes" className="group relative w-10 flex justify-center hover:scale-110 transition-transform">
                    <Icon icon="fluent-emoji-high-contrast:1st-place-medal" className='text-5xl text-[#123354]' />
                    <span className="absolute top-12 scale-0 group-hover:scale-100 transition-all bg-[#123354] text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                        TESTES
                    </span>
                </Link>

                 <Link to="/funcionarios" className="group relative w-10 flex justify-center hover:scale-110 transition-transform">
                    <Icon icon="weui:add-friends-filled" className='text-5xl text-[#123354]' />
                    <span className="absolute top-12 scale-0 group-hover:scale-100 transition-all bg-[#123354] text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                        FUNCIONARIOS
                    </span>
                </Link>

                 <Link to="/relatorios" className="group relative w-10 flex justify-center hover:scale-110 transition-transform">
                    <Icon icon="ix:calendar-week-filled" className='text-5xl text-[#123354]' />
                    <span className="absolute top-12 scale-0 group-hover:scale-100 transition-all bg-[#123354] text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                        RELATORIOS
                    </span>
                </Link>

            </nav>
        </div>
    )
}

export default Navbar