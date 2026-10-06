import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 rounded-xl gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-2xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-[#173D2B] text-white hover:bg-[#204E38] shadow-sm hover:shadow hover:-translate-y-0.5 border border-[#173D2B]',
    secondary: 'bg-[#FFFFFF] text-[#173D2B] border border-[#C8D6C0] hover:bg-[#F3F6ED] hover:border-[#AFC69A] shadow-sm hover:-translate-y-0.5',
    outline: 'bg-transparent text-[#173D2B] border border-[#AFC69A] hover:bg-[#E8F0DF]/60',
    ghost: 'bg-transparent text-[#173D2B] hover:bg-[#E8F0DF]/60',
    light: 'bg-[#E8F0DF] text-[#173D2B] hover:bg-[#DCE9C9] font-semibold',
    accent: 'bg-[#DCE9C9] text-[#173D2B] hover:bg-[#CFE2B7] font-semibold',
    white: 'bg-white text-[#173D2B] hover:bg-[#F7F6EE] shadow-sm hover:-translate-y-0.5',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
