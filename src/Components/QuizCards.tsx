import React, { useState } from 'react';
import styles from './QuizCards.module.css';
import { questionPropsType } from "../Types/QuizTypes";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


const QuizCards: React.FC<questionPropsType> = ({ question, options, currentQuestion, totalQuestion, callback }) => {
    let [selectedAns, setSelectedAns] = useState("");

    const handleSelectionValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAns(ev.target.value);
    }
    return (
        <Paper elevation={5} className={styles.paperQuestion}>
            <div className={styles.container}>
                <Paper elevation={5} className={styles.questionCount}>
                    <h4> Question Number: {currentQuestion}/{totalQuestion} </h4>
                </Paper>
                <div className={styles.question}>
                    <h4>{currentQuestion}) &nbsp; {question}</h4>
                </div>
                <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
                    className="form" >
                    {options.map((opt: string, index: number) => {
                        return (
                            <div key={index}>
                                <label htmlFor="radio" className={styles.radio}>
                                    <Radio
                                        checked={selectedAns === opt}
                                        onChange={handleSelectionValue}
                                        required
                                        name="opt"
                                        value={opt}
                                        color="primary"
                                    />
                                    {opt}
                                </label>
                            </div>
                        )
                    })
                    }
                    <Button variant="contained" color="primary"
                        type="submit">
                        Next Question
      </Button>
                </form>
            </div>
        </Paper>
    );
}

export default QuizCards;
