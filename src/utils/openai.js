import OpenAI from 'openai';
import { OPENAI_KEY } from './constants';

//It is a kind of authorisation happening here
const openai = new OpenAI({
  apiKey: OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true,
});

export default openai;