import { createContext, useEffect, useState } from "react";
import type { UserContextType, UserInterFace } from "../types/types";
import { myDetailApi } from "../service/serverApi";

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<UserInterFace | null>(null);
  const [loading, setLoading] = useState(true);

  const getMyDetail = async () => {
    setLoading(true);
    const { data, error } = await myDetailApi();

    if (error) {
      setUser(null);
    } else {
      console.log(data)
      setUser(data as UserInterFace);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMyDetail();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refresh: getMyDetail }}>
      {children}
    </UserContext.Provider>
  );
}
