import { Props } from "@/types";
import DashboardContent from "./DashboardContent";

export default function DashboardPage({ searchParams }: Props) {
  return <DashboardContent searchParams={searchParams} />;
}
