const dateRegex = /^(\d+)\/(\d+)\/(\d+)$/;

function parseDate(value: string) {
  if (!dateRegex.test(value)) {
    return null;
  }

  const date = new Date(value);

  if (!isFinite(Number(date))) {
    return null;
  }

  return date;
}

function formatDate(date: Date | null) {
  if (!date) {
    return '';
  }

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export { formatDate, parseDate };
