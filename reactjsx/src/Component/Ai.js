import React, { useEffect } from 'react';
import Navbar from './Navbar';

const Ai = () => {
  useEffect(() => {

    const formatMarkdown = (text) => {
      // Bold ()
      text = text.replace(/\\(\*.*?\*)\\/g, "<strong>$1</strong>");
      // Italic (*)
      text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
      // Bold-Italic (_)
      text = text.replace(/_(.*?)_/g, "<strong><em>$1</em></strong>");
      // Line break
      text = text.replace(/\n/g, "<br>");
      // Inline code (`)
      text = text.replace(/`(.*?)`/g, "<code>$1</code>");
      // Link ([Link](url))
      text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      // Image (![Alt](url))
      text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

      return text;
    };

    const addToHistory = (question) => {
      const historyList = document.getElementById('history_list');
      const listItem = document.createElement('p');

      listItem.textContent = "➤ " + question;
      listItem.classList.add('history-item');
      listItem.onclick = () => searchHistory(question);
      historyList.appendChild(listItem);
    };

    const searchHistory = async (question) => {
      document.getElementById("input_prompt").value = question;
      await answer();
    };

    const answer = async () => {
      const question = document.getElementById("input_prompt").value;
      const User = "Rana";
      document.getElementById("output_prompt").textContent = "Typing...";
      document.getElementById("input_prompt").value = "";
      try {
        const response = await fetch("http://localhost:8080/ai/ans", {
          method: "POST",
          headers: {

            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: User, problem: question }),
        });
        const data = await response.json();
        document.getElementById("output_prompt").innerHTML = formatMarkdown(data.letter);
        addToHistory(question);
      } catch (error) {
        console.error("Error:", error);
        document.getElementById("output_prompt").textContent = "An error occurred.";
      }
    };

    document.getElementById('sendButton').addEventListener('click', answer);

    // Cleanup
    return () => {
      document.getElementById('sendButton').removeEventListener('click', answer);
    };
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div className="aiPage">
        <div className="">
          <h1 className="aiPage_head display-4">SparkV ChatBot</h1>
        </div>
        <div className="d-flex">
          <aside className="history px-2 container rounded shadow" style={{ margin: '2%' }}>
            <h2>History</h2>
            <hr />
            <div className="text-light">
              <div id="history_list"></div>
            </div>
          </aside>
          <main className="chatWindow col-9 px-2 pt-3 container rounded shadow-lg" style={{ margin: '2%' }}>
            <div className="bg-secondary rounded shadow-lg ai_win">
              <p id="output_prompt" className="container rounded p-5 shadow-lg mb-2"></p>
              <div className="container input-container rounded">
                <input type="text" id="input_prompt" placeholder="Ask your query..." className="mt-3" />
                <button id="sendButton" className="send-button btn ">»</button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <footer className="roadmapfooter">
    &copy;2024 All rights reserved to SparkV   

    </footer>

    </div>
  );
};

export default Ai;
