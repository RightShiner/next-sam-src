function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

export const DateToString = (val) => {
  if (val === null) {
    return null;
  } else {
    const date = new Date(val).toLocaleDateString('ja-JA', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return date;
  }
};

export const numToDate = (val) => {
  let type = typeof val;
  const date = new Date(
    type === 'number' ? val * 1000 : val,
  ).toLocaleDateString('ja-JA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return date;
};

export const numToTime = (val) => {
  let type = typeof val;
  const time = new Date(
    type === 'number' ? val * 1000 : val,
  ).toLocaleTimeString('ja-JA', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return time;
};

export const numToDuration = (num) => {
  const min = Math.floor(num / 60);
  const sec = Math.floor(num) % 60;
  return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
};
