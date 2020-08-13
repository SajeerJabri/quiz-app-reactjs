import React from "react";
import styles from "./ScoreResult.module.css";
import { scoreResultPropsType } from "../Types/QuizTypes";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Logo from "../images/logo.png";

const ScoreResult: React.FC<scoreResultPropsType> = ({
  name,
  score,
  totalQuestion,
  callbackScore
}) => {
  return (
    <Paper elevation={8} className={styles.paperScore}>
      <div className={styles.scoreContainer}>
        <img src={Logo} className={styles.scoreLogo} alt="logo" />

        <h1>Result</h1>
        <p className={styles.resultText}>
          {name.toUpperCase()}, Your final score is:
          <b> {score}</b> out of <b>{totalQuestion}</b>
        </p>
        <h4>
          {name.toUpperCase()}, Your Final Percentage is:{" "}
          {((score * 100) / totalQuestion).toFixed(2)}%{" "}
        </h4>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => callbackScore(true)}
        >
          Again Start Quiz
        </Button>
      </div>
    </Paper>
  );
};

export default ScoreResult;
