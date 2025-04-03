import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const verifyEmail = useMutation({
    mutationFn: async ({userId, code}: {userId: string, code: string}) => {
      await agent.get(`/confirmEmail?userId=${userId}&code=${code}`) //microsoft endpoint to verify email, check in program.cs
    }
  })

  const resendConfirmationEmail = useMutation({
    mutationFn: async (email: string) => {
      await agent.get(`/account/resendConfirmEmail?email=${email}`)
    },

  })

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await agent.get<User>("account/user-info");
      return response.data;
    },
    enabled: !queryClient.getQueryData(["user"]),
  });

  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      await agent.post("/login?useCookies=true", creds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const registerUser = useMutation({
    mutationFn: async (creds: RegisterSchema) => {
      await agent.post("account/register", creds);
    },
    onSuccess: () => {
      toast.success("Register successful - You can now login");
      // navigate("/login");
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["activities"] });
      navigate("/");
    },
  });

  return {
    loginUser,
    currentUser,
    logoutUser,
    loadingUserInfo,
    registerUser,
    verifyEmail,
    resendConfirmationEmail,
  };
};
