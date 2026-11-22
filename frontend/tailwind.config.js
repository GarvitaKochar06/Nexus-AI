/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: "#090D16",
          surface: "#0F172A",
          surfaceHover: "#1E293B",
          border: "#1E293B",
          borderHover: "#334155",
          primary: "#06B6D4",
          secondary: "#8B5CF6",
          accent: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          muted: "#64748B",
          text: "#F8FAFC",
          textSecondary: "#94A3B8"
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'nexus-gradient': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
      }
    },
  },
  plugins: [],
};
