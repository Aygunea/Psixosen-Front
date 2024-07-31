import moment from 'moment';

function groupedDays(messages) {
  return messages.reduce((acc, el) => {
    const messageDay = moment(el.createdAt).format('YYYY-MM-DD');
    if (!acc[messageDay]) {
      acc[messageDay] = [];
    }
    acc[messageDay].push(el);
    return acc;
  }, {});
}

function generateItems(messages) {
  const days = groupedDays(messages);
  // Sort the days in ascending order
  const sortedDays = Object.keys(days).sort(
    (x, y) => moment(x, 'YYYY-MM-DD').unix() - moment(y, 'YYYY-MM-DD').unix()
  );
  return sortedDays.reduce((acc, date) => {
    // Sort messages for each day in ascending order
    const sortedMessages = days[date].sort(
      (x, y) => new Date(x.createdAt) - new Date(y.createdAt)
    );
    return [...acc, { type: 'day', date, id: date }, ...sortedMessages];
  }, []);
}

export default generateItems;
