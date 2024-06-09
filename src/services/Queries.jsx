import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import {
  addActivity,
  deleteActivity,
  editActivity,
  fetchActivities,
  addCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
  fetchActivitiesByState,
} from "./ActivityService";
import Toast, { ToastType } from "../components/Ui/Toast/Toast";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { queryKeys } from "./QueryKeys";



// EVENT QUERIES
export function useEventsAndCategories() {
  const eventsQuery = useQuery({
    queryKey: [queryKeys.EVENTS],
    queryFn: fetchActivities,
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load activities" />
      );
    },
  });

  const categoriesQuery = useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: fetchCategories,
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load categories" />
      );
    },
  });

  const combinedData = useMemo(() => {
    if (eventsQuery.data && categoriesQuery.data) {
      const categoriesById = categoriesQuery.data.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
      }, {});

      return eventsQuery.data.map((event) => ({
        ...event,
        category: categoriesById[event.category],
      }));
    }
  }, [eventsQuery.data, categoriesQuery.data]);

  return {
    isLoading: eventsQuery.isLoading || categoriesQuery.isLoading,
    isError: eventsQuery.isError || categoriesQuery.isError,
    data: combinedData,
    categories: categoriesQuery.data,
  };
}

export function useEventsQuery() {
  return useQuery({
    queryKey: [queryKeys.EVENTS],
    queryFn: fetchActivities,
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load activities" />
      );
    },
  });
}

export function useAddEventMutation() {
  const queryClient = useQueryClient();
  return useMutation(addActivity, {
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries([queryKeys.EVENTS]);
      const previousEvents = queryClient.getQueryData([queryKeys.EVENTS]);
      queryClient.setQueryData([queryKeys.EVENTS], (old) => [...old, newEvent]);

      return { previousEvents };
    },
    onError: (err, newEvent, context) => {
      queryClient.setQueryData([queryKeys.EVENTS], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when adding activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.EVENTS]);
      queryClient.invalidateQueries([queryKeys.EVENTS_BY_STATE]);
    },
  });
}

export function useEditEventMutation() {
  const queryClient = useQueryClient();
  return useMutation(editActivity, {
    onMutate: async ({ id, activity }) => {
      await queryClient.cancelQueries([queryKeys.EVENTS]);
      const previousEvents = queryClient.getQueryData([queryKeys.EVENTS]);
      queryClient.setQueryData([queryKeys.EVENTS], (old) =>
        old.map((event) =>
          event.id === id ? { ...event, ...activity } : event
        )
      );

      return { previousEvents };
    },
    onError: (err, { id, activity }, context) => {
      queryClient.setQueryData([queryKeys.EVENTS], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when updating activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.EVENTS]);
      queryClient.invalidateQueries([queryKeys.EVENTS_BY_STATE]);
    },
  });
}

export function useDeleteEventMutation() {
  const queryClient = useQueryClient();
  return useMutation(deleteActivity, {
    onMutate: async (eventId) => {
      await queryClient.cancelQueries([queryKeys.EVENTS]);
      await queryClient.cancelQueries([queryKeys.CURRENT_ACTIVITIES]);
      const previousEvents = queryClient.getQueryData([queryKeys.EVENTS]);
      queryClient.setQueryData(
        [queryKeys.EVENTS],
        previousEvents.filter((event) => event.id !== eventId)
      );
      return { previousEvents };
    },
    onError: (err, eventId, context) => {
      queryClient.setQueryData([queryKeys.EVENTS], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when deleting activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.EVENTS]);
      queryClient.invalidateQueries([queryKeys.EVENTS_BY_STATE]);
    },
  });
}

export function useGetEventsByState(state, count) {
  return useQuery({
    queryKey: [queryKeys.EVENTS_BY_STATE, state, count],
    queryFn: () => fetchActivitiesByState(state, count),
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load activities" />
      );
    },
  });
}

// CATEGORY QUERIES
export function useCategoriesQuery() {
  return useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: fetchCategories,
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load categories" />
      );
    },
  });
}

export function useAddCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation(addCategory, {
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries([queryKeys.CATEGORIES]);
      const previousCategories = queryClient.getQueryData([queryKeys.CATEGORIES]);
      queryClient.setQueryData([queryKeys.CATEGORIES], (old) => [
        ...old,
        newCategory,
      ]);
      return { previousCategories };
    },
    onError: (err, newCategory, context) => {
      queryClient.setQueryData(
        [queryKeys.CATEGORIES],
        context.previousCategories
      );
      toast(
        <Toast type={ToastType.ERROR} message="Error when adding category" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.CATEGORIES]);
    },
  });
}

export function useEditCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation(editCategory, {
    onMutate: async ({ id, category }) => {
      await queryClient.cancelQueries([queryKeys.CATEGORIES]);
      const previousCategories = queryClient.getQueryData([queryKeys.CATEGORIES]);
      queryClient.setQueryData([queryKeys.CATEGORIES], (old) =>
        old.map((cat) => (cat.id === id ? { ...cat, ...category } : cat))
      );
      return { previousCategories };
    },
    onError: (err, { id, category }, context) => {
      queryClient.setQueryData(
        [queryKeys.CATEGORIES],
        context.previousCategories
      );
      toast(
        <Toast type={ToastType.ERROR} message="Error when updating category" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.CATEGORIES]);
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onMutate: async (categoryId) => {
      await queryClient.cancelQueries([queryKeys.CATEGORIES]);
      const previousCategories = queryClient.getQueryData([queryKeys.CATEGORIES]);
      queryClient.setQueryData(
        [queryKeys.CATEGORIES],
        previousCategories.filter((cat) => cat.id !== categoryId)
      );
      return { previousCategories };
    },
    onError: (err, categoryId, context) => {
      queryClient.setQueryData(
        [queryKeys.CATEGORIES],
        context.previousCategories
      );
      toast(
        <Toast type={ToastType.ERROR} message="Error when deleting category" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.CATEGORIES]);
    },
  });
}
