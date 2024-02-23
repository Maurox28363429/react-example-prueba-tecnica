import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent,CardActions,Button } from '@mui/material';
import http_notes from '../api/notes';
import Swal from 'sweetalert2';
function Homepage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await http_notes.getNotes();
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotes();
  }, []);
  function parseDate(originalDate){
    const parts = originalDate.split(" ");
    const datePart = parts[0];
    const [year, month, day] = datePart.split("-");
    const transformedDate = `${day}/${month}/${year.slice(-2)}`;
    return transformedDate;
  }
  async function deleteNoteEvent(id) {
   const notedelete= await http_notes.deleteNote(id);
   if(notedelete.message=="Note deleted"){
    Swal.fire({
      icon: 'success',
      title: 'Nota borrada',
      showConfirmButton: false,
      timer: 1500
    });
    setNotes(notes.filter((note) => note.id !== id));
   }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo borrar la nota',
    });
   }
  }
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Notas
      </Typography>
      <div className='flex-card'>
        {notes.map((note) => (
          <Card key={note.id} style={{ margin: '16px' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {note.title}
              </Typography>
              <Typography color="textSecondary">
                {parseDate(note.date)}
              </Typography>
              <Typography variant="body2" component="p">
                {note.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={() => deleteNoteEvent(note.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Homepage;