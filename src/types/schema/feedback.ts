import { z } from "zod";
export const FeedbackFormSchema = z.object({
  feedback: z.string().min(1, "Feedback diperlukan"),
});
