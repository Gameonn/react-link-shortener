const ShortLink = (props) => {
  const classes = ["row"];
  const hideClass = props.link ? "" : "hide";
  classes.push(hideClass);
  return (
    <div className={classes.join(" ")}>
      <div
        className="section"
        style={{ border: "2px solid #eee", borderRadius: "5px" }}
      >
        <span className="flow-text"> {props.link} </span>
        <span className="waves-effect waves-light teal lighten-2">
          <button
            type="button"
            className="waves-effect waves-light btn"
            onClick={() => {
              navigator.clipboard.writeText(props.link);
            }}
          >
            Copy
            <i className="material-icons left">content_copy</i>
          </button>
        </span>
      </div>
    </div>
  );
};

export default ShortLink;
