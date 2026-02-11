import { copyToClipboard } from "@/lib/utils";

export const ReferralCode = ({ referalCode }: { referalCode: string }) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-purple-100 bg-violet-50 p-4">
      <div>
        <p className="text-lg">Kode Referral</p>
        <p className="text-xs">
          Undang temanmu menggunakan kode ini dan dapatkan point tambahan!
        </p>
      </div>

      <div className="mx-auto flex flex-row items-center justify-center gap-3 rounded-full bg-violet-200 p-2">
        <p className="ml-3 text-xl">#{referalCode}</p>
        <button
          className="w-20 rounded-full bg-violet-600 p-2 text-white"
          onClick={() => {
            // Mixpanel.track("Clicked Copy Referral Code");
            copyToClipboard(referalCode);
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
};
