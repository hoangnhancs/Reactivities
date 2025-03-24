import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, profileSchema } from "../../lib/schemas/profileSchema";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useProfile } from "../../lib/hooks/useProfile";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";

type Props = {
    setEditMode : (editMode: boolean) => void
}

export default function EditProfileForm({setEditMode}: Props) {
    const { control, reset, handleSubmit, formState: {isValid} } = useForm<ProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(profileSchema)
    });
    const { id } = useParams();
    const { profile, updateProfile } = useProfile(id);

    useEffect(() => {
        if (profile) reset({
            ...profile
        });
    }, [profile, reset]);

    const onSubmit = async (data: ProfileSchema) => {
        try {

            updateProfile.mutate(data, {
                onSuccess: () => setEditMode(false)
            });
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Box 
            component='form' 
            onSubmit={handleSubmit(onSubmit)} 
            display='flex' 
            flexDirection='column' 
            gap={2}
        >
            <TextInput label='Display Name' control={control} name='displayName' />
            <TextInput label='Add your bio' control={control} name='bio'
                multiline rows={10} 
            />
            <Box display='flex' justifyContent='end' gap={3}>
                <Button onClick={() => setEditMode(false)} color='inherit'>Cancel</Button>
                <Button
                    type="submit"
                    color='success'
                    variant="contained"
                    disabled={updateProfile.isPending || !isValid}
                >Submit</Button>
            </Box>
        </Box>
        
    )
}