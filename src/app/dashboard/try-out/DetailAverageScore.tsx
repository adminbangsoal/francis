import { DUMMY_TO_AVG } from "../dummy";

export const DetailAverageScore = () => {
  const data = DUMMY_TO_AVG;
  return (
    <div>
      <p className="pb-2 text-2xl font-medium">Detail Average Score</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* {data.map((avgData, idx) => {
          return <AverageScoreCard key={idx} {...avgData} />;
        })} */}
      </div>
    </div>
  );
};
