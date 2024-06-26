export const Spinner = () => {
  return (
    <div
      className="inline-block h-24 w-24 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] text-emerald-900 motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
