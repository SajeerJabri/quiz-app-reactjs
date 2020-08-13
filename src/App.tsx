import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import Logo2 from './images/logo2.jpg';
import Logo from './images/logo.png';
import { getQuizDetails } from './Services/QuizServices';
import QuizCards from './Components/QuizCards';
import CurrentDateTime from './Components/CurrentDateTime';
import ScoreResult from './Components/ScoreResult';
import { QuizType } from "./Types/QuizTypes";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';




function App() {
  let [startingPage, setStartingPage] = useState(true)
  let [quiz, setQuiz] = useState<QuizType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)
  let [name, setName] = useState("")
  let [level, setLevel] = useState("")
  let [totalQuestion, setTotalQuestion] = useState()


  useEffect(() => {
    async function fetchQuestion() {
      const questions: QuizType[] = await getQuizDetails(totalQuestion, level);
      setQuiz(questions)
    }
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingPage]);

  if (startingPage === true) {
    return (
      <Paper elevation={5} className={styles.paperContainer}>
        <div className={styles.infoContainer}>
          <img src={Logo2} className={styles.infoLogo} alt="logo" />

          <form onSubmit={(FormEv: React.FormEvent<EventTarget>) => {
            setStartingPage(false)
            setQuiz([])
            setCurrentStep(0)
            setScore(0)
            setShowResult(false)
          }}
            className={styles.quizInfoForm}>
            <TextField id="standard-basic" label="Name" autoFocus
              className={styles.textName} autoComplete="off"
              onChange={(eventNames: React.ChangeEvent<HTMLInputElement>) => setName(eventNames.target.value)} required />


            <TextField id="standard-basic" label="Total Question" type="number" autoComplete="off"
              className={styles.textNumber}
              onChange={(eventNum: React.ChangeEvent<HTMLInputElement>) => setTotalQuestion(eventNum.target.value)} required
            />
            <FormControl variant="outlined" className={styles.selectDifficult}>
              <InputLabel id="demo-simple-select-outlined">Difficulties</InputLabel>
              <Select
                labelId="demo-simple-select-outlined"
                id="demo-simple-select-outlined"
                onChange={(eventLevel: React.ChangeEvent<{ value: unknown }>) => setLevel(eventLevel.target.value as string)}
                required

              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
              </Select>
            </FormControl>
            <Paper elevation={5}>
              <Button variant="contained" color="primary" type="submit">
                Start Quiz
      </Button>
            </Paper>
          </form>
        </div>
      </Paper>
    )
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    if (userAns === quiz[currentStep].correct_answer) {
      setScore(++score)
    }
    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);
    else {
      setShowResult(true);
    }
  }
  if (!quiz.length)
    return (
      <div className={styles.loading}>
        <h1>Loading... </h1>
        <div className={styles.loadingProgress}></div>
        <CircularProgress color="secondary" />
      </div>
    )

  if (showResult) {
    const handleScore = (pageArgs: boolean) => {
      setStartingPage(pageArgs);
    }
    return (
      <ScoreResult
        name={name}
        score={score}
        totalQuestion={totalQuestion}
        callbackScore={handleScore}
      />
    )
  }

  return (
    <div className={styles.App}>
      <div className={styles.questionLogo}>
        <img src={Logo} alt="logo" />
      </div>
      <div >
        <h4 className={styles.nameBFL}>Best of Luck: {name.toUpperCase()}.</h4>
        <CurrentDateTime />
      </div>
      <QuizCards
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        currentQuestion={currentStep + 1}
        totalQuestion={totalQuestion}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
