import React from "react";
import QuestionPart from "./question";
import AddComment from "./add-comment";
import Answer from "./answer";
import AddAnswer from "./add-answer";
import Comment from "./comment";
import sampleQuestions from "../../sampleDB.json";
import Header from "../general/website_header";
import Footer from "../general/website_footer";

class QuestionPage extends React.Component {
  sampleQuestion = sampleQuestions.questions[0];

  constructor(props) {
    super(props);
    this.state = {};
  }

  showSample = () => {
    console.log(this.sampleQuestion);
  };

  render() {
    return (
      <>
        <div style={{ padding: 10 }}>
          <QuestionPart question={this.sampleQuestion} />
          <h3>نظرات</h3>
          {this.sampleQuestion.comments.map((comment) => {
            return <Comment comment={comment} />;
          })}
          <AddComment />
          <h2>پاسخ ها</h2>
          {this.sampleQuestion.answers.map((answer) => {
            return <Answer answer={answer} />;
          })}
          <h2>پاسخ شما</h2>
          <AddAnswer />
        </div>
      </>
    );
  }
}

export default QuestionPage;
