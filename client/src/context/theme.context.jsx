import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
	theme: "system",
	setTheme: () => null,
});

export default function ThemeProvider({
	children,
	defaultTheme = "system",
	key = "cs-department-bksc-theme",
	...props
}) {
	const [theme, setTheme] = useState(defaultTheme);

	useEffect(() => {
		const local = localStorage.getItem(key);

		if (local) setTheme(local);
	}, []);

	useEffect(() => {
		const html = document.documentElement;

		html.classList.remove("dark", "light");

		if (theme === "system") {
			const system = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			html.classList.add(system);
			html.style.colorScheme = system;
			return;
		}

		html.classList.add(theme);
		html.style.colorScheme = theme;
	}, [theme]);

	return (
		<ThemeContext.Provider
			{...props}
			value={{
				theme,
				setTheme: (theme) => {
					localStorage.setItem(key, theme);
					setTheme(theme);
				},
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const obj = useContext(ThemeContext);

	return obj;
};
