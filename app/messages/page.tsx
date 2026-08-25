"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_MESSAGES, MOCK_FARMERS, MOCK_BUYERS, MOCK_AGENTS } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";

export default function Messages() {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const conversations = MOCK_MESSAGES.filter(m => m.senderId === user?.id || m.receiverId === user?.id);
  const chatPartner = (msg: typeof MOCK_MESSAGES[0]) => {
    if (msg.senderId === user?.id) return msg.receiverId;
    return msg.senderId;
  };

  const chatMessages = activeChat
    ? MOCK_MESSAGES.filter(m => (m.senderId === user?.id && m.receiverId === activeChat) || (m.receiverId === user?.id && m.senderId === activeChat))
    : [];

  const getPartnerName = (id: string) => {
    const all = [...MOCK_FARMERS, ...MOCK_BUYERS, ...MOCK_AGENTS];
    const partner = all.find(u => u.id === id);
    return partner?.name || id;
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <DashboardLayout title="Messages" subtitle="Communicate with buyers, sellers, and agents">
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
