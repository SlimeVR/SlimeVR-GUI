import classNames from "classnames";
import React, { ReactChild } from "react";

export function BigButton({ text, icon, disabled, onClick, ...props }: { text: string, icon: ReactChild } & React.AllHTMLAttributes<HTMLButtonElement>) {
    return (
        <button disabled={disabled} onClick={onClick} {...props} type="button" className={classNames("flex w-full justify-center rounded-lg py-5 gap-5 cursor-pointer items-center bg-background-60 hover:bg-background-50", { ' hover:bg-purple-gray-300 bg-purple-gray-300 cursor-not-allowed': disabled}, props.className)}>
            <div className="flex justify-around">{icon}</div>
            <div className="flex justify-around text-default">{text}</div>
        </button>
    )
}