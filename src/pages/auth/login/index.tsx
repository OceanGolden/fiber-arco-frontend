import loginBanner1 from '@/assets/images/login-banner-1.png';
import LoginForm from './components/login-form';

const Login = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex justify-between items-center w-screen-lg overflow-hidden m-0 shadow-2xl rounded-2xl '>
        <div className='min-h-full'>
          <img style={{ width: '100%' }} src={loginBanner1} alt='Login' />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
