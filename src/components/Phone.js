import React from "react";

export default function Phone({ messages = [], headerName = "Bot" }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-statusbar">
          <span>9:41</span>
          <span>
            <span style={{ marginRight: 4 }}>●●●●</span>
            <span className="battery" />
          </span>
        </div>
        <div className="phone-header">
          <span className="avatar">{headerName[0]?.toUpperCase()}</span>
          <span>{headerName}</span>
        </div>
        <div className="phone-body">
          {messages.map((m, i) => {
            if (m.typing) {
              return (
                <div key={i} className="phone-msg them typing">
                  <span /><span /><span />
                </div>
              );
            }
            return (
              <div key={i} className={`phone-msg ${m.from}`}>{m.text}</div>
            );
          })}
        </div>
        <div className="phone-input">
          <span className="field">type a message…</span>
          <span className="send">↑</span>
        </div>
      </div>
    </div>
  );
}
