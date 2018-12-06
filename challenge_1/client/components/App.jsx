import React from 'react';
import axios from 'axios';

import Banner from './Banner';
import Events from './Events';
import ReactPaginate from 'react-paginate';

import './../styles/app.css';
import './../styles/pagination.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchResults: [],
      pageCount: null,
      pageNumber: 0,
    }
  }

  handleInputChange(e) {
    const searchString = e.target.value;
    this.setState({ 
      searchString,
      searchResults: [],
      pageCount: 0,
      pageNumber: 1,
    }, () => {
      if (searchString.length >= 3) {
        this.executeQuery();
      }
    });
  }

  handlePageClick(e) {
    this.setState({
      pageNumber: e.selected + 1,
    }, () => {
      if (this.state.searchString.length >= 3) {
        this.executeQuery();
      }
    });
  }

  executeQuery() {
    axios.get(`//localhost:3000/events/?q=${this.state.searchString}&_page=${this.state.pageNumber}&_limit=10`)
      .then(({data, headers}) => {
        this.setState({ 
          searchString: this.state.searchString,
          searchResults: data,
          pageCount: Math.ceil(headers['x-total-count']/10),
        });
      })
      .catch(({ message }) => console.log(message));
  }

  render() {
    return (
      <div>
        <Banner handleInputChange={ this.handleInputChange.bind(this) }/>
        <Events page={ this.state.pageNumber } events={ this.state.searchResults }/>
        {
          this.state.pageCount
          ? <ReactPaginate 
              forcePage={this.state.pageNumber - 1}
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount || 0}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick.bind(this)}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"} 
            />
          : <div />
        }
      </div>
    )
  }
}

export default App;

// handleInputChange(e) {
//   const searchString = e.target.value;
//   this.setState({ 
//     searchString,
//     searchResults: [],
//     pageNumber: 0,
//   }, () => {
//     if (searchString.length >= 3) {
//       this.executeQuery();
//     }
//   });
// }

// handlePageClick(e) {
//   this.setState({
//     pageNumber: e.selected + 1,
//   }, () => {
//     if (this.state.searchString.length >= 3) {
//       this.executeQuery();
//     }
//   });
// }

// executeQuery() {
//   axios.get(`//localhost:3000/events/?q=${this.state.searchString}&_page=${this.state.pageNumber}&_limit=10`)
//     .then(({data, headers}) => {
//       console.log(data);
//       this.setState({ 
//         searchString: this.state.searchString,
//         searchResults: data,
//         pageCount: Math.ceil(headers['x-total-count']/10),
//       });
//     })
//     .catch(({ message }) => console.log(message));
// }
