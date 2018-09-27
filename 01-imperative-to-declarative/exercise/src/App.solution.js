import React, { Component } from "react";

class DocumentTitle extends Component {
  componentDidMount() {
    document.title = this.props.children;
  }

  componentDidUpdate() {
    document.title = this.props.children;
  }

  render() {
    return null;
  }
}

class App extends Component {
  state = {
    completed: 0,
    todos: ["Wake up", "Eat a taco", "Avoid twitter"]
  };

  render() {
    let { todos, completed } = this.state;
    let incomplete = todos.length - completed;

    return (
      <div className="app">
        <DocumentTitle>{`Todos (${incomplete})`}</DocumentTitle>

        <h1>Todos ({incomplete})</h1>

        <form
          onSubmit={event => {
            let todo = event.target.elements[0].value;
            event.preventDefault();
            event.target.reset();
            this.setState(state => {
              return { todos: state.todos.concat([todo]) };
            });
          }}
        >
          <input type="text" /> <button type="submit">Add</button>
        </form>

        <ul>
          {todos.map(todo => (
            <li>
              <label>
                <input
                  type="checkbox"
                  onChange={event => {
                    let checked = event.target.checked;
                    this.setState(state => {
                      return {
                        completed: checked
                          ? state.completed + 1
                          : state.completed - 1
                      };
                    });
                  }}
                />{" "}
                {todo}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
