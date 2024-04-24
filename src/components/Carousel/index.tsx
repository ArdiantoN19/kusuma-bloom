"use client";

import React, {
  Children,
  FunctionComponent,
  ReactNode,
  useCallback,
} from "react";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface CarouselProps {
  children: ReactNode;
}

const Carousel: FunctionComponent<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const components = Children.toArray(children);

  const onNextHandler = useCallback(() => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    setCurrentIndex(0);
  }, [currentIndex, components]);

  const onPrevHandler = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      return;
    }
    setCurrentIndex(components.length - 1);
  }, [currentIndex, components]);

  return (
    <div className="relative">
      {components[currentIndex]}
      <button
        onClick={onPrevHandler}
        className="block absolute top-1/2 -translate-y-1/2 left-2 p-2 w-8 h-8 border rounded-full text-white z-[2] hover:bg-black/50 disabled:cursor-default disabled:bg-transparent bg-slate-50/30"
      >
        <ArrowLeft size={16} weight="bold" />
      </button>
      <button
        onClick={onNextHandler}
        className="block absolute top-1/2 -translate-y-1/2 right-2 p-2 w-8 h-8 border rounded-full text-white z-[2] hover:bg-black/50 disabled:cursor-default disabled:bg-transparent bg-slate-50/30"
      >
        <ArrowRight size={16} weight="bold" />
      </button>
    </div>
  );
};

export default Carousel;
