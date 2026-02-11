import { Button } from "@/components/ui/button";

export const FlashcardContainer = () => {
  return (
    <div className="relative mx-4 rounded-xl border-4 border-orange-200 bg-orange-500">
      <div className="flex min-h-72 flex-col justify-between bg-[url(/illustrations/flashcard-illustration.svg)] bg-cover">
        <div className="absolute top-0 z-10 h-28 w-full bg-gradient-to-b from-orange-500 to-orange-100/0 blur-md" />
        <div className=" z-10 mt-2 px-4 text-end text-lg font-medium text-white">
          <p>Limited points</p>
          <p className="text-xl">59:12:06</p>
        </div>

        <div className="mx-auto">
          <Button variant={"bsPrimary"}>Open Flashcard</Button>
        </div>
        <div className="absolute bottom-0 z-10 h-28 w-full bg-gradient-to-t from-orange-500 to-orange-100/0 blur-md" />
        <p className="z-10 mb-2 w-full text-center text-2xl font-medium text-white">
          Flashcard of the day
        </p>
      </div>
    </div>
  );
};
