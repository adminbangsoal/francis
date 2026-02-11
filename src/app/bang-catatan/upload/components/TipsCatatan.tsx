import Image from "next/image";
import Link from "next/link";

export const TipsCatatan = () => {
  return (
    <div className="hidden flex-col justify-between gap-4 px-20 pb-0 pt-12 lg:flex">
      <div className="flex flex-col gap-2">
        <p className="text-lg text-emerald-800">
          <i className="i-ph-sparkle-fill inline-block pr-1 align-middle" />
          <span className="inline-block align-middle">Tips</span>
        </p>
        <div className="rounded-xl bg-gradient-radial from-[#4F9C92]/50 via-[#6EF3AE]/50 to-[#6EF3AE]/50 px-5 pt-5 text-emerald-700">
          <p>
            Pastikan catatan kamu mudah dibaca! Kami merekomendasikan
            menggunakan aplikasi scanner di hp-mu seperti{" "}
            <Link
              href="https://www.adobe.com/id_en/acrobat/mobile/scanner-app.html"
              target="_blank"
              className="underline"
            >
              Adobe Scan
            </Link>{" "}
            atau{" "}
            <Link
              href="https://www.camscanner.com/"
              target="_blank"
              className="underline"
            >
              CamScanner
            </Link>{" "}
            untuk berbagi catatan dengan kualitas terbaik!
          </p>
          <div className="grid grid-cols-2 gap-2 pt-4">
            <div className="relative">
              <Image
                src={"/illustrations/bad-catatan.png"}
                alt={"Catatan Buruk"}
                width={200}
                height={180}
                className="w-full rounded-lg"
              />
              <Image
                src={"/illustrations/bad-emoji.svg"}
                alt={"Emoji Buruk"}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                width={40}
                height={40}
              />
            </div>
            <div className="relative">
              <Image
                src={"/illustrations/good-catatan.png"}
                alt={"Catatan Baik"}
                className="w-full rounded-lg"
                width={200}
                height={180}
              />
              <Image
                src={"/illustrations/good-emoji.svg"}
                alt={"Emoji Baik"}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-lg text-emerald-800">
          <i className="i-ph-sparkle-fill inline-block pr-1 align-middle" />
          <span className="inline-block align-middle">Tips</span>
        </p>
        <div className="rounded-xl bg-gradient-to-r from-[#6EF3AE]/50 via-[#6EF3AE]/50 to-[#4F9C92]/40 p-5 text-emerald-700">
          <p>
            Kamu dapat mengubah catatan PDF-mu menjadi thumbnail dengan mudah
            menggunakan alat online seperti{" "}
            <Link
              href="https://www.ilovepdf.com/"
              className="underline"
              target="_blank"
            >
              iLovePDF
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
