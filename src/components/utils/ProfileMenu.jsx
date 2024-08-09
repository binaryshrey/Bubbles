import { Link } from 'react-router-dom';
import { UserAuth } from '../hooks/AuthContext';
import { RiHome6Line, RiUserSmileLine, RiLogoutCircleRLine } from '@remixicon/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '../../common/dropdown-menu';

const ProfileMenu = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img className="h-8 rounded-full cursor-pointer" src={user.photoURL} alt="ProfilePic" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark">
        <div className="flex items-center gap-2 p-2">
          <img className="h-8 rounded-full cursor-pointer" src={user.photoURL} alt="ProfilePic" />
          <div className="grid gap-0.5 leading-none">
            <div className="font-semibold">{user.displayName}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <Link to="/profile" className="flex items-center">
          <DropdownMenuItem className="w-full cursor-pointer">
            <div className="flex gap-2 items-center">
              <RiUserSmileLine className="h-4 w-4" />
              <span className="">Profile</span>
            </div>
          </DropdownMenuItem>
        </Link>

        <Link to="/dashboard" className="flex items-center">
          <DropdownMenuItem className="w-full cursor-pointer">
            <div className="flex gap-2 items-center">
              <RiHome6Line className="h-4 w-4" />
              <span className="">Dashboard</span>
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer" onClick={handleSignOut}>
          <div className="flex gap-2 items-center">
            <RiLogoutCircleRLine className="h-4 w-4" />
            <span className="">Sign out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
