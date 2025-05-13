import Link from 'next/link'

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
            <p className="mt-4 text-gray-600">You do not have permission to view this page.</p>
            <Link href="/" className="mt-6 text-blue-500 hover:underline">Go back home</Link>
        </div>
    )
}
