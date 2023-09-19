import { Link } from 'react-router-dom';

const FormatAuthors = ({ ar }) => {
  if (ar.length === 1) {
    return <Link to={ar[0].id} key={ar[0].id}>{ar[0].name}</Link>;
  }

  return ar
    .map((one) => <Link to={`/artist?id=${one.id}`} key={one.id}>{one.name}</Link>)
    .reduce((prev, curr) => [prev, '/', curr]);
};

export default FormatAuthors;
