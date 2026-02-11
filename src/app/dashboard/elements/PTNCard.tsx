interface PTNCardI {
  university?: string;
  major?: string;
  order: number;
}
export const PTNCard = ({ university, major, order }: PTNCardI) => {
  return (
    <>
      <div className="col-span-3 -mr-5 flex flex-col leading-tight">
        <p className="font-bold">{university}</p>
        <p>{major}</p>
      </div>
      <div className="col-span-1 flex w-full flex-row justify-end gap-1 px-2">
        <p className="text-4xl font-bold">{order}</p>
      </div>
    </>
  );
};
