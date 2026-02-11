"use client";
import { Button } from "@/components/ui/button";
import CheckboxGroup from "@/components/ui/checkbox-group";
import RadioGroup from "@/components/ui/radio-group";
import { useWindowsBreakpoints } from "@/lib/hooks/useWindowBreakpoints";
import { cn } from "@/lib/utils";
import {
  useGenerateLatihanSoalClassicMutation,
  useGenerateLatihanSoalSekuensialMutation,
  useGetLatihanSoalTimedQuery,
  useGetSubjectsQuery,
  useGetTopicsBySubjectQuery,
} from "@/redux/api/latihanSoalApi";
import { Subject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import MediaQuery from "react-responsive";
import { DESCRIPTION, STEP_DIALOGUE } from "../../contants/copywriting";
import { useLatihanContext } from "../../context/LatihanContext";
import ChooseTopicSection from "../Sections/ChooseTopicSection";
import PrestepSections from "../Sections/PrestepSections";
import ToggleQuestionLimit from "../Toggle/ToggleQuestionLimit";
import ToggleTimedMode from "../Toggle/ToggleTimedMode";
import ToggleTimedSubject from "../Toggle/ToggleTimedSubject";
import { JUMLAH_SOAL_OPTIONS } from "./constants";
import {
  klasikAnimationOptions,
  sekuensialAnimationOptions,
} from "./lottie.options";

export const PilihMode = () => {
  const router = useRouter();

  const {
    data: soalTimedData,
    refetch,
    isLoading: isLatsolLoading,
  } = useGetLatihanSoalTimedQuery();

  const { isTabletBreakpoint } = useWindowsBreakpoints();

  const { setTimedSoalData } = useLatihanContext();

  const [selectedMode, setSelectedMode] = useState<"classic" | "sequential">(
    "classic",
  );

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [jumlahSoal, setJumlahSoal] = useState<number>(0);
  const handleRadioChange = (value: string) => {
    // Mixpanel.track("Selected Jumlah Soal", { jumlah_soal: parseInt(value) });
    setJumlahSoal(parseInt(value));
  };
  const handleCheckboxChange = (selectedValues: string[]) => {
    setSelectedTopicIds(selectedValues);
  };

  const [currentStep, setCurrentStep] = useState<number>(0);
  const { data: subjectsData, isLoading: isSubjectLoading } =
    useGetSubjectsQuery(undefined, { skip: currentStep != 1 });

  const { data: topicsData, isLoading: isTopicLoading } =
    useGetTopicsBySubjectQuery(
      { subject_id: selectedSubject?.id || "" },
      {
        skip: !selectedSubject,
      },
    );

  const [
    createSoalSekuensial,
    { isLoading, isSuccess: isCreateSeqSuccess, reset, error, data },
  ] = useGenerateLatihanSoalSekuensialMutation();

  const [
    createSoalClassic,
    { isLoading: isClsLoading, isSuccess: isCreateClsSuccess },
  ] = useGenerateLatihanSoalClassicMutation();

  const handleCreateSoalSekuensial = async () => {
    let topicIds = selectedTopicIds;
    if (selectedTopicIds.length == topicsData?.data.length) {
      topicIds = [];
    }
    await createSoalSekuensial({
      subject_id: selectedSubject?.id || "",
      topic_ids: topicIds,
      max_number: jumlahSoal,
    });
  };

  const handleCreateSoalClassic = async () => {
    if (!isClsLoading) await createSoalClassic();
  };

  useEffect(() => {
    if (isCreateSeqSuccess || isCreateClsSuccess) {
      refetch();
    }
    if (!!soalTimedData?.data) {
      setTimedSoalData(soalTimedData.data);

      // Mixpanel.track("Created Timed Soal", {
      //   id: soalTimedData.data.id,
      //   mode: soalTimedData.data.mode,
      // });

      if (soalTimedData.data.mode == "classic") {
        router.replace(
          `/latihan-soal-timed/${soalTimedData.data.mode}/${soalTimedData.data.id}/${soalTimedData.data.slug}`,
        );
      } else {
        router.replace(
          `/latihan-soal-timed/${soalTimedData.data.mode}/${soalTimedData.data.id}`,
        );
      }
    }
  }, [soalTimedData, isCreateSeqSuccess, isCreateClsSuccess]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    setSelectedTopicIds([]);
  }, [selectedSubject]);

  return (
    <>
      <MediaQuery maxWidth={767}>
        <div className="relative flex flex-col items-center gap-y-4 bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center px-3 pb-20 pt-20 text-white">
          <h2 className="max-w-xs text-center text-2xl font-700">
            Waktunya melatih kecepatanmu!
          </h2>
          <div className="h-[2px] w-36 bg-white bg-opacity-40"></div>
          <p className="mb-5 text-center">{STEP_DIALOGUE[currentStep]}</p>
          {currentStep == 0 && <PrestepSections selectedMode={selectedMode} />}
          {currentStep == 1 && topicsData && (
            <ChooseTopicSection
              selectedValues={selectedTopicIds}
              topics={topicsData}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}{" "}
          {currentStep == 1 && !topicsData && (
            <h6 className="font-700">Silahkan Pilih Subjek</h6>
          )}
          {currentStep == 2 && (
            <div className="flex flex-col items-center gap-y-2 text-center">
              <Image
                src="/timelimit-choice.png"
                width={320}
                height={240}
                alt="timelimit-choice"
              />
              <p>
                Semakin banyak soal yang kamu bisa jawab dalam waktu tertentu,
                semakin siap kamu untuk mengerjakan topik UTBK yang sebenarnya!
              </p>
            </div>
          )}
          <div className="absolute bottom-0">
            <Image
              src="/curve.svg"
              alt="Curve background"
              width={1440}
              height={240}
            />
          </div>
        </div>
        <div className="mt-6 flex h-32 flex-col items-center justify-between px-3 pb-3">
          {currentStep == 0 && (
            <ToggleTimedMode
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
            />
          )}
          {currentStep == 1 && subjectsData && (
            <ToggleTimedSubject
              subjects={subjectsData}
              setSelectedSubjects={setSelectedSubject}
              selectedSubject={selectedSubject}
            />
          )}
          {currentStep == 2 && (
            <ToggleQuestionLimit
              setQuestionLimit={setJumlahSoal}
              questionLimitValue={jumlahSoal}
            />
          )}
          {currentStep > 0 && (
            <div className="my-10 flex w-full gap-x-2 px-4">
              <div className="h-[2px] w-1/2 bg-emerald-400"></div>
              <div
                className={cn(
                  "h-[2px] w-1/2 bg-gray-200",
                  currentStep == 2 && "bg-emerald-400",
                )}
              ></div>
            </div>
          )}
          <div className="flex w-full gap-x-2">
            {currentStep != 0 && (
              <Button
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                }}
                disabled={!selectedMode}
                variant={"bsSecondary"}
                className="w-1/4 !bg-gray-500"
              >
                <i className="i-ph-arrow-left size-5 text-white" />
              </Button>
            )}
            <Button
              loading={isLoading}
              onClick={() => {
                if (selectedMode == "classic") {
                  // Mixpanel.track("Clicked Create Classic Soal");
                  handleCreateSoalClassic();
                } else {
                  if (currentStep == 2) {
                    // Mixpanel.track("Clicked Create Sekuensial Soal");
                    handleCreateSoalSekuensial();
                    return;
                  }
                  setCurrentStep(currentStep + 1);
                }
              }}
              disabled={
                !selectedMode ||
                (currentStep == 1 && !selectedTopicIds.length) ||
                (currentStep == 2 && !jumlahSoal) ||
                isLoading
              }
              variant={"bsPrimary"}
              className="flex-grow"
            >
              {currentStep !== 2 ? "Lanjut" : "Mulai latihan berwaktu!"}{" "}
              <i className="i-ph-arrow-right ml-2 size-5 text-white" />
            </Button>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={767}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`modal-pilih-mode-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("fixed inset-0 z-50 h-screen w-screen")}
          >
            <div
              className="absolute inset-0 z-[10] h-screen w-screen bg-black/50 pt-10 lg:pt-20"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            />
            <div className="relative z-40 mx-auto flex h-screen w-screen  flex-col items-center justify-center gap-5 px-10 py-10 md:gap-10 lg:px-20">
              <div className="flex w-full flex-row items-center justify-between lg:w-1/2">
                <div className="flex h-auto flex-row items-center justify-start gap-2 md:gap-4">
                  {currentStep > 0 && (
                    <button
                      className="px-4"
                      onClick={(e) => {
                        // Mixpanel.track("Clicked Previous Step");
                        e.preventDefault();
                        setCurrentStep(currentStep - 1);
                      }}
                    >
                      <ChevronLeft className="size-8 shrink-0 text-white" />
                    </button>
                  )}
                  <p className="rounded-xl bg-white/50 px-4 py-3 text-white">
                    {currentStep > 0
                      ? "Pilih subjek dan topik"
                      : "Pilih mode latihan soal"}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    // Mixpanel.track("Clicked Close Pilih Mode");
                    e.preventDefault();
                    router.back();
                  }}
                >
                  <i className="i-ph-x-bold size-8 text-white" />
                </button>
              </div>
              <div>
                {currentStep == 0 ? (
                  <div className="flex w-full flex-col items-stretch justify-between gap-6 md:max-w-[600px] md:flex-row">
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                      }}
                      className="group overflow-hidden rounded-2xl bg-white p-4 text-left transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-gray-200"
                    >
                      <div className="-my-12">
                        <Lottie
                          options={sekuensialAnimationOptions}
                          style={{
                            objectFit: "cover",
                            overflow: "hidden",
                            scale: isTabletBreakpoint ? 1.4 : 1,
                          }}
                        />
                      </div>
                      <div className="rounded-2xl bg-emerald-300 p-5 group-hover:bg-emerald-500 group-hover:text-gray-50">
                        <p className="font-bold">Sekuensial</p>
                        <p>{DESCRIPTION.sequential}</p>
                      </div>
                    </button>
                    <div
                      onClick={handleCreateSoalClassic}
                      className="group overflow-hidden rounded-2xl bg-white p-4 text-left transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-gray-200"
                    >
                      <div className="flex h-full flex-col justify-between">
                        <div className="-my-10">
                          <Lottie
                            options={klasikAnimationOptions}
                            style={{
                              objectFit: "cover",
                              overflow: "hidden",
                              scale: isTabletBreakpoint ? 1.4 : 1,
                            }}
                          />
                        </div>
                        <div className="rounded-2xl bg-emerald-300 p-5 group-hover:bg-emerald-500 group-hover:text-gray-50">
                          <p className="font-bold">Klasik</p>
                          <p>{DESCRIPTION.classic}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full flex-col gap-3 rounded-xl bg-white px-4 py-5 md:max-w-[600px] md:gap-4">
                    <div className="flex flex-col md:gap-3">
                      <p className="text-xl font-bold">Jumlah Soal</p>
                      <RadioGroup
                        className="grid grid-cols-2 gap-2 md:flex md:flex-row"
                        options={JUMLAH_SOAL_OPTIONS}
                        onChange={handleRadioChange}
                        defaultValue={jumlahSoal.toString()}
                      />
                    </div>
                    <p className="text-xl font-bold">Subjek</p>
                    {currentStep == 1 ? (
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                        {isSubjectLoading
                          ? [...Array(6)].map((_, idx) => (
                              <div
                                className="skeleton relative h-9 w-full rounded-lg bg-surface-300 from-surface-300"
                                key={idx}
                              />
                            ))
                          : !!subjectsData &&
                            subjectsData.data.map(({ id, name, icon }, idx) => (
                              <div
                                key={id}
                                className="group relative flex h-full w-full select-none items-center justify-start overflow-hidden rounded-md p-3 no-underline shadow-none outline-none transition-[transform,box-shadow] duration-500 ease-out-back before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-300 before:to-emerald-600 before:opacity-0 before:transition-[opacity] hover:-rotate-3 hover:scale-105 hover:shadow-xl before:hover:opacity-100 focus:shadow-md md:p-6"
                                onClick={(e) => {
                                  // Mixpanel.track("Clicked Subject", {
                                  //   id: id,
                                  //   name: name,
                                  // });
                                  e.preventDefault();
                                  setSelectedSubject(subjectsData.data[idx]);
                                  setCurrentStep(2);
                                }}
                              >
                                <Image
                                  src={icon}
                                  alt={`${name} nav link icon`}
                                  width={300}
                                  height={300}
                                  quality={100}
                                  className="absolute -right-4 size-20 text-surface-400 mix-blend-multiply"
                                />
                                <p className="z-10 font-600 transition-colors group-hover:text-white">
                                  {name}
                                </p>
                              </div>
                            ))}
                      </div>
                    ) : isTopicLoading ? (
                      <div className="grid w-full grid-cols-2 gap-2 md:max-w-[600px]">
                        {[...Array(8)].map((_, idx) => (
                          <div
                            className="skeleton relative h-6 w-full rounded-lg bg-surface-300 from-surface-300"
                            key={idx}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        <p>
                          Pilih topik untuk subjek {selectedSubject?.name}{" "}
                          <span
                            onClick={() => {
                              setCurrentStep(currentStep - 1);
                            }}
                            className="cursor-pointer text-sm text-neutral-600 underline underline-offset-2 "
                          >
                            ganti subjek
                          </span>
                        </p>
                        {!!topicsData && (
                          <CheckboxGroup
                            options={topicsData.data.map(({ id, name }) => ({
                              label: name,
                              value: id,
                            }))}
                            className="grid grid-cols-2 gap-2"
                            onChange={handleCheckboxChange}
                            selectedValues={selectedTopicIds}
                          />
                        )}
                        {(error as any)?.data?.error?.message ==
                          "Not enough questions" && (
                          <p className="text-sm font-medium text-red-700">
                            Topik yang dipilih tidak memiliki soal yang cukup,
                            silahkan tambah topik lain!
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {
                  <div className="flex w-full flex-row justify-end pt-2">
                    {currentStep > 0 && (
                      <Button
                        loading={
                          isLoading || isCreateClsSuccess || isCreateSeqSuccess
                        }
                        variant={"bsPrimary"}
                        className="flex w-1/3 flex-row items-center gap-2"
                        disabled={
                          selectedTopicIds.length == 0 ||
                          jumlahSoal == 0 ||
                          isLoading ||
                          isCreateClsSuccess ||
                          isCreateSeqSuccess
                        }
                        onClick={handleCreateSoalSekuensial}
                      >
                        <p>Mulai</p>
                        <i className="i-ph-arrow-right size-5 text-white" />
                      </Button>
                    )}
                  </div>
                }
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </MediaQuery>
    </>
  );
};
