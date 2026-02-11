import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import MediaQuery from "react-responsive";

const TOProStructureInformation = () => {
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  return (
    <>
      <MediaQuery minWidth={1024}>
        <button
          className="flex w-full flex-row items-center justify-center gap-2 font-bold"
          onClick={() => {
            setInfoModalOpen(true);
          }}
        >
          Struktur Try Out Pro <i className="i-ph-info-bold size-4" />
        </button>
        <Modal
          className="flex w-3/4 justify-center text-center text-white"
          open={infoModalOpen}
          setOpen={setInfoModalOpen}
          icon={<i className="i-ph-info-fill size-12 text-gray-500" />}
        >
          <p className="rounded-2xl bg-[#064E3B33]/20 p-3 text-justify font-semibold text-emerald-100 lg:bg-white lg:text-gray-500">
            Try Out ini hanya dapat dikerjakan pada waktu-waktu tertentu, jadi
            pantau terus untuk kesempatanmu! Struktur Try Out ini juga mengikuti
            struktur UTBK sesungguhnya yang ditentukan pada{" "}
            <a
              href="https://framework-snpmb.bppp.kemdikbud.go.id/"
              className="text-sky-500 underline"
              target="_blank"
            >
              framework-snpmb.bppp.kemdikbud.go.id
            </a>{" "}
            oleh Kemendikbud.
          </p>
          <div className="flex justify-end">
            <Button
              variant={"dark"}
              onClick={() => {
                setInfoModalOpen(false);
              }}
            >
              Siap Bang
            </Button>
          </div>
        </Modal>
      </MediaQuery>
      <MediaQuery maxWidth={1023}>
        <p className="rounded-2xl bg-[#064E3B33]/20 p-3 text-justify font-semibold text-emerald-100 lg:bg-white lg:text-gray-500">
          Try Out ini hanya dapat dikerjakan pada waktu-waktu tertentu, jadi
          pantau terus untuk kesempatanmu! Struktur Try Out ini juga mengikuti
          struktur UTBK sesungguhnya yang ditentukan pada{" "}
          <a
            href="https://framework-snpmb.bppp.kemdikbud.go.id/"
            className="text-sky-500 underline"
            target="_blank"
          >
            framework-snpmb.bppp.kemdikbud.go.id
          </a>{" "}
          oleh Kemendikbud.
        </p>
      </MediaQuery>
    </>
  );
};
