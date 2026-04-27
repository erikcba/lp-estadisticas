import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Esta función permite combinar clases y resolver conflictos de Tailwind automáticamente
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}