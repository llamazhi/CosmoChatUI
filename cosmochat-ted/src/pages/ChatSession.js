import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "sk-proj-0V5xZq5XXmG9dacqpuwqT3BlbkFJjQZTxSobEO7dJ4Eu3Qw5";

function ChatSession() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm a chat robot",
      sender: "chatGPT",
      sentTime: "just now",
      direction: "incoming"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user"
    }
    const newMessages = [...messages, newMessage];
    // update message state
    setMessages(newMessages);
    // typing indicator
    setTyping(true);
    // process messages
    await sendMessageToGPT(newMessages);
  }

  async function sendMessageToGPT(msgs) {
    let apiMessages = msgs.map((msg) => {
      let role = "";
      if (msg.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {role: role, content: msg.message};
    });

    const systemMessage = {
      role: "system",
      content: "Explain all like I am a software engineer with 3 years of experience"
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([
        ...msgs, {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
          direction: "incoming"
        }
      ]);
      setTyping(false);
    });
  }
  
  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList 
              scrollBehavior='smooth'
              typingIndicator={typing ? <TypingIndicator content="The robot is thinking" /> : null}>
              {messages.map((message, i) => {
                return <Message key={i} model={message}/>
              })}
            </MessageList>
            <MessageInput placeholder="type message here" onSend={handleSend}></MessageInput>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ChatSession;