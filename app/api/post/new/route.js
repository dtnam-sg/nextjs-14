import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const POST = async (req, res) => {
  const path = require("path");
  const currentWorkingDirectory = process.cwd();
  try {
    await connectToDB();
    const data = await req.formData();
    let postPhoto = data.get("postPhoto");

    const bytes = await postPhoto.arrayBuffer();

    const buffer = Buffer.from(bytes);
    const postPhotoPath = path.join(
      currentWorkingDirectory,
      "public",
      "uploads",
      postPhoto.name,
    );
    await writeFile(postPhotoPath, buffer);

    postPhoto = `/uploads/${postPhoto.name}`;

    const newPost = await Post.create({
      creator: data.get("creator"),
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto: postPhoto,
    });
    await newPost.save();

    await User.findByIdAndUpdate(
      data.get("creatorId"),
      { $push: { posts: newPost._id } },
      { new: true, useFindAndModify: false },
    );

    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return new Response("Failled to create a new post ", { status: 500 });
  }
};
