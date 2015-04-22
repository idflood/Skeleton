function convertDateToUS(date) {
  var dateSplit = date.split('.');
  return dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0];
}

function timeElement(date) {
  var dateUS = convertDateToUS(date);

  return '<time datetime="' + dateUS + '" itemprop="datePublished">' + date + '</time>';
}
module.exports.timeElement = timeElement;

function timeElementEvent(date) {
  if (date instanceof Array) {
    // Start and end date.
    var date1US = convertDateToUS(date[0]);
    var date2US = convertDateToUS(date[1]);

    var date1Split = date[0].split('.');
    var date2Split = date[1].split('.');
    // First date always display the day (always different).
    var date1Display = date1Split[0] + '.';
    if (date1Split[1] != date2Split[1]) {
      // Add the month if different.
      date1Display += date1Split[1] + '.';
    }
    if (date1Split[2] != date2Split[2]) {
      // Add the year if different.
      date1Display += date1Split[2];
    }
    var result = '<time datetime="' + date1US + '" itemprop="startDate">' + date1Display + '</time>';
    result += '-' + '<time datetime="' + date2US + '" itemprop="endDate">' + date[1] + '</time>';
    return result;
  }
  else {
    // One day event.
    var dateUS = convertDateToUS(date);
    var result = '<time datetime="' + dateUS + '" itemprop="startDate">' + date + '</time>';
    result += '<meta itemprop="endDate" content="' + dateUS + '">';
    return result;
  }
}
module.exports.timeElementEvent = timeElementEvent;

function itemCurrentLabel(data, options) {
  var labelElements = [];
  if (data.date) {
    if (options.icon === 'event') {
      // If this is an event we need to set the start and end date.
      labelElements.push(timeElementEvent(data.date));
    }
    else {
      // If this is an article simply set the publisehed date.
      labelElements.push(timeElement(data.date));
    }
  }

  // Add the location for event type.
  if (data.location) {
    labelElements.push('<span itemprop="location">' + data.location + '</span>');
  }

  if (labelElements.length) {
    data.label = labelElements.join(' ') + ' | ' + data.label;
  }
}
module.exports.itemCurrentLabel = itemCurrentLabel;
