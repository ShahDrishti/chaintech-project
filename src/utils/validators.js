//validation rules and helpers

export const validateName = (value) =>
	!value
		? "Name is required"
		: value.length < 3
			? "Name must be at least 3 characters"
			: !/^[a-zA-Z ]+$/.test(value)
				? "Name can contain only letters and spaces"
				: "";

export const validateEmail = (value) =>
	!value
		? "Email is required"
		: !/^[^@]+@[^@]+\.[^@]+$/.test(value)
			? "Email is invalid"
			: "";

export const validatePhone = (value) =>
	!value
		? "Phone number is required"
		: (() => {
			const digits = String(value).replace(/\D/g, "");
			return digits.length < 10 ? "Phone number must be at least 10 digits" : "";
		})();

export const validateAge = (value) => {
	if (value === "" || value === null || value === undefined) return "";
	const num = Number(value);
	if (Number.isNaN(num)) return "Age must be a valid number";
	if (num < 0) return "Age cannot be negative";
	if (num > 100) return "Age cannot be greater than 100";
	return "";
};

export const validatePassword = (value) =>
	!value
		? "Password is required"
		: String(value).length < 6
			? "Password must be at least 6 characters"
			: "";

// Helpers
export const getError = (validators, field, form) =>
	validators[field] ? validators[field](form[field]) : "";

export const isFormValid = (validators, form) =>
	Object.keys(validators).every((field) => validators[field](form[field]) === "");


