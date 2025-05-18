import { EndPoint, Review } from '@/models/api.model';
import { fetchApi } from '@/services/apis'
import { BringToFront, ExternalLink, Link as LinkLucide, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { ReviewApi } from '@/components/ReviewApi';
import { AskAvailabilityButton } from '@/components/client/AskAvailabilityButton';
import { auth } from '@/auth';


async function page({params}: {params: {apiId: string}}) {

      const apiData = await fetchApi(params.apiId);
      
      if(!apiData || apiData.error){
        return notFound();
      }
      const session = await auth();
      
      return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 font-sans light:bg-gray-50 min-h-screen">
          <div className="flex items-center gap-6 p-6 light:bg-white rounded-xl shadow-sm border dark:border-gray-500 border-gray-100">
            <Image
              src={apiData.avatar}
              alt="API Logo"
              width={100}
              height={100}
              className="w-24 h-24 rounded-xl shadow-md border-2 dark:border-gray-600 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold light:text-gray-800">{apiData.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-gray-500">by 
                  <Link className="text-indigo-600 dark:text-blue-500 font-medium ml-1" href={`/user/${apiData.author.username}`}>{apiData.author.username}</Link>
                </span>
                <span className="text-gray-300">•</span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                  {apiData.category.name}
                </span>
              </div>
            </div>
          </div>
    
          <div className="p-6 light:bg-white rounded-xl shadow-sm border dark:border-gray-500 border-gray-100">
            <p className="text-lg light:text-gray-700 leading-relaxed">{apiData.description}</p>
          </div>
    
          {apiData.baseUrl && (
            <div className="p-6 light:bg-white rounded-xl shadow-sm border dark:border-gray-500 border-gray-100">
              <h2 className="text-xl font-semibold light:text-gray-800 mb-3 flex items-center gap-2">
                <LinkLucide className='w-6 h-6'/>
                Base URL
              </h2>
              <code className="block light:bg-gray-100 light:text-blue-700 dark:text-blue-500 px-4 py-3 rounded-lg border dark:border-gray-500 border-gray-200 mt-1 font-mono text-sm overflow-x-auto">
                {apiData.baseUrl}
              </code>
            </div>
          )}
    
          <div className="p-6 dark:border-gray-500 light:bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold light:text-gray-800 mb-4 flex items-center gap-2">
              <BringToFront className='w-6 h-6'/>
              Endpoints
            </h2>
            <ul className="space-y-3">
              {apiData.endPoints.map((ep: EndPoint, index:number) => (
                <li
                  key={index}
                  className="border dark:border-gray-700 p-5 rounded-lg bg-gray-50 border-gray-100 dark:bg-inherit hover:bg-white transition-all duration-200 hover:shadow-sm group"
                >
                  <div className="flex items-start gap-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                      ep.method === 'GET' ? 'bg-blue-100 text-blue-800' : 
                      ep.method === 'POST' ? 'bg-green-100 text-green-800' :
                      ep.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      ep.method === 'DELETE' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ep.method}
                    </span>
                    <div>
                      <p className="font-mono dark:text-blue-400 text-blue-600 group-hover:text-blue-700">{ep.url}</p>
                      <p className="text-gray-600 dark:text-gray-200 text-sm mt-1.5">{ep.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
    
          <div className="p-6 light:bg-white rounded-xl shadow-sm border dark:border-gray-500 border-gray-100">
            <h2 className="text-xl font-semibold light:text-gray-800 mb-4 flex items-center gap-2">
              <ExternalLink className='w-6 h-6'/>
              Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {apiData.documentationUrl && (
                <a
                  href={apiData.documentationUrl}
                  className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-gray-800 text-blue-500 light:text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                  target="_blank"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Documentation</span>
                </a>
              )}
              {apiData.githubLink && (
                <a
                  href={apiData.githubLink}
                  className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  target="_blank"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="font-medium">GitHub Repository</span>
                </a>
              )}
              {apiData.gitLabLink && (
                <a
                  href={apiData.gitLabLink}
                  className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-700 dark:text-white text-orange-700 rounded-lg hover:bg-orange-100 transition-colors duration-200"
                  target="_blank"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
                  </svg>
                  <span className="font-medium">GitLab Repository</span>
                </a>
              )}
            </div>
          </div>
    
          <div className="p-6 light:bg-white rounded-xl shadow-sm border dark:border-gray-500 border-gray-100">
            <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-4 flex items-center gap-2">
              <Star className='w-6 h-6'/>
              User Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {
                apiData.reviews.length ? 
                  apiData.reviews.map((review:Review, index:number) => (
                    <div
                      key={index}
                      className="light:bg-white dark:border-gray-700 p-5 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {review.author.username.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-semibold dark:text-gray-200 text-gray-800">{review.author.username}</p>
                      </div>
                      <p className="dark:text-gray-500 mt-3 pl-2 border-l-2 border-indigo-200 italic">
                        {review.review}
                      </p>
                    </div>
                  ))
                : "be the first one to comment on this api!"
              }
            </div>
            <br />
            <div className="flex justify-center gap-2">
              <ReviewApi apiId={params.apiId}/>
              {
                session?.user.id !== apiData.author._id && (
                  <AskAvailabilityButton apiId={params.apiId}/>
                )
              }
            </div>
          </div>
        </div>
      )
}

export default page
