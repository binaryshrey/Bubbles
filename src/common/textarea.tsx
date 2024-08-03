import * as React from 'react';

import { cn } from './cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return <textarea className={cn('flex min-h-[80px] text-white w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm placeholder:text-zinc-700 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props} />;
});
Textarea.displayName = 'Textarea';

export { Textarea };
