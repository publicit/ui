function trimAll(s) {
  switch (typeof s) {
    case "string":
      return s.trim();
    case "object":
      for (const [key] of Object.entries(s)) {
        s[key] = trimAll(s[key]);
      }
  }
  return s;
}

export default {
  trimAll,
};
