var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
  getInitialState: function(){
    return{
      isLoading: false
    }
  },
  handleSearch: function(location){
    var that = this;
    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined
    });

    openWeatherMap.getTemp(location).then(function(temp){
      that.setState({
        location: location,
        temp: temp,
        isLoading: false
      });
    }, function(e){
        //alert(errorMessage);
        that.setState({
          isLoading: false,
          errorMessage: e.message
        });

    });

  },
  componentDidMount: function(){
    var location = this.props.location.query.location;

    if(location && location.length > 0){
      this.handleSearch(location);
      window.location.hash = '#/'
    }

  },
  componentWillReceiveProps: function(newProps){
    var location = newProps.location.query.location;

    if(location && location.length > 0){
      this.handleSearch(location);
      window.location.hash = '#/'
    }
  },
  render: function () {
    var {isLoading, temp, location, errorMessage}= this.state;

    function renderMessage(){
      //debugger;
      if(isLoading){
        return <h1 className="text-center">Fetching weather...</h1>;
      }else if(temp && location) {
        //errorMessage = undefined;
        return <WeatherMessage temp={temp} location={location}/>;
      }
    }

    function renderError(){
      //debugger;
      if(typeof errorMessage === 'string'){
        return (
          //debugger;
          //<ErrorModal/>
          <ErrorModal message={errorMessage} />
        );
      }
    }

    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch} />
        {renderMessage()}
        {renderError()}
      </div>
    )
  }

});

module.exports = Weather;
