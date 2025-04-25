import { ReactElement } from 'react'

interface ButtonStyle {
    variant: 'primary' | 'secondary';
    size: 'sm' | 'md' | 'lg';
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    Fullwidth?: boolean;
    Loading?: boolean
}


const variantStyle = {
    "primary": "bg-purple-500 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

const sizeStyles = {
    "sm": "px-2 py-1 text-sm",
    "md": "px-4 py-2 text-md",
    "lg": "px-8 py-4 text-xl"
}

const defaultStyle = "rounded-md p-4 flex items-center gap-2 cursor-pointer flex justify-center";

const Button = (props: ButtonStyle) => {
    return (
        <>
            <button className={`${variantStyle[props.variant]} ${sizeStyles[props.size]} ${defaultStyle} ${props.Fullwidth ? "w-full" : ""} ${props.Loading ? "opacity-30": "opacity-100"} `} onClick={props.onClick} disabled={props.Loading}>{props.startIcon} {props.text}</button>
        </>

    )
}

export default Button