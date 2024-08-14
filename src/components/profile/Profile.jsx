/************************************************************ IMPORTS ************************************************************/

import { UserAuth } from '../hooks/AuthContext';
import { Button } from '../../common/button';

/************************************************************ IMPORTS ************************************************************/

const Profile = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black h-screen">
      <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 w-full h-48 relative flex  justify-center">
        <div className="absolute -bottom-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white ">
          <img className="h-full w-full rounded-full" src={user.photoURL} alt="Profile" />
        </div>
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 w-full flex justify-between items-center mt-32">
        <p className="text-white text-sm">Name</p>
        <p className="text-white text-sm">{user.displayName}</p>
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 w-full flex justify-between items-center mt-2">
        <p className="text-white text-sm">Email ID</p>
        <p className="text-white text-sm">{user.email}</p>
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 w-full flex justify-between items-center mt-2">
        <p className="text-white text-sm">Need a break?</p>
        <Button variant="secondary" className="dark" onClick={handleSignOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
