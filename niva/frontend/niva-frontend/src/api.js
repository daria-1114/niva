const BASE_URL = "http://localhost:8081/api"

export async function apiFetch(path, options={}){
    const token = localStorage.getItem('token');
    const headers = {
        'Content-type': 'application/json',
        ...options.headers,
    };
    if(token){
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${path}`,{
        ...options,
        headers,
    });
    return response;

}