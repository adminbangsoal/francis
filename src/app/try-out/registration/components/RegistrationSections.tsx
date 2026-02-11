import { Button } from "@/components/ui/button";
import { useRegisterTryoutMutation } from "@/redux/api/usersApi";
import BerlanggananCard from "./BerlanggananCard";
import ChallengeCard from "./ChallengeCard";

interface RegistrationSectionsProps {
  isAlreadyRegistered: boolean | undefined;
  isEligible: boolean | undefined;
  tryoutId: string;
}

const RegistrationSections = ({
  isAlreadyRegistered,
  isEligible,
  tryoutId,
}: RegistrationSectionsProps) => {
  const [mutate, { isLoading }] = useRegisterTryoutMutation();

  return (
    <>
      {!isAlreadyRegistered && !isEligible && (
        <h2 className="py-5 text-xl font-bold text-white">Daftar Sekarang!</h2>
      )}
      {!isAlreadyRegistered && isEligible && (
        <Button
          onClick={() => {
            mutate({
              tryoutId: tryoutId,
            });
          }}
          loading={isLoading}
          variant="bsPrimary"
          className="mt-3 flex w-full items-center gap-x-1"
        >
          Daftar sekarang <i className="i-ph-arrow-right-bold mt-0.5 size-5" />
        </Button>
      )}
      {!isAlreadyRegistered && !isEligible && <BerlanggananCard />}
      {!isAlreadyRegistered && !isEligible && (
        <ChallengeCard tryoutId={tryoutId} />
      )}
    </>
  );
};

export default RegistrationSections;
