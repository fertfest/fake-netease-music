const formatDate = (date) => {
  let day = date.getDate();
  day = day < 10 ? `0${day}` : `${day}`;

  let month = date.getMonth() + 1;
  month = month < 10 ? (`0${month}`) : (`${month}`);

  return `${month}月${day}日`;
};

export default formatDate;
