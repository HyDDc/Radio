import React from "react";
import Radio from "./Radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const utilizeScroll = () => {
  const elRef = React.createRef();
  const executeScroll = () => elRef.current.scrollIntoView();

  return { executeScroll, elRef };
};

export default class RadioList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.elScroll = utilizeScroll();
    this.state = {
      radios: [],
      playing: false,
      imageVisible: false,
      complete: false,
      currentStation: [],
      lastStation: false,
      firstStation: false
    };
  }

  async componentDidMount() {
    const url = "https://teclead.de/recruiting/radios";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ radios: data.radios, loading: false });
  }

  toggleComplete = (id, index) => {
    this.setState((state) => ({
      radios: state.radios.map((radio) => {
        if (radio.frequency === id) {
          if (index === 0) {
            return {
              ...radio,
              complete: !radio.complete,
              firstStation: true
            };
          }
          if (this.state.radios.length - 1 === index) {
            return {
              ...radio,
              complete: !radio.complete,
              lastStation: true
            };
          }

          return {
            ...radio,
            complete: !radio.complete
          };
        } else {
          return {
            ...radio,
            complete: false
          };
        }
      })
    }));
  };

  onForward = (id, index) => {
    this.setState((state) => ({
      radios: state.radios.map((radio) => {
        if (index === this.state.radios.length) {
          console.log("last");
        }
        if (this.state.radios[index + 1].frequency === radio.frequency) {
          if (index + 1 === this.state.radios.length - 1) {
            return {
              ...radio,
              complete: true,
              lastStation: true
            };
          }
          return {
            ...radio,
            complete: true
          };
        } else {
          return {
            ...radio,
            complete: false,
            lastStation: false
          };
        }
      })
    }));
  };

  onBack = (id, index) => {
    this.setState((state) => ({
      radios: state.radios.map((radio) => {
        if (index === 1) {
          console.log("first");
        }
        if (this.state.radios[index - 1].frequency === radio.frequency) {
          if (index === 1) {
            return {
              ...radio,
              complete: true,
              firstStation: true
            };
          }
          return {
            ...radio,
            complete: true
          };
        } else {
          return {
            ...radio,
            complete: false,
            firstStation: false
          };
        }
      })
    }));
  };

  playMusic = () => {
    this.toggleComplete(this.state.radios.frequency);
  };

  render() {
    let radios = this.state.radios;
    const currentStation = this.state.radios.find(
      (radio) => radio.complete === true
    );

    return (
      <div>
        <div className="Header">
          <div>
            <h2>Stations</h2>
          </div>
          <div className="Icon">
            <FontAwesomeIcon
              className="fa-play fa-2x"
              onClick={() => this.playMusic(currentStation)}
              icon={faPowerOff}
            />
          </div>
        </div>
        <div className="Stations">
          {radios.map((radio, index) => (
            <Radio
              onClick={this.elScroll.executeScroll}
              key={radio.frequency}
              ref={this.elScroll.elRef}
              toggleComplete={() => this.toggleComplete(radio.frequency, index)}
              onBack={() => this.onBack(radio.frequency, index)}
              onForward={() => this.onForward(radio.frequency, index)}
              radio={radio}
            />
          ))}
        </div>
        <div className="Footer">
          {currentStation && (
            <div>
              CURRENTLY PLAYING: <h3>{currentStation.name}</h3>
            </div>
          )}
        </div>
        <div></div>
      </div>
    );
  }
}
