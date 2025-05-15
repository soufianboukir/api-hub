import { fetchApi } from '@/services/apis'
import React from 'react'


async function page({params}: {params: {apiId: string}}) {
    const api = {
        avatar: 'https://api.logo.com/example.png',
        title: 'Currency Conversion API',
        author: { username: 'soufian_dev' },
        category: { name: 'Finance' },
        description: 'Easily convert between 160+ currencies in real-time using this powerful RESTful API.',
        baseUrl: 'https://api.currencyconverter.dev/v1',
        documentationUrl: 'https://docs.currencyconverter.dev',
        githubLink: 'https://github.com/example/currency-api',
        gitLabLink: '',
        endPoints: [
          {
            method: 'GET',
            url: '/convert',
            description: 'Converts amount between two currencies using the latest exchange rate.',
          },
          {
            method: 'GET',
            url: '/rates',
            description: 'Returns the latest exchange rates for all supported currencies.',
          },
        ],
        reviews: [
          {
            author: 'user123',
            review: 'Simple to use and highly accurate. Recommended for fintech apps!',
          },
          {
            author: 'apiFan',
            review: 'The documentation is clean, and the response time is fast.',
          },
        ],
      };
    
      return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 font-sans bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <img
              src={api.avatar}
              alt="API Logo"
              className="w-24 h-24 rounded-xl shadow-md border-2 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{api.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-gray-500">by 
                  <span className="text-indigo-600 font-medium ml-1">{api.author.username}</span>
                </span>
                <span className="text-gray-300">•</span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                  {api.category.name}
                </span>
              </div>
            </div>
          </div>
    
          {/* Description */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed">{api.description}</p>
          </div>
    
          {/* Base URL */}
          {api.baseUrl && (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Base URL
              </h2>
              <code className="block bg-gray-100 text-blue-700 px-4 py-3 rounded-lg border border-gray-200 mt-1 font-mono text-sm overflow-x-auto">
                {api.baseUrl}
              </code>
            </div>
          )}
    
          {/* Endpoints */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Endpoints
            </h2>
            <ul className="space-y-3">
              {api.endPoints.map((ep, index) => (
                <li
                  key={index}
                  className="border p-5 rounded-lg bg-gray-50 hover:bg-white transition-all duration-200 hover:shadow-sm group"
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
                      <p className="font-mono text-blue-600 group-hover:text-blue-700">{ep.url}</p>
                      <p className="text-gray-600 text-sm mt-1.5">{ep.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
    
          {/* Links */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {api.documentationUrl && (
                <a
                  href={api.documentationUrl}
                  className="flex items-center gap-3 p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                  target="_blank"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Documentation</span>
                </a>
              )}
              {api.githubLink && (
                <a
                  href={api.githubLink}
                  className="flex items-center gap-3 p-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  target="_blank"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="font-medium">GitHub Repository</span>
                </a>
              )}
              {api.gitLabLink && (
                <a
                  href={api.gitLabLink}
                  className="flex items-center gap-3 p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors duration-200"
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
    
          {/* Reviews */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              User Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {api.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <p className="font-semibold text-gray-800">{review.author}</p>
                  </div>
                  <p className="text-gray-600 mt-3 pl-2 border-l-2 border-indigo-200 italic">
                    "{review.review}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
}

export default page
