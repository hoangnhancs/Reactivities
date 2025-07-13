import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { FieldValues } from "react-hook-form";
import { useAccount } from "./useAccount";
import { toast } from "react-toastify";
import { useStore } from "./useStore";

export const useActivities = (id?: string) => {
  const {activityStore: {filter, startDate}} = useStore();
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();
  const location = useLocation();

  const {
    data: activitiesGroup,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PagedList<Activity, string>>({
    queryKey: ["activities", filter, startDate],
    queryFn: async ({ pageParam = null }) => {
      const response = await agent.get<PagedList<Activity, string>>( //string la next cursor khi tra ve o BE
        "/activities", //vi baseURL: import.meta.env.VITE_API_URL=https://localhost:5001/api
        {
          params: {
            cursor: pageParam,
            pageSize: 3,
            filter,
            startDate,
          },
        }
      );
      return response.data;
    },
    placeholderData: keepPreviousData,
    initialPageParam: null,
    getNextPageParam: (curentPage) => curentPage.nextCursor, //curent chính là kết quả của lần gọi API trước đó.
    enabled: !id && location.pathname === "/activities" && !!currentUser,
    select: (data) => ({
      //data la tat ca activities da~ tra ve
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map((activity) => {
          const host = activity.attendees.find((x) => x.id === activity.hostId);
          return {
            ...activity,
            isHost: currentUser?.id == activity.hostId,
            isGoing: activity.attendees.some((x) => x.id === currentUser?.id),
            hostImageUrl: host?.imageUrl,
          };
        }),
      })),
    }),
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      const host = data.attendees.find((x) => x.id === data.hostId);
      return {
        ...data,
        isHost: currentUser?.id == data.hostId,
        isGoing: data.attendees.some((x) => x.id === currentUser?.id),
        hostImageUrl: host?.imageUrl,
      };
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put(`/activities/${activity.id}`, activity);
    },
    onSuccess: async () => {
      toast.success("Update activity successful");
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: FieldValues) => {
      const response = await agent.post("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      toast.success("Create activity successful");
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
        //giúp đảm bảo dữ liệu mới nhất luôn được hiển thị.
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
        //giúp đảm bảo dữ liệu mới nhất luôn được hiển thị.
      });
    },
  });

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`activities/${id}/attend`);
    },
    onMutate: async (activityId: string) => {
      await queryClient.cancelQueries({ queryKey: ["activities", activityId] });
      //Hủy query đang chạy để tránh đè dữ liệu mới lên cache trong khi cập nhật
      const prevActivity = queryClient.getQueryData<Activity>([
        "activities",
        activityId,
      ]);
      //Lấy activity hiện tại từ cache để nếu có lỗi, ta có thể rollback lại
      queryClient.setQueryData<Activity>(
        ["activities", activityId],
        (oldActivity) => {
          if (!oldActivity || !currentUser) {
            return oldActivity;
          }

          const isHost = oldActivity.hostId === currentUser.id;
          const isAttending = oldActivity.attendees.some(
            (x) => x.id === currentUser.id
          );

          return {
            ...oldActivity,
            isCancelled: isHost
              ? !oldActivity.isCancelled
              : oldActivity.isCancelled,
            attendees: isAttending
              ? isHost
                ? oldActivity.attendees
                : oldActivity.attendees.filter((x) => x.id !== currentUser.id)
              : [
                  ...oldActivity.attendees,
                  {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    imageUrl: currentUser.imageUrl,
                  },
                ],
          };
        }
      );
      return { prevActivity };
    },
    onError: (error, activityId, context) => {
      console.log(error);
      if (context?.prevActivity) {
        queryClient.setQueryData(
          ["activities", activityId],
          context.prevActivity
        );
      }
    },
  });

  return {
    activitiesGroup,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
    updateAttendance,
  };
};
