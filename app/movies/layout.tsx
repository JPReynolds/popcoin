export const metadata = {
    title: "Popcoin - Movies",
  };
  
  export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex-1 flex flex-col px-[15%]">
        {children}
      </div>
    );
  }
  