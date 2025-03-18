import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { FieldValues } from "react-hook-form";
import { useAccount } from "./useAccount";
import { toast } from "react-toastify";



export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const {currentUser} = useAccount();
  const location = useLocation();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>(
        "/activities" //vi baseURL: import.meta.env.VITE_API_URL
        // =https://localhost:5001/api
      );
      return response.data;
    },
    enabled: !id && location.pathname === "/activities" && !!currentUser,
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put("/activities", activity);
    },
    onSuccess: async () => {
      toast.success("Update activity successful")
      await queryClient.invalidateQueries({
        queryKey: ["activities"]    
      });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: FieldValues) => {
      const response = await agent.post("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      toast.success("Create activity successful")
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

  return {
    activities,
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
