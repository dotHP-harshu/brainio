import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  UserInterFace,
  MethodType,
  ResponseInterface,
  ServerResponseInterface,
  PromptInterface,
  SubmitTestInterface,
} from "../types/types";

const serverUrl = import.meta.env.VITE_SERVER_URL;

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

// requests
export const logoutApi = () => request("GET", "/auth/logout");
export const changePhotoApi = (url: string) =>
  request("POST", "/auth/changePhoto", { photoUrl: url });
export const myDetailApi = () => request<UserInterFace>("GET", "/auth/me");
export const deleteAccountApi = () => request("GET", "/auth/delete");
export const generateTestApi = (prompt: PromptInterface) =>
  request("POST", "/tests/generate", { prompt });
export const evaluateTestApi = (test: SubmitTestInterface) =>
  request("POST", "/tests/evaluate", { test });

export const setTestApi = (
  userId: string,
  title: string,
  result: string,
  resultLabel: string,
  correctAnswers: number,
  totalQuestions: number,
  difficulty: string,
  timeSpent: number,
  accuracyRate: number,
  aiInsight: string,
) =>
  request("POST", `/history/set/test/${userId}`, {
    title,
    result,
    resultLabel,
    correctAnswers,
    totalQuestions,
    difficulty,
    timeSpent,
    accuracyRate,
    aiInsight,
  });

export const getTestsApi = (limit: number, page: number, search: string = "") =>
  request(
    "GET",
    `/history/get/tests/?limit=${limit}&page=${page}&search=${search}`,
  );

export const getHistoryStateApi = (userId: string) =>
  request("GET", `/history/get/state/${userId}`);
