"use client";

import { createContext } from "react";
import { MotionValue } from "framer-motion";

export type ScrollSequenceContextValue = {
  progress: MotionValue<number>;
  lockedProgress: MotionValue<number>;
  itemCount: number;
};

export const ScrollSequenceContext =
  createContext<ScrollSequenceContextValue | null>(null);
