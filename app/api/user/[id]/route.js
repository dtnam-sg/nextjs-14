import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: params.id })
      .populate("post savedPosts linkedPosts follower following")
      .exec();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to get User", { status: 500 });
  }
};
