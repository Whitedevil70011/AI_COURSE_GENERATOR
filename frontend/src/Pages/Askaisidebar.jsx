// AskAiSidebar.jsx
// A simple "Ask AI" chat panel. Click the round button to open it.

import React, { useState } from "react";
import { Bot, X, ArrowRight } from "lucide-react";

const BACKEND_URL = "http://localhost:3001/api/ask-ai";

function AskAiSidebar({ lessonTitle, lessonContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const firstMessage = {
    role: "assistant",
    content: "Hi! Ask me a doubt about this lesson.",
  };
  const [messages, setMessages] = useState([firstMessage]);

  function openPanel() {
    setIsOpen(true);
  }

  function closePanel() {
    setIsOpen(false);
  }

  async function handleSend() {
    const question = inputValue.trim();

    if (question === "") {
      return;
    }

    // add the user's message to the chat
    const userMessage = { role: "user", content: question };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    // ask the backend for a reply
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonTitle: lessonTitle,
        lessonContent: lessonContent,
        history: newMessages,
      }),
    });

    const data = await response.json();

    // add the AI's reply to the chat
    const aiMessage = { role: "assistant", content: data.reply };
    setMessages([...newMessages, aiMessage]);
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div>
      {/* round button */}
      {!isOpen && (
        <button
          onClick={openPanel}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl hover:bg-indigo-700"
        >
          <Bot size={32} />
        </button>
      )}

      {/* chat panel */}
      {isOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-80 bg-white border-l border-slate-200 flex flex-col shadow-lg">
          {/* header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <span className="font-semibold text-slate-800">Ask AI</span>
            <button onClick={closePanel}>
              <X size={18} />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {messages.map((message, index) => {
              if (message.role === "user") {
                return (
                  <div key={index} className="self-end bg-indigo-50 text-indigo-800 rounded-lg px-3 py-2 text-sm">
                    {message.content}
                  </div>
                );
              }

              return (
                <div key={index} className="self-start bg-slate-100 text-slate-800 rounded-lg px-3 py-2 text-sm">
                  {message.content}
                </div>
              );
            })}

            {isLoading && (
              <div className="self-start bg-slate-100 text-slate-800 rounded-lg px-3 py-2 text-sm">Thinking...</div>
            )}
          </div>

          {/* input */}
          <div className="p-3 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a doubt..."
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
            <button onClick={handleSend} className="w-10 border border-slate-200 rounded-lg flex items-center justify-center">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AskAiSidebar;