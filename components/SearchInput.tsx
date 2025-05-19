'use client'

import React, { useState, useRef, useEffect } from "react";
import { SearchIcon, ChevronDown, ChevronUp, X } from "lucide-react";
import { searchByQuery } from "@/services/search";
import Link from "next/link";
import { UserI } from "@/models/user.model";
import { SimplifiedApi } from "@/interfaces/api";


export const SearchInput = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({users: [], apis: []});
    const [isFocused, setIsFocused] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () =>{
            if (query.trim() === "") {
                setResults({users: [],
                    apis: []
                });
            } else {
                const response = await searchByQuery(query);
                if(response.status === 200){
                    setResults({
                        users: response.data.users || [],
                        apis: response.data.apis || []
                    })
                }
            }
        }
        fetchData();
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsFocused(false);
            setIsExpanded(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const clearSearch = () => {
        setQuery("");
        setIsFocused(true);
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
            <div className="relative text-gray-700">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="Search for APIs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        setIsFocused(true);
                        setIsExpanded(true);
                    }}
                    autoComplete="off"
                />
                {query && (
                <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-8 flex items-center pr-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
                )}
                <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                ) : (
                    <ChevronDown className="w-5 h-5" />
                )}
                </button>
            </div>

            {isFocused && isExpanded && (
                <div className="absolute bg-white z-50 mt-2 w-[170%] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-200 transform origin-top dark:bg-gray-900">          
                    {results.users.length > 0 || results.apis.length > 0 ? (
                    <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                        {results.users.length > 0 && (
                            <div className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                Users
                            </div>
                        )}
                        <ul>
                            {results.users.map((user: UserI) => (
                                <li
                                    key={user.id}
                                    className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer group"
                                >
                                    <Link href={`/user/${user.username}`}>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white">
                                                {user.username}
                                            </span>
                                            <span className="text-xs text-gray-500">{user.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {results.apis.length > 0 && (
                            <div className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                APIs
                            </div>
                        )}
                        <ul>
                            {results.apis.map((api: SimplifiedApi) => (
                                <li
                                    key={api._id}
                                    className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer group"
                                >
                                    <Link href={`/api/${api._id}`}>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white">
                                                {api.title}
                                            </span>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {api.category.name}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{api.description.substring(0,50)}...</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="px-4 py-6 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">No results</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            We couldn&quot;t find any results matching &quot;{query}&quot;
                        </p>
                        <button
                            onClick={clearSearch}
                            className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Clear search
                        </button>
                    </div>
                )}
                </div>
            )}
        </div>
    );
};