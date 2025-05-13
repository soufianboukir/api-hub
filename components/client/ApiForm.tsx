'use client'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import apiAvatar1 from '@/public/avatars/apiImage1.png'
import apiAvatar2 from '@/public/avatars/apiImage2.png'
import apiAvatar3 from '@/public/avatars/apiImage3.png'
import apiAvatar4 from '@/public/avatars/apiImage4.png'
import apiAvatar5 from '@/public/avatars/apiImage5.png'
import apiAvatar6 from '@/public/avatars/apiImage6.png'
import apiAvatar7 from '@/public/avatars/apiImage7.png'
import apiAvatar8 from '@/public/avatars/apiImage8.png'
import apiAvatar9 from '@/public/avatars/apiImage9.png'
import apiAvatar10 from '@/public/avatars/apiImage10.png'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ApiMethodSelect, CategorySelect } from '@/components/client/SelectFields'
import { toast } from 'sonner'
import { ApiForm as ApiFormInterface } from '@/interfaces/api'
import { publishApi, updateApi } from '@/services/apis'
import { EndPoint } from '@/models/api.model'

const avatars = [
    apiAvatar1,
    apiAvatar2,
    apiAvatar3,
    apiAvatar4,
    apiAvatar5,
    apiAvatar6,
    apiAvatar7,
    apiAvatar8,
    apiAvatar9,
    apiAvatar10
]

type ApiFormProps = {
    type: 'publish' | 'edit',
    apiId?: string,
    apiForm?: {
        avatar: StaticImageData,
        title: string, 
        description: string,
        category:{
            _id: string
        },
        githubLink: string,
        gitLabLink: string,
        documentationUrl: string,
        baseUrl: string,
        endPoints : EndPoint[],
    },
}

const ApiForm = ({type,apiId,apiForm}:  ApiFormProps) => {    
    const [avatar, setAvatar] = useState(apiForm?.avatar || avatars[0])

    const [formData, setFormData] = useState<ApiFormInterface>({
        avatar: apiForm?.avatar || avatar,
        title: apiForm?.title || '',
        description: apiForm?.description || '',
        category: apiForm?.category._id || '',
        github: apiForm?.githubLink || '',
        gitlab: apiForm?.gitLabLink || '',
        documentation: apiForm?.documentationUrl || '',
        baseUrl: apiForm?.baseUrl || '',
        endpoints: apiForm?.endPoints || [{ url: '',
            method: 'GET',
            description: '' }]
    })

    const randomImage = () => {
        const randomIndex = Math.floor(Math.random() * avatars.length)
        setAvatar(avatars[randomIndex])
        setFormData((prev) => ({
            ...prev,
            avatar: avatars[randomIndex]
        }));
    }

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleEndpointChange = (index: number, key: string, value: string) => {
        const updatedEndpoints = [...formData.endpoints]
        updatedEndpoints[index][key] = value
        setFormData((prev) => ({
            ...prev,
            endpoints: updatedEndpoints
        }))
    }

    const addEndpoint = () => {
        setFormData((prev) => ({
        ...prev,
        endpoints: [...prev.endpoints, { url: '', method: '', description: '' }]
        }))
    }

    const removeEndpoint = (index: number) => {
        const updatedEndpoints = [...formData.endpoints]
        updatedEndpoints.splice(index, 1)
        setFormData((prev) => ({
        ...prev,
        endpoints: updatedEndpoints
        }))
    }

    const handleSubmit = async () =>{
        try{
            if(!formData.title.trim()){
                toast.error('Submission error',{
                    description: 'Please type a title'
                })
                return;
            }else if(!formData.description.trim()){
                toast.error('Submission error',{
                    description: 'Please type a description'
                })
                return;
            }else if(!formData.category){
                toast.error('Submission error',{
                    description: 'Please select a category'
                })
                return;
            }
            
            switch (type){
                case "publish":
                    toast.promise(publishApi(formData),{
                        loading: 'Uploading...',
                        success: (res) => res.data.message,
                        error : (err) => err?.res?.data.message || 'Upload failed'
                    })
                    break;
                case "edit":
                    toast.promise(updateApi(formData,apiId!),{
                        loading: 'Updating...',
                        success: (res) => res.data.message,
                        error : (err) => err?.res?.data.message || 'Update failed'
                    })
                    break;
            }
        }catch{

        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col items-center mb-6">
                <Image src={avatar} alt="API Avatar" width={120} height={120} className="rounded-full" />
                <Button variant="outline" className="mt-4" onClick={randomImage}>
                    🔄 Regenerate Avatar
                </Button>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold light:text-gray-800 ">
                    {
                        type === 'publish' ?
                        "Publish New API 🚀" 
                        : "Edit your API"
                    }
                </h1>
                <p className="light:text-gray-600 text-sm mt-2">
                    Share your API with the community and make it discoverable to developers worldwide.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <Label className="text-lg font-medium light:text-gray-700">Title *</Label>
                        <Input
                        placeholder="Ex: Weather API"
                        className="mt-2 bg-white"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="text-lg font-medium light:text-gray-700 ">Description *</Label>
                        <Textarea
                            rows={5}
                            placeholder="Describe what your API does..."
                            className="mt-2 bg-white bg-gray-800bg-gray-800"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="text-lg font-medium light:text-gray-700 ">Category *</Label>
                        <CategorySelect value={formData.category} onChange={(val) => handleChange('category', val)} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="light:bg-gray-50 bg-gray-800bg-gray-800/50 p-6 rounded-lg border light:border-gray-200 bg-gray-800border-gray-700">
                        <h3 className="text-xl font-semibold light:text-gray-800  mb-4">Repository Links</h3>
                        <div className="space-y-4">
                            <div>
                                <Label className="light:text-gray-700 ">GitHub</Label>
                                <Input
                                placeholder="https://github.com/..."
                                className="mt-2 light:bg-white bg-gray-800bg-gray-800"
                                value={formData.github}
                                onChange={(e) => handleChange('github', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="light:text-gray-700 ">GitLab</Label>
                                <Input
                                placeholder="https://gitlab.com/..."
                                className="mt-2 light:bg-white bg-gray-800bg-gray-800"
                                value={formData.gitlab}
                                onChange={(e) => handleChange('gitlab', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="light:bg-gray-50 bg-gray-800bg-gray-800/50 p-6 rounded-lg border light:border-gray-200 bg-gray-800border-gray-700">
                        <h3 className="text-xl font-semibold light:text-gray-800  mb-4">Documentation</h3>
                            <Label className="light:text-gray-700 ">Docs URL</Label>
                            <Input
                            placeholder="https://api-docs.example.com"
                            className="mt-2 light:bg-white bg-gray-800bg-gray-800"
                            value={formData.documentation}
                            onChange={(e) => handleChange('documentation', e.target.value)}
                            />
                    </div>
                </div>
            </div>

            <div className="mt-10 light:bg-gray-50 bg-gray-800bg-gray-800/50 p-6 rounded-lg border light:border-gray-200 bg-gray-800border-gray-700">
                <h3 className="text-xl font-semibold light:text-gray-800  mb-4">API Endpoints</h3>

                <div className="mb-6">
                    <Label className="light:text-gray-700 ">Base URL</Label>
                    <Input
                        placeholder="https://api.example.com/v1"
                        className="mt-2 light:bg-white bg-gray-800bg-gray-800"
                        value={formData.baseUrl}
                        onChange={(e) => handleChange('baseUrl', e.target.value)}
                    />
                </div>

                {formData?.endpoints?.map((endpoint, index) => (
                    <div key={index} className="space-y-4 mb-6 border-b pb-4">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3">
                                <Label className="light:text-gray-700 ">Method</Label>
                                <ApiMethodSelect
                                value={endpoint.method}
                                onChange={(val) => handleEndpointChange(index, 'method', val)}
                                />
                            </div>
                            <div className="col-span-9">
                                <Label className="light:text-gray-700 ">Endpoint Path</Label>
                                <Input
                                placeholder="/weather/{city}"
                                className="mt-2 light:bg-white bg-gray-800bg-gray-800"
                                value={endpoint.url}
                                onChange={(e) => handleEndpointChange(index, 'url', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="light:text-gray-700 ">Description</Label>
                            <Textarea
                                placeholder="What this endpoint does..."
                                className="mt-2 light:bg-white bg-gray-800bg-gray-800"
                                value={endpoint.description}
                                onChange={(e) => handleEndpointChange(index, 'description', e.target.value)}
                            />
                        </div>

                        {
                            formData.endpoints?.length !== undefined ? (
                                formData?.endpoints?.length > 1 && (
                                    <Button variant="destructive" onClick={() => removeEndpoint(index)}>
                                        Remove Endpoint
                                    </Button>
                                )
                            ) : null
                        }
                    </div>
                ))}

                <Button variant="outline" onClick={addEndpoint}>
                    + Add Another Endpoint
                </Button>
            </div>

            <div className="mt-8 flex justify-end">
                <Button
                className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSubmit}
                >
                    {type === 'publish' ? 'Publish' : 'Update'} API
                </Button>
            </div>
        </div>
  )
}

export default ApiForm;