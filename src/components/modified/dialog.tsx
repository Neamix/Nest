import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import React from "react"

const AlertDialog = ({trigger,title,children,cancel = false,}:{
    trigger: React.ReactNode,
    children?: React.ReactNode,
    title: string,
    cancel?: boolean,
}) => {
  return (
    <Dialog>
        <DialogTrigger>
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {children}
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default AlertDialog
