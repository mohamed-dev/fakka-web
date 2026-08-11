import { notFound } from "next/navigation";
import { CHARITY_CAUSES } from "@/lib/mock-data";
import CharityDetail from "@/components/CharityDetail";

export function generateStaticParams() {
  return CHARITY_CAUSES.map((cause) => ({ id: cause.id }));
}

export default function CharityDetailPage({ params }: { params: { id: string } }) {
  const cause = CHARITY_CAUSES.find((c) => c.id === params.id);

  if (!cause) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 md:gap-7">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">{cause.title}</h1>
        <p className="mt-1 text-sm text-muted">تفاصيل أثرك مع هذه الجهة</p>
      </div>
      <CharityDetail cause={cause} />
    </div>
  );
}
