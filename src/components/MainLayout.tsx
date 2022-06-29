import { ReactChild } from "react";
import { ResetType } from "solarxr-protocol";
import { useLayout } from "../hooks/layout";
import { BVHButton } from "./BVHButton";
import { Navbar } from "./Navbar";
import { ResetButton } from "./ResetButton";
import { TopBar } from "./TopBar";


export function MainLayoutRoute({ children }: { children: ReactChild }) {

    const { layoutHeight, ref } = useLayout<HTMLDivElement>();
  
    return (
      <>
        <TopBar></TopBar>
        <div ref={ref} className='flex-grow' style={{ height: layoutHeight }}>
          <div className="flex h-full pb-4">
            <Navbar></Navbar>
            <div className="flex gap-3 mr-4 w-full">
              <div className="flex flex-grow gap-10 flex-col rounded-xl bg-background-40">
                {children}
              </div>
              <div className="flex flex-col px-4 w-[274px] gap-3 pt-5 rounded-xl overflow-y-auto bg-background-40">
                <div className='flex'>
                  <ResetButton type={ResetType.Quick}></ResetButton>
                </div>
                <div className='flex'>
                  <ResetButton type={ResetType.Full}></ResetButton>
                </div>
                <div className='flex'>
                  <BVHButton></BVHButton>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </>
    )
  }