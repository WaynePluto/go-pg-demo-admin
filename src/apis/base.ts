import { clearToken, getRefreshToken, getToken, setToken } from "@/utils/auth";
import { message } from "antd";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { PostAuthRefreshTokenRes } from "./authApi";

const setConfig = (config: InternalAxiosRequestConfig<any>) => {
  // 获取Authorization
  config.headers.Authorization = "Bearer " + getToken();
  return config;
};

const Request = {
  isRefreshing: false,
  requestPendingList: <any[]>[],
  responsPendingList: <any[]>[],
};

const instance = axios.create({
  baseURL: "/api/v1",
  timeout: 3000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    if (Request.isRefreshing) {
      return new Promise(resolve => {
        Request.requestPendingList.push(() => {
          resolve(setConfig(config));
        });
      });
    } else {
      return setConfig(config);
    }
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => response,
  error => {
    return new Promise(async (resolve, reject) => {
      if (error.response) {
        // 获取错误码
        const status = error.response.status;
        if (status === 401) {
          try {
            if (Request.isRefreshing) {
              Request.responsPendingList.push(async () => {
                const res = await instance(error.response.config);
                resolve(res);
              });
            } else {
              Request.isRefreshing = true;
              // 刷新token
              const res = await axios<PostAuthRefreshTokenRes>({
                url: `/auth/refresh-token`,
                method: "post",
                data: { refresh_token: getRefreshToken() },
              });
              if (res.status === 200 && res.data.data?.access_token) {
                setToken(res.data.data?.access_token);
                Request.isRefreshing = false;
                Request.responsPendingList.forEach(fn => fn());
                Request.responsPendingList = [];
                Request.requestPendingList.forEach(fn => fn());
                Request.requestPendingList = [];
                const curRes = await instance(error.response.config);
                resolve(curRes);
              } else {
                reject(error);
              }
            }
          } catch (error) {
            const e = error as AxiosError;
            if (e.response?.status === 401) {
              message.error("登录过期！", 1);
              setTimeout(() => {
                // token刷新失败，跳转登录页面
                clearToken();
                window.location.href = "/login";
              }, 1000);
            } else {
              reject(error);
            }
          }
        } else {
          reject(error);
        }
      } else {
        reject(error);
      }
    });
  },
);

export default instance;
