import { Component } from "react";
// eslint-disable-next-line
import { withRouter } from "react-router-dom";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import ThemeContext from "./theme-context";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const data = await res.json();
    this.setState(Object.assign({ loading: false }, data.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => {
    window.location = "http://bit.ly/pet-adopt";
  };

  render() {
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    if (this.state.loading) {
      return (
        <div className="details">
          <h2>Loading...</h2>;
        </div>
      );
    }

    return (
      <ThemeContext.Consumer>
        {([theme]) => (
          <div className="details">
            <Carousel images={images} />
            <div>
              <h1>{name}</h1>
              <h2>
                {animal} - {breed} - {city}, {state}
              </h2>
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
              <p>{description}</p>
              {showModal && (
                <Modal>
                  <div>
                    <h2>Would you like to adopt {name}</h2>
                    <div className="buttons">
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.adopt}
                      >
                        Yes
                      </button>
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.toggleModal}
                      >
                        No. I am a monster
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
