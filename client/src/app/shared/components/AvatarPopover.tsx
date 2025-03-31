import * as React from 'react';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router';
import ProfileCard from '../../../features/profiles/ProfileCard';
import { useProfile } from '../../../lib/hooks/useProfile';

type Props = {
    id: string
} 

export default function AvatarPopover({id}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const {profile} = useProfile(id)
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (!profile) return null;
  return (
    <>
        <Avatar 
            alt={profile.displayName + ' image'}
            src={profile.imageUrl}
            sx = {{
              border: profile.following ? 2 : 0,
              borderColor: '#4CAF50'
            }}
            component={Link}
            to={`/profiles/${profile?.id}`}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        />
        <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: 'none', mt: -1 }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'center',// Định vị Popover ở trên phần tử gốc
            horizontal: 'center',// Canh phải so với phần tử gốc
            }}
            transformOrigin={{
            vertical: 'bottom',// Điểm gốc của Popover ở dưới cùng
            horizontal: 'left',// Căn phải để Popover khớp với anchor
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <ProfileCard profile={profile}/>
        </Popover>
    </>
  );
}
