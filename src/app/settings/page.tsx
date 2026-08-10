import SettingsPanel from "@/components/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">الإعدادات</h1>
        <p className="mt-1 text-sm text-muted">إدارة الحساب البنكي وتفضيلات الخصوصية</p>
      </div>
      <SettingsPanel />
    </div>
  );
}
