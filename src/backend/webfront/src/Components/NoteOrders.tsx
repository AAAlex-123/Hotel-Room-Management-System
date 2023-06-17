import React from 'react';

export interface ProvisionEntity {
  provision_id: number;
  description: string;
  employee_id: number;
  complete: boolean;
  creation: Date;
}

export interface NoteEntity {
  note_id: number;
  cleaning_staff_id: number;
  note_data: string;
  created: Date;
  room_id: string;
}

export type MessageEntity = NoteEntity | ProvisionEntity;

interface NoteOrderProps {
    message: MessageEntity;
    selected: boolean;
    onClick: () => void;
  }
  
  const NoteOrder: React.FC<NoteOrderProps> = ({ message, selected, onClick }) => {
    const renderNoteEntity = (note: NoteEntity) => {
        const date = note.created.getDate().toString().padStart(2, '0');
        const month = (note.created.getMonth() + 1).toString().padStart(2, '0');
        const year = note.created.getFullYear().toString();
        const format = `${date}/${month}/${year}`;
      return (
        <div className={`message ${selected ? 'selected' : ''}`} onClick={onClick}>
          {note.note_id && (
            <div className="num-circle">
              <p>{note.room_id}/ {note.note_id}</p>
            </div>
          )}
          <div className="message-content">
            <p>{note.cleaning_staff_id}</p>
            <p>{format} : {note.note_data}</p>
          </div>
        </div>
      );
    };
  
    const renderProvisionEntity = (provision: ProvisionEntity) => {
        const date = provision.creation.getDate().toString().padStart(2, '0');
        const month = (provision.creation.getMonth() + 1).toString().padStart(2, '0');
        const year = provision.creation.getFullYear().toString();
        const format = `${date}/${month}/${year}`;
      return (
        <div className={`message ${selected ? 'selected' : ''}`} onClick={onClick}>
          {provision.provision_id && (
            <div className="num-circle">
              <p>{provision.employee_id}</p>
            </div>
          )}
          <div className="message-content">
            <p>{provision.complete}</p>
            <p>{format} : {provision.description}</p>
          </div>
        </div>
      );
    };
  
    const isNoteEntity = (message: MessageEntity): message is NoteEntity => {
      return (message as NoteEntity).note_id !== undefined;
    };
  
    if (isNoteEntity(message)) {
      return renderNoteEntity(message);
    } else {
      return renderProvisionEntity(message);
    }
  };
  
  export default NoteOrder;