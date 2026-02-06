import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';

interface CreateReservationParams {
  fullName: string;
  phoneNumber: string;
  date: Date;
  time: string;
  numberOfGuests: number;
  notes: string | null;
}

export function useCreateReservation() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: CreateReservationParams) => {
      if (!actor) throw new Error('Actor not available');
      
      const dateTimestamp = BigInt(params.date.getTime() * 1_000_000);
      
      return actor.createReservation(
        params.fullName,
        params.phoneNumber,
        dateTimestamp,
        params.time,
        BigInt(params.numberOfGuests),
        params.notes
      );
    },
  });
}
