import {
  Home,
  AddPhotoAlternateOutlined,
  GroupOutlined,
  FavoriteBorder,
} from "@mui/icons-material";
export const sidebarLinks = [
  {
    icon: <Home sx={{ color: "white", fontSize: "26px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: (
      <AddPhotoAlternateOutlined sx={{ color: "white", fontSize: "26px" }} />
    ),
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <GroupOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/people",
    label: "People",
  },
  {
    icon: <FavoriteBorder sx={{ color: "white", fontSize: "26px" }} />,
    route: "/edit-profile",
    label: "Edit Profile",
  },
];

export const pageTitles = [
  { url: "/", title: "Feed" },
  { url: "/edit-profile", title: "Edit Profile" },
  { url: "/create-post", title: "Create Post" },
  { url: "/edit-post", title: "Edit Post" },
  { url: "/search", title: "Seach" },
];

export const mockUser = {
  _id: { $oid: "6603d6734509fc3944f49d01" },
  clerkId: "user_2eGOdrZJVZYqWEAj6WzYOSicfeB",
  __v: { $numberInt: "0" },
  createdAt: { $date: { $numberLong: "1711527538940" } },
  email: "shushibapngo@gmail.com",
  firstName: "Nam",
  followers: [],
  following: [],
  lastName: "Đo àn",
  likedPosts: [],
  posts: [],
  profilePhoto:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZUdPZHFUWlRTOGdqVmRqak9uUXc0RGlqdUoifQ",
  savedPosts: [],
  username: "somethingwentwrong",
};
