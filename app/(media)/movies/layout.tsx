export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col px-4 sm:px-[10%] md:px-[15%] lg:px-[20%] xl:px-[25%] py-4">
      {children}
    </div>
  );
}
