import CharityImpact from "@/components/CharityImpact";

export default function CharityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">الأثر الخيري</h1>
        <p className="mt-1 text-sm text-muted">شاهد كيف تتحول فكتك إلى أثر ملموس على أرض الواقع</p>
      </div>
      <CharityImpact />
    </div>
  );
}
