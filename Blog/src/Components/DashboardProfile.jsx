import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-bold text-4xl tracking-widest">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer">
          <img
            src={currentUser.profilePicture}
            alt=""
            className="rounded-full w-full h-full border-4 border-orange-500"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
        />
        <Button type="submit" gradientDuoTone='purpleToBlue' outline> Update</Button>
      </form>
      <div className="text-amber-500 flex justify-between mt-2">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
