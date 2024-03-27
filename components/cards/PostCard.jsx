import {
  Bookmark,
  BookmarkBorder,
  BorderColor,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Link from "next/link";
import React, { useState } from "react";

const PostCard = ({ post, creator, loggedInUser }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const clsIcon = { color: white, cursor: "pointer" };
  return (
    <div className='w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2'>
      <div className='flex justify-between'>
        <Link href={`/profile/${creator._id}`}>
          <div className='flex gap-3 items-center'>
            <Image
              src={creator.profilePhoto}
              alt='profile photo'
              width={50}
              height={50}
              className='rounded-lg'
            />
            <div className='flex flex-col gap-1'>
              <p className='text-small-semibold text-light-1'>
                {creator.firstName}
                {creator.lastName}
              </p>
              <p className='text-subtle-medium text-light-3'>
                @{creator.username}
              </p>
            </div>
          </div>
        </Link>
        {loggedInUser.id === creator.clerkId && (
          <Link href={`/edit-post/${post._id}`}>
            <BorderColor sx={clsIcon} />
          </Link>
        )}
      </div>
      <p className='text-body-normal text-light-1 max-sm:text-small-normal'>
        {post.caption}
      </p>

      <Image
        src={post.postPhoto}
        alt='post photo'
        width={200}
        height={150}
        className='rounded-lg w-full'
      />
      <p className='text-base-semibold text-purple-1 max-sm:text-small-normal'>
        {post.tag}
      </p>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          {!isLiked ? (
            <FavoriteBorder sx={clsIcon} />
          ) : (
            <Favorite sx={{ ...clsIcon, color: "red" }} />
          )}
          <p className='text-light-1'>{post.like.length}</p>
        </div>
        {loggedInUser.id !== creator.clerkId &&
          (isSaved ? (
            <Bookmark sx={{ ...clsIcon, color: "purple" }} />
          ) : (
            <BookmarkBorder sx={clsIcon} />
          ))}
      </div>
    </div>
  );
};

export default PostCard;
