import { useState, useRef, useEffect } from "react";
import { useSendMessageMutation } from "../../Services/sharedServices/chatapi";
import { MessageCircle, X, Send } from "lucide-react";

const ChatBot = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

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
            err?.data?.error || "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="tw-fixed tw-bottom-6 tw-right-6 tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-p-4 tw-rounded-full tw-shadow-2xl hover:tw-scale-110 tw-transition tw-duration-300 tw-z-[9999]"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="tw-fixed tw-bottom-20 tw-right-6 tw-w-[95%] sm:tw-w-[380px] tw-h-[80vh] sm:tw-h-[500px] tw-bg-white/90 tw-backdrop-blur-xl tw-shadow-2xl tw-rounded-2xl tw-flex tw-flex-col tw-border tw-z-[9999] tw-animate-fadeIn">

          {/* Header */}
          <div className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-p-4 tw-rounded-t-2xl tw-flex tw-justify-between tw-items-center">
            <div>
              <h3 className="tw-font-semibold tw-text-white">DCM AI Assistant</h3>
              <p className="tw-text-xs tw-opacity-80">Online • Ready to help</p>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="tw-flex-1 tw-overflow-y-auto tw-p-4 tw-space-y-4 tw-bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`tw-max-w-[80%] tw-p-3 tw-rounded-2xl tw-text-sm tw-shadow ${
                  msg.role === "user"
                    ? "tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-ml-auto"
                    : "tw-bg-white tw-text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {isLoading && (
              <div className="tw-bg-white tw-p-3 tw-rounded-2xl tw-w-fit tw-shadow">
                <div className="tw-flex tw-gap-1">
                  <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce"></span>
                  <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce tw-delay-150"></span>
                  <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce tw-delay-300"></span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="tw-p-3 tw-border-t tw-bg-white tw-flex tw-gap-2 tw-items-center">
            <input
              type="text"
              className="tw-flex-1 tw-border tw-rounded-full tw-px-4 tw-py-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-400"
              placeholder="Ask about courses, career advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              disabled={isLoading}
              className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-p-2 tw-rounded-full hover:tw-scale-110 tw-transition disabled:tw-opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;