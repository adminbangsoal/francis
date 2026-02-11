"use client";

import { cn } from "@/lib/utils";
import { PageMetaDto } from "@/types/catatan";
import usePagination from "@mui/material/usePagination";
interface CustomPaginationI extends PageMetaDto {
  setCurrentPage: (newPage: number) => void;
}
export const CustomPagination = ({
  page: currentPage,
  limit,
  pageCount,
  hasPreviousPage,
  hasNextPage,
  setCurrentPage,
}: CustomPaginationI) => {
  const { items } = usePagination({
    page: currentPage,
    count: pageCount ?? 1,
    onChange: (event, newPage) => setCurrentPage(newPage),
  });

  return (
    <div>
      <ul className="flex flex-row items-center justify-center gap-3">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                className={cn(
                  "aspect-square size-10 rounded p-2",
                  selected ? "border border-gray-300" : "",
                )}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                {...item}
                className={cn(
                  item.disabled
                    ? "text-gray-400 hover:cursor-not-allowed"
                    : "text-gray-800",
                )}
              >
                {type == "previous" ? (
                  <p className="flex flex-row items-center gap-2">
                    <i className="i-bi-chevron-left size-4" />
                    Sebelumnya
                  </p>
                ) : (
                  <p className="flex flex-row items-center gap-2">
                    Lanjut
                    <i className="i-bi-chevron-right size-4" />
                  </p>
                )}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </div>
  );
};
