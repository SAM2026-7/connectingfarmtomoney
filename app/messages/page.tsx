"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/components/AuthProvider";
import { Message, User } from "@/lib/types";

export default function Messages() {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("chat");
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Pick<User, "id" | "name" | "role" | "state">[]>([]);
  const [feedback, setFeedback] = useState("");

  const loadMessages = useCallback(() => {
    if (!user) return;
    Promise.all([fetch(`/api/messages?userId=${encodeURIComponent(user.id)}`), fetch("/api/users")])
      .then(async ([messageResponse, contactResponse]) => {
        const messageData = messageResponse.ok ? await messageResponse.json() : { data: [] };
        const contactData = contactResponse.ok ? await contactResponse.json() : { data: [] };
        setMessages(messageData.data ?? []);
        setContacts(contactData.data ?? []);
      })
      .catch(() => { setMessages([]); setContacts([]); });
  }, [user]);

  useEffect(() => {
    loadMessages();
    const onFocus = () => loadMessages();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadMessages]);

  const conversations = messages.filter(m => m.senderId === user?.id || m.receiverId === user?.id);
  const chatPartner = (msg: Message) => {
    if (msg.senderId === user?.id) return msg.receiverId;
    return msg.senderId;
  };

  const chatMessages = activeChat
    ? messages.filter(m => (m.senderId === user?.id && m.receiverId === activeChat) || (m.receiverId === user?.id && m.senderId === activeChat))
    : [];

  const getPartnerName = (id: string) => {
    const partner = contacts.find(user => user.id === id);
    return partner?.name || id;
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    if (!activeChat) return;
    setFeedback("");
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId: user?.id, receiverId: activeChat, content: message }),
    });
    if (response.ok) {
      const data = await response.json();
      setMessages(current => [...current, data.data]);
      setFeedback("Message sent successfully.");
    } else {
      const data = await response.json();
      setFeedback(data.error || "Unable to send message.");
    }
    setMessage("");
  };

  return (
    <DashboardLayout title="Messages" subtitle="Communicate with buyers, sellers, and agents">
    {user && ["farmer", "buyer"].includes(user.role) && <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }}><label htmlFor="new-contact" style={{ fontSize: "13px", fontWeight: 600 }}>New conversation</label><select id="new-contact" value={activeChat ?? ""} onChange={event => setActiveChat(event.target.value || null)} style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "6px", minWidth: "240px" }}><option value="">Select a contact to message</option>{contacts.map(contact => <option key={contact.id} value={contact.id}>{contact.name} ({contact.role})</option>)}</select></div>}
    {feedback && <p role="alert" style={{ color: feedback.includes("successfully") ? "var(--royal-green)" : "#a33a2a", fontSize: "13px" }}>{feedback}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "20px", height: "calc(100vh - 220px)", minHeight: "400px" }}>
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid var(--line)", fontWeight: 600, fontSize: "14px" }}>Conversations</div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {conversations.length === 0 ? (
              <div style={{ padding: "20px", color: "#708077", fontSize: "13px", textAlign: "center" }}>No messages yet.</div>
            ) : (
              conversations.map((msg, i) => {
                const partnerId = chatPartner(msg);
                return (
                  <div key={i} onClick={() => setActiveChat(partnerId)} style={{ padding: "14px 16px", borderBottom: "1px solid #f0f2ed", cursor: "pointer", background: activeChat === partnerId ? "#f5f7f3" : "transparent" }}>
                    <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>{getPartnerName(partnerId)}</div>
                    <div style={{ color: "#708077", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg.content}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {activeChat ? (
            <>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)", fontWeight: 600, fontSize: "14px" }}>
                {getPartnerName(activeChat)}
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.senderId === user?.id ? "flex-end" : "flex-start", maxWidth: "70%", background: msg.senderId === user?.id ? "var(--green)" : "#f0f2ed", color: msg.senderId === user?.id ? "white" : "var(--ink)", padding: "10px 14px", borderRadius: "12px", fontSize: "13px" }}>
                    {msg.content}
                  </div>
                ))}
              </div>
              <div style={{ padding: "16px", borderTop: "1px solid var(--line)", display: "flex", gap: "10px" }}>
                <input type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--line)", borderRadius: "8px", fontSize: "13px" }} />
                <button className="btn btn-primary" onClick={sendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#708077", fontSize: "14px" }}>
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
