const LoaderComp = () => {
  return (
    <div className='fixed z-auto min-h-screen w-screen flex items-center justify-center bg-slate-800 bg-opacity-80'>
      <div className='relative'>
        <div className='h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200'></div>
        <div className='absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary-50 animate-spin'></div>
      </div>
    </div>
  );
};

export default LoaderComp;
