import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
  to: string;
  label: string;
  color?: 'blue' | 'green' | 'red';
  extraAction?: () => void;
  className?: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  to,
  label,
  color = 'blue',
  extraAction,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (extraAction) extraAction();
    navigate(to);
  };

  const base = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    red: 'bg-red-500 hover:bg-red-600',
  }[color];

  return (
    <button
      onClick={handleClick}
      className={`text-white px-4 py-2 rounded ${base} ${className}`}
    >
      {label}
    </button>
  );
};
