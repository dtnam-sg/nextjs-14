import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async () => {
  try {
    await connectToDB();
    const feedPosts = await Post.find().populate("creator likes").exec();
    return new Response(JSON.stringify(feedPosts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Feed posts", { status: 500 });
  }
};
