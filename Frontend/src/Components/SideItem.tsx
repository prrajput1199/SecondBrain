import { ReactElement } from 'react'

interface ItemType {
    text: string,
    Icon?: ReactElement,
    onClick?: () => void,
    name:string,
    value:string
}

const SideItem = (props: ItemType) => {
    return (
        <>
            <div className="flex items-center gap-2 hover:bg-gray-200 p-2 w-48 cursor-pointer" onClick={props.onClick} data-name={props.name} data-value={props.value}>
                <div className="flex text-gray-200">
                    {props.Icon}
                </div>
                <div className="p-2">
                    {props.text}
                </div>
            </div>
        </>
    )
}

export default SideItem