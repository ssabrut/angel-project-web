"use client";
export default function ChatArea({
  name,
  isLoading,
  messages,
  conversationType,
}) {
  const renderLoading = () => {
    if (isLoading) {
      return (
        <>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full"></div>
            </div>
            <div className="chat-header"></div>
            <div className="chat-bubble chat-bubble-primary">
              <span className="loading loading-dots loading-md"></span>
            </div>
          </div>
        </>
      );
    }
  };

  const renderListMessages = () => {
    return messages.map((message, i) => {
      if (message.role == "user") {
        return (
          <div key={i} className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full"></div>
            </div>
            <div className="chat-header">{name}</div>
            <div className="chat-bubble chat-bubble-secondary">
              {message.content}
            </div>
          </div>
        );
      } else if (message.role == "assistant") {
        return (
          <div key={i} className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full"></div>
            </div>
            <div className="chat-header">
              {conversationType == "friend"
                ? "Best Friend Forever"
                : "Counselor"}
            </div>
            <div className="chat-bubble chat-bubble-primary">
              {message.content}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <>
      {renderListMessages()}
      {renderLoading()}
    </>
  );
}
