import Link from 'next/link'

export default function Navigation() {
    return <div>
        <Link href="/" className=''>Home</Link>
        <span className='nx-4'>|</span>
        <Link href="/Students" className=''>Students</Link>

    </div>
}