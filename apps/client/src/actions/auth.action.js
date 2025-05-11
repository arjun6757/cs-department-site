export async function resetPassword(data) {
	try {
		const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		if(!response.ok) {
			const result = await response.json()
			throw new Error(result.message || "Something went wrong");
		}

		const result = await response.json();
		return result;
	} catch (err) {
		throw err;
	}
}

export async function login(data) {
	try {
		const response = await fetch("http://localhost:3000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(data),
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

export async function signup(data) {
	try {
		const response = await fetch("http://localhost:3000/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(data),
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

export async function logout() {
	try {
		const response = await fetch("http://localhost:3000/api/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
	} catch (error) {
		throw error;
	}
}

export async function adminLogout() {
	try {
		const response = await fetch("http://localhost:3000/api/auth/admin/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
	} catch (error) {
		throw error;
	}
}

export async function adminLogin(data) {
	try {
		const response = await fetch(
			"http://localhost:3000/api/auth/admin/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(data),
			},
		);

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