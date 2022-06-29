import { ReactChild } from "react";
import { NavLink } from "react-router-dom";
import { useLayout } from "../../hooks/layout";
import { CloseIcon } from "../commons/icon/CloseIcon";
import { Navbar } from "../Navbar";
import { TopBar } from "../TopBar";
import { SettingsSidebar } from "./SettingsSidebar";

export function SettingsLayoutRoute({ children }: { children: ReactChild }) {

    const { layoutHeight, ref } = useLayout<HTMLDivElement>();
  
    return (
      <>
        <TopBar></TopBar>
        <div ref={ref} className='flex-grow' style={{ height: layoutHeight }}>
          <div className="flex h-full pb-4">
            <Navbar></Navbar>
            <div className="bg-background-40 flex h-full w-full rounded-xl mr-4">
              <SettingsSidebar></SettingsSidebar>
              <div className="flex flex-grow gap-10 flex-col overflow-hidden ">
                  <div className="relative overflow-y-auto overflow-x-hidden">
                      {children}
                      <div className="absolute top-0 right-0 p-5">
                          <NavLink to="/" className="flex gap-5 group cursor-pointer">
                            <div className="flex rounded-full bg-purple-gray-600  fill-purple-gray-100 group-hover:fill-purple-gray-200"><CloseIcon size={50}></CloseIcon></div>
                          </NavLink>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }