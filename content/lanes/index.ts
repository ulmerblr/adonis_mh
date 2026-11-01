import type { LaneKey } from '@/lib/library';
import type { LaneStory } from './types';
import trt from './trt.json';
import weight from './weight.json';
import recovery from './recovery.json';
import vitality from './vitality.json';
import energy from './energy.json';
import brain from './brain.json';
import sleep from './sleep.json';
import hairLoss from './hair-loss.json';
import skin from './skin.json';
import longevity from './longevity.json';

/** The ten stories, one per lane (the rule: exactly one story per lane at any time). Home's cover shows one of them (content/cover.ts). */
export const STORIES: Record<LaneKey, LaneStory> = {
  trt: trt as LaneStory,
  weight: weight as LaneStory,
  recovery: recovery as LaneStory,
  vitality: vitality as LaneStory,
  energy: energy as LaneStory,
  brain: brain as LaneStory,
  sleep: sleep as LaneStory,
  'hair-loss': hairLoss as LaneStory,
  skin: skin as LaneStory,
  longevity: longevity as LaneStory,
};
