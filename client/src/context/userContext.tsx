import { createContext, useState } from "react";
import type { UserContextType, UserInterFace } from "../types/types";

export const UserContext = createContext<UserContextType | null>(null);

const MOCK_USER: UserInterFace = {
  _id: "dev-mock-user-id",
  createdAt: new Date().toISOString(),
  email: "dev@brainio.local",
  userName: "Dev User",
  photos: "",
};

export default function UserProvider({ children }: React.PropsWithChildren) {
  const [user] = useState<UserInterFace>(MOCK_USER);

  return (
    <UserContext.Provider
      value={{ user, loading: false, refresh: async () => {} }}
    >
      {children}
    </UserContext.Provider>
  );
}
