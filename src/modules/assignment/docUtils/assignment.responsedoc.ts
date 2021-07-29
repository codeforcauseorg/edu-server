export default class AssignmentResponseBody {
  /**
   * CourseId
   * @example 60ccf3037025096f45cb87bf
   */
  id: string;

  /**
   * The assignment link
   * @example 'https://codeforcause.org/courses/assignments/1'
   */
  assignmentLink: string;

  /**
   * The assignment description
   * @example 'In this assignment you will have to implement the knowledge of functional component to make this component in React'
   */
  assignmenDescription: string;

  /**
   * The creator of the assignment
   * @example 'John Doe'
   */
  createdBy: string;
}
