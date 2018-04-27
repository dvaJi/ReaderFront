import React from "react";
import PropTypes from "prop-types";
import * as config from "../config";

const SHORTNAME = config.DISQUS_SHORTNAME;
const WEBSITE_URL = config.APP_URL;

function renderDisqus() {
  if (window.DISQUS === undefined) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://" + SHORTNAME + ".disqus.com/embed.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusThread extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path
    );
  }

  componentDidMount() {
    renderDisqus();
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    let { id, title, path, ...other } = this.props;

    window.disqus_shortname = SHORTNAME;
    window.disqus_identifier = id;
    window.disqus_title = title;
    window.disqus_url = WEBSITE_URL + path;

    return <div {...other} id="disqus_thread" />;
  }
}

export default DisqusThread;
