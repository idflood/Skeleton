function timeElement(date) {
  var dateSplit = date.split('.');
  var dateUS = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0];

  return '<time datetime="' + dateUS + '">' + date + '</time>';
}

module.exports.timeElement = timeElement;
