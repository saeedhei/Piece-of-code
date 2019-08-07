var live = momentz.tz("America/New_York");
const myDate = momentz.tz('2019-08-07 08:32', 'America/New_York');

var diffTime = momentz(myDate)
  .diff(live);
var duration = momentz.duration(diffTime);
var years = duration.years(),
  days = duration.days(),
  hrs = duration.hours(),
  mins = duration.minutes(),
  secs = duration.seconds();

const div = years + ' years ' + days + ' days ' + hrs + ' hrs ' + mins + ' mins ' + secs + ' sec';
console.log(div);

console.log('New York current time is: ' + live.format('ddd YYYY-MM-DD hh:mm:ss'));
