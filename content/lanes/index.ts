import type { LaneKey } from '@/lib/library';
import type { LaneStory } from './types';
import trt from './trt.json';
import weight from './weight.json';

/** The lane stories written so far. A lane without one keeps its earlier page until its story is added here. */
export const STORIES: Partial<Record<LaneKey, LaneStory>> = {
  trt: trt as LaneStory,
  weight: weight as LaneStory,
};
