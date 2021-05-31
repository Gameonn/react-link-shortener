// import React, { useState, useRef } from "react";

// export function useHome() {
//   const inputEl = useRef(null);
//   const [slugDiv, setSlugDiv] = useState(null);

//   export const formHandler = (e) => {
//     e.preventDefault();
//     const newUrl = inputEl.current.value;
//     console.log(newUrl);
//     console.log(window.location.origin);
//     const prevSavedShortLinks = JSON.parse(localStorage.getItem("links"));
//     let linkReference = null;
//     if (prevSavedShortLinks) linkReference = prevSavedShortLinks[newUrl];

//     if (!linkReference) {
//       linkReference = generateAndValidateLink();
//       let updatedLinks = { ...prevSavedShortLinks, [newUrl]: linkReference };
//       localStorage.setItem("links", JSON.stringify(updatedLinks));
//     }
//     const urlWithSlug = window.location.origin + "/" + linkReference;
//     const urlWithSlugDiv = (
//       <div
//         className="section"
//         style={{ border: "2px solid #eee", borderRadius: "5px" }}
//       >
//         <span className="flow-text"> {urlWithSlug} </span>
//         <span className="waves-effect waves-light teal lighten-2">
//           <a
//             className="waves-effect waves-light btn"
//             onClick={() => {
//               navigator.clipboard.writeText(urlWithSlug);
//             }}
//           >
//             Copy
//             <i className="material-icons left">content_copy</i>
//           </a>
//         </span>
//       </div>
//     );
//     setSlugDiv(urlWithSlugDiv);
//   };

//   const generateAndValidateLink = () => {
//     let valid = false;
//     let slug = generateRandomSlug();
//     console.log(slug, "slug");
//     valid = validateSlug(slug);
//     console.log(valid, "valid");
//     if (valid) return slug;
//     else generateAndValidateLink();
//   };

//   const generateRandomSlug = () => {
//     const length = 6;
//     const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
//     let slug = "";
//     for (let p = 0; p < length; p++) {
//       slug += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return slug;
//   };

//   const validateSlug = (slug) => {
//     const links = JSON.parse(localStorage.getItem("links"));
//     console.log(links);
//     if (!links) return true;
//     if (Object.values(links).indexOf(slug) > -1) {
//       return false;
//     }
//     return true;
//   };

//   export const changeClassHandler = (e) => {
//     e.target.nextSibling.className = "active";
//   };
// }

// export default useHome;
