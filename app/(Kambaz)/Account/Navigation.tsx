"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";


export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer);
  const links = currentUser ? ["Profile"] :
    ["Signin", "Signup"];
  const pathname = usePathname();

 return (
   <div>
     <Link href="Signin"> Signin </Link> <br />
     <Link href="Signup"> Signup </Link> <br />
     <Link href="Profile"> Profile </Link> <br />
   </div>
);}
