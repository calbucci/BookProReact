import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from "./KanbanBoardContainer";
import 'babel-polyfill';

// let cardsList = [
//   {
//       id: 1,
//       title: "Read the book",
//       description: "I should read the **whole** book",
//       color: '#bd8d31',
//       status: "in-progress",
//       tasks: []
//   } ,
//   {
//       id: 2,
//       title: "Write some code",
//       description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
//       color: '#3a7e28',
//       status: "todo",
//       tasks: [
//           {
//               id: 1,
//             name: "ContactList Example",
//             done: true
//           },
//           {
//               id: 2,
//               name: "Kanban Example",
//               done: false
//           },
//           {
//               id: 3,
//               name: "My own experiments",
//               done: false
//           }
//       ]
//       
//   }
// ];
// 


ReactDOM.render(<KanbanBoardContainer />, document.getElementById('root'))
 