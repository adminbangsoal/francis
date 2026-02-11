import {
  useGetAllTOHistoryQuery,
  useGetTOHistoryDetailQuery,
  useGetTOHistoryQuestionsBySetsQuery,
  useGetTOHistorySetsQuery,
} from "@/redux/api/tryoutHistoryApi";
import {
  GetAllTOHistoryResponse,
  GetTOHistoryDetailResponse,
  GetTOHistoryQuestionsBySetsResponse,
  GetTOHistorySetsResponse,
} from "@/types/tryout-history";
import { redirect, useParams, usePathname } from "next/navigation";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TryoutHistoryContextValue {
  currentNumber: number;
  setCurrentNumber: (number: number) => void;
  selectedTOSet: string;
  setSelectedTOSet: React.Dispatch<React.SetStateAction<string>>;
  TOQuestionsHistoryData: GetTOHistoryQuestionsBySetsResponse | undefined;
  currentQuestionId: string;
  TOHistoryDetailData: GetTOHistoryDetailResponse | undefined;
  TOHistoryList: GetAllTOHistoryResponse | undefined;
  setCurrentQuestionId: (id: string) => void;
  TOHistorySetsData: GetTOHistorySetsResponse | undefined;
  selectedTO: string;
  setSelectedTO: Dispatch<SetStateAction<string>>;
}

const TryoutHistoryContext = createContext<
  TryoutHistoryContextValue | undefined
>(undefined);

interface TryoutHistoryContextProviderProps {
  children: ReactNode;
}

export const TryoutHistoryContextProvider: FC<
  TryoutHistoryContextProviderProps
> = ({ children }) => {
  const params = useParams();
  const pathname = usePathname();

  const isRiwayat = /^\/try-out\/riwayat\/.*$/.test(pathname);

  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [selectedTO, setSelectedTO] = useState<string>("");
  const [selectedTOSet, setSelectedTOSet] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");

  const { slug } = params;

  const { data: TOHistorySetsData } = useGetTOHistorySetsQuery(
    {
      tryout_id: selectedTO,
    },
    {
      skip: !selectedTO,
    },
  );

  const { data: TOQuestionsHistoryData } = useGetTOHistoryQuestionsBySetsQuery(
    {
      set_id: selectedTOSet,
    },
    { skip: !selectedTOSet },
  );

  const { data: TOHistoryDetailData } = useGetTOHistoryDetailQuery(
    {
      tryout_id: selectedTO,
    },
    {
      skip: !selectedTO,
    },
  );

  const { data: TOHistoryList } = useGetAllTOHistoryQuery();

  useEffect(() => {
    if (!slug && isRiwayat) {
      redirect("/try-out");
    }
    setSelectedTO(slug as string);
  }, [slug]);

  useEffect(() => {
    if ((selectedTOSet == "" || !selectedTOSet) && !!TOHistorySetsData?.data) {
      setSelectedTOSet(TOHistorySetsData?.data.sets[0].id);
    }

    if (
      (currentQuestionId == "" || !currentQuestionId) &&
      !!TOQuestionsHistoryData?.data
    ) {
      setCurrentQuestionId(TOQuestionsHistoryData?.data.questions[0].id ?? "");
    }
  }, [
    selectedTOSet,
    TOHistorySetsData,
    currentQuestionId,
    TOQuestionsHistoryData,
  ]);

  return (
    <TryoutHistoryContext.Provider
      value={{
        currentNumber,
        setCurrentNumber,
        selectedTOSet,
        setSelectedTOSet,
        TOQuestionsHistoryData,
        currentQuestionId,
        TOHistoryDetailData,
        TOHistoryList,
        setCurrentQuestionId,
        TOHistorySetsData,
        selectedTO,
        setSelectedTO,
      }}
    >
      {children}
    </TryoutHistoryContext.Provider>
  );
};

export const useTryoutHistoryContext = () => {
  const context = useContext(TryoutHistoryContext);
  if (!context) {
    throw new Error(
      "useTryoutHistoryContext must be used within a TryoutHistoryContextProvider",
    );
  }
  return context;
};
