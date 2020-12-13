export const validateContent = (text) => {
  if (!text) {
    return "Campo não pode ser vazio";
  }
};

export const validateLength = (text) => {
  if (text && text.length < 3) {
    return 'Deve conter 3 letrar ou mais';
  }
};