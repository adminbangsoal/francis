"use client";
import {
  useGetAllTryoutsQuery,
  useGetTryoutSetQuestionListQuery,
  useGetTryoutStateQuery,
  useSubmitTryoutMutation,
  useSubmitTryoutSetMutation,
} from "@/redux/api/tryoutApi";
import {
  useGetAllTOHistoryQuery,
  useGetTOHistoryDetailQuery,
  useGetTOHistoryQuestionsBySetsQuery,
  useGetTOHistorySetsQuery,
} from "@/redux/api/tryoutHistoryApi";
import { TryoutStateResponse } from "@/types/tryout";
import {
  GetAllTOHistoryResponse,
  GetTOHistoryDetailResponse,
  GetTOHistoryQuestionsBySetsResponse,
  GetTOHistorySetsResponse,
} from "@/types/tryout-history";
import { redirect, useParams, usePathname } from "next/navigation";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TOSubjectMap } from "../constants";

interface TryoutContextValue {
  currentQuestionId: string;
  setCurrentQuestionId: (id: string) => void;
  currentNumber: number;
  setCurrentNumber: (number: number) => void;
  tryoutState: TryoutStateResponse | undefined;
  TOQuestionsHistoryData: GetTOHistoryQuestionsBySetsResponse | undefined;
  TOHistorySetsData: GetTOHistorySetsResponse | undefined;
  isOnIstirahat: boolean;
  selectedTO: string;
  setSelectedTO: React.Dispatch<React.SetStateAction<string>>;
  selectedTOSet: string;
  setSelectedTOSet: React.Dispatch<React.SetStateAction<string>>;
  openFinishedModal: boolean;
  setOpenFinishedModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitTryout: () => void;
  handleSubmitTOset: () => void;
  isTryoutSubmitted: boolean;
  refetch: () => void;
  TOHistoryList: GetAllTOHistoryResponse | undefined;
  TOHistoryDetailData: GetTOHistoryDetailResponse | undefined;
}
export const defaultState: TryoutContextValue = {
  currentQuestionId: "",
  setCurrentQuestionId: () => {},
  currentNumber: 0,
  setCurrentNumber: () => {},
  tryoutState: undefined,
  isOnIstirahat: false,
  selectedTO: "",
  setSelectedTO: () => {},
  selectedTOSet: "",
  setSelectedTOSet: () => {},
  openFinishedModal: false,
  setOpenFinishedModal: () => {},
  handleSubmitTryout: () => {},
  handleSubmitTOset: () => {},
  isTryoutSubmitted: false,
  TOQuestionsHistoryData: undefined,
  TOHistorySetsData: undefined,
  refetch: () => {},
  TOHistoryList: undefined,
  TOHistoryDetailData: undefined,
};

const TryoutContext = createContext<TryoutContextValue | undefined>(undefined);

interface TryoutContextProviderProps {
  children: ReactNode;
}
export const TryoutContextProvider: FC<TryoutContextProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const pathname = usePathname();
  const isRiwayat = /^\/try-out\/riwayat\/.*$/.test(pathname);

  const { setId, id } = params;

  const {
    data: tryoutState,
    refetch,
    isSuccess: isSuccessTryoutState,
  } = useGetTryoutStateQuery(undefined, {
    skip: isRiwayat,
    refetchOnMountOrArgChange: true,
  });

  const { data: TOHistoryList } = useGetAllTOHistoryQuery();

  const {
    data: setQuestions,
    isSuccess,
    refetch: refetchQuestionList,
  } = useGetTryoutSetQuestionListQuery(
    {
      set_id: setId as string,
    },
    {
      skip: !setId || isRiwayat,
    },
  );

  const [selectedTO, setSelectedTO] = useState<string>("");
  const [selectedTOSet, setSelectedTOSet] = useState<string>("");

  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [isOnIstirahat, setIsOnIstirahat] = useState<boolean>(false);
  const [openFinishedModal, setOpenFinishedModal] = useState<boolean>(false);

  const { data: TOHistorySetsData } = useGetTOHistorySetsQuery(
    {
      tryout_id: selectedTO,
    },
    { skip: !selectedTO || !isRiwayat },
  );
  const { data: TOQuestionsHistoryData } = useGetTOHistoryQuestionsBySetsQuery(
    {
      set_id: selectedTOSet,
    },
    { skip: !isRiwayat || !selectedTOSet },
  );
  const { data: allTryoutData, isSuccess: isAllTryoutDataSuccess } =
    useGetAllTryoutsQuery(
      {
        mode: "pro",
      },
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const { data: TOHistoryDetailData } = useGetTOHistoryDetailQuery(
    {
      tryout_id: selectedTO,
    },
    {
      skip: !selectedTO || !isRiwayat,
    },
  );

  const [submitTOSet] = useSubmitTryoutSetMutation();
  const [submitTryout, { isSuccess: isTryoutSubmitted, reset }] =
    useSubmitTryoutMutation();

  useEffect(() => {
    if (tryoutState?.data && !tryoutState.data.current_set) {
      setIsOnIstirahat(true);
    } else {
      setIsOnIstirahat(false);
    }

    if (tryoutState && tryoutState.data?.current_set && isSuccess) {
      refetchQuestionList();
    }
  }, [tryoutState, isSuccess]);

  useEffect(() => {
    if (setId) {
      refetch();
      refetchQuestionList();
    }
  }, [setId]);

  useEffect(() => {
    if (isSuccess && setQuestions) {
      const idx = setQuestions.data.questions.findIndex(
        (question) => question.id === setQuestions.data.current_question_id,
      );
      setCurrentNumber(idx + 1);
      setCurrentQuestionId(setQuestions?.data.current_question_id || "");
    }
  }, [isSuccess, setQuestions]);

  useEffect(() => {
    reset();
  }, [id]);

  const handleSubmitTOset = () => {
    submitTOSet({ set_id: setId as string }).then(() => {
      refetch();
    });
  };

  useEffect(() => {
    if (isSuccessTryoutState && !isRiwayat) {
      if (id) {
        if (tryoutState?.data?.tryout_id != id) {
          redirect("/try-out");
        }
        if (
          tryoutState?.data?.current_set == null &&
          tryoutState?.data?.next_set_id == null
        ) {
          if (tryoutState?.data.tryout_id) {
            submitTryout({
              tryout_id: tryoutState?.data?.tryout_id as string,
            }).then(() => {
              setOpenFinishedModal(true);
            });
          } else {
            redirect("/try-out");
          }
        }
      }
    }
  }, [tryoutState, isSuccessTryoutState, tryoutState?.data]);

  const handleSubmitTryout = () => {
    if (!isTryoutSubmitted) {
      submitTOSet({ set_id: setId as string }).then(() => {
        submitTryout({
          tryout_id: tryoutState?.data?.tryout_id as string,
        }).then(() => {
          setOpenFinishedModal(true);
        });
      });
    }
  };

  useEffect(() => {
    if (isAllTryoutDataSuccess && allTryoutData?.data.tryouts) {
      if (isRiwayat) {
        const filteredTO = allTryoutData?.data.tryouts.filter(
          (to) => to.id == params?.slug,
        );
        if (filteredTO.length > 0) {
          setSelectedTO(filteredTO[0].id);
        } else {
          setSelectedTO(allTryoutData?.data.tryouts[0]?.id);
        }
      } else {
        setSelectedTO(allTryoutData?.data.tryouts[0]?.id);
      }
    }
  }, [isAllTryoutDataSuccess, allTryoutData]);

  useEffect(() => {
    if (isRiwayat) {
      if (
        (selectedTOSet == "" || !selectedTOSet) &&
        !!TOHistorySetsData?.data
      ) {
        setSelectedTOSet(TOHistorySetsData?.data.sets[0].id);
      }

      if (
        (currentQuestionId == "" || !currentQuestionId) &&
        !!TOQuestionsHistoryData?.data
      ) {
        setCurrentQuestionId(
          TOQuestionsHistoryData?.data.questions[0].id ?? "",
        );
      }
    }
  }, [
    selectedTOSet,
    TOHistorySetsData,
    currentQuestionId,
    TOQuestionsHistoryData,
    isRiwayat,
  ]);

  useEffect(() => {
    if (!!params.slug && !!TOHistorySetsData?.data) {
      const subject = TOSubjectMap[`${params.slug}`];

      const TOSet = TOHistorySetsData.data.sets.find(
        ({ subject_name }) => subject_name == subject,
      );
      if (!!TOSet && TOSet.id != selectedTOSet) {
        setSelectedTOSet(TOSet.id);
      }
    }
  }, [params, TOHistorySetsData]);

  return (
    <TryoutContext.Provider
      value={{
        currentQuestionId,
        setCurrentQuestionId,
        currentNumber,
        setCurrentNumber,
        tryoutState,
        isOnIstirahat,
        selectedTO,
        setSelectedTO,
        selectedTOSet,
        setSelectedTOSet,
        openFinishedModal,
        setOpenFinishedModal,
        handleSubmitTryout,
        handleSubmitTOset,
        isTryoutSubmitted,
        TOQuestionsHistoryData,
        TOHistorySetsData,
        refetch,
        TOHistoryList,
        TOHistoryDetailData,
      }}
    >
      {children}
    </TryoutContext.Provider>
  );
};

export const useTryoutContext = () => {
  const context = useContext(TryoutContext);
  if (!context) {
    throw new Error(
      "useTryoutContext must be used within a TryoutContextProvider",
    );
  }
  return context;
};
