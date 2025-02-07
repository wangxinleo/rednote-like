import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";
import { userLogin } from "@/api/user";
import { store } from "@/store";

interface LoginData {
  username: string;
  password: string;
}

interface UserInfo {
  userId: string;
  username: string;
  nickname: string;
  avatar: string;
  description: string;
  location: string;
  ipLocation: string;
  tags: string[];
  stats: {
    following: number;
    followers: number;
    likes: number;
  };
}

// 使用setup模式定义
export const userStore = defineStore("userStore", () => {
  const token = ref(storage.get("token") || "");
  const userInfo = ref<UserInfo | null>(storage.get("userInfo") || null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    storage.set("token", newToken);
  };

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info;
    storage.set("userInfo", info);
  };

  const getToken = () => {
    return token.value;
  };

  const getUserInfo = () => {
    return userInfo.value;
  };

  const login = (loginData: LoginData) => {
    return new Promise<void>((resolve, reject) => {
      userLogin(loginData)
        .then((res) => {
          setToken(res.data.token);
          setUserInfo(res.data.userInfo);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return { token, userInfo, setToken, setUserInfo, getToken, getUserInfo, login };
});

export function useUserStore() {
  return userStore(store);
}
