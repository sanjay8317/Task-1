/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/index.html","./dist/adduser.html"],
  theme: {
    extend: {

      colors:{
        'custom-green':'#095961',
        'custom-gray':'#f5f7f9',
     
          'custom-btncolor': '#2a733d',
    
      },
    },
  },
  
  plugins: [],
}

