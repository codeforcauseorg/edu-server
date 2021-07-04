export default class AnnouncementResponseBody {
  /**
   * The title of the announcement
   * @example 'New course on Web Development'
   */
  title: string;

  /**
   * The description of the announcement
   * @example 'The wait is finally over as teh new course on Web Development has been released. The course will take you through the basics and help you learn and make projects along the way'
   */
  description: string;

  /**
   * Whether the announcement was read or not
   * @example true
   */
  read: boolean;

  /**
   * Creator of the announcement
   * @example 'John Doe'
   */
  created_by: string;
}
