import React from "react";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signin-screen">
      <h1>Profile</h1>
      <FormControl id="wd-username" placeholder="alice"
                   className="mb-2" /><br />
      <FormControl id="wd-password" placeholder="123" 
                   type="password" className="mb-2" /><br />
      <FormControl id="wd-FirstName" placeholder="Alice" 
                   type="password" className="mb-2" /><br />
      <FormControl id="wd-LastName" placeholder="Wonderland" 
                   type="password" className="mb-2" /><br />
      <FormControl id="wd-Date" placeholder="mm/dd/yyyy" 
                   type="date" className="mb-2" /><br />
      <FormControl id="wd-Email" placeholder="alice@wonderland.com" 
                   type="password" className="mb-2" /><br />
      <FormControl id="wd-User" placeholder="user" 
                   type="password" className="mb-2" /><br />
      <Link id="wd-signin-btn" href="/Account/Signin"
            className="btn btn-danger w-100 mb-2">
            Sign Out </Link><br />
    </div>
);}
