import { API } from ".";

export async function getAllEntry() {
    try {
        const response = await fetch(`${API}/entry/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || "Something went wrong");
        }

        const result = await response.json();

        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function upload(data) {
	try {
		const response = await fetch(`${API}/entry/upload`, {
			method: "POST",
			credentials: "include",
			body: data,
		});

		if (!response.ok) {
			const result = await response.json();
			throw new Error(result.message || "Something went wrong");
		}

		const result = await response.json();
		return result.data;
	} catch (err) {
		throw err;
	}
}

export async function deleteEntry(entryId) {
    try {
        const response = await fetch(`${API}/entry/delete/${entryId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || "Something went wrong");
        }

        const result = await response.json();

        return result.data;
    } catch (err) {
        throw err;
    }
}