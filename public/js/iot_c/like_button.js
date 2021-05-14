'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlsManager = function (_React$Component) {
  _inherits(ControlsManager, _React$Component);

  function ControlsManager(props) {
    _classCallCheck(this, ControlsManager);

    var _this = _possibleConstructorReturn(this, (ControlsManager.__proto__ || Object.getPrototypeOf(ControlsManager)).call(this, props));

    _this.state = {
      alive: false,
      pumpState: 0,
      automaticIrrigation: 0,
      exaustingState: 0,
      automaticExausting: 0,
      fertirrigationState: 0,
      automaticFertirrigation: 0,
      airHumidity: 0,
      airTemperature: 0,
      soilMoisture: 0
    };

    _this.setIntervals = _this.setIntervals.bind(_this);
    _this.getGreenhouseData = _this.getGreenhouseData.bind(_this);
    _this.unpackGreenhouseData = _this.unpackGreenhouseData.bind(_this);

    _this.togglePump = _this.togglePump.bind(_this);
    _this.toggleExaust = _this.toggleExaust.bind(_this);
    _this.toggleFertirrigation = _this.toggleFertirrigation.bind(_this);

    _this.toggleAutomaticIrrigation = _this.toggleAutomaticIrrigation.bind(_this);
    _this.toggleAutomaticExausting = _this.toggleAutomaticExausting.bind(_this);
    _this.toggleAutomaticFertirrigation = _this.toggleAutomaticFertirrigation.bind(_this);

    _this.getGreenhouseData();
    _this.setIntervals();
    return _this;
  }

  _createClass(ControlsManager, [{
    key: 'setIntervals',
    value: function setIntervals() {
      var _this2 = this;

      // Atualização em tempo real dos dados da estufa
      // posso colocar no esp para retornar os dados da estufa como resposta aos commands
      // para isso eu crio uma função para mandar os dados, para assim reaproveitar o código
      setInterval(function () {
        _this2.getGreenhouseData();
      }, 2000);
    }
  }, {
    key: 'unpackGreenhouseData',
    value: function unpackGreenhouseData(data) {
      this.setState({
        // adicionar alive = false em caso de erro no esp
        alive: true,
        pumpState: data.pumpState,
        automaticIrrigation: data.automaticIrrigation,
        exaustingState: data.exaustingState,
        automaticExausting: data.automaticExausting,
        fertirrigationState: data.fertirrigationState,
        automaticFertirrigation: data.automaticFertirrigation,
        airHumidity: data.airHumidity,
        airTemperature: data.airTemperature,
        soilMoisture: data.soilMoisture
      });
    }
  }, {
    key: 'getGreenhouseData',
    value: function getGreenhouseData(data) {
      var _this3 = this;

      if (data) {
        this.unpackGreenhouseData(data);
        console.log(data);
      } else {
        // pega pelo axios
        axios.get('http://192.168.0.108/greenhouse').then(function (res) {
          var data = res.data;
          _this3.unpackGreenhouseData(data);
          document.body.classList.add('loaded');
        });
      }
    }
  }, {
    key: 'toggleAutomaticIrrigation',
    value: function toggleAutomaticIrrigation(state) {
      var _this4 = this;

      if (state) {
        state = 1;
      } else {
        state = 0;
      }
      //this.setState({ automaticIrrigation: state });
      axios.get('http://192.168.0.108/command?automaticIrrigation=' + state).then(function (res) {
        _this4.getGreenhouseData(res.data);
      });
    }
  }, {
    key: 'toggleAutomaticExausting',
    value: function toggleAutomaticExausting(state) {
      var _this5 = this;

      if (state) {
        state = 1;
      } else {
        state = 0;
      }
      //this.setState({ automaticExausting: state });
      axios.get('http://192.168.0.108/command?automaticExausting=' + state).then(function (res) {
        _this5.getGreenhouseData(res.data);
      });
    }
  }, {
    key: 'toggleAutomaticFertirrigation',
    value: function toggleAutomaticFertirrigation(state) {
      var _this6 = this;

      if (state) {
        state = 1;
      } else {
        state = 0;
      }
      //this.setState({ automaticFertirrigation: state });
      axios.get('http://192.168.0.108/command?automaticFertirrigation=' + state).then(function (res) {
        _this6.getGreenhouseData(res.data);
      });
    }
  }, {
    key: 'togglePump',
    value: function togglePump(state) {
      var _this7 = this;

      if (state) {
        state = 1;
      } else {
        state = 0;
      }
      axios.get('http://192.168.0.108/command?pump=' + state).then(function (res) {
        _this7.getGreenhouseData(res.data);
      });
    }
  }, {
    key: 'toggleExaust',
    value: function toggleExaust(state) {
      var _this8 = this;

      if (state) {
        state = 1;
      } else {
        state = 0;
      }
      axios.get('http://192.168.0.108/command?exaust=' + state).then(function (res) {
        _this8.getGreenhouseData(res.data);
      });
    }
  }, {
    key: 'toggleFertirrigation',
    value: function toggleFertirrigation(state) {
      var _this9 = this;

      if (state) {
        state = 1;
      } else {
        state = 0;
      }
      axios.get('http://192.168.0.108/command?fertirrigation=' + state).then(function (res) {
        _this9.getGreenhouseData(res.data);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(Card, { cardTitle: "Controle de Irrigação",
          toggleFlag1: this.state.automaticIrrigation, callback1: this.toggleAutomaticIrrigation,
          toggleFlag2: this.state.pumpState, callback2: this.togglePump }),
        React.createElement(Card, { cardTitle: "Controle de Exaustão",
          toggleFlag1: this.state.automaticExausting, callback1: this.toggleAutomaticExausting,
          toggleFlag2: this.state.exaustingState, callback2: this.toggleExaust }),
        React.createElement(Card, { cardTitle: "Controle de Fertirrigação",
          toggleFlag1: this.state.automaticFertirrigation, callback1: this.toggleAutomaticFertirrigation,
          toggleFlag2: this.state.fertirrigationState, callback2: this.toggleFertirrigation })
      );
    }
  }]);

  return ControlsManager;
}(React.Component);

var Card = function (_React$Component2) {
  _inherits(Card, _React$Component2);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this10 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

    _this10.texts1 = ["Automático", "Manual"];
    _this10.texts2 = ["Ligado", "Desligado"];

    _this10.toggleFirstState = _this10.toggleFirstState.bind(_this10);
    _this10.toggleSecondState = _this10.toggleSecondState.bind(_this10);
    return _this10;
  }

  // Automatic Inteligence


  _createClass(Card, [{
    key: 'toggleFirstState',
    value: function toggleFirstState() {
      var bool = !this.props.toggleFlag1;
      this.props.callback1(bool);
      // emitir para o backend
    }
  }, {
    key: 'toggleSecondState',
    value: function toggleSecondState() {
      var bool = !this.props.toggleFlag2;
      this.props.callback2(bool);
    }
  }, {
    key: 'returnFirstLabel',
    value: function returnFirstLabel(bool) {
      return bool ? this.texts1[0] : this.texts1[1];
    }
  }, {
    key: 'returnSecondLabel',
    value: function returnSecondLabel(bool) {
      return bool ? this.texts2[0] : this.texts2[1];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          toggleFlag1 = _props.toggleFlag1,
          toggleFlag2 = _props.toggleFlag2;

      return React.createElement(
        'div',
        { className: 'col-lg-4 col-md-4' },
        React.createElement(
          'div',
          { className: 'card' },
          React.createElement(
            'div',
            { className: 'card-header' },
            React.createElement(
              'h5',
              { className: 'card-category' },
              this.props.cardTitle
            ),
            React.createElement(
              'h4',
              { className: 'card-title automatic-control' },
              this.returnFirstLabel(toggleFlag1)
            ),
            React.createElement(
              'span',
              { className: 'toggle-switch ' + (toggleFlag1 ? 'active' : ''), onClick: this.toggleFirstState },
              React.createElement('span', { className: 'toggle-knob' })
            )
          ),
          React.createElement(
            'div',
            { className: 'card-body' },
            React.createElement(
              'h4',
              { className: 'card-title automatic-control ' + (toggleFlag1 ? 'not-active-label' : '') },
              this.returnSecondLabel(toggleFlag2)
            ),
            React.createElement(
              'span',
              { className: 'toggle-switch ' + (toggleFlag2 ? 'active' : '') + ' ' + (toggleFlag1 ? 'not-active' : ''), onClick: this.toggleSecondState },
              React.createElement('span', { className: 'toggle-knob' })
            )
          )
        )
      );
    }
  }]);

  return Card;
}(React.Component);

ReactDOM.render(React.createElement(ControlsManager, null), document.getElementById('like_button_container'));