export default function MerchantLogo({
  bg,
  text,
  size = 44,
}: {
  bg: string;
  text: string;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-card"
      style={{ backgroundColor: bg, width: size, height: size, fontSize: size * 0.36 }}
    >
      {text}
    </div>
  );
}
