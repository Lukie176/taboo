import React from 'react';
import db from '../Firebase';

export default class NewCard extends React.Component {
  constructor(props) {
    super(props);

    // State stores words to enter into Firebase
    this.state = {
      guess_word: "",
      taboo_word1: "",
      taboo_word2: "",
      taboo_word3: "",
      taboo_word4: "",
      taboo_word5: ""
    };
    this.origState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.nextIndex = null;
    db.ref('/word_count').on('value', snapshot => this.nextIndex = snapshot.val() + 1);
  }
    

  handleChange(event) {
    const target = event.target ;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // Inserts current state into Firebase DB
    db.ref('/words/' + this.nextIndex).set(this.state);

    // Increments word count
    db.ref('/word_count').set(this.nextIndex);

    // Resets state to be empty
    this.setState(this.origState);

    // Refocuses to first form field for efficient entry
    document.getElementsByName("guess_word")[0].focus();
    
    event.preventDefault();
  }

  render() {
    return (
      <form>
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
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
    );
  }
}