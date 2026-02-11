interface EmptyPlaceholderI {
  message?: string;
}
export const EmptyPlaceholder = ({ message }: EmptyPlaceholderI) => {
  return (
    <div className="min-h-4/5 flex flex-col items-center justify-center gap-2">
      <img
        src={"/illustrations/empty-state.svg"}
        width={400}
        height={400}
        alt="Empty state"
      />
      <p className="text-lg text-gray-400">{message}</p>
    </div>
  );
};
