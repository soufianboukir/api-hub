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
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { toast } from "sonner"
import { reviewApi } from "@/services/apis"

export function ReviewApi({apiId}: {apiId: string}) {

  const [review,setReview] = useState<string>('');

  const handleSubmit = () =>{
    if(!review.trim() || review.length > 500){
      toast.error('Submission failed',{
        description: !review.trim() ? "Review is required" : 'Max charachters is 500'
      })
      return
    }
    toast.promise(reviewApi({apiId,review}),{
      loading: 'Uploading...',
      success: (res) => res.data.message,
      error: (err) => err.response.data.message
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[100%]">Review this API</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Review api</DialogTitle>
          <DialogDescription>
            Provide your feedback or suggestions regarding the APIs functionality, performance, or documentation. Your input helps us improve the developer experience.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Textarea rows={4}
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
            placeholder="max: 500chars"/>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
            <Button type="button" variant="secondary" onClick={handleSubmit}>
              Post
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
