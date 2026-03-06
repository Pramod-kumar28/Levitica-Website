import { useState, useRef, useEffect } from "react";
import { useSendMessageMutation } from "../../Services/sharedServices/chatapi";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";

const ChatBot = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [position, setPosition] = useState({
    x: window.innerWidth - 520,
    y: window.innerHeight - 600,
  });

  // position for floating button when not open
  const [iconPosition, setIconPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });

  // track what's being dragged: 'box' or 'icon' or null
  const dragTarget = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // ==============================
  // Drag Logic (Mouse)
  // ==============================

  const handleMouseDown = (e, target = "box") => {
    if (isFullScreen && target === "box") return;

    dragTarget.current = target;
    isDragging.current = true;
    const pos = target === "box" ? position : iconPosition;

    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;

    if (dragTarget.current === "icon") {
      setIconPosition({ x: newX, y: newY });
    } else {
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    dragTarget.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // ==============================
  // Drag Logic (Touch)
  // ==============================

  const handleTouchStart = (e, target = "box") => {
    if (isFullScreen && target === "box") return;

    const touch = e.touches[0];
    dragTarget.current = target;
    isDragging.current = true;
    const pos = target === "box" ? position : iconPosition;

    dragOffset.current = {
      x: touch.clientX - pos.x,
      y: touch.clientY - pos.y,
    };
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;

    const touch = e.touches[0];

    const newX = touch.clientX - dragOffset.current.x;
    const newY = touch.clientY - dragOffset.current.y;

    if (dragTarget.current === "icon") {
      setIconPosition({ x: newX, y: newY });
    } else {
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    dragTarget.current = null;
  };

  // ==============================
  // Send Message
  // ==============================

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
            err?.data?.error ||
            "Sorry, I'm having trouble connecting. Please try again.",
        },
      ]);
    }
  };

  const chatWindowClasses = isFullScreen
    ? "tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-flex-col tw-bg-white tw-shadow-2xl tw-rounded-none"
    : "tw-fixed tw-z-[9999] tw-flex tw-flex-col tw-bg-white tw-shadow-2xl tw-rounded-2xl tw-w-[92%] sm:tw-w-[400px] md:tw-w-[450px] lg:tw-w-[500px] tw-h-[70vh] tw-max-h-[90vh]";

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onMouseDown={(e) => handleMouseDown(e, "icon")}
          onTouchStart={(e) => handleTouchStart(e, "icon")}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="tw-fixed tw-bg-blue-600 tw-text-white tw-p-4 tw-rounded-full tw-shadow-lg tw-z-[9999]"
          style={{ left: iconPosition.x, top: iconPosition.y }}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={chatWindowClasses}
          style={
            !isFullScreen
              ? { left: position.x, top: position.y }
              : {}
          }
        >
          {/* Header (Draggable Area) */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="tw-cursor-move tw-bg-blue-700 tw-text-white tw-px-4 tw-py-3 tw-flex tw-justify-between tw-items-center tw-rounded-t-2xl"
          >
            <div className="tw-font-semibold  tw-text-lg ">AI Assistant</div>

            <div className="tw-flex tw-gap-2">
              {!isFullScreen && (
                <button onClick={() => setIsFullScreen(true)}>
                  <Maximize2 size={18} />
                </button>
              )}
              {isFullScreen && (
                <button onClick={() => setIsFullScreen(false)}>
                  <Minimize2 size={18} />
                </button>
              )}
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="tw-flex-1 tw-overflow-y-auto tw-p-4 tw-space-y-3 tw-bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`tw-flex ${
                  msg.role === "user"
                    ? "tw-justify-end"
                    : "tw-justify-start"
                }`}
              >
                <div
                  className={`tw-p-3 tw-rounded-2xl tw-text-sm tw-max-w-[75%] ${
                    msg.role === "user"
                      ? "tw-bg-blue-600 tw-text-white"
                      : "tw-bg-white tw-text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="tw-text-gray-400 tw-text-sm">
                Typing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="tw-border-t tw-bg-white tw-p-3 tw-flex tw-gap-2">
            <input
              ref={inputRef}
              type="text"
              className="tw-flex-1 tw-border tw-rounded-full tw-px-4 tw-py-2 focus:tw-outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
            />

            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="tw-bg-blue-600 tw-text-white tw-p-3 tw-rounded-full disabled:tw-opacity-50"
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