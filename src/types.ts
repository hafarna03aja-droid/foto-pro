export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
}

export interface TextElement {
  id: number;
  text: string;
  font: string;
  position: string;
}
