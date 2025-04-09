import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";
import { ChangePasswordSchema } from "../schemas/changePasswordSchema";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await agent.get<User>("account/user-info");
      return response.data;
    },
    enabled: !queryClient.getQueryData(["user"]),
  });

  const changePassword = useMutation({
    mutationFn: async (data: ChangePasswordSchema) => {
      await agent.post('/account/change-password', data)
    },
    onSuccess: () => {
      toast.success('Your password has been changed')
    }
  })

  const verifyEmail = useMutation({
    mutationFn: async ({userId, code}: {userId: string, code: string}) => {
      await agent.get(`/confirmEmail?userId=${userId}&code=${code}`) //microsoft endpoint to verify email, check in program.cs
    }
  })

  const resendConfirmationEmail = useMutation({
    mutationFn: async ({email, userId} : {email?: string, userId?: string | null}) => {
      await agent.get(`/account/resendConfirmEmail`, {
        params: {
          email,
          userId,
        }
      })
    },
    onSuccess: async () => {
      toast.success("Email sent - please check your email")
    },
    onError: async () => {
      toast.error("Problem sending email - please check your email address");
    }
  })

  

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

  const forgotPassword = useMutation({
    mutationFn: async (email: string) => {
      await agent.post("/forgotPassword", { email });
    },
    onSuccess: () => {
      toast.success('Password reset requested - please check your email')
    }
  })

  const resetPassword = useMutation({
    mutationFn: async (data: ResetPassword) => {
      await agent.post("/resetPassword", data);
    },
    onSuccess: () => {
      toast.success("Password reset requested - please check your email");
    },
  });

  const fetchGithubToken = useMutation({
    mutationFn: async (code: string) => {
      const response = await agent.post(`/account/github-login?code=${code}`)
      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user']
      })
    }
  })

  return {
    loginUser,
    currentUser,
    logoutUser,
    loadingUserInfo,
    registerUser,
    verifyEmail,
    resendConfirmationEmail,
    changePassword,
    forgotPassword,
    resetPassword,
    fetchGithubToken,
  };
};
