import { useState, useRef, useEffect } from "react";
import { useSendMessageMutation } from "../../Services/sharedServices/chatapi";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";

const ChatBot = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await sendMessage({
        message: input,
        userId,
      }).unwrap();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err?.data?.error || "Sorry, I'm having trouble connecting. Please try again.",
        },
      ]);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Fixed chatWindowClasses
  const chatWindowClasses = isFullScreen
    ? "tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-flex-col tw-bg-white tw-shadow-2xl tw-transition-all tw-duration-300 tw-ease-in-out tw-rounded-none tw-animate-fadeIn"
    : "tw-fixed tw-bottom-4 tw-right-4 tw-z-[9999] tw-flex tw-flex-col tw-bg-white tw-shadow-2xl tw-transition-all tw-duration-300 tw-ease-in-out tw-rounded-2xl tw-backdrop-blur-sm tw-border tw-border-gray-100 tw-w-[92%] sm:tw-w-[400px] md:tw-w-[450px] lg:tw-w-[500px] tw-h-[60vh] sm:tw-h-[70vh] md:tw-h-[75vh] lg:tw-h-[70vh] tw-max-h-[90vh]";

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            tw-fixed tw-bottom-4 tw-right-4 sm:tw-bottom-6 sm:tw-right-6
            tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600
            tw-text-white tw-p-3 sm:tw-p-4
            tw-rounded-full tw-shadow-lg hover:tw-shadow-2xl
            tw-transform hover:tw-scale-110
            tw-transition-all tw-duration-300 tw-ease-out
            tw-z-[9999] tw-animate-bounce-in
            focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-400
          "
          aria-label="Open chat"
        >
          <MessageCircle size={24} className="sm:tw-size-6" />
          <span className="tw-absolute tw-top-0 tw-right-0 tw-w-3 tw-h-3 tw-bg-green-400 tw-border-2 tw-border-white tw-rounded-full"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={chatWindowClasses}>
          {/* Header - Fixed className syntax */}
          <div className={`
            tw-bg-gradient-to-r tw-from-blue-700 tw-to-blue-900
            tw-text-white tw-px-4 tw-py-3 sm:tw-px-6 sm:tw-py-4
            tw-flex tw-justify-between tw-items-center
            tw-shadow-md
            tw-flex-shrink-0
            ${isFullScreen ? 'tw-rounded-none' : 'tw-rounded-t-2xl'}
          `}>
            <div className="tw-flex tw-items-center  tw-gap-6">
              <div className="tw-relative">
                <div className="tw-w-8 tw-h-8 tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-center">
                  <span className="tw-text-purple-600 tw-font-bold">AI</span>
                </div>
                <span className="tw-absolute tw-bottom-0 tw-right-0 tw-w-2.5 tw-h-2.5 tw-bg-green-400 tw-border-2 tw-border-white tw-rounded-full"></span>
              </div>
              <div>
                <h3 className="tw-font-semibold tw-text-sm sm:tw-text-base tw-text-white">
                  DCM AI Assistant
                </h3>
                <p className="tw-text-sm tw-text-white/80">
                
                  Online • Ready to help
                </p>
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-gap-2">
              {!isFullScreen && window.innerWidth >= 640 && (
                <button
                  onClick={toggleFullScreen}
                  className="tw-p-1 hover:tw-bg-white/20 tw-rounded-lg tw-transition-colors"
                  aria-label="Expand chat"
                >
                  <Maximize2 size={18} />
                </button>
              )}
              {isFullScreen && (
                <button
                  onClick={toggleFullScreen}
                  className="tw-p-1 hover:tw-bg-white/20 tw-rounded-lg tw-transition-colors"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={18} />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="tw-p-1 hover:tw-bg-white/20 tw-rounded-lg tw-transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="
              tw-flex-1 tw-overflow-y-auto tw-p-4 sm:tw-p-6
              tw-space-y-4 tw-bg-gradient-to-b tw-from-gray-50 tw-to-white
              tw-scrollbar-thin tw-scrollbar-thumb-gray-300 tw-scrollbar-track-transparent
              hover:tw-scrollbar-thumb-gray-400
            "
          >
            {messages.length === 0 && (
              <div className="tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-text-gray-400 tw-space-y-3">
                <div className="tw-w-16 tw-h-16 tw-bg-gradient-to-r tw-from-blue-100 tw-to-purple-100 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                  <MessageCircle size={32} className="tw-text-purple-500" />
                </div>
                <p className="tw-text-sm">👋 Hello! How can I help you today?</p>
                <p className="tw-text-xs">Ask about courses, career advice, or anything else!</p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`
                  tw-flex tw-flex-col
                  ${msg.role === "user" ? "tw-items-end" : "tw-items-start"}
                  tw-animate-slide-in
                `}
              >
                <div
                  className={`
                    tw-max-w-[85%] sm:tw-max-w-[75%]
                    tw-p-3 sm:tw-p-4
                    tw-rounded-2xl tw-text-sm sm:tw-text-base
                    tw-shadow-sm
                    tw-break-words
                    ${
                      msg.role === "user"
                        ? "tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-rounded-br-none"
                        : "tw-bg-white tw-text-gray-800 tw-rounded-bl-none"
                    }
                  `}
                >
                  {msg.content}
                </div>
                <span className="tw-text-xs tw-text-gray-400 tw-mt-1 tw-px-2">
                  {msg.role === "user" ? "You" : "AI Assistant"}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="tw-flex tw-items-start tw-animate-fadeIn">
                <div className="tw-bg-white tw-p-4 tw-rounded-2xl tw-rounded-bl-none tw-shadow-sm">
                  <div className="tw-flex tw-gap-2">
                    <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce"></span>
                    <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce [animation-delay:-0.3s]"></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={bottomRef} />
          </div>

          {/* Input Area - Fixed className syntax */}
          <div className={`
            tw-border-t tw-bg-white
            tw-px-3 tw-py-3 sm:tw-px-4 sm:tw-py-4
            tw-flex tw-gap-2 tw-items-center
            tw-flex-shrink-0
            tw-shadow-lg
            ${isFullScreen ? 'tw-rounded-none' : 'tw-rounded-b-2xl'}
          `}>
            <input
              ref={inputRef}
              type="text"
              className="
                tw-flex-1 tw-border tw-border-gray-200
                tw-rounded-full tw-px-4 tw-py-2.5 sm:tw-px-5 sm:tw-py-3
                tw-text-sm sm:tw-text-base
                focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-400 focus:tw-border-transparent
                tw-transition-all tw-duration-200
                tw-bg-gray-50 hover:tw-bg-white
              "
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
            />

            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="
                tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600
                tw-text-white tw-p-2.5 sm:tw-p-3
                tw-rounded-full
                tw-shadow-md hover:tw-shadow-lg
                tw-transform hover:tw-scale-105
                tw-transition-all tw-duration-200
                disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:hover:tw-scale-100
                focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-400
              "
              aria-label="Send message"
            >
              <Send size={18} className="sm:tw-size-5" />
            </button>
          </div>

          {/* Bottom safe area for mobile */}
          <div className="tw-h-[env(safe-area-inset-bottom)] tw-bg-white"></div>
        </div>
      )}
    </>
  );
};

export default ChatBot;