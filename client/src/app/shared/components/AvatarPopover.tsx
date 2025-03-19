import * as React from 'react';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router';
import ProfileCard from '../../../features/profiles/ProfileCard';

type Props = {
    profile: Profile
}

export default function AvatarPopover({profile}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
        <Avatar 
            alt={profile.displayName + ' image'}
            src={profile.imageUrl}
            component={Link}
            to={`profile/${profile.id}`}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        />
        <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: 'none', mt: -1 }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',// Định vị Popover ở trên phần tử gốc
            horizontal: 'right',// Canh phải so với phần tử gốc
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
