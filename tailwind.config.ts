import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced Lucent AI colors (Phase 1: Core Experience - Global design system)
				lucent: {
					// Primary colors
					'navy': '#080F1F', // Updated deeper midnight blue
					'deep-blue': '#0C1B33', // Richer deep blue
					'black': '#050A14', // Darker black for contrast
					
					// Accent colors
					'purple': {
						DEFAULT: '#8B5CF6', // Base purple
						'light': '#A78BFA', // Light purple
						'dark': '#7C3AED', // Dark purple
					},
					'blue': {
						DEFAULT: '#3B82F6', // Base blue
						'light': '#60A5FA', // Light blue
						'cyan': '#0EF7FF', // Cybernetic cyan
						'teal': '#38BDF8', // Teal variation
					},
					
					// Status colors with enhanced contrast
					'success': '#10B981', // Vibrant green
					'error': '#EF4444', // Intense red
					'warning': '#F59E0B', // High-visibility amber
					
					// UI colors
					'gold': '#F7C675',
					'gray': {
						DEFAULT: '#94A3B8',
						'light': '#CBD5E1',
						'dark': '#64748B',
					},
					'light-blue': '#7DD3FC',
					
					// Gradient stops
					'gradient-start': '#8B5CF6',
					'gradient-mid': '#6366F1',
					'gradient-end': '#3B82F6',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// Enhanced animations for Phase 1
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'float-x': {
					'0%, 100%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(-10px)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'glow': {
					'0%, 100%': { filter: 'brightness(1)' },
					'50%': { filter: 'brightness(1.2)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.03)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)' },
					'50%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }
				},
				'data-pulse': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'float-x': 'float-x 7s ease-in-out infinite',
				'float-delay': 'float 6s ease-in-out 2s infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 15s ease infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'slide-left': 'slide-left 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'breathe': 'breathe 5s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'data-pulse': 'data-pulse 0.5s ease-out',
			},
			backgroundImage: {
				'hero-pattern': 'linear-gradient(to right bottom, rgba(8, 15, 31, 0.95), rgba(12, 27, 51, 0.97)), url("/grid-pattern.svg")',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(90deg, #8B5CF6, #6366F1, #3B82F6)',
				'gradient-dark': 'linear-gradient(90deg, rgba(8, 15, 31, 0.95), rgba(12, 27, 51, 0.97))',
				'gradient-card': 'linear-gradient(145deg, rgba(14, 23, 43, 0.6), rgba(10, 18, 35, 0.8))',
				'gradient-glow': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15), transparent 70%)',
				'glass-card': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
				'grid-lines': 'url("/grid-lines.svg")',
			},
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
				'inter': ['Inter var', 'Inter', 'sans-serif'],
				'space': ['Space Grotesk', 'sans-serif'],
				'mono': ['JetBrains Mono', 'monospace'],
			},
			boxShadow: {
				'glow-sm': '0 0 10px rgba(139, 92, 246, 0.2)',
				'glow-md': '0 0 20px rgba(139, 92, 246, 0.3)',
				'glow-lg': '0 0 30px rgba(139, 92, 246, 0.4)',
				'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
				'card': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
			},
			backdropFilter: {
				'glass': 'blur(10px)',
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
				'glow': 'box-shadow, filter',
			},
			transitionDuration: {
				'2000': '2000ms',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
