

export const Card = ({
    Icon,
    title,
    desciption
}) => {
    return (
        <div className="h-56 w-72 bg-white dark:bg-neutral-950/50 rounded-lg p-4 flex flex-col gap-y-4">
            <Icon className = "h-10 w-10 text-orange-500 mt-4"/>
            <h3 className="text-left w-full dark:text-white text-lg md:text-2xl font-semibold">
                {title}
            </h3>
            <p className="dark:text-zinc-300 text-zinc-600 text-sm md:text-base">{desciption}</p>
        </div>
    )
}
