const formatAuthors = (ar) => {
  if (ar.length === 1) {
    return ar[0].name;
  }

  return ar.reduce((prev, cur, idx) => {
    if (idx !== 0) {
      return `${prev}/${cur.name}`;
    }
    return cur.name;
  }, '');
};

export default formatAuthors;
