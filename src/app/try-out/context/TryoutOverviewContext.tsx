import { useLazyGetAllTryoutsQuery } from "@/redux/api/tryoutApi";
import { GetAllTOHistoryResponse } from "@/types/tryout-history";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TryoutOverviewContext {
  selectedTryout: string;
  tryoutHistoryList: GetAllTOHistoryResponse | undefined;
  setSelectedTryout: Dispatch<SetStateAction<string>>;
}

export const TryoutOverviewContext = createContext<
  TryoutOverviewContext | undefined
>(undefined);

interface TryoutOverviewContextProviderProps {
  children: React.ReactNode;
}

export const TryoutOverviewContextProvider = ({
  children,
}: TryoutOverviewContextProviderProps) => {
  const [selectedTryout, setSelectedTryout] = useState<string>("");
  const [tryoutHistoryList, setTryoutHistoryList] = useState<
    GetAllTOHistoryResponse | undefined
  >(undefined);

  const [fetchAllTryout] = useLazyGetAllTryoutsQuery();

  useEffect(() => {
    fetchAllTryout({
      mode: "pro",
    }).then(({ data }) => {
      if (data) {
        setSelectedTryout(data.data.tryouts[0].id as string);
      }
    });
  }, []);

  return (
    <TryoutOverviewContext.Provider
      value={{ selectedTryout, tryoutHistoryList, setSelectedTryout }}
    >
      {children}
    </TryoutOverviewContext.Provider>
  );
};

export const useTryoutOverviewContext = () => {
  const context = useContext(TryoutOverviewContext);
  if (context === undefined) {
    throw new Error(
      "useTryoutOverviewContext must be used within a TryoutOverviewContextProvider",
    );
  }
  return context;
};
