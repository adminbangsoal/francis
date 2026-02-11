"use client";
import { Form } from "@/components/ui/form";
import { BangCatatanTheme, UploadCatatanRequest } from "@/types/catatan";
import { UploadCatatanSchema } from "@/types/schema/catatan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CatatanPreview } from "./CatatanPreview";
import { UploadCatatanForm } from "./UploadCatatanForm";

export const UploadCatatan = () => {
  const defaultValues: UploadCatatanRequest = {
    asset_url: "",
    title: "",
    description: "",
    thumbnail_url: "",
    color_pallete: BangCatatanTheme.gray,
    subject_id: "",
    topic_id: "",
    note_type: "",
  };
  const form = useForm<z.infer<typeof UploadCatatanSchema>>({
    resolver: zodResolver(UploadCatatanSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <div className="flex flex-col items-stretch gap-8 px-5 md:p-8 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <UploadCatatanForm />
        </div>
        <div className="-mx-8 hidden bg-[url(/bg-mesh-vertical-2.webp)] bg-cover bg-no-repeat py-8 lg:sticky lg:top-0 lg:-mr-10 lg:ml-0 lg:block lg:h-screen lg:w-1/2 lg:py-0">
          <CatatanPreview />
        </div>
      </div>
    </Form>
  );
};
