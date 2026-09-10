/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       
        primary: '#232f3e',       
        primaryLight: '#485769',  
        primaryDark: '#131921',   
        primaryBg: 'rgba(35, 47, 62, 0.1)',
        
        secondary: '#ff9900',    
        secondaryLight: '#ffad33',
        secondaryDark: '#cc7a00', 
        secondaryBg: 'rgba(255, 153, 0, 0.1)',
        
        accent: '#3b82f6',       
        accentLight: '#60a5fa',  
        accentDark: '#2563eb',   
        accentBg: 'rgba(59, 130, 246, 0.1)',
      },
      fontFamily: {
        'sans': ['Amazon Ember', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'amazon': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'amazon-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

