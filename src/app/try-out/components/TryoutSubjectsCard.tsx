import TryoutLabelChip from "./TryoutLabelChip";

const TryoutSubjectsCard = () => {
  return (
    <div className="w-full max-w-xl">
      <div className="relative mt-1 flex w-full flex-col rounded-2xl rounded-b-none bg-[#064E3B33] bg-opacity-20 px-4 pb-5 pt-7 text-white shadow-inner-sm">
        <h4 className="text-left font-bold">Kemampuan Penalaran Umum</h4>
        <div className="flex flex-col gap-y-2">
          <TryoutLabelChip
            duration={10}
            soalCount={10}
            subject="Penalaran Induktif"
            variant="kpu"
          />
          <TryoutLabelChip
            duration={10}
            soalCount={10}
            subject="Penalaran Deduktif"
            variant="kpu"
          />
          <TryoutLabelChip
            duration={10}
            soalCount={10}
            subject="Penalaran Kuantitatif"
            variant="kpu"
          />
        </div>
      </div>
      <div className="relative flex w-full flex-col bg-[#064E3B33] bg-opacity-20 px-4 pb-5 pt-3 text-white shadow-inner-sm">
        <div className="flex flex-col gap-y-2">
          <TryoutLabelChip
            duration={15}
            soalCount={20}
            subject="Pengetahuan dan Pemahaman Umum"
            variant="ppu"
            strongSubject
          />
        </div>
      </div>
      <div className="relative flex w-full flex-col bg-[#064E3B33] bg-opacity-20 px-4 pb-5 pt-3 text-white shadow-inner-sm">
        <TryoutLabelChip
          duration={25}
          soalCount={20}
          subject="Kemampuan Memahami Bacaan dan Menulis"
          variant="pbm"
          strongSubject
        />
      </div>
      <div className="relative flex w-full flex-col bg-[#064E3B33] bg-opacity-20 px-4 pb-5 pt-3 text-white shadow-inner-sm">
        <TryoutLabelChip
          duration={20}
          soalCount={15}
          subject="Pengetahuan Kuantitatif"
          variant="pk"
          strongSubject
        />
      </div>
      <div className="relative flex w-full flex-col bg-[#064E3B33] bg-opacity-20 px-4 pb-5 pt-3 text-white shadow-inner-sm">
        <h4 className="text-left font-bold">Literasi Bahasa</h4>
        <div className="flex flex-col gap-y-2">
          <TryoutLabelChip
            duration={10}
            soalCount={10}
            subject="Literasi dalam Bahasa Indonesia"
            variant="pb"
          />
          <TryoutLabelChip
            duration={10}
            soalCount={10}
            subject="Literasi dalam Bahasa Inggris"
            variant="pb"
          />
        </div>
      </div>
      <div className="relative flex w-full flex-col rounded-2xl rounded-t-none bg-[#064E3B33] bg-opacity-20 px-4 pb-5 pt-3 text-white shadow-inner-sm">
        <TryoutLabelChip
          duration={30}
          soalCount={20}
          subject="Penalaran Matematika"
          variant="pm"
          strongSubject
        />
      </div>
    </div>
  );
};

export default TryoutSubjectsCard;
