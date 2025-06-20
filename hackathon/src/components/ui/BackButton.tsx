import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string | number;
}

export const BackButton: React.FC<BackButtonProps> = ({ to = -1 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof to === 'number') {
      navigate(to); 
    } else {
      navigate(to); 
    }
  };

  return (
    <button onClick={handleClick} className="text-white mb-4">
      &larr; Volver
    </button>
  );
};
