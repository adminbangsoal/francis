import { z } from "zod";

const phone_number = z
  .string()
  .min(10, { message: "Nomor Handphone tidak valid. Terlalu pendek" })
  .max(13, { message: "Nomor Handphone tidak valid. Terlalu panjang" })
  .refine((value) => /^[0-9]+$/.test(value), {
    message: "Nomor Handphone harus berupa angka saja",
  })
  .refine((value) => /^08[0-9]{8,11}$/.test(value), {
    message:
      "Format tidak valid. Nomor Handphone Indonesia harus diawali dengan '08'",
  });

const UniversitySelectionSchema = z
  .object({
    choosen_university_one: z
      .string()
      .min(1, "Universitas pertama harus diisi"),
    choosen_major_one: z.string().min(1, "Prodi pertama harus diisi"),
    choosen_university_two: z.string(),
    choosen_major_two: z.string(),
    choosen_university_three: z.string(),
    choosen_major_three: z.string(),
  })
  .superRefine(
    (
      {
        choosen_university_one,
        choosen_major_one,
        choosen_university_two,
        choosen_major_two,
        choosen_university_three,
        choosen_major_three,
      },
      ctx,
    ) => {
      const selections = new Set();

      selections.add(`${choosen_university_one}-${choosen_major_one}`);
      if (choosen_major_two)
        selections.add(`${choosen_university_two}-${choosen_major_two}`);
      if (choosen_major_three)
        selections.add(`${choosen_university_three}-${choosen_major_three}`);

      if (
        (selections.size < 2 && choosen_major_two) ||
        (selections.size < 3 && choosen_major_two && choosen_major_three)
      ) {
        if (choosen_major_two)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["choosen_major_two"],
            message:
              "Universitas dan prodi tidak boleh sama dengan pilihan sebelumnya",
          });
        if (choosen_major_three)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["choosen_major_three"],
            message:
              "Universitas dan prodi tidak boleh sama dengan pilihan sebelumnya",
          });
      }
      if (
        (!choosen_university_two &&
          (!choosen_major_three || !choosen_university_three)) ||
        (choosen_major_two && !choosen_university_three)
      ) {
        return;
      }
      if (
        choosen_university_two &&
        (!choosen_university_one || !choosen_major_one)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["choosen_university_two"],
          message:
            "Lengkapi universitas dan prodi tujuan sebelumnya terlebih dahulu",
        });
      }
      if (choosen_university_two && !choosen_major_two) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["choosen_major_two"],
          message: "Prodi pilihan harus diisi",
        });
      }
      if (
        choosen_university_three &&
        (!choosen_university_two || !choosen_major_two)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["choosen_university_three"],
          message:
            "Lengkapi universitas dan prodi tujuan sebelumnya terlebih dahulu",
        });
      }
      if (choosen_university_three && !choosen_major_three) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["choosen_major_three"],
          message: "Prodi pilihan harus diisi",
        });
      }
    },
  );

export const SigninFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Silakan masukkan alamat email yang valid",
    })
    .refine((value) => value.length > 0, {
      message: "Email tidak boleh kosong",
    })
    .refine(
      (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
      {
        message: "Email tidak valid",
      },
    ),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export const onboardingFormSchema = z.object({
  full_name: z.string().min(1, "Nama lengkap diperlukan"),
  highschool: z.string().min(1, "Nama sekolah menengah atas diperlukan"),
  choosen_university_one: z
    .string()
    .min(1, "Pilih universitas yang ingin kamu tuju"),
  email: z.string().email({
    message: "Silakan masukkan alamat email yang valid",
  }),
  referral_code: z.string().optional(),
  source: z.string().min(1, "Sumber diperlukan"),
  choosen_major_one: z.string().min(1, "Pilih jurusan yang kamu inginkan"),
  highschool_year: z
    .string()
    .min(4, { message: "Tahun tidak valid" })
    .max(4, { message: "Tahun tidak valid" })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Tahun harus berupa angka saja",
    }),
  choosen_university_two: z.string(),
  choosen_major_two: z.string(),
  choosen_university_three: z.string(),
  choosen_major_three: z.string(),
  phone_number: phone_number,
});

export const UpdatePTNFormSchema = UniversitySelectionSchema;
export const EditAccountFormSchema = z.object({
  full_name: z.string().min(1, "Nama lengkap diperlukan").optional(),
  highschool: z
    .string()
    .min(1, "Nama sekolah menengah atas diperlukan")
    .optional(),
  phone_number: phone_number.optional(),
  profile_picture: z.string().optional(),
});

export const OnboardPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirm_password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  })
  .refine((value) => value.confirm_password === value.password, {
    message: "Password tidak sama",
    path: ["confirm_password"],
  });
