"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";


export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any;
  const pathname = usePathname() ?? "";
  return (
    <Nav variant="pills">
      {currentUser && currentUser.role === "ADMIN" && (
        <NavLink as={Link} href={`/Account/Users`}  active={pathname.endsWith('Users')}> Users </NavLink> )}
    </Nav>
 );}
 
