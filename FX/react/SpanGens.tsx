import React, { useEffect, useRef } from "react";

interface SpanGensInterface {
  title: string;
  fontSize?: number;
  separacion?: number;
  rotation?: number;
  transformsec?: number;
  transformdelay?: number;
}

const SpanGens: React.FC<SpanGensInterface> = ({
  title,
  fontSize = 20,
  separacion = 1,
  rotation = 90,
  transformsec = 4,
  transformdelay = 1,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const divRefCurrent = divRef.current;
    const spanRefCurrent = spanRefs.current;

    if (!divRefCurrent || !spanRefCurrent) {
      console.error(
        `divRefCurrent: ${divRefCurrent} || spanRefCurrent: ${spanRefCurrent} no fueron encontrados`
      );
      console.error(divRefCurrent);
      console.error(spanRefCurrent);

      return;
    }

    divRefCurrent.style.transform = "rotate(0deg)";

    spanRefCurrent.forEach((span, i) => {
      if (!span) return;
      const Separate = i * fontSize * separacion;

      span.style.transform = "rotate(0deg)";
      span.style.margin = `0px ${Separate}px`;
    });
  }, []);

  const ToReturn = (
    <div
      ref={divRef}
      style={{
        position: "relative",
        textAlign: "center",
        transform: `rotate(${rotation}deg)`,
        transition: `transform ${transformsec}s ease`
      }}
    >
      {title.split("").map((title, i) => {
        const propsTransition = `${transformsec}s ${transformdelay+i*0.05}s ease`

        return (
          <span
            ref={(el) => {(spanRefs.current[i] = el )}}
            key={i}
            style={{
              position: "absolute",
              margin: `0px 0px`,
              width: fontSize,
              fontSize: fontSize,

              transition: `transform ${propsTransition}, margin ${propsTransition}`,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {title}
          </span>
        );
      })}
    </div>
  );

  return ToReturn;
};

export { SpanGens };
