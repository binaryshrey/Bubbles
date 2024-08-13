import * as React from 'react';
import logo from '../../assets/logo-light.svg';
import login from '../../assets/login.svg';
import google from '../../assets/google.svg';
import github from '../../assets/github.svg';
import loginBG from '../../assets/loginBG.webp';
import { Link } from 'react-router-dom';
import { UserAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const { googleSignIn, githubSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      if (Object.keys(user).length !== 0) {
        localStorage.setItem('email', JSON.stringify(user.email));
        navigate('/upload-album');
      }
    }
  }, [user]);

  return (
    <div className="flex bg-black">
      <div className="flex-1 h-screen">
        <div className="h-screen flex flex-col">
          <div className="flex-none">
            <Link to="/">
              <img src={logo} alt="Bubbles" className="h-8 ml-8 mt-6" />
            </Link>
          </div>

          <div className="flex-1 h-screen flex flex-col mt-12">
            <div className="flex items-center justify-center flex-col mt-8">
              <img src={login} alt="Login" />
              <p className=" text-2xl mb-12 mt-4 text-white">Welcome Back.</p>
            </div>

            <div className="bg-black flex flex-col items-center justify-center p-8 space-y-2 items-center bg-black/[0.96] ">
              <button onClick={handleGoogleSignIn} type="button" className="text-black bg-white focus:ring-4 font-medium rounded-full text-sm px-8 py-2.5 text-center inline-flex items-center border">
                <img src={google} alt="Google" className="h-6 w-6 mr-4" />
                Sign in with Google
              </button>

              <button onClick={handleGithubSignIn} type="button" className="text-black bg-white focus:ring-4 font-medium rounded-full text-sm px-8 py-2.5 text-center inline-flex items-center border">
                <img src={github} alt="github" className="h-6 w-6 mr-4" />
                Sign in with Github
              </button>
            </div>

            <div className="m-12 flex  justify-center">
              <p className="text-white">
                Don't have an account?{' '}
                <Link to="/signup">
                  <span className="text-white">Create one.</span>
                </Link>
              </p>
            </div>
          </div>

          <div className="flex-none">
            <div className="text-sm font-medium text-muted-foreground opacity-70 m-4 text-white ml-8 ">&copy; 2024 Bubbles Inc.</div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 h-screen bg-black">
        <img src={loginBG} alt="Sign IN" className="h-full w-full object-cover " />
      </div>
    </div>
  );
};

export default Login;
