import axios from 'axios';
import router from "./router";

// Создаем экземпляр axios

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

// Добавляем интерцептор запросов
api.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('social_access_token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Добавляем интерцептор ответов
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error.response.data.message);
        // если ответ 'Token has expired', то делаем рефреш токена
        if (error.response.data.message === 'Token has expired') {
            return axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/refresh`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('social_access_token')}`
                }
            }).then(response => {
                localStorage.setItem('social_access_token', response.data.access_token);

                error.config.headers['Authorization'] = `Bearer ${response.data.access_token}`;

                return axios.request(error.config);
            })
        }

        // Если статус ответа 401 (Unauthorized), перенаправляем на страницу логина
        if (error.response && error.response.status === 401) {
            router.push({ name: 'user.login' });
        }

        return Promise.reject(error);
    }
);

export default api;
