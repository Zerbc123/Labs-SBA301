/**
 * DashboardMessages.jsx
 *
 * Child route rendered inside Dashboard's <Outlet> at "/dashboard/messages".
 * Demonstrates how nested child routes receive their parent's URL prefix.
 */

const messages = [
  { id: 1, from: "Alice", text: "New Phalaenopsis batch just arrived! 🌸", time: "09:12" },
  { id: 2, from: "Bob", text: "The Vanda order shipped yesterday.", time: "10:45" },
  { id: 3, from: "Carol", text: "Reminder: watering schedule for Dendrobium.", time: "11:30" },
  { id: 4, from: "David", text: "Miltoniopsis just bloomed — photos attached!", time: "14:02" },
];

function DashboardMessages() {
  return (
    <div className="child-route">
      <div className="child-route-header">
        <h2>💬 Messages</h2>
        <p>Rendered by <code>&lt;DashboardMessages&gt;</code> inside <code>&lt;Outlet&gt;</code> at <code>/dashboard/messages</code></p>
      </div>
      <ul className="message-list" aria-label="Messages">
        {messages.map((msg) => (
          <li key={msg.id} className="message-item">
            <div className="msg-avatar" aria-hidden="true">
              {msg.from[0]}
            </div>
            <div className="msg-content">
              <span className="msg-from">{msg.from}</span>
              <span className="msg-text">{msg.text}</span>
            </div>
            <time className="msg-time">{msg.time}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardMessages;
