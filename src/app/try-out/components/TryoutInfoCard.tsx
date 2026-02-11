import Image from "next/image";

const TryoutInfoCard = () => {
  return (
    <div className="relative mb-3 max-w-xl rounded-2xl bg-[#064E3B33] px-5 py-4 text-white lg:max-w-2xl">
      <Image
        src="/illustrations/free.png"
        width={80}
        height={80}
        className="absolute -top-6 right-6"
        alt="free"
      />
      <h3 className="text-2xl font-600">Try Out Pro 1</h3>
      <div className="my-3 w-fit rounded-2xl bg-[#FFFFFF4D] bg-opacity-20 px-4 py-1 text-sm font-600">
        16 Maret 2024
      </div>
      <p className="font-500 text-emerald-100">
        Yuk jangan kelewatan dan segera ikuti Try Out pertama dari BangSoal!
        Soal Tryout diadaptasi dari soal-soal UTBK asli loh!! Yuk daftar{" "}
        <b>gratis</b> sekarang!
      </p>
    </div>
  );
};

export default TryoutInfoCard;
