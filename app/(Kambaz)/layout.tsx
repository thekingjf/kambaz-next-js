import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
export default function KambazLayout(
 { children }:
 Readonly<{ children: ReactNode }>) {
 return (
   <table>
     <tbody>
       <tr>
         <td valign="top" width="200" className="d-none d-md-block">  <KambazNavigation /> </td>
         <td valign="top" width="100%"> {children}           </td>
       </tr>
     </tbody>
   </table>
);}
