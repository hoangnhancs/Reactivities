import { FieldValues } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount"
import AccountFormWrapper from "./AccountFormWrapper";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { zodToRhfRules } from "../../lib/util/util";
import { z } from "zod";
import { useNavigate } from "react-router";



export default function ForgotPasswordForm() {
    const {forgotPassword} = useAccount();
    const navigate = useNavigate()
    const onSubmit = async (data: FieldValues) => {
        try {
            await forgotPassword.mutateAsync(data.email, {
                    onSuccess: () => {
                        navigate("/login")
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AccountFormWrapper
            title="Please enter your email address"
            icon={<LockOpen fontSize="large" />}
            submitButtonText="Request password reset link"
            onSubmit={onSubmit}
        >
            <TextInput 
                name="email"
                label="Email address"
                rules={
                    zodToRhfRules(z.string()
                        .min(1, "Email is required")
                        .email()) // Zod rules
                }
            />
        </AccountFormWrapper>
    )
}
