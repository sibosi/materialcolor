import ThemePicker from "@/components/ThemePicker";

export default function Home() {
  return (
    <div className="bg-primary-300 rounded-2xl p-4 text-primary-800">
      <h1 className="text-center text-5xl mb-2 font-black">Material Palette</h1>
      <h2 className="text-center text-2xl mb-3">Pick a color!</h2>
      <ThemePicker />
    </div>
  );
}
