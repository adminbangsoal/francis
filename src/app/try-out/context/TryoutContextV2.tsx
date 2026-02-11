import {
  useGetTryoutSetQuestionListQuery,
  useGetTryoutSetSequenceQuery,
  useGetTryoutStateQuery,
  useSubmitTryoutMutation,
  useSubmitTryoutSetMutation,
  useUpdateCurrentToQuestionMutation,
} from "@/redux/api/tryoutApi";
import {
  TryoutSetQuestionsResponse,
  TryoutSetSequenceResponse,
  TryoutStateResponse,
} from "@/types/tryout";
import { redirect, useParams, usePathname } from "next/navigation";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TryoutContextV2 {
  tryoutState: TryoutStateResponse | undefined;
  isOnIstirahat: boolean;
  percentage: number;
  tryoutSetSequence: TryoutSetSequenceResponse | undefined;
  currentSubject: string;
  flaggedNumber: number[];
  answeredNumber: number[];
  toSetQuestions: TryoutSetQuestionsResponse | undefined;
  currentNumber: number;
  setCurrentNumber: (number: number) => void;
  changeCurrentNumber: (number: number) => void;
  handleSubmitTryout: (setId: string) => void;
  handleSubmitTOset: (setId: string) => void;
  isTryoutSubmitted: boolean;
  openFinishedModal: boolean;
  setOpenFinishedModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentQuestionId: string;
}

export const TryoutContextV2 = createContext<TryoutContextV2 | undefined>(
  undefined,
);

interface TryoutContextV2ProviderProps {
  children: ReactNode;
}

export const TryoutContextProviderV2: FC<TryoutContextV2ProviderProps> = ({
  children,
}) => {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const isRiwayat = /^\/try-out\/riwayat\/.*$/.test(pathname);

  /** Queries */
  const {
    data: tryoutState,
    refetch,
    isSuccess: isSuccessTryoutState,
  } = useGetTryoutStateQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: toSetQuestions } = useGetTryoutSetQuestionListQuery(
    {
      set_id: tryoutState?.data?.current_set?.tryoutSetId as string,
    },
    {
      skip: !tryoutState?.data?.current_set?.tryoutSetId,
    },
  );

  // there are 2 state, if its on istirahat set the percentage as the next set,
  // if its not on istirahat set the percentage as the current set
  const { data: tryoutSetSequence } = useGetTryoutSetSequenceQuery(
    {
      tryout_id: tryoutState?.data?.tryout.id as string,
    },
    {
      skip: !tryoutState?.data?.tryout.id,
    },
  );

  /** Mutations */
  const [updateCurrentQuestion] = useUpdateCurrentToQuestionMutation();
  const [submitTryout, { isSuccess: isTryoutSubmitted, reset }] =
    useSubmitTryoutMutation();
  const [submitTOSet] = useSubmitTryoutSetMutation();

  /** States */
  const [isOnIstirahat, setIsOnIstirahat] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [currentSubject, setCurrentSubject] = useState<string>("");
  const [flaggedNumber, setFlaggedNumber] = useState<number[]>([]);
  const [answeredNumber, setAnsweredNumber] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [openFinishedModal, setOpenFinishedModal] = useState<boolean>(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");

  /** UseEffects */

  // set isOnIstirahat and percentage
  useEffect(() => {
    // istirahat zone
    if (tryoutState?.data?.current_set == null) {
      setIsOnIstirahat(true);

      // set percentage on istirahat zone
      if (tryoutState?.data?.next_subject && tryoutSetSequence?.data) {
        const nextSet = tryoutSetSequence?.data?.findIndex(
          (set) => set.name === tryoutState?.data?.next_subject,
        );

        if (nextSet) {
          const percentage =
            ((nextSet - 1) / tryoutSetSequence.data.length) * 100;
          setPercentage(percentage);
        }
      } else if (tryoutSetSequence?.data) {
        setPercentage(100);
      }
    } else {
      setIsOnIstirahat(false);

      // set percentage on current set
      if (tryoutState?.data?.current_set && tryoutSetSequence?.data) {
        const currentSet = tryoutSetSequence?.data?.findIndex(
          (set) => set.name === tryoutState?.data?.current_set?.subject_name,
        );

        if (currentSet) {
          const percentage = (currentSet / tryoutSetSequence.data.length) * 100;
          setPercentage(percentage);
        }
      }
    }
  }, [tryoutState?.data, tryoutSetSequence?.data]);

  // set current subject
  useEffect(() => {
    // there are 2 condition, if its on istirahat set the next subject as current subject
    // if its not on istirahat set the current subject as current subject
    if (isOnIstirahat) {
      setCurrentSubject(tryoutState?.data?.next_subject as string);
    } else {
      setCurrentSubject(tryoutState?.data?.current_set?.subject_name as string);
    }
  }, [tryoutState?.data, isOnIstirahat]);

  // set flagged number and answered number
  useEffect(() => {
    if (toSetQuestions) {
      const flaggedNumbers: number[] = [];
      const answeredNumbers: number[] = [];

      toSetQuestions.data.questions.forEach((question, idx) => {
        if (question.is_flagged) {
          flaggedNumbers.push(idx + 1);
        }
        if (question.is_answered) {
          answeredNumbers.push(idx + 1);
        }
      });

      setFlaggedNumber(flaggedNumbers);
      setAnsweredNumber(answeredNumbers);
    }
  }, [toSetQuestions?.data.questions]);

  // set current number
  // 1. when the set just started
  // 2. fetch from server
  useEffect(() => {
    if (!toSetQuestions) return;

    // 1. when the set just started, set the current number to 1
    if (!toSetQuestions.data.current_question_id) {
      setCurrentNumber(1);
      return;
    }

    // 2. fetch from server
    const currentQuestionIndex = toSetQuestions.data.questions.findIndex(
      (question) => question.id === toSetQuestions.data.current_question_id,
    );
    if (currentQuestionIndex !== -1) {
      setCurrentNumber(currentQuestionIndex + 1);
    }
  }, [toSetQuestions?.data.current_question_id]);

  // redirect if try to access tryout that didnt running
  useEffect(() => {
    if (params.id && isSuccessTryoutState && tryoutState?.data == null) {
      redirect("/try-out");
    }
  }, [params.id, tryoutState?.data]);

  useEffect(() => {
    if (toSetQuestions?.data) {
      const questionId = toSetQuestions?.data.questions[currentNumber - 1].id;
      setCurrentQuestionId(questionId);
    }
  }, [currentNumber]);

  useEffect(() => {
    if (isTryoutSubmitted) {
      setOpenFinishedModal(true);
    }
  }, [isTryoutSubmitted]);

  /** Functions */
  const changeCurrentNumber = (number: number) => {
    setCurrentNumber(number);
    const questionId = toSetQuestions?.data.questions[number - 1].id;

    if (!questionId) return;

    updateCurrentQuestion({
      question_id: questionId as string,
      set_id: tryoutState?.data?.current_set?.tryoutSetId as string,
    });
  };

  const handleSubmitTryout = async (setId: string) => {
    if (!isTryoutSubmitted) {
      await submitTOSet({ set_id: setId as string });

      await submitTryout({
        tryout_id: tryoutState?.data?.tryout_id as string,
      });
    }
  };

  const handleSubmitTOset = (setId: string) => {
    submitTOSet({ set_id: setId as string }).then(() => {
      refetch();
    });
  };

  const res = {
    tryoutState: tryoutState,
    isOnIstirahat: isOnIstirahat,
    percentage: percentage,
    tryoutSetSequence,
    currentSubject,
    flaggedNumber,
    answeredNumber,
    toSetQuestions,
    currentNumber,
    setCurrentNumber,
    changeCurrentNumber,
    handleSubmitTryout,
    handleSubmitTOset,
    isTryoutSubmitted,
    openFinishedModal,
    setOpenFinishedModal,
    currentQuestionId:
      currentQuestionId || toSetQuestions?.data.current_question_id || "",
  };

  return (
    <TryoutContextV2.Provider value={res}>{children}</TryoutContextV2.Provider>
  );
};

export const useTryoutContextV2 = () => {
  const context = useContext(TryoutContextV2);
  if (!context) {
    throw new Error(
      "useTryoutContextV2 must be used within a TryoutContextProvider",
    );
  }
  return context;
};
