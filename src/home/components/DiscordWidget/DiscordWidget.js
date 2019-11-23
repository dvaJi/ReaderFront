import React from 'react';

export default function DiscordWidget({ discordId }) {
  return (
    <div className="Discord">
      <h3>Discord</h3>
      <iframe
        title="Discord"
        src={`https://discordapp.com/widget?id=${discordId}&theme=dark`}
        width="350"
        height="500"
        allowtransparency="true"
        frameBorder="0"
      />
    </div>
  );
}
