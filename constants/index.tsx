import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SiKakaotalk } from "react-icons/si";
import { SiNaver } from "react-icons/si";

export const travelOptions = [
  { type: "driving-traffic" },
  { type: "driving" },
  { type: "walking" },
  { type: "cycling" }
]

export const sidebarLinks = [
  {
    title: "Territory",
    submenu: [
      { title: "시군구 - KA POS", link: "/" },
      { title: "시군구 - 상권정보", link: "/" },
      { title: "지점 관리 지역", link: "/" }
    ]
  },
  {
    title: "My Data",
    submenu: [
      { title: "사진 업로드", link: "/" },
      { title: "관리 상권 조회", link: "/" },
      { title: "관리 상권 업로드", link: "/list" }
    ]
  }
]

export const socialLogin = [
  { type: "google", icon: <FcGoogle size={20} /> },
  { type: "github", icon: <FaGithub size={20} /> },
  { type: "kakao", icon: <SiKakaotalk size={20} /> },
  { type: "naver", icon: <SiNaver size={20} /> },
]