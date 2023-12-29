const authService = {
    login: async (username, password) => {
      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username:username,
            password:password,
          }),
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
  };
  
  export default authService;
  