import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      slug: '',
      url: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { url, slug } = this.state;
    axios.get(`http://localhost:5000/add/${url}/${slug}`)
      .then(res => {
        const items = res.data;
        this.setState({items});
      });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
  }

  render() {
    const urls = this.state.items.map(item => (
      <li key={item.url + item.slug}>
        { item.url } <br/>
        { item.slug } <br/>
        { item.visits }
      </li>
    ));

    return (
      <div className="App">
        <ul>
          { urls }
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>
            Url
            <input onChange={this.handleChange} name="url"/>
          </label>
          <br/>
          <label>
            Slug
            <input onChange={this.handleChange} name="slug"/>
          </label>
          <br/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;
