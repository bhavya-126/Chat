export interface Message {
  chatMapId: string;
  dateTime: string;
  fileName?: string;
  fileUrl?: string;
  isDeleted: boolean;
  message: string;
  messageId?: string;
  receiverEmail: string;
  senderEmail: string;
}
export interface MessageResponse{
    statusCode:number;
    data:Message[];
}