import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/images/logo.png'

export default function Header(){
    return(
        <div className='flex bg-blue-900 justify-center items-center py-4'>
           <Link href='https://github.com/Beto-cpu'>
               <a className='text-white text-2xl font-bold hover:underline'>Beto-CPU</a>
           </Link>
        </div>
    );
}