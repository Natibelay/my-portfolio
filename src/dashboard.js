import { useEffect, useState } from "react";

// Dashboard Component
export default function Dashboard({ token }) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingMessage, setEditingMessage] = useState("");

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
      setLoadingUsers(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoadingUsers(false);
    }
  };

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();
      setMessages(data);
      setLoadingMessages(false);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
    fetchMessages();
  }, [token]);

  // Delete message by ID with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, { method: "DELETE" });
      setMessages(messages.filter(msg => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  // Start editing a message
  const startEditing = (id, currentMessage) => {
    setEditingId(id);
    setEditingMessage(currentMessage);
  };

  // Save edited message
  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: editingMessage })
      });
      const updatedMsg = await res.json();
      setMessages(messages.map(msg => msg._id === id ? updatedMsg : msg));
      setEditingId(null);
      setEditingMessage("");
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>Dashboard</h2>

      

      {/* Messages Section */}
      <section>
        <h3>Contact Messages</h3>
        {loadingMessages ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {messages.map(msg => (
              <li key={msg._id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
                <strong>{msg.name}:</strong>{" "}
                {editingId === msg._id ? (
                  <>
                    <input 
                      type="text"
                      value={editingMessage}
                      onChange={(e) => setEditingMessage(e.target.value)}
                    />
                    <button onClick={() => saveEdit(msg._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {msg.message}
                    <button onClick={() => startEditing(msg._id, msg.message)} style={{ marginLeft: "10px" }}>Edit</button>
                    <button onClick={() => handleDelete(msg._id)} style={{ marginLeft: "5px" }}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
