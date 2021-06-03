import Shortener from "../Shortener/Shortener";

const Home = (props) => {
  return (
    <div className="row teal lighten-4">
      <div className="section">
        <h3>Welcome to the ShortyLink</h3>
        <div className="divider"></div>
        <p className="flow-text teal-text">
          Generate Short Link in a flash and use everywhere
        </p>
        <div className="divider"></div>
        <div className="row section">
          <div className="col s6 offset-s3">
            <div className="waves-effect waves-light teal lighten-2 circle">
              <i className="material-icons large">link</i>
            </div>
          </div>
        </div>
      </div>
      <Shortener />
    </div>
  );
};

export default Home;
