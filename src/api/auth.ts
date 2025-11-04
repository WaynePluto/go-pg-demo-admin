import { getRefreshToken, getToken, setToken } from "@/utils/auth";
import type { AuthApp } from "../hono-api-type/modules/auth";
import { hc } from "hono/client";
import { clearToken } from "@/utils/auth";

export const authClient = hc<AuthApp>("/api/auth");

let isRefreshing = false;
let requests: any[] = [];
export const customFetch = async (url, options): Promise<Response> => {
  const getOptions = () => ({
    body: options.body ? JSON.stringify(JSON.parse(options.body)) : undefined,
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    },
    method: options.method,
  });
  const res = await fetch(url, getOptions());
  const json = await res.json();
  const newResponse = new Response(JSON.stringify(json), res);

  if (json.code === 401) {
    // 是否刷新中
    if (isRefreshing) {
      return new Promise(resolve => {
        requests.push(async () => {
          const res = await fetch(url, getOptions());
          resolve(res);
        });
      });
    } else {
      isRefreshing = true;
      const authRes = await authClient.refresh.$post({ json: { refresh_token: getRefreshToken() } });
      const authJSON = await authRes.json();
      if (authJSON.data.token) {
        setToken(authJSON.data.token);
        // 刷新成功
        const secondRes = await fetch(url, getOptions());
        requests.forEach(el => {
          el();
        });
        requests = [];
        isRefreshing = false;
        return secondRes;
      } else {
        // token刷新失败，跳转登录页面
        clearToken();
        window.location.href = "/login";
        return newResponse;
      }
    }
  } else {
    return newResponse;
  }
};
