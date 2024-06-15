import React, { useEffect, useRef } from "react";

interface SpanGensInterface {
  title: string;
  fontSize?: number;
  separacion?: number;
  rotation?: number;
  transformsec?: number;
  transformdelay?: number;
  SpanStyle?: React.CSSProperties;
  DivStyle?: React.CSSProperties;
}

const SpanGens: React.FC<SpanGensInterface> = ({
  title,
  fontSize = 15,
  separacion = 1,
  rotation = 90,
  transformsec = 4,
  transformdelay = 1,
  SpanStyle,
  DivStyle,
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
      span.style.marginLeft = `${Separate}px`;
    });
  }, []);

  const widthText = title.length*fontSize*separacion;
  const width = window.innerWidth;

  const ToReturn = (
    <div
      ref={divRef}
      style={{
        position: "relative",
        display: 'grid',
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        width: `${widthText}px`,
        minHeight: 40,
        height: `${40 * widthText%width}`,
        transform: `rotate(${rotation}deg)`,
        transition: `transform ${transformsec}s ease`,
        ...DivStyle,
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
              marginLeft: `0px`,
              width: fontSize,
              fontSize: fontSize,

              transition: `transform ${propsTransition}, margin ${propsTransition}`,
              transform: `rotate(${rotation}deg)`,

              ...SpanStyle,
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
