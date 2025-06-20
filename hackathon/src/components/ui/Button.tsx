interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'success';
}

const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600',
  danger: 'bg-red-500 hover:bg-red-600',
  success: 'bg-green-500 hover:bg-green-600',
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`text-white font-semibold py-2 px-4 rounded-xl shadow transition disabled:opacity-50 ${variants[variant]} ${className}`}
    />
  );
};
