import { useEffect, useRef } from 'react';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useSeedInitialData() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const hasSeeded = useRef(false);

  useEffect(() => {
    if (!actor || !identity || hasSeeded.current) return;

    const seedData = async () => {
      try {
        await actor.seedInitialData();
        hasSeeded.current = true;
      } catch (error) {
        // Silently fail if already seeded or not admin
        console.log('Seed data info:', error);
      }
    };

    seedData();
  }, [actor, identity]);
}
