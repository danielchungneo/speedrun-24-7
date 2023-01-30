/**
 * TODO: REMOVE_ME
 * ! remove this entire file since DemoProvider will be gone
 */

import { DemoContext } from '@/providers/DemoProvider';
import { useContext } from 'react';

export default function useDemo() {
  const demo = useContext(DemoContext);

  return demo;
}
