exports.checkBase64 = (file) => {
  const regex = new RegExp(/data:([a-zA-Z]*)\/([a-zA-Z]*);base64,([^\"]*)/g);
  return regex.test(file);
};
