import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonLoaderProps {
  count: number;
  height: number;
}

const SkeletonLoader = ({ count, height }: SkeletonLoaderProps) => {
  return <Skeleton count={count} height={height} />;
};

export default SkeletonLoader;
