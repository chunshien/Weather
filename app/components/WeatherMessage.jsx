var React = require('react');

// var WeatherMessage = React.createClass({
//   render: function () {
//
//     var {temp, location} = this.props
//
//     return (
//       <h3>It's it {temp} in {location}.</h3>
//     )
//   }
// });

var WeatherMessage = ({temp, location})=>{
  //var {temp, location} = props

  return (
    <h1 className="text-center">It's it {temp} in {location}.</h1>
  )
};


module.exports = WeatherMessage;
