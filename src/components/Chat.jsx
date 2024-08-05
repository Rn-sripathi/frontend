import React from "react";
import styles from "../pages/Body.module.css"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat(props) {
  return (
    <div>
      <div className={styles.chat} id="chat_2">
        <div className={styles.userQuery}>
        <img src={gptLogo} alt="GPT Logo" className="avatar-logo" />
          <div className={styles.tellMeA}>
            {props.question}
          </div>
          <button className={styles.edit} id="edit">
            <img className={styles.icon} alt="" src="/icon.svg" />
          </button>
        </div>
        <div className={styles.response}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.answer}
          </ReactMarkdown>
        </div>
        <div className={styles.mainChild} />
      </div>
    </div>
  );
}
