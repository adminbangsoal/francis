import { z } from "zod";

export const UploadCatatanSchema = z.object({
  asset_url: z.string(),
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  thumbnail_url: z.string(),
  color_pallete: z.string(),
  subject_id: z.string().min(1, "Subjek harus diisi"),
  topic_id: z.string().min(1, "Topik harus diisi"),
  note_type: z.string().min(1, "Tipe Catatn harus diisi"),
});
