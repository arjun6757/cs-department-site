export async function getAllEntry() {
    try {
        const response = await fetch("http://localhost:3000/api/entry/all", {
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