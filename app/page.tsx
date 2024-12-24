import Guide from "@/components/Guide";
import ThemePicker from "@/components/ThemePicker";

export default function Home() {
  return (
    <div className="rounded-2xl bg-primary-300 p-4 text-primary-800">
      <h1 className="mb-2 text-center text-5xl font-black">Material Palette</h1>
      <h2 className="mb-3 text-center text-2xl">Pick a color!</h2>
      <ThemePicker />
      <Guide />
    </div>
  );
}
