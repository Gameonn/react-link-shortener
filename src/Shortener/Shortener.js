import React, { useState, useRef, useEffect } from "react";
import NotFound from "../NotFound";
import ShortLink from "./ShortLink";

const Shortener = (props) => {
  const inputEl = useRef(null);
  const [shortUrl, setShortUrl] = useState(null);
  const [path, setPath] = useState(null);
  const [transferLink, setTransferLink] = useState(null);
  useEffect(() => {
    const pathname = window.location.pathname.replace(/^\/|\/$/g, "");
    console.log(pathname, "pathname");
    if (pathname) {
      setPath(pathname);
      const savedLinks = JSON.parse(localStorage.getItem("links"));
      const linkToTransfer = Object.keys(savedLinks).find(
        (key) => savedLinks[key] === pathname
      );
      console.log(linkToTransfer, "linkToTransfer");
      if (linkToTransfer) {
        console.log(window.location, "window location");
        window.location.href = linkToTransfer;
        setTransferLink(linkToTransfer);
      }
    }
  }, []);

  const formHandler = (e) => {
    e.preventDefault();
    const newUrl = inputEl.current.value.replace(/^\/|\/$/g, "");
    console.log(newUrl, "newUrl");
    const prevSavedShortLinks = JSON.parse(localStorage.getItem("links"));
    console.log(prevSavedShortLinks, "savedLinks");
    let linkReference = null;
    if (prevSavedShortLinks) linkReference = prevSavedShortLinks[newUrl];
    console.log(linkReference, "linkReference");
    if (!linkReference) {
      linkReference = generateAndValidateLink();
      let updatedLinks = { ...prevSavedShortLinks, [newUrl]: linkReference };
      localStorage.setItem("links", JSON.stringify(updatedLinks));
    }
    const urlWithSlug = window.location.origin + "/" + linkReference;
    setShortUrl(urlWithSlug);
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

  if (path) {
    if (!transferLink) return <NotFound />;
    else return false;
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <form onSubmit={(e) => formHandler(e)}>
          <h6>Enter the link you want to shorten:</h6>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">insert_link</i>
              <input
                type="url"
                id="url"
                ref={inputEl}
                className="validate"
                onClick={changeClassHandler}
              />
              <label htmlFor="url">URL</label>
            </div>
            <button className="waves-effect waves-light btn" type="submit">
              Shorten
            </button>
          </div>
        </form>
        <ShortLink link={shortUrl} />
      </div>
    </div>
  );
};

export default Shortener;
