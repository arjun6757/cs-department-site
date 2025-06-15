import { API } from ".";

export async function getAllUsers() {
	try {
		const response = await fetch(`${API}/user/all`, {
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

export async function deleteUser(userId) {
	try {
		const response = await fetch(`${API}/user/delete/${userId}`, {
			method: "DELETE",
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

