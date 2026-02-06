import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MenuItem, MenuCategory, Review } from '../backend';

export function useGetAllMenuCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<MenuCategory[]>({
    queryKey: ['menuCategories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMenuCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMenuItemsByCategory(categoryId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<MenuItem[]>({
    queryKey: ['menuItems', categoryId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItemsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching && !!categoryId,
  });
}

export function useGetSpecialMenuItems() {
  const { actor, isFetching } = useActor();

  return useQuery<MenuItem[]>({
    queryKey: ['specialMenuItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSpecialMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllReviews() {
  const { actor, isFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}
