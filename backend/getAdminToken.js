const axios = require('axios');

const getAdminToken = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/admin/login', {
      email: 'admin@society.com',
      password: 'admin123',
    });

    console.log('✅ Admin Token:', response.data.token);
  } catch (error) {
    console.error('❌ Error fetching admin token:', error.response?.data || error.message);
  }
};

getAdminToken();
