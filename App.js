import './App.css';
import React from 'react'; // This line imports the core React library
import Question from './question';
import Article from './article';
import Find_Question from './findquestion';
import { Form, Checkbox } from 'semantic-ui-react' //This line imports two components, Form and Checkbox, from the Semantic UI React library

function App() {
  const [value, setValue] = React.useState('Question')
  return (
    <>
    
      <div className='post'>
        <h2>New Post</h2>
      </div>
      <div className='N'>
      <Form>
        <Form.Field>
          Select Post Type:
        </Form.Field>
        <Form.Field>
          <Checkbox className="Q"
            radio
            label='Question'
            name='checkboxRadioGroup'
            value='Question'
            checked={value === 'Question'}
            onChange={(e, data) => setValue(data.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox className="A"
            radio
            label='Article'
            name='checkboxRadioGroup'
            value='Article'
            checked={value === 'Article'}
            onChange={(e, data) => setValue(data.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox className="F"
            radio
            label='Find Question'
            name='checkboxRadioGroup'
            value='Find_Question'
            checked={value === 'Find_Question'}
            onChange={(e, data) => setValue(data.value)}
          />
        </Form.Field>
      </Form>
      </div>


  
      {value === "Question" ? (<Question />) : value === "Article" ? (<Article />) :(<Find_Question/>)}
    </>
  );
}

export default App;