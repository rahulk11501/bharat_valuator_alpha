import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.content || "",
    },
    withCredentials: true, // send cookies, e.g. for Devise auth
});

export default axiosInstance;
