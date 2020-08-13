import React, { useState } from 'react';
import styles from '../App.module.css';

const CurrentDateTime = () => {
    let date = new Date().toLocaleDateString();
    let curTime = new Date().toLocaleTimeString();
    let [time, setTime] = useState(curTime)
    setInterval(() => { setTime(new Date().toLocaleTimeString()) }, 1000)
    return (
        <div className={styles.footer}>
            <h5>&nbsp;Current Data Time: <br /> &nbsp; &nbsp; &nbsp; &nbsp;{date}, <br /> &nbsp; &nbsp; &nbsp; &nbsp; {time} </h5>
        </div>
    );
}

export default CurrentDateTime;
