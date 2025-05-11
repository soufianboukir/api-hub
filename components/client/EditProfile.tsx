'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { toast } from "sonner"
import { updateUserProfileInfo } from "@/services/users"
import { useSession } from "next-auth/react"


export type ProfileInfo = {
    name: string,
    email: string,
    username: string,
    bio?: string,
    password?: string,
    newPassword?: string,
    retypePassword?: string
}

export function EditProfile({profileInfo, setProfileInfo}:
    {profileInfo: ProfileInfo, setProfileInfo:Dispatch<SetStateAction<ProfileInfo | null>>}) {
    
    const [form,setForm] = useState(profileInfo);
    const { update } = useSession();

    const handleChange = (e:ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) =>{
        setForm({ ...form, [e.target.id]: e.target.value });
    }

    const handleSubmit = async ()=>{
        const response = updateUserProfileInfo(form);

        toast.promise(response, {
            loading: 'Uploading...',
            success: async (res) => {
                setProfileInfo(form)
                await update({
                    name: form.name,
                    bio: form.bio,
                    email: form.email,
                    username: form.username,
                });
                return res.data.message;
            },
            error: (err) => err?.response?.data?.message || 'Upload failed',
        });
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="bg-blue-600 cursor-pointer hover:bg-blue-500">
                Update info
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value={form.name} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" value={form.username} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input id="email" value={form.email} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="bio" className="text-right">
                        Bio
                    </Label>
                    <Textarea id="bio" value={form.bio ?? "Your bio here" } onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                        Password
                    </Label>
                    <Input id="password" type="password" value={form.password} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newPassword" className="text-right">
                        New Password
                    </Label>
                    <Input id="newPassword" type="password" value={form.newPassword} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="retypePassword" className="text-right">
                        Retype Password
                    </Label>
                    <Input id="retypePassword" type="password" value={form.retypePassword} onChange={handleChange} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button className="bg-blue-600 cursor-pointer hover:bg-blue-500" type="submit" onClick={handleSubmit}>
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
