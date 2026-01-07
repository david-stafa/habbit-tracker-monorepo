import { Button } from '@habbit-tracker/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@habbit-tracker/ui/components/dialog'
import { Input } from '@habbit-tracker/ui/components/input'
import { Label } from '@habbit-tracker/ui/components/label'
import { PlusIcon } from '@habbit-tracker/ui/icons'

export function NewHabbitDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add New Habbit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habbit</DialogTitle>
          <DialogDescription>
            Add a new habbit to your tracker.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Habbit Name</Label>
            <Input id="name-1" name="name" placeholder="e.g. Read 10 pages" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Description</Label>
            <Input
              id="username-1"
              name="username"
              placeholder="e.g. Read 10 pages of a book"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Description</Label>
            <Input
              id="username-1"
              name="username"
              placeholder="e.g. Read 10 pages of a book"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
