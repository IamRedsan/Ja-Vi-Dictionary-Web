import axios from 'axios';

export const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const authClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

authClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const expiredAccessToken = localStorage.getItem('accessToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          '/auth/refresh',
          {
            refresh_token: refreshToken,
          },
          { headers: { Authorization: `Bearer ${expiredAccessToken}` } }
        );

        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }

    return Promise.reject(error);
  }
);

export const client = axios.create({
  baseURL: `${baseURL}/api/v1`,
});
