import {useNavigate} from 'react-router-dom';
const HeaderButtons = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className="space-x-8 font-medium">
      <button onClick={handleLogin}>Log in</button>
      <button
        onClick={handleGetStarted}
        className="bg-white/20 px-5 py-2 rounded-full backdrop-blur-lg text-indigo-500"
      >
        Get Started
      </button>
    </div>
  );
};

export default HeaderButtons;
