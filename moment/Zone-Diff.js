var now = momentz.utc();
// get the zone offsets for this time, in minutes
var NewYork_tz_offset = momentz.tz.zone("America/New_York").utcOffset(now);
var User_tz_offset = momentz.tz.zone("America/Dominica").utcOffset(now);
// calculate the difference in hours
var ZoneDiff = ((NewYork_tz_offset - User_tz_offset) / 60);
console.log(ZoneDiff);




//  Describ

// let nnn = momentz.tz("America/New_York").format('ZZ');
// let ttt = momentz.tz("Asia/Tehran").format('ZZ');
// console.log(nnn);
// console.log(ttt);


// // let lll = momentz.tz("America/Argentina/Buenos_Aires").format('ZZ');
// let lll = momentz.tz("America/Dominica").format('ZZ');
// console.log(lll);
