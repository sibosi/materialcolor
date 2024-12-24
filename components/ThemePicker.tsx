"use client";
import React, { useEffect, useState } from "react";
import { hexFromArgb, Hct } from "@material/material-color-utilities";
import "./HuePicker.css";
import "./ChromaPicker.css";

const tones = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const loadTheme = (hue: number, chroma: number) => {
  const color = Hct.from(hue, chroma, 50).toInt();

  document.documentElement.style.setProperty(
    "--primary-hue",
    hexFromArgb(color)
  );
  document.documentElement.style.setProperty(
    "--currentColor",
    hexFromArgb(color)
  );
  document.documentElement.style.setProperty("--primary", hexFromArgb(color));
  tones.forEach((tone) => {
    document.documentElement.style.setProperty(
      `--primary-${tone}`,
      hexFromArgb(Hct.from(hue, chroma, 100 - tone / 10).toInt())
    );
  });

  return {
    color: hexFromArgb(color),
    tones: tones.map((tone) => hexFromArgb(tone)),
  };
};

export default function ThemePicker() {
  const [hue, setHue] = useState(45);
  const [chroma, setChroma] = useState(50);

  const currentColor = hexFromArgb(Hct.from(hue, chroma, 50).toInt());

  useEffect(() => {
    loadTheme(hue, chroma);
  }, [hue, chroma]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between">
        <div>
          <div className="flex items-center gap-4 my-3">
            <div
              className="rounded-full w-10 h-10 text-black flex items-center justify-center"
              style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
            >
              {hue}
            </div>
            <input
              title="Hue picker"
              type="range"
              className="hue-slider"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-4 my-3">
            <div
              className="rounded-full w-10 h-10 text-black flex items-center justify-center"
              style={{ backgroundColor: currentColor }}
            >
              {chroma}
            </div>
            <div className="flex items-center gap-4 my-3">
              <input
                title="Hue picker"
                type="range"
                className="chroma-slider"
                min="0"
                max="100"
                value={chroma}
                onChange={(e) => setChroma(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div
          className="w-32 h-32 rounded-lg shadow-lg "
          style={{ backgroundColor: currentColor }}
        >
          <div className="text-white text-center">{currentColor}</div>

          <div className="text-white text-center">
            {`hct(${hue}, ${chroma}%, 50%)`}
          </div>
        </div>
      </div>

      <div className="lg:flex flex-wrap gap-x-4 my-3">
        {tones.map((tone) => (
          <div
            key={tone}
            className={`rounded-lg shadow-lg overflow-hidden my-2 max-lg:flex gap-3 text-lg font-mono text-center lg:w-20 font-extrabold px-1`}
            style={{
              backgroundColor: hexFromArgb(
                Hct.from(hue, chroma, 100 - tone / 10).toInt()
              ),
              color:
                hexFromArgb(
                  Hct.from(hue, chroma, tone > 400 ? 80 : 20).toInt()
                ) ?? "black",
            }}
          >
            <p>{tone}</p>
            <p>{hexFromArgb(Hct.from(hue, chroma, 100 - tone / 10).toInt())}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
