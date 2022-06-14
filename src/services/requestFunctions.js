import api from './api';   

export const authRegister = async (username) => {
    const response = await api("auth/register", {
        method: "POST",
        body: { username }
    })

    return response.json();
};


export const authLogin = async (username) => {
    const response = await api("auth/login", {
        method: "POST",
        body: { username }
    });
    
    const result = await response.json();

    return result.token;

};


// --------------------------- TASKS

export const createTask = async (token, values) => {
    const response = await api("tasks", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: {
            title: values.title,
            description: values.description,
            status: false,
        }
    });
    return response.json();
};

export const fetchTask = async (token) => {
    const response = await api("tasks", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    
    return response.json();
};

export const editTask = async (token, values, taskId) => {
    const response = await api(`tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: {
            title: values.title,
            description: values.description,
            status: values.status,
        }
    });
    return response.json();
};

export const deleteTask = async (token, taskId) => {
    await api(`tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const askBot = async (token, content) => {
    const response = await api(`chat_bot`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        }, 
        body: { content }
    });
    
    return response.json();
};