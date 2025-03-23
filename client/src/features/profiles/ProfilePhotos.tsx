import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, ImageList, ImageListItem, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";
import StartButton from "../../app/shared/components/StarButton";
import DeleteButton from "../../app/shared/components/DeleteButton";

export default function ProfilePhotos() {

  const { id } = useParams();
  const { photos, loadingPhotos, isCurrentUser, uploadPhoto, 
    profile, setMainPhoto, deletePhoto } = useProfile(id);
  const isSmall = useMediaQuery('(max-width:600px)');
  const isMedium = useMediaQuery('(max-width:960px)');
  const [editMode, setEditMode] = useState(false);

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto.mutate(file, {
      onSuccess: () => {
        setEditMode(false);
      }
    })
  }

  const cols = isSmall ? 2 : isMedium ? 4 : 6; // Tự điều chỉnh số cột

  if (loadingPhotos) return <Typography>Loading...</Typography>

  if (!photos) return <Typography>No photos found for this user</Typography>
  return (
      <Box>       
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h5">Photos</Typography>
          {isCurrentUser && (
            <Button onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Add photo'}
            </Button>
          )}
        </Box>
        <Divider sx={{my: 2}} />
        {editMode ? (
          <PhotoUploadWidget 
            uploadPhoto={handlePhotoUpload}
            loading={uploadPhoto.isPending}
          />
        ) : (
            <>
              {photos.length === 0 ? (
                <Typography>You currently have no photos</Typography>
              ) : (
                <ImageList sx={{ height: 'auto' }} cols={cols}>
                  {photos.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      srcSet={`${item.url.replace(
                        '/upload/',
                        '/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/'
                      )}`}
                      src={`${item.url.replace(
                        '/upload/',
                        '/upload/w=164,h=164,c_fill,f_auto,g_face'
                      )}`}
                      alt={'user profile image'}
                      loading="lazy"
                    />
                    {isCurrentUser && (
                      <div>
                        <Box 
                          sx={{position: 'absolute', top: 0, left: 0}}
                          onClick={()=>setMainPhoto.mutate(item)}
                        >
                          <StartButton selected={item.url === profile?.imageUrl} />
                        </Box>
                        {profile?.imageUrl !== item.url && (
                        <Box 
                          sx={{position: 'absolute', top: 0, right: 0}}
                          onClick={()=>{
                            
                            deletePhoto.mutate(item.id)
                            
                          }}
                        >
                          <DeleteButton />
                        </Box>                    
                        )}
                      </div>
                    )}
                  </ImageListItem>
                  ))}
                </ImageList>
              )}
            </>
        )}
      </Box>
  )
}

