export const formatName = (name) => {
  const newName = name.split("");

  const firstLetter = newName[0].toUpperCase();
  const restOfName = newName.slice(1);
  return firstLetter + restOfName.join("");
};
