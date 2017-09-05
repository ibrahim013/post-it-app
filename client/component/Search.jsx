import React from 'react';

class SearchGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault()
       this.setState({errors})
    axios.post('/search', { member: this.state.search })
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div >
            <input type="text" name="search" placeholder="Search Member"
              value={this.state.search}
              onChange={this.onChange} 
              />
            </div>
            <button name="search" className="btn btn-primary btn-small"
              onSubmit={this.onSubmit}>
              +
            </button>
          </form>
        </div>
      </div>


    );
  }
}

export default SearchGroup;