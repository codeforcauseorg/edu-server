import { IsNotEmpty, IsUrl, IsString } from 'class-validator';

export class UpdateAssignmentDTO {
  /**
   * The assignment link
   * @example 'https://codeforcause.org/courses/assignments/1'
   */
  @IsNotEmpty()
  @IsUrl()
  assignmentLink: string;

  /**
   * The assignment description
   * @example 'In this assignment you will have to implement the knowledge of functional component to make this component in React'
   */
  @IsNotEmpty()
  @IsString()
  assignmenDescription: string;

  /**
   * The creator of the assignment
   * @example 'John Doe'
   */
  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
