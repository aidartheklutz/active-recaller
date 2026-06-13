import React from "react";

function AboutPage() {
  return (
    <>
      <p style={{ marginBottom: 0 }}>ver. 1.1</p>
      <h1 style={{ marginTop: 0 }}>About Active Recaller</h1>
      <h2 style={{ marginBottom: 0 }}>
        «Active recall is a learning method where you test yourself by pulling
        information from memory instead of passively reading notes»
      </h2>
      <i style={{ marginTop: 0, fontSize: 16 }}>
        (source:{" "}
        <a
          href="https://www.bcu.ac.uk/exams-and-revision/best-ways-to-revise/active-recall"
          target="_blank"
        >
          Birmingham City University
        </a>
        )
      </i>

      <p>
        Active Recaller is a learning tool designed to help you memorize text
        more effectively using the <b>active recall</b> technique.
      </p>

      <p>
        Simply paste a text you want to learn, then try to write down everything
        you remember. The AI compares your recall against the key points it
        extracted and highlights:
      </p>

      <ul>
        <li>
          <b>Correct:</b> Points you correctly remembered.
        </li>
        <li>
          <b>Incorrect:</b> Points where you got details wrong (like dates,
          names, or values).
        </li>
        <li>
          <b>Missing:</b> Points you completely forgot to mention.
        </li>
        <li>
          <b>Hallucinations:</b> Statements you added that weren't in the
          original text.
        </li>
      </ul>

      <h1>About the author</h1>

      <p>
        This project was created by aidartheklutz. You can visit my website by{" "}
        <a href="https://aidartheklutz.github.io" target="_blank">
          clicking here
        </a>
        .
      </p>

      <p>
        This idea came to me while I was preparing for a Kyrgyz history exam. I
        needed to remember the contents of a large essay about{" "}
        <a href="https://en.wikipedia.org/wiki/Zhang_Qian" target="_blank">
          Zhang Qian
        </a>{" "}
        - a Han dynasty diplomat often associated with the early development of
        the Silk Road. I felt like I had memorized everything, but wasn't fully
        confident, so I began rewriting the text from memory repeatedly on a
        scrap of paper I had nearby. It worked well (I even got a full score on
        the exam) and the active recall technique has stuck with me since. This
        approach turned out to be effective, and I wanted more people to use it,
        which is why I created Active Recaller. This website makes the technique
        quicker and easier to use, and it was also great practice for my web
        development skills.
      </p>
    </>
  );
}

export default AboutPage;
