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
} from "./ActivityService";
import Toast, { ToastType } from "../components/Ui/Toast/Toast";
import { toast } from "react-toastify";
import { useMemo } from "react";

// EVENT QUERIES
export function useEventsAndCategories(userId) {
  const eventsQuery = useQuery({
    queryKey: ["events", userId],
    queryFn: () => fetchActivities(userId),
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load activities" />
      );
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories", userId],
    queryFn: () => fetchCategories(userId),
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load activities" />
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

export function useEventsQuery(userId) {
  return useQuery({
    queryKey: ["events", userId],
    queryFn: () => fetchActivities(userId),
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load activities" />
      );
    },
  });
}

export function useAddEventMutation(userId) {
  const queryClient = useQueryClient();
  return useMutation(addActivity, {
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries(["events", userId]);
      const previousEvents = queryClient.getQueryData(["events"]);
      queryClient.setQueryData(["events", userId], (old) => [...old, newEvent]);

      return { previousEvents };
    },
    onError: (err, newEvent, context) => {
      queryClient.setQueryData(["events", userId], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when adding activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", userId]);
    },
  });
}

export function useEditEventMutation(userId) {
  const queryClient = useQueryClient();
  return useMutation(editActivity, {
    onMutate: async ({ id, activity }) => {
      await queryClient.cancelQueries(["events", userId]);
      const previousEvents = queryClient.getQueryData(["events", userId]);
      queryClient.setQueryData(["events", userId], (old) =>
        old.map((event) =>
          event.id === id ? { ...event, ...activity } : event
        )
      );

      return { previousEvents };
    },
    onError: (err, { id, activity }, context) => {
      queryClient.setQueryData(["events", userId], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when updating activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", userId]);
    },
  });
}

export function useDeleteEventMutation(userId) {
  const queryClient = useQueryClient();
  return useMutation(deleteActivity, {
    onMutate: async (eventId) => {
      await queryClient.cancelQueries(["events", userId]);
      const previousEvents = queryClient.getQueryData(["events", userId]);
      queryClient.setQueryData(
        ["events", userId],
        previousEvents.filter((event) => event.id !== eventId)
      );
      return { previousEvents };
    },
    onError: (err, eventId, context) => {
      queryClient.setQueryData(["events", userId], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when deleting activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", userId]);
    },
  });
}

// CATEGORY QUERIES
export function useCategoriesQuery(userId) {
  return useQuery({
    queryKey: ["categories", userId],
    queryFn: () => fetchCategories(userId),
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load categories" />
      );
    },
  });
}

export function useAddCategoryMutation(userId) {
  const queryClient = useQueryClient();
  return useMutation(addCategory, {
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries(["categories", userId]);
      const previousCategories = queryClient.getQueryData([
        "categories",
        userId,
      ]);
      queryClient.setQueryData(["categories", userId], (old) => [
        ...old,
        newCategory,
      ]);
      return { previousCategories };
    },
    onError: (err, newCategory, context) => {
      queryClient.setQueryData(
        ["categories", userId],
        context.previousCategories
      );
      toast(
        <Toast type={ToastType.ERROR} message="Error when adding category" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["categories", userId]);
    },
  });
}

export function useEditCategoryMutation(userId) {
  const queryClient = useQueryClient();
  return useMutation(editCategory, {
    onMutate: async ({ id, category }) => {
      await queryClient.cancelQueries(["categories", userId]);
      const previousCategories = queryClient.getQueryData([
        "categories",
        userId,
      ]);
      queryClient.setQueryData(["categories", userId], (old) =>
        old.map((cat) => (cat.id === id ? { ...cat, ...category } : cat))
      );
      return { previousCategories };
    },
    onError: (err, { id, category }, context) => {
      queryClient.setQueryData(
        ["categories", userId],
        context.previousCategories
      );
      toast(
        <Toast type={ToastType.ERROR} message="Error when updating category" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["categories", userId]);
    },
  });
}

export function useDeleteCategoryMutation(userId) {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onMutate: async (categoryId) => {
      await queryClient.cancelQueries(["categories", userId]);
      const previousCategories = queryClient.getQueryData([
        "categories",
        userId,
      ]);
      queryClient.setQueryData(
        ["categories", userId],
        previousCategories.filter((cat) => cat.id !== categoryId)
      );
      return { previousCategories };
    },
    onError: (err, categoryId, context) => {
      queryClient.setQueryData(
        ["categories", userId],
        context.previousCategories
      );
      toast(
        <Toast type={ToastType.ERROR} message="Error when deleting category" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["categories", userId]);
    },
  });
}
