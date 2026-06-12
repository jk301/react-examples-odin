import { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      editIndex: null,
      editVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)

    this.handleEdit = this.handleEdit.bind(this)
    this.handleEditInput = this.handleEditInput.bind(this)
    this.handleCancelEdit = this.handleCancelEdit.bind(this)
    this.handleResubmit = this.handleResubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDelete (toDelete) {
    this.setState((state) => ({
      todos: state.todos.filter(td => td !== toDelete)
    }))
  }


  handleEdit (index, todo) {
    this.setState((state) => ({
      ...state,
      editIndex: index,
      editVal: todo,
    }))
  }

  handleEditInput (e) {
    this.setState((state) => ({
      ...state,
      editVal: e.target.value,
    }))
  }

  handleCancelEdit() {
    this.setState((state) => ({
      ...state,
      editIndex: null,
      editVal: '',
    }))
  }

  handleResubmit(editVal, editInd) {
    const newTodos = this.state.todos.map((todo, index) => {
      if (index === editInd) {
        return editVal
      }
      return todo
    })

    this.setState((state) => ({
      ...state,
      todos: newTodos,
    }))

    this.handleCancelEdit()
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            (index === this.state.editIndex)
              ?
                <>
                  <input 
                    type="text"
                    name="edit-entry" 
                    value={this.state.editVal} 
                    onChange={this.handleEditInput}
                  />
                  <button onClick={() => this.handleCancelEdit()}>Cancel</button>
                  <button onClick={() => this.handleResubmit(this.state.editVal, index)}>Resubmit</button>
                </>
              :
                <>
                <li key={todo}>{todo}</li>
                <button onClick={() => this.handleDelete(todo)}>Delete todo</button>
                <button onClick={() => this.handleEdit(index, todo)}>Edit todo</button>
              </>
          ))}
        </ul>
        <Count todos={this.state.todos}/>
      </section>
    );
  } 
}

export default ClassInput;


class Count extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        The todo Count is {this.props.todos.length}
      </section>
    )
  }
}
