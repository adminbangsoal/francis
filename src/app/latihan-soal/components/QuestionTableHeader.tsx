const QuestionTableHeader = (): JSX.Element => {
  return (
    <thead>
      <tr className="pb-5">
        <th className="pb-5 text-left">
          <span className="mr-2 text-base font-bold text-gray-700">
            Pernyataan
          </span>
          <span className="hidden text-base font-bold text-gray-400 md:inline">
            (Pilih benar/salah pada tiap baris pernyataan)
          </span>
        </th>
        <th className="px-2 pb-5 text-center text-base font-bold text-emerald-700">
          Benar
        </th>
        <th className="px-2 pb-5 text-center text-base font-bold text-rose-700">
          Salah
        </th>
      </tr>
    </thead>
  );
};

export default QuestionTableHeader;
