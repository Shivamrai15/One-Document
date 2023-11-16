

export const Card = ({
    Icon,
    title,
    desciption
}) => {
    return (
        <div className="h-56 w-56 bg-white dark:bg-neutral-950/50 rounded-lg p-4 flex flex-col items-center gap-y-4 shadow-[0_0_30px_#95c0e8]  dark:shadow-[0_0_30px_#263747]">
            <Icon className = "h-10 w-10 text-orange-500 mt-4"/>
            <h3 className="text-left w-full dark:text-white text-lg font-semibold">
                {title}
            </h3>
            <p className="dark:text-white text-sm">{desciption}</p>
        </div>
    )
}
