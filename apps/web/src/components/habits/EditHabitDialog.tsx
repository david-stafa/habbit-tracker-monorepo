import { Button } from '@habit-tracker/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@habit-tracker/ui/components/dialog'
import { PencilIcon } from '@habit-tracker/ui/icons'
import { useState } from 'react'
import { HabitForm } from './HabitForm'
import type { Habit } from '@habit-tracker/db/browser'

export function EditHabitDialog({
  habit,
}: {
  habit: Omit<Habit, 'createdAt' | 'updatedAt' | 'userId'>
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilIcon className="text-primary size-5" strokeWidth={1} />
        </Button>
      </DialogTrigger>
      {/* CONTENT */}
      <DialogContent className="min-w-fit">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
          <DialogDescription>Edit the habit details.</DialogDescription>
        </DialogHeader>
        {/* EDIT HABIT FORM */}
        <HabitForm onSuccess={() => setOpen(false)} habit={habit} />
      </DialogContent>
    </Dialog>
  )
}
