"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (err: any) {
      console.error("Signup failed:", err.response?.status, err.response?.data || err);
      alert(err.response?.data?.message ?? "Signup failed");
    }
  };

  return (
    <div className="wd-signup-screen">
     <h1>Sign up</h1>
     <FormControl value={user.username}
       onChange={(e) => setUser({ ...user,
         username: e.target.value })} placeholder="username" />
     <FormControl placeholder="password" value={user.password} type="password"
       onChange={(e) => setUser({ ...user,
         password: e.target.value })} />
      <Button onClick={signup} id="wd-signin-btn"
               className="w-100" > Sign up </Button><br />
     <Link href="/Account/Signin">Sign in</Link>
    </div>);
  }
