import React from 'react';
import db from '../Firebase';

export default class NewCard extends React.Component {
  constructor(props) {
    super(props);

    // State stores words to enter into Firebase Realtime Database
    this.state = {
      words: {
        guess_word: "",
        taboo_word1: "",
        taboo_word2: "",
        taboo_word3: "",
        taboo_word4: "",
        taboo_word5: ""
      },
      nextIndex: null
    };

    // Blank state saved to reset form upon submission
    this.origState = this.state.words;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    // Fetch number of words already in database
    this.countRef = db.ref('/word_count');
    this.countListener = this.countRef.on('value', (snapshot) => {
      this.setState({nextIndex: snapshot.val() + 1});
    });
  }

  componentWillUnmount() {
    this.countRef.off('value', this.countListener);
  }

  handleChange(event) {
    // When input field changes, updates state
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      words: {[name]: value}
    });
  }

  handleSubmit(event) {
    // Inserts current state into Firebase DB
    db.ref('/words/' + this.state.nextIndex).set(this.state.words);

    // Increments word count
    db.ref('/word_count').set(this.state.nextIndex);

    // Resets state to be empty
    this.setState({words: this.origState});

    // Refocuses to first form field for efficient entry
    document.getElementsByName("guess_word")[0].focus();
    
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Word to Guess:
          <input
            name="guess_word"
            type="text"
            value={this.state.guess_word}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Taboo Word 1:
          <input
            name="taboo_word1"
            type="text"
            value={this.state.taboo_word1}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Taboo Word 2:
          <input
            name="taboo_word2"
            type="text"
            value={this.state.taboo_word2}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Taboo Word 3:
          <input
            name="taboo_word3"
            type="text"
            value={this.state.taboo_word3}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Taboo Word 4:
          <input
            name="taboo_word4"
            type="text"
            value={this.state.taboo_word4}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Taboo Word 5:
          <input
            name="taboo_word5"
            type="text"
            value={this.state.taboo_word5}
            onChange={this.handleChange}/>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}