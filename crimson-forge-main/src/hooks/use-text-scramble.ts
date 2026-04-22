import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function useTextScramble(target: string, duration = 1800) {
  const [text, setText] = useState("");

  useEffect(() => {
    let raf = 0;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    const length = Math.max(target.length, text.length);
    for (let i = 0; i < length; i++) {
      const from = text[i] || "";
      const to = target[i] || "";
      const start = Math.floor(Math.random() * totalFrames * 0.4);
      const end = start + Math.floor(Math.random() * totalFrames * 0.6);
      queue.push({ from, to, start, end });
    }

    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame >= q.end) {
          complete++;
          output += q.to;
        } else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += q.char;
        } else {
          output += q.from;
        }
      }
      setText(output);
      if (complete === queue.length) return;
      frame++;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return text || target;
}
