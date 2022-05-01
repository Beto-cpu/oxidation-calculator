import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/images/logo.png'

export default function Header(){
    return(
        <div className='flex flex-col mb-3'>
            <div className='flex flex-row px-4 py-3 bg-blue-500 justify-center md:justify-start'>
                <div>
                    <Link href='/'>
                        <a>
                            <Image  src={logo} width={100} height={100}/>
                        </a>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col items-center md:flex-row justify-end bg-gray-200 text-xl font-bold text-center'>
                <Link href='/thickness'>
                    <a className='py-2 px-4 hover:bg-gray-300'>Cálculo de grosor final</a>
                </Link>
                <Link href='/time'>
                    <a className='py-2 px-4 hover:bg-gray-300'>Cálculo de tiempo de oxidación</a>
                </Link>
            </div>
        </div>
    );
}