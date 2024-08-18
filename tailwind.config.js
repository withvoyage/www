import tailwindCssAnimate from 'tailwindcss-animate';
import primaryTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/slate-ui/dist/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...primaryTheme.fontFamily.sans],
      },
      colors: {
        white: "var(--white)",
        black: "var(--black)",
        "anti-primary": "var(--anti-primary)",
        "anti-secondary": "var(--anti-secondary",
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
        },
        error: {
          50: "var(--error-50)",
          100: "var(--error-100)",
          200: "var(--error-200)",
          300: "var(--error-300)",
          400: "var(--error-400)",
          500: "var(--error-500)",
          600: "var(--error-600)",
          700: "var(--error-700)",
          800: "var(--error-800)",
          900: "var(--error-900)",
        },
        warning: {
          50: "var(--warning-50)",
          100: "var(--warning-100)",
          200: "var(--warning-200)",
          300: "var(--warning-300)",
          400: "var(--warning-400)",
          500: "var(--warning-500)",
          600: "var(--warning-600)",
          700: "var(--warning-700)",
          800: "var(--warning-800)",
          900: "var(--warning-900)",
        },
        success: {
          50: "var(--success-50)",
          100: "var(--success-100)",
          200: "var(--success-200)",
          300: "var(--success-300)",
          400: "var(--success-400)",
          500: "var(--success-500)",
          600: "var(--success-600)",
          700: "var(--success-700)",
          800: "var(--success-800)",
          900: "var(--success-900)",
        },
        info: {
          50: "var(--info-50)",
          100: "var(--info-100)",
          200: "var(--info-200)",
          300: "var(--info-300)",
          400: "var(--info-400)",
          500: "var(--info-500)",
          600: "var(--info-600)",
          700: "var(--info-700)",
          800: "var(--info-800)",
          900: "var(--info-900)",
        },
      },

      backgroundColor: ({ theme }) => ({
        primary: theme("colors.primary.500"),
        secondary: theme("colors.secondary.500"),
        white: theme("colors.white"),
        muted: theme("colors.gray.100"),
      }),
      borderColor: ({ theme }) => ({
        primary: theme("colors.primary.500"),
        secondary: theme("colors.secondary.500"),
        error: theme("colors.error.500"),
        muted: theme("colors.gray.100"),
      }),
      textColor: ({ theme }) => ({
        default: theme("colors.gray.900"),
        primary: theme("colors.primary.500"),
        secondary: theme("colors.gray.500"),
        error: theme("colors.error.500"),
        white: theme("colors.white"),
        muted: theme("colors.gray.500"),
        "anti-primary": theme("colors.anti-primary"),
        "anti-secondary": theme("colors.anti-secondary"),
      }),
      ringColor: ({ theme }) => ({
        primary: theme("colors.primary.500"),
        secondary: theme("colors.secondary.500"),
        error: theme("colors.error.500"),
        muted: theme("colors.gray.100"),
      }),
      fill: ({ theme }) => ({
        primary: theme("colors.primary.500"),
        secondary: theme("colors.secondary.500"),
        error: theme("colors.error.500"),
        muted: theme("colors.gray.100"),
      }),

      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    tailwindCssAnimate,
    plugin(function ({ addBase }) {
      addBase({
        h1: { fontSize: "2em" },
        h2: { fontSize: "1.5em" },
        h3: { fontSize: "1.17em" },
        h4: { fontSize: "1em" },
        h5: { fontSize: "0.83em" },
        h6: { fontSize: "0.67em" },
      });
    }),
  ],
};
