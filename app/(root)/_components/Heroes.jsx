import { FileIcon, ImageIcon, ListTree, Palette } from "lucide-react";
import Image from "next/image";
import { Card } from "./card";

const Heroes = () => {
    return (
        <div className="h-full">
            <div className="h-28 bg-neutral-200 dark:bg-neutral-800 ">
                <div className="h-full bg-white dark:bg-neutral-900 rounded-bl-[8rem]"/>
            </div>
            <div className="bg-white dark:bg-neutral-900 h-full">
                <div className="bg-neutral-200 dark:bg-neutral-800 flex flex-col h-full rounded-tr-[8rem]">
                    <div className="flex justify-center md:justify-around flex-wrap items-center my-10 px-5 gap-y-12">
                        <div className="w-96 flex flex-col">
                            <Palette className="h-10 w-10 dark:text-white mt-4"/>
                            <h2 className="text-2xl md:text-4xl font-bold lg:font-extrabold dark:text-white mt-4">
                                Write and communicate any idea, create any page
                            </h2>
                            <p className="text-zinc-700 dark:text-zinc-200 mt-8">
                                Create and manage documents with ease with our One Document, the all-in-one workspace for document creation. 
                            </p>
                        </div>
                        <Image
                            height={500}
                            width={500}
                            alt="Image"
                            src="/images/typo.png"
                        />
                    </div>
                    <h2 className="text-center mt-20 mb-10 text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-500">Go way beyond text</h2>
                    <div className="flex justify-center items-center flex-wrap px-4 gap-6 mb-16">
                        <Card
                            Icon = {ImageIcon}
                            title = "Images"
                            desciption = "Embed directly from browser or upload your own" 
                        />
                        <Card
                            Icon = {ListTree}
                            title = "Table of contents"
                            desciption = "Click to jump to a section. Updates automatically." 
                        />
                        <Card
                            Icon = {FileIcon}
                            title = "Nested documnets"
                            desciption = "Create nested, infinite documents to make your project more organized."
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Heroes;