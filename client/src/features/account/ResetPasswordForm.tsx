import { useNavigate, useSearchParams } from "react-router"
import { useAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";
import { resetPasswordSchema, ResetPasswordSchema } from "../../lib/schemas/ResetPasswordSchema";
import AccountFormWrapper from "./AccountFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";

export default function ResetPasswordForm() {

  const [params] = useSearchParams()
  const {resetPassword} = useAccount()
  const navigate = useNavigate()

  const email = params.get('email')
  const code = params.get('code')

  if (!code) return <Typography>Invalid reset password code</Typography>

  if (!email) return <Typography>Invalid reset password email</Typography>

  const onSubmit = async (data: ResetPasswordSchema) => {
    
      await resetPassword.mutateAsync({email, resetCode: code, newPassword: data.newPassword})
      navigate('/login')
    
  }

  return (
    <AccountFormWrapper<ResetPasswordSchema>
      title='Reset password'
      submitButtonText='Reset password'
      onSubmit={onSubmit}
      resolver={zodResolver(resetPasswordSchema)}
      icon={<LockOpen fontSize="large" />}
    >
      <TextInput type="password" label='New password' name="newPassword" />
      <TextInput type="password" label='Confirm password' name="confirmPassword" />
    </AccountFormWrapper>
  )
}
