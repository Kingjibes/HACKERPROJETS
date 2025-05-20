/** @type {import('tailwindcss').Config} */
    module.exports = {
      darkMode: ["class"],
      content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
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
          colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
            'brand-primary': 'hsl(var(--brand-primary))',
            'brand-secondary': 'hsl(var(--brand-secondary))',
            'brand-accent': 'hsl(var(--brand-accent))',
          },
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
          },
          keyframes: {
            "accordion-down": {
              from: { height: 0 },
              to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: 0 },
            },
            "rain-drop": {
              "0%": { transform: "translateY(-100%)", opacity: 0 },
              "50%": { opacity: 1 },
              "100%": { transform: "translateY(100vh)", opacity: 0 },
            },
            "logo-pulse": {
              "0%, 100%": { transform: "scale(1)", filter: "drop-shadow(0 0 5px hsl(var(--brand-accent)))" },
              "50%": { transform: "scale(1.1)", filter: "drop-shadow(0 0 15px hsl(var(--brand-accent)))" },
            }
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "rain-drop": "rain-drop 2s linear infinite",
            "logo-pulse": "logo-pulse 3s ease-in-out infinite",
          },
          fontFamily: {
            sans: ['"Inter"', 'sans-serif'],
            display: ['"Orbitron"', 'sans-serif'],
          },
          backgroundImage: {
            'glassmorphism-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
            'glassmorphism-dark': 'linear-gradient(135deg, rgba(20, 20, 30, 0.2), rgba(20, 20, 30, 0.1))',
            'hero-gradient-light': 'radial-gradient(ellipse at top, hsl(var(--brand-primary) / 0.5), transparent 70%), radial-gradient(ellipse at bottom, hsl(var(--brand-secondary) / 0.5), transparent 70%)',
            'hero-gradient-dark': 'radial-gradient(ellipse at top, hsl(var(--brand-primary) / 0.7), transparent 70%), radial-gradient(ellipse at bottom, hsl(var(--brand-secondary) / 0.7), transparent 70%)',
          },
          boxShadow: {
            'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }
        },
      },
      plugins: [require("tailwindcss-animate")],
    }