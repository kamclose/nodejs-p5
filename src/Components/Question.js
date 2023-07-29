import { useEffect, useState } from "react";
import axios from "axios";

function extractDate(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getUTCFullYear().toString().slice(-2);
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const hours = dateObj.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getUTCSeconds().toString().padStart(2, "0");
  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

export default function Question(props) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [enterQuestion, setEnterQuestion] = useState(false);
  const [enterAnswers, setEnterAnswers] = useState(false);
  const [selectQuestion, setSelectedQuestion] = useState("");
  const [selectAnswer,setSelectedAnswer] = useState("")

  const myComponent = {
    width: "430px",
    height: "100px",
    overflowX: "hidden",
    overflowY: "scroll",
  };
  const handleAnswerButtonClick = (key) => {
    const selectedQuestionObject = questions.find(
      (question) => question._id === key
    );
    const newArray = selectedQuestionObject
      ? selectedQuestionObject.answers
      : [];
    setAnswers(newArray);
    setSelectedAnswer(selectedQuestionObject.question)
    setSelectedQuestion(key);
    setEnterAnswers(true);
  };
  async function fetchQuestion() {
    try {
      const response = await axios.get(
        `http://localhost:8080/question/${props.view.id}`
      );
      const questionsData = response.data;
      const updatedQuestions = await Promise.all(
        questionsData.map(async (question) => {
          const answerResponse = await axios.get(
            `http://localhost:8080/answer/${question._id}`
          );
          const answers = answerResponse.data;
          return { ...question, answers };
        })
      );
      setQuestions(updatedQuestions);
      console.log(updatedQuestions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  }
  useEffect(() => {
    setError({
      type: "",
      message: "",
    });
    fetchQuestion();
    setEnterQuestion(false);
    setEnterAnswers(false);
  }, [props.view.name]);

  const [error, setError] = useState({
    type: "",
    message: "",
  });

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    const questionText = event.target.elements.question.value;
    if (!questionText || !questionText.endsWith("?")) {
      setError({
        type: "question",
        message: "Invalid question format.",
      });
      return;
    }

    setError({
      type: "",
      message: "",
    });

    try {
      const response = await axios.post("http://localhost:8080/question", {
        question: questionText,
        userId: props.view.userId,
        categoryId: props.view.id,
      });

      setError({
        type: "success",
        message: "Question posted successfully!",
      });
      fetchQuestion();
      setEnterQuestion(false);
      setEnterAnswers(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError({
          type: "question",
          message: "Error: Invalid question format.",
        });
      } else {
        setError({
          type: "server",
          message:
            "Error: Failed to post the question. Please try again later.",
        });
      }
    }
  };

  const handleAnswerSubmit = (event) => {
    event.preventDefault();

    const answerTextArea = event.target.elements.answer;
    const answer = answerTextArea.value.trim();

    if (!answer) {
      setError({ type: "answer", message: "Please provide an answer." });
      return;
    }

    setError({ type: null, message: "" });
    const questionId = selectQuestion;
    const userId = props.view.userId;
    axios
      .post("http://localhost:8080/answer", {
        answer,
        questionId,
        userId,
      })
      .then((response) => {
        console.log("Answer submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
    answerTextArea.value = "";
    fetchQuestion();
    setSelectedQuestion(null);
    setEnterAnswers(false);
  };

  const handleBack=()=>{
    fetchQuestion();
    setSelectedQuestion(null);
    setEnterQuestion(false)
    setEnterAnswers(false);
  }

  if (!props.view.display) {
    return (
      <div>
        <link rel="stylesheet" href="style1.css" />
        <header>Questions</header>
        <p>Please click on a category to view its questions.</p>
      </div>
    );
  } else {
    return (
      <div>
        <header>Category</header>
        <strong style={{ fontSize: "20px" }}>{props.view.name}</strong>
        {
          enterQuestion || enterAnswers ?  
          (
            <input
          type="button"
          className="m-2 butt_out"
          defaultValue="Back"
          onClick={() => handleBack()}
        />
          )
          : (
          <input
          type="button"
          className="m-2 butt_out"
          defaultValue="Post Question"
          onClick={() => setEnterQuestion(true)}
        />
          )
        }
        
        {!enterQuestion &&
          !enterAnswers &&
          (questions.length == 0 ? (
            <p>No question to display</p>
          ) : (
            <div style={myComponent} className="">
              <ul>
                {questions.map((question) => (
                  <li key={question._id}>
                    <div className="m-3 d-flex justify-content-between">
                      <div>{extractDate(question.createdAt)}</div>
                      <div>{question.answers.length}</div>
                      <div>
                        <strong>Posted by: </strong>
                        {question.userId}
                      </div>
                    </div>
                    <div className="m-3 d-flex justify-content-between">
                      <input
                        type="button"
                        className="m-2 butt_out"
                        defaultValue="Answer"
                        onClick={() => handleAnswerButtonClick(question._id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {enterQuestion && !enterAnswers && (
          <form className="myForm text-center" onSubmit={handleQuestionSubmit}>
            <header>New Question</header>
            <div className="form-group">
              <textarea
                style={{ resize: "none", height: "5em", width: "20em" }}
                className="myInput"
                type="text"
                id="question"
                required
                autoComplete="off"
              />
              {error.type == "question" && (
                <div>
                  <strong style={{ color: "red" }}>{error.message}</strong>
                </div>
              )}
              <div></div>
            </div>
            <input type="submit" className="m-2 butt_out" />
          </form>
        )}
        {!enterQuestion && enterAnswers && (
          <div>
            <strong>Question: {selectAnswer}</strong>
            {answers.length === 0 ? (
              <p>No answers to display</p>
            ) : (
              <div style={myComponent} className="">
              <ul>
                {answers.map((answer) => (
                  <li>
                    <div className="m-3 d-flex justify-content-start">
                     <div>
                        <strong>{answer.userId}: {answer.answer}</strong>
                     </div>
                     </div>
                  </li>
                ))}
              </ul>
            </div>
            )}
            <form className="myForm text-center" onSubmit={handleAnswerSubmit}>
            <p style={{fontSize:'15px'}}>New Answer</p>
              <div className="form-group">
                <textarea
                  style={{ resize: "none", height: "5em", width: "20em" }}
                  className="myInput"
                  type="text"
                  id="answer"
                  required
                  autoComplete="off"
                />
                {error.type === "answer" && (
                  <div>
                    <strong style={{ color: "red" }}>{error.message}</strong>
                  </div>
                )}
              </div>
              <input type="submit" className="m-2 butt_out" />
            </form>
          </div>
        )}
      </div>
    );
  }
}
