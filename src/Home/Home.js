import React, { useState, useRef, useEffect } from "react";
import NotFound from "../NotFound";

const Home = (props) => {
  const inputEl = useRef(null);
  const [slugDiv, setSlugDiv] = useState(null);
  const [path, setPath] = useState(null);
  const [transferLink, setTransferLink] = useState(null);
  useEffect(() => {
    const pathname = window.location.pathname.replace(/^\/|\/$/g, "");
    if (pathname) {
      setPath(pathname);
      const savedLinks = JSON.parse(localStorage.getItem("links"));
      const linkToTransfer = Object.keys(savedLinks).find(
        (key) => savedLinks[key] === pathname
      );
      if (linkToTransfer) {
        window.location.href = linkToTransfer;
        setTransferLink(linkToTransfer);
      }
    }
  }, []);

  const formHandler = (e) => {
    e.preventDefault();
    const newUrl = inputEl.current.value;
    const prevSavedShortLinks = JSON.parse(localStorage.getItem("links"));
    let linkReference = null;
    if (prevSavedShortLinks) linkReference = prevSavedShortLinks[newUrl];

    if (!linkReference) {
      linkReference = generateAndValidateLink();
      let updatedLinks = { ...prevSavedShortLinks, [newUrl]: linkReference };
      localStorage.setItem("links", JSON.stringify(updatedLinks));
    }
    const urlWithSlug = window.location.origin + "/" + linkReference;
    const urlWithSlugDiv = (
      <div
        className="section"
        style={{ border: "2px solid #eee", borderRadius: "5px" }}
      >
        <span className="flow-text"> {urlWithSlug} </span>
        <span className="waves-effect waves-light teal lighten-2">
          <a
            className="waves-effect waves-light btn"
            onClick={() => {
              navigator.clipboard.writeText(urlWithSlug);
            }}
          >
            Copy
            <i className="material-icons left">content_copy</i>
          </a>
        </span>
      </div>
    );
    setSlugDiv(urlWithSlugDiv);
  };

  const generateAndValidateLink = () => {
    let valid = false;
    let slug = generateRandomSlug();
    valid = validateSlug(slug);
    if (valid) return slug;
    else generateAndValidateLink();
  };

  const generateRandomSlug = () => {
    const length = 6;
    const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    let slug = "";
    for (let p = 0; p < length; p++) {
      slug += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return slug;
  };

  const validateSlug = (slug) => {
    const links = JSON.parse(localStorage.getItem("links"));
    console.log(links);
    if (!links) return true;
    if (Object.values(links).indexOf(slug) > -1) {
      return false;
    }
    return true;
  };

  const changeClassHandler = (e) => {
    e.target.nextSibling.className = "active";
  };

  if (path && !transferLink) return <NotFound />;

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
      <div className="row">
        <div className="col s8 offset-s2">
          <form onSubmit={(e) => formHandler(e)}>
            <h6>Enter the link you want to shorten:</h6>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">insert_link</i>
                <input
                  id="url"
                  type="url"
                  className="validate"
                  ref={inputEl}
                  onClick={(e) => changeClassHandler(e)}
                />
                <label htmlFor="url">URL</label>
              </div>
              <button className="waves-effect waves-light btn" type="submit">
                Shorten
              </button>
            </div>
          </form>
          {slugDiv}
        </div>
      </div>
    </div>
  );
};

export default Home;
