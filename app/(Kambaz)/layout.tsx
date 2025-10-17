import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function KambazLayout(
 { children }:
 Readonly<{ children: ReactNode }>) {
 return (
   <div id="wd-kambaz">
     <div className="d-flex">
       <div>
         <KambazNavigation />
       </div>
       <div className="wd-main-content-offset
            p-3 flex-fill">{children}</div>
     </div>
   </div>);}
