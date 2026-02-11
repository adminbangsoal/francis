"use client";
import { UploadBox } from "@/app/components/UploadBox";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/ui/select-input";
import { TextArea } from "@/components/ui/textarea";
import {
  useUploadCatatanMediaMutation,
  useUploadCatatanMutation,
} from "@/redux/api/catatanApi";
import {
  useGetSubjectsQuery,
  useGetTopicsBySubjectQuery,
} from "@/redux/api/latihanSoalApi";
import { UploadCatatanRequest } from "@/types/catatan";
import { UploadCatatanSchema } from "@/types/schema/catatan";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { CATATAN_FILETYPE, NOTE_TYPE_OPTIONS } from "../constants";
import { CatatanPreview } from "./CatatanPreview";
import { ColorPalette } from "./ColorPalette";

export const UploadCatatanForm = () => {
  const [uploadMedia, { isLoading: isMediaLoading }] =
    useUploadCatatanMediaMutation();
  const [
    uploadCatatan,
    { isLoading: iscCatatanLoading, isSuccess: isCatatanSuccess },
  ] = useUploadCatatanMutation();

  const [acceptedCatatan, setAcceptedCatatan] = useState<File[]>([]);
  const [acceptedThumbnail, setAcceptedThumbnail] = useState<File[]>([]);
  const form = useFormContext<UploadCatatanRequest>();
  const { setValue, handleSubmit, getValues, control } = form;
  const subjectId = useWatch({ control, name: "subject_id" });
  const { data: subjectList } = useGetSubjectsQuery();
  const { data: topicList } = useGetTopicsBySubjectQuery({
    subject_id: subjectId,
  });

  useEffect(() => {
    if (subjectId != "") {
      const subjectHasTopic = topicList?.data.some(
        ({ id }) => id == getValues("topic_id"),
      );
      if (!subjectHasTopic) {
        setValue("topic_id", "");
      }
    }
    if (acceptedThumbnail.length > 0) {
      const thumbnailUrl = URL.createObjectURL(acceptedThumbnail[0]);
      setValue("thumbnail_url", thumbnailUrl);
    } else {
      if (getValues("thumbnail_url") != "") setValue("thumbnail_url", "");
    }
  }, [subjectId, acceptedThumbnail, topicList]);

  const uploadFiles = async () => {
    try {
      const [catatanResponse, thumbnailResponse] = await Promise.all([
        uploadMedia({ file: acceptedCatatan[0] }),
        uploadMedia({ file: acceptedThumbnail[0] }),
      ]);
      if ("data" in catatanResponse && "data" in thumbnailResponse) {
        setValue("asset_url", catatanResponse.data.data.url);
        const uploadedUrls = {
          asset_url: catatanResponse.data.data.url,
          thumbnail_url: thumbnailResponse.data.data.url,
        };
        return uploadedUrls;
      }

      return null;
    } catch (error) {
      return null;
    }
  };
  const onSubmit = async (data: z.infer<typeof UploadCatatanSchema>) => {
    // upload media and thumbnail
    if (acceptedCatatan.length == 0) {
      toast.error("Harap mengunggah catatan.");
      return;
    }
    if (acceptedThumbnail.length == 0) {
      toast.error("Harap mengunggah thumbnail.");
      return;
    }
    const uploadedUrls = await uploadFiles();

    const { thumbnail_url, asset_url, ...restData } = data;
    if (!uploadedUrls) {
      toast.error("Terjadi kesalahan. Harap mengunggah kembali catatan.");
      return;
    }

    uploadCatatan({ ...restData, ...uploadedUrls });
  };
  useEffect(() => {
    if (isCatatanSuccess) {
      redirect("/bang-catatan");
    }
  }, [isCatatanSuccess]);

  return (
    <div className="flex flex-col gap-4">
      <Link href="/bang-catatan">
        <Button variant="ghost" className="w-24">
          <i className="i-ph-arrow-left" />
          <p>Kembali</p>
        </Button>
      </Link>
      <div>
        <UploadBox
          myFiles={acceptedCatatan}
          setMyFiles={setAcceptedCatatan}
          header="Pilih pdf atau gambar catatanmu"
          acceptTypes={CATATAN_FILETYPE}
        />
      </div>
      <div className="mx-auto h-20 w-2 border-l-2 border-dashed" />

      <form className="flex w-full flex-col gap-2">
        <div className="hide-scrollbar flex max-h-[70vh] flex-col gap-4 overflow-y-scroll px-1 py-8 md:px-4 lg:max-h-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Judul</FormLabel>
                  <Input
                    placeholder="Judul untuk catatanmu"
                    {...field}
                    required
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex flex-col gap-1">
            <p>Tags</p>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
              <FormField
                control={form.control}
                name="subject_id"
                render={({ field }) => {
                  const options = subjectList?.data.map(
                    ({ id, alternate_name }) => ({
                      name: alternate_name,
                      value: id,
                    }),
                  );
                  return (
                    <FormItem className="w-full">
                      <SelectInput
                        options={options ?? []}
                        placeholder="Mapel"
                        setValue={setValue}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="note_type"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <SelectInput
                        options={NOTE_TYPE_OPTIONS}
                        placeholder="Tipe"
                        setValue={setValue}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="topic_id"
                render={({ field }) => {
                  const options = topicList?.data.map(({ id, name }) => ({
                    name,
                    value: id,
                  }));
                  return (
                    <FormItem className="w-full">
                      <SelectInput
                        options={options ?? []}
                        placeholder="Topik"
                        setValue={setValue}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Deskripsi</FormLabel>
                  <TextArea
                    placeholder="Deskripsi yang secara singkat menjelaskan catatanmu"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <UploadBox
            myFiles={acceptedThumbnail}
            setMyFiles={setAcceptedThumbnail}
            header="Pilih thumbnail untuk catatanmu"
            caption="Pastikan thumbnail berorientasi potret untuk tampilan yang lebih optimal."
            maxSize={2}
            dropzonePlaceholder="/illustrations/image-placeholder.svg"
          />
          <ColorPalette />
        </div>
        <div className="lg:hidden">
          <CatatanPreview />
        </div>
        <div className="mb-4 flex flex-row items-center justify-end gap-4 pt-8">
          <div className="h-0.5 grow rounded bg-gray-100" />
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={"bsPrimary"}
            loading={isMediaLoading || iscCatatanLoading}
          >
            Buat Catatan
          </Button>
        </div>
      </form>
    </div>
  );
};
