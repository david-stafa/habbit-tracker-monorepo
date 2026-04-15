import { CircleCheckIcon, CircleIcon } from '@habit-tracker/ui/icons'
import { TypographyP } from '@habit-tracker/ui/components/typography'

interface iHabit {
  name: string
  description: string | null
  completed: boolean
  onClick: () => void
}

export const SingleHabitUi = ({
  name,
  description,
  completed,
  onClick,
}: iHabit) => {
  const variant = completed
    ? {
        style: 'border-primary bg-primary text-primary-foreground',
        textColor: 'text-primary-foreground',
        icon: (
          <CircleCheckIcon className="animate-pop-check size-7 text-primary-foreground" />
        ),
      }
    : {
        style: 'border-primary bg-primary/10',
        textColor: 'text-primary',
        icon: <CircleIcon className="size-7 text-primary" />,
      }
  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={onClick}
        className={`flex h-14 w-full min-w-40 cursor-pointer items-center justify-between gap-4 rounded-xl border p-2 pl-3 transition-colors duration-300 ${variant.style}`}
      >
        <div className="flex flex-col">
          <TypographyP className={`${variant.textColor} leading-tight font-medium`}>
            {name}
          </TypographyP>
          {description && (
            <TypographyP className={`${variant.textColor} text-sm leading-tight`}>
              {description}
            </TypographyP>
          )}
        </div>
        {variant.icon}
      </div>
    </div>
  )
}
