var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=4eb993c775f7eb2d80cdad248a377089&units=imperial';

module.exports={
  getTemp: function(location){
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

    return axios.get(requestUrl).then(function (res) {
      if(res.data.cod && res.data.message){
        throw new Error(res.data.message);
      } else{
        return res.data.main.temp;
      }
    }, function (res){
      throw new Error(res.data.message);
    });

  }
}
