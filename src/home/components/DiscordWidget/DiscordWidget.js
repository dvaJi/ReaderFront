import React, { PureComponent } from "react";

export default class DiscordWidget extends PureComponent {
  render() {
    return (
      <div className="Discord">
        <h3>Discord</h3>
        <iframe
          title="Discord"
          src={`https://discordapp.com/widget?id=${this.props.discordId}&theme=dark`}
          width="350"
          height="500"
          allowtransparency="true"
          frameBorder="0"
        />
      </div>
    );
  }
}
