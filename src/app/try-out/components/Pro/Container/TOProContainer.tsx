"use client";

import { useTryoutContextV2 } from "@/app/try-out/context/TryoutContextV2";
import TOProAttemptContainer from "./AttemptContainer";
import IstirahatContainer from "./IstirahatContainer";

const TOProContainer = () => {
  const { tryoutState } = useTryoutContextV2();
  return tryoutState?.data?.current_set ? (
    <TOProAttemptContainer setId={tryoutState?.data.current_set.tryoutSetId} />
  ) : (
    <IstirahatContainer />
  );
};

export default TOProContainer;
