import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  MethodType,
  ResponseInterface,
  ServerResponseInterface,
} from "../types/types";

const serverUrl = import.meta.env.SERVER_URL;

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

const request = async <T>(
  method: MethodType,
  path: string,
  data: any = null,
): Promise<ResponseInterface<T>> => {
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
