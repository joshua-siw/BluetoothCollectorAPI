import axios, { AxiosResponse } from "axios";

import { handleItem, setThreshold } from "./local-storage";
import { AuthRequest, LogoutRequest, SignupRequest } from "./interfaces";
import {
  API_URL,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY,
  TOKEN_THRESHOLD_KEY,
} from "./constants";

export const http = axios.create({
  baseURL: API_URL,
});

export const post = (
  endpoint: string,
  data?: unknown
): Promise<AxiosResponse> =>
  new Promise((resolve, reject) =>
    http
      .post(endpoint, data)
      .then(resolve)
      .catch((e) => reject(e.response.data))
  );

export const get = (endpoint: string): Promise<AxiosResponse> =>
  new Promise((resolve, reject) =>
    http
      .get(endpoint)
      .then(resolve)
      .catch((e) => reject(e.response.data))
  );

export const patch = <T>(endpoint: string, data: T): Promise<AxiosResponse> =>
  new Promise((resolve, reject) =>
    http
      .patch(endpoint, data)
      .then(resolve)
      .catch((e) => reject(e.response.data))
  );

export const login = (data: AuthRequest): Promise<AxiosResponse> =>
  post("Account/Authenticate", data);

export const logout = (data: LogoutRequest): Promise<AxiosResponse> =>
  post("Account/logout", data);

export const passwordReset = (
  data: Partial<AuthRequest>
): Promise<AxiosResponse> => post("Account/changePassword", data);

export const signup = (data: SignupRequest): Promise<AxiosResponse> =>
  post("Account/Start", data);

http.interceptors.request.use((config) => {
  console.log("first token storage: ", localStorage.getItem(TOKEN_KEY));
  if (config.headers) {
    config.headers["Authorization"] =
      "Bearer " + localStorage.getItem(TOKEN_KEY) || "";
  }

  return config;
}, Promise.reject);
let isRefreshing = false;

// http.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

//     if (!refreshToken) {
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       !originalRequest._retry &&
//       !isRefreshing
//     ) {
//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await get("Account/RefreshToken");

//         if (res.data) {
//           const { tokenThreshold, jwToken } = res.data;

//           handleItem(TOKEN_KEY, jwToken);
//           handleItem(TOKEN_THRESHOLD_KEY, setThreshold(tokenThreshold));

//           originalRequest.headers["Authorization"] = "Bearer " + jwToken;
//           isRefreshing = false;

//           return http(originalRequest);
//         }
//       } catch (refreshError) {
//         isRefreshing = false;
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
