import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Primary utility for merging classnames with tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format numbers with commas and proper decimals
export function formatNumber(value: number, options?: {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
}) {
  const {
    maximumFractionDigits = 2,
    minimumFractionDigits = 0,
    notation = 'standard'
  } = options || {};

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits,
    notation,
  }).format(value);
}

// Format currency values
export function formatCurrency(value: number, currency = 'USD', options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

// Format percentage values
export function formatPercent(value: number, options?: {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  alwaysShowSign?: boolean;
}) {
  const {
    maximumFractionDigits = 2,
    minimumFractionDigits = 2,
    alwaysShowSign = true,
  } = options || {};

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(value / 100);

  return alwaysShowSign && value > 0 ? `+${formatted}` : formatted;
}

// Format cryptocurrency values appropriately
export function formatCryptoPrice(value: number, symbol: string) {
  // Different precision for different coins
  const precision = {
    'BTC': 2,
    'ETH': 2,
    'XRP': 4,
  }[symbol] || 2;

  return formatNumber(value, { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

// Convert date to relative time (e.g., "2 hours ago")
export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}y ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}mo ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}d ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}h ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}m ago`;

  if (seconds < 10) return 'just now';
  
  return `${Math.floor(seconds)}s ago`;
}

// Generate a random ID (useful for keys)
export function randomId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Create a debounce function
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Truncate long text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Get contrast text color (white or black) based on background
export function getContrastColor(hexColor: string): 'white' | 'black' {
  // Remove # if present
  const color = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate luminance using relative luminance formula
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  
  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 128 ? 'black' : 'white';
}

// Color manipulation functions
export const colorUtils = {
  // Lighten a hex color by percentage
  lighten: (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (
      0x1000000 + 
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 + 
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 + 
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    ).toString(16).slice(1);
  },
  
  // Darken a hex color by percentage
  darken: (color: string, percent: number): string => {
    return colorUtils.lighten(color, -percent);
  },
  
  // Convert hex to rgba
  toRgba: (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
};

// Animation utilities
export const animationUtils = {
  staggerChildren: (delay: number = 0.1) => ({
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: delay,
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }
  }),
  
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } }
  },
  
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
};

// Data visualization helpers
export const chartUtils = {
  // Generate gradient for charts
  getGradient: (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.5)');
    return gradient;
  },
  
  // Common chart options
  commonOptions: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(14, 23, 43, 0.8)',
        bodyFont: {
          family: 'Inter',
          size: 12,
        },
        displayColors: false,
        padding: 12,
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 10,
          },
          color: 'rgba(148, 163, 184, 0.7)',
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 10,
          },
          color: 'rgba(148, 163, 184, 0.7)',
          padding: 8,
        },
      },
    },
  }
};
