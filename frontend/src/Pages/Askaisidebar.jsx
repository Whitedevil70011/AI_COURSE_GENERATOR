
import React, { useState, useRef, useEffect } from "react";
import { Bot, X, ArrowRight } from "lucide-react";

const BACKEND_URL =
  import.meta.env.VITE_ASK_AI_URL ||
  (import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/ask-ai`
    : "/api/ask-ai");

function AskAiSidebar({ lessonTitle, lessonContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const firstMessage = {
    role: "assistant",
    content: "Hi! Ask me a doubt about this lesson.",
  };
  const [messages, setMessages] = useState([firstMessage]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Safety net: Escape always closes the panel, even if the close
  // button is ever visually hidden by something else on the page.
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  function openPanel() {
    setIsOpen(true);
  }

  function closePanel() {
    setIsOpen(false);
  }

  async function handleSend() {
    const question = inputValue.trim();

    if (question === "" || isLoading) {
      return;
    }

    // add the user's message to the chat
    const userMessage = { role: "user", content: question };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);
    setErrorMessage(null);

    try {
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

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      if (!data || typeof data.reply !== "string") {
        throw new Error("Response was missing a reply.");
      }

      // add the AI's reply to the chat
      const aiMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Ask AI request failed:", error);
      setErrorMessage("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div>
      {/* round button */}
      {!isOpen && (
        <button
          onClick={openPanel}
          className="fixed bottom-6 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700"
          aria-label="Open Ask AI chat"
        >
          <Bot size={32} />
        </button>
      )}

      {/* backdrop: click outside the panel to close it */}
      {isOpen && (
        <div
          onClick={closePanel}
          className="fixed inset-0 z-[9998] bg-black/20"
          aria-hidden="true"
        />
      )}

      {/* chat panel */}
      {isOpen && (
        <div className="fixed top-0 right-0 bottom-0 z-[9999] flex w-80 flex-col border-l border-slate-200 bg-white shadow-lg">
          {/* header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <span className="font-semibold text-slate-800">Ask AI</span>
            <button onClick={closePanel} aria-label="Close Ask AI chat">
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

            {errorMessage && (
              <div className="self-start bg-red-50 text-red-700 rounded-lg px-3 py-2 text-sm">{errorMessage}</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <div className="p-3 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a doubt..."
              disabled={isLoading}
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || inputValue.trim() === ""}
              className="w-10 border border-slate-200 rounded-lg flex items-center justify-center disabled:opacity-50"
              aria-label="Send message"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AskAiSidebar;