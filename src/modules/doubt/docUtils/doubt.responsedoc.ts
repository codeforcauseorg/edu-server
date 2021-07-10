import { TagType } from '../doubt-tag.enum';
import { DoubtAnswer } from '../schema/doubtAnswer.schema';

export default class DoubtResponseBody {
  /**
   * DoubtId
   * @example 60ccf3037025096f45cb87bf
   */
  id: string;

  /**
   * The name of the person who asked the doubt
   * @example 'John Doe'
   */
  asked_by: string;

  /**
   * The Answer of the doubt
   * @example []
   */
  answers: DoubtAnswer[];

  /**
   * Whether the metor's assistance is needed or not for the doubt
   * @example true
   */
  request_mentor: boolean;

  /**
   * Whether the doubt was resolved or not
   * @example true
   */
  is_resolved: boolean;

  /**
   * The question/doubt
   * @example "Why do we use memoization over tabulation ?"
   */
  question: string;

  /**
   * The tags associated with the doubt
   * @example "Web development"
   */
  tags: TagType[];
}

export class DoubtAnswerResponseBody {
  /**
   * DoubtAnswerId
   * @example 60ccf3037025096f45cb87bf
   */
  id: string;

  /**
   * The name of the person who answered the doubt
   * @example 'John Doe'
   */
  answered_by: string;

  /**
   * The asnwer to the doubt
   * @example "We use this to conserve time by applying alogorithm of lesser time complexity"
   */

  answer: string;
}
