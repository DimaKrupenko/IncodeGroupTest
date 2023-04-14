import React, { useState } from 'react';
import styles from './form.module.css'


function Form({ onRepoSubmit }) {
    const [repoUrl, setRepoUrl] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onRepoSubmit(repoUrl);
        setRepoUrl('');
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="repo-url">
                <input
                    className={styles.input}
                    placeholder="Enter Owner/Repo"
                    type="text"
                    id="repo-url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                />
                <button className={styles.input__button} type="submit">Load issues</button>
            </label>
        </form>
    );
}

export default Form;
