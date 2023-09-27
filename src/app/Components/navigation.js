import Link from 'next/link'

export default function Navigation() {
    return <div className=" mr-0 bg-blue-800 ">
        <Link href="/" className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Home</Link>
        <span className='nx-4'>|</span>
        <Link href="/Students" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Students</Link>

    </div>
}