'use client'
import React, { useState } from 'react';
import { Zap, Shield, Code, BarChart2, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import apiHubLogo from '../public/apihub-Logo.png'
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/Loading';
import { ModeToggle } from '@/components/ModeToggle';

const API_CATEGORIES = [
  { name: 'Finance', icon: <BarChart2 className="w-5 h-5" /> },
  { name: 'Social', icon: <Globe className="w-5 h-5" /> },
  { name: 'Payment', icon: <Shield className="w-5 h-5" /> },
  { name: 'Weather', icon: <Code className="w-5 h-5" /> },
];

const FEATURED_APIS = [
  { id: 1, name: 'Payment Gateway API', category: 'Finance', rating: 4.9, requests: '10M+' },
  { id: 2, name: 'Social Media API', category: 'Social', rating: 4.7, requests: '8M+' },
  { id: 3, name: 'Weather Forecast API', category: 'Weather', rating: 4.8, requests: '5M+' },
  { id: 4, name: 'Geolocation API', category: 'Mapping', rating: 4.6, requests: '3M+' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Sarah Johnson', role: 'CTO at FinTech Corp', content: 'Reduced our development time by 40% with their payment APIs.' },
  { id: 2, name: 'Michael Chen', role: 'Lead Developer at SocialApp', content: 'The most reliable social API integration we\'ve ever used.' },
  { id: 3, name: 'Emma Williams', role: 'Product Manager at WeatherNow', content: 'Exceptional documentation and developer support.' },
];


     

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const {data: session, status} = useSession();
  

  if(status === 'loading') return <Loading />
  return (
    <div className="font-sans antialiased text-gray-900">
      <header className='flex justify-between lg:px-20 px-4 py-2 bg-white dark:bg-black text-white items-center fixed w-full z-10'>
        <div>
          <Image src={apiHubLogo} alt='App logo' width={200} height={100}/>
        </div>

        <div className="lg:flex hidden gap-8">
          <Link 
            href={'/#about'} 
            className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-lg 
                      duration-300 transition-all px-5 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800"
          >
            About
          </Link>
          <Link 
            href={'/#feautures'} 
            className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-lg 
                      duration-300 transition-all px-5 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800"
          >
            Features
          </Link>
          <Link 
            href={'/#whyUs'} 
            className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-lg 
                      duration-300 transition-all px-5 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800"
          >
            Why us?
          </Link>
        </div>


        <div className='flex gap-3'>
          <ModeToggle />
          {
            !session?.user ? 
              <div className='flex gap-2'>
                <Button className='border-2 text-lg bg-white text-blue-500 border-blue-500 px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  <Link href={'/auth/signIn'}>
                    Login
                  </Link>
                </Button>
                <Button className='bg-blue-500 text-lg px-4 py-2 text-white cursor-pointer hover:bg-blue-600 cursor-pointer'>
                  <Link href={'/auth/signUp'}>
                    Regiser
                  </Link>
                </Button>
              </div>
            : session?.user?.profile_picture ? (
                <div className='flex gap-2 items-center'>
                  <span className='font-semibold text-lg'>{session.user.username}</span>
                  <Image
                    src={session.user.profile_picture} 
                    width={40}
                    height={40}
                    alt="Application logo"
                    priority
                    className='cursor-pointer object-cover rounded-full aspect-square dark:border-white border-2 border-white' 
                  />
                </div>
              ): (
                <div className={`w-8 h-8 text-white flex justify-center items-center rounded-full ${session?.user?.defaultColor} cursor-pointer`}>
                  {session?.user?.name ? session.user.name[0] : 'U'}
                </div>
              )
          }
        </div>
      </header>
      <header className="relative bg-gradient-to-br from-blue-600 to-indigo-800 overflow-hidden" id='about'>
        <br /><br /><br />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The World{"'"}s Largest <span className="text-blue-200">API</span> Marketplace
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              Discover, connect, and deploy thousands of high-quality APIs to power your applications
            </p>
            <div className="mb-16">
              <Link href={'/hub'}>
                <Button className='bg-blue-600 text-white px-5 py-2 hover:bg-blue-700 cursor-pointer font-semibold text-lg'>
                  Get started
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {API_CATEGORIES.map((category) => (
                <div key={category.name} className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="fixed bottom-4 left-4 px-4 py-2 bg-white dark:bg-zinc-900 border border-blue-500 shadow-lg animate-fade-in font-semibold rounded-full">
        <a className="text-sm text-gray-700 dark:text-gray-300" href='https://soufianboukir.com' target='_blank'>
          Built with ❤️ by <span className="text-blue-600 font-semibold">Soufian</span>
        </a>
      </div>

      <section className="py-20 bg-gray-50 dark:bg-black" id='feautures'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Featured APIs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-200">
              Trusted by developers at companies of all sizes
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm dark:bg-gray-900">
              {['all', 'finance', 'social', 'weather'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_APIS.map((api) => (
              <div
                key={api.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-700">
                      {api.category}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <span className="font-medium mr-1">{api.rating}</span>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-300">{api.name}</h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {api.requests} requests
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="text-center mt-12">
            <Link href={'/hub'}>
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Browse All APIs
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-black" id="whyUs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Developers Love Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to build amazing applications faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our global infrastructure ensures low latency and high throughput for all your API calls.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Enterprise Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                All APIs are vetted for security and compliance with industry standards.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Developer First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive documentation, SDKs, and code samples for every API.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by the Best</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of companies building with our APIs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-800 rounded-xl p-8">
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 inline-block fill-current text-yellow-500"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg mb-6">{"'"}{testimonial.content}{"'"}</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join thousands of developers and start integrating APIs in minutes
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Link href={'/hub'}>
                Get Started for Free
              </Link>
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className='text-3xl font-semibold'>Api-hub</h1>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © 2025 Apihub. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="https://x.com/soufian_boukir" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/soufianboukir" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;