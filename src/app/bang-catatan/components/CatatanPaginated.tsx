"use client";
import { CustomPagination } from "@/components/ui/pagination";
import { updateQueryParams, validateUUID } from "@/lib/utils";
import { useGetCatatanTimelineQuery } from "@/redux/api/catatanApi";
import { QueryParams } from "@/types";
import { CatatanParamsI, NoteType } from "@/types/catatan";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CatatanCardNew from "./CatatanCardNew";
import { CatatanSkeleton } from "./CatatanSkeleton";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import Filters from "./Filters";

interface CatatanPaginatedI extends CatatanParamsI {
  is_liked?: boolean;
}
export const CatatanPaginated = ({
  topic_id,
  subject_id,
  note_type,
  query,
  limit,
  page,
  id,
  is_liked,
}: CatatanPaginatedI) => {
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page ?? "1"));

  const pathname = usePathname();
  const router = useRouter();

  const [queryFilters, setQueryFilters] = useState<CatatanParamsI>({
    subject_id: validateUUID(subject_id) ?? "",
    topic_id: validateUUID(topic_id) ?? "",
    note_type: note_type ?? "",
    query: query ?? "",
    id: id,
    page: `${currentPage}`,
    limit: limit,
  });

  useEffect(() => {
    const query = updateQueryParams(queryFilters as QueryParams);
    router.replace(`${pathname}?${query}`, { scroll: false });
  }, [queryFilters]);

  const { data: catatanList, isLoading } = useGetCatatanTimelineQuery({
    page: currentPage,
    limit: parseInt(limit ?? "10"),
    topic_id: validateUUID(topic_id),
    subject_id: validateUUID(subject_id),
    note_type: (note_type as NoteType) ?? undefined,
    query: query ?? undefined,
    is_liked: is_liked,
  });

  return (
    <div className="flex min-h-[75vh] flex-col justify-between">
      <div>
        <Filters
          queryFilters={queryFilters}
          setQueryFilters={setQueryFilters}
        />
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 ">
          {catatanList?.data.map((catatan) => (
            <CatatanCardNew
              key={catatan.id}
              catatan={catatan}
              queryFilters={queryFilters}
              setQueryFilters={setQueryFilters}
            />
          ))}
        </div>
        {catatanList?.data.length == 0 && (
          <EmptyPlaceholder message="Catatan belum tersedia. Mulai tambahkan catatanmu!" />
        )}
        {isLoading && <CatatanSkeleton />}
      </div>
      {!is_liked && !!catatanList && (
        <div className="mx-auto mt-4">
          <CustomPagination
            setCurrentPage={setCurrentPage}
            {...catatanList?.meta}
            page={currentPage}
          />
        </div>
      )}
    </div>
  );
};
