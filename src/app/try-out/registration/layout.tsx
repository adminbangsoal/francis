interface TryoutLayoutProps {
  children: React.ReactNode;
}

const TryoutLayout = ({ children }: TryoutLayoutProps) => {
  return (
    <div className="min-h-screen bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center pt-20 lg:flex lg:flex-col lg:items-center lg:bg-white">
      {children}
    </div>
  );
};
export default TryoutLayout;
