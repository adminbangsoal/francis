import { Button } from "@/components/ui/button";
import { cn, joinAcceptedExtensions } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { IMAGE_FILETYPE } from "../bang-catatan/upload/constants";
interface UploadBoxI {
  myFiles: File[];
  setMyFiles: React.Dispatch<React.SetStateAction<File[]>>;
  header?: string;
  caption?: string;
  maxSize?: number;
  maxFiles?: number;
  acceptTypes?: Record<string, string[]>;
  dropzonePlaceholder?: string;
}
export const UploadBox = ({
  myFiles,
  setMyFiles,
  header = "Pilih pdf atau gambar",
  caption = "atau jatuhkan ke sini",
  maxSize = 5, // in mb
  maxFiles = 1,
  acceptTypes = IMAGE_FILETYPE, // Default accepted file types
  dropzonePlaceholder = "/dropzone.svg",
}: UploadBoxI) => {
  const acceptedExtensions = joinAcceptedExtensions(acceptTypes);
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    acceptedFiles,
    fileRejections,
    inputRef,
  } = useDropzone({
    accept: acceptTypes,
    maxSize: maxSize * 1024 * 1024, // convert to bytes
    maxFiles,
  });

  const removeAllFiles = () => {
    setMyFiles([]);
  };

  useEffect(() => {
    setMyFiles(acceptedFiles);
  }, [acceptedFiles]);
  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections.map(({ file, errors }) => {
        errors.map(({ message }) => {
          toast.error(message);
        });
      });
    }
  }, [fileRejections]);

  return (
    <div>
      <div className="flex h-full min-h-52 w-full gap-x-2">
        <div className="h-full w-full">
          <div
            {...getRootProps()}
            className={cn(
              "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50 py-6",
              isDragAccept && "border-emerald-500",
            )}
          >
            <input {...getInputProps()} />
            {myFiles.length == 0 ? (
              <>
                <div className="relative flex h-1/2 min-h-48 w-full justify-center">
                  <Image
                    alt="dropzone placeholder"
                    src={dropzonePlaceholder}
                    width={182}
                    height={120}
                  />
                </div>
                <div className="h-1/2 text-center">
                  <p className="mb-1 font-bold text-gray-500">{header}</p>
                  <p className="mb-0 font-500 text-gray-400">{caption}</p>
                </div>
              </>
            ) : (
              <div className="flex w-1/2 flex-col items-center justify-center gap-2">
                {myFiles.map((file, index) => {
                  const imageUrl = file.type.includes("image")
                    ? URL.createObjectURL(file)
                    : "/illustrations/empty-thumbnail.png";

                  return (
                    <div
                      key={`${index}-${file.name}`}
                      className="flex w-full flex-col items-center justify-center text-center"
                    >
                      <div className="relative">
                        <Image
                          alt="file preview"
                          src={imageUrl}
                          width={182}
                          height={120}
                          className="rounded"
                        />
                        {file.type.includes("pdf") && (
                          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 transform text-lg font-semibold text-gray-400">
                            .PDF
                          </p>
                        )}
                      </div>

                      <p className="w-full truncate break-all">{file.name}</p>
                    </div>
                  );
                })}
                <div className="flex flex-row gap-3">
                  <Button
                    variant={"bsPrimary"}
                    size={"sm"}
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                  >
                    Ubah File
                  </Button>
                  <Button
                    variant={"danger"}
                    size={"sm"}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAllFiles();
                    }}
                  >
                    Hapus File
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-3 space-x-2">
              <span className="h-10 rounded-full border-2 border-gray-200 bg-gray-100 px-2 text-xs text-gray-500">
                max {maxSize}MB
              </span>
              <span className="h-10 rounded-full border-2 border-gray-200 bg-gray-100 px-2 text-xs text-gray-500">
                {acceptedExtensions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
