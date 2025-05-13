'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import appLogo from '../../../public/apihub-Logo.png'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import googleLogo from '../../../public/google-Logo.webp'
import githubLogo from '../../../public/github-Logo.png'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'


type SignInErrors = {
    email?: string,
    password?: string,
    form?: string,
}

function Page() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<SignInErrors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const errorType = searchParams.get('error');
        if (errorType === 'EmailExists') {
            setErrors({ form: 'An account with this email already exists.' });
        }
        if(errorType === 'Configuration') {
            setErrors({ form: 'Network error. try again!' });
        }
    }, [searchParams]);
    
    const validateForm = () => {
        const newErrors: SignInErrors = {};
        if (!email) {
        newErrors.email = 'Email is required';
        }
        if (!password) {
        newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: "/hub"
            });
            if (result?.error) {
            setErrors({
                form: 'Invalid email or password'
            });
            } else {
                router.push(result?.url || '/hub');
            }
        } catch {
            setErrors({ form: 'An unexpected error occurred' });
        } finally {
            setIsLoading(false);
        }
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br light:from-blue-50 light:to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Image 
                        src={appLogo} 
                        width={200}
                        height={120}
                        alt="Application logo"
                        priority
                        className="hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold light:text-gray-800">
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm light:text-gray-600">
                    {"Don't have an account? "}
                    <Link href="/auth/signUp" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="light:bg-white py-8 px-6 shadow-lg rounded-xl sm:px-10 border border-gray-100">
                    {errors.form && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.form}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium light:text-gray-700 mb-1">
                                Email address
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className={`block w-full pl-10 pr-3 py-2 border-2 ${errors.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'} rounded-md sm:text-sm`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium light:text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={`block w-full pl-10 pr-10 py-2 border-2 ${errors.password ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'} rounded-md sm:text-sm`}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="h-5 w-5" />
                                        ) : (
                                            <FiEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm cursor-pointer font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-[#1a1a1a] light:text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => signIn('google',{ callbackUrl: '/hub' })}
                                    className="w-full cursor-pointer inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm light:bg-white text-sm font-medium light:text-gray-700 light:hover:bg-gray-50 transition-colors"
                                    >
                                    <Image
                                        src={googleLogo}
                                        alt="Google" 
                                        className="w-7 h-7 mr-2"
                                    />
                                    Google
                                </button>

                                <button
                                type="button"
                                className="w-full cursor-pointer inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm light:bg-white text-sm font-medium light:text-gray-700 light:hover:bg-gray-50 transition-colors"
                                >
                                <Image
                                    src={githubLogo}
                                    alt="GitHub" 
                                    className="w-5 h-5 mr-2"
                                />
                                GitHub
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
