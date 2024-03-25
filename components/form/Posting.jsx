"use client";
import React from "react";
import Image from "next/image";

import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Posting = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: post });

  const router = useRouter();

  const getImageValidate = () => {
    if (typeof watch("postPhoto") === "string") {
      return (
        <Image
          src={watch("postPhoto")}
          alt='post'
          width={250}
          height={200}
          className='object-cover rounded-lg'
        />
      );
    }

    return (
      <Image
        src={URL.createObjectURL(watch("postPhoto"))}
        alt='post'
        width={250}
        height={200}
        className='object-cover rounded-lg'
      />
    );
  };
  const handlePublish = async (data) => {
    try {
      const postForm = new FormData();
      postForm.append("creatorId", data.creatorId);
      postForm.append("caption", data.caption);
      postForm.append("tag", data.tag);
      postForm.append("postPhoto", data.postPhoto[0] || null);

      const response = await fetch(`/api/post/new`, {
        method: "POST",
        body: postForm,
      });

      if (response.ok) {
        router.push(`/profile/${data?.creatorId}`);
      }
    } catch (error) {
      console.log("🚀 ~ handlePublish ~ error:", error);
    }
  };
  return (
    <form
      className='flex flex-col gap-7 pb-24'
      onSubmit={handleSubmit(handlePublish)}>
      <label
        htmlFor='photo'
        className='flex gap-4 items-center text-light-1 cursor-pointer'>
        {watch("postPhoto") ? (
          getImageValidate()
        ) : (
          <AddPhotoAlternateOutlined
            sx={{ fontSize: "100px", color: "white" }}
          />
        )}

        <p>Upload a photo</p>
      </label>
      <input
        {...register("postPhoto", {
          validate: (value) => {
            if (
              typeof value === "null" ||
              (Array.isArray(value) && value?.length === 0) ||
              value?.length === "undefined"
            ) {
              return "A photo is required";
            }
            return true;
          },
        })}
        type='file'
        name='photo'
        id='photo'
        style={{ display: "none" }}
      />
      {errors?.postPhoto && (
        <p className='text-red-500'>{errors?.postPhoto?.message}</p>
      )}
      <div>
        <label htmlFor='caption'>Caption</label>
        <textarea
          {...register("caption", {
            required: "Caption is required",
            validate: (value) => {
              if (value.length < 3) {
                return "Caption must be at least 3 characters long.";
              }
            },
          })}
          type='text'
          id='caption'
          rows='3'
          placeholder="What's on your mind"
          className='w-full input'
        />
        {errors?.caption && (
          <p className='text-red-500'>{errors?.caption?.message}</p>
        )}
      </div>
      <div>
        <label htmlFor='tag'>Tag</label>
        <input
          {...register("tag", {
            required: "Tag is required",
          })}
          type='text'
          id='tag'
          placeholder='#tag'
          className='w-full input'
        />
        {errors?.tag && <p className='text-red-500'>{errors?.tag?.message}</p>}
      </div>
      <button
        type='submit'
        className='py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1'>
        Publish
      </button>
    </form>
  );
};

export default Posting;
