import { Button } from '@habbit-tracker/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@habbit-tracker/ui/components/dialog'
import { PlusIcon } from '@habbit-tracker/ui/icons'
import { useState } from 'react'
import { NewHabbitForm } from './NewHabbitForm'

export function NewHabbitDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add New Habbit
        </Button>
      </DialogTrigger>
      {/* CONTENT */}
      <DialogContent className="sm:max-w-[425px]">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle>Add New Habbit</DialogTitle>
          <DialogDescription>
            Add a new habbit to your tracker.
          </DialogDescription>
        </DialogHeader>
        {/* NEW HABBIT FORM */}
        <NewHabbitForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
