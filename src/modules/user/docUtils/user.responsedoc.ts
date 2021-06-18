export default class UserResponseBody {
  /**
   * UserId
   * @example 60ccf3037025096f45cb87bf
   */
  id: string;

  /**
   * First name of the user
   * @example 'John'
   */
  first_name: string;

  /**
   * Last name of the user
   * @example 'Doe'
   */
  last_name: string;

  /**
   * Email of the user
   * @example 'john@example.com'
   */
  email: string;

  /**
   * Phone number of the user
   * @example '9000500000'
   */
  phone: string;

  /**
   * Address of the user
   * @example 'Block C Amsterdam'
   */
  address: string;

  /**
   * Description of the user
   * @example 'Aspiring Software Developer'
   */
  description: string;


  score: number;

  /**
   * The field to show whether the students is Admin or not
   * @example false
   * @default false
   */
  isAdmin: boolean;

  /**
   * The photo url
   * @example 'https://g.gle/mypic.jpeg'
   */
  photoUrl: string;

  /**
   * The cover photo url
   * @example 'https://g.gle/mycover.jpeg'
   */
  coverPhotoUrl?: string;

  /**
   * The Wishlisted Courses
   * @example ["60ccf3037025096f45cb87ba", "60ccf3037025096f45cb87bq"]
   */
  wishlist: string[];
}

