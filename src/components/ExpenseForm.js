import React, {Component} from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


const date = moment();
console.log(date.format('MMM Do, YYYY'));

class ExpenseForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '', 
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt): moment(),
            calendarFocused: false,
            error: ''
        }
    }    
    changingDescrtiption = (e) =>{
        const description = e.target.value;
        this.setState(()=>({description: description}))
    }
    changingNote = (e) =>{
        const note = e.target.value;
        this.setState(()=>({note: note}))
    }
    changingAmount = (e) =>{
        const amount = e.target.value;
        //regular expression
// if this string is a number (eg. 1095000000.50) and we want to assure that after the decimal point only 2 number are entered (.50) 
//string match method
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){ // range of 1 to infinity
            this.setState(()=>({amount: amount}))
        }
    }
    onDateChange = (createdAt) =>{
        if(createdAt){
        this.setState(()=>({ createdAt: createdAt }))
        }
    }
    onFocusChange = ({focused}) => {
        this.setState(() => ({ calendarFocused: focused}))
    }
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description|| !this.state.amount){
            this.setState(()=>({error: 'Please provide description and amount.'}))
        }else {
            this.setState(()=>({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) *100, 
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }
    render(){
        return(
                <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form_error">{this.state.error}</p>}
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        className="text-input"
                        value={this.state.description}
                        onChange={this.changingDescrtiption}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        className="text-input"
                        value={this.state.amount}
                        onChange={this.changingAmount}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                    />
                    <textarea
                        className="textarea"
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.changingNote}
                    >

                    </textarea>
                    <div>
                        <button className="button">Save Expense</button>
                    </div>
                </form>
        );
    }
}
export default ExpenseForm;

//Thridy part component