import axios from "axios";

const instance = axios.create({
    headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.content,
    },
    withCredentials: true, // send cookies (important if you're using Devise)
});

export default instance;
