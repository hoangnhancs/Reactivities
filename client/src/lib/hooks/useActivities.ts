import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import agent from "../api/agent";

export const useActivities = () => {
    const queryClient = useQueryClient();

    const { data: activities, isPending } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
        const response = await agent.get<Activity[]>(
          "/activities" //vi baseURL: import.meta.env.VITE_API_URL
                        // =https://localhost:5001/api
        );
        return response.data;
        },
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ["activities"],
              //giúp đảm bảo dữ liệu mới nhất luôn được hiển thị.
            });
        }
    })

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
        await agent.post("/activities", activity);
        },
        onSuccess: async () => {
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
        isPending,
        updateActivity,
        createActivity,
        deleteActivity
    }
}