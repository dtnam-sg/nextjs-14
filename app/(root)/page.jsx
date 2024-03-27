"use client";
import PostCard from "@/components/cards/PostCard";
import Loader from "@/components/layout/Loader";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const Home = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(trueu);
  const [feedPost, setFeedPost] = useState([]);
  const getFeedPost = async () => {
    const response = await fetch(`/api/posts/${getFeedPost()}`);
    const data = await response.json();
    setFeedPost(data);
    setLoading(false);
  };

  useEffect(() => {
    getFeedPost();
  }, [user]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className='flex flex-col gap-10'>
      {feedPost.map((post) => (
        <PostCard key={post?.id} post={post} creator={post.creator} />
      ))}
    </div>
  );
};

export default Home;
