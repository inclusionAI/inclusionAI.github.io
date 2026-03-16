import React, { useState, useCallback } from "react";

interface Message {
  role: string;
  content: string;
}

interface ExampleData {
  title?: string;
  messages?: Message[];
}

interface ExampleGalleryProps {
  /** Array of example data objects to cycle through */
  examples: ExampleData[];
  /** Whether to enable scrolling in the messages container */
  scroll?: boolean;
}

function MessageContent({ content }: { content: string }) {
  // Render raw HTML content safely (content is from trusted internal JSON)
  return (
    <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
  );
}

export default function ExampleGallery({
  examples,
  scroll = false,
}: ExampleGalleryProps): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % examples.length);
  }, [examples.length]);

  if (!examples || examples.length === 0) {
    return <></>;
  }

  const current = examples[currentIndex];

  return (
    <div className="example-container">
      <div className="example-content">
        {current.title && (
          <div className="title">
            <span>{current.title}</span>
            {examples.length > 1 && (
              <a
                className="next-button"
                onClick={handleNext}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
              >
                Next
              </a>
            )}
          </div>
        )}
        {current.messages && (
          <div className={`grid-layout${scroll ? " scroll" : ""}`}>
            {current.messages.map((msg, i) => (
              <React.Fragment key={i}>
                <div className="role">{msg.role}</div>
                <MessageContent content={msg.content} />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
