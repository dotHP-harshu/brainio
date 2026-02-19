import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  UserInterFace,
  MethodType,
  ResponseInterface,
  ServerResponseInterface,
  PromptInterface,
  TestDataInterface,
  SubmitTestInterface,
} from "../types/types";

const serverUrl = import.meta.env.VITE_SERVER_URL;

console.log(serverUrl);

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

const request = async <T>(
  method: MethodType,
  path: string,
  data: any = null
): Promise<ResponseInterface<T>> => {
  console.log(path, method);
  try {
    const res: AxiosResponse<ServerResponseInterface<T>> = await api({
      method,
      url: path,
      data,
    });
    if (res.data.success === false) {
      return { data: null, error: res.data.message };
    }
    return { data: res.data.data, error: null };
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        error: error.response?.data?.message || error.message,
      };
    }
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message || "An error occurred on server.",
      };
    }
    return { data: null, error: "Something went wrong." };
  }
};

export const logoutApi = () => request("GET", "/auth/logout");
export const myDetailApi = () => request<UserInterFace>("GET", "/auth/me");
export const generateTestApi = (prompt: PromptInterface) =>
  request("POST", "/tests/generate", { prompt });
export const evaluateTestApi = (test: SubmitTestInterface) =>
  request("POST", "/tests/evaluate", { test });
