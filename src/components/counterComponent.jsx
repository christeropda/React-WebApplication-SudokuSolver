import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        // [8, 6, 5, 3, 2, 1, 7, 9, 4],
        // [3, 7, 4, 9, 8, 5, 6, 2, 1],
        // [1, 2, 9, 6, 4, 7, 3, 8, 5],
        // [6, 5, 8, 2, 7, 4, 1, 3, 9],
        // [4, 3, 2, 1, 5, 0, 8, 7, 6],
        // [9, 1, 7, 8, 3, 6, 5, 4, 2],
        // [2, 9, 0, 7, 1, 8, 4, 5, 3],
        // [5, 8, 1, 4, 9, 3, 2, 6, 7],
        // [7, 4, 3, 5, 6, 2, 9, 1, 8]
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    };
  }

  handleReset = () => {
    let reset = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    this.setState({ tags: reset });
  };

  handleSubmitForm = event => {
    event.preventDefault();

    let board = this.state.tags;
    console.log(board);

    console.log("starting");

    this.solve(board);

    console.log("done");

    this.setState({ tags: board });

    // const data = this.state;
    // console.log("data is", data);
    // console.log("event name", event.target.name);
  };

  handleInputChange = event => {
    event.preventDefault();

    let val = this.state.tags;
    console.log("val 0", val[0]);

    let x = Math.floor(event.target.name / 9);
    let y = event.target.name % 9;

    console.log(x, y);

    val[x][y] = event.target.value;

    this.setState({ tags: val });

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        console.log("x, y ", x, y);
        console.log(val[x][y]);
      }
    }
  };

  solve(grid) {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (grid[x][y] == 0) {
          for (let i = 1; i < 10; i++) {
            //console.log(x, y, i);
            if (this.testFit(x, y, i, grid)) {
              grid[x][y] = i;
              console.log("entered number", i);
              if (this.solve(grid)) {
                return true;
              }
              grid[x][y] = 0;
            }
          }
          console.log("returning false");
          return false;
        } else {
          if (this.check_board(grid)) {
            console.log("no zeros in board, returning true");
            return true;
          }
        }
      }
    }
    console.log("returning, end of program");
    return;
  }

  check_board(grid) {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (grid[x][y] == 0) {
          return false;
        }
      }
    }
    return true;
  }

  testFit(x, y, number, grid) {
    for (let i = 0; i < 9; i++) {
      if (grid[x][i] == number) {
        console.log("false i");
        return false;
      }
    }

    for (let j = 0; j < 9; j++) {
      if (grid[j][y] == number) {
        console.log("false j");
        return false;
      }
    }

    const xcord = Math.floor(x / 3) * 3;
    const ycord = Math.floor(y / 3) * 3;

    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        if (grid[k + xcord][l + ycord] == number) {
          console.log("false cord", x, y, k + xcord, l + ycord, number);
          return false;
        }
      }
    }

    return true;
  }

  extendTag() {
    let test = [];
    for (let i = 0; i < 9; i++) {
      test[i] = new Array(2);
    }

    this.setState({ tags: test });
  }

  getColor(x, y) {
    if (x < 3) {
      if (y < 3) {
        return { borderColor: "black" };
      }
      if (y < 6) {
        return { borderColor: "orange" };
      }
      if (y < 9) {
        return { borderColor: "black" };
      }
    }
    if (x < 6) {
      if (y < 3) {
        return { borderColor: "orange" };
      }
      if (y < 6) {
        return { borderColor: "black" };
      }
      if (y < 9) {
        return { borderColor: "orange" };
      }
    }
    if (x < 9) {
      if (y < 3) {
        return { borderColor: "black" };
      }
      if (y < 6) {
        return { borderColor: "orange" };
      }
      if (y < 9) {
        return { borderColor: "black" };
      }
    }
  }

  genBuffer(n) {
    let buffer = [];
    let number = n;

    for (let i = 0; i < 9; i++) {
      console.log();
      buffer.push(
        <input
          key={number * 9 + i}
          style={this.getColor(number, i)}
          className="inputboxes m-1"
          type="text"
          name={number * 9 + i}
          value={this.state.tags[number][i]}
          onChange={this.handleInputChange}
        />
      );
    }

    return buffer;
  }

  genInputBoxes() {
    const items = [];

    for (let i = 0; i < 9; i++) {
      items.push(<div className="row w-75">{this.genBuffer(i)}</div>);
    }

    return items;
  }

  render() {
    const { fullName } = this.state;

    return (
      <div className="container">
        <div className="col border w-75 border-dark rounded ">
          <form onSubmit={this.handleSubmitForm}>
            <h1 className="display-4">
              Enter Your Sudoku Puzzle, And Let's Solve it!
            </h1>
            <div className="row m-5 w-75">{this.genInputBoxes()}</div>
            <div className="row w-75">
              <button type="submit" className="btn btn-success ml-3">
                Solve
              </button>
            </div>
          </form>
          <button
            className="btn btn-warning mt-2 mb-2"
            onClick={this.handleReset}
          >
            Reset Board
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
