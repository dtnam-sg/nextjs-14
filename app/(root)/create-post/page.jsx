"use client";
import Posting from "@/components/form/Posting";
import Loader from "@/components/layout/Loader";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";

const CreatePost = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/users/${user?.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const postData = {
    creatorId: userData?._id,
    caption: "",
    tag: "",
    postPhoto: null,
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className='pt-6'>
      <Posting post={postData} handlePublish={() => {}} />
    </div>
  );
};

export default CreatePost;
