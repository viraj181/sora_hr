interface AutoGenerateOptions {
  isUpperCase?: boolean;
  isLowerCase?: boolean;
  isSymbol?: boolean;
  isNumber?: boolean;
  length: number;
}

export const AutoGenerate = (options: AutoGenerateOptions): string => {
  const {
    isUpperCase = true,
    isLowerCase = true,
    isSymbol = true,
    isNumber = true,
    length,
  } = options;

  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const numberChars = "0123456789";

  let allowedChars = "";
  if (isUpperCase) allowedChars += upperCaseChars;
  if (isLowerCase) allowedChars += lowerCaseChars;
  if (isSymbol) allowedChars += symbolChars;
  if (isNumber) allowedChars += numberChars;

  if (!allowedChars) {
    throw new Error("At least one character type must be selected.");
  }

  // Ensure at least one character from each selected type
  let AutoGenerateValue = "";
  if (isUpperCase)
    AutoGenerateValue +=
      upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  if (isLowerCase)
    AutoGenerateValue +=
      lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  if (isSymbol)
    AutoGenerateValue +=
      symbolChars[Math.floor(Math.random() * symbolChars.length)];
  if (isNumber)
    AutoGenerateValue +=
      numberChars[Math.floor(Math.random() * numberChars.length)];

  // Fill the remaining characters randomly
  for (let i = AutoGenerateValue.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    AutoGenerateValue += allowedChars[randomIndex];
  }

  // Shuffle the password to ensure randomness
  AutoGenerateValue = AutoGenerateValue.split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return AutoGenerateValue;
};
