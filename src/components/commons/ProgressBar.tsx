import classNames from "classnames";


export function ProgressBar({ progress, separations = 3, height = 10 }: { progress: number, separations?: number, height?: number }) {

    return <div className="flex flex-col w-full" >
        <div className="relative">
            {/* <div className="flex flex-row gap-5">
                <div className={classNames("bg-transparent flex flex-grow")} style={{ height: `${height}px`}}></div>
                <div className={classNames("bg-transparent flex flex-grow")} style={{ height: `${height}px`}}></div>
                <div className={classNames("bg-transparent flex flex-grow")} style={{ height: `${height}px`}}></div>
            </div> */}
            <div className={classNames("bg-background-50 rounded-lg overflow-hidden top-0 absolute")} style={{ width: `100%`, height: `${height}px`}}></div>
            <div className={classNames("bg-accent-background-20  rounded-lg overflow-hidden absolute top-0", { 'transition-all': progress > 0})} style={{ width: `${progress * 100}%`, height: `${height}px`}}></div>
        </div>
        {/* <div className="flex flex-row overflow-hidden  gap-5" style={{marginTop: `${-height}px`}}>
            <div className={classNames("bg-transparent flex flex-grow")} style={{ height: `${height}px`}}></div>
            <div className={classNames("bg-transparent flex flex-grow")} style={{ height: `${height}px`}}></div>
            <div className={classNames("bg-transparent flex flex-grow")} style={{ height: `${height}px`}}></div>
        </div> */}
    </div>
}