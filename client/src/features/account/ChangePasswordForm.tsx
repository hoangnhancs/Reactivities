import { Password } from "@mui/icons-material"
import { changePasswordSchema, ChangePasswordSchema } from "../../lib/schemas/changePasswordSchema"
import AccountFormWrapper from "./AccountFormWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import TextInput from "../../app/shared/components/TextInput"
import { useAccount } from "../../lib/hooks/useAccount"
import { toast } from "react-toastify"
import { useState } from "react"


export default function ChangePasswordForm() {
    const {changePassword} = useAccount();
    const [resetForm, setResetForm] = useState(false);
    const onSubmit = async (data: ChangePasswordSchema) => {
        console.log(data)
        try {
            await changePassword.mutateAsync(data, {
                    onSuccess: () => {
                        setResetForm(true)
                        toast.success('Your password has been changed')
                    }
                }
            )

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AccountFormWrapper<ChangePasswordSchema>
            title='Change password'
            icon={<Password fontSize="large" />}
            onSubmit={onSubmit}
            submitButtonText="Update password"
            resolver={zodResolver(changePasswordSchema)}
            reset={resetForm}
        >
            <TextInput type="password" label="Current password" name="currentPassword" />
            <TextInput type="password" label="New password" name="newPassword" />
            <TextInput type="password" label="Confirm password" name="confirmPassword" />
        </AccountFormWrapper>
    )
}
