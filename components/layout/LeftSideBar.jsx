"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { UserButton, useUser } from "@clerk/nextjs";
import Menu from "./Menu";
import Loader from "./Loader";
const LeftSideBar = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user?.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className='h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar'>
      <Link href='/'>
        <Image
          src={userData?.profilePhoto}
          alt='logo'
          width={200}
          height={200}
        />
      </Link>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2 items-center text-light-1'>
          <Link href='/'>
            <Image
              src={userData?.profilePhoto}
              alt='profile-photo'
              width={50}
              height={50}
              className='rounded-full'
            />
          </Link>
          <p className='text-small-bold'>
            {userData?.firstName} {userData?.lastName}
          </p>
        </div>
        <div className='flex text-light-1 justify-between'>
          <div className='flex flex-col items-center'>
            <p className='text-base-bold'>{userData?.post?.length}</p>
            <p className='text-tiny-medium'>Posts</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-base-bold'>{userData?.followers?.length}</p>
            <p className='text-tiny-medium'>Follower</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-base-bold'>{userData?.following?.length}</p>
            <p className='text-tiny-medium'>Following</p>
          </div>
        </div>
        <hr />
        <Menu />
        <hr />
        <div className='flex gap-4 items-center'>
          <UserButton />
          <p className='text-light-1 text-body-bold'>Manage Account</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
