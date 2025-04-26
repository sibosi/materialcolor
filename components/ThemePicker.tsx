"use client";
import React, { useEffect, useState } from "react";
import { hexFromArgb, Hct } from "@material/material-color-utilities";
import "./HuePicker.css";
import "./ChromaPicker.css";
import Input from "./ui/Input";

const tones = [20, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const hexToRgb = (hex: string) => {
  const clean = hex.replace(/^#/, "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

// convert {r,g,b} in [0..255] to {h,s,l}
const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

// full helper
const hexToHslString = (hex: string) => {
  const rgb = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(rgb);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const loadTheme = (hue: number, chroma: number) => {
  const color = Hct.from(hue, chroma, 50).toInt();

  document.documentElement.style.setProperty(
    "--selfprimary-hue",
    hexFromArgb(color),
  );
  document.documentElement.style.setProperty(
    "--currentColor",
    hexFromArgb(color),
  );
  document.documentElement.style.setProperty(
    "--selfprimary",
    hexFromArgb(color),
  );
  tones.forEach((tone) => {
    document.documentElement.style.setProperty(
      `--selfprimary-${tone}`,
      hexFromArgb(Hct.from(hue, chroma, 100 - tone / 10).toInt()),
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
  const [colorName, setColorName] = useState("primary");

  const currentColor = hexFromArgb(Hct.from(hue, chroma, 50).toInt());

  useEffect(() => {
    loadTheme(hue, chroma);
  }, [hue, chroma]);

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-2">
        <div>
          <div className="my-3 flex items-center gap-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-black"
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

          <div className="my-3 flex items-center gap-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-black"
              style={{ backgroundColor: currentColor }}
            >
              {chroma}
            </div>
            <div className="my-3 flex items-center gap-4">
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
          className="h-32 w-32 rounded-lg shadow-lg"
          style={{ backgroundColor: currentColor }}
        >
          <div className="text-center text-white">{currentColor}</div>

          <div className="text-center text-white">
            {`hct(${hue}, ${chroma}%, 50%)`}
          </div>
        </div>
      </div>

      <div className="my-3 flex-wrap gap-x-4 lg:flex">
        <div
          className={`my-2 gap-3 overflow-hidden rounded-lg px-1 text-center font-mono text-lg font-extrabold shadow-lg max-lg:flex lg:w-20`}
          style={{
            backgroundColor: hexFromArgb(Hct.from(hue, chroma, 50).toInt()),
            color: hexFromArgb(Hct.from(hue, chroma, 80).toInt()) ?? "black",
          }}
        >
          <p>Tone</p>
          <p>Hex</p>
          <p>HCT</p>
          <p>HSL</p>
        </div>
        {tones.map((tone) => (
          <div
            key={tone}
            className={`my-2 gap-3 overflow-hidden rounded-lg px-1 text-center font-mono text-lg font-extrabold shadow-lg max-lg:flex lg:w-20`}
            style={{
              backgroundColor: hexFromArgb(
                Hct.from(hue, chroma, 100 - tone / 10).toInt(),
              ),
              color:
                hexFromArgb(
                  Hct.from(hue, chroma, tone > 400 ? 80 : 20).toInt(),
                ) ?? "black",
            }}
          >
            <p>{tone}</p>
            <p>{hexFromArgb(Hct.from(hue, chroma, 100 - tone / 10).toInt())}</p>
            <p>{`hct(${hue}, ${chroma}%, ${100 - tone / 10})`}</p>
            <p>
              {hexToHslString(
                hexFromArgb(Hct.from(hue, chroma, 100 - tone / 10).toInt()),
              )}
            </p>
          </div>
        ))}
      </div>

      <Input
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
        className="my-3 w-1/2"
        placeholder="primary"
      />

      <div className="my-3 flex flex-col overflow-hidden rounded-lg bg-selfprimary-900 font-mono text-selfprimary-100">
        <span>{":root.light {"}</span>
        <span>{`  --lightness-bg: 100%;`}</span>
        <span>{`  --lightness-cont: 0%;`}</span>
        <span>
          {`  --color-${colorName}: ${hexFromArgb(
            Hct.from(hue, chroma, 50).toInt(),
          )};`}
        </span>
        <span>
          {`  --color-${colorName}-bg: ${hexFromArgb(
            Hct.from(hue, chroma, 100).toInt(),
          )};`}
        </span>
        <span>
          {`  --color-${colorName}-cont: ${hexFromArgb(
            Hct.from(hue, chroma, 0).toInt(),
          )};`}
        </span>
        {tones.map((tone) => (
          <span key={tone}>
            {`  --color-${colorName}-${tone}: ${hexFromArgb(
              Hct.from(hue, chroma, 100 - tone / 10).toInt(),
            )};`}
          </span>
        ))}
        <span>{`}`}</span>
        <br />
        <span>{":root.dark {"}</span>
        <span>{`  --lightness-bg: 0%;`}</span>
        <span>{`  --lightness-cont: 100%;`}</span>
        <span>
          {`  --color-${colorName}: ${hexFromArgb(
            Hct.from(hue, chroma, 50).toInt(),
          )};`}
        </span>
        <span>
          {`  --color-${colorName}-bg: ${hexFromArgb(
            Hct.from(hue, chroma, 0).toInt(),
          )};`}
        </span>
        <span>
          {`  --color-${colorName}-cont: ${hexFromArgb(
            Hct.from(hue, chroma, 100).toInt(),
          )};`}
        </span>
        {tones.map((tone) => (
          <span key={tone}>
            {`  --color-${colorName}-${tone}: ${hexFromArgb(
              Hct.from(hue, chroma, tone / 10).toInt(),
            )};`}
          </span>
        ))}
        <span>{`}`}</span>
      </div>
    </div>
  );
}

{
  /**
  
  :root.light {
  /* Hue érték (H) 
  --color-primary: hsl(200, 74%, 40%);
  --color-primary-bg: hsl(207, 0%, 100%);
  --color-primary-cont: hsl(207, 92%, 0%);
  --color-primary-20: hsl(207, 92%, 98%);
  --color-primary-50: hsl(207, 92%, 95%);
  --color-primary-100: hsl(207, 100%, 89%);
  --color-primary-200: hsl(205, 100%, 77%);
  --color-primary-300: hsl(203, 75%, 64%);
  --color-primary-400: hsl(202, 58%, 53%);
  --color-primary-500: hsl(200, 74%, 40%);
  --color-primary-600: hsl(198, 100%, 28%);
  --color-primary-700: hsl(198, 100%, 21%);
  --color-primary-800: hsl(199, 100%, 15%);
  --color-primary-900: hsl(201, 100%, 9%);
}

:root.dark {
  --lightness-bg: 0%;
  --lightness-cont: 100%;

  --color-primary: hsl(200, 74%, 40%);
  --color-primary-bg: hsl(207, 0%, 0%);
  --color-primary-cont: hsl(207, 92%, 100%);
  --color-primary-20: hsl(207, 92%, 2%);
  --color-primary-50: hsl(207, 92%, 5%);
  --color-primary-100: hsl(201, 100%, 9%);
  --color-primary-200: hsl(199, 100%, 15%);
  --color-primary-300: hsl(198, 100%, 21%);
  --color-primary-400: hsl(198, 100%, 28%);
  --color-primary-500: hsl(200, 74%, 40%);
  --color-primary-600: hsl(202, 58%, 53%);
  --color-primary-700: hsl(203, 75%, 64%);
  --color-primary-800: hsl(205, 100%, 77%);
  --color-primary-900: hsl(207, 100%, 89%);  
  
  */
}
