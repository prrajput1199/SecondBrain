import { Delete, Twitter, YouTube } from './Icons/Icons'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useProduct } from '../Context/useProductContext'


interface CardProps {
    type?: "Twitter" | "YouTube" | "Random Thoughts" | "Random Links",
    link?: string,
    title: string
    notes: string,
    _id: string
}

const Card = (props: CardProps) => {
    const { type, link, title, notes, _id } = props;
    let embedUrl: string = ``;

    // @ts-ignore
    const { RefetchDataFun } = useProduct()

    if (type === "YouTube" && link) {
        const getVideoId = (url: string) => {
            const urlObj = new URL(url);
            return urlObj.searchParams.get("v");
        };

        const videoId = getVideoId(link);
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    async function DeleteFun() {
        await axios.delete(`${BACKEND_URL}/content`, {
            data: { contentID: _id },
            headers: {
                token: localStorage.getItem("Token")
            }
        })

        alert("Deleted");
        RefetchDataFun()
    }

    return (
        <>
            <div className='p-4 bg-white rounded-md border-gray-200 border-2 max-h-96 overflow-y-scroll shadow-xl flex-1 min-w-[275px] max-w-[375px]' style={{ scrollbarWidth: "none" }}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="text-gray-500 pr-2">
                            {type === "YouTube" ? (
                                <YouTube IconSize="md" />
                            ) : type === "Twitter" ? (
                                <Twitter IconSize="md" />
                            ) : null}
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500 hover:cursor-pointer" onClick={DeleteFun}>
                            <Delete IconSize="md" />
                        </div>
                    </div>
                </div>
                <div className='mt-2 mb-2 break-words'>
                    {notes}
                </div>
                <div className="overflow-x-hidden text-wrap break-words">
                    {link && <div className='mb-2'> <a className='text-blue-800 underline' href={link} target="_blank" rel="noopener noreferrer">{link}</a></div>}
                    {type === "YouTube" && <iframe className='w-full' src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {type === "Twitter" && <blockquote className="twitter-tweet">
                        <a href={link?.replace("x.com", "twitter.com")}></a>
                    </blockquote>}

                </div>
            </div>
        </>
    )
}

export default Card;