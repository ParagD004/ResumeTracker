"use client";

import {
  useAuth,
  // useUser
} from "@clerk/nextjs";

export const Counter = () => {
  const {
    isLoaded,
    userId,
  } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }
  return (
    <>
    </>
  );
};