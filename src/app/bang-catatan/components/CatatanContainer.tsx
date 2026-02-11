"use client";
import { useSearchParams } from "next/navigation";
import { CatatanPaginated } from "./CatatanPaginated";

export const CatatanContainer = () => {
  const searchParams = useSearchParams();
  const topic_id = searchParams.get("topic_id");
  const subject_id = searchParams.get("subject_id");
  const note_type = searchParams.get("note_type");
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const id = searchParams.get("id");
  const queryParams = {
    topic_id,
    subject_id,
    note_type,
    query,
    limit,
    page,
    id,
  };

  return (
    <div>
      <CatatanPaginated {...queryParams} />
    </div>
  );
};
