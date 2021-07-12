export default class MentorResponseBody {
  /**
   * id of the mentor
   * @example '60ec0cd4e7de7e1940a0cc08'
   */
  id: string;

  /**
   * name of the mentor
   * @example 'John Doe'
   */
  name: string;

  /**
   * Email of the mentor
   * @example 'John_cfc@gmail.com'
   */
  email: string;

  /**
   * Assigned courses of the mentor
   * @example ["60ccf3037025096f45cb87ba", "60ccf3037025096f45cb87bq"]
   */
  courses: string[];

  /**
   * number of students under the mentorship of that mentor
   * @example 5
   */
  number_of_students: number;
}
