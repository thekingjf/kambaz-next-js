"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button, FormControl } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import * as client from "../client";


export default function Profile() {
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [profile, setProfile] = useState<any>(currentUser);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser, router]);

  if (!profile) {
    return null;
  }

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      <div>
        <FormControl
          id="wd-username"
          className="mb-2"
          defaultValue={profile.username}
          placeholder="usernam"
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
        />
        <FormControl
          id="wd-password"
          className="mb-2"
          defaultValue={profile.password}
          placeholder="password"
          onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })
          }
        />
        <FormControl
          id="wd-firstname"
          className="mb-2"
          defaultValue={profile.firstName}
          placeholder="first name"
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />
        <FormControl
          id="wd-lastname"
          className="mb-2"
          defaultValue={profile.lastName}
          placeholder="last name"
          onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })
          }
        />
        <FormControl
          id="wd-dob"
          className="mb-2"
          type="date"
          defaultValue={profile.dob}
          placeholder="Date of Birth"
          onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })
          }
        />
        <FormControl
          id="wd-email"
          className="mb-2"
          defaultValue={profile.email}
          placeholder="Email"
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
        />
        <select
          className="form-control mb-2"
          id="wd-role"
          defaultValue={profile.role}
          onChange={(e) =>
            setProfile({ ...profile, role: e.target.value })
          }
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>

        <Button variant="danger" onClick={signout}>
          Sign out
        </Button>
        <Button variant="primary" onClick={updateProfile}>
          Save
        </Button> 
      </div>
    </div>
  );
}
