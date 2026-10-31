import type { LaneKey } from '@/lib/library';
import type { LaneStory } from './types';
import trt from './trt.json';
import weight from './weight.json';
import recovery from './recovery.json';
import vitality from './vitality.json';
import energy from './energy.json';
import sleep from './sleep.json';
import hairLoss from './hair-loss.json';
import skin from './skin.json';
import longevity from './longevity.json';

/** The nine stories, one per lane (the rule: exactly one story per lane at any time). Home's cover shows one of them (content/cover.ts). */
export const STORIES: Record<LaneKey, LaneStory> = {
  trt: trt as unknown as LaneStory,
  weight: weight as unknown as LaneStory,
  recovery: recovery as unknown as LaneStory,
  vitality: vitality as unknown as LaneStory,
  energy: energy as unknown as LaneStory,
  sleep: sleep as unknown as LaneStory,
  'hair-loss': hairLoss as unknown as LaneStory,
  skin: skin as unknown as LaneStory,
  longevity: longevity as unknown as LaneStory,
};
