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
        className="bg-indigo-600 text-white px-5 py-2 rounded-full backdrop-blur-lg"
      >
        Get Started
      </button>
    </div>
  );
};

export default HeaderButtons;
