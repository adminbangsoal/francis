"use client";
import { usePathname } from "next/navigation";
import MediaQuery from "react-responsive";
import withAuth from "../components/withAuth";
import { TOAside } from "./components/TOAside";
import { TryoutContextProviderV2 } from "./context/TryoutContextV2";
import { TryoutHistoryContextProvider } from "./context/TryoutHistoryContext";
import { TryoutOverviewContextProvider } from "./context/TryoutOverviewContext";

function TryOutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isToRegisPage = pathName.includes("/try-out/registration");
  return (
    <div>
      <TryoutOverviewContextProvider>
        <TryoutContextProviderV2>
          <TryoutHistoryContextProvider>
            <div className="flex w-full lg:min-h-screen lg:flex-row">
              {!isToRegisPage && (
                <MediaQuery minWidth={1024}>
                  <TOAside />
                </MediaQuery>
              )}
              <div className="hide-scrollbar grow lg:overflow-y-hidden">
                {children}
              </div>
            </div>
          </TryoutHistoryContextProvider>
        </TryoutContextProviderV2>
      </TryoutOverviewContextProvider>
    </div>
  );
}

export default withAuth(TryOutLayout);
