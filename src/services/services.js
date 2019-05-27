

import axios from 'axios';

export const loginUser = (username, password) => 
    axios.post('/api/login', { username,password }).then(res => res.data.username)