import { CircleCheckIcon, CircleIcon } from '@habbit-tracker/ui/icons'
import { TypographyP } from '@habbit-tracker/ui/components/typography'

interface iHabbit {
  name: string
  description?: string
  completed: boolean
  onClick: () => void
}

export const SingleHabbitUi = ({
  name,
  description,
  completed,
  onClick,
}: iHabbit) => {
  const variant = completed
    ? {
        style: 'border-amber-700 bg-amber-700 text-amber-100',
        textColor: 'text-amber-100',
        icon: (
          <CircleCheckIcon className="animate-pop-check size-7 text-amber-100" />
        ),
      }
    : {
        style: 'border-amber-700 bg-amber-50',
        textColor: 'text-amber-700',
        icon: <CircleIcon className="size-7 text-amber-700" />,
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
