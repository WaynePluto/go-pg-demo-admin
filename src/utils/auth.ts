export const enum SesstionKey {
  Token_Key = "token",
  Refresh_Key = "token_refresh",
  User_ID_Key = "user_id",
}

const isLogin = () => {
  return !!sessionStorage.getItem(SesstionKey.Token_Key);
};

const getToken = () => {
  return sessionStorage.getItem(SesstionKey.Token_Key) ?? "";
};

const setToken = (token: string) => {
  sessionStorage.setItem(SesstionKey.Token_Key, token);
};

const getRefreshToken = () => {
  return sessionStorage.getItem(SesstionKey.Refresh_Key) ?? "";
};

const setRefreshToken = (token: string) => {
  sessionStorage.setItem(SesstionKey.Refresh_Key, token);
};

const clearToken = () => {
  sessionStorage.removeItem(SesstionKey.Token_Key);
  sessionStorage.removeItem(SesstionKey.Refresh_Key);
};

export { isLogin, getToken, setToken, clearToken, getRefreshToken, setRefreshToken };
