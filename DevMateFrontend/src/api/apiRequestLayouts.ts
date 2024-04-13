import { ErrorResponse } from "../util/errorResponseFromApi";

export async function getRequestLayout(url: string, token: string | null = "") {
    const options = {
        method: 'GET',
        headers: headersFabric(token),
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

export async function postRequestLayout(url: string, body: string, token: string | null = "") {
    const options = {
        method: 'POST',
        headers: headersFabric(token),
        body: body
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorResponse: ErrorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        }
        return await response.json();
    } catch (e) {
        throw e;
    }
}

export async function deleteRequestLayout(url: string, token: string | null = "") {
    const options = {
        method: 'DELETE',
        headers: headersFabric(token),
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

function headersFabric(token: string | null): Record<string, string> {
    if (token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    } else {
        return {
            'Content-Type': 'application/json'
        }
    }
}