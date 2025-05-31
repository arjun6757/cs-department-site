import { API } from ".";

export async function getTodaysAttendance() {
	try {
		const response = await fetch(`${API}/attendance/today`, {
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

export async function getUserAttendance(userId, startDate, endDate) {
	try {
		const response = await fetch(
			`${API}/attendance/user/${userId}?start=${startDate}&end=${endDate}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
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

export async function getAllUserAttendanceSummary(startDate, endDate) {
	try {
		const response = await fetch(
			`${API}/attendance/all?start=${startDate}&end=${endDate}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
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

export async function getAllAttendanceHistory() {
	try {
		const response = await fetch(`${API}/attendance/history`, {
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

export async function createAttendanceEntry(status, userId, date) {
	try {
		const response = await fetch(
			`${API}/attendance/?status=${status}&user_id=${userId}&date=${date}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
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

export async function updateAttendanceEntry(status, entryId) {
	try {
		const response = await fetch(
			`${API}/attendance/update/${entryId}?status=${status}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
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
