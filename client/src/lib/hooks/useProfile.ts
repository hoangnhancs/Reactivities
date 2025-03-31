import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo, useState } from "react";
import { ProfileSchema } from "../schemas/profileSchema";

export const useProfile = (id?: string, predicate?: string) => {

    const queryClient = useQueryClient();
    const [filter, setFilter] = useState<string | null>(null);

    const {data: userActivities, isLoading: loadingUserActivities} = useQuery<Activity []>({
        queryKey: ['user-activities', id, filter],
        queryFn: async () => {
            const response = await agent.get<Activity[]>(
              `profiles/${id}/activities`,
              {
                params: {
                  filter,
                },
              }
            );
            return response.data;
        },
        enabled: !!id && !!filter
    })
    
    const {data: profile, isLoading: loadingProfile} = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profiles/${id}`);
            return response.data;
        },
        enabled: !!id && !predicate
    })

    const {data: photos, isLoading: loadingPhotos} = useQuery<Photo[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
            return response.data;
        },
        enabled: !!id && !predicate
    })
    //dua vao day ma update profile card
    const {data: followings, isLoading: loadingFollowings} = useQuery<Profile[]>({
        queryKey: ['followings', id, predicate],
        queryFn: async () => {
            const response = await agent.get<Profile[]>(`profiles/${id}/follow-list?predicate=${predicate}`)
            return response.data;
        },
        enabled: !!id && !!predicate
    })

    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post('profiles/add-photo', formData, {
                headers: {'Content-Type': 'multipart/formdata'}
            })
            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryClient.invalidateQueries({
                queryKey: ['photos', id]
            });
            queryClient.setQueryData(['user'], (data: User) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            })
            queryClient.setQueryData(['profile', id], (data: Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            })
        }
    })

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`profiles/${photo.id}/setMain`)
        },
        onSuccess: (_, photo) => {
            queryClient.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;
                return {
                    ...userData,
                    imageUrl: photo.url,
                }
            })
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile) return profile;
                return {
                    ...profile,
                    imageUrl: photo.url,
                }
            })
        }
    })

    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/profiles/${photoId}/photos`)
        }, 
        onSuccess: (_, photoId) => {
            queryClient.setQueryData(['photos', id], (photos: Photo[]) => {
                return photos.filter(x => x.id !== photoId)
            })
        }
    })

    const updateProfile = useMutation({
        mutationFn: async (profile: ProfileSchema) => {
            await agent.put(`/profiles/update`, profile)
        },
        onSuccess: (_, profile) => {
            queryClient.setQueryData(['profile', id], (data: Profile) => {
                if (!profile) return profile;
                return {
                    ...data,
                    displayName: profile.displayName,
                    bio: profile.bio
                }
            })
            queryClient.setQueryData(['user'], (userData: User) => {
                if (!profile) return profile;
                return {
                    ...userData,
                    displayName: profile.displayName,
                }
            })
        }
    })

    const updateFollowing = useMutation({
        mutationFn: async () => {
            await agent.post(`profiles/${id}/follow`)
        },
        onSuccess: () => {
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                
                if (!profile || profile.followersCount === undefined) return profile;
                return {
                    ...profile,
                    following: !profile.following,
                    followersCount: profile.following 
                        ? profile.followersCount - 1
                        : profile.followersCount + 1
                }
            })
            queryClient.invalidateQueries({
                queryKey: ["followings", id, "followers"],
            });
            queryClient.invalidateQueries({
                queryKey: ["followings", id, "followings"],
            });
        }
    })

    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
        //lay user trong cache
        //kiem tra xem nguoi dang login, 
        //khi check profile nguoi khac se k add duoc hinh
    }, [id, queryClient])

    return {
      profile,
      loadingProfile,
      photos,
      loadingPhotos,
      isCurrentUser,
      uploadPhoto,
      setMainPhoto,
      deletePhoto,
      updateProfile,
      updateFollowing,
      followings,
      loadingFollowings,
      userActivities,
      loadingUserActivities,
      setFilter,
      filter,
    };
};
