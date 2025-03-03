export async function createUser(userData) {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
}

export async function loginUser(credentials) {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });


    console.log("hier passieren bald spannende Sachen!")


    return response.json();
}

export async function logoutUser() {
    console.info("werd ich dann mal bei Gelegenheit machen ;)")
}