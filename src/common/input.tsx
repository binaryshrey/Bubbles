import * as React from 'react';

import { cn } from './cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return <input type={type} className={cn('flex h-10 w-full rounded-md border border-zinc-700 bg-black text-white px-3 py-2 text-sm file:border-0 file:text-white file:bg-black file:text-sm file:font-medium placeholder:text-zinc-700 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
