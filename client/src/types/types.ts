export interface UserInterFace {
  email: string;
  userName: string;
  photos: string;
}

export interface ResponseInterface<T> {
  data: T | null;
  error: string | null;
}

export type MethodType = "GET" | "POST";

export interface ServerResponseInterface<T> {
  message: string;
  status: number;
  success: boolean;
  data: T | null;
}

export interface UserContextType {
  user: UserInterFace | null;
  loading:boolean
  refresh: () => Promise<void>;
}

export interface TrendingTopicInterface{
  name:string;
  questions:number,
  testType: "Q&A" | "MCQ"
  difficulty: "Hard" | "Easy" | "Medium"
}