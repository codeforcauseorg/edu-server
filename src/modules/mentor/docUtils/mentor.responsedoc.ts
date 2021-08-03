export default class MentorResponseBody {
  /**
   * id of the mentor
   * @example '60ec0cd4e7de7e1940a0cc08'
   */
  id: string;

  /**
   * name of the mentor
   * @example 'Anuj Garg'
   */
  name: string;

  /**
   * Email of the mentor
   * @example 'anuj@codeforcause.com'
   */
  email: string;

  /**
   * Assigned courses of the mentor
   * @example ["60ccf3037025096f45cb87ba", "60ccf3037025096f45cb87bq"]
   */
  courses: string[];

  /**
   * number of students under the mentorship of that mentor
   * @example 500
   */
  number_of_students: number;

  /**
   * photo url of the mentor
   * @example 'https://g.gle/mypic.jpeg'
   */
  mentorPhoto: string;

  /**
   * description of the mentor
   * @example 'I am a developer'
   */
  aboutMe: string;

  /**
   * Tech Stack of the mentor
   * @example ['MERN', 'Python']
   */
  techStack: string[];
}
